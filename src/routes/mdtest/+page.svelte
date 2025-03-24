<!-- src/routes/mdtest/+page.svelte -->
<h1>Markdown Test</h1>

<div class="content">
  <Content />
</div>

<script>
  import Content from '$lib/content/test-content.md';
</script>

<style>
  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
</style>
