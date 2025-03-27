// scripts/generate-pdfs.js
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'http://localhost:5173';
const BASE_OUTPUT_DIR = path.join(__dirname, '..', 'static/downloads');

// Define languages
const LANGUAGES = ['en', 'sv'];

// Define documents per language
// Define documents per language
const documents = [
  { path: '/framework/docs/principles', filename: 'Core-Principles.pdf', titleKey: 'Core Principles' },
  { path: '/framework/docs/implementation', filename: 'Implementation-Guidelines.pdf', titleKey: 'Implementation Guidelines' },
  { path: '/framework/docs/case-studies', filename: 'Case-Studies.pdf', titleKey: 'Case Studies' },
  { path: '/framework/docs/resources', filename: 'Resources.pdf', titleKey: 'Resources' },

  // Tiered Implementation Frameworks
  { path: '/framework/docs/implementation/tier-1', filename: 'Tier-1-Urgent-Stability.pdf', titleKey: 'Tier 1 Overview' },
  { path: '/framework/docs/implementation/tier-2', filename: 'Tier-2-Long-Term-Thriving.pdf', titleKey: 'Tier 2 Overview' },
  { path: '/framework/docs/implementation/tier-3', filename: 'Tier-3-Equity-Culture.pdf', titleKey: 'Tier 3 Overview' },
  { path: '/framework/docs/implementation/tier-4', filename: 'Tier-4-Visionary-Meta.pdf', titleKey: 'Tier 4 Overview' },

  // Individual Implementation Domains (alphabetical)
  { path: '/framework/docs/implementation/biodiversity', filename: 'Biodiversity-Governance.pdf', titleKey: 'Biodiversity Governance' },
  { path: '/framework/docs/implementation/energy', filename: 'Climate-Energy-Governance.pdf', titleKey: 'Climate & Energy Governance' },
  { path: '/framework/docs/implementation/consciousness', filename: 'Consciousness-Inner-Development.pdf', titleKey: 'Consciousness & Inner Development' },
  { path: '/framework/docs/implementation/culture', filename: 'Cultural-Heritage.pdf', titleKey: 'Cultural Heritage Preservation' },
  { path: '/framework/docs/implementation/digital', filename: 'Digital-Commons.pdf', titleKey: 'Digital Commons' },
  { path: '/framework/docs/implementation/disaster', filename: 'Disaster-Resilience.pdf', titleKey: 'Disaster Risk Reduction & Resilience' },
  { path: '/framework/docs/implementation/economic', filename: 'Economic-Integration.pdf', titleKey: 'Economic Integration' },
  { path: '/framework/docs/implementation/education', filename: 'Educational-Systems.pdf', titleKey: 'Educational Systems' },
  { path: '/framework/docs/implementation/environment', filename: 'Environmental-Stewardship.pdf', titleKey: 'Environmental Stewardship' },
  { path: '/framework/docs/implementation/ethics', filename: 'Global-Ethics-Rights.pdf', titleKey: 'Global Ethics & Human Rights' },
  { path: '/framework/docs/implementation/finance', filename: 'Financial-Systems.pdf', titleKey: 'Financial Systems' },
  { path: '/framework/docs/implementation/food', filename: 'Food-Agriculture.pdf', titleKey: 'Food Systems & Agriculture' },
  { path: '/framework/docs/implementation/healthcare', filename: 'Healthcare-Governance.pdf', titleKey: 'Healthcare Governance' },
  { path: '/framework/docs/implementation/justice', filename: 'Justice-Systems.pdf', titleKey: 'Justice Systems' },
  { path: '/framework/docs/implementation/labor', filename: 'Labor-Employment.pdf', titleKey: 'Labor & Employment Governance' },
  { path: '/framework/docs/implementation/meta', filename: 'Meta-Governance.pdf', titleKey: 'Integrated Meta-Governance' },
  { path: '/framework/docs/implementation/methods-tools', filename: 'Methods-Tools.pdf', titleKey: 'Implementation Methods & Tools' },
  { path: '/framework/docs/implementation/migration', filename: 'Migration-Mobility.pdf', titleKey: 'Migration & Human Mobility' },
  { path: '/framework/docs/implementation/oceans', filename: 'Oceans-Marine-Governance.pdf', titleKey: 'Oceans & Marine Governance' },
  { path: '/framework/docs/implementation/peace', filename: 'Peace-Conflict-Resolution.pdf', titleKey: 'Peace & Conflict Resolution' },
  { path: '/framework/docs/implementation/rural', filename: 'Rural-Development.pdf', titleKey: 'Rural Development' },
  { path: '/framework/docs/implementation/space', filename: 'Space-Governance.pdf', titleKey: 'Space Governance' },
  { path: '/framework/docs/implementation/spiritual', filename: 'Spiritual-Dialogue.pdf', titleKey: 'Religious & Spiritual Dialogue' },
  { path: '/framework/docs/implementation/technology', filename: 'Technology-Governance.pdf', titleKey: 'Technology Governance' },
  { path: '/framework/docs/implementation/urban', filename: 'Urban-Community.pdf', titleKey: 'Urban & Community Development' },
  { path: '/framework/docs/implementation/youth', filename: 'Youth-Governance.pdf', titleKey: 'Youth & Intergenerational Governance' }
];

