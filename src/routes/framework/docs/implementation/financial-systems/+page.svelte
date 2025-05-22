<!-- src/routes/framework/docs/implementation/financial-systems/+page.svelte -->
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
      const url = new URL(window.location.href);
      if (section === 'index') {
        url.hash = '';
      } else {
        url.hash = section;
      }
      
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
    title: "Finansiella Systems Ramverk",
    overview: "Översikt",
    paragraph1: "Finansiella Systems Ramverket är en omfattande plan för att omforma globala finanssystem till förmån för mänskligt och ekologiskt välbefinnande. Den integrerar olika uttryck av värde—från traditionella valutor till omsorg, tid och ekologiska bidrag—genom Hearts som en frivillig global valuta.",
    paragraph2: "Detta ramverk omdefinierar finanssystem som levande system som speglar våra kollektiva värderingar och formar våra sociala prioriteringar. Det skapar praktiska övergångsvägar från existerande system till mer holistiska alternativ."
  };

  // English translations as fallback
  const introEn = {
    title: "Financial Systems Framework",
    overview: "Overview",
    paragraph1: "The Financial Systems Framework is a comprehensive blueprint for transforming global financial systems to prioritize human and ecological flourishing. It integrates diverse expressions of value—from traditional currencies to care, time, and ecological contributions—through Hearts as a voluntary global coordinating currency.",
    paragraph2: "This framework reimagines financial systems as living systems that reflect our collective values and shape our social priorities, while providing practical transition pathways from existing systems to more holistic alternatives."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        'quick-guide': "Quick Guide: Technical Version",
        'quick-guide-medium': "Quick Guide: Community Version",
        'quick-guide-youth': "Quick Guide: Youth & Grassroots",
        'index': "Overview",
        '01-introduction': "Introduction",
        '02-core-principles': "Core Principles",
        '03-structural-components': "Structural Components",
        '04-implementation-approaches': "Implementation Approaches",
        '05-metrics-evaluation': "Metrics & Evaluation",
        '06-supporting-sections': "Supporting Sections",
        '07-appendices': "Appendices"
      },
      sv: {
        'quick-guide': "Snabbguide: Teknisk Version",
        'quick-guide-medium': "Snabbguide: Samhällsversion",
        'quick-guide-youth': "Snabbguide: Ungdom & Gräsrötter",
        'index': "Översikt",
        '01-introduction': "Introduktion",
        '02-core-principles': "Kärnprinciper",
        '03-structural-components': "Strukturella Komponenter",
        '04-implementation-approaches': "Implementeringsmetoder",
        '05-metrics-evaluation': "Mätning & Utvärdering",
        '06-supporting-sections': "Stödjande Sektioner",
        '07-appendices': "Bilagor"
      }
    };
    
    return (titles[currentLocale] || titles.en)[section] || section;
  }

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
  
  // Function to download the lite guide PDF
  function downloadLiteGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/financial-systems-framework-lite${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `financial-systems-framework-lite${versionSuffix}.pdf`;
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
        description: 'Detailed guide for policy implementers, financial institutions, and organizations',
        icon: '📊'
      },
      {
        id: 'quick-guide-medium',
        title: 'Community Version',
        description: 'Balanced guide for local authorities, community groups, and non-profits',
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
        description: 'Detaljerad guide för beslutsfattare, finansinstitutioner och organisationer',
        icon: '📊'
      },
      {
        id: 'quick-guide-medium',
        title: 'Samhällsversion',
        description: 'Balanserad guide för lokala myndigheter, samhällsgrupper och ideella organisationer',
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
    <!-- Quick Access Card for Lite Guides -->
    {#if !isPrintMode && !isQuickGuideActive}
      <div class="lite-guide-card">
        <div class="card-content">
          <div class="card-icon">📘</div>
          <div class="card-text">
            <h3>New to the Financial Systems Framework?</h3>
            <p>Start with one of our simplified guides that explain the core concepts for different audiences.</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle" on:click|stopPropagation={toggleDropdown}>
                Choose a Quick Guide <span class="arrow-icon">▾</span>
              </button>
              {#if isDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => selectQuickGuide(guide.id)}>
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
            <!-- Make quick guides into a dropdown in the navbar -->
            <li class="dropdown-li" class:active={isQuickGuideActive}>
              <button class="dropdown-toggle" on:click|stopPropagation={toggleNavDropdown}>
                Quick Guides <span class="arrow-icon">{isNavDropdownOpen ? '▴' : '▾'}</span>
              </button>
              {#if isNavDropdownOpen}
                <div class="dropdown-menu">
                  {#each guides as guide}
                    <button class="dropdown-item" on:click={() => selectQuickGuide(guide.id)}>
                      <span class="guide-icon">{guide.icon}</span>
                      <span class="guide-title">{guide.title}</span>
                    </button>
                  {/each}
                </div>
              {/if}
            </li>
            
            <!-- Regular sections, filtering out the quick guides -->
            {#each Object.keys(data.sections).filter(section => !section.startsWith('quick-guide')) as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getSectionTitle(section)}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section}
        <div class="section-content" id={section}>
          {#if section.startsWith('quick-guide')}
            <!-- Quick Guide selector if we're in one of the guides and not in print mode -->
            {#if !isPrintMode}
              <div class="quick-guide-selector">
                <h2>Financial Systems Framework Quick Guides</h2>
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
              <div class="lite-guide-navigation">
                <button class="secondary-btn" on:click={() => downloadLiteGuide(section.replace('quick-guide', '').replace('-', ''))}>
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
  /* Main styles using Financial Systems Framework color scheme */
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
    background-color: #3A6EA5; /* Heart Blue */
    color: white;
    border-color: #3A6EA5;
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
    border-right: 1px solid #3A6EA5; /* Heart Blue border */
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
    color: #3A6EA5; /* Heart Blue */
    border-left-color: #3A6EA5;
  }
  
  .sidebar a.active {
    color: #3A6EA5; /* Heart Blue */
    border-left-color: #3A6EA5;
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
    color: #3A6EA5; /* Heart Blue */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #3A6EA5; /* Heart Blue */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #8A4F9E; /* Connection Purple */
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #8A4F9E; /* Connection Purple */
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f8f9fc;
    border-left: 4px solid #F5A623; /* Trust Gold */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: #F5A623; /* Trust Gold */
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
    color: #3A6EA5; /* Heart Blue */
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #2A5D8F; /* Darker Heart Blue on hover */
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Add to your existing <style> section */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem; /* Slightly increased for better indentation */
    color: #4b5563; /* Matches paragraph text color */
  }

  .content :global(ul) {
    list-style-type: none; /* Remove default bullets */
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem; /* Slightly more spacing between items */
    padding-left: 1rem;
  }

  /* Apply hearts to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "♥"; /* Heart symbol for Financial Systems */
    position: absolute;
    left: 0;
    color: #8A4F9E; /* Connection Purple */
    font-size: 0.9rem;
  }

  .content :global(ol) {
    list-style-type: decimal; /* Ensure ordered lists use numbers */
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem; /* Consistent spacing with ul */
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: #3A6EA5; /* Heart Blue */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "❥"; /* Small heart for nested items */
    color: #8A4F9E; /* Connection Purple */
  }

  /* Table styles */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    overflow: hidden;
  }

  .content :global(thead) {
    background-color: #3A6EA5; /* Heart Blue background for headers */
    color: #ffffff; /* White text */
  }

  .content :global(th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff; /* White text for better contrast */
    border: none;
    border-bottom: 2px solid #3A6EA5;
  }

  .content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  .content :global(tr:nth-child(odd)) {
    background-color: #f8f9fc;
  }

  .content :global(tr:nth-child(even)) {
    background-color: #ffffff;
  }

  .content :global(tr:hover) {
    background-color: #edf7f0; /* Light background on hover */
  }

  .content :global(tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  .content :global(table caption),
  .content :global(table tfoot) {
    background-color: #e9f0f7; /* Light Heart Blue */
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #3A6EA5;
    text-align: left;
    border-top: 1px solid #3A6EA5;
  }

  /* Highlight important cells */
  .content :global(td.highlight) {
    color: #3A6EA5; /* Heart Blue text */
    font-weight: 600;
  }

  /* For responsive tables on small screens */
  @media (max-width: 640px) {
    .content :global(table) {
      display: block;
      overflow-x: auto;
    }
    
    .content :global(th),
    .content :global(td) {
      white-space: nowrap;
    }
  }
  
  /* Lite Guide card */
  .lite-guide-card {
    background: linear-gradient(135deg, #edf1f7 0%, #e9edfa 100%); /* Heart Blue gradient */
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(58, 110, 165, 0.1); /* Heart Blue shadow */
    border: 1px solid rgba(58, 110, 165, 0.2); /* Heart Blue border */
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .lite-guide-card .dropdown-menu {
    position: absolute;
    top: 100%; /* Position from bottom of button */
    left: 0;
    z-index: 1001; /* Higher than surrounding elements */
    min-width: 300px;
    max-width: 350px; /* Limit width */
    overflow: hidden; /* Fix for transparency issues */
    border: 1px solid rgba(58, 110, 165, 0.3); /* Heart Blue border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Stronger shadow */
    background-color: white; /* Ensure white background */
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
    color: #3A6EA5; /* Heart Blue */
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: #3A6EA5; /* Heart Blue */
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
    background-color: #3A6EA5; /* Heart Blue */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #2A5D8F; /* Darker Heart Blue */
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: #3A6EA5; /* Heart Blue */
    border: 1px solid #3A6EA5;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #edf1f7; /* Light Heart Blue */
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
    color: #3A6EA5; /* Heart Blue */
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: #2A5D8F; /* Darker Heart Blue on hover */
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: #2A5D8F; /* Darker Heart Blue when clicked */
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
    color: #8A4F9E; /* Connection Purple for internal section links */
    text-decoration: none;
    border-bottom: 1px dotted #8A4F9E;
  }

  .content :global(a[href^="#"]):hover {
    color: #6c3d80; /* Darker Connection Purple */
    border-bottom-color: #6c3d80;
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: #3A6EA5; /* Heart Blue */
    font-weight: 600;
  }
  
  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: #3A6EA5; /* Heart Blue */
  }
 
  /* Styles for navigation at bottom of lite guide */
  .lite-guide-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  /* Dropdown styles for quick guides */
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
  
  .dropdown-li {
    position: relative;
  }

  .dropdown-li .dropdown-menu {
    width: 300px;
  }

  /* Fix for dropdown items when lite guide is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important; /* Force white background */
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important; /* Force dark text */
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: #edf1f7 !important; /* Light Heart Blue on hover */
    color: #3A6EA5 !important; /* Heart Blue text on hover */
  }

  .dropdown-li.active .dropdown-menu .dropdown-item {
    color: #212529 !important; /* Force dark text always */
    background-color: transparent !important; /* Clear any background */
  }

  .dropdown-li.active .dropdown-menu {
    background-color: white !important; /* Force white background */
  }

  /* Remove any inherited text color styling */
  .dropdown-li.active .dropdown-item *,
  .dropdown-li.active .guide-title,
  .dropdown-li.active .guide-desc,
  .dropdown-li.active .guide-icon {
    color: inherit !important; /* Force inheritance */
  }

  /* Hover state */
  .dropdown-li.active .dropdown-item:hover {
    background-color: #edf1f7 !important; /* Light Heart Blue on hover */
    color: #3A6EA5 !important; /* Heart Blue text on hover */
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
    background-color: #edf1f7; /* Light Heart Blue */
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
    box-shadow: 0 4px 6px rgba(58, 110, 165, 0.1); /* Heart Blue shadow */
    transform: translateY(-2px);
    border-color: #3A6EA5; /* Heart Blue */
  }
  
  .guide-card.active {
    border-color: #3A6EA5; /* Heart Blue */
    background-color: #edf1f7; /* Light Heart Blue */
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #3A6EA5; /* Heart Blue */
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
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
    }
  }

  /* Financial Systems Framework color-specific elements */

  /* Color coding for different sections */
  .content :global(.core-principles-section h2) {
    color: #F5A623; /* Trust Gold */
    border-left: 3px solid #F5A623;
    padding-left: 0.75rem;
  }

  .content :global(.structural-components-section h2) {
    color: #3A6EA5; /* Heart Blue */
    border-left: 3px solid #3A6EA5;
    padding-left: 0.75rem;
  }

  .content :global(.implementation-section h2) {
    color: #6DAA3F; /* Leaf Green */
    border-left: 3px solid #6DAA3F;
    padding-left: 0.75rem;
  }

  .content :global(.tools-section h2) {
    color: #8A4F9E; /* Connection Purple */
    border-left: 3px solid #8A4F9E;
    padding-left: 0.75rem;
  }

  /* Special callouts for Hearts and Leaves */
  .content :global(.hearts-callout) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid #3A6EA5; /* Heart Blue */
  }

  .content :global(.leaves-callout) {
    background-color: rgba(109, 170, 63, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid #6DAA3F; /* Leaf Green */
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(245, 166, 35, 0.1); /* Trust Gold background */
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #F5A623; /* Trust Gold */
  }

  .content :global(.case-study-title) {
    color: #F5A623; /* Trust Gold */
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1); /* Equity Red background */
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #C43B3B; /* Equity Red */
  }

  .content :global(.alert-title) {
    color: #C43B3B; /* Equity Red */
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(138, 79, 158, 0.1); /* Connection Purple background */
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(138, 79, 158, 0.3); /* Connection Purple border */
  }

  .content :global(.concept-highlight-title) {
    color: #8A4F9E; /* Connection Purple */
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(138, 79, 158, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
