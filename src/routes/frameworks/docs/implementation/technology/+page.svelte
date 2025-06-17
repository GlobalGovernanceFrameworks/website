<!-- src/routes/frameworks/docs/implementation/technology/+page.svelte -->
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
      // Default to index if no section is specified
      else {
        setActiveSection('index');
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
        'introduction': "Introduction & Core Principles", 
        'context': "Context & Scope",
        'governance-model': "Governance Model Components",
        'implementation': "Implementation Roadmap",
        'tools': "Tools & Technologies",
        'operational': "Operational Guidelines",
        'emerging': "Emerging Technology Anticipation",
        'evaluation': "Evaluation & Metrics",
        'case-studies': "Case Studies & Examples",
        'appendices': "Appendices & Resources"
      },
      sv: {
        'index': "Ramverköversikt",
        'introduction': "Introduktion & grundprinciper",
        'context': "Sammanhang & omfattning", 
        'governance-model': "Styrningsmodellkomponenter",
        'implementation': "Implementeringsplan",
        'tools': "Verktyg & teknologier",
        'operational': "Operativa riktlinjer",
        'emerging': "Förutseende av ny teknik",
        'evaluation': "Utvärdering & mätmetoder",
        'case-studies': "Fallstudier & exempel",
        'appendices': "Bilagor & resurser"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section);
    
    const shortTitles = {
      'Framework Overview': 'Overview',
      'Introduction & Core Principles': 'Introduction',
      'Context & Scope': 'Context',
      'Governance Model Components': 'Governance Model',
      'Implementation Roadmap': 'Implementation',
      'Tools & Technologies': 'Tools',
      'Operational Guidelines': 'Operations',
      'Emerging Technology Anticipation': 'Emerging Tech',
      'Evaluation & Metrics': 'Evaluation',
      'Case Studies & Examples': 'Case Studies',
      'Appendices & Resources': 'Appendices'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  // For handling dropdown states and accordion states
  let foundationOpen = true; // Start with foundation open
  let structureOpen = false;
  let operationOpen = false;
  let adaptationOpen = false;
  let learningOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleStructure() {
    structureOpen = !structureOpen;
  }

  function toggleOperation() {
    operationOpen = !operationOpen;
  }

  function toggleAdaptation() {
    adaptationOpen = !adaptationOpen;
  }

  function toggleLearning() {
    learningOpen = !learningOpen;
  }

  // Get the core framework sections in order (excluding index since it's the overview)
  $: coreFrameworkSections = ['introduction', 'context', 'governance-model', 'implementation', 'tools', 'operational', 'emerging', 'evaluation', 'case-studies', 'appendices'];

  // Check if this is a core framework section (not including index)
  $: isCoreSection = coreFrameworkSections.includes(activeSection) && activeSection !== 'index';

  // Get current section index for progress
  $: currentSectionIndex = coreFrameworkSections.indexOf(activeSection);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to Technology Governance Implementation Framework?",
        startWithIntroduction: "Start with our introduction that explains the framework's vision, core principles, and comprehensive approach to technology governance.",
        readIntroduction: "Read the Introduction",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundationTitle: "Foundation & Understanding",
        structureTitle: "Building Governance Systems", 
        operationTitle: "Making Governance Work",
        adaptationTitle: "Staying Ahead",
        learningTitle: "Learning & Improvement"
      },
      sv: {
        newToFramework: "Ny inom teknikstyrningsimplementeringsramverket?",
        startWithIntroduction: "Börja med vår introduktion som förklarar ramverkets vision, grundprinciper och omfattande metod för teknikstyrning.",
        readIntroduction: "Läs introduktionen",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        foundationTitle: "Grund & förståelse",
        structureTitle: "Bygga styrningssystem",
        operationTitle: "Få styrning att fungera",
        adaptationTitle: "Hålla sig i framkant",
        learningTitle: "Lärande & förbättring"
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
    <!-- Quick Access Card for Tech Governance Framework -->
    {#if !isPrintMode && activeSection === 'index'}
      <div class="tech-guide-card">
        <div class="card-content">
          <div class="card-icon">⚙️</div>
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

          <!-- Foundation & Understanding Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={['introduction', 'context'].includes(activeSection)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🧭</span>
              <span class="accordion-title">{getLocalizedText('foundationTitle')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['introduction', 'context'] as section}
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

          <!-- Building Governance Systems Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={structureOpen}
              class:has-active={['governance-model', 'implementation'].includes(activeSection)}
              on:click={toggleStructure}
            >
              <span class="accordion-icon">🏗️</span>
              <span class="accordion-title">{getLocalizedText('structureTitle')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={structureOpen}>▼</span>
            </button>
            {#if structureOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['governance-model', 'implementation'] as section}
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

          <!-- Making Governance Work Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={operationOpen}
              class:has-active={['tools', 'operational'].includes(activeSection)}
              on:click={toggleOperation}
            >
              <span class="accordion-icon">⚙️</span>
              <span class="accordion-title">{getLocalizedText('operationTitle')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={operationOpen}>▼</span>
            </button>
            {#if operationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['tools', 'operational'] as section}
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

          <!-- Staying Ahead Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={adaptationOpen}
              class:has-active={['emerging', 'evaluation'].includes(activeSection)}
              on:click={toggleAdaptation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getLocalizedText('adaptationTitle')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={adaptationOpen}>▼</span>
            </button>
            {#if adaptationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['emerging', 'evaluation'] as section}
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

          <!-- Learning & Improvement Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={learningOpen}
              class:has-active={['case-studies', 'appendices'].includes(activeSection)}
              on:click={toggleLearning}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">{getLocalizedText('learningTitle')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={learningOpen}>▼</span>
            </button>
            {#if learningOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['case-studies', 'appendices'] as section}
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
        </div>
      {/if}

      <!-- Progress indicator for core sections (not index) -->
      {#if !isPrintMode && isCoreSection}
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
          
          <!-- Section navigation at bottom of core sections (not index) -->
          {#if isCoreSection && !isPrintMode}
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
  /* Technology Governance color scheme - inspired by innovation, stability, and responsibility */
  :root {
    --tech-primary: #2B4B8C; /* Cosmic Blue - stability, trust, governance */
    --tech-secondary: #6b7280; /* Grounding Gray - balance, neutrality */
    --tech-innovation: #6B5CA5; /* Innovation Purple - creativity, technology */
    --tech-ethics: #4B5CA5; /* Ethics Purple - values, responsibility */
    --tech-governance: #2D5F2D; /* Governance Green - sustainability, oversight */
    --tech-responsibility: #C43B3B; /* Responsibility Red - urgency, accountability */
    --tech-progress: #DAA520; /* Progress Gold - advancement, achievement */
    --tech-systems: #1E6B96; /* Systems Blue - integration, connectivity */
    --tech-adaptation: #8B4513; /* Adaptation Brown - stability, resilience */
    --tech-future: #6DAA3F; /* Future Green - growth, evolution */
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
    background-color: rgba(43, 75, 140, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--tech-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(43, 75, 140, 0.1);
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
    background-color: rgba(43, 75, 140, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--tech-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--tech-innovation);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1), rgba(107, 92, 165, 0.1));
    border: 1px solid rgba(43, 75, 140, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--tech-primary);
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
    background: linear-gradient(90deg, rgba(43, 75, 140, 0.1), rgba(107, 92, 165, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--tech-primary);
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
    background: linear-gradient(90deg, var(--tech-primary), var(--tech-innovation));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--tech-primary);
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
  
  /* Additional styles for markdown content with Tech Governance theme */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--tech-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--tech-innovation);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--tech-ethics);
  }

  /* Styling for h4 headers */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--tech-systems);
  }

  /* Styling for blockquote - representing governance wisdom */
  :global(blockquote) {
    background-color: rgba(43, 75, 140, 0.05);
    border-left: 4px solid var(--tech-governance);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    position: relative;
  }

  :global(blockquote::before) {
    content: "⚙️";
    position: absolute;
    left: -12px;
    top: 8px;
    background: white;
    padding: 2px;
    border-radius: 50%;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--tech-primary);
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
    color: var(--tech-ethics);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--tech-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with tech governance themed symbols */
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

  /* Apply gear symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    top: 0.1em;
    color: var(--tech-progress);
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
    color: var(--tech-ethics);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🔹";
    color: var(--tech-governance);
  }

  /* Table styles for tech governance framework */
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
    background: linear-gradient(to right, var(--tech-primary), var(--tech-innovation));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--tech-primary);
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
  
  /* Tech governance framework guide card */
  .tech-guide-card {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.08) 0%, rgba(107, 92, 165, 0.08) 100%);
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
    color: var(--tech-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--tech-primary);
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
    background-color: var(--tech-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--tech-innovation);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--tech-primary);
    border: 1px solid var(--tech-primary);
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
    color: var(--tech-ethics);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--tech-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--tech-governance);
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
    color: var(--tech-systems);
    text-decoration: none;
    border-bottom: 1px dotted var(--tech-systems);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--tech-ethics);
    border-bottom-color: var(--tech-ethics);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--tech-ethics);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--tech-primary);
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
    background-color: var(--tech-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--tech-innovation);
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

  /* Tech Governance Framework specific theme elements */

  /* Special callouts for tech governance concepts */
  .content :global(.governance-callout) {
    background-color: rgba(43, 75, 140, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-primary);
  }

  .content :global(.innovation-callout) {
    background-color: rgba(107, 92, 165, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-innovation);
  }

  .content :global(.ethics-callout) {
    background-color: rgba(75, 92, 165, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-ethics);
  }

  .content :global(.responsibility-callout) {
    background-color: rgba(218, 165, 32, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-progress);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(30, 107, 150, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-systems);
  }

  .content :global(.case-study-title) {
    color: var(--tech-systems);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--tech-responsibility);
  }

  .content :global(.alert-title) {
    color: var(--tech-responsibility);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important tech governance concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(43, 75, 140, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(43, 75, 140, 0.2);
  }

  .content :global(.concept-highlight-title) {
    color: var(--tech-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(43, 75, 140, 0.2);
    padding-bottom: 0.5rem;
  }

  /* AI governance highlight styling */
  .content :global(.ai-governance-highlight) {
    background-color: rgba(107, 92, 165, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(107, 92, 165, 0.2);
  }

  .content :global(.ai-governance-highlight-title) {
    color: var(--tech-innovation);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(107, 92, 165, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Stakeholder engagement styling */
  .content :global(.stakeholder-highlight) {
    background-color: rgba(45, 95, 45, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(45, 95, 45, 0.2);
  }

  .content :global(.stakeholder-highlight-title) {
    color: var(--tech-governance);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(45, 95, 45, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Risk assessment styling */
  .content :global(.risk-highlight) {
    background-color: rgba(196, 59, 59, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(196, 59, 59, 0.2);
  }

  .content :global(.risk-highlight-title) {
    color: var(--tech-responsibility);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(196, 59, 59, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Emerging technology styling */
  .content :global(.emerging-highlight) {
    background-color: rgba(109, 170, 63, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(109, 170, 63, 0.2);
  }

  .content :global(.emerging-highlight-title) {
    color: var(--tech-future);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(109, 170, 63, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Implementation guidance styling */
  .content :global(.implementation-highlight) {
    background-color: rgba(218, 165, 32, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(218, 165, 32, 0.2);
  }

  .content :global(.implementation-highlight-title) {
    color: var(--tech-progress);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(218, 165, 32, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Debug info styling */
  .debug-info {
    background-color: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    font-family: monospace;
  }

  .debug-info code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
</style>
