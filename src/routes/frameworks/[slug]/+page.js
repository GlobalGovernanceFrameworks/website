// src/routes/frameworks/[slug]/+page.js

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

export const csr = true;

export async function load({ params, url, depends }) {
  depends('app:locale');

  const { slug } = params;
  const entry = getOutlineEntry(slug);

  if (!entry) {
    throw error(404, {
      message:
        `No framework published at /frameworks/${slug}. ` +
        `The schema entity needs a ui.outline or ui.prose block.`
    });
  }

  const currentLocale = get(locale) || 'en';

  try {
    await loadTranslations(currentLocale, '/frameworks');
  } catch (e) {
    console.warn('Could not load translations for framework page:', e.message);
  }

  // Lineage comes from the outline folder in both modes.
  const versions = listVersions(entry.outlineDir);
  const lineage = getReviewLineage(entry.outlineDir);

  /* ---- prose mode: one section at a time ---- */

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
    outline = await loadOutline(entry.outlineDir, entry.version, currentLocale);
  } catch (e) {
    const isMissing = e.message?.startsWith('Outline not found on disk');

    if (isMissing) {
      const available = listAvailableOutlinePaths(entry.outlineDir);
      console.error(`[outline] No module for ${entry.outlineDir}/versions/${entry.version}.md`);
      console.error('[outline] Vite can see:', available);

      throw error(500, {
        message:
          `Schema names ${entry.version} for ${slug}, but Vite has no module at ` +
          `${entry.outlineDir}/versions/${entry.version}.md. ` +
          (available.length
            ? `It can see: ${available.join(', ')}.`
            : `It sees nothing in that folder — check the dir path.`)
      });
    }

    console.error(`[outline] ${entry.outlineDir}/versions/${entry.version}.md failed to compile:`);
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
    mode: 'outline',
    component: outline.component,
    metadata: outline.metadata,
    usedEnglishFallback: outline.usedEnglishFallback,
    section: null,
    versions,
    lineage
  };
}
