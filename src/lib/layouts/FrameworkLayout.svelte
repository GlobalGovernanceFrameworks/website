<!-- src/lib/layouts/FrameworkLayout.svelte -->
<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  
  // Navigation items for the sidebar
  const navItems = [
    { title: 'Overview', path: '/docs/frameworks' },
    { title: 'Core Principles', path: '/docs/frameworks/principles' },
    { title: 'Implementation', path: '/docs/frameworks/implementation' },
    { title: 'Case Studies', path: '/docs/frameworks/case-studies' },
    { title: 'Resources', path: '/docs/frameworks/resources' }
  ];
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
              {item.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  
  <div class="content">
    <slot />
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
    min-width: 0; /* Ensures content doesn't overflow */
  }
  
  /* Styles for the markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 0;
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
  
  .content :global(a) {
    color: #2563eb;
    text-decoration: underline;
  }
  
  .content :global(blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: #6b7280;
  }
  
  .content :global(code) {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .content :global(pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .content :global(pre code) {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
  
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  
  .content :global(th), .content :global(td) {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }
  
  .content :global(th) {
    background-color: #f9fafb;
    font-weight: 600;
  }
</style>
