<!-- src/routes/resources/whitepapers/immanent-trust-protocol/in-simple-terms/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import Follow from '$lib/components/Follow.svelte';
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  
  export let data;
  
  const { raw, usedFallback } = data;

  function tr(key, fallback) {
    if (browser) {
      return $t(key) || fallback;
    }
    return fallback;
  }
</script>

<svelte:head>
  <title>The Immanent Trust Protocol — In Simple Terms | Global Governance Frameworks</title>
  <meta name="description" content="A non-technical explanation of the Immanent Trust Protocol" />
</svelte:head>

<div class="simple-page">
  <div class="page-header">
    <div class="header-container">
      <a href="/resources/whitepapers/immanent-trust-protocol" class="back-link">
        <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Overview</span>
      </a>
      
      <h1 class="page-title">The Immanent Trust Protocol</h1>
      <p class="page-subtitle">In Simple Terms</p>
      
      <p class="page-intro">
        The full paper is highly technical. This page explains the core ideas
        in plain language — no equations, no cryptography jargon.
      </p>

      <div class="page-actions">
        <a href="/resources/whitepapers/immanent-trust-protocol/white-paper" class="action-link">
          Read the full technical paper →
        </a>
      </div>
    </div>
  </div>

  {#if usedFallback}
    <div class="fallback-banner">
      <div class="fallback-container">
        <p>Some content is displayed in English as translation is not yet available.</p>
      </div>
    </div>
  {/if}

  <div class="content-wrapper">
    <div class="content-body prose">
      <MarkdownRenderer rawMarkdown={raw} />
    </div>
  </div>

  <div class="page-end">
    <div class="end-container">
      <div class="end-rule"></div>
      <div class="end-actions">
        <a href="/resources/whitepapers/immanent-trust-protocol/white-paper" class="end-btn primary">
          Read Full Paper
        </a>
        <a href="/resources/whitepapers/immanent-trust-protocol" class="end-btn secondary">
          Back to Overview
        </a>
      </div>
    </div>
  </div>

  <div class="follow-section">
    <div class="follow-container">
      <Follow />
    </div>
  </div>
</div>

<style>
  .simple-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .page-header {
    border-bottom: 1px solid #334155;
  }

  .header-container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    text-decoration: none;
    margin-bottom: 2rem;
    transition: color 0.2s;
  }

  .back-link:hover { color: white; }

  .back-icon { width: 1.25rem; height: 1.25rem; }

  .page-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.375rem;
  }

  .page-subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    color: #60a5fa;
    font-weight: 500;
    margin-bottom: 1.25rem;
  }

  .page-intro {
    color: #94a3b8;
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .action-link {
    color: #60a5fa;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .action-link:hover { color: #93c5fd; }

  /* Fallback */
  .fallback-banner {
    background: rgba(59, 130, 246, 0.1);
    border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  }

  .fallback-container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
  }

  .fallback-container p {
    color: #93c5fd;
    font-size: 0.8125rem;
    margin: 0;
  }

  /* Content */
  .content-wrapper {
    max-width: 48rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .content-body {
    color: #e2e8f0;
    line-height: 1.8;
    font-size: 1.0625rem;
  }

  .content-body :global(h2) {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .content-body :global(h3) {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .content-body :global(p) { margin-bottom: 1.125rem; }

  .content-body :global(a) {
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .content-body :global(a:hover) { color: #93c5fd; }

  .content-body :global(ul),
  .content-body :global(ol) {
    margin-bottom: 1.125rem;
    padding-left: 1.5rem;
  }

  .content-body :global(li) { margin-bottom: 0.5rem; }

  .content-body :global(strong) {
    color: white;
    font-weight: 600;
  }

  .content-body :global(blockquote) {
    border-left: 4px solid rgba(59, 130, 246, 0.4);
    background: rgba(30, 41, 59, 0.3);
    padding: 1rem 1.25rem;
    margin: 1.25rem 0;
    font-style: italic;
    border-radius: 0 0.375rem 0.375rem 0;
  }

  .content-body :global(hr) {
    border: none;
    height: 1px;
    background: #334155;
    margin: 2.5rem 0;
  }

  /* End */
  .page-end {
    border-top: 1px solid #334155;
  }

  .end-container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .end-rule {
    width: 3rem;
    height: 2px;
    background: #475569;
    margin: 0 auto 2rem;
  }

  .end-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .end-btn {
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .end-btn.primary {
    background: #334155;
    color: white;
  }

  .end-btn.primary:hover { background: #475569; }

  .end-btn.secondary {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
  }

  .end-btn.secondary:hover {
    background: rgba(71, 85, 105, 0.3);
    color: white;
  }

  /* Follow */
  .follow-section { border-top: 1px solid #334155; }

  .follow-container {
    max-width: 48rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  @media (max-width: 768px) {
    .header-container,
    .content-wrapper,
    .end-container,
    .follow-container,
    .fallback-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
