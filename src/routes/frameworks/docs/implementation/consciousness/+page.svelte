<!-- src/routes/frameworks/docs/implementation/consciousness/+page.svelte -->
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
    title: "Medvetenhet & inre utveckling ramverk implementering",
    overview: "Översikt",
    paragraph1: "Medvetenhet & inre utveckling ramverket framträder som en transformativ plan för global styrning revolution, som väver samman personlig transformation, kollektiv visdom och systemisk integration till en tapet av hopp för mänsklighetens högsta potential.",
    paragraph2: "Detta ramverk återföreställer styrning för att hedra varje person, gemenskap och ekosystem som en medskapare av medveten styrning, från individuell självkännedom till kollektiv intelligens och systemisk förändring."
  };

  // English translations as fallback
  const introEn = {
    title: "Consciousness & Inner Development Framework Implementation",
    overview: "Overview",
    paragraph1: "The Consciousness & Inner Development Framework emerges as a transformative blueprint for global governance revolution, weaving together personal transformation, collective wisdom, and systemic integration into a tapestry of hope for humanity's highest potential.",
    paragraph2: "This framework reimagines governance to honor every person, community, and ecosystem as a co-creator of conscious governance, from individual self-awareness to collective intelligence and systemic transformation."
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
        transformation: "Personal & Collective Transformation", 
        implementation: "Systemic Implementation",
        resources: "Resources & Tools"
      },
      sv: {
        foundation: "Grund",
        transformation: "Personlig & kollektiv transformation",
        implementation: "Systemisk implementering", 
        resources: "Resurser & verktyg"
      }
    };
    
    return (categoryTitles[currentLocale] || categoryTitles.en)[category] || category;
  }

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Core framework sections
        'index': "Overview",
        'consciousness-accord-lite': "Consciousness Accord Lite",
        'executive-core-overview': "Executive Overview",
        'youth-governance-comic': "Youth Governance Comic",
        
        // Main framework sections (00-15)
        '00-manifesto': "Manifesto: The Consciousness Accord",
        '01-governance-structure': "Governance Structure",
        '02-personal-transformation': "Personal Transformation",
        '03-collective-consciousness': "Collective Consciousness",
        '04-systemic-integration': "Systemic Integration",
        '05-spiral-dynamics': "Spiral Dynamics Integration",
        '06-economic-realignment': "Economic Realignment",
        '07-community-engagement': "Community Engagement",
        '08-crisis-response': "Crisis Response Protocols",
        '09-metrics-accountability': "Metrics and Accountability",
        '10-digital-platforms': "Digital Platforms",
        '11-ethical-ai-governance': "Ethical AI Governance",
        '12-cross-cultural-translation': "Cross-Cultural Translation",
        '13-implementation-roadmap': "Implementation Roadmap",
        '14-visual-architecture-map': "Visual Architecture Map",
        '15-conclusion': "Conclusion"
      },
      sv: {
        // Core framework sections (Swedish)
        'index': "Översikt",
        'consciousness-accord-lite': "Medvetenhet accord lite",
        'executive-core-overview': "Verkställande översikt",
        'youth-governance-comic': "Ungdom styrning serietidning",
        
        // Main framework sections (Swedish)
        '00-manifesto': "Manifest: medvetenhet accordet",
        '01-governance-structure': "Styrningsstruktur",
        '02-personal-transformation': "Personlig transformation",
        '03-collective-consciousness': "Kollektiv medvetenhet",
        '04-systemic-integration': "Systemisk integration",
        '05-spiral-dynamics': "Spiral dynamik integration",
        '06-economic-realignment': "Ekonomisk omställning",
        '07-community-engagement': "Samhällsengagemang",
        '08-crisis-response': "Krisstyrning protokoll",
        '09-metrics-accountability': "Mätningar och ansvarighet",
        '10-digital-platforms': "Digitala plattformar",
        '11-ethical-ai-governance': "Etisk AI styrning",
        '12-cross-cultural-translation': "Tvärkulturell översättning",
        '13-implementation-roadmap': "Implementeringsfärdplan",
        '14-visual-architecture-map': "Visuell arkitektur karta",
        '15-conclusion': "Slutsats"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '').replace(/^Manifesto: /, '').replace(/^Manifest: /, '');
    
    const shortTitles = {
      'The Consciousness Accord': 'Manifesto',
      'Governance Structure': 'Governance',
      'Personal Transformation': 'Personal Transform',
      'Collective Consciousness': 'Collective Conscious',
      'Systemic Integration': 'Systemic Integration',
      'Spiral Dynamics Integration': 'Spiral Dynamics',
      'Economic Realignment': 'Economic Realign',
      'Community Engagement': 'Community Engage',
      'Crisis Response Protocols': 'Crisis Response',
      'Metrics and Accountability': 'Metrics',
      'Digital Platforms': 'Digital Platforms',
      'Ethical AI Governance': 'Ethical AI',
      'Cross-Cultural Translation': 'Cross-Cultural',
      'Implementation Roadmap': 'Implementation',
      'Visual Architecture Map': 'Visual Map',
      'Conclusion': 'Conclusion',
      'medvetenhet accordet': 'Manifest',
      'Styrningsstruktur': 'Styrning',
      'Personlig transformation': 'Personlig transform',
      'Kollektiv medvetenhet': 'Kollektiv medveten',
      'Systemisk integration': 'Systemisk integration',
      'Spiral dynamik integration': 'Spiral dynamik',
      'Ekonomisk omställning': 'Ekonomisk omställning',
      'Samhällsengagemang': 'Samhällsengagemang',
      'Krisstyrning protokoll': 'Krisstyrning',
      'Mätningar och ansvarighet': 'Mätningar',
      'Digitala plattformar': 'Digitala plattformar',
      'Etisk AI styrning': 'Etisk AI',
      'Tvärkulturell översättning': 'Tvärkulturell',
      'Implementeringsfärdplan': 'Implementering',
      'Visuell arkitektur karta': 'Visuell karta',
      'Slutsats': 'Slutsats'
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
    const pdfUrl = `${base}/assets/pdf/consciousness-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `consciousness-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the lite version
  $: isLiteActive = activeSection === 'consciousness-accord-lite';
  $: isFoundationActive = activeSection === '00-manifesto';
  $: isResourceActive = ['consciousness-accord-lite', 'executive-core-overview', 'youth-governance-comic'].includes(activeSection);

  // For handling accordion states
  let foundationOpen = true; // Start with foundation open
  let transformationOpen = false;
  let implementationOpen = false;
  let resourcesOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleTransformation() {
    transformationOpen = !transformationOpen;
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
      
      if (dropdown && !dropdown.contains(event.target)) {
        // Handle dropdown close if needed
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

  // Get the total number of core framework sections (00-15)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/)
  ).sort();

  // Define section groupings
  $: foundationSections = ['00-manifesto'];
  $: transformationSections = ['01-governance-structure', '02-personal-transformation', '03-collective-consciousness', '04-systemic-integration', '05-spiral-dynamics'];
  $: implementationSections = ['06-economic-realignment', '07-community-engagement', '08-crisis-response', '09-metrics-accountability', '10-digital-platforms', '11-ethical-ai-governance', '12-cross-cultural-translation', '13-implementation-roadmap', '14-visual-architecture-map', '15-conclusion'];
  $: resourceSections = ['consciousness-accord-lite', 'executive-core-overview', 'youth-governance-comic'];

  // Get current section index for progress
  $: currentSectionIndex = coreFrameworkSections.indexOf(activeSection);
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to Consciousness Governance?",
        startWithLite: "Start with our accessible summary that explains the framework's core principles and transformation pathway.",
        readLite: "Read the Consciousness Accord Lite",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        resources: "Resources",
        guides: "Guides"
      },
      sv: {
        newToFramework: "Ny inom medvetenhetsstyrning?",
        startWithLite: "Börja med vår tillgängliga sammanfattning som förklarar ramverkets kärnprinciper och transformationsväg.",
        readLite: "Läs medvetenhet accord lite",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        resources: "Resurser",
        guides: "Guider"
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }

  // Guide information for the resources section
  const guideInfo = {
    en: [
      {
        id: 'consciousness-accord-lite',
        title: 'Consciousness Accord Lite',
        description: 'Accessible summary of core principles and transformation pathway',
        icon: '🧘'
      },
      {
        id: 'executive-core-overview',
        title: 'Executive Overview',
        description: 'Strategic overview for decision-makers and governance leaders',
        icon: '📊'
      },
      {
        id: 'youth-governance-comic',
        title: 'Youth Governance Comic',
        description: 'Visual, engaging guide for younger participants and communities',
        icon: '📚'
      }
    ],
    sv: [
      {
        id: 'consciousness-accord-lite',
        title: 'Medvetenhet accord lite',
        description: 'Tillgänglig sammanfattning av kärnprinciper och transformationsväg',
        icon: '🧘'
      },
      {
        id: 'executive-core-overview',
        title: 'Verkställande översikt',
        description: 'Strategisk översikt för beslutsfattare och styrningsledare',
        icon: '📊'
      },
      {
        id: 'youth-governance-comic',
        title: 'Ungdom styrning serietidning',
        description: 'Visuell, engagerande guide för yngre deltagare och samhällen',
        icon: '📚'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Consciousness Framework -->
    {#if !isPrintMode && !isLiteActive && activeSection === 'index'}
      <div class="consciousness-guide-card">
        <div class="card-content">
          <div class="card-icon">🧘</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithLite')}</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('consciousness-accord-lite')}>
              {getLocalizedText('readLite')} <span class="arrow-icon">→</span>
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

          <!-- Resources Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={resourcesOpen}
              class:has-active={isResourceActive}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">{getSectionCategoryTitle('resources')}</span>
              <span class="section-count">({resourceSections.length})</span>
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

          <!-- Foundation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={isFoundationActive}
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

          <!-- Transformation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={transformationOpen}
              class:has-active={transformationSections.some(section => activeSection === section)}
              on:click={toggleTransformation}
            >
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">{getSectionCategoryTitle('transformation')}</span>
              <span class="section-count">({transformationSections.length})</span>
              <span class="toggle-arrow" class:rotated={transformationOpen}>▼</span>
            </button>
            {#if transformationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each transformationSections as section}
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
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((currentSectionIndex + 1) / coreFrameworkSections.length) * 100}%"></div>
          </div>
          <span class="progress-text">Section {currentSectionIndex + 1} of {coreFrameworkSections.length}</span>
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
          
          <!-- Navigation buttons at bottom of lite version -->
          {#if section === 'consciousness-accord-lite' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('lite')}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('00-manifesto')}>
                {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
              </button>
            </div>
          {/if}

          <!-- Navigation buttons at bottom of other resource sections -->
          {#if (section === 'executive-core-overview' || section === 'youth-governance-comic') && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide(section)}>
                {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('00-manifesto')}>
                {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
              </button>
            </div>
          {/if}

          <!-- Section navigation at bottom of core sections -->
          {#if isCoreSection && !isPrintMode}
            <div class="section-navigation">
              {#if currentSectionIndex > 0}
                <button class="nav-btn prev-btn" on:click={() => {
                  const currentIndex = coreFrameworkSections.indexOf(activeSection);
                  const prevSection = coreFrameworkSections[currentIndex - 1];
                  setActiveSection(prevSection);
                }}>
                  ← Previous Section
                </button>
              {/if}
              
              {#if currentSectionIndex < coreFrameworkSections.length - 1}
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
  /* Consciousness & Inner Development Framework color scheme - wisdom purples, consciousness blues, transformation golds */
  :root {
    --consciousness-primary: #4c1d95; /* Deep Purple - wisdom, spiritual depth, consciousness */
    --consciousness-secondary: #1e40af; /* Royal Blue - trust, clarity, mental awareness */
    --consciousness-accent: #7c3aed; /* Bright Purple - transformation, insight, awakening */
    --consciousness-wisdom: #312e81; /* Indigo - deep knowing, intuition, inner guidance */
    --consciousness-light: #a78bfa; /* Light Purple - accessibility, openness, flow */
    --consciousness-transformation: #f59e0b; /* Warm Gold - change, illumination, growth */
    --consciousness-earth: #059669; /* Earth Green - grounding, nature connection, balance */
    --consciousness-compassion: #ec4899; /* Warm Pink - love, empathy, heart wisdom */
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
    background-color: rgba(76, 29, 149, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(76, 29, 149, 0.1);
    color: var(--consciousness-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(76, 29, 149, 0.1);
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
    background-color: rgba(76, 29, 149, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--consciousness-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--consciousness-accent);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(76, 29, 149, 0.1), rgba(167, 139, 250, 0.1));
    border: 1px solid rgba(76, 29, 149, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--consciousness-primary);
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
    background-color: rgba(76, 29, 149, 0.1);
    color: var(--consciousness-primary);
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
    background: linear-gradient(90deg, rgba(76, 29, 149, 0.1), rgba(167, 139, 250, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--consciousness-primary);
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
    background: linear-gradient(90deg, var(--consciousness-primary), var(--consciousness-accent));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--consciousness-primary);
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

    .card-content {
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
      gap: 0.75rem;
    }
    
    .card-text {
      width: 100%;
    }
    
    .card-actions {
      width: 100%;
    }
    
    .primary-btn {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .card-content {
      padding: 0.75rem;
    }
    
    .card-icon {
      font-size: 1.5rem;
    }
    
    .card-text h3 {
      font-size: 1rem;
    }
    
    .card-text p {
      font-size: 0.85rem;
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
    color: var(--consciousness-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--consciousness-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--consciousness-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--consciousness-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(167, 139, 250, 0.1);
    border-left: 4px solid var(--consciousness-wisdom);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--consciousness-wisdom);
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
    color: var(--consciousness-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--consciousness-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with consciousness-themed bullets */
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

  /* Apply consciousness symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🧘";
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
    color: var(--consciousness-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✨";
    color: var(--consciousness-light);
  }

  /* Table styles for consciousness framework */
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
    background: linear-gradient(to right, var(--consciousness-primary), var(--consciousness-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--consciousness-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(167, 139, 250, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(167, 139, 250, 0.1);
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
  
  /* Consciousness guide card */
  .consciousness-guide-card {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(76, 29, 149, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(76, 29, 149, 0.1);
    border: 1px solid rgba(76, 29, 149, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
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
    color: var(--consciousness-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--consciousness-primary);
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
    background-color: var(--consciousness-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--consciousness-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--consciousness-primary);
    border: 1px solid var(--consciousness-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(167, 139, 250, 0.1);
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
    color: var(--consciousness-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--consciousness-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--consciousness-primary);
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
    color: var(--consciousness-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--consciousness-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--consciousness-secondary);
    border-bottom-color: var(--consciousness-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--consciousness-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--consciousness-primary);
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
    background-color: var(--consciousness-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--consciousness-accent);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Responsive styles */
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

  /* Consciousness Framework specific theme elements */

  /* Special callouts for consciousness concepts */
  .content :global(.personal-transformation-callout) {
    background-color: rgba(245, 158, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--consciousness-transformation);
  }

  .content :global(.collective-wisdom-callout) {
    background-color: rgba(124, 58, 237, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--consciousness-accent);
  }

  .content :global(.systems-thinking-callout) {
    background-color: rgba(30, 64, 175, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--consciousness-secondary);
  }

  .content :global(.spiritual-callout) {
    background-color: rgba(49, 46, 129, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--consciousness-wisdom);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(5, 150, 105, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--consciousness-earth);
  }

  .content :global(.case-study-title) {
    color: var(--consciousness-earth);
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

  /* Highlight boxes for important consciousness concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(167, 139, 250, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(167, 139, 250, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--consciousness-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(167, 139, 250, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Wisdom principles styling */
  .content :global(.wisdom-highlight) {
    background-color: rgba(76, 29, 149, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(76, 29, 149, 0.3);
  }

  .content :global(.wisdom-highlight-title) {
    color: var(--consciousness-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(76, 29, 149, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Transformation practices styling */
  .content :global(.transformation-highlight) {
    background-color: rgba(245, 158, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .content :global(.transformation-highlight-title) {
    color: var(--consciousness-transformation);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Cultural wisdom styling */
  .content :global(.cultural-highlight) {
    background-color: rgba(236, 72, 153, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(236, 72, 153, 0.3);
  }

  .content :global(.cultural-highlight-title) {
    color: var(--consciousness-compassion);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(236, 72, 153, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Shadow work and inner development styling */
  .content :global(.shadow-work-highlight) {
    background-color: rgba(49, 46, 129, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(49, 46, 129, 0.3);
  }

  .content :global(.shadow-work-highlight-title) {
    color: var(--consciousness-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(49, 46, 129, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--consciousness-accent);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--consciousness-accent);
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
