<!-- src/routes/frameworks/docs/implementation/environmental-stewardship/+page.svelte -->
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
        'one-page-essence': "One-Page Essence",
        'first-100-days-playbook': "First 100 Days Playbook",
        
        // Core framework sections (01-15)
        '01-introduction': "Introduction",
        '02-guiding-principles': "Guiding Principles",
        '03-governance-structure': "Governance Structure",
        '04-core-pillars': "Core Pillars",
        '05-policy-mechanisms': "Policy Mechanisms",
        '06-stakeholder-engagement': "Stakeholder Engagement",
        '07-financing-mechanisms': "Financing Mechanisms",
        '08-implementation-roadmap': "Implementation Roadmap",
        '09-metrics-for-success': "Metrics for Success",
        '10-visualizations': "Visualizations",
        '11-challenges-and-solutions': "Challenges and Solutions",
        '12-implementation-tools': "Implementation Tools",
        '13-reparations-protocol': "Reparations Protocol",
        '14-conclusion': "Conclusion",
        '15-appendices': "Appendices"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'one-page-essence': "Sidessens",
        'first-100-days-playbook': "Första 100 dagarna playbook",
        
        // Core framework sections (Swedish)
        '01-introduction': "Introduktion",
        '02-guiding-principles': "Vägledande principer",
        '03-governance-structure': "Styrningsstruktur",
        '04-core-pillars': "Kärnpelare",
        '05-policy-mechanisms': "Policymekanismer",
        '06-stakeholder-engagement': "Intressentengagemang",
        '07-financing-mechanisms': "Finansieringsmekanismer",
        '08-implementation-roadmap': "Implementeringsplan",
        '09-metrics-for-success': "Mätning av framgång",
        '10-visualizations': "Visualiseringar",
        '11-challenges-and-solutions': "Utmaningar och lösningar",
        '12-implementation-tools': "Implementeringsverktyg",
        '13-reparations-protocol': "Reparationsprotokoll",
        '14-conclusion': "Slutsats",
        '15-appendices': "Bilagor"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Introduction': 'Introduction',
      'Guiding Principles': 'Principles',
      'Governance Structure': 'Governance',
      'Core Pillars': 'Core Pillars',
      'Policy Mechanisms': 'Policy',
      'Stakeholder Engagement': 'Stakeholders',
      'Financing Mechanisms': 'Financing',
      'Implementation Roadmap': 'Roadmap',
      'Metrics for Success': 'Metrics',
      'Visualizations': 'Visualizations',
      'Challenges and Solutions': 'Challenges',
      'Implementation Tools': 'Tools',
      'Reparations Protocol': 'Reparations',
      'Conclusion': 'Conclusion',
      'Appendices': 'Appendices',
      // Swedish short titles
      'Introduktion': 'Introduktion',
      'Vägledande principer': 'Principer',
      'Styrningsstruktur': 'Styrning',
      'Kärnpelare': 'Kärnpelare',
      'Policymekanismer': 'Policy',
      'Intressentengagemang': 'Intressenter',
      'Finansieringsmekanismer': 'Finansiering',
      'Implementeringsplan': 'Färdplan',
      'Mätning av framgång': 'Mätning',
      'Visualiseringar': 'Visualiseringar',
      'Utmaningar och lösningar': 'Utmaningar',
      'Implementeringsverktyg': 'Verktyg',
      'Reparationsprotokoll': 'Reparationer',
      'Slutsats': 'Slutsats',
      'Bilagor': 'Bilagor'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/environmental-stewardship-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `environmental-stewardship-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the one-page essence
  $: isEssenceActive = activeSection === 'one-page-essence';
  $: isSupplementaryActive = ['one-page-essence', 'first-100-days-playbook'].includes(activeSection);

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let governanceOpen = false;
  let implementationOpen = false;
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

  function toggleGovernance() {
    governanceOpen = !governanceOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
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

  // Get the total number of core framework sections (01-15)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['one-page-essence', 'first-100-days-playbook'].includes(section)
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        overview: "Overview",
        newToFramework: "New to the Environmental Stewardship Framework?",
        startWithEssence: "Start with our essential guides that explain the core concepts and provide immediate action steps.",
        readEssence: "Read the One-Page Essence",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundation: "Foundation",
        governance: "Governance & Policy",
        implementation: "Implementation",
        resources: "Resources"
      },
      sv: {
        overview: "Översikt",
        newToFramework: "Ny inom miljöförvaltningsramverket?",
        startWithEssence: "Börja med våra viktiga guider som förklarar kärnkoncept och ger omedelbara åtgärdssteg.",
        readEssence: "Läs sidessensen",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        foundation: "Grund",
        governance: "Styrning & policy",
        implementation: "Implementering",
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
    <!-- Quick Access Card for Environmental Stewardship Framework -->
    {#if !isPrintMode && !isEssenceActive && activeSection === 'index'}
      <div class="environmental-guide-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithEssence')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('one-page-essence')}>
              {getLocalizedText('readEssence')} <span class="arrow-icon">→</span>
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
              class:has-active={coreFrameworkSections.slice(0, 4).some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">{getLocalizedText('foundation')}</span>
              <span class="section-count">({coreFrameworkSections.slice(0, 4).length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(0, 4) as section}
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

          <!-- Governance & Policy Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={coreFrameworkSections.slice(4, 9).some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getLocalizedText('governance')}</span>
              <span class="section-count">({coreFrameworkSections.slice(4, 9).length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(4, 9) as section}
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
              class:has-active={coreFrameworkSections.slice(9).some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getLocalizedText('implementation')}</span>
              <span class="section-count">({coreFrameworkSections.slice(9).length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
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
              <span class="accordion-title">{getLocalizedText('resources')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'one-page-essence'}
                  on:click={() => setActiveSection('one-page-essence')}
                >
                  <span class="nav-icon">🌱</span>
                  <span class="nav-title">{getSectionTitle('one-page-essence')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'first-100-days-playbook'}
                  on:click={() => setActiveSection('first-100-days-playbook')}
                >
                  <span class="nav-icon">🚀</span>
                  <span class="nav-title">{getSectionTitle('first-100-days-playbook')}</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 15) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 15</span>
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
          {#if section === 'index'}
            <!-- Render the loaded markdown content -->
            {#if data.sections[section]}
              <svelte:component this={data.sections[section].default} />
            {:else}
              <p>Section {section} not found</p>
            {/if}
          {:else if data.sections[section]}
            <!-- Render normal sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of essence guide -->
          {#if section === 'one-page-essence' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('essence')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-introduction')}>
                {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
              </button>
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
        <h1>Environmental Stewardship Framework for Multi-Level Governance</h1>
        <h2>Overview</h2>
        <p>The Environmental Stewardship Framework is a comprehensive plan for transformative environmental governance that addresses the interconnected challenges of ecosystem degradation, climate change, economic inequity, and technological ethics. It integrates spiritual, indigenous, economic, and technological dimensions of governance.</p>
        <p>This framework aims to build a regenerative world by 2050 where ecosystems thrive as rights-holders, communities exercise sovereignty, spiritual wisdom informs ethics, and technologies align with the well-being of all beings.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Environmental Stewardship Framework color scheme */
  :root {
    --env-primary: #6DAA3F; /* Ecosystem Green - growth, life, renewal */
    --env-secondary: #3A6EA5; /* Harmony Blue - wisdom, stability, unity */
    --env-accent: #F5A623; /* Solar Gold - energy, transformation, illumination */
    --env-earth: #8B5A2B; /* Earth Brown - grounding, heritage, connection */
    --env-spirit: #8A4F9E; /* Rights Purple - consciousness, dignity, sovereignty */
    --env-regenerative: #20B2AA; /* Regenerative Teal - healing, balance, flow */
    --env-justice: #C43B3B; /* Justice Red - urgency, action, protection */
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
    background-color: rgba(109, 170, 63, 0.1);
    color: var(--env-primary);
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
    background-color: var(--env-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--env-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(109, 170, 63, 0.1), rgba(58, 110, 165, 0.1));
    border: 1px solid rgba(109, 170, 63, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--env-primary);
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
    background-color: rgba(109, 170, 63, 0.1);
    color: var(--env-primary);
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
    background: linear-gradient(90deg, rgba(109, 170, 63, 0.1), rgba(58, 110, 165, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--env-primary);
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
    background: linear-gradient(90deg, var(--env-primary), var(--env-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--env-primary);
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
    color: var(--env-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--env-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--env-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--env-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(109, 170, 63, 0.1);
    border-left: 4px solid var(--env-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--env-earth);
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
    color: var(--env-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--env-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with environmental stewardship themed bullets */
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

  /* Apply environmental symbols to all ul li EXCEPT those in section-nav */
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
    color: var(--env-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🍃";
    color: var(--env-regenerative);
  }

  /* Table styles for environmental stewardship framework */
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
    background: linear-gradient(to right, var(--env-primary), var(--env-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--env-primary);
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
  
  /* Environmental guide card */
  .environmental-guide-card {
    background: linear-gradient(135deg, rgba(109, 170, 63, 0.1) 0%, rgba(58, 110, 165, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(109, 170, 63, 0.1);
    border: 1px solid rgba(109, 170, 63, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .environmental-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(109, 170, 63, 0.3);
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
    color: var(--env-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--env-primary);
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
    background-color: var(--env-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--env-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--env-primary);
    border: 1px solid var(--env-primary);
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
    color: var(--env-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--env-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--env-primary);
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
    color: var(--env-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--env-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--env-secondary);
    border-bottom-color: var(--env-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--env-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--env-primary);
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
    background-color: var(--env-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--env-secondary);
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

  /* Environmental Stewardship Framework specific theme elements */

  /* Special callouts for environmental concepts */
  .content :global(.ecosystem-callout) {
    background-color: rgba(109, 170, 63, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-primary);
  }

  .content :global(.spiritual-callout) {
    background-color: rgba(139, 90, 43, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-earth);
  }

  .content :global(.climate-callout) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-secondary);
  }

  .content :global(.regenerative-callout) {
    background-color: rgba(32, 178, 170, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-regenerative);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(245, 166, 35, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-accent);
  }

  .content :global(.case-study-title) {
    color: var(--env-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--env-justice);
  }

  .content :global(.alert-title) {
    color: var(--env-justice);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important environmental concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(109, 170, 63, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(109, 170, 63, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--env-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(109, 170, 63, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Rights recognition styling */
  .content :global(.rights-highlight) {
    background-color: rgba(138, 79, 158, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(138, 79, 158, 0.3);
  }

  .content :global(.rights-highlight-title) {
    color: var(--env-spirit);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(138, 79, 158, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Governance and sovereignty styling */
  .content :global(.governance-highlight) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(58, 110, 165, 0.3);
  }

  .content :global(.governance-highlight-title) {
    color: var(--env-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(58, 110, 165, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic transformation styling */
  .content :global(.economic-highlight) {
    background-color: rgba(245, 166, 35, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 166, 35, 0.3);
  }

  .content :global(.economic-highlight-title) {
    color: var(--env-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 166, 35, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Cultural heritage and grounding styling */
  .content :global(.heritage-highlight) {
    background-color: rgba(139, 90, 43, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(139, 90, 43, 0.3);
  }

  .content :global(.heritage-highlight-title) {
    color: var(--env-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(139, 90, 43, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Justice and urgency styling */
  .content :global(.justice-highlight) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(196, 59, 59, 0.3);
  }

  .content :global(.justice-highlight-title) {
    color: var(--env-justice);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(196, 59, 59, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
   .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(109, 170, 63, 0.1);
    border: 1px solid rgba(109, 170, 63, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--env-primary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--env-primary);
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
