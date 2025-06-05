<!-- src/routes/framework/docs/implementation/aging/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
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
    title: "Åldrandepopulation Stödramverk Implementering",
    overview: "Översikt",
    paragraph1: "Åldrandepopulation Stödramverket framträder som en transformativ plan för att omvandla åldrande från samhällsbörda till samhällets största styrka, genom att positionera äldre som de primära arkitekterna av regenerativa ekonomiska system.",
    paragraph2: "Detta ramverk återföreställer åldrande för att hedra varje äldres visdom, erfarenhet och fortsatta bidrag till samhällets välmående och innovation."
  };

  // English translations as fallback
  const introEn = {
    title: "Aging Population Support Framework Implementation",
    overview: "Overview",
    paragraph1: "The Aging Population Support Framework emerges as a transformative blueprint for converting aging from societal burden into society's greatest strength, positioning elders as the primary architects of regenerative economic systems.",
    paragraph2: "This framework reimagines aging to honor every elder's wisdom, experience, and continued contribution to community wellbeing and innovation."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'preamble': "Preamble: Aging as Asset",
        'executive-summary': "Executive Summary",
        
        // Core framework sections (01-09)
        '01-economic-security': "Economic Security Through AUBI",
        '02-meaningful-occupation': "Right to Meaningful Occupation",
        '03-healthcare-climate': "Healthcare & Climate Integration",
        '04-social-inclusion': "Social Inclusion & Connection",
        '05-nested-governance': "Nested Governance Systems",
        '06-legal-ethical': "Legal & Ethical Safeguards",
        '07-implementation-roadmap': "Implementation Roadmap",
        '08-monitoring-adaptive': "Monitoring & Adaptive Management",
        '09-call-to-action': "Call to Action & Elder Leadership",
        
        // Supplementary materials
        '10-appendices': "Appendices & Resources",
        'aging-framework-essentials': "Framework Essentials Guide"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'preamble': "Förord: Åldrande som Tillgång",
        'executive-summary': "Sammanfattning",
        
        // Core framework sections (Swedish)
        '01-economic-security': "Ekonomisk Trygghet genom AUBI",
        '02-meaningful-occupation': "Rätt till Meningsfull Sysselsättning",
        '03-healthcare-climate': "Hälsovård & Klimatintegration",
        '04-social-inclusion': "Social Inkludering & Gemenskap",
        '05-nested-governance': "Nästlade Styrningssystem",
        '06-legal-ethical': "Juridiska & Etiska Skyddsåtgärder",
        '07-implementation-roadmap': "Implementeringsfärdplan",
        '08-monitoring-adaptive': "Övervakning & Adaptiv Förvaltning",
        '09-call-to-action': "Uppmaning till Handling & Äldreledarskap",
        
        // Supplementary materials (Swedish)
        '10-appendices': "Bilagor & Resurser",
        'aging-framework-essentials': "Ramverk Grundläggande Guide"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      'Economic Security Through AUBI': 'Economic Security',
      'Right to Meaningful Occupation': 'Meaningful Occupation',
      'Healthcare & Climate Integration': 'Healthcare & Climate',
      'Social Inclusion & Connection': 'Social Inclusion',
      'Nested Governance Systems': 'Nested Governance',
      'Legal & Ethical Safeguards': 'Legal & Ethics',
      'Implementation Roadmap': 'Implementation',
      'Monitoring & Adaptive Management': 'Monitoring & Adaptive',
      'Call to Action & Elder Leadership': 'Call to Action'
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
    const pdfUrl = `${base}/assets/pdf/aging-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `aging-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the essentials version
  $: isEssentialsActive = activeSection === 'aging-framework-essentials';
  $: isSupplementaryActive = ['10-appendices', 'aging-framework-essentials'].includes(activeSection);

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
    <!-- Quick Access Card for Aging Framework -->
    {#if !isPrintMode && !isEssentialsActive && activeSection === 'index'}
      <div class="aging-guide-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h3>New to Aging Support Framework?</h3>
            <p>Start with our accessible essentials guide that explains the framework's core principles and elder-led transformation pathway.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('aging-framework-essentials')}>
              Read the Framework Essentials <span class="arrow-icon">→</span>
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
            
            <!-- Preamble -->
            <li class:active={activeSection === 'preamble'}>
              <button on:click={() => setActiveSection('preamble')}>
                Preamble
              </button>
            </li>
            
            <!-- Executive Summary -->
            <li class:active={activeSection === 'executive-summary'}>
              <button on:click={() => setActiveSection('executive-summary')}>
                Executive Summary
              </button>
            </li>
            
            <!-- Core Framework sections (01-09) -->
            {#each Object.keys(data.sections).filter(section => 
              section.match(/^\d{2}-/) && !['index', 'preamble', 'executive-summary', '10-appendices', 'aging-framework-essentials'].includes(section)
            ) as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getShortSectionTitle(section)}
                </button>
              </li>
            {/each}
            
            <!-- Supplementary Materials dropdown -->
            <li class="dropdown-li" class:active={isSupplementaryActive}>
              <button class="dropdown-toggle">
                Resources <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu supplementary-dropdown">
                <button class="dropdown-item" on:click={() => setActiveSection('10-appendices')}>
                  <span class="supplement-icon">📚</span>
                  <span class="supplement-title">Appendices & Tools</span>
                </button>
                <button class="dropdown-item" on:click={() => setActiveSection('aging-framework-essentials')}>
                  <span class="supplement-icon">📋</span>
                  <span class="supplement-title">Framework Essentials</span>
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
          {:else if section === 'index'}
            <!-- Render English introduction through the markdown component -->
            <svelte:component this={data.sections[section].default} />
          {:else if data.sections[section]}
            <!-- Render normal sections from markdown files -->
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of essentials version -->
          {#if section === 'aging-framework-essentials' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('essentials')}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('preamble')}>
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
  /* Aging Population Support Framework color scheme - dignity browns, wisdom greens, vitality golds */
  :root {
    --aging-primary: #7c2d12; /* Warm Brown - dignity, grounding, elder wisdom */
    --aging-secondary: #059669; /* Emerald Green - vitality, growth, regenerative economics */
    --aging-accent: #b45309; /* Amber Brown - warmth, community, meaningful occupation */
    --aging-wisdom: #365314; /* Forest Green - deep knowledge, environmental wisdom, sustainability */
    --aging-light: #84cc16; /* Lime Green - accessibility, renewal, innovation */
    --aging-gold: #eab308; /* Golden Yellow - value, contribution, elder agency */
    --aging-earth: #451a03; /* Deep Brown - roots, stability, cultural heritage */
    --aging-care: #dc2626; /* Warm Red - care, protection, health systems */
    --aging-innovation: #0891b2; /* Cyan - innovation, technology, future thinking */
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
    background-color: var(--aging-primary);
    color: white;
    border-color: var(--aging-primary);
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
  
  .content {
    min-width: 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--aging-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--aging-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--aging-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--aging-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(5, 150, 105, 0.1);
    border-left: 4px solid var(--aging-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--aging-wisdom);
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
    color: var(--aging-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--aging-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with aging-themed bullets */
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

  /* Apply aging symbols to all ul li EXCEPT those in section-nav */
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
    color: var(--aging-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🤝";
    color: var(--aging-light);
  }

  /* Table styles for aging framework */
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
    background: linear-gradient(to right, var(--aging-primary), var(--aging-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--aging-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(5, 150, 105, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(5, 150, 105, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(5, 150, 105, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--aging-primary);
    text-align: left;
    border-top: 1px solid var(--aging-primary);
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: var(--aging-primary);
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
  
  /* Aging framework guide card */
  .aging-guide-card {
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(124, 45, 18, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(124, 45, 18, 0.1);
    border: 1px solid rgba(124, 45, 18, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .aging-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(124, 45, 18, 0.3);
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
    color: var(--aging-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--aging-primary);
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
    background-color: var(--aging-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--aging-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--aging-primary);
    border: 1px solid var(--aging-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(5, 150, 105, 0.1);
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
    color: var(--aging-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--aging-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--aging-primary);
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
    color: var(--aging-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--aging-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--aging-secondary);
    border-bottom-color: var(--aging-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--aging-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--aging-primary);
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
   background-color: rgba(5, 150, 105, 0.1) !important;
   color: var(--aging-primary) !important;
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
   background-color: rgba(5, 150, 105, 0.1) !important;
   color: var(--aging-primary) !important;
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
   background-color: rgba(5, 150, 105, 0.1);
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

 /* Aging Framework specific theme elements */

 /* Special callouts for aging concepts */
 .content :global(.economic-security-callout) {
   background-color: rgba(234, 179, 8, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-gold);
 }

 .content :global(.elder-agency-callout) {
   background-color: rgba(5, 150, 105, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-secondary);
 }

 .content :global(.wisdom-keeper-callout) {
   background-color: rgba(54, 83, 20, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-wisdom);
 }

 .content :global(.regenerative-economics-callout) {
   background-color: rgba(180, 83, 9, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-accent);
 }

 /* Special styling for case studies */
 .content :global(.case-study) {
   background-color: rgba(8, 145, 178, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-innovation);
 }

 .content :global(.case-study-title) {
   color: var(--aging-innovation);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Alert/warning styling */
 .content :global(.alert) {
   background-color: rgba(220, 38, 38, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--aging-care);
 }

 .content :global(.alert-title) {
   color: var(--aging-care);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Highlight boxes for important aging concepts */
 .content :global(.concept-highlight) {
   background-color: rgba(5, 150, 105, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(5, 150, 105, 0.3);
 }

 .content :global(.concept-highlight-title) {
   color: var(--aging-secondary);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(5, 150, 105, 0.3);
   padding-bottom: 0.5rem;
 }

 /* AUBI and economic concepts styling */
 .content :global(.aubi-highlight) {
   background-color: rgba(234, 179, 8, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(234, 179, 8, 0.3);
 }

 .content :global(.aubi-highlight-title) {
   color: var(--aging-gold);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(234, 179, 8, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Elder agency and leadership styling */
 .content :global(.agency-highlight) {
   background-color: rgba(124, 45, 18, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(124, 45, 18, 0.3);
 }

 .content :global(.agency-highlight-title) {
   color: var(--aging-primary);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(124, 45, 18, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Climate wisdom styling */
 .content :global(.climate-highlight) {
   background-color: rgba(54, 83, 20, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(54, 83, 20, 0.3);
 }

 .content :global(.climate-highlight-title) {
   color: var(--aging-wisdom);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(54, 83, 20, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Innovation and technology styling */
 .content :global(.innovation-highlight) {
   background-color: rgba(8, 145, 178, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(8, 145, 178, 0.3);
 }

 .content :global(.innovation-highlight-title) {
   color: var(--aging-innovation);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(8, 145, 178, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Care and healthcare styling */
 .content :global(.care-highlight) {
   background-color: rgba(220, 38, 38, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(220, 38, 38, 0.3);
 }

 .content :global(.care-highlight-title) {
   color: var(--aging-care);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(220, 38, 38, 0.3);
   padding-bottom: 0.5rem;
 }
</style>
