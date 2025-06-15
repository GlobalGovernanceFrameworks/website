<!-- src/routes/frameworks-performance/+page.svelte -->
<script>
  import EthicalImpactDashboard from '$lib/components/EthicalImpactDashboard.svelte';
  import { locale } from '$lib/i18n';

  // Embedded translations
  const translations = {
    en: {
      title: "📊 Framework Performance Dashboard",
    },
    sv: {
      title: "📊 Prestandapanel för Ramverken",
    }
  };

  // Translation function
  function t(key) {
    const currentLocale = $locale || 'en';
    const keys = key.split('.');
    let value = translations[currentLocale] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  // Reactive statements for translations
  $: title = t('title');
  $: intro = t('intro');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="A real-time evaluation of each framework against its core ethical principles." />
</svelte:head>

<div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
  
  <!-- Dashboard Component -->
  <main>
    <EthicalImpactDashboard />
  </main>

</div>
