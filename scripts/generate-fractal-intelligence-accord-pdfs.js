import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const LANGUAGES = ['en', 'sv', 'ja'];
const VERSION = '1.0';
const STATIC_DIR = path.join(__dirname, '..', 'static');
const SOURCE_BASE = path.join(__dirname, '..', 'src', 'lib', 'content', 'framework-outlines');

const DOCUMENTS = [
  {
    slug: 'charter',
    file: 'charter.md',
    title: {
      en: 'The Fractal Intelligence Charter',
      sv: 'Fraktalintelligensstadgan',
      ja: 'フラクタル・インテリジェンス憲章'
    },
    subtitle: {
      en: 'A Charter for AGI Governance, Human Meaning, and Cognitive Sovereignty',
      sv: 'En stadga för AGI-styrning, mänsklig mening och kognitiv suveränitet',
      ja: 'AGIガバナンス、人間の意味、認知主権のための憲章'
    }
  },
  {
    slug: 'transition-protocol',
    file: 'transition-protocol.md',
    title: {
      en: 'Transition Protocol',
      sv: 'Övergångsprotokoll',
      ja: '移行プロトコル'
    },
    subtitle: {
      en: 'Operational Framework for AGI Governance, Compute Subsidiarity, and Contextual Intelligence',
      sv: 'Operativt ramverk för AGI-styrning, beräkningssubsidiaritet och kontextuell intelligens',
      ja: 'AGIガバナンス、計算補完性、文脈的知性のための運用フレームワーク'
    }
  }
];

const LANG_META = {
  en: { org: 'Global Governance Frameworks', date: 'March 2026', author: 'Björn Kenneth Holmström + AI collaboration' },
  sv: { org: 'Global Governance Frameworks', date: 'Mars 2026', author: 'Björn Kenneth Holmström + AI-samarbete' },
  ja: { org: 'グローバル・ガバナンス・フレームワーク', date: '2026年3月', author: 'ビョルン・ケネス・ホルムストローム + AI協力' }
};

