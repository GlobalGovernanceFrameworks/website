<!-- src/routes/framework/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>Framework - Global Governance Framework</title>
  <meta name="description" content="Explore tools for governance interoperability and evolution" />
</svelte:head>

<!-- Hero Section -->
<section class="py-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">{$t('framework.hero.title')}</h1>
      <p class="text-xl text-blue-200">{$t('framework.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Manual prose styling in case Tailwind is not working properly -->
      <div style="max-width: 65ch; margin: 0 auto; line-height: 1.7; font-size: 1.125rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2rem; color: #111827;">{$t('framework.intro.title')}</h2>
        <p style="margin-bottom: 1.5rem;">
          {$t('framework.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem;">
          {$t('framework.intro.paragraph2')}
        </p>
        
        <!-- Coming Soon Box -->
        <div style="background-color: #EFF6FF; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #DBEAFE; margin: 2rem 0;">
          <h3 style="color: #1E40AF; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">Coming Soon</h3>
          <p style="color: #1E40AF; margin-bottom: 1rem;">
            We're currently developing detailed content for the governance framework. 
            This page will soon include comprehensive documentation on:
          </p>
          <ul style="color: #1E40AF; margin-left: 1.5rem; list-style-type: disc;">
            <li style="margin-bottom: 0.5rem;">Governance Interoperability Models</li>
            <li style="margin-bottom: 0.5rem;">Decision Allocation Frameworks</li>
            <li style="margin-bottom: 0.5rem;">Meta-Governance Design Patterns</li>
            <li style="margin-bottom: 0.5rem;">Adaptive Governance Architecture</li>
          </ul>
        </div>
        
        <!-- Core Framework Elements (Sample Content) -->
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; margin-top: 2.5rem; color: #111827;">Core Framework Elements</h2>
        
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 1.5rem; color: #1F2937;">1. Governance Interoperability Framework</h3>
        <p style="margin-bottom: 1rem;">
          This framework helps different governance systems connect and collaborate effectively:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc;">
          <li style="margin-bottom: 0.5rem;"><strong>Protocol Standards:</strong> How different governance systems can exchange information</li>
          <li style="margin-bottom: 0.5rem;"><strong>Decision Boundary Mapping:</strong> Clarifying which decisions belong at which levels</li>
          <li style="margin-bottom: 0.5rem;"><strong>Translation Mechanisms:</strong> How decisions in one governance context can be understood and implemented in another</li>
          <li style="margin-bottom: 0.5rem;"><strong>Conflict Resolution Interfaces:</strong> How to manage disagreements between governance systems</li>
        </ul>
        
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 1.5rem; color: #1F2937;">2. Governance Operating System</h3>
        <p style="margin-bottom: 1rem;">
          The concept of a modular, evolvable "operating system" for governance:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc;">
          <li style="margin-bottom: 0.5rem;"><strong>Core Functions vs. Applications:</strong> Distinguishing fundamental governance processes from specific implementations</li>
          <li style="margin-bottom: 0.5rem;"><strong>Interface Definitions:</strong> Standard ways for citizens to interact with governance</li>
          <li style="margin-bottom: 0.5rem;"><strong>Modularity Principles:</strong> How to design governance components that can be swapped out without system-wide disruption</li>
          <li style="margin-bottom: 0.5rem;"><strong>Governance APIs:</strong> Standardized ways for subsystems to communicate</li>
        </ul>
      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 3rem;">
        <a href="/contact" style="background-color: #2563EB; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; display: inline-block; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
          Contribute to the Framework
        </a>
      </div>
    </div>
  </div>
</section>
