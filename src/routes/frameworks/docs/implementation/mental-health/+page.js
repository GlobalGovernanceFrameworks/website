// src/routes/frameworks/docs/implementation/mental-health/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - mental health framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    
    // Core framework sections (01-15)
    '01-vision-principles',
    '02-governance-structures',
    '03-legal-policy',
    '04-financing-resources',
    '05-service-delivery',
    '06-monitoring-accountability',
    '07-crisis-response',
    '08-innovation-research',
    '09-cross-cutting-themes',
    '10-implementation-strategy',
    '11-political-strategy',
    '12-risk-management',
    '13-technology-implementation',
    '14-change-management',
    '15-conclusion',
    
    // Essential guide
    'mental-health-framework-essentials'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/mental-health/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/mental-health/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/mental-health.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/mental-health.md`);
      } catch (e2) {
        console.error("Failed to load any content for mental health framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode,
    // Additional metadata for mental health framework
    frameworkType: 'mental-health',
    totalSections: sections.length,
    coreFrameworkSections: 15, // 01-15
    hasEssentialGuide: true,
    hasPreamble: false,
    hasConclusion: true
  };
}
