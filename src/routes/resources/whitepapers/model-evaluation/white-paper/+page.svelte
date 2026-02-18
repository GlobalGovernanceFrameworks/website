<!-- /src/routes/resources/whitepapers/model-evaluation/white-paper/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import Follow from '$lib/components/Follow.svelte';
  
  export let data;
  
  const { sections, currentLocale, usedFallback } = data;

  // Helper function for translations with fallbacks
  function tr(key, fallback) {
    if (browser) {
      return $t(key) || fallback;
    }
    return fallback;
  }
</script>

<svelte:head>
  <title>Battle of the Architects - Full Analysis | Global Governance Frameworks</title>
  <meta name="description" content="Complete analysis of six AI models tackling civilizational architecture challenges" />
</svelte:head>

<div class="whitepaper-page">
  <!-- Header -->
  <div class="whitepaper-header">
    <div class="header-container">
      <a href="/resources/whitepapers/model-evaluation" class="back-link">
        <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>{tr('modelEvaluation.backToOverview', 'Back to Overview')}</span>
      </a>
      
      <h1 class="paper-title">{tr('modelEvaluation.title', 'Battle of the Architects')}</h1>
      <p class="paper-subtitle">{tr('modelEvaluation.subtitle', 'A Case Study in Multi-Model Synthesis')}</p>
      
      <div class="paper-meta">
        <div class="meta-item">
          <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{tr('modelEvaluation.meta.date', 'January 2026')}</span>
        </div>
        <div class="meta-item">
          <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tr('modelEvaluation.meta.readingTime', '~25 minutes')}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="toc-section">
    <div class="toc-container">
      <h2 class="toc-title">{tr('modelEvaluation.tableOfContents', 'Table of Contents')}</h2>
      <nav class="toc-nav">
        {#each ['experiment', 'prompt', 'responses', 'evaluation', 'insights', 'synthesis'] as sectionId, i}
          <a href="#{sectionId}" class="toc-link">
            <span class="toc-number">{i + 1}.</span>
            <span class="toc-label">{tr(`modelEvaluation.sections.${sectionId}`, sectionId)}</span>
          </a>
        {/each}
      </nav>
    </div>
  </div>

  {#if usedFallback}
    <div class="fallback-banner">
      <div class="fallback-container">
        <p>{tr('modelEvaluation.fallbackNotice', 'Note: Some content is displayed in English as translation is not yet available.')}</p>
      </div>
    </div>
  {/if}

  <!-- Content Sections -->
  <div class="content-wrapper">
    {#each ['experiment', 'prompt', 'responses', 'evaluation', 'insights', 'synthesis'] as sectionId, i}
      <section id={sectionId} class="content-section">
        <div class="section-header">
          <div class="section-title-row">
            <span class="section-number">{i + 1}</span>
            <h2 class="section-title">{tr(`modelEvaluation.sections.${sectionId}`, sectionId)}</h2>
          </div>
          {#if i < 4}
            <div class="section-divider"></div>
          {/if}
        </div>
        
        <div class="section-content prose">
          <svelte:component this={sections[sectionId].component} />
        </div>
      </section>
    {/each}
  </div>

  <!-- End of Paper -->
  <div class="paper-end">
    <div class="end-container">
      <div class="end-badge">
        <p>{tr('modelEvaluation.endOfAnalysis', 'END OF ANALYSIS')}</p>
      </div>
      
      <div class="end-actions">
        <a href="/resources/whitepapers/model-evaluation" class="end-btn primary">
          {tr('modelEvaluation.backToOverview', 'Back to Overview')}
        </a>
        <a href="/resources/whitepapers" class="end-btn secondary">
          {tr('modelEvaluation.moreResearch', 'More Research')}
        </a>
      </div>
    </div>
  </div>

  <!-- Follow Section -->
  <div class="follow-section">
    <div class="follow-container">
      <Follow />
    </div>
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .whitepaper-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  /* Header */
  .whitepaper-header {
    background: rgba(15, 23, 42, 0.5);
    border-bottom: 1px solid #334155;
  }

  .header-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    text-decoration: none;
    margin-bottom: 1.5rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: white;
  }

  .back-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .paper-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.75rem;
  }

  .paper-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #cbd5e1;
    margin-bottom: 1.5rem;
  }

  .paper-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .meta-icon {
    width: 1rem;
    height: 1rem;
  }

  /* Table of Contents */
  .toc-section {
    background: rgba(30, 41, 59, 0.3);
    border-bottom: 1px solid #334155;
  }

  .toc-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .toc-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }

  .toc-nav {
    display: grid;
    gap: 0.5rem;
  }

  .toc-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    transition: background 0.2s;
  }

  .toc-link:hover {
    background: rgba(71, 85, 105, 0.5);
  }

  .toc-number {
    font-family: monospace;
    font-size: 0.875rem;
    color: #64748b;
  }

  .toc-link:hover .toc-number {
    color: #60a5fa;
  }

  .toc-label {
    color: #cbd5e1;
  }

  .toc-link:hover .toc-label {
    color: white;
  }

  /* Fallback Banner */
  .fallback-banner {
    background: rgba(59, 130, 246, 0.1);
    border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  }

  .fallback-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 1rem 1.5rem;
  }

  .fallback-container p {
    color: #93c5fd;
    font-size: 0.875rem;
    margin: 0;
  }

  /* Content */
  .content-wrapper {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .content-section {
    margin-bottom: 4rem;
    scroll-margin-top: 5rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-title-row {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .section-number {
    font-family: monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #60a5fa;
  }

  .section-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.5) 0%, transparent 100%);
  }

  .section-content {
    color: #e2e8f0;
    line-height: 1.7;
  }

  .section-content :global(h1) {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  }

  .section-content :global(h2) {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .section-content :global(h3) {
    color: #cbd5e1;
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .section-content :global(p) {
    margin-bottom: 1rem;
  }

  .section-content :global(a) {
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }

  .section-content :global(a:hover) {
    color: #93c5fd;
  }

  .section-content :global(ul),
  .section-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .section-content :global(li) {
    margin-bottom: 0.5rem;
  }

  .section-content :global(strong) {
    color: white;
    font-weight: 600;
  }

  .section-content :global(code) {
    background: rgba(30, 41, 59, 0.5);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }

  .section-content :global(pre) {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .section-content :global(blockquote) {
    border-left: 4px solid rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.3);
    padding: 1rem;
    margin: 1rem 0;
    font-style: italic;
  }

  .section-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    border: 1px solid #334155;
  }

  .section-content :global(thead) {
    background: rgba(30, 41, 59, 0.5);
  }

  .section-content :global(th),
  .section-content :global(td) {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #334155;
  }

  .section-content :global(tr:last-child td) {
    border-bottom: none;
  }

  /* End of Paper */
  .paper-end {
    background: rgba(30, 41, 59, 0.5);
    border-top: 1px solid #334155;
  }

  .end-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .end-badge {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: rgba(71, 85, 105, 0.5);
    border: 1px solid #475569;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }

  .end-badge p {
    color: #cbd5e1;
    font-family: monospace;
    font-size: 0.875rem;
    margin: 0;
  }

  .end-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  @media (min-width: 640px) {
    .end-actions {
      flex-direction: row;
      justify-content: center;
    }
  }

  .end-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    min-width: 200px;
    text-align: center;
  }

  .end-btn.primary {
    background: #334155;
    color: white;
  }

  .end-btn.primary:hover {
    background: #475569;
  }

  .end-btn.secondary {
    background: transparent;
    color: #cbd5e1;
    border: 1px solid #475569;
  }

  .end-btn.secondary:hover {
    background: rgba(71, 85, 105, 0.5);
    color: white;
  }

  /* Follow Section */
  .follow-section {
    border-top: 1px solid #334155;
  }

  .follow-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-container,
    .toc-container,
    .content-wrapper,
    .end-container,
    .follow-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
