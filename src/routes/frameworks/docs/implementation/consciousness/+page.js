// src/routes/frameworks/docs/implementation/consciousness/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);

  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set()
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - consciousness framework sections in correct order
  const sections = [
    // Entry point and lite version
    'index',
    'consciousness-accord-lite',
    
    // Core framework sections (00-15)
    '00-manifesto',
    '01-governance-structure',
    '02-personal-transformation',
    '03-collective-consciousness',
    '04-systemic-integration',
    '05-spiral-dynamics',
    '06-economic-realignment',
    '07-community-engagement',
    '08-crisis-response',
    '09-metrics-accountability',
    '10-digital-platforms',
    '11-ethical-ai-governance',
    '12-cross-cultural-translation',
    '13-implementation-roadmap',
    '14-visual-architecture-map',
    '15-conclusion',
    
    // Supplementary materials
    'executive-core-overview',
    'youth-governance-comic'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/consciousness/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/consciousness/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/consciousness.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/consciousness.md`);
      } catch (e2) {
        console.error("Failed to load any content for consciousness framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback), // Add this line
    // Additional metadata for consciousness framework
    frameworkType: 'consciousness',
    totalSections: sections.length,
    coreFrameworkSections: 16, // 00-15
    hasSupplementaryMaterials: true
  };
}
