<!-- src/routes/frameworks/docs/implementation/gender/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import FrameworkComingSoon from '$lib/components/FrameworkComingSoon.svelte';
     
  export let data;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Gender Equality & LGBTQ+ Rights Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="gender"
      icon="🏳️‍🌈"
      expectedQuarter="Q4 2025"
      themeColors={{
        primary: '#db2777',
        secondary: '#ec4899', 
        accent: '#f59e0b',
        light: '#fdf2f8'
      }}
      contactEmail="globalgovernanceframework@gmail.com"
    />

    <!-- Original content (if any legacy content exists) -->
    <svelte:component this={data.component} />
  </div>
</div>

<style>
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .content {
    min-width: 0;
  }
</style>
