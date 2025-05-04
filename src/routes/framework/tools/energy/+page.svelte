<!-- src/routes/framework/tools/energy/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths. The getFilePath function includes language in the filename
  const getFilePath = (toolName) => {
    // Check if the file is already language-specific
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/framework/tools/energy/${toolName}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'climate-energy-action-guide.pdf' || toolName === 'climate-energy-action-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/framework/tools/energy/climate-energy-action-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/framework/tools/energy/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'governance-readiness-assessment',
        'just-transition-planning-template',
        'stakeholder-engagement-protocol',
        'policy-integration-matrix',
        'governance-coordination-guide',
        'energy-transition-roadmap',
        'adaptation-planning-framework',
        'carbon-pricing-guide',
        'nature-based-solutions-tool',
        'innovation-acceleration-kit',
        'policy-brief-templates',
        'governance-communication-toolkit',
        'institutional-reform-guide',
        'finance-access-navigator',
        'regional-hub-connection-guide'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/framework/tools/energy/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/framework/tools/energy/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2C8A78' : 'white'}; color: ${isActive ? 'white' : '#2C8A78'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Climate & Energy Governance Tools",
      subtitle: "Practical resources to implement the Climate & Energy Governance Framework",
      intro: "These tools and templates are designed to help you implement the Climate & Energy Governance Framework in various contexts. From assessment to planning and advocacy, these resources provide step-by-step guidance for transforming energy systems and strengthening climate governance.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Lite guides tailored to specific audiences to help you understand and share the Climate & Energy Governance Framework with others.",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "These essential tools help you implement key components of the Climate & Energy Governance Framework, from assessment to planning and stakeholder engagement.",
      sectoralTitle: "Sectoral Implementation Guides",
      sectoralDesc: "Specialized tools to support implementation across key sectoral areas including energy transition, adaptation, and innovation.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from pilot projects to broader adoption.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",

      // Tool titles - Lite Guides
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Detailed 15-page guide focusing on governance structures, policy mechanisms, and technical implementation for officials and decision-makers.",
      stakeholderGuideTitle: "Stakeholder Implementation Guide",
      stakeholderGuideDesc: "Practical 10-page guide for businesses, civil society organizations, and regional authorities emphasizing engagement and sectoral implementation.",
      actionGuideTitle: "Climate Action Guide",
      actionGuideDesc: "Accessible 6-page guide for broader audiences including youth and community groups, focusing on local action and participatory governance.",
      
      // Tool titles - Core Governance
      readinessTitle: "Governance Readiness Assessment Tool",
      readinessDesc: "Evaluate your governance readiness to implement climate and energy policies, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      justTransitionTitle: "Just Transition Planning Template",
      justTransitionDesc: "A customizable planning template for designing and implementing equitable transitions that ensure no one is left behind in the shift to clean energy systems.",
      stakeholderTitle: "Stakeholder Engagement Protocol",
      stakeholderDesc: "A structured approach to inclusive stakeholder engagement, ensuring diverse participants can shape climate and energy decision-making.",
      policyIntegrationTitle: "Climate-Energy Policy Integration Matrix",
      policyIntegrationDesc: "Analytical tool to assess policy coherence and identify opportunities for integrating climate and energy considerations across sectors.",
      coordinationGuideTitle: "Multi-level Governance Coordination Guide",
      coordinationGuideDesc: "Guidance for effective coordination between local, regional, national, and international governance levels to enhance policy implementation.",
      
      // Tool titles - Sectoral Implementation
      energyTransitionTitle: "Energy Transition Roadmap Template",
      energyTransitionDesc: "Framework for developing comprehensive roadmaps to transform energy systems, with phased timelines and key milestones.",
      adaptationPlanningTitle: "Adaptation Planning Framework",
      adaptationPlanningDesc: "Systematic approach to developing climate resilience plans that address vulnerabilities and build adaptive capacity.",
      carbonPricingTitle: "Carbon Pricing Implementation Guide",
      carbonPricingDesc: "Practical guidance for designing and implementing effective carbon pricing mechanisms adapted to diverse contexts.",
      natureSolutionsTitle: "Nature-based Solutions Assessment Tool",
      natureSolutionsDesc: "Methodology for evaluating and implementing nature-based approaches to climate mitigation and adaptation.",
      innovationTitle: "Climate Innovation Acceleration Kit",
      innovationDesc: "Resources to support and accelerate climate technology innovation and deployment across sectors.",
      
      // Tool titles - Advocacy & Scaling
      policyBriefTitle: "Climate Policy Brief Templates",
      policyBriefDesc: "Customizable templates for creating compelling policy briefs to influence climate and energy decision-making.",
      communicationTitle: "Governance Communication Toolkit",
      communicationDesc: "Strategic approaches and materials for communicating complex governance concepts to diverse audiences.",
      institutionalTitle: "Climate Institutional Reform Guide",
      institutionalDesc: "Framework for evaluating and strengthening institutional arrangements to better address climate challenges.",
      financeTitle: "Climate Finance Access Navigator",
      financeDesc: "Guide to identifying, accessing, and leveraging climate finance from diverse sources for implementing governance measures.",
      hubConnectionTitle: "Regional Hub Connection Guide",
      hubConnectionDesc: "Guidance for connecting local climate action to regional coordination mechanisms through the Regional Climate & Energy Governance Hubs.",
            
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för klimat- och energistyrning",
      subtitle: "Praktiska resurser för att implementera ramverket för klimat- och energistyrning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera ramverket för klimat- och energistyrning i olika sammanhang. Från bedömning till planering och påverkansarbete, ger dessa resurser steg-för-steg-vägledning för att omvandla energisystem och stärka klimatstyrning.",
      seedKitTitle: "Börja med startpaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Enkla guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela ramverket för klimat- och energistyrning med andra.",
      toolsTitle: "Grundläggande styrningsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket för klimat- och energistyrning, från bedömning till planering och intressentengagemang.",
      sectoralTitle: "Sektorspecifika implementeringsguider",
      sectoralDesc: "Specialiserade verktyg för att stödja implementering inom viktiga sektorområden inklusive energiomställning, anpassning och innovation.",
      advocacyTitle: "Påverkans- och skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från pilotprojekt till bredare antagande.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",

      // Tool titles - Lite Guides (Swedish)
      technicalGuideTitle: "Teknisk guide för beslutsfattare",
      technicalGuideDesc: "Detaljerad 15-sidig guide med fokus på styrningsstrukturer, policymekanismer och teknisk implementering för tjänstemän och beslutsfattare.",
      stakeholderGuideTitle: "Implementeringsguide för intressenter",
      stakeholderGuideDesc: "Praktisk 10-sidig guide för företag, civilsamhällesorganisationer och regionala myndigheter med betoning på engagemang och sektoriell implementering.",
      actionGuideTitle: "Klimataktionsguide",
      actionGuideDesc: "Tillgänglig 6-sidig guide för bredare målgrupper inklusive ungdomar och samhällsgrupper, med fokus på lokala åtgärder och deltagandebaserad styrning.",
      
      // Tool titles - Core Governance (Swedish)
      readinessTitle: "Verktyg för bedömning av styrningsberedskap",
      readinessDesc: "Utvärdera din styrningsberedskap för att implementera klimat- och energipolitik, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      justTransitionTitle: "Mall för planering av rättvis omställning",
      justTransitionDesc: "En anpassningsbar planeringsmall för att utforma och genomföra rättvisa omställningar som säkerställer att ingen lämnas efter i övergången till rena energisystem.",
      stakeholderTitle: "Protokoll för intressentengagemang",
      stakeholderDesc: "Ett strukturerat tillvägagångssätt för inkluderande intressentengagemang, vilket säkerställer att olika deltagare kan forma klimat- och energibeslut.",
      policyIntegrationTitle: "Integrationsmatris för klimat- och energipolitik",
      policyIntegrationDesc: "Analytiskt verktyg för att bedöma politisk samstämmighet och identifiera möjligheter för att integrera klimat- och energiöverväganden över sektorer.",
      coordinationGuideTitle: "Guide för samordning av flernivåstyrning",
      coordinationGuideDesc: "Vägledning för effektiv samordning mellan lokala, regionala, nationella och internationella styrningsnivåer för att förbättra policyimplementering.",
      
      // Tool titles - Sectoral Implementation (Swedish)
      energyTransitionTitle: "Mall för färdplan för energiomställning",
      energyTransitionDesc: "Ramverk för att utveckla omfattande färdplaner för att omvandla energisystem, med fasade tidslinjer och viktiga milstolpar.",
      adaptationPlanningTitle: "Ramverk för anpassningsplanering",
      adaptationPlanningDesc: "Systematiskt tillvägagångssätt för att utveckla klimatresiliensplaner som adresserar sårbarheter och bygger anpassningsförmåga.",
      carbonPricingTitle: "Implementeringsguide för koldioxidprissättning",
      carbonPricingDesc: "Praktisk vägledning för att utforma och implementera effektiva mekanismer för koldioxidprissättning anpassade till olika sammanhang.",
      natureSolutionsTitle: "Utvärderingsverktyg för naturbaserade lösningar",
      natureSolutionsDesc: "Metodik för att utvärdera och implementera naturbaserade tillvägagångssätt för klimatbegränsning och anpassning.",
      innovationTitle: "Accelerationspaket för klimatinnovation",
      innovationDesc: "Resurser för att stödja och accelerera klimatteknikinnovation och utplacering över sektorer.",
      
      // Tool titles - Advocacy & Scaling (Swedish)
      policyBriefTitle: "Mallar för klimatpolicyöversikter",
      policyBriefDesc: "Anpassningsbara mallar för att skapa övertygande policyöversikter för att påverka klimat- och energibeslut.",
      communicationTitle: "Verktygslåda för styrningskommunikation",
      communicationDesc: "Strategiska tillvägagångssätt och material för att kommunicera komplexa styrningskoncept till olika målgrupper.",
      institutionalTitle: "Guide till klimatinstitutionell reform",
      institutionalDesc: "Ramverk för att utvärdera och stärka institutionella arrangemang för att bättre hantera klimatutmaningar.",
      financeTitle: "Klimatfinansieringsåtkomstnavigator",
      financeDesc: "Guide till att identifiera, få tillgång till och utnyttja klimatfinansiering från olika källor för att implementera styrningsåtgärder.",
      hubConnectionTitle: "Guide för regional navkoppling",
      hubConnectionDesc: "Vägledning för att koppla lokala klimatåtgärder till regionala samordningsmekanismer genom de regionala klimat- och energistyrningsnavena.",
            
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
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #156D64, #2C8A78); color: white;">
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
      <div style="background-color: #e6f2f0; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(44, 138, 120, 0.1); border: 1px solid rgba(44, 138, 120, 0.2);">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2C8A78;">⚡</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.seedKitTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.seedKitDesc}
            </p>
            <a href={getFilePath(`seed-kit.zip`)} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.seedKitButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Framework Guides -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2C8A78;">{texts.guidesTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.guidesDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Technical Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.technicalGuideTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.technicalGuideDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`climate-energy-technical-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`climate-energy-technical-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Stakeholder Implementation Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #4A9586;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #4A9586;">{texts.stakeholderGuideTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.stakeholderGuideDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`climate-energy-stakeholder-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #4A9586; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`climate-energy-stakeholder-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #4A9586; border: 1px solid #4A9586; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Climate Action Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #68A094;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #68A094;">{texts.actionGuideTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.actionGuideDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`climate-energy-action-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #68A094; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`climate-energy-action-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #68A094; border: 1px solid #68A094; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Core Governance Tools -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2C8A78;">{texts.toolsTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.toolsDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Regional Hub Connection Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #156D64;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #156D64;">{texts.hubConnectionTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.hubConnectionDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`regional-hub-connection-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #156D64; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`regional-hub-connection-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #156D64; border: 1px solid #156D64; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Governance Readiness Assessment -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.readinessTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.readinessDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`governance-readiness-assessment-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`governance-readiness-assessment-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Just Transition Planning Template -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #39857A;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #39857A;">{texts.justTransitionTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.justTransitionDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`just-transition-planning-template-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #39857A; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`just-transition-planning-template-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #39857A; border: 1px solid #39857A; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Stakeholder Engagement Protocol -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #468F80;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #468F80;">{texts.stakeholderTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.stakeholderDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`stakeholder-engagement-protocol-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #468F80; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`stakeholder-engagement-protocol-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #468F80; border: 1px solid #468F80; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Climate-Energy Policy Integration Matrix -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #539987;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #539987;">{texts.policyIntegrationTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.policyIntegrationDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`policy-integration-matrix-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #539987; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`policy-integration-matrix-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #539987; border: 1px solid #539987; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Multi-level Governance Coordination Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #60A38D;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #60A38D;">{texts.coordinationGuideTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.coordinationGuideDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`governance-coordination-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #60A38D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`governance-coordination-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #60A38D; border: 1px solid #60A38D; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Sectoral Implementation Guides Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2C8A78;">{texts.sectoralTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.sectoralDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Energy Transition Roadmap Template -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.energyTransitionTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.energyTransitionDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`energy-transition-roadmap-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`energy-transition-roadmap-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Adaptation Planning Framework -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #39857A;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #39857A;">{texts.adaptationPlanningTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.adaptationPlanningDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`adaptation-planning-framework-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #39857A; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`adaptation-planning-framework-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #39857A; border: 1px solid #39857A; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Carbon Pricing Implementation Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #468F80;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #468F80;">{texts.carbonPricingTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.carbonPricingDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`carbon-pricing-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #468F80; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`carbon-pricing-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #468F80; border: 1px solid #468F80; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Nature-based Solutions Assessment Tool -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #539987;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #539987;">{texts.natureSolutionsTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.natureSolutionsDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`nature-based-solutions-tool-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #539987; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`nature-based-solutions-tool-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #539987; border: 1px solid #539987; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Climate Innovation Acceleration Kit -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #60A38D;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #60A38D;">{texts.innovationTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.innovationDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`innovation-acceleration-kit-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #60A38D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`innovation-acceleration-kit-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #60A38D; border: 1px solid #60A38D; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Advocacy & Scaling Tools Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2C8A78;">{texts.advocacyTitle}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.advocacyDesc}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Climate Policy Brief Templates -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.policyBriefTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.policyBriefDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`policy-brief-templates-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`policy-brief-templates-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #2C8A78; border: 1px solid #2C8A78; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Governance Communication Toolkit -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #39857A;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #39857A;">{texts.communicationTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.communicationDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`governance-communication-toolkit-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #39857A; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`governance-communication-toolkit-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #39857A; border: 1px solid #39857A; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

<!-- Climate Institutional Reform Guide -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #468F80;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #468F80;">{texts.institutionalTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.institutionalDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`institutional-reform-guide-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #468F80; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`institutional-reform-guide-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #468F80; border: 1px solid #468F80; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Climate Finance Access Navigator -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #539987;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #539987;">{texts.financeTitle}</h3>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{texts.financeDesc}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href={getFilePath(`finance-access-navigator-${currentLocale}.pdf`)} download style="display: inline-flex; align-items: center; background-color: #539987; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadPDF}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a href={getFilePath(`finance-access-navigator-${currentLocale}.md`)} download style="display: inline-flex; align-items: center; background-color: white; color: #539987; border: 1px solid #539987; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.downloadMarkdown}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Request & Feedback Section -->
      <div style="background-color: #e6f2f0; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.requestTitle}</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          {texts.requestDesc} <a href="{base}/contact" style="color: #156D64; text-decoration: underline; font-weight: 500;">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div style="margin-bottom: 2rem;">
        <a href="{base}/framework/tools" style="display: inline-flex; align-items: center; color: #2C8A78; font-weight: 500; text-decoration: none;">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {currentLocale === 'sv' ? 'Tillbaka till verktygsöversikt' : 'Back to Tools Overview'}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2C8A78;">{texts.languagesTitle}</h3>
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
