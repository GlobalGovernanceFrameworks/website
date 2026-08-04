<!-- src/routes/get-involved/website/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import DiscordInvite from '$lib/components/DiscordInvite.svelte';

  // English translations imported directly as the SSR / pre-load fallback,
  // replacing the old hand-maintained bilingual `fallbackText` object.
  import enFallback from '$lib/i18n/en/website.json';

  export let data;

  $: currentLocale = $locale;

  let guideContent = null;
  let contentUsingEnglishFallback = false;
  let isLoading = true;
  let loadError = false;

  async function loadMarkdownContent(loc) {
    if (!loc) return;

    isLoading = true;
    loadError = false;
    contentUsingEnglishFallback = false;

    try {
      const module = await import(`$lib/content/get-involved/website/${loc}/website-guide.md`);
      guideContent = module.default;
    } catch (e) {
      try {
        const module = await import(`$lib/content/get-involved/website/en/website-guide.md`);
        guideContent = module.default;
        if (loc !== 'en') contentUsingEnglishFallback = true;
      } catch (e2) {
        console.error('Failed to load website contributor guide:', e2);
        loadError = true;
      }
    }

    isLoading = false;
  }

  $: if (browser && currentLocale) {
    loadMarkdownContent(currentLocale);
  }

  onMount(() => {
    if (currentLocale) loadMarkdownContent(currentLocale);
  });

  function fromFallback(key) {
    return key.split('.').reduce((acc, part) => (acc && part in acc ? acc[part] : null), enFallback);
  }

  function getText(key) {
    const value = $t(`website.${key}`);
    if (value) return value;
    return fromFallback(key) || '';
  }

  const REPO_URL = 'https://github.com/GlobalGovernanceFrameworks/website';
</script>

<svelte:head>
  <title>{getText('title')} - Global Governance Frameworks</title>
  <meta name="description" content={getText('subtitle')} />
</svelte:head>

