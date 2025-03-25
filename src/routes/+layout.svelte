<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, loadTranslations, detectLocale } from '$lib/i18n';
  import { onMount, onDestroy } from 'svelte';
  import { navigating, page } from '$app/stores';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { writable, get } from 'svelte/store';
  import Header from '$lib/components/Header.svelte';
  import { registerServiceWorker } from '$lib/utils/registerServiceWorker';
  
  // Initialize stores at the top level
  const translationsLoaded = writable(browser ? false : true);
  let loadingTimeout;
  
  onMount(async () => {
    // Handle translations
    if (browser) {
      translationsLoaded.set(false);
      
      const initLocale = detectLocale();
      
      let path = $page.url.pathname;
      if (path.startsWith(base)) {
        path = path.slice(base.length) || '/';
      }
      
      try {
        await loadTranslations(initLocale, path);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        translationsLoaded.set(true);
      }

      // Set a safety timeout - this won't use the reactive $translationsLoaded
      loadingTimeout = setTimeout(() => {
        // Use get() to check the current store value
        if (!get(translationsLoaded)) {
          console.warn("Loading timeout reached - forcing content display");
          translationsLoaded.set(true);
        }
      }, 5000);
      
      registerServiceWorker();
    }
  });
  
  onDestroy(() => {
    if (loadingTimeout) clearTimeout(loadingTimeout);
  });

  // When navigating, reset loading state and load new translations
  $: if (browser && $navigating) {
    translationsLoaded.set(false);
    let path = $navigating.to?.url.pathname;
    if (path.startsWith(base)) {
      path = path.slice(base.length) || '/';
    }
    
    // Clear any existing timeout
    if (loadingTimeout) clearTimeout(loadingTimeout);
    
    // Set a new safety timeout
    loadingTimeout = setTimeout(() => {
      // Use get() to check the current store value
      if (!get(translationsLoaded)) {
        console.warn("Navigation loading timeout reached - forcing content display");
        translationsLoaded.set(true);
      }
    }, 5000);
    
    loadTranslations($locale, path)
      .then(() => {
        translationsLoaded.set(true);
      })
      .catch(error => {
        console.error("Error loading translations during navigation:", error);
        translationsLoaded.set(true);
      });
  }
</script>

<!-- Only show loading overlay in the browser -->
{#if browser && !$translationsLoaded}
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
    <p class="loading-message">Loading content...</p>
  </div>
{/if}

<div class="flex flex-col min-h-screen" class:content-ready={browser && $translationsLoaded}>
  <Header />
  
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
  
  <Footer />
</div>

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #2B4B8C; /* Cosmic blue from your theme */
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-message {
    margin-top: 1rem;
    color: #2B4B8C;
    font-size: 0.9rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Hide content initially and fade in when ready */
  .content-ready {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
