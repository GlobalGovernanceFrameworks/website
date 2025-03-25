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

  // Create a store to track translation loading status
  const translationsLoaded = writable(false);

  // Initialize translations
  onMount(async () => {
    // Get user's preferred locale
    const initLocale = detectLocale();
    
    // Get path without the base path for translation loading
    let path = $page.url.pathname;
    if (path.startsWith(base)) {
      path = path.slice(base.length) || '/';
    }
    
    // Load translations for the current route
    await loadTranslations(initLocale, path);
    
    // Set the locale
    if (browser) {
      locale.set(initLocale);
    }
    
    // Mark translations as loaded
    translationsLoaded.set(true);
  });

  // When navigating, reset loading state and load new translations
  $: if (browser && $navigating) {
    translationsLoaded.set(false);
    let path = $navigating.to?.url.pathname;
    if (path.startsWith(base)) {
      path = path.slice(base.length) || '/';
    }
    
    loadTranslations($locale, path).then(() => {
      translationsLoaded.set(true);
    });
  }
</script>

<!-- Add a global loading overlay that hides content until translations are ready -->
{#if !$translationsLoaded}
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
{/if}

<div class="flex flex-col min-h-screen" class:content-ready={$translationsLoaded}>
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
