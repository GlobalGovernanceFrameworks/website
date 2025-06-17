<!-- src/routes/frameworks/docs/implementation/biodiversity/+page.svelte -->
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
        'technical-guide-policymakers': "Technical Guide for Policymakers",
        'community-implementation-guide': "Community Implementation Guide",
        'youth-engagement-leadership-guide': "Youth Engagement & Leadership Guide",
        'corporate-transition-redemption-guide': "Corporate Transition & Redemption Guide",
        'indigenous-data-sovereignty-guide': "Indigenous Data Sovereignty Guide",
        
        // Main framework sections
        '00-philosophical-preamble': "Philosophical Preamble",
        '01-introduction-vision': "Introduction and Vision",
        '02-guiding-principles': "Guiding Principles", 
        '03-core-pillars': "Core Pillars",
        '04-governance-structure': "Governance Structure",
        '05-policy-mechanisms': "Policy Mechanisms",
        '06-stakeholder-engagement': "Stakeholder Engagement",
        '07-financing-mechanisms': "Financing Mechanisms",
        '08-implementation-roadmap': "Implementation Roadmap",
        '09-metrics-success': "Metrics for Success",
        '10-visualizations': "Visualizations",
        '11-challenges-solutions': "Challenges and Solutions",
        '12-implementation-tools': "Implementation Tools",
        '13-reparations-protocol': "Reparations Protocol",
        '14-conclusion-call-to-action': "Conclusion and Call to Action",
        
        // Appendices
        'appendix-a-synergy-esfmlg': "Appendix A: Synergy with ESFMLG",
        'appendix-b-glossary': "Appendix B: Comprehensive Glossary",
        'appendix-c-tool-library': "Appendix C: Complete Tool Library",
        'appendix-d-moral-edge-cases': "Appendix D: Moral Edge-Cases Analysis",
        'appendix-e-political-economy': "Appendix E: Political Economy Analysis",
        'appendix-f-feasibility-studies': "Appendix F: Feasibility Studies",
        'appendix-g-pilot-blueprints': "Appendix G: Pilot Program Blueprints",
        'appendix-h-scenario-planning': "Appendix H: Scenario Planning",
        'appendix-i-cooperation-protocols': "Appendix I: International Cooperation Protocols",
        'appendix-j-creative-outputs': "Appendix J: Creative Outputs Inspiration"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'technical-guide-policymakers': "Teknisk guide för beslutsfattare",
        'community-implementation-guide': "Samhällsguide för implementering",
        'youth-engagement-leadership-guide': "Ungdomsengagemang & ledarskapsguide",
        'corporate-transition-redemption-guide': "Företagsövergång & återlösningsguide",
        'indigenous-data-sovereignty-guide': "Urfolks datasuveränitet guide",
        
        // Main framework sections (Swedish)
        '00-philosophical-preamble': "Filosofisk inledning",
        '01-introduction-vision': "Introduktion och vision",
        '02-guiding-principles': "Vägledande principer",
        '03-core-pillars': "Kärnpelare",
        '04-governance-structure': "Styrningsstruktur",
        '05-policy-mechanisms': "Policymekanismer",
        '06-stakeholder-engagement': "Intressentengagemang",
        '07-financing-mechanisms': "Finansieringsmekanismer",
        '08-implementation-roadmap': "Implementeringsfärdplan",
        '09-metrics-success': "Mätning av framgång",
        '10-visualizations': "Visualiseringar",
        '11-challenges-solutions': "Utmaningar och lösningar",
        '12-implementation-tools': "Implementeringsverktyg",
        '13-reparations-protocol': "Reparationsprotokoll",
        '14-conclusion-call-to-action': "Slutsats och handlingsuppmaning",
        
        // Appendices (Swedish)
        'appendix-a-synergy-esfmlg': "Bilaga A: Synergi med ESFMLG",
        'appendix-b-glossary': "Bilaga B: Omfattande ordlista",
        'appendix-c-tool-library': "Bilaga C: Komplett verktygsbibliotek",
        'appendix-d-moral-edge-cases': "Bilaga D: Moraliska gränsfall",
        'appendix-e-political-economy': "Bilaga E: Politisk ekonomi analys",
        'appendix-f-feasibility-studies': "Bilaga F: Genomförbarhetsstudier",
        'appendix-g-pilot-blueprints': "Bilaga G: Pilotprogram ritningar",
        'appendix-h-scenario-planning': "Bilaga H: Scenarioplanering",
        'appendix-i-cooperation-protocols': "Bilaga I: Internationella samarbetsprotokoll",
        'appendix-j-creative-outputs': "Bilaga J: Kreativa outputs inspiration"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Philosophical Preamble': 'Preamble',
      'Introduction and Vision': 'Introduction',
      'Guiding Principles': 'Principles',
      'Core Pillars': 'Core Pillars',
      'Governance Structure': 'Governance',
      'Policy Mechanisms': 'Policy',
      'Stakeholder Engagement': 'Stakeholders',
      'Financing Mechanisms': 'Financing',
      'Implementation Roadmap': 'Roadmap',
      'Metrics for Success': 'Metrics',
      'Visualizations': 'Visualizations',
      'Challenges and Solutions': 'Challenges',
      'Implementation Tools': 'Tools',
      'Reparations Protocol': 'Reparations',
      'Conclusion and Call to Action': 'Conclusion',
      // Swedish short titles
      'Filosofisk inledning': 'Inledning',
      'Introduktion och vision': 'Introduktion',
      'Vägledande principer': 'Principer',
      'Kärnpelare': 'Kärnpelare',
      'Styrningsstruktur': 'Styrning',
      'Policymekanismer': 'Policy',
      'Intressentengagemang': 'Intressenter',
      'Finansieringsmekanismer': 'Finansiering',
      'Implementeringsfärdplan': 'Färdplan',
      'Mätning av framgång': 'Mätning',
      'Visualiseringar': 'Visualiseringar',
      'Utmaningar och lösningar': 'Utmaningar',
      'Implementeringsverktyg': 'Verktyg',
      'Reparationsprotokoll': 'Reparationer',
      'Slutsats och handlingsuppmaning': 'Slutsats'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/biodiversity-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `biodiversity-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is any of the guides
  $: isGuideActive = ['technical-guide-policymakers', 'community-implementation-guide', 'youth-engagement-leadership-guide', 'corporate-transition-redemption-guide', 'indigenous-data-sovereignty-guide'].includes(activeSection);
  $: isAppendixActive = activeSection.startsWith('appendix-');

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

  // Get the total number of core framework sections (00-14)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !isGuideActive && !isAppendixActive && section !== 'index'
  );

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to the Biodiversity Framework?",
        startWithGuides: "Start with one of our specialized guides that explain the framework for different stakeholders and contexts.",
        chooseGuide: "Choose a Guide",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        foundation: "Foundation",
        governance: "Governance & Policy",
        implementation: "Implementation",
        resources: "Resources"
      },
      sv: {
        newToFramework: "Ny inom biodiversitetsramverket?",
        startWithGuides: "Börja med en av våra specialiserade guider som förklarar ramverket för olika intressenter och sammanhang.",
        chooseGuide: "Välj en guide",
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

  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'technical-guide-policymakers',
        title: 'Technical Guide for Policymakers',
        description: 'Comprehensive guide for policymakers, government officials, and institutional leaders',
        icon: '📋'
      },
      {
        id: 'community-implementation-guide',
        title: 'Community Implementation Guide',
        description: 'Practical guide for local communities, indigenous groups, and grassroots organizations',
        icon: '🌱'
      },
      {
        id: 'youth-engagement-leadership-guide',
        title: 'Youth Engagement & Leadership Guide',
        description: 'Guide for youth leaders, students, and environmental activists',
        icon: '🌟'
      },
      {
        id: 'corporate-transition-redemption-guide',
        title: 'Corporate Transition & Redemption Guide',
        description: 'Guide for businesses transitioning to biodiversity-positive practices',
        icon: '🔄'
      },
      {
        id: 'indigenous-data-sovereignty-guide',
        title: 'Indigenous Data Sovereignty Guide',
        description: 'Guide for indigenous communities on data rights and digital sovereignty',
        icon: '🦅'
      }
    ],
    sv: [
      {
        id: 'technical-guide-policymakers',
        title: 'Teknisk guide för beslutsfattare',
        description: 'Omfattande guide för beslutsfattare, regeringstjänstemän och institutionella ledare',
        icon: '📋'
      },
      {
        id: 'community-implementation-guide',
        title: 'Samhällsguide för implementering',
        description: 'Praktisk guide för lokala samhällen, ursprungsgrupper och gräsrotsorganisationer',
        icon: '🌱'
      },
      {
        id: 'youth-engagement-leadership-guide',
        title: 'Ungdomsengagemang & ledarskapsguide',
        description: 'Guide för ungdomsledare, studenter och miljöaktivister',
        icon: '🌟'
      },
      {
        id: 'corporate-transition-redemption-guide',
        title: 'Företagsövergång & återlösningsguide',
        description: 'Guide för företag som övergår till biodiversitetspositiva metoder',
        icon: '🔄'
      },
      {
        id: 'indigenous-data-sovereignty-guide',
        title: 'Urfolks datasuveränitet guide',
        description: 'Guide för ursprungssamhällen om datarättigheter och digital suveränitet',
        icon: '🦅'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;

  function selectGuide(guide) {
    setActiveSection(guide);
  }
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Biodiversity Framework -->
    {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
      <div class="biodiversity-guide-card">
        <div class="card-content">
          <div class="card-icon">🌿</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithGuides')}</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle" on:click|stopPropagation={toggleDropdown}>
                {getLocalizedText('chooseGuide')} <span class="arrow-icon">▾</span>
              </button>
              {#if isDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => selectGuide(guide.id)}>
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
              <span class="nav-title">Overview</span>
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
              class:has-active={isGuideActive || isAppendixActive}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getLocalizedText('resources')}</span>
              <span class="section-count">({guides.length + Object.keys(data.sections || {}).filter(section => section.startsWith('appendix-')).length})</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <!-- Guides -->
                {#each guides as guide}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === guide.id}
                    on:click={() => setActiveSection(guide.id)}
                  >
                    <span class="nav-icon">{guide.icon}</span>
                    <span class="nav-title">{guide.title}</span>
                  </button>
                {/each}
                <!-- Appendices -->
                {#each Object.keys(data.sections || {}).filter(section => section.startsWith('appendix-')) as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📋</span>
                    <span class="nav-title">{getSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 14) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 15</span>
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
          
          <!-- Navigation buttons at bottom of guides -->
          {#if isGuideActive && guides.some(g => g.id === section) && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide(section.replace('-guide', '').replace('policymakers', 'policy'))}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('index')}>
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
        <h1>Global Governance Biodiversity Implementation Framework</h1>
        <h2>Overview</h2>
        <p>The Global Governance Biodiversity Implementation Framework emerges as a revolutionary blueprint for planetary healing, weaving together indigenous sovereignty, economic transformation, and cultural mobilization into a tapestry of hope for our living Earth.</p>
        <p>This framework reimagines governance to honor every species, ecosystem, and genetic lineage as a co-creator of Earth's story, from Amazon rainforest communities asserting digital sovereignty to coral reefs gaining legal personhood.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Biodiversity Framework color scheme - forest greens and earth tones */
  :root {
    --bio-primary: #2d5016; /* Deep Forest Green */
    --bio-secondary: #4a7c29; /* Forest Green */
    --bio-accent: #6b8e3d; /* Sage Green */
    --bio-light: #a8c573; /* Light Green */
    --bio-earth: #8b6f47; /* Earth Brown */
    --bio-highlight: #c7a876; /* Golden Sage */
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
    background-color: rgba(74, 124, 41, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(45, 80, 22, 0.1);
    color: var(--bio-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(74, 124, 41, 0.1);
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
    background-color: rgba(74, 124, 41, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--bio-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--bio-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 41, 0.1));
    border: 1px solid rgba(45, 80, 22, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--bio-primary);
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
    background-color: rgba(45, 80, 22, 0.1);
    color: var(--bio-primary);
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
    background: linear-gradient(90deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 41, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--bio-primary);
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
    background: linear-gradient(90deg, var(--bio-primary), var(--bio-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--bio-primary);
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
    color: var(--bio-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--bio-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--bio-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--bio-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(168, 197, 115, 0.1);
    border-left: 4px solid var(--bio-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--bio-earth);
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
    color: var(--bio-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--bio-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with biodiversity-themed bullets */
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

  /* Apply nature symbols to all ul li EXCEPT those in section-nav */
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
    color: var(--bio-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🍃";
    color: var(--bio-light);
  }

  /* Table styles for biodiversity framework */
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
    background: linear-gradient(to right, var(--bio-primary), var(--bio-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--bio-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(168, 197, 115, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(168, 197, 115, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Biodiversity guide card */
  .biodiversity-guide-card {
    background: linear-gradient(135deg, rgba(168, 197, 115, 0.1) 0%, rgba(107, 142, 61, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(45, 80, 22, 0.1);
    border: 1px solid rgba(45, 80, 22, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .biodiversity-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(45, 80, 22, 0.3);
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
    color: var(--bio-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--bio-primary);
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
    background-color: var(--bio-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--bio-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--bio-primary);
    border: 1px solid var(--bio-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(168, 197, 115, 0.1);
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
    color: var(--bio-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--bio-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--bio-primary);
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
    color: var(--bio-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--bio-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--bio-secondary);
    border-bottom-color: var(--bio-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--bio-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--bio-primary);
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
    background-color: var(--bio-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--bio-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
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
    background-color: rgba(168, 197, 115, 0.1);
  }
  
  .guide-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .guide-desc {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .guide-info {
    display: flex;
    flex-direction: column;
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

  /* Biodiversity Framework specific theme elements */

  /* Special callouts for biodiversity concepts */
  .content :global(.indigenous-callout) {
    background-color: rgba(139, 111, 71, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-earth);
  }

  .content :global(.ecosystem-callout) {
    background-color: rgba(45, 80, 22, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-primary);
  }

  .content :global(.cultural-callout) {
    background-color: rgba(199, 168, 118, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-highlight);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(107, 142, 61, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-accent);
  }

  .content :global(.case-study-title) {
    color: var(--bio-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #C43B3B;
  }

  .content :global(.alert-title) {
    color: #C43B3B;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(168, 197, 115, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(168, 197, 115, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--bio-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(168, 197, 115, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Rights recognition styling */
  .content :global(.rights-highlight) {
    background-color: rgba(74, 124, 41, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(74, 124, 41, 0.3);
  }

  .content :global(.rights-highlight-title) {
    color: var(--bio-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(74, 124, 41, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic transformation styling */
  .content :global(.economic-highlight) {
    background-color: rgba(199, 168, 118, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(199, 168, 118, 0.3);
  }

  .content :global(.economic-highlight-title) {
    color: var(--bio-highlight);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(199, 168, 118, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
