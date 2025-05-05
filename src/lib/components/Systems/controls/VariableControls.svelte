<!-- src/lib/components/Systems/controls/VariableControls.svelte -->
<!-- Control component for adjusting system dynamics model variables -->

<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let variables = {};
  
  const dispatch = createEventDispatcher();
  
  // Handle variable change
  function handleVariableChange(name, event) {
    const value = parseFloat(event.target.value);
    dispatch('variableChange', { name, value });
  }
</script>

<div class="variable-controls">
  <h3>Variable Controls</h3>
  
  {#if Object.keys(variables).length === 0}
    <p class="no-variables">No adjustable variables for this model.</p>
  {:else}
    <div class="variables-list">
      {#each Object.entries(variables) as [name, variable]}
        <div class="variable-item">
          <label for={`var-${name}`}>
            {variable.label || name}
            <span class="value-display">{variable.value.toFixed(1)}</span>
          </label>
          <input 
            id={`var-${name}`}
            type="range" 
            min={variable.min} 
            max={variable.max} 
            step={variable.step || 0.1} 
            value={variable.value}
            on:input={(e) => handleVariableChange(name, e)}
          />
          <div class="range-labels">
            <span class="min-label">{variable.min}</span>
            <span class="max-label">{variable.max}</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  <div class="info-note">
    <p>Adjust variables to see how they affect system behavior during simulation.</p>
  </div>
</div>

<style>
  .variable-controls {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    padding: 0.75rem;
  }
  
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .no-variables {
    color: #7f8c8d;
    font-size: 0.9rem;
    font-style: italic;
    margin: 0.5rem 0;
  }
  
  .variables-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .variable-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #333;
  }
  
  .value-display {
    font-weight: 600;
    color: #2c3e50;
    background-color: #f8f9fa;
    padding: 0.1rem 0.4rem;
    border-radius: 3px;
    min-width: 2rem;
    text-align: center;
  }
  
  input[type="range"] {
    width: 100%;
    cursor: pointer;
  }
  
  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #7f8c8d;
  }
  
  .info-note {
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px dashed #ddd;
    font-size: 0.85rem;
    color: #7f8c8d;
    font-style: italic;
  }
  
  .info-note p {
    margin: 0;
  }
</style>
