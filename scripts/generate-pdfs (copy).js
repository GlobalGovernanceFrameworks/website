// scripts/generate-pdfs.js
//
// Example run: node scripts/generate-pdfs.js --framework=economic
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'node:util';

// Parse command line arguments
const options = {
  framework: { type: 'string' }
};

const { values } = parseArgs({ 
  options, 
  strict: false,
  allowPositionals: true
});

const targetFramework = values.framework;

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'http://localhost:5173';
const BASE_OUTPUT_DIR = path.join(__dirname, '..', 'static/downloads');

// Define languages
const LANGUAGES = ['en', 'sv'];

// Define documents per language
const documents = [
  { path: '/frameworks/docs/principles', filename: 'Core-Principles.pdf', titleKey: 'Core Principles', format: 'single' },
  { path: '/frameworks/docs/implementation', filename: 'Implementation-Guidelines.pdf', titleKey: 'Implementation Guidelines', format: 'single' },
  { path: '/frameworks/docs/case-studies', filename: 'Case-Studies.pdf', titleKey: 'Case Studies', format: 'single' },
  { path: '/frameworks/docs/resources', filename: 'Resources.pdf', titleKey: 'Resources', format: 'single' },

  // Global Citizenship Frameworks
  { path: '/frameworks/global-citizenship/full-framework', filename: 'Global-Citizenship.pdf', titleKey: 'Global Citizenship', format: 'single' },
  { path: '/frameworks/global-citizenship/4-page-overview', filename: 'Global-Citizenship-4-page-overview.pdf', titleKey: 'Global Citizenship 4-page summary', format: 'single' },

  // Tiered Implementation Frameworks
  { path: '/frameworks/docs/implementation/tier-1', filename: 'Tier-1-Urgent-Stability.pdf', titleKey: 'Tier 1 Overview', format: 'single' },
  { path: '/frameworks/docs/implementation/tier-2', filename: 'Tier-2-Long-Term-Thriving.pdf', titleKey: 'Tier 2 Overview', format: 'single' },
  { path: '/frameworks/docs/implementation/tier-3', filename: 'Tier-3-Equity-Culture.pdf', titleKey: 'Tier 3 Overview', format: 'single' },
  { path: '/frameworks/docs/implementation/tier-4', filename: 'Tier-4-Visionary-Meta.pdf', titleKey: 'Tier 4 Overview', format: 'single' },

  // Individual Implementation Domains (alphabetical)
  { path: '/frameworks/docs/implementation/biodiversity', filename: 'Biodiversity-Governance.pdf', titleKey: 'Biodiversity Governance', format: 'modular' },
  { path: '/frameworks/docs/implementation/energy', filename: 'Climate-Energy-Governance.pdf', titleKey: 'Climate & Energy Governance', format: 'single' },
  { path: '/frameworks/docs/implementation/consciousness', filename: 'Consciousness-Inner-Development.pdf', titleKey: 'Consciousness & Inner Development', format: 'modular' },
  { path: '/frameworks/docs/implementation/culture', filename: 'Cultural-Heritage.pdf', titleKey: 'Cultural Heritage Preservation', format: 'modular' },
  { path: '/frameworks/docs/implementation/digital', filename: 'Digital-Commons-Framework.pdf', titleKey: 'Digital Commons', format: 'modular' },
  { path: '/frameworks/docs/implementation/disaster', filename: 'Disaster-Resilience.pdf', titleKey: 'Disaster Risk Reduction & Resilience', format: 'modular' },
  { path: '/frameworks/docs/implementation/economic', filename: 'Economic-Integration.pdf', titleKey: 'Economic Integration', format: 'single' },
  { path: '/frameworks/docs/implementation/education', filename: 'Educational-Systems.pdf', titleKey: 'Educational Systems', format: 'modular' },
  { path: '/frameworks/docs/implementation/environment', filename: 'Environmental-Stewardship.pdf', titleKey: 'Environmental Stewardship', format: 'single' },
  { path: '/frameworks/docs/implementation/ethics', filename: 'Global-Ethics-Rights.pdf', titleKey: 'Global Ethics & Human Rights', format: 'single' },
  { path: '/frameworks/docs/implementation/finance', filename: 'Financial-Systems.pdf', titleKey: 'Financial Systems', format: 'modular' },
  { path: '/frameworks/docs/implementation/food-systems', filename: 'Food-Agriculture.pdf', titleKey: 'Food Systems & Agriculture', format: 'modular' },
  { path: '/frameworks/docs/implementation/healthcare', filename: 'Healthcare-Governance.pdf', titleKey: 'Healthcare Governance', format: 'modular' },
  { path: '/frameworks/docs/implementation/justice', filename: 'Justice-Systems.pdf', titleKey: 'Justice Systems', format: 'modular' },
  { path: '/frameworks/docs/implementation/labor', filename: 'Labor-Employment.pdf', titleKey: 'Labor & Employment Governance', format: 'modular' },
  { path: '/frameworks/docs/implementation/meta', filename: 'Meta-Governance.pdf', titleKey: 'Integrated Meta-Governance', format: 'single' },
  { path: '/frameworks/docs/implementation/methods-tools', filename: 'Methods-Tools.pdf', titleKey: 'Implementation Methods & Tools', format: 'single' },
  { path: '/frameworks/docs/implementation/migration', filename: 'Migration-Mobility.pdf', titleKey: 'Migration & Human Mobility', format: 'modular' },
  { path: '/frameworks/docs/implementation/oceans', filename: 'Oceans-Marine-Governance.pdf', titleKey: 'Oceans & Marine Governance', format: 'modular' },
  { path: '/frameworks/docs/implementation/peace', filename: 'Peace-Conflict-Resolution.pdf', titleKey: 'Peace & Conflict Resolution', format: 'single' },
  { path: '/frameworks/docs/implementation/rural', filename: 'Rural-Development.pdf', titleKey: 'Rural Development', format: 'modular' },
  { path: '/frameworks/docs/implementation/space', filename: 'Space-Governance.pdf', titleKey: 'Space Governance', format: 'modular' },
  { path: '/frameworks/docs/implementation/spiritual', filename: 'Spiritual-Dialogue.pdf', titleKey: 'Religious & Spiritual Dialogue', format: 'single' },
  { path: '/frameworks/docs/implementation/technology', filename: 'Technology-Governance.pdf', titleKey: 'Technology Governance', format: 'single' },
  { path: '/frameworks/docs/implementation/urban', filename: 'Urban-Community.pdf', titleKey: 'Urban & Community Development', format: 'modular' },
  { path: '/frameworks/docs/implementation/youth', filename: 'Youth-Governance.pdf', titleKey: 'Youth & Intergenerational Governance', format: 'modular' },
];

