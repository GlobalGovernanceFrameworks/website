<!-- src/routes/simple-test/+page.svelte -->
<script>
  export let data;
</script>

<div>
  {@html marked(data.content)}
</div>

<script context="module">
  import marked from 'marked';
</script>
