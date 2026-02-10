// src/routes/frameworks/polycentric-governance/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

const DEBUG_FRAMEWORK_LOADING = false; // Set to true only when debugging

export async function load({ depends, url, params }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  if (DEBUG_FRAMEWORK_LOADING) console.log('=== Polycentric Governance +page.js load function ===');
  if (DEBUG_FRAMEWORK_LOADING) console.log('URL pathname:', url.pathname);
  if (DEBUG_FRAMEWORK_LOADING) console.log('Current locale:', currentLocale);
  
  // Load framework translations for navigation and page-specific translations
  try {
    let cleanPath = url.pathname;
    
    if (DEBUG_FRAMEWORK_LOADING) console.log('Original pathname:', cleanPath);
    
    // Check if the pathname looks corrupted (contains section names instead of the base path)
    if (cleanPath.includes('/frameworks/') && 
        (cleanPath.includes('introduction') ||
         cleanPath.includes('principles') ||
         cleanPath.includes('architecture') ||
         cleanPath.includes('power-distribution') ||
         cleanPath.includes('coordination') ||
         cleanPath.includes('implementation') ||
         cleanPath.includes('evaluation') ||
         cleanPath.includes('examples') ||
         cleanPath.includes('integration') ||
         cleanPath.includes('at-a-glance') ||
         cleanPath.includes('appendix'))) {
      
      if (DEBUG_FRAMEWORK_LOADING) console.log('⚠️ Detected corrupted pathname, correcting to base framework path');
      cleanPath = '/frameworks/polycentric-governance';
    }
    
    if (DEBUG_FRAMEWORK_LOADING) console.log('Clean path for translations:', cleanPath);
    
    // Load translations for this specific page path
    if (DEBUG_FRAMEWORK_LOADING) console.log('About to call loadTranslations with:', currentLocale, cleanPath);
    const loadedTranslations = await loadTranslations(currentLocale, cleanPath);
    if (DEBUG_FRAMEWORK_LOADING) console.log('loadTranslations returned:', Object.keys(loadedTranslations || {}));
    if (DEBUG_FRAMEWORK_LOADING) console.log('Loaded translations for path:', cleanPath, 'with locale:', currentLocale);
  } catch (e) {
    console.error('Failed to load translations:', e);
    console.error('Error details:', e.stack);
  }
  
  // Safe check for print mode that works during prerendering
  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.search ? url.searchParams.get('print') === 'true' : false;
      if (DEBUG_FRAMEWORK_LOADING) console.log('Print mode detected:', isPrintMode);
    } catch (e) {
      if (DEBUG_FRAMEWORK_LOADING) console.warn('Could not access URL search params:', e);
      isPrintMode = false;
    }
  }

  // Define sections to load - polycentric governance framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'at-a-glance',
    
    // Core framework sections
    'introduction',
    'principles',
    'architecture',
    'power-distribution',
    'coordination',
    'implementation',
    'evaluation',
    'examples',
    'integration',
    
    // Supplementary materials
    'appendix-a'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  if (DEBUG_FRAMEWORK_LOADING) console.log('Loading polycentric governance sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/polycentric-governance/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      if (DEBUG_FRAMEWORK_LOADING) console.log('Successfully loaded section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      if (DEBUG_FRAMEWORK_LOADING) console.warn(`Primary load failed for section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/polycentric-governance/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        if (DEBUG_FRAMEWORK_LOADING) console.log('Loaded section:', section, 'in English as fallback');
        
      } catch (fallbackError) {
        if (DEBUG_FRAMEWORK_LOADING) console.warn(`Could not load section ${section} in any language:`, fallbackError.message);
        
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
  
  if (DEBUG_FRAMEWORK_LOADING) console.log('Total sections loaded:', loadedSections, 'out of', sections.length);
  if (DEBUG_FRAMEWORK_LOADING) console.log('Loaded sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load index section');
    throw error(500, {
      message: 'Failed to load polycentric governance content',
      details: 'The main index section could not be loaded'
    });
  }
  
  return {
    sections: content,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Framework metadata
    frameworkType: 'polycentric-governance',
    totalSections: sections.length,
    coreFrameworkSections: 9, // introduction through integration
    foundationSections: 2, // index and at-a-glance
    appendixSections: 1, // appendix-a
    
    // Polycentric Governance-specific metadata
    frameworkVersion: '0.5',
    tier: 1, // Core Operating System
    emoji: '🕸️',
    status: 'ready',
    coreRole: 'structural-architecture',
    
    // Core principles count
    principlesCount: 8,
    principles: [
      'multiple-autonomous-centers',
      'voluntary-cooperation',
      'subsidiarity-by-default',
      'mutual-adjustment',
      'shared-protocols',
      'nested-governance',
      'experimental-diversity',
      'evolutionary-adaptation'
    ],
    
    // Architecture components
    architectureComponents: 6,
    components: [
      'governance-centers',
      'coordination-mechanisms',
      'shared-protocols',
      'information-systems',
      'power-balancing',
      'adaptive-capacity'
    ],
    
    // Related frameworks
    relatedFrameworks: [
      'meta-governance',
      'emergent-governance-protocol',
      'treaty-for-our-only-home',
      'indigenous-governance'
    ],
    
    // Implementation characteristics
    implementationApproaches: [
      'bottom-up-emergence',
      'institutional-transformation',
      'hybrid-development',
      'digital-enablement'
    ],
    
    // Real-world examples included
    exampleCategories: [
      'internet-governance',
      'swiss-federalism',
      'indigenous-confederacies',
      'watershed-commons',
      'economic-cooperation',
      'urban-innovation',
      'platform-cooperatives',
      'climate-coordination'
    ],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/frameworks/polycentric-governance'
      },
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
