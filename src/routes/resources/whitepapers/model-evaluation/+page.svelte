<!-- /src/routes/resources/whitepapers/model-evaluation/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import Follow from '$lib/components/Follow.svelte';
  
  export let data;
  
  const { paper, currentUrl, currentLocale } = data;
  const { meta, executiveSummary, usedFallback } = paper;

  // Helper function for translations with fallbacks
  function tr(key, fallback) {
    if (browser) {
      return $t(key) || fallback;
    }
    return fallback;
  }
</script>

<svelte:head>
  <title>{meta.title} | Global Governance Frameworks</title>
  <meta name="description" content={meta.description} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={currentUrl} />
</svelte:head>

<div class="model-eval-page">
  <!-- Hero Section -->
  <div class="hero-section">
    <!-- Background Pattern -->
    <div class="hero-pattern"></div>
    
    <div class="hero-content">
      <!-- Badge -->
      <div class="hero-badge">
        <span class="badge-featured">{tr('modelEvaluation.badges.featured', 'FEATURED RESEARCH')}</span>
        <span class="badge-separator">•</span>
        <span class="badge-status">{tr('modelEvaluation.badges.status', 'Completed Jan 2026')}</span>
      </div>
      
      <!-- Title -->
      <h1 class="hero-title">
        {tr('modelEvaluation.title', 'Battle of the Architects')}
      </h1>
      <h2 class="hero-subtitle">
        {tr('modelEvaluation.subtitle', 'A Case Study in Multi-Model Synthesis: Designing the Supermodular Labor Protocol')}
      </h2>
      
      <!-- Meta Info -->
      <div class="hero-meta">
        <div class="meta-item">
          <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>{tr('modelEvaluation.meta.readingTime', '~25 minutes')}</span>
        </div>
        <div class="meta-item">
          <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="meta-authors">{tr('modelEvaluation.meta.authors', 'Björn Kenneth Holmström (with AI collaboration)')}</span>
        </div>
      </div>
      
      <!-- Description -->
      <p class="hero-description">
        {tr('modelEvaluation.description', 'Six leading AI models tackle the same civilizational challenge. Which architectural approach proves most robust? An empirical validation of cognitive diversity in AI collaboration.')}
      </p>
      
      <!-- CTA Buttons -->
      <div class="hero-actions">
        <a href="/resources/whitepapers/model-evaluation/white-paper" class="btn-primary">
          <span>{tr('modelEvaluation.actions.read', 'Read Full Analysis')}</span>
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#executive-summary" class="btn-secondary">
          {tr('modelEvaluation.actions.summary', 'Quick Summary')}
        </a>
      </div>
    </div>
  </div>

  <!-- Executive Summary Section -->
  <div id="executive-summary" class="summary-section">
    <div class="summary-container">
      <div class="summary-header">
        <h2 class="summary-title">{tr('modelEvaluation.executiveSummary', 'Executive Summary')}</h2>
        <p class="summary-subtitle">{tr('modelEvaluation.executiveSummarySubtitle', 'A quick overview for time-constrained readers')}</p>
      </div>
      
      {#if usedFallback}
        <div class="fallback-notice">
          <p>{tr('modelEvaluation.fallbackNotice', 'Note: Some content is displayed in English as Swedish translation is not yet available.')}</p>
        </div>
      {/if}
      
      <div class="summary-content prose">
        <svelte:component this={executiveSummary.component} />
      </div>
      
      <div class="summary-footer">
        <a href="/resources/whitepapers/model-evaluation/white-paper" class="continue-link">
          <span>{tr('modelEvaluation.actions.read', 'Read Full Analysis')}</span>
          <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Visual Assets Section -->
  <div class="visual-section">
    <div class="visual-container">
      <h2 class="visual-title">{tr('modelEvaluation.theScorecard', 'The Scorecard')}</h2>
      
      <div class="visual-card">
        <img 
          src="/images/whitepapers/model-evaluation/battle-of-architects-scorecard.svg" 
          alt="Model Evaluation Scorecard"
          class="scorecard-image"
        />
      </div>
      
      <div class="visual-download">
        <a href="/images/whitepapers/model-evaluation/battle-of-architects-scorecard.svg" download class="download-link">
          <svg class="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{tr('modelEvaluation.downloadSvg', 'Download SVG')}</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Follow Callout -->
  <div class="follow-section">
    <div class="follow-container">
      <Follow />
    </div>
  </div>
</div>

<style>
  .model-eval-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    overflow: hidden;
  }

  .hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
    background-size: 40px 40px;
  }

  .hero-content {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 1.5rem;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 9999px;
    margin-bottom: 1.5rem;
  }

  .badge-featured {
    color: #60a5fa;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .badge-separator {
    color: #94a3b8;
    font-size: 0.875rem;
  }

  .badge-status {
    color: #94a3b8;
    font-size: 0.875rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: clamp(1.25rem, 3vw, 1.875rem);
    color: #cbd5e1;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    color: #94a3b8;
    margin-bottom: 3rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .meta-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .meta-authors {
    font-size: 0.875rem;
  }

  .hero-description {
    font-size: 1.25rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 64rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: #2563eb;
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #1d4ed8;
  }

  .btn-secondary {
    padding: 1rem 2rem;
    background: #334155;
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background: #475569;
  }

  .btn-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Executive Summary Section */
  .summary-section {
    background: rgba(30, 41, 59, 0.5);
    border-top: 1px solid #334155;
  }

  .summary-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  .summary-header {
    margin-bottom: 2rem;
  }

  .summary-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .summary-subtitle {
    color: #94a3b8;
  }

  .fallback-notice {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 0.5rem;
  }

  .fallback-notice p {
    color: #93c5fd;
    font-size: 0.875rem;
    margin: 0;
  }

  .summary-content {
    color: #e2e8f0;
    line-height: 1.7;
  }

  .summary-content :global(h2) {
    color: white;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .summary-content :global(h3) {
    color: #cbd5e1;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .summary-content :global(p) {
    margin-bottom: 1rem;
  }

  .summary-content :global(ul), 
  .summary-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .summary-content :global(strong) {
    color: white;
    font-weight: 600;
  }

  .summary-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #334155;
  }

  .continue-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #60a5fa;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .continue-link:hover {
    color: #93c5fd;
  }

  .link-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Visual Assets Section */
  .visual-section {
    background: rgba(15, 23, 42, 0.5);
    border-top: 1px solid #334155;
  }

  .visual-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  .visual-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
  }

  .visual-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid #334155;
    border-radius: 0.75rem;
    padding: 2rem;
  }

  .scorecard-image {
    width: 100%;
    height: auto;
  }

  .visual-download {
    margin-top: 1.5rem;
    text-align: center;
  }

  .download-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.2s;
  }

  .download-link:hover {
    color: white;
  }

  .download-icon {
    width: 1.25rem;
    height: 1.25rem;
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
    .hero-content {
      padding: 3rem 1.5rem;
    }

    .visual-card {
      padding: 1rem;
    }
  }
</style>
