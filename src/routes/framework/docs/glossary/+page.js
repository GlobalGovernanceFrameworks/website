// src/routes/framework/docs/glossary/+page.js
import { loadTranslations, locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  // Check URL for lang parameter as an override
  const langParam = url.searchParams.get('lang');
  const currentLocale = langParam || get(locale);
  
  // Explicitly load glossary translations
  await loadTranslations(currentLocale, '/framework/docs/glossary');
  
  return {};
}
