<!-- src/routes/get-involved/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  console.log('Get involved hub page loading...');

  $: currentLocale = $locale;

  // Simple fallback text
  const fallbackText = {
    title: 'Get Involved',
    subtitle: 'Join our global community building better governance systems',
    heroIntro: 'Choose how you\'d like to contribute to creating tools that enable different governance systems to communicate, collaborate, and evolve together.',
    
    translationTitle: 'Translation',
    translationDescription: 'Help make global governance frameworks accessible worldwide by translating content into your language.',
    translationCta: 'Start Translating',
    
    websiteTitle: 'Website Development',
    websiteDescription: 'Contribute to our technical infrastructure, build new features, and improve the platform that powers our mission.',
    websiteCta: 'Join Developers',
    
    outreachTitle: 'Community & Outreach',
    outreachDescription: 'Spread our vision, build advocacy networks, and connect with communities that can benefit from our frameworks.',
    outreachCta: 'Build Community',
    
    frameworksTitle: 'Framework Development',
    frameworksDescription: 'Create new governance frameworks and tools that address real-world challenges in your area of expertise.',
    frameworksCta: 'Create Frameworks',
    
    whyContribute: 'Why contribute?',
    whyText: 'The governance challenges facing humanity require collaborative innovation. Your unique skills, perspective, and experience can help create the tools and networks needed for more cooperative, effective governance systems worldwide.',
    
    globalImpact: 'Global impact',
    globalText: 'Join contributors from around the world working to build infrastructure that enables different governance systems to interoperate and evolve together.',
    
    getStarted: 'Ready to get started?',
    getStartedText: 'Every contribution matters, whether it\'s translating a single page, fixing a bug, sharing content, or developing a comprehensive framework.'
  };

  // Simple text function - try multiple ways to get translations
  function getText(key) {
    // Try the translation system with the correct nested path
    let value = $t(`getInvolved.${key}`);
   
    // If we get a value, use it, otherwise use fallback
    if (value && value !== '') {
      return value;
    }
    
    // Fallback to hardcoded text
    return fallbackText[key] || key;
  }

  onMount(() => {
    console.log('Get involved hub page mounted successfully');
  });
</script>

<svelte:head>
  <title>{getText('title')} - Global Governance Framework</title>
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

    <!-- Contribution Cards -->
    <div class="contribution-cards">
      
      <!-- Translation Card -->
      <a href="{base}/get-involved/translations" class="contribution-card translation-card">
        <div class="card-icon">🌍</div>
        <div class="card-content">
          <h3>{getText('translationTitle')}</h3>
          <p>{getText('translationDescription')}</p>
          <div class="card-cta">
            {getText('translationCta')} <span class="arrow">→</span>
          </div>
        </div>
      </a>

      <!-- Website Development Card -->
      <a href="{base}/get-involved/website" class="contribution-card website-card">
        <div class="card-icon">💻</div>
        <div class="card-content">
          <h3>{getText('websiteTitle')}</h3>
          <p>{getText('websiteDescription')}</p>
          <div class="card-cta">
            {getText('websiteCta')} <span class="arrow">→</span>
          </div>
        </div>
      </a>

      <!-- Outreach Card -->
      <a href="{base}/get-involved/outreach" class="contribution-card outreach-card">
        <div class="card-icon">📢</div>
        <div class="card-content">
          <h3>{getText('outreachTitle')}</h3>
          <p>{getText('outreachDescription')}</p>
          <div class="card-cta">
            {getText('outreachCta')} <span class="arrow">→</span>
          </div>
        </div>
      </a>

      <!-- Framework Development Card -->
      <a href="{base}/get-involved/frameworks" class="contribution-card frameworks-card">
        <div class="card-icon">📋</div>
        <div class="card-content">
          <h3>{getText('frameworksTitle')}</h3>
          <p>{getText('frameworksDescription')}</p>
          <div class="card-cta">
            {getText('frameworksCta')} <span class="arrow">→</span>
          </div>
        </div>
      </a>

    </div>

    <!-- Why Contribute Section -->
    <div class="info-section">
      <div class="info-grid">
        <div class="info-card">
          <h3>{getText('whyContribute')}</h3>
          <p>{getText('whyText')}</p>
        </div>
        <div class="info-card">
          <h3>{getText('globalImpact')}</h3>
          <p>{getText('globalText')}</p>
        </div>
      </div>
    </div>

    <!-- Bottom Call-to-Action -->
    <div class="bottom-cta">
      <div class="cta-content">
        <h2>{getText('getStarted')}</h2>
        <p>{getText('getStartedText')}</p>
      </div>
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
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.85;
  }

  /* Contribution Cards */
  .contribution-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .contribution-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .contribution-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    transition: all 0.3s ease;
  }

  .contribution-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .translation-card::before {
    background: var(--earthy-green);
  }

  .website-card::before {
    background: var(--primary-blue);
  }

  .outreach-card::before {
    background: var(--warm-gold);
  }

  .frameworks-card::before {
    background: var(--secondary-purple);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-blue);
  }

  .card-content p {
    color: var(--content-text);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .card-cta {
    font-weight: 600;
    color: var(--primary-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.1rem;
  }

  .arrow {
    transition: transform 0.3s ease;
  }

  .contribution-card:hover .arrow {
    transform: translateX(4px);
  }

  /* Info Section */
  .info-section {
    margin-bottom: 3rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .info-card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
  }

  .info-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-blue);
  }

  .info-card p {
    color: var(--content-text);
    line-height: 1.7;
  }

  /* Bottom CTA */
  .bottom-cta {
    background: linear-gradient(135deg, var(--earthy-green), var(--primary-blue));
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    color: white;
  }

  .cta-content h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .cta-content p {
    font-size: 1.125rem;
    line-height: 1.6;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }

    .hero-section {
      padding: 2rem 1.5rem;
      margin-bottom: 2rem;
    }

    .hero-content h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .hero-intro {
      font-size: 1rem;
    }

    .contribution-cards {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .contribution-card {
      padding: 1.5rem;
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .info-card {
      padding: 1.5rem;
    }

    .bottom-cta {
      padding: 2rem 1.5rem;
    }

    .cta-content h2 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .card-content h3 {
      font-size: 1.25rem;
    }
  }
</style>
