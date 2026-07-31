<!-- src/routes/about/+page.svelte -->
<script>
  import { t, locale, loadTranslations } from '$lib/i18n';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';

  $: if (browser && $locale) {
    loadTranslations($locale, '/about');
  }
</script>

<svelte:head>
  <title>About Global Governance Frameworks</title>
  <meta
    name="description"
    content="Learn the purpose, transition strategy, design commitments, and current state of Global Governance Frameworks."
  />
</svelte:head>

<section class="hero">
  <div class="shell narrow">
    <h1>{$t('about.hero.title')}</h1>
    <p>{$t('about.hero.subtitle')}</p>
  </div>
</section>

<main>
  <section class="section">
    <div class="shell narrow">
      <div class="purpose">
        <p class="eyebrow">{$t('about.purpose.title')}</p>
        <p class="lead">{$t('about.purpose.opening')}</p>
        <blockquote>{$t('about.purpose.statement')}</blockquote>
        <p>{$t('about.purpose.closing')}</p>
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="shell narrow">
      <h2>{$t('about.diagnosis.title')}</h2>
      <p>{$t('about.diagnosis.paragraph1')}</p>
      <p>{$t('about.diagnosis.paragraph2')}</p>
      <div class="callout">
        {$t('about.diagnosis.callout')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="narrow section-intro">
        <h2>{$t('about.whatItIs.title')}</h2>
        <p>{$t('about.whatItIs.intro')}</p>
      </div>

      <div class="card-grid two">
        {#each $t('about.whatItIs.items') as item}
          <article class="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section transition-section">
    <div class="shell">
      <div class="narrow section-intro">
        <p class="eyebrow light">{$t('about.transition.eyebrow')}</p>
        <h2>{$t('about.transition.title')}</h2>
        <p>{$t('about.transition.intro')}</p>
      </div>

      <ol class="steps">
        {#each $t('about.transition.steps') as step, index}
          <li>
            <span class="step-number">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        {/each}
      </ol>

      <div class="transition-principle">
        {$t('about.transition.principle')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="narrow section-intro">
        <h2>{$t('about.accountability.title')}</h2>
        <p>{$t('about.accountability.intro')}</p>
      </div>

      <div class="card-grid accountability-grid">
        {#each $t('about.accountability.tests') as test}
          <article class="test-card">
            <h3>{test.title}</h3>
            <p>{test.description}</p>
          </article>
        {/each}
      </div>

      <p class="narrow closing-statement">
        {$t('about.accountability.closing')}
      </p>
    </div>
  </section>

  <section class="section section-soft">
    <div class="shell">
      <div class="narrow section-intro">
        <h2>{$t('about.principles.title')}</h2>
      </div>

      <div class="principles-grid">
        {#each $t('about.principles.list') as principle}
          <article>
            <h3>{principle.name}</h3>
            <p>{principle.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell narrow">
      <div class="reality-panel">
        <h2>{$t('about.currentReality.title')}</h2>
        <p>{$t('about.currentReality.paragraph1')}</p>
        <p>{$t('about.currentReality.paragraph2')}</p>
        <p>{$t('about.currentReality.paragraph3')}</p>
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="shell narrow">
      <div class="text-section">
        <h2>{$t('about.origins.title')}</h2>
        <p>{$t('about.origins.paragraph1')}</p>
        <p>{$t('about.origins.paragraph2')}</p>
      </div>

      <div class="text-section">
        <h2>{$t('about.development.title')}</h2>
        <p>{$t('about.development.paragraph1')}</p>
        <p>{$t('about.development.paragraph2')}</p>
        <p>{$t('about.development.paragraph3')}</p>
      </div>

      <div class="resource-grid">
        <article class="resource-card blue">
          <h3>{$t('about.globalGovernanceDownload.title')}</h3>
          <p>{$t('about.globalGovernanceDownload.description')}</p>
          <a
            href="{base}/Global-Governance-Natural-Steps-Toward-A-Thriving-World.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {$t('about.globalGovernanceDownload.button')}
          </a>
        </article>

        <article class="resource-card gold">
          <h3>{$t('about.moreResources.title')}</h3>
          <p>{$t('about.moreResources.description')}</p>
          <a href="{base}/resources">
            {$t('about.moreResources.button')}
          </a>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell narrow">
      <div class="collaboration-panel">
        <h2>{$t('about.seekingCollaborators.title')}</h2>
        <p>{$t('about.seekingCollaborators.paragraph1')}</p>
        <p>{$t('about.seekingCollaborators.paragraph2')}</p>
        <p>{$t('about.seekingCollaborators.paragraph3')}</p>
      </div>

      <div class="founder-note">
        <h2>{$t('about.foundersNote.title')}</h2>
        <p>{$t('about.foundersNote.paragraph1')}</p>
        <p>{$t('about.foundersNote.paragraph2')}</p>
        <p>{$t('about.foundersNote.paragraph3')}</p>
        <p class="founder-signature">{$t('about.foundersNote.signature')}</p>
      </div>
    </div>
  </section>

  <section class="section section-green">
    <div class="shell">
      <div class="narrow section-intro">
        <h2>{$t('about.whatWeNeed.title')}</h2>
        <p>{$t('about.whatWeNeed.paragraph1')}</p>
      </div>

      <div class="needs-grid">
        {#each $t('about.whatWeNeed.needs') as need}
          <article>
            <h3>{need.category}</h3>
            <p>{need.description}</p>
          </article>
        {/each}
      </div>

      <p class="narrow closing-statement">
        {$t('about.whatWeNeed.paragraph2')}
      </p>
    </div>
  </section>

  <section class="section involved-section">
    <div class="shell">
      <div class="narrow section-intro centered">
        <h2>{$t('about.getInvolved.title')}</h2>
      </div>

      <div class="card-grid three">
        <article class="action-card">
          <h3>{$t('about.getInvolved.contribute.title')}</h3>
          <p>{$t('about.getInvolved.contribute.description')}</p>
          <a href="{base}/contact">{$t('about.getInvolved.contribute.link')}</a>
        </article>

        <article class="action-card">
          <h3>{$t('about.getInvolved.join.title')}</h3>
          <p>{$t('about.getInvolved.join.description')}</p>
          <a href="{base}/get-involved">{$t('about.getInvolved.join.primaryLink')}</a>
          <a class="secondary-link" href="https://github.com/BjornKennethHolmstrom/global-governance-frameworks" target="_blank" rel="noopener noreferrer">
            {$t('about.getInvolved.join.secondaryLink')}
          </a>
        </article>

        <article class="action-card">
          <h3>{$t('about.getInvolved.apply.title')}</h3>
          <p>{$t('about.getInvolved.apply.description')}</p>
          <a href="{base}/frameworks">{$t('about.getInvolved.apply.link')}</a>
        </article>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
  }

  .shell {
    width: min(1120px, calc(100% - 2rem));
    margin: 0 auto;
  }

  .narrow {
    max-width: 760px;
  }

  .hero {
    padding: 5rem 0;
    color: white;
    background:
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.14), transparent 26%),
      linear-gradient(135deg, #203f7f, #6b5ca5);
  }

  .hero h1 {
    margin: 0 0 1rem;
    font-size: clamp(2.5rem, 6vw, 4.25rem);
    line-height: 1.05;
  }

  .hero p {
    max-width: 700px;
    margin: 0;
    color: #f8fbff;
    font-size: clamp(1.15rem, 2.5vw, 1.45rem);
    font-weight: 500;
    line-height: 1.6;
    text-shadow: 0 1px 2px rgba(12, 24, 52, 0.28);
  }

  .section {
    padding: 4.5rem 0;
  }

  .section-soft {
    background: #f6f8fc;
  }

  .section-green {
    background: #eef8f1;
  }

  .transition-section {
    color: white;
    background: linear-gradient(135deg, #213f79, #385f77);
  }

  .involved-section {
    background: #e9f2e9;
  }

  h2 {
    margin: 0 0 1.25rem;
    color: #2b4b8c;
    font-size: clamp(1.9rem, 4vw, 2.6rem);
    line-height: 1.15;
  }

  h3 {
    margin: 0 0 0.65rem;
    color: #2b4b8c;
    font-size: 1.2rem;
    line-height: 1.3;
  }

  p {
    color: #4b5563;
    font-size: 1.08rem;
    line-height: 1.75;
  }

  .section-intro {
    margin-bottom: 2.25rem;
  }

  .centered {
    text-align: center;
  }

  .eyebrow {
    margin: 0 0 0.65rem;
    color: #6b5ca5;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .eyebrow.light {
    color: #dce9ff;
  }

  .purpose .lead {
    margin-top: 0;
    color: #2f3a4a;
    font-size: 1.35rem;
  }

  blockquote {
    margin: 2rem 0;
    padding: 1.5rem 1.75rem;
    color: #203f7f;
    background: #edf3ff;
    border-left: 5px solid #6b5ca5;
    border-radius: 0.5rem;
    font-size: clamp(1.35rem, 3vw, 1.8rem);
    font-weight: 700;
    line-height: 1.45;
  }

  .callout,
  .transition-principle,
  .closing-statement {
    margin-top: 2rem;
    padding: 1.4rem 1.5rem;
    border-radius: 0.6rem;
    font-size: 1.1rem;
    font-weight: 650;
    line-height: 1.65;
  }

  .callout {
    color: #213f79;
    background: white;
    border-left: 4px solid #daa520;
  }

  .card-grid,
  .principles-grid,
  .needs-grid,
  .resource-grid {
    display: grid;
    gap: 1.25rem;
  }

  .card-grid.two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card-grid.three {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .accountability-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .card,
  .test-card,
  .action-card,
  .needs-grid article {
    padding: 1.5rem;
    background: white;
    border: 1px solid #dfe5ef;
    border-radius: 0.75rem;
    box-shadow: 0 8px 24px rgba(31, 51, 91, 0.06);
  }

  .card p,
  .test-card p,
  .action-card p,
  .needs-grid p,
  .principles-grid p {
    margin-bottom: 0;
    font-size: 1rem;
  }

  .transition-section h2,
  .transition-section h3,
  .transition-section p {
    color: white;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .steps li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1.35rem;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 0.75rem;
  }

  .steps p {
    margin: 0;
    color: #e9f0fb;
    font-size: 1rem;
  }

  .step-number {
    display: grid;
    width: 2rem;
    height: 2rem;
    color: #213f79;
    background: #f4d35e;
    border-radius: 999px;
    place-items: center;
    font-weight: 800;
  }

  .transition-principle {
    color: white;
    background: rgba(255, 255, 255, 0.12);
    border-left: 4px solid #f4d35e;
  }

  .test-card {
    padding: 1.25rem;
    border-top: 4px solid #6b5ca5;
  }

  .test-card h3 {
    font-size: 1.05rem;
  }

  .closing-statement {
    color: #243b64;
    background: #edf3ff;
  }

  .principles-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .principles-grid article {
    padding: 0 1.25rem;
    border-left: 3px solid #daa520;
  }

  .reality-panel,
  .collaboration-panel,
  .founder-note {
    padding: 2rem;
    border-radius: 0.75rem;
  }

  .reality-panel {
    color: #78350f;
    background: #fff7e7;
    border-left: 5px solid #f59e0b;
  }

  .reality-panel h2,
  .reality-panel p {
    color: inherit;
  }

  .text-section + .text-section {
    margin-top: 3.5rem;
  }

  .resource-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 3.5rem;
  }

  .resource-card {
    padding: 1.6rem;
    border-radius: 0.75rem;
  }

  .resource-card.blue {
    background: #edf5ff;
    border-left: 4px solid #2b4b8c;
  }

  .resource-card.gold {
    background: #fff6d9;
    border-left: 4px solid #daa520;
  }

  .resource-card a,
  .action-card a {
    display: inline-block;
    margin-top: 0.35rem;
    color: #8a6500;
    font-weight: 700;
    text-decoration: none;
  }

  .resource-card a:hover,
  .action-card a:hover {
    text-decoration: underline;
  }

  .collaboration-panel {
    color: #1e3a8a;
    background: #eff6ff;
    border-left: 5px solid #3b82f6;
  }

  .collaboration-panel h2,
  .collaboration-panel p {
    color: inherit;
  }

  .founder-note {
    margin-top: 3rem;
    color: #1e3a8a;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-left: 5px solid #2b4b8c;
    font-style: italic;
  }

  .founder-note h2 {
    color: #2b4b8c;
    font-size: 1.6rem;
    font-style: normal;
  }

  .founder-note p {
    color: inherit;
  }

  .founder-signature {
    text-align: right;
    font-weight: 700;
    font-style: normal;
  }

  .needs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .needs-grid article {
    box-shadow: none;
    border-color: #cfe5d5;
  }

  .action-card {
    display: flex;
    flex-direction: column;
  }

  .action-card p {
    flex: 1;
  }

  .action-card .secondary-link {
    margin-top: 0.7rem;
    color: #64748b;
    font-size: 0.92rem;
  }

  @media (max-width: 980px) {
    .accountability-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .principles-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card-grid.three {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .hero,
    .section {
      padding: 3.25rem 0;
    }

    .card-grid.two,
    .steps,
    .principles-grid,
    .needs-grid,
    .resource-grid,
    .accountability-grid {
      grid-template-columns: 1fr;
    }

    .reality-panel,
    .collaboration-panel,
    .founder-note {
      padding: 1.35rem;
    }
  }
</style>
