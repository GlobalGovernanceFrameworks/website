<!-- src/lib/components/Network/controls/LegendPanel.svelte -->
<!-- Component for displaying the legend for network visualizations -->

<script>
  // Props
  export let type = 'formal-informal';
  
  $: legendItems = getLegendItems(type);
  $: relationshipItems = getRelationshipItems(type);
  
  // Get node type legend items based on network type
  function getLegendItems(networkType) {
    switch(networkType) {
      case 'formal-informal':
        return [
          { name: 'Formal Institution', color: '#3498db' },
          { name: 'Civil Society Organization', color: '#2ecc71' },
          { name: 'Community Initiative', color: '#9b59b6' },
          { name: 'Other Actor', color: '#7f8c8d' }
        ];
      case 'resource-flow':
        return [
          { name: 'Donor', color: '#e74c3c' },
          { name: 'Implementer', color: '#f39c12' },
          { name: 'Beneficiary', color: '#1abc9c' },
          { name: 'Other', color: '#7f8c8d' }
        ];
      case 'influence':
        return [
          { name: 'Government Actor', color: '#3498db' },
          { name: 'Non-State Influencer', color: '#e67e22' },
          { name: 'International Actor', color: '#9b59b6' },
          { name: 'Other Stakeholder', color: '#7f8c8d' }
        ];
      case 'trust':
        return [
          { name: 'Group A', color: '#3498db' },
          { name: 'Group B', color: '#e74c3c' },
          { name: 'Mediator', color: '#2ecc71' },
          { name: 'Other', color: '#7f8c8d' }
        ];
      default:
        return [
          { name: 'Actor Type 1', color: '#3498db' },
          { name: 'Actor Type 2', color: '#2ecc71' },
          { name: 'Actor Type 3', color: '#9b59b6' },
          { name: 'Other Actor', color: '#7f8c8d' }
        ];
    }
  }
  
  // Get relationship/edge legend items based on network type
  function getRelationshipItems(networkType) {
    switch(networkType) {
      case 'formal-informal':
        return [
          { name: 'Strong Formal Collaboration', thickness: 4 },
          { name: 'Regular Coordination', thickness: 3 },
          { name: 'Occasional Interaction', thickness: 2 },
          { name: 'Minimal Contact', thickness: 1 }
        ];
      case 'resource-flow':
        return [
          { name: 'Major Funding Relationship', thickness: 4 },
          { name: 'Significant Resource Sharing', thickness: 3 },
          { name: 'Moderate Resource Transfer', thickness: 2 },
          { name: 'Limited Resource Exchange', thickness: 1 }
        ];
      case 'influence':
        return [
          { name: 'Strong Influence', thickness: 4 },
          { name: 'Moderate Influence', thickness: 3 },
          { name: 'Some Influence', thickness: 2 },
          { name: 'Limited Influence', thickness: 1 }
        ];
      case 'trust':
        return [
          { name: 'High Trust', thickness: 4 },
          { name: 'Moderate Trust', thickness: 3 },
          { name: 'Limited Trust', thickness: 2 },
          { name: 'Low Trust/Suspicion', thickness: 1 }
        ];
      default:
        return [
          { name: 'Strong Connection', thickness: 4 },
          { name: 'Medium Connection', thickness: 3 },
          { name: 'Weak Connection', thickness: 2 },
          { name: 'Minimal Connection', thickness: 1 }
        ];
    }
  }
</script>

<div class="legend-panel">
  <h3>Legend</h3>
  
  <div class="legend-section">
    <h4>Actor Types</h4>
    <div class="legend-items">
      {#each legendItems as item}
        <div class="legend-item">
          <span class="color-indicator" style="background-color: {item.color}"></span>
          <span class="legend-label">{item.name}</span>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="legend-section">
    <h4>Relationship Strength</h4>
    <div class="legend-items">
      {#each relationshipItems as item}
        <div class="legend-item">
          <span class="line-indicator" style="height: {item.thickness}px"></span>
          <span class="legend-label">{item.name}</span>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="legend-section">
    <h4>Node Size</h4>
    <div class="legend-items">
      <div class="legend-item">
        <span class="size-indicator size-large"></span>
        <span class="legend-label">High Centrality/Importance</span>
      </div>
      <div class="legend-item">
        <span class="size-indicator size-medium"></span>
        <span class="legend-label">Medium Centrality</span>
      </div>
      <div class="legend-item">
        <span class="size-indicator size-small"></span>
        <span class="legend-label">Low Centrality</span>
      </div>
    </div>
  </div>
</div>

<style>
  .legend-panel {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
  
  h4 {
    margin: 0.75rem 0 0.35rem 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #34495e;
  }
  
  .legend-section {
    margin-bottom: 0.75rem;
  }
  
  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .color-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  
  .line-indicator {
    width: 20px;
    background-color: #34495e;
    display: inline-block;
  }
  
  .size-indicator {
    border-radius: 50%;
    background-color: #34495e;
    display: inline-block;
  }
  
  .size-large {
    width: 16px;
    height: 16px;
  }
  
  .size-medium {
    width: 12px;
    height: 12px;
  }
  
  .size-small {
    width: 8px;
    height: 8px;
  }
  
  .legend-label {
    font-size: 0.8rem;
    color: #333;
  }
</style>
