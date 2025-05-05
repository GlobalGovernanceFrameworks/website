<!-- src/lib/components/Network/DetailPanel.svelte -->
<!-- Information panel for displaying details about selected network elements -->

<script>
  import { fade, slide } from 'svelte/transition';
  
  // Props
  export let node = null;
  export let edge = null;
  export let type = 'formal-informal';
  
  function closePanel() {
    node = null;
    edge = null;
  }
  
  $: panelTitle = getTitle();
  
  function getTitle() {
    if (node) {
      return node.label || 'Selected Actor';
    } else if (edge) {
      return 'Relationship Details';
    }
    return '';
  }
  
  function getRelationshipType(type, value) {
    if (type === 'formal-informal') {
      if (value >= 8) return 'Strong Formal Collaboration';
      if (value >= 5) return 'Regular Coordination';
      if (value >= 3) return 'Occasional Interaction';
      return 'Minimal Contact';
    } else if (type === 'resource-flow') {
      if (value >= 8) return 'Major Funding Relationship';
      if (value >= 5) return 'Significant Resource Sharing';
      if (value >= 3) return 'Moderate Resource Transfer';
      return 'Limited Resource Exchange';
    } else if (type === 'influence') {
      if (value >= 8) return 'Strong Influence';
      if (value >= 5) return 'Moderate Influence';
      if (value >= 3) return 'Some Influence';
      return 'Limited Influence';
    } else if (type === 'trust') {
      if (value >= 8) return 'High Trust';
      if (value >= 5) return 'Moderate Trust';
      if (value >= 3) return 'Limited Trust';
      return 'Low Trust/Suspicion';
    }
    return 'Connection';
  }
  
  function getNodeTypeName(group) {
    switch (type) {
      case 'formal-informal':
        return group === 1 ? 'Formal Institution' : 
               group === 2 ? 'Civil Society Organization' : 
               group === 3 ? 'Community Initiative' : 'Other Actor';
      case 'resource-flow':
        return group === 1 ? 'Donor' : 
               group === 2 ? 'Implementer' : 
               group === 3 ? 'Beneficiary' : 'Other';
      case 'influence':
        return group === 1 ? 'Government Actor' : 
               group === 2 ? 'Non-State Influencer' : 
               group === 3 ? 'International Actor' : 'Other Stakeholder';
      case 'trust':
        return group === 1 ? 'Group A' : 
               group === 2 ? 'Group B' : 
               group === 3 ? 'Mediator' : 'Other';
      default:
        return 'Actor';
    }
  }
</script>

