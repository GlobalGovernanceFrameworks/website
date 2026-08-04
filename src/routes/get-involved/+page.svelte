<!-- src/routes/get-involved/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import DiscordInvite from '$lib/components/DiscordInvite.svelte';

  // English translations imported directly as the SSR / pre-load fallback.
  // This replaces the old hand-maintained `fallbackText` object, which was a
  // third copy of these strings and drifted out of sync with the JSON files.
  import enFallback from '$lib/i18n/en/getInvolved.json';

  $: isSalvageMode = $page.url.searchParams.get('source') === 'salvage';

  // Force scroll to top on navigation to ensure Hero visibility
  afterNavigate(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });

  // Expanded states for detail sections
  let expandedSection = null;

  function toggleSection(section) {
    expandedSection = expandedSection === section ? null : section;
  }

  // Walk a dot-path through the English fallback object.
  function fromFallback(key) {
    return key.split('.').reduce((acc, part) => (acc && part in acc ? acc[part] : null), enFallback);
  }

  // Resolve a key: live translation first, English fallback second.
  // `$t` returns '' both while translations are loading and when a key is
  // missing, so the fallback covers first paint and untranslated locales alike.
  function getText(key) {
    const value = $t(`getInvolved.${key}`);
    if (value) return value;
    return fromFallback(key) || '';
  }

  function getButtonText(section) {
    return expandedSection === section ? getText('lessDetails') : getText('moreDetails');
  }

  // Card definitions — keeps the markup below to a single loop instead of
  // seven near-identical blocks.
  const cards = [
    { id: 'translation',    icon: '🌍', prefix: 'translation',    detailKeys: ['why', 'how', 'skills'],        href: '/get-involved/translations' },
    { id: 'website',        icon: '💻', prefix: 'website',        detailKeys: ['why', 'how', 'skills'],        href: '/get-involved/website' },
    { id: 'outreach',       icon: '📣', prefix: 'outreach',       detailKeys: ['why', 'how', 'skills'],        href: '/get-involved/outreach' },
    { id: 'frameworks',     icon: '🏗️', prefix: 'frameworks',     detailKeys: ['why', 'how', 'skills'],        href: '/get-involved/frameworks' },
    { id: 'funding',        icon: '💰', prefix: 'funding',        detailKeys: ['why', 'how', 'whatNeeded'],    href: '/get-involved/funding' },
    { id: 'implementation', icon: '🚀', prefix: 'implementation', detailKeys: ['why', 'how', 'skills'],        href: '/frameworks' },
    { id: 'research',       icon: '🔬', prefix: 'research',       detailKeys: ['why', 'how', 'skills'],        href: '/contact' }
  ];

  // Label shown before each detail line. `whatNeeded` in the details object
  // maps to the `whatsNeeded` label key.
  const detailLabel = { why: 'why', how: 'how', skills: 'skills', whatNeeded: 'whatsNeeded' };
</script>

<svelte:head>
  <title>{getText('title')} - Global Governance Frameworks</title>
  <meta name="description" content={getText('subtitle')} />
</svelte:head>