// Language-specific titles
const titles = {
  en: {
    'Core Principles': 'Global Governance Framework: Core Principles',
    'Implementation Guidelines': 'Global Governance Framework: Implementation Guidelines',
    'Case Studies': 'Global Governance Framework: Case Studies',
    'Resources': 'Global Governance Framework: Resources',
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

async function generatePDF(url, outputPath, title) {
  console.log(`Generating PDF for ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to ensure consistent rendering
  await page.setViewport({ width: 1200, height: 1600 });
  
  // Navigate to the page
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  try {
    // Wait for content to be fully rendered
    await page.waitForSelector('.content', { timeout: 10000 });
  } catch (error) {
    console.warn('Could not find .content selector, continuing anyway');
  }
  
  // Add custom styles for PDF
  await page.addStyleTag({
    content: `
      @page {
        margin: 1.5cm;
        size: A4;
      }
      body {
        font-family: 'Arial', sans-serif;
      }
      /* Hide elements we don't want in the PDF */
      header, footer, nav, .sidebar, button {
        display: none !important;
      }
      /* Ensure content is properly visible */
      .content {
        padding: 0;
        margin: 0;
        width: 100%;
      }
      /* Style headings */
      h1 { font-size: 24pt; color: #2B4B8C; margin-bottom: 20pt; }
      h2 { font-size: 18pt; color: #2B4B8C; margin-top: 15pt; }
      h3 { font-size: 14pt; color: #2B4B8C; }
      /* Style links */
      a { color: #DAA520; text-decoration: underline; }
      
      /* Improve table styling for PDF */
      table { 
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      }
      th {
        background-color: #2B4B8C;
        color: white;
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #ccc;
      }
      td {
        padding: 0.5rem;
        border: 1px solid #ccc;
      }
      tr:nth-child(even) {
        background-color: #f9fafb;
      }
      
      /* Improve blockquote styling */
      blockquote {
        background-color: #f9fafb;
        border-left: 4px solid #2B4B8C;
        padding: 0.5rem 1rem;
        margin: 1rem 0;
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
  
  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
} 

async function generateAllPDFs() {
  try {
    // Process each language
    for (const lang of LANGUAGES) {
      console.log(`\nGenerating PDFs for language: ${lang}`);
      
      // Create language-specific output directory
      const langOutputDir = path.join(BASE_OUTPUT_DIR, lang);
      await fs.ensureDir(langOutputDir);
      
      // Generate PDFs for each document in this language
      for (const doc of documents) {
        const title = titles[lang][doc.titleKey];
        const url = `${SITE_URL}${doc.path}?lang=${lang}`;
        const outputPath = path.join(langOutputDir, doc.filename);
        
        await generatePDF(url, outputPath, title);
      }
    }
    
    console.log('\nAll PDFs generated successfully!');
  } catch (error) {
    console.error('Error generating PDFs:', error);
  }
}

// Run the function
generateAllPDFs();
