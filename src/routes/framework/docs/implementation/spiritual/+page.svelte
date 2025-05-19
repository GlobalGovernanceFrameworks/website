<!-- src/routes/framework/docs/implementation/spiritual/+page.svelte -->
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
    title: "Religiös & Spirituell Dialog Ramverk",
    overview: "Översikt",
    paragraph1: "Religiös & Spirituell Dialog Ramverket är en strukturerad väg för att integrera religiösa, andliga och icke-teistiska etiska perspektiv i global styrning. Det skapar etiska, inkluderande dialogvägar för andlig visdom att bidra till hanteringen av globala utmaningar.",
    paragraph2: "Detta ramverk omdefinierar global styrning genom att erkänna de andliga dimensionerna av mänsklig erfarenhet, främja inkluderande dialog och skapa utrymme för kontemplativa insikter och kollektiv handling för planeten."
  };

  // English translations as fallback
  const introEn = {
    title: "Religious & Spiritual Dialogue Framework",
    overview: "Overview",
    paragraph1: "The Religious & Spiritual Dialogue Framework creates structured pathways for integrating religious, spiritual, and non-theistic ethical perspectives into global governance. It establishes ethical, inclusive dialogue channels for spiritual wisdom to contribute to addressing global challenges.",
    paragraph2: "This framework reimagines global governance by acknowledging the spiritual dimensions of human experience, fostering inclusive dialogue, and creating space for contemplative insights and collective action for our planet."
  };

  // Get section titles in current language
  function getSectionTitle(section) {
    const titles = {
      en: {
        'youth-and-broad-audiences-guide': "Youth & Broad Audiences Guide",
        'executive-brief': "Executive Brief",
        'policy-guide': "Policy Guide",
        'adaptive-facilitation-tools': "Adaptive Facilitation Tools",
        'digital-feedback-dashboard': "Digital Feedback Dashboard",
        'index': "Overview",
        '01-introduction': "Introduction",
        '02-core-principles': "Core Principles",
        '03-objectives': "Objectives",
        '04-governance-structure': "Governance Structure",
        '05-implementation-mechanisms': "Implementation Mechanisms",
        '06-key-activities': "Key Activities",
        '07-funding-and-resources': "Funding & Resources",
        '08-challenges-and-mitigation-strategies': "Challenges & Mitigation",
        '09-timeline': "Timeline",
        '10-conclusion': "Conclusion",
        'appendix-a': "Appendix A: Selection Criteria",
        'appendix-b': "Appendix B: Glossary of Terms",
        'appendix-c': "Appendix C: Case Studies",
        'appendix-d': "Appendix D: Expansion Resources",
        'appendix-e': "Appendix E: Sunset Clause",
        'appendix-f': "Appendix F: Nominating Networks",
        'appendix-g': "Appendix G: AI Ethics Guidelines",
        'appendix-h': "Appendix H: Reparations Protocol"
      },
      sv: {
        'youth-and-broad-audiences-guide': "Guide för Ungdomar & Bred Publik",
        'executive-brief': "Sammanfattning för Beslutsfattare",
        'policy-guide': "Policy Guide",
        'adaptive-facilitation-tools': "Adaptiva Faciliteringsverktyg",
        'digital-feedback-dashboard': "Digital Feedback Dashboard",
        'index': "Översikt",
        '01-introduction': "Introduktion",
        '02-core-principles': "Kärnprinciper",
        '03-objectives': "Mål",
        '04-governance-structure': "Styrningsstruktur",
        '05-implementation-mechanisms': "Implementeringsmekanismer",
        '06-key-activities': "Nyckelaktiviteter",
        '07-funding-and-resources': "Finansiering & Resurser",
        '08-challenges-and-mitigation-strategies': "Utmaningar & Lösningar",
        '09-timeline': "Tidslinje",
        '10-conclusion': "Slutsats",
        'appendix-a': "Bilaga A: Urvalskriterier",
        'appendix-b': "Bilaga B: Ordlista",
        'appendix-c': "Bilaga C: Fallstudier",
        'appendix-d': "Bilaga D: Expansionsresurser",
        'appendix-e': "Bilaga E: Solnedgångsklausul",
        'appendix-f': "Bilaga F: Nominerande Nätverk",
        'appendix-g': "Bilaga G: AI-etikriktlinjer",
        'appendix-h': "Bilaga H: Reparationsprotokoll"
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
    const pdfUrl = `${base}/assets/pdf/spiritual-dialogue-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `spiritual-dialogue-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the guide selector
  let selectedGuide = 'youth-and-broad-audiences-guide';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  const guideInfo = {
    en: [
      {
        id: 'executive-brief',
        title: 'Executive Brief',
        description: 'Concise overview for decision-makers highlighting strategic impact',
        icon: '📊'
      },
      {
        id: 'policy-guide',
        title: 'Policy Guide',
        description: 'Framework overview for policymakers and governance institutions',
        icon: '⚖️'
      },
      {
        id: 'youth-and-broad-audiences-guide',
        title: 'Youth & Broad Audiences',
        description: 'Visual, accessible guide for younger participants and general audiences',
        icon: '🌿'
      }
    ],
    sv: [
      {
        id: 'executive-brief',
        title: 'Sammanfattning för Beslutsfattare',
        description: 'Koncis översikt för beslutsfattare med strategisk påverkan',
        icon: '📊'
      },
      {
        id: 'policy-guide',
        title: 'Policy Guide',
        description: 'Ramverksöversikt för beslutsfattare och styrningsinstitutioner',
        icon: '⚖️'
      },
      {
        id: 'youth-and-broad-audiences-guide',
        title: 'Ungdom & Bred Publik',
        description: 'Visuell, tillgänglig guide för yngre deltagare och allmän publik',
        icon: '🌿'
      }
    ]
  };
  
  $: guides = guideInfo[currentLocale] || guideInfo.en;
  
  // Check if the active section is any of the guides
  $: isGuideActive = activeSection === 'executive-brief' || 
                     activeSection === 'policy-guide' || 
                     activeSection === 'youth-and-broad-audiences-guide';

  // Check if the active section is any of the implementation tools
  $: isToolActive = activeSection === 'adaptive-facilitation-tools' || 
                    activeSection === 'digital-feedback-dashboard';
</script>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    <!-- Quick Access Card for Guides -->
    {#if !isPrintMode && !isGuideActive && !isToolActive}
      <div class="guide-card">
        <div class="card-content">
          <div class="card-icon">📘</div>
          <div class="card-text">
            <h3>New to the Spiritual Dialogue Framework?</h3>
            <p>Start with one of our guides that explain the principles for different audiences.</p>
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
            <!-- Guides into a dropdown in the navbar -->
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
            
            <!-- Implementation Tools dropdown -->
            <li class="dropdown-li" class:active={isToolActive}>
              <button class="dropdown-toggle">
                Implementation Tools <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" on:click={() => setActiveSection('adaptive-facilitation-tools')}>
                  <span class="guide-icon">🛠️</span>
                  <span class="guide-title">Adaptive Facilitation Tools</span>
                </button>
                <button class="dropdown-item" on:click={() => setActiveSection('digital-feedback-dashboard')}>
                  <span class="guide-icon">📊</span>
                  <span class="guide-title">Digital Feedback Dashboard</span>
                </button>
              </div>
            </li>
            
            <!-- Main sections -->
            {#each ['index', '01-introduction', '02-core-principles', '03-objectives', '04-governance-structure', '05-implementation-mechanisms', 
                    '06-key-activities', '07-funding-and-resources', '08-challenges-and-mitigation-strategies', '09-timeline', '10-conclusion'] as section}
              <li class:active={activeSection === section}>
                <button on:click={() => setActiveSection(section)}>
                  {getSectionTitle(section)}
                </button>
              </li>
            {/each}
            
            <!-- Appendices dropdown -->
            <li class="dropdown-li" class:active={activeSection.startsWith('appendix')}>
              <button class="dropdown-toggle">
                Appendices <span class="arrow-icon">▾</span>
              </button>
              <div class="dropdown-menu">
                {#each ['appendix-a', 'appendix-b', 'appendix-c', 'appendix-d', 'appendix-e', 'appendix-f', 'appendix-g', 'appendix-h'] as appendix}
                  <button class="dropdown-item" on:click={() => setActiveSection(appendix)}>
                    <span class="guide-title">{getSectionTitle(appendix)}</span>
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
          {#if isGuideActive && section === activeSection && !isPrintMode}
            <!-- Guide selector if we're in one of the guides and not in print mode -->
            <div class="guide-selector">
              <h2>Spiritual Dialogue Framework Guides</h2>
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
            
          <!-- Render the selected content -->
          {#if data.sections[section]}
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
          
          <!-- Navigation buttons at bottom of guide -->
          {#if (isGuideActive || isToolActive) && !isPrintMode && section === activeSection}
            <div class="guide-navigation">
              <button class="secondary-btn" on:click={() => downloadGuide(section)}>
                Download PDF Version <span class="download-icon">↓</span>
              </button>
              <button class="primary-btn" on:click={() => setActiveSection('index')}>
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
  /* Purple and Gold color scheme for spiritual framework */
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
    background-color: #6a3ea1; /* Purple for spiritual framework */
    color: white;
    border-color: #6a3ea1;
  }
  
  .section-nav button:hover {
    background-color: #f8f5ff;
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
    border-right: 1px solid #6a3ea1; /* Purple border */
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
    color: #6a3ea1; /* Purple for spiritual framework */
    border-left-color: #6a3ea1;
  }
  
  .sidebar a.active {
    color: #6a3ea1; /* Purple for spiritual framework */
    border-left-color: #6a3ea1;
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
    color: #6a3ea1; /* Purple for spiritual framework */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #6a3ea1; /* Purple for spiritual framework */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #6a3ea1; /* Purple for spiritual framework */
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #6a3ea1; /* Purple for spiritual framework */
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f8f5ff; /* Light purple background */
    border-left: 4px solid #9f7aea; /* Medium purple border */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: #6a3ea1; /* Purple for spiritual framework */
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
    color: #6a3ea1; /* Purple for spiritual framework */
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #553086; /* Darker purple on hover */
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

  /* Apply stars to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: #9f7aea; /* Medium purple for list bullets */
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
    color: #9f7aea; /* Medium purple for numbers */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧"; /* Smaller star for nested items */
    color: #b794f4; /* Lighter purple for nested bullets */
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
    background-color: #6a3ea1; /* Purple background for headers */
    color: #ffffff; /* White text */
  }

  .content :global(th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff; /* White text for headers */
    border: none;
    border-bottom: 2px solid #6a3ea1;
  }

  .content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  .content :global(tr:nth-child(odd)) {
    background-color: #f8f5ff; /* Light purple background */
  }

  .content :global(tr:nth-child(even)) {
    background-color: #ffffff;
  }

  .content :global(tr:hover) {
    background-color: #f0e6ff; /* Lighter purple background on hover */
  }

  .content :global(tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  .content :global(table caption),
  .content :global(table tfoot) {
    background-color: #f0e6ff; /* Light purple */
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #553086; /* Darker purple */
    text-align: left;
    border-top: 1px solid #6a3ea1;
  }

  /* Highlight important cells */
  .content :global(td.highlight) {
    color: #6a3ea1; /* Purple text */
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
  
  /* New styles for Guide card */
  .guide-card {
    background: linear-gradient(135deg, #f8f5ff 0%, #f0e6ff 100%); /* Purple gradient */
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1); /* Purple shadow */
    border: 1px solid rgba(106, 62, 161, 0.2); /* Purple border */
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .guide-card .dropdown-menu {
    position: absolute;
    top: 100%; /* Position from bottom of button */
    left: 0;
    z-index: 1001; /* Higher than surrounding elements */
    min-width: 300px;
    max-width: 350px; /* Limit width */
    overflow: visible; /* Ensure visible outside container */
    border: 1px solid rgba(106, 62, 161, 0.3); /* Purple-tinted border */
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
    color: #6a3ea1; /* Purple for spiritual framework */
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: #6a3ea1; /* Purple for spiritual framework */
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
    background-color: #6a3ea1; /* Purple for spiritual framework */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
.primary-btn:hover {
    background-color: #553086; /* Darker purple */
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: #6a3ea1; /* Purple for spiritual framework */
    border: 1px solid #6a3ea1;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: #f8f5ff; /* Light purple */
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
    color: #6a3ea1; /* Purple for spiritual framework */
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: #553086; /* Darker purple on hover */
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: #553086; /* Darker purple when clicked */
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
    color: #9f7aea; /* Medium purple for internal section links */
    text-decoration: none;
    border-bottom: 1px dotted #9f7aea;
  }

  .content :global(a[href^="#"]):hover {
    color: #6a3ea1;
    border-bottom-color: #6a3ea1;
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: #6a3ea1;
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: #6a3ea1; /* Purple for spiritual framework */
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

  /* Fix for dropdown items when guide is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important; /* Force white background */
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important; /* Force dark text */
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: #f8f5ff !important; /* Light purple on hover */
    color: #6a3ea1 !important; /* Purple text on hover */
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
    background-color: #f8f5ff !important; /* Light purple on hover */
    color: #6a3ea1 !important; /* Purple text on hover */
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
    background-color: #f8f5ff; /* Light purple */
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
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1); /* Purple shadow */
    transform: translateY(-2px);
    border-color: #6a3ea1;
  }
  
  .guide-card.active {
    border-color: #6a3ea1;
    background-color: #f8f5ff; /* Light purple */
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #6a3ea1; /* Purple for spiritual framework */
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
  
  /* Styles for gold accents */
  .content :global(strong) {
    color: #b78846; /* Gold color for emphasis */
    font-weight: 600;
  }
  
  .content :global(hr) {
    border: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(183, 136, 70, 0.1), rgba(183, 136, 70, 0.5), rgba(183, 136, 70, 0.1)); /* Gold gradient for horizontal rules */
    margin: 2rem 0;
  }
  
  .content :global(code) {
    background-color: #f8f5ff; /* Light purple background for code */
    color: #6a3ea1; /* Purple text for code */
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: monospace;
    border: 1px solid rgba(106, 62, 161, 0.2); /* Light purple border */
  }
  
  .content :global(pre) {
    background-color: #1e1e1e; /* Dark background for code blocks */
    border-radius: 0.375rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    border-left: 4px solid #9f7aea; /* Medium purple border */
  }
  
  .content :global(pre code) {
    background-color: transparent;
    color: #f8f5ff; /* Light purple/white text for code blocks */
    padding: 0;
    border: none;
    font-size: 0.875rem;
    display: block;
    line-height: 1.6;
  }
  
  /* Special styles for spiritual quotes */
  .content :global(blockquote.spiritual-quote) {
    background: linear-gradient(135deg, rgba(106, 62, 161, 0.05) 0%, rgba(183, 136, 70, 0.05) 100%); /* Purple to gold gradient */
    border-left: 4px solid #b78846; /* Gold border */
    font-style: italic;
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 0.5rem;
    position: relative;
  }
  
  .content :global(blockquote.spiritual-quote::before) {
    content: '"';
    font-size: 4rem;
    position: absolute;
    left: 0.5rem;
    top: -1rem;
    color: rgba(183, 136, 70, 0.2); /* Faded gold quote mark */
    font-family: Georgia, serif;
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
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
    }
  }
 </style>
