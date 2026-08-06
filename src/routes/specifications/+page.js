// src/routes/specifications/+page.js

import { get } from 'svelte/store';
import { locale, loadTranslations } from '$lib/i18n';
import { listPublishedSpecifications } from '$lib/data/outlineRegistry.js';

export const csr = true;

export async function load({ depends }) {
  depends('app:locale');

  const currentLocale = get(locale) || 'en';

  try {
    await loadTranslations(currentLocale, '/frameworks');
  } catch (e) {
    console.warn('Could not load translations for specifications index:', e.message);
  }

  return { specifications: listPublishedSpecifications() };
}
