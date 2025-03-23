<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale); // Use the new setLocale function
  }

  // Mobile menu state
  let isMenuOpen = false;
  const toggleMenu = () => isMenuOpen = !isMenuOpen;
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
  
  @media (min-width: 768px) {
    .language-select {
      margin-left: 1rem;
    }
  }
</style>

<header>
  <div class="container">
    <div class="header-content">
      <div class="logo-section">
        <a href="/" class="logo-link">
          <img src="/logo.svg" alt="Global Governance Framework" class="logo-img" />
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
              href="/" 
              class={`nav-link ${$page.url.pathname === '/' ? 'active' : ''}`}
            >
              {$t('common.header.home')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/about" 
              class={`nav-link ${$page.url.pathname === '/about' ? 'active' : ''}`}
            >
              {$t('common.header.about')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/framework" 
              class={`nav-link ${$page.url.pathname === '/framework' ? 'active' : ''}`}
            >
              {$t('common.header.framework')}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/contact" 
              class={`nav-link ${$page.url.pathname === '/contact' ? 'active' : ''}`}
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
