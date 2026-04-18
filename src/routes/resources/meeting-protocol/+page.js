// src/routes/resources/meeting-protocol/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const csr = true;

export async function load({ depends, url }) {
  depends('app:locale');
  
  const currentLocale = get(locale);

  try {
    await loadTranslations(currentLocale, '/resources/meeting-protocol');
  } catch (e) {
    console.warn('Failed to load translations:', e);
  }

  const documents = ['meeting-protocol', 'meeting-appendix-questions'];
  const content = {};
  const sectionsUsingEnglishFallback = new Set();

  for (const doc of documents) {
    try {
      content[doc] = await import(`$lib/content/protocols/${currentLocale}/meeting/${doc}.md`);
    } catch {
      try {
        content[doc] = await import(`$lib/content/protocols/en/meeting/${doc}.md`);
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(doc);
        }
      } catch (fallbackError) {
        console.warn(`Could not load ${doc} in any language:`, fallbackError.message);
        content[doc] = null;
      }
    }
  }

  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.searchParams.get('print') === 'true';
    } catch { isPrintMode = false; }
  }

  return {
    content,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback)
  };
}
