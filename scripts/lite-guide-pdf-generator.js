// lite-guide-pdf-generator.js
// Generates PDFs with embedded SVG content
// Installation: npm install puppeteer marked

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for multiple languages
const languages = [
  {
    code: 'en',
    inputFile: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'meta', 'quick-start.md'),
    outputFilename: 'meta-governance-lite.pdf',
    svgFilePath: path.join(__dirname, '..', 'static', 'images', 'meta-governance-diagram.svg'),
    imageRegex: /!\[(.*?)\]\((\/images\/meta-governance-diagram.*?\.svg)\)/i,
    pageFooter: 'Meta-Governance Lite Guide - Page '
  },
  {
    code: 'sv',
    inputFile: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'meta', 'quick-start.md'),
    outputFilename: 'meta-governance-lite-sv.pdf',
    svgFilePath: path.join(__dirname, '..', 'static', 'images', 'meta-governance-diagram-se.svg'),
    imageRegex: /!\[(.*?)\]\((\/images\/meta-governance-diagram-s[ev]\.svg)\)/i,
    pageFooter: 'Meta-Styrning Lite Guide - Sida '
  }
];

// Output directory
const outputDir = path.join(__dirname, '..', 'static', 'assets', 'pdf');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// CSS styling for the PDF
const css = `
  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .svg-container img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em auto;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #2B4B8C;
    margin-top: 1.5em;
  }
  h1 {
    font-size: 2.2em;
    text-align: center;
    margin-bottom: 1em;
  }
  h2 {
    font-size: 1.8em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
  }
  h3 {
    font-size: 1.5em;
  }
  h4 {
    font-size: 1.3em;
  }
  a {
    color: #2B4B8C;
    text-decoration: none;
  }
  blockquote {
    border-left: 4px solid #6B5CA5;
    padding-left: 15px;
    margin-left: 0;
    color: #555;
    font-style: italic;
  }
  code {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
  }
  pre code {
    display: block;
    padding: 1em;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  table, th, td {
    border: 1px solid #ddd;
  }
  th, td {
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #2B4B8C;
    color: white;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:nth-child(odd) {
    background-color: #ffffff;
  }
  hr {
    border: 0;
    height: 1px;
    background: #eaecef;
    margin: 2em 0;
  }
  .emoji {
    height: 1.2em;
    width: auto;
    vertical-align: middle;
    margin: 0 0.05em;
  }
  .svg-container {
    text-align: center;
    margin: 2em 0;
  }
  .svg-container svg {
    max-width: 700px;
    height: auto;
    margin: 0 auto;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em auto;
  }
`;

// Use simpler emoji replacement approach
function replaceEmojisWithImages(text) {
  // Make sure we're dealing with a string
  if (typeof text !== 'string') {
    return text;
  }
  
  // Map of common emoji characters to their image URLs
  const emojiMap = {
    '📘': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4d8.png', // blue book
    '📖': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4d6.png', // open book
    '🌀': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f300.png', // cyclone
    '🌍': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f30d.png', // earth globe europe-africa
    '🔑': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f511.png', // key
    '🧠': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9e0.png', // brain
    '⚠️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26a0.png', // warning
    '🔍': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f50d.png', // magnifying glass
    '📊': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4ca.png', // bar chart
    '🌱': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f331.png', // seedling
    '✨': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/2728.png', // sparkles
    '⚡': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26a1.png', // high voltage
    '🚧': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6a7.png', // construction
    '🎭': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3ad.png', // performing arts
    '⏳': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/23f3.png', // hourglass
    '🕸️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f578.png', // spider web
    '🧭': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9ed.png', // compass
    '🔗': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f517.png', // link
    '👁️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f441.png', // eye
    '⚖️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/2696.png', // scales
    '🤖': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f916.png', // robot
    '🧑‍🤝‍🧑': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9d1-200d-1f91d-200d-1f9d1.png', // people holding hands
    '👥': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f465.png', // busts in silhouette
    '👀': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f440.png', // eyes
    '🛠️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6e0.png', // hammer and wrench
    '📥': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e5.png', // inbox tray
    '🧩': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9e9.png', // puzzle piece
    '📚': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4da.png', // books
  };

  // Replace each emoji with its image
  Object.keys(emojiMap).forEach(emoji => {
    text = text.replace(new RegExp(emoji, 'g'), `<img src="${emojiMap[emoji]}" alt="${emoji}" class="emoji" />`);
  });

  return text;
}

