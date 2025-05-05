<!-- src/lib/components/GIS/controls/ModeSelector.svelte -->
<!-- Control for selecting map visualization modes -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { MapMode } from '../types/GISTypes';
  
  export let mode: MapMode = 'resource-conflict';
  
  const dispatch = createEventDispatcher();
  
  const modes = [
    { 
      id: 'resource-conflict', 
      name: 'Resource Conflicts',
      description: 'Overlay of resource scarcity and conflict incidence'
    },
    { 
      id: 'peace-infrastructure', 
      name: 'Peace Infrastructure',
      description: 'Spatial analysis of peace capacities and gaps'
    },
    { 
      id: 'cross-border', 
      name: 'Cross-Border Dynamics',
      description: 'Movement patterns across boundaries in conflict regions'
    },
    { 
      id: 'climate-migration', 
      name: 'Climate-Migration',
      description: 'Forward-looking scenarios based on climate models'
    }
  ];
  
  function selectMode(newMode: MapMode) {
    if (mode !== newMode) {
      mode = newMode;
      dispatch('modeChange', { mode: newMode });
    }
  }
</script>

<div class="mode-selector">
  <h3>Map View</h3>
  <div class="mode-buttons">
    {#each modes as modeOption}
      <button
        class:active={mode === modeOption.id}
        on:click={() => selectMode(modeOption.id as MapMode)}
      >
        <div class="mode-button-content">
          <span class="mode-name">{modeOption.name}</span>
          <span class="mode-description">{modeOption.description}</span>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .mode-selector {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    padding: 0.75rem;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .mode-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    padding: 0.75rem 1rem;
    text-align: left;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  
  button:hover {
    background-color: #e9ecef;
  }
  
  button.active {
    background-color: #2c3e50;
    border-color: #2c3e50;
    color: white;
  }
  
  .mode-button-content {
    display: flex;
    flex-direction: column;
  }
  
  .mode-name {
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
  
  .mode-description {
    font-size: 0.8rem;
    opacity: 0.8;
  }
</style>
