<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, loadTranslations, detectLocale } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { navigating, page } from '$app/stores';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';  
  import Header from '$lib/components/Header.svelte';
  import { registerServiceWorker } from '$lib/utils/registerServiceWorker';
  
  // Add a timeout to prevent infinite loading
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
        await loadTransations(initLocale, path);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        // Ensure we set translationsLoaded to true even if there was an error
        translationsLoaded.set(true);
      }

      // Set a safety timeout to prevent infinite loading
      loadingTimeout = setTimeout(() => {
        if (!$translationsLoaded) {
          console.warn("Loading timeout reached - forcing content display");
          translationsLoaded.set(true);
        }
      }, 5000); // 5 second safety timeout
      
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
    
    const loadingPromise = loadTranslations($locale, path);
    
    // Set another safety timeout for navigation
    if (loadingTimeout) clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
      if (!$translationsLoaded) {
        console.warn("Navigation loading timeout reached - forcing content display");
        translationsLoaded.set(true);
      }
    }, 5000);
    
    loadingPromise
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
