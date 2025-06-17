<!-- src/routes/frameworks/docs/implementation/disaster/+page.svelte -->
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

  // Handle print mode only on client side
  $: isPrintMode = browser && $page.url.searchParams.get('print') === 'true';

  // Make this function available globally for the PDF generator
  if (browser) {
    window.showAllSectionsForPrint = () => {
      sectionsToShow = Object.keys(data.sections || {});
    };
  }

  // This needs to be a reactive statement - use $: to make it update when activeSection changes
  $: sectionsToShow = isPrintMode 
    ? Object.keys(data.sections || {}) 
    : [activeSection];

  $: if (browser && $locale) {
    invalidate('app:locale');
  }

  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        'index': "Framework Overview",
        'introduction': "Introduction & Context", 
        'principles': "Guiding Principles",
        'components': "Framework Components",
        'approaches': "Implementation Approaches",
        'engagement': "Collaborative Engagement",
        'barriers': "Implementation Barriers",
        'resources': "Resource Requirements",
        'monitoring': "Monitoring & Evaluation",
        'governance': "Innovative Governance",
        'scalability': "Scalability & Adaptation",
        'conclusion': "Conclusion",
        'annexes': "Annexes & Resources"
      },
      sv: {
        'index': "Ramverköversikt",
        'introduction': "Introduktion & sammanhang",
        'principles': "Vägledande principer", 
        'components': "Ramverkskomponenter",
        'approaches': "Implementeringsmetoder",
        'engagement': "Samarbetsengagemang",
        'barriers': "Implementeringshinder",
        'resources': "Resurskrav",
        'monitoring': "Övervakning & utvärdering",
        'governance': "Innovativ styrning",
        'scalability': "Skalbarhet & anpassning",
        'conclusion': "Slutsats",
        'annexes': "Bilagor & resurser"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section);
    
    const shortTitles = {
      'Framework Overview': 'Overview',
      'Introduction & Context': 'Introduction',
      'Guiding Principles': 'Principles',
      'Framework Components': 'Components',
      'Implementation Approaches': 'Approaches',
      'Collaborative Engagement': 'Engagement',
      'Implementation Barriers': 'Barriers',
      'Resource Requirements': 'Resources',
      'Monitoring & Evaluation': 'Monitoring',
      'Innovative Governance': 'Governance',
      'Scalability & Adaptation': 'Scalability',
      'Conclusion': 'Conclusion',
      'Annexes & Resources': 'Annexes'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  // For handling dropdown states and accordion states
  let foundationOpen = true; // Start with foundation open
  let frameworkOpen = false;
  let implementationOpen = false;
  let advancedOpen = false;
  let synthesisOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleFramework() {
    frameworkOpen = !frameworkOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleAdvanced() {
    advancedOpen = !advancedOpen;
  }

  function toggleSynthesis() {
    synthesisOpen = !synthesisOpen;
  }

  // Get the core framework sections in order
  $: coreFrameworkSections = ['introduction', 'principles', 'components', 'approaches', 'engagement', 'barriers', 'resources', 'monitoring', 'governance', 'scalability', 'conclusion', 'annexes'];

  // Check if this is a core framework section
  $: isCoreSection = coreFrameworkSections.includes(activeSection);

  // Get current section index for progress
  $: currentSectionIndex = coreFrameworkSections.indexOf(activeSection);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to Disaster Risk Reduction & Resilience Framework?",
        startWithIntroduction: "Start with our introduction that explains the framework's vision, global context, and collaborative development approach.",
        readIntroduction: "Read the Introduction",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundationTitle: "Foundation & Principles",
        frameworkTitle: "Core Framework",
        implementationTitle: "Implementation Guidance", 
        advancedTitle: "Advanced Implementation",
        synthesisTitle: "Synthesis & Resources"
      },
      sv: {
        newToFramework: "Ny inom katastrofriskminskning & motståndskraftsramverket?",
        startWithIntroduction: "Börja med vår introduktion som förklarar ramverkets vision, globala sammanhang och samarbetsutvecklingsmetod.",
        readIntroduction: "Läs introduktionen",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        foundationTitle: "Grund & principer",
        frameworkTitle: "Kärnramverk",
        implementationTitle: "Implementeringsvägledning",
        advancedTitle: "Avancerad implementering", 
        synthesisTitle: "Syntes & resurser"
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }
</script>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for DRR Framework -->
    {#if !isPrintMode && activeSection === 'index'}
      <div class="drr-guide-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithIntroduction')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('introduction')}>
              {getLocalizedText('readIntroduction')} <span class="arrow-icon">→</span>
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

        <!-- Foundation & Principles Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={foundationOpen}
            class:has-active={['introduction', 'principles'].includes(activeSection)}
            on:click={toggleFoundation}
          >
            <span class="accordion-icon">🌟</span>
            <span class="accordion-title">{getLocalizedText('foundationTitle')}</span>
            <span class="section-count">(2)</span>
            <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
          </button>
          {#if foundationOpen}
            <div class="accordion-content" transition:slide={{ duration: 200 }}>
              {#each ['introduction', 'principles'] as section}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === section}
                  on:click={() => setActiveSection(section)}
                >
                  <span class="nav-icon">🔹</span>
                  <span class="nav-title">{getShortSectionTitle(section)}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Core Framework Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={frameworkOpen}
            class:has-active={['components', 'approaches', 'engagement'].includes(activeSection)}
            on:click={toggleFramework}
          >
            <span class="accordion-icon">🏗️</span>
            <span class="accordion-title">{getLocalizedText('frameworkTitle')}</span>
            <span class="section-count">(3)</span>
            <span class="toggle-arrow" class:rotated={frameworkOpen}>▼</span>
          </button>
          {#if frameworkOpen}
            <div class="accordion-content" transition:slide={{ duration: 200 }}>
              {#each ['components', 'approaches', 'engagement'] as section}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === section}
                  on:click={() => setActiveSection(section)}
                >
                  <span class="nav-icon">🔹</span>
                  <span class="nav-title">{getShortSectionTitle(section)}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Implementation Guidance Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={implementationOpen}
            class:has-active={['barriers', 'resources', 'monitoring'].includes(activeSection)}
            on:click={toggleImplementation}
          >
            <span class="accordion-icon">🚀</span>
            <span class="accordion-title">{getLocalizedText('implementationTitle')}</span>
            <span class="section-count">(3)</span>
            <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
          </button>
          {#if implementationOpen}
            <div class="accordion-content" transition:slide={{ duration: 200 }}>
              {#each ['barriers', 'resources', 'monitoring'] as section}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === section}
                  on:click={() => setActiveSection(section)}
                >
                  <span class="nav-icon">🔹</span>
                  <span class="nav-title">{getShortSectionTitle(section)}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Advanced Implementation Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={advancedOpen}
            class:has-active={['governance', 'scalability'].includes(activeSection)}
            on:click={toggleAdvanced}
          >
            <span class="accordion-icon">⚙️</span>
            <span class="accordion-title">{getLocalizedText('advancedTitle')}</span>
            <span class="section-count">(2)</span>
            <span class="toggle-arrow" class:rotated={advancedOpen}>▼</span>
          </button>
          {#if advancedOpen}
            <div class="accordion-content" transition:slide={{ duration: 200 }}>
              {#each ['governance', 'scalability'] as section}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === section}
                  on:click={() => setActiveSection(section)}
                >
                  <span class="nav-icon">🔹</span>
                  <span class="nav-title">{getShortSectionTitle(section)}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Synthesis & Resources Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={synthesisOpen}
            class:has-active={['conclusion', 'annexes'].includes(activeSection)}
            on:click={toggleSynthesis}
          >
            <span class="accordion-icon">📚</span>
            <span class="accordion-title">{getLocalizedText('synthesisTitle')}</span>
            <span class="section-count">(2)</span>
            <span class="toggle-arrow" class:rotated={synthesisOpen}>▼</span>
          </button>
          {#if synthesisOpen}
            <div class="accordion-content" transition:slide={{ duration: 200 }}>
              {#each ['conclusion', 'annexes'] as section}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === section}
                  on:click={() => setActiveSection(section)}
                >
                  <span class="nav-icon">{section === 'conclusion' ? '✨' : '📄'}</span>
                  <span class="nav-title">{getShortSectionTitle(section)}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection && activeSection !== 'index'}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((currentSectionIndex + 1) / coreFrameworkSections.length) * 100}%"></div>
          </div>
          <span class="progress-text">Section {currentSectionIndex + 1} of {coreFrameworkSections.length}</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if data.sections[section]}
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Section navigation at bottom of core sections -->
          {#if isCoreSection && !isPrintMode && activeSection !== 'index'}
            <div class="section-navigation">
              {#if currentSectionIndex > 0}
                <button class="nav-btn prev-btn" on:click={() => {
                  const prevSection = coreFrameworkSections[currentSectionIndex - 1];
                  setActiveSection(prevSection);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if currentSectionIndex < coreFrameworkSections.length - 1}
                <button class="nav-btn next-btn" on:click={() => {
                  const nextSection = coreFrameworkSections[currentSectionIndex + 1];
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
      <svelte:component this={data.component} />
    {/if}
  </div>
</div>

<style>
  /* DRR Framework color scheme - inspired by earth, climate, and resilience */
  :root {
    --drr-primary: #2B4B8C; /* Cosmic Blue - stability, trust, governance */
    --drr-secondary: #6b7280; /* Grounding Gray - balance, neutrality */
    --drr-earth: #2D5F2D; /* Earthy Green - nature, sustainability, ecosystems */
    --drr-climate: #4B5CA5; /* Climate Purple - adaptation, transformation */
    --drr-community: #C43B3B; /* Community Red - urgency, action, solidarity */
    --drr-resilience: #DAA520; /* Resilience Gold - hope, strength, recovery */
    --drr-water: #1E6B96; /* Water Blue - flow, adaptation, life */
    --drr-wisdom: #8B4513; /* Wisdom Brown - indigenous knowledge, grounding */
    --drr-healing: #6DAA3F; /* Healing Green - recovery, regeneration */
    --drr-innovation: #9370DB; /* Innovation Purple - creativity, solutions */
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
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--drr-primary);
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
    background-color: var(--drr-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--drr-earth);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1), rgba(45, 95, 45, 0.1));
    border: 1px solid rgba(43, 75, 140, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--drr-primary);
    color: white;
  }

  .subsection-item {
    padding-left: 1.5rem;
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-title {
    flex-grow: 1;
    text-align: left;
  }

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(43, 75, 140, 0.1), rgba(45, 95, 45, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--drr-primary);
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
    background: linear-gradient(90deg, var(--drr-primary), var(--drr-earth));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--drr-primary);
    font-weight: 500;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem;
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
  
  /* Additional styles for markdown content with DRR theme */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--drr-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--drr-earth);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--drr-climate);
  }

  /* Styling for h4 headers */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--drr-water);
  }

  /* Styling for blockquote - representing community wisdom */
  :global(blockquote) {
    background-color: rgba(43, 75, 140, 0.05);
    border-left: 4px solid var(--drr-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    position: relative;
  }

  :global(blockquote::before) {
    content: "🌍";
    position: absolute;
    left: -12px;
    top: 8px;
    background: white;
    padding: 2px;
    border-radius: 50%;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--drr-primary);
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
    color: var(--drr-climate);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--drr-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with DRR themed symbols */
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

  /* Apply shield symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🛡️";
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
    color: var(--drr-climate);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🔹";
    color: var(--drr-earth);
  }

  /* Table styles for DRR framework */
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
    background: linear-gradient(to right, var(--drr-primary), var(--drr-earth));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--drr-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(43, 75, 140, 0.03);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(43, 75, 140, 0.08);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* For responsive tables on small screens */
  @media (max-width: 640px) {
    :global(.content table) {
      display: block;
      overflow-x: auto;
    }
    
    :global(.content th),
    :global(.content td) {
      white-space: nowrap;
    }
  }
  
  /* DRR framework guide card */
  .drr-guide-card {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.08) 0%, rgba(45, 95, 45, 0.08) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    border: 1px solid rgba(43, 75, 140, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
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
    color: var(--drr-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--drr-primary);
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
    background-color: var(--drr-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--drr-earth);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--drr-primary);
    border: 1px solid var(--drr-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.08);
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
    color: var(--drr-climate);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--drr-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--drr-earth);
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
    color: var(--drr-water);
    text-decoration: none;
    border-bottom: 1px dotted var(--drr-water);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--drr-climate);
    border-bottom-color: var(--drr-climate);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--drr-climate);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--drr-primary);
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
    background-color: var(--drr-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--drr-earth);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
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
    
    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }
  }

  /* DRR Framework specific theme elements */

  /* Special callouts for DRR concepts */
  .content :global(.resilience-callout) {
    background-color: rgba(43, 75, 140, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-primary);
  }

  .content :global(.community-callout) {
    background-color: rgba(45, 95, 45, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-earth);
  }

  .content :global(.climate-callout) {
    background-color: rgba(75, 92, 165, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-climate);
  }

  .content :global(.innovation-callout) {
    background-color: rgba(218, 165, 32, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-resilience);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(30, 107, 150, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-water);
  }

  .content :global(.case-study-title) {
    color: var(--drr-water);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--drr-community);
  }

  .content :global(.alert-title) {
    color: var(--drr-community);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important DRR concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(43, 75, 140, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(43, 75, 140, 0.2);
  }

  .content :global(.concept-highlight-title) {
    color: var(--drr-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(43, 75, 140, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Indigenous knowledge integration styling */
  .content :global(.indigenous-knowledge-highlight) {
    background-color: rgba(139, 69, 19, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(139, 69, 19, 0.2);
  }

  .content :global(.indigenous-knowledge-highlight-title) {
    color: var(--drr-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(139, 69, 19, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Ecosystem-based solutions styling */
  .content :global(.ecosystem-highlight) {
    background-color: rgba(109, 170, 63, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(109, 170, 63, 0.2);
  }

  .content :global(.ecosystem-highlight-title) {
    color: var(--drr-healing);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(109, 170, 63, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Gender-responsive and inclusive DRR styling */
  .content :global(.inclusive-highlight) {
    background-color: rgba(147, 112, 219, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(147, 112, 219, 0.2);
  }

  .content :global(.inclusive-highlight-title) {
    color: var(--drr-innovation);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(147, 112, 219, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Climate adaptation styling */
  .content :global(.adaptation-highlight) {
    background-color: rgba(30, 107, 150, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(30, 107, 150, 0.2);
  }

  .content :global(.adaptation-highlight-title) {
    color: var(--drr-water);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(30, 107, 150, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Conflict-sensitive DRR styling */
  .content :global(.conflict-sensitive-highlight) {
    background-color: rgba(196, 59, 59, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(196, 59, 59, 0.2);
  }

  .content :global(.conflict-sensitive-highlight-title) {
    color: var(--drr-community);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(196, 59, 59, 0.2);
    padding-bottom: 0.5rem;
  }
</style>
