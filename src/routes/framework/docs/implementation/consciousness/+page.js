// src/routes/framework/docs/implementation/consciousness/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/framework/${currentLocale}/implementation/consciousness.md`);
  } catch (e) {
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/framework/en/implementation/consciousness.md`);
  }
  
  return {
    component: content.default
  };
}
