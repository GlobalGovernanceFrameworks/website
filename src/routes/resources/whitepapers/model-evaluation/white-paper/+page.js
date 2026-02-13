// src/routes/resources/whitepapers/model-evaluation/white-paper/+page.js
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;

// Section IDs in order
const sectionIds = [
  '01-the-experiment',
  '02-the-prompt',
  '03-the-responses',
  '04-the-evaluation',
  '05-insights'
];

// Map to clean IDs for HTML
const sectionIdMap = {
  '01-the-experiment': 'experiment',
  '02-the-prompt': 'prompt',
  '03-the-responses': 'responses',
  '04-the-evaluation': 'evaluation',
  '05-insights': 'insights'
};

// Try to load markdown file with fallback to English
async function loadMarkdownWithFallback(sectionId, currentLocale) {
  try {
    const module = await import(`$lib/content/papers/${currentLocale}/model-evaluation/${sectionId}.md`);
    
    return {
      component: module.default,
      meta: module.metadata,
      locale: currentLocale,
      fellbackToEnglish: false
    };
  } catch (e) {
    if (currentLocale !== 'sv') {
      console.error(`Failed to load ${sectionId} in ${currentLocale}:`, e);
      throw e;
    }
    
    try {
      console.log(`Swedish version of ${sectionId} not found, falling back to English`);
      const englishModule = await import(`$lib/content/papers/en/model-evaluation/${sectionId}.md`);
      
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
  
  // Get current locale
  let currentLocale = 'en';
  
  try {
    if (url?.searchParams?.has('lang')) {
      currentLocale = url.searchParams.get('lang');
    } else if (browser) {
      currentLocale = get(locale) || 'en';
    }
  } catch (e) {
    console.warn('Error accessing URL searchParams:', e);
    if (browser) {
      currentLocale = get(locale) || 'en';
    }
  }
  
  // Validate locale
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) {
    currentLocale = 'en';
  }

  console.log('Loading Model Evaluation white paper with locale:', currentLocale);

  try {
    // Load all sections
    const sectionsPromises = sectionIds.map(id => loadMarkdownWithFallback(id, currentLocale));
    const sectionsData = await Promise.all(sectionsPromises);
    
    // Map to clean IDs
    const sections = {};
    let anyFallback = false;
    
    sectionsData.forEach((data, index) => {
      const cleanId = sectionIdMap[sectionIds[index]];
      sections[cleanId] = data;
      if (data.fellbackToEnglish) {
        anyFallback = true;
      }
    });

    return {
      sections,
      currentLocale,
      usedFallback: anyFallback
    };
  } catch (e) {
    console.error('Error loading white paper sections:', e);
    
    throw error(404, {
      message: `White paper content not available`,
      details: {
        locale: currentLocale,
        originalError: e.message
      }
    });
  }
}
