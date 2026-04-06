import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { marked } from 'marked';
import katex from 'katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const LANG = 'en';
const OUTPUT_DIR = path.join(__dirname, '..', 'static', 'resources', 'whitepapers', 'immanent-trust-protocol', 'downloads');
const STATIC_DIR = path.join(__dirname, '..', 'static');
const CONTENT_DIR = path.join(__dirname, '..', 'static', 'content', 'papers', LANG, 'immanent-trust-protocol');

const SECTION_FILES = [
  '00-abstract.md',
  '01-introduction.md',
  '02.md',
  '03.md',
  '04.md',
  '05.md',
  '06.md',
  '07.md',
  '08.md',
  '09.md',
  '10.md',
  '11.md',
  '12.md',
  '13.md',
  'appendix-a.md',
  'appendix-b.md',
  'appendix-c.md',
  'appendix-d.md',
  'appendix-e.md',
  'references.md'
];

function stripFrontmatter(md) {
  return md.replace(/^---[\s\S]+?---\s*/, '');
}

function processImages(html, staticDir) {
  return html.replace(/src="\/(images\/[^"]+)"/g, (match, imgPath) => {
    const localPath = path.join(staticDir, imgPath);
    if (fs.existsSync(localPath)) {
      const ext = path.extname(localPath).toLowerCase();
      let mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      else if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
      const data = fs.readFileSync(localPath, 'base64');
      return `src="data:${mime};base64,${data}"`;
    }
    console.warn(`Image not found: ${imgPath}`);
    return match;
  });
}

// Server-side math rendering: convert \(...\) and \[...\] to HTML using KaTeX
function renderMathInMarkdown(md) {
  // Process display math \[ ... \]
  let processed = md.replace(/\\\[([\s\S]+?)\\\]/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false });
    } catch (e) {
      console.warn(`KaTeX display math error: ${e.message}`);
      return `<div class="math-error">${e.message}</div>`;
    }
  });
  // Process inline math \( ... \)
  processed = processed.replace(/\\\(([\s\S]+?)\\\)/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false });
    } catch (e) {
      console.warn(`KaTeX inline math error: ${e.message}`);
      return `<span class="math-error">${e.message}</span>`;
    }
  });
  return processed;
}

function markdownToHtml(md) {
  let clean = stripFrontmatter(md);
  // First, render math to HTML
  clean = renderMathInMarkdown(clean);
  // Then convert markdown to HTML (math is already HTML, so it won't be escaped)
  return marked.parse(clean);
}

// Read KaTeX CSS (for styling, though KaTeX generates its own classes)
const katexCssPath = path.join(__dirname, '..', 'node_modules', 'katex', 'dist', 'katex.min.css');
let katexCss = '';
if (fs.existsSync(katexCssPath)) {
  katexCss = fs.readFileSync(katexCssPath, 'utf8');
} else {
  console.warn('KaTeX CSS not found. Math may not style correctly.');
}

const customCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
  
  body {
    font-family: 'Merriweather', 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1e293b;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
    color: #0f172a;
    page-break-after: avoid;
  }
  h1 { font-size: 28pt; font-weight: 800; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5em; margin-top: 2em; }
  h2 { font-size: 20pt; font-weight: 700; margin-top: 2em; }
  h3 { font-size: 16pt; font-weight: 600; margin-top: 1.5em; }
  h4 { font-size: 14pt; font-weight: 500; margin-top: 1.2em; }

  p { margin-bottom: 1em; text-align: justify; }
  
  code {
    background: #f1f5f9;
    color: #1e293b;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.2em 0;
  }
  pre code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
  }

  img {
    max-width: 100% !important;
    width: auto;
    height: auto;
    display: block;
    margin: 2em auto;
    page-break-inside: avoid;
  }
  
  /* Ensure any figure containers also scale */
  .section-body figure,
  .section-body .image-container {
    max-width: 100%;
    text-align: center;
  }
  
  /* Optional: reduce default padding/margins for more space */
  body {
    margin: 0 auto;
    padding: 1.5rem;
  }
  
  .paper-content {
    max-width: 100%;
    padding: 0;
  }
  
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #cbd5e1; padding: 0.5em; text-align: left; }
  blockquote { border-left: 4px solid #3b82f6; background: #f8fafc; padding: 1em; font-style: italic; margin: 1em 0; }
  
  .title-page {
    text-align: center;
    page-break-after: always;
    margin-top: 30vh;
  }
  .logo { max-width: 150px; margin: 0 auto 2em; }
  .main-title { font-size: 36pt; font-weight: 900; color: #0f172a; margin-bottom: 0.5em; }
  .subtitle { font-size: 16pt; color: #475569; margin-bottom: 2em; }
  .meta { font-size: 11pt; color: #334155; }

  .page-break { page-break-before: always; }
  
  .math-error { color: red; background: #fee; padding: 0.2em; }
  .katex { font-size: 1.05em; } /* Adjust math size */
`;

async function generatePdf() {
  console.log("📄 Generating ITP Whitepaper PDF with server-side math rendering...");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let logoUrl = '';
  const logoPath = path.join(STATIC_DIR, 'logo.svg');
  if (fs.existsSync(logoPath)) {
    const svg = fs.readFileSync(logoPath, 'utf8');
    logoUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  let bodyHtml = '';

  bodyHtml += `
    <div class="title-page">
      ${logoUrl ? `<img src="${logoUrl}" class="logo" />` : ''}
      <div class="main-title">The Immanent Trust Protocol</div>
      <div class="subtitle">A Post‑Consensus Architecture for Decentralized, Observer‑Relative Trust</div>
      <div class="meta">
        <p><strong>Version:</strong> 1.0 — April 2026</p>
        <p><strong>Authors:</strong> Global Governance Frameworks</p>
      </div>
    </div>
  `;

  for (const file of SECTION_FILES) {
    const filePath = path.join(CONTENT_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Missing file: ${file}`);
      continue;
    }
    console.log(`  Processing: ${file}`);
    const md = fs.readFileSync(filePath, 'utf8');
    let html = markdownToHtml(md);
    bodyHtml += `<div class="page-break"></div>\n${html}`;
  }

  bodyHtml = processImages(bodyHtml, STATIC_DIR);

  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>${katexCss}</style>
      <style>${customCss}</style>
    </head>
    <body>
      ${bodyHtml}
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  // No need to wait for client-side KaTeX because math is already rendered.

  const outputPath = path.join(OUTPUT_DIR, `itp-whitepaper-${LANG}.pdf`);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 8px; color: #64748b; font-family: sans-serif; width: 100%; text-align: center; border-top: 0.5px solid #cbd5e1; padding-top: 5px;">
        The Immanent Trust Protocol | Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `
  });

  await browser.close();
  console.log(`✅ PDF generated: ${outputPath}`);
}

generatePdf().catch(console.error);
