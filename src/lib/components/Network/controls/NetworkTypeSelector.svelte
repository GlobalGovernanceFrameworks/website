<!-- src/lib/components/Network/controls/NetworkTypeSelector.svelte -->
<!-- Control component for selecting different network analysis types -->

<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let type = 'formal-informal';
  
  const dispatch = createEventDispatcher();
  
  // Network analysis type options
  const types = [
    { 
      id: 'formal-informal', 
      name: 'Formal-Informal Networks',
      description: 'Connections between official institutions and grassroots initiatives'
    },
    { 
      id: 'resource-flow', 
      name: 'Resource Flow Mapping',
      description: 'How funding and support move through the peacebuilding ecosystem'
    },
    { 
      id: 'influence', 
      name: 'Influence Analysis',
      description: 'Power mapping of key decision-makers and opinion leaders'
    },
    { 
      id: 'trust', 
      name: 'Trust Relationship Matrices',
      description: 'Trust levels between different conflict parties'
    }
  ];
  
  function selectType(newType) {
    if (type !== newType) {
      type = newType;
      dispatch('typeChange', { type: newType });
    }
  }
</script>

<div class="network-type-selector">
  <h3>Network Analysis Type</h3>
  <div class="type-buttons">
    {#each types as typeOption}
      <button
        class:active={type === typeOption.id}
        on:click={() => selectType(typeOption.id)}
      >
        <div class="type-content">
          <span class="type-name">{typeOption.name}</span>
          <span class="type-description">{typeOption.description}</span>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .network-type-selector {
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
  
  .type-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    padding: 0.75rem 1rem;
    text-align: left;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  
  button:hover {
    background-color: #e9ecef;
  }
  
  button.active {
    background-color: #2c3e50;
    border-color: #2c3e50;
    color: white;
  }
  
  .type-content {
    display: flex;
    flex-direction: column;
  }
  
  .type-name {
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
  
  .type-description {
    font-size: 0.8rem;
    opacity: 0.8;
  }
</style>
