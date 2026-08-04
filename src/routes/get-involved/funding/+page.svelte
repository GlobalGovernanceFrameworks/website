<!-- src/routes/get-involved/funding/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';

  // English translations imported directly as the SSR / pre-load fallback.
  // `$t` returns '' while translations load and when a key is missing, so
  // without this the page renders blank on first paint.
  import enFallback from '$lib/i18n/en/getInvolved.json';

  function fromFallback(key) {
    return key
      .split('.')
      .reduce((acc, part) => (acc && part in acc ? acc[part] : null), enFallback.fundingPage);
  }

  function getText(key) {
    const value = $t(`getInvolved.fundingPage.${key}`);
    if (value) return value;
    return fromFallback(key) || '';
  }
</script>

<svelte:head>
  <title>{getText('title')} | GGF</title>
  <meta name="description" content={getText('subtitle')} />
</svelte:head>

<div class="page-container">
  <div class="content">

    <div class="hero-section">
      <div class="hero-content">
        <h1>{getText('title')}</h1>
        <p class="hero-subtitle">{getText('subtitle')}</p>
        <p class="hero-intro">{getText('heroIntro')}</p>
      </div>
    </div>

    <div class="transparency-section">
      <div class="notice-icon">ℹ️</div>
      <div class="notice-content">
        <h2>{getText('transparency.title')}</h2>
        <p>{getText('transparency.text')}</p>
      </div>
    </div>

    <div class="impact-section">
      <h2>{getText('needs.title')}</h2>
      <p class="section-intro">{getText('needs.intro')}</p>
      <div class="impact-grid">
        <div class="impact-card">
          <div class="impact-icon">🛠️</div>
          <h3>{getText('needs.item1')}</h3>
          <p>{getText('needs.item1Desc')}</p>
        </div>
        <div class="impact-card">
          <div class="impact-icon">💻</div>
          <h3>{getText('needs.item2')}</h3>
          <p>{getText('needs.item2Desc')}</p>
        </div>
        <div class="impact-card">
          <div class="impact-icon">🌏</div>
          <h3>{getText('needs.item3')}</h3>
          <p>{getText('needs.item3Desc')}</p>
        </div>
      </div>
    </div>

    <div class="conditional-section">
      <h2>{getText('conditional.title')}</h2>
      <p>{getText('conditional.text')}</p>
      <a href="{base}/get-involved/founding" class="text-link">
        {getText('conditional.cta')} <span aria-hidden="true">→</span>
      </a>
    </div>

    <div class="funding-options-section">
      <h2>{getText('options.title')}</h2>
      <div class="contribution-cards">

        <div class="contribution-card">
          <div class="card-icon">🏗️</div>
          <div class="card-content">
            <h3>{getText('options.githubTitle')}</h3>
            <p>{getText('options.githubDesc')}</p>

            <span class="action-button primary disabled" aria-disabled="true">
              {getText('options.githubCta')}
            </span>
            <p class="small-note">{getText('options.githubNote')}</p>
          </div>
        </div>

        <div class="contribution-card">
          <div class="card-icon">🤝</div>
          <div class="card-content">
            <h3>{getText('options.pledgeTitle')}</h3>
            <p>{getText('options.pledgeDesc')}</p>
            <a
              href="{base}/contact?subject={encodeURIComponent(getText('options.pledgeSubject'))}"
              class="action-button secondary"
            >
              {getText('options.pledgeCta')}
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

<style>
  /* --- THEME VARIABLES (Copied from Parent) --- */
  :root {
    --primary-blue: #2B4B8C;
    --secondary-purple: #6B5CA5;
    --earthy-green: #2D5F2D;
    --warm-gold: #DAA520;
    --dark-gold: #B8860B;
    --light-background: #f8fafc;
    --content-text: #4b5563;
    --border-color: #e5e7eb;
  }

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  /* --- HERO SECTION --- */
  .hero-section {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin-bottom: 3rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    font-weight: 300;
  }

  .hero-intro {
    font-size: 1.125rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 800px;
    margin: 0 auto;
  }

  /* --- TRANSPARENCY SECTION --- */
  .transparency-section {
    background: #f0f9ff;
    border-left: 5px solid var(--primary-blue);
    padding: 2rem;
    border-radius: 0.75rem;
    margin-bottom: 3rem;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .notice-icon {
    font-size: 2rem;
  }

  .notice-content h2 {
    color: var(--primary-blue);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .notice-content p {
    color: var(--content-text);
    line-height: 1.6;
  }

  /* --- IMPACT GRID --- */
  .impact-section {
    margin-bottom: 4rem;
  }

  .impact-section h2, .funding-options-section h2 {
    text-align: center;
    font-size: 2rem;
    color: var(--primary-blue);
    margin-bottom: 2rem;
  }

  .section-intro {
    text-align: center;
    max-width: 700px;
    margin: -1rem auto 2rem auto;
    color: var(--content-text);
    line-height: 1.6;
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .impact-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid var(--border-color);
    text-align: center;
    transition: transform 0.2s;
  }

  .impact-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-blue);
  }

  .impact-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .impact-card h3 {
    color: var(--earthy-green);
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .impact-card p {
    color: var(--content-text);
    line-height: 1.5;
    font-size: 0.95rem;
  }

  /* --- CONDITIONAL / FORMALIZATION SECTION --- */
  .conditional-section {
    background: linear-gradient(135deg, #fef3e2 0%, #fef9f3 100%);
    border-left: 5px solid var(--warm-gold);
    padding: 2rem;
    border-radius: 0.75rem;
    margin-bottom: 4rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .conditional-section h2 {
    color: var(--primary-blue);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .conditional-section p {
    color: var(--content-text);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .text-link {
    color: var(--primary-blue);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid rgba(43, 75, 140, 0.3);
    transition: all 0.2s;
  }

  .text-link:hover {
    color: var(--dark-gold);
    border-bottom-color: var(--dark-gold);
  }

  /* --- FUNDING CARDS (Matches "Contribution Card" style) --- */
  .contribution-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .contribution-card {
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    text-align: center;
    transition: all 0.3s ease;
  }

  .contribution-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .card-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }

  .card-content p {
    color: var(--content-text);
    line-height: 1.6;
    margin-bottom: 2rem;
    flex-grow: 1;
  }

  .small-note {
    font-size: 0.85rem;
    color: #9ca3af;
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-style: italic;
    flex-grow: 0;
  }

  /* --- BUTTONS --- */
  .action-button {
    display: inline-block;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .action-button.primary {
    background: var(--warm-gold);
    color: white;
  }

  .action-button.primary:hover {
    background: var(--dark-gold);
  }

  .action-button.secondary {
    background: white;
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
  }

  .action-button.secondary:hover {
    background: var(--primary-blue);
    color: white;
  }

  /* --- DISABLED STATE --- */
  .action-button.disabled {
    background-color: #e5e7eb;
    color: #6b7280;
    cursor: not-allowed;
    box-shadow: none;
    border: 1px solid #d1d5db;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-content h1 { font-size: 2rem; }
    .hero-subtitle { font-size: 1.25rem; }
    .transparency-section { flex-direction: column; gap: 0.5rem; }
  }
</style>
