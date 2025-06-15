// src/routes/frameworks/docs/implementation/education/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - add 'quick-start' as the first section
  const sections = [
    'quick-start',
    'index',
    '01-preamble',
    '02-vision-principles',
    '03-structural-components',
    '04-implementation-strategies',
    '05-monitoring-evaluation',
    '06-sdg-alignment',
    '07-visual-multimedia',
    '08-case-models',
    '09-future-potential',
    '10-appendices'
  ];
  
  // For backward compatibility 
  let legacyContent = null;
  
  // Try to load modular content first
  const content = {};
  let isModular = false;
  
  try {
    // Try to load each section
    for (const section of sections) {
      try {
        // Try to load the current locale version
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/education/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/education/${section}.md`);
          isModular = true;
        } catch (e2) {
          console.log(`Could not load section ${section} in any language`);
        }
      }
    }
  } catch (e) {
    console.warn("Error loading modular content:", e);
  }
  
  // If modular content failed or isn't available, fall back to legacy single file
  if (!isModular) {
    try {
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/education.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/education.md`);
      } catch (e2) {
        console.error("Failed to load any content for education framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode
  };
}
