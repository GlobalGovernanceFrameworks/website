<!-- src/lib/components/Network/controls/ViewSelector.svelte -->
<!-- Control component for selecting different network views or contexts -->

<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let view = 'global';
  
  const dispatch = createEventDispatcher();
  
  // View options
  const views = [
    { id: 'global', name: 'Global Overview' },
    { id: 'africa', name: 'African Context' },
    { id: 'middle-east', name: 'Middle East Context' },
    { id: 'south-asia', name: 'South Asia Context' },
    { id: 'latin-america', name: 'Latin America Context' }
  ];
  
  function selectView(newView) {
    if (view !== newView) {
      view = newView;
      dispatch('viewChange', { view: newView });
    }
  }
</script>

<div class="view-selector">
  <h3>Context View</h3>
  <div class="view-options">
    {#each views as viewOption}
      <button
        class:active={view === viewOption.id}
        on:click={() => selectView(viewOption.id)}
      >
        {viewOption.name}
      </button>
    {/each}
  </div>
</div>

<style>
  .view-selector {
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
  
  .view-options {
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
