// src/routes/framework/docs/implementation/spiritual/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all spiritual framework sections
  const sections = [
    'index',
    '01-introduction',
    '02-core-principles',
    '03-objectives',
    '04-governance-structure',
    '05-implementation-mechanisms',
    '06-key-activities',
    '07-funding-and-resources',
    '08-challenges-and-mitigation-strategies',
    '09-timeline',
    '10-conclusion',
    'appendix-a',
    'appendix-b',
    'appendix-c',
    'appendix-d',
    'appendix-e',
    'appendix-f',
    'appendix-g',
    'appendix-h',
    'executive-brief',
    'policy-guide',
    'youth-and-broad-audiences-guide',
    'adaptive-facilitation-tools',
    'digital-feedback-dashboard'
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/spiritual/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/spiritual/${section}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/spiritual.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/spiritual.md`);
      } catch (e2) {
        console.error("Failed to load any content for spiritual framework");
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
