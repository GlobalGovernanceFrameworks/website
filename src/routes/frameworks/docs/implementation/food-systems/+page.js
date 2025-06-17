// src/routes/frameworks/docs/implementation/food-systems/+page.js
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
  
  // Define sections to load - include all food-systems sections plus quick guides
  const sections = [
    'quick-guide',
    'quick-guide-medium',
    'quick-guide-youth',
    'index',
    '01-introduction',
    '02-definitions',
    '03-glossary',
    '04-theory-of-change',
    '05-stakeholder-engagement',
    '06-core-principles',
    '07-strategic-objectives',
    '08-implementation-mechanisms',
    '09-systemic-leverage-points',
    '10-regional-customization',
    '11-risk-management',
    '12-timeline-milestones',
    '13-communication-advocacy',
    '14-visual-appendix',
    '15-conclusion'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/food-systems/${section}.md`);
        isModular = true;
} catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/food-systems/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/food-systems.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/food-systems.md`);
      } catch (e2) {
        console.error("Failed to load any content for food-systems framework");
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
