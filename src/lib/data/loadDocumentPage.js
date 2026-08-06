// src/lib/data/loadDocumentPage.js
//
// Shared load logic for /frameworks/[slug] and /specifications/[slug].
// The two routes differ only in which document kind they will serve; the
// mdsvex error handling, locale fallback and lineage lookup are identical.

import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { locale, loadTranslations } from '$lib/i18n';
import {
  getOutlineEntry,
  loadOutline,
  loadProseSection,
  listVersions,
  getReviewLineage,
  listAvailableOutlinePaths
} from '$lib/data/outlineRegistry.js';

const ROUTE = {
  framework: '/frameworks',
  specification: '/specifications'
};

export async function loadDocumentPage({ params, url, depends, kind = 'framework' }) {
  depends('app:locale');

  const { slug } = params;
  const entry = getOutlineEntry(slug);
  const base = ROUTE[kind];

  if (!entry) {
    throw error(404, {
      message:
        `No document published at ${base}/${slug}. ` +
        `The schema entity needs a ui.outline or ui.prose block.`
    });
  }

  // A specification is not reachable under /frameworks, and vice versa.
  if (entry.kind !== kind) {
    throw error(404, {
      message: `${slug} is published at ${entry.path}, not ${base}/${slug}.`
    });
  }

  const currentLocale = get(locale) || 'en';

  try {
    // Both routes use the framework document translation keys.
    await loadTranslations(currentLocale, '/frameworks');
  } catch (e) {
    console.warn('Could not load translations for document page:', e.message);
  }

  const versions = listVersions(entry.outlineDir);
  const lineage = getReviewLineage(entry.outlineDir);

  /* ---- prose mode: one section at a time (frameworks only) ---- */

  if (entry.mode === 'prose') {
    const ids = entry.sections.map((s) => s.id);
    const requested = url.searchParams.get('section');
    const sectionId = ids.includes(requested) ? requested : ids[0];
    const index = ids.indexOf(sectionId);

    let loaded;
    try {
      loaded = await loadProseSection(entry.proseDir, sectionId, currentLocale);
    } catch (e) {
      const isMissing = e.message?.startsWith('Prose section not found');
      console.error(`[prose] ${entry.proseDir}/${sectionId}.md —`, e.message);

      throw error(500, {
        message: isMissing
          ? `Section "${sectionId}" is listed in the schema but has no file at ` +
            `content/frameworks/en/implementation/${entry.proseDir}/${sectionId}.md`
          : `${slug} / ${sectionId} exists but will not render. ` +
            `mdsvex or Svelte rejected the markdown — see the terminal. ${e.message}`
      });
    }

    return {
      slug,
      entry,
      kind,
      mode: 'prose',
      component: loaded.component,
      metadata: loaded.metadata,
      usedEnglishFallback: loaded.usedEnglishFallback,
      section: {
        id: sectionId,
        index,
        total: ids.length,
        previous: index > 0 ? entry.sections[index - 1] : null,
        next: index < ids.length - 1 ? entry.sections[index + 1] : null
      },
      versions,
      lineage
    };
  }

  /* ---- outline mode: the whole document ---- */

  let outline;
  try {
    outline = await loadOutline(entry.outlineDir, entry.version, currentLocale, kind);
  } catch (e) {
    const isMissing = e.message?.startsWith('Outline not found on disk');

    if (isMissing) {
      const available = listAvailableOutlinePaths(entry.outlineDir, 'en', kind);
      console.error(`[${kind}] No module for ${entry.outlineDir}/current.md`);
      console.error(`[${kind}] Vite can see:`, available);

      throw error(500, {
        message:
          `Schema publishes ${entry.version} for ${slug}, but Vite has no canonical module at ` +
          `${entry.outlineDir}/current.md. ` +
          (available.length
            ? `It can see: ${available.join(', ')}.`
            : `It sees nothing in that folder — check the dir path or current.md symlink.`)
      });
    }

    console.error(`[${kind}] ${entry.outlineDir}/current.md (${entry.version}) failed to compile:`);
    console.error(e);

    throw error(500, {
      message:
        `${slug} ${entry.version} exists but will not render. ` +
        `mdsvex or Svelte rejected the markdown — see the terminal for the line number. ` +
        `${e.message}`
    });
  }

  return {
    slug,
    entry,
    kind,
    mode: 'outline',
    component: outline.component,
    metadata: outline.metadata,
    usedEnglishFallback: outline.usedEnglishFallback,
    section: null,
    versions,
    lineage
  };
}
