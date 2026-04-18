<!-- src/routes/resources/meeting-protocol/+page.svelte -->
<script>
  import { t, locale, isLocaleLoaded } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, tick } from 'svelte';

  export let data;

  // Translation state
  $: translationsReady = $isLocaleLoaded;
  $: mp = translationsReady ? ($t('meetingProtocol') || {}) : {};
  $: currentLocale = $locale;

  // Component state
  let activeTab = 'meeting-protocol';
  let mounted = false;

  const tabs = [
    { id: 'meeting-protocol', icon: '🔄', fallbackTitle: 'Protocol' },
    { id: 'meeting-appendix-questions', icon: '❓', fallbackTitle: 'Appendix: Difficult Questions' }
  ];

  onMount(async () => {
    await tick();
    mounted = true;

    if (browser) {
      const hash = window.location.hash.substring(1);
      if (hash && tabs.some(tab => tab.id === hash)) {
        activeTab = hash;
      }

      const handleHashChange = () => {
        const h = window.location.hash.substring(1);
        if (h && tabs.some(tab => tab.id === h) && activeTab !== h) {
          activeTab = h;
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  });

  function setActiveTab(tabId) {
    activeTab = tabId;
    if (browser) {
      history.replaceState(null, '', `/resources/meeting-protocol#${tabId}`);
      const contentEl = document.querySelector('.content');
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function getTabTitle(tab) {
    return mp.tabs?.[tab.id] || tab.fallbackTitle;
  }

  function downloadPdf(docId) {
    const currentLoc = $locale || 'en';
    const filename = `${docId}.${currentLoc}.pdf`;
    const url = `${base}/downloads/${currentLoc}/${filename}`;

    checkFileExists(url)
      .then(exists => {
        const finalUrl = exists ? url : `${base}/downloads/en/${docId}.en.pdf`;
        const link = document.createElement('a');
        link.href = finalUrl;
        link.download = finalUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        const fallback = `${base}/downloads/en/${docId}.en.pdf`;
        const link = document.createElement('a');
        link.href = fallback;
        link.download = `${docId}.en.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  async function checkFileExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch { return false; }
  }

  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{mp.meta?.title || 'Meeting Protocol - Global Governance Frameworks'}</title>
  <meta name="description" content={mp.meta?.description || 'A practical protocol for integrative decision-making across competing values, worldviews, and institutional logics.'} />
</svelte:head>

{#if mounted}
  <div class="breadcrumb-nav">
    <a href="/resources" class="breadcrumb-link">
      <span class="breadcrumb-icon">←</span>
      <span class="breadcrumb-text">{mp.navigation?.backToResources || 'Back to Resources'}</span>
    </a>
  </div>

  <div class="documentation-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="section-nav">
        <!-- Tab navigation -->
        <div class="nav-section">
          {#each tabs as tab}
            <button
              class="nav-item"
              class:active={activeTab === tab.id}
              on:click={() => setActiveTab(tab.id)}
            >
              <span class="nav-icon">{tab.icon}</span>
              <span class="nav-title">{getTabTitle(tab)}</span>
            </button>
          {/each}
        </div>

        <!-- PDF Downloads -->
        <div class="download-section">
          <button class="download-btn" on:click={() => downloadPdf('meeting-protocol')}>
            <span class="download-icon">📥</span>
            <span class="download-text">{mp.navigation?.downloadProtocol || 'Download Protocol (PDF)'}</span>
          </button>
          <button class="download-btn secondary" on:click={() => downloadPdf('meeting-appendix-questions')}>
            <span class="download-icon">📥</span>
            <span class="download-text">{mp.navigation?.downloadAppendix || 'Download Appendix (PDF)'}</span>
          </button>
        </div>

        <!-- Cross-reference to Spiralize -->
        <div class="cross-ref">
          <p class="cross-ref-text">
            {mp.navigation?.spiralizeNote || 'A version using Spiral Dynamics developmental stage terminology is available on'}
            <a href="https://spiralize.org/guides/meeting" class="cross-ref-link">Spiralize.org</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="content">
      {#if data?.sectionsUsingEnglishFallback?.includes(activeTab)}
        <div class="language-fallback-notice">
          <div class="notice-icon">🌐</div>
          <div class="notice-content">
            <strong>{mp.languageFallback?.title || 'Translation coming soon'}</strong>
            <p>{mp.languageFallback?.description || 'This content is currently displayed in English until translation is complete.'}</p>
          </div>
        </div>
      {/if}

      {#if data?.content?.[activeTab]}
        <div class="section-content">
          <svelte:component this={data.content[activeTab].default} />
        </div>
      {:else}
        <div class="missing-section">
          <h2>{mp.errors?.notFound || 'Content not found'}</h2>
          <p>{mp.errors?.notFoundDescription || 'This content is still being developed.'}</p>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{mp.loading?.text || 'Loading protocol content...'}</p>
  </div>
{/if}

<style>
  /* Adaptive coordination color scheme — systemic/integrative theme */
  :root {
    --protocol-primary: #4f46e5;
    --protocol-secondary: #0891b2;
    --protocol-accent: #059669;
    --protocol-light: #f8fafc;
    --protocol-dark: #1e293b;
    --protocol-muted: #64748b;
  }

  /* Loading */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid var(--protocol-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Breadcrumb */
  .breadcrumb-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 0 1rem;
  }

  .breadcrumb-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--protocol-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    padding: 0.5rem 0;
  }

  .breadcrumb-link:hover {
    color: var(--protocol-primary);
    transform: translateX(-2px);
  }

  /* Layout */
  .documentation-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    min-height: calc(100vh - 200px);
  }

  /* Sidebar */
  .sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }

  .section-nav {
    background: linear-gradient(to bottom, var(--protocol-light), #f1f5f9);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(79, 70, 229, 0.12);
    box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);
  }

  .nav-section {
    margin-bottom: 1.25rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    font-size: 0.9rem;
    color: var(--protocol-muted);
  }

  .nav-item:hover {
    background: rgba(79, 70, 229, 0.08);
    color: var(--protocol-primary);
  }

  .nav-item.active {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(8, 145, 178, 0.08));
    color: var(--protocol-primary);
    font-weight: 600;
    border-left: 3px solid var(--protocol-primary);
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-title {
    line-height: 1.3;
  }

  /* Download section */
  .download-section {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .download-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    background: linear-gradient(135deg, var(--protocol-primary), var(--protocol-secondary));
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .download-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  .download-btn.secondary {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(8, 145, 178, 0.1));
    color: var(--protocol-primary);
    border: 1px solid rgba(79, 70, 229, 0.2);
  }

  .download-btn.secondary:hover {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(8, 145, 178, 0.15));
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  }

  .download-icon {
    font-size: 1rem;
    flex-shrink: 0;
  }

  .download-text {
    line-height: 1.3;
  }

  /* Cross-reference */
  .cross-ref {
    padding: 0.75rem 1rem;
    background: rgba(5, 150, 105, 0.06);
    border-radius: 0.5rem;
    border: 1px solid rgba(5, 150, 105, 0.15);
  }

  .cross-ref-text {
    font-size: 0.8rem;
    color: var(--protocol-muted);
    line-height: 1.5;
    margin: 0;
  }

  .cross-ref-link {
    color: var(--protocol-accent);
    text-decoration: none;
    font-weight: 600;
  }

  .cross-ref-link:hover {
    text-decoration: underline;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: rgba(79, 70, 229, 0.06);
    border: 1px solid rgba(79, 70, 229, 0.15);
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .notice-content {
    font-size: 0.85rem;
    color: var(--protocol-muted);
    line-height: 1.5;
  }

  .notice-content strong {
    color: var(--protocol-primary);
    display: block;
    margin-bottom: 0.25rem;
  }

  .notice-content p {
    margin: 0;
  }

  /* Missing section */
  .missing-section {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--protocol-muted);
  }

  .missing-section h2 {
    color: var(--protocol-dark);
    margin-bottom: 0.5rem;
  }

  /* Main content area */
  .content {
    min-width: 0;
    padding: 0;
  }

  .section-content {
    padding-top: 0.5rem;
  }

  /* ─── Markdown content styling ─── */

  .content :global(h1) {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--protocol-dark);
    margin-top: 0;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  .content :global(h2) {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
    color: var(--protocol-primary);
    padding-bottom: 0.4rem;
    border-bottom: 2px solid rgba(79, 70, 229, 0.15);
    line-height: 1.3;
  }

  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
    color: var(--protocol-secondary);
    line-height: 1.4;
  }

  .content :global(h4) {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--protocol-dark);
    line-height: 1.4;
  }

  .content :global(p) {
    margin-bottom: 1.25rem;
    line-height: 1.7;
    color: #4b5563;
  }

  .content :global(p:first-of-type) {
    font-size: 1.05rem;
    color: #374151;
  }

  /* Lists */
  .content :global(ul),
  .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .content :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #4b5563;
  }

  .content :global(ul li) {
    list-style: none;
    padding-left: 1.25rem;
    position: relative;
  }

  .content :global(ul li::before) {
    content: "◆";
    position: absolute;
    left: 0;
    color: var(--protocol-secondary);
    font-size: 0.6em;
    top: 0.45em;
  }

  .content :global(ul ul li::before) {
    content: "▸";
    color: var(--protocol-muted);
    font-size: 0.85em;
    top: 0.1em;
  }

  /* Blockquotes */
  .content :global(blockquote) {
    border-left: 4px solid var(--protocol-primary);
    background: linear-gradient(90deg,
      rgba(79, 70, 229, 0.06),
      rgba(79, 70, 229, 0.02));
    padding: 1.25rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    color: #374151;
  }

  .content :global(blockquote p) {
    margin-bottom: 0.5rem;
  }

  .content :global(blockquote p:last-child) {
    margin-bottom: 0;
  }

  /* Tables */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .content :global(th) {
    background: linear-gradient(135deg, var(--protocol-primary), var(--protocol-secondary));
    color: white;
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .content :global(td) {
    padding: 0.65rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    color: #374151;
    font-size: 0.9rem;
    vertical-align: top;
  }

  .content :global(tr:nth-child(even) td) {
    background: #f8fafc;
  }

  .content :global(tr:hover td) {
    background: rgba(79, 70, 229, 0.04);
  }

  /* Links */
  .content :global(a) {
    color: var(--protocol-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
    font-weight: 500;
  }

  .content :global(a:hover) {
    color: var(--protocol-secondary);
    border-bottom-color: var(--protocol-secondary);
  }

  /* Emphasis */
  .content :global(strong) {
    color: #1e293b;
    font-weight: 700;
  }

  .content :global(em) {
    color: #64748b;
  }

  /* Code */
  .content :global(code) {
    background: #f1f5f9;
    color: #e11d48;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.88em;
    border: 1px solid #e2e8f0;
  }

  /* Horizontal rules */
  .content :global(hr) {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2.5rem 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: static;
    }

    .section-nav {
      margin-bottom: 1rem;
    }

    .content :global(h1) {
      font-size: 1.75rem;
    }

    .content :global(h2) {
      font-size: 1.35rem;
    }

    .content :global(table) {
      font-size: 0.85rem;
    }

    .content :global(th),
    .content :global(td) {
      padding: 0.5rem 0.65rem;
    }
  }

  /* Print */
  @media print {
    .sidebar { display: none; }
    .breadcrumb-nav { display: none; }
    .documentation-container { grid-template-columns: 1fr; }

    .content :global(*) {
      color: #000 !important;
      background: #fff !important;
    }

    .content :global(h1),
    .content :global(h2),
    .content :global(h3) {
      page-break-after: avoid;
    }

    .content :global(blockquote),
    .content :global(table) {
      page-break-inside: avoid;
    }
  }
</style>
