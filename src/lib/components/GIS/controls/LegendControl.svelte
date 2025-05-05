<!-- src/lib/components/GIS/controls/LegendControl.svelte -->
<!-- Map legend component -->

<script lang="ts">
  import type { MapMode, LegendItem } from '../types/GISTypes';
  import { resourceConflictLegend } from '../data/resourceConflicts';
  import { peaceInfrastructureLegend } from '../data/peaceInfrastructure';
  import { crossBorderLegend } from '../data/crossBorderFlows';
  import { climateProjectionLegend } from '../data/climateProjections';
  
  export let mode: MapMode = 'resource-conflict';
  
  $: legendItems = getLegendItems(mode);
  $: legendTitle = getLegendTitle(mode);
  
  function getLegendItems(currentMode: MapMode): LegendItem[] {
    switch(currentMode) {
      case 'resource-conflict':
        return resourceConflictLegend;
      case 'peace-infrastructure':
        return peaceInfrastructureLegend;
      case 'cross-border':
        return crossBorderLegend;
      case 'climate-migration':
        return climateProjectionLegend;
      default:
        return [];
    }
  }
  
  function getLegendTitle(currentMode: MapMode): string {
    switch(currentMode) {
      case 'resource-conflict':
        return 'Resource Conflict';
      case 'peace-infrastructure':
        return 'Peace Infrastructure';
      case 'cross-border':
        return 'Cross-Border Dynamics';
      case 'climate-migration':
        return 'Climate-Migration Projections';
      default:
        return 'Legend';
    }
  }
</script>

<div class="legend-container">
  <h3>{legendTitle}</h3>
  <div class="legend-items">
    {#each legendItems as item}
      <div class="legend-item">
        <!-- Display different legend markers based on shape attribute -->
        {#if item.shape === 'circle'}
          <span class="legend-circle" style="background-color: {item.color}"></span>
        {:else if item.shape === 'square'}
          <span class="legend-square" style="background-color: {item.color}"></span>
        {:else if item.shape === 'triangle'}
          <span class="legend-triangle" style="border-bottom-color: {item.color}"></span>
        {:else if item.shape === 'star'}
          <span class="legend-star" style="color: {item.color}">★</span>
        {:else if item.lineStyle}
          <!-- Line styles for borders and flows -->
          <span 
            class="legend-line" 
            style="
              background-color: {item.color}; 
              border-style: {item.lineStyle === 'dashed' ? 'dashed' : 'solid'};
            "
          ></span>
        {:else}
          <!-- Default circle if no shape specified -->
          <span class="legend-circle" style="background-color: {item.color}"></span>
        {/if}
        <span class="legend-label">{item.label}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .legend-container {
    position: absolute;
    bottom: 20px;
    right: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    padding: 10px;
    z-index: 1000;
    max-width: 300px;
    max-height: 400px;
    overflow-y: auto;
  }
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
  
  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #333;
  }
  
  .legend-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  
  .legend-square {
    width: 12px;
    height: 12px;
    display: inline-block;
  }
  
  .legend-triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid #000;
    display: inline-block;
  }
  
  .legend-star {
    font-size: 14px;
    line-height: 1;
    display: inline-block;
  }
  
  .legend-line {
    width: 16px;
    height: 2px;
    display: inline-block;
  }
  
  .legend-label {
    font-size: 12px;
    color: #333;
  }
</style>
