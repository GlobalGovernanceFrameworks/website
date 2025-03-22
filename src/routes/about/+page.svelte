<!-- src/routes/about/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>About - Global Governance Framework</title>
  <meta name="description" content="Learn about the Global Governance Framework project" />
</svelte:head>

<!-- Hero Section -->
<section class="py-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">{$t('about.hero.title')}</h1>
      <p class="text-xl text-blue-200">{$t('about.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Manual prose styling in case Tailwind is not working properly -->
      <div style="max-width: 65ch; margin: 0 auto; line-height: 1.7; font-size: 1.125rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2rem; color: #111827;">{$t('about.vision.title')}</h2>
        <p style="margin-bottom: 1.5rem;">
          {$t('about.vision.paragraph1')}
        </p>
        
        <p style="margin-bottom: 1.5rem;">
          {$t('about.vision.paragraph2')}
        </p>
        
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2rem; color: #111827;">{$t('about.principles.title')}</h2>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc;">
          {#each $t('about.principles.list') as principle}
            <li style="margin-bottom: 0.5rem;"><strong>{principle.name}:</strong> {principle.description}</li>
          {/each}
        </ul>
        
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2rem; color: #111827;">{$t('about.approach.title')}</h2>
        <p style="margin-bottom: 1.5rem;">
          {$t('about.approach.intro')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc;">
          {#each $t('about.approach.list') as item}
            <li style="margin-bottom: 0.5rem;">{item}</li>
          {/each}
        </ul>
        
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2rem; color: #111827;">{$t('about.origins.title')}</h2>
        <p style="margin-bottom: 1.5rem;">
          {$t('about.origins.paragraph1')}
        </p>
        
        <p style="margin-bottom: 1.5rem;">
          {$t('about.origins.paragraph2')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Get Involved Section -->
<section class="py-12 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">{$t('about.getInvolved.title')}</h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">{$t('about.getInvolved.contribute.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.contribute.description')}</p>
          <a href="/contact" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.contribute.link')}</a>
        </div>
        
        <!-- Card 2 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">{$t('about.getInvolved.join.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.join.description')}</p>
          <a href="https://github.com/GlobalGovernanceFramework" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.join.link')}</a>
        </div>
        
        <!-- Card 3 -->
        <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">{$t('about.getInvolved.apply.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563;">{$t('about.getInvolved.apply.description')}</p>
          <a href="/framework" style="color: #2563eb; font-weight: 500;">{$t('about.getInvolved.apply.link')}</a>
        </div>
      </div>
    </div>
  </div>
</section>
