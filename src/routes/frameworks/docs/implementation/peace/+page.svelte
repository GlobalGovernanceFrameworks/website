```svelte
<!-- src/routes/frameworks/docs/implementation/peace/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import ConstellationMap from '$lib/components/ConstellationMap.svelte';
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
    title: "Freds- och Konfliktlösningsramverk",
    overview: "Översikt",
    paragraph1: "Freds- och Konfliktlösningsramverket erbjuder en omfattande styrningsarkitektur för att förebygga konflikter, lösa befintliga tvister på ett fredligt sätt och hantera de systemiska drivkrafterna bakom våld.",
    paragraph2: "Detta ramverk integrerar lokala, regionala och globala tillvägagångssätt med både traditionella och digitala verktyg, trauma-informerade metoder och utvecklingsbaserade värdesystem för att omvandla konflikter till möjligheter för positivt samarbete."
  };

  // English translations as fallback
  const introEn = {
    title: "Peace & Conflict Resolution Framework",
    overview: "Overview",
    paragraph1: "The Peace & Conflict Resolution Framework provides a comprehensive governance architecture to prevent conflicts, resolve existing disputes peacefully, and address the systemic drivers of violence.",
    paragraph2: "This framework integrates local, regional, and global approaches with both traditional and digital tools, trauma-informed methods, and developmental value systems to transform conflict into opportunities for positive cooperation."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        'technical-guide-policymakers': "Technical Guide for Policymakers",
        'community-peace-guide': "Community Peace Implementation Guide",
        'youth-peace-action-guide': "Youth Peace Action Guide",
        'digital-peace-ethics-guide': "Digital Peace Ethics Guide",
        'index': "Overview",
        'preamble': "Preamble",
        'core-principles': "Core Principles",
        'local-implementation': "Local Implementation",
        'indigenous-integration': "Indigenous Integration",
        'regional-implementation': "Regional Implementation",
        'global-implementation': "Global Implementation",
        'digital-infrastructure': "Digital Infrastructure",
        'ai-ethics': "AI & Digital Ethics",
        'emerging-technologies': "Emerging Technologies",
        'non-state-actors': "Non-State Actors",
        'military-transformation': "Military Transformation",
        'whistleblower-protection': "Whistleblower Protection",
        'structural-prevention': "Structural Prevention",
        'climate-resource': "Climate & Resource Conflicts",
        'transitional-justice': "Transitional Justice",
        'mental-health': "Mental Health Support",
        'developmental-value-systems': "Value Systems",
        'educational-cultural-infrastructure': "Educational Infrastructure",
        'peace-financing': "Peace Financing",
        'peace-business-integration': "Business Integration",
        'media-information': "Media & Information",
        'context-specific-roadmaps': "Implementation Roadmaps",
        'implementation-timeline': "Implementation Timeline",
        'implementation-challenges': "Implementation Challenges",
        'visualizations': "Visualizations",
        'measuring-success': "Measuring Success",
        'cross-domain-integration': "Cross-Domain Integration",
        'conclusion': "Conclusion",
        'quick-guide': "Quick Guide"
      },
      sv: {
        'technical-guide-policymakers': "Teknisk Guide för Beslutsfattare",
        'community-peace-guide': "Samhällsguide för Fred",
        'youth-peace-action-guide': "Fredshandlingsguide för Ungdomar",
        'digital-peace-ethics-guide': "Digital Fredsetik Guide",
        'index': "Översikt",
        'preamble': "Inledning",
        'core-principles': "Kärnprinciper",
        'local-implementation': "Lokal Implementering",
        'indigenous-integration': "Ursprungsfolksintegration",
        'regional-implementation': "Regional Implementering",
        'global-implementation': "Global Implementering",
        'digital-infrastructure': "Digital Infrastruktur",
        'ai-ethics': "AI & Digital Etik",
        'emerging-technologies': "Ny Teknik",
        'non-state-actors': "Icke-statliga Aktörer",
        'military-transformation': "Militär Omvandling",
        'whistleblower-protection': "Skydd för Visselblåsare",
        'structural-prevention': "Strukturell Prevention",
        'climate-resource': "Klimat- & Resurskonflikter",
        'transitional-justice': "Övergångsrättvisa",
        'mental-health': "Psykiskt Hälsostöd",
        'developmental-value-systems': "Värdesystem",
        'educational-cultural-infrastructure': "Utbildningsinfrastruktur",
        'peace-financing': "Fredsfinansiering",
        'peace-business-integration': "Företagsintegration",
        'media-information': "Media & Information",
        'context-specific-roadmaps': "Implementeringsplaner",
        'implementation-timeline': "Implementeringstidslinje",
        'implementation-challenges': "Implementeringsutmaningar",
        'visualizations': "Visualiseringar",
        'measuring-success': "Framgångsmätning",
        'cross-domain-integration': "Tvärdomänintegration",
        'conclusion': "Slutsats",
        'quick-guide': "Snabbguide"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section);
    
    const shortTitles = {
      en: {
        'Technical Guide for Policymakers': 'Technical Guide',
        'Community Peace Implementation Guide': 'Community Guide',
        'Youth Peace Action Guide': 'Youth Guide',
        'Digital Peace Ethics Guide': 'Digital Ethics',
        'Core Principles': 'Principles',
        'Local Implementation': 'Local',
        'Indigenous Integration': 'Indigenous',
        'Regional Implementation': 'Regional',
        'Global Implementation': 'Global',
        'Digital Infrastructure': 'Digital',
        'AI & Digital Ethics': 'AI Ethics',
        'Emerging Technologies': 'Tech',
        'Non-State Actors': 'Non-State',
        'Military Transformation': 'Military',
        'Whistleblower Protection': 'Whistleblower',
        'Structural Prevention': 'Prevention',
        'Climate & Resource Conflicts': 'Climate',
        'Transitional Justice': 'Justice',
        'Mental Health Support': 'Mental Health',
        'Value Systems': 'Values',
        'Educational Infrastructure': 'Education',
        'Peace Financing': 'Financing',
        'Business Integration': 'Business',
        'Media & Information': 'Media',
        'Implementation Roadmaps': 'Roadmaps',
        'Implementation Timeline': 'Timeline',
        'Implementation Challenges': 'Challenges',
        'Visualizations': 'Visuals',
        'Measuring Success': 'Metrics',
        'Cross-Domain Integration': 'Integration',
        'Conclusion': 'Conclusion'
      },
      sv: {
        'Teknisk Guide för Beslutsfattare': 'Teknisk Guide',
        'Samhällsguide för Fred': 'Samhällsguide',
        'Fredshandlingsguide för Ungdomar': 'Ungdomsguide',
        'Digital Fredsetik Guide': 'Digital Etik',
        'Kärnprinciper': 'Principer',
        'Lokal Implementering': 'Lokalt',
        'Ursprungsfolksintegration': 'Ursprungsfolk',
        'Regional Implementering': 'Regionalt',
        'Global Implementering': 'Globalt',
        'Digital Infrastruktur': 'Digital',
        'AI & Digital Etik': 'AI Etik',
        'Ny Teknik': 'Teknik',
        'Icke-statliga Aktörer': 'Icke-statligt',
        'Militär Omvandling': 'Militärt',
        'Skydd för Visselblåsare': 'Visselblåsare',
        'Strukturell Prevention': 'Prevention',
        'Klimat- & Resurskonflikter': 'Klimat',
        'Övergångsrättvisa': 'Rättvisa',
        'Psykiskt Hälsostöd': 'Psykisk Hälsa',
        'Värdesystem': 'Värden',
        'Utbildningsinfrastruktur': 'Utbildning',
        'Fredsfinansiering': 'Finansiering',
        'Företagsintegration': 'Företag',
        'Media & Information': 'Media',
        'Implementeringsplaner': 'Planer',
        'Implementeringstidslinje': 'Tidslinje',
        'Implementeringsutmaningar': 'Utmaningar',
        'Visualiseringar': 'Visuellt',
        'Framgångsmätning': 'Mätning',
        'Tvärdomänintegration': 'Integration',
        'Slutsats': 'Slutsats'
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
    const pdfUrl = `${base}/assets/pdf/peace-framework-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `peace-framework-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the guide selector
  let selectedGuide = 'technical-guide-policymakers';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'technical-guide-policymakers',
        title: 'Technical Guide',
        description: 'Detailed guide for policymakers, mediators, and government officials',
        icon: '📊'
      },
      {
        id: 'community-peace-guide',
        title: 'Community Guide',
        description: 'Implementation guide for local leaders, civil society, and community mediators',
        icon: '🤝'
      },
      {
        id: 'youth-peace-action-guide',
        title: 'Youth Guide',
        description: 'Practical guide for youth, educators, and community groups',
        icon: '🌱'
      },
      {
        id: 'digital-peace-ethics-guide',
        title: 'Digital Ethics Guide',
        description: 'Guide for digital peacebuilding, ethics, and tech governance',
        icon: '💻'
      }
    ],
    sv: [
      {
        id: 'technical-guide-policymakers',
        title: 'Teknisk Guide',
        description: 'Detaljerad guide för beslutsfattare, medlare och regeringstjänstemän',
        icon: '📊'
      },
      {
        id: 'community-peace-guide',
        title: 'Samhällsguide',
        description: 'Implementeringsguide för lokala ledare, civilsamhället och samhällsmediatorer',
        icon: '🤝'
      },
      {
        id: 'youth-peace-action-guide',
        title: 'Ungdomsguide',
        description: 'Praktisk guide för ungdomar, pedagoger och samhällsgrupper',
        icon: '🌱'
      },
      {
        id: 'digital-peace-ethics-guide',
        title: 'Digital Etikguide',
        description: 'Guide för digital fredsbyggande, etik och teknikstyrning',
        icon: '💻'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = activeSection === 'technical-guide-policymakers' || 
                     activeSection === 'community-peace-guide' || 
                     activeSection === 'youth-peace-action-guide' ||
                     activeSection === 'digital-peace-ethics-guide';

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let approachesOpen = false;
  let technologyOpen = false;
  let structuralOpen = false;
  let specializedOpen = false;
  let implementationOpen = false;
  let resourcesOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleApproaches() {
    approachesOpen = !approachesOpen;
  }

  function toggleTechnology() {
    technologyOpen = !technologyOpen;
  }

  function toggleStructural() {
    structuralOpen = !structuralOpen;
  }

  function toggleSpecialized() {
    specializedOpen = !specializedOpen;
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

  // Define section groupings for the 27 sections
  const sectionGroups = {
    foundation: ['preamble', 'core-principles'],
    approaches: ['local-implementation', 'indigenous-integration', 'regional-implementation', 'global-implementation'],
    technology: ['digital-infrastructure', 'ai-ethics', 'emerging-technologies'],
    structural: ['non-state-actors', 'military-transformation', 'whistleblower-protection', 'structural-prevention', 'climate-resource'],
    specialized: ['transitional-justice', 'mental-health', 'developmental-value-systems', 'educational-cultural-infrastructure', 'peace-financing', 'peace-business-integration', 'media-information'],
    implementation: ['context-specific-roadmaps', 'implementation-timeline', 'implementation-challenges'],
    resources: ['visualizations', 'measuring-success', 'cross-domain-integration', 'conclusion']
  };

  // Define which sections are "core" for progress tracking
  const coreSections = [
    'preamble', 'core-principles', 
    ...sectionGroups.approaches, 
    ...sectionGroups.technology, 
    ...sectionGroups.structural, 
    ...sectionGroups.specialized, 
    ...sectionGroups.implementation
  ];

  // Check if current section is a core section
  $: isCoreSection = coreSections.includes(activeSection);

  // Calculate progress
  $: currentCoreIndex = coreSections.indexOf(activeSection) + 1;
  $: totalCoreSections = coreSections.length;
  $: coreProgress = isCoreSection ? currentCoreIndex / totalCoreSections : 0;

  // Check if current section is supplementary
  $: isSupplementaryActive = sectionGroups.resources.includes(activeSection);
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
            <h3>New to the Peace & Conflict Resolution Framework?</h3>
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
              <span class="nav-title">Overview</span>
            </button>
          </div>

          <!-- Foundation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={isGuideActive || sectionGroups.foundation.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">Foundation</span>
              <span class="section-count">(6)</span>
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
                {#each sectionGroups.foundation as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📜</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Peace Approaches Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={approachesOpen}
              class:has-active={sectionGroups.approaches.some(section => activeSection === section)}
              on:click={toggleApproaches}
            >
              <span class="accordion-icon">🤝</span>
              <span class="accordion-title">Peace Approaches</span>
              <span class="section-count">({sectionGroups.approaches.length})</span>
              <span class="toggle-arrow" class:rotated={approachesOpen}>▼</span>
            </button>
            {#if approachesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.approaches as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🌍</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Technology & Digital Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={technologyOpen}
              class:has-active={sectionGroups.technology.some(section => activeSection === section)}
              on:click={toggleTechnology}
            >
              <span class="accordion-icon">💻</span>
              <span class="accordion-title">Technology & Digital</span>
              <span class="section-count">({sectionGroups.technology.length})</span>
              <span class="toggle-arrow" class:rotated={technologyOpen}>▼</span>
            </button>
            {#if technologyOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.technology as section}
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

          <!-- Structural & Security Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={structuralOpen}
              class:has-active={sectionGroups.structural.some(section => activeSection === section)}
              on:click={toggleStructural}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">Structural & Security</span>
              <span class="section-count">({sectionGroups.structural.length})</span>
              <span class="toggle-arrow" class:rotated={structuralOpen}>▼</span>
            </button>
            {#if structuralOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.structural as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🛡️</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Specialized Areas Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={specializedOpen}
              class:has-active={sectionGroups.specialized.some(section => activeSection === section)}
              on:click={toggleSpecialized}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">Specialized Areas</span>
              <span class="section-count">({sectionGroups.specialized.length})</span>
              <span class="toggle-arrow" class:rotated={specializedOpen}>▼</span>
            </button>
            {#if specializedOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.specialized as section}
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

          <!-- Implementation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={implementationOpen}
              class:has-active={sectionGroups.implementation.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">Implementation</span>
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
                    <span class="nav-icon">📋</span>
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
              <span class="section-count">({sectionGroups.resources.length})</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.resources as section}
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
         {#if section === 'technical-guide-policymakers' || 
               section === 'community-peace-guide' || 
               section === 'youth-peace-action-guide' ||
               section === 'digital-peace-ethics-guide'}
           <!-- Guide selector if we're in one of the guides and not in print mode -->
           {#if !isPrintMode}
             <div class="guide-selector">
               <h2>Peace & Conflict Resolution Framework Guides</h2>
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
               <button class="secondary-btn" on:click={() => downloadLiteGuide(section.replace('-guide', ''))}>
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
           <!-- Show constellation map for index section -->
           <ConstellationMap />
         {:else if section === 'index'}
           <!-- Render English introduction through the markdown component -->
           <svelte:component this={data.sections[section].default} />
         {:else if data.sections[section]}
           <!-- Render normal sections from markdown files -->
           <svelte:component this={data.sections[section].default} />
         {:else}
           <p>Section {section} not found</p>
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
 /* Peace & Conflict Resolution Framework color scheme */
 :root {
   --peace-primary: #5B6FBF; /* Blue-purple for peace */
   --peace-secondary: #8A94D6; /* Lighter blue-purple */
   --peace-accent: #9370DB; /* Medium purple for innovation */
   --peace-success: #20B2AA; /* Teal for harmony */
   --peace-warning: #F5A623; /* Orange for attention */
   --peace-danger: #C43B3B; /* Red for conflict */
   --peace-light: #EEF0FA; /* Very light blue-purple */
   --peace-dark: #404E9F; /* Dark blue-purple */
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
   background-color: rgba(138, 148, 214, 0.05);
 }

 .accordion-header.has-active {
   background-color: rgba(91, 111, 191, 0.1);
   color: var(--peace-primary);
   font-weight: 600;
 }

 .accordion-header.open {
   background-color: rgba(138, 148, 214, 0.1);
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
   background-color: rgba(138, 148, 214, 0.05);
   color: #374151;
 }

 .nav-item.active {
   background-color: var(--peace-primary);
   color: white;
   font-weight: 600;
 }

 .nav-item.active:hover {
   background-color: var(--peace-secondary);
 }

 .overview-item {
   background: linear-gradient(135deg, rgba(91, 111, 191, 0.1), rgba(138, 148, 214, 0.1));
   border: 1px solid rgba(91, 111, 191, 0.2);
   border-radius: 0.375rem;
   font-weight: 600;
   margin-bottom: 0.5rem;
 }

 .overview-item.active {
   background: var(--peace-primary);
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

 /* Styles for Lite Guide card */
 .lite-guide-card {
   background: linear-gradient(135deg, #eef0fa 0%, #d1d6f0 100%);
   border-radius: 0.75rem;
   margin-bottom: 2rem;
   box-shadow: 0 4px 6px rgba(91, 111, 191, 0.1);
   border: 1px solid rgba(91, 111, 191, 0.2);
   overflow: visible !important;
   position: relative;
   z-index: 1;
 }

 .lite-guide-card .dropdown-menu {
   position: absolute;
   top: 100%;
   left: 0;
   z-index: 1001;
   min-width: 300px;
   max-width: 350px;
   overflow: visible;
   border: 1px solid rgba(91, 111, 191, 0.3);
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
   color: var(--peace-primary);
   flex-shrink: 0;
 }
 
 .card-text {
   flex: 1;
   min-width: 200px;
 }
 
 .card-text h3 {
   margin: 0 0 0.5rem 0;
   color: var(--peace-primary);
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
   background-color: var(--peace-primary);
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s;
 }
 
 .primary-btn:hover {
   background-color: var(--peace-dark);
   transform: translateY(-1px);
 }
 
 .secondary-btn {
   background-color: white;
   color: var(--peace-primary);
   border: 1px solid var(--peace-primary);
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s;
 }
 
 .secondary-btn:hover {
   background-color: var(--peace-light);
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

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(91, 111, 191, 0.1), rgba(138, 148, 214, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--peace-primary);
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
    background: linear-gradient(90deg, var(--peace-primary), var(--peace-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--peace-primary);
    font-weight: 500;
  }

 /* Content styling */
 .content :global(h1) {
   font-size: 2rem;
   font-weight: 700;
   margin-bottom: 1.5rem;
   color: var(--peace-primary);
 }
 
 .content :global(h2) {
   font-size: 1.5rem;
   font-weight: 600;
   margin-top: 2rem;
   margin-bottom: 1rem;
   color: var(--peace-secondary);
 }
 
 .content :global(h3),
 :global(h4) {
   font-size: 1.25rem;
   font-weight: 600;
   margin-top: 1.5rem;
   margin-bottom: 0.75rem;
   color: var(--peace-accent);
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
   background-color: #f3f4fa;
   border-left: 4px solid var(--peace-primary);
   padding: 1rem 1.5rem;
   margin: 1.5rem 0;
   border-radius: 0.5rem;
 }

 :global(blockquote > p:first-child strong) {
   font-size: 1.1rem;
   color: var(--peace-primary);
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
   color: var(--peace-primary);
   text-decoration: underline;
   font-weight: 500;
 }

 :global(blockquote a:hover) {
   color: var(--peace-dark);
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
   content: "☮";
   position: absolute;
   left: -0.5em;
   color: var(--peace-primary);
   top: 0.15em;
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
   color: var(--peace-primary);
   font-weight: 600;
 }

 .content :global(ul ul), .content :global(ol ul) {
   margin-top: 0.5rem;
   margin-bottom: 0;
 }

 .content :global(ul ul li::before) {
   content: "•";
   color: var(--peace-secondary);
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
   background: linear-gradient(to right, var(--peace-primary), var(--peace-secondary));
 }

 :global(.content th) {
   padding: 0.75rem 1rem;
   font-weight: 600;
   text-align: left;
   color: #ffffff;
   border: none;
   border-bottom: 2px solid var(--peace-primary);
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
   background-color: var(--peace-light);
 }

 :global(.content tbody tr:last-child td) {
   border-bottom: none;
 }

 :global(.content table caption),
 :global(.content table tfoot) {
   background-color: var(--peace-light);
   padding: 0.75rem;
   font-size: 0.875rem;
   color: var(--peace-primary);
   text-align: left;
   border-top: 1px solid var(--peace-primary);
 }

 :global(.content td.highlight) {
   color: var(--peace-primary);
   font-weight: 600;
 }

 /* Links */
 .content :global(a) {
   color: var(--peace-primary);
   text-decoration: underline;
   font-weight: 500;
   transition: all 0.2s;
 }

 .content :global(a:hover) {
   color: var(--peace-dark);
   text-decoration: underline;
 }

 .content :global(a:active) {
   color: var(--peace-dark);
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
   color: var(--peace-secondary);
   text-decoration: none;
   border-bottom: 1px dotted var(--peace-secondary);
 }

 .content :global(a[href^="#"]):hover {
   color: var(--peace-primary);
   border-bottom-color: var(--peace-primary);
 }

 .content :global(table a) {
   color: var(--peace-primary);
   font-weight: 600;
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
   background-color: var(--peace-light);
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
   box-shadow: 0 4px 6px rgba(91, 111, 191, 0.1);
   transform: translateY(-2px);
   border-color: var(--peace-primary);
 }
 
 .guide-card.active {
   border-color: var(--peace-primary);
   background-color: var(--peace-light);
 }
 
 .guide-icon {
   font-size: 2rem;
   margin-bottom: 0.5rem;
 }
 
 .guide-title {
   font-weight: 600;
   margin-bottom: 0.5rem;
   color: var(--peace-primary);
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
</style>
