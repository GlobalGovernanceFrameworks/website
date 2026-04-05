<!-- src/routes/resources/whitepapers/immanent-trust-protocol/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import Follow from '$lib/components/Follow.svelte';
  
  export let data;
  
  const { paper, currentLocale } = data;

  function tr(key, fallback) {
    if (browser) {
      return $t(key) || fallback;
    }
    return fallback;
  }

  const sections = [
    { num: '1', label: 'Introduction' },
    { num: '2', label: 'Cybernetic Foundations & Related Work' },
    { num: '3', label: 'Core Architecture: The Informal Trust Ledger' },
    { num: '4', label: 'Trust Independence Metric (TIM)' },
    { num: '5', label: 'Trust Shock Propagation and Calibration' },
    { num: '6', label: 'Bootstrapping and Cold-Start' },
    { num: '7', label: 'Multi-Scale Coordination: Scale-Adaptive Fields' },
    { num: '8', label: 'Privacy and Lightweight Traceability' },
    { num: '9', label: 'Reference Implementation Architecture' },
    { num: '10', label: 'Security Analysis' },
    { num: '11', label: 'Simulation Results' },
    { num: '12', label: 'Discussion and Limitations' },
    { num: '13', label: 'Conclusion' },
  ];

  const appendices = [
    { id: 'A', label: 'Pseudocode' },
    { id: 'B', label: 'Full Proof of TIM Theorem' },
    { id: 'C', label: 'Simulation Code Repository' },
    { id: 'D', label: 'Parameter Recommendation Table' },
    { id: 'E', label: 'Context Schema Resolution Examples' },
  ];

  const keyInnovations = [
    {
      icon: '🔗',
      title: 'Informal Trust Ledger',
      desc: 'Local, observer-relative trust graphs — no global state required'
    },
    {
      icon: '🛡️',
      title: 'Trust Independence Metric',
      desc: 'Mathematically collapses Sybil rings regardless of size'
    },
    {
      icon: '⚡',
      title: 'Trust Shock Propagation',
      desc: 'Endorsers have skin in the game — penalties cascade backward'
    },
    {
      icon: '🌊',
      title: 'Scale-Adaptive Fields',
      desc: 'Ephemeral coordination that auto-dissolves via cryptographic TTL'
    },
  ];
</script>

<svelte:head>
  <title>The Immanent Trust Protocol | Global Governance Frameworks</title>
  <meta name="description" content={paper.meta.description} />
</svelte:head>

