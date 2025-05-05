<!-- src/lib/components/Systems/SystemsVisualization.svelte -->
<!-- Main container component for Systems Dynamics visualizations -->

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import SystemsDiagram from './SystemsDiagram.svelte';
  import ModelTypeSelector from './controls/ModelTypeSelector.svelte';
  import ContextSelector from './controls/ContextSelector.svelte';
  import LegendPanel from './controls/LegendPanel.svelte';
  import VariableControls from './controls/VariableControls.svelte';
  import DetailPanel from './DetailPanel.svelte';

  // Debugging state
  let debugMode = true;
  let debugVarHistory = {};
  let lastUpdateTime = 0;

  // Debug logging function
  function debugLog(message, data) {
    if (!debugMode) return;
    
    const timestamp = new Date().toISOString().substr(11, 8);
    const entry = {
      time: timestamp,
      message,
      data: JSON.parse(JSON.stringify(data)) // Deep copy to avoid reference issues
    };
    
    console.log(`[DEBUG ${timestamp}] ${message}`, data);
    debugLog.push(entry);
    
    // Keep log limited to recent entries
    if (debugLog.length > 100) {
      debugLog.shift();
    }
  }  

  // Call this function in key places to track variable changes
  function trackVariableChanges(currentVars, source) {
    if (!debugMode) return;
    
    // Store the initial values if this is the first update
    if (Object.keys(debugVarHistory).length === 0) {
      Object.keys(currentVars).forEach(key => {
        debugVarHistory[key] = [
          { 
            time: 0, 
            value: currentVars[key].value, 
            source: 'initial' 
          }
        ];
      });
      return;
    }
    
    // Check for changes and record them
    let changesFound = false;
    Object.keys(currentVars).forEach(key => {
      if (debugVarHistory[key]) {
        const lastValue = debugVarHistory[key][debugVarHistory[key].length - 1].value;
        const currentValue = currentVars[key].value;
        
        if (Math.abs(lastValue - currentValue) > 0.001) { // Only record significant changes
          debugVarHistory[key].push({
            time: simulationTime,
            value: currentValue,
            source,
            diff: currentValue - lastValue
          });
          changesFound = true;
          console.log(`[DEBUG] Variable ${key} changed from ${lastValue.toFixed(2)} to ${currentValue.toFixed(2)} (${source})`);
        }
      }
    });
    
    return changesFound;
  }

  function debugSimulationState() {
    console.log("--- SIMULATION DEBUG ---");
    console.log("Current time:", simulationTime);
    console.log("Simulation running:", simulationRunning);
    console.log("Speed:", simulationSpeed);
    console.log("Variables:", JSON.stringify(variables, null, 2));
    
    if (diagram && diagram.getDebugState) {
      console.log("Diagram state:", diagram.getDebugState());
    }
  }

  // Modify the toggleSimulation function
  function toggleSimulation() {
    simulationRunning = !simulationRunning;
    console.log(`Simulation ${simulationRunning ? 'started' : 'paused'} at speed ${simulationSpeed}`);
    
    if (diagram) {
      if (simulationRunning) {
        diagram.startSimulation(simulationSpeed);
        // Debug every 2 seconds while simulation is running
        simulationDebugInterval = setInterval(debugSimulationState, 2000);
      } else {
        diagram.pauseSimulation();
        if (simulationDebugInterval) {
          clearInterval(simulationDebugInterval);
          simulationDebugInterval = null;
        }
      }
    }
    
    // Run an immediate debug check
    debugSimulationState();
  }

  // Props
  export let modelType = 'feedback-loops';
  export let selectedContext = 'global';
  export let height = '600px';
  
  // State
  let systemsReady = false;
  let diagram;
  let selectedElement = null;
  let simulationTime = 0;
  let simulationRunning = false;
  let simulationSpeed = 1;
  let variables = {};
  
  const dispatch = createEventDispatcher();
  
  // Handle model type change
  function handleModelTypeChange(event) {
    modelType = event.detail.type;
    selectedElement = null;
    resetSimulation();
    
    // Update variables based on the new model type
    updateVariables();
    
    dispatch('modelTypeChange', { type: modelType });
  }
  
  // Handle context change
  function handleContextChange(event) {
    selectedContext = event.detail.context;
    selectedElement = null;
    resetSimulation();
    
    dispatch('contextChange', { context: selectedContext });
  }
  
  // Handle element selection
  function handleElementSelect(event) {
    selectedElement = event.detail.element;
  }
  
  // Handle systems ready event
  function handleSystemsReady(event) {
    systemsReady = true;
    diagram = event.detail.diagram;
    updateVariables();
  }
  
  // Reset simulation
  function resetSimulation() {
    simulationTime = 0;
    simulationRunning = false;
    if (diagram) {
      diagram.resetSimulation();
    }
  }
  
  // Update simulation speed
  function updateSimulationSpeed(event) {
    simulationSpeed = event.detail.speed;
    if (diagram && simulationRunning) {
      diagram.setSimulationSpeed(simulationSpeed);
    }
  }
  
  // Update variables based on model type
  function updateVariables() {
    switch(modelType) {
      case 'feedback-loops':
        variables = {
          escalationRate: { 
            value: 5, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Conflict Escalation Rate' 
          },
          deescalationRate: { 
            value: 3, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Conflict De-escalation Rate' 
          },
          externalInfluence: { 
            value: 3, 
            min: 0, 
            max: 10, 
            step: 1, 
            label: 'External Influence' 
          }
        };
        break;
      case 'stock-flow':
        variables = {
          resourceInflow: { 
            value: 5, 
            min: 0, 
            max: 10, 
            step: 1, 
            label: 'Resource Inflow Rate' 
          },
          resourceOutflow: { 
            value: 3, 
            min: 0, 
            max: 10, 
            step: 1, 
            label: 'Resource Outflow Rate' 
          },
          grievanceGeneration: { 
            value: 4, 
            min: 0, 
            max: 10, 
            step: 1, 
            label: 'Grievance Generation Rate' 
          },
          grievanceResolution: { 
            value: 2, 
            min: 0, 
            max: 10, 
            step: 1, 
            label: 'Grievance Resolution Rate' 
          }
        };
        break;
      case 'leverage-points':
        variables = {
          interventionStrength: { 
            value: 5, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Intervention Strength' 
          },
          systemResistance: { 
            value: 5, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'System Resistance' 
          },
          implementationQuality: { 
            value: 7, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Implementation Quality' 
          }
        };
        break;
      case 'resilience-factors':
        variables = {
          socialCohesion: { 
            value: 6, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Social Cohesion' 
          },
          institutionalCapacity: { 
            value: 4, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Institutional Capacity' 
          },
          economicDiversity: { 
            value: 5, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Economic Diversity' 
          },
          adaptiveCapacity: { 
            value: 4, 
            min: 1, 
            max: 10, 
            step: 1, 
            label: 'Adaptive Capacity' 
          }
        };
        break;
    }
    
    if (diagram) {
      diagram.updateVariables(variables);
    }
  }
  
  // Handle variable change
  function handleVariableChange(event) {
    const { name, value } = event.detail;
    variables[name].value = value;
    
    if (diagram) {
      diagram.updateVariables(variables);
    }
  }
  
  // Update simulation time
  function handleTimeUpdate(event) {
    simulationTime = event.detail.time;
  }
  
  onMount(() => {
    // Initialize the systems visualization
    updateVariables();
  });
