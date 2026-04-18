<script>
  import { t, locale, isLocaleLoaded } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data;

  $: translationsReady = $isLocaleLoaded;
  $: acp = translationsReady ? ($t('adaptiveCoordinationProtocol') || {}) : {};
  $: currentLocale = $locale;

  let showOnePager = false;
  let onePagerHtml = '';

  onMount(async () => {
    // Optionally fetch the one-pager HTML for display
    // We can load it from the static folder or import as raw
    try {
      const res = await fetch(`${base}/downloads/${currentLocale}/adaptive-coordination-one-pager.html`);
      if (res.ok) {
        onePagerHtml = await res.text();
      } else {
        // Try English fallback
        const fallbackRes = await fetch(`${base}/downloads/en/adaptive-coordination-one-pager.html`);
        if (fallbackRes.ok) {
          onePagerHtml = await fallbackRes.text();
        }
      }
    } catch (e) {
      console.warn('Could not load one-pager HTML:', e);
    }
  });

  async function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function checkFileExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  async function downloadProtocolPDF() {
    const localizedUrl = data.downloadPaths.fullProtocolPdf;
    const fallbackUrl = data.downloadPaths.fallbackPdf;
    const filename = `adaptive-coordination-protocol-${currentLocale}.pdf`;

    if (await checkFileExists(localizedUrl)) {
      downloadFile(localizedUrl, filename);
    } else {
      downloadFile(fallbackUrl, `adaptive-coordination-protocol-en.pdf`);
    }
  }

  async function downloadOnePagerPDF() {
    const localizedUrl = data.downloadPaths.onePagerPdf;
    const fallbackUrl = '/downloads/en/adaptive-coordination-one-pager.en.pdf';
    const filename = `adaptive-coordination-one-pager-${currentLocale}.pdf`;

    if (await checkFileExists(localizedUrl)) {
      downloadFile(localizedUrl, filename);
    } else {
      downloadFile(fallbackUrl, `adaptive-coordination-one-pager-en.pdf`);
    }
  }

  function openOnePager() {
    const url = `${base}/downloads/${currentLocale}/adaptive-coordination-one-pager.html`;
    window.open(url, '_blank');
  }
</script>

<svelte:head>
  <title>{acp.meta?.title || 'Adaptive Coordination Protocol – Global Governance Framework'}</title>
  <meta name="description" content="{acp.meta?.description || 'A voluntary, multi-level coordination mechanism for aligning national sovereignty with global systemic needs during cross-border crises.'}" />
</svelte:head>

<div class="breadcrumb-nav">
  <a href="/resources" class="breadcrumb-link">
    <span class="breadcrumb-icon">←</span>
    <span class="breadcrumb-text">{acp.navigation?.backToResources || 'Back to Resources'}</span>
  </a>
</div>

