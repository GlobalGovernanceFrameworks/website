<!-- src/lib/components/Systems/DetailPanel.svelte -->
<!-- Information panel for displaying details about selected system elements -->

<script>
  import { fade, slide } from 'svelte/transition';
  
  // Props
  export let element = null;
  export let type = 'feedback-loops';
  
  function closePanel() {
    element = null;
  }
  
  $: panelTitle = getTitle();
  
  function getTitle() {
    if (!element) return '';
    
    switch(type) {
      case 'feedback-loops':
        return element.label || 'Variable';
      case 'stock-flow':
        if (element.id.startsWith('stock')) return 'Stock: ' + element.label;
        if (element.id.startsWith('flow')) return 'Flow: ' + element.label;
        if (element.id.startsWith('aux')) return 'Auxiliary: ' + element.label;
        return element.label;
      case 'leverage-points':
        if (element.level !== undefined) return `Leverage Point (L${element.level}): ${element.label}`;
        return element.label;
      case 'resilience-factors':
        if (element.category) return `${element.category.charAt(0).toUpperCase() + element.category.slice(1)} Factor: ${element.label}`;
        return element.label;
      default:
        return element.label || 'System Element';
    }
  }
</script>

{#if element}
  <div class="detail-panel" transition:slide={{ duration: 300, axis: 'x' }}>
    <div class="panel-header">
      <h3>{panelTitle}</h3>
      <button class="close-btn" on:click={closePanel}>×</button>
    </div>
    
    <div class="panel-content">
      {#if type === 'feedback-loops'}
        <div class="details-section">
          {#if element.description}
            <div class="detail-item">
              <p class="detail-label">Description</p>
              <p class="description">{element.description}</p>
            </div>
          {/if}
          
          {#if element.value !== undefined}
            <div class="detail-item">
              <p class="detail-label">Current Value</p>
              <p class="detail-value">{element.value.toFixed(1)}</p>
            </div>
          {/if}
          
          {#if element.connections}
            <div class="detail-item">
              <p class="detail-label">Connections</p>
              <ul class="connections-list">
                {#each element.connections as connection}
                  <li>{connection}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        
        <div class="theory-section">
          <h4>Systems Insights</h4>
          <p>Variables in feedback loops can act as both cause and effect. This variable is part of the following dynamics:</p>
          <ul>
            {#if element.loops && element.loops.includes('reinforcing')}
              <li><strong>Reinforcing feedback:</strong> Changes to this variable may amplify over time, potentially leading to escalation dynamics.</li>
            {/if}
            {#if element.loops && element.loops.includes('balancing')}
              <li><strong>Balancing feedback:</strong> This variable contributes to stabilizing effects that counteract change.</li>
            {/if}
            {#if !element.loops || (!element.loops.includes('reinforcing') && !element.loops.includes('balancing'))}
              <li><strong>Auxiliary variable:</strong> This element influences system behavior without being part of a main feedback loop.</li>
            {/if}
          </ul>
        </div>
        
        <div class="intervention-section">
          <h4>Intervention Considerations</h4>
          <ul>
            <li>Changes to this variable might have both intended and unintended consequences due to feedback effects.</li>
            <li>Consider monitoring how this variable changes over time to identify emerging patterns.</li>
            <li>Look for "tipping points" where small changes could trigger larger system shifts.</li>
          </ul>
        </div>
      {:else if type === 'stock-flow'}
        <div class="details-section">
          {#if element.description}
            <div class="detail-item">
              <p class="detail-label">Description</p>
              <p class="description">{element.description}</p>
            </div>
          {/if}
          
          {#if element.value !== undefined}
            <div class="detail-item">
              <p class="detail-label">Current {element.id.startsWith('stock') ? 'Level' : element.id.startsWith('flow') ? 'Rate' : 'Value'}</p>
              <p class="detail-value">{element.value.toFixed(1)}{element.id.startsWith('flow') ? '/time unit' : ''}</p>
            </div>
          {/if}
          
          {#if element.capacity !== undefined}
            <div class="detail-item">
              <p class="detail-label">Maximum Capacity</p>
              <p class="detail-value">{element.capacity.toFixed(1)}</p>
            </div>
          {/if}
        </div>
        
        <div class="theory-section">
          <h4>Systems Insights</h4>
          {#if element.id.startsWith('stock')}
            <p>Stocks represent accumulations within a system. Key insights:</p>
            <ul>
              <li><strong>Inertia:</strong> Stocks change slowly and provide stability to systems.</li>
              <li><strong>Memory:</strong> This stock's current value reflects its entire history of inflows and outflows.</li>
              <li><strong>Delays:</strong> Changes to flows will take time to significantly affect this stock's level.</li>
            </ul>
          {:else if element.id.startsWith('flow')}
            <p>Flows represent activities that change stock levels. Key insights:</p>
            <ul>
              <li><strong>Direct influence:</strong> Adjusting this flow will immediately change the rate at which connected stocks change.</li>
              <li><strong>Power lever:</strong> Flows are often more responsive to intervention than stocks.</li>
              <li><strong>Compounding effects:</strong> Small changes in persistent flows lead to large changes in stocks over time.</li>
            </ul>
          {:else}
            <p>Auxiliary variables represent factors that influence flows. Key insights:</p>
            <ul>
              <li><strong>Decision points:</strong> Often represent places where human decisions affect system behavior.</li>
              <li><strong>Information pathways:</strong> Show how information from one part of the system affects another.</li>
              <li><strong>Conversion factors:</strong> May represent how one type of variable converts to influence on another.</li>
            </ul>
          {/if}
        </div>
        
        <div class="intervention-section">
          <h4>Intervention Considerations</h4>
          {#if element.id.startsWith('stock')}
            <ul>
              <li>Significant changes to this stock will require sustained changes to inflows and outflows.</li>
              <li>Consider both the absolute level and the rate of change when evaluating this stock.</li>
              <li>Identify critical thresholds where this stock's behavior might change dramatically.</li>
            </ul>
          {:else if element.id.startsWith('flow')}
            <ul>
              <li>Focus on factors that determine this flow rate to create sustainable change.</li>
              <li>Be aware of constraints that might limit how much this flow can be adjusted.</li>
              <li>Consider whether interventions affect this flow temporarily or permanently.</li>
            </ul>
          {:else}
            <ul>
              <li>Changes to this variable may have amplified effects through the flows it influences.</li>
              <li>Look for information delays that might affect how quickly changes to this variable impact the system.</li>
              <li>Consider how this variable might be influenced by factors outside the current model boundary.</li>
            </ul>
          {/if}
        </div>
      {:else if type === 'leverage-points'}
        <div class="details-section">
          {#if element.description}
            <div class="detail-item">
              <p class="detail-label">Description</p>
              <p class="description">{element.description}</p>
            </div>
          {/if}
          
          {#if element.level !== undefined}
            <div class="detail-item">
              <p class="detail-label">Leverage Level</p>
              <p class="detail-value">
                <span class="level-indicator" style="background-color: {
                  element.level <= 3 ? '#e74c3c' : 
                  element.level <= 6 ? '#e67e22' : 
                  element.level <= 9 ? '#f1c40f' : '#9b59b6'
                }">L{element.level}</span>
                {element.level <= 3 ? '(Paradigms/Goals - Highest Leverage)' : 
                 element.level <= 6 ? '(Rules/Information - High Leverage)' : 
                 element.level <= 9 ? '(Feedback/Delays - Medium Leverage)' : '(Parameters/Buffer - Lower Leverage)'}
              </p>
            </div>
          {/if}
          
          {#if element.impact !== undefined}
            <div class="detail-item">
              <p class="detail-label">Potential Impact</p>
              <p class="detail-value">{element.impact}/10</p>
            </div>
          {/if}
          
          {#if element.difficulty !== undefined}
            <div class="detail-item">
              <p class="detail-label">Implementation Difficulty</p>
              <p class="detail-value">{element.difficulty}/10</p>
            </div>
          {/if}
        </div>
        
        <div class="theory-section">
          <h4>Leverage Point Theory</h4>
          {#if element.level <= 3}
            <p>This is a <strong>paradigm or goals-level</strong> leverage point, representing fundamental system purpose and design:</p>
            <ul>
              <li><strong>Transcending paradigms:</strong> The ability to understand multiple worldviews without being limited by any.</li>
              <li><strong>Paradigm shifts:</strong> Changing the basic assumptions from which the system operates.</li>
              <li><strong>System goals:</strong> The purpose or function that the system serves.</li>
            </ul>
          {:else if element.level <= 6}
            <p>This is a <strong>rules or information-level</strong> leverage point, addressing system structure and information flows:</p>
            <ul>
              <li><strong>Self-organization:</strong> The power to add, change, or evolve system structure.</li>
              <li><strong>Rules:</strong> Incentives, punishments, constraints that shape system behavior.</li>
              <li><strong>Information flows:</strong> Who does and doesn't have access to what information.</li>
            </ul>
          {:else if element.level <= 9}
            <p>This is a <strong>feedback or delays-level</strong> leverage point, focusing on system operations:</p>
            <ul>
              <li><strong>Feedback loops:</strong> The strength of corrective or reinforcing feedback processes.</li>
              <li><strong>Delays:</strong> The lengths of time relative to system changes.</li>
              <li><strong>Balancing mechanisms:</strong> The strength of processes that regulate system behavior.</li>
            </ul>
          {:else}
            <p>This is a <strong>parameter or buffer-level</strong> leverage point, addressing system details:</p>
            <ul>
              <li><strong>Buffer sizes:</strong> The sizes of stabilizing stocks relative to flows.</li>
              <li><strong>Constants and parameters:</strong> Numbers that determine how much flows move.</li>
              <li><strong>Physical structure:</strong> The arrangement of physical elements within the system.</li>
            </ul>
          {/if}
        </div>
        
        <div class="intervention-section">
          <h4>Intervention Strategy</h4>
          {#if element.level <= 3}
            <ul>
              <li>Focus on transformative dialogues about the fundamental purpose of the system.</li>
              <li>Create safe spaces to question deeply held assumptions and frameworks.</li>
              <li>Look for contradictions between stated goals and actual system behavior.</li>
            </ul>
          {:else if element.level <= 6}
            <ul>
              <li>Identify and modify key rules that shape decisions within the system.</li>
              <li>Ensure critical information reaches all relevant decision-makers.</li>
              <li>Create conditions that allow the system to develop new structures and capabilities.</li>
            </ul>
          {:else if element.level <= 9}
            <ul>
              <li>Strengthen or weaken specific feedback loops to modify system behavior.</li>
              <li>Address critical delays that affect system performance and stability.</li>
              <li>Modify how quickly the system responds to deviations from desired states.</li>
            </ul>
          {:else}
            <ul>
              <li>Adjust specific parameters while recognizing their limited leverage potential.</li>
              <li>Identify how these parameters interact with higher-leverage elements.</li>
              <li>Use parameter changes as entry points for deeper system change.</li>
            </ul>
          {/if}
        </div>
      {:else if type === 'resilience-factors'}
        <div class="details-section">
          {#if element.description}
            <div class="detail-item">
              <p class="detail-label">Description</p>
              <p class="description">{element.description}</p>
            </div>
          {/if}
          
          {#if element.category}
            <div class="detail-item">
              <p class="detail-label">Category</p>
              <p class="detail-value">
                <span class="category-indicator" style="background-color: {
                  element.category === 'social' ? '#3498db' : 
                  element.category === 'institutional' ? '#9b59b6' : 
                  element.category === 'economic' ? '#f1c40f' : 
                  element.category === 'ecological' ? '#2ecc71' : '#7f8c8d'
                }">{element.category.charAt(0).toUpperCase() + element.category.slice(1)}</span>
              </p>
            </div>
          {/if}
          
          {#if element.strength !== undefined}
            <div class="detail-item">
              <p class="detail-label">Current Strength</p>
              <p class="detail-value">{element.strength}/10</p>
            </div>
          {/if}
          
          {#if element.potential !== undefined}
            <div class="detail-item">
              <p class="detail-label">Development Potential</p>
              <p class="detail-value">{element.potential}/10</p>
            </div>
          {/if}
        </div>
        
        <div class="theory-section">
          <h4>Resilience Theory</h4>
          {#if element.category === 'social'}
            <p>This is a <strong>social resilience factor</strong>, addressing human relationships and social capital:</p>
            <ul>
              <li><strong>Social cohesion:</strong> Shared identity and strong relationships buffer against conflict triggers.</li>
              <li><strong>Community networks:</strong> Interconnections that enable coordination during stress.</li>
              <li><strong>Trust:</strong> Reduces transaction costs and enables cooperation during crises.</li>
            </ul>
          {:else if element.category === 'institutional'}
            <p>This is an <strong>institutional resilience factor</strong>, focusing on governance and structures:</p>
            <ul>
              <li><strong>Adaptive governance:</strong> Decision systems that can adjust to changing circumstances.</li>
              <li><strong>Legitimacy:</strong> Perceived fairness and inclusivity of institutions.</li>
              <li><strong>Coordination capacity:</strong> Ability to organize collective responses to challenges.</li>
            </ul>
          {:else if element.category === 'economic'}
            <p>This is an <strong>economic resilience factor</strong>, related to resources and livelihoods:</p>
            <ul>
              <li><strong>Diversity:</strong> Multiple economic activities that provide stability if one sector fails.</li>
              <li><strong>Resource buffers:</strong> Reserves that can be mobilized during scarcity or shocks.</li>
              <li><strong>Equitable distribution:</strong> Widely shared benefits that prevent grievance formation.</li>
            </ul>
          {:else if element.category === 'ecological'}
            <p>This is an <strong>ecological resilience factor</strong>, connected to natural systems:</p>
            <ul>
              <li><strong>Ecosystem health:</strong> Functional natural systems providing services and resources.</li>
              <li><strong>Biodiversity:</strong> Multiple species and functions creating redundancy and options.</li>
              <li><strong>Sustainable management:</strong> Governance of natural resources that maintains long-term viability.</li>
            </ul>
          {:else}
            <p>This element contributes to system resilience - the capacity to withstand shocks while maintaining function:</p>
            <ul>
              <li><strong>Redundancy:</strong> Multiple pathways to achieve critical functions.</li>
              <li><strong>Modularity:</strong> Components that can operate independently if connections fail.</li>
              <li><strong>Adaptive capacity:</strong> Ability to learn, adjust, and transform when needed.</li>
            </ul>
          {/if}
        </div>
        
        <div class="intervention-section">
          <h4>Strengthening Strategy</h4>
          {#if element.category === 'social'}
            <ul>
              <li>Invest in cross-community dialogue and relationship building before crises emerge.</li>
              <li>Create inclusive spaces that bridge identity groups while respecting diversity.</li>
              <li>Support community-led initiatives that build shared identity and purpose.</li>
            </ul>
          {:else if element.category === 'institutional'}
            <ul>
              <li>Develop inclusive decision-making processes that involve diverse stakeholders.</li>
              <li>Build feedback mechanisms that allow institutions to learn and adapt quickly.</li>
              <li>Strengthen coordination networks between different governance levels and sectors.</li>
            </ul>
          {:else if element.category === 'economic'}
            <ul>
              <li>Support diverse economic activities rather than dependence on a single sector.</li>
              <li>Create fair benefit-sharing mechanisms from key resources and industries.</li>
              <li>Develop shock-responsive economic safety nets that activate automatically during crises.</li>
            </ul>
          {:else if element.category === 'ecological'}
            <ul>
              <li>Restore and protect key ecosystem functions and services vital to community wellbeing.</li>
              <li>Establish sustainable resource management practices with broad stakeholder participation.</li>
              <li>Create governance systems that balance immediate needs with long-term ecological sustainability.</li>
            </ul>
          {:else}
            <ul>
              <li>Identify critical thresholds where this resilience factor might fail under pressure.</li>
              <li>Build redundant capacities that can maintain function if primary systems fail.</li>
              <li>Develop early warning indicators to identify when this resilience factor is weakening.</li>
            </ul>
          {/if}
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
    max-height: 550px;
    overflow-y: auto;
  }
  
  .details-section,
  .theory-section,
  .intervention-section {
    margin-bottom: 1.5rem;
  }
  
  .detail-item {
    margin-bottom: 0.75rem;
  }
  
  .detail-label {
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 4px 0;
  }
  
  .description,
  .detail-value {
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    margin: 0;
  }
  
  .level-indicator,
  .category-indicator {
    display: inline-block;
    padding: 3px 6px;
    border-radius: 3px;
    color: white;
    font-weight: 500;
    font-size: 12px;
    margin-right: 6px;
  }
  
  .connections-list {
    margin: 6px 0 0 0;
    padding-left: 20px;
  }
  
  .connections-list li {
    font-size: 13px;
    color: #333;
    margin-bottom: 4px;
  }
  
  .theory-section h4,
  .intervention-section h4 {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 10px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }
  
  .theory-section p,
  .intervention-section p {
    font-size: 13px;
    line-height: 1.5;
    margin: 0 0 10px 0;
  }
  
  .theory-section ul,
  .intervention-section ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .theory-section li,
  .intervention-section li {
    font-size: 13px;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
  }
  
  .panel-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: #f8f9fa;
    border-top: 1px solid #eee;
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
