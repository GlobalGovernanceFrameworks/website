// src/routes/resources/adaptive-coordination/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url }) {
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Load protocol translations for UI elements (optional)
  try {
    await loadTranslations(currentLocale, url.pathname);
  } catch (e) {
    console.warn('Failed to load translations:', e);
  }
  
  // Safe check for print mode
  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.searchParams.get('print') === 'true';
    } catch (e) {
      console.warn('Could not access URL search params:', e);
    }
  }

  // Try to load the current locale version first, fallback to English
  let content;
  let usedFallback = false;
  
  try {
    content = await import(`$lib/content/protocols/${currentLocale}/adaptive-coordination/current.md`);
  } catch (primaryError) {
    try {
      content = await import(`$lib/content/protocols/en/adaptive-coordination/current.md`);
      usedFallback = currentLocale !== 'en';
    } catch (fallbackError) {
      console.error('Failed to load protocol content in any language:', fallbackError);
      throw error(500, {
        message: 'Failed to load Adaptive Coordination Protocol content',
        details: 'The protocol document could not be found.'
      });
    }
  }
  
  return {
    content: content.default,
    isPrintMode,
    usedFallback,
    currentLocale,
    // Protocol metadata
    protocolType: 'adaptive-coordination',
    protocolVersion: '1.0',
    isImplementationProtocol: true,
    // Paths for downloads
    downloadPaths: {
      fullProtocolPdf: `/downloads/${currentLocale}/adaptive-coordination-protocol.${currentLocale}.pdf`,
      onePagerPdf: `/downloads/${currentLocale}/adaptive-coordination-one-pager.${currentLocale}.pdf`,
      // Fallback if localized PDF doesn't exist
      fallbackPdf: '/downloads/en/adaptive-coordination-protocol.en.pdf'
    }
  };
}
