// src/routes/frameworks/docs/implementation/digital/+page.js
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
    '01-preamble',
    '02-core-principles',
    '03-governance-structure',
    '04-key-components',
    '05-implementation-roadmap',
    '06-monitoring-evaluation',
    '07-case-studies',
    '08-future-potential',
    '09-tools-resources',
    '10-call-to-action',
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
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/digital/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/digital/${section}.md`);
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
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/digital.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/digital.md`);
      } catch (e2) {
        console.error("Failed to load any content for digital framework");
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
