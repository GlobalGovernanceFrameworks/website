// src/routes/frameworks/docs/implementation/aging/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set();

  // Define sections to load - aging framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'preamble',
    'executive-summary',
    
    // Core framework sections (01-09)
    '01-economic-security',
    '02-meaningful-occupation',
    '03-healthcare-climate',
    '04-social-inclusion',
    '05-nested-governance',
    '06-legal-ethical',
    '07-implementation-roadmap',
    '08-monitoring-adaptive',
    '09-call-to-action',
    
    // Supplementary materials
    '10-appendices',
    'aging-framework-essentials'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/aging/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/aging/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/aging.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/aging.md`);
      } catch (e2) {
        console.error("Failed to load any content for aging framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    // Additional metadata for aging framework
    frameworkType: 'aging',
    totalSections: sections.length,
    coreFrameworkSections: 9, // 01-09
    hasSupplementaryMaterials: true
  };
}