<div class="page-container">
  <div class="content">

    <!-- Hero Section -->
    <div class="hero-section" class:salvage-theme={isSalvageMode}>
      <div class="hero-content">
        {#if isSalvageMode}
          <h1>Join the Salvage Operation</h1>
          <p class="hero-subtitle">The system is terminal. We must build the replacement kernel.</p>
          <p class="hero-intro">
            You have seen the diagnosis. The window for voluntary transition is closing (2030-2035).
            Building the Global Governance Frameworks out faster needs builders, architects and funders.
            Pick a role below.
          </p>
        {:else}
          <h1>{getText('title')}</h1>
          <p class="hero-subtitle">{getText('subtitle')}</p>
          <p class="hero-intro">{getText('heroIntro')}</p>
        {/if}
      </div>
    </div>

    <!-- Current State Section -->
    <div class="current-state-section">
      <h2>{getText('currentState.title')}</h2>
      <p>{getText('currentState.paragraph1')}</p>
      <p>{getText('currentState.paragraph2')}</p>
    </div>

    <!-- Why Contribute Section -->
    <div class="why-contribute-section">
      <h2>{getText('whyContribute.title')}</h2>
      <p>{getText('whyContribute.paragraph1')}</p>
      <p>{getText('whyContribute.paragraph2')}</p>
      <p>{getText('whyContribute.paragraph3')}</p>
    </div>

    <!-- Pathways Header -->
    <div class="pathways-header">
      <h2>{getText('pathways.title')}</h2>
      <p>{getText('pathways.intro')}</p>
    </div>

    <!-- Contribution Cards -->
    <div class="contribution-cards">
      {#each cards as card (card.id)}
        <div class="contribution-card">
          <div class="card-icon">{card.icon}</div>
          <div class="card-content">
            <h3>{getText(`${card.prefix}Title`)}</h3>
            <p>{getText(`${card.prefix}Description`)}</p>

            <button
              class="details-toggle"
              aria-expanded={expandedSection === card.id}
              on:click={() => toggleSection(card.id)}
            >
              {getButtonText(card.id)}
            </button>

            {#if expandedSection === card.id}
              <div class="details-content">
                {#each card.detailKeys as key}
                  <p>
                    <strong>{getText(detailLabel[key])}</strong>
                    {getText(`${card.prefix}Details.${key}`)}
                  </p>
                {/each}
              </div>
            {/if}

            <a href="{base}{card.href}" class="card-cta">
              {getText(`${card.prefix}Cta`)} <span class="arrow">→</span>
            </a>
          </div>
        </div>
      {/each}
    </div>

    <!-- Global Impact Section -->
    <div class="global-impact-section">
      <h2>{getText('globalImpact.title')}</h2>
      <p>{getText('globalImpact.paragraph1')}</p>
      <p>{getText('globalImpact.paragraph2')}</p>
    </div>

    <!-- Get Started Section -->
    <div class="get-started-section">
      <h2>{getText('getStarted.title')}</h2>
      <p>{getText('getStarted.paragraph1')}</p>
      <p>{getText('getStarted.paragraph2')}</p>
      <DiscordInvite variant="card" />
      <div class="action-buttons">
        <a href="{base}/contact" class="action-button primary">
          {getText('getStarted.contactCta')}
        </a>
        <a href="https://github.com/GlobalGovernanceFrameworks"
           target="_blank"
           rel="noopener noreferrer"
           class="action-button secondary">
          {getText('getStarted.githubCta')}
        </a>
        <a href="{base}/frameworks" class="action-button tertiary">
          {getText('getStarted.exploreCta')}
        </a>
      </div>
    </div>

    <!-- Community Note Section -->
    <div class="community-note-section">
      <h2>{getText('communityNote.title')}</h2>
      <p>{getText('communityNote.paragraph1')}</p>
      <p>{getText('communityNote.paragraph2')}</p>
      <p>{getText('communityNote.paragraph3')}</p>
    </div>

  </div>
</div>

<style>
  /* Use home page color scheme */
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

  .content {
    min-width: 0;
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin-bottom: 3rem;
    color: white;
    text-align: center;
  }

  /* Salvage Mode Hero */
  .hero-section.salvage-theme {
    background: linear-gradient(135deg, #1e1b4b 0%, #7c2d12 100%);
    border-bottom: 4px solid #d97706;
  }

  .hero-content h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  .hero-intro {
    font-size: 1.125rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Content Sections */
  .current-state-section,
  .why-contribute-section,
  .pathways-header,
  .global-impact-section,
  .get-started-section,
  .community-note-section {
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .current-state-section {
    background: linear-gradient(135deg, #fef3e2 0%, #fef9f3 100%);
    border-left: 4px solid var(--warm-gold);
  }

  .why-contribute-section {
    background: linear-gradient(135deg, #f0f9ff 0%, #f8faff 100%);
    border-left: 4px solid var(--primary-blue);
  }

  .community-note-section {
    background: linear-gradient(135deg, #f0fdf4 0%, #f7fef8 100%);
    border-left: 4px solid var(--earthy-green);
  }

  .current-state-section h2,
  .why-contribute-section h2,
  .pathways-header h2,
  .global-impact-section h2,
  .get-started-section h2,
  .community-note-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }

  .current-state-section p,
  .why-contribute-section p,
  .pathways-header p,
  .global-impact-section p,
  .get-started-section p,
  .community-note-section p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--content-text);
    margin-bottom: 1rem;
  }

  .pathways-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  /* Contribution Cards */
  .contribution-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .contribution-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .contribution-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .card-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }

  .card-content > p {
    color: var(--content-text);
    line-height: 1.6;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .details-toggle {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--primary-blue);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    transition: all 0.2s;
    align-self: flex-start;
  }

  .details-toggle:hover {
    background: var(--light-background);
    border-color: var(--primary-blue);
  }

  .details-content {
    background: var(--light-background);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--content-text);
  }

  .details-content p {
    margin-bottom: 0.75rem;
  }

  .details-content p:last-child {
    margin-bottom: 0;
  }

  .details-content strong {
    color: var(--primary-blue);
  }

  .card-cta {
    display: inline-block;
    background: var(--warm-gold);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
    text-align: center;
  }

  .card-cta:hover {
    background: var(--dark-gold);
  }

  .arrow {
    margin-left: 0.5rem;
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    justify-content: center;
  }

  .action-button {
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    text-align: center;
  }

  .action-button.primary {
    background: var(--primary-blue);
    color: white;
  }

  .action-button.primary:hover {
    background: #1e3a6b;
  }

  .action-button.secondary {
    background: var(--warm-gold);
    color: white;
  }

  .action-button.secondary:hover {
    background: var(--dark-gold);
  }

  .action-button.tertiary {
    background: white;
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
  }

  .action-button.tertiary:hover {
    background: var(--primary-blue);
    color: white;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .hero-intro {
      font-size: 1rem;
    }

    .contribution-cards {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
    }

    .action-button {
      width: 100%;
    }
  }
</style>
