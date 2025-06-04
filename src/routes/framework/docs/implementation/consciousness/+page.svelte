<!-- src/routes/framework/docs/implementation/consciousness/+page.svelte -->
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
    title: "Medvetenhet & Inre Utveckling Ramverk Implementering",
    overview: "Översikt",
    paragraph1: "Medvetenhet & Inre Utveckling Ramverket framträder som en transformativ plan för global styrning revolution, som väver samman personlig transformation, kollektiv visdom och systemisk integration till en tapet av hopp för mänsklighetens högsta potential.",
    paragraph2: "Detta ramverk återföreställer styrning för att hedra varje person, gemenskap och ekosystem som en medskapare av medveten styrning, från individuell självkännedom till kollektiv intelligens och systemisk förändring."
  };

  // English translations as fallback
  const introEn = {
    title: "Consciousness & Inner Development Framework Implementation",
    overview: "Overview",
    paragraph1: "The Consciousness & Inner Development Framework emerges as a transformative blueprint for global governance revolution, weaving together personal transformation, collective wisdom, and systemic integration into a tapestry of hope for humanity's highest potential.",
    paragraph2: "This framework reimagines governance to honor every person, community, and ecosystem as a co-creator of conscious governance, from individual self-awareness to collective intelligence and systemic transformation."
  };

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
        'consciousness-accord-lite': "Medvetenhet Accord Lite",
        'executive-core-overview': "Verkställande Översikt",
        'youth-governance-comic': "Ungdom Styrning Serietidning",
        
        // Main framework sections (Swedish)
        '00-manifesto': "Manifest: Medvetenhet Accordet",
        '01-governance-structure': "Styrningsstruktur",
        '02-personal-transformation': "Personlig Transformation",
        '03-collective-consciousness': "Kollektiv Medvetenhet",
        '04-systemic-integration': "Systemisk Integration",
        '05-spiral-dynamics': "Spiral Dynamik Integration",
        '06-economic-realignment': "Ekonomisk Omställning",
        '07-community-engagement': "Samhällsengagemang",
        '08-crisis-response': "Krisstyrning Protokoll",
        '09-metrics-accountability': "Mätningar och Ansvarighet",
        '10-digital-platforms': "Digitala Plattformar",
        '11-ethical-ai-governance': "Etisk AI Styrning",
        '12-cross-cultural-translation': "Tvärkulturell Översättning",
        '13-implementation-roadmap': "Implementeringsfärdplan",
        '14-visual-architecture-map': "Visuell Arkitektur Karta",
        '15-conclusion': "Slutsats"
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
  $: isSupplementaryActive = ['executive-core-overview', 'youth-governance-comic'].includes(activeSection);

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
    <!-- Quick Access Card for Consciousness Framework -->
    {#if !isPrintMode && !isLiteActive && activeSection === 'index'}
      <div class="consciousness-guide-card">
        <div class="card-content">
          <div class="card-icon">🧘</div>
          <div class="card-text">
            <h3>New to Consciousness Governance?</h3>
            <p>Start with our accessible summary that explains the framework's core principles and transformation pathway.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('consciousness-accord-lite')}>
              Read the Consciousness Accord Lite <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    {/if}

    {#if data.isModular}
      <!-- Sub-navigation for framework sections -->
      {#if !isPrintMode} 
        <div class="section-nav">
          <ul>
            <!-- Overview -->
            <li class:active={activeSection === 'index'}>
              <button on:click={() => setActiveSection('index')}>
                Overview
              </button>
            </li>
            
            <!-- Lite Version -->
            <li class:active={activeSection === 'consciousness-accord-lite'}>
              <button on:click={() => setActiveSection('consciousness-accord-lite')}>
                Consciousness Accord Lite
              </button>
            </li>
            
            <!-- Core Framework sections (00-15) -->
            {#each Object.keys(data.sections).filter(section => 
              section.match(/^\d{2}-/) && !['index', 'consciousness-accord-lite', 'executive-core-overview', 'youth-governance-comic'].includes(section)
            ) as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getSectionTitle(section).replace(/^\d{2}-/, '').replace(/^Manifesto: /, '')}
                </button>
              </li>
            {/each}
            
            <!-- Supplementary Materials dropdown -->
            <li class="dropdown-li" class:active={isSupplementaryActive}>
              <button class="dropdown-toggle">
                Supplementary <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu supplementary-dropdown">
                <button class="dropdown-item" on:click={() => setActiveSection('executive-core-overview')}>
                  <span class="supplement-icon">📋</span>
                  <span class="supplement-title">Executive Overview</span>
                </button>
                <button class="dropdown-item" on:click={() => setActiveSection('youth-governance-comic')}>
                  <span class="supplement-icon">📚</span>
                  <span class="supplement-title">Youth Governance Comic</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section === 'index' && currentLocale === 'sv'}
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
          
          <!-- Navigation buttons at bottom of lite version -->
          {#if section === 'consciousness-accord-lite' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('lite')}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('00-manifesto')}>
                Continue to Full Framework <span class="arrow-icon">→</span>
              </button>
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
    background-color: var(--consciousness-primary);
    color: white;
    border-color: var(--consciousness-primary);
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
    border-right: 1px solid var(--consciousness-primary);
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
    color: var(--consciousness-primary);
    border-left-color: var(--consciousness-primary);
  }
  
  .sidebar a.active {
    color: var(--consciousness-primary);
    border-left-color: var(--consciousness-primary);
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

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(167, 139, 250, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--consciousness-primary);
    text-align: left;
    border-top: 1px solid var(--consciousness-primary);
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: var(--consciousness-primary);
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

  .consciousness-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(76, 29, 149, 0.3);
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
    background-color: rgba(167, 139, 250, 0.1) !important;
    color: var(--consciousness-primary) !important;
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
    background-color: rgba(167, 139, 250, 0.1) !important;
    color: var(--consciousness-primary) !important;
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
    background-color: rgba(167, 139, 250, 0.1);
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
</style>