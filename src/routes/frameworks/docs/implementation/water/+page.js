// src/routes/frameworks/docs/implementation/water/+page.js
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
  
  // Define sections to load - water framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'theory-of-change',
    
    // Core framework sections (01-11)
    '01-guiding-principles',
    '02-institutional-policy-framework',
    '03-financing-investment',
    '04-service-delivery-infrastructure',
    '05-monitoring-accountability',
    '06-climate-environmental-integration',
    '07-innovation-knowledge-sharing',
    '08-crisis-response-adaptation',
    '09-social-behavioral-change',
    '10-global-partnerships',
    '11-ethical-systems-framing',
    
    // Implementation and supplementary materials
    'implementation-roadmap',
    'regional-implementation-blueprints',
    'visual-accessibility-aids',
    'glossary',
    
    // Accessible formats and guides
    'executive-summary',
    'quick-implementation-guide',
    'youth-leadership-guide'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/water/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/water/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/water.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/water.md`);
      } catch (e2) {
        console.error("Failed to load any content for water framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    // Additional metadata for water framework
    frameworkType: 'water',
    totalSections: sections.length,
    coreFrameworkSections: 11, // 01-11
    hasSupplementaryMaterials: true,
    hasImplementationGuides: true,
    hasAccessibilityAids: true
  };
}
