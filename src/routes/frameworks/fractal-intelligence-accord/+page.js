// src/routes/frameworks/fractal-intelligence-accord/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;
export const ssr = true

export async function load({ depends, url }) {
  depends('app:locale');

  const currentLocale = get(locale);

  // Load page-specific translations
  try {
    let cleanPath = url.pathname;
    if (cleanPath.includes('/frameworks/') &&
        (cleanPath.includes('charter') || cleanPath.includes('transition-protocol'))) {
      cleanPath = '/frameworks/fractal-intelligence-accord';
    }
    await loadTranslations(currentLocale, cleanPath);
  } catch (e) {
    console.error('Failed to load translations:', e);
  }

  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.search ? url.searchParams.get('print') === 'true' : false;
    } catch (e) {
      isPrintMode = false;
    }
  }

  const sections = ['charter', 'transition-protocol'];

  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();

  const content = {};
  let loadedSections = 0;

  for (const section of sections) {
    try {
      // Try current locale first
      const mod = await import(
        `$lib/content/framework-outlines/${currentLocale}/tier-2/fractal-intelligence-accord/${section}.md`
      );
      content[section] = mod;
      loadedSections++;
    } catch (primaryError) {
      // Fall back to English
      try {
        const fallback = await import(
          `$lib/content/framework-outlines/en/tier-2/fractal-intelligence-accord/${section}.md`
        );
        content[section] = fallback;
        loadedSections++;

        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
      } catch (fallbackError) {
        console.warn(`Could not load section ${section} in any language:`, fallbackError.message);

        content[section] = {
          default: function MissingSection() {
            return {
              render: () => ({
                html: `<div class="missing-section-content">
                  <h2>Section "${section}" not found</h2>
                  <p>This content is still being developed.</p>
                </div>`,
                css: { code: '', map: null }
              })
            };
          }
        };
      }
    }
  }

  // Add virtual index section (rendered by the component, not from markdown)
  content['index'] = { default: null };

  return {
    sections: content,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,

    frameworkType: 'fractal-intelligence-accord',
    totalSections: sections.length,
    coreFrameworkSections: 2,

    // Framework-specific metadata
    accordVersion: '1.0',
    charterStatus: 'Ratification Draft',
    protocolStatus: 'Agile Protocol — Continuous Integration',

    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/frameworks/fractal-intelligence-accord'
      },
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
