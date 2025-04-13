// src/routes/framework/docs/principles/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  // Check URL for lang parameter as an override
  const langParam = url.searchParams.get('lang');
  const currentLocale = langParam || get(locale);
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/framework/${currentLocale}/principles.md`);
  } catch (e) {
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/framework/en/principles.md`);
  }
  
  return {
    component: content.default,
    locale: currentLocale // Return this so the page knows what locale was used
  };
}
