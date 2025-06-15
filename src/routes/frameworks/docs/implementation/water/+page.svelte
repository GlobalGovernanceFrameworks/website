<!-- src/routes/frameworks/docs/implementation/water/+page.svelte -->
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
    title: "Vatten & Sanitet (WASH) Styrning Ramverk Implementering",
    overview: "Översikt",
    paragraph1: "Det Globala Ramverket för Vatten & Sanitet (WASH) Styrning framträder som en transformativ plan för att uppnå universell tillgång till säkert hanterat vatten och sanitet samtidigt som vi helar vår planets vattensystem.",
    paragraph2: "Detta ramverk föreställer om vattenstyrning som grundat i mänskliga rättigheter, planetär förvaltarskap och urfolks visdom, vilket skapar en väg till rättvisa, motståndskraft och regenerering."
  };

  // English translations as fallback
  const introEn = {
    title: "Water & Sanitation (WASH) Governance Framework Implementation",
    overview: "Overview",
    paragraph1: "The Global Framework for Water & Sanitation (WASH) Governance emerges as a transformative blueprint for achieving universal access to safely managed water and sanitation while healing our planet's water systems.",
    paragraph2: "This framework reimagines water governance as grounded in human rights, planetary stewardship, and Indigenous wisdom, creating pathways to justice, resilience, and regeneration."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Core framework sections
        'index': "Overview",
        'theory-of-change': "Theory of Change",
        'executive-summary': "Executive Summary",
        'quick-implementation-guide': "Quick Implementation Guide",
        'youth-leadership-guide': "Youth Leadership Guide",
        
        // Main framework sections (01-11)
        '01-guiding-principles': "Guiding Principles",
        '02-institutional-policy-framework': "Institutional & Policy Framework",
        '03-financing-investment': "Financing & Investment",
        '04-service-delivery-infrastructure': "Service Delivery & Infrastructure",
        '05-monitoring-accountability': "Monitoring & Accountability",
        '06-climate-environmental-integration': "Climate & Environmental Integration",
        '07-innovation-knowledge-sharing': "Innovation & Knowledge Sharing",
        '08-crisis-response-adaptation': "Crisis Response & Adaptation",
        '09-social-behavioral-change': "Social & Behavioral Change",
        '10-global-partnerships': "Global Partnerships",
        '11-ethical-systems-framing': "Ethical & Systems Framing",
        
        // Implementation materials
        'implementation-roadmap': "Implementation Roadmap",
        'regional-implementation-blueprints': "Regional Implementation Blueprints",
        'visual-accessibility-aids': "Visual & Accessibility Aids",
        'glossary': "Glossary"
      },
      sv: {
        // Core framework sections (Swedish)
        'index': "Översikt",
        'theory-of-change': "Förändrings Teori",
        'executive-summary': "Verkställande Sammanfattning",
        'quick-implementation-guide': "Snabb Implementerings Guide",
        'youth-leadership-guide': "Ungdoms Ledarskaps Guide",
        
        // Main framework sections (Swedish)
        '01-guiding-principles': "Vägledande Principer",
        '02-institutional-policy-framework': "Institutionellt & Policy Ramverk",
        '03-financing-investment': "Finansiering & Investering",
        '04-service-delivery-infrastructure': "Tjänsteleverans & Infrastruktur",
        '05-monitoring-accountability': "Övervakning & Ansvarighet",
        '06-climate-environmental-integration': "Klimat & Miljöintegration",
        '07-innovation-knowledge-sharing': "Innovation & Kunskapsdelning",
        '08-crisis-response-adaptation': "Krisstyrning & Anpassning",
        '09-social-behavioral-change': "Social & Beteende Förändring",
        '10-global-partnerships': "Globala Partnerskap",
        '11-ethical-systems-framing': "Etiskt & System Ramverk",
        
        // Implementation materials
        'implementation-roadmap': "Implementerings Färdplan",
        'regional-implementation-blueprints': "Regional Implementerings Ritningar",
        'visual-accessibility-aids': "Visuell & Tillgänglighets Hjälpmedel",
        'glossary': "Ordlista"
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
    const pdfUrl = `${base}/assets/pdf/water-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `water-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is an accessible guide
  $: isQuickGuideActive = activeSection === 'quick-implementation-guide';
  $: isAccessibleActive = ['executive-summary', 'quick-implementation-guide', 'youth-leadership-guide'].includes(activeSection);

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
    <!-- Quick Access Card for Water Framework -->
    {#if !isPrintMode && !isQuickGuideActive && activeSection === 'index'}
      <div class="water-guide-card">
        <div class="card-content">
          <div class="card-icon">💧</div>
          <div class="card-text">
            <h3>New to Water Governance?</h3>
            <p>Start with our practical guide that explains how communities can begin transforming their water systems today.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('quick-implementation-guide')}>
              Read the Quick Implementation Guide <span class="arrow-icon">→</span>
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
            
            <!-- Theory of Change -->
            <li class:active={activeSection === 'theory-of-change'}>
              <button on:click={() => setActiveSection('theory-of-change')}>
                Theory of Change
              </button>
            </li>
            
            <!-- Core Framework sections (01-11) -->
            {#each Object.keys(data.sections).filter(section => 
              section.match(/^\d{2}-/) && !['executive-summary', 'quick-implementation-guide', 'youth-leadership-guide'].includes(section)
            ) as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getSectionTitle(section).replace(/^\d{2}-/, '')}
                </button>
              </li>
            {/each}
            
            <!-- Implementation Materials -->
            <li class:active={activeSection === 'implementation-roadmap'}>
              <button on:click={() => setActiveSection('implementation-roadmap')}>
                Implementation Roadmap
              </button>
            </li>
            
            <li class:active={activeSection === 'regional-implementation-blueprints'}>
              <button on:click={() => setActiveSection('regional-implementation-blueprints')}>
                Regional Blueprints
              </button>
            </li>
            
            <li class:active={activeSection === 'visual-accessibility-aids'}>
              <button on:click={() => setActiveSection('visual-accessibility-aids')}>
                Visual & Accessibility
              </button>
            </li>
            
            <li class:active={activeSection === 'glossary'}>
              <button on:click={() => setActiveSection('glossary')}>
                Glossary
              </button>
            </li>
            
            <!-- Accessible Guides dropdown -->
            <li class="dropdown-li" class:active={isAccessibleActive}>
              <button class="dropdown-toggle">
                Guides <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu guides-dropdown">
                <button class="dropdown-item" on:click={() => setActiveSection('executive-summary')}>
                  <span class="supplement-icon">📋</span>
                  <span class="supplement-title">Executive Summary</span>
                </button>
                <button class="dropdown-item" on:click={() => setActiveSection('quick-implementation-guide')}>
                  <span class="supplement-icon">🚀</span>
                  <span class="supplement-title">Quick Implementation Guide</span>
                </button>
                <button class="dropdown-item" on:click={() => setActiveSection('youth-leadership-guide')}>
                  <span class="supplement-icon">🌊</span>
                  <span class="supplement-title">Youth Leadership Guide</span>
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
          
          <!-- Navigation buttons at bottom of quick guide -->
          {#if section === 'quick-implementation-guide' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide('quick')}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-guiding-principles')}>
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
  /* Water & Sanitation Framework color scheme - ocean blues, life-giving teals, earth greens */
  :root {
    --water-primary: #0369a1; /* Deep Ocean Blue - depth, trust, reliability */
    --water-secondary: #0891b2; /* Cyan Blue - flow, movement, accessibility */
    --water-accent: #0d9488; /* Teal - balance, healing, sustainability */
    --water-sacred: #1e40af; /* Sacred Blue - spiritual connection, reverence */
    --water-light: #67e8f9; /* Light Cyan - purity, clarity, hope */
    --water-earth: #15803d; /* Forest Green - life, growth, regeneration */
    --water-justice: #dc2626; /* Strong Red - urgency, justice, human rights */
    --water-wisdom: #4338ca; /* Indigo - traditional knowledge, wisdom */
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
    background-color: var(--water-primary);
    color: white;
    border-color: var(--water-primary);
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
    border-right: 1px solid var(--water-primary);
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
    color: var(--water-primary);
    border-left-color: var(--water-primary);
  }
  
  .sidebar a.active {
    color: var(--water-primary);
    border-left-color: var(--water-primary);
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
    color: var(--water-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--water-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--water-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--water-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(103, 232, 249, 0.1);
    border-left: 4px solid var(--water-sacred);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--water-sacred);
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
    color: var(--water-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--water-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with water-themed bullets */
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

  /* Apply water symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "💧";
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
    color: var(--water-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🌊";
    color: var(--water-light);
  }

  /* Table styles for water framework */
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
    background: linear-gradient(to right, var(--water-primary), var(--water-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--water-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(103, 232, 249, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(103, 232, 249, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(103, 232, 249, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--water-primary);
    text-align: left;
    border-top: 1px solid var(--water-primary);
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: var(--water-primary);
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
  
  /* Water guide card */
  .water-guide-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(3, 105, 161, 0.1);
    border: 1px solid rgba(3, 105, 161, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .water-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(3, 105, 161, 0.3);
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
    color: var(--water-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--water-primary);
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
    background-color: var(--water-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--water-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--water-primary);
    border: 1px solid var(--water-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(103, 232, 249, 0.1);
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
    color: var(--water-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--water-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--water-primary);
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
   color: var(--water-accent);
   text-decoration: none;
   border-bottom: 1px dotted var(--water-accent);
 }

 .content :global(a[href^="#"]):hover {
   color: var(--water-secondary);
   border-bottom-color: var(--water-secondary);
 }

 /* Make sure links in tables are readable against the background */
 .content :global(table a) {
   color: var(--water-secondary);
   font-weight: 600;
 }

 /* Links in the section navigation */
 .section-nav a {
   color: #4b5563;
   text-decoration: none;
   transition: color 0.2s;
 }

 .section-nav a:hover {
   color: var(--water-primary);
 }

 /* Styles for navigation at bottom of guide */
 .guide-navigation {
   display: flex;
   justify-content: space-between;
   margin-top: 3rem;
   padding-top: 1.5rem;
   border-top: 1px solid #e5e7eb;
 }
 
 /* Dropdown styles for accessible guides */
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

 /* Fix for dropdown items when guides is active */
 .dropdown-li.active .dropdown-menu {
   background-color: white !important;
 }

 .dropdown-li.active .dropdown-item {
   color: #212529 !important;
 }

 .dropdown-li.active .dropdown-item:hover {
   background-color: rgba(103, 232, 249, 0.1) !important;
   color: var(--water-primary) !important;
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
   background-color: rgba(103, 232, 249, 0.1) !important;
   color: var(--water-primary) !important;
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
   background-color: rgba(103, 232, 249, 0.1);
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

 /* Water Framework specific theme elements */

 /* Special callouts for water concepts */
 .content :global(.human-rights-callout) {
   background-color: rgba(220, 38, 38, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-justice);
 }

 .content :global(.sacred-waters-callout) {
   background-color: rgba(67, 56, 202, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-wisdom);
 }

 .content :global(.regenerative-callout) {
   background-color: rgba(21, 128, 61, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-earth);
 }

 .content :global(.community-empowerment-callout) {
   background-color: rgba(13, 148, 136, 0.1);
   border-radius: 0.5rem;
   padding: 1rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-accent);
 }

 /* Special styling for case studies */
 .content :global(.case-study) {
   background-color: rgba(3, 105, 161, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-primary);
 }

 .content :global(.case-study-title) {
   color: var(--water-primary);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Alert/warning styling */
 .content :global(.alert) {
   background-color: rgba(220, 38, 38, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border-left: 4px solid var(--water-justice);
 }

 .content :global(.alert-title) {
   color: var(--water-justice);
   font-weight: 600;
   margin-bottom: 0.75rem;
 }

 /* Highlight boxes for important water concepts */
 .content :global(.concept-highlight) {
   background-color: rgba(103, 232, 249, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(103, 232, 249, 0.3);
 }

 .content :global(.concept-highlight-title) {
   color: var(--water-secondary);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(103, 232, 249, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Water rights principles styling */
 .content :global(.rights-highlight) {
   background-color: rgba(220, 38, 38, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(220, 38, 38, 0.3);
 }

 .content :global(.rights-highlight-title) {
   color: var(--water-justice);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(220, 38, 38, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Implementation practices styling */
 .content :global(.implementation-highlight) {
   background-color: rgba(13, 148, 136, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(13, 148, 136, 0.3);
 }

 .content :global(.implementation-highlight-title) {
   color: var(--water-accent);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(13, 148, 136, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Indigenous wisdom styling */
 .content :global(.indigenous-highlight) {
   background-color: rgba(67, 56, 202, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(67, 56, 202, 0.3);
 }

 .content :global(.indigenous-highlight-title) {
   color: var(--water-wisdom);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(67, 56, 202, 0.3);
   padding-bottom: 0.5rem;
 }

 /* Climate adaptation and environmental styling */
 .content :global(.climate-highlight) {
   background-color: rgba(21, 128, 61, 0.1);
   border-radius: 0.5rem;
   padding: 1.25rem;
   margin: 1.5rem 0;
   border: 1px solid rgba(21, 128, 61, 0.3);
 }

 .content :global(.climate-highlight-title) {
   color: var(--water-earth);
   font-weight: 600;
   margin-bottom: 0.75rem;
   border-bottom: 1px solid rgba(21, 128, 61, 0.3);
   padding-bottom: 0.5rem;
 }
</style>
