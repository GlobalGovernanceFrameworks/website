// scripts/generate-meaning-infrastructure-pdfs.js
//
// Generates PDFs for the Meaning Infrastructure Protocol:
//   - meaning-infrastructure-protocol.en.pdf
//   - meaning-infrastructure-protocol.sv.pdf
//   - meaning-infrastructure-protocol.ja.pdf (when content exists)
//
// Usage: node scripts/generate-meaning-infrastructure-pdfs.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname, '..', 'static');
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'lib', 'content', 'protocols');
const OUTPUT_DIR = path.join(__dirname, '..', 'static', 'downloads');

// ─── Protocol-specific styling ──────────────────────────────────────────────

const css = `
  :root {
    --navy: #1e1b4b;
    --primary: #8b5cf6;      /* Violet - transcendence/mystery */
    --secondary: #d97706;    /* Amber - wisdom/grounding */
    --accent: #10b981;       /* Emerald - growth/life */
    --wisdom: #6366f1;       /* Indigo - deep insight */
    --grief: #64748b;        /* Slate - mourning/reflection */
    --text: #334155;
    --muted: #64748b;
    --light: #faf9fe;
  }

  body {
    font-family: 'Merriweather', 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: var(--text);
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
    color: var(--navy);
    page-break-after: avoid;
  }

  h1 {
    font-size: 22pt;
    font-weight: 800;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 0.4em;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: var(--primary);
  }

  h2 {
    font-size: 16pt;
    font-weight: 700;
    margin-top: 1.8em;
    margin-bottom: 0.4em;
    color: var(--secondary);
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 13pt;
    font-weight: 600;
    margin-top: 1.4em;
    color: var(--accent);
  }

  h4 {
    font-size: 11pt;
    font-weight: 600;
    margin-top: 1.2em;
    color: var(--wisdom);
  }

  p {
    margin-bottom: 0.8em;
    text-align: justify;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }

  blockquote {
    border-left: 4px solid var(--primary);
    background: linear-gradient(90deg, #ede9fe, var(--light));
    margin: 1.2em 0;
    padding: 0.8em 1.2em;
    font-style: italic;
    color: #374151;
    page-break-inside: avoid;
  }

  blockquote p { margin-bottom: 0.4em; }
  blockquote p:last-child { margin-bottom: 0; }

  ul, ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
  }

  li {
    margin-bottom: 0.3em;
  }

  strong {
    color: var(--navy);
  }

  em {
    color: var(--muted);
  }

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 2em 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5em 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  th {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-align: left;
    padding: 8px 10px;
  }

  td {
    padding: 7px 10px;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f8fafc;
  }

  code {
    background: #f1f5f9;
    padding: 0.15em 0.35em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* Title page */
  .title-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    page-break-after: always;
  }

  .logo {
    max-width: 120px;
    margin: 0 auto 2.5em auto;
  }

  .main-title {
    font-family: 'Inter', sans-serif;
    font-size: 30pt;
    font-weight: 900;
    color: var(--primary);
    line-height: 1.15;
    margin-bottom: 0.4em;
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 14pt;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 0.5em;
  }

  .description {
    font-family: 'Merriweather', serif;
    font-size: 11pt;
    color: var(--muted);
    font-style: italic;
    max-width: 500px;
    margin: 0 auto 3em auto;
    line-height: 1.5;
  }

  .meta {
    font-family: 'Inter', sans-serif;
    font-size: 10pt;
    color: var(--navy);
  }

  .meta p {
    text-align: center;
    margin: 0.3em 0;
  }

  /* Section separators */
  .section-break {
    page-break-before: always;
  }
`;

// ─── Protocol definition ─────────────────────────────────────────────────────

const protocol = {
  id: 'meaning-infrastructure',
  title: {
    en: 'Meaning Infrastructure',
    sv: 'Meningsinfrastruktur'
  },
  subtitle: {
    en: 'A Protocol for Cultivating Conditions for Meaning',
    sv: 'Ett protokoll för att odla förutsättningar för mening'
  },
  description: {
    en: 'Existential infrastructure for resilient governance — cultivating conditions for meaning without engineering it.',
    sv: 'Existentiell infrastruktur för resilient styrning — att odla förutsättningar för mening utan att konstruera den.'
  },
  filename: 'meaning-infrastructure-protocol',
  // Sections in order
  sections: [
    'diagnosis',
    'synthesis',
    'principles',
    'interventions',
    'living-story',
    'governance',
    'indicators',
    'safeguards',
    'limits'
  ]
};

