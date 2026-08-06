<!-- src/routes/specifications/[slug]/+page.svelte -->
<script>
  import OutlineDocument from '$lib/components/OutlineDocument.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  export let data;

  $: entry = data.entry;
  $: pageTitle = `${entry.title} ${entry.version} — Global Governance Frameworks`;
  $: pageDescription = entry.standfirst ?? entry.subtitle ?? '';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{entry.title} {entry.version}" />
  <meta property="og:description" content={pageDescription} />
  <meta name="twitter:card" content="summary" />
</svelte:head>

{#if data.usedEnglishFallback}
  <div class="lang-notice">
    This document has not been translated yet and is shown in English.
  </div>
{/if}

{#key data.slug}
  <OutlineDocument
    entry={data.entry}
    slug={data.slug}
    component={data.component}
    metadata={data.metadata}
    versions={data.versions}
    lineage={data.lineage}
    mode={data.mode}
    section={data.section}
  />
{/key}

<ShareButtons title={entry.title} description={pageDescription} hashtags="GlobalGovernance" />

<style>
  .lang-notice {
    background: #fdf6e3;
    border-bottom: 1px solid #f0e0b0;
    color: #7c5c10;
    font-size: 0.875rem;
    padding: 0.6rem 1.25rem;
    text-align: center;
  }
</style>
