<!-- src/routes/framework/visuals/peace/technical/implementation-processes/peace-committee/+page.svelte -->
<script>
  import GISVisualization from '$lib/components/GIS/GISVisualization.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import { onMount } from 'svelte';
  
  // Define state variables
  let mapMode = 'resource-conflict';
  let initialRegion = 'global';
  let mapHeight = '600px';
  
  // For responsive design
  let windowWidth;
  
  // Adjust height based on window width for responsiveness
  $: if (windowWidth < 768) {
    mapHeight = '400px';
  } else {
    mapHeight = '600px';
  }
  
  // Handle map mode change
  function handleModeChange(event) {
    mapMode = event.detail.mode;
  }
  
  // Handle region change
  function handleRegionChange(event) {
    initialRegion = event.detail.region;
    // Force map refresh when region changes
    if (gisVisualizationComponent) {
      gisVisualizationComponent.setRegion(initialRegion);
    }
  }
  
  let gisVisualizationComponent;
  
  onMount(() => {
    // Listen for window resize events
    const handleResize = () => {
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
  title="Geographic Information System (GIS) Applications | Peace & Conflict Resolution Framework"
  description="Interactive maps visualizing resource conflicts, peace infrastructure distribution, cross-border dynamics, and climate-migration projections."
  keywords="peace governance, GIS mapping, resource conflicts, peace infrastructure, cross-border dynamics, climate migration"
/>

<div class="container">
  <header>
    <h1>Geographic Information System (GIS) Applications</h1>
    <p class="subtitle">Spatial analysis of conflict and peace dynamics across regions</p>
  </header>

  <div class="map-container">
    <GISVisualization 
      bind:this={gisVisualizationComponent}
      mapMode={mapMode}
      initialRegion={initialRegion}
      height={mapHeight}
      on:modeChange={handleModeChange}
      on:regionChange={handleRegionChange}
    />
  </div>

  <div class="info-section">
    <h2>About These Visualizations</h2>
    <p>These interactive maps provide spatial analysis of conflict dynamics and peace infrastructure globally and in specific regions. The visualizations are designed to help policymakers, researchers, and practitioners understand geographic patterns and make informed decisions about peace governance interventions.</p>
    
    <h3>Map Views</h3>
    <div class="map-views-grid">
      <div class="map-view-item">
        <h4>Resource Conflict Hotspots</h4>
        <p>Visualizes regions experiencing tensions over scarce resources such as water, land, and minerals, with intensity levels based on conflict severity.</p>
      </div>
      
      <div class="map-view-item">
        <h4>Peace Infrastructure Distribution</h4>
        <p>Shows the distribution of peace governance mechanisms from local to international levels, highlighting both existing capacities and critical gaps.</p>
      </div>
      
      <div class="map-view-item">
        <h4>Cross-Border Dynamics</h4>
        <p>Maps population movements across borders, including forced displacement, economic migration, and climate-induced mobility, alongside border status.</p>
      </div>
      
      <div class="map-view-item">
        <h4>Climate-Migration Projections</h4>
        <p>Forward-looking scenarios based on climate models, showing projected displacement risks and potential conflict triggers through 2050.</p>
      </div>
    </div>
  </div>

  <div class="instructions-panel">
    <h3>How to Use These Maps</h3>
    <ul>
      <li><strong>Select Map View</strong>: Choose between different data layers using the buttons on the left side.</li>
      <li><strong>Choose Region</strong>: Focus on global patterns or zoom to specific regions using the region selector.</li>
      <li><strong>Interactive Elements</strong>: Click on any marker, line, or area to view detailed information and policy recommendations.</li>
      <li><strong>Legend</strong>: Reference the legend in the bottom-right corner to understand map symbols and colors.</li>
    </ul>
  </div>

  <div class="context-section">
    <h2>Implementation Context</h2>
    <p>These GIS applications are part of the broader Peace & Conflict Resolution Framework, providing spatial analysis to complement policy frameworks and governance mechanisms. The visualizations help stakeholders:</p>
    <ul>
      <li>Identify geographic patterns in conflict dynamics</li>
      <li>Assess the distribution and gaps in peace infrastructure</li>
      <li>Understand cross-border movements and their implications</li>
      <li>Prepare for future climate-induced migration scenarios</li>
    </ul>
    <p>For additional implementation resources, including data sources, methodology, and customization options, visit the <a href="/framework/tools/peace/gis">Peace & Conflict Resolution GIS Library</a>.</p>
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
  
  .map-container {
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
  }
  
  .info-section {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .map-views-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .map-view-item {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 1rem;
  }
  
  .map-view-item h4 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .map-view-item p {
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
    
    .map-views-grid {
      grid-template-columns: 1fr;
    }
    
    .subtitle {
      font-size: 1rem;
    }
  }
</style>
