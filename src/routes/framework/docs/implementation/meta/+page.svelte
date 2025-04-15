<!-- src/routes/framework/docs/implementation/meta/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import ConstellationMap from '$lib/components/ConstellationMap.svelte';
     
  export let data;

  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Swedish translations for the introduction section
  const introSv = {
    title: "Integrerad Meta-Styrning Ramverk Implementering",
    overview: "Översikt",
    paragraph1: "Integrerad Meta-Styrning är konsten och arkitekturen att designa, samordna och utveckla styrningssystem över domäner, nivåer, kulturer och tidsskalor. När globala utmaningar blir alltmer sammankopplade och komplexa, erbjuder meta-styrning den nödvändiga strukturen för att harmonisera olika insatser till en sammanhängande helhet—utan att överskrida autonomi, mångfald eller subsidiaritet.",
    paragraph2: "Detta ramverk beskriver principer, strukturer och mekanismer för hur olika styrningsdomäner interagerar, överlappar och utvecklas i linje med gemensamma mål. Det är tänkt som en potentiell \"konstitution för planetär samordning\"—ett levande, adaptivt system som utvecklas genom kollektivt lärande."
  };

  // English translations as fallback
  const introEn = {
    title: "Integrated Meta-Governance Framework Implementation",
    overview: "Overview",
    paragraph1: "Integrated Meta-Governance is the art and architecture of designing, aligning, and evolving governance systems across domains, levels, cultures, and timescales. As global challenges become increasingly interconnected and complex, meta-governance offers the scaffolding necessary to harmonize diverse efforts into a coherent whole—without overriding autonomy, diversity, or subsidiarity.",
    paragraph2: "This framework outlines principles, structures, and mechanisms to guide how various governance domains interact, overlap, and evolve in alignment with shared goals. It is envisioned as a potential \"constitution for planetary coordination\"—a living, adaptive system that evolves through collective learning."
  };

  // Choose the right intro text based on the current locale
  $: intro = currentLocale === 'sv' ? introSv : introEn;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>
<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Manually add the translated introduction section -->
    <div class="overview-section">
      <h1>{intro.title}</h1>
      <h2>{intro.overview}</h2>
      <p>{intro.paragraph1}</p>
      <p>{intro.paragraph2}</p>
      
      <!-- Show notification about the map not being translated when in Swedish -->
      {#if currentLocale === 'sv'}
        <div class="translation-notice">
          {intro.mapNotice}
        </div>
      {/if}
    </div>

    <!-- Constellation Map component - not translated -->
    <ConstellationMap />

    <!-- The rest of the content - should be translated according to the locale -->
    <div class="remaining-content">
      <svelte:component this={data.component} />
    </div>
  </div>
</div>

<style>
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
  
  .map-container {
    margin: 2rem 0;
  }
  
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

  .content :global(ul li::before) {
    content: "✦"; /* Cosmic star symbol for bullets */
    position: absolute;
    left: 0;
    color: #DAA520; /* Gold color for bullet points */
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

  /* Table styles for markdown content with cosmic theme */
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
    background: linear-gradient(to right, #2B4B8C, #4B5CA5);
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid #6B5CA5;
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
    background-color: #f7f1e3; /* Light gold background on hover */
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: #e9f2e9; /* Light earthy green */
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #2D5F2D;
    text-align: left;
    border-top: 1px solid #2D5F2D;
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: #B8860B; /* Gold text */
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
</style>
