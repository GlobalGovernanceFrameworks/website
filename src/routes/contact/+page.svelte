<!-- src/routes/contact/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  
  // Form state
  let name = '';
  let email = '';
  let message = '';
  let subject = 'general';
  
  let isSubmitting = false;
  let submitSuccess = false;
  let submitError = false;
  
  // Formspree form ID
  const FORMSPREE_ID = "xldjbjgl";
  
  // Handle form submission
  async function handleSubmit() {
    isSubmitting = true;
    submitSuccess = false;
    submitError = false;
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      });
      
      if (response.ok) {
        // Form submitted successfully
        submitSuccess = true;
        // Clear form
        name = '';
        email = '';
        message = '';
        subject = 'general';
      } else {
        // Form submission failed
        submitError = true;
        console.error('Form submission failed:', await response.text());
      }
    } catch (error) {
      submitError = true;
      console.error('Error submitting form:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact - Global Governance Framework</title>
  <meta name="description" content="Get in touch with the Global Governance Framework project" />
</svelte:head>

<section class="py-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
  <div class="container">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">{$t('contact.hero.title')}</h1>
      <p class="text-xl text-blue-200">{$t('contact.hero.subtitle')}</p>
    </div>
  </div>
</section>

<section class="py-12 bg-white">
  <div class="container">
    <div class="max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 class="text-2xl font-bold mb-6">{$t('contact.getInTouch.title')}</h2>
          <p class="mb-6 text-gray-600">
            {$t('contact.getInTouch.description')}
          </p>
          
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 p-3 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">{$t('contact.getInTouch.contactInfo.email.title')}</h3>
                <p class="text-gray-600">{$t('contact.getInTouch.contactInfo.email.value')}</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 p-3 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">{$t('contact.getInTouch.contactInfo.responseTime.title')}</h3>
                <p class="text-gray-600">{$t('contact.getInTouch.contactInfo.responseTime.value')}</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 p-3 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg">{$t('contact.getInTouch.contactInfo.github.title')}</h3>
                <a href="https://github.com/GlobalGovernanceFramework" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                  {$t('contact.getInTouch.contactInfo.github.value')}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">{$t('contact.form.title')}</h3>
            
            {#if submitSuccess}
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>{$t('contact.form.success')}</p>
              </div>
            {/if}
            
            {#if submitError}
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{$t('contact.form.error')}</p>
              </div>
            {/if}
            
            <div class="text-sm text-gray-500 mb-4">
              {$t('contact.form.fallback')}
            </div>
            
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                {$t('contact.form.fields.name.label')}
              </label>
              <input 
                type="text" 
                id="name" 
                bind:value={name} 
                required
                placeholder={$t('contact.form.fields.name.placeholder')}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                {$t('contact.form.fields.email.label')}
              </label>
              <input 
                type="email" 
                id="email" 
                bind:value={email} 
                required
                placeholder={$t('contact.form.fields.email.placeholder')}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                {$t('contact.form.fields.subject.label')}
              </label>
              <select 
                id="subject" 
                bind:value={subject}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">{$t('contact.form.fields.subject.options.general')}</option>
                <option value="feedback">{$t('contact.form.fields.subject.options.feedback')}</option>
                <option value="collaboration">{$t('contact.form.fields.subject.options.collaboration')}</option>
                <option value="feature">{$t('contact.form.fields.subject.options.feature')}</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                {$t('contact.form.fields.message.label')}
              </label>
              <textarea 
                id="message" 
                bind:value={message} 
                required
                placeholder={$t('contact.form.fields.message.placeholder')}
                rows="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
