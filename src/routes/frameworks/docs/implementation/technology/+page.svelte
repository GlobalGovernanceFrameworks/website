<!-- src/routes/frameworks/docs/implementation/technology/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
     
  export let data;

  // Keep track of which section is active (for sub-navigation)
  let activeSection = 'index';

  // Function to set active section
  function setActiveSection(section) {
    activeSection = section;
  }

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

  // Translation map for section titles
  const sectionTitles = {
    en: {
      'index': 'Introduction',
      'context': 'Context and Scope',
      'governance-model': 'Governance Model Components',
      'implementation': 'Implementation Roadmap',
      'tools': 'Tools and Technologies',
      'operational': 'Operational Guidelines',
      'emerging': 'Emerging Technology Anticipation',
      'evaluation': 'Evaluation and Metrics',
      'case-studies': 'Case Studies and Examples',
      'appendices': 'Appendices'
    },
    sv: {
      'index': 'Introduktion',
      'context': 'Sammanhang och Omfattning',
      'governance-model': 'Styrningsmodellkomponenter',
      'implementation': 'Implementeringsplan',
      'tools': 'Verktyg och Teknologier',
      'operational': 'Operativa Riktlinjer',
      'emerging': 'Förutseende av Ny Teknik',
      'evaluation': 'Utvärdering och Mätmetoder',
      'case-studies': 'Fallstudier och Exempel',
      'appendices': 'Bilagor'
    }
  };

  // Function to get section title in current language
  function getSectionTitle(section) {
    return (sectionTitles[currentLocale] || sectionTitles.en)[section] || section;
  }

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  {#if !isPrintMode}
    <FrameworkSidebar />
  {/if}

  <div class="content">
    {#if data.isModular}
      <!-- Sub-navigation for framework sections -->
      {#if !isPrintMode} 
        <div class="section-nav">
          <ul>
            {#each Object.keys(data.sections) as section}
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
          {#if data.sections[section]}
            <svelte:component this={data.sections[section].default} />
          {:else}
            <p>Section {section} not found</p>
          {/if}
        </div>
      {/each}
    {:else}
      <!-- Legacy single file display -->
      <svelte:component this={data.component} />
    {/if}
  </div>
</div>

<style>
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
    background-color: #2B4B8C;
    color: white;
    border-color: #2B4B8C;
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
    border-right: 1px solid #2D5F2D; /* Earthy green border */
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
    color: #DAA520; /* Gold on hover */
    border-left-color: #DAA520;
  }
  
  .sidebar a.active {
    color: #DAA520; /* Gold for active */
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  .content {
    min-width: 0;
  }
  
  /* Include all your existing styles for markdown content here... */
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2B4B8C; /* Cosmic blue for h1 */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #2B4B8C; /* Cosmic blue for h2 */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C; /* Cosmic blue for h3 */
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C; /* Cosmic blue color, matching your theme */
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f3f6f9;
    border-left: 4px solid #6B5CA5; /* Cosmic purple color */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: #2B4B8C; /* Cosmic blue for the header */
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
    color: #DAA520; /* Gold color for links */
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #B8860B; /* Darker gold on hover */
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
    color: #DAA520;
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
    color: #2B4B8C; /* Cosmic blue for numbers */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧"; /* Smaller star for nested items */
    color: #6B5CA5; /* Cosmic purple for nested bullets */
  }

  /* Keep all your other styles */
</style>
