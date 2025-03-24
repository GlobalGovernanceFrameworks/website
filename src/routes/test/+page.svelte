<!-- src/routes/test/+page.svelte -->
<script>
  import { base } from '$app/paths';
  // Import the logo SVG
  const logoPath = `${base}/logo-colored.svg`;
</script>

<svelte:head>
  <title>Tailwind Test Page</title>
</svelte:head>

<div class="min-h-screen bg-cosmic-dark">
  <div class="container mx-auto px-4 py-12">
    <!-- Header Section -->
    <header class="mb-12 flex flex-col items-center justify-center text-white">
      <img src={logoPath} alt="Global Governance Framework" class="w-32 h-32 mb-6" />
      <h1 class="text-4xl md:text-5xl font-bold text-center">Global Governance Framework</h1>
      <p class="mt-4 text-xl text-center max-w-2xl mx-auto">A comprehensive approach to interoperable governance systems</p>
    </header>
    
    <!-- Feature Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <!-- Card 1 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="h-2 bg-earthy-dark"></div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-cosmic-dark mb-3">Decentralized Authority</h3>
          <p class="text-gray-700">Power must be distributed across multiple levels, with decisions made at the lowest effective level of governance.</p>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="h-2 bg-gold-dark"></div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-cosmic-dark mb-3">Radical Transparency</h3>
          <p class="text-gray-700">All governance processes must be fully visible and accessible to citizens, with no secret decision-making.</p>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="h-2 bg-root-dark"></div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-cosmic-dark mb-3">Direct Participation</h3>
          <p class="text-gray-700">Every individual has the right to participate in decisions affecting them, through multiple channels of engagement.</p>
        </div>
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-cosmic-dark mb-4">Explore the Framework</h2>
      <p class="text-gray-700 mb-6 max-w-2xl mx-auto">Discover how interoperable governance systems can address today's complex global challenges.</p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#" class="bg-cosmic-dark hover:bg-cosmic-light text-white font-medium py-2 px-6 rounded-md">
          View Documentation
        </a>
        <a href="#" class="border border-cosmic-dark text-cosmic-dark hover:bg-cosmic-dark hover:text-white font-medium py-2 px-6 rounded-md">
          Get Involved
        </a>
      </div>
    </div>
  </div>
</div>
