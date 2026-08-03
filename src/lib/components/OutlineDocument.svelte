<!-- src/lib/components/OutlineDocument.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
  import { MATURITY } from '$lib/data/outlineRegistry.js';

  export let entry;
  export let slug;
  export let component;
  export let metadata = {};
  export let versions = [];
  export let lineage = { documentCount: 0, rounds: [], reviewers: [] };
  export let mode = 'outline';
  export let section = null; // prose mode only
  export let githubBase =
    'https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content';

  const ui = {
    contents: 'Contents',
    versionHistory: 'Version history',
    sourceOnGitHub: 'Source and full version history on GitHub',
    challenge: 'Disagree with something here?',
    challengeBody:
      'This is a proposal, and the most useful thing you can send is a specific objection — a clause that would not survive contact with your jurisdiction, your institution, or your community.',
    challengeCta: 'Send a critique',
    relatedTitle: 'Read alongside',
    revisions: 'revisions',
    reviewDocs: 'review documents',
    reviewRounds: 'review rounds',
    sections: 'Sections',
    previous: 'Previous',
    next: 'Next'
  };

  const reviewerNames = {
    claude: 'Claude',
    gemini: 'Gemini',
    grok: 'Grok',
    deepseek: 'DeepSeek',
    chatgpt: 'ChatGPT'
  };

  // Colours from the schema, text from i18n.
  $: maturityStyle = MATURITY[entry.maturity] ?? MATURITY.internal;

  function maturityText(key, field) {
    const path = `framework.maturity.${key}.${field}`;
    const value = $t(path);
    return !value || value === path ? key : value;
  }

  $: maturityLabel = maturityText(entry.maturity, 'label');
  $: maturityDescription = maturityText(entry.maturity, 'description');

  $: sourceUrl =
    mode === 'prose'
      ? `${githubBase}/frameworks/en/implementation/${entry.proseDir}/`
      : `${githubBase}/framework-outlines/en/${entry.outlineDir}/versions/${entry.version}.md`;

  $: firstVersion = versions[0];
  $: subtitle = entry.subtitle ?? metadata.title ?? '';

  // Group the prose section list, preserving declaration order.
  $: sectionGroups = (() => {
    if (mode !== 'prose' || !entry.sections) return [];
    const groups = [];
    for (const s of entry.sections) {
      const name = s.group ?? '';
      const last = groups[groups.length - 1];
      if (last && last.name === name) last.items.push(s);
      else groups.push({ name, items: [s] });
    }
    return groups;
  })();

  let bodyEl;
  let headings = [];
  let activeId = '';
  let observer;

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  function buildToc() {
    if (!bodyEl) return;

    // Outlines vary: most start at h1, some start at h3. Use the two
    // shallowest levels that are actually present.
    const present = [1, 2, 3, 4].filter((n) => bodyEl.querySelector(`h${n}`)).slice(0, 2);

    if (!present.length) {
      headings = [];
      return;
    }

    const nodes = [...bodyEl.querySelectorAll(present.map((n) => `h${n}`).join(', '))];
    const seen = new Map();

    headings = nodes.map((node) => {
      if (!node.id) {
        const stem = slugify(node.textContent);
        const count = seen.get(stem) ?? 0;
        seen.set(stem, count + 1);
        node.id = count ? `${stem}-${count}` : stem;
      }
      return {
        id: node.id,
        text: node.textContent,
        level: Number(node.tagName[1]) === present[0] ? 1 : 2
      };
    });

    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) activeId = visible[0].target.id;
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
  }

  // Rebuild when the rendered component changes (prose section navigation).
  $: if (bodyEl && component) requestAnimationFrame(buildToc);

  onMount(() => requestAnimationFrame(buildToc));
  onDestroy(() => observer?.disconnect());
</script>