<div class="landing-page">
  <!-- Hero -->
  <div class="hero">
    <div class="hero-container">
      <a href="/resources/whitepapers" class="back-link">
        <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Whitepapers</span>
      </a>
      
      <div class="hero-badge">Technical Whitepaper</div>
      <h1 class="hero-title">{paper.meta.title}</h1>
      <p class="hero-subtitle">{paper.meta.subtitle}</p>
      
      <div class="hero-meta">
        <span>{paper.meta.date}</span>
        <span class="meta-sep">·</span>
        <span>{paper.meta.readingTime}</span>
        <span class="meta-sep">·</span>
        <span>{paper.meta.authors}</span>
      </div>

      <div class="hero-actions">
        <a href="/resources/whitepapers/immanent-trust-protocol/white-paper" class="btn-primary">
          Read Full Paper
        </a>
        <a href="/resources/whitepapers/immanent-trust-protocol/in-simple-terms" class="btn-secondary">
          In Simple Terms
        </a>
      </div>
    </div>
  </div>

  <!-- Key Innovations -->
  <div class="innovations-section">
    <div class="innovations-container">
      <h2 class="innovations-heading">Core Contributions</h2>
      <div class="innovations-grid">
        {#each keyInnovations as item}
          <div class="innovation-card">
            <span class="innovation-icon">{item.icon}</span>
            <h3 class="innovation-title">{item.title}</h3>
            <p class="innovation-desc">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Abstract -->
  <div class="abstract-section">
    <div class="abstract-container">
      <h2 class="abstract-heading">Abstract</h2>
      <div class="abstract-content prose">
        <svelte:component this={paper.abstract.component} />
      </div>
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="toc-section">
    <div class="toc-container">
      <h2 class="toc-heading">Contents</h2>
      
      <div class="toc-columns">
        <div class="toc-column">
          <h3 class="toc-group-label">Main Paper</h3>
          <nav class="toc-nav">
            {#each sections as section}
              <a href="/resources/whitepapers/immanent-trust-protocol/white-paper#section-{section.num}" class="toc-link">
                <span class="toc-number">{section.num}.</span>
                <span class="toc-label">{section.label}</span>
              </a>
            {/each}
          </nav>
        </div>
        
        <div class="toc-column">
          <h3 class="toc-group-label">Appendices</h3>
          <nav class="toc-nav">
            {#each appendices as app}
              <a href="/resources/whitepapers/immanent-trust-protocol/white-paper#appendix-{app.id.toLowerCase()}" class="toc-link">
                <span class="toc-number">{app.id}.</span>
                <span class="toc-label">{app.label}</span>
              </a>
            {/each}
            <a href="/resources/whitepapers/immanent-trust-protocol/white-paper#references" class="toc-link">
              <span class="toc-number"></span>
              <span class="toc-label">References</span>
            </a>
          </nav>

          <h3 class="toc-group-label" style="margin-top: 1.5rem;">Resources</h3>
          <nav class="toc-nav">
            <a href="https://github.com/GlobalGovernanceFrameworks/itp-simulation" class="toc-link" target="_blank" rel="noopener">
              <span class="toc-number">↗</span>
              <span class="toc-label">Simulation Code</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- Follow -->
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

  .landing-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  }

  /* Hero */
  .hero {
    border-bottom: 1px solid #334155;
  }

  .hero-container {
    max-width: 56rem;
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

  .back-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .hero-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #60a5fa;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    margin-bottom: 1.25rem;
  }

  .hero-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: white;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.375rem);
    color: #94a3b8;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 2rem;
  }

  .meta-sep { margin: 0 0.25rem; }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.75rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    text-align: center;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
  }

  .btn-primary:hover {
    background: #2563eb;
  }

  .btn-secondary {
    background: transparent;
    color: #cbd5e1;
    border: 1px solid #475569;
  }

  .btn-secondary:hover {
    background: rgba(71, 85, 105, 0.5);
    color: white;
  }

  /* Key Innovations */
  .innovations-section {
    border-bottom: 1px solid #334155;
  }

  .innovations-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .innovations-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }

  .innovations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .innovation-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 1.25rem;
  }

  .innovation-icon {
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .innovation-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.375rem;
  }

  .innovation-desc {
    font-size: 0.8125rem;
    color: #94a3b8;
    line-height: 1.5;
    margin: 0;
  }

  /* Abstract */
  .abstract-section {
    border-bottom: 1px solid #334155;
  }

  .abstract-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .abstract-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }

  .abstract-content {
    color: #cbd5e1;
    line-height: 1.8;
    font-size: 0.9375rem;
  }

  .abstract-content :global(p) {
    margin-bottom: 1rem;
  }

  .abstract-content :global(strong) {
    color: white;
    font-weight: 600;
  }

  /* Table of Contents */
  .toc-section {
    border-bottom: 1px solid #334155;
  }

  .toc-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .toc-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }

  .toc-columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .toc-columns {
      grid-template-columns: 1.5fr 1fr;
    }
  }

  .toc-group-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin-bottom: 0.75rem;
  }

  .toc-nav {
    display: grid;
    gap: 0.125rem;
    margin-bottom: 0.5rem;
  }

  .toc-link {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    text-decoration: none;
    transition: background 0.2s;
  }

  .toc-link:hover {
    background: rgba(71, 85, 105, 0.4);
  }

  .toc-number {
    font-family: monospace;
    font-size: 0.8125rem;
    color: #64748b;
    min-width: 1.5rem;
  }

  .toc-link:hover .toc-number { color: #60a5fa; }

  .toc-label {
    font-size: 0.875rem;
    color: #cbd5e1;
  }

  .toc-link:hover .toc-label { color: white; }

  /* Follow */
  .follow-section {
    border-top: 1px solid #334155;
  }

  .follow-container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  @media (max-width: 768px) {
    .hero-container,
    .innovations-container,
    .abstract-container,
    .toc-container,
    .follow-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
