<!-- src/routes/frameworks/docs/implementation/animal-welfare/+page.svelte -->
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
        'global-guardian-framework-essentials': "Framework Essentials Guide",
        'executive-summary': "Executive Summary",
        
        // Core framework sections (01-08)
        '01-introduction': "Introduction & Scientific Foundation",
        '02-core-principles': "Core Principles",
        '03-structural-components': "Structural Components",
        '04-implementation-approaches': "Implementation Approaches",
        '05-metrics-evaluation': "Metrics & Evaluation",
        '06-cultural-justice': "Cultural Sensitivity & Justice",
        '07-environmental-integration': "Environmental Integration",
        '08-appendices': "Appendices & Resources"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'global-guardian-framework-essentials': "Ramverk grundläggande guide",
        'executive-summary': "Verkställande sammanfattning",
        
        // Core framework sections (Swedish)
        '01-introduction': "Introduktion & vetenskaplig grund",
        '02-core-principles': "Kärnprinciper",
        '03-structural-components': "Strukturella komponenter", 
        '04-implementation-approaches': "Implementeringsmetoder",
        '05-metrics-evaluation': "Mätning & utvärdering",
        '06-cultural-justice': "Kulturell känslighet & rättvisa",
        '07-environmental-integration': "Miljöintegration",
        '08-appendices': "Bilagor & resurser"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Introduction & Scientific Foundation': 'Introduction',
      'Core Principles': 'Principles',
      'Structural Components': 'Governance',
      'Implementation Approaches': 'Implementation',
      'Metrics & Evaluation': 'Metrics',
      'Cultural Sensitivity & Justice': 'Cultural Justice',
      'Environmental Integration': 'Environment',
      'Appendices & Resources': 'Resources',
      // Swedish short titles
      'Introduktion & vetenskaplig grund': 'Introduktion',
      'Kärnprinciper': 'Principer',
      'Strukturella komponenter': 'Styrning',
      'Implementeringsmetoder': 'Implementering',
      'Mätning & utvärdering': 'Mätning',
      'Kulturell känslighet & rättvisa': 'Kulturell rättvisa',
      'Miljöintegration': 'Miljö',
      'Bilagor & resurser': 'Resurser'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/global-guardian-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `global-guardian-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the essentials version
  $: isEssentialsActive = activeSection === 'global-guardian-framework-essentials';
  $: isSupplementaryActive = ['global-guardian-framework-essentials', 'executive-summary'].includes(activeSection);

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let implementationOpen = false;
  let integrationOpen = false;
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

  function toggleIntegration() {
    integrationOpen = !integrationOpen;
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

  // Get the total number of core framework sections (01-08)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['global-guardian-framework-essentials', 'executive-summary'].includes(section)
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        overview: "Overview",
        newToFramework: "New to Global Guardian Framework?",
        startWithEssentials: "Start with our accessible essentials guide that explains the framework's core principles and community-led transformation pathway for animal welfare.",
        readEssentials: "Read the Framework Essentials",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundation: "Foundation",
        implementation: "Implementation",
        integration: "Integration",
        resources: "Resources"
      },
      sv: {
        overview: "Översikt",
        newToFramework: "Ny inom global guardian ramverket?",
        startWithEssentials: "Börja med vår tillgängliga grundguide som förklarar ramverkets kärnprinciper och samhällsledda transformationsväg för djurvälfärd.",
        readEssentials: "Läs ramverkets grundläggande",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        foundation: "Grund",
        implementation: "Implementering",
        integration: "Integration",
        resources: "Resurser"
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
    <!-- Quick Access Card for Animal Welfare Framework -->
    {#if !isPrintMode && !isEssentialsActive && activeSection === 'index'}
      <div class="guardian-guide-card">
        <div class="card-content">
          <div class="card-icon">🐾</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithEssentials')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('global-guardian-framework-essentials')}>
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
              <span class="nav-title">{getLocalizedText('overview')}</span>
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
              <span class="accordion-icon">🐾</span>
              <span class="accordion-title">{getLocalizedText('foundation')}</span>
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

          <!-- Implementation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={implementationOpen}
              class:has-active={coreFrameworkSections.slice(3, 5).some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getLocalizedText('implementation')}</span>
              <span class="section-count">({coreFrameworkSections.slice(3, 5).length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(3, 5) as section}
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

          <!-- Integration Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={integrationOpen}
              class:has-active={coreFrameworkSections.slice(5, 7).some(section => activeSection === section)}
              on:click={toggleIntegration}
            >
              <span class="accordion-icon">🌍</span>
              <span class="accordion-title">{getLocalizedText('integration')}</span>
              <span class="section-count">({coreFrameworkSections.slice(5, 7).length})</span>
              <span class="toggle-arrow" class:rotated={integrationOpen}>▼</span>
            </button>
            {#if integrationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(5, 7) as section}
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
              class:has-active={isSupplementaryActive || coreFrameworkSections.slice(7).some(section => activeSection === section)}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getLocalizedText('resources')}</span>
              <span class="section-count">(3)</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(7) as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-number">{section.substring(0, 2)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'global-guardian-framework-essentials'}
                  on:click={() => setActiveSection('global-guardian-framework-essentials')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">{getSectionTitle('global-guardian-framework-essentials')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'executive-summary'}
                  on:click={() => setActiveSection('executive-summary')}
                >
                  <span class="nav-icon">📊</span>
                  <span class="nav-title">{getSectionTitle('executive-summary')}</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 8) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 8</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          <!-- Language fallback notice (skip for index since we have Swedish overview) -->
          {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section)}
            <div class="language-fallback-notice">
              <div class="notice-icon">🌐</div>
              <div class="notice-content">
                <strong>{currentLocale === 'sv' ? 'Innehåll på svenska kommer snart' : 'Content in your language coming soon'}</strong>
                <p>{currentLocale === 'sv' ? 'Detta avsnitt visas för närvarande på engelska tills den svenska översättningen är klar.' : 'This section is currently displayed in English until translation is complete.'}</p>
              </div>
            </div>
          {/if}
          {#if data.sections[section]}
            <!-- Render sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of essentials version -->
          {#if section === 'global-guardian-framework-essentials' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('essentials')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <div class="navigation-group">
                <button class="secondary-btn" on:click={() => setActiveSection('executive-summary')}>
                  View Executive Summary <span class="arrow-icon">→</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('01-introduction')}>
                  {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
                </button>
              </div>
            </div>
          {/if}

          <!-- Navigation buttons at bottom of executive summary -->
          {#if section === 'executive-summary' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('executive-summary')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <div class="navigation-group">
                <button class="secondary-btn" on:click={() => setActiveSection('global-guardian-framework-essentials')}>
                  View Framework Essentials <span class="arrow-icon">→</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('01-introduction')}>
                  {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
                </button>
              </div>
            </div>
          {/if}

          <!-- Section navigation at bottom of core sections -->
          {#if isCoreSection && !isPrintMode}
            <div class="section-navigation">
              {#if coreFrameworkSections.indexOf(activeSection) > 0}
                <button class="nav-btn prev-btn" on:click={() => {
                  const currentIndex = coreFrameworkSections.indexOf(activeSection);
                  const prevSection = coreFrameworkSections[currentIndex - 1];
                  setActiveSection(prevSection);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if coreFrameworkSections.indexOf(activeSection) < coreFrameworkSections.length - 1}
                <button class="nav-btn next-btn" on:click={() => {
                  const currentIndex = coreFrameworkSections.indexOf(activeSection);
                  const nextSection = coreFrameworkSections[currentIndex + 1];
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
        <h1>Global Guardian Framework: Animal Welfare for a Shared Future</h1>
        <h2>Overview</h2>
        <p>The Global Guardian Framework emerges as a transformative blueprint for converting humanity's relationship with animals from domination to guardianship, positioning animals as sentient beings deserving compassion and respect.</p>
        <p>This framework reimagines our relationship with all sentient life by honoring traditional wisdom while enabling modern innovations for a future where all life can thrive.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Global Guardian Framework color scheme - compassion, guardianship, and environmental harmony */
  :root {
    --guardian-primary: #1e40af; /* Deep Blue - trust, protection, guardianship */
    --guardian-secondary: #059669; /* Emerald Green - life, nature, environmental harmony */
    --guardian-accent: #7c3aed; /* Purple - wisdom, transformation, sentience */
    --guardian-earth: #059669; /* Forest Green - ecological connection, earth stewardship */
    --guardian-compassion: #dc2626; /* Warm Red - care, compassion, protection */
    --guardian-light: #10b981; /* Teal - healing, balance, harmony */
    --guardian-gold: #f59e0b; /* Amber - hope, innovation, cultural wisdom */
    --guardian-deep: #1f2937; /* Deep Gray - stability, grounding, responsibility */
    --guardian-sanctuary: #6366f1; /* Indigo - sanctuary, safe spaces, refuge */
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
    background-color: rgba(5, 150, 105, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(30, 64, 175, 0.1);
    color: var(--guardian-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(5, 150, 105, 0.1);
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
    background-color: rgba(5, 150, 105, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--guardian-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--guardian-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(5, 150, 105, 0.1));
    border: 1px solid rgba(30, 64, 175, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--guardian-primary);
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
    background-color: rgba(30, 64, 175, 0.1);
    color: var(--guardian-primary);
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

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(30, 64, 175, 0.1), rgba(5, 150, 105, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--guardian-primary);
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
    background: linear-gradient(90deg, var(--guardian-primary), var(--guardian-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--guardian-primary);
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
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--guardian-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--guardian-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--guardian-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--guardian-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(5, 150, 105, 0.1);
    border-left: 4px solid var(--guardian-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--guardian-earth);
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
    color: var(--guardian-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--guardian-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with guardian-themed bullets */
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

  /* Apply guardian symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🐾";
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
    color: var(--guardian-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🤝";
    color: var(--guardian-light);
  }

  /* Table styles for guardian framework */
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
    background: linear-gradient(to right, var(--guardian-primary), var(--guardian-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--guardian-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(5, 150, 105, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(5, 150, 105, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Guardian framework guide card */
  .guardian-guide-card {
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(30, 64, 175, 0.1);
    border: 1px solid rgba(30, 64, 175, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .guardian-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(30, 64, 175, 0.3);
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
    color: var(--guardian-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--guardian-primary);
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
    background-color: var(--guardian-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--guardian-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--guardian-primary);
    border: 1px solid var(--guardian-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(5, 150, 105, 0.1);
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
    color: var(--guardian-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--guardian-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--guardian-primary);
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
    color: var(--guardian-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--guardian-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--guardian-secondary);
    border-bottom-color: var(--guardian-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--guardian-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--guardian-primary);
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
    background-color: var(--guardian-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--guardian-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }

  .navigation-group {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
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

    .navigation-group {
      flex-direction: column;
      width: 100%;
    }
    
    .navigation-group button {
      width: 100%;
    }
  }

  /* Guardian Framework specific theme elements */

  /* Special callouts for animal welfare concepts */
  .content :global(.sentience-callout) {
    background-color: rgba(124, 58, 237, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-accent);
  }

  .content :global(.guardianship-callout) {
    background-color: rgba(30, 64, 175, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-primary);
  }

  .content :global(.compassion-callout) {
    background-color: rgba(220, 38, 38, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-compassion);
  }

  .content :global(.environmental-harmony-callout) {
    background-color: rgba(5, 150, 105, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-secondary);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(99, 102, 241, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-sanctuary);
  }

  .content :global(.case-study-title) {
    color: var(--guardian-sanctuary);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(220, 38, 38, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--guardian-compassion);
  }

  .content :global(.alert-title) {
    color: var(--guardian-compassion);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important animal welfare concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(5, 150, 105, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(5, 150, 105, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--guardian-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(5, 150, 105, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Tiered protection system styling */
  .content :global(.tier-highlight) {
    background-color: rgba(30, 64, 175, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(30, 64, 175, 0.3);
  }

  .content :global(.tier-highlight-title) {
    color: var(--guardian-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(30, 64, 175, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Cultural justice and traditional knowledge styling */
  .content :global(.cultural-highlight) {
    background-color: rgba(245, 158, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .content :global(.cultural-highlight-title) {
    color: var(--guardian-gold);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Scientific foundation styling */
  .content :global(.science-highlight) {
    background-color: rgba(124, 58, 237, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(124, 58, 237, 0.3);
  }

  .content :global(.science-highlight-title) {
    color: var(--guardian-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(124, 58, 237, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Implementation and governance styling */
  .content :global(.implementation-highlight) {
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .content :global(.implementation-highlight-title) {
    color: var(--guardian-light);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(16, 185, 129, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic justice and transition styling */
  .content :global(.economic-highlight) {
    background-color: rgba(245, 158, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .content :global(.economic-highlight-title) {
    color: var(--guardian-gold);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Innovation and technology styling */
  .content :global(.innovation-highlight) {
    background-color: rgba(99, 102, 241, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .content :global(.innovation-highlight-title) {
    color: var(--guardian-sanctuary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
   .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(30, 64, 175, 0.1);
    border: 1px solid rgba(30, 64, 175, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--guardian-primary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--guardian-primary);
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  .notice-content p {
    color: #4b5563;
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }

  /* Responsive notice */
  @media (max-width: 640px) {
    .language-fallback-notice {
      padding: 0.75rem 1rem;
    }
    
    .notice-icon {
      font-size: 1.1rem;
    }
    
    .notice-content strong {
      font-size: 0.9rem;
    }
    
    .notice-content p {
      font-size: 0.8rem;
    }
  }
</style>
