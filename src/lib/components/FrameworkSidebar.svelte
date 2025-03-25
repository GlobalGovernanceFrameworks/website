<!-- src/lib/components/FrameworkSidebar.svelte -->
<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { frameworkNav } from '$lib/stores/frameworkNav';
  import { expandedSections } from '$lib/stores/expandedSections';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // Function to check if a path is active
  function isActive(path) {
    return $page.url.pathname === base + path;
  }

  // Function to check if a path or any of its children are active
  function isActiveOrHasActiveChild(item) {
    if (isActive(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => isActive(subItem.path));
    }
    return false;
  }

  // Initialize expanded sections - expand active section by default
  onMount(() => {
    $frameworkNav.forEach(item => {
      if (item.subItems) {
        // Initialize in store if not already present
        expandedSections.update(current => {
          if (!(item.titleKey in current)) {
            current[item.titleKey] = isActiveOrHasActiveChild(item) || item.path.includes('/implementation');
          }
          return current;
        });
      }
    });
  });

  // Toggle a section's expanded state
  function toggleSection(titleKey) {
    expandedSections.update(current => ({
      ...current,
      [titleKey]: !current[titleKey]
    }));
  }
</script>

<div class="sidebar">
  <nav>
    <ul>
      {#each $frameworkNav as item}
        <li class="nav-item {isActiveOrHasActiveChild(item) ? 'active-section' : ''}">
          {#if item.subItems && item.subItems.length > 0}
            <div class="nav-header">
              <a 
                href="{base}{item.path}" 
                class:active={isActive(item.path)}
              >
                {$t(item.titleKey)}
              </a>
              <button 
                class="toggle-btn" 
                on:click|preventDefault={() => toggleSection(item.titleKey)}
                aria-expanded={$expandedSections[item.titleKey] ? 'true' : 'false'}
              >
                {#if $expandedSections[item.titleKey]}
                  <span>▼</span>
                {:else}
                  <span>▶</span>
                {/if}
              </button>
            </div>
            
            {#if $expandedSections[item.titleKey]}
              <ul class="subnav">
                {#each item.subItems as subItem}
                  <li class="subnav-item">
                    {#if subItem.comingSoon || subItem.planned}
                       <span class="coming-soon">
                        {$t(subItem.titleKey)} <em>({subItem.planned ? $t('framework.labels.planned') : $t('framework.labels.comingSoon')})</em>
                      </span>
                    {:else}
                      <a 
                        href="{base}{subItem.path}" 
                        class:active={isActive(subItem.path)}
                      >
                        {$t(subItem.titleKey)}
                      </a>
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          {:else}
            <a 
              href="{base}{item.path}" 
              class:active={isActive(item.path)}
            >
              {$t(item.titleKey)}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  .sidebar {
    border-right: 1px solid #2D5F2D; /* Earthy green border */
    padding-right: 1.5rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin-bottom: 0.75rem;
  }
  
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toggle-btn:hover {
    color: #DAA520;
  }
  
  .sidebar a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s;
    flex-grow: 1;
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
  
  .coming-soon {
    display: block;
    padding: 0.5rem 0;
    color: #9ca3af; /* Gray color for disabled items */
    padding-left: 1rem;
    font-style: italic;
  }
  
  .subnav {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-left: 1px dashed #2D5F2D;
  }
  
  .subnav-item {
    margin-bottom: 0.5rem;
  }
  
  .subnav a {
    font-size: 0.95rem;
    padding: 0.3rem 0;
  }
  
  .active-section {
    /* Style for the parent item when it or its child is active */
  }
</style>