<div class="documentation-container">
  <div class="content">
    <!-- Language fallback notice -->
    {#if data.usedFallback && translationsReady}
      <div class="language-fallback-notice">
        <div class="notice-icon">🌐</div>
        <div class="notice-content">
          <strong>{acp.languageFallback?.title || 'Content in your language coming soon'}</strong>
          <p>{acp.languageFallback?.description || 'This protocol is currently displayed in English until translation is complete.'}</p>
        </div>
      </div>
    {/if}

    <!-- Download buttons bar -->
    <div class="download-bar">
      <button class="download-btn primary" on:click={downloadProtocolPDF}>
        <span class="download-icon">📄</span>
        <span>{acp.navigation?.downloadFullProtocol || 'Download Full Protocol (PDF)'}</span>
      </button>
      <button class="download-btn secondary" on:click={downloadOnePagerPDF}>
        <span class="download-icon">📋</span>
        <span>{acp.navigation?.downloadOnePager || 'Download One-Pager Brief (PDF)'}</span>
      </button>
      <button class="toggle-btn" on:click={() => showOnePager = !showOnePager}>
        <span>{showOnePager ? 'Hide' : 'View'} One-Pager Summary</span>
      </button>
    </div>

    <!-- One-pager embedded view -->
    {#if showOnePager}
      <div class="one-pager-preview">
        <div class="preview-header">
          <h3>{acp.onePager?.title || 'ACP One-Pager Summary'}</h3>
          <button class="close-preview" on:click={() => showOnePager = false}>×</button>
        </div>
        {#if browser && window.location.hostname !== 'localhost'}
          <!-- Production: use iframe -->
          <iframe 
            title="ACP One-Pager" 
            src="{base}/downloads/{currentLocale}/adaptive-coordination-one-pager.${currentLocale}.html"
            class="preview-iframe"
          />
        {:else}
          <!-- Development: show placeholder with open button -->
          <div class="preview-placeholder">
            <p>👆 <button class="preview-open-btn" on:click={openOnePager}>Open in New Tab</button> to view the one‑pager.</p>
            <p class="preview-note">(Iframe blocked on localhost for security. Deployed site will embed.)</p>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Main protocol content -->
    <div class="protocol-content">
      <svelte:component this={data.content} t={$t} />
    </div>
  </div>
</div>

<style>
  .preview-iframe {
    width: 100%;
    height: 600px;
    border: none;
    background: white;
  }

  .preview-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .preview-open-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #8b5cf6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .preview-open-btn:hover {
    background: #7c3aed;
  }

  .preview-placeholder {
    padding: 2rem;
    text-align: center;
    background: #faf9fe;
    border: 1px dashed #d8b4fe;
    border-radius: 0.5rem;
    color: #4a4a6a;
  }

  .preview-note {
    font-size: 0.8rem;
    color: #8888aa;
    margin-top: 0.5rem;
  }

  .breadcrumb-nav {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem 1rem 0 1rem;
  }

  .breadcrumb-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #d97706;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    padding: 0.5rem 0;
  }

  .breadcrumb-link:hover {
    color: #8b5cf6;
    transform: translateX(-2px);
  }

  .documentation-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
  }

  .content {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(217, 119, 6, 0.1);
    border: 1px solid rgba(217, 119, 6, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .download-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .download-btn, .toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    font-size: 0.95rem;
  }

  .download-btn.primary {
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    color: white;
  }

  .download-btn.primary:hover {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
  }

  .download-btn.secondary {
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .download-btn.secondary:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  .toggle-btn {
    background: white;
    color: #6b7280;
    border: 1px solid #e5e7eb;
    margin-left: auto;
  }

  .toggle-btn:hover {
    background: #f3f4f6;
  }

  .one-pager-preview {
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #faf9fe;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: #ede9fe;
    border-bottom: 1px solid #d8b4fe;
  }

  .preview-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #6b21a8;
  }

  .close-preview {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    line-height: 1;
  }

  .close-preview:hover {
    color: #111827;
  }

  .preview-content {
    padding: 1.5rem;
    max-height: 500px;
    overflow-y: auto;
    background: white;
  }

  .protocol-content {
    line-height: 1.7;
  }

  /* Basic styling for markdown content */
  .protocol-content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #1e1b4b;
    border-bottom: 2px solid #8b5cf6;
    padding-bottom: 0.5rem;
  }

  .protocol-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #d97706;
  }

  .protocol-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #10b981;
  }

  .protocol-content :global(p) {
    margin-bottom: 1rem;
    color: #374151;
  }

  .protocol-content :global(ul), .protocol-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .protocol-content :global(li) {
    margin-bottom: 0.5rem;
  }

  .protocol-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .protocol-content :global(th) {
    background: linear-gradient(135deg, #8b5cf6, #d97706);
    color: white;
    padding: 0.5rem;
    text-align: left;
  }

  .protocol-content :global(td) {
    padding: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .protocol-content :global(blockquote) {
    border-left: 4px solid #8b5cf6;
    background: #faf9fe;
    margin: 1rem 0;
    padding: 0.75rem 1.25rem;
    font-style: italic;
  }

  @media (max-width: 640px) {
    .content {
      padding: 1.5rem;
    }
    
    .download-bar {
      flex-direction: column;
    }
    
    .toggle-btn {
      margin-left: 0;
    }
  }
</style>
