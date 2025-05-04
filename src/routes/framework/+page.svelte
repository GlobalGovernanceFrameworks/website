<!-- src/routes/framework/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Framework - Global Governance Framework</title>
  <meta name="description" content="Explore tools for governance interoperability and evolution" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('framework.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #ffffff;">{$t('framework.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Enhanced Documentation Quick Access Section -->
<section style="padding: 2rem 0; background-color: #e9f2e9; border-bottom: 1px solid #2D5F2D;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
      <div style="max-width: 700px; margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #2B4B8C; margin-bottom: 0.75rem;">
          {$t('framework.quickAccess.title')}
        </h2>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">
          {$t('framework.quickAccess.description')}
        </p>
        <div class="quick-access-buttons">
          <a class="button-gold" href="{base}/framework/docs">
            {$t('framework.quickAccess.viewDocs')}
          </a>
          <a class="button-outline" href="{base}/framework/docs/principles">
            {$t('framework.quickAccess.corePrinciples')}
          </a>
        </div>
      </div>
      
      <!-- Framework Components Grid -->
      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; width: 100%; max-width: 900px; margin-top: 2rem;">
        <!-- Documentation -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #2B4B8C; margin-bottom: 0.75rem;">{$t('framework.components.documentation.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/framework/docs">
                {$t('common.header.frameworkDocs')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/docs/principles">
                {$t('common.header.frameworkPrinciples')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/docs/implementation">
                {$t('common.header.frameworkImplementation')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/docs/case-studies">
                {$t('common.header.frameworkCaseStudies')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/docs/resources">
                {$t('common.header.frameworkResources')}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Applications -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #DAA520; margin-bottom: 0.75rem;">{$t('framework.components.applications.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/framework/global-citizenship">
                {$t('common.header.frameworkGlobalCitizenship')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/hubs">
                {$t('common.header.frameworkHubs')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/ai-futures">
                {$t('common.header.frameworkAIFutures')}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Tools & Resources -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #2D5F2D; margin-bottom: 0.75rem;">{$t('framework.components.tools.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/framework/tools">
                {$t('common.header.frameworkTools')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/framework/docs/glossary">
                {$t('framework.quickAccess.glossary')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/downloads">
                {$t('common.header.downloads')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Overview Card -->
      <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 100%; max-width: 900px; margin-top: 2rem; border-left: 4px solid #B8860B;">
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #B8860B; margin-right: 0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #B8860B; margin: 0;">{$t('framework.overview.title')}</h3>
        </div>
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
          {$t('framework.overview.description')}
        </p>
        <div style="display: flex; justify-content: flex-end;">
          <a href="{base}/framework/docs" style="display: inline-flex; align-items: center; color: #2B4B8C; font-weight: 600; text-decoration: none; transition: color 0.2s;" on:mouseover="{e => e.target.style.color = '#DAA520'}" on:mouseout="{e => e.target.style.color = '#2B4B8C'}">
            {$t('framework.overview.learnMore')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1rem; height: 1rem; margin-left: 0.25rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <!-- Intro Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.intro.title')}</h2>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph2')}
        </p>
      </div>
      
      <!-- Emerging Possibilities in Action -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.emergingExamples.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.emergingExamples.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.emergingExamples.examples') as example}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{example.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{example.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Technological Enablers -->
      <div style="margin-bottom: 3rem; background-color: #e9f2e9; padding: 2rem; border-radius: 0.75rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.techEnablers.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.techEnablers.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.techEnablers.enablers') as enabler, i}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="background-color: #d1dbe9; width: 2.5rem; height: 2.5rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                  {#if i === 0}
                    <!-- AI icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  {:else if i === 1}
                    <!-- Blockchain icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  {:else if i === 2}
                    <!-- Translation icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  {:else}
                    <!-- Network icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  {/if}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #B8860B;">{enabler.title}</h3>
              </div>
              <p style="color: #4b5563; line-height: 1.6;">{enabler.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Bottom-Up Approaches -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.bottomUpApproaches.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          {#each $t('framework.bottomUpApproaches.principles') as principle}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #2D5F2D;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{principle.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{principle.description}</p>
            </div>
          {/each}
        </div>
        
        <p style="color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.conclusion')}
        </p>
      </div>
      
      <!-- Core Framework Elements -->
      <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.coreElements.title')}</h2>
        
        <!-- Interoperability Framework -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #B8860B;">{$t('framework.coreElements.interoperability.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7;">
            {$t('framework.coreElements.interoperability.intro')}
          </p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
            {#each $t('framework.coreElements.interoperability.items') as item}
              <li style="margin-bottom: 0.5rem;"><strong>{item.name}:</strong> {item.description}</li>
            {/each}
          </ul>
        </div>
        
        <!-- Governance Operating System -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #B8860B;">{$t('framework.coreElements.operatingSystem.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7;">
            {$t('framework.coreElements.operatingSystem.intro')}
          </p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
            {#each $t('framework.coreElements.operatingSystem.items') as item}
              <li style="margin-bottom: 0.5rem;"><strong>{item.name}:</strong> {item.description}</li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Learn More Section -->
      <section style="padding: 3rem 0; background-color: #e9f2e9; margin-top: 3rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
          <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
              {$t('framework.learnMore.title')}
            </h2>
            <p style="color: #4b5563; margin-bottom: 2rem;">
              {$t('framework.learnMore.description')}
            </p>
            <a href="{base}/framework/docs" style="display: inline-flex; align-items: center; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.2s;" on:mouseover="{e => e.target.style.backgroundColor = '#B8860B'}" on:mouseout="{e => e.target.style.backgroundColor = '#DAA520'}">
              {$t('framework.learnMore.button')}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 3rem;">
        <a href="{base}/contact" style="display: inline-block; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.2s;" on:mouseover="{e => e.target.style.backgroundColor = '#B8860B'}" on:mouseout="{e => e.target.style.backgroundColor = '#DAA520'}">
          {$t('framework.cta')}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* --- Card Container --- */
  .hover-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    transform-style: preserve-3d;
    will-change: transform;
    border-top: 4px solid currentColor;
  }

  .hover-card:hover {
    transform: translateY(-5px);
  }

  /* --- Section Titles in Cards --- */
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* --- Vertical List Items --- */
  li {
    margin-bottom: 0.5rem;
  }

  /* --- Menu Links Inside Cards --- */
  .menu-link {
    display: block;
    color: #4b5563;
    font-weight: 600;
    text-decoration: none;
    padding: 0.5rem 0.5rem 0.5rem 0.75rem;
    border-left: 3px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
    line-height: 1.5;
    box-sizing: border-box;
  }

  .menu-link:hover {
    color: #DAA520;
    border-color: #DAA520;
  }

  /* --- Top Buttons --- */
  .button-gold,
  .button-outline {
    min-width: 180px;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    text-align: center;
    display: inline-block;
  }

  .button-gold {
    background-color: #DAA520;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  .button-gold:hover {
    background-color: #B8860B;
  }

  .button-outline {
    background-color: white;
    color: #2D5F2D;
    border: 1px solid #2D5F2D;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .button-outline:hover {
    color: #DAA520;
    border-color: #DAA520;
  }

  .quick-access-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
</style>


