<!-- src/routes/frameworks/docs/implementation/mental-health/+page.svelte -->
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

  // Swedish translations for the introduction section
  const introSv = {
    title: "Levande Mandala för Planetär Mental Hälsa",
    overview: "Översikt",
    paragraph1: "Levande Mandala för Planetär Mental Hälsa framträder som en transformativ plan för global läkning, som positionerar mental hälsa inte som individuell patologi, utan som en transkulturell mänsklig rättighet vävd in i vårt planetära ömsesidiga beroende.",
    paragraph2: "Detta ramverk omfamnar holistisk vård, samhällssuveränitet och de heliga dimensionerna av mänskligt medvetande som grunden för kollektiv blomstring."
  };

  // English translations as fallback
  const introEn = {
    title: "Living Mandala for Planetary Mental Health",
    overview: "Overview",
    paragraph1: "The Living Mandala for Planetary Mental Health emerges as a transformative blueprint for global healing, positioning mental health not as individual pathology, but as a transcultural human right woven into our planetary interdependence.",
    paragraph2: "This framework embraces holistic care, community sovereignty, and the sacred dimensions of human consciousness as foundations for collective flourishing."
  };

  function getOverviewTitle() {
    const overviewTitles = {
      en: "Overview",
      sv: "Översikt"
    };
    
    return overviewTitles[currentLocale] || overviewTitles.en;
  }

  // Group sections logically with multi-lingual support
  function getSectionCategoryTitle(category) {
    const categoryTitles = {
      en: {
        foundation: "Foundation",
        systems: "Systems & Delivery", 
        implementation: "Implementation",
        resources: "Resources"
      },
      sv: {
        foundation: "Grund",
        systems: "System & leverans",
        implementation: "Implementering", 
        resources: "Resurser"
      }
    };
    
    return (categoryTitles[currentLocale] || categoryTitles.en)[category] || category;
  }

  // Update the accordion headers to use the translated titles
  $: foundationSections = ['01-vision-principles', '02-governance-structures'];
  $: systemsSections = coreFrameworkSections.slice(2, 8);
  $: implementationSections = coreFrameworkSections.slice(8, 14);

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'mental-health-framework-essentials': "Framework Essentials Guide",
        
        // Core framework sections (01-15)
        '01-vision-principles': "Vision & Guiding Principles",
        '02-governance-structures': "Governance & Institutional Structures",
        '03-legal-policy': "Legal & Policy Frameworks",
        '04-financing-resources': "Financing & Resource Mobilization",
        '05-service-delivery': "Service Delivery & Workforce",
        '06-monitoring-accountability': "Monitoring, Evaluation & Accountability",
        '07-crisis-response': "Crisis & Emergency Response",
        '08-innovation-research': "Innovation & Research",
        '09-cross-cutting-themes': "Cross-Cutting Themes",
        '10-implementation-strategy': "Implementation Strategy",
        '11-political-strategy': "Political Strategy & Stakeholder Mapping",
        '12-risk-management': "Risk Management",
        '13-technology-implementation': "Technology Implementation",
        '14-change-management': "Change Management",
        '15-conclusion': "The Mandala Completes: From Vision to Living Reality"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'mental-health-framework-essentials': "Ramverk Grundläggande Guide",
        
        // Core framework sections (Swedish)
        '01-vision-principles': "Vision & Vägledande Principer",
        '02-governance-structures': "Styrning & Institutionella Strukturer",
        '03-legal-policy': "Juridiska & Politiska Ramverk",
        '04-financing-resources': "Finansiering & Resursmobilisering",
        '05-service-delivery': "Tjänsteleverans & Arbetskraft",
        '06-monitoring-accountability': "Övervakning, Utvärdering & Ansvarsskyldighet",
        '07-crisis-response': "Kris- & Nödinsats",
        '08-innovation-research': "Innovation & Forskning",
        '09-cross-cutting-themes': "Övergripande Teman",
        '10-implementation-strategy': "Implementeringsstrategi",
        '11-political-strategy': "Politisk Strategi & Intressentmappning",
        '12-risk-management': "Riskhantering",
        '13-technology-implementation': "Teknikimplementering",
        '14-change-management': "Förändringsledning",
        '15-conclusion': "Mandalan Fullbordas: Från Vision till Levande Verklighet"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Vision & Guiding Principles': 'Vision & Principles',
      'Governance & Institutional Structures': 'Governance',
      'Legal & Policy Frameworks': 'Legal & Policy',
      'Financing & Resource Mobilization': 'Financing',
      'Service Delivery & Workforce': 'Service Delivery',
      'Monitoring, Evaluation & Accountability': 'Monitoring',
      'Crisis & Emergency Response': 'Crisis Response',
      'Innovation & Research': 'Innovation',
      'Cross-Cutting Themes': 'Cross-Cutting',
      'Implementation Strategy': 'Implementation',
      'Political Strategy & Stakeholder Mapping': 'Political Strategy',
      'Risk Management': 'Risk Management',
      'Technology Implementation': 'Technology',
      'Change Management': 'Change Management',
      'The Mandala Completes: From Vision to Living Reality': 'Conclusion'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/mental-health-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `mental-health-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the essentials version
  $: isEssentialsActive = activeSection === 'mental-health-framework-essentials';
  $: isSupplementaryActive = ['mental-health-framework-essentials', '15-conclusion'].includes(activeSection);

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let systemsOpen = false;
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

  function toggleSystems() {
    systemsOpen = !systemsOpen;
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
    section.match(/^\d{2}-/) && !['mental-health-framework-essentials'].includes(section)
  ).sort();

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to Planetary Mental Health Framework?",
        startWithEssentials: "Start with our accessible essentials guide that explains the framework's core principles and community-led transformation pathway.",
        readEssentials: "Read the Framework Essentials",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        resources: "Resources",
        conclusion: "Conclusion",
        frameworkEssentials: "Framework Essentials"
      },
      sv: {
        newToFramework: "Ny inom Planetär Mental Hälsa Ramverk?",
        startWithEssentials: "Börja med vår tillgängliga grundguide som förklarar ramverkets kärnprinciper och samhällsledda transformationsväg.",
        readEssentials: "Läs Ramverkets Grundläggande",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till Fullständigt Ramverk",
        resources: "Resurser",
        conclusion: "Slutsats",
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
    <!-- Quick Access Card for Mental Health Framework -->
    {#if !isPrintMode && !isEssentialsActive && activeSection === 'index'}
      <div class="mental-health-guide-card">
        <div class="card-content">
          <div class="card-icon">🧠</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithEssentials')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('mental-health-framework-essentials')}>
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
              <span class="nav-title">{getOverviewTitle()}</span>
            </button>
          </div>

          <!-- Foundation Accordion (Core Circle) -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={foundationSections.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌟</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
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

          <!-- Systems & Delivery Accordion (Middle Circle) -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={systemsOpen}
              class:has-active={systemsSections.some(section => activeSection === section)}
              on:click={toggleSystems}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('systems')}</span>
              <span class="section-count">({systemsSections.length})</span>
              <span class="toggle-arrow" class:rotated={systemsOpen}>▼</span>
            </button>
            {#if systemsOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each systemsSections as section}
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

          <!-- Implementation Accordion (Outer & Integration Circles) -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={implementationOpen}
              class:has-active={implementationSections.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getSectionCategoryTitle('implementation')}</span>
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
                  class:active={activeSection === 'mental-health-framework-essentials'}
                  on:click={() => setActiveSection('mental-health-framework-essentials')}
                >
                  <span class="nav-icon">🌟</span>
                  <span class="nav-title">{getLocalizedText('frameworkEssentials')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === '15-conclusion'}
                  on:click={() => setActiveSection('15-conclusion')}
                >
                  <span class="nav-icon">✨</span>
                  <span class="nav-title">{getLocalizedText('conclusion')}</span>
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
          {#if section === 'index'}
            {#if data.sections[section]}
              <!-- Render the loaded markdown content (Swedish or English fallback) -->
              <svelte:component this={data.sections[section].default} />
            {:else if currentLocale === 'sv'}
              <!-- Fallback to hardcoded Swedish if no markdown loaded -->
              <div class="overview-section">
                <h1>{intro.title}</h1>
                <h2>{intro.overview}</h2>
                <p>{intro.paragraph1}</p>
                <p>{intro.paragraph2}</p>
              </div>
            {:else}
              <!-- Fallback message -->
              <p>Section {section} not found</p>
            {/if}
          {:else if data.sections[section]}
            <!-- Render normal sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of essentials version -->
          {#if section === 'mental-health-framework-essentials' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('essentials')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-vision-principles')}>
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
  /* Mental Health Framework color scheme */
  /* Healing tones representing consciousness, community care, and holistic well-being */
  :root {
    --mental-health-primary: #1e3a8a; /* Deep Wisdom Blue - consciousness, depth, stability */
    --mental-health-secondary: #6b7280; /* Grounding Gray - balance, neutrality, calm */
    --mental-health-healing: #059669; /* Healing Green - growth, renewal, community care */
    --mental-health-consciousness: #7c3aed; /* Consciousness Purple - spirituality, transformation, awareness */
    --mental-health-community: #dc2626; /* Community Fire Red - connection, passion, advocacy */
    --mental-health-flourish: #f59e0b; /* Flourishing Gold - hope, potential, healing light */
    --mental-health-peace: #0891b2; /* Peace Cyan - serenity, flow, mental clarity */
    --mental-health-compassion: #ec4899; /* Compassion Pink - love, care, emotional healing */
    --mental-health-wisdom: #6366f1; /* Wisdom Indigo - insight, understanding, intuition */
    --mental-health-wholeness: #10b981; /* Wholeness Emerald - integration, completeness, wellness */
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
    background-color: rgba(30, 58, 138, 0.1);
    color: var(--mental-health-primary);
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
    background-color: var(--mental-health-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--mental-health-healing);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(5, 150, 105, 0.1));
    border: 1px solid rgba(30, 58, 138, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--mental-health-primary);
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
    background-color: rgba(30, 58, 138, 0.1);
    color: var(--mental-health-primary);
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
    background: linear-gradient(90deg, rgba(30, 58, 138, 0.1), rgba(5, 150, 105, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--mental-health-primary);
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
    background: linear-gradient(90deg, var(--mental-health-primary), var(--mental-health-healing));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--mental-health-primary);
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
    color: var(--mental-health-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--mental-health-healing);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--mental-health-consciousness);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--mental-health-peace);
  }

  /* Styling for the inset box (blockquote) - representing healing wisdom */
  :global(blockquote) {
    background-color: rgba(30, 58, 138, 0.05);
    border-left: 4px solid var(--mental-health-healing);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    position: relative;
  }

  :global(blockquote::before) {
    content: "✦";
    position: absolute;
    left: -12px;
    top: 8px;
    background: white;
    padding: 2px;
    border-radius: 50%;
    color: var(--mental-health-healing);
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--mental-health-primary);
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
    color: var(--mental-health-consciousness);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--mental-health-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with mental health themed symbols */
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

  /* Apply simple star symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 0.9rem;
    color: var(--mental-health-healing);
  }

  .content :global(ol) {
    list-style-type: decimal;
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: var(--mental-health-consciousness);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "◆";
    color: var(--mental-health-consciousness);
  }

  /* Table styles for mental health framework */
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
    background: linear-gradient(to right, var(--mental-health-primary), var(--mental-health-healing));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--mental-health-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(30, 58, 138, 0.03);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(30, 58, 138, 0.08);
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
  
  /* Mental health framework guide card */
  .mental-health-guide-card {
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(30, 58, 138, 0.1);
    border: 1px solid rgba(30, 58, 138, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .mental-health-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(30, 58, 138, 0.3);
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
    color: var(--mental-health-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--mental-health-primary);
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
    background-color: var(--mental-health-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--mental-health-healing);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--mental-health-primary);
    border: 1px solid var(--mental-health-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .secondary-btn:hover {
    background-color: rgba(30, 58, 138, 0.08);
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
    color: var(--mental-health-consciousness);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--mental-health-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--mental-health-healing);
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
    color: var(--mental-health-peace);
    text-decoration: none;
    border-bottom: 1px dotted var(--mental-health-peace);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--mental-health-consciousness);
    border-bottom-color: var(--mental-health-consciousness);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--mental-health-consciousness);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--mental-health-primary);
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
    background-color: var(--mental-health-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--mental-health-healing);
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
    background-color: rgba(30, 58, 138, 0.08) !important;
    color: var(--mental-health-primary) !important;
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
    background-color: rgba(30, 58, 138, 0.08) !important;
    color: var(--mental-health-primary) !important;
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
    background-color: rgba(30, 58, 138, 0.08);
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

  /* Mental Health Framework specific theme elements */

  /* Special callouts for mental health concepts */
  .content :global(.healing-callout) {
    background-color: rgba(30, 58, 138, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-primary);
  }

  .content :global(.community-care-callout) {
    background-color: rgba(5, 150, 105, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-healing);
  }

  .content :global(.consciousness-callout) {
    background-color: rgba(124, 58, 237, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-consciousness);
  }

  .content :global(.flourishing-callout) {
    background-color: rgba(245, 158, 11, 0.08);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-flourish);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(8, 145, 178, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-peace);
  }

  .content :global(.case-study-title) {
    color: var(--mental-health-peace);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(220, 38, 38, 0.08);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--mental-health-community);
  }

  .content :global(.alert-title) {
    color: var(--mental-health-community);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important mental health concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(30, 58, 138, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(30, 58, 138, 0.2);
  }

  .content :global(.concept-highlight-title) {
    color: var(--mental-health-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(30, 58, 138, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Traditional healing integration styling */
  .content :global(.traditional-healing-highlight) {
    background-color: rgba(5, 150, 105, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(5, 150, 105, 0.2);
  }

  .content :global(.traditional-healing-highlight-title) {
    color: var(--mental-health-healing);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(5, 150, 105, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Rights-based care styling */
  .content :global(.rights-based-highlight) {
    background-color: rgba(124, 58, 237, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(124, 58, 237, 0.2);
  }

  .content :global(.rights-based-highlight-title) {
    color: var(--mental-health-consciousness);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(124, 58, 237, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Community sovereignty styling */
  .content :global(.sovereignty-highlight) {
    background-color: rgba(245, 158, 11, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .content :global(.sovereignty-highlight-title) {
    color: var(--mental-health-flourish);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Crisis response and care styling */
  .content :global(.crisis-care-highlight) {
    background-color: rgba(8, 145, 178, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(8, 145, 178, 0.2);
  }

  .content :global(.crisis-care-highlight-title) {
    color: var(--mental-health-peace);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(8, 145, 178, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Compassionate care and emotional healing styling */
  .content :global(.compassion-highlight) {
    background-color: rgba(236, 72, 153, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(236, 72, 153, 0.2);
  }

  .content :global(.compassion-highlight-title) {
    color: var(--mental-health-compassion);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(236, 72, 153, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Wisdom and insight styling */
  .content :global(.wisdom-highlight) {
    background-color: rgba(99, 102, 241, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .content :global(.wisdom-highlight-title) {
    color: var(--mental-health-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
    padding-bottom: 0.5rem;
  }

  /* Wholeness and integration styling */
  .content :global(.wholeness-highlight) {
    background-color: rgba(16, 185, 129, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .content :global(.wholeness-highlight-title) {
    color: var(--mental-health-wholeness);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
    padding-bottom: 0.5rem;
  }
</style>
