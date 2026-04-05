<!-- src/routes/resources/whitepapers/immanent-trust-protocol/white-paper/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import Follow from '$lib/components/Follow.svelte';
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  
  export let data;
  
  const { sections, currentLocale, usedFallback } = data;

  function tr(key, fallback) {
    if (browser) {
      return $t(key) || fallback;
    }
    return fallback;
  }

  // ToC entries for the sidebar/header nav
  const tocEntries = [
    { anchor: 'abstract', label: 'Abstract' },
    { anchor: 'section-1', label: '1. Introduction' },
    { anchor: 'section-2', label: '2. Cybernetic Foundations' },
    { anchor: 'section-3', label: '3. Informal Trust Ledger' },
    { anchor: 'section-4', label: '4. Trust Independence Metric' },
    { anchor: 'section-5', label: '5. Shock Propagation' },
    { anchor: 'section-6', label: '6. Bootstrapping' },
    { anchor: 'section-7', label: '7. Scale-Adaptive Fields' },
    { anchor: 'section-8', label: '8. Privacy' },
    { anchor: 'section-9', label: '9. Implementation' },
    { anchor: 'section-10', label: '10. Security Analysis' },
    { anchor: 'section-11', label: '11. Simulation Results' },
    { anchor: 'section-12', label: '12. Discussion' },
    { anchor: 'section-13', label: '13. Conclusion' },
    { anchor: 'appendix-a', label: 'A. Pseudocode' },
    { anchor: 'appendix-b', label: 'B. TIM Proof' },
    { anchor: 'appendix-c', label: 'C. Simulation Code' },
    { anchor: 'appendix-d', label: 'D. Parameters' },
    { anchor: 'appendix-e', label: 'E. Context Examples' },
    { anchor: 'references', label: 'References' },
  ];

  let tocOpen = false;
</script>

<svelte:head>
  <title>The Immanent Trust Protocol — Full Paper | Global Governance Frameworks</title>
  <meta name="description" content="A Post-Consensus Architecture for Decentralized, Observer-Relative Trust" />
</svelte:head>