<article class="outline-page">
  <header class="outline-header">
    <div class="wrap">
      <a class="back" href="{base}/frameworks">← All frameworks</a>

      <div class="eyebrow">
        <span class="tier">Tier {entry.tier}</span>
        <span class="dot">·</span>
        <span class="version">{entry.version}</span>
        <span class="dot">·</span>
        <span class="updated">Updated {entry.updated}</span>
      </div>

      <h1>
        <span class="emoji" aria-hidden="true">{entry.emoji}</span>
        {entry.title}
      </h1>

      {#if subtitle}
        <p class="subtitle">{subtitle}</p>
      {/if}

      <span
        class="maturity"
        style="color: {maturityStyle.color}; background: {maturityStyle.bg}; border-color: {maturityStyle.color}33;"
        title={maturityDescription}
      >
        {maturityLabel}
      </span>

      {#if entry.standfirst}
        <p class="standfirst">{entry.standfirst}</p>
      {/if}
    </div>
  </header>

  {#if versions.length > 1 || lineage.documentCount}
    <section class="provenance" aria-label="Document history">
      <div class="wrap">
        <div class="prov-stats">
          {#if versions.length > 1}
            <div class="stat">
              <span class="num">{versions.length}</span>
              <span class="lbl">{ui.revisions}</span>
            </div>
          {/if}
          {#if lineage.documentCount}
            <div class="stat">
              <span class="num">{lineage.documentCount}</span>
              <span class="lbl">{ui.reviewDocs}</span>
            </div>
          {/if}
          {#if lineage.rounds.length}
            <div class="stat">
              <span class="num">{lineage.rounds.length}</span>
              <span class="lbl">{ui.reviewRounds}</span>
            </div>
          {/if}
        </div>

        {#if versions.length > 1}
          <ol class="version-rail" aria-label={ui.versionHistory}>
            {#each versions as v}
              <li class:is-current={v === entry.outlineVersion || v === entry.version}>
                <span class="tick" aria-hidden="true"></span>
                <span class="v-label">{v}</span>
              </li>
            {/each}
          </ol>
          <p class="rail-caption">
            {firstVersion} → {versions[versions.length - 1]}{#if lineage.reviewers.length}, reviewed
              across {lineage.reviewers.map((r) => reviewerNames[r] ?? r).join(', ')}{/if}.
            <a href={sourceUrl} target="_blank" rel="noopener">{ui.sourceOnGitHub} ↗</a>
          </p>
        {/if}
      </div>
    </section>
  {/if}

  <div class="wrap layout">
    <nav class="toc" aria-label="Document navigation">
      {#if mode === 'prose'}
        <p class="toc-title">{ui.sections}</p>
        {#each sectionGroups as group}
          {#if group.name}
            <p class="group-name">{group.name}</p>
          {/if}
          <ul class="section-list">
            {#each group.items as s}
              <li class:active={s.id === section?.id}>
                <a href="{base}/frameworks/{slug}?section={s.id}">{s.title}</a>
              </li>
            {/each}
          </ul>
        {/each}

        {#if headings.length > 1}
          <p class="toc-title in-section">{ui.contents}</p>
          <ul>
            {#each headings.filter((h) => h.level === 2) as h}
              <li class="lvl-2" class:active={h.id === activeId}>
                <a href="#{h.id}">{h.text}</a>
              </li>
            {/each}
          </ul>
        {/if}
      {:else}
        <p class="toc-title">{ui.contents}</p>
        <ul>
          {#each headings as h}
            <li class="lvl-{h.level}" class:active={h.id === activeId}>
              <a href="#{h.id}">{h.text}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </nav>

    <div class="body-column">
      {#if mode === 'prose' && section}
        <p class="section-progress">
          Section {section.index + 1} of {section.total}
        </p>
      {/if}

      <div class="outline-body" bind:this={bodyEl}>
        <svelte:component this={component} />
      </div>

      {#if mode === 'prose' && section}
        <nav class="section-nav" aria-label="Section navigation">
          {#if section.previous}
            <a class="prev" href="{base}/frameworks/{slug}?section={section.previous.id}">
              <span class="dir">← {ui.previous}</span>
              <span class="ttl">{section.previous.title}</span>
            </a>
          {:else}
            <span></span>
          {/if}
          {#if section.next}
            <a class="next" href="{base}/frameworks/{slug}?section={section.next.id}">
              <span class="dir">{ui.next} →</span>
              <span class="ttl">{section.next.title}</span>
            </a>
          {/if}
        </nav>
      {/if}
    </div>
  </div>

  <footer class="outline-footer">
    <div class="wrap foot-grid">
      <div class="challenge">
        <h2>{ui.challenge}</h2>
        <p>{ui.challengeBody}</p>
        <a class="cta" href="{base}/contact?re={slug}">{ui.challengeCta}</a>
      </div>

      {#if entry.related?.length}
        <div class="related">
          <h2>{ui.relatedTitle}</h2>
          <ul>
            {#each entry.related as r}
              <li>
                <a href="{base}/frameworks/{r.slug}">
                  <span aria-hidden="true">{r.emoji}</span>
                  {r.title} →
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </footer>
</article>

<style>
  /* Reset generic article/page-shell width rules before applying our own layout. */
  article.outline-page {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
  }

  .wrap {
    width: 100%;
    max-width: 1100px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: 1.25rem;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .outline-header {
    padding: 2.5rem 0 2rem;
    border-bottom: 1px solid #e5e7eb;
  }
  .back {
    display: inline-block;
    font-size: 0.875rem;
    color: #6b7280;
    text-decoration: none;
    margin-bottom: 1.5rem;
  }
  .back:hover { color: #2b4b8c; }

  .eyebrow {
    font-size: 0.8125rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 0.75rem;
  }
  .eyebrow .tier { color: #2b4b8c; font-weight: 600; }
  .eyebrow .version { font-variant-numeric: tabular-nums; }
  .eyebrow .dot { margin: 0 0.5rem; color: #d1d5db; }

  h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    line-height: 1.15;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.75rem;
  }
  .emoji { margin-right: 0.5rem; }

  .subtitle {
    font-size: 1.125rem;
    line-height: 1.5;
    color: #4b5563;
    margin: 0 0 1.25rem;
    max-width: 46rem;
  }

  .maturity {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    border: 1px solid;
    cursor: help;
  }

  .standfirst {
    margin: 1.5rem 0 0;
    max-width: 44rem;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: #374151;
    border-left: 3px solid #daa520;
    padding-left: 1rem;
  }

  /* ── Provenance ── */
  .provenance {
    background: #fafafa;
    border-bottom: 1px solid #e5e7eb;
    padding: 1.5rem 0;
  }
  .prov-stats { display: flex; gap: 2.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .stat { display: flex; align-items: baseline; gap: 0.4rem; }
  .stat .num {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2b4b8c;
    font-variant-numeric: tabular-nums;
  }
  .stat .lbl { font-size: 0.8125rem; color: #6b7280; }

  .version-rail {
    display: flex;
    align-items: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
    border-bottom: 1px solid #d1d5db;
  }
  .version-rail li {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 2.75rem;
    flex: 1 0 auto;
    padding-bottom: 0.4rem;
  }
  .version-rail .tick { width: 2px; height: 0.75rem; background: #cbd5e1; margin-bottom: 0.3rem; }
  .version-rail .v-label {
    font-size: 0.6875rem;
    color: #9ca3af;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .version-rail li.is-current .tick { background: #daa520; height: 1.5rem; width: 3px; }
  .version-rail li.is-current .v-label { color: #b8860b; font-weight: 700; }

  .rail-caption { margin: 0.75rem 0 0; font-size: 0.8125rem; color: #6b7280; line-height: 1.6; }
  .rail-caption a { color: #2b4b8c; }

  /* ── Layout ── */
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
    gap: 3rem;
    padding-top: 2.5rem;
    padding-bottom: 4rem;
    align-items: start;
    width: 100%;
    min-width: 0;
  }

  .toc {
    position: sticky;
    top: 1.5rem;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
    font-size: 0.8125rem;
  }
  .toc-title {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.6875rem;
    font-weight: 700;
    color: #9ca3af;
    margin: 0 0 0.75rem;
  }
  .toc-title.in-section { margin-top: 1.75rem; }
  .group-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    margin: 1rem 0 0.4rem;
  }
  .toc ul { list-style: none; margin: 0; padding: 0; border-left: 1px solid #e5e7eb; }
  .toc li a {
    display: block;
    padding: 0.3rem 0 0.3rem 0.75rem;
    color: #6b7280;
    text-decoration: none;
    line-height: 1.4;
    border-left: 2px solid transparent;
    margin-left: -1px;
  }
  .toc li.lvl-2 a { padding-left: 1.5rem; font-size: 0.78rem; color: #9ca3af; }
  .toc li a:hover { color: #2b4b8c; }
  .toc li.active a { color: #2b4b8c; font-weight: 600; border-left-color: #daa520; }

  .body-column { min-width: 0; }

  .section-progress {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #9ca3af;
    margin: 0 0 1.5rem;
  }

  /* ── Rendered markdown ── */
  .outline-body :global(h1) {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2b4b8c;
    margin: 3rem 0 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
    scroll-margin-top: 1.5rem;
  }
  .outline-body :global(h1:first-child) { border-top: none; margin-top: 0; padding-top: 0; }

  .outline-body :global(h2) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 2rem 0 0.75rem;
    scroll-margin-top: 1.5rem;
  }
  .outline-body :global(h3) {
    font-size: 1.0625rem;
    font-weight: 600;
    color: #4b5563;
    margin: 1.75rem 0 0.5rem;
    scroll-margin-top: 1.5rem;
  }
  .outline-body :global(h4) {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #6b7280;
    margin: 1.25rem 0 0.4rem;
  }

  .outline-body :global(p) {
    color: #374151;
    line-height: 1.75;
    margin: 0 0 1rem;
    max-width: 42rem;
  }
  .outline-body :global(ul) {
    color: #374151;
    line-height: 1.75;
    margin: 0 0 1.25rem;
    padding-left: 1.5rem;
    max-width: 42rem;
    list-style-type: disc;
    list-style-position: outside;
  }
  .outline-body :global(ol) {
    color: #374151;
    line-height: 1.75;
    margin: 0 0 1.25rem;
    padding-left: 1.5rem;
    max-width: 42rem;
    list-style-type: decimal;
    list-style-position: outside;
  }
  .outline-body :global(ul ul) { list-style-type: circle; margin-bottom: 0.5rem; }
  .outline-body :global(li) { margin-bottom: 0.4rem; display: list-item; }
  .outline-body :global(li::marker) { color: #9ca3af; }

  .outline-body :global(strong) { color: #1f2937; font-weight: 600; }
  .outline-body :global(em) { color: #4b5563; }
  .outline-body :global(a) { color: #2b4b8c; }
  .outline-body :global(hr) { border: none; border-top: 1px solid #e5e7eb; margin: 2.5rem 0; }
  .outline-body :global(blockquote) {
    border-left: 3px solid #daa520;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #4b5563;
  }
  .outline-body :global(table) {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 1.5rem 0;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  .outline-body :global(th),
  .outline-body :global(td) {
    border: 1px solid #e5e7eb;
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
  .outline-body :global(th) { background: #f9fafb; font-weight: 600; }
  .outline-body :global(code) {
    background: #f3f4f6;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .body-column,
  .outline-body {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .outline-body {
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .outline-body :global(img),
  .outline-body :global(svg),
  .outline-body :global(video) {
    max-width: 100%;
    height: auto;
  }

  .outline-body :global(pre) {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    white-space: pre;
  }

  .version-rail {
    max-width: 100%;
  }

  /* ── Section navigation ── */
  .section-nav {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  .section-nav a {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    text-decoration: none;
    max-width: 45%;
  }
  .section-nav .next { text-align: right; margin-left: auto; }
  .section-nav .dir {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #9ca3af;
  }
  .section-nav .ttl { color: #2b4b8c; font-weight: 600; line-height: 1.35; }
  .section-nav a:hover .ttl { text-decoration: underline; }

  /* ── Footer ── */
  .outline-footer { border-top: 1px solid #e5e7eb; background: #f8fafc; padding: 3rem 0; }
  .foot-grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 3rem; }
  .outline-footer h2 { font-size: 1.125rem; font-weight: 700; color: #1f2937; margin: 0 0 0.75rem; }
  .challenge p { color: #4b5563; line-height: 1.7; margin: 0 0 1.25rem; max-width: 36rem; }
  .cta {
    display: inline-block;
    background: #2b4b8c;
    color: #fff;
    font-weight: 600;
    padding: 0.7rem 1.4rem;
    border-radius: 0.5rem;
    text-decoration: none;
  }
  .cta:hover { background: #1e3a8a; }
  .related ul { list-style: none; margin: 0; padding: 0; }
  .related li { margin-bottom: 0.5rem; }
  .related a { color: #2b4b8c; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .wrap {
      max-width: none;
      padding-inline: 1rem;
    }

    .layout {
      display: block;
      width: 100%;
      padding-top: 1.5rem;
      padding-bottom: 3rem;
    }

    .toc {
      position: static;
      width: 100%;
      max-height: none;
      margin-bottom: 1.5rem;
      padding: 1rem;
      box-sizing: border-box;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fafafa;
    }
    .foot-grid { grid-template-columns: 1fr; gap: 2rem; }
    .section-nav { flex-direction: column; }
    .section-nav a { max-width: 100%; }
    .section-nav .next { text-align: left; margin-left: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { scroll-behavior: auto !important; }
  }

  a:focus-visible,
  .cta:focus-visible {
    outline: 2px solid #daa520;
    outline-offset: 2px;
  }
</style>
