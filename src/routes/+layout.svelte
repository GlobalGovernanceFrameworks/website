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
  const translationsLoaded = writable(true); // Start as true to avoid loading screen issues
  let serviceWorkerRegistered = false;
  let loadingTimeout = null;
  
  // Modify mounted behavior - only run i18n in browser
  onMount(async () => {
    if (browser) {
      try {
        const initLocale = detectLocale();
        let path = $page.url.pathname;
        console.log(`Initial path: ${path}`);
        
        await loadTranslations(initLocale, path);
        locale.set(initLocale);
        translationsLoaded.set(true);
      } catch (e) {
        console.error("Translation loading error:", e);
        translationsLoaded.set(true); // Always show content even if translations fail
      }

      try {
        registerServiceWorker();
      } catch (e) {
        console.warn('Service worker registration failed:', e);
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
