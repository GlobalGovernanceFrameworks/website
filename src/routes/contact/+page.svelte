<!-- src/routes/contact/+page.svelte -->
<script>
  import { t } from '$lib/i18n';

  let name = '';
  let email = '';
  let message = '';
  let subject = 'general';
  let isSubmitting = false;
  let submitSuccess = false;
  let submitError = false;
  const FORMSPREE_ID = "xldjbjgl";

  async function handleSubmit() {
    isSubmitting = true;
    submitSuccess = false;
    submitError = false;
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (response.ok) {
        submitSuccess = true;
        name = '';
        email = '';
        message = '';
        subject = 'general';
      } else {
        submitError = true;
      }
    } catch (error) {
      submitError = true;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact - Global Governance Framework</title>
  <meta name="description" content="Get in touch with the Global Governance Framework project" />
</svelte:head>

<!-- Hero Section with Adjusted Theme -->
<section style="padding: 4rem 0; background: linear-gradient(to bottom right, #6B5CA5, #4B5CA5); color: #FFF; text-align: center;">
  <div style="max-width: 800px; margin: auto;">
    <h1 style="font-size: 2.5rem; font-weight: 700;">{$t('contact.hero.title')}</h1>
    <p style="font-size: 1.25rem; margin-top: 1rem;">{$t('contact.hero.subtitle')}</p>
  </div>
</section>

<!-- Contact Form Section -->
<section style="padding: 4rem 0; background-color: #F4E5D4;">
  <div style="max-width: 900px; margin: auto; padding: 0 1rem;">
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <form on:submit|preventDefault={handleSubmit} style="background: #FFF3E0; padding: 2rem; border-radius: 10px; width: 100%; max-width: 600px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: #4A3228;">{$t('contact.form.title')}</h2>
        {#if submitSuccess}
          <p style="color: #2D6A4F; background: #A3B18A; padding: 1rem; border-radius: 8px;">{$t('contact.form.success')}</p>
        {/if}
        {#if submitError}
          <p style="color: #8B0000; background: #F28F8F; padding: 1rem; border-radius: 8px;">{$t('contact.form.error')}</p>
        {/if}
        <label style="display: block; margin-bottom: 0.5rem; color: #4A3228;">{$t('contact.form.fields.name.label')}</label>
        <input type="text" bind:value={name} required style="width: 100%; padding: 0.75rem; border: 1px solid #A3B18A; border-radius: 5px;">

        <label style="display: block; margin-top: 1rem; color: #4A3228;">{$t('contact.form.fields.email.label')}</label>
        <input type="email" bind:value={email} required style="width: 100%; padding: 0.75rem; border: 1px solid #A3B18A; border-radius: 5px;">

        <label style="display: block; margin-top: 1rem; color: #4A3228;">{$t('contact.form.fields.subject.label')}</label>
        <select bind:value={subject} style="width: 100%; padding: 0.75rem; border: 1px solid #A3B18A; border-radius: 5px;">
          <option value="general">{$t('contact.form.fields.subject.options.general')}</option>
          <option value="feedback">{$t('contact.form.fields.subject.options.feedback')}</option>
          <option value="collaboration">{$t('contact.form.fields.subject.options.collaboration')}</option>
        </select>

        <label style="display: block; margin-top: 1rem; color: #4A3228;">{$t('contact.form.fields.message.label')}</label>
        <textarea bind:value={message} required rows="5" style="width: 100%; padding: 0.75rem; border: 1px solid #A3B18A; border-radius: 5px;"></textarea>

        <button type="submit" disabled={isSubmitting} style="width: 100%; background-color: #6B5CA5; color: #FFF3E0; font-weight: 700; padding: 1rem; border-radius: 10px; margin-top: 1rem; border: none; cursor: pointer; transition: 0.2s;">
          {isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit')}
        </button>
      </form>
    </div>
  </div>
</section>

