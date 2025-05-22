// src/routes/framework/docs/implementation/environmental-stewardship/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - following the numbered structure from the Environmental Stewardship Framework
  const sections = [
    'index',
    'one-page-essence',
    'first-100-days-playbook',
    '01-introduction',
    '02-guiding-principles',
    '03-governance-structure',
    '04-core-pillars',
    '05-policy-mechanisms',
    '06-stakeholder-engagement',
    '07-financing-mechanisms',
    '08-implementation-roadmap',
    '09-metrics-for-success',
    '10-visualizations',
    '11-challenges-and-solutions',
    '12-implementation-tools',
    '13-reparations-protocol',
    '14-conclusion',
    '15-appendices'
  ];
  
  // Define tools to load for environmental stewardship
  const tools = [
    'sacred-seed-kit',
    'economic-integration-seed-kit',
    'ai-consciousness-assessment-framework',
    'dynamic-rights-spectrum-guide',
    'ecosystem-health-indicators',
    'nexus-impact-assessment-tool',
    'community-well-being-index',
    'reparations-protocol',
    'stakeholder-engagement-charter',
    'rights-recognition-index',
    'crisis-response-protocol',
    'troubleshooting-guide',
    'train-the-trainer-model',
    'open-source-guidelines',
    'counter-messaging-guide'
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
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/environmental-stewardship/${section}.md`);
        isModular = true;
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          content[section] = await import(`$lib/content/framework/en/implementation/environmental-stewardship/${section}.md`);
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
        toolsContent[tool] = await import(`$lib/content/framework/${currentLocale}/tools/environmental-stewardship/${tool}.md`);
      } catch (e) {
        // Fall back to English if translation isn't available
        try {
          toolsContent[tool] = await import(`$lib/content/framework/en/tools/environmental-stewardship/${tool}.md`);
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
      legacyContent = await import(`$lib/content/framework/${currentLocale}/implementation/environmental-stewardship.md`);
    } catch (e) {
      try {
        legacyContent = await import(`$lib/content/framework/en/implementation/environmental-stewardship.md`);
      } catch (e2) {
        console.error("Failed to load any content for environmental-stewardship framework");
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