{#if node || edge}
  <div class="detail-panel" transition:slide={{ duration: 300, axis: 'x' }}>
    <div class="panel-header">
      <h3>{panelTitle}</h3>
      <button class="close-btn" on:click={closePanel}>×</button>
    </div>
    
    <div class="panel-content">
      {#if node}
        <div class="node-details">
          <div class="detail-section">
            <p class="detail-label">Actor Type</p>
            <p class="detail-value">
              <span 
                class="node-type" 
                style="background-color: {node.color || '#7F8C8D'}"
              >
                {getNodeTypeName(node.group)}
              </span>
            </p>
          </div>
          
          <div class="detail-section">
            <p class="detail-label">Centrality</p>
            <p class="detail-value">
              <span class="centrality-indicator" style="width: {node.value * 10}%"></span>
              <span class="centrality-value">{node.value}/10</span>
            </p>
          </div>
          
          {#if node.description}
            <div class="detail-section">
              <p class="detail-label">Description</p>
              <p class="description">{node.description}</p>
            </div>
          {/if}
          
          {#if node.connections}
            <div class="detail-section">
              <p class="detail-label">Key Connections</p>
              <ul class="connections-list">
                {#each node.connections as connection}
                  <li>{connection}</li>
                {/each}
              </ul>
            </div>
          {/if}
          
          <div class="recommendations-section">
            <h4>Strategic Recommendations</h4>
            <ul class="recommendation-list">
              {#if type === 'formal-informal'}
                <li>Strengthen information sharing protocols between this actor and their informal partners</li>
                <li>Create opportunities for joint planning and action with complementary stakeholders</li>
                <li>Address identified institutional barriers to collaboration</li>
              {:else if type === 'resource-flow'}
                <li>Diversify resource channels to reduce dependency on single funding sources</li>
                <li>Implement transparency mechanisms to ensure accountable resource use</li>
                <li>Identify resource gaps and potential new partnerships to address them</li>
              {:else if type === 'influence'}
                <li>Engage this stakeholder early in peace initiatives due to their significant influence</li>
                <li>Develop targeted messaging that addresses their specific interests and concerns</li>
                <li>Identify allies who can help mitigate potential resistance from this actor</li>
              {:else if type === 'trust'}
                <li>Implement confidence-building measures focused on areas of shared interest</li>
                <li>Create structured dialogue opportunities with neutral facilitation</li>
                <li>Develop incremental cooperation initiatives to gradually build trust</li>
              {/if}
            </ul>
          </div>
        </div>
      {:else}
        <div class="edge-details">
          <div class="detail-section">
            <p class="detail-label">Relationship Type</p>
            <p class="detail-value">
              <span 
                class="relationship-type" 
                style="background-color: {edge.color || '#7F8C8D'}"
              >
                {getRelationshipType(type, edge.value)}
              </span>
            </p>
          </div>
          
          <div class="detail-section">
            <p class="detail-label">Strength</p>
            <p class="detail-value">
              <span class="strength-indicator" style="width: {edge.value * 10}%"></span>
              <span class="strength-value">{edge.value}/10</span>
            </p>
          </div>
          
          {#if edge.from && edge.to}
            <div class="detail-section">
              <p class="detail-label">Connection</p>
              <p class="connection-text">From <strong>{edge.from_label || edge.from}</strong> to <strong>{edge.to_label || edge.to}</strong></p>
            </div>
          {/if}
          
          {#if edge.description}
            <div class="detail-section">
              <p class="detail-label">Description</p>
              <p class="description">{edge.description}</p>
            </div>
          {/if}
          
          <div class="recommendations-section">
            <h4>Relationship Strategy</h4>
            <ul class="recommendation-list">
              {#if type === 'formal-informal'}
                <li>Formalize communication channels to strengthen this relationship</li>
                <li>Identify specific collaboration opportunities in upcoming peace initiatives</li>
                <li>Document lessons learned from past interactions to improve future engagement</li>
              {:else if type === 'resource-flow'}
                <li>Evaluate effectiveness of current resource allocation and distribution</li>
                <li>Develop joint planning processes for future resource needs</li>
                <li>Address any identified bottlenecks in resource transfers</li>
              {:else if type === 'influence'}
                <li>Map how this relationship affects other stakeholders in the network</li>
                <li>Identify potential risks from power imbalances in this relationship</li>
                <li>Develop engagement strategies that leverage existing influence dynamics</li>
              {:else if type === 'trust'}
                <li>Create safe spaces for direct dialogue to address underlying tensions</li>
                <li>Implement verification mechanisms for agreements between these parties</li>
                <li>Identify neutral third parties who can help strengthen this relationship</li>
              {/if}
            </ul>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="panel-footer">
      <button class="action-btn">Export Details</button>
      <button class="action-btn">Add to Report</button>
    </div>
  </div>
{/if}

<style>
  .detail-panel {
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
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }
  
  .panel-header h3 {
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
  
  .panel-content {
    padding: 16px;
    max-height: 500px;
    overflow-y: auto;
  }
  
  .detail-section {
    margin-bottom: 16px;
  }
  
  .detail-label {
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 4px 0;
  }
  
  .detail-value {
    margin: 0;
  }
  
  .node-type,
  .relationship-type {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    color: white;
    font-weight: 500;
  }
  
  .centrality-indicator,
  .strength-indicator {
    display: block;
    height: 8px;
    background-color: #3498db;
    border-radius: 4px;
    margin-bottom: 6px;
  }
  
  .centrality-value,
  .strength-value {
    font-size: 13px;
    color: #7f8c8d;
  }
  
  .description {
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    margin: 0;
  }
  
  .connections-list,
  .recommendation-list {
    margin: 8px 0 0 0;
    padding-left: 20px;
  }
  
  .connections-list li,
  .recommendation-list li {
    font-size: 13px;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
  }
  
  .connection-text {
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    margin: 0;
  }
  
  .recommendations-section,
  .panel-footer {
    border-top: 1px dashed #ddd;
    padding-top: 12px;
    margin-top: 16px;
  }
  
  .recommendations-section h4 {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 10px 0;
  }
  
  .panel-footer {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    background-color: #f8f9fa;
  }
  
  .action-btn {
    background-color: #3498db;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    transition: background-color 0.2s;
  }
  
  .action-btn:hover {
    background-color: #2980b9;
  }
</style>
