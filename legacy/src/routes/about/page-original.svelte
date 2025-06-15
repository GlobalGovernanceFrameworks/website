<!-- src/routes/about/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>About - Global Governance Framework</title>
  <meta name="description" content="Learn about the Global Governance Framework project" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #1d4ed8); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('about.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #bfdbfe;">{$t('about.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <!-- Vision -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.vision.title')}</h2>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.vision.paragraph1')}
        </p>
        
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.vision.paragraph2')}
        </p>
      </div>
      
      <!-- New Section: Interconnectedness -->
      <div style="margin-bottom: 3rem; background-color: #f9fafb; padding: 2rem; border-radius: 0.75rem; border-left: 4px solid #3b82f6;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.interconnectedness.title')}</h2>
        
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.interconnectedness.paragraph1')}
        </p>
        
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.interconnectedness.paragraph2')}
        </p>
        
        <p style="color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.interconnectedness.paragraph3')}
        </p>
      </div>
      
      <!-- New Section: Accelerating Positive Developments -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.acceleration.title')}</h2>
        
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.acceleration.paragraph1')}
        </p>
        
        <!-- Examples of Governance Innovations -->
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          {#each $t('about.acceleration.examples') as example}
            <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #1e40af;">{example.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{example.description}</p>
            </div>
          {/each}
        </div>
        
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.acceleration.paragraph2')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('about.acceleration.benefits') as benefit}
            <li style="margin-bottom: 0.5rem;">{benefit}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Core Principles Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.principles.title')}</h2>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('about.principles.list') as principle}
            <li style="margin-bottom: 0.5rem;"><strong>{principle.name}:</strong> {principle.description}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Approach Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.approach.title')}</h2>
        
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.approach.intro')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('about.approach.list') as item}
            <li style="margin-bottom: 0.5rem;">{item}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Origins Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('about.origins.title')}</h2>
        
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.origins.paragraph1')}
        </p>
        
        <p style="color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('about.origins.paragraph2')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Get Involved Section -->
<section style="padding: 3rem 0; background-color: #f9fafb;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 2rem; text-align: center; color: #111827;">{$t('about.getInvolved.title')}</h2>
      
      <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem;">
        <!-- Card 1 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827;">{$t('about.getInvolved.contribute.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.contribute.description')}</p>
          <a href="{base}/contact" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.contribute.link')}</a>
        </div>
        
        <!-- Card 2 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827;">{$t('about.getInvolved.join.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.join.description')}</p>
          <a href="https://github.com/GlobalGovernanceFramework" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.join.link')}</a>
        </div>
        
        <!-- Card 3 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827;">{$t('about.getInvolved.apply.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.apply.description')}</p>
          <a href="{base}/frameworks" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.apply.link')}</a>
        </div>
      </div>
    </div>
  </div>
</section>
