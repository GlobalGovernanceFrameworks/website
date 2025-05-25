// src/routes/framework/docs/implementation/biodiversity/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all biodiversity framework sections
  const sections = [
    // Initial files
    'index',
    'technical-guide-policymakers',
    'community-implementation-guide',
    'youth-engagement-leadership-guide',
    'corporate-transition-redemption-guide',
    'indigenous-data-sovereignty-guide',
    
    // Framework files in the correct order according to index.md
    '00-philosophical-preamble',
    '01-introduction-vision',
    '02-guiding-principles',
    '03-core-pillars',
    '04-governance-structure',
    '05-policy-mechanisms',
    '06-stakeholder-engagement',
    '07-financing-mechanisms',
    '08-implementation-roadmap',
    '09-metrics-success',
    '10-visualizations',
    '11-challenges-solutions',
    '12-implementation-tools',
    '13-reparations-protocol',
    '14-conclusion-call-to-action',
    
    // Appendices
    'appendix-a-synergy-esfmlg',
    'appendix-b-glossary',
    'appendix-c-tool-library',
    'appendix-d-moral-edge-cases',
    'appendix-e-political-economy',
    'appendix-f-feasibility-studies',
    'appendix-g-pilot-blueprints',
    'appendix-h-scenario-planning',
    'appendix-i-cooperation-protocols',
    'appendix-j-creative-outputs'
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/biodiversity/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/biodiversity/${section}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/biodiversity.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/biodiversity.md`);
      } catch (e2) {
        console.error("Failed to load any content for biodiversity framework");
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
