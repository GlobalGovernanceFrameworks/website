<!-- src/routes/resources/books/the-protocol/+page.svelte -->
<script>
  import { t, locale, isLocaleLoaded, loadTranslations } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Translation state
  $: translationsReady = $isLocaleLoaded;
  $: bf = translationsReady ? ($t('booksTheProtocol') || {}) : {};
  $: currentLocale = $locale;

  // Component state
  let activeSection = 'book-cover';
  let mounted = false;
  let isPrintMode = false;
  let frontMatterOpen = true;
  let part1Open = false;
  let part2Open = false;
  let part3Open = false;
  let part4Open = false;
  let backMatterOpen = false;

  // Book structure
  $: bookParts = data?.parts || {};
  $: frontMatterSections = ['book-cover', 'table-of-contents', 'introduction'];
  $: backMatterSections = ['appendix-a', 'appendix-b', 'appendix-c', 'appendix-d', 'conclusion', 'about'];
  $: chapterSections = Object.keys(data?.sections || {}).filter(section => section.startsWith('chapter-'));

  // Computed values
  $: sectionsToShow = (mounted && isPrintMode) ? Object.keys(data?.sections || {}) : [activeSection];
  $: isChapter = activeSection.startsWith('chapter-');
  $: isFrontMatter = frontMatterSections.includes(activeSection);
  $: isBackMatter = backMatterSections.includes(activeSection);

  // Language availability
  $: hasFullTranslation = currentLocale === 'en';
  $: hasPdfTranslation = currentLocale === 'en';

  function initializeAccordionStates() {
    frontMatterOpen = frontMatterSections.includes(activeSection);
    backMatterOpen = backMatterSections.includes(activeSection);
    
    Object.entries(bookParts).forEach(([partName, chapters]) => {
      if (chapters.includes(activeSection)) {
        if (partName.includes('Part I')) part1Open = true;
        else if (partName.includes('Part II')) part2Open = true;
        else if (partName.includes('Part III')) part3Open = true;
        else if (partName.includes('Part IV')) part4Open = true;
      }
    });
  }

  function getSectionIcon(section) {
    const icons = {
      'book-cover': '📘',
      'table-of-contents': '📋',
      'introduction': '🎯',
      'chapter-01': '🔄',
      'chapter-02': '🕸️',
      'chapter-03': '💓',
      'chapter-04': '📊',
      'chapter-05': '💰',
      'chapter-06': '⚖️',
      'chapter-07': '🌳',
      'chapter-08': '🛡️',
      'chapter-09': '🌉',
      'appendix-a': '🛠️',
      'appendix-b': '🔧',
      'appendix-c': '📝',
      'appendix-d': '📚',
      'conclusion': '✨',
      'about': '👤'
    };
    
    return icons[section] || '📖';
  }

  onMount(async () => {
    await tick();
    mounted = true;
    
    if (browser) {
      let extractedHash = window.location.hash;
      
      if (window.location.pathname !== '/resources/books/the-protocol') {
        const pathname = window.location.pathname;
        const lastPart = pathname.split('/').pop();
        
        if (data?.sections?.[lastPart] && !extractedHash) {
          extractedHash = `#${lastPart}`;
        }
        
        const correctUrl = `/resources/books/the-protocol${window.location.search}${extractedHash}`;
        window.history.replaceState(null, '', correctUrl);
      }
      
      if (!translationsReady) {
        try {
          await loadTranslations($locale, '/resources/books/the-protocol');
        } catch (e) {
          console.error('Failed to reload translations:', e);
        }
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      isPrintMode = urlParams.get('print') === 'true';
      
      const sectionParam = urlParams.get('section');
      const hashSection = (extractedHash || window.location.hash).substring(1);
      
      if (sectionParam && data?.sections?.[sectionParam]) {
        activeSection = sectionParam;
      } else if (hashSection && data?.sections?.[hashSection]) {
        activeSection = hashSection;
      }
      
      initializeAccordionStates();
      
      window.showAllSectionsForPrint = () => { isPrintMode = true; };
      
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash && data?.sections?.[hash] && activeSection !== hash) {
          activeSection = hash;
          initializeAccordionStates();
          
          setTimeout(() => {
            const contentElement = document.querySelector('.section-content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 100);
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        if (window.showAllSectionsForPrint) {
          delete window.showAllSectionsForPrint;
        }
      };
    }
  });

  function setActiveSection(section) {
    if (!data?.sections?.[section]) return;
    
    activeSection = section;
    initializeAccordionStates();
    
    if (browser) {
      const newUrl = `/resources/books/the-protocol${window.location.search}#${section}`;
      history.replaceState(null, '', newUrl);

      setTimeout(() => {
        const contentElement = document.querySelector('.section-content');
        if (contentElement) {
          contentElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }

  function getSectionTitle(section) {
    // Use chapterTitles from data for chapters
    if (section.startsWith('chapter-') && data?.chapterTitles?.[section]) {
      return data.chapterTitles[section];
    }
    // Use appendixTitles from data for appendices
    if (section.startsWith('appendix-') && data?.appendixTitles?.[section]) {
      return data.appendixTitles[section];
    }
    // Fallback to translation or formatted name
    return translationsReady ? (bf.sections?.[section] || section.replace(/[-_]/g, ' ')) 
                             : section.replace(/[-_]/g, ' ');
  }

  function getPartTitle(partKey) {
    return translationsReady ? (bf.parts?.[partKey] || partKey) : partKey;
  }

  function getShortSectionTitle(section) {
    return translationsReady ? (bf.sectionsShort?.[section] || getSectionTitle(section)) : getSectionTitle(section);
  }

  function getTextWithFallback(key, fallback) {
    return translationsReady ? ($t(key) || fallback) : fallback;
  }

  function downloadBook() {
    const pdfUrl = `/static/resources/The_Protocol_-_A_Pocket_Guide_to_Planetary_Governance.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `The_Protocol.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Accordion toggle functions
  function toggleFrontMatter() { frontMatterOpen = !frontMatterOpen; }
  function togglePart1() { part1Open = !part1Open; }
  function togglePart2() { part2Open = !part2Open; }
  function togglePart3() { part3Open = !part3Open; }
  function togglePart4() { part4Open = !part4Open; }
  function toggleBackMatter() { backMatterOpen = !backMatterOpen; }

  function getCurrentChapter() {
    if (!isChapter) return null;
    return parseInt(activeSection.replace('chapter-', ''));
  }

  function getNextSection() {
    const allSections = Object.keys(data?.sections || {});
    const currentIndex = allSections.indexOf(activeSection);
    return currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;
  }

  function getPreviousSection() {
    const allSections = Object.keys(data?.sections || {});
    const currentIndex = allSections.indexOf(activeSection);
    return currentIndex > 0 ? allSections[currentIndex - 1] : null;
  }

  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{getTextWithFallback('booksTheProtocol.meta.title', 'The Protocol - A Pocket Guide to Planetary Governance')}</title>
  <meta name="description" content="{getTextWithFallback('booksTheProtocol.meta.description', 'A comprehensive technical manual for the Global Governance Frameworks - 50+ interconnected protocols for regenerative planetary governance.')}" />
  <meta name="keywords" content="planetary governance, bioregional autonomy, regenerative economics, rights of nature, polycentric governance" />
</svelte:head>

{#if mounted}
  <!-- Breadcrumb Navigation -->
  {#if !isPrintMode}
    <div class="breadcrumb-wrapper">
      <div class="container">
        <div class="breadcrumb-nav">
          <a href="/resources" class="breadcrumb-link">
            <span class="breadcrumb-icon">📚</span>
            {bf.breadcrumb?.resources || 'Resources'}
          </a>
          <span class="breadcrumb-separator">›</span>
          <a href="/resources/books" class="breadcrumb-link">
            {bf.breadcrumb?.books || 'Books'}
          </a>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">
            {bf.breadcrumb?.currentBook || 'The Protocol'}
          </span>
        </div>
      </div>
    </div>
  {/if}

  <div class="book-container">
    <!-- Book Navigation Sidebar -->
    {#if !isPrintMode}
      <div class="book-nav">
        <div class="book-header">
          <div class="book-icon">🌍</div>
          <div class="book-info">
            <h2 class="book-title">{bf.bookTitle || 'The Protocol'}</h2>
            <p class="book-subtitle">{bf.bookSubtitle || 'A Pocket Guide to Planetary Governance'}</p>
          </div>
        </div>

        <div class="nav-sections">
          <!-- PDF Download Button -->
          <div class="pdf-download-section">
            <button class="pdf-download-btn" on:click={() => downloadBook()}>
              <span class="pdf-icon">📄</span>
              <div class="pdf-text">
                <span class="pdf-title">{bf.pdfDownload?.title || 'Download Complete Book'}</span>
                <span class="pdf-subtitle">{bf.pdfDownload?.subtitle || 'PDF Format'}</span>
              </div>
              <span class="download-arrow">↓</span>
            </button>
            
            {#if !hasPdfTranslation && translationsReady}
              <div class="pdf-language-notice">
                <span class="notice-icon">🌐</span>
                <span class="notice-text">{bf.pdfDownload?.englishOnly || 'PDF available in English only'}</span>
              </div>
            {/if}
          </div>

          <!-- Front Matter -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={frontMatterOpen}
              class:has-active={isFrontMatter}
              on:click={toggleFrontMatter}
            >
              <span class="accordion-icon">{frontMatterOpen ? '▼' : '▶'}</span>
              <span class="accordion-title">{bf.navigation?.frontMatter || 'Front Matter'}</span>
            </button>
            
            {#if frontMatterOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each frontMatterSections as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part I: Architecture -->
          <div class="nav-accordion">
            <button 
              class="accordion-header"
              class:open={part1Open}
              class:has-active={bookParts['Part I: Architecture']?.includes(activeSection)}
              on:click={togglePart1}
            >
              <span class="accordion-icon">{part1Open ? '▼' : '▶'}</span>
              <span class="accordion-title">{getPartTitle('Part I: Architecture')}</span>
            </button>
            
            {#if part1Open && bookParts['Part I: Architecture']}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each bookParts['Part I: Architecture'] as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part II: Metabolism -->
          <div class="nav-accordion">
            <button 
              class="accordion-header"
              class:open={part2Open}
              class:has-active={bookParts['Part II: Metabolism']?.includes(activeSection)}
              on:click={togglePart2}
            >
              <span class="accordion-icon">{part2Open ? '▼' : '▶'}</span>
              <span class="accordion-title">{getPartTitle('Part II: Metabolism')}</span>
            </button>
            
            {#if part2Open && bookParts['Part II: Metabolism']}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each bookParts['Part II: Metabolism'] as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part III: Authority -->
          <div class="nav-accordion">
            <button 
              class="accordion-header"
              class:open={part3Open}
              class:has-active={bookParts['Part III: Authority']?.includes(activeSection)}
              on:click={togglePart3}
            >
              <span class="accordion-icon">{part3Open ? '▼' : '▶'}</span>
              <span class="accordion-title">{getPartTitle('Part III: Authority')}</span>
            </button>
            
            {#if part3Open && bookParts['Part III: Authority']}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each bookParts['Part III: Authority'] as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part IV: Evolution -->
          <div class="nav-accordion">
            <button 
              class="accordion-header"
              class:open={part4Open}
              class:has-active={bookParts['Part IV: Evolution']?.includes(activeSection)}
              on:click={togglePart4}
            >
              <span class="accordion-icon">{part4Open ? '▼' : '▶'}</span>
              <span class="accordion-title">{getPartTitle('Part IV: Evolution')}</span>
            </button>
            
            {#if part4Open && bookParts['Part IV: Evolution']}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each bookParts['Part IV: Evolution'] as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Back Matter -->
          <div class="nav-accordion">
            <button 
              class="accordion-header"
              class:open={backMatterOpen}
              class:has-active={isBackMatter}
              on:click={toggleBackMatter}
            >
              <span class="accordion-icon">{backMatterOpen ? '▼' : '▶'}</span>
              <span class="accordion-title">{bf.navigation?.backMatter || 'Back Matter'}</span>
            </button>
            
            {#if backMatterOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each backMatterSections as section}
                  <button
                    class="nav-item"
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionIcon(section)}</span>
                    <span class="nav-text">{getSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!-- Main Content Area -->
    <div class="main-content">
      {#if !hasFullTranslation && translationsReady}
        <div class="content-language-notice">
          <div class="notice-header">
            <span class="notice-icon-large">🌐</span>
            <div>
              <h3 class="notice-title">{bf.languageNotice?.title || 'Translation in Progress'}</h3>
              <p class="notice-description">{bf.languageNotice?.description || 'This book is being translated. Some sections may appear in English.'}</p>
            </div>
          </div>
          
          <div class="notice-stats">
            <div class="stat-item">
              <span class="stat-label">{bf.languageNotice?.sectionsAvailable || 'Sections available'}:</span>
              <span class="stat-value">{data.loadedSectionsCount - data.sectionsUsingEnglishFallback.length} / {data.totalSectionsCount}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">{bf.languageNotice?.progress || 'Translation progress'}:</span>
              <span class="stat-value">
                {Math.round(((data.loadedSectionsCount - data.sectionsUsingEnglishFallback.length) / data.totalSectionsCount) * 100)}%
              </span>
            </div>
          </div>
        </div>
      {/if}

      <!-- Progress Indicator -->
      {#if isChapter && !isPrintMode}
        <div class="progress-indicator">
          <div class="progress-text">
            {bf.progress?.chapter || 'Chapter'} {getCurrentChapter()} {bf.progress?.of || 'of'} {data.totalChapters}
          </div>
          <div class="progress-bar-container">
            <div 
              class="progress-bar-fill" 
              style="width: {(getCurrentChapter() / data.totalChapters) * 100}%"
            ></div>
          </div>
        </div>
      {/if}

      <!-- Section Content -->
      {#each sectionsToShow as section (section)}
        {#if data?.sections?.[section]}
          <div class="section-content">
            {#if data.sectionsUsingEnglishFallback.includes(section) && currentLocale !== 'en'}
              <div class="language-fallback-notice">
                <span class="notice-icon">🌐</span>
                <span>{bf.languageNotice?.fallbackNotice || 'This section is shown in English'}</span>
              </div>
            {/if}
            
            <div class="content">
              <svelte:component this={data.sections[section].default} />
            </div>
          </div>
        {/if}
      {/each}

      <!-- Section Navigation -->
      {#if !isPrintMode}
        <div class="section-navigation">
          {#if getPreviousSection()}
            <button 
              class="nav-button prev-btn" 
              on:click={() => setActiveSection(getPreviousSection())}
            >
              <span class="nav-arrow">←</span>
              <div class="nav-button-text">
                <span class="nav-button-label">{bf.navigation?.previous || 'Previous'}</span>
                <span class="nav-button-title">{getShortSectionTitle(getPreviousSection())}</span>
              </div>
            </button>
          {:else}
            <div></div>
          {/if}

          <div class="nav-center">
            <a href="#book-cover" class="back-to-top">
              {bf.navigation?.backToTop || 'Back to Top'} ↑
            </a>
          </div>

          {#if getNextSection()}
            <button 
              class="nav-button next-btn" 
              on:click={() => setActiveSection(getNextSection())}
            >
              <div class="nav-button-text">
                <span class="nav-button-label">{bf.navigation?.next || 'Next'}</span>
                <span class="nav-button-title">{getShortSectionTitle(getNextSection())}</span>
              </div>
              <span class="nav-arrow">→</span>
            </button>
          {:else}
            <div></div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Color scheme for The Protocol */
  :global(:root) {
    --book-primary: #1e40af; /* Deep blue for governance/systems */
    --book-secondary: #0ea5e9; /* Sky blue for planetary/global */
    --book-accent: #10b981; /* Green for regeneration */
    --book-text: #1e293b;
    --book-bg: #f8fafc;
  }

  .breadcrumb-wrapper {
    background: var(--book-bg);
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 0;
    margin-bottom: 2rem;
  }

  .breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
  }

  .breadcrumb-link {
    color: var(--book-primary);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    transition: color 0.2s ease;
  }

  .breadcrumb-link:hover {
    color: var(--book-secondary);
    text-decoration: underline;
  }

  .breadcrumb-separator {
    color: #94a3b8;
  }

  .breadcrumb-current {
    color: var(--book-text);
    font-weight: 500;
  }

  .book-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .book-nav {
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .book-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .book-icon {
    font-size: 2rem;
  }

  .book-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--book-primary);
    margin: 0;
  }

  .book-subtitle {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0.25rem 0 0 0;
  }

  .nav-sections {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pdf-download-section {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .pdf-download-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, var(--book-primary), var(--book-secondary));
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pdf-download-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(30, 64, 175, 0.2);
  }

  .pdf-icon {
    font-size: 1.5rem;
  }

  .pdf-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.125rem;
  }

  .pdf-title {
    font-size: 0.875rem;
  }

  .pdf-subtitle {
    font-size: 0.75rem;
    opacity: 0.9;
  }

  .download-arrow {
    font-size: 1.25rem;
  }

  .pdf-language-notice {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fef3c7;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    color: #92400e;
  }

  .nav-accordion {
    margin-bottom: 0.5rem;
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    color: var(--book-text);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .accordion-header:hover {
    background: #f1f5f9;
  }

  .accordion-header.has-active {
    background: #e0f2fe;
    color: var(--book-primary);
  }

  .accordion-icon {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
  }

  .accordion-title {
    flex: 1;
    text-align: left;
    font-size: 0.875rem;
  }

  .accordion-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-left: 1.5rem;
    margin-top: 0.25rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.625rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    color: #475569;
  }

  .nav-item:hover {
    background: #f1f5f9;
    color: var(--book-primary);
  }

  .nav-item.active {
    background: linear-gradient(135deg, var(--book-primary), var(--book-secondary));
    color: white;
    font-weight: 600;
  }

  .nav-icon {
    font-size: 1rem;
  }

  .nav-text {
    flex: 1;
  }

  .main-content {
    min-width: 0;
  }

  .content-language-notice {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 2px solid #f59e0b;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .notice-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .notice-icon-large {
    font-size: 2rem;
  }

  .notice-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #92400e;
    margin: 0 0 0.5rem 0;
  }

  .notice-description {
    font-size: 0.875rem;
    color: #78350f;
    margin: 0;
  }

  .notice-stats {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .stat-label {
    color: #78350f;
    font-weight: 500;
  }

  .stat-value {
    color: #92400e;
    font-weight: 700;
  }

  .progress-indicator {
    background: white;
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .progress-text {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .progress-bar-container {
    height: 0.5rem;
    background: #e2e8f0;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--book-primary), var(--book-secondary));
    transition: width 0.3s ease;
  }

  .section-content {
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .language-fallback-notice {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    color: #92400e;
  }

  .notice-icon {
    font-size: 1.125rem;
  }

  .content {
    font-size: 1.0625rem;
    line-height: 1.75;
    color: var(--book-text);
  }

  /* Content styling */
  .content :global(h1) {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--book-primary);
    margin: 0 0 1.5rem 0;
    line-height: 1.2;
  }

  .content :global(h2) {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--book-primary);
    margin: 2.5rem 0 1.25rem 0;
    line-height: 1.3;
  }

  .content :global(h3) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--book-text);
    margin: 2rem 0 1rem 0;
    line-height: 1.4;
  }

  .content :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--book-text);
    margin: 1.5rem 0 0.875rem 0;
  }

  .content :global(p) {
    margin: 0 0 1.25rem 0;
  }

  .content :global(strong) {
    font-weight: 700;
    color: var(--book-primary);
  }

  .content :global(em) {
    font-style: italic;
    color: #475569;
  }

  .content :global(ul), 
  .content :global(ol) {
    margin: 0 0 1.25rem 0;
    padding-left: 1.75rem;
  }

  .content :global(li) {
    margin-bottom: 0.625rem;
    line-height: 1.75;
  }

  .content :global(code) {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9375rem;
    color: var(--book-primary);
  }

  .content :global(pre) {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.25rem 0;
  }

  .content :global(pre code) {
    background: transparent;
    color: inherit;
    padding: 0;
  }

  .content :global(blockquote) {
    border-left: 4px solid var(--book-secondary);
    padding-left: 1.25rem;
    margin: 1.5rem 0;
    color: #475569;
    font-style: italic;
  }

  .content :global(a) {
    color: var(--book-primary);
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .content :global(a:hover) {
    color: var(--book-secondary);
  }

  /* Enhanced list styling */
  .content :global(ul) {
    list-style: none;
    padding-left: 0;
    margin: 1.25rem 0;
  }

  .content :global(ul li) {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.75;
  }

  .content :global(ul li::before) {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--book-accent);
    font-weight: 700;
    font-size: 1.125rem;
  }

  .content :global(ol) {
    list-style: none;
    counter-reset: item;
    padding-left: 0;
    margin: 1.25rem 0;
  }

  .content :global(ol li) {
    position: relative;
    counter-increment: item;
    padding-left: 2.25rem;
    margin-bottom: 0.75rem;
    line-height: 1.75;
  }

  .content :global(ol li::before) {
    content: counter(item) ".";
    position: absolute;
    left: 0;
    color: var(--book-primary);
    font-weight: 700;
    font-size: 1rem;
    min-width: 1.75rem;
  }

  /* Nested lists */
  .content :global(ul ul),
  .content :global(ol ol),
  .content :global(ul ol),
  .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  .content :global(ul ul li::before) {
    content: "•";
    color: var(--book-secondary);
  }

  .content :global(ol ol li::before) {
    content: counter(item, lower-alpha) ".";
    color: var(--book-secondary);
  }

  /* List items with strong emphasis */
  .content :global(li strong:first-child) {
    color: var(--book-primary);
  }

  /* Compact lists (for reference sections) */
  .content :global(.compact-list) {
    margin: 0.75rem 0;
  }

  .content :global(.compact-list li) {
    margin-bottom: 0.375rem;
  }

  /* Task/checklist styling */
  .content :global(ul.task-list) {
    list-style: none;
  }

  .content :global(ul.task-list li) {
    padding-left: 2rem;
  }

  .content :global(ul.task-list li::before) {
    content: "☐";
    color: #94a3b8;
    font-size: 1.25rem;
    line-height: 1;
  }

  .content :global(ul.task-list li.checked::before) {
    content: "☑";
    color: var(--book-accent);
  }

  /* Table styling */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9375rem;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .content :global(thead) {
    background: linear-gradient(135deg, var(--book-primary), var(--book-secondary));
    color: white;
  }

  .content :global(th) {
    padding: 1rem 1.25rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9375rem;
    letter-spacing: 0.025em;
  }

  .content :global(td) {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    color: #475569;
  }

  .content :global(tbody tr:last-child td) {
    border-bottom: none;
  }

  .content :global(tbody tr:hover) {
    background: #f8fafc;
  }

  .content :global(tbody tr:nth-child(even)) {
    background: #fafbfc;
  }

  .content :global(tbody tr:nth-child(even):hover) {
    background: #f1f5f9;
  }

  /* Responsive tables */
  @media (max-width: 768px) {
    .content :global(table) {
      font-size: 0.875rem;
    }
    
    .content :global(th), 
    .content :global(td) {
      padding: 0.75rem 1rem;
    }
  }

  /* Definition lists (for glossary) */
  .content :global(dl) {
    margin: 1.5rem 0;
  }

  .content :global(dt) {
    font-weight: 700;
    color: var(--book-primary);
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    font-size: 1.0625rem;
  }

  .content :global(dt:first-child) {
    margin-top: 0;
  }

  .content :global(dd) {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    color: #475569;
    line-height: 1.75;
  }

  /* Horizontal rule styling */
  .content :global(hr) {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2.5rem 0;
  }

  /* Inline badge/tag styling */
  .content :global(.badge) {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--book-accent);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .content :global(.tag) {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background: #e0f2fe;
    color: var(--book-primary);
    border-radius: 0.25rem;
    font-size: 0.8125rem;
    font-weight: 500;
    margin: 0.125rem;
  }

  /* Callout boxes */
  .content :global(.callout) {
    padding: 1.25rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    border-left: 4px solid;
  }

  .content :global(.callout-note) {
    background: #eff6ff;
    border-color: var(--book-primary);
  }

  .content :global(.callout-tip) {
    background: #ecfdf5;
    border-color: var(--book-accent);
  }

  .content :global(.callout-warning) {
    background: #fef3c7;
    border-color: #f59e0b;
  }

  .content :global(.callout-important) {
    background: #fef2f2;
    border-color: #ef4444;
  }

  .content :global(.callout-example) {
    background: #faf5ff;
    border-color: #a855f7;
  }

  .content :global(.callout-title) {
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .content :global(.callout-note .callout-title) {
    color: var(--book-primary);
  }

  .content :global(.callout-tip .callout-title) {
    color: #059669;
  }

  .content :global(.callout-warning .callout-title) {
    color: #d97706;
  }

  .content :global(.callout-important .callout-title) {
    color: #dc2626;
  }

  .content :global(.callout-example .callout-title) {
    color: #9333ea;
  }

  .section-navigation {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #e2e8f0;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }

  .nav-button:hover {
    border-color: var(--book-primary);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .prev-btn {
    justify-self: start;
  }

  .next-btn {
    justify-self: end;
  }

  .nav-arrow {
    font-size: 1.25rem;
    color: var(--book-primary);
  }

  .nav-button-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-align: left;
  }

  .next-btn .nav-button-text {
    text-align: right;
  }

  .nav-button-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-button-title {
    color: var(--book-text);
    font-weight: 600;
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-to-top {
    color: var(--book-primary);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .back-to-top:hover {
    background: #f1f5f9;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .book-container {
      grid-template-columns: 260px 1fr;
      gap: 1.5rem;
    }

    .book-nav {
      width: 260px;
    }
  }

  @media (max-width: 768px) {
    .book-container {
      grid-template-columns: 1fr;
      padding: 1rem;
    }

    .book-nav {
      position: static;
      max-height: none;
      margin-bottom: 1.5rem;
    }

    .section-navigation {
      grid-template-columns: 1fr;
      gap: 1rem;
      text-align: center;
    }

    .nav-center {
      order: 3;
    }

    .prev-btn, .next-btn {
      justify-self: stretch;
      width: 100%;
    }

    .content :global(h1) {
      font-size: 1.875rem;
    }

    .content :global(h2) {
      font-size: 1.5rem;
    }

    .content :global(h3) {
      font-size: 1.25rem;
    }
  }

  /* Print styles */
  @media print {
    .book-nav,
    .breadcrumb-wrapper,
    .section-navigation,
    .progress-indicator,
    .language-fallback-notice,
    .content-language-notice {
      display: none;
    }

    .book-container {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .content :global(*) {
      color: #000 !important;
    }
  }
</style>