</script>

<div class="systems-visualization" style="height: {height};">
  <div class="controls-panel">
    <ModelTypeSelector 
      type={modelType}
      on:typeChange={handleModelTypeChange}
    />
    
    <ContextSelector 
      context={selectedContext}
      on:contextChange={handleContextChange}
    />
    
    {#if systemsReady}
      <div class="simulation-controls">
        <h3>Simulation Controls</h3>
        
        <div class="time-display">
          <span class="time-label">Time:</span>
          <span class="time-value">{simulationTime.toFixed(1)}</span>
        </div>
        
        <div class="control-buttons">
          <button class="sim-button" on:click={toggleSimulation}>
            {simulationRunning ? 'Pause' : 'Run'} Simulation
          </button>
          <button class="sim-button" on:click={resetSimulation}>
            Reset
          </button>
        </div>
        
        <div class="speed-control">
          <label for="speed-slider">Simulation Speed</label>
          <input 
            id="speed-slider" 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.5" 
            value={simulationSpeed}
            on:input={(e) => updateSimulationSpeed({ detail: { speed: parseFloat(e.target.value) } })}
          />
          <span class="speed-value">{simulationSpeed}x</span>
        </div>
      </div>
      
      <VariableControls 
        {variables}
        on:variableChange={handleVariableChange}
      />
    {/if}
    
    <LegendPanel type={modelType} />
  </div>
  
  <div class="map-panel">
    <SystemsDiagram
      type={modelType}
      context={selectedContext}
      on:ready={handleSystemsReady}
      on:elementSelect={handleElementSelect}
      on:timeUpdate={handleTimeUpdate}
      bind:this={diagram}
      width="100%"
      height="100%"
    />
    
    {#if selectedElement}
      <DetailPanel 
        element={selectedElement}
        type={modelType}
      />
    {/if}
  </div>
</div>

<style>
  .systems-visualization {
    display: grid;
    grid-template-columns: 280px 1fr;
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
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    flex: 1;
  }
  
  .simulation-controls {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
  }
  
  .simulation-controls h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .time-display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .time-label {
    font-weight: 500;
    color: #333;
  }
  
  .time-value {
    font-family: monospace;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .control-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .sim-button {
    flex: 1;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .sim-button:hover {
    background-color: #34495e;
  }
  
  .speed-control {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  
  .speed-control label {
    font-size: 0.9rem;
    color: #333;
  }
  
  .speed-value {
    font-size: 0.9rem;
    color: #666;
    align-self: flex-end;
  }

  .systems-visualization {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
    width: 100%;
    height: 100%;
    min-height: 600px; /* Ensure minimum height */
    font-family: Arial, sans-serif;
  }
  
  /* Responsive layout */
  @media (max-width: 768px) {
    .systems-visualization {
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
    
    .simulation-controls, :global(.model-type-selector), :global(.context-selector), :global(.variable-controls), :global(.legend-panel) {
      flex: 1 1 45%;
      min-width: 200px;
    }
  }
</style>
