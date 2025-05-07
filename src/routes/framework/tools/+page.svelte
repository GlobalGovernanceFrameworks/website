<!-- src/routes/framework/tools/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2B4B8C' : 'white'}; color: ${isActive ? 'white' : '#2B4B8C'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Framework Tools Overview",
      subtitle: "Implementation resources for Global Governance Frameworks",
      intro: "Access tools, templates, and resources to help implement various governance frameworks. Each framework has its own set of specialized tools tailored to its unique focus and requirements.",
      availableResources: "Currently Available Resources",
      climateDesc: "Tools for implementing the Climate & Energy Governance Framework, including assessment tools, transition planning templates, and advocacy resources for climate policy.",
      climateButton: "Access Climate & Energy Tools",
      peaceTitle: "Peace & Conflict Resolution Framework Tools",
      peaceDesc: "Resources for implementing peace governance at multiple levels, including conflict analysis templates, dialogue protocols, and tools for transitional justice, early warning systems, and trauma-informed facilitation.",
      peaceButton: "Access Peace & Conflict Tools",
      educationTitle: "Education Framework Tools",
      educationDesc: "Tools for implementing the Perfected Enhanced Educational Systems Framework, including project guides, assessment tools, and advocacy resources.",
      educationButton: "Access Education Tools",
      foodTitle: "Food Systems & Agriculture Framework Tools",
      foodDesc: "Resources for implementing sustainable food systems, including regenerative agriculture guides, stakeholder engagement templates, and policy harmonization tools.",
      foodButton: "Access Food Systems Tools",
      comingSoon: "Coming Soon",
      otherFrameworks: "Other Framework Resources",
      otherFrameworksDesc: "Implementation tools for the following frameworks are currently in development and will be made available soon:",
      environmentalTitle: "Environmental Stewardship Framework",
      technologyTitle: "Technology Governance Framework",
      economicTitle: "Economic Integration Framework",
      spiritualTitle: "Religious & Spiritual Dialogue Framework",
      metaTitle: "Integrated Meta-Governance Framework",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific framework? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages"
    },
    sv: {
      title: "Översikt över ramverksverktyg",
      subtitle: "Implementeringsresurser för globala styrningsramverk",
      intro: "Få tillgång till verktyg, mallar och resurser för att implementera olika styrningsramverk. Varje ramverk har sin egen uppsättning specialiserade verktyg anpassade efter dess unika fokus och krav.",
      availableResources: "Tillgängliga resurser",
      climateDesc: "Verktyg för att implementera ramverket för klimat- och energistyrning, inklusive bedömningsverktyg, mallar för omställningsplanering och opinionsbildningsresurser för klimatpolitik.",
      climateButton: "Öppna klimat- och energiverktyg",
      peaceTitle: "Verktyg för fred och konfliktlösningsramverk",
      peaceDesc: "Resurser för att implementera fredsarbete på flera nivåer, inklusive mallar för konfliktanalys, dialogprotokoll och verktyg för övergångsrättvisa, tidiga varningssystem och traumamedveten facilitering.",
      peaceButton: "Öppna freds- och konfliktverktyg",
      educationTitle: "Verktyg för utbildningsramverket",
      educationDesc: "Verktyg för att implementera det Perfekterade Förstärkta Utbildningssystemet, inklusive projektguider, bedömningsverktyg och opinionsbildningsresurser.",
      educationButton: "Öppna utbildningsverktyg",
      foodTitle: "Verktyg för matsystem och jordbruksramverk",
      foodDesc: "Resurser för att implementera hållbara matsystem, inklusive guider för regenerativt jordbruk, mallar för intressentengagemang och verktyg för policyharmonisering.",
      foodButton: "Öppna matsystemverktyg",
      comingSoon: "Kommer snart",
      otherFrameworks: "Övriga ramverksresurser",
      otherFrameworksDesc: "Implementeringsverktyg för följande ramverk är för närvarande under utveckling och kommer att göras tillgängliga inom kort:",
      environmentalTitle: "Miljöförvaltningsramverk",
      technologyTitle: "Styrningsramverk för teknik",
      economicTitle: "Ramverk för ekonomisk integration",
      spiritualTitle: "Ramverk för religiös och andlig dialog",
      metaTitle: "Integrerat meta-styrningsramverk",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt ramverk? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk"
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

      <!-- Available Resources Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.availableResources}</h2>

      <!-- Climate & Energy Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2C8A78;">⚡</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.climateTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.climateDesc}
            </p>
            <a href="{base}/framework/tools/energy" style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.climateButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Peace Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6B5CA5; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #6B5CA5;">🕊️</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #6B5CA5;">{texts.peaceTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.peaceDesc}
            </p>
            <a href="{base}/framework/tools/peace" style="display: inline-flex; align-items: center; background-color: #6B5CA5; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.peaceButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Education Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2D5F2D;">🎓</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{texts.educationTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.educationDesc}
            </p>
            <a href="{base}/framework/tools/education" style="display: inline-flex; align-items: center; background-color: #2D5F2D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.educationButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Food Systems Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2e7d32; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2e7d32;">🌱</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.foodTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.foodDesc}
            </p>
            <a href="{base}/framework/tools/food-systems" style="display: inline-flex; align-items: center; background-color: #2e7d32; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.foodButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Coming Soon Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.comingSoon}</h2>
      
      <!-- Other Frameworks Section -->
      <div style="background-color: #f0f4ff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">{texts.otherFrameworks}</h3>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">
          {texts.otherFrameworksDesc}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <!-- Environmental Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #2D5F2D;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #2D5F2D;">🌿</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #2D5F2D; margin: 0;">{texts.environmentalTitle}</h4>
            </div>
          </div>
          
          <!-- Technology Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #4B8AC2;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #4B8AC2;">🤖</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #4B8AC2; margin: 0;">{texts.technologyTitle}</h4>
            </div>
          </div>
          
          <!-- Economic Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #B8860B;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #B8860B;">💱</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #B8860B; margin: 0;">{texts.economicTitle}</h4>
            </div>
          </div>
          
          <!-- Spiritual Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #9B6A8F;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #9B6A8F;">🕊️</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #9B6A8F; margin: 0;">{texts.spiritualTitle}</h4>
            </div>
          </div>
          
          <!-- Meta-Governance Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #5E4B8B;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #5E4B8B;">🔄</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #5E4B8B; margin: 0;">{texts.metaTitle}</h4>
            </div>
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
