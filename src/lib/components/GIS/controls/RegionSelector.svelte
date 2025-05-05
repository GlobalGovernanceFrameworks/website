<!-- src/lib/components/GIS/controls/RegionSelector.svelte -->
<!-- Control for selecting regions on the map -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Region } from '../types/GISTypes';
  
  export let region: Region = 'global';
  
  const dispatch = createEventDispatcher();
  
  const regions = [
    { id: 'global', name: 'Global View' },
    { id: 'africa', name: 'Africa' },
    { id: 'middle-east', name: 'Middle East' },
    { id: 'southeast-asia', name: 'Southeast Asia' },
    { id: 'south-america', name: 'South America' }
  ];
  
  function selectRegion(newRegion: Region) {
    if (region !== newRegion) {
      region = newRegion;
      dispatch('regionChange', { region: newRegion });
    }
  }
</script>

<div class="region-selector">
  <h3>Region Focus</h3>
  <div class="region-buttons">
    {#each regions as regionOption}
      <button
        class:active={region === regionOption.id}
        on:click={() => selectRegion(regionOption.id as Region)}
      >
        {regionOption.name}
      </button>
    {/each}
  </div>
</div>

<style>
  .region-selector {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    padding: 0.75rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .region-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  
  button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.5rem;
    text-align: left;
    transition: all 0.2s ease;
  }
  
  button:hover {
    background-color: #e9ecef;
  }
  
  button.active {
    background-color: #2c3e50;
    border-color: #2c3e50;
    color: white;
  }
</style>
