// src/routes/frameworks/docs/implementation/tier-3/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/frameworks/${currentLocale}/implementation/tier-3.md`);
  } catch (e) {
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/frameworks/en/implementation/tier-3.md`);
  }
  
  return {
    component: content.default
  };
}
