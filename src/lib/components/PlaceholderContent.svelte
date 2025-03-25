<!-- src/lib/components/PlaceholderContent.svelte -->
<script>
  export let title = "Content Coming Soon";
  export let path = "";
</script>

<div class="placeholder">
  <h1>{title}</h1>
  <p>This content is currently being developed.</p>
  <p class="technical">Path: {path}</p>
</div>

<style>
  .placeholder {
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border-left: 4px solid #DAA520;
  }
  
  h1 {
    font-size: 1.5rem;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .technical {
    font-family: monospace;
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 2rem;
  }
</style>
