<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  // Mobile menu state
  let isMenuOpen = false;
  let isDropdownOpen = false;
  
  const toggleMenu = () => (isMenuOpen = !isMenuOpen);

  // Modify this function to properly close the dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    isDropdownOpen = !isDropdownOpen;
  };
  
  // Add a function to close the dropdown when clicking outside
  const closeDropdown = () => {
    if (isDropdownOpen) isDropdownOpen = false;
  };
  
  // Track if we're on mobile for different behaviors
  let isMobile = false;
  
  onMount(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Add click listener to close dropdown when clicking elsewhere
    if (typeof document !== 'undefined') {
      document.addEventListener('click', closeDropdown);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', closeDropdown);
      }
    };
  });

  // Function to check if a path is active
  function isActive(path) {
    return $page.url.pathname === base + path;
  }
</script>

<style>
  header {
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); /* Cosmic blue gradient */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    color: #ffffff; /* White for contrast on cosmic blue */
  }
  
  .menu-button {
    background: none;
    border: none;
    color: #DAA520; /* Gold for menu button */
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
    color: #ffffff; /* White for nav links */
    text-decoration: none;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .nav-link:hover {
    color: #DAA520; /* Gold on hover */
    border-bottom-color: #DAA520; /* Gold border on hover */
  }
  
  .nav-link.active {
    color: #DAA520; /* Gold for active link */
    border-bottom-color: #DAA520; /* Gold border for active */
    font-weight: 600;
  }
  
  .language-select {
    padding: 0.375rem 0.75rem;
    border: 1px solid #2D5F2D; /* Earthy green border */
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #2B4B8C; /* Cosmic blue text */
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
    background-color: #ffffff;
    border: 1px solid #2D5F2D; /* Earthy green border */
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
    height: 0.5rem; /* Invisible hover bridge */
    background-color: transparent;
  }

  .dropdown-menu a {
    display: block;
    padding: 0.5rem 1rem;
    color: #2B4B8C; /* Cosmic blue text */
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }

  .dropdown-menu a:hover {
    background-color: #f7f1e3; /* Light gold background on hover */
    color: #DAA520; /* Gold text on hover */
    border-left-color: #DAA520; /* Gold border on hover */
  }

  .dropdown-menu a.active {
    color: #DAA520; /* Gold for active */
    border-left-color: #DAA520; /* Gold border for active */
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
      border-left: 3px solid #2D5F2D; /* Earthy green border */
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 1rem;
      display: none;
    }
    
    .dropdown.open .dropdown-menu {
      display: block;
    }
    
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
              data-sveltekit-preload-data="hover"
            >
              {$t('common.header.home')}
            </a>
          </li>
          <li class="nav-item dropdown" class:open={isDropdownOpen}>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a 
                href="{base}/framework"
                class={`nav-link ${$page.url.pathname.startsWith(base + '/framework') ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
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

            <div class="dropdown-menu" on:click|stopPropagation={() => {}}>
              <a href="{base}/framework" class={isActive('/framework') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkOverview')}
              </a>
              <a href="{base}/framework/docs" class={isActive('/framework/docs') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkDocs')}
              </a>
              <a href="{base}/framework/docs/principles" class={isActive('/framework/docs/principles') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkPrinciples')}
              </a>
              <a href="{base}/framework/global-citizenship" class={isActive('/framework/global-citizenship') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkGlobalCitizenship')}
              </a>
              <a href="{base}/framework/docs/implementation" class={isActive('/framework/docs/implementation') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkImplementation')}
              </a>
              <a href="{base}/framework/hubs" class={isActive('/framework/hubs') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkHubs')}
              </a>
              <a href="{base}/framework/tools" class={isActive('/framework/tools') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkTools')}
              </a>
              <a href="{base}/framework/visuals" class={isActive('/framework/visuals') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkVisuals')}
              </a>
              <a href="{base}/framework/docs/case-studies" class={isActive('/framework/docs/case-studies') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkCaseStudies')}
              </a>
              <a href="{base}/framework/ai-futures" class={isActive('/framework/ai-futures') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkAIFutures')}
              </a>
              <a href="{base}/framework/docs/resources" class={isActive('/framework/docs/resources') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkResources')}
              </a>
              <a href="{base}/framework/docs/glossary" class={isActive('/framework/docs/glossary') ? 'active' : ''} data-sveltekit-preload-data="hover">
                {$t('common.header.frameworkGlossary')}
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/downloads"
              class={`nav-link ${$page.url.pathname === base + '/downloads' ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {$t('common.header.downloads')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/about"
              class={`nav-link ${$page.url.pathname === base + '/about' ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {$t('common.header.about')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/contact"
              class={`nav-link ${$page.url.pathname === base + '/contact' ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
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
