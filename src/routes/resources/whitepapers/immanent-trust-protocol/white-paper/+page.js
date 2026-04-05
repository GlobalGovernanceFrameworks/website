// src/routes/resources/whitepapers/immanent-trust-protocol/white-paper/+page.js
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;

// Main sections (in order)
const sectionIds = [
  '00-abstract',
  '01-introduction',
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'
];

// Appendices and references
const appendixIds = [
  'appendix-a', 'appendix-b', 'appendix-c', 'appendix-d', 'appendix-e',
  'references'
];

// Map file IDs to clean anchor IDs
const anchorMap = {
  '00-abstract': 'abstract',
  '01-introduction': 'section-1',
  '02': 'section-2',
  '03': 'section-3',
  '04': 'section-4',
  '05': 'section-5',
  '06': 'section-6',
  '07': 'section-7',
  '08': 'section-8',
  '09': 'section-9',
  '10': 'section-10',
  '11': 'section-11',
  '12': 'section-12',
  '13': 'section-13',
  'appendix-a': 'appendix-a',
  'appendix-b': 'appendix-b',
  'appendix-c': 'appendix-c',
  'appendix-d': 'appendix-d',
  'appendix-e': 'appendix-e',
  'references': 'references'
};

async function loadMarkdownWithFallback(sectionId, currentLocale) {
  try {
    // Use ?raw to get raw text, not a compiled Svelte component
    const module = await import(`$lib/content/papers/${currentLocale}/immanent-trust-protocol/${sectionId}.md?raw`);
    return {
      raw: module.default,          // raw markdown string
      meta: {},                     // metadata not available with ?raw
      locale: currentLocale,
      fellbackToEnglish: false
    };
  } catch (e) {
    if (currentLocale !== 'sv') {
      console.error(`Failed to load ${sectionId} in ${currentLocale}:`, e);
      throw e;
    }
    
    try {
      const englishModule = await import(`$lib/content/papers/en/immanent-trust-protocol/${sectionId}.md`);
      return {
        component: englishModule.default,
        meta: englishModule.metadata,
        locale: 'en',
        fellbackToEnglish: true
      };
    } catch (englishError) {
      console.error(`Failed to load ${sectionId} in English:`, englishError);
      throw new Error(`Section ${sectionId} not found in either ${currentLocale} or English`);
    }
  }
}

export async function load({ params, depends, url }) {
  depends('app:locale');
  
  let currentLocale = 'en';
  
  try {
    if (url?.searchParams?.has('lang')) {
      currentLocale = url.searchParams.get('lang');
    } else if (browser) {
      currentLocale = get(locale) || 'en';
    }
  } catch (e) {
    if (browser) {
      currentLocale = get(locale) || 'en';
    }
  }
  
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) {
    currentLocale = 'en';
  }

  try {
    // Load all sections and appendices
    const allIds = [...sectionIds, ...appendixIds];
    const loadedData = await Promise.all(
      allIds.map(id => loadMarkdownWithFallback(id, currentLocale))
    );
    
    // Build ordered sections array with anchor IDs
    const sections = [];
    let anyFallback = false;
    
    allIds.forEach((fileId, index) => {
      const data = loadedData[index];
      if (data.fellbackToEnglish) anyFallback = true;
      
      sections.push({
        fileId,
        anchorId: anchorMap[fileId],
        ...data
      });
    });

    return {
      sections,
      currentLocale,
      usedFallback: anyFallback
    };
  } catch (e) {
    console.error('Error loading ITP white paper sections:', e);
    
    throw error(404, {
      message: 'White paper content not available',
      details: {
        locale: currentLocale,
        originalError: e.message
      }
    });
  }
}