<div class="page-container">
  <div class="content">

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>{getText('title')}</h1>
        <p class="hero-subtitle">{getText('subtitle')}</p>
        <p class="hero-intro">{getText('heroIntro')}</p>
      </div>
    </div>

    <!-- Language Fallback Notice -->
    {#if contentUsingEnglishFallback && currentLocale !== 'en'}
      <div class="language-fallback-notice">
        <div class="notice-icon">🌐</div>
        <div class="notice-content">
          <strong>{getText('languageFallback.title')}</strong>
          <p>{getText('languageFallback.text')}</p>
        </div>
      </div>
    {/if}

    <!-- Contributor Guide -->
    <div class="main-content">
      {#if isLoading}
        <div class="loading-state">
          <p>{getText('loading')}</p>
        </div>
      {:else if loadError || !guideContent}
        <div class="error-state">
          <h2>{getText('errorTitle')}</h2>
          <p>{getText('errorText')}</p>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" class="primary-btn github-btn">
            {getText('githubRepo')} <span class="external-icon">↗</span>
          </a>
        </div>
      {:else}
        <svelte:component this={guideContent} />
      {/if}
    </div>

    <DiscordInvite />

    <!-- Bottom Call-to-Action -->
    <div class="bottom-cta">
      <div class="cta-content">
        <h2>{getText('getStarted')}</h2>
        <p>{getText('getStartedText')}</p>
        <div class="cta-actions">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" class="primary-btn large">
            {getText('githubRepo')} <span class="external-icon">↗</span>
          </a>
          <a href="{base}/get-involved" class="primary-btn large secondary">
            {getText('otherWays')}
          </a>
        </div>
      </div>
    </div>

  </div>
</div>

<style>
  :root {
    --primary-blue: #2B4B8C;
    --secondary-purple: #6B5CA5;
    --earthy-green: #2D5F2D;
    --warm-gold: #DAA520;
    --dark-gold: #B8860B;
    --light-background: #f8fafc;
    --content-text: #4b5563;
    --border-color: #e5e7eb;
    --text-dark: #374151;
    --text-light: #6b7280;
  }

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
    background-color: var(--light-background);
  }

  .content {
    min-width: 0;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-weight: 600;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    font-weight: 400;
  }

  .hero-intro {
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.85;
    font-weight: 300;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(107, 92, 165, 0.1);
    border: 1px solid rgba(107, 92, 165, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content strong {
    color: var(--secondary-purple);
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  .notice-content p {
    color: var(--content-text);
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* Main content / markdown prose */
  .main-content {
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
  }

  .main-content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--primary-blue);
  }

  .main-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--secondary-purple);
  }

  .main-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--earthy-green);
  }

  .main-content :global(p) {
    margin-bottom: 1rem;
    color: var(--content-text);
    line-height: 1.7;
  }

  .main-content :global(ul),
  .main-content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    color: var(--content-text);
  }

  .main-content :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }

  .main-content :global(strong) {
    font-weight: 600;
    color: var(--primary-blue);
  }

  .main-content :global(a) {
    color: var(--primary-blue);
    text-decoration: none;
    border-bottom: 1px solid rgba(43, 75, 140, 0.3);
    transition: all 0.2s;
  }

  .main-content :global(a:hover) {
    color: var(--warm-gold);
    border-bottom-color: var(--warm-gold);
  }

  .main-content :global(code) {
    background: var(--light-background);
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    padding: 0.15em 0.4em;
    font-size: 0.9em;
    color: var(--text-dark);
  }

  .main-content :global(pre) {
    background: #1f2937;
    color: #f9fafb;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .main-content :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font-size: 0.9rem;
  }

  /* Loading / error states */
  .loading-state,
  .error-state {
    text-align: center;
    padding: 3rem 2rem;
    color: var(--content-text);
  }

  .loading-state p {
    font-size: 1.125rem;
    opacity: 0.7;
  }

  .error-state h2 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }

  .error-state p {
    margin-bottom: 2rem;
  }

  /* Buttons */
  .primary-btn {
    background-color: var(--primary-blue);
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    text-decoration: none;
    max-width: 100%;
  }

  .primary-btn:hover {
    background-color: var(--secondary-purple);
    transform: translateY(-1px);
  }

  .primary-btn:active {
    transform: translateY(0);
  }

  .primary-btn:focus-visible {
    outline: 2px solid var(--warm-gold);
    outline-offset: 2px;
  }

  .github-btn {
    background-color: var(--text-dark);
  }

  .github-btn:hover {
    background-color: #1f2937;
  }

  .large {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }

  .external-icon {
    font-size: 0.875rem;
    opacity: 0.8;
    flex-shrink: 0;
  }

  /* Bottom CTA */
  .bottom-cta {
    background: linear-gradient(135deg, var(--earthy-green), var(--primary-blue));
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .cta-content > p {
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.7;
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .cta-actions .primary-btn {
    background-color: var(--warm-gold);
    color: var(--primary-blue);
    font-weight: 600;
  }

  .cta-actions .primary-btn:hover {
    background-color: var(--dark-gold);
    color: white;
  }

  .cta-actions .primary-btn.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  .cta-actions .primary-btn.secondary:hover {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: white;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem 0.5rem;
    }

    .hero-section {
      padding: 2rem 1rem;
      margin-bottom: 1.5rem;
    }

    .hero-content h1 {
      font-size: 1.75rem;
      line-height: 1.1;
      margin-bottom: 0.75rem;
    }

    .hero-subtitle {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .hero-intro {
      font-size: 0.95rem;
    }

    .main-content {
      padding: 1.75rem 1.25rem;
    }

    .bottom-cta {
      padding: 2rem 1rem;
    }

    .cta-content h2 {
      font-size: 1.5rem;
    }

    .cta-actions {
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
    }

    .cta-actions .primary-btn {
      width: 100%;
      max-width: 280px;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 1.5rem;
      overflow-wrap: break-word;
    }

    .main-content {
      padding: 1.5rem 1rem;
    }

    .cta-content h2 {
      font-size: 1.25rem;
    }
  }
</style>
