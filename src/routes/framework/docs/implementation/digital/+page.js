// src/routes/framework/docs/implementation/digital/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all digital framework sections
  const sections = [
    // Initial files
    'index',
    'technical-guide',
    'community-guide',
    'youth-guide',
    'digital-ethics-guide',
    'indigenous-guide',
    
    // Framework files in the correct order according to index.md
    'preamble',
    'introduction',
    'core-principles',
    'governance-structure',
    'key-components',
    'implementation-roadmap',
    'funding-mechanisms',
    'addressing-challenges',
    'operational-toolkits',
    'commons-in-practice-snapshot',
    'user-archetypes',
    'legal-interoperability',
    'metrics-for-success',
    'case-studies',
    'long-term-evolution-scenarios',
    'call-to-action',
    'appendix-a-pilot-onboarding',
    'appendix-b-visual-companion-toolkit',
    'appendix-c-corporate-participation-playbook',
    'appendix-d-digital-ethics-charter',
    'appendix-e-commons-glossary',
    'appendix-f-minimal-viable-node-quickstart',
    'appendix-g-field-test-logbook-template',
    'appendix-h-faq-for-tech-skeptical-leaders',
    'appendix-i-diplomatic-mini-deck',
    'appendix-j-historical-commons-context',
    'appendix-k-impact-assessment-framework',
    'epilogue'
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/digital/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/digital/${section}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/digital.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/digital.md`);
      } catch (e2) {
        console.error("Failed to load any content for digital framework");
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
