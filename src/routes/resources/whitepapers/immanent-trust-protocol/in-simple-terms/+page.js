// src/routes/resources/whitepapers/immanent-trust-protocol/in-simple-terms/+page.js
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;

async function loadMarkdownWithFallback(sectionId, currentLocale) {
  try {
    const module = await import(`$lib/content/papers/${currentLocale}/immanent-trust-protocol/${sectionId}.md`);
    return {
      component: module.default,
      meta: module.metadata,
      locale: currentLocale,
      fellbackToEnglish: false
    };
  } catch (e) {
    if (currentLocale !== 'sv') throw e;
    
    try {
      const englishModule = await import(`$lib/content/papers/en/immanent-trust-protocol/${sectionId}.md`);
      return {
        component: englishModule.default,
        meta: englishModule.metadata,
        locale: 'en',
        fellbackToEnglish: true
      };
    } catch (englishError) {
      throw new Error(`${sectionId} not found in either ${currentLocale} or English`);
    }
  }
}

export async function load({ depends, url }) {
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
    const content = await loadMarkdownWithFallback('in-simple-terms', currentLocale);

    return {
      content,
      currentLocale,
      usedFallback: content.fellbackToEnglish
    };
  } catch (e) {
    console.error('Error loading in-simple-terms:', e);
    throw error(404, {
      message: 'Content not available',
      details: { locale: currentLocale, originalError: e.message }
    });
  }
}
