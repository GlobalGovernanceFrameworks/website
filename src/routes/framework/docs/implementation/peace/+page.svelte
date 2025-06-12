<!-- src/routes/framework/docs/implementation/peace/+page.svelte -->
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
</script>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Lite Guides -->
    {#if !isPrintMode && !isGuideActive}
      <div class="lite-guide-card">
        <div class="card-content">
          <div class="card-icon">📘</div>
          <div class="card-text">
            <h3>New to the Peace & Conflict Resolution Framework?</h3>
            <p>Start with one of our simplified guides that explain the core concepts for different audiences.</p>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="primary-btn dropdown-toggle">
                Choose a Guide <span class="arrow-icon">▾</span>
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
          <ul>
            <!-- Make guides into a dropdown in the navbar -->
            <li class="dropdown-li" class:active={isGuideActive}>
              <button class="dropdown-toggle">
                Guides <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu">
                {#each guides as guide}
                  <button class="dropdown-item" on:click={() => selectGuide(guide.id)}>
                    <span class="guide-icon">{guide.icon}</span>
                    <span class="guide-title">{guide.title}</span>
                  </button>
                {/each}
              </div>
            </li>
            
            <!-- Regular sections, filtering out the guides -->
            {#each Object.keys(data.sections).filter(section => 
              !section.includes('guide') &&
              section !== 'quick-guide'
            ) as section}
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
  /* Updated styles with peace-themed colors (blue-purple palette) */
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
    background-color: #5B6FBF; /* Updated to peace framework blue-purple */
    color: white;
    border-color: #5B6FBF;
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
    border-right: 1px solid #5B6FBF; /* Updated to peace framework blue-purple */
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
    color: #5B6FBF; /* Updated to peace framework blue-purple */
    border-left-color: #5B6FBF;
  }
  
  .sidebar a.active {
    color: #5B6FBF; /* Updated to peace framework blue-purple */
    border-left-color: #5B6FBF;
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
    color: #5B6FBF; /* Updated to peace framework blue-purple */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #5B6FBF; /* Updated to peace framework blue-purple */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #5B6FBF; /* Updated to peace framework blue-purple */
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #5B6FBF; /* Updated to peace framework blue-purple */
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f3f4fa;
    border-left: 4px solid #5B6FBF; /* Updated to peace framework blue-purple */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: #5B6FBF; /* Updated to peace framework blue-purple */
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
    color: #5B6FBF; /* Updated to peace framework blue-purple */
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #404E9F; /* Darker blue-purple on hover */
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

  /* Apply peace symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "☮";  /* Peace symbol for the peace framework */
    position: absolute;
    left: -0.5em;
    color: #5B6FBF; /* Updated to peace framework blue-purple */
    top: 0.15em;
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
    color: #5B6FBF; /* Updated to peace framework blue-purple */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "•"; /* Smaller symbol for nested items */
    color: #8A94D6; /* Lighter blue-purple for nested bullets */
  }

  /* Table styles for markdown content with peace theme */
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
    background: linear-gradient(to right, #5B6FBF, #8A94D6);
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid #5B6FBF;
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
    background-color: #eef0fa; /* Light blue-purple background on hover */
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: #eef0fa; /* Light blue-purple */
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #5B6FBF;
    text-align: left;
    border-top: 1px solid #5B6FBF;
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: #5B6FBF; /* Blue-purple text */
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
    top: 100%; /* Position from bottom of button */
    left: 0;
    z-index: 1001; /* Higher than surrounding elements */
    min-width: 300px;
    max-width: 350px; /* Limit width */
    overflow: visible; /* Ensure visible outside container */
    border: 1px solid rgba(91, 111, 191, 0.3); /* Blue-purple-tinted border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Stronger shadow */
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
    color: #5B6FBF; /* Blue-purple for peace */
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: #5B6FBF; /* Blue-purple for peace */
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
    background-color: #5B6FBF; /* Blue-purple for peace */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #404E9F; /* Darker blue-purple */
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: #5B6FBF; /* Blue-purple for peace */
    border: 1px solid #5B6FBF;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #eef0fa; /* Light blue-purple */
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
    color: #5B6FBF; /* Blue-purple for peace */
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: #404E9F; /* Darker blue-purple on hover */
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: #404E9F; /* Darker blue-purple when clicked */
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
    color: #8A94D6; /* Slightly different blue-purple for internal section links */
    text-decoration: none;
    border-bottom: 1px dotted #8A94D6;
  }

  .content :global(a[href^="#"]):hover {
    color: #5B6FBF;
    border-bottom-color: #5B6FBF;
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: #5B6FBF;
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: #5B6FBF; /* Blue-purple for peace */
  }
 
  /* Styles for navigation at bottom of lite guide */
  .lite-guide-navigation {
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
    height: 10px; /* Height of the bridge */
    background: transparent; /* Invisible */
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

  /* Fix for dropdown items when lite guide is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important; /* Force white background */
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important; /* Force dark text */
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: #eef0fa !important; /* Light blue-purple on hover */
    color: #5B6FBF !important; /* Blue-purple text on hover */
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
    background-color: #eef0fa !important; /* Light blue-purple on hover */
    color: #5B6FBF !important; /* Blue-purple text on hover */
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
    background-color: #eef0fa;
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
    border-color: #5B6FBF;
  }
  
  .guide-card.active {
    border-color: #5B6FBF;
    background-color: #eef0fa;
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #5B6FBF;
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
 </style>
