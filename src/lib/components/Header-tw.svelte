<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales } from '$lib/i18n';
  import { page } from '$app/stores';
  
  // Handle language selection
  function setLocale(newLocale) {
    locale.set(newLocale);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }

  // Mobile menu state
  let isMenuOpen = false;
  const toggleMenu = () => isMenuOpen = !isMenuOpen;
</script>

<header class="bg-white shadow-md sticky top-0 z-50">
  <div class="container py-4 flex flex-col md:flex-row items-center justify-between">
    <div class="flex items-center justify-between w-full md:w-auto">
      <a href="/" class="flex items-center space-x-3 group">
        <img src="/logo.svg" alt="Global Governance Framework" class="h-10 w-10 transition-transform group-hover:rotate-12" />
        <span class="text-xl font-semibold text-blue-800">Global Governance Framework</span>
      </a>
      
      <!-- Mobile menu button -->
      <button 
        type="button" 
        class="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none" 
        on:click={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {#if isMenuOpen}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>
    
    <nav class={`md:flex items-center space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto ${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
      <ul class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <li>
          <a 
            href="/" 
            class="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 {$page.url.pathname === '/' ? 'font-semibold text-blue-600 border-blue-600' : ''}"
          >
            {$t('common.header.home')}
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            class="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 {$page.url.pathname === '/about' ? 'font-semibold text-blue-600 border-blue-600' : ''}"
          >
            {$t('common.header.about')}
          </a>
        </li>
        <li>
          <a 
            href="/framework" 
            class="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 {$page.url.pathname === '/framework' ? 'font-semibold text-blue-600 border-blue-600' : ''}"
          >
            {$t('common.header.framework')}
          </a>
        </li>
        <li>
          <a 
            href="/contact" 
            class="text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 {$page.url.pathname === '/contact' ? 'font-semibold text-blue-600 border-blue-600' : ''}"
          >
            {$t('common.header.contact')}
          </a>
        </li>
      </ul>
      
      <div class="relative md:ml-4">
                  <select 
          aria-label={$t('common.language.select')}
          value={$locale} 
          on:change={(e) => setLocale(e.target.value)}
          class="py-1.5 px-3 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500"
        >
          {#each $locales as loc}
            <option value={loc}>{$t(`${loc}.language`)}</option>
          {/each}
        </select>
      </div>
    </nav>
  </div>
</header>
