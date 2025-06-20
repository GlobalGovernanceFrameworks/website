<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  // Mobile menu state
  let isMenuOpen = false;
  let isFrameworksDropdownOpen = false;
  let isGetInvolvedDropdownOpen = false;
  
  const toggleMenu = () => (isMenuOpen = !isMenuOpen);

  const toggleFrameworksDropdown = (e) => {
    e.stopPropagation();
    isFrameworksDropdownOpen = !isFrameworksDropdownOpen;
  };

  const toggleGetInvolvedDropdown = (e) => {
    e.stopPropagation();
    isGetInvolvedDropdownOpen = !isGetInvolvedDropdownOpen;
  };
  
  const closeDropdowns = () => {
    if (isFrameworksDropdownOpen) isFrameworksDropdownOpen = false;
    if (isGetInvolvedDropdownOpen) isGetInvolvedDropdownOpen = false;
  };
  
  let isMobile = false;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.addEventListener('click', closeDropdowns);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('click', closeDropdowns);
    };
  });

  // Function to check if a path is active - only in browser
  function isActive(path) {
    if (!browser) return false;
    return $page.url.pathname === base + path;
  }
</script>

<style>
  header {
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
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
    color: #ffffff;
  }
  
  .menu-button {
    background: none;
    border: none;
    color: #DAA520;
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

  .nav-link.nav-link-highlight {
    color: #DAA520;
  }
  
  .nav-link {
    color: #ffffff;
    text-decoration: none;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .nav-link:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
  }
  
  .nav-link.active {
    color: #DAA520;
    border-bottom-color: #DAA520;
    font-weight: 600;
  }
  
  .language-select {
    padding: 0.375rem 0.75rem;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #2B4B8C;
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
    border: 1px solid #2D5F2D;
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
    height: 0.5rem;
    background-color: transparent;
  }

  .dropdown-menu a {
    display: block;
    padding: 0.5rem 1rem;
    color: #2B4B8C;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
  }

  .dropdown-menu a:hover {
    background-color: #f7f1e3;
    color: #DAA520;
    border-left-color: #DAA520;
  }

  .dropdown-menu a.active {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }

  .dropdown-menu a.highlighted {
    background-color: #f0f8ff;
    font-weight: 600;
    border-left-color: #DAA520;
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
      border-left: 3px solid #2D5F2D;
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
  
  .dropdown-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }
</style>

<header>
  <div class="container">
    <div class="header-content">
      <div class="logo-section">
        <a href="{base}/" class="logo-link">
          <img src="{base}/logo.svg" alt="Global Governance Frameworks" class="logo-img" />
          <span class="site-title">Global Governance Frameworks</span>
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
              class={`nav-link ${isActive('/') || isActive('') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.home') || 'Home') : 'Home'}
            </a>
          </li>
          
          <!-- Frameworks Dropdown (now includes Global Citizenship) -->
          <li class="nav-item dropdown" class:open={isFrameworksDropdownOpen}>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a 
                href="{base}/frameworks"
                class={`nav-link ${browser && $page.url.pathname.startsWith(base + '/frameworks') ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
              >
                {browser ? ($t('common.header.framework') || 'Frameworks') : 'Frameworks'}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleFrameworksDropdown}
                on:keydown={(e) => e.key === 'Enter' && toggleFrameworksDropdown(e)}
                aria-label={isFrameworksDropdownOpen ? 'Close frameworks menu' : 'Open frameworks menu'}
                role="button"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isFrameworksDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>

            <div class="dropdown-menu" on:click|stopPropagation={() => {}} role="menu">
              <!-- Global Citizenship - highlighted as the main framework -->
              <a 
                href="{base}/frameworks/global-citizenship" 
                class={`${isActive('/frameworks/global-citizenship') ? 'active' : ''} highlighted`} 
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.frameworkGlobalCitizenship') || 'Global Citizenship') : 'Global Citizenship'}
              </a>
              
              <a href="{base}/frameworks" class={isActive('/frameworks') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkOverview') || 'Overview') : 'Overview'}
              </a>
              <a href="{base}/frameworks/docs" class={isActive('/frameworks/docs') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkDocs') || 'Documentation') : 'Documentation'}
              </a>
              <a href="{base}/frameworks/docs/principles" class={isActive('/frameworks/docs/principles') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkPrinciples') || 'Principles') : 'Principles'}
              </a>
              <a href="{base}/frameworks/docs/implementation" class={isActive('/frameworks/docs/implementation') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkImplementation') || 'Implementation') : 'Implementation'}
              </a>
              <a href="{base}/frameworks/hubs" class={isActive('/frameworks/hubs') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkHubs') || 'Hubs') : 'Hubs'}
              </a>
              <a href="{base}/frameworks/tools" class={isActive('/frameworks/tools') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkTools') || 'Tools') : 'Tools'}
              </a>
              <a href="{base}/frameworks/visuals" class={isActive('/frameworks/visuals') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkVisuals') || 'Visuals') : 'Visuals'}
              </a>
              <a href="{base}/downloads" class={isActive('/downloads') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkDownloads') || 'Framework Downloads') : 'Downloads'}
              </a>
              <a href="{base}/frameworks/docs/case-studies" class={isActive('/frameworks/docs/case-studies') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkCaseStudies') || 'Case Studies') : 'Case Studies'}
              </a>
              <a href="{base}/frameworks/ai-futures" class={isActive('/frameworks/ai-futures') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkAIFutures') || 'AI Futures') : 'AI Futures'}
              </a>
              <a href="{base}/frameworks/docs/resources" class={isActive('/frameworks/docs/resources') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkResources') || 'Resources') : 'Resources'}
              </a>
              <a href="{base}/frameworks/docs/glossary" class={isActive('/frameworks/docs/glossary') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkGlossary') || 'Glossary') : 'Glossary'}
              </a>
            </div>
          </li>

          <li class="nav-item">
            <a 
              href="{base}/blog"
              class={`nav-link ${isActive('/blog') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.blog') || 'Blog') : 'Blog'}
            </a>
          </li>

          <!-- New Get Involved Dropdown -->
          <li class="nav-item dropdown" class:open={isGetInvolvedDropdownOpen}>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a 
                href="{base}/get-involved"
                class={`nav-link ${browser && $page.url.pathname.startsWith(base + '/get-involved') ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
              >
                {browser ? ($t('common.header.getInvolved') || 'Get Involved') : 'Get Involved'}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleGetInvolvedDropdown}
                on:keydown={(e) => e.key === 'Enter' && toggleGetInvolvedDropdown(e)}
                aria-label={isGetInvolvedDropdownOpen ? 'Close get involved menu' : 'Open get involved menu'}
                role="button"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isGetInvolvedDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>

            <div class="dropdown-menu" on:click|stopPropagation={() => {}} role="menu">
              <a href="{base}/get-involved/frameworks" class={isActive('/get-involved/frameworks') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedFrameworks') || 'Contribute to Frameworks') : 'Contribute to Frameworks'}
              </a>
              <a href="{base}/get-involved/translations" class={isActive('/get-involved/translations') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedTranslations') || 'Contribute Translations') : 'Contribute Translations'}
              </a>
              <a href="{base}/get-involved/website" class={isActive('/get-involved/website') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedWebsite') || 'Contribute to Website') : 'Contribute to Website'}
              </a>
              <a href="{base}/get-involved/outreach" class={isActive('/get-involved/outreach') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedOutreach') || 'Community & Outreach') : 'Community & Outreach'}
              </a>
            </div>
          </li>

          <li class="nav-item">
            <a 
              href="{base}/about"
              class={`nav-link ${isActive('/about') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.about') || 'About') : 'About'}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/contact"
              class={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.contact') || 'Contact') : 'Contact'}
            </a>
          </li>
        </ul>
        
        <div>
          <select 
            aria-label={browser ? ($t('common.language.select') || 'Select language') : 'Select language'}
            value={browser ? $locale : 'en'} 
            on:change={handleLocaleChange}
            class="language-select"
          >
            {#each (browser ? $locales : ['en', 'sv']) as loc}
              <option value={loc}>{browser ? getLanguageName(loc) : (loc === 'en' ? 'English' : 'Svenska')}</option>
            {/each}
          </select>
        </div>
      </nav>
    </div>
  </div>
</header>
