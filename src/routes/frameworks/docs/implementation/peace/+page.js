// src/routes/frameworks/docs/implementation/peace/+page.js
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
  
  // Define sections to load - include all peace framework sections plus guides
  const sections = [
    'preamble',
    'core-principles',
    'local-implementation',
    'indigenous-integration',
    'regional-implementation',
    'global-implementation',
    'digital-infrastructure',
    'ai-ethics',
    'emerging-technologies',
    'non-state-actors',
    'military-transformation',
    'whistleblower-protection',
    'structural-prevention',
    'climate-resource',
    'transitional-justice',
    'mental-health',
    'developmental-value-systems',
    'educational-cultural-infrastructure',
    'peace-financing',
    'peace-business-integration',
    'media-information',
    'context-specific-roadmaps',
    'implementation-timeline',
    'implementation-challenges',
    'visualizations',
    'measuring-success',
    'cross-domain-integration',
    'conclusion',
    'index',
    'quick-guide',
    'technical-guide-policymakers',
    'community-peace-guide',
    'youth-peace-action-guide',
    'digital-peace-ethics-guide'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/peace/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/peace/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/peace.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/peace.md`);
      } catch (e2) {
        console.error("Failed to load any content for peace framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback)
  };
}
