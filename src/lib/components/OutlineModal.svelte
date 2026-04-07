<!-- src/lib/components/OutlineModal.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { getOutline } from '$lib/utils/outlineLoader.js';

  export let slug = '';
  export let title = '';
  export let emoji = '📋';
  export let show = false;
  export let onClose = () => {};
  export let t = null;

  let content = '';
  let renderedHtml = '';
  let modalElement;

  // Simple markdown → HTML converter for outlines
  function renderMarkdown(md) {
    if (!md) return '';
    let html = md
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
      .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
      .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
      .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
      .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
      // Bold & italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Horizontal rules
      .replace(/^---+$/gm, '<hr />')
      // Unordered lists (basic)
      .replace(/^(\s*)[-*]\s+(.+)$/gm, (match, indent, text) => {
        const level = Math.floor(indent.length / 2);
        return `<li class="indent-${level}">${text}</li>`;
      })
      // Paragraphs (blank line separated)
      .replace(/\n\n+/g, '\n</p><p>\n')
      // Line breaks within paragraphs
      .replace(/\n/g, '<br />\n');

    // Wrap in paragraph tags
    html = '<p>' + html + '</p>';

    // Clean up: remove empty paragraphs, fix list wrapping
    html = html
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/<p>\s*<h([1-6])>/g, '<h$1>')
      .replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>')
      .replace(/<p>\s*<hr \/>\s*<\/p>/g, '<hr />')
      .replace(/<p>\s*<li/g, '<ul><li')
      .replace(/<\/li>\s*<\/p>/g, '</li></ul>')
      // Merge adjacent list items into single ul
      .replace(/<\/ul><ul>/g, '');

    return html;
  }

  $: if (show && slug) {
    content = getOutline(slug);
    renderedHtml = renderMarkdown(content);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && show) {
      onClose();
    }
  }

  function handleBackdropClick(e) {
    if (e.target === modalElement) {
      onClose();
    }
  }

  // Lock body scroll when modal is open
  $: if (typeof document !== 'undefined') {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });

  function getTranslation(key, fallback) {
    if (t) {
      const result = t(key);
      if (result && result !== '' && result !== key) return result;
    }
    return fallback;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" bind:this={modalElement} on:click={handleBackdropClick}>
    <div class="modal-container" role="dialog" aria-modal="true" aria-label={title}>
      <div class="modal-header">
        <div class="modal-title-row">
          <span class="modal-emoji">{emoji}</span>
          <h2 class="modal-title">{title}</h2>
        </div>
        <div class="modal-header-actions">
          <span class="outline-badge">
            {getTranslation('framework.outline.badge', 'Outline')}
          </span>
          <button class="close-button" on:click={onClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="modal-body">
        {#if content}
          <div class="outline-content">
            {@html renderedHtml}
          </div>
        {:else}
          <div class="no-outline">
            <p>{getTranslation('framework.outline.notAvailable', 'No outline available for this framework yet.')}</p>
          </div>
        {/if}
      </div>
      <div class="modal-footer">
        <span class="english-only-note">
          {getTranslation('framework.outline.englishOnly', 'Outlines are currently available in English only.')}
        </span>
        <button class="close-button-footer" on:click={onClose}>
          {getTranslation('framework.outline.close', 'Close')}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.15s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-container {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-width: 820px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.2s ease-out;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  .modal-title-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-width: 0;
  }

  .modal-emoji {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .modal-header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .outline-badge {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #ede9fe;
    color: #6d28d9;
    padding: 0.25rem 0.625rem;
    border-radius: 999px;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: #f3f4f6;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.15s ease;
  }

  .close-button:hover {
    background: #e5e7eb;
    color: #1f2937;
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 2rem;
    -webkit-overflow-scrolling: touch;
  }

  .outline-content {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #374151;
  }

  .outline-content :global(h1) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 1.5rem 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
  }

  .outline-content :global(h1:first-child) {
    margin-top: 0;
  }

  .outline-content :global(h2) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 1.25rem 0 0.5rem;
  }

  .outline-content :global(h3) {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin: 1rem 0 0.4rem;
  }

  .outline-content :global(h4),
  .outline-content :global(h5),
  .outline-content :global(h6) {
    font-size: 1rem;
    font-weight: 600;
    color: #4b5563;
    margin: 0.75rem 0 0.3rem;
  }

  .outline-content :global(p) {
    margin: 0.5rem 0;
  }

  .outline-content :global(ul) {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }

  .outline-content :global(li) {
    margin: 0.25rem 0;
    list-style-type: disc;
  }

  .outline-content :global(li.indent-1) {
    margin-left: 1.5rem;
    list-style-type: circle;
  }

  .outline-content :global(li.indent-2) {
    margin-left: 3rem;
    list-style-type: square;
  }

  .outline-content :global(hr) {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 1.5rem 0;
  }

  .outline-content :global(strong) {
    font-weight: 600;
    color: #1f2937;
  }

  .no-outline {
    text-align: center;
    padding: 3rem 1.5rem;
    color: #6b7280;
    font-style: italic;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  .english-only-note {
    font-size: 0.8rem;
    color: #9ca3af;
    font-style: italic;
  }

  .close-button-footer {
    padding: 0.5rem 1.25rem;
    border: 1px solid #d1d5db;
    background: #ffffff;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .close-button-footer:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  @media (max-width: 768px) {
    .modal-backdrop {
      padding: 0.75rem;
    }

    .modal-container {
      max-height: 92vh;
    }

    .modal-header {
      padding: 1rem;
    }

    .modal-title {
      font-size: 1rem;
    }

    .modal-body {
      padding: 1rem 1.25rem;
    }

    .modal-footer {
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
    }

    .english-only-note {
      text-align: center;
    }
  }
</style>
