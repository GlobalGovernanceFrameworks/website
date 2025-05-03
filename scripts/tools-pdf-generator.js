// tools-pdf-generator.js
// Generates PDFs for all education framework tools and quick-start guides
// Installation: npm install puppeteer marked

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const languages = ['en', 'sv'];
const outputDirs = {
  'education': path.join(__dirname, '..', 'static', 'framework', 'tools', 'education'),
  'food-systems': path.join(__dirname, '..', 'static', 'framework', 'tools', 'food-systems')
};

// Define tools to process
const tools = [
  {
    name: 'quick-start',
    category: 'education',
    fileNames: {
      en: 'education-framework-lite',
      sv: 'education-framework-lite-swedish'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education')
    },
    pageFooter: {
      en: 'Education Framework Lite Guide - Page ',
      sv: 'Utbildningsramverk Lite Guide - Sida '
    }
  },
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'education',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Självbedömningsverktyg för pilotberedskap - Sida '
    }
  },
  {
    name: 'youth-council-charter',
    category: 'education',
    fileNames: {
      en: 'youth-council-charter-en',
      sv: 'youth-council-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Youth Council Charter Template - Page ',
      sv: 'Mall för ungdomsrådsstadga - Sida '
    }
  },
  {
    name: 'regenerative-project-guide',
    category: 'education',
    fileNames: {
      en: 'regenerative-project-guide-en',
      sv: 'regenerative-project-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Regenerative Project Guide - Page ',
      sv: 'Guide för regenerativa projekt - Sida '
    }
  },
  {
    name: 'curriculum-mapping-template',
    category: 'education',
    fileNames: {
      en: 'curriculum-mapping-template-en',
      sv: 'curriculum-mapping-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Curriculum Mapping Template - Page ',
      sv: 'Mall för läroplansanpassning - Sida '
    }
  },
  {
    name: 'mne-rubric-template',
    category: 'education',
    fileNames: {
      en: 'mne-rubric-template-en',
      sv: 'mne-rubric-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'M&E Rubric Template - Page ',
      sv: 'M&E-bedömningsmatris mall - Sida '
    }
  },
  {
    name: 'advocacy-playbook',
    category: 'education',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Opinionsbildningshandbok - Sida '
    }
  },
  {
    name: 'bureaucratic-navigation-toolkit',
    category: 'education',
    fileNames: {
      en: 'bureaucratic-navigation-toolkit-en',
      sv: 'bureaucratic-navigation-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Bureaucratic Navigation Toolkit - Page ',
      sv: 'Verktygslåda för byråkratisk navigation - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'education',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Kostnad-nytta-analysmodell - Sida '
    }
  },
  {
    name: 'equity-training-inclusion-checklist',
    category: 'education',
    fileNames: {
      en: 'equity-training-inclusion-checklist-en',
      sv: 'equity-training-inclusion-checklist-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Equity Training Inclusion Checklist - Page ',
      sv: 'Checklista för inkludering av jämlikhetsutbildning - Sida '
    }
  },
  {
    name: 'getting-started-guide',
    category: 'education',
    fileNames: {
      en: 'getting-started-guide-en',
      sv: 'getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Getting Started Guide - Page ',
      sv: 'Kom-igång guide - Sida '
    }
  },
  {
    name: 'spiral-dynamics-intro-educators',
    category: 'education',
    fileNames: {
      en: 'spiral-dynamics-intro-educators-en',
      sv: 'spiral-dynamics-intro-educators-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Spiral Dynamics Intro for Educators - Page ',
      sv: 'Spiral Dynamics intro för utbildare - Sida '
    }
  },
  {
    name: 'systems-thinking-module',
    category: 'education',
    fileNames: {
      en: 'systems-thinking-module-en',
      sv: 'systems-thinking-module-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Systems Thinking Module - Page ',
      sv: 'Systemtänkande modul - Sida '
    }
  },
  {
    name: 'advocacy-playbook',
    category: 'food-systems',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Handbok för påverkansarbete - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'food-systems',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Modell för kostnads-/nyttobedömning - Sida '
    }
  },
  {
    name: 'monitoring-evaluation-rubric',
    category: 'food-systems',
    fileNames: {
      en: 'monitoring-evaluation-rubric-en',
      sv: 'monitoring-evaluation-rubric-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Monitoring & Evaluation Rubric Template - Page ',
      sv: 'Mall för uppföljnings- och utvärderingsmatris - Sida '
    }
  },
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'food-systems',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Verktyg för självskattning av pilotberedskap - Sida '
    }
  },
  {
    name: 'policy-harmonization-toolkit',
    category: 'food-systems',
    fileNames: {
      en: 'policy-harmonization-toolkit-en',
      sv: 'policy-harmonization-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Policy Harmonization Toolkit - Page ',
      sv: 'Verktygslåda för policysamordning - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'food-systems',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter Template - Page ',
      sv: 'Mall för Intressentengagemangsstadga - Sida '
    }
  },
  {
    name: 'tek-integration-template',
    category: 'food-systems',
    fileNames: {
      en: 'tek-integration-template-en',
      sv: 'tek-integration-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'TEK Integration Template - Page ',
      sv: 'Mall för integration av traditionell ekologisk kunskap (TEK) - Sida '
    }
  },
  {
    name: 'seed-kit-getting-started-guide',
    category: 'food-systems',
    fileNames: {
      en: 'seed-kit-getting-started-guide-en',
      sv: 'seed-kit-getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Getting Started Guide for the Seed Kit - Page ',
      sv: 'Startguide för Fröpaketet - Sida '
    }
  },
  {
    name: 'regenerative-farming-guide',
    category: 'food-systems',
    fileNames: {
      en: 'regenerative-farming-guide-en',
      sv: 'regenerative-farming-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Regenerative Farming Guide - Page ',
      sv: 'Guide till regenerativt jordbruk - Sida '
    }
  },
  {
    name: 'quick-guide',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-en',
      sv: 'quick-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food Systems & Agriculture Framework - Lite Guide - Page ',
      sv: 'Mat- och Jordbrukssystem: Enkel Guide - Sida '
    }
  },
  {
    name: 'quick-guide-medium',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-medium-en',
      sv: 'quick-guide-medium-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food and Agriculture Framework – Lite Guide - Page ',
      sv: 'Mat- och Jordbrukssystem – Enkel Guide - Sida '
    }
  },
  {
    name: 'quick-guide-youth',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-medium-youth-en',
      sv: 'quick-guide-medium-youth-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food Systems Lite Guide - Page ',
      sv: 'Matsystem: Enkel Guide - Sida '
    }
  }
];

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
  ul, ol {
    padding-left: 2em;
  }
  li {
    margin-bottom: 0.5em;
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
    '📦': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e6.png', // package
    '📋': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4cb.png', // clipboard
    '🏗️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3d7.png', // building construction
    '📈': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4c8.png', // chart increasing
    '🧪': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9ea.png', // test tube
    '📣': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e3.png', // megaphone
    '🛤️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6e4.png', // railway track
  };

  // Replace each emoji with its image
  Object.keys(emojiMap).forEach(emoji => {
    text = text.replace(new RegExp(emoji, 'g'), `<img src="${emojiMap[emoji]}" alt="${emoji}" class="emoji" />`);
  });

  return text;
}

