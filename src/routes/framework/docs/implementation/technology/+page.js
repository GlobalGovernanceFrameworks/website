// src/routes/framework/docs/implementation/technology/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  const isPrintMode = url.searchParams.get('print') === 'true';
  
  // Define sections to load based on the index
  const sections = [
    'index',              // Introduction
    'context',            // Context and Scope
    'governance-model',   // Governance Model Components
    'implementation',     // Implementation Roadmap
    'tools',              // Tools and Technologies
    'operational',        // Operational Guidelines
    'emerging',           // Emerging Technology Anticipation
    'evaluation',         // Evaluation and Metrics
    'case-studies',       // Case Studies and Examples
    'appendices'          // Appendices
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/technology/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/technology/${section}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/technology.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/technology.md`);
      } catch (e2) {
        console.error("Failed to load any content for technology governance framework");
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