<div class="paper-page">
  <!-- Header bar (sticky) with fallback banner inside -->
  <div class="paper-header">
    <div class="header-inner">
      <a href="/resources/whitepapers/immanent-trust-protocol" class="back-link">
        <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Overview</span>
      </a>
      
      <h1 class="header-title">The Immanent Trust Protocol</h1>

      <a 
        href="/resources/whitepapers/immanent-trust-protocol/downloads/itp-whitepaper-en.pdf"
        download="itp-whitepaper-en.pdf"
        class="print-btn"
        aria-label="Download PDF"
      >
        <svg class="print-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <span class="print-text">PDF</span>
      </a>
      
      <button class="toc-toggle" on:click={() => tocOpen = !tocOpen} aria-label="Toggle table of contents">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Fallback banner inside sticky header -->
    {#if usedFallback}
      <div class="fallback-banner">
        <div class="fallback-inner">
          <p>Some content is displayed in English as translation is not yet available.</p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Collapsible ToC -->
  {#if tocOpen}
    <div class="toc-dropdown" on:click={() => tocOpen = false}>
      <nav class="toc-dropdown-inner">
        {#each tocEntries as entry}
          <a href="#{entry.anchor}" class="toc-entry">
            {entry.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}

  <!-- Paper content -->
  <div class="paper-content">
    <!-- Print-only title block -->
    <div class="print-title">
      <h1>The Immanent Trust Protocol</h1>
      <p class="subtitle">A Post‑Consensus Architecture for Decentralized, Observer‑Relative Trust</p>
      <p class="authors">Global Governance Frameworks</p>
      <p class="date">Version 1.0 — April 2026</p>
      <div class="print-abstract">
        <strong>Abstract</strong>
        <p>For the past decade, decentralized technology has attempted to solve human coordination by forcing global consensus. From blockchains to decentralized reputation systems, the prevailing architecture demands that every node agree on a single, universal state of truth. This approach violates fundamental laws of cybernetics, recreating the exact centralized bottlenecks it sought to escape. The Immanent Trust Protocol (ITP) introduces a post‑consensus architecture for global coordination, abandoning the concept of a global ledger in favor of observer‑relative, edge‑computed trust.</p>
      </div>
    </div>

    {#each sections as section}
      <section id={section.anchorId} class="content-section">
        <div class="section-body prose">
          <MarkdownRenderer rawMarkdown={section.raw} />
        </div>
      </section>
    {/each}
  </div>

  <!-- End -->
  <div class="paper-end">
    <div class="end-inner">
      <div class="end-rule"></div>
      <div class="end-actions">
        <a href="/resources/whitepapers/immanent-trust-protocol" class="end-btn">
          Back to Overview
        </a>
        <a href="/resources/whitepapers/immanent-trust-protocol/in-simple-terms" class="end-btn">
          Read In Simple Terms
        </a>
        <a href="/resources/whitepapers" class="end-btn muted">
          All Whitepapers
        </a>
      </div>
    </div>
  </div>

  <div class="follow-section">
    <div class="follow-inner">
      <Follow />
    </div>
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .paper-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  .paper-header {
    position: sticky;
    top: 64px;
    z-index: 40;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(8px);
    width: 100%;
  }

  .header-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .fallback-banner {
    background: rgba(59, 130, 246, 0.15);
    border-top: 1px solid rgba(59, 130, 246, 0.25);
    font-size: 0.75rem;
  }

  .fallback-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0.5rem 1.5rem;
  }

  .fallback-inner p {
    color: #93c5fd;
    margin: 0;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.8125rem;
    white-space: nowrap;
    transition: color 0.2s;
  }

  .back-link:hover { color: white; }

  .back-icon {
    width: 1rem;
    height: 1rem;
  }

  .header-title {
    flex: 1;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #e2e8f0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .print-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: 1px solid #475569;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
    color: #94a3b8;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .print-btn:hover {
    color: white;
    border-color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }

  .print-icon {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 640px) {
    .print-text {
      display: none;
    }
    .print-btn {
      padding: 0.375rem;
    }
  }

  .toc-toggle {
    background: none;
    border: 1px solid #475569;
    border-radius: 0.375rem;
    padding: 0.375rem;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s;
  }

  .toc-toggle:hover {
    color: white;
    border-color: #64748b;
  }

  .toc-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.5);
  }

  .toc-dropdown-inner {
    position: absolute;
    top: 3.5rem;
    right: 1rem;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 0.5rem;
    max-height: calc(100vh - 5rem);
    overflow-y: auto;
    min-width: 16rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  .toc-entry {
    display: block;
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    color: #cbd5e1;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background 0.15s;
  }

  .toc-entry:hover {
    background: rgba(71, 85, 105, 0.5);
    color: white;
  }

  .paper-content {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .print-title {
    display: none;
  }

  .content-section {
    margin-bottom: 3rem;
    scroll-margin-top: 4rem;
  }

  .section-body {
    color: #e2e8f0;
    line-height: 1.75;
  }

  .section-body :global(h2) {
    color: white;
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  }

  .section-body :global(h3) {
    color: white;
    font-size: 1.375rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .section-body :global(h4) {
    color: #cbd5e1;
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .section-body :global(p) {
    margin-bottom: 1rem;
  }

  .section-body :global(a) {
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }

  .section-body :global(a:hover) {
    color: #93c5fd;
  }

  .section-body :global(ul),
  .section-body :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .section-body :global(li) {
    margin-bottom: 0.5rem;
  }

  .section-body :global(strong) {
    color: white;
    font-weight: 600;
  }

  .section-body :global(code) {
    background: rgba(30, 41, 59, 0.5);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }

  .section-body :global(pre) {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .section-body :global(pre code) {
    background: none;
    padding: 0;
  }

  .section-body :global(blockquote) {
    border-left: 4px solid rgba(59, 130, 246, 0.4);
    background: rgba(30, 41, 59, 0.3);
    padding: 1rem 1.25rem;
    margin: 1.25rem 0;
    font-style: italic;
    border-radius: 0 0.375rem 0.375rem 0;
  }

  .section-body :global(blockquote p:last-child) {
    margin-bottom: 0;
  }

  .section-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    border: 1px solid #334155;
    font-size: 0.875rem;
  }

  .section-body :global(thead) {
    background: rgba(30, 41, 59, 0.5);
  }

  .section-body :global(th),
  .section-body :global(td) {
    padding: 0.625rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid #334155;
  }

  .section-body :global(th) {
    color: white;
    font-weight: 600;
  }

  .section-body :global(tr:last-child td) {
    border-bottom: none;
  }

  .section-body :global(.math),
  .section-body :global(.katex-display) {
    overflow-x: auto;
    padding: 0.5rem 0;
  }

  .section-body :global(hr) {
    border: none;
    height: 1px;
    background: #334155;
    margin: 3rem 0;
  }

  .paper-end {
    border-top: 1px solid #334155;
  }

  .end-inner {
    max-width: 56rem;
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
    background: #334155;
    color: white;
    transition: background 0.2s;
  }

  .end-btn:hover {
    background: #475569;
  }

  .end-btn.muted {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
  }

  .end-btn.muted:hover {
    background: rgba(71, 85, 105, 0.3);
    color: white;
  }

  .follow-section {
    border-top: 1px solid #334155;
  }

  .follow-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  @media (max-width: 768px) {
    .header-inner,
    .paper-content,
    .end-inner,
    .follow-inner,
    .fallback-inner {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .header-title {
      font-size: 0.8125rem;
    }
  }

  @media print {
    /* Hide the entire site layout container initially */
    .site-layout {
      display: none !important;
    }

    /* But show the paper page and its ancestors up to body */
    body, .site-layout, .main-content, .paper-page {
      display: block !important;
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Then hide specific paper UI elements (sticky header, etc.) */
    .paper-header,
    .fallback-banner,
    .toc-toggle,
    .toc-dropdown,
    .follow-section,
    .paper-end .end-actions,
    .back-link {
      display: none !important;
    }

    /* Show the print‑only title block */
    .print-title {
      display: block !important;
      text-align: center;
      margin-bottom: 2rem;
      page-break-after: avoid;
    }

    .print-title h1 {
      font-size: 28pt;
      margin-bottom: 0.5rem;
    }

    .print-title .subtitle {
      font-size: 14pt;
      color: #333;
      margin-bottom: 1rem;
    }

    .print-title .authors,
    .print-title .date {
      font-size: 11pt;
      color: #555;
    }

    .print-abstract {
      margin-top: 1.5rem;
      text-align: left;
      font-size: 10pt;
      border-top: 1px solid #ccc;
      padding-top: 1rem;
    }

    .paper-content {
      padding: 0 !important;
      margin: 0 auto !important;
    }

    .section-body {
      color: black !important;
    }

    .content-section {
      page-break-before: avoid;
    }

    h2, h3 {
      page-break-after: avoid;
    }
  }
</style>
