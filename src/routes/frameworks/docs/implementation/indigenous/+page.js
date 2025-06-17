// src/routes/frameworks/docs/implementation/indigenous/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);

  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set();
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - indigenous framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    '00-preamble',
    
    // Core framework sections (01-10)
    '01-core-principles',
    '02-structural-components',
    '03-implementation-timeline',
    '04-key-mechanisms',
    '05-expected-outcomes',
    '06-interface-existing-systems',
    '07-pathways-broader-engagement',
    '08-documentation-risk-assessment',
    '09-system-map-visual',
    '10-glossary-references',
    
    // Essential guide
    'indigenous-framework-essentials'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/indigenous/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/indigenous/${section}.md`);
          isModular = true;
          // Track that this section is using English fallback
          if (currentLocale !== 'en') {
            sectionsUsingEnglishFallback.add(section);
          }
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/indigenous.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/indigenous.md`);
      } catch (e2) {
        console.error("Failed to load any content for indigenous framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    // Additional metadata for indigenous framework
    frameworkType: 'indigenous',
    totalSections: sections.length,
    coreFrameworkSections: 10, // 01-10 (preamble is 00)
    hasEssentialGuide: true,
    hasPreamble: true
  };
}
