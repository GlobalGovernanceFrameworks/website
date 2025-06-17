<!-- src/routes/frameworks/docs/implementation/food-systems/+page.svelte -->
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
    title: "Mat- och Jordbrukssystems Ramverk",
    overview: "Översikt",
    paragraph1: "Mat- och Jordbrukssystems Ramverket är en omfattande, anpassningsbar plan för att omvandla globala matsystem. Det integrerar regenerativt jordbruk, Traditionell Ekologisk Kunskap (TEK), och innovativa teknologier för att skapa hållbara, rättvisa och motståndskraftiga matsystem.",
    paragraph2: "Detta ramverk omdefinerar globala matsystem som regenerativa, inkluderande ekosystem som ger näring till både människor och planeten, med mål att minska hunger med 50%, uppnå 30% regenerativt jordbruk, och stärka 5 miljoner bönder till 2035."
  };

  // English translations as fallback
  const introEn = {
    title: "Food Systems & Agriculture Framework",
    overview: "Overview",
    paragraph1: "The Food Systems & Agriculture Framework is a comprehensive, adaptable blueprint for transforming global food systems. It integrates regenerative agriculture, Traditional Ecological Knowledge (TEK), and innovative technologies to create sustainable, equitable, and resilient food systems.",
    paragraph2: "This framework reimagines global food systems as regenerative, inclusive ecosystems that nourish both people and planet, with goals to reduce hunger by 50%, achieve 30% regenerative farmland, and empower 5 million farmers by 2035."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'quick-guide': "Quick Guide: Technical Version",
        'quick-guide-medium': "Quick Guide: Community Version",
        'quick-guide-youth': "Quick Guide: Youth & Grassroots",
        
        // Core framework sections (01-15)
        '01-introduction': "Introduction",
        '02-definitions': "Definitions",
        '03-glossary': "Glossary",
        '04-theory-of-change': "Theory of Change",
        '05-stakeholder-engagement': "Stakeholder Engagement",
        '06-core-principles': "Core Principles",
        '07-strategic-objectives': "Strategic Objectives",
        '08-implementation-mechanisms': "Implementation Mechanisms",
        '09-systemic-leverage-points': "Systemic Leverage Points",
        '10-regional-customization': "Regional Customization",
        '11-risk-management': "Risk Management",
        '12-timeline-milestones': "Timeline & Milestones",
        '13-communication-advocacy': "Communication & Advocacy",
        '14-visual-appendix': "Visual Appendix",
        '15-conclusion': "Conclusion"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'quick-guide': "Snabbguide: Teknisk Version",
        'quick-guide-medium': "Snabbguide: Samhällsversion",
        'quick-guide-youth': "Snabbguide: Ungdom & Gräsrötter",
        
        // Core framework sections (Swedish)
        '01-introduction': "Introduktion",
        '02-definitions': "Definitioner",
        '03-glossary': "Ordlista",
        '04-theory-of-change': "Förändringsteori",
        '05-stakeholder-engagement': "Intressentengagemang",
        '06-core-principles': "Kärnprinciper",
        '07-strategic-objectives': "Strategiska Mål",
        '08-implementation-mechanisms': "Implementeringsmekanismer",
        '09-systemic-leverage-points': "Systemiska Hävstångspunkter",
        '10-regional-customization': "Regional Anpassning",
        '11-risk-management': "Riskhantering",
        '12-timeline-milestones': "Tidslinje & Milstolpar",
        '13-communication-advocacy': "Kommunikation & Påverkan",
        '14-visual-appendix': "Visuellt Appendix",
        '15-conclusion': "Slutsats"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Introduction': 'Introduction',
      'Definitions': 'Definitions',
      'Glossary': 'Glossary',
      'Theory of Change': 'Theory of Change',
      'Stakeholder Engagement': 'Stakeholders',
      'Core Principles': 'Principles',
      'Strategic Objectives': 'Objectives',
      'Implementation Mechanisms': 'Implementation',
      'Systemic Leverage Points': 'Leverage Points',
      'Regional Customization': 'Regional',
      'Risk Management': 'Risk Management',
      'Timeline & Milestones': 'Timeline',
      'Communication & Advocacy': 'Advocacy',
      'Visual Appendix': 'Visual Appendix',
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
    const pdfUrl = `${base}/assets/pdf/food-systems-framework-lite${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `food-systems-framework-lite${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the quick guide selector
  let selectedQuickGuide = 'quick-guide';
  
  function selectQuickGuide(guide) {
    selectedQuickGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'quick-guide',
        title: 'Technical Version',
        description: 'Detailed guide for policy implementers, government officials, and organizations',
        icon: '📊'
      },
      {
        id: 'quick-guide-medium',
        title: 'Community Version',
        description: 'Balanced guide for local authorities, extension workers, and community groups',
        icon: '🤝'
      },
      {
        id: 'quick-guide-youth',
        title: 'Youth & Grassroots Version',
        description: 'Visual, accessible guide for youth groups, schools, and diverse communities',
        icon: '🌱'
      }
    ],
    sv: [
      {
        id: 'quick-guide',
        title: 'Teknisk Version',
        description: 'Detaljerad guide för policyimplementerare, regeringstjänstemän och organisationer',
        icon: '📊'
      },
      {
        id: 'quick-guide-medium',
        title: 'Samhällsversion',
        description: 'Balanserad guide för lokala myndigheter, jordbruksrådgivare och samhällsgrupper',
        icon: '🤝'
      },
      {
        id: 'quick-guide-youth',
        title: 'Ungdom & Gräsrötter Version',
        description: 'Visuell, tillgänglig guide för ungdomsgrupper, skolor och olika samhällen',
        icon: '🌱'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the quick guides
  $: isQuickGuideActive = activeSection === 'quick-guide' || 
                         activeSection === 'quick-guide-medium' || 
                         activeSection === 'quick-guide-youth';
  $: isSupplementaryActive = isQuickGuideActive;

  // For handling dropdown states
  let isDropdownOpen = false;
  let isNavDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let strategicOpen = false;
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

  function toggleStrategic() {
    strategicOpen = !strategicOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  function toggleCardDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function handleClickOutside(event) {
    if (browser) {
      const cardDropdown = document.querySelector('.food-systems-guide-card .dropdown');
      const navDropdown = document.querySelector('.dropdown-li');
      
      if (cardDropdown && !cardDropdown.contains(event.target)) {
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

  // Get the total number of core framework sections (01-15) in order
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !section.startsWith('quick-guide')
  ).sort();

  // Check if this is a core framework section
  $: isCoreSection = activeSection.match(/^\d{2}-/);
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
  <!-- Quick Access Card for Food Systems Framework -->
  {#if !isPrintMode && !isQuickGuideActive && activeSection === 'index'}
    <div class="food-systems-guide-card">
      <div class="card-content">
        <div class="card-icon">🌾</div>
        <div class="card-text">
          <h3>New to the Food Systems Framework?</h3>
          <p>Start with one of our simplified guides that explain the core concepts for different audiences.</p>
        </div>
        <div class="card-actions">
          <div class="dropdown">
            <button class="primary-btn dropdown-toggle" on:click={toggleCardDropdown}>
              Choose a Quick Guide <span class="arrow-icon">▾</span>
            </button>
            {#if isDropdownOpen}
              <div class="dropdown-menu">
                {#each guides as guide}
                  <button class="dropdown-item" on:click={() => {
                    selectQuickGuide(guide.id);
                    isDropdownOpen = false; // Close dropdown after selection
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
              class:has-active={['01-introduction', '02-definitions', '03-glossary', '04-theory-of-change'].some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">Foundation</span>
              <span class="section-count">(4)</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each ['01-introduction', '02-definitions', '03-glossary', '04-theory-of-change'] as section}
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

          <!-- Strategic Framework Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={strategicOpen}
              class:has-active={coreFrameworkSections.slice(4, 9).some(section => activeSection === section)}
              on:click={toggleStrategic}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">Strategic Framework</span>
              <span class="section-count">({coreFrameworkSections.slice(4, 9).length})</span>
              <span class="toggle-arrow" class:rotated={strategicOpen}>▼</span>
            </button>
            {#if strategicOpen}
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
              <span class="accordion-title">Implementation</span>
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
              <span class="accordion-title">Resources</span>
              <span class="section-count">(3)</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 15) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 15</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section.startsWith('quick-guide')}
            <!-- Quick Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="quick-guide-selector">
                <h2>Food Systems Framework Quick Guides</h2>
                <p>Choose the guide version that best matches your needs:</p>
                
                <div class="guide-cards">
                  {#each guides as guide}
                    <div 
                      class="guide-card" 
                      class:active={activeSection === guide.id}
                      on:click={() => selectQuickGuide(guide.id)}
                    >
                      <div class="guide-icon">{guide.icon}</div>
                      <div class="guide-title">{guide.title}</div>
                      <div class="guide-desc">{guide.description}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
            
            <!-- Render the selected Quick Guide -->
            <svelte:component this={data.sections[section].default} />
            
            <!-- Navigation buttons at bottom of quick guide -->
            {#if !isPrintMode}
              <div class="guide-navigation">
                <button class="secondary-btn" on:click={() => downloadLiteGuide(section.replace('quick-guide', '').replace('-', ''))}>
                  Download PDF Version <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('01-introduction')}>
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
  /* Food Systems Framework color scheme - earth greens, growth, and sustainability */
  :root {
    --food-primary: #2e7d32; /* Forest Green - sustainability, growth, nature */
    --food-secondary: #4caf50; /* Fresh Green - renewal, life, agriculture */
    --food-accent: #8bc34a; /* Light Green - innovation, freshness, young growth */
    --food-earth: #795548; /* Earth Brown - soil, roots, traditional knowledge */
    --food-harvest: #ff9800; /* Harvest Orange - abundance, warmth, community */
    --food-sky: #03a9f4; /* Sky Blue - water, climate, global perspective */
    --food-seed: #ffc107; /* Seed Gold - potential, value, transformation */
    --food-deep: #1b5e20; /* Deep Green - wisdom, stability, permanence */
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
    background-color: rgba(76, 175, 80, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--food-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(76, 175, 80, 0.1);
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
    background-color: rgba(76, 175, 80, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--food-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--food-deep);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.1), rgba(76, 175, 80, 0.1));
    border: 1px solid rgba(46, 125, 50, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--food-primary);
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
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--food-primary);
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
    background: linear-gradient(90deg, rgba(46, 125, 50, 0.1), rgba(76, 175, 80, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--food-primary);
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
    background: linear-gradient(90deg, var(--food-primary), var(--food-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--food-primary);
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
  
  .map-container {
    margin: 2rem 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--food-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--food-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--food-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--food-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid var(--food-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--food-earth);
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
    color: var(--food-primary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--food-deep);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with food-themed bullets */
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

  /* Apply food symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌾";
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
    color: var(--food-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🌱";
    color: var(--food-accent);
  }

  /* Table styles for food systems framework */
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
    background: linear-gradient(to right, var(--food-primary), var(--food-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--food-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(76, 175, 80, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(76, 175, 80, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Food Systems guide card */
  .food-systems-guide-card {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1);
    border: 1px solid rgba(46, 125, 50, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  /* Card dropdown menu - controlled by Svelte {#if} */
  .food-systems-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(46, 125, 50, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    margin-top: 0.25rem;
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
    color: var(--food-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--food-primary);
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
    background-color: var(--food-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--food-deep);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--food-primary);
    border: 1px solid var(--food-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(76, 175, 80, 0.1);
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
    color: var(--food-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--food-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--food-primary);
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
    color: var(--food-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--food-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--food-secondary);
    border-bottom-color: var(--food-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--food-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--food-primary);
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
    background-color: var(--food-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--food-deep);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Dropdown styles for navigation and quick guides */
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

  /* Base dropdown menu styles */
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
    white-space: normal !important;
  }

  /* Navigation dropdown hover behavior */
  .dropdown-li:hover .dropdown-menu {
    display: block;
  }

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

  /* Fix for dropdown items when supplementary is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important;
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(76, 175, 80, 0.1) !important;
    color: var(--food-primary) !important;
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
    background-color: rgba(76, 175, 80, 0.1) !important;
    color: var(--food-primary) !important;
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
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  /* Quick guide selector styles */
  .quick-guide-selector {
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
    box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1);
    transform: translateY(-2px);
    border-color: var(--food-primary);
  }
  
  .guide-card.active {
    border-color: var(--food-primary);
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--food-primary);
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

  /* Food Systems Framework specific theme elements */

  /* Special callouts for food concepts */
  .content :global(.sustainability-callout) {
    background-color: rgba(76, 175, 80, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--food-secondary);
  }

  .content :global(.traditional-knowledge-callout) {
    background-color: rgba(121, 85, 72, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--food-earth);
  }

  .content :global(.innovation-callout) {
    background-color: rgba(139, 195, 74, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--food-accent);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(255, 152, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--food-harvest);
  }

  .content :global(.case-study-title) {
    color: var(--food-harvest);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(244, 67, 54, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #f44336;
  }

  .content :global(.alert-title) {
    color: #f44336;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important food concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(76, 175, 80, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--food-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(76, 175, 80, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Agricultural innovation styling */
  .content :global(.agriculture-highlight) {
    background-color: rgba(139, 195, 74, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(139, 195, 74, 0.3);
  }

  .content :global(.agriculture-highlight-title) {
    color: var(--food-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(139, 195, 74, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Climate and sustainability styling */
  .content :global(.climate-highlight) {
    background-color: rgba(3, 169, 244, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(3, 169, 244, 0.3);
  }

  .content :global(.climate-highlight-title) {
    color: var(--food-sky);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(3, 169, 244, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Community and traditional knowledge styling */
  .content :global(.community-highlight) {
    background-color: rgba(121, 85, 72, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(121, 85, 72, 0.3);
  }

  .content :global(.community-highlight-title) {
    color: var(--food-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(121, 85, 72, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic and trade styling */
  .content :global(.economic-highlight) {
    background-color: rgba(255, 193, 7, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(255, 193, 7, 0.3);
  }

  .content :global(.economic-highlight-title) {
    color: var(--food-seed);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 193, 7, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Nutrition and health styling */
  .content :global(.nutrition-highlight) {
    background-color: rgba(255, 152, 0, 0.05);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(255, 152, 0, 0.3);
  }

  .content :global(.nutrition-highlight-title) {
    color: var(--food-harvest);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 152, 0, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
