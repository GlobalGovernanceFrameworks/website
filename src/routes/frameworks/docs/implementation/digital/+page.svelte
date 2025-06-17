<!-- src/routes/frameworks/docs/implementation/digital/+page.svelte -->
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
    title: "Digital commons ramverk",
    overview: "Översikt",
    paragraph1: "Digital commons-ramverket erbjuder en omfattande styrningsarkitektur för att hantera digitala resurser—data, mjukvara, kunskap och infrastruktur—som delade globala allmänningar, vilket säkerställer rättvist tillträde, etisk användning och deltagande styrning.",
    paragraph2: "Detta ramverk integrerar lokala, regionala och globala tillvägagångssätt genom decentraliserad styrning, öppen källkod, etisk AI och kulturell autonomi för att förvandla digitala utmaningar till möjligheter för kollektivt välstånd och hållbar utveckling."
  };

  // English translations as fallback
  const introEn = {
    title: "Digital Commons Framework",
    overview: "Overview",
    paragraph1: "The Digital Commons Framework provides a comprehensive governance architecture for managing digital resources—data, software, knowledge, and infrastructure—as shared global commons, ensuring equitable access, ethical use, and participatory governance.",
    paragraph2: "This framework integrates local, regional, and global approaches through decentralized governance, open-source ecosystems, ethical AI, and cultural autonomy to transform digital challenges into opportunities for collective prosperity and sustainable development."
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
        implementation: "Implementation", 
        resources: "Resources",
        guides: "Guides"
      },
      sv: {
        foundation: "Grund",
        implementation: "Implementering", 
        resources: "Resurser",
        guides: "Guider"
      }
    };
    
    return (categoryTitles[currentLocale] || categoryTitles.en)[category] || category;
  }

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Digital Commons Framework - New Structure (10 core sections + appendices)
        'index': "Overview",
        'technical-guide': "Technical Guide for Policymakers",
        'community-guide': "Community Implementation Guide", 
        'youth-guide': "Youth Engagement Guide",
        'digital-ethics-guide': "Digital Ethics Guide",
        'indigenous-guide': "Indigenous Data Stewardship Guide",
        '01-preamble': "Preamble and Vision", 
        '02-core-principles': "Core Principles",
        '03-governance-structure': "Governance Structure", 
        '04-key-components': "Key Components",
        '05-implementation-roadmap': "Implementation Roadmap",
        '06-monitoring-evaluation': "Monitoring and Evaluation",
        '07-case-studies': "Case Studies",
        '08-future-potential': "Future Potential", 
        '09-tools-resources': "Tools and Resources",
        '10-call-to-action': "Call to Action",
        
        // Supporting Appendices (kept separate as requested)
        'appendix-a-pilot-onboarding': "Appendix A: Pilot Onboarding",
        'appendix-b-visual-companion-toolkit': "Appendix B: Visual Companion Toolkit", 
        'appendix-c-corporate-participation-playbook': "Appendix C: Corporate Participation Playbook",
        'appendix-d-digital-ethics-charter': "Appendix D: Digital Ethics Charter",
        'appendix-e-commons-glossary': "Appendix E: Commons Glossary",
        'appendix-f-minimal-viable-node-quickstart': "Appendix F: Minimum Viable Node Quick-Start Guide",
        'appendix-g-field-test-logbook-template': "Appendix G: Field-Test Logbook Template",
        'appendix-h-faq-for-tech-skeptical-leaders': "Appendix H: FAQ for Tech-Skeptical Leaders",
        'appendix-i-diplomatic-mini-deck': "Appendix I: Diplomatic Mini Deck",
        'appendix-j-historical-commons-context': "Appendix J: Historical Commons Context", 
        'appendix-k-impact-assessment-framework': "Appendix K: Impact Assessment Framework",
        'epilogue': "Epilogue"
      },
      sv: {
        // Digital Commons Framework - New Structure (Swedish)
        'index': "Översikt", 
        'technical-guide': "Teknisk guide för beslutsfattare",
        'community-guide': "Samhällsguide för implementering", 
        'youth-guide': "Engagemangsguide för ungdomar",
        'digital-ethics-guide': "Digital etikguide",
        'indigenous-guide': "Förvaltningsguide för urfolksdata",
        '01-preamble': "Inledning och vision",
        '02-core-principles': "Kärnprinciper",
        '03-governance-structure': "Styrningsstruktur",
        '04-key-components': "Nyckelkomponenter", 
        '05-implementation-roadmap': "Implementeringsfärdplan",
        '06-monitoring-evaluation': "Övervakning och utvärdering",
        '07-case-studies': "Fallstudier",
        '08-future-potential': "Framtidspotential",
        '09-tools-resources': "Verktyg och resurser", 
        '10-call-to-action': "Handlingsuppmaning",
        
        // Supporting Appendices (Swedish)
        'appendix-a-pilot-onboarding': "Bilaga A: Pilot introduktion",
        'appendix-b-visual-companion-toolkit': "Bilaga B: Visuellt följeslagarverktyg",
        'appendix-c-corporate-participation-playbook': "Bilaga C: Spelbok för företagsdeltagande",
        'appendix-d-digital-ethics-charter': "Bilaga D: Digital etikstadga", 
        'appendix-e-commons-glossary': "Bilaga E: Allmänningsordlista",
        'appendix-f-minimal-viable-node-quickstart': "Bilaga F: Snabbstartsguide för minsta möjliga livskraftiga nod",
        'appendix-g-field-test-logbook-template': "Bilaga G: Mall för fälttestloggbok",
        'appendix-h-faq-for-tech-skeptical-leaders': "Bilaga H: FAQ för teknikskeptiska ledare",
        'appendix-i-diplomatic-mini-deck': "Bilaga I: Diplomatiskt mini-däck",
        'appendix-j-historical-commons-context': "Bilaga J: Historisk allmänningskontext",
        'appendix-k-impact-assessment-framework': "Bilaga K: Ramverk för konsekvensanalys", 
        'epilogue': "Epilog"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }
    
  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Preamble and Vision': 'Preamble & Vision',
      'Core Principles': 'Core Principles',
      'Governance Structure': 'Governance',
      'Key Components': 'Key Components',
      'Implementation Roadmap': 'Implementation',
      'Monitoring and Evaluation': 'Monitoring',
      'Case Studies': 'Case Studies',
      'Future Potential': 'Future Potential',
      'Tools and Resources': 'Tools & Resources',
      'Call to Action': 'Call to Action',
      'Inledning och vision': 'Inledning & vision',
      'Kärnprinciper': 'Kärnprinciper',
      'Styrningsstruktur': 'Styrning',
      'Nyckelkomponenter': 'Nyckelkomponenter',
      'Implementeringsfärdplan': 'Implementering',
      'Övervakning och utvärdering': 'Övervakning',
      'Fallstudier': 'Fallstudier',
      'Framtidspotential': 'Framtidspotential',
      'Verktyg och resurser': 'Verktyg & resurser',
      'Handlingsuppmaning': 'Handlingsuppmaning'
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
    const pdfUrl = `${base}/assets/pdf/digital-commons-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `digital-commons-guide${versionSuffix}.pdf`;
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
        description: 'Detailed guide for policymakers, technologists, and government officials',
        icon: '📊'
      },
      {
        id: 'community-guide',
        title: 'Community Guide',
        description: 'Implementation guide for local leaders, community organizers and civil society',
        icon: '🤝'
      },
      {
        id: 'youth-guide',
        title: 'Youth Guide',
        description: 'Practical guide for youth, students, and digital activists',
        icon: '🌱'
      },
      {
        id: 'digital-ethics-guide',
        title: 'Digital Ethics Guide',
        description: 'Guide for ethics, governance, and responsible technology',
        icon: '💻'
      },
      {
        id: 'indigenous-guide',
        title: 'Indigenous Guide',
        description: 'Data stewardship guide for indigenous communities and traditional knowledge',
        icon: '🌿'
      }
    ],
    sv: [
      {
        id: 'technical-guide',
        title: 'Teknisk guide',
        description: 'Detaljerad guide för beslutsfattare, teknologer och regeringstjänstemän',
        icon: '📊'
      },
      {
        id: 'community-guide',
        title: 'Samhällsguide',
        description: 'Implementeringsguide för lokala ledare, samhällsorganisatörer och civilsamhället',
        icon: '🤝'
      },
      {
        id: 'youth-guide',
        title: 'Ungdomsguide',
        description: 'Praktisk guide för ungdomar, studenter och digitala aktivister',
        icon: '🌱'
      },
      {
        id: 'digital-ethics-guide',
        title: 'Digital etikguide',
        description: 'Guide för etik, styrning och ansvarsfull teknik',
        icon: '💻'
      },
      {
        id: 'indigenous-guide',
        title: 'Urfolksguide',
        description: 'Förvaltningsguide för urfolkssamhällen och traditionell kunskap',
        icon: '🌿'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = activeSection === 'technical-guide' || 
                     activeSection === 'community-guide' || 
                     activeSection === 'youth-guide' ||
                     activeSection === 'digital-ethics-guide' ||
                     activeSection === 'indigenous-guide';
  $: isAppendixActive = activeSection.startsWith('appendix-') || activeSection === 'epilogue';
  $: isCoreSection = activeSection.match(/^\d{2}-/);

  // For handling dropdown states
  let isDropdownOpen = false;

  // Accordion states for section categories
  let foundationOpen = true; // Start with foundation open
  let implementationOpen = false;
  let resourcesOpen = false;
  let appendicesOpen = false;

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  function toggleAppendices() {
    appendicesOpen = !appendicesOpen;
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const dropdown = document.querySelector('.card-actions .dropdown');
      
      if (dropdown && !dropdown.contains(event.target)) {
        isDropdownOpen = false;
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

  // Get the total number of core framework sections (01-10)
  $: coreFrameworkSections = Object.keys(data.sections || {}).filter(section => 
    section.match(/^\d{2}-/) && !['technical-guide', 'community-guide', 'youth-guide', 'digital-ethics-guide', 'indigenous-guide'].includes(section)
  ).sort();

  // Define section groupings
  $: foundationSections = ['01-preamble', '02-core-principles', '03-governance-structure'];
  $: implementationSections = coreFrameworkSections.slice(3);

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        newToFramework: "New to the Digital Commons Framework?",
        startWithGuides: "Start with one of our simplified guides that explain the core concepts for different audiences.",
        chooseGuide: "Choose a Guide",
        downloadPdf: "Download PDF Version",
        continueToFull: "Continue to Full Framework",
        resources: "Resources",
        appendices: "Appendices",
        conclusion: "Conclusion"
      },
      sv: {
        newToFramework: "Ny inom digital commons ramverk?",
        startWithGuides: "Börja med en av våra förenklade guider som förklarar kärnkoncepten för olika målgrupper.",
        chooseGuide: "Välj en guide",
        downloadPdf: "Ladda ner PDF-version",
        continueToFull: "Fortsätt till fullständigt ramverk",
        resources: "Resurser",
        appendices: "Bilagor",
        conclusion: "Slutsats"
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
    <!-- Quick Access Card for Lite Guides -->
    {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
      <div class="lite-guide-card">
        <div class="card-content">
          <div class="card-icon">📘</div>
          <div class="card-text">
            <h3>{getLocalizedText('newToFramework')}</h3>
            <p>{getLocalizedText('startWithGuides')}</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle">
                {getLocalizedText('chooseGuide')} <span class="arrow-icon">▾</span>
              </button>
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
              <span class="nav-title">{getOverviewTitle()}</span>
            </button>
          </div>

          <!-- Guides Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={resourcesOpen}
              class:has-active={isGuideActive}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">{getSectionCategoryTitle('guides')}</span>
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

          <!-- Foundation Accordion -->
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

          <!-- Appendices Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={appendicesOpen}
              class:has-active={isAppendixActive}
              on:click={toggleAppendices}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getLocalizedText('appendices')}</span>
              <span class="section-count">({Object.keys(data.sections || {}).filter(section => section.startsWith('appendix-') || section === 'epilogue').length})</span>
              <span class="toggle-arrow" class:rotated={appendicesOpen}>▼</span>
            </button>
            {#if appendicesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each Object.keys(data.sections).filter(section => section.startsWith('appendix-') || section === 'epilogue') as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{section === 'epilogue' ? '✨' : '📄'}</span>
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
            <div class="progress-fill" style="width: {((parseInt(activeSection.substring(0, 2)) / 10) * 100)}%"></div>
          </div>
          <span class="progress-text">Section {parseInt(activeSection.substring(0, 2))} of 10</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section === 'technical-guide' || 
                section === 'community-guide' || 
                section === 'youth-guide' ||
                section === 'digital-ethics-guide' ||
                section === 'indigenous-guide'}
            <!-- Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="guide-selector">
                <h2>Digital Commons Framework Guides</h2>
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
                  {getLocalizedText('downloadPdf')} <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('01-preamble')}>
                  {getLocalizedText('continueToFull')} <span class="arrow-icon">→</span>
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
  /* Digital Commons Framework color scheme */
  /* Updated styles with digital-themed colors (purple-based palette) */
  :root {
    --digital-primary: #6d28d9; /* Purple for digital framework */
    --digital-secondary: #6b7280; /* Grounding Gray */
    --digital-accent: #8b5cf6; /* Lighter purple */
    --digital-success: #10b981; /* Success green */
    --digital-warning: #f59e0b; /* Warning amber */
    --digital-info: #0891b2; /* Info cyan */
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
    background-color: rgba(109, 40, 217, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(109, 40, 217, 0.1);
    color: var(--digital-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(109, 40, 217, 0.1);
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
    background-color: rgba(109, 40, 217, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--digital-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--digital-accent);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(109, 40, 217, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--digital-primary);
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
    background-color: rgba(109, 40, 217, 0.1);
    color: var(--digital-primary);
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
    background: linear-gradient(90deg, rgba(109, 40, 217, 0.1), rgba(139, 92, 246, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--digital-primary);
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
    background: linear-gradient(90deg, var(--digital-primary), var(--digital-accent));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--digital-primary);
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
    color: var(--digital-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--digital-primary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--digital-primary);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--digital-primary);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f5f3ff;
    border-left: 4px solid var(--digital-primary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--digital-primary);
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
    color: var(--digital-primary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #5b21b6;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with digital themed symbols */
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

  /* Apply digital symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    top: 0.1em;
    color: var(--digital-primary);
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
    color: var(--digital-primary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧";
    color: var(--digital-accent);
  }

  /* Table styles for markdown content with digital theme */
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
    background: linear-gradient(to right, var(--digital-primary), var(--digital-accent));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--digital-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: #f8f9fa;
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: #f5f3ff;
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
  
  /* Styles for Lite Guide card */
  .lite-guide-card {
    background: linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(109, 40, 217, 0.1);
    border: 1px solid rgba(109, 40, 217, 0.2);
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
    border: 1px solid rgba(109, 40, 217, 0.3);
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
    color: var(--digital-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--digital-primary);
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
    background-color: var(--digital-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #5b21b6;
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--digital-primary);
    border: 1px solid var(--digital-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #f5f3ff;
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
    color: var(--digital-primary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: #5b21b6;
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: #5b21b6;
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
    color: var(--digital-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--digital-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--digital-primary);
    border-bottom-color: var(--digital-primary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--digital-primary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--digital-primary);
  }

  /* Styles for navigation at bottom of lite guide */
  .lite-guide-navigation {
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
    background-color: var(--digital-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--digital-accent);
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
    display: none;
    overflow: visible !important;
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

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown::after {
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
    background-color: #f5f3ff;
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
    box-shadow: 0 4px 6px rgba(109, 40, 217, 0.1);
    transform: translateY(-2px);
    border-color: var(--digital-primary);
  }
  
  .guide-card.active {
    border-color: var(--digital-primary);
    background-color: #f5f3ff;
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--digital-primary);
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
</style>