// Language-specific titles
const titles = {
  en: {
    'Core Principles': 'Global Governance Framework: Core Principles',
    'Implementation Guidelines': 'Global Governance Framework: Implementation Guidelines',
    'Case Studies': 'Global Governance Framework: Case Studies',
    'Resources': 'Global Governance Framework: Resources',
    'Global Citizenship': 'Global Governance Framework: Global Citizenship',
    'Global Citizenship 4-page summary': 'Global Governance Framework: Global Citizenship 4-Page Overview',
    'Tier 1 Overview': 'Global Governance Framework: Tier 1 – Urgent Global Stability & Justice',
    'Tier 2 Overview': 'Global Governance Framework: Tier 2 – Systems for Long-Term Thriving',
    'Tier 3 Overview': 'Global Governance Framework: Tier 3 – Equity, Culture & Future Generations',
    'Tier 4 Overview': 'Global Governance Framework: Tier 4 – Visionary & Meta Governance',
    'Economic Integration': 'Global Governance Framework: Economic Integration',
    'Environmental Stewardship': 'Global Governance Framework: Environmental Stewardship',
    'Peace & Conflict Resolution': 'Global Governance Framework: Peace & Conflict Resolution',
    'Technology Governance': 'Global Governance Framework: Technology Governance',
    'Educational Systems': 'Global Governance Framework: Educational Systems',
    'Healthcare Governance': 'Global Governance Framework: Healthcare Governance',
    'Cultural Heritage Preservation': 'Global Governance Framework: Cultural Heritage Preservation',
    'Migration & Human Mobility': 'Global Governance Framework: Migration & Human Mobility',
    'Food Systems & Agriculture': 'Global Governance Framework: Food Systems & Agriculture',
    'Urban & Community Development': 'Global Governance Framework: Urban & Community Development',
    'Digital Commons': 'Global Governance Framework: Digital Commons',
    'Financial Systems': 'Global Governance Framework: Financial Systems',
    'Justice Systems': 'Global Governance Framework: Justice Systems',
    'Climate & Energy Governance': 'Global Governance Framework: Climate & Energy Governance',
    'Oceans & Marine Governance': 'Global Governance Framework: Oceans & Marine Governance',
    'Labor & Employment Governance': 'Global Governance Framework: Labor & Employment Governance',
    'Biodiversity Governance': 'Global Governance Framework: Biodiversity Governance',
    'Youth & Intergenerational Governance': 'Global Governance Framework: Youth & Intergenerational Governance',
    'Global Ethics & Human Rights': 'Global Governance Framework: Global Ethics & Human Rights',
    'Space Governance': 'Global Governance Framework: Space Governance',
    'Consciousness & Inner Development': 'Global Governance Framework: Consciousness & Inner Development',
    'Integrated Meta-Governance': 'Global Governance Framework: Integrated Meta-Governance',
    'Implementation Methods & Tools': 'Global Governance Framework: Implementation Methods & Tools'
  },
  sv: {
    'Core Principles': 'Global Governance Framework: Kärnprinciper',
    'Implementation Guidelines': 'Global Governance Framework: Implementeringsriktlinjer',
    'Case Studies': 'Global Governance Framework: Fallstudier',
    'Resources': 'Global Governance Framework: Resurser',
    'Global Citizenship': 'Globalt Governance Framework: Globalt Medborgarskap',
    'Global Citizenship 4-page summary': 'Globalt Medborgarskap Ramverk: Globalt medborgarskap 4-sidors översikt',
    'Tier 1 Overview': 'Global Governance Framework: Nivå 1 – Global stabilitet och rättvisa',
    'Tier 2 Overview': 'Global Governance Framework: Nivå 2 – System för långsiktigt välmående',
    'Tier 3 Overview': 'Global Governance Framework: Nivå 3 – Jämlikhet, kultur & framtida generationer',
    'Tier 4 Overview': 'Global Governance Framework: Nivå 4 – Visionär och metagovernance',
    'Economic Integration': 'Global Governance Framework: Ekonomisk integration',
    'Environmental Stewardship': 'Global Governance Framework: Miljöförvaltning',
    'Peace & Conflict Resolution': 'Global Governance Framework: Fred & konfliktlösning',
    'Technology Governance': 'Global Governance Framework: Teknikstyrning',
    'Educational Systems': 'Global Governance Framework: Utbildningssystem',
    'Healthcare Governance': 'Global Governance Framework: Hälso- och sjukvårdsstyrning',
    'Cultural Heritage Preservation': 'Global Governance Framework: Bevarande av kulturarv',
    'Migration & Human Mobility': 'Global Governance Framework: Migration och mänsklig rörlighet',
    'Food Systems & Agriculture': 'Global Governance Framework: Livsmedelssystem och jordbruk',
    'Urban & Community Development': 'Global Governance Framework: Stads- och samhällsutveckling',
    'Digital Commons': 'Global Governance Framework: Digitala allmänningar',
    'Financial Systems': 'Global Governance Framework: Finansiella system',
    'Justice Systems': 'Global Governance Framework: Rättssystem',
    'Climate & Energy Governance': 'Global Governance Framework: Klimat- och energistyrning',
    'Oceans & Marine Governance': 'Global Governance Framework: Havsförvaltning och marina ekosystem',
    'Labor & Employment Governance': 'Global Governance Framework: Arbetsmarknad och sysselsättning',
    'Biodiversity Governance': 'Global Governance Framework: Biologisk mångfald',
    'Youth & Intergenerational Governance': 'Global Governance Framework: Ungdoms- och generationsstyrning',
    'Global Ethics & Human Rights': 'Global Governance Framework: Globala rättigheter och etik',
    'Space Governance': 'Global Governance Framework: Rymdförvaltning',
    'Consciousness & Inner Development': 'Global Governance Framework: Medvetande och inre utveckling',
    'Integrated Meta-Governance': 'Global Governance Framework: Integrerad metagovernance',
    'Implementation Methods & Tools': 'Global Governance Framework: Metoder och verktyg för implementering'
  }
};

