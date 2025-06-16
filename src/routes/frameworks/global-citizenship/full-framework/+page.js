// src/routes/frameworks/global-citizenship/full-framework/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - global citizenship framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'global-citizenship-2-page-overview',
    
    // Core framework sections (01-18)
    '01-foundational-values',
    '02-meaning-practice',
    '03-development-path',
    '04-tangible-benefits',
    '05-overcoming-barriers',
    '06-intergenerational-perspectives',
    '07-technology-ethics',
    '08-measuring-impact',
    '09-inclusive-pathways',
    '10-professional-integration',
    '11-crisis-response',
    '12-ai-digital-technologies',
    '13-self-assessment-tools',
    '14-economic-foundations',
    '15-future-proofing',
    '16-advanced-implementation',
    '17-expanding-boundaries',
    '18-beyond-human-centered'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/global-citizenship-full/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/global-citizenship-full/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/global-citizenship.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/global-citizenship.md`);
      } catch (e2) {
        console.error("Failed to load any content for global citizenship framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    // Additional metadata for global citizenship framework
    frameworkType: 'global-citizenship',
    totalSections: sections.length,
    coreFrameworkSections: 18, // 01-18
    hasSupplementaryMaterials: true,
    hasOverview: true
  };
}
