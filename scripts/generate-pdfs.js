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
const documents = [
  { path: '/framework/docs/principles', filename: 'Core-Principles.pdf', titleKey: 'Core Principles' },
  { path: '/framework/docs/implementation', filename: 'Implementation-Guidelines.pdf', titleKey: 'Implementation Guidelines' },
  { path: '/framework/docs/case-studies', filename: 'Case-Studies.pdf', titleKey: 'Case Studies' },
  { path: '/framework/docs/resources', filename: 'Resources.pdf', titleKey: 'Resources' },
  // Added implementation framework documents
  { path: '/framework/docs/implementation/economic', filename: 'Economic-Integration.pdf', titleKey: 'Economic Integration' },
  { path: '/framework/docs/implementation/environment', filename: 'Environmental-Stewardship.pdf', titleKey: 'Environmental Stewardship' },
  { path: '/framework/docs/implementation/peace', filename: 'Peace-Conflict-Resolution.pdf', titleKey: 'Peace & Conflict Resolution' }
];

// Language-specific titles
const titles = {
  en: {
    'Core Principles': 'Global Governance Framework: Core Principles',
    'Implementation Guidelines': 'Global Governance Framework: Implementation Guidelines',
    'Case Studies': 'Global Governance Framework: Case Studies',
    'Resources': 'Global Governance Framework: Resources',
    // Added titles for implementation framework documents
    'Economic Integration': 'Global Governance Framework: Economic Integration',
    'Environmental Stewardship': 'Global Governance Framework: Environmental Stewardship',
    'Peace & Conflict Resolution': 'Global Governance Framework: Peace & Conflict Resolution'
  },
  sv: {
    'Core Principles': 'Global Governance Framework: Kärnprinciper',
    'Implementation Guidelines': 'Global Governance Framework: Implementeringsriktlinjer',
    'Case Studies': 'Global Governance Framework: Fallstudier',
    'Resources': 'Global Governance Framework: Resurser',
    // Added titles for implementation framework documents
    'Economic Integration': 'Global Governance Framework: Ekonomisk integration',
    'Environmental Stewardship': 'Global Governance Framework: Miljöförvaltning',
    'Peace & Conflict Resolution': 'Global Governance Framework: Fred & konfliktlösning'
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