// Process each language
async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const lang of languages) {
      console.log(`\nProcessing ${lang.code.toUpperCase()} version:`);
      
      if (!fs.existsSync(lang.inputFile)) {
        console.error(`Input file not found: ${lang.inputFile}`);
        continue;
      }
      
      const outputFile = path.join(outputDir, lang.outputFilename);
      console.log(`Input file: ${lang.inputFile}`);
      console.log(`Output file: ${outputFile}`);
      
      let markdown = fs.readFileSync(lang.inputFile, 'utf8');
      console.log(`Read ${markdown.length} characters from source file`);

      // Remove YAML frontmatter
      markdown = markdown.replace(/^---[\s\S]*?---/, '');
      
      const imageLines = markdown.split('\n').filter(line => line.includes('![') && line.includes('.svg'));
      console.log('Found image references:', imageLines);
      
      // Read SVG file and convert to data URI
      let svgDataUri = '';
      if (fs.existsSync(lang.svgFilePath)) {
        const svgContent = fs.readFileSync(lang.svgFilePath, 'utf8');
        console.log(`Read SVG content from ${lang.svgFilePath}`);
        
        // Encode SVG for data URI and add namespace if missing
        let processedSvg = svgContent;
        if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
          processedSvg = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        
        // Create data URI
        svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(processedSvg)}`;
      } else {
        console.error(`SVG file not found: ${lang.svgFilePath}`);
      }
      
      // Replace image reference with proper img tag
      if (lang.imageRegex.test(markdown)) {
        console.log(`Found image reference matching ${lang.imageRegex}`);
        markdown = markdown.replace(
          lang.imageRegex,
          `<div class="svg-container"><img src="${svgDataUri}" alt="$1" /></div>`
        );
      } else {
        console.warn(`Warning: Could not find image reference in markdown. Adding image after "### ✨" section.`);
        const sectionMatch = markdown.match(/(### ✨[^\n]*\n)/);
        if (sectionMatch) {
          markdown = markdown.replace(
            sectionMatch[0],
            `${sectionMatch[0]}\n<div class="svg-container"><img src="${svgDataUri}" alt="Meta Governance Diagram" /></div>\n\n`
          );
          console.log('Added SVG after section header');
        }
      }
      
      // Convert markdown with emoji replacement
      const renderer = new marked.Renderer();
      
      const originalParagraph = renderer.paragraph;
      renderer.paragraph = function(text) {
        return originalParagraph.call(this, replaceEmojisWithImages(text));
      };
      
      const originalTablecell = renderer.tablecell;
      renderer.tablecell = function(content, flags) {
        return originalTablecell.call(this, replaceEmojisWithImages(content), flags);
      };
      
      const originalHeading = renderer.heading;
      renderer.heading = function(text, level, raw, slugger) {
        return originalHeading.call(this, replaceEmojisWithImages(text), level, raw, slugger);
      };
      
      const originalListitem = renderer.listitem;
      renderer.listitem = function(text) {
        return originalListitem.call(this, replaceEmojisWithImages(text));
      };
      
      // Convert markdown to HTML with the custom renderer
      const html = marked(markdown, { renderer });
      
      // Create a full HTML document
      const fullHtml = `
      <!DOCTYPE html>
      <html lang="${lang.code}">
      <head>
        <meta charset="UTF-8">
        <title>Meta-Governance Lite</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
      `;
      
      // Save temporary HTML file (optional, for debugging)
      const tempHtmlFile = path.join(__dirname, `temp-html-for-pdf-${lang.code}.html`);
      fs.writeFileSync(tempHtmlFile, fullHtml);
      console.log(`Created temporary HTML file: ${tempHtmlFile}`);
      
      // Create a new page for this language
      const page = await browser.newPage();
      
      // Configure the page
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Set content and wait until network is idle (wait for images to load)
      await page.setContent(fullHtml, { 
        waitUntil: 'networkidle0',
        timeout: 30000 // Increase timeout to 30 seconds for image loading
      });
      
      // Debugging - save a screenshot
      await page.screenshot({
        path: path.join(__dirname, `screenshot-${lang.code}.png`),
        fullPage: true
      });
      console.log(`Saved screenshot to: ${path.join(__dirname, `screenshot-${lang.code}.png`)}`);
      
      // Generate PDF
      await page.pdf({
        path: outputFile,
        format: 'A4',
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
          <div style="width: 100%; font-size: 8px; padding: 0 1cm; color: #777; text-align: center;">
            <span>${lang.pageFooter}<span class="pageNumber"></span> / <span class="totalPages"></span></span>
          </div>
        `
      });
      
      // Close the page
      await page.close();
      
      console.log(`PDF generated successfully: ${outputFile}`);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('\nPDF generation complete');
  }
}

// Run the PDF generation
generatePDF().catch(console.error);
