<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  // Mobile menu state
  let isMenuOpen = false;
  const toggleMenu = () => isMenuOpen = !isMenuOpen;

  let isDropdownOpen = false;
  const toggleDropdown = () => isDropdownOpen = !isDropdownOpen;
</script>

<style>
  /* Fallback styles in case Tailwind isn't loading properly */
  header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
  }
  
  @media (min-width: 768px) {
    .header-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .logo-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .logo-section {
      width: auto;
    }
  }
  
  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .logo-img {
    height: 40px;
    width: 40px;
    margin-right: 0.75rem;
  }
  
  .site-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e40af; /* blue-800 */
  }
  
  .menu-button {
    background: none;
    border: none;
    color: #4b5563; /* gray-600 */
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .menu-button {
      display: none;
    }
  }
  
  .nav-container {
    display: none;
    width: 100%;
    margin-top: 1rem;
  }
  
  .nav-container.open {
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .nav-container {
      display: flex !important;
      flex-direction: row;
      align-items: center;
      width: auto;
      margin-top: 0;
    }
  }
  
  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .nav-list {
      flex-direction: row;
      margin-right: 2rem;
    }
  }
  
  .nav-item {
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    .nav-item {
      margin-bottom: 0;
      margin-right: 1.5rem;
    }
  }
  
  .nav-link {
    color: #4b5563; /* gray-600 */
    text-decoration: none;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .nav-link:hover {
    color: #2563eb; /* blue-600 */
    border-bottom-color: #2563eb; /* blue-600 */
  }
  
  .nav-link.active {
    color: #2563eb; /* blue-600 */
    border-bottom-color: #2563eb; /* blue-600 */
    font-weight: 600;
  }
  
  .language-select {
    padding: 0.375rem 0.75rem;
    border: 1px solid #d1d5db; /* gray-300 */
    border-radius: 0.375rem;
    background-color: white;
    color: #374151; /* gray-700 */
    cursor: pointer;
  }

  .dropdown {
    position: relative;
  }

  .dropdown-icon {
    display: inline-block;
    margin-left: 0.25rem;
    vertical-align: middle;
    transition: transform 0.2s;
  }

  .dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 20;
    margin-top: 0.25rem;
    padding-top: 0.25rem;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0.5rem; /* This creates an invisible hover bridge */
    background-color: transparent;
  }

  .dropdown-menu a {
    display: block;
    padding: 0.5rem 1rem;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }

  .dropdown-menu a:hover {
    background-color: #f3f4f6;
    color: #2563eb;
    border-left-color: #2563eb;
  }

  .dropdown-menu a.active {
    color: #2563eb;
    border-left-color: #2563eb;
    font-weight: 600;
  }

  .hidden {
    display: none;
  }
  
  @media (min-width: 768px) {
    .language-select {
      margin-left: 1rem;
    }

    .md\:hidden {
      display: none;
    }
    
    .md\:inline-block {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    .dropdown-menu {
      position: static;
      box-shadow: none;
      border: none;
      border-left: 3px solid #e5e7eb;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 1rem;
      display: none;
    }
    
    .dropdown.open .dropdown-menu {
      display: block;
    }
    
    /* Add a toggle for mobile */
    .dropdown .dropdown-toggle {
      display: inline-block;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
</style>

<header>
  <div class="container">
    <div class="header-content">
      <div class="logo-section">
        <a href="{base}/" class="logo-link">
          <img src="{base}/logo.svg" alt="Global Governance Framework" class="logo-img" />
          <span class="site-title">Global Governance Framework</span>
        </a>
        
        <button 
          type="button" 
          class="menu-button" 
          on:click={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {#if isMenuOpen}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          {/if}
        </button>
      </div>
      
      <nav class={`nav-container ${isMenuOpen ? 'open' : ''}`}>
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              href="{base}/"
              class={`nav-link ${$page.url.pathname === base + '/' || $page.url.pathname === base ? 'active' : ''}`}
            >
              {$t('common.header.home')}
            </a>
          </li>
          <li class="nav-item dropdown" class:open={isDropdownOpen}>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a 
                href="{base}/framework"
                class={`nav-link ${$page.url.pathname.startsWith(base + '/framework') ? 'active' : ''}`}
              >
                {$t('common.header.framework')}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleDropdown}
                aria-label={isDropdownOpen ? 'Close framework menu' : 'Open framework menu'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>
            <div class="dropdown-menu">
              <a href="{base}/framework" class={$page.url.pathname === base + '/framework' ? 'active' : ''}>
                {$t('common.header.frameworkOverview')}
              </a>
              <a href="{base}/framework/docs" class={$page.url.pathname === base + '/framework/docs' ? 'active' : ''}>
                {$t('common.header.frameworkDocs')}
              </a>
              <a href="{base}/framework/docs/principles" class={$page.url.pathname === base + '/framework/docs/principles' ? 'active' : ''}>
                {$t('common.header.frameworkPrinciples')}
              </a>
              <a href="{base}/framework/docs/implementation" class={$page.url.pathname === base + '/framework/docs/implementation' ? 'active' : ''}>
                {$t('common.header.frameworkImplementation')}
              </a>
              <a href="{base}/framework/docs/case-studies" class={$page.url.pathname === base + '/framework/docs/case-studies' ? 'active' : ''}>
                {$t('common.header.frameworkCaseStudies')}
              </a>
              <a href="{base}/framework/docs/resources" class={$page.url.pathname === base + '/framework/docs/resources' ? 'active' : ''}>
                {$t('common.header.frameworkResources')}
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/about"
              class={`nav-link ${$page.url.pathname === base + '/about' ? 'active' : ''}`}
            >
              {$t('common.header.about')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/contact"
              class={`nav-link ${$page.url.pathname === base + '/contact' ? 'active' : ''}`}
            >
              {$t('common.header.contact')}
            </a>
          </li>
        </ul>
        
        <div>
          <select 
            aria-label={$t('common.language.select')}
            value={$locale} 
            on:change={handleLocaleChange}
            class="language-select"
          >
            {#each $locales as loc}
              <option value={loc}>{getLanguageName(loc)}</option>
            {/each}
          </select>
        </div>
      </nav>
    </div>
  </div>
</header>
