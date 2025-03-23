<!-- src/routes/framework/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>Framework - Global Governance Framework</title>
  <meta name="description" content="Explore tools for governance interoperability and evolution" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #1d4ed8); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('framework.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #bfdbfe;">{$t('framework.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <!-- Intro Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('framework.intro.title')}</h2>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph2')}
        </p>
      </div>
      
      <!-- New Section: Emerging Possibilities in Action -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('framework.emergingExamples.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.emergingExamples.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.emergingExamples.examples') as example, i}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #3b82f6;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #1e40af;">{example.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{example.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- New Section: Technological Enablers -->
      <div style="margin-bottom: 3rem; background-color: #f9fafb; padding: 2rem; border-radius: 0.75rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('framework.techEnablers.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.techEnablers.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.techEnablers.enablers') as enabler, i}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="background-color: #dbeafe; width: 2.5rem; height: 2.5rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                  {#if i === 0}
                    <!-- AI icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2563eb;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  {:else if i === 1}
                    <!-- Blockchain icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2563eb;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  {:else if i === 2}
                    <!-- Translation icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2563eb;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  {:else}
                    <!-- Network icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2563eb;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  {/if}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e40af;">{enabler.title}</h3>
              </div>
              <p style="color: #4b5563; line-height: 1.6;">{enabler.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- New Section: Bottom-Up Approaches -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('framework.bottomUpApproaches.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          {#each $t('framework.bottomUpApproaches.principles') as principle}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827;">{principle.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{principle.description}</p>
            </div>
          {/each}
        </div>
        
        <p style="color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.conclusion')}
        </p>
      </div>
      
      <!-- Coming Soon Box -->
      <div style="background-color: #eff6ff; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #dbeafe; margin: 2rem 0;">
        <h3 style="color: #1e40af; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">{$t('framework.comingSoon.title')}</h3>
        <p style="color: #1e40af; margin-bottom: 1rem;">
          {$t('framework.comingSoon.intro')}
        </p>
        <ul style="color: #1e40af; margin-left: 1.5rem; list-style-type: disc;">
          {#each $t('framework.comingSoon.items') as item}
            <li style="margin-bottom: 0.5rem;">{item}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Core Framework Elements -->
      <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('framework.coreElements.title')}</h2>
        
        <!-- Interoperability Framework -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1f2937;">{$t('framework.coreElements.interoperability.title')}</h3>
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
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1f2937;">{$t('framework.coreElements.operatingSystem.title')}</h3>
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
      
      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 3rem;">
        <a href="/contact" style="display: inline-block; background-color: #2563eb; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
          {$t('framework.cta')}
        </a>
      </div>
    </div>
  </div>
</section>
