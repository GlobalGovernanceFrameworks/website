<!-- src/routes/terms/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>Terms of Use - Global Governance Framework</title>
  <meta name="description" content="Terms of use for the Global Governance Framework website" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #1d4ed8); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('terms.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #bfdbfe;">{$t('terms.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      
      <!-- Introduction -->
      <div style="margin-bottom: 2rem;">
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.intro.paragraph2')}
        </p>
      </div>
      
      <!-- Content and IP -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.content.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.content.paragraph1')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.content.paragraph2')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('terms.content.uses') as use}
            <li style="margin-bottom: 0.5rem;">{use}</li>
          {/each}
        </ul>
        
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.content.attribution')}
        </p>
      </div>
      
      <!-- User Content -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.userContent.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.userContent.paragraph1')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.userContent.paragraph2')}
        </p>
      </div>
      
      <!-- User Conduct -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.conduct.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.conduct.paragraph')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('terms.conduct.rules') as rule}
            <li style="margin-bottom: 0.5rem;">{rule}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Liability -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.liability.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.liability.paragraph1')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.liability.paragraph2')}
        </p>
      </div>
      
      <!-- External Links -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.links.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.links.paragraph')}
        </p>
      </div>
      
      <!-- Changes to Terms -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.changes.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.changes.paragraph')}
        </p>
      </div>
      
      <!-- Contact -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('terms.contact.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('terms.contact.paragraph')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem; font-weight: 500;">
          {$t('terms.contact.email')}
        </p>
      </div>
      
      <!-- Effective Date -->
      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 0.875rem;">
          {$t('terms.effective')}
        </p>
      </div>
      
    </div>
  </div>
</section>
