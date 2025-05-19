// src/routes/framework/docs/implementation/justice/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all justice sections plus guides
  const sections = [
    'index',
    '01-introduction',
    '02-governance-structure',
    '03-legal-framework',
    '04-implementation-mechanisms',
    '05-digital-justice-innovation',
    '06-monitoring-accountability',
    '07-stakeholder-engagement',
    '08-challenges-mitigation',
    '09-timeline-milestones',
    '10-conclusion',
    '11-appendices',
    'justice-framework-lite-guide',
    'youth-justice-guide'
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/justice/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/justice/${section}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/justice.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/justice.md`);
      } catch (e2) {
        console.error("Failed to load any content for justice framework");
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
