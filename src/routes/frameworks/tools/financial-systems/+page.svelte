<!-- src/routes/frameworks/tools/financial-systems/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en') || toolName.includes('-youth')) {
      return `${base}/frameworks/tools/financial-systems/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('quick-guide') || toolName === 'seed-kit.zip') {
      // Special case for main quick guides
      if (toolName === 'quick-guide.pdf' || toolName === 'quick-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/financial-systems/quick-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/financial-systems/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    if (['hearts-toolkit', 
         'transition-guide',
         'validator-training',
         'love-ledger-guide',
         'hearts-technical-spec',
         'translation-layer',
         'proof-of-care'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/financial-systems/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/financial-systems/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Financial Systems Framework Tools",
      subtitle: "Practical resources to implement the Financial Systems Framework",
      intro: "These tools and templates are designed to help you implement the Financial Systems Framework in various contexts. From setting up Hearts currency systems to engaging stakeholders, these resources provide step-by-step guidance for transforming financial systems.",
      seedKitTitle: "Start with the Implementation Kit",
      seedKitDesc: "A complete package with everything you need to launch a Hearts pilot. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Implementation Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Financial Systems Framework, from Hearts currency setup to validator training and system integration.",
      advocacyTitle: "Integration & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, integrate with existing systems, and scale your implementation from pilot projects to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Financial Systems Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadExcel: "Download Excel Model",
      backToTools: "Back to Tools Overview",
      // Tool titles
      heartsToolkitTitle: "Hearts Implementation Toolkit",
      heartsToolkitDesc: "Comprehensive resources for local adoption of the Hearts currency system, including conversion calculators, templates, and monitoring frameworks.",
      transitionGuideTitle: "Financial Systems Transition Guide",
      transitionGuideDesc: "Guide for traditional financial institutions integrating Hearts, with regulatory compliance checklists, API specifications, and risk assessment templates.",
      validatorTrainingTitle: "Validator Training Manual",
      validatorTrainingDesc: "Training materials for Hearts validators, including validation principles, ethics, technical tools, and governance frameworks.",
      loveLedgerTitle: "Love Ledger User Guide",
      loveLedgerDesc: "End-user instructions for the Love Ledger system, covering account setup, contribution logging, and community features.",
      heartsTechTitle: "Hearts Currency Technical Specification",
      heartsTechDesc: "Technical documentation for developers implementing Hearts infrastructure, including protocol design, cryptography, and API specifications.",
      translationLayerTitle: "Inter-Currency Translation Layer",
      translationLayerDesc: "Framework for enabling value exchange between Hearts and other currency systems, with translation protocols and governance mechanisms.",
      proofOfCareTitle: "Proof of Care Protocol",
      proofOfCareDesc: "Framework for verifying care contributions securely across diverse contexts with multi-modal validation and cryptographic verification.",
      quickGuideTitle: "Financial Systems Framework Quick Guide (Technical)",
      quickGuideDesc: "A condensed overview of the framework's core principles and implementation strategies for policy-level stakeholders.",
      quickGuideMediumTitle: "Financial Systems Framework Quick Guide (Community)",
      quickGuideMediumDesc: "A balanced guide for local authorities, community groups, and non-profits implementing the framework.",
      quickGuideYouthTitle: "Financial Systems Framework Quick Guide (Youth)",
      quickGuideYouthDesc: "A visual, accessible guide for youth groups, schools, and diverse communities to engage with the framework.",
      downloadButton: "Download"
    },
    sv: {
      title: "Finansiella Systems Ramverk Verktyg",
      subtitle: "Praktiska resurser för att implementera Finansiella Systems Ramverket",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Finansiella Systems Ramverket i olika sammanhang. Från att etablera Hearts valutasystem till att engagera intressenter, ger dessa resurser steg-för-steg-vägledning för att omvandla finansiella system.",
      seedKitTitle: "Börja med Implementeringspaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta en Hearts-pilot. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett Implementeringspaket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i Finansiella Systems Ramverket, från Hearts valutasystem till validatorträning och systemintegration.",
      advocacyTitle: "Integrations- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, integrera med befintliga system och skala upp din implementering från pilotprojekt till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela Finansiella Systems Ramverket med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadExcel: "Ladda ner Excel-modell",
      backToTools: "Tillbaka till verktygsöversikt",
      // Tool titles in Swedish
      heartsToolkitTitle: "Hearts Implementeringsverktyg",
      heartsToolkitDesc: "Omfattande resurser för lokal implementering av Hearts valutasystem, inklusive omräkningsverktyg, mallar och övervakningsramverk.",
      transitionGuideTitle: "Guide för finansiella systemövergångar",
      transitionGuideDesc: "Guide för traditionella finansinstitutioner som integrerar Hearts, med checklistor för regelefterlevnad, API-specifikationer och mallar för riskbedömning.",
      validatorTrainingTitle: "Validatorträningsmanual",
      validatorTrainingDesc: "Träningsmaterial för Hearts-validatorer, inklusive valideringsprinciper, etik, tekniska verktyg och styrningsramar.",
      loveLedgerTitle: "Love Ledger Användarguide",
      loveLedgerDesc: "Användarinstruktioner för Love Ledger-systemet, som täcker kontoregistrering, bidragsloggning och gemenskapsfunktioner.",
      heartsTechTitle: "Hearts Valuta Teknisk Specifikation",
      heartsTechDesc: "Teknisk dokumentation för utvecklare som implementerar Hearts-infrastruktur, inklusive protokolldesign, kryptografi och API-specifikationer.",
      translationLayerTitle: "Inter-Valuta Översättningslager",
      translationLayerDesc: "Ramverk för att möjliggöra värdeutbyte mellan Hearts och andra valutasystem, med översättningsprotokoll och styrningsmekanismer.",
      proofOfCareTitle: "Proof of Care Protokoll",
      proofOfCareDesc: "Ramverk för att verifiera omsorgsbidrag säkert över olika sammanhang med multimodal validering och kryptografisk verifiering.",
      quickGuideTitle: "Finansiella Systems Ramverk Snabbguide (Teknisk)",
      quickGuideDesc: "En komprimerad översikt över ramverkets kärnprinciper och implementeringsstrategier för intressenter på policynivå.",
      quickGuideMediumTitle: "Finansiella Systems Ramverk Snabbguide (Samhälle)",
      quickGuideMediumDesc: "En balanserad guide för lokala myndigheter, samhällsgrupper och ideella organisationer som implementerar ramverket.",
      quickGuideYouthTitle: "Finansiella Systems Ramverk Snabbguide (Ungdom)",
      quickGuideYouthDesc: "En visuell, tillgänglig guide för ungdomsgrupper, skolor och olika samhällen att engagera sig i ramverket.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'hearts-toolkit', color: 'color-1' },
    { id: 'validator-training', color: 'color-2' },
    { id: 'love-ledger-guide', color: 'color-3' },
    { id: 'proof-of-care', color: 'color-4' }
  ];
  
  const advocacyTools = [
    { id: 'transition-guide', color: 'color-primary' },
    { id: 'hearts-technical-spec', color: 'color-1' },
    { id: 'translation-layer', color: 'color-2' }
  ];

  const toolNameToTranslationKey = {
    'hearts-toolkit': 'heartsToolkit',
    'transition-guide': 'transitionGuide',
    'validator-training': 'validatorTraining',
    'love-ledger-guide': 'loveLedger',
    'hearts-technical-spec': 'heartsTech',
    'translation-layer': 'translationLayer',
    'proof-of-care': 'proofOfCare'
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

      <!-- Start with the Implementation Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">❤️</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`implementation-kit-${currentLocale}.zip`)} download class="primary-btn">
              {texts.seedKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Framework Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        <!-- Technical Quick Guide -->
        <div class="tool-card color-primary">
          <h3>{texts.quickGuideTitle}</h3>
          <p>{texts.quickGuideDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Community Quick Guide -->
        <div class="tool-card color-2">
          <h3>{texts.quickGuideMediumTitle}</h3>
          <p>{texts.quickGuideMediumDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Youth Quick Guide -->
        <div class="tool-card color-3">
          <h3>{texts.quickGuideYouthTitle}</h3>
          <p>{texts.quickGuideYouthDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-youth-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-youth-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Implementation Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
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

      <!-- Integration & Scaling Tools -->
      <h2 class="section-title">{texts.advocacyTitle}</h2>
      <p class="section-desc">{texts.advocacyDesc}</p>
      
      <div class="tools-grid">
        {#each advocacyTools as tool}
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
  
  /* Hero Section */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #3A6EA5, #6DAA3F);
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
    color: #3A6EA5;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #2A5D8F;
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
    color: #3A6EA5;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background: linear-gradient(135deg, #edf1f7 0%, #e9edfa 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(58, 110, 165, 0.1);
    border: 1px solid rgba(58, 110, 165, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #3A6EA5;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #3A6EA5;
  }
  
  .card-text p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
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
  
  /* Color Variations */
  .color-primary {
    border-left-color: #3A6EA5;
  }
  
  .color-primary h3 {
    color: #3A6EA5;
  }
  
  .color-1 {
    border-left-color: #F5A623;
  }
  
  .color-1 h3 {
    color: #F5A623;
  }
  
  .color-2 {
    border-left-color: #6DAA3F;
  }
  
  .color-2 h3 {
    color: #6DAA3F;
  }
  
  .color-3 {
    border-left-color: #8A4F9E;
  }
  
  .color-3 h3 {
    color: #8A4F9E;
  }
  
  .color-4 {
    border-left-color: #C43B3B;
  }
  
  .color-4 h3 {
    color: #C43B3B;
  }
  
  .color-5 {
    border-left-color: #2A9D8F;
  }
  
  .color-5 h3 {
    color: #2A9D8F;
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
    background-color: #3A6EA5;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #2A5D8F;
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

  .tool-card.color-primary .download-btn.pdf {
    background-color: #3A6EA5;
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: #F5A623;
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: #6DAA3F;
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: #8A4F9E;
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: #C43B3B;
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: #2A9D8F;
  }

  .download-btn.md, .download-btn.excel {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md, .tool-card.color-primary .download-btn.excel {
    color: #3A6EA5;
    border-color: #3A6EA5;
  }

  .tool-card.color-1 .download-btn.md, .tool-card.color-1 .download-btn.excel {
    color: #F5A623;
    border-color: #F5A623;
  }

  .tool-card.color-2 .download-btn.md, .tool-card.color-2 .download-btn.excel {
    color: #6DAA3F;
    border-color: #6DAA3F;
  }

  .tool-card.color-3 .download-btn.md, .tool-card.color-3 .download-btn.excel {
    color: #8A4F9E;
    border-color: #8A4F9E;
  }

  .tool-card.color-4 .download-btn.md, .tool-card.color-4 .download-btn.excel {
    color: #C43B3B;
    border-color: #C43B3B;
  }

  .tool-card.color-5 .download-btn.md, .tool-card.color-5 .download-btn.excel {
    color: #2A9D8F;
    border-color: #2A9D8F;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(138, 79, 158, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid #8A4F9E;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #8A4F9E;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #F5A623;
    text-decoration: underline;
    font-weight: 500;
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: #3A6EA5;
    font-weight: 500;
    text-decoration: none;
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
    color: #3A6EA5;
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
    color: #3A6EA5;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

.lang-button.active {
    background-color: #3A6EA5;
    color: white;
    border-color: #3A6EA5;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .card-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .card-actions {
      width: 100%;
      justify-content: center;
    }
    
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
