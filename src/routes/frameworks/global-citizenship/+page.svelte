<!-- src/routes/frameworks/global-citizenship/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import PersonalizationQuiz from './components/PersonalizationQuiz.svelte';
  import CitizenshipCompass from './components/CitizenshipCompass.svelte';
  import FrameworkRecommendations from './components/FrameworkRecommendations.svelte';
  import FoundationMessage from './components/FoundationMessage.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import { onMount } from 'svelte';
  
  let showQuiz = false;
  let quizResults = null;
  
  onMount(() => {
    // Check if user has already taken the quiz
    const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
    if (savedQuiz) {
      quizResults = JSON.parse(savedQuiz);
    } else {
      showQuiz = true;
    }
  });
  
  function handleQuizComplete(results) {
    quizResults = results;
    showQuiz = false;
    localStorage.setItem('globalCitizenshipQuiz', JSON.stringify(results));
  }
  
  function resetQuiz() {
    showQuiz = true;
    quizResults = null;
    localStorage.removeItem('globalCitizenshipQuiz');
  }
</script>

<svelte:head>
  <title>{$t('globalCitizenship.meta.title')} - Global Governance Framework</title>
  <meta name="description" content="{$t('globalCitizenship.meta.description')}" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>{$t('globalCitizenship.hero.title')}</h1>
      <p class="hero-subtitle">{$t('globalCitizenship.hero.subtitle')}</p>
      <p class="hero-description">{$t('globalCitizenship.hero.description')}</p>
      {#if showQuiz}
        <button class="button-gold" on:click={() => document.querySelector('.quiz-section')?.scrollIntoView({ behavior: 'smooth' })}>
          {$t('globalCitizenship.cta.beginJourney')}
        </button>
      {/if}
      {#if quizResults}
        <button class="button-outline" on:click={resetQuiz}>
          {$t('globalCitizenship.hero.retakeQuiz')}
        </button>
      {/if}
    </div>
  </div>
</section>

<!-- Quiz or Main Content -->
{#if showQuiz}
  <PersonalizationQuiz on:complete={(e) => handleQuizComplete(e.detail)} />
{:else}
  <!-- Framework Recommendations -->
  {#if quizResults}
    <FrameworkRecommendations {quizResults} />
  {/if}

  <!-- Interactive Compass -->
  <section class="compass-section">
    <div class="container">
      <div class="compass-header">
        <h2>{$t('globalCitizenship.compass.title')}</h2>
        <p>{$t('globalCitizenship.compass.description')}</p>
        <a href="{base}/frameworks/global-citizenship/full-framework" class="link-subtle">
          {$t('globalCitizenship.compass.readMore')} →
        </a>
      </div>
      <CitizenshipCompass {quizResults} />
    </div>
  </section>
  
  <section class="spiral-dynamics-invitation">
    <div class="container">
      <div class="spiral-content">
        <div class="spiral-text">
          <h3>{$t('globalCitizenship.spiralDynamics.invitation.title')}</h3>
          <p>{$t('globalCitizenship.spiralDynamics.invitation.description1')}</p>
          <p>{$t('globalCitizenship.spiralDynamics.invitation.description2')}</p>
          <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="spiral-link">
            {$t('globalCitizenship.spiralDynamics.invitation.linkText')} → 
          </a>
        </div>
        <div class="spiral-visual">
          <div class="spiral-icon">🌀</div>
          <div class="spiral-stages">
            <div class="first-tier-stages">
              <span class="stage beige">{$t('globalCitizenship.spiralDynamics.stages.beige')}</span>
              <span class="stage purple">{$t('globalCitizenship.spiralDynamics.stages.purple')}</span>
              <span class="stage red">{$t('globalCitizenship.spiralDynamics.stages.red')}</span>
              <span class="stage blue">{$t('globalCitizenship.spiralDynamics.stages.blue')}</span>
              <span class="stage orange">{$t('globalCitizenship.spiralDynamics.stages.orange')}</span>
              <span class="stage green">{$t('globalCitizenship.spiralDynamics.stages.green')}</span>
            </div>
            <div class="tier-divider">
              <span class="divider-line"></span>
              <span class="tier-label">{$t('globalCitizenship.spiralDynamics.tiers.second')}</span>
              <span class="divider-line"></span>
            </div>
            <div class="second-tier-stages">
              <span class="stage yellow">{$t('globalCitizenship.spiralDynamics.stages.yellow')}</span>
              <span class="stage turquoise">{$t('globalCitizenship.spiralDynamics.stages.turquoise')}</span>
              <span class="stage coral">{$t('globalCitizenship.spiralDynamics.stages.coral')}</span>
            </div>
            <div class="tier-divider">
              <span class="divider-line"></span>
              <span class="tier-label">{$t('globalCitizenship.spiralDynamics.tiers.third')}</span>
              <span class="divider-line"></span>
            </div>
            <div class="third-tier-stages">
              <span class="stage ultra-violet">{$t('globalCitizenship.spiralDynamics.stages.ultraviolet')}</span>
              <span class="stage clear">{$t('globalCitizenship.spiralDynamics.stages.clear')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Foundation Message -->
  <FoundationMessage />
  
  <!-- Framework Connections -->
  <section class="frameworks-section">
    <div class="container">
      <h2>{$t('globalCitizenship.frameworks.title')}</h2>
      <p class="section-description">{$t('globalCitizenship.frameworks.description')}</p>
      
      <div class="frameworks-grid">
        <!-- Tier 0 -->
        <div class="framework-tier tier-0">
          <h3>{$t('globalCitizenship.frameworks.tier0.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier0.description')}</p>
          <a href="{base}/frameworks/docs/implementation/treaty-for-our-only-home" class="framework-link">
            {$t('globalCitizenship.frameworks.tier0.link')} →
          </a>
        </div>
        
        <!-- Tier 1 -->
        <div class="framework-tier tier-1">
          <h3>{$t('globalCitizenship.frameworks.tier1.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier1.description')}</p>
          <div class="framework-links">
            <a href="{base}/frameworks/docs/implementation/energy">{$t('globalCitizenship.frameworks.tier1.climate')}</a>
            <a href="{base}/frameworks/docs/implementation/peace">{$t('globalCitizenship.frameworks.tier1.peace')}</a>
             <a href="{base}/frameworks/docs/implementation/indigenous">{$t('globalCitizenship.frameworks.tier1.indigenous')}</a>
            <a href="{base}/frameworks/docs/implementation/tier-1">{$t('globalCitizenship.frameworks.tier1.viewAll')} →</a>
          </div>
        </div>
        
        <!-- Tier 2 -->
        <div class="framework-tier tier-2">
          <h3>{$t('globalCitizenship.frameworks.tier2.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier2.description')}</p>
          <div class="framework-links">
            <a href="{base}/frameworks/docs/implementation/technology">{$t('globalCitizenship.frameworks.tier2.technology')}</a>
            <a href="{base}/frameworks/docs/implementation/education">{$t('globalCitizenship.frameworks.tier2.education')}</a>
            <a href="{base}/frameworks/docs/implementation/financial-systems">{$t('globalCitizenship.frameworks.tier2.finance')}</a>
            <a href="{base}/frameworks/docs/implementation/tier-2">{$t('globalCitizenship.frameworks.tier2.viewAll')} →</a>
          </div>
        </div>
        
        <!-- Tier 3 & 4 -->
        <div class="framework-tier tier-3">
          <h3>{$t('globalCitizenship.frameworks.tier3.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier3.description')}</p>
          <div class="framework-links">
            <a href="{base}/frameworks/docs/implementation/digital">{$t('globalCitizenship.frameworks.tier3.digital')}</a>
            <a href="{base}/frameworks/docs/implementation/culture">{$t('globalCitizenship.frameworks.tier3.culture')}</a>
            <a href="{base}/frameworks/docs/implementation/consciousness">{$t('globalCitizenship.frameworks.tier4.consciousness')}</a>
            <a href="{base}/frameworks/docs/implementation/tier-3">{$t('globalCitizenship.frameworks.tier3.viewAll')} →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Call to Action -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>{$t('globalCitizenship.cta.title')}</h2>
        <p>{$t('globalCitizenship.cta.description')}</p>
        <div class="cta-buttons">
          <a href="{base}/frameworks/docs" class="button-gold">
            {$t('globalCitizenship.cta.exploreFrameworks')}
          </a>
          <a href="{base}/frameworks/global-citizenship/full-framework" class="button-outline">
             {$t('globalCitizenship.cta.readTheFramework')}
          </a>
          <a href="{base}/contact" class="button-outline">
            {$t('globalCitizenship.cta.getInvolved')}
          </a>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- For Global Citizenship page -->
<ShareButtons 
  title="Global Citizenship Framework"
  hashtags="GlobalCitizenship,SpiralDynamics,PlanetaryGovernance"
  position="left"
/>

<style>
  /* Hero Section */
  .hero {
    padding: 4rem 0;
    background: linear-gradient(135deg, #2B4B8C 0%, #6B5CA5 100%);
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #E0F2FE;
  }
  
  .hero-description {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #F0F9FF;
  }
  
  /* Compass Section */
  .compass-section {
    padding: 4rem 0;
    background: linear-gradient(to bottom, #F8FAFC, #E0F2FE);
  }
  
  .compass-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .compass-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .compass-header p {
    font-size: 1.25rem;
    color: #4B5563;
    max-width: 600px;
    margin: 0 auto;
  }

  .link-subtle {
    display: inline-block;
    margin-top: 1rem;
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid rgba(218, 165, 32, 0.5); /* Subtle gold underline */
    transition: all 0.2s ease;
  }

  .link-subtle:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
  }
  
  /* Spiral Dynamics Section */
  .spiral-dynamics-invitation {
    padding: 3rem 0;
    background: linear-gradient(135deg, #FEF7ED 0%, #F3E8FF 100%);
    margin: 2rem 0;
  }

  .spiral-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .spiral-text h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }

  .spiral-text p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .spiral-link {
    display: inline-block;
    color: #2B4B8C;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background: rgba(218, 165, 32, 0.1);
    border-radius: 8px;
    border: 2px solid #DAA520;
    transition: all 0.3s ease;
  }

  .spiral-link:hover {
    background: #DAA520;
    color: white;
    transform: translateY(-2px);
  }

  .spiral-visual {
    text-align: center;
  }

  .spiral-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .spiral-stages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }

  .first-tier-stages,
  .second-tier-stages,
  .third-tier-stages {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }

  .tier-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    margin: 0.5rem 0;
  }

  .divider-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #9CA3AF, transparent);
  }

  .tier-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border: 1px solid #E5E7EB;
  }

  .stage {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }

  .stage.beige { background: #8B7355; }
  .stage.purple { background: #8B5A96; }
  .stage.red { background: #DC2626; }
  .stage.blue { background: #2563EB; }
  .stage.orange { background: #EA580C; }
  .stage.green { background: #16A34A; }
  .stage.yellow { background: #EAB308; }
  .stage.turquoise { background: #0D9488; }
  .stage.coral { background: #FF7F7F; }
  .stage.ultra-violet { background: #8A2BE2; }
  .stage.clear { 
    background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 50%, #E6E6FA 100%); 
    color: #4B5563;
    border: 2px solid #D1D5DB;
    text-shadow: none;
  }
  
  /* Frameworks Section */
  .frameworks-section {
    padding: 4rem 0;
    background: white;
  }
  
  .frameworks-section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .section-description {
    font-size: 1.25rem;
    color: #4B5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 3rem auto;
  }
  
  .frameworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .framework-tier {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 4px solid;
  }
  
  .framework-tier:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .tier-0 {
    border-top-color: #8B5A3C;
    background: linear-gradient(135deg, #FEF7ED, #FDF2E9);
  }
  
  .tier-1 {
    border-top-color: #DC2626;
  }
  
  .tier-2 {
    border-top-color: #2563EB;
  }
  
  .tier-3 {
    border-top-color: #7C3AED;
  }
  
  .framework-tier h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1F2937;
  }
  
  .framework-tier p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .framework-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .framework-links a,
  .framework-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  
  .framework-links a:hover,
  .framework-link:hover {
    color: #DAA520;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #E9F2E9, #F0FDF4);
  }
  
  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.25rem;
    color: #4B5563;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Buttons */
  .button-gold,
  .button-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 1.1rem;
  }
  
  .button-gold {
    background-color: #DAA520;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .button-gold:hover {
    background-color: #B8860B;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .button-outline {
    background-color: transparent;
    color: #2B4B8C;
    border: 2px solid #2B4B8C;
  }
  
  .button-outline:hover {
    background-color: #2B4B8C;
    color: white;
    transform: translateY(-2px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
    }
    
    .hero-description {
      font-size: 1.1rem;
    }
    
    .compass-header h2,
    .frameworks-section h2,
    .cta-content h2 {
      font-size: 2rem;
    }
    
    .frameworks-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .button-gold,
    .button-outline {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
</style>
