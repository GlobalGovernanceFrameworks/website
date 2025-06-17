<!-- src/routes/frameworks/docs/implementation/energy/+page.svelte -->
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
    title: "Klimat- och Energistyrningsramverk",
    overview: "Översikt",
    paragraph1: "Klimat- och Energistyrningsramverket erbjuder en omfattande styrningsarkitektur för att begränsa uppvärmningen till 1,5°C, påskynda omställningen till ren energi och bygga klimatresiliens för sårbara samhällen.",
    paragraph2: "Detta ramverk integrerar fyra pelare - klimatminskning, klimatanpassning, energiomställning och innovation - med en flernivåstyrningsstruktur och principer som främjar ekologisk balans, rättvisa och vetenskapsbaserat beslutsfattande."
  };

  // English translations as fallback
  const introEn = {
    title: "Climate & Energy Governance Framework",
    overview: "Overview",
    paragraph1: "The Climate & Energy Governance Framework provides a comprehensive governance architecture to limit warming to 1.5°C, accelerate clean energy transition, and build climate resilience for vulnerable communities.",
    paragraph2: "This framework integrates four pillars—mitigation, adaptation, energy transition, and innovation—with a multi-level governance structure and principles that promote ecological balance, equity, and science-based decision making."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        'climate-energy-technical-guide': "Technical Guide for Policymakers",
        'climate-energy-stakeholder-guide': "Stakeholder Implementation Guide",
        'climate-energy-action-guide': "Climate Action Guide",
        'index': "Overview",
        '01-introduction': "Introduction",
        '02-guiding-principles': "Guiding Principles",
        '03-governance-structure': "Governance Structure",
        '04-core-pillars': "Core Pillars",
        '05-policy-mechanisms': "Policy Mechanisms",
        '06-stakeholder-engagement': "Stakeholder Engagement",
        '07-financing-the-framework': "Financing the Framework",
        '08-implementation-roadmap': "Implementation Roadmap",
        '09-metrics-for-success': "Metrics for Success",
        '10-challenges-and-solutions': "Challenges & Solutions",
        '11-implementation-tools': "Implementation Tools",
        '12-conclusion': "Conclusion",
        'appendix-a': "Appendix A: Existing Frameworks",
        'appendix-b': "Appendix B: Key Terms and Acronyms"
      },
      sv: {
        'climate-energy-technical-guide': "Teknisk Guide för Beslutsfattare",
        'climate-energy-stakeholder-guide': "Genomförandeguide för Intressenter",
        'climate-energy-action-guide': "Klimataktionsguide",
        'index': "Översikt",
        '01-introduction': "Introduktion",
        '02-guiding-principles': "Vägledande Principer",
        '03-governance-structure': "Styrningsstruktur",
        '04-core-pillars': "Kärnpelare",
        '05-policy-mechanisms': "Policymekanismer",
        '06-stakeholder-engagement': "Intressentengagemang",
        '07-financing-the-framework': "Finansiering av Ramverket",
        '08-implementation-roadmap': "Implementeringsplan",
        '09-metrics-for-success': "Framgångsmått",
        '10-challenges-and-solutions': "Utmaningar & Lösningar",
        '11-implementation-tools': "Implementeringsverktyg",
        '12-conclusion': "Slutsats",
        'appendix-a': "Bilaga A: Befintliga Ramverk",
        'appendix-b': "Bilaga B: Nyckeltermer och Förkortningar"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Group sections logically with multi-lingual support
  function getSectionCategoryTitle(category) {
    const categoryTitles = {
      en: {
        overview: "Overview",
        foundation: "Foundation",
        governance: "Governance", 
        implementation: "Implementation",
        resources: "Resources",
      },
      sv: {
        overview: "Översikt",
        foundation: "Grund",
        governance: "Styrning", 
        implementation: "Implementering",
        resources: "Resurser",
      }
    };
    
    return (categoryTitles[currentLocale] || categoryTitles.en)[category] || category;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      en: {
        'Introduction': 'Introduction',
        'Guiding Principles': 'Principles',
        'Governance Structure': 'Structure',
        'Core Pillars': 'Pillars',
        'Policy Mechanisms': 'Policy',
        'Stakeholder Engagement': 'Stakeholders',
        'Financing the Framework': 'Financing',
        'Implementation Roadmap': 'Roadmap',
        'Metrics for Success': 'Metrics',
        'Challenges & Solutions': 'Challenges',
        'Implementation Tools': 'Tools',
        'Conclusion': 'Conclusion',
        'Technical Guide for Policymakers': 'Technical Guide',
        'Stakeholder Implementation Guide': 'Stakeholder Guide',
        'Climate Action Guide': 'Action Guide'
      },
      sv: {
        'Introduktion': 'Introduktion',
        'Vägledande Principer': 'Principer',
        'Styrningsstruktur': 'Struktur',
        'Kärnpelare': 'Pelare',
        'Policymekanismer': 'Policy',
        'Intressentengagemang': 'Intressenter',
        'Finansiering av Ramverket': 'Finansiering',
        'Implementeringsplan': 'Plan',
        'Framgångsmått': 'Mått',
        'Utmaningar & Lösningar': 'Utmaningar',
        'Implementeringsverktyg': 'Verktyg',
        'Slutsats': 'Slutsats',
        'Teknisk Guide för Beslutsfattare': 'Teknisk Guide',
        'Genomförandeguide för Intressenter': 'Intressentguide',
        'Klimataktionsguide': 'Aktionsguide'
      }
    };
    
    return (shortTitles[currentLocale] || shortTitles.en)[fullTitle] || fullTitle;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the lite guide PDF
  function downloadLiteGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/climate-energy-framework-lite${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `climate-energy-framework-lite${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the guide selector
  let selectedGuide = 'climate-energy-technical-guide';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'climate-energy-technical-guide',
        title: 'Technical Guide',
        description: 'Detailed guide for policymakers, government officials, and technical experts',
        icon: '📊'
      },
      {
        id: 'climate-energy-stakeholder-guide',
        title: 'Stakeholder Guide',
        description: 'Implementation guide for businesses, civil society, and regional authorities',
        icon: '🤝'
      },
      {
        id: 'climate-energy-action-guide',
        title: 'Action Guide',
        description: 'Practical guide for youth, communities, and local leaders',
        icon: '🌱'
      }
    ],
    sv: [
      {
        id: 'climate-energy-technical-guide',
        title: 'Teknisk Guide',
        description: 'Detaljerad guide för beslutsfattare, regeringstjänstemän och tekniska experter',
        icon: '📊'
      },
      {
        id: 'climate-energy-stakeholder-guide',
        title: 'Intressentguide',
        description: 'Implementeringsguide för företag, civilsamhälle och regionala myndigheter',
        icon: '🤝'
      },
      {
        id: 'climate-energy-action-guide',
        title: 'Handlingsguide',
        description: 'Praktisk guide för ungdomar, samhällen och lokala ledare',
        icon: '🌱'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = activeSection === 'climate-energy-technical-guide' || 
                      activeSection === 'climate-energy-stakeholder-guide' || 
                      activeSection === 'climate-energy-action-guide';

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let governanceOpen = false;
  let implementationOpen = false;
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

  // Get the core framework sections (01-12)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/)
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Check if current section is supplementary
  $: isSupplementaryActive = ['appendix-a', 'appendix-b'].includes(activeSection);
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Lite Guides -->
    {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
      <div class="lite-guide-card">
        <div class="card-content">
          <div class="card-icon">📘</div>
          <div class="card-text">
            <h3>New to the Climate & Energy Framework?</h3>
            <p>Start with one of our simplified guides that explain the core concepts for different audiences.</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle" on:click={toggleDropdown}>
                Choose a Guide <span class="arrow-icon">▾</span>
              </button>
              {#if isDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => { selectGuide(guide.id); isDropdownOpen = false; }}>
                      <span class="guide-icon">{guide.icon}</span>
                      <div class="guide-info">
                        <span class="guide-title">{guide.title}</span>
                        <span class="guide-desc">{guide.description}</span>
                      </div>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
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
              class:has-active={isGuideActive || coreFrameworkSections.slice(0, 2).some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
              <span class="section-count">(5)</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each guides as guide}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === guide.id}
                    on:click={() => setActiveSection(guide.id)}
                  >
                    <span class="nav-icon">{guide.icon}</span>
                    <span class="nav-title">{getShortSectionTitle(guide.id)}</span>
                  </button>
                {/each}
                {#each coreFrameworkSections.slice(0, 2) as section}
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

          <!-- Governance Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={coreFrameworkSections.slice(2, 6).some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('governance')}</span>
              <span class="section-count">({coreFrameworkSections.slice(2, 6).length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(2, 6) as section}
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
              class:has-active={coreFrameworkSections.slice(6).some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getSectionCategoryTitle('implementation')}</span>
              <span class="section-count">({coreFrameworkSections.slice(6).length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each coreFrameworkSections.slice(6) as section}
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
                  class:active={activeSection === 'appendix-a'}
                  on:click={() => setActiveSection('appendix-a')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">{getSectionTitle('appendix-a')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'appendix-b'}
                  on:click={() => setActiveSection('appendix-b')}
                >
                  <span class="nav-icon">📖</span>
                  <span class="nav-title">{getSectionTitle('appendix-b')}</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 12) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 12</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          <!-- Language fallback notice -->
          {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section) && section !== 'index'}
            <div class="language-fallback-notice">
              <div class="notice-icon">🌐</div>
              <div class="notice-content">
                <strong>{currentLocale === 'sv' ? 'Innehåll på svenska kommer snart' : 'Content in your language coming soon'}</strong>
                <p>{currentLocale === 'sv' ? 'Detta avsnitt visas för närvarande på engelska tills den svenska översättningen är klar.' : 'This section is currently displayed in English until translation is complete.'}</p>
              </div>
            </div>
          {/if}
          {#if section.startsWith('climate-energy-')}
            <!-- Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="guide-selector">
                <h2>Climate & Energy Framework Guides</h2>
                <p>Choose the guide version that best matches your needs:</p>
                
                <div class="guide-cards">
                  {#each guides as guide}
                    <div 
                      class="guide-card" 
                      class:active={activeSection === guide.id}
                      on:click={() => selectGuide(guide.id)}
                    >
                      <div class="guide-icon">{guide.icon}</div>
                      <div class="guide-title">{guide.title}</div>
                      <div class="guide-desc">{guide.description}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
            
            <!-- Render the selected Guide -->
            <svelte:component this={data.sections[section].default} />
            
            <!-- Navigation buttons at bottom of guide -->
            {#if !isPrintMode}
              <div class="lite-guide-navigation">
                <button class="secondary-btn" on:click={() => downloadLiteGuide(section.replace('climate-energy-', ''))}>
                  Download PDF Version <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('index')}>
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
              
              {#if parseInt(activeSection.substring(0, 2)) < 12}
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
  /* Climate & Energy Framework color scheme */
  :root {
    --energy-primary: #2B4B8C; /* Updated to blue for energy */
    --energy-secondary: #4B8AC2; /* Lighter blue */
    --energy-accent: #6DAA3F; /* Green for sustainability */
    --energy-success: #20B2AA; /* Teal for innovation */
    --energy-warning: #F5A623; /* Orange for caution */
    --energy-danger: #C43B3B; /* Red for urgency */
    --energy-light: #E8F4FD; /* Very light blue */
    --energy-dark: #1A365D; /* Dark blue */
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
    background-color: rgba(75, 138, 194, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--energy-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(75, 138, 194, 0.1);
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
    background-color: rgba(75, 138, 194, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--energy-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--energy-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1), rgba(75, 138, 194, 0.1));
    border: 1px solid rgba(43, 75, 140, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--energy-primary);
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
    color: var(--energy-primary);
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
    background: linear-gradient(90deg, rgba(43, 75, 140, 0.1), rgba(75, 138, 194, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--energy-primary);
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
    background: linear-gradient(90deg, var(--energy-primary), var(--energy-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--energy-primary);
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
    background-color: var(--energy-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--energy-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }

  /* Styles for Lite Guide card */
  .lite-guide-card {
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    border: 1px solid rgba(43, 75, 140, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .lite-guide-card .dropdown-menu {
    position: absolute;
    top: 100%; /* Position from bottom of button */
    left: 0;
    z-index: 1001; /* Higher than surrounding elements */
    min-width: 300px;
    max-width: 350px; /* Limit width */
    overflow: visible; /* Ensure visible outside container */
    border: 1px solid rgba(43, 75, 140, 0.3); /* Blue-tinted border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Stronger shadow */
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
    color: var(--energy-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--energy-primary);
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
    background-color: var(--energy-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--energy-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--energy-primary);
    border: 1px solid var(--energy-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #e8eaf6; /* Light blue */
    transform: translateY(-1px);
  }
  
  .lite-guide-navigation {
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
    color: var(--energy-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--energy-secondary);
  }
  
  .content :global(h3),
  :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--energy-accent);
  }

  :global(h4) {
    font-size: 1.2rem;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }

  /* Blockquotes */
  :global(blockquote) {
    background-color: #f3f6f9;
    border-left: 4px solid var(--energy-primary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--energy-primary);
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
    color: var(--energy-primary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--energy-dark);
  }

  /* Lists */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    color: #4b5563;
  }

  .content :global(ul) {
    list-style-type: none;
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1rem;
  }

  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: var(--energy-primary);
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
    color: var(--energy-primary);
    font-weight: 600;
  }

  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧";
    color: var(--energy-secondary);
  }

  /* Tables */
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
    background: linear-gradient(to right, var(--energy-primary), var(--energy-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--energy-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: #f8f9fc;
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: #e8eaf6;
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: #e8eaf6;
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--energy-primary);
    text-align: left;
    border-top: 1px solid var(--energy-primary);
  }

  :global(.content td.highlight) {
    color: var(--energy-primary);
    font-weight: 600;
  }

  /* Links */
  .content :global(a) {
    color: var(--energy-primary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--energy-dark);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--energy-dark);
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
    color: var(--energy-secondary);
    text-decoration: none;
    border-bottom: 1px dotted var(--energy-secondary);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--energy-primary);
    border-bottom-color: var(--energy-primary);
  }

  .content :global(table a) {
    color: var(--energy-primary);
    font-weight: 600;
  }

  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--energy-primary);
  }
  
  /* Dropdown styles for guides */
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
    min-width: 300px !important;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    margin-top: 0;
    padding-top: 10px;
    white-space: normal !important;
    display: none;
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
    background-color: #e8eaf6;
  }
  
  /* Guide selector styles */
  .guide-selector {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .guide-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .guide-card {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .guide-card:hover {
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    transform: translateY(-2px);
    border-color: var(--energy-primary);
  }
  
  .guide-card.active {
    border-color: var(--energy-primary);
    background-color: #e8eaf6;
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--energy-primary);
  }
  
  .guide-desc {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .guide-info {
    display: flex;
    flex-direction: column;
  }
  
  /* For dropdown guide items */
  .dropdown-item .guide-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
    display: inline-block;
    width: 24px;
    text-align: center;
  }
  
  .dropdown-item .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .dropdown-item .guide-desc {
    font-size: 0.75rem;
    color: #6b7280;
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
    
    .lite-guide-navigation {
      flex-direction: column;
      gap: 1rem;
    }
    
    .lite-guide-navigation button {
      width: 100%;
    }

    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
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

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(75, 138, 194, 0.1);
    border: 1px solid rgba(75, 138, 194, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--energy-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--energy-secondary);
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
