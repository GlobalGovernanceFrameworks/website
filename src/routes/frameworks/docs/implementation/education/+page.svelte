<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import ConstellationMap from '$lib/components/ConstellationMap.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  onMount(() => {
    if (browser) {
      // First handle any section query parameter
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      
      if (sectionParam && data.sections[sectionParam]) {
        setActiveSection(sectionParam);
      } 
      // Then check for hash if no section param
      else if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash && data.sections[hash]) {
          setActiveSection(hash);
        }
      }

      // Listen for hash changes without reloading the page
      const handleHashChange = (event) => {
        // Prevent the default behavior which might cause a page reload
        event.preventDefault();
        
        const hash = window.location.hash.substring(1);
        if (hash && data.sections[hash] && activeSection !== hash) {
          setActiveSection(hash);
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  });

  // Keep track of which section is active (for sub-navigation)
  let activeSection = 'index';

  // Function to set active section
  function setActiveSection(section) {
    activeSection = section;
    
    // Update the URL hash to reflect the current section (without page reload)
    if (browser) {
      // Important: Use the history API to update just the hash without changing the path
      const url = new URL(window.location.href);
      url.hash = section;
      
      // Replace state rather than push to avoid creating extra history entries
      history.replaceState(null, '', url.toString());

      // Scroll to the content area with smooth animation
      // Wait a tiny bit for the content to render
      setTimeout(() => {
        const contentElement = document.querySelector('.section-content');
        if (contentElement) {
          contentElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }

  // Handle manual navigation with the back/forward buttons
  afterUpdate(() => {
    if (browser) {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const sectionId = hash.substring(1);
          if (data.sections[sectionId] && activeSection !== sectionId) {
            setActiveSection(sectionId);
          }
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  });

  // Check if we're in print mode
  const isPrintMode = data.isPrintMode;

  // If in print mode, we'll show all sections
  // This is a special state just for PDF generation
  $: sectionsToShow = isPrintMode ? Object.keys(data.sections || {}) : [activeSection];

  // Make this function available globally for the PDF generator
  if (browser) {
    window.showAllSectionsForPrint = () => {
      sectionsToShow = Object.keys(data.sections || {});
    };
  }

  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Swedish translations for the introduction section
  const introSv = {
    title: "Regenerativa Utbildningssystem Implementationsramverk",
    overview: "Översikt",
    paragraph1: "Det Regenerativa Utbildningssystem Implementationsramverket är en omfattande, anpassningsbar plan för att omvandla global utbildning. Den integrerar åtta strukturella komponenter med stegvisa implementeringsstrategier och robust övervakning och utvärdering.",
    paragraph2: "Detta ramverk omdefinierar global utbildning som ett regenerativt, inkluderande ekosystem som förbereder elever att ta itu med planetära utmaningar. Det integrerar systemtänkande, spiraldynamik, regenerativ design och globalt medborgarskap för att främja holistiska, etiskt grundade medborgare."
  };

  // English translations as fallback
  const introEn = {
    title: "Regenerative Educational Systems Implementation Framework",
    overview: "Overview",
    paragraph1: "The Regenerative Educational Systems Implementation Framework is a comprehensive, adaptable blueprint for transforming global education. It integrates eight structural components with phased implementation strategies and robust monitoring and evaluation.",
    paragraph2: "This framework reimagines global education as a regenerative, inclusive ecosystem that prepares learners to address planetary challenges. It integrates systems thinking, spiral dynamics, regenerative design, and global citizenship to foster holistic, ethically grounded citizens."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'quick-start': "Framework Lite Guide",
        
        // Core framework sections (01-10)
        '01-preamble': "Preamble & Executive Summary",
        '02-vision-principles': "Vision & Core Principles",
        '03-structural-components': "Structural Components",
        '04-implementation-strategies': "Implementation Strategies",
        '05-monitoring-evaluation': "Monitoring & Evaluation",
        '06-sdg-alignment': "SDG Alignment & Impact Metrics",
        '07-visual-multimedia': "Visual & Multimedia Components",
        '08-case-models': "Case Models",
        '09-future-potential': "Future Potential",
        '10-appendices': "Appendices"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'quick-start': "Ramverk Lite Guide",
        
        // Core framework sections (Swedish)
        '01-preamble': "Inledning & Sammanfattning",
        '02-vision-principles': "Vision & Kärnprinciper",
        '03-structural-components': "Strukturella Komponenter",
        '04-implementation-strategies': "Implementeringsstrategier",
        '05-monitoring-evaluation': "Övervakning & Utvärdering",
        '06-sdg-alignment': "SDG-anpassning & Påverkansmätningar",
        '07-visual-multimedia': "Visuella & Multimedia Komponenter",
        '08-case-models': "Fallmodeller",
        '09-future-potential': "Framtida Potential",
        '10-appendices': "Bilagor"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Preamble & Executive Summary': 'Preamble',
      'Vision & Core Principles': 'Vision',
      'Structural Components': 'Components',
      'Implementation Strategies': 'Implementation',
      'Monitoring & Evaluation': 'Monitoring',
      'SDG Alignment & Impact Metrics': 'SDG Alignment',
      'Visual & Multimedia Components': 'Visual',
      'Case Models': 'Cases',
      'Future Potential': 'Future',
      'Appendices': 'Appendices'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide() {
    const pdfUrl = `${base}/assets/pdf/education-framework-lite-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'education-framework-lite.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the lite guide
  $: isLiteGuideActive = activeSection === 'quick-start';
  $: isSupplementaryActive = ['quick-start'].includes(activeSection);

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let implementationOpen = false;
  let evaluationOpen = false;
  let resourcesOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    // Close the other dropdown if it's open
    if (isDropdownOpen) isNavDropdownOpen = false;
  }

  function toggleNavDropdown() {
    isNavDropdownOpen = !isNavDropdownOpen;
    // Close the other dropdown if it's open
    if (isNavDropdownOpen) isDropdownOpen = false;
  }

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleEvaluation() {
    evaluationOpen = !evaluationOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const dropdown = document.querySelector('.card-actions .dropdown');
      const navDropdown = document.querySelector('.dropdown-li');
      
      if (dropdown && !dropdown.contains(event.target)) {
        isDropdownOpen = false;
      }
      
      if (navDropdown && !navDropdown.contains(event.target)) {
        isNavDropdownOpen = false;
      }
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Get the total number of core framework sections (01-10)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['quick-start'].includes(section)
  ).sort();

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Group sections logically
  $: foundationSections = ['01-preamble', '02-vision-principles', '03-structural-components'];
  $: implementationSections = ['04-implementation-strategies', '05-monitoring-evaluation'];
  $: evaluationSections = ['06-sdg-alignment', '07-visual-multimedia', '08-case-models', '09-future-potential', '10-appendices'];
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Education Framework -->
    {#if !isPrintMode && !isLiteGuideActive && activeSection === 'index'}
      <div class="education-guide-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h3>New to the Regenerative Education Framework?</h3>
            <p>Start with our accessible guide that explains the core concepts of regenerative education in plain language.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('quick-start')}>
              Read Framework Lite Guide <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    {/if}

    {#if data.isModular}
      <!-- Sub-navigation for framework sections -->
      {#if !isPrintMode} 
        <div class="section-nav">
          <!-- Overview -->
          <div class="nav-section">
            <button 
              class="nav-item overview-item" 
              class:active={activeSection === 'index'}
              on:click={() => setActiveSection('index')}
            >
              <span class="nav-icon">🏠</span>
              <span class="nav-title">Overview</span>
            </button>
          </div>

          <!-- Foundation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={foundationSections.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">Foundation</span>
              <span class="section-count">({foundationSections.length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each foundationSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-number">{section.substring(0, 2)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Implementation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={implementationOpen}
              class:has-active={implementationSections.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🔧</span>
              <span class="accordion-title">Implementation</span>
              <span class="section-count">({implementationSections.length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each implementationSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-number">{section.substring(0, 2)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Evaluation & Application Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={evaluationOpen}
              class:has-active={evaluationSections.some(section => activeSection === section)}
              on:click={toggleEvaluation}
            >
              <span class="accordion-icon">📊</span>
              <span class="accordion-title">Evaluation & Application</span>
              <span class="section-count">({evaluationSections.length})</span>
              <span class="toggle-arrow" class:rotated={evaluationOpen}>▼</span>
            </button>
            {#if evaluationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each evaluationSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-number">{section.substring(0, 2)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Resources Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={resourcesOpen}
              class:has-active={isSupplementaryActive}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">Resources</span>
              <span class="section-count">(1)</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'quick-start'}
                  on:click={() => setActiveSection('quick-start')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">Framework Lite Guide</span>
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 10) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 10</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section === 'quick-start'}
            <!-- Render Lite Guide -->
            <svelte:component this={data.sections[section].default} />
            
            <!-- Navigation buttons at bottom of lite guide -->
            {#if !isPrintMode}
              <div class="guide-navigation">
                <button class="secondary-btn" on:click={downloadGuide}>
                  Download PDF Version <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('01-preamble')}>
                  Continue to Full Framework <span class="arrow-icon">→</span>
                </button>
              </div>
            {/if}

          {:else if section === 'index' && currentLocale === 'sv'}
            <!-- Manually render Swedish introduction for the index section -->
            <div class="overview-section">
              <h1>{intro.title}</h1>
              <h2>{intro.overview}</h2>
              <p>{intro.paragraph1}</p>
              <p>{intro.paragraph2}</p>
            </div>
            <!-- Show constellation map for index section -->
            <ConstellationMap />
          {:else if section === 'index'}
            <!-- Render English introduction through the markdown component -->
            <svelte:component this={data.sections[section].default} />
          {:else if data.sections[section]}
            <!-- Render normal sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}

          <!-- Section navigation at bottom of core sections -->
          {#if isCoreSection && !isPrintMode}
            <div class="section-navigation">
              {#if parseInt(activeSection.substring(0, 2)) > 1}
                <button class="nav-btn prev-btn" on:click={() => {
                  const prevSection = String(parseInt(activeSection.substring(0, 2)) - 1).padStart(2, '0') + activeSection.substring(2);
                  setActiveSection(prevSection);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if parseInt(activeSection.substring(0, 2)) < 10}
                <button class="nav-btn next-btn" on:click={() => {
                  const nextSection = String(parseInt(activeSection.substring(0, 2)) + 1).padStart(2, '0') + activeSection.substring(2);
                  setActiveSection(nextSection);
                }}>
                  Next Section →
                </button>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <!-- Legacy single file display -->
      <div class="overview-section">
        <h1>{intro.title}</h1>
        <h2>{intro.overview}</h2>
        <p>{intro.paragraph1}</p>
        <p>{intro.paragraph2}</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Regenerative Education Framework color scheme - nature and growth themed palette */
  :root {
    --education-primary: #2D5F2D; /* Earth Green - growth, nature, sustainability */
    --education-secondary: #DAA520; /* Wisdom Gold - knowledge, enlightenment, transformation */
    --education-accent: #2B4B8C; /* Cosmic Blue - depth, understanding, perspective */
    --education-growth: #6B8E23; /* Olive Green - organic growth, development, life */
    --education-wisdom: #B8860B; /* Dark Gold - deep wisdom, tradition, value */
    --education-nature: #228B22; /* Forest Green - natural systems, ecosystem, harmony */
    --education-renewal: #32CD32; /* Lime Green - renewal, regeneration, vitality */
    --education-earth: #8B4513; /* Saddle Brown - grounding, roots, foundation */
    --education-sky: #87CEEB; /* Sky Blue - possibility, openness, horizon */
    --education-connection: #9370DB; /* Medium Purple - connection, networks, relationships */
  }

  .section-nav {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .nav-section {
    margin-bottom: 0.5rem;
  }

  .nav-accordion {
    margin-bottom: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    overflow: hidden;
    background: white;
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
    color: #374151;
    text-align: left;
  }

  .accordion-header:hover {
    background-color: rgba(45, 95, 45, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(45, 95, 45, 0.1);
    color: var(--education-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(45, 95, 45, 0.1);
    border-bottom: 1px solid #e5e7eb;
  }

  .accordion-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .accordion-title {
    flex-grow: 1;
    font-weight: 600;
  }

  .section-count {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 400;
  }

  .toggle-arrow {
    font-size: 0.8rem;
    color: #6b7280;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-arrow.rotated {
    transform: rotate(180deg);
  }

  .accordion-content {
    border-top: 1px solid #e5e7eb;
    background-color: #fafafa;
  }

  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #4b5563;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .nav-item:last-child {
    border-bottom: none;
  }

  .nav-item:hover {
    background-color: rgba(45, 95, 45, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--education-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--education-nature);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(45, 95, 45, 0.1), rgba(218, 165, 32, 0.1));
    border: 1px solid rgba(45, 95, 45, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--education-primary);
    color: white;
  }

  .subsection-item {
    padding-left: 1.5rem;
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-number {
    font-size: 0.8rem;
    background-color: rgba(45, 95, 45, 0.1);
    color: var(--education-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    min-width: 2rem;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-item.active .nav-number {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .nav-title {
    flex-grow: 1;
    text-align: left;
  }

  /* Auto-expand accordion when section is active */
  .accordion-header.has-active + .accordion-content {
    display: block;
  }

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(45, 95, 45, 0.1), rgba(218, 165, 32, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--education-primary);
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--education-primary), var(--education-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--education-earth);
    font-weight: 500;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem; /* Adds space above when scrolled to */
  }

  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }

    .section-nav {
      padding: 0.75rem;
    }

    .accordion-header {
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
    }

    .nav-item {
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
    }

    .subsection-item {
      padding-left: 1rem;
    }
  }
  
  .content {
    min-width: 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--education-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--education-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--education-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--education-growth);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(218, 165, 32, 0.1);
    border-left: 4px solid var(--education-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--education-earth);
    display: block;
    margin-bottom: 0.75rem;
  }

  :global(blockquote ul) {
    margin-left: 1.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  :global(blockquote li) {
    margin-bottom: 0.5rem;
  }

  :global(blockquote p:last-child) {
    margin-top: 0.75rem;
    font-style: italic;
  }

  :global(blockquote a) {
    color: var(--education-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--education-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with regenerative education themed bullets */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: #4b5563;
  }

  .content :global(ul) {
    list-style-type: none;
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  /* Apply regenerative symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌱";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 0.9rem;
  }

  .content :global(ol) {
    list-style-type: decimal;
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: var(--education-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🌿";
    color: var(--education-growth);
  }

  /* Table styles for regenerative education framework */
  :global(.content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    overflow: hidden;
  }

  :global(.content thead) {
    background: linear-gradient(to right, var(--education-primary), var(--education-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--education-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(218, 165, 32, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(218, 165, 32, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Regenerative education framework guide card */
  .education-guide-card {
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, rgba(45, 95, 45, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(45, 95, 45, 0.1);
    border: 1px solid rgba(45, 95, 45, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .education-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(45, 95, 45, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    padding: 1.5rem;
    align-items: center;
    gap: 1.5rem;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--education-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--education-primary);
    font-size: 1.25rem;
  }
  
  .card-text p {
    margin: 0;
    color: #4b5563;
    font-size: 1rem;
  }
  
  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    position: relative;
    overflow: visible;
  }
  
  .primary-btn {
    background-color: var(--education-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--education-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--education-primary);
    border: 1px solid var(--education-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(218, 165, 32, 0.1);
    transform: translateY(-1px);
  }
  
  .download-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }
  
  .arrow-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }

  /* Link styles for content */
  .content :global(a) {
    color: var(--education-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--education-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--education-primary);
  }

  /* External link styles with a subtle indicator */
  .content :global(a[href^="http"]):after, 
  .content :global(a[href^="https://"]):after {
    content: " ↗";
    font-size: 0.8em;
    vertical-align: super;
  }

  /* PDF link styles with download indicator */
  .content :global(a[href$=".pdf"]):after {
    content: " ↓";
    font-size: 0.8em;
  }

  /* Section link styles - more subtle but still distinct */
  .content :global(a[href^="#"]) {
    color: var(--education-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--education-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--education-secondary);
    border-bottom-color: var(--education-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--education-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--education-primary);
  }

  /* Styles for navigation at bottom of guide */
  .guide-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  /* Section navigation for core framework sections */
  .section-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .nav-btn {
    background-color: var(--education-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--education-nature);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Dropdown styles for supplementary materials */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    width: auto !important;
    min-width: 250px !important;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    margin-top: 0;
    padding-top: 10px;
    white-space: normal !important;
  }

  .dropdown:hover .dropdown-menu,
  .dropdown-li:hover .dropdown-menu {
    display: block;
  }

  .dropdown::after,
  .dropdown-li::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 10px;
    background: transparent;
  }

  .dropdown-li {
    position: relative;
  }

  .dropdown-li .dropdown-menu {
    width: 250px;
    display: none;
  }

  .dropdown-li:hover .dropdown-menu {
    display: block;
  }

  /* Fix for dropdown items when supplementary is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important;
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(218, 165, 32, 0.1) !important;
    color: var(--education-primary) !important;
  }

  .dropdown-li.active .dropdown-menu .dropdown-item {
    color: #212529 !important;
    background-color: transparent !important;
  }

  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  /* Remove any inherited text color styling */
  .dropdown-li.active .dropdown-item *,
  .dropdown-li.active .supplement-title,
  .dropdown-li.active .supplement-icon {
    color: inherit !important;
  }

  /* Hover state */
  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(218, 165, 32, 0.1) !important;
    color: var(--education-primary) !important;
  }

  /* Fix for supplement icons in dropdown */
  .dropdown-item .supplement-icon {
    display: inline-block;
    width: 24px;
    text-align: center;
    margin-right: 8px;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: normal !important;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  .dropdown-item:hover, .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: rgba(218, 165, 32, 0.1);
  }

  .supplement-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }

  .supplement-title {
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .card-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .card-actions {
      width: 100%;
      justify-content: center;
    }
    
    .guide-navigation {
      flex-direction: column;
      gap: 1rem;
    }
    
    .guide-navigation button {
      width: 100%;
    }

    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }
  }

  /* Regenerative Education Framework specific theme elements */

  /* Special callouts for regenerative concepts */
  .content :global(.regenerative-callout) {
    background-color: rgba(45, 95, 45, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-primary);
  }

  .content :global(.wisdom-callout) {
    background-color: rgba(218, 165, 32, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-secondary);
  }

  .content :global(.growth-callout) {
    background-color: rgba(107, 142, 35, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-growth);
  }

  .content :global(.connection-callout) {
    background-color: rgba(147, 112, 219, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-connection);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(135, 206, 235, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-sky);
  }

  .content :global(.case-study-title) {
    color: var(--education-sky);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(139, 69, 19, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--education-earth);
  }

  .content :global(.alert-title) {
    color: var(--education-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important educational concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(218, 165, 32, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(218, 165, 32, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--education-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(218, 165, 32, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Nature and ecosystem styling */
  .content :global(.nature-highlight) {
    background-color: rgba(45, 95, 45, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(45, 95, 45, 0.3);
  }

  .content :global(.nature-highlight-title) {
    color: var(--education-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(45, 95, 45, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Renewal and vitality styling */
  .content :global(.renewal-highlight) {
    background-color: rgba(50, 205, 50, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(50, 205, 50, 0.3);
  }

  .content :global(.renewal-highlight-title) {
    color: var(--education-renewal);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(50, 205, 50, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Systems thinking styling */
  .content :global(.systems-highlight) {
    background-color: rgba(43, 75, 140, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(43, 75, 140, 0.3);
  }

  .content :global(.systems-highlight-title) {
    color: var(--education-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(43, 75, 140, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Grounding and foundation styling */
  .content :global(.foundation-highlight) {
    background-color: rgba(139, 69, 19, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(139, 69, 19, 0.3);
  }

  .content :global(.foundation-highlight-title) {
    color: var(--education-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(139, 69, 19, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Forest and harmony styling */
  .content :global(.harmony-highlight) {
    background-color: rgba(34, 139, 34, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(34, 139, 34, 0.3);
  }

  .content :global(.harmony-highlight-title) {
    color: var(--education-nature);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(34, 139, 34, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Deep wisdom styling */
  .content :global(.deep-wisdom-highlight) {
    background-color: rgba(184, 134, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(184, 134, 11, 0.3);
  }

  .content :global(.deep-wisdom-highlight-title) {
    color: var(--education-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(184, 134, 11, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
