<!-- src/routes/framework/docs/implementation/biodiversity/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import ConstellationMap from '$lib/components/ConstellationMap.svelte';
  import { onMount, afterUpdate } from 'svelte';

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
    title: "Global Styrning Biodiversitet Implementering Ramverk",
    overview: "Översikt",
    paragraph1: "Det globala styrningsramverket för biodiversitet framträder som en revolutionerande plan för planetär läkning, som väver samman ursprungssuveränitet, ekonomisk transformation och kulturell mobilisering till en tapet av hopp för vår levande jord.",
    paragraph2: "Detta ramverk återföreställer styrning för att hedra varje art, ekosystem och genetisk linje som en medskapare av jordens berättelse, från Amazonas regnskog samhällen som hävdar digital suveränitet till korallrev som får juridisk personlighet."
  };

  // English translations as fallback
  const introEn = {
    title: "Global Governance Biodiversity Implementation Framework",
    overview: "Overview",
    paragraph1: "The Global Governance Biodiversity Implementation Framework emerges as a revolutionary blueprint for planetary healing, weaving together indigenous sovereignty, economic transformation, and cultural mobilization into a tapestry of hope for our living Earth.",
    paragraph2: "This framework reimagines governance to honor every species, ecosystem, and genetic lineage as a co-creator of Earth's story, from Amazon rainforest communities asserting digital sovereignty to coral reefs gaining legal personhood."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Biodiversity Framework sections
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
        // Biodiversity Framework sections (Swedish)
        'index': "Översikt",
        'technical-guide-policymakers': "Teknisk Guide för Beslutsfattare",
        'community-implementation-guide': "Samhällsguide för Implementering",
        'youth-engagement-leadership-guide': "Ungdomsengagemang & Ledarskapsguide",
        'corporate-transition-redemption-guide': "Företagsövergång & Återlösningsguide",
        'indigenous-data-sovereignty-guide': "Urfolks Datasuveränitet Guide",
        
        // Main framework sections (Swedish)
        '00-philosophical-preamble': "Filosofisk Inledning",
        '01-introduction-vision': "Introduktion och Vision",
        '02-guiding-principles': "Vägledande Principer",
        '03-core-pillars': "Kärnpelare",
        '04-governance-structure': "Styrningsstruktur",
        '05-policy-mechanisms': "Policymekanismer",
        '06-stakeholder-engagement': "Intressentengagemang",
        '07-financing-mechanisms': "Finansieringsmekanismer",
        '08-implementation-roadmap': "Implementeringsfärdplan",
        '09-metrics-success': "Mätning av Framgång",
        '10-visualizations': "Visualiseringar",
        '11-challenges-solutions': "Utmaningar och Lösningar",
        '12-implementation-tools': "Implementeringsverktyg",
        '13-reparations-protocol': "Reparationsprotokoll",
        '14-conclusion-call-to-action': "Slutsats och Handlingsuppmaning",
        
        // Appendices (Swedish)
        'appendix-a-synergy-esfmlg': "Bilaga A: Synergi med ESFMLG",
        'appendix-b-glossary': "Bilaga B: Omfattande Ordlista",
        'appendix-c-tool-library': "Bilaga C: Komplett Verktygsbibliotek",
        'appendix-d-moral-edge-cases': "Bilaga D: Moraliska Gränsfall",
        'appendix-e-political-economy': "Bilaga E: Politisk Ekonomi Analys",
        'appendix-f-feasibility-studies': "Bilaga F: Genomförbarhetsstudier",
        'appendix-g-pilot-blueprints': "Bilaga G: Pilotprogram Ritningar",
        'appendix-h-scenario-planning': "Bilaga H: Scenarioplanering",
        'appendix-i-cooperation-protocols': "Bilaga I: Internationella Samarbetsprotokoll",
        'appendix-j-creative-outputs': "Bilaga J: Kreativa Outputs Inspiration"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

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
        title: 'Teknisk Guide för Beslutsfattare',
        description: 'Omfattande guide för beslutsfattare, regeringstjänstemän och institutionella ledare',
        icon: '📋'
      },
      {
        id: 'community-implementation-guide',
        title: 'Samhällsguide för Implementering',
        description: 'Praktisk guide för lokala samhällen, ursprungsgrupper och gräsrotsorganisationer',
        icon: '🌱'
      },
      {
        id: 'youth-engagement-leadership-guide',
        title: 'Ungdomsengagemang & Ledarskapsguide',
        description: 'Guide för ungdomsledare, studenter och miljöaktivister',
        icon: '🌟'
      },
      {
        id: 'corporate-transition-redemption-guide',
        title: 'Företagsövergång & Återlösningsguide',
        description: 'Guide för företag som övergår till biodiversitetspositiva metoder',
        icon: '🔄'
      },
      {
        id: 'indigenous-data-sovereignty-guide',
        title: 'Urfolks Datasuveränitet Guide',
        description: 'Guide för ursprungssamhällen om datarättigheter och digital suveränitet',
        icon: '🦅'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = activeSection === 'technical-guide-policymakers' || 
                     activeSection === 'community-implementation-guide' || 
                     activeSection === 'youth-engagement-leadership-guide' ||
                     activeSection === 'corporate-transition-redemption-guide' ||
                     activeSection === 'indigenous-data-sovereignty-guide';
  $: isAppendixActive = activeSection.startsWith('appendix-');

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
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Biodiversity Guides -->
    {#if !isPrintMode && !isGuideActive}
      <div class="biodiversity-guide-card">
        <div class="card-content">
          <div class="card-icon">🌿</div>
          <div class="card-text">
            <h3>New to the Biodiversity Framework?</h3>
            <p>Start with one of our specialized guides that explain the framework for different stakeholders and contexts.</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle" on:click|stopPropagation={toggleDropdown}>
                Choose a Guide <span class="arrow-icon">▾</span>
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
          <ul>
            <!-- Make guides into a dropdown in the navbar -->
            <li class="dropdown-li" class:active={isGuideActive}>
              <button class="dropdown-toggle" on:click|stopPropagation={toggleNavDropdown}>
                Guides <span class="arrow-icon">{isNavDropdownOpen ? '▴' : '▾'}</span>
              </button>
              {#if isNavDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => selectGuide(guide.id)}>
                      <span class="guide-icon">{guide.icon}</span>
                      <span class="guide-title">{guide.title}</span>
                    </button>
                  {/each}
                </div>
              {/if}
            </li>
            
            <!-- Regular sections, filtering out the guides and appendices -->
            {#each Object.keys(data.sections).filter(section => 
              !section.startsWith('appendix-') &&
              !guides.some(g => g.id === section) &&
              !['index'].includes(section)
            ) as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getSectionTitle(section)}
                </button>
              </li>
            {/each}
            
            <!-- Add Overview as a separate item -->
            <li class:active={activeSection === 'index'}>
              <button on:click={() => setActiveSection('index')}>
                Overview
              </button>
            </li>
            
            <!-- Add appendices dropdown -->
            <li class="dropdown-li" class:active={isAppendixActive}>
              <button class="dropdown-toggle">
                Appendices <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu appendix-dropdown">
                {#each Object.keys(data.sections).filter(section => section.startsWith('appendix-')) as section}
                  <button class="dropdown-item" on:click={() => setActiveSection(section)}>
                    {getSectionTitle(section)}
                  </button>
                {/each}
              </div>
            </li>
          </ul>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if guides.some(g => g.id === section)}
            <!-- Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="guide-selector">
                <h2>Biodiversity Framework Guides</h2>
                <p>Choose the guide version that best matches your role and needs:</p>
                
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
                <button class="secondary-btn" on:click={() => downloadGuide(section.replace('-guide', '').replace('policymakers', 'policy'))}>
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
  }
  
  .section-nav ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .section-nav li {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .section-nav button {
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.2s;
  }
  
  .section-nav li.active button {
    background-color: var(--bio-primary);
    color: white;
    border-color: var(--bio-primary);
  }
  
  .section-nav button:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
  
  .section-content {
    padding-top: 1rem;
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
  }
  
  .sidebar {
    border-right: 1px solid var(--bio-primary);
    padding-right: 1.5rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar li {
    margin-bottom: 0.75rem;
  }
  
  .sidebar a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s;
  }
  
  .sidebar a:hover {
    color: var(--bio-primary);
    border-left-color: var(--bio-primary);
  }
  
  .sidebar a.active {
    color: var(--bio-primary);
    border-left-color: var(--bio-primary);
    font-weight: 600;
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

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(168, 197, 115, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--bio-primary);
    text-align: left;
    border-top: 1px solid var(--bio-primary);
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: var(--bio-primary);
    font-weight: 600;
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

  /* Fix for dropdown items when guide is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important;
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(168, 197, 115, 0.1) !important;
    color: var(--bio-primary) !important;
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
    background-color: rgba(168, 197, 115, 0.1) !important;
    color: var(--bio-primary) !important;
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
    background-color: rgba(168, 197, 115, 0.1);
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
    box-shadow: 0 4px 6px rgba(45, 80, 22, 0.1);
    transform: translateY(-2px);
    border-color: var(--bio-primary);
  }
  
  .guide-card.active {
    border-color: var(--bio-primary);
    background-color: rgba(168, 197, 115, 0.1);
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--bio-primary);
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
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
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
