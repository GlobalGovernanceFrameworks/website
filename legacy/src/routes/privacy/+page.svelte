<!-- src/routes/privacy/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>Privacy Policy - Global Governance Framework</title>
  <meta name="description" content="Privacy policy for the Global Governance Framework website" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #1d4ed8); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('privacy.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #bfdbfe;">{$t('privacy.hero.subtitle')}</p>
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
          {$t('privacy.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.intro.paragraph2')}
        </p>
      </div>
      
      <!-- Data Collection -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.dataCollection.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.dataCollection.paragraph')}
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.5rem; margin-top: 1.5rem;">
          {#each $t('privacy.dataCollection.types') as type}
            <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #111827;">{type.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{type.description}</p>
            </div>
          {/each}
        </div>
        
        <div style="background-color: #ecfdf5; padding: 1.5rem; border-radius: 0.5rem; border-left: 3px solid #10b981; margin-top: 1.5rem;">
          <p style="color: #065f46; line-height: 1.6; font-weight: 500;">
            {$t('privacy.dataCollection.noTracking')}
          </p>
        </div>
      </div>
      
      <!-- Data Use -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.dataUse.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.dataUse.paragraph')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('privacy.dataUse.uses') as use}
            <li style="margin-bottom: 0.5rem;">{use}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Third-Party Services -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.thirdParty.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.thirdParty.paragraph')}
        </p>
      </div>
      
      <!-- Data Security -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.dataSecurity.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.dataSecurity.paragraph')}
        </p>
      </div>
      
      <!-- User Rights -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.userRights.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.userRights.paragraph')}
        </p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('privacy.userRights.rights') as right}
            <li style="margin-bottom: 0.5rem;">{right}</li>
          {/each}
        </ul>
        
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.userRights.contact')}
        </p>
      </div>
      
      <!-- Changes to Policy -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.changes.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.changes.paragraph')}
        </p>
      </div>
      
      <!-- Contact -->
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">{$t('privacy.contact.title')}</h2>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('privacy.contact.paragraph')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem; font-weight: 500;">
          {$t('privacy.contact.email')}
        </p>
      </div>
      
      <!-- Effective Date -->
      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 0.875rem;">
          {$t('privacy.effective')}
        </p>
      </div>
      
    </div>
  </div>
</section>
