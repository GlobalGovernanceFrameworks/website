<!-- src/routes/framework/visuals/peace/technical/system-dynamics/+page.svelte -->
<script>
  import SystemsVisualization from '$lib/components/Systems/SystemsVisualization.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import { onMount } from 'svelte';
  
  // Define state variables
  let modelType = 'feedback-loops';
  let selectedContext = 'global';
  let visualizationHeight = '600px';
  
  // For responsive design
  let windowWidth;
  
  // Adjust height based on window width for responsiveness
  $: if (windowWidth < 768) {
    visualizationHeight = '400px';
  } else {
    visualizationHeight = '600px';
  }
  
  // Handle model type change
  function handleModelTypeChange(event) {
    modelType = event.detail.type;
  }
  
  // Handle context change
  function handleContextChange(event) {
    selectedContext = event.detail.context;
  }
  
  let systemsComponent;
  
  onMount(() => {
    // Listen for window resize events
    const handleResize = () => {a
      windowWidth = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<MetaTags 
  title="Systems Dynamics Models | Peace & Conflict Resolution Framework"
  description="Advanced systems thinking visualizations for complex peace challenges, including feedback loops, stock and flow models, leverage points, and resilience mapping."
  keywords="peace governance, systems thinking, feedback loops, stock and flow models, leverage points, resilience factors, conflict dynamics"
/>

<div class="container">
  <header>
    <h1>Systems Dynamics Models</h1>
    <p class="subtitle">Advanced systems thinking approaches for complex peace challenges</p>
  </header>

  <div class="visualization-container">
    <SystemsVisualization 
      bind:this={systemsComponent}
      modelType={modelType}
      selectedContext={selectedContext}
      height="600px"
      on:modelTypeChange={handleModelTypeChange}
      on:contextChange={handleContextChange}
    />
  </div>

  <div class="info-section">
    <h2>About Systems Dynamics</h2>
    <p>
      These interactive visualizations apply systems thinking to peace and conflict, revealing complex 
      relationships, feedback loops, and intervention points that might otherwise remain hidden. By mapping the 
      underlying structures that drive conflict dynamics, these models help practitioners design more effective, 
      sustainable interventions that address root causes rather than symptoms.
    </p>
    
    <h3>Model Types</h3>
    <div class="model-types-grid">
      <div class="model-type-item">
        <h4>Feedback Loop Diagrams</h4>
        <p>
          Visualize reinforcing and balancing loops within conflict-peace systems to understand how variables 
          influence each other over time, creating either escalating conflicts or stabilizing peace dynamics.
        </p>
      </div>
      
      <div class="model-type-item">
        <h4>Stock and Flow Models</h4>
        <p>
          Map how resources, grievances, and capacities accumulate or deplete over time in conflict settings, 
          showing how these stocks change through flows controlled by various factors and decision points.
        </p>
      </div>
      
      <div class="model-type-item">
        <h4>Leverage Point Identification</h4>
        <p>
          Identify high-impact intervention points within conflict systems where targeted action can produce 
          disproportionate positive effects, transforming system behavior with minimal resources.
        </p>
      </div>
      
      <div class="model-type-item">
        <h4>Resilience Factor Mapping</h4>
        <p>
          Reveal elements that strengthen a peace system's ability to withstand shocks and stresses without 
          breaking down, highlighting factors that help communities resist violence and maintain stability.
        </p>
      </div>
    </div>
  </div>

  <div class="instructions-panel">
    <h3>How to Use These Models</h3>
    <ul>
      <li><strong>Select Model Type</strong>: Choose between different systems dynamics models using the selector.</li>
      <li><strong>Select Context</strong>: View models in global or specific regional contexts.</li>
      <li><strong>Explore Relationships</strong>: Hover over elements to see their connections and influence pathways.</li>
      <li><strong>Simulate Scenarios</strong>: Use the simulation controls to see how changes to variables affect outcomes over time.</li>
      <li><strong>Adjust Parameters</strong>: Modify key variables to test different intervention strategies and their potential impacts.</li>
    </ul>
  </div>

  <div class="context-section">
    <h2>Implementation Applications</h2>
    <p>Systems dynamics models help peace practitioners in several concrete ways:</p>
    <ul>
      <li><strong>Root Cause Analysis</strong>: Identifying underlying structural causes of conflict rather than just visible symptoms</li>
      <li><strong>Intervention Design</strong>: Determining where and how to intervene for maximum impact with limited resources</li>
      <li><strong>Unintended Consequences</strong>: Anticipating potential side effects and feedback from interventions</li>
      <li><strong>Policy Coherence</strong>: Ensuring that multiple interventions work together rather than undermining each other</li>
      <li><strong>Long-Term Planning</strong>: Understanding how conflict dynamics might evolve over time under different scenarios</li>
    </ul>
    <p>For a deeper exploration of systems thinking in peacebuilding contexts, visit the <a href="/framework/tools/peace/systems-thinking">Peace & Conflict Resolution Systems Thinking Toolkit</a>.</p>
  </div>

  <footer>
    <p>© 2025 Global Governance Framework | <a href="https://www.globalgovernanceframework.org">www.globalgovernanceframework.org</a></p>
  </footer>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
    margin-top: 0;
  }
  
  .visualization-container {
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
    height: 700px; /* Increase height */
    min-height: 600px;
    width: 100%;
  }
  
  .info-section {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .model-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .model-type-item {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 1rem;
  }
  
  .model-type-item h4 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .model-type-item p {
    color: #555;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  .instructions-panel {
    background-color: #f0f7ff;
    border: 1px solid #cce5ff;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .instructions-panel h3 {
    color: #0056b3;
    margin-top: 0;
  }
  
  .instructions-panel ul {
    padding-left: 1.5rem;
  }
  
  .instructions-panel li {
    margin-bottom: 0.75rem;
  }
  
  .context-section {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .context-section ul {
    padding-left: 1.5rem;
  }
  
  .context-section li {
    margin-bottom: 0.5rem;
  }
  
  footer {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    margin-top: 3rem;
  }
  
  footer a {
    color: #666;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .model-types-grid {
      grid-template-columns: 1fr;
    }
    
    .subtitle {
      font-size: 1rem;
    }
  }
</style>
