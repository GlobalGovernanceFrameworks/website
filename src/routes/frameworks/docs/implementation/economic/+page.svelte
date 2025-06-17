<!-- src/routes/frameworks/docs/implementation/economic/+page.svelte -->
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
    title: "Ekonomiskt Integrationssystem",
    overview: "Översikt",
    paragraph1: "Det ekonomiska integrationssystemet erbjuder en omfattande styrningsarkitektur för att skapa rättvisa, hållbara och sammankopplade ekonomiska system som stödjer både lokal suveränitet och global samverkan.",
    paragraph2: "Detta ramverk integrerar lokala, regionala och globala tillvägagångssätt genom innovativa mekanismer som gemenskapsvalutor, etiska handelszoner, adaptiv basinkomst och gemensam förvaltning av resurser för att omvandla ekonomiska utmaningar till möjligheter för delat välstånd."
  };

  // English translations as fallback
  const introEn = {
    title: "Economic Integration Framework",
    overview: "Overview",
    paragraph1: "The Economic Integration Framework provides a comprehensive governance architecture to create equitable, sustainable, and interconnected economic systems that support both local sovereignty and global cooperation.",
    paragraph2: "This framework integrates local, regional, and global approaches through innovative mechanisms such as community currencies, ethical trade zones, adaptive universal basic income, and commons governance to transform economic challenges into opportunities for shared prosperity."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'technical-guide': "Technical Guide for Policymakers",
        'community-guide': "Community Economic Implementation Guide",
        'youth-guide': "Youth Economic Action Guide",
        'digital-ethics': "Digital Economic Ethics Guide",
        'indigenous-guide': "Indigenous Economic Stewardship Guide",
        
        // Core framework sections
        'introduction': "Introduction",
        'core-principles': "Core Principles",
        'local-implementation': "Local Implementation",
        'regional-implementation': "Regional Implementation",
        'global-implementation': "Global Implementation",
        'nested-support': "Nested Support Systems",
        'tech-commons': "Knowledge & Technology Commons",
        'transitional-pathways': "Transitional Pathways",
        'decision-protocols': "Decision Protocols",
        'cross-domain': "Cross-Domain Integration",
        'adaptive-governance': "Adaptive Governance",
        'monitoring': "Monitoring & Evaluation",
        'public-engagement': "Public Engagement",
        'timeline': "Implementation Timeline",
        'challenges-lessons': "Implementation Challenges",
        'visualizations': "Visualizations",
        'conclusion': "Conclusion"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'technical-guide': "Teknisk Guide för Beslutsfattare",
        'community-guide': "Samhällsguide för Ekonomisk Implementering",
        'youth-guide': "Ekonomisk Handlingsguide för Ungdomar",
        'digital-ethics': "Digital Ekonomietik Guide",
        'indigenous-guide': "Urfolks Ekonomisk Förvaltningsguide",
        
        // Core framework sections (Swedish)
        'introduction': "Introduktion",
        'core-principles': "Kärnprinciper",
        'local-implementation': "Lokal Implementering",
        'regional-implementation': "Regional Implementering",
        'global-implementation': "Global Implementering",
        'nested-support': "Integrerade Stödsystem",
        'tech-commons': "Kunskaps- & Teknikallmänningar",
        'transitional-pathways': "Övergångsvägar",
        'decision-protocols': "Beslutsprotokoll",
        'cross-domain': "Tvärdomänintegration",
        'adaptive-governance': "Adaptiv Styrning",
        'monitoring': "Övervakning & Utvärdering",
        'public-engagement': "Offentligt Engagemang",
        'timeline': "Implementeringstidslinje",
        'challenges-lessons': "Implementeringsutmaningar",
        'visualizations': "Visualiseringar",
        'conclusion': "Slutsats"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section);
    
    const shortTitles = {
      'Introduction': 'Introduction',
      'Core Principles': 'Principles',
      'Local Implementation': 'Local',
      'Regional Implementation': 'Regional',
      'Global Implementation': 'Global',
      'Nested Support Systems': 'Support',
      'Knowledge & Technology Commons': 'Tech Commons',
      'Transitional Pathways': 'Pathways',
      'Decision Protocols': 'Decisions',
      'Cross-Domain Integration': 'Integration',
      'Adaptive Governance': 'Governance',
      'Monitoring & Evaluation': 'Monitoring',
      'Public Engagement': 'Engagement',
      'Implementation Timeline': 'Timeline',
      'Implementation Challenges': 'Challenges',
      'Visualizations': 'Visuals',
      'Conclusion': 'Conclusion'
    };
    
    return shortTitles[fullTitle] || fullTitle;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the lite guide PDF
  function downloadLiteGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/economic-framework-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `economic-framework-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the guide selector
  let selectedGuide = 'technical-guide';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'technical-guide',
        title: 'Technical Guide',
        description: 'Detailed guide for policymakers, economists, and government officials',
        icon: '📊'
      },
      {
        id: 'community-guide',
        title: 'Community Guide',
        description: 'Implementation guide for local leaders, cooperatives, and community organizations',
        icon: '🤝'
      },
      {
        id: 'youth-guide',
        title: 'Youth Guide',
        description: 'Practical guide for youth, entrepreneurs, and student groups',
        icon: '🌱'
      },
      {
        id: 'digital-ethics',
        title: 'Digital Ethics Guide',
        description: 'Guide for digital economics, ethics, and tech governance',
        icon: '💻'
      },
      {
        id: 'indigenous-guide',
        title: 'Indigenous Guide',
        description: 'Stewardship guide for indigenous communities and traditional knowledge systems',
        icon: '🌿'
      }
    ],
    sv: [
      {
        id: 'technical-guide',
        title: 'Teknisk Guide',
        description: 'Detaljerad guide för beslutsfattare, ekonomer och regeringstjänstemän',
        icon: '📊'
      },
      {
        id: 'community-guide',
        title: 'Samhällsguide',
        description: 'Implementeringsguide för lokala ledare, kooperativ och samhällsorganisationer',
        icon: '🤝'
      },
      {
        id: 'youth-guide',
        title: 'Ungdomsguide',
        description: 'Praktisk guide för ungdomar, entreprenörer och studentgrupper',
        icon: '🌱'
      },
      {
        id: 'digital-ethics',
        title: 'Digital Etikguide',
        description: 'Guide för digital ekonomi, etik och teknikstyrning',
        icon: '💻'
      },
      {
        id: 'indigenous-guide',
        title: 'Urfolksguide',
        description: 'Förvaltningsguide för urfolkssamhällen och traditionella kunskapssystem',
        icon: '🌿'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = ['technical-guide', 'community-guide', 'youth-guide', 'digital-ethics', 'indigenous-guide'].includes(activeSection);
  $: isSupplementaryActive = isGuideActive;

  // For handling dropdown states
  let isCardDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let implementationOpen = false;
  let governanceOpen = false;
  let resourcesOpen = false;

  function toggleCardDropdown() {
    isCardDropdownOpen = !isCardDropdownOpen;
  }

  function toggleNavDropdown() {
    isNavDropdownOpen = !isNavDropdownOpen;
    // Close the card dropdown if it's open
    if (isNavDropdownOpen) isCardDropdownOpen = false;
  }

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleGovernance() {
    governanceOpen = !governanceOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const cardDropdown = document.querySelector('.economic-guide-card .dropdown');
      const navDropdown = document.querySelector('.dropdown-li');
      
      if (cardDropdown && !cardDropdown.contains(event.target)) {
        isCardDropdownOpen = false;
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

  // Get sections for different accordion groups - filtering out guides and grouping logically
  $: regularSections = Object.keys(data.sections || {}).filter(section => 
    !['technical-guide', 'community-guide', 'youth-guide', 'digital-ethics', 'indigenous-guide'].includes(section)
  );

  // Group sections logically
  $: foundationSections = ['introduction', 'core-principles'];
  $: implementationSections = ['local-implementation', 'regional-implementation', 'global-implementation', 'nested-support', 'tech-commons', 'transitional-pathways'];
  $: governanceSections = ['decision-protocols', 'cross-domain', 'adaptive-governance', 'monitoring', 'public-engagement', 'timeline', 'challenges-lessons', 'visualizations', 'conclusion'];

  // For progress indicator - count only non-guide sections
  $: totalSections = regularSections.filter(s => s !== 'index').length;
  $: currentSectionIndex = regularSections.filter(s => s !== 'index').indexOf(activeSection) + 1;
  $: isCoreSection = regularSections.includes(activeSection) && activeSection !== 'index';
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Economic Integration Framework -->
    {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
      <div class="economic-guide-card">
        <div class="card-content">
          <div class="card-icon">💰</div>
          <div class="card-text">
            <h3>New to the Economic Integration Framework?</h3>
            <p>Start with one of our simplified guides that explain the core concepts for different audiences.</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle" on:click={toggleCardDropdown}>
                Choose a Guide <span class="arrow-icon">▾</span>
              </button>
              {#if isCardDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => {
                      selectGuide(guide.id);
                      isCardDropdownOpen = false; // Close dropdown after selection
                    }}>
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
              class:has-active={foundationSections.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">Foundation</span>
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
                    <span class="nav-icon">📋</span>
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
              class:has-active={implementationSections.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">⚙️</span>
              <span class="accordion-title">Implementation</span>
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
                    <span class="nav-icon">🔧</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Governance & Operations Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={governanceSections.some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">⚖️</span>
              <span class="accordion-title">Governance & Operations</span>
              <span class="section-count">({governanceSections.length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each governanceSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📊</span>
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
              <span class="section-count">({guides.length})</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
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
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((currentSectionIndex / totalSections) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {currentSectionIndex} of {totalSections}</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          <!-- Language fallback notice (skip for index since we have Swedish overview) -->
          {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section) && section !== 'index'}
            <div class="language-fallback-notice">
              <div class="notice-icon">🌐</div>
              <div class="notice-content">
                <strong>{currentLocale === 'sv' ? 'Innehåll på svenska kommer snart' : 'Content in your language coming soon'}</strong>
                <p>{currentLocale === 'sv' ? 'Detta avsnitt visas för närvarande på engelska tills den svenska översättningen är klar.' : 'This section is currently displayed in English until translation is complete.'}</p>
              </div>
            </div>
          {/if}
          {#if isGuideActive && section === activeSection}
            <!-- Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="guide-selector">
                <h2>Economic Integration Framework Guides</h2>
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
              <div class="guide-navigation">
                <button class="secondary-btn" on:click={() => downloadLiteGuide(section.replace('-guide', ''))}>
                  Download PDF Version <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('introduction')}>
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
              {#if currentSectionIndex > 1}
                <button class="nav-btn prev-btn" on:click={() => {
                  const nonIndexSections = regularSections.filter(s => s !== 'index');
                  const prevSection = nonIndexSections[currentSectionIndex - 2];
                  setActiveSection(prevSection);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if currentSectionIndex < totalSections}
                <button class="nav-btn next-btn" on:click={() => {
                  const nonIndexSections = regularSections.filter(s => s !== 'index');
                  const nextSection = nonIndexSections[currentSectionIndex];
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
  /* Economic Integration Framework color scheme - blue-green palette for economic themes */
  :root {
    --economic-primary: #088F8F; /* Teal Blue-Green - prosperity, stability, growth */
    --economic-secondary: #48BF91; /* Light Sea Green - innovation, sustainability, balance */
    --economic-accent: #20B2AA; /* Light Sea Green - cooperation, harmony, flow */
    --economic-earth: #4682B4; /* Steel Blue - infrastructure, reliability, trust */
    --economic-prosperity: #00CED1; /* Dark Turquoise - abundance, opportunity, potential */
    --economic-deep: #006666; /* Dark Teal - wisdom, depth, permanence */
    --economic-light: #E0F8F8; /* Very Light Cyan - transparency, openness, clarity */
    --economic-community: #5F9EA0; /* Cadet Blue - community, cooperation, shared values */
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
    background-color: rgba(8, 143, 143, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(8, 143, 143, 0.1);
    color: var(--economic-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(8, 143, 143, 0.1);
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
    background-color: rgba(8, 143, 143, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--economic-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--economic-earth);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(8, 143, 143, 0.1), rgba(72, 191, 145, 0.1));
    border: 1px solid rgba(8, 143, 143, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--economic-primary);
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
    background-color: rgba(8, 143, 143, 0.1);
    color: var(--economic-primary);
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
    background: linear-gradient(90deg, rgba(8, 143, 143, 0.1), rgba(72, 191, 145, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--economic-primary);
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
    background: linear-gradient(90deg, var(--economic-primary), var(--economic-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--economic-deep);
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
    color: var(--economic-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--economic-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--economic-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--economic-prosperity);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(72, 191, 145, 0.1);
    border-left: 4px solid var(--economic-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--economic-deep);
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
    color: var(--economic-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--economic-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with economic themed bullets */
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

  /* Apply economic symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "💰";
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
    color: var(--economic-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🤝";
    color: var(--economic-community);
  }

  /* Table styles for economic integration framework */
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
    background: linear-gradient(to right, var(--economic-primary), var(--economic-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--economic-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(72, 191, 145, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(72, 191, 145, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Economic integration framework guide card */
  .economic-guide-card {
    background: linear-gradient(135deg, rgba(72, 191, 145, 0.1) 0%, rgba(8, 143, 143, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(8, 143, 143, 0.1);
    border: 1px solid rgba(8, 143, 143, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .economic-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(8, 143, 143, 0.3);
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
    color: var(--economic-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--economic-primary);
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
    background-color: var(--economic-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--economic-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--economic-primary);
    border: 1px solid var(--economic-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(72, 191, 145, 0.1);
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
    color: var(--economic-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--economic-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--economic-primary);
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
    color: var(--economic-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--economic-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--economic-secondary);
    border-bottom-color: var(--economic-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--economic-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--economic-primary);
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
    background-color: var(--economic-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--economic-earth);
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
 
  .dropdown-li {
    position: relative;
  }

  .dropdown-li .dropdown-menu {
    width: 300px;
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
    background-color: rgba(72, 191, 145, 0.1) !important;
    color: var(--economic-primary) !important;
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
  .dropdown-li.active .guide-title,
  .dropdown-li.active .guide-desc,
  .dropdown-li.active .guide-icon {
    color: inherit !important;
  }

  /* Hover state */
  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(72, 191, 145, 0.1) !important;
    color: var(--economic-primary) !important;
  }

  /* Fix for guide icons in dropdown */
  .dropdown-item .guide-icon {
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
    background-color: rgba(72, 191, 145, 0.1);
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
    box-shadow: 0 4px 6px rgba(8, 143, 143, 0.1);
    transform: translateY(-2px);
    border-color: var(--economic-primary);
  }
  
  .guide-card.active {
    border-color: var(--economic-primary);
    background-color: rgba(72, 191, 145, 0.1);
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--economic-primary);
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
  }
  
  .dropdown-item .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .dropdown-item .guide-desc {
    font-size: 0.75rem;
    color: #6b7280;
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
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
    }
  }

  /* Economic Integration Framework specific theme elements */

  /* Special callouts for economic concepts */
  .content :global(.prosperity-callout) {
    background-color: rgba(8, 143, 143, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--economic-primary);
  }

  .content :global(.sustainability-callout) {
    background-color: rgba(72, 191, 145, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--economic-secondary);
  }

  .content :global(.cooperation-callout) {
    background-color: rgba(32, 178, 170, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--economic-accent);
  }

  .content :global(.infrastructure-callout) {
    background-color: rgba(70, 130, 180, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--economic-earth);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(0, 206, 209, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--economic-prosperity);
  }

  .content :global(.case-study-title) {
    color: var(--economic-prosperity);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(255, 107, 107, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #dc2626;
  }

  .content :global(.alert-title) {
    color: #dc2626;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important economic concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(72, 191, 145, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(72, 191, 145, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--economic-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(72, 191, 145, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic integration and trade styling */
  .content :global(.integration-highlight) {
    background-color: rgba(8, 143, 143, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(8, 143, 143, 0.3);
  }

  .content :global(.integration-highlight-title) {
    color: var(--economic-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(8, 143, 143, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Community currency and local economics styling */
  .content :global(.community-highlight) {
    background-color: rgba(95, 158, 160, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(95, 158, 160, 0.3);
  }

  .content :global(.community-highlight-title) {
    color: var(--economic-community);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(95, 158, 160, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Innovation and technology styling */
  .content :global(.innovation-highlight) {
    background-color: rgba(0, 206, 209, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(0, 206, 209, 0.3);
  }

  .content :global(.innovation-highlight-title) {
    color: var(--economic-prosperity);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(0, 206, 209, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Resource governance styling */
  .content :global(.governance-highlight) {
    background-color: rgba(32, 178, 170, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(32, 178, 170, 0.3);
  }

  .content :global(.governance-highlight-title) {
    color: var(--economic-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(32, 178, 170, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Infrastructure and reliability styling */
  .content :global(.infrastructure-highlight) {
    background-color: rgba(70, 130, 180, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(70, 130, 180, 0.3);
  }

  .content :global(.infrastructure-highlight-title) {
    color: var(--economic-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(70, 130, 180, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Transparency and clarity styling */
  .content :global(.transparency-highlight) {
    background-color: rgba(224, 248, 248, 0.5);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(224, 248, 248, 0.8);
  }

  .content :global(.transparency-highlight-title) {
    color: var(--economic-deep);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(224, 248, 248, 0.8);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(72, 191, 145, 0.1);
    border: 1px solid rgba(72, 191, 145, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--economic-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--economic-secondary);
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
