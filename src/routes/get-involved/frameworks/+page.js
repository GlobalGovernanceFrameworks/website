// src/routes/get-involved/frameworks/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Track which content fell back to English
  let contentUsingEnglishFallback = false;

  // Try to load frameworks guide content
  let guideContent = null;
  
  try {
    // Try to load the current locale version
    guideContent = await import(`$lib/content/get-involved/frameworks/${currentLocale}/frameworks-guide.md`);
  } catch (e) {
    // Fall back to English if translation isn't available
    try {
      guideContent = await import(`$lib/content/get-involved/frameworks/en/frameworks-guide.md`);
      // Track that this content is using English fallback
      if (currentLocale !== 'en') {
        contentUsingEnglishFallback = true;
      }
    } catch (e2) {
      console.error("Failed to load frameworks guide content");
    }
  }
  
  return {
    guideContent: guideContent?.default,
    isPrintMode,
    contentUsingEnglishFallback,
    currentLocale
  };
}
