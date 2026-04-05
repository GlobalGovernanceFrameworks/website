<script>
  import { marked } from 'marked';
  import katex from 'katex';
  import { onMount } from 'svelte';
  import 'katex/dist/katex.min.css';

  export let rawMarkdown = '';

  let renderedHtml = '';

  // Preprocess markdown: convert \(...\) and \[...\] to KaTeX HTML
  function renderMath(markdown) {
    const inlineRegex = /\\\((.+?)\\\)/gs;
    const displayRegex = /\\\[(.+?)\\\]/gs;
    
    let processed = markdown;
    
    // Display math \[ ... \]
    processed = processed.replace(displayRegex, (match, math) => {
      try {
        return katex.renderToString(math, { displayMode: true, throwOnError: false });
      } catch (e) {
        console.warn('KaTeX display math error:', e.message);
        return `<div class="math-error">${e.message}</div>`;
      }
    });
    
    // Inline math \( ... \)
    processed = processed.replace(inlineRegex, (match, math) => {
      try {
        return katex.renderToString(math, { displayMode: false, throwOnError: false });
      } catch (e) {
        console.warn('KaTeX inline math error:', e.message);
        return `<span class="math-error">${e.message}</span>`;
      }
    });
    
    return processed;
  }

  onMount(async () => {
    const processedMarkdown = renderMath(rawMarkdown);
    renderedHtml = await marked.parse(processedMarkdown);
  });
</script>

<div class="markdown-body">
  {@html renderedHtml}
</div>

<style>
  .markdown-body :global(.math-error) {
    color: #f87171;
    background: #7f1d1d;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
</style>
