// src/routes/frameworks/docs/implementation/treaty-for-our-only-home/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - treaty framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'at-a-glance',
    'executive-summary-for-the-skeptic',
    
    // Core treaty sections (01-06)
    '01-introduction',
    '02-core-principles',
    '03-five-pillars',
    '04-implementation-strategies',
    '05-monitoring-evaluation',
    '06-conclusion',
    
    // Supplementary materials (07-08)
    '07-faq-and-challenges',
    '08-glossary',

    // Communication resources
    'social-media-templates'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/treaty-for-our-only-home/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/treaty-for-our-only-home/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/treaty-for-our-only-home.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/treaty-for-our-only-home.md`);
      } catch (e2) {
        console.error("Failed to load any content for treaty-for-our-only-home framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    // Additional metadata for treaty framework
    frameworkType: 'treaty-for-our-only-home',
    totalSections: sections.length,
    coreFrameworkSections: 6, // 01-06
    hasSupplementaryMaterials: true,
    hasExecutiveSummary: true,
    // Treaty-specific metadata
    treatyVersion: '1.0',
    isLandmarkDocument: true,
    implementationPhases: 3, // Foundation (2025-2030), Scaling (2030-2040), Consolidation (2040+)
    keystoneReforms: 5 // UNSC veto override, ecocide law, carbon tax, global citizens' initiative, debt justice
  };
}
