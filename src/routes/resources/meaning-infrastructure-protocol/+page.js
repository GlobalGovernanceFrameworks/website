// src/routes/resources/meaning-infrastructure-protocol/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  console.log('=== Meaning Infrastructure Protocol +page.js load function ===');
  console.log('URL pathname:', url.pathname);
  console.log('Current locale:', currentLocale);
  
  // Load protocol translations
  try {
    let cleanPath = url.pathname;
    
    console.log('Original pathname:', cleanPath);
    
    // Check if the pathname looks corrupted
    if (cleanPath.includes('/resources/meaning-infrastructure-protocol') && 
        (cleanPath.includes('diagnosis') || 
         cleanPath.includes('synthesis') ||
         cleanPath.includes('principles') ||
         cleanPath.includes('interventions') ||
         cleanPath.includes('governance') ||
         cleanPath.includes('safeguards'))) {
      
      console.log('⚠️ Detected corrupted pathname, correcting to base protocol path');
      cleanPath = '/resources/meaning-infrastructure-protocol';
    }
    
    console.log('Clean path for translations:', cleanPath);
    
    const loadedTranslations = await loadTranslations(currentLocale, cleanPath);
    console.log('loadTranslations returned:', Object.keys(loadedTranslations || {}));
  } catch (e) {
    console.error('Failed to load translations:', e);
  }
  
  // Safe check for print mode
  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.search ? url.searchParams.get('print') === 'true' : false;
      console.log('Print mode detected:', isPrintMode);
    } catch (e) {
      console.warn('Could not access URL search params:', e);
      isPrintMode = false;
    }
  }

  // Define sections to load - meaning infrastructure protocol sections in order
  const sections = [
    // Overview & Diagnosis
    'diagnosis',
    'synthesis',
    
    // Core Framework
    'principles',
    'interventions',
    
    // Governance & Integration
    'living-story',
    'governance',
    'indicators',
    
    // Safeguards & Limits
    'safeguards',
    'limits'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading meaning infrastructure protocol sections for locale:', currentLocale);
  
  // Try to load each section
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/protocols/${currentLocale}/meaning-infrastructure/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      console.warn(`Primary load failed for section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/protocols/en/meaning-infrastructure/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded section:', section, 'in English as fallback');
        
      } catch (fallbackError) {
        console.warn(`Could not load section ${section} in any language:`, fallbackError.message);
        
        // Create a safe placeholder for missing sections
        content[section] = {
          default: function MissingSection() {
            return {
              render: () => ({
                html: `<div class="missing-section-content">
                  <h2>Section "${section}" not found</h2>
                  <p>This content is still being developed.</p>
                </div>`,
                css: { code: '', map: null }
              })
            };
          }
        };
      }
    }
  }
  
  console.log('Total sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded sections:', Object.keys(content));
  
  // Validate that we have at least the diagnosis section
  if (!content.diagnosis) {
    console.error('Critical: Could not load diagnosis section');
    throw error(500, {
      message: 'Failed to load meaning infrastructure protocol content',
      details: 'The main diagnosis section could not be loaded'
    });
  }
  
  return {
    sections: content,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Additional metadata for meaning infrastructure protocol
    protocolType: 'meaning-infrastructure',
    totalSections: sections.length,
    overviewSections: 2, // diagnosis, synthesis
    coreSections: 2, // principles, interventions
    governanceSections: 3, // living-story, governance, indicators
    safeguardSections: 2, // safeguards, limits
    
    // Protocol-specific metadata
    protocolVersion: '1.0',
    isImplementationProtocol: true,
    targetAudience: ['baz-councils', 'community-facilitators', 'cultural-stewards', 'grief-workers', 'educators'],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/resources/meaning-infrastructure-protocol'
      },
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
