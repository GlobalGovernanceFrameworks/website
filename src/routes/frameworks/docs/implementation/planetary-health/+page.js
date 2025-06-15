// src/routes/frameworks/docs/implementation/planetary-health/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - planetary health framework sections in correct order
  const sections = [
    // Entry point and lite version
    'index',
    'planetary-health-accord-lite',
    
    // Core framework sections (00-17)
    '00-manifesto',
    '01-governance-structure',
    '02-technology-data-infrastructure',
    '03-financing-mechanisms',
    '04-medical-innovation-access',
    '05-pandemic-climate-preparedness',
    '06-community-centered-healthcare',
    '07-transparency-anti-corruption',
    '08-health-literacy',
    '09-borderless-health-rights',
    '10-ethical-technology-governance',
    '11-implementation-roadmap',
    '12-health-conflict-zones',
    '13-global-knowledge-commons',
    '14-visual-architecture-map',
    '15-cross-cutting-mechanisms',
    '16-spiritual-framing',
    '17-conclusion',
    
    // Supplementary materials
    'childrens-health-rights-comic'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/planetary-health/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/planetary-health/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/planetary-health.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/planetary-health.md`);
      } catch (e2) {
        console.error("Failed to load any content for planetary health framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    // Additional metadata for planetary health framework
    frameworkType: 'planetary-health',
    totalSections: sections.length,
    coreFrameworkSections: 18, // 00-17
    hasSupplementaryMaterials: true
  };
}