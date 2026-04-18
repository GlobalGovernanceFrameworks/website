// scripts/generate-adaptive-coordination-pdfs.js
//
// Generates PDFs for the Adaptive Coordination Protocol (ACP):
//   - adaptive-coordination-protocol.en.pdf
//   - adaptive-coordination-protocol.sv.pdf (when translation exists)
//
// Usage: node scripts/generate-adaptive-coordination-pdfs.js

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

// ─── Protocol-specific styling (ACP theme: violet/amber/gold) ───────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');

  :root {
    --ink: #1a1a2e;
    --primary: #c0392b;
    --secondary: #b8860b;
    --accent: #8b5cf6;
    --text: #334155;
    --muted: #8888aa;
    --light: #faf9f6;
    --rule: #d4d0c8;
  }

  body {
    font-family: 'Merriweather', 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: var(--text);
    margin: 0;
    padding: 0;
    background: white;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    color: var(--ink);
    page-break-after: avoid;
  }

  h1 {
    font-size: 24pt;
    font-weight: 800;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 0.4em;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: var(--ink);
  }

  h2 {
    font-size: 16pt;
    font-weight: 700;
    margin-top: 1.8em;
    margin-bottom: 0.4em;
    color: var(--secondary);
    border-bottom: 1px solid var(--rule);
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
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
    background: #f4f2eb;
    margin: 1.2em 0;
    padding: 0.8em 1.2em;
    font-style: italic;
    color: #374151;
    page-break-inside: avoid;
  }

  blockquote p {
    margin-bottom: 0.4em;
  }
  blockquote p:last-child {
    margin-bottom: 0;
  }

  ul, ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
  }

  li {
    margin-bottom: 0.3em;
  }

  strong {
    font-weight: 600;
    color: var(--ink);
  }

  em {
    color: var(--muted);
  }

  hr {
    border: none;
    border-top: 1px solid var(--rule);
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
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #f4f2eb;
  }

  code {
    background: #ece9e0;
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
    font-size: 34pt;
    font-weight: 900;
    color: var(--ink);
    line-height: 1.15;
    margin-bottom: 0.3em;
    letter-spacing: -0.02em;
  }

  .main-title span {
    color: var(--primary);
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 12pt;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    letter-spacing: 0.15em;
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
    font-size: 9pt;
    color: var(--muted);
  }

  .meta p {
    text-align: center;
    margin: 0.3em 0;
  }

  .version-badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 0.2em 0.8em;
    border-radius: 2px;
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

// ─── Protocol definition ─────────────────────────────────────────────────────
const protocol = {
  id: 'adaptive-coordination',
  title: {
    en: 'Adaptive Coordination Protocol',
    sv: 'Adaptivt koordineringsprotokoll'
  },
  subtitle: {
    en: 'Voluntary Coordination Under Systemic Stress',
    sv: 'Frivillig koordinering under systemisk stress'
  },
  description: {
    en: 'A lightweight, voluntary coordination mechanism designed to align national sovereignty with global systemic needs during cross-border crises.',
    sv: 'En lättviktig, frivillig koordineringsmekanism utformad för att förena nationell suveränitet med globala systembehov vid gränsöverskridande kriser.'
  },
  filename: 'adaptive-coordination-protocol'
};

// Supported languages
const languages = ['en', 'sv']; // Add more as translations become available

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

function buildTitlePage(lang, logoUrl, version = 'v0.5') {
  const by = lang === 'sv' ? 'Av' : 'By';
  const aiCredit = lang === 'sv'
    ? 'med Claude, ChatGPT och DeepSeek'
    : 'with Claude, ChatGPT and DeepSeek';

  return `
    <div class="title-page">
      ${logoUrl ? `<img src="${logoUrl}" class="logo" />` : ''}
      <div class="subtitle">Global Governance Frameworks · Tier 3 Cross-Cutting Protocol</div>
      <div class="main-title">${protocol.title[lang].replace('Adaptive Coordination', '<span>Adaptive Coordination</span>')}</div>
      <div class="description">${protocol.description[lang]}</div>
      <div class="meta">
        <p><span class="version-badge">${version}</span></p>
        <p>${by} <strong>Björn Kenneth Holmström</strong></p>
        <p>${aiCredit}</p>
        <p style="margin-top: 1.5em;">Status: Ready for Practitioner Review</p>
      </div>
    </div>
  `;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function generateAll() {
  console.log('🔄 Generating Adaptive Coordination Protocol PDFs...\n');

  const logoUrl = getLogoDataUrl();

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const lang of languages) {
    console.log(`── ${protocol.id} (${lang}) ──`);

    // Determine content path
    const langContentDir = path.join(CONTENT_DIR, lang, protocol.id);
    const enContentDir = path.join(CONTENT_DIR, 'en', protocol.id);
    
    let mdPath = path.join(langContentDir, 'current.md');
    let usedFallback = false;

    if (!fs.existsSync(mdPath)) {
      mdPath = path.join(enContentDir, 'current.md');
      usedFallback = true;
      if (lang !== 'en') {
        console.log(`  ℹ Using English fallback (${lang} translation not found)`);
      }
    }

    if (!fs.existsSync(mdPath)) {
      console.error(`  ✗ No markdown found for ${lang} or English fallback`);
      continue;
    }

    // Read and process markdown
    const rawMd = fs.readFileSync(mdPath, 'utf8');
    const cleanMd = stripFrontmatter(rawMd);
    const contentHtml = marked.parse(cleanMd);

    // Build title page
    const titleHtml = buildTitlePage(lang, logoUrl, 'v0.5');

    // Assemble full HTML
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
        <style>${css}</style>
      </head>
      <body>
        ${titleHtml}
        ${contentHtml}
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
        left: '2cm',
        right: '2cm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 8px; color: #8888aa; font-family: 'Source Sans 3', sans-serif; width: 100%; text-align: center; padding-bottom: 10px;">
          ${protocol.title[lang]} | Global Governance Frameworks | <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `
    });

    await page.close();

    console.log(`  ✓ ${protocol.filename}.${lang}.pdf`);
    if (usedFallback && lang !== 'en') {
      console.log(`    (English content, ${lang} title page)`);
    }
    console.log();
  }

  await browser.close();
  console.log('✅ All PDFs generated in static/downloads/{en,sv}/');
}

generateAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
