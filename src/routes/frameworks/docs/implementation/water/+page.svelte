<!-- src/routes/frameworks/docs/implementation/water/+page.svelte -->
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
        'theory-of-change': "Theory of Change",
        'executive-summary': "Executive Summary",
        'quick-implementation-guide': "Quick Implementation Guide",
        'youth-leadership-guide': "Youth Leadership Guide",
        
        // Main framework sections (01-11)
        '01-guiding-principles': "Guiding Principles",
        '02-institutional-policy-framework': "Institutional & Policy Framework",
        '03-financing-investment': "Financing & Investment",
        '04-service-delivery-infrastructure': "Service Delivery & Infrastructure",
        '05-monitoring-accountability': "Monitoring & Accountability",
        '06-climate-environmental-integration': "Climate & Environmental Integration",
        '07-innovation-knowledge-sharing': "Innovation & Knowledge Sharing",
        '08-crisis-response-adaptation': "Crisis Response & Adaptation",
        '09-social-behavioral-change': "Social & Behavioral Change",
        '10-global-partnerships': "Global Partnerships",
        '11-ethical-systems-framing': "Ethical & Systems Framing",
        
        // Implementation materials
        'implementation-roadmap': "Implementation Roadmap",
        'regional-implementation-blueprints': "Regional Implementation Blueprints",
        'visual-accessibility-aids': "Visual & Accessibility Aids",
        'glossary': "Glossary"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'theory-of-change': "Förändrings teori",
        'executive-summary': "Verkställande sammanfattning",
        'quick-implementation-guide': "Snabb implementerings guide",
        'youth-leadership-guide': "Ungdoms ledarskaps guide",
        
        // Main framework sections (Swedish)
        '01-guiding-principles': "Vägledande principer",
        '02-institutional-policy-framework': "Institutionellt & policy ramverk",
        '03-financing-investment': "Finansiering & investering",
        '04-service-delivery-infrastructure': "Tjänsteleverans & infrastruktur",
        '05-monitoring-accountability': "Övervakning & ansvarighet",
        '06-climate-environmental-integration': "Klimat & miljöintegration",
        '07-innovation-knowledge-sharing': "Innovation & kunskapsdelning",
        '08-crisis-response-adaptation': "Krishantering & anpassning",
        '09-social-behavioral-change': "Social & beteende förändring",
        '10-global-partnerships': "Globala partnerskap",
        '11-ethical-systems-framing': "Etiskt & system ramverk",
        
        // Implementation materials
        'implementation-roadmap': "Implementerings färdplan",
        'regional-implementation-blueprints': "Regional implementerings ritningar",
        'visual-accessibility-aids': "Visuell & tillgänglighets hjälpmedel",
        'glossary': "Ordlista"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Guiding Principles': 'Principles',
      'Institutional & Policy Framework': 'Institutional',
      'Financing & Investment': 'Financing',
      'Service Delivery & Infrastructure': 'Service Delivery',
      'Monitoring & Accountability': 'Monitoring',
      'Climate & Environmental Integration': 'Climate',
      'Innovation & Knowledge Sharing': 'Innovation',
      'Crisis Response & Adaptation': 'Crisis Response',
      'Social & Behavioral Change': 'Social Change',
      'Global Partnerships': 'Partnerships',
      'Ethical & Systems Framing': 'Ethics & Systems',
      'Implementation Roadmap': 'Roadmap',
      'Regional Implementation Blueprints': 'Regional Blueprints',
      'Visual & Accessibility Aids': 'Visual Aids',
      // Swedish short titles
      'Vägledande principer': 'Principer',
      'Institutionellt & policy ramverk': 'Institutionellt',
      'Finansiering & investering': 'Finansiering',
      'Tjänsteleverans & infrastruktur': 'Tjänsteleverans',
      'Övervakning & ansvarighet': 'Övervakning',
      'Klimat & miljöintegration': 'Klimat',
      'Innovation & kunskapsdelning': 'Innovation',
      'Krishantering & anpassning': 'Krishantering',
      'Social & beteende förändring': 'Social förändring',
      'Globala partnerskap': 'Partnerskap',
      'Etiskt & system ramverk': 'Etik & system',
      'Implementerings färdplan': 'Färdplan',
      'Regional implementerings ritningar': 'Regional ritningar',
      'Visuell & tillgänglighets hjälpmedel': 'Visuella hjälpmedel'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/water-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `water-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is an accessible guide
  $: isQuickGuideActive = activeSection === 'quick-implementation-guide';
  $: isSupplementaryActive = ['theory-of-change', 'executive-summary', 'quick-implementation-guide', 'youth-leadership-guide', 'implementation-roadmap', 'regional-implementation-blueprints', 'visual-accessibility-aids', 'glossary'].includes(activeSection);

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

  // Get the total number of core framework sections (01-11)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['executive-summary', 'quick-implementation-guide', 'youth-leadership-guide'].includes(section)
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToWaterGovernance: "New to Water Governance?",
        startWithQuickGuide: "Start with our practical guide that explains how communities can begin transforming their water systems today.",
        readQuickGuide: "Read the Quick Implementation Guide",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundation: "Foundation",
        governance: "Governance & Systems",
        implementation: "Implementation",
        resources: "Resources"
      },
      sv: {
        newToWaterGovernance: "Ny inom vatten styrning?",
        startWithQuickGuide: "Börja med vår praktiska guide som förklarar hur samhällen kan börja transformera sina vattensystem idag.",
        readQuickGuide: "Läs snabb implementerings guiden",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        foundation: "Grund",
        governance: "Styrning & system",
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
    <!-- Quick Access Card for Water Framework -->
    {#if !isPrintMode && !isQuickGuideActive && activeSection === 'index'}
      <div class="water-guide-card">
        <div class="card-content">
          <div class="card-icon">💧</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToWaterGovernance')}</h3>
            <p>{getLocalizedText('startWithQuickGuide')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('quick-implementation-guide')}>
              {getLocalizedText('readQuickGuide')} <span class="arrow-icon">→</span>
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
              class:has-active={['theory-of-change'].includes(activeSection) || coreFrameworkSections.slice(0, 3).some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌊</span>
              <span class="accordion-title">{getLocalizedText('foundation')}</span>
              <span class="section-count">(4)</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'theory-of-change'}
                  on:click={() => setActiveSection('theory-of-change')}
                >
                  <span class="nav-icon">🗺️</span>
                  <span class="nav-title">{getSectionTitle('theory-of-change')}</span>
                </button>
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

          <!-- Governance & Systems Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={coreFrameworkSections.slice(3, 8).some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getLocalizedText('governance')}</span>
              <span class="section-count">({coreFrameworkSections.slice(3, 8).length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(3, 8) as section}
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
              class:has-active={coreFrameworkSections.slice(8).some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getLocalizedText('implementation')}</span>
              <span class="section-count">({coreFrameworkSections.slice(8).length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(8) as section}
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
              class:has-active={isSupplementaryActive && activeSection !== 'theory-of-change'}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getLocalizedText('resources')}</span>
              <span class="section-count">(7)</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'executive-summary'}
                  on:click={() => setActiveSection('executive-summary')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">{getSectionTitle('executive-summary')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'quick-implementation-guide'}
                  on:click={() => setActiveSection('quick-implementation-guide')}
                >
                  <span class="nav-icon">🚀</span>
                  <span class="nav-title">{getSectionTitle('quick-implementation-guide')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'youth-leadership-guide'}
                  on:click={() => setActiveSection('youth-leadership-guide')}
                >
                  <span class="nav-icon">🌊</span>
                  <span class="nav-title">{getSectionTitle('youth-leadership-guide')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'implementation-roadmap'}
                  on:click={() => setActiveSection('implementation-roadmap')}
                >
                  <span class="nav-icon">🗺️</span>
                  <span class="nav-title">{getSectionTitle('implementation-roadmap')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'regional-implementation-blueprints'}
                  on:click={() => setActiveSection('regional-implementation-blueprints')}
                >
                  <span class="nav-icon">🌍</span>
                  <span class="nav-title">{getSectionTitle('regional-implementation-blueprints')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'visual-accessibility-aids'}
                  on:click={() => setActiveSection('visual-accessibility-aids')}
                >
                  <span class="nav-icon">👁️</span>
                  <span class="nav-title">{getSectionTitle('visual-accessibility-aids')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'glossary'}
                  on:click={() => setActiveSection('glossary')}
                >
                  <span class="nav-icon">📖</span>
                  <span class="nav-title">{getSectionTitle('glossary')}</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 11) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 11</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section === 'index'}
            <!-- Render the loaded markdown content and show constellation map -->
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
          
          <!-- Navigation buttons at bottom of quick guide -->
          {#if section === 'quick-implementation-guide' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('quick')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-guiding-principles')}>
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
        <h1>Water & Sanitation (WASH) Governance Framework Implementation</h1>
        <h2>Overview</h2>
        <p>The Global Framework for Water & Sanitation (WASH) Governance emerges as a transformative blueprint for achieving universal access to safely managed water and sanitation while healing our planet's water systems.</p>
        <p>This framework reimagines water governance as grounded in human rights, planetary stewardship, and Indigenous wisdom, creating pathways to justice, resilience, and regeneration.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Water & Sanitation Framework color scheme - ocean blues, life-giving teals, earth greens */
  :root {
    --water-primary: #0369a1; /* Deep Ocean Blue - depth, trust, reliability */
    --water-secondary: #0891b2; /* Cyan Blue - flow, movement, accessibility */
    --water-accent: #0d9488; /* Teal - balance, healing, sustainability */
    --water-sacred: #1e40af; /* Sacred Blue - spiritual connection, reverence */
    --water-light: #67e8f9; /* Light Cyan - purity, clarity, hope */
    --water-earth: #15803d; /* Forest Green - life, growth, regeneration */
    --water-justice: #dc2626; /* Strong Red - urgency, justice, human rights */
    --water-wisdom: #4338ca; /* Indigo - traditional knowledge, wisdom */
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
    background-color: rgba(13, 148, 136, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(3, 105, 161, 0.1);
    color: var(--water-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(13, 148, 136, 0.1);
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
    background-color: rgba(13, 148, 136, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--water-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--water-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(3, 105, 161, 0.1), rgba(13, 148, 136, 0.1));
    border: 1px solid rgba(3, 105, 161, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--water-primary);
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
    background-color: rgba(3, 105, 161, 0.1);
    color: var(--water-primary);
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
    background: linear-gradient(90deg, rgba(3, 105, 161, 0.1), rgba(13, 148, 136, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--water-primary);
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
    background: linear-gradient(90deg, var(--water-primary), var(--water-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--water-primary);
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
    color: var(--water-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--water-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--water-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--water-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(103, 232, 249, 0.1);
    border-left: 4px solid var(--water-sacred);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--water-sacred);
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
    color: var(--water-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--water-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with water-themed bullets */
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

  /* Apply water symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "💧";
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
    color: var(--water-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🌊";
    color: var(--water-light);
  }

  /* Table styles for water framework */
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
    background: linear-gradient(to right, var(--water-primary), var(--water-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--water-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(103, 232, 249, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(103, 232, 249, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Water guide card */
  .water-guide-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(3, 105, 161, 0.1);
    border: 1px solid rgba(3, 105, 161, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .water-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(3, 105, 161, 0.3);
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
    color: var(--water-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--water-primary);
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
    background-color: var(--water-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--water-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--water-primary);
    border: 1px solid var(--water-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(103, 232, 249, 0.1);
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
    color: var(--water-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--water-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--water-primary);
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
    color: var(--water-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--water-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--water-secondary);
    border-bottom-color: var(--water-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--water-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--water-primary);
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
    background-color: var(--water-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--water-secondary);
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

  /* Water Framework specific theme elements */

  /* Special callouts for water concepts */
  .content :global(.human-rights-callout) {
    background-color: rgba(220, 38, 38, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-justice);
  }

  .content :global(.sacred-waters-callout) {
    background-color: rgba(67, 56, 202, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-wisdom);
  }

  .content :global(.regenerative-callout) {
    background-color: rgba(21, 128, 61, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-earth);
  }

  .content :global(.community-empowerment-callout) {
    background-color: rgba(13, 148, 136, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-accent);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(3, 105, 161, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-primary);
  }

  .content :global(.case-study-title) {
    color: var(--water-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(220, 38, 38, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--water-justice);
  }

  .content :global(.alert-title) {
    color: var(--water-justice);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important water concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(103, 232, 249, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(103, 232, 249, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--water-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(103, 232, 249, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Water rights principles styling */
  .content :global(.rights-highlight) {
    background-color: rgba(220, 38, 38, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(220, 38, 38, 0.3);
  }

  .content :global(.rights-highlight-title) {
    color: var(--water-justice);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(220, 38, 38, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Implementation practices styling */
  .content :global(.implementation-highlight) {
    background-color: rgba(13, 148, 136, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(13, 148, 136, 0.3);
  }

  .content :global(.implementation-highlight-title) {
    color: var(--water-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(13, 148, 136, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Indigenous wisdom styling */
  .content :global(.indigenous-highlight) {
    background-color: rgba(67, 56, 202, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(67, 56, 202, 0.3);
  }

  .content :global(.indigenous-highlight-title) {
    color: var(--water-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(67, 56, 202, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Climate adaptation and environmental styling */
  .content :global(.climate-highlight) {
    background-color: rgba(21, 128, 61, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(21, 128, 61, 0.3);
  }

  .content :global(.climate-highlight-title) {
    color: var(--water-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(21, 128, 61, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
