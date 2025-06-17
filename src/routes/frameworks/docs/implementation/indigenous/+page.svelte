<!-- src/routes/frameworks/docs/implementation/indigenous/+page.svelte -->
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

  // Group sections logically with multi-lingual support
  function getSectionCategoryTitle(category) {
    const categoryTitles = {
      en: {
        overview: "Overview",
        architecture: "Governance Architecture",
        foundation: "Sacred Foundation",
        implementation: "Implementation & Systems", 
        connections: "Sacred Connections",
        resources: "Resources",
      },
      sv: {
        overview: "Översikt",
        architecture: "Styrningsarkitektur",
        foundation: "Helig grund",
        implementation: "Implementering & system", 
        connections: "Heliga kopplingar",
        resources: "Resurser",
      }
    };
    
    return (categoryTitles[currentLocale] || categoryTitles.en)[category] || category;
  }

  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Swedish translations for the introduction section
  const introSv = {
    title: "Ursprungsfolk & Traditionell Kunskap Styrningsramverk",
    overview: "Översikt",
    paragraph1: "Ursprungsfolk & Traditionell Kunskap Styrningsramverket framträder som en revolutionär plan för planetär transformation, som positionerar ursprungsfolk inte som intressenter att konsultera, utan som de suveräna arkitekterna av regenerativa styrningssystem.",
    paragraph2: "Detta ramverk är förankrat i dekolonisering, ekologisk regeneration och solidaritet efter människan, och centrerar ursprungsfolks suveränitet, ekologisk visdom och långsiktig hållbarhet som grunden för planetär läkning."
  };

  // English translations as fallback
  const introEn = {
    title: "Indigenous & Traditional Knowledge Governance Framework",
    overview: "Overview",
    paragraph1: "The Indigenous & Traditional Knowledge Governance Framework emerges as a revolutionary blueprint for planetary transformation, positioning Indigenous peoples not as stakeholders to consult, but as the sovereign architects of regenerative governance systems.",
    paragraph2: "Rooted in decolonization, ecological regeneration, and post-human solidarity, this framework centers Indigenous sovereignty, ecological wisdom, and long-term sustainability as the foundation for planetary healing."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        '00-preamble': "Preamble: A Framework Born from the Land",
        
        // Core framework sections (01-10)
        '01-core-principles': "Core Principles: The Ancient Instructions",
        '02-structural-components': "Structural Components: Sacred Architecture",
        '03-implementation-timeline': "Implementation Timeline: Seven Generations",
        '04-key-mechanisms': "Key Mechanisms: Sacred Technologies",
        '05-expected-outcomes': "Expected Outcomes: Regenerative Future",
        '06-interface-existing-systems': "Interface with Colonial Systems",
        '07-pathways-broader-engagement': "Pathways for Allied Engagement",
        '08-documentation-risk-assessment': "Documentation & Risk Assessment",
        '09-system-map-visual': "System Map: The Sacred Web",
        '10-glossary-references': "Glossary & References",
        
        // Essential guide
        'indigenous-framework-essentials': "Framework Essentials Guide"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        '00-preamble': "Förord: Ett ramverk fött från jorden",
        
        // Core framework sections (Swedish)
        '01-core-principles': "Kärnprinciper: De urgamla instruktionerna",
        '02-structural-components': "Strukturella komponenter: Helig arkitektur",
        '03-implementation-timeline': "Implementeringstidslinje: Sju generationer",
        '04-key-mechanisms': "Nyckelmekanismer: Heliga teknologier",
        '05-expected-outcomes': "Förväntade resultat: Regenerativ framtid",
        '06-interface-existing-systems': "Gränssnitt med koloniala system",
        '07-pathways-broader-engagement': "Vägar för allierat engagemang",
        '08-documentation-risk-assessment': "Dokumentation & riskbedömning",
        '09-system-map-visual': "Systemkarta: Det heliga nätverket",
        '10-glossary-references': "Ordlista & Referenser",
        
        // Essential guide
        'indigenous-framework-essentials': "Ramverk Grundläggande Guide"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      en: {
        'Core Principles: The Ancient Instructions': 'Ancient Instructions',
        'Structural Components: Sacred Architecture': 'Sacred Architecture',
        'Implementation Timeline: Seven Generations': 'Seven Generations',
        'Key Mechanisms: Sacred Technologies': 'Sacred Technologies',
        'Expected Outcomes: Regenerative Future': 'Regenerative Future',
        'Interface with Colonial Systems': 'Colonial Interface',
        'Pathways for Allied Engagement': 'Allied Engagement',
        'Documentation & Risk Assessment': 'Documentation',
        'System Map: The Sacred Web': 'Sacred Web',
        'Glossary & References': 'Glossary',
        'Framework Essentials Guide': 'Essentials Guide'
      },
      sv: {
        'Kärnprinciper: De urgamla instruktionerna': 'Urgamla instruktioner',
        'Strukturella komponenter: Helig arkitektur': 'Helig arkitektur',
        'Implementeringstidslinje: Sju generationer': 'Sju generationer',
        'Nyckelmekanismer: Heliga teknologier': 'Heliga teknologier',
        'Förväntade resultat: Regenerativ framtid': 'Regenerativ framtid',
        'Gränssnitt med koloniala system': 'Kolonialt gränssnitt',
        'Vägar för allierat engagemang': 'Allierat engagemang',
        'Dokumentation & riskbedömning': 'Dokumentation',
        'Systemkarta: Det heliga nätverket': 'Heligt nätverk',
        'Ordlista & Referenser': 'Ordlista',
        'Ramverk Grundläggande Guide': 'Grundguide'
      }
    };
    
    return (shortTitles[currentLocale] || shortTitles.en)[fullTitle] || fullTitle;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/indigenous-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `indigenous-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the essentials version
  $: isEssentialsActive = activeSection === 'indigenous-framework-essentials';
  $: isSupplementaryActive = ['10-glossary-references', 'indigenous-framework-essentials'].includes(activeSection);

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let governanceOpen = false;
  let implementationOpen = false;
  let connectionOpen = false;
  let resourcesOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleGovernance() {
    governanceOpen = !governanceOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleConnection() {
    connectionOpen = !connectionOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

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

  // Define section groupings for the Indigenous framework
  const sectionGroups = {
    foundation: ['00-preamble', '01-core-principles'],
    governance: ['02-structural-components', '03-implementation-timeline', '04-key-mechanisms'],
    implementation: ['05-expected-outcomes', '06-interface-existing-systems'],
    connection: ['07-pathways-broader-engagement', '08-documentation-risk-assessment', '09-system-map-visual'],
    resources: ['10-glossary-references']
  };

  // Define which sections are "core" for progress tracking (excluding essentials guide)
  const coreSections = [
    ...sectionGroups.foundation,
    ...sectionGroups.governance, 
    ...sectionGroups.implementation,
    ...sectionGroups.connection,
    ...sectionGroups.resources
  ];

  // Check if current section is a core section
  $: isCoreSection = coreSections.includes(activeSection);

  // Calculate progress
  $: currentCoreIndex = coreSections.indexOf(activeSection) + 1;
  $: totalCoreSections = coreSections.length;
  $: coreProgress = isCoreSection ? currentCoreIndex / totalCoreSections : 0;

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to Indigenous Governance Framework?",
        startWithEssentials: "Start with our accessible essentials guide that explains the framework's core principles and Indigenous-led transformation pathway.",
        readEssentials: "Read the Framework Essentials",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        resources: "Resources",
        appendicesTools: "Glossary & References",
        frameworkEssentials: "Framework Essentials"
      },
      sv: {
        newToFramework: "Ny inom ursprungsfolks styrningsramverk?",
        startWithEssentials: "Börja med vår tillgängliga grundguide som förklarar ramverkets kärnprinciper och ursprungsfolksledda transformationsväg.",
        readEssentials: "Läs Ramverkets Grundläggande",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till Fullständigt Ramverk",
        resources: "Resurser",
        appendicesTools: "Ordlista & Referenser",
        frameworkEssentials: "Ramverk Grundläggande"
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Indigenous Framework -->
    {#if !isPrintMode && !isEssentialsActive && activeSection === 'index'}
      <div class="indigenous-guide-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithEssentials')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('indigenous-framework-essentials')}>
              {getLocalizedText('readEssentials')} <span class="arrow-icon">→</span>
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
              <span class="nav-title">{getSectionCategoryTitle('overview')}</span>
            </button>
          </div>

          <!-- Foundation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={sectionGroups.foundation.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
              <span class="section-count">({sectionGroups.foundation.length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.foundation as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🍃</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Governance Architecture Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={sectionGroups.governance.some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('architecture')}</span>
              <span class="section-count">({sectionGroups.governance.length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.governance as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">⚡</span>
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
              class:has-active={sectionGroups.implementation.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🌿</span>
              <span class="accordion-title">{getSectionCategoryTitle('implementation')}</span>
              <span class="section-count">({sectionGroups.implementation.length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.implementation as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🌊</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Sacred Connections Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={connectionOpen}
              class:has-active={sectionGroups.connection.some(section => activeSection === section)}
              on:click={toggleConnection}
            >
              <span class="accordion-icon">🕸️</span>
              <span class="accordion-title">{getSectionCategoryTitle('connections')}</span>
              <span class="section-count">({sectionGroups.connection.length})</span>
              <span class="toggle-arrow" class:rotated={connectionOpen}>▼</span>
            </button>
            {#if connectionOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.connection as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🤝</span>
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
              <span class="accordion-title">{getSectionCategoryTitle('resources')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === '10-glossary-references'}
                  on:click={() => setActiveSection('10-glossary-references')}
                >
                  <span class="nav-icon">📚</span>
                  <span class="nav-title">{getLocalizedText('appendicesTools')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'indigenous-framework-essentials'}
                  on:click={() => setActiveSection('indigenous-framework-essentials')}
                >
                  <span class="nav-icon">🌱</span>
                  <span class="nav-title">{getLocalizedText('frameworkEssentials')}</span>
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
            <div class="progress-fill" style="width: {(coreProgress * 100)}%"></div>
          </div>
          <span class="progress-text">Section {currentCoreIndex} of {totalCoreSections}</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section === 'index' && currentLocale === 'sv'}
            <!-- Manually render Swedish introduction for the index section -->
            <div class="overview-section">
              <h1>{intro.title}</h1>
              <h2>{intro.overview}</h2>
              <p>{intro.paragraph1}</p>
              <p>{intro.paragraph2}</p>
            </div>
          {:else if section === 'index'}
            <!-- Render English introduction through the markdown component -->
            <svelte:component this={data.sections[section].default} />
          {:else if data.sections[section]}
            <!-- Render normal sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of essentials version -->
          {#if section === 'indigenous-framework-essentials' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('essentials')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('00-preamble')}>
                {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
              </button>
            </div>
          {/if}

          <!-- Section navigation at bottom of core sections -->
          {#if isCoreSection && !isPrintMode}
            <div class="section-navigation">
              {#if currentCoreIndex > 1}
                <button class="nav-btn prev-btn" on:click={() => {
                  setActiveSection(coreSections[currentCoreIndex - 2]);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if currentCoreIndex < totalCoreSections}
                <button class="nav-btn next-btn" on:click={() => {
                  setActiveSection(coreSections[currentCoreIndex]);
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
  /* Indigenous & Traditional Knowledge Governance Framework color scheme */
  /* Earth tones representing connection to land, traditional wisdom, and natural cycles */
  :root {
    --indigenous-primary: #1c2b1a; /* Deep Forest Green - ancestral wisdom, land connection */
    --indigenous-secondary: #6b7280; /* Stone Gray - mountains, stability, endurance */
    --indigenous-earth: #92400e; /* Rich Earth Brown - soil, grounding, traditional knowledge */
    --indigenous-water: #0c4a6e; /* Deep Water Blue - rivers, life source, ceremony */
    --indigenous-fire: #dc2626; /* Sacred Fire Red - transformation, ceremony, life force */
    --indigenous-sun: #f59e0b; /* Golden Sun - guidance, renewal, seven generations */
    --indigenous-plant: #15803d; /* Living Plant Green - growth, medicine, traditional foods */
    --indigenous-sky: #3b82f6; /* Sky Blue - vision, dreams, future generations */
    --indigenous-sage: #6b7280; /* Sage Gray - wisdom, balance, traditional governance */
    --indigenous-light: #84cc16; /* Light Green - hope, renewal, youth leadership */
  }

  /* Layout */
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .content {
    min-width: 0;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem; /* Adds space above when scrolled to */
  }

  /* Section Navigation */
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
    background-color: rgba(28, 43, 26, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(28, 43, 26, 0.1);
    color: var(--indigenous-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(146, 64, 14, 0.1);
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
    background-color: rgba(28, 43, 26, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--indigenous-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--indigenous-earth);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(28, 43, 26, 0.1), rgba(146, 64, 14, 0.1));
    border: 1px solid rgba(28, 43, 26, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--indigenous-primary);
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
    background: linear-gradient(90deg, rgba(28, 43, 26, 0.1), rgba(146, 64, 14, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--indigenous-primary);
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
    background: linear-gradient(90deg, var(--indigenous-primary), var(--indigenous-earth));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--indigenous-primary);
    font-weight: 500;
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
    background-color: var(--indigenous-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--indigenous-earth);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }

  /* Indigenous framework guide card */
  .indigenous-guide-card {
    background: linear-gradient(135deg, rgba(28, 43, 26, 0.08) 0%, rgba(146, 64, 14, 0.08) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(28, 43, 26, 0.1);
    border: 1px solid rgba(28, 43, 26, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .indigenous-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(28, 43, 26, 0.3);
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
    color: var(--indigenous-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--indigenous-primary);
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
    background-color: var(--indigenous-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--indigenous-earth);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--indigenous-primary);
    border: 1px solid var(--indigenous-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(28, 43, 26, 0.08);
    transform: translateY(-1px);
  }
  
  .guide-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .download-icon,
  .arrow-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }

  /* Content styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--indigenous-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--indigenous-earth);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--indigenous-plant);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--indigenous-water);
  }

  /* Styling for the inset box (blockquote) - representing sacred teachings */
  :global(blockquote) {
    background-color: rgba(28, 43, 26, 0.05);
    border-left: 4px solid var(--indigenous-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    position: relative;
  }

  :global(blockquote::before) {
    content: "🍃";
    position: absolute;
    left: -12px;
    top: 8px;
    background: white;
    padding: 2px;
    border-radius: 50%;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--indigenous-primary);
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
    color: var(--indigenous-plant);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--indigenous-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with indigenous-themed symbols */
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

  /* Apply indigenous symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌿";
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
    color: var(--indigenous-earth);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🤝";
    color: var(--indigenous-plant);
  }

  /* Table styles for indigenous framework */
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
    background: linear-gradient(to right, var(--indigenous-primary), var(--indigenous-earth));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--indigenous-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(28, 43, 26, 0.03);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(28, 43, 26, 0.08);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Links */
  .content :global(a) {
    color: var(--indigenous-plant);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--indigenous-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--indigenous-earth);
  }

  .content :global(a[href^="http"]):after, 
  .content :global(a[href^="https://"]):after {
    content: " ↗";
    font-size: 0.8em;
    vertical-align: super;
  }

  .content :global(a[href$=".pdf"]):after {
    content: " ↓";
    font-size: 0.8em;
  }

  .content :global(a[href^="#"]) {
    color: var(--indigenous-water);
    text-decoration: none;
    border-bottom: 1px dotted var(--indigenous-water);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--indigenous-plant);
    border-bottom-color: var(--indigenous-plant);
  }

  .content :global(table a) {
    color: var(--indigenous-plant);
    font-weight: 600;
  }

  /* Indigenous Framework specific theme elements */

  /* Special callouts for indigenous concepts */
  .content :global(.sovereignty-callout) {
    background-color: rgba(28, 43, 26, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-primary);
  }

  .content :global(.traditional-knowledge-callout) {
    background-color: rgba(146, 64, 14, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-earth);
  }

  .content :global(.seven-generations-callout) {
    background-color: rgba(245, 158, 11, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-sun);
  }

  .content :global(.bioregional-callout) {
    background-color: rgba(21, 128, 61, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-plant);
  }

  .content :global(.case-study) {
    background-color: rgba(12, 74, 110, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-water);
  }

  .content :global(.case-study-title) {
    color: var(--indigenous-water);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .content :global(.alert) {
    background-color: rgba(220, 38, 38, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--indigenous-fire);
  }

  .content :global(.alert-title) {
    color: var(--indigenous-fire);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important indigenous concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(28, 43, 26, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(28, 43, 26, 0.2);
  }

  .content :global(.concept-highlight-title) {
    color: var(--indigenous-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(28, 43, 26, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Traditional ecological knowledge styling */
  .content :global(.tek-highlight) {
    background-color: rgba(146, 64, 14, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(146, 64, 14, 0.2);
  }

  .content :global(.tek-highlight-title) {
    color: var(--indigenous-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(146, 64, 14, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Rights of nature and legal styling */
  .content :global(.rights-nature-highlight) {
    background-color: rgba(21, 128, 61, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(21, 128, 61, 0.2);
  }

  .content :global(.rights-nature-highlight-title) {
    color: var(--indigenous-plant);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(21, 128, 61, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Ceremony and governance styling */
  .content :global(.ceremony-highlight) {
    background-color: rgba(245, 158, 11, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .content :global(.ceremony-highlight-title) {
    color: var(--indigenous-sun);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Climate and water styling */
  .content :global(.water-highlight) {
    background-color: rgba(12, 74, 110, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(12, 74, 110, 0.2);
  }

  .content :global(.water-highlight-title) {
    color: var(--indigenous-water);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(12, 74, 110, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Sacred fire and transformation styling */
  .content :global(.fire-highlight) {
    background-color: rgba(220, 38, 38, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(220, 38, 38, 0.2);
  }

  .content :global(.fire-highlight-title) {
    color: var(--indigenous-fire);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(220, 38, 38, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Responsive Design */
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
</style>
