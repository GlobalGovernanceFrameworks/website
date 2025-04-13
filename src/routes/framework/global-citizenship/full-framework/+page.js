// src/routes/framework/global-citizenship/full-framework/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends, url }) {
  // Declare dependency on locale and URL parameters
  depends('app:locale');
  
  // Check URL for lang parameter as an override
  const langParam = url.searchParams.get('lang');
  const currentLocale = langParam || get(locale);
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/framework/${currentLocale}/global-citizenship.md`);
    console.log(`Successfully loaded ${currentLocale} content for global-citizenship`);
  } catch (e) {
    console.error(`Failed to load content for locale ${currentLocale}:`, e);
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/framework/en/global-citizenship.md`);
    console.log('Falling back to English content');
  }
  
  return {
    component: content.default,
    usedLocale: currentLocale // This helps track which locale was actually used
  };
}

export const prerender = true;
