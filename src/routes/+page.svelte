<!-- src/routes/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  // Basic animation for elements
  let isVisible = false;
  
  onMount(() => {
    // Set visible after component is mounted for simple entrance animation
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
  <meta name="description" content="Connecting governance innovations across the world" />
</svelte:head>

<!-- Hero Section -->
<section class="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center animate-fade-in">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        {$t('home.title')}
      </h1>
      <p class="text-xl md:text-2xl text-blue-100 mb-10">
        {$t('home.subtitle')}
      </p>
      <a href="/framework" class="btn-primary text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-block">
        {$t('home.cta')}
      </a>
    </div>
  </div>
</section>

<!-- Intro Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-10 rounded-xl shadow-sm border border-blue-100 transition-all duration-500 transform {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
          {$t('home.intro.heading')}
        </h2>
        <p class="text-blue-700 text-lg leading-relaxed">
          {$t('home.intro.text')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
      {$t('home.features.heading')}
    </h2>
    
    <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
      <!-- Feature 1 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
        <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          {$t('home.features.interoperability.title')}
        </h3>
        <p class="text-gray-600">
          {$t('home.features.interoperability.description')}
        </p>
      </div>
      
      <!-- Feature 2 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
        <div class="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          {$t('home.features.os.title')}
        </h3>
        <p class="text-gray-600">
          {$t('home.features.os.description')}
        </p>
      </div>
      
      <!-- Feature 3 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-purple-500">
        <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          {$t('home.features.patterns.title')}
        </h3>
        <p class="text-gray-600">
          {$t('home.features.patterns.description')}
        </p>
      </div>
    </div>
    
    <div class="text-center mt-12">
      <a href="/framework" class="btn-primary text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-block">
        {$t('home.cta')}
      </a>
    </div>
  </div>
</section>

<!-- Additional Info Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <div class="prose prose-lg mx-auto">
        <h2 class="text-center text-3xl mb-8 text-gray-900">{$t('home.additionalInfo.heading')}</h2>
        <p>
          {$t('home.additionalInfo.paragraph1')}
        </p>
        <p>
          {$t('home.additionalInfo.paragraph2')}
        </p>
        <ul>
          {#each $t('home.additionalInfo.listItems') as item}
            <li>{item}</li>
          {/each}
        </ul>
        <p>
          {$t('home.additionalInfo.paragraph3')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section class="py-16 bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900 text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">{$t('home.callToAction.heading')}</h2>
      <p class="text-xl text-blue-100 mb-10">
        {$t('home.callToAction.text')}
      </p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a href="/framework" class="w-full sm:w-auto inline-block bg-white text-blue-800 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
          {$t('home.callToAction.primaryButton')}
        </a>
        <a href="/contact" class="w-full sm:w-auto inline-block bg-transparent hover:bg-blue-800 text-white border-2 border-white py-3 px-8 rounded-lg transition duration-300">
          {$t('home.callToAction.secondaryButton')}
        </a>
      </div>
    </div>
  </div>
</section>
