// src/routes/framework/docs/implementation/disaster/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

// Remove all URL handling from server-side
export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
 
  // Define all sections of the framework
  const sections = [
    'index',
    'principles',
    'components',
    'approaches',
    'engagement',
    'barriers',
    'resources',
    'monitoring',
    'governance',
    'scalability',
    'conclusion',
    'annexes'
  ];
  
  // Load all sections
  const content = {};
  
  try {
    for (const section of sections) {
      try {
        // Try to load the current locale version
        content[section] = await import(`$lib/content/framework/${currentLocale}/implementation/disaster/${section}.md`);
      } catch (e) {
        // Fall back to English if translation isn't available
        content[section] = await import(`$lib/content/framework/en/implementation/disaster/${section}.md`);
      }
    }
  } catch (e) {
    console.error("Error loading framework sections:", e);
    
    // Fallback to single file if modular approach fails
    try {
      const fallbackContent = await import(`$lib/content/framework/${currentLocale}/implementation/disaster.md`);
      return {
        component: fallbackContent.default,
        isLegacy: true
      };
    } catch (fallbackError) {
      console.error("Fallback loading also failed:", fallbackError);
      throw fallbackError;
    }
  }
  
  return {
    sections: content,
    isModular: true
  };
}
