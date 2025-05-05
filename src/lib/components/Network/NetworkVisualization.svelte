<!-- src/lib/components/Network/NetworkVisualization.svelte -->
<!-- Main container component for Network Analysis visualizations -->

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import NetworkGraph from './NetworkGraph.svelte';
  import NetworkTypeSelector from './controls/NetworkTypeSelector.svelte';
  import ViewSelector from './controls/ViewSelector.svelte';
  import LegendPanel from './controls/LegendPanel.svelte';
  import DetailPanel from './DetailPanel.svelte';
  
  // Props
  export let networkType = 'formal-informal';
  export let selectedView = 'global';
  export let height = '600px';
  
  // State
  let networkReady = false;
  let graph;
  let selectedNode = null;
  let selectedEdge = null;
  let networkControls = {
    zoom: 1,
    physics: true,
    clustering: false,
    filterStrength: 0
  };
  
  const dispatch = createEventDispatcher();
  
  // Handle network type change
  function handleNetworkTypeChange(event) {
    networkType = event.detail.type;
    selectedNode = null;
    selectedEdge = null;
    
    dispatch('networkTypeChange', { type: networkType });
  }
  
  // Handle view change
  function handleViewChange(event) {
    selectedView = event.detail.view;
    selectedNode = null;
    selectedEdge = null;
    
    dispatch('viewChange', { view: selectedView });
  }
  
  // Handle node selection
  function handleNodeSelect(event) {
    selectedNode = event.detail.node;
    selectedEdge = null;
  }
  
  // Handle edge selection
  function handleEdgeSelect(event) {
    selectedEdge = event.detail.edge;
    selectedNode = null;
  }
  
  // Handle network ready event
  function handleNetworkReady(event) {
    networkReady = true;
    graph = event.detail.graph;
  }
  
  // Handle control changes
  function handleZoomChange(event) {
    networkControls.zoom = event.detail.zoom;
    if (graph) {
      graph.setZoom(networkControls.zoom);
    }
  }
  
  function handlePhysicsToggle() {
    networkControls.physics = !networkControls.physics;
    if (graph) {
      graph.togglePhysics(networkControls.physics);
    }
  }
  
  function handleClusteringToggle() {
    networkControls.clustering = !networkControls.clustering;
    if (graph) {
      graph.toggleClustering(networkControls.clustering);
    }
  }
  
  function handleFilterChange(event) {
    networkControls.filterStrength = event.detail.value;
    if (graph) {
      graph.setEdgeFilter(networkControls.filterStrength);
    }
  }
  
  // Reset selection when type or view changes
  $: if (networkType || selectedView) {
    selectedNode = null;
    selectedEdge = null;
  }
  
  onMount(() => {
    // Initialize network visualization
  });
</script>

<div class="network-visualization" style="height: {height};">
  <div class="controls-panel">
    <NetworkTypeSelector 
      type={networkType}
      on:typeChange={handleNetworkTypeChange}
    />
    
    <ViewSelector 
      view={selectedView}
      on:viewChange={handleViewChange}
    />
    
    {#if networkReady}
      <div class="network-controls">
        <h3>Visualization Controls</h3>
        
        <div class="control-group">
          <label for="zoom-control">Zoom Level</label>
          <input 
            id="zoom-control" 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={networkControls.zoom}
            on:input={(e) => handleZoomChange({ detail: { zoom: parseFloat(e.target.value) } })}
          />
        </div>
        
        <div class="control-group">
          <label>
            <input 
              type="checkbox" 
              checked={networkControls.physics}
              on:change={handlePhysicsToggle}
            />
            Enable Physics
          </label>
        </div>
        
        <div class="control-group">
          <label>
            <input 
              type="checkbox" 
              checked={networkControls.clustering}
              on:change={handleClusteringToggle}
            />
            Enable Clustering
          </label>
        </div>
        
        <div class="control-group">
          <label for="filter-control">Filter Weak Connections</label>
          <input 
            id="filter-control" 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={networkControls.filterStrength}
            on:input={(e) => handleFilterChange({ detail: { value: parseFloat(e.target.value) } })}
          />
        </div>
      </div>
    {/if}
    
    <LegendPanel type={networkType} />
  </div>
  
  <div class="network-panel">
    <NetworkGraph
      type={networkType}
      view={selectedView}
      on:ready={handleNetworkReady}
      on:nodeSelect={handleNodeSelect}
      on:edgeSelect={handleEdgeSelect}
      bind:this={graph}
    />
    
    {#if selectedNode || selectedEdge}
      <DetailPanel 
        node={selectedNode}
        edge={selectedEdge}
        type={networkType}
      />
    {/if}
  </div>
</div>

<style>
  .network-visualization {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
  
  .controls-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }
  
  .network-panel {
    position: relative;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
  }
  
  .network-controls {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
  }
  
  .network-controls h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .control-group {
    margin-bottom: 0.75rem;
  }
  
  .control-group label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }
  
  input[type="range"] {
    width: 100%;
  }
  
  /* Responsive layout */
  @media (max-width: 768px) {
    .network-visualization {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    
    .controls-panel {
      flex-direction: row;
      flex-wrap: wrap;
      max-height: none;
      overflow-y: visible;
      gap: 0.5rem;
    }
    
    .network-controls, :global(.network-type-selector), :global(.view-selector), :global(.legend-panel) {
      flex: 1 1 45%;
      min-width: 200px;
    }
  }
</style>
