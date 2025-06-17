// src/routes/frameworks/docs/implementation/animal-welfare/+page.js
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
  
  // Define sections to load - animal welfare framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    
    // Core framework sections (01-08)
    '01-introduction',
    '02-core-principles',
    '03-structural-components',
    '04-implementation-approaches',
    '05-metrics-evaluation',
    '06-cultural-justice',
    '07-environmental-integration',
    '08-appendices',
    
    // Essential guide and executive summary
    'global-guardian-framework-essentials',
    'executive-summary'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/animal-welfare/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/animal-welfare/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/animal-welfare.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/animal-welfare.md`);
      } catch (e2) {
        console.error("Failed to load any content for animal welfare framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    // Additional metadata for animal welfare framework
    frameworkType: 'animal-welfare',
    totalSections: sections.length,
    coreFrameworkSections: 8, // 01-08
    hasEssentialGuide: true,
    hasExecutiveSummary: true,
    hasSupplementaryMaterials: true
  };
}
