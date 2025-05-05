<!-- src/lib/components/Systems/controls/LegendPanel.svelte -->
<!-- Component for displaying the legend for system dynamics models -->

<script>
  // Props
  export let type = 'feedback-loops';
  
  $: legendItems = getLegendItems(type);
  
  // Get legend items based on model type
  function getLegendItems(modelType) {
    switch(modelType) {
      case 'feedback-loops':
        return [
          { label: 'Variable', shape: 'circle', color: '#2c3e50', size: 'medium' },
          { label: 'Reinforcing Loop (R)', shape: 'line', color: '#e74c3c', dashed: false },
          { label: 'Balancing Loop (B)', shape: 'line', color: '#3498db', dashed: true },
          { label: 'Variable Size', description: 'Indicates variable importance' },
          { label: 'Connection Width', description: 'Indicates relationship strength' }
        ];
      case 'stock-flow':
        return [
          { label: 'Stock', shape: 'rectangle', color: '#3498db', size: 'medium' },
          { label: 'Flow', shape: 'diamond', color: '#2ecc71', size: 'medium' },
          { label: 'Auxiliary Variable', shape: 'circle', color: '#f1c40f', size: 'small' },
          { label: 'Positive Influence', shape: 'line', color: '#2ecc71', dashed: false },
          { label: 'Negative Influence', shape: 'line', color: '#e74c3c', dashed: true }
        ];
      case 'leverage-points':
        return [
          { label: 'Paradigm Level (1-3)', shape: 'hexagon', color: '#e74c3c', size: 'large' },
          { label: 'Design Level (4-6)', shape: 'hexagon', color: '#e67e22', size: 'medium-large' },
          { label: 'Feedback Level (7-9)', shape: 'hexagon', color: '#f1c40f', size: 'medium' },
          { label: 'Parameter Level (10-12)', shape: 'hexagon', color: '#9b59b6', size: 'small' },
          { label: 'System Boundary', shape: 'area', color: '#ecf0f1', dashed: true },
          { label: 'Process Element', shape: 'round-rect', color: '#3498db', size: 'medium' },
          { label: 'Resource Element', shape: 'circle', color: '#2ecc71', size: 'small' },
          { label: 'Actor Element', shape: 'triangle', color: '#f1c40f', size: 'small' }
        ];
      case 'resilience-factors':
        return [
          { label: 'Social Factor', shape: 'octagon', color: '#3498db', size: 'medium' },
          { label: 'Institutional Factor', shape: 'octagon', color: '#9b59b6', size: 'medium' },
          { label: 'Economic Factor', shape: 'octagon', color: '#f1c40f', size: 'medium' },
          { label: 'Ecological Factor', shape: 'octagon', color: '#2ecc71', size: 'medium' },
          { label: 'Synergy Connection', shape: 'line', color: '#2ecc71', dashed: false },
          { label: 'Dependency Connection', shape: 'line', color: '#3498db', dashed: false },
          { label: 'Trade-off Connection', shape: 'line', color: '#e74c3c', dashed: true },
          { label: 'System Layer', shape: 'area', color: '#ecf0f1', dashed: true }
        ];
      default:
        return [
          { label: 'Node', shape: 'circle', color: '#2c3e50', size: 'medium' },
          { label: 'Connection', shape: 'line', color: '#7f8c8d', dashed: false }
        ];
    }
  }
</script>

<div class="legend-panel">
  <h3>Legend</h3>
  <div class="legend-items">
    {#each legendItems as item}
      <div class="legend-item">
        {#if item.shape === 'circle'}
          <span class="shape-circle" style="background-color: {item.color}; width: {item.size === 'large' ? '16px' : item.size === 'small' ? '10px' : '13px'}; height: {item.size === 'large' ? '16px' : item.size === 'small' ? '10px' : '13px'};"></span>
        {:else if item.shape === 'rectangle'}
          <span class="shape-rectangle" style="background-color: {item.color};"></span>
        {:else if item.shape === 'diamond'}
          <span class="shape-diamond" style="background-color: {item.color};"></span>
        {:else if item.shape === 'hexagon'}
          <span class="shape-hexagon" style="background-color: {item.color}; width: {item.size === 'large' ? '16px' : item.size === 'medium-large' ? '14px' : item.size === 'small' ? '10px' : '12px'}; height: {item.size === 'large' ? '16px' : item.size === 'medium-large' ? '14px' : item.size === 'small' ? '10px' : '12px'};"></span>
        {:else if item.shape === 'octagon'}
          <span class="shape-octagon" style="background-color: {item.color};"></span>
        {:else if item.shape === 'triangle'}
          <span class="shape-triangle" style="border-bottom-color: {item.color};"></span>
        {:else if item.shape === 'round-rect'}
          <span class="shape-round-rect" style="background-color: {item.color};"></span>
        {:else if item.shape === 'area'}
          <span class="shape-area" style="background-color: {item.color}; border-style: {item.dashed ? 'dashed' : 'solid'};"></span>
        {:else if item.shape === 'line'}
          <span class="shape-line" style="background-color: {item.color}; border-style: {item.dashed ? 'dashed' : 'solid'};"></span>
        {/if}
        <span class="legend-label">
          {item.label}
          {#if item.description}
            <span class="legend-description">{item.description}</span>
          {/if}
        </span>
      </div>
    {/each}
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
  
  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .shape-circle {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: inline-block;
  }
  
  .shape-rectangle {
    width: 18px;
    height: 12px;
    display: inline-block;
  }
  
  .shape-diamond {
    width: 13px;
    height: 13px;
    background-color: red;
    transform: rotate(45deg);
    display: inline-block;
  }
  
  .shape-hexagon {
    width: 14px;
    height: 14px;
    background-color: red;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: inline-block;
  }
  
  .shape-octagon {
    width: 14px;
    height: 14px;
    background-color: red;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    display: inline-block;
  }
  
  .shape-triangle {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 14px solid red;
    display: inline-block;
  }
  
  .shape-round-rect {
    width: 18px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
  }
  
  .shape-area {
    width: 18px;
    height: 12px;
    background-color: rgba(236, 240, 241, 0.3);
    border: 1px dashed #7f8c8d;
    display: inline-block;
  }
  
  .shape-line {
    width: 20px;
    height: 2px;
    display: inline-block;
  }
  
  .legend-label {
    font-size: 0.85rem;
    color: #333;
    display: flex;
    flex-direction: column;
  }
  
  .legend-description {
    font-size: 0.75rem;
    color: #7f8c8d;
    font-style: italic;
  }
</style>