// Supported languages (can add 'ja' later when content exists)
const languages = ['en', 'sv'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getLogoDataUrl() {
  const logoSvg = path.join(STATIC_DIR, 'logo.svg');
  const logoPng = path.join(STATIC_DIR, 'logo.png');

  try {
    if (fs.existsSync(logoSvg)) {
      const svg = fs.readFileSync(logoSvg, 'utf8');
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    } else if (fs.existsSync(logoPng)) {
      const png = fs.readFileSync(logoPng);
      return `data:image/png;base64,${png.toString('base64')}`;
    }
  } catch {
    console.warn('  ⚠ Logo not found');
  }
  return null;
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---[\s\S]+?---\s*/, '');
}

function buildTitlePage(lang, logoUrl) {
  const by = lang === 'sv' ? 'Av' : 'By';
  const aiCredit = lang === 'sv'
    ? 'med DeepSeek och ChatGPT'
    : 'with DeepSeek and ChatGPT';

  return `
    <div class="title-page">
      ${logoUrl ? `<img src="${logoUrl}" class="logo" />` : ''}
      <div class="main-title">${protocol.title[lang]}</div>
      <div class="subtitle">${protocol.subtitle[lang]}</div>
      <div class="description">${protocol.description[lang]}</div>
      <div class="meta">
        <p>${by} <strong>Björn Kenneth Holmström</strong></p>
        <p>${aiCredit}</p>
        <p style="margin-top: 1em; color: var(--muted);">Global Governance Frameworks</p>
        <p style="margin-top: 0.5em;">Version 1.0</p>
      </div>
    </div>
  `;
}

// Load and combine all sections for a given language
function loadCombinedContent(lang) {
  const langDir = path.join(CONTENT_DIR, lang, protocol.id);
  const enDir = path.join(CONTENT_DIR, 'en', protocol.id);
  
  let combinedHtml = '';
  let missingSections = [];
  let fallbackSections = [];

  for (const section of protocol.sections) {
    let mdPath = path.join(langDir, `${section}.md`);
    let usedFallback = false;
    
    if (!fs.existsSync(mdPath)) {
      // Fall back to English
      mdPath = path.join(enDir, `${section}.md`);
      usedFallback = true;
    }
    
    if (!fs.existsSync(mdPath)) {
      missingSections.push(section);
      continue;
    }
    
    if (usedFallback && lang !== 'en') {
      fallbackSections.push(section);
    }
    
    const rawMd = fs.readFileSync(mdPath, 'utf8');
    const cleanMd = stripFrontmatter(rawMd);
    const sectionHtml = marked.parse(cleanMd);
    
    // Add section title from filename if not present (as h1)
    // But the markdown should already have proper headings
    
    combinedHtml += sectionHtml + '\n';
  }
  
  if (missingSections.length > 0) {
    console.warn(`  ⚠ Missing sections for ${lang}: ${missingSections.join(', ')}`);
  }
  
  return { combinedHtml, fallbackSections };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateAll() {
  console.log('🔄 Generating Meaning Infrastructure Protocol PDFs...\n');

  const logoUrl = getLogoDataUrl();

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const lang of languages) {
    console.log(`── ${protocol.id} (${lang}) ──`);
    
    // Check if content directory exists for this language
    const langDir = path.join(CONTENT_DIR, lang, protocol.id);
    const enDir = path.join(CONTENT_DIR, 'en', protocol.id);
    
    if (!fs.existsSync(langDir) && !fs.existsSync(enDir)) {
      console.error(`  ✗ No content directory found for ${lang} or English fallback`);
      continue;
    }
    
    const { combinedHtml, fallbackSections } = loadCombinedContent(lang);
    
    if (!combinedHtml) {
      console.error(`  ✗ No content loaded for ${lang}`);
      continue;
    }
    
    if (fallbackSections.length > 0 && lang !== 'en') {
      console.log(`  ℹ Sections using English fallback: ${fallbackSections.join(', ')}`);
    }
    
    // Build title page
    const titleHtml = buildTitlePage(lang, logoUrl);
    
    // Assemble full HTML
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap">
        <style>${css}</style>
      </head>
      <body>
        ${titleHtml}
        ${combinedHtml}
      </body>
      </html>
    `;
    
    // Ensure output directory
    const langOutputDir = path.join(OUTPUT_DIR, lang);
    if (!fs.existsSync(langOutputDir)) {
      fs.mkdirSync(langOutputDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    const outputFile = path.join(langOutputDir, `${protocol.filename}.${lang}.pdf`);
    
    await page.setContent(fullHtml, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.pdf({
      path: outputFile,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2.5cm',
        bottom: '2.5cm',
        left: '2.5cm',
        right: '2.5cm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 8px; color: #94a3b8; font-family: sans-serif; width: 100%; text-align: center; padding-bottom: 10px;">
          ${protocol.title[lang]} | Global Governance Frameworks | <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `
    });
    
    await page.close();
    
    console.log(`  ✓ ${protocol.filename}.${lang}.pdf\n`);
  }

  await browser.close();
  console.log('✅ All PDFs generated in static/downloads/{en,sv}/');
}

generateAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
