<!-- src/lib/components/GIS/GISVisualization.svelte -->
<!-- Main container component for GIS visualizations -->

<script lang="ts">
  import { onMount } from 'svelte';
  import type { MapMode, Region } from './types/GISTypes';
  
  import GISMap from './GISMap.svelte';
  import RegionSelector from './controls/RegionSelector.svelte';
  import ModeSelector from './controls/ModeSelector.svelte';
  import LegendControl from './controls/LegendControl.svelte';
  import InfoPanel from './InfoPanel.svelte';
  
  import ResourceConflictLayer from './layers/ResourceConflictLayer.svelte';
  import PeaceInfrastructureLayer from './layers/PeaceInfrastructureLayer.svelte';
  import CrossBorderLayer from './layers/CrossBorderLayer.svelte';
  import ClimateProjectionLayer from './layers/ClimateProjectionLayer.svelte';
  
  // Props
  export let mapMode: MapMode = 'resource-conflict';
  export let initialRegion: Region = 'global';
  export let showControls: boolean = true;
  export let height: string = '600px';
  
  // State
  let map;
  let mapComponent;
  let mapReady = false;
  let selectedRegion: Region = initialRegion;
  let selectedMode: MapMode = mapMode;
  let selectedItem = null;
  let selectedItemType = '';
  
  // Expose setRegion method for external control
  export function setRegion(newRegion: Region) {
    if (mapComponent && mapReady) {
      selectedRegion = newRegion;
      mapComponent.setRegion(newRegion);
    }
  }
  
  // Handle region change from internal controls
  function handleRegionChange(event) {
    selectedRegion = event.detail.region;
    if (mapComponent && mapReady) {
      mapComponent.setRegion(selectedRegion);
    }
  }
  
  // Handle mode change
  function handleModeChange(event) {
    selectedMode = event.detail.mode;
    // Clear any selected item when changing modes
    selectedItem = null;
    selectedItemType = '';
  }
  
  // Handle map ready event
  function handleMapReady(event) {
    mapReady = true;
    map = event.detail.map;
    
    // Apply initial region once map is ready
    if (initialRegion !== 'global' && mapComponent) {
      setTimeout(() => {
        mapComponent.setRegion(initialRegion);
      }, 200);
    }
  }
  
  // Handle item selection from any layer
  function handleItemSelect(event) {
    // Determine item type based on the properties present
    const item = event.detail;
    
    if (item.conflict) {
      selectedItem = item.conflict;
      selectedItemType = 'conflict';
    } else if (item.infrastructure) {
      selectedItem = item.infrastructure;
      selectedItemType = 'infrastructure';
    } else if (item.gap) {
      selectedItem = item.gap;
      selectedItemType = 'gap';
    } else if (item.flow) {
      selectedItem = item.flow;
      selectedItemType = 'flow';
    } else if (item.border) {
      selectedItem = item.border;
      selectedItemType = 'border';
    } else if (item.projection) {
      selectedItem = item.projection;
      selectedItemType = 'projection';
    }
  }
  
  // Update exported props
  $: {
    mapMode = selectedMode;
  }
  
  // Watch for initialRegion changes from parent
  $: if (mapReady && mapComponent && initialRegion !== selectedRegion) {
    selectedRegion = initialRegion;
    mapComponent.setRegion(initialRegion);
  }
  
  onMount(() => {
    // Initialize with provided props
    selectedMode = mapMode;
    selectedRegion = initialRegion;
  });
</script>

<div class="gis-visualization" style="height: {height};">
  {#if showControls}
    <div class="controls-panel">
      <ModeSelector
        mode={selectedMode}
        on:modeChange={handleModeChange}
      />
      
      <RegionSelector
        region={selectedRegion}
        on:regionChange={handleRegionChange}
      />
    </div>
  {/if}
  
  <div class="map-panel">
    <GISMap
      bind:this={mapComponent}
      region={selectedRegion}
      on:mapReady={handleMapReady}
    >
      {#if mapReady}
        {#if selectedMode === 'resource-conflict'}
          <ResourceConflictLayer
            {map}
            on:select={handleItemSelect}
          />
        {:else if selectedMode === 'peace-infrastructure'}
          <PeaceInfrastructureLayer
            {map}
            on:select={handleItemSelect}
          />
        {:else if selectedMode === 'cross-border'}
          <CrossBorderLayer
            {map}
            on:select={handleItemSelect}
          />
        {:else if selectedMode === 'climate-migration'}
          <ClimateProjectionLayer
            {map}
            on:select={handleItemSelect}
          />
        {/if}
        
        <LegendControl mode={selectedMode} />
      {/if}
    </GISMap>
    
    <InfoPanel
      selectedItem={selectedItem}
      itemType={selectedItemType}
    />
  </div>
</div>

<style>
  .gis-visualization {
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
  
  .map-panel {
    position: relative;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* Responsive layout */
  @media (max-width: 768px) {
    .gis-visualization {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    
    .controls-panel {
      flex-direction: row;
      flex-wrap: wrap;
      max-height: none;
      overflow-y: visible;
    }
  }
</style>
