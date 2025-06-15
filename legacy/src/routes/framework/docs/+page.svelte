<!-- src/routes/frameworks/docs/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  
  export let data;
  
  // Navigation items with translation keys instead of hardcoded text
  // This array doesn't need to be reactive since it just contains keys
  const navItems = [
    { titleKey: 'framework.docs.nav.overview', path: '/frameworks/docs' },
    { titleKey: 'framework.docs.nav.principles', path: '/frameworks/docs/principles' },
    { titleKey: 'framework.docs.nav.implementation', path: '/frameworks/docs/implementation' },
    { titleKey: 'framework.docs.nav.casestudies', path: '/frameworks/docs/case-studies' },
    { titleKey: 'framework.docs.nav.resources', path: '/frameworks/docs/resources' }
  ];
  
  // Whenever locale changes, invalidate the current page data
  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  <div class="sidebar">
    <nav>
      <ul>
        {#each navItems as item}
          <li>
            <a 
              href="{item.path}" 
              class:active={$page.url.pathname === item.path}
            >
              {$t(item.titleKey)}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  
  <div class="content">
    <svelte:component this={data.component} />
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
    border-right: 1px solid #e5e7eb;
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
    color: #2563eb;
    border-left-color: #2563eb;
  }
  
  .sidebar a.active {
    color: #2563eb;
    border-left-color: #2563eb;
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
    color: #111827;
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #374151;
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
</style>
