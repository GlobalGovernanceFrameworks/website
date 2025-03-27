// src/routes/framework/docs/glossary/+page.js
import { loadTranslations, locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Explicitly load glossary translations
  await loadTranslations(currentLocale, '/framework/docs/glossary');
  
  return {};
}
