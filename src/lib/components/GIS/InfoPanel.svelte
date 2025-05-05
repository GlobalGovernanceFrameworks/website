<!-- src/lib/components/GIS/InfoPanel.svelte -->
<!-- Information panel for displaying details about selected map elements -->

<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import type { 
    ResourceConflict, 
    PeaceInfrastructure, 
    InfrastructureGap, 
    CrossBorderFlow, 
    BorderStatus, 
    ClimateProjection 
  } from './types/GISTypes';
  
  export let selectedItem: any = null;
  export let itemType: string = '';
  
  function closePanel() {
    selectedItem = null;
  }
  
  $: panelTitle = getItemTitle(selectedItem, itemType);
  
  function getItemTitle(item: any, type: string): string {
    if (!item) return '';
    
    switch(type) {
      case 'conflict':
        return item.name;
      case 'infrastructure':
        return item.name;
      case 'gap':
        return `Infrastructure Gap: ${item.name}`;
      case 'flow':
        return item.name;
      case 'border':
        return item.name;
      case 'projection':
        return `${item.name} (${item.timeframe})`;
      default:
        return item.name || 'Selected Item';
    }
  }
</script>

{#if selectedItem}
  <div class="info-panel" transition:slide={{ duration: 300, axis: 'x' }}>
    <div class="info-header">
      <h3>{panelTitle}</h3>
      <button class="close-btn" on:click={closePanel}>×</button>
    </div>
    
    <div class="info-content">
      {#if itemType === 'conflict'}
        {@const conflict = selectedItem as ResourceConflict}
        <div class="info-section">
          <p class="info-label">Conflict Level:</p>
          <p class="info-value">
            <span 
              class="conflict-level" 
              style="background-color: {
                conflict.level === 'high' ? '#e74c3c' : 
                conflict.level === 'medium' ? '#f39c12' : '#f1c40f'
              }">
              {conflict.level.charAt(0).toUpperCase() + conflict.level.slice(1)}
            </span>
          </p>
        </div>
        
        <div class="info-section">
          <p class="info-label">Key Resources:</p>
          <div class="resource-tags">
            {#each conflict.resources as resource}
              <span class="resource-tag">{resource}</span>
            {/each}
          </div>
        </div>
        
        <p class="description">{conflict.details}</p>
      {:else if itemType === 'infrastructure'}
        {@const infrastructure = selectedItem as PeaceInfrastructure}
        <div class="info-section">
          <p class="info-label">Infrastructure Type:</p>
          <p class="info-value">
            <span 
              class="infrastructure-type" 
              style="background-color: {
                infrastructure.category === 'international' ? '#3498db' : 
                infrastructure.category === 'regional' ? '#2ecc71' : 
                infrastructure.category === 'local' ? '#9b59b6' : '#34495e'
              }">
              {infrastructure.category.charAt(0).toUpperCase() + infrastructure.category.slice(1)}
            </span>
          </p>
        </div>
        
        <p class="description">{infrastructure.details}</p>
      {:else if itemType === 'gap'}
        {@const gap = selectedItem as InfrastructureGap}
        <div class="info-section">
          <p class="info-label">Gap Severity:</p>
          <p class="info-value">
            <span 
              class="gap-level" 
              style="background-color: {
                gap.level === 'severe' ? '#c0392b' : '#d35400'
              }">
              {gap.level.charAt(0).toUpperCase() + gap.level.slice(1)}
            </span>
          </p>
        </div>
        
        <p class="description">{gap.details}</p>
      {:else if itemType === 'flow'}
        {@const flow = selectedItem as CrossBorderFlow}
        <div class="info-section">
          <p class="info-label">Flow Type:</p>
          <p class="info-value">
            <span 
              class="flow-type" 
              style="background-color: {
                flow.type === 'forced displacement' ? '#9b59b6' : 
                flow.type === 'economic migration' ? '#3498db' : '#2ecc71'
              }">
              {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)}
            </span>
          </p>
        </div>
        
        <div class="info-section">
          <p class="info-label">Intensity:</p>
          <p class="info-value">
            <span 
              class="flow-intensity" 
              style="background-color: {
                flow.intensity === 'high' ? '#e74c3c' : 
                flow.intensity === 'medium' ? '#f39c12' : '#f1c40f'
              }">
              {flow.intensity.charAt(0).toUpperCase() + flow.intensity.slice(1)}
            </span>
          </p>
        </div>
        
        <p class="description">{flow.details}</p>
      {:else if itemType === 'border'}
        {@const border = selectedItem as BorderStatus}
        <div class="info-section">
          <p class="info-label">Border Status:</p>
          <p class="info-value">
            <span 
              class="border-status" 
              style="background-color: {
                border.status === 'hardening' ? '#34495e' : '#95a5a6'
              }">
              {border.status.charAt(0).toUpperCase() + border.status.slice(1)}
            </span>
          </p>
        </div>
        
        <p class="description">{border.details}</p>
      {:else if itemType === 'projection'}
        {@const projection = selectedItem as ClimateProjection}
        <div class="info-section">
          <p class="info-label">Projected Timeframe:</p>
          <p class="info-value">
            <span class="projection-year">{projection.timeframe}</span>
          </p>
        </div>
        
        <div class="info-section">
          <p class="info-label">Displacement Risk:</p>
          <p class="info-value">
            <span 
              class="displacement-level" 
              style="background-color: {
                projection.impacts.displacement === 'high' ? '#e74c3c' : 
                projection.impacts.displacement === 'medium' ? '#f39c12' : '#f1c40f'
              }">
              {projection.impacts.displacement.charAt(0).toUpperCase() + projection.impacts.displacement.slice(1)}
            </span>
          </p>
        </div>
        
        <div class="info-section">
          <p class="info-label">Conflict Risk:</p>
          <p class="info-value">
            <span 
              class="conflict-level" 
              style="background-color: {
                projection.impacts.conflict === 'high' ? '#8e44ad' : 
                projection.impacts.conflict === 'medium' ? '#9b59b6' : '#3498db'
              }">
              {projection.impacts.conflict.charAt(0).toUpperCase() + projection.impacts.conflict.slice(1)}
            </span>
          </p>
        </div>
        
        <p class="description">{projection.impacts.description}</p>
      {/if}
      
      <div class="policy-section">
        <h4>Policy Recommendations</h4>
        <ul class="policy-list">
          {#if itemType === 'conflict'}
            <li>Develop inclusive resource governance mechanisms with representation from competing user groups.</li>
            <li>Implement early warning systems for resource scarcity linked to conflict prevention networks.</li>
            <li>Support sustainable resource management technologies and practices to reduce competition.</li>
          {:else if itemType === 'infrastructure' || itemType === 'gap'}
            <li>Strengthen coordination between existing peace infrastructure components to maximize coverage.</li>
            <li>Invest in capacity building for local peace actors to address identified infrastructure gaps.</li>
            <li>Develop digital peace technologies to extend reach of existing physical infrastructure.</li>
          {:else if itemType === 'flow' || itemType === 'border'}
            <li>Establish cross-border cooperation mechanisms for coordinated migration governance.</li>
            <li>Develop protection frameworks for vulnerable populations in transit.</li>
            <li>Address root causes driving displacement through targeted development assistance.</li>
          {:else if itemType === 'projection'}
            <li>Integrate climate adaptation and conflict prevention planning in high-risk regions.</li>
            <li>Develop anticipatory governance frameworks to prepare for projected population movements.</li>
            <li>Establish resource-sharing agreements in areas likely to face climate-induced scarcity.</li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
{/if}

<style>
  .info-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 320px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 1000;
  }
  
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }
  
  .info-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #7f8c8d;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    transition: color 0.2s;
  }
  
  .close-btn:hover {
    color: #34495e;
  }
  
  .info-content {
    padding: 16px;
  }
  
  .info-section {
    margin-bottom: 12px;
  }
  
  .info-label {
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 4px 0;
  }
  
  .info-value {
    margin: 0;
  }
  
  .conflict-level,
  .infrastructure-type,
  .gap-level,
  .flow-type,
  .flow-intensity,
  .border-status,
  .displacement-level {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    color: white;
    font-weight: 500;
  }
  
  .resource-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .resource-tag {
    background-color: #f1f1f1;
    color: #333;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 12px;
  }
  
  .projection-year {
    background-color: #34495e;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
  }
  
  .description {
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    margin: 0 0 16px 0;
  }
  
  .policy-section {
    border-top: 1px dashed #ddd;
    padding-top: 12px;
    margin-top: 12px;
  }
  
  .policy-section h4 {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 10px 0;
  }
  
  .policy-list {
    margin: 0;
    padding-left: 20px;
  }
  
  .policy-list li {
    font-size: 13px;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
  }
</style>
