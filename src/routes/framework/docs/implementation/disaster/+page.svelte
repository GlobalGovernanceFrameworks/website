<!-- src/routes/framework/docs/implementation/disaster/+page.svelte -->
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

  // Handle print mode only on client side
  $: isPrintMode = browser && $page.url.searchParams.get('print') === 'true';
 
  // Function to set active section
  function setActiveSection(section) {
    activeSection = section;
  }

  // Make this function available globally for the PDF generator
  if (browser) {
    window.showAllSectionsForPrint = () => {
      sectionsToShow = Object.keys(data.sections || {});
    };
  }

  // This needs to be a reactive statement - use $: to make it update when activeSection changes
  $: sectionsToShow = isPrintMode 
    ? Object.keys(data.sections || {}) 
    : [activeSection];

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
            <li class:active={activeSection === 'index'}>
              <button on:click={() => setActiveSection('index')}>
                Introduction
              </button>
            </li>
            <li class:active={activeSection === 'principles'}>
              <button on:click={() => setActiveSection('principles')}>
                Guiding Principles
              </button>
            </li>
            <li class:active={activeSection === 'components'}>
              <button on:click={() => setActiveSection('components')}>
                Framework Components
              </button>
            </li>
            <li class:active={activeSection === 'approaches'}>
              <button on:click={() => setActiveSection('approaches')}>
                Implementation Approaches
              </button>
            </li>
            <li class:active={activeSection === 'engagement'}>
              <button on:click={() => setActiveSection('engagement')}>
                Collaborative Engagement
              </button>
            </li>
            <li class:active={activeSection === 'barriers'}>
              <button on:click={() => setActiveSection('barriers')}>
                Implementation Barriers
              </button>
            </li>
            <li class:active={activeSection === 'resources'}>
              <button on:click={() => setActiveSection('resources')}>
                Resource Requirements
              </button>
            </li>
            <li class:active={activeSection === 'monitoring'}>
              <button on:click={() => setActiveSection('monitoring')}>
                Monitoring, Evaluation, and Iteration
              </button>
            </li>
            <li class:active={activeSection === 'governance'}>
              <button on:click={() => setActiveSection('governance')}>
                Innovative Governance Models
              </button>
            </li>
            <li class:active={activeSection === 'scalability'}>
              <button on:click={() => setActiveSection('scalability')}>
                Scalability and Contextual Adaptation
              </button>
            </li>
            <li class:active={activeSection === 'conclusion'}>
              <button on:click={() => setActiveSection('conclusion')}>
                Conclusion
              </button>
            </li>
            <li class:active={activeSection === 'annexes'}>
              <button on:click={() => setActiveSection('annexes')}>
                Annexes
              </button>
            </li>
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
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
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
