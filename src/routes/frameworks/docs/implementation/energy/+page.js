// src/routes/frameworks/docs/implementation/energy/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all energy framework sections plus guides
  const sections = [
    'climate-energy-technical-guide',
    'climate-energy-stakeholder-guide',
    'climate-energy-action-guide',
    'index',
    '01-introduction',
    '02-guiding-principles',
    '03-governance-structure',
    '04-core-pillars',
    '05-policy-mechanisms',
    '06-stakeholder-engagement',
    '07-financing-the-framework',
    '08-implementation-roadmap',
    '09-metrics-for-success',
    '10-challenges-and-solutions',
    '11-implementation-tools',
    '12-conclusion',
    'appendix-a',
    'appendix-b'
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/energy/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/energy/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/energy.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/energy.md`);
      } catch (e2) {
        console.error("Failed to load any content for energy framework");
      }
    }
  }
  
  return {
    sections: content,
    component: legacyContent?.default,
    isModular,
    isPrintMode
  };
}
