<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, loadTranslations, detectLocale } from '$lib/i18n';
  import { onMount, onDestroy } from 'svelte';
  import { navigating, page } from '$app/stores';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';
  import Header from '$lib/components/Header.svelte';
  import { registerServiceWorker } from '$lib/utils/registerServiceWorker';
  
  // Initialize stores at the top level
  let serviceWorkerRegistered = false;
  let loadingTimeout = null;
  
  // Initialize as false to prevent premature rendering
  const translationsLoaded = writable(false);

  onMount(async () => {
    if (browser) {
      try {
        const initLocale = detectLocale();
        let path = $page.url.pathname;
        
        // Load translations BEFORE setting as loaded
        await loadTranslations(initLocale, path);
        locale.set(initLocale);
        translationsLoaded.set(true); // Only set true after translations load
      } catch (e) {
        console.error("Translation loading error:", e);
        translationsLoaded.set(true); // Still show content on error
      }
    }
  });

  // Clear timeout on destroy
  onDestroy(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  });

  // Handle navigation - only in browser
  $: if (browser && $navigating) {
    console.log(`Navigating to: ${$navigating.to?.url.pathname}`);
    
    let path = $navigating.to?.url.pathname || '/';
    
    loadTranslations($locale, path)
      .catch(e => console.error("Translation loading error during navigation:", e));
  }
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
  
  <Footer />
</div>
