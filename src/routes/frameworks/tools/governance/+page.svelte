<!-- src/routes/frameworks/tools/governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/governance/${toolName}`;
    }
    
    // For tools that might have language variations
    if (['decidetogether-platform-guide',
         'stakeholder-engagement-charter',
         'community-well-being-index'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Governance Tools",
      subtitle: "Essential tools for democratic participation and community coordination",
      intro: "These governance tools are designed to facilitate inclusive decision-making, stakeholder engagement, and community coordination across all frameworks. From digital democracy platforms to well-being metrics, these resources help create more participatory and accountable governance systems.",
      coreToolsTitle: "Core Governance Tools",
      coreToolsDesc: "Essential tools for democratic participation, stakeholder engagement, and transparent decision-making processes.",
      monitoringTitle: "Monitoring & Evaluation Tools",
      monitoringDesc: "Resources to track community well-being, measure governance effectiveness, and ensure accountability in your initiatives.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need governance resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      
      // Tool titles and descriptions
      decideTogetherTitle: "DecideTogether Platform Guide",
      decideTogetherDesc: "Comprehensive guide for implementing digital democracy platforms that enable inclusive community decision-making and transparent governance processes.",
      
      stakeholderCharterTitle: "Stakeholder Engagement Charter Template",
      stakeholderCharterDesc: "Template for creating comprehensive stakeholder engagement agreements that ensure inclusive participation and clear expectations in governance processes.",
      
      communityWellBeingTitle: "Community Well-Being Index",
      communityWellBeingDesc: "Framework for measuring and tracking community well-being improvements across social, economic, environmental, and governance dimensions.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Styrningsverktyg",
      subtitle: "Viktiga verktyg för demokratiskt deltagande och samhällssamordning",
      intro: "Dessa styrningsverktyg är utformade för att underlätta inkluderande beslutsfattande, intressentengagemang och samhällssamordning över alla ramverk. Från digitala demokratiplattformar till välbefinnandemått hjälper dessa resurser till att skapa mer deltagande och ansvariga styrningssystem.",
      coreToolsTitle: "Grundläggande styrningsverktyg",
      coreToolsDesc: "Viktiga verktyg för demokratiskt deltagande, intressentengagemang och transparenta beslutsprocesser.",
      monitoringTitle: "Övervaknings- och utvärderingsverktyg",
      monitoringDesc: "Resurser för att spåra samhällets välbefinnande, mäta styrningseffektivitet och säkerställa ansvarsskyldighet i dina initiativ.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du styrningsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      
      // Tool titles and descriptions in Swedish
      decideTogetherTitle: "Guide till DecideTogether-plattformen",
      decideTogetherDesc: "Omfattande guide för att implementera digitala demokratiplattformar som möjliggör inkluderande samhällsbeslutsfattande och transparenta styrningsprocesser.",
      
      stakeholderCharterTitle: "Mall för Intressentengagemangsstadga",
      stakeholderCharterDesc: "Mall för att skapa omfattande intressentengagemangsavtal som säkerställer inkluderande deltagande och tydliga förväntningar i styrningsprocesser.",
      
      communityWellBeingTitle: "Index för Samhällets Välbefinnande",
      communityWellBeingDesc: "Ramverk för att mäta och spåra förbättringar av samhällets välbefinnande över sociala, ekonomiska, miljömässiga och styrningsdimensioner.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'decidetogether-platform-guide', color: 'color-cosmic' },
    { id: 'stakeholder-engagement-charter', color: 'color-gold' }
  ];
  
  const monitoringTools = [
    { id: 'community-well-being-index', color: 'color-earthy' }
  ];

  const toolNameToTranslationKey = {
    'decidetogether-platform-guide': 'decideTogether',
    'stakeholder-engagement-charter': 'stakeholderCharter',
    'community-well-being-index': 'communityWellBeing'
  };
</script>

<svelte:head>
  <title>{texts.title} - Global Governance Framework</title>
  <meta name="description" content={texts.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>{texts.title}</h1>
      <p>{texts.subtitle}</p>
    </div>
  </div>
</section>

<!-- Back Navigation -->
<div class="container">
  <div class="back-navigation">
    <a href="{base}/frameworks/tools" class="back-link">
      <span class="back-icon">←</span>
      {texts.backToTools}
    </a>
  </div>
</div>

<!-- Main Content Section -->
<section class="main-content">
  <div class="container">
    <div class="content-wrapper">
      <p class="intro-text">{texts.intro}</p>
      
      <!-- Core Governance Tools -->
      <h2 class="section-title">{texts.coreToolsTitle}</h2>
      <p class="section-desc">{texts.coreToolsDesc}</p>
      
      <div class="tools-grid">
        {#each coreTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Monitoring & Evaluation Tools -->
      <h2 class="section-title">{texts.monitoringTitle}</h2>
      <p class="section-desc">{texts.monitoringDesc}</p>
      
      <div class="tools-grid">
        {#each monitoringTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Request & Feedback Section -->
      <div class="feedback-card">
        <h3>{texts.requestTitle}</h3>
        <p>
          {texts.requestDesc} <a href="{base}/contact" class="contact-link">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div class="back-link-bottom">
        <a href="{base}/frameworks/tools">
          <span class="back-icon">←</span>
          {texts.backToTools}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div class="language-section">
        <h3>{texts.languagesTitle}</h3>
        <div class="language-buttons">
          <button on:click={() => setLocale('en')} class={getLanguageButtonStyle('en')}>
            English
          </button>
          <button on:click={() => setLocale('sv')} class={getLanguageButtonStyle('sv')}>
            Svenska
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Global Styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .content-wrapper {
    max-width: 42rem;
    margin: 0 auto;
  }
  
  /* Hero Section with main website color scheme */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
    color: white;
  }
  
  .hero-content {
    max-width: 42rem;
    margin: 0 auto;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: #ffffff;
  }
  
  /* Back Navigation */
  .back-navigation {
    margin: 1.5rem 0;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    color: #2B4B8C; /* Cosmic Dark */
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #6B5CA5; /* Cosmic Light */
  }

  .back-icon {
    margin-right: 0.5rem;
  }
  
  /* Main Content Section */
  .main-content {
    padding: 3rem 0;
    background-color: white;
  }
  
  .intro-text {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Section Titles */
  .section-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2B4B8C; /* Cosmic Dark */
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Tools Grid */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  /* Tool Cards */
  .tool-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 4px solid;
  }
  
  .tool-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .tool-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  /* Main Website Color Variations */
  .color-cosmic {
    border-left-color: #2B4B8C; /* Cosmic Dark */
  }
  
  .color-cosmic h3 {
    color: #2B4B8C;
  }
  
  .color-gold {
    border-left-color: #DAA520; /* Gold Light */
  }
  
  .color-gold h3 {
    color: #B8860B; /* Gold Dark for better readability */
  }
  
  .color-earthy {
    border-left-color: #2D5F2D; /* Earthy Dark */
  }
  
  .color-earthy h3 {
    color: #2D5F2D;
  }
  
  .color-root {
    border-left-color: #654321; /* Root Dark */
  }
  
  .color-root h3 {
    color: #654321;
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: #2B4B8C;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #6B5CA5;
    transform: translateY(-1px);
  }
  
  .download-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .download-btn.pdf {
    color: white;
  }

  .tool-card.color-cosmic .download-btn.pdf {
    background-color: #2B4B8C;
  }

  .tool-card.color-cosmic .download-btn.pdf:hover {
    background-color: #6B5CA5;
  }

  .tool-card.color-gold .download-btn.pdf {
    background-color: #B8860B;
  }

  .tool-card.color-gold .download-btn.pdf:hover {
    background-color: #DAA520;
  }

  .tool-card.color-earthy .download-btn.pdf {
    background-color: #2D5F2D;
  }

  .tool-card.color-earthy .download-btn.pdf:hover {
    background-color: #7D9F7D;
  }

  .tool-card.color-root .download-btn.pdf {
    background-color: #654321;
  }

  .tool-card.color-root .download-btn.pdf:hover {
    background-color: #8B7355;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-cosmic .download-btn.md {
    color: #2B4B8C;
    border-color: #2B4B8C;
  }

  .tool-card.color-cosmic .download-btn.md:hover {
    background-color: rgba(43, 75, 140, 0.1);
  }

  .tool-card.color-gold .download-btn.md {
    color: #B8860B;
    border-color: #B8860B;
  }

  .tool-card.color-gold .download-btn.md:hover {
    background-color: rgba(218, 165, 32, 0.1);
  }

  .tool-card.color-earthy .download-btn.md {
    color: #2D5F2D;
    border-color: #2D5F2D;
  }

  .tool-card.color-earthy .download-btn.md:hover {
    background-color: rgba(45, 95, 45, 0.1);
  }

  .tool-card.color-root .download-btn.md {
    color: #654321;
    border-color: #654321;
  }

  .tool-card.color-root .download-btn.md:hover {
    background-color: rgba(101, 67, 33, 0.1);
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(218, 165, 32, 0.1); /* Gold Light background */
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid #DAA520;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #B8860B; /* Gold Dark */
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #2B4B8C; /* Cosmic Dark */
    text-decoration: underline;
    font-weight: 500;
  }
  
  .contact-link:hover {
    color: #6B5CA5; /* Cosmic Light */
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: #2B4B8C;
    font-weight: 500;
    text-decoration: none;
  }
  
  .back-link-bottom a:hover {
    color: #6B5CA5;
  }
  
  /* Language Section */
  .language-section {
    border-top: 1px solid #e5e7eb;
    padding-top: 2rem;
    margin-top: 2rem;
  }
  
  .language-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2B4B8C;
  }
  
  .language-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .lang-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
    background-color: white;
    color: #2B4B8C;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lang-button:hover {
    border-color: #2B4B8C;
    background-color: rgba(43, 75, 140, 0.05);
  }

  .lang-button.active {
    background-color: #2B4B8C;
    color: white;
    border-color: #2B4B8C;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .tool-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .download-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
