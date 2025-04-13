<!-- src/routes/downloads/+page.svelte (updated version) -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores (optional, but helps avoid direct $ usage in script)
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define PDF links (now using `currentLocale` instead of `$locale`)
  const getPdfPath = (docName) => {
    return `${base}/downloads/${currentLocale}/${docName}.pdf`;
  };

  // Helper function (now using `currentLocale` instead of `$locale`)
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2B4B8C' : 'white'}; color: ${isActive ? 'white' : '#2B4B8C'}; font-weight: 500; text-decoration: none;`;
  }
</script>

<svelte:head>
  <title>{$t('downloads.title')} - Global Governance Framework</title>
  <meta name="description" content={$t('downloads.metaDescription')} />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">
        {$t('downloads.hero.title')}
      </h1>
      <p style="font-size: 1.25rem; color: #ffffff;">
        {$t('downloads.hero.subtitle')}
      </p>
    </div>
  </div>
</section>

<!-- Downloads Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {$t('downloads.intro')}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Download Card 1 - Core Principles -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2B4B8C;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.cards.principles.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.cards.principles.description')}</p>
          <a href={getPdfPath('Core-Principles')} download style="display: inline-flex; align-items: center; background-color: #2B4B8C; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Download Card 2 - Implementation Guidelines -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.cards.implementation.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.cards.implementation.description')}</p>
          <a href={getPdfPath('Implementation-Guidelines')} download style="display: inline-flex; align-items: center; background-color: #2D5F2D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Download Card 3 - Case Studies -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #DAA520;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.cards.caseStudies.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.cards.caseStudies.description')}</p>
          <a href={getPdfPath('Case-Studies')} download style="display: inline-flex; align-items: center; background-color: #DAA520; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Download Card 4 - Resources -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6B5CA5;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.cards.resources.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.cards.resources.description')}</p>
          <a href={getPdfPath('Resources')} download style="display: inline-flex; align-items: center; background-color: #6B5CA5; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Global Citizenship Framework Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{$t('downloads.globalCitizenship.title')}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {$t('downloads.globalCitizenship.description')}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Full Global Citizenship Framework -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2B4B8C;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">{$t('downloads.globalCitizenship.full.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.globalCitizenship.full.description')}</p>
          <a href={getPdfPath('Global-Citizenship')} download style="display: inline-flex; align-items: center; background-color: #2B4B8C; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- 4-Page Overview -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #DAA520;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #DAA520;">{$t('downloads.globalCitizenship.summary.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.globalCitizenship.summary.description')}</p>
          <a href={getPdfPath('Global-Citizenship-4-page-overview')} download style="display: inline-flex; align-items: center; background-color: #DAA520; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Implementation Frameworks Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{$t('downloads.implementationFrameworks.title')}</h2>
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {$t('downloads.implementationFrameworks.description')}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <!-- Economic Integration -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #B8860B;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.economic.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.economic.description')}</p>
          <a href={getPdfPath('Economic-Integration')} download style="display: inline-flex; align-items: center; background-color: #B8860B; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Environmental Stewardship -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.environment.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.environment.description')}</p>
          <a href={getPdfPath('Environmental-Stewardship')} download style="display: inline-flex; align-items: center; background-color: #2D5F2D; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Climate & Energy Governance -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.climateEnergy.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.climateEnergy.description')}</p>
          <a href={getPdfPath('Climate-Energy-Governance')} download style="display: inline-flex; align-items: center; background-color: #2C8A78; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Technology Governance -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #4B8AC2;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.technology.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.technology.description')}</p>
          <a href={getPdfPath('Technology-Governance')} download style="display: inline-flex; align-items: center; background-color: #4B8AC2; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
        
        <!-- Peace & Conflict Resolution -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6B5CA5;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.peace.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.peace.description')}</p>
          <a href={getPdfPath('Peace-Conflict-Resolution')} download style="display: inline-flex; align-items: center; background-color: #6B5CA5; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <!-- Religious & Spiritual Dialogue -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #9B6A8F;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.spiritual.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.spiritual.description')}</p>
          <a href={getPdfPath('Spiritual-Dialogue')} download style="display: inline-flex; align-items: center; background-color: #9B6A8F; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <!-- Integrated Meta-Governance -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #5E4B8B;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.meta.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.meta.description')}</p>
          <a href={getPdfPath('Meta-Governance')} download style="display: inline-flex; align-items: center; background-color: #5E4B8B; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <!-- Method & Tools -->
        <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D8F85;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{$t('downloads.implementationFrameworks.methods-tools.title')}</h2>
          <p style="color: #4b5563; margin-bottom: 1.5rem;">{$t('downloads.implementationFrameworks.methods-tools.description')}</p>
          <a href={getPdfPath('Methods-Tools')} download style="display: inline-flex; align-items: center; background-color: #2D8F85; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
            {$t('downloads.downloadButton')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Language switcher section -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2B4B8C;">{$t('downloads.otherLanguages.title')}</h3>
        <div style="display: flex; gap: 1rem;">
          <button on:click={() => setLocale('en')} style={getLanguageButtonStyle('en')}>
            English
          </button>
          <button on:click={() => setLocale('sv')} style={getLanguageButtonStyle('sv')}>
            Svenska
          </button>
        </div>
      </div>
      
      <div style="background-color: #e9f2e9; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{$t('downloads.otherFormats.title')}</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          {$t('downloads.otherFormats.description')} <a href="{base}/contact" style="color: #DAA520; text-decoration: underline; font-weight: 500;">{$t('downloads.otherFormats.contactLink')}</a>
        </p>
      </div>
    </div>
  </div>
</section>
