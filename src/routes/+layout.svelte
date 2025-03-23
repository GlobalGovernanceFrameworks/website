<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, loadTranslations, detectLocale, currentRoute } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { navigating, page } from '$app/stores';
  import { browser } from '$app/environment';
  
  // Import the simple header
  import Header from '$lib/components/Header.svelte';

  // Initialize translations
  onMount(async () => {
    // Get user's preferred locale
    const initLocale = detectLocale();
    
    // Store the current path
    if ($page && $page.url) {
      currentRoute.set($page.url.pathname);
    }
    
    // Load translations for the current route
    await loadTranslations(initLocale, $page.url.pathname);
    
    // Set the locale
    if (browser) {
      locale.set(initLocale);
    }
  });

  // When navigating, make sure translations are loaded for the new route
  $: if (browser && $navigating) {
    const newPath = $navigating.to?.url.pathname || '/';
    currentRoute.set(newPath);
    loadTranslations($locale, newPath);
  }
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
  
  <Footer />
</div>
