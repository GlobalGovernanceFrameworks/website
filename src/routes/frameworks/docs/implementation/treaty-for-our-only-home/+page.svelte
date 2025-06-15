<!-- src/routes/frameworks/docs/implementation/treaty-for-our-only-home/+page.svelte -->
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
        const hash = window.location.hash.substring(1);
        if (hash && data.sections[hash] && activeSection !== hash) {
          activeSection = hash;
          
          // Add scroll to top for ALL hash changes
          setTimeout(() => {
            const contentElement = document.querySelector('.content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 500);
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
      
      // Scroll to top of the content area
      const contentElement = document.querySelector('.content');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to scrolling to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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

  const translations = {
    en: {
      // Section labels
      sectionLabels: {
        introductory: "Getting Started",
        resources: "Additional Resources", 
        framework: "Core Framework"
      }
    },
    sv: {
      // Section labels
      sectionLabels: {
        introductory: "Komma igång",
        resources: "Ytterligare resurser",
        framework: "Kärnramverk"
      }
    }
  };

  $: texts = translations[currentLocale] || translations.en;

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        // Entry and overview sections
        'index': "Overview",
        'at-a-glance': "At a Glance",
        'executive-summary-for-the-skeptic': "Executive Summary for the Skeptic",
        
        // Core treaty sections (01-06)
        '01-introduction': "The Polycrisis Response",
        '02-core-principles': "Core Principles",
        '03-five-pillars': "The Five Pillars of Reform",
        '04-implementation-strategies': "Implementation Strategies",
        '05-monitoring-evaluation': "Monitoring & Evaluation",
        '06-conclusion': "The Vision Realized",
        
        // Supplementary materials (07-08)
        '07-faq-and-challenges': "FAQ & Challenges",
        '08-glossary': "Glossary",

        // Communication resources
        'social-media-templates': "Social Media Templates",

        // Navigation labels
        'resources': "Resources"
      },
      sv: {
        // Entry and overview sections (Swedish)
        'index': "Översikt",
        'at-a-glance': "I korthet",
        'executive-summary-for-the-skeptic': "Sammanfattning för skeptiker",
        
        // Core treaty sections (Swedish)
        '01-introduction': "Polykrisens svar",
        '02-core-principles': "Grundprinciper",
        '03-five-pillars': "De fem reformpelarna",
        '04-implementation-strategies': "Implementeringsstrategier",
        '05-monitoring-evaluation': "Övervakning & utvärdering",
        '06-conclusion': "Visionen förverkligad",
                
        // Supplementary materials (Swedish)
        '07-faq-and-challenges': "Vanliga frågor & utmaningar",
        '08-glossary': "Ordlista",

        // Communication resources (Swedish)
        'social-media-templates': "Sociala medier mallar",

        // Navigation labels
        'resources': "Resurser"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Function to get shortened section titles for navigation
  function getShortSectionTitle(section) {
    const fullTitle = getSectionTitle(section).replace(/^\d{2}-/, '');
    
    const shortTitles = {
      en: {
        'The Polycrisis Response': 'Introduction',
        'Core Principles': 'Principles',
        'The Five Pillars of Reform': 'Five Pillars',
        'Implementation Strategies': 'Implementation',
        'Monitoring & Evaluation': 'Monitoring',
        'The Vision Realized': 'Conclusion',
        'FAQ & Challenges': 'FAQ',
        'Glossary': 'Glossary'
      },
      sv: {
        'Polykrisens svar': 'Introduktion',
        'Grundprinciper': 'Principer',
        'De fem reformpelarna': 'Fem pelare',
        'Implementeringsstrategier': 'Implementering',
        'Övervakning & utvärdering': 'Övervakning',
        'Visionen förverkligad': 'Slutsats',
        'Vanliga frågor & utmaningar': 'FAQ',
        'Ordlista': 'Ordlista'
      }
    };
    
    return (shortTitles[currentLocale] || shortTitles.en)[fullTitle] || fullTitle;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the treaty PDF
  function downloadTreaty(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/treaty-for-our-only-home${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `treaty-for-our-only-home${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Check if the active section is the executive summary
  $: isExecutiveSummaryActive = activeSection === 'executive-summary-for-the-skeptic';
  $: isSupplementaryActive = ['07-faq-and-challenges', '08-glossary', 'social-media-templates'].includes(activeSection);

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
    <!-- Quick Access Card for Treaty -->
    {#if !isPrintMode && !isExecutiveSummaryActive && activeSection === 'index'}
      <div class="treaty-guide-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h3>New to the Treaty for Our Only Home?</h3>
            <p>Start with our executive summary designed specifically for skeptics—addressing practical concerns about governance transformation.</p>
          </div>
          <div class="card-actions">
            <button class="primary-btn" on:click={() => setActiveSection('executive-summary-for-the-skeptic')}>
              Read Executive Summary for Skeptics <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    {/if}

    {#if data.isModular}
      <!-- Sub-navigation for treaty sections -->
      {#if !isPrintMode} 
        <div class="section-nav">
          <!-- Group 1: Introductory sections -->
          <div class="section-group">
            <div class="section-label">
              <span class="label-text">{texts.sectionLabels.introductory}</span>
            </div>
            <ul>
              <li class:active={activeSection === 'index'}>
                <button on:click={() => setActiveSection('index')}>
                  {getSectionTitle('index')}
                </button>
              </li>
              <li class:active={activeSection === 'at-a-glance'}>
                <button on:click={() => setActiveSection('at-a-glance')}>
                  {getSectionTitle('at-a-glance')}
                </button>
              </li>
              <li class:active={activeSection === 'executive-summary-for-the-skeptic'}>
                <button on:click={() => setActiveSection('executive-summary-for-the-skeptic')}>
                  {getShortSectionTitle('executive-summary-for-the-skeptic')}
                </button>
              </li>
            </ul>
          </div>

          <!-- Group 2: Core Framework sections -->
          <div class="section-group">
            <div class="section-label">
              <span class="label-text">{texts.sectionLabels.framework}</span>
            </div>
            <ul class="framework-sections">
              {#each Object.keys(data.sections).filter(section => 
                section.match(/^\d{2}-/) && !['index', 'at-a-glance', 'executive-summary-for-the-skeptic', '07-faq-and-challenges', '08-glossary'].includes(section)
              ) as section}
                <li class:active={activeSection === section}>
                  <button on:click={() => setActiveSection(section)}>
                    {getShortSectionTitle(section)}
                  </button>
                </li>
              {/each}
            </ul>
          </div>

         <!-- Group 3: Resources -->
        <div class="section-group">
          <div class="section-label">
            <span class="label-text">{texts.sectionLabels.resources}</span>
          </div>
          <ul>
            <li class:active={activeSection === '07-faq-and-challenges'}>
              <button on:click={() => setActiveSection('07-faq-and-challenges')}>
                <span class="resource-icon">❓</span>
                {getSectionTitle('07-faq-and-challenges')}
              </button>
            </li>
            <li class:active={activeSection === '08-glossary'}>
              <button on:click={() => setActiveSection('08-glossary')}>
                <span class="resource-icon">📖</span>
                {getSectionTitle('08-glossary')}
              </button>
            </li>
            <li class:active={activeSection === 'social-media-templates'}>
              <button on:click={() => setActiveSection('social-media-templates')}>
                <span class="resource-icon">📱</span>
                {getSectionTitle('social-media-templates')}
              </button>
            </li>
          </ul>
        </div>

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
          
          <!-- Navigation buttons at bottom of executive summary -->
          {#if section === 'executive-summary-for-the-skeptic' && !isPrintMode}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadTreaty('executive-summary')}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('01-introduction')}>
                Continue to Full Treaty <span class="arrow-icon">→</span>
              </button>
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <!-- Legacy single file display -->
      <div class="overview-section">
        <h1>Treaty for Our Only Home</h1>
        <h2>A Framework for Global Governance Transformation</h2>
        <p>The Treaty for Our Only Home provides a comprehensive blueprint for transforming global governance systems to address the polycrisis of climate change, democratic erosion, and economic instability.</p>
      </div>
      
      <!-- The rest of the content -->
      <div class="remaining-content">
        <svelte:component this={data.component} />
      </div>
    {/if}
  </div>
</div>

<style>
  /* Treaty for Our Only Home color scheme */
  :root {
    --treaty-primary: #0A2540;
    --treaty-secondary: #00C49A;
    --treaty-accent: #3A6EA5;
    --treaty-success: #6DAA3F;
    --treaty-warning: #F5A623;
    --treaty-danger: #C43B3B;
    --treaty-light: #E8F4FD;
    --treaty-dark: #1A365D;
    --treaty-wisdom: #2D3748;
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
  }

  /* Section Navigation */
  .section-nav {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .section-group {
    margin-bottom: 1.5rem;
  }

  .section-group:last-child {
    margin-bottom: 0;
    padding-bottom: 1rem;
  }

  .section-label {
    position: relative;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
  }

  .section-label::before,
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--treaty-secondary), var(--treaty-accent));
  }

  .section-label::before {
    margin-right: 1rem;
  }

  .section-label::after {
    margin-left: 1rem;
  }

  .label-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--treaty-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
    background-color: white;
    border: 1px solid var(--treaty-accent);
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .section-nav ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
  }

  .section-nav li {
    margin: 0;
  }

  .section-nav button {
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .section-nav li.active button {
    background-color: var(--treaty-primary);
    color: white;
    border-color: var(--treaty-primary);
  }

  .section-nav button:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }

  .section-nav li.active button:hover {
    background-color: var(--treaty-secondary);
    color: white;
  }

  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--treaty-primary);
  }

  /* Resource icons */
  .resource-icon {
    font-size: 1.1rem;
    margin-right: 0.5rem;
    display: inline-block;
    width: 1.5rem;
    text-align: center;
  }

  /* Update button styles to accommodate icons */
  .section-nav button {
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  /* Treaty guide card */
  .treaty-guide-card {
    background: linear-gradient(135deg, rgba(0, 196, 154, 0.1) 0%, rgba(10, 37, 64, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(10, 37, 64, 0.1);
    border: 1px solid rgba(10, 37, 64, 0.2);
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
    color: var(--treaty-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--treaty-primary);
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
    background-color: var(--treaty-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--treaty-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--treaty-primary);
    border: 1px solid var(--treaty-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(0, 196, 154, 0.1);
    transform: translateY(-1px);
  }
  
  .guide-navigation {
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

  /* Content styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--treaty-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--treaty-secondary);
  }
  
  .content :global(h3),
  :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--treaty-accent);
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
    background-color: rgba(0, 196, 154, 0.1);
    border-left: 4px solid var(--treaty-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--treaty-primary);
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
    color: var(--treaty-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--treaty-primary);
  }

  /* Lists */
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

  .content :global(ul li:not(.section-nav li))::before {
    content: "•";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1.2rem;
    color: var(--treaty-secondary);
  }

  .content :global(ol) {
    list-style-type: decimal;
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: var(--treaty-secondary);
    font-weight: 600;
  }

  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "◦";
    color: var(--treaty-accent);
    font-size: 1rem;
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
    background: linear-gradient(to right, var(--treaty-primary), var(--treaty-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--treaty-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(0, 196, 154, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(0, 196, 154, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(0, 196, 154, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--treaty-primary);
    text-align: left;
    border-top: 1px solid var(--treaty-primary);
  }

  :global(.content td.highlight) {
    color: var(--treaty-primary);
    font-weight: 600;
  }

  /* Links */
  .content :global(a) {
    color: var(--treaty-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--treaty-primary);
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
    color: var(--treaty-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--treaty-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--treaty-secondary);
    border-bottom-color: var(--treaty-secondary);
  }

  .content :global(table a) {
    color: var(--treaty-secondary);
    font-weight: 600;
  }

  /* Treaty-specific callouts */
  .content :global(.governance-callout) {
    background-color: rgba(10, 37, 64, 0.1);
    border-left: 4px solid var(--treaty-primary);
  }

  .content :global(.cooperation-callout) {
    background-color: rgba(0, 196, 154, 0.1);
    border-left: 4px solid var(--treaty-secondary);
  }

  .content :global(.transformation-callout) {
    background-color: rgba(58, 110, 165, 0.1);
    border-left: 4px solid var(--treaty-accent);
  }

  .content :global(.sustainability-callout) {
    background-color: rgba(109, 170, 63, 0.1);
    border-left: 4px solid var(--treaty-success);
  }

  .content :global(.governance-callout),
  .content :global(.cooperation-callout),
  .content :global(.transformation-callout),
  .content :global(.sustainability-callout) {
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
  }

  /* Highlight boxes */
  .content :global(.concept-highlight),
  .content :global(.pillar-highlight),
  .content :global(.strategy-highlight),
  .content :global(.monitoring-highlight),
  .content :global(.crisis-highlight),
  .content :global(.success-highlight),
  .content :global(.democracy-highlight) {
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid;
  }

  .content :global(.concept-highlight),
  .content :global(.democracy-highlight) {
    background-color: rgba(0, 196, 154, 0.1);
    border-color: rgba(0, 196, 154, 0.3);
  }

  .content :global(.pillar-highlight) {
    background-color: rgba(10, 37, 64, 0.1);
    border-color: rgba(10, 37, 64, 0.3);
  }

  .content :global(.strategy-highlight) {
    background-color: rgba(245, 166, 35, 0.1);
    border-color: rgba(245, 166, 35, 0.3);
  }

  .content :global(.monitoring-highlight) {
    background-color: rgba(58, 110, 165, 0.1);
    border-color: rgba(58, 110, 165, 0.3);
  }

  .content :global(.crisis-highlight),
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1);
    border-color: rgba(196, 59, 59, 0.3);
  }

  .content :global(.success-highlight) {
    background-color: rgba(109, 170, 63, 0.1);
    border-color: rgba(109, 170, 63, 0.3);
  }

  .content :global(.democracy-highlight) {
    background-color: rgba(232, 244, 253, 0.8);
  }

  .content :global(.case-study) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--treaty-accent);
  }

  .content :global(.alert) {
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--treaty-danger);
  }

  /* Highlight titles */
  .content :global(.concept-highlight-title),
  .content :global(.democracy-highlight-title) {
    color: var(--treaty-secondary);
  }

  .content :global(.pillar-highlight-title) {
    color: var(--treaty-primary);
  }

  .content :global(.strategy-highlight-title) {
    color: var(--treaty-warning);
  }

  .content :global(.monitoring-highlight-title) {
    color: var(--treaty-accent);
  }

  .content :global(.crisis-highlight-title),
  .content :global(.alert-title) {
    color: var(--treaty-danger);
  }

  .content :global(.success-highlight-title) {
    color: var(--treaty-success);
  }

  .content :global(.case-study-title) {
    color: var(--treaty-accent);
  }

  .content :global(.concept-highlight-title),
  .content :global(.pillar-highlight-title),
  .content :global(.strategy-highlight-title),
  .content :global(.monitoring-highlight-title),
  .content :global(.crisis-highlight-title),
  .content :global(.success-highlight-title),
  .content :global(.democracy-highlight-title),
  .content :global(.case-study-title),
  .content :global(.alert-title) {
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  .content :global(.concept-highlight-title),
  .content :global(.pillar-highlight-title),
  .content :global(.strategy-highlight-title),
  .content :global(.monitoring-highlight-title),
  .content :global(.crisis-highlight-title),
  .content :global(.success-highlight-title),
  .content :global(.democracy-highlight-title) {
    border-bottom: 1px solid;
    padding-bottom: 0.5rem;
  }

  .content :global(.concept-highlight-title),
  .content :global(.democracy-highlight-title) {
    border-bottom-color: rgba(0, 196, 154, 0.3);
  }

  .content :global(.pillar-highlight-title) {
    border-bottom-color: rgba(10, 37, 64, 0.3);
  }

  .content :global(.strategy-highlight-title) {
    border-bottom-color: rgba(245, 166, 35, 0.3);
  }

  .content :global(.monitoring-highlight-title) {
    border-bottom-color: rgba(58, 110, 165, 0.3);
  }

  .content :global(.crisis-highlight-title) {
    border-bottom-color: rgba(196, 59, 59, 0.3);
  }

  .content :global(.success-highlight-title) {
    border-bottom-color: rgba(109, 170, 63, 0.3);
  }

  /* Metadata */
  .content :global(.treaty-metadata) {
    background-color: rgba(45, 55, 72, 0.05);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(45, 55, 72, 0.2);
    font-size: 0.9rem;
    color: var(--treaty-wisdom);
  }

  .content :global(.treaty-version) {
    font-weight: 600;
    color: var(--treaty-primary);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .section-nav ul {
      gap: 0.25rem;
    }
    
    .section-nav button {
      padding: 0.4rem 0.8rem;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }

    .section-nav ul {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .section-nav button {
      width: 100%;
      text-align: left;
      padding: 0.75rem 1rem;
    }
    
    .label-text {
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
    }
    
    .section-label::before,
    .section-label::after {
      margin: 0 0.5rem;
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
   
    .guide-navigation {
      flex-direction: column;
      gap: 1rem;
    }
   
    .guide-navigation button {
      width: 100%;
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
