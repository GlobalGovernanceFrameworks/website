<!-- src/routes/framework/tools/food-systems/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths. The getFilePath function included language in the filename
  const getFilePath = (toolName) => {
    // Check if the file is already language-specific
    if (toolName.includes('-sv') || toolName.includes('-en') || toolName.includes('-youth')) {
      return `${base}/framework/tools/food-systems/${toolName}`;
    }
    
    // For the quick guides and other potentially translated documents
    if (toolName.includes('quick-guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main quick guides
      if (toolName === 'quick-guide.pdf' || toolName === 'quick-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/framework/tools/food-systems/quick-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/framework/tools/food-systems/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if (['advocacy-playbook', 
         'cost-benefit-analysis-model',
         'monitoring-evaluation-rubric',
         'pilot-readiness-self-assessment-tool',
         'policy-harmonization-toolkit',
         'regenerative-farming-guide',
         'seed-kit-getting-started-guide',
         'stakeholder-engagement-charter',
         'tek-integration-template'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/framework/tools/food-systems/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/framework/tools/food-systems/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2e7d32' : 'white'}; color: ${isActive ? 'white' : '#2e7d32'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Food Systems Framework Tools",
      subtitle: "Practical resources to implement the Food Systems & Agriculture Framework",
      intro: "These tools and templates are designed to help you implement the Food Systems Framework in various contexts. From planning regenerative agriculture projects to engaging stakeholders, these resources provide step-by-step guidance for transforming food systems.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch a Tier 1 micro-pilot. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Food Systems Framework, from assessment to planning and stakeholder engagement.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from pilot projects to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Food Systems Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadExcel: "Download Excel Model",
      // Tool titles
      readinessTitle: "Pilot Readiness Self-Assessment Tool",
      readinessDesc: "Evaluate your community's readiness to launch framework pilots, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      stakeholderTitle: "Stakeholder Engagement Charter",
      stakeholderDesc: "A customizable governance framework for establishing inclusive stakeholder engagement, empowering diverse participants in decision-making.",
      regenerativeTitle: "Regenerative Farming Guide",
      regenerativeDesc: "Step-by-step guidance for designing and implementing regenerative agriculture projects that restore ecosystems and build soil health.",
      tekTitle: "TEK Integration Template",
      tekDesc: "Framework for respectfully integrating Traditional Ecological Knowledge with modern practices to enhance sustainability and preserve cultural heritage.",
      mneTitle: "Monitoring & Evaluation Rubric",
      mneDesc: "A comprehensive tool for tracking key performance indicators and system health metrics, ensuring accountability and continuous improvement.",
      advocacyPlaybookTitle: "Advocacy Playbook",
      advocacyPlaybookDesc: "Strategies, narratives, and materials to advocate for the framework with policymakers, organizations, community leaders, and global forums.",
      policyTitle: "Policy Harmonization Toolkit",
      policyDesc: "Tools and strategies to align local and regional policies with sustainable food systems principles and international agreements.",
      costBenefitTitle: "Cost-Benefit Analysis Model",
      costBenefitDesc: "Quantify economic and social returns of adopting the framework, providing evidence to justify funding and advocacy efforts.",
      gettingStartedTitle: "Getting Started Guide",
      gettingStartedDesc: "A practical introduction to implementing the framework with step-by-step instructions for beginners.",
      quickGuideTitle: "Food Systems Framework Quick Guide (Technical)",
      quickGuideDesc: "A condensed overview of the framework's core principles and implementation strategies for policy-level stakeholders.",
      quickGuideMediumTitle: "Food Systems Framework Quick Guide (Community)",
      quickGuideMediumDesc: "A balanced guide for local authorities, extension workers, and community groups implementing the framework.",
      quickGuideYouthTitle: "Food Systems Framework Quick Guide (Youth)",
      quickGuideYouthDesc: "A visual, accessible guide for youth groups, schools, and diverse communities to engage with the framework.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktygslåda för Matsystem",
      subtitle: "Praktiska resurser för att implementera Mat- och Jordbrukssystemets Ramverk",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera matsystemets ramverk i olika sammanhang. Från planering av regenerativa jordbruksprojekt till engagerande av intressenter, ger dessa resurser steg-för-steg-vägledning för att omvandla matsystem.",
      seedKitTitle: "Börja med Frö-paketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta en Nivå 1 mikro-pilot. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett Frö-paket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i matsystemets ramverk, från bedömning till planering och intressentengagemang.",
      advocacyTitle: "Påverkans- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från pilotprojekt till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela matsystemets ramverk med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadExcel: "Ladda ner Excel-modell",
      // Tool titles in Swedish
      readinessTitle: "Verktyg för självskattning av pilotberedskap",
      readinessDesc: "Utvärdera din gemenskaps beredskap att lansera ramverkspilotprojekt, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      stakeholderTitle: "Mall för Intressentengagemangsstadga",
      stakeholderDesc: "Ett anpassningsbart styrningsramverk för att etablera inkluderande intressentengagemang, vilket ger olika deltagare möjlighet till delaktighet i beslutsfattande.",
      regenerativeTitle: "Guide för regenerativt jordbruk",
      regenerativeDesc: "Steg-för-steg-vägledning för att utforma och implementera regenerativa jordbruksprojekt som återställer ekosystem och bygger jordhälsa.",
      tekTitle: "Mall för integration av traditionell ekologisk kunskap",
      tekDesc: "Ramverk för respektfull integration av traditionell ekologisk kunskap med moderna metoder för att förbättra hållbarhet och bevara kulturarv.",
      mneTitle: "Mall för uppföljnings- och utvärderingsmatris",
      mneDesc: "Ett omfattande verktyg för att spåra nyckeltal och systemhälsometrik, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.",
      advocacyPlaybookTitle: "Handbok för påverkansarbete",
      advocacyPlaybookDesc: "Strategier, berättelser och material för att förespråka ramverket med beslutsfattare, organisationer, samhällsledare och globala forum.",
      policyTitle: "Verktygslåda för policysamordning",
      policyDesc: "Verktyg och strategier för att anpassa lokala och regionala policyer med principer för hållbara matsystem och internationella avtal.",
      costBenefitTitle: "Modell för kostnads-/nyttobedömning",
      costBenefitDesc: "Kvantifiera ekonomiska och sociala avkastningar från antagandet av ramverket, vilket ger bevis för att motivera finansiering och förespråkande insatser.",
      gettingStartedTitle: "Kom igång-guide",
      gettingStartedDesc: "En praktisk introduktion till implementering av ramverket med steg-för-steg-instruktioner för nybörjare.",
      quickGuideTitle: "Snabbguide för Matsystem (Teknisk)",
      quickGuideDesc: "En komprimerad översikt över ramverkets kärnprinciper och implementeringsstrategier för intressenter på policynivå.",
      quickGuideMediumTitle: "Snabbguide för Matsystem (Samhälle)",
      quickGuideMediumDesc: "En balanserad guide för lokala myndigheter, rådgivare och samhällsgrupper som implementerar ramverket.",
      quickGuideYouthTitle: "Snabbguide för Matsystem (Ungdom)",
      quickGuideYouthDesc: "En visuell, tillgänglig guide för ungdomsgrupper, skolor och olika samhällen att engagera sig i ramverket.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
</script>

<svelte:head>
  <title>{texts.title} - Global Governance Framework</title>
  <meta name="description" content={texts.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2e7d32, #4caf50); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">
        {texts.title}
      </h1>
      <p style="font-size: 1.25rem; color: #ffffff;">
        {texts.subtitle}
      </p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.intro}
      </p>

      <!-- Start with the Seed Kit -->
      <div style="background-color: #f1f8e9; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1); border: 1px solid rgba(46, 125, 50, 0.2);">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2e7d32;">🌱</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.seedKitTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.seedKitDesc}
            </p>
            <a href={getFilePath(`seed-kit-${currentLocale}.zip`)} download style="display: inline-flex; align-items: center; background-color: #2e7d32; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.seedKitButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Framework Guides -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2e7d32;">{texts.guidesTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.guidesDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Technical Quick Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2e7d32;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.quickGuideTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.quickGuideDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`quick-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2e7d32; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`quick-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2e7d32; border: 1px solid #2e7d32; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Community Quick Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #4caf50;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #4caf50;">{texts.quickGuideMediumTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.quickGuideMediumDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #4caf50; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #4caf50; border: 1px solid #4caf50; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Youth Quick Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #f9a825;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #f9a825;">{texts.quickGuideYouthTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.quickGuideYouthDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`quick-guide-medium-youth-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #f9a825; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`quick-guide-medium-youth-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #f9a825; border: 1px solid #f9a825; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Implementation Tools -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2e7d32;">{texts.toolsTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.toolsDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Pilot Readiness Assessment -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2e7d32;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.readinessTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.readinessDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`pilot-readiness-self-assessment-tool-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2e7d32; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`pilot-readiness-self-assessment-tool-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2e7d32; border: 1px solid #2e7d32; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Stakeholder Engagement Charter -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #00796b;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #00796b;">{texts.stakeholderTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.stakeholderDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`stakeholder-engagement-charter-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #00796b; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`stakeholder-engagement-charter-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; ; color: #00796b; border: 1px solid #00796b; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Regenerative Farming Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #33691e;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #33691e;">{texts.regenerativeTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.regenerativeDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`regenerative-farming-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #33691e; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`regenerative-farming-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #33691e; border: 1px solid #33691e; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- TEK Integration Template -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #8d6e63;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #8d6e63;">{texts.tekTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.tekDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`tek-integration-template-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #8d6e63; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`tek-integration-template-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #8d6e63; border: 1px solid #8d6e63; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Monitoring & Evaluation Rubric -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #4caf50;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #4caf50;">{texts.mneTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.mneDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`monitoring-evaluation-rubric-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #4caf50; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`monitoring-evaluation-rubric-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #4caf50; border: 1px solid #4caf50; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Advocacy & Scaling Tools -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2e7d32;">{texts.advocacyTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.advocacyDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Advocacy Playbook -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #f57c00;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #f57c00;">{texts.advocacyPlaybookTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.advocacyPlaybookDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`advocacy-playbook-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #f57c00; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`advocacy-playbook-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #f57c00; border: 1px solid #f57c00; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Policy Harmonization Toolkit -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #5c6bc0;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #5c6bc0;">{texts.policyTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.policyDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`policy-harmonization-toolkit-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #5c6bc0; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`policy-harmonization-toolkit-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #5c6bc0; border: 1px solid #5c6bc0; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Cost-Benefit Analysis Model -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #43a047;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #43a047;">{texts.costBenefitTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.costBenefitDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`cost-benefit-analysis-model-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #43a047; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`cost-benefit-analysis-model-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #43a047; border: 1px solid #43a047; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <!--<a href={getFilePath(`cost-benefit-analysis-model.xlsx')} download style="display: inline-flex; align-items: center; background-color: white; color: #43a047; border: 1px solid #43a047; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadExcel}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>-->
          </div>
        </div>
        
        <!-- Getting Started Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #689f38;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #689f38;">{texts.gettingStartedTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.gettingStartedDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`seed-kit-getting-started-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #689f38; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`seed-kit-getting-started-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #689f38; border: 1px solid #689f38; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Request & Feedback Section -->
      <div style="background-color: #e8f5e9; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.requestTitle}</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          {texts.requestDesc} <a href="{base}/contact" style="color: #f57c00; text-decoration: underline; font-weight: 500;">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div style="margin-bottom: 2rem;">
        <a href="{base}/framework/tools" style="display: inline-flex; align-items: center; color: #2e7d32; font-weight: 500; text-decoration: none;">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {currentLocale === 'sv' ? 'Tillbaka till verktygsöversikt' : 'Back to Tools Overview'}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2e7d32;">{texts.languagesTitle}</h3>
        <div style="display: flex; gap: 1rem;">
          <button on:click={() => setLocale('en')} style={getLanguageButtonStyle('en')}>
            English
          </button>
          <button on:click={() => setLocale('sv')} style={getLanguageButtonStyle('sv')}>
            Svenska
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
