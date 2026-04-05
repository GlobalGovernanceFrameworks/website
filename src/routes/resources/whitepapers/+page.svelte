<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidateAll } from '$app/navigation';
  import { goto } from '$app/navigation';
  import Follow from '$lib/components/Follow.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  
  export let data;
  
  // Get the current language from load data
  $: currentLang = data.currentLocale || 'en';

  // Reactive update when locale changes
  $: if (browser && $locale) {
    invalidateAll();
  }

  $: if (browser && $locale && $page.url.searchParams.get('lang') !== $locale) {
    const url = new URL($page.url);
    url.searchParams.set('lang', $locale);
    goto(url.toString(), { replaceState: true, noScroll: true });
  }
  
  // Helper function for translations
  function getWhitepaperTranslation(key, fallback) {
    if (browser) {
      return $t(`whitepapers.${key}`) || fallback;
    }
    return fallback;
  }

  // Destructure the new data structure
  $: ({ omegaProof, modelEvaluation, itp, regularPapers } = data);

  function getStatusInfo(status) {
    const statusMap = {
      published: { color: '#16a34a', bgColor: '#dcfce7', icon: '✅', label: 'Published' },
      draft: { color: '#eab308', bgColor: '#fef3c7', icon: '📝', label: 'Draft' },
      review: { color: '#3b82f6', bgColor: '#dbeafe', icon: '👁️', label: 'In Review' },
      archived: { color: '#6b7280', bgColor: '#f3f4f6', icon: '📁', label: 'Archived' }
    };
    return statusMap[status] || statusMap.draft;
  }

  function getCategoryInfo(category) {
    const categoryMap = {
      methodology: { color: '#1E40AF', icon: '🔬' },
      governance: { color: '#2B4B8C', icon: '🏛️' },
      economics: { color: '#2D5F2D', icon: '💰' },
      technology: { color: '#7C2D12', icon: '⚙️' },
      philosophy: { color: '#6B5CA5', icon: '🤔' },
      policy: { color: '#DC2626', icon: '📋' }
    };
    return categoryMap[category] || { color: '#6b7280', icon: '📄' };
  }
  
  function scrollToFollow() {
    const followSection = document.getElementById('follow-section');
    if (followSection) {
      followSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
</script>

<svelte:head>
  <title>{getWhitepaperTranslation('title', 'White Papers')} - Global Governance Framework</title>
  <meta name="description" content="Explore our collection of research white papers on global governance, regenerative systems, and planetary solutions." />
  <meta property="og:title" content="{getWhitepaperTranslation('title', 'White Papers')} - Global Governance Framework" />
  <meta property="og:description" content="Research publications exploring methodologies for addressing the global polycrisis." />
</svelte:head>

<div class="container">
  <nav class="breadcrumb">
    <a href="{base}/resources" class="breadcrumb-link">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      {getWhitepaperTranslation('breadcrumb.resources', 'Resources')}
    </a>
    <span class="breadcrumb-separator">→</span>
    <span class="breadcrumb-current">{getWhitepaperTranslation('breadcrumb.whitepapers', 'White Papers')}</span>
  </nav>

  <div class="whitepapers-header">
    <h1>{getWhitepaperTranslation('title', 'White Papers')}</h1>
    <p class="whitepapers-subtitle">
      {getWhitepaperTranslation('subtitle', 'Research publications exploring methodologies and frameworks for addressing complex systemic challenges')}
    </p>
  </div>
  
  <!-- Omega Proof - Flagship Research -->
  {#if omegaProof}
    <div class="omega-hero-wrapper">
      <div class="omega-hero-card">
        <div class="omega-content">
          <div class="omega-badges">
            <span class="omega-badge featured">{getWhitepaperTranslation('omega.badges.featured', 'FEATURED RESEARCH')}</span>
            <span class="omega-badge status">{getWhitepaperTranslation('omega.badges.status', 'Completed Jan 2026')}</span>
          </div>
          
          <h2>
            <a href="{base}/resources/whitepapers/omega-proof" style="color: inherit; text-decoration: none;">
              {omegaProof.meta.title}
            </a>
          </h2>
          
          <p class="omega-subtitle">{omegaProof.meta.subtitle}</p>
          <p class="omega-desc">
            {getWhitepaperTranslation('omega.description', 'We used adversarial AI to simulate the four veto-players in the Ukraine war. They unanimously rejected a mathematically optimal peace deal. This is the autopsy of why peace is architecturally impossible under current rules.')}
          </p>
          
          <div class="omega-actions">
            <div class="button-row">
              <a href="{base}/resources/whitepapers/omega-proof" class="omega-btn">
                {getWhitepaperTranslation('omega.actions.read', 'Read the Analysis')} →
              </a>
              {#if omegaProof.meta.pdfPath}
                <a href="{omegaProof.meta.pdfPath}" class="omega-btn secondary" download>
                  <span class="icon">📥</span> {getWhitepaperTranslation('omega.actions.download', 'Download PDF')}
                </a>
              {/if}
            </div>
            <span class="omega-meta">{getWhitepaperTranslation('omega.meta', '65 Pages • 13 Research Docs • 4 Terminal Bugs')}</span>
          </div>
        </div>
        
        <div class="omega-visual">
          <div class="visual-placeholder">Ω</div>
        </div>
      </div>
    </div>
  {/if}

  <!-- ITP - Technical Whitepaper -->
  {#if itp}
    <div class="itp-hero-wrapper">
      <div class="itp-hero-card">
        <div class="itp-content">
          <div class="itp-badges">
            <span class="itp-badge featured">{getWhitepaperTranslation('itp.badges.featured', 'TECHNICAL WHITEPAPER')}</span>
            <span class="itp-badge status">{getWhitepaperTranslation('itp.badges.status', 'April 2026')}</span>
          </div>
          
          <h2>
            <a href="{base}/resources/whitepapers/immanent-trust-protocol" style="color: inherit; text-decoration: none;">
              {itp.meta.title}
            </a>
          </h2>
          
          <p class="itp-subtitle">{itp.meta.subtitle}</p>
          <p class="itp-desc">
            {getWhitepaperTranslation('itp.description', 'Trust computed at the edge. Sybil rings mathematically collapsed. Coordination structures that auto-dissolve. A viable substrate for bioregional governance without global ledgers.')}
          </p>
          
          <div class="itp-actions">
            <div class="button-row">
              <a href="{base}/resources/whitepapers/immanent-trust-protocol" class="itp-btn">
                {getWhitepaperTranslation('itp.actions.read', 'Read the Paper')} →
              </a>
              <a href="{base}/resources/whitepapers/immanent-trust-protocol/in-simple-terms" class="itp-btn secondary">
                {getWhitepaperTranslation('itp.actions.simple', 'In Simple Terms')}
              </a>
            </div>
            <span class="itp-meta">{getWhitepaperTranslation('itp.meta', '~90 min read • 13 Sections • 5 Appendices • Simulation Code')}</span>
          </div>
        </div>
        
        <div class="itp-visual">
          <div class="itp-visual-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" stroke-width="1.5"/>
              <path stroke-linecap="round" stroke-width="1.5" d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m12.14 0l-2.83-2.83M9.76 9.76L6.93 6.93"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Model Evaluation - Featured Methodology -->
  {#if modelEvaluation}
    <div class="methodology-hero-wrapper">
      <div class="methodology-hero-card">
        <div class="methodology-content">
          <div class="methodology-badges">
            <span class="methodology-badge featured">{getWhitepaperTranslation('modelEvaluation.badges.featured', 'FEATURED RESEARCH')}</span>
            <span class="methodology-badge status">{getWhitepaperTranslation('modelEvaluation.badges.status', 'Completed Jan 2026')}</span>
          </div>
          
          <h2>
            <a href="{base}/resources/whitepapers/model-evaluation" style="color: inherit; text-decoration: none;">
              {modelEvaluation.meta.title}
            </a>
          </h2>
          
          <p class="methodology-subtitle">{modelEvaluation.meta.subtitle}</p>
          <p class="methodology-desc">
            {getWhitepaperTranslation('modelEvaluation.description', 'Six leading AI models tackle the same civilizational challenge. Which architectural approach proves most robust? An empirical validation of cognitive diversity in AI collaboration.')}
          </p>
          
          <div class="methodology-actions">
            <div class="button-row">
              <a href="{base}/resources/whitepapers/model-evaluation" class="methodology-btn">
                {getWhitepaperTranslation('modelEvaluation.actions.read', 'Read Full Analysis')} →
              </a>
              <a href="{base}/resources/whitepapers/model-evaluation#executive-summary" class="methodology-btn secondary">
                {getWhitepaperTranslation('modelEvaluation.actions.summary', 'Quick Summary')}
              </a>
            </div>
            <span class="methodology-meta">{getWhitepaperTranslation('modelEvaluation.meta', '~25 min read • 6 AI Models • 5 Sections')}</span>
          </div>
        </div>
        
        <div class="methodology-visual">
          <div class="visual-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Regular Papers Section -->
  {#if regularPapers && regularPapers.length > 0}
    <div class="papers-section">
      <div class="papers-count">
        {regularPapers.length} {regularPapers.length === 1 ? getWhitepaperTranslation('papersCount.single', 'other paper') : getWhitepaperTranslation('papersCount.plural', 'other papers')} {getWhitepaperTranslation('papersCount.found', 'found')}
      </div>
      
      <div class="papers-list">
        {#each regularPapers as paper, index}
          <article class="paper-card">
            <div class="paper-header">
              <div class="paper-badges">
                {#if paper.meta.status}
                  {@const statusInfo = getStatusInfo(paper.meta.status)}
                  <div class="status-badge" style="color: {statusInfo.color}; background-color: {statusInfo.bgColor};">
                    <span class="badge-icon">{statusInfo.icon}</span>
                    <span class="badge-text">{getWhitepaperTranslation(`status.${paper.meta.status}`, statusInfo.label)}</span>
                  </div>
                {/if}
                {#if paper.meta.category}
                  {@const categoryInfo = getCategoryInfo(paper.meta.category)}
                  <div class="category-badge" style="background-color: {categoryInfo.color};">
                    <span class="badge-icon">{categoryInfo.icon}</span>
                    <span class="badge-text">{getWhitepaperTranslation(`categories.${paper.meta.category}`, paper.meta.category)}</span>
                  </div>
                {/if}
              </div>
            </div>

            <div class="paper-content">
              <h2 class="paper-title">
                <a href="{base}/resources/whitepapers/{paper.slug}?lang={currentLang}" class="title-link">
                  {paper.meta.title}
                </a>
              </h2>
              
              <p class="paper-meta">
                <svg class="meta-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {new Date(paper.meta.date).toLocaleDateString(currentLang === 'sv' ? 'sv-SE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              
              <p class="paper-description">{paper.meta.description}</p>
              
              <div class="paper-actions">
                <a href="{base}/resources/whitepapers/{paper.slug}?lang={currentLang}" class="action-button primary">
                  <span class="button-icon">👁️</span>
                  {getWhitepaperTranslation('actions.readOnline', 'Read')}
                </a>
                {#if paper.meta.pdfPath}
                  <a href="{paper.meta.pdfPath}" class="action-button secondary" download>
                    <span class="button-icon">📥</span> PDF
                  </a>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
      
      <div class="strategic-follow" id="follow-section">
        <div class="follow-intro">
          <h3>{getWhitepaperTranslation('strategicFollow.title', 'Interested in our research?')}</h3>
          <p>{getWhitepaperTranslation('strategicFollow.subtitle', 'Stay connected to receive updates on new white papers and research publications.')}</p>
        </div>
        <Follow />
      </div>
    </div>
  {:else}
    <div class="no-papers">
      <div class="no-papers-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3>{getWhitepaperTranslation('noPapers.title', 'No white papers found')}</h3>
      <p>
        {getWhitepaperTranslation('noPapers.message', `No white papers found for the selected language (${currentLang}). Try switching to a different language using the language selector in the header.`).replace('{language}', currentLang)}
      </p>
      <p class="follow-prompt">
        {getWhitepaperTranslation('noPapers.followPrompt', 'Follow us to get notified when we publish new research!')}
      </p>
    </div>
    <Follow />
  {/if}
</div>

<style>
  /* --- Omega Hero Styles (Dark/Dramatic) --- */
  .omega-hero-wrapper {
    margin-bottom: 2rem;
  }

  .omega-hero-card {
    display: flex;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border-radius: 1rem;
    overflow: hidden;
    text-decoration: none;
    color: white;
    box-shadow: 0 20px 40px -10px rgba(30, 27, 75, 0.4);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .omega-hero-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px -12px rgba(30, 27, 75, 0.5);
  }

  .omega-content {
    flex: 2;
    padding: 3rem;
  }

  .omega-visual {
    flex: 1;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(255,255,255,0.1);
  }

  .visual-placeholder {
    font-size: 8rem;
    font-weight: 800;
    color: rgba(255,255,255,0.1);
    font-family: serif;
  }

  .omega-badges {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .omega-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .omega-badge.featured {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .omega-badge.status {
    background: rgba(100, 116, 139, 0.2);
    color: #cbd5e1;
    border: 1px solid rgba(100, 116, 139, 0.3);
  }

  .omega-content h2 {
    font-size: 2rem;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }

  .omega-subtitle {
    font-size: 1.125rem;
    color: rgba(255,255,255,0.7);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .omega-desc {
    color: rgba(255,255,255,0.85);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .omega-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .button-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .omega-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .omega-btn:not(.secondary) {
    background: white;
    color: #1e1b4b;
  }

  .omega-btn:not(.secondary):hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }

  .omega-btn.secondary {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .omega-btn.secondary:hover {
    background: rgba(255,255,255,0.15);
  }

  .omega-meta {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    font-family: monospace;
  }

  /* --- ITP Hero Styles (Teal/Trust) --- */
  .itp-hero-wrapper {
    margin-bottom: 4rem;
  }

  .itp-hero-card {
    display: flex;
    background: linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%);
    border-radius: 1rem;
    overflow: hidden;
    color: white;
    box-shadow: 0 20px 40px -10px rgba(15, 118, 110, 0.4);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .itp-hero-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px -12px rgba(15, 118, 110, 0.5);
  }

  .itp-content {
    flex: 2;
    padding: 3rem;
  }

  .itp-visual {
    flex: 1;
    background: rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(255,255,255,0.1);
  }

  .itp-visual-icon {
    width: 8rem;
    height: 8rem;
    color: rgba(255,255,255,0.2);
  }

  .itp-badges {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .itp-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .itp-badge.featured {
    background: rgba(45, 212, 191, 0.2);
    color: #99f6e4;
    border: 1px solid rgba(45, 212, 191, 0.3);
  }

  .itp-badge.status {
    background: rgba(100, 116, 139, 0.2);
    color: #cbd5e1;
    border: 1px solid rgba(100, 116, 139, 0.3);
  }

  .itp-content h2 {
    font-size: 2rem;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }

  .itp-subtitle {
    font-size: 1.125rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .itp-desc {
    color: rgba(255,255,255,0.9);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .itp-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .itp-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .itp-btn:not(.secondary) {
    background: white;
    color: #0f766e;
  }

  .itp-btn:not(.secondary):hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }

  .itp-btn.secondary {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .itp-btn.secondary:hover {
    background: rgba(255,255,255,0.15);
  }

  .itp-meta {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.7);
    font-family: monospace;
  }

  /* --- Methodology Hero Styles (Blue/Tech) --- */
  .methodology-hero-wrapper {
    margin-bottom: 4rem;
  }

  .methodology-hero-card {
    display: flex;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    border-radius: 1rem;
    overflow: hidden;
    color: white;
    box-shadow: 0 20px 40px -10px rgba(30, 58, 138, 0.4);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .methodology-hero-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px -12px rgba(30, 58, 138, 0.5);
  }

  .methodology-content {
    flex: 2;
    padding: 3rem;
  }

  .methodology-visual {
    flex: 1;
    background: rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(255,255,255,0.1);
  }

  .visual-icon {
    width: 8rem;
    height: 8rem;
    color: rgba(255,255,255,0.2);
  }

  .methodology-badges {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .methodology-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .methodology-badge.featured {
    background: rgba(96, 165, 250, 0.2);
    color: #bfdbfe;
    border: 1px solid rgba(96, 165, 250, 0.3);
  }

  .methodology-badge.status {
    background: rgba(100, 116, 139, 0.2);
    color: #cbd5e1;
    border: 1px solid rgba(100, 116, 139, 0.3);
  }

  .methodology-content h2 {
    font-size: 2rem;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }

  .methodology-subtitle {
    font-size: 1.125rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .methodology-desc {
    color: rgba(255,255,255,0.9);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .methodology-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .methodology-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .methodology-btn:not(.secondary) {
    background: white;
    color: #1e3a8a;
  }

  .methodology-btn:not(.secondary):hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }

  .methodology-btn.secondary {
    background: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .methodology-btn.secondary:hover {
    background: rgba(255,255,255,0.15);
  }

  .methodology-meta {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.7);
    font-family: monospace;
  }

  /* --- Common Styles --- */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.875rem;
  }

  .breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #6B7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb-link:hover {
    color: #2B4B8C;
  }

  .breadcrumb-link svg {
    width: 1rem;
    height: 1rem;
  }

  .breadcrumb-separator {
    color: #9CA3AF;
  }

  .breadcrumb-current {
    color: #2B4B8C;
    font-weight: 500;
  }
  
  /* Header */
  .whitepapers-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .whitepapers-header h1 {
    font-size: 2.5rem;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }
  
  .whitepapers-subtitle {
    font-size: 1.125rem;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* No Papers State */
  .no-papers {
    text-align: center;
    padding: 3rem 2rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    margin: 2rem 0;
    border: 2px dashed #d1d5db;
  }
  
  .no-papers-icon {
    width: 4rem;
    height: 4rem;
    color: #9CA3AF;
    margin: 0 auto 1rem;
  }
  
  .no-papers h3 {
    font-size: 1.5rem;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .no-papers p {
    color: #6b7280;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  .follow-prompt {
    font-weight: 500;
    color: #2B4B8C !important;
    margin-top: 1rem !important;
  }
  
  /* Papers List */
  .papers-count {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .papers-list {
    display: grid;
    gap: 1.5rem;
  }
  
  /* Paper Cards */
  .paper-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: all 0.2s ease-in-out;
  }
  
  .paper-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }

  .paper-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .status-badge,
  .category-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .category-badge {
    color: white;
  }

  .paper-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  .title-link {
    font-weight: 700;
    color: #1e293b;
    text-decoration: none;
    line-height: 1.3;
    transition: color 0.2s;
  }

  .title-link:hover {
    color: #1E40AF;
  }
  
  .paper-meta {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .meta-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .paper-description {
    color: #475569;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .paper-actions {
    display: flex;
    gap: 0.75rem;
  }

  .action-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s ease;
  }

  .action-button.primary {
    background: white;
    color: #1E40AF;
    border: 1px solid #1E40AF;
  }

  .action-button.primary:hover {
    background: #eff6ff;
  }

  .action-button.secondary {
    background: white;
    color: #475569;
    border: 1px solid #d1d5db;
  }

  .action-button.secondary:hover {
    background: #f8fafc;
    border-color: #9ca3af;
  }

  .strategic-follow {
    margin: 4rem 0;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .follow-intro {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .follow-intro h3 {
    font-size: 1.5rem;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }
  
  .follow-intro p {
    color: #6B7280;
    font-size: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .omega-hero-card,
    .methodology-hero-card {
      flex-direction: column;
    }

    .omega-visual,
    .methodology-visual {
      border-left: none;
      border-top: 1px solid rgba(255,255,255,0.1);
      min-height: 150px;
    }

    .omega-content,
    .methodology-content {
      padding: 2rem;
    }

    .visual-placeholder {
      font-size: 4rem;
    }

    .visual-icon {
      width: 4rem;
      height: 4rem;
    }

    .omega-content h2,
    .methodology-content h2 {
      font-size: 1.5rem;
    }

    .itp-hero-card {
      flex-direction: column;
    }

    .itp-visual {
      border-left: none;
      border-top: 1px solid rgba(255,255,255,0.1);
      min-height: 150px;
    }

    .itp-content {
      padding: 2rem;
    }

    .itp-content h2 {
      font-size: 1.5rem;
    }
  }
</style>
