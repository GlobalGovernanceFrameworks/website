<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, loadTranslations, detectLocale } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { navigating, page } from '$app/stores';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  
  import Header from '$lib/components/Header.svelte';

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
  });

  // When navigating, make sure translations are loaded for the new route
  $: if (browser && $navigating) {
    let path = $navigating.to?.url.pathname;
    if (path.startsWith(base)) {
      path = path.slice(base.length) || '/';
    }
    loadTranslations($locale, path);
  }
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
  
  <Footer />
</div>
