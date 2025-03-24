<!-- src/routes/framework/docs/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  
  export let data;
  
  const navItems = [
    { titleKey: 'framework.docs.nav.overview', path: '/framework/docs' },
    { titleKey: 'framework.docs.nav.principles', path: '/framework/docs/principles' },
    { titleKey: 'framework.docs.nav.implementation', path: '/framework/docs/implementation' },
    { titleKey: 'framework.docs.nav.casestudies', path: '/framework/docs/case-studies' },
    { titleKey: 'framework.docs.nav.resources', path: '/framework/docs/resources' }
  ];
  
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
    <!-- Visual Diagram at the top -->
    <div class="diagram-container">
      <h3 class="diagram-title">{$t('framework.principles.interconnection.title')}</h3>
      <p class="diagram-description">{$t('framework.principles.interconnection.description')}</p>
      
      <!-- Show diagram based on language -->
      {#if $locale === 'sv'}
        <img src="{base}/framework/principles-interconnection-sv.svg" alt="Samband mellan Kärnprinciper" class="principles-diagram" />
      {:else}
        <img src="{base}/framework/principles-interconnection-en.svg" alt="Core Principles Interconnection" class="principles-diagram" />
      {/if}
    </div>


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
