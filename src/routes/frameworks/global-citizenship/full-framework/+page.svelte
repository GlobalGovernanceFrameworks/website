<!-- src/routes/frameworks/global-citizenship/full-framework/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
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

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'global-citizenship-2-page-overview': "2-Page Overview",
        
        // Core framework sections (01-18)
        '01-foundational-values': "Foundational Values",
        '02-meaning-practice': "What Global Citizenship Means",
        '03-development-path': "Five-Level Development Path",
        '04-tangible-benefits': "Tangible Benefits",
        '05-overcoming-barriers': "Overcoming Barriers",
        '06-intergenerational-perspectives': "Intergenerational Perspectives",
        '07-technology-ethics': "Technology & Ethics",
        '08-measuring-impact': "Measuring Impact",
        '09-inclusive-pathways': "Inclusive Pathways",
        '10-professional-integration': "Professional Integration",
        '11-crisis-response': "Crisis Response",
        '12-ai-digital-technologies': "AI & Digital Technologies",
        '13-self-assessment-tools': "Self-Assessment Tools",
        '14-economic-foundations': "Economic Foundations",
        '15-future-proofing': "Future-Proofing",
        '16-advanced-implementation': "Advanced Implementation",
        '17-expanding-boundaries': "Expanding Boundaries",
        '18-beyond-human-centered': "Beyond Human-Centered"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'global-citizenship-2-page-overview': "2-Sidor Översikt",
        
        // Core framework sections (Swedish)
        '01-foundational-values': "Grundläggande Värderingar",
        '02-meaning-practice': "Vad Globalt Medborgarskap Betyder",
        '03-development-path': "Fem-Nivå Utvecklingsväg",
        '04-tangible-benefits': "Påtagliga Fördelar",
        '05-overcoming-barriers': "Övervinna Hinder",
        '06-intergenerational-perspectives': "Intergenerationella Perspektiv",
        '07-technology-ethics': "Teknik & Etik",
        '08-measuring-impact': "Mäta Påverkan",
        '09-inclusive-pathways': "Inkluderande Vägar",
        '10-professional-integration': "Professionell Integration",
        '11-crisis-response': "Krishantering",
        '12-ai-digital-technologies': "AI & Digital Teknik",
        '13-self-assessment-tools': "Självbedömningsverktyg",
        '14-economic-foundations': "Ekonomiska Grunder",
        '15-future-proofing': "Framtidssäkring",
        '16-advanced-implementation': "Avancerad Implementering",
        '17-expanding-boundaries': "Utvidga Gränser",
        '18-beyond-human-centered': "Bortom Människocentrerat"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Foundational Values': 'Values',
      'What Global Citizenship Means': 'Meaning & Practice',
      'Five-Level Development Path': 'Development Path',
      'Tangible Benefits': 'Benefits',
      'Overcoming Barriers': 'Barriers',
      'Intergenerational Perspectives': 'Intergenerational',
      'Technology & Ethics': 'Technology',
      'Measuring Impact': 'Impact',
      'Inclusive Pathways': 'Inclusive',
      'Professional Integration': 'Professional',
      'Crisis Response': 'Crisis',
      'AI & Digital Technologies': 'AI & Digital',
      'Self-Assessment Tools': 'Assessment',
      'Economic Foundations': 'Economics',
      'Future-Proofing': 'Future-Proofing',
      'Advanced Implementation': 'Advanced',
      'Expanding Boundaries': 'Boundaries',
      'Beyond Human-Centered': 'Beyond Human'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/global-citizenship-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `global-citizenship-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the overview version
  $: isOverviewActive = activeSection === 'global-citizenship-2-page-overview';
  $: isSupplementaryActive = ['global-citizenship-2-page-overview'].includes(activeSection);

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let practiceOpen = false;
  let advancedOpen = false;
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

  function togglePractice() {
    practiceOpen = !practiceOpen;
  }

  function toggleAdvanced() {
    advancedOpen = !advancedOpen;
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

  // Get the total number of core framework sections (01-18)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['global-citizenship-2-page-overview'].includes(section)
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Global Citizenship Framework -->
    {#if !isPrintMode && !isOverviewActive && activeSection === 'index'}
      <div class="citizenship-guide-card">
        <div class="card-content">
          <div class="card-icon">🧭</div>
          <div class="card-text">
            <h3>New to Global Citizenship?</h3>
            <p>Start with our concise 2-page overview that captures the essence of global citizenship development and its transformative potential.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('global-citizenship-2-page-overview')}>
              Read the Quick Overview <span class="arrow-icon">→</span>
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
              class:has-active={coreFrameworkSections.slice(0, 3).some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">Foundation</span>
              <span class="section-count">({coreFrameworkSections.slice(0, 3).length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(0, 3) as section}
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

          <!-- Practice Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={practiceOpen}
              class:has-active={coreFrameworkSections.slice(3, 9).some(section => activeSection === section)}
              on:click={togglePractice}
            >
              <span class="accordion-icon">🛠️</span>
              <span class="accordion-title">Practice</span>
              <span class="section-count">({coreFrameworkSections.slice(3, 9).length})</span>
              <span class="toggle-arrow" class:rotated={practiceOpen}>▼</span>
            </button>
            {#if practiceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(3, 9) as section}
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

          <!-- Advanced Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={advancedOpen}
              class:has-active={coreFrameworkSections.slice(9).some(section => activeSection === section)}
              on:click={toggleAdvanced}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">Advanced</span>
              <span class="section-count">({coreFrameworkSections.slice(9).length})</span>
              <span class="toggle-arrow" class:rotated={advancedOpen}>▼</span>
            </button>
            {#if advancedOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(9) as section}
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
                  class:active={activeSection === 'global-citizenship-2-page-overview'}
                  on:click={() => setActiveSection('global-citizenship-2-page-overview')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">2-Page Overview</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 18) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 18</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if data.sections[section]}
            <!-- Render sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of overview version -->
          {#if section === 'global-citizenship-2-page-overview' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('overview')}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-foundational-values')}>
                Continue to Full Framework <span class="arrow-icon">→</span>
              </button>
            </div>
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
              
              {#if parseInt(activeSection.substring(0, 2)) < 18}
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
        <h1>Global Citizenship Practice Framework</h1>
        <h2>Overview</h2>
        <p>The Global Citizenship Practice Framework offers a comprehensive pathway for individuals and communities to develop planetary consciousness and contribute to global transformation.</p>
        <p>This framework provides both philosophical foundation and practical guidance for living as a global citizen—recognizing our interconnection with all life while taking meaningful action for collective flourishing.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Global Citizenship Framework color scheme - cosmic blues, earth greens, wisdom golds */
  :root {
    --gc-primary: #2B4B8C; /* Cosmic Blue - global perspective, unity, interconnection */
    --gc-secondary: #6DAA3F; /* Earth Green - sustainability, growth, life */
    --gc-accent: #DAA520; /* Wisdom Gold - enlightenment, transformation, value */
    --gc-depth: #1e3a8a; /* Deep Blue - depth of understanding, contemplation */
    --gc-light: #87CEEB; /* Sky Blue - openness, possibility, horizon */
    --gc-earth: #8B4513; /* Saddle Brown - grounding, roots, cultural heritage */
    --gc-peace: #20B2AA; /* Light Sea Green - peace, harmony, cooperation */
    --gc-innovation: #9370DB; /* Medium Purple - innovation, future thinking, transcendence */
    --gc-compassion: #FF6B6B; /* Coral - compassion, care, human connection */
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
    background-color: rgba(109, 170, 63, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--gc-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(109, 170, 63, 0.1);
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
    background-color: rgba(109, 170, 63, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--gc-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--gc-depth);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1), rgba(109, 170, 63, 0.1));
    border: 1px solid rgba(43, 75, 140, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--gc-primary);
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
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--gc-primary);
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
    background: linear-gradient(90deg, rgba(43, 75, 140, 0.1), rgba(109, 170, 63, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--gc-primary);
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
    background: linear-gradient(90deg, var(--gc-primary), var(--gc-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--gc-depth);
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
    color: var(--gc-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--gc-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--gc-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--gc-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(109, 170, 63, 0.1);
    border-left: 4px solid var(--gc-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--gc-depth);
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
    color: var(--gc-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--gc-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with global citizenship themed bullets */
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

  /* Apply global citizenship symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌍";
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
    color: var(--gc-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🤝";
    color: var(--gc-peace);
  }

  /* Table styles for global citizenship framework */
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
    background: linear-gradient(to right, var(--gc-primary), var(--gc-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--gc-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(109, 170, 63, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(109, 170, 63, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Global citizenship framework guide card */
  .citizenship-guide-card {
    background: linear-gradient(135deg, rgba(109, 170, 63, 0.1) 0%, rgba(43, 75, 140, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    border: 1px solid rgba(43, 75, 140, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .citizenship-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(43, 75, 140, 0.3);
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
    color: var(--gc-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--gc-primary);
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
    background-color: var(--gc-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--gc-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--gc-primary);
    border: 1px solid var(--gc-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(109, 170, 63, 0.1);
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
    color: var(--gc-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--gc-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--gc-primary);
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
    color: var(--gc-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--gc-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--gc-secondary);
    border-bottom-color: var(--gc-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--gc-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--gc-primary);
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
    background-color: var(--gc-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--gc-depth);
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
   background-color: rgba(109, 170, 63, 0.1) !important;
   color: var(--gc-primary) !important;
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
   background-color: rgba(109, 170, 63, 0.1) !important;
   color: var(--gc-primary) !important;
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
   background-color: rgba(109, 170, 63, 0.1);
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

 /* Global Citizenship Framework specific theme elements */

 /* Special callouts for global citizenship concepts */
 .content :global(.values-callout) {
   background-color: rgba(218, 165, 32, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-accent);
 }

 .content :global(.development-callout) {
   background-color: rgba(109, 170, 63, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-secondary);
 }

 .content :global(.global-perspective-callout) {
   background-color: rgba(43, 75, 140, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-primary);
 }

 .content :global(.interconnection-callout) {
   background-color: rgba(32, 178, 170, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-peace);
 }

 /* Special styling for case studies */
 .content :global(.case-study) {
   background-color: rgba(147, 112, 219, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-innovation);
 }

 .content :global(.case-study-title) {
   color: var(--gc-innovation);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Alert/warning styling */
 .content :global(.alert) {
   background-color: rgba(255, 107, 107, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--gc-compassion);
 }

 .content :global(.alert-title) {
   color: var(--gc-compassion);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Highlight boxes for important global citizenship concepts */
 .content :global(.concept-highlight) {
   background-color: rgba(109, 170, 63, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(109, 170, 63, 0.3);
 }

 .content :global(.concept-highlight-title) {
   color: var(--gc-secondary);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(109, 170, 63, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Values and principles styling */
 .content :global(.values-highlight) {
   background-color: rgba(218, 165, 32, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(218, 165, 32, 0.3);
 }

 .content :global(.values-highlight-title) {
   color: var(--gc-accent);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(218, 165, 32, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Global perspective and worldview styling */
 .content :global(.perspective-highlight) {
   background-color: rgba(43, 75, 140, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(43, 75, 140, 0.3);
 }

 .content :global(.perspective-highlight-title) {
   color: var(--gc-primary);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(43, 75, 140, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Peace and cooperation styling */
 .content :global(.peace-highlight) {
   background-color: rgba(32, 178, 170, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(32, 178, 170, 0.3);
 }

 .content :global(.peace-highlight-title) {
   color: var(--gc-peace);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(32, 178, 170, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Innovation and future-thinking styling */
 .content :global(.innovation-highlight) {
   background-color: rgba(147, 112, 219, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(147, 112, 219, 0.3);
 }

 .content :global(.innovation-highlight-title) {
   color: var(--gc-innovation);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(147, 112, 219, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Compassion and care styling */
 .content :global(.compassion-highlight) {
   background-color: rgba(255, 107, 107, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(255, 107, 107, 0.3);
 }

 .content :global(.compassion-highlight-title) {
   color: var(--gc-compassion);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(255, 107, 107, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Cultural heritage and grounding styling */
 .content :global(.heritage-highlight) {
   background-color: rgba(139, 69, 19, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(139, 69, 19, 0.3);
 }

 .content :global(.heritage-highlight-title) {
   color: var(--gc-earth);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(139, 69, 19, 0.3);
   padding-bottom: 0.5rem;
 }
</style>
