<!-- src/routes/framework/tools/education/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths. The getFilePath function included language in the filename
  const getFilePath = (toolName) => {
    // Check if the file is already language-specific
    if (toolName.includes('-swedish') || toolName.includes('-en')) {
      return `${base}/framework/tools/education/${toolName}`;
    }
    
    // For the lite guide and other potentially translated documents,
    // append the language code to the filename
    if (toolName.includes('education-framework-lite') || 
        toolName.includes('quick-start') || 
        toolName === 'seed-kit.zip') {
      // Special case for main lite guides
      if (toolName === 'education-framework-lite.pdf' || toolName === 'education-framework-lite.md') {
        const langSuffix = currentLocale === 'sv' ? '-swedish' : '';
        return `${base}/framework/tools/education/education-framework-lite${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/framework/tools/education/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if (['pilot-readiness-self-assessment-tool', 
         'youth-council-charter',
         'regenerative-project-guide',
         'curriculum-mapping-template',
         'mne-rubric-template',
         'advocacy-playbook',
         'bureaucratic-navigation-toolkit',
         'cost-benefit-analysis-model'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/framework/tools/education/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/framework/tools/education/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2B4B8C' : 'white'}; color: ${isActive ? 'white' : '#2B4B8C'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Education Framework Tools",
      subtitle: "Practical resources to implement the Perfected Enhanced Educational Systems Framework",
      intro: "These tools and templates are designed to help you implement the Education Framework in various contexts. From planning regenerative projects to establishing youth councils, these resources provide step-by-step guidance for transforming educational systems.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch a Tier 1 micro-pilot. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Education Framework, from assessment to planning and governance.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from micro-pilots to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Education Framework with others.",
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
      youthCouncilTitle: "Youth Council Charter Template",
      youthCouncilDesc: "A customizable governance framework for establishing youth councils, empowering learners to participate in decision-making and policy development.",
      regenerativeTitle: "Regenerative Project Guide",
      regenerativeDesc: "Step-by-step guidance for designing and implementing regenerative projects that restore ecosystems and foster community resilience.",
      curriculumTitle: "Curriculum Mapping Template",
      curriculumDesc: "Aligns framework competencies with national or local curricula, facilitating integration with existing educational standards.",
      mneTitle: "M&E Rubric Template",
      mneDesc: "A comprehensive tool for tracking learning outcomes and system health metrics, ensuring accountability and continuous improvement.",
      advocacyPlaybookTitle: "Advocacy Playbook",
      advocacyPlaybookDesc: "Strategies, narratives, and materials to advocate for the framework with ministries, unions, community leaders, and global forums.",
      bureaucraticTitle: "Bureaucratic Navigation Toolkit",
      bureaucraticDesc: "Tools and strategies to overcome administrative and political barriers, ensuring smooth adoption in diverse governance systems.",
      costBenefitTitle: "Cost-Benefit Analysis Model",
      costBenefitDesc: "Quantify economic and social returns of adopting the framework, providing evidence to justify funding and advocacy efforts.",
      liteGuideEnTitle: "Education Framework Lite Guide (English)",
      liteGuideEnDesc: "A condensed overview of the framework's core principles, components, and implementation strategies in simple language.",
      liteGuideSvTitle: "Utbildningsramverk Lite Guide (Svenska)",
      liteGuideSvDesc: "En kompakt översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
      downloadButton: "Ladda ner"
    },
    sv: {
      title: "Verktyg för utbildningsramverket",
      subtitle: "Praktiska resurser för att implementera det Perfekterade Förstärkta Utbildningssystemets Ramverk",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera utbildningsramverket i olika sammanhang. Från planering av regenerativa projekt till etablering av ungdomsråd, ger dessa resurser steg-för-steg-vägledning för att omvandla utbildningssystem.",
      seedKitTitle: "Börja med Frö-paketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta en Nivå 1 mikro-pilot. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett Frö-paket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i utbildningsramverket, från bedömning till planering och styrning.",
      advocacyTitle: "Opinionsbildnings- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från mikro-piloter till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela utbildningsramverket med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadExcel: "Ladda ner Excel-modell",
      // Tool titles in Swedish
      readinessTitle: "Självbedömningsverktyg för pilotberedskap",
      readinessDesc: "Utvärdera din gemenskaps beredskap att lansera ramverkspilotprojekt, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      youthCouncilTitle: "Mall för ungdomsrådsstadga",
      youthCouncilDesc: "Ett anpassningsbart styrningsramverk för att etablera ungdomsråd, vilket ger elever möjlighet att delta i beslutsfattande och policyutveckling.",
      regenerativeTitle: "Guide för regenerativa projekt",
      regenerativeDesc: "Steg-för-steg-vägledning för att utforma och implementera regenerativa projekt som återställer ekosystem och främjar samhällets motståndskraft.",
      curriculumTitle: "Mall för läroplansanpassning",
      curriculumDesc: "Anpassar ramverkets kompetenser till nationella eller lokala läroplaner, underlättar integration med befintliga utbildningsstandarder.",
      mneTitle: "M&E-bedömningsmatris mall",
      mneDesc: "Ett omfattande verktyg för att spåra läranderesultat och systemhälsometrik, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.",
      advocacyPlaybookTitle: "Opinionsbildningshandbok",
      advocacyPlaybookDesc: "Strategier, berättelser och material för att förespråka ramverket med ministerier, fackföreningar, samhällsledare och globala forum.",
      bureaucraticTitle: "Verktygslåda för byråkratisk navigation",
      bureaucraticDesc: "Verktyg och strategier för att övervinna administrativa och politiska hinder, säkerställa smidig antagning i olika styrsystem.",
      costBenefitTitle: "Kostnad-nytta-analysmodell",
      costBenefitDesc: "Kvantifiera ekonomiska och sociala avkastningar från antagandet av ramverket, vilket ger bevis för att motivera finansiering och förespråkande insatser.",
      liteGuideEnTitle: "Utbildningsramverk Lite Guide (Engelska)",
      liteGuideEnDesc: "En komprimerad översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
      liteGuideSvTitle: "Utbildningsramverk Lite Guide (Svenska)",
      liteGuideSvDesc: "En kompakt översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
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
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); color: white;">
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
      <div style="background-color: #f0f4ff; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1); border: 1px solid rgba(43, 75, 140, 0.2);">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2B4B8C;">📦</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">{texts.seedKitTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.seedKitDesc}
            </p>
            <a href={getFilePath('seed-kit.zip')} download style="display: inline-flex; align-items: center; background-color: #2B4B8C; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.seedKitButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Implementation Tools -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.toolsTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.toolsDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Pilot Readiness Assessment -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #DAA520;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #DAA520;">{texts.readinessTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.readinessDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('pilot-readiness-self-assessment-tool.pdf')} download style="display: inline-flex; align-items: center; background-color: #DAA520; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('pilot-readiness-self-assessment-tool.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #DAA520; border: 1px solid #DAA520; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Youth Council Charter -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2B4B8C;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">{texts.youthCouncilTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.youthCouncilDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('youth-council-charter.pdf')} download style="display: inline-flex; align-items: center; background-color: #2B4B8C; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('youth-council-charter.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #2B4B8C; border: 1px solid #2B4B8C; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Regenerative Project Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{texts.regenerativeTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.regenerativeDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('regenerative-project-guide.pdf')} download style="display: inline-flex; align-items: center; background-color: #2D5F2D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('regenerative-project-guide.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #2D5F2D; border: 1px solid #2D5F2D; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Curriculum Mapping Template -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6B5CA5;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #6B5CA5;">{texts.curriculumTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.curriculumDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('curriculum-mapping-template.pdf')} download style="display: inline-flex; align-items: center; background-color: #6B5CA5; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('curriculum-mapping-template.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #6B5CA5; border: 1px solid #6B5CA5; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- M&E Rubric Template -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #4B8AC2;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #4B8AC2;">{texts.mneTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.mneDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('mne-rubric-template.pdf')} download style="display: inline-flex; align-items: center; background-color: #4B8AC2; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('mne-rubric-template.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #4B8AC2; border: 1px solid #4B8AC2; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Advocacy & Scaling Tools -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.advocacyTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.advocacyDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Advocacy Playbook -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #B8860B;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{texts.advocacyPlaybookTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.advocacyPlaybookDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('advocacy-playbook.pdf')} download style="display: inline-flex; align-items: center; background-color: #B8860B; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('advocacy-playbook.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #B8860B; border: 1px solid #B8860B; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Bureaucratic Navigation Toolkit -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #9B6A8F;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #9B6A8F;">{texts.bureaucraticTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.bureaucraticDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('bureaucratic-navigation-toolkit.pdf')} download style="display: inline-flex; align-items: center; background-color: #9B6A8F; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('bureaucratic-navigation-toolkit.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #9B6A8F; border: 1px solid #9B6A8F; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Cost-Benefit Analysis Model -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.costBenefitTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.costBenefitDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('cost-benefit-analysis-model.pdf')} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('cost-benefit-analysis-model.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('cost-benefit-analysis-model.xlsx')} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadExcel}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Framework Overview & Lite Guides -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.guidesTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.guidesDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        
        <!-- Education Framework Lite Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2B4B8C;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">
            {currentLocale === 'sv' ? texts.liteGuideSvTitle : texts.liteGuideEnTitle}
          </h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">
            {currentLocale === 'sv' ? texts.liteGuideSvDesc : texts.liteGuideEnDesc}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath('education-framework-lite.pdf')} download style="display: inline-flex; align-items: center; background-color: #2B4B8C; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath('education-framework-lite.md')} download style="display: inline-flex; align-items: center; background-color: white; color: #2B4B8C; border: 1px solid #2B4B8C; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Request & Feedback Section -->
      <div style="background-color: #e9f2e9; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{texts.requestTitle}</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          {texts.requestDesc} <a href="{base}/contact" style="color: #DAA520; text-decoration: underline; font-weight: 500;">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div style="margin-bottom: 2rem;">
        <a href="{base}/framework/tools" style="display: inline-flex; align-items: center; color: #2B4B8C; font-weight: 500; text-decoration: none;">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {currentLocale === 'sv' ? 'Tillbaka till verktygsöversikt' : 'Back to Tools Overview'}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2B4B8C;">{texts.languagesTitle}</h3>
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
