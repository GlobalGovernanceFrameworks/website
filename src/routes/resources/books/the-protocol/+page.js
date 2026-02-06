// src/routes/resources/books/the-protocol/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  console.log('=== The Protocol Book +page.js load function ===');
  console.log('URL pathname:', url.pathname);
  console.log('Current locale:', currentLocale);
  
  // Load book translations for navigation and page-specific translations
  try {
    let cleanPath = url.pathname;
    
    console.log('Original pathname:', cleanPath);
    
    // Check if the pathname looks corrupted (contains chapter/section names instead of the base path)
    if (cleanPath.includes('/resources/books/') && 
        (cleanPath.includes('introduction') ||
         cleanPath.includes('chapter-') ||
         cleanPath.includes('appendix-') ||
         cleanPath.includes('conclusion') ||
         cleanPath.includes('glossary') ||
         cleanPath.includes('further-reading') ||
         cleanPath.includes('about'))) {
      
      console.log('⚠️ Detected corrupted pathname, correcting to base book path');
      cleanPath = '/resources/books/the-protocol';
    }
    
    console.log('Clean path for translations:', cleanPath);
    
    // Load translations for this specific page path
    console.log('About to call loadTranslations with:', currentLocale, cleanPath);
    const loadedTranslations = await loadTranslations(currentLocale, cleanPath);
    console.log('loadTranslations returned:', Object.keys(loadedTranslations || {}));
    console.log('Loaded translations for path:', cleanPath, 'with locale:', currentLocale);
  } catch (e) {
    console.error('Failed to load translations:', e);
    console.error('Error details:', e.stack);
  }
  
  // Safe check for print mode that works during prerendering
  // Only access url.search on the client side
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

  // Define book sections to load in correct reading order
  const sections = [
    // Front matter
    'book-cover',
    'table-of-contents',
    'introduction',
    
    // Part I: Architecture
    'chapter-01',  // Fractality (As Above, So Below)
    'chapter-02',  // Polycentrism (The Mesh, Not the Pyramid)
    
    // Part II: Metabolism
    'chapter-03',  // Dual-Currency (The Heart and the Lung)
    'chapter-04',  // Ecological Intelligence (The Dashboard)
    'chapter-05',  // AUBI (The Metabolic Baseline)
    
    // Part III: Authority
    'chapter-06',  // Subsidiarity (Power to the Edge)
    'chapter-07',  // Guardianship (From Object to Subject)
    
    // Part IV: Evolution
    'chapter-08',  // Adaptive Governance (The Immune System)
    'chapter-09',  // The Transition (From Here to There)
    
    // Back matter
    'appendix-a',  // Implementation Pathways
    'appendix-b',  // Troubleshooting Guide
    'appendix-c',  // The Glossary
    'appendix-d',  // Further Reading
    'conclusion',
    'about'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading book sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/books/${currentLocale}/the-protocol/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      console.warn(`Primary load failed for section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/books/en/the-protocol/${section}.md`);
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
  
  // Validate that we have at least the introduction section
  if (!content.introduction) {
    console.error('Critical: Could not load introduction section');
    throw error(500, {
      message: 'Failed to load book content',
      details: 'The main introduction section could not be loaded'
    });
  }
  
  return {
    sections: content,
    // Always use modular approach
    isModular: true,
    isPrintMode, // This will be false during prerendering, true/false on client
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Book-specific metadata
    bookType: 'the-protocol',
    totalSections: sections.length,
    frontMatterSections: 2, // table-of-contents, introduction
    chapterSections: 9, // chapter-01 through chapter-09
    backMatterSections: 5, // appendix-a through appendix-d, conclusion, about
    hasTableOfContents: true,
    
    // Book-specific metadata
    bookVersion: '1.0',
    isbn: null, // Add when available
    publicationYear: 2026,
    publicationDate: 'February 2026',
    totalChapters: 9,
    hasAppendices: true,
    appendixCount: 4,
    
    // Content organization
    parts: {
      'Part I: Architecture': ['chapter-01', 'chapter-02'],
      'Part II: Metabolism': ['chapter-03', 'chapter-04', 'chapter-05'],
      'Part III: Authority': ['chapter-06', 'chapter-07'],
      'Part IV: Evolution': ['chapter-08', 'chapter-09']
    },
    
    // Chapter metadata for navigation
    chapterTitles: {
      'chapter-01': 'Fractality (As Above, So Below)',
      'chapter-02': 'Polycentrism (The Mesh, Not the Pyramid)',
      'chapter-03': 'Dual-Currency (The Heart and the Lung)',
      'chapter-04': 'Ecological Intelligence (The Dashboard)',
      'chapter-05': 'AUBI (The Metabolic Baseline)',
      'chapter-06': 'Subsidiarity (Power to the Edge)',
      'chapter-07': 'Guardianship (From Object to Subject)',
      'chapter-08': 'Adaptive Governance (The Immune System)',
      'chapter-09': 'The Transition (From Here to There)'
    },
    
    // Appendix metadata
    appendixTitles: {
      'appendix-a': 'Implementation Pathways',
      'appendix-b': 'Troubleshooting Guide',
      'appendix-c': 'The Glossary',
      'appendix-d': 'Further Reading'
    },
    
    // Reading metadata
    estimatedReadingTime: '4-6 hours',
    complexity: 'intermediate',
    audience: 'policymakers, community organizers, systems thinkers, Indigenous communities, researchers',
    
    // Book description
    subtitle: 'A Pocket Guide to Planetary Governance',
    description: 'A comprehensive technical manual for the Global Governance Frameworks (GGF) - 50+ interconnected protocols for regenerative planetary governance spanning constitutional reform, economics, ecology, and crisis management.',
    
    // Keywords for SEO
    keywords: [
      'planetary governance',
      'bioregional autonomy',
      'regenerative economics',
      'rights of nature',
      'polycentric governance',
      'complementary currency',
      'ecological intelligence',
      'adaptive governance',
      'Indigenous sovereignty',
      'systems thinking'
    ],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/resources/books/the-protocol'
      },
      // Only log search params on client side
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