// Process each tool in each language
async function generatePDFs() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const tool of tools) {
      for (const lang of languages) {
        const fileName = tool.fileNames[lang];
        const inputFile = path.join(tool.sourceDir[lang], `${tool.name}.md`);

        const categoryDir = outputDirs[tool.category];
        // Ensure the category directory exists
        if (!fs.existsSync(categoryDir)) {
          fs.mkdirSync(categoryDir, { recursive: true });
          console.log(`Created directory: ${categoryDir}`);
        }
        const outputFile = path.join(categoryDir, `${fileName}.pdf`);
       
        console.log(`\nProcessing ${lang.toUpperCase()} version of ${tool.name}:`);
        
        if (!fs.existsSync(inputFile)) {
          console.warn(`⚠️ WARNING: Input file not found: ${inputFile}`);
          console.warn(`    Skipping ${fileName}.pdf generation\n`);
          continue;
        }
        
        console.log(`Input file: ${inputFile}`);
        console.log(`Output file: ${outputFile}`);
        
        try {
          let markdown = fs.readFileSync(inputFile, 'utf8');
          console.log(`Read ${markdown.length} characters from source file`);

          // Remove YAML frontmatter if present
          markdown = markdown.replace(/^---[\s\S]*?---/, '');
          
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
          <html lang="${lang}">
          <head>
            <meta charset="UTF-8">
            <title>${fileName}</title>
            <style>${css}</style>
          </head>
          <body>
            ${html}
          </body>
          </html>
          `;
          
          // Save temporary HTML file (optional, for debugging)
          const tempHtmlFile = path.join(__dirname, `temp-${tool.name}-${lang}.html`);
          fs.writeFileSync(tempHtmlFile, fullHtml);
          console.log(`Created temporary HTML file: ${tempHtmlFile}`);
          
          // Create a new page for this tool/language
          const page = await browser.newPage();
          
          // Configure the page
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
          
          // Set content and wait until network is idle (wait for images to load)
          await page.setContent(fullHtml, { 
            waitUntil: 'networkidle0',
            timeout: 30000 // Increase timeout to 30 seconds for image loading
          });
          
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
                <span>${tool.pageFooter[lang]}<span class="pageNumber"></span> / <span class="totalPages"></span></span>
              </div>
            `
          });
          
          // Close the page
          await page.close();
          
          console.log(`✅ PDF generated successfully: ${outputFile}`);
          
          // Also copy the markdown file to the output directory
          const markdownOutputFile = path.join(categoryDir, `${fileName}.md`);
          fs.writeFileSync(markdownOutputFile, markdown);
          console.log(`✅ Markdown file copied to: ${markdownOutputFile}`);
          
        } catch (error) {
          console.error(`❌ Error processing ${fileName}:`, error.message);
          console.error(`    Skipping this file and continuing with next...\n`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error in PDF generation process:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('\n🎉 PDF generation complete');
  }
}

// Run the PDF generation
generatePDFs().catch(console.error);