// --- STYLING ---
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;600;700&display=swap');

  :root {
    --navy: #1e1b4b;
    --teal: #0d9488;
    --text: #334155;
  }

  body {
    font-family: 'Merriweather', 'Noto Sans JP', 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: var(--text);
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    color: var(--navy);
    page-break-after: avoid;
  }

  h1 { font-size: 22pt; font-weight: 800; border-bottom: 2px solid var(--teal); padding-bottom: 0.5em; margin-top: 2em; }
  h2 { font-size: 16pt; font-weight: 700; margin-top: 2em; }
  h3 { font-size: 13pt; font-weight: 600; margin-top: 1.5em; color: #475569; }
  h4 { font-size: 11pt; font-weight: 600; margin-top: 1.2em; }

  p { margin-bottom: 1em; text-align: justify; }

  blockquote {
    background: #f0fdfa;
    border-left: 4px solid var(--teal);
    margin: 1.5em 0;
    padding: 1em 1.5em;
    font-style: italic;
    color: #4b5563;
    page-break-inside: avoid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }

  th, td {
    border: 1px solid #cbd5e1;
    padding: 0.5em 0.75em;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #f1f5f9;
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    font-weight: 600;
    color: var(--navy);
  }

  tr:nth-child(even) { background: #f8fafc; }

  ul, ol { margin-bottom: 1em; padding-left: 1.5em; }
  li { margin-bottom: 0.3em; }

  strong { color: #1e293b; }

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 2em 0;
  }

  code {
    background: #f1f5f9;
    padding: 0.15em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .title-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    page-break-after: always;
  }

  .logo { max-width: 120px; margin: 0 auto 2em auto; }

  .main-title {
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    font-size: 32pt;
    font-weight: 900;
    color: var(--navy);
    line-height: 1.15;
    margin-bottom: 0.5em;
  }

  .doc-subtitle {
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    font-size: 14pt;
    color: #64748b;
    font-weight: 300;
    margin-bottom: 3em;
    line-height: 1.5;
  }

  .meta {
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    font-size: 10pt;
    color: var(--navy);
  }

  .meta p { text-align: center; margin-bottom: 0.3em; }

  .accord-badge {
    display: inline-block;
    margin-bottom: 1.5em;
    padding: 0.4em 1.2em;
    border: 2px solid var(--teal);
    border-radius: 2em;
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    font-size: 10pt;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .page-break { page-break-before: always; }
`;

// --- HELPERS ---

function getLogoDataUrl() {
  for (const file of ['logo.svg', 'logo.png']) {
    const logoPath = path.join(STATIC_DIR, file);
    if (fs.existsSync(logoPath)) {
      const mime = file.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
      const data = fs.readFileSync(logoPath, 'base64');
      return `data:${mime};base64,${data}`;
    }
  }
  return null;
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---[\s\S]+?---\s*/, '');
}

function escapeBareAngleBrackets(markdown) {
  // Escape < not followed by a valid HTML tag or closing tag
  return markdown.replace(/<(?!\/?[a-zA-Z][\w-]*[\s>\/])/g, '&lt;');
}

// --- MAIN ---

async function generateAccordPdfs() {
  console.log('🌀 Starting Fractal Intelligence Accord PDF generation...\n');
  const logoUrl = getLogoDataUrl();

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const lang of LANGUAGES) {
    const meta = LANG_META[lang];
    const sourceDir = path.join(SOURCE_BASE, lang, 'tier-2', 'fractal-intelligence-accord');
    const outputDir = path.join(STATIC_DIR, 'downloads', lang);

    // Ensure output dir exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const doc of DOCUMENTS) {
      const filePath = path.join(sourceDir, doc.file);

      if (!fs.existsSync(filePath)) {
        console.log(`  ⏭️  ${lang}/${doc.slug}: markdown not found, skipping`);
        continue;
      }

      console.log(`  📄 ${lang}/${doc.slug}`);

      const rawMd = fs.readFileSync(filePath, 'utf8');
      const cleanMd = stripFrontmatter(rawMd);
      const safeMd = escapeBareAngleBrackets(cleanMd);
      const contentHtml = marked.parse(safeMd);

      const title = doc.title[lang] || doc.title.en;
      const subtitle = doc.subtitle[lang] || doc.subtitle.en;

      const titlePage = `
        <div class="title-page">
          ${logoUrl ? `<img src="${logoUrl}" class="logo" />` : ''}
          <div class="accord-badge">Fractal Intelligence Accord</div>
          <div class="main-title">${title}</div>
          <div class="doc-subtitle">${subtitle}</div>
          <div class="meta">
            <p><strong>${lang === 'ja' ? '日付' : lang === 'sv' ? 'Datum' : 'Date'}:</strong> ${meta.date}</p>
            <p><strong>${lang === 'ja' ? '著者' : lang === 'sv' ? 'Författare' : 'Author'}:</strong> ${meta.author}</p>
            <p><strong>${lang === 'ja' ? '組織' : lang === 'sv' ? 'Organisation' : 'Organization'}:</strong> ${meta.org}</p>
            <p>Version ${VERSION}</p>
          </div>
        </div>
      `;

      const finalHtml = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
          <meta charset="utf-8" />
          <style>${css}</style>
        </head>
        <body>
          ${titlePage}
          <div class="page-break"></div>
          ${contentHtml}
        </body>
        </html>
      `;

      const outputFilename = `fractal-intelligence-accord-${doc.slug}-v${VERSION}.pdf`;
      const outputPath = path.join(outputDir, outputFilename);

      await page.setContent(finalHtml, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '2.5cm', bottom: '2.5cm', left: '2.5cm', right: '2.5cm' },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
          <div style="font-size: 8px; color: #94a3b8; font-family: sans-serif; width: 100%; text-align: center; padding-bottom: 10px;">
            ${title} | ${meta.org} | <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `
      });

      console.log(`    ✅ ${outputPath}`);
    }
  }

  await browser.close();
  console.log('\n✨ Done.');
}

generateAccordPdfs().catch(console.error);