async function generatePDF(url, outputPath, title, language, format = 'single') {
  console.log(`Generating PDF for ${url} in language: ${language}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set language in browser
    await page.setExtraHTTPHeaders({
      'Accept-Language': language
    });
    
    // Set viewport 
    await page.setViewport({ width: 1200, height: 1600 });
    
    // Add lang parameter to URL
    const urlWithLang = `${url}?lang=${language}`;
    
    // For modular frameworks, add a special parameter to trigger "print mode"
    const finalUrl = format === 'modular' 
      ? `${urlWithLang}&print=true` 
      : urlWithLang;
    
    // Navigate to the page
    await page.goto(finalUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Use delay instead of waitForTimeout
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Set locale via browser
    await page.evaluate((lang) => {
      localStorage.setItem('locale', lang);
      window.location.reload();
    }, language);
    
    // Wait for page to reload
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }).catch(e => {
      console.log('Navigation timeout or error, continuing anyway:', e.message);
    });
    
    // Another delay for content to render
    await page.goto(finalUrl, { waitUntil: 'networkidle0', timeout: 120000 }); // 2 minutes
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay
    
    try {
      // Wait for content to be fully rendered
      await page.waitForSelector('.content', { timeout: 10000 });
    } catch (error) {
      console.warn('Could not find .content selector, continuing anyway');
    }
    
    // For modular frameworks, we need to ensure all content is rendered
    if (format === 'modular') {
      // Execute script to show all sections for printing
      await page.evaluate(() => {
        // This assumes your page has a function to show all content for printing
        if (typeof window.showAllSectionsForPrint === 'function') {
          window.showAllSectionsForPrint();

          // Verify the sections are actually in the DOM
          const sectionElements = document.querySelectorAll('.section-content');
          console.log(`Found ${sectionElements.length} section elements in the DOM`);
          
          // Log the first few section IDs to verify
          const sectionIds = Array.from(sectionElements).map(el => el.id).slice(0, 5);
          console.log('First few section IDs:', sectionIds);
        } else {
          console.log('showAllSectionsForPrint function not found');
        }
      });
      
      // Wait a bit for all sections to render
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Add custom styles for PDF (same as before)
    await page.addStyleTag({
      content: `
        @page {
          margin: 1.5cm;
          size: A4;
        }
        
        /* Force ALL content to be visible */
        body * {
          visibility: visible !important;
          opacity: 1 !important;
          display: block !important;
        }
        
        /* Specifically target section content */
        .section-content, .guide-content {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          height: auto !important;
          overflow: visible !important;
          position: static !important;
          page-break-inside: avoid;
          page-break-after: always;
        }
        
        /* Hide navigation elements */
        .level-selector, .section-nav, .guides-selector,
        .dropdown, .dropdown-menu, .dropdown-li {
          display: none !important;
        }
        
        /* Ensure headers are visible */
        .section-header {
          display: flex !important;
          visibility: visible !important;
        }
        
        /* Print-specific adjustments */
        @media print {
          .documentation-container {
            display: block !important;
          }
          
          .content {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `
    });
    
    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9pt; text-align: center; width: 100%; color: #2B4B8C; margin: 15px 0;">
          ${title}
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9pt; text-align: center; width: 100%; color: #666; margin: 15px 0;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span> | www.globalgovernanceframework.org
        </div>
      `,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' }
    });
    
    console.log(`PDF generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating PDF for ${url}:`, error);
  } finally {
    await browser.close();
  }
}

