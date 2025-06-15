<!-- src/lib/components/MetaTags.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Props with defaults
  export let title = "Global Governance Framework";
  export let description = "Implementation tools and resources for global governance challenges";
  export let keywords = "global governance, peace, conflict resolution, implementation";
  export let image = "/images/frameworks/ogimage.jpg"; // Default Open Graph image
  export let type = "website";
  export let url = "";
  
  // Get the current URL for canonical link and OG URL
  onMount(() => {
    if (!url && typeof window !== 'undefined') {
      url = window.location.href;
    }
  });
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  
  <!-- Canonical URL -->
  {#if url}
    <link rel="canonical" href={url} />
  {/if}
  
  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {#if url}
    <meta property="og:url" content={url} />
  {/if}
  <meta property="og:image" content={image} />
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  
  <!-- Additional Meta Tags -->
  <meta name="author" content="Global Governance Framework" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="content-language" content="en" />
</svelte:head>
