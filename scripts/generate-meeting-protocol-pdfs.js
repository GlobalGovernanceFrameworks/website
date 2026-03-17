// scripts/generate-meeting-protocol-pdfs.js
//
// Generates PDFs for the Adaptive Coordination Protocol (GGF edition):
//   - adaptive-coordination-protocol.en.pdf
//   - adaptive-coordination-protocol.sv.pdf
//   - adaptive-coordination-appendix-questions.en.pdf
//   - adaptive-coordination-appendix-questions.sv.pdf
//
// Usage: node scripts/generate-meeting-protocol-pdfs.js

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

// ─── Styling ────────────────────────────────────────────────────────────────

const css = `
  :root {
    --navy: #1e293b;
    --primary: #4f46e5;
    --secondary: #0891b2;
    --accent: #059669;
    --text: #334155;
    --muted: #64748b;
    --light: #f8fafc;
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
  }

  h2 {
    font-size: 16pt;
    font-weight: 700;
    margin-top: 1.8em;
    margin-bottom: 0.4em;
    color: var(--primary);
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 13pt;
    font-weight: 600;
    margin-top: 1.4em;
    color: var(--secondary);
  }

  h4 {
    font-size: 11pt;
    font-weight: 600;
    margin-top: 1.2em;
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
    background: linear-gradient(90deg, #eef2ff, #f8fafc);
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
    color: var(--navy);
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
`;

// ─── Document definitions ───────────────────────────────────────────────────

const documents = [
  {
    id: 'adaptive-coordination-protocol',
    title: {
      en: 'Adaptive Coordination',
      sv: 'Adaptiv koordinering'
    },
    subtitle: {
      en: 'A Protocol for Integrative Decision-Making',
      sv: 'Ett protokoll för integrativt beslutsfattande'
    },
    description: {
      en: 'Practical guidance for groups navigating complex decisions across competing values, worldviews, and institutional logics.',
      sv: 'Praktisk vägledning för grupper som navigerar komplexa beslut över konkurrerande värderingar, världsbilder och institutionella logiker.'
    },
    filename: 'adaptive-coordination-protocol'
  },
  {
    id: 'adaptive-coordination-appendix-questions',
    title: {
      en: 'Difficult Questions for Adaptive Coordination',
      sv: 'Svåra frågor för adaptiv koordinering'
    },
    subtitle: {
      en: 'Appendix: Questions Organized by Which Orientation They Challenge',
      sv: 'Bilaga: Frågor ordnade efter vilken orientering de utmanar'
    },
    description: {
      en: 'A companion collection of questions designed to surface the assumptions that each coordination orientation protects.',
      sv: 'En kompletterande samling frågor utformade för att synliggöra de antaganden som varje koordineringsorientering skyddar.'
    },
    filename: 'adaptive-coordination-appendix-questions'
  }
];

// ─── Helpers ────────────────────────────────────────────────────────────────

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

function buildTitlePage(doc, lang, logoUrl) {
  const by = lang === 'sv' ? 'Av' : 'By';
  const aiCredit = lang === 'sv'
    ? 'med Claude, ChatGPT, DeepSeek, Gemini och Grok'
    : 'with Claude, ChatGPT, DeepSeek, Gemini and Grok';

  return `
    <div class="title-page">
      ${logoUrl ? `<img src="${logoUrl}" class="logo" />` : ''}
      <div class="main-title">${doc.title[lang]}</div>
      <div class="subtitle">${doc.subtitle[lang]}</div>
      <div class="description">${doc.description[lang]}</div>
      <div class="meta">
        <p>${by} <strong>Björn Kenneth Holmström</strong></p>
        <p>${aiCredit}</p>
        <p style="margin-top: 1em; color: var(--muted);">Global Governance Frameworks</p>
      </div>
    </div>
  `;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function generateAll() {
  console.log('🔄 Generating Adaptive Coordination Protocol PDFs...\n');

  const logoUrl = getLogoDataUrl();

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const doc of documents) {
    for (const lang of ['en', 'sv']) {
      const label = `${doc.id} (${lang})`;
      console.log(`── ${label} ──`);

      // Resolve markdown
      const langPath = path.join(CONTENT_DIR, lang, 'meeting', `${doc.filename}.md`);
      const enPath = path.join(CONTENT_DIR, 'en', 'meeting', `${doc.filename}.md`);

      let mdPath;
      if (fs.existsSync(langPath)) {
        mdPath = langPath;
      } else if (fs.existsSync(enPath)) {
        if (lang !== 'en') console.warn('  ⚠ Swedish not found, falling back to English');
        mdPath = enPath;
      } else {
        console.error(`  ✗ No markdown found for ${doc.filename}, skipping`);
        continue;
      }

      console.log(`  → ${path.basename(mdPath)}`);

      // Read and process markdown
      const rawMd = fs.readFileSync(mdPath, 'utf8');
      const cleanMd = stripFrontmatter(rawMd);
      const contentHtml = marked.parse(cleanMd);

      // Build title page
      const titleHtml = buildTitlePage(doc, lang, logoUrl);

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
          ${contentHtml}
        </body>
        </html>
      `;

      // Ensure output directory
      const langOutputDir = path.join(OUTPUT_DIR, lang);
      if (!fs.existsSync(langOutputDir)) {
        fs.mkdirSync(langOutputDir, { recursive: true });
      }

      // Generate PDF — fresh page each time to avoid stale network state
      const page = await browser.newPage();
      const outputFile = path.join(langOutputDir, `${doc.filename}.${lang}.pdf`);

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
            ${doc.title[lang]} | Global Governance Frameworks | <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `
      });

      await page.close();

      console.log(`  ✓ ${doc.filename}.${lang}.pdf\n`);
    }
  }

  await browser.close();
  console.log('✅ All PDFs generated in static/downloads/{en,sv}/');
}

generateAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