async function generateAllPDFs() {
  try {
    for (const lang of LANGUAGES) {
      console.log(`\nGenerating PDFs for language: ${lang}`);
      
      const langOutputDir = path.join(BASE_OUTPUT_DIR, lang);
      await fs.ensureDir(langOutputDir);
      
      // Filter documents if a target framework is specified
      const docsToGenerate = targetFramework 
        ? documents.filter(doc => {
            // Check if the path contains the specified framework
            // This handles paths like '/frameworks/docs/implementation/economic'
            const pathSegments = doc.path.split('/');
            return pathSegments.includes(targetFramework);
          })
        : documents;
      
      if(targetFramework && docsToGenerate.length === 0) {
        console.warn(`No documents found for framework '${targetFramework}'`);
        continue;
      }

      console.log(`Will generate ${docsToGenerate.length} PDFs for ${targetFramework || 'all frameworks'}`);
      
      for (const doc of docsToGenerate) {
        const title = titles[lang][doc.titleKey] || `${doc.titleKey} (${lang.toUpperCase()})`;
        const url = `${SITE_URL}${doc.path}`;
        const outputPath = path.join(langOutputDir, doc.filename);
        
        try {
          await generatePDF(url, outputPath, title, lang, doc.format || 'single');
        } catch (error) {
          console.error(`Failed to generate PDF for ${doc.path} in ${lang}:`, error);
        }
      }
    }
    
    if(targetFramework) {
      console.log(`\nPDF generation completed for '${targetFramework}' framework!`);
    } else {
      console.log('\nAll PDFs generated successfully!');
    }
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }
}

// Run the function
generateAllPDFs();
