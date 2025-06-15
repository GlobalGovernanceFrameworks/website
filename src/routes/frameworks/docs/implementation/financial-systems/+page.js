// src/routes/frameworks/docs/implementation/financial-systems/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all financial-systems sections plus quick guides
  const sections = [
    'quick-guide',
    'quick-guide-medium',
    'quick-guide-youth',
    'index',
    '01-introduction',
    '02-core-principles',
    '03-structural-components',
    '04-implementation-approaches',
    '05-metrics-evaluation',
    '06-supporting-sections',
    '07-appendices'
  ];
  
  // Define tools to load
  const tools = [
    'hearts-toolkit',
    'transition-guide',
    'validator-training',
    'love-ledger-guide',
    'hearts-technical-spec',
    'translation-layer',
    'proof-of-care'
  ];
  
  // For backward compatibility 
  let legacyContent = null;
  
  // Try to load modular content first
  const content = {};
  const toolsContent = {};
  let isModular = false;
  
  try {
    // Try to load each section
    for (const section of sections) {
      try {
        // Try to load the current locale version
        content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/financial-systems/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/frameworks/en/implementation/financial-systems/${section}.md`);
          isModular = true;
        } catch (e2) {
          console.log(`Could not load section ${section} in any language`);
        }
      }
    }
    
    // Try to load each tool
    for (const tool of tools) {
      try {
        // Try to load the current locale version
        toolsContent[tool] = await import(`$lib/content/frameworks/${currentLocale}/tools/financial-systems/${tool}.md`);
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          toolsContent[tool] = await import(`$lib/content/frameworks/en/tools/financial-systems/${tool}.md`);
        } catch (e2) {
          console.log(`Could not load tool ${tool} in any language`);
        }
      }
    }
  } catch (e) {
    console.warn("Error loading modular content:", e);
  }
  
  // If modular content failed or isn't available, fall back to legacy single file
  if (!isModular) {
    try {
      legacyContent = await import(`$lib/content/frameworks/${currentLocale}/implementation/financial-systems.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/frameworks/en/implementation/financial-systems.md`);
      } catch (e2) {
        console.error("Failed to load any content for financial-systems framework");
      }
    }
  }
  
  return {
    sections: content,
    tools: toolsContent,
    component: legacyContent?.default,
    isModular,
    isPrintMode
  };
}
