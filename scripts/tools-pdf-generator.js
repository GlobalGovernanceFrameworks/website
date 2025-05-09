// tools-pdf-generator.js
// Generates PDFs for all education framework tools and quick-start guides
// Installation: npm install puppeteer marked

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

// Parse command line arguments
const args = process.argv.slice(2);
const targetCategory = args[0]; // Get category from command line argument
console.log(`Target category: ${targetCategory || 'all'}`);

// If no arguments provided, show usage information
if (args.length === 0) {
  console.log(`
Usage: node tools-pdf-generator.js [category]

Available categories:
- education
- food-systems
- energy
- peace
- economic

Example: node tools-pdf-generator.js economic
  `);
  // Uncomment the line below if you want to exit when no category is provided
  // process.exit(0);
}

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const languages = ['en', 'sv'];
const outputDirs = {
  'education': path.join(__dirname, '..', 'static', 'framework', 'tools', 'education'),
  'food-systems': path.join(__dirname, '..', 'static', 'framework', 'tools', 'food-systems'),
  'energy': path.join(__dirname, '..', 'static', 'framework', 'tools', 'energy'),
  'peace': path.join(__dirname, '..', 'static', 'framework', 'tools', 'peace'),
  'economic': path.join(__dirname, '..', 'static', 'framework', 'tools', 'economic'),
};

// Validate category if provided
if (targetCategory && !Object.keys(outputDirs).includes(targetCategory)) {
  console.error(`Error: Invalid category '${targetCategory}'`);
  console.error(`Valid categories are: ${Object.keys(outputDirs).join(', ')}`);
  process.exit(1);
}

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
  },
  {
    name: 'climate-energy-action-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-action-guide-en',
      sv: 'climate-energy-action-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy')
    },
    pageFooter: {
      en: 'Climate Action Guide - Page ',
      sv: 'Klimataktionsguide - Sida '
    }
  },
  {
    name: 'climate-energy-stakeholder-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-stakeholder-guide-en',
      sv: 'climate-energy-stakeholder-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy')
    },
    pageFooter: {
      en: 'Stakeholder Implementation Guide for the Climate & Energy Governance Framework - Page ',
      sv: 'Implementeringsguide för intressenter inom ramen för klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'climate-energy-technical-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-technical-guide-en',
      sv: 'climate-energy-technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers and Officials: Climate & Energy Governance Framework - Page ',
      sv: 'Teknisk guide för beslutsfattare och tjänstemän: Ramverk för klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'adaptation-planning-framework',
    category: 'energy',
    fileNames: {
      en: 'adaptation-planning-framework-en',
      sv: 'adaptation-planning-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Adaptation Planning Framework - Page ',
      sv: 'Ramverk för anpassningsplanering - Sida '
    }
  },
  {
    name: 'carbon-pricing-guide',
    category: 'energy',
    fileNames: {
      en: 'carbon-pricing-guide-en',
      sv: 'carbon-pricing-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Carbon Pricing Implementation Guide - Page ',
      sv: 'Implementeringsguide för koldioxidprissättning - Sida '
    }
  },
  {
    name: 'energy-transition-roadmap',
    category: 'energy',
    fileNames: {
      en: 'energy-transition-roadmap-en',
      sv: 'energy-transition-roadmap-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Energy Transition Roadmap Template - Page ',
      sv: 'Mall för färdplan för energiomställning - Sida '
    }
  },
  {
    name: 'finance-access-navigator',
    category: 'energy',
    fileNames: {
      en: 'finance-access-navigator-en',
      sv: 'finance-access-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Finance Access Navigator - Page ',
      sv: 'Klimatfinansieringsåtkomstnavigator - Sida '
    }
  },
  {
    name: 'governance-communication-toolkit',
    category: 'energy',
    fileNames: {
      en: 'governance-communication-toolkit-en',
      sv: 'governance-communication-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Governance Communication Toolkit - Page ',
      sv: 'Verktygslåda för styrningskommunikation - Sida '
    }
  },
  {
    name: 'governance-coordination-guide',
    category: 'energy',
    fileNames: {
      en: 'governance-coordination-guide-en',
      sv: 'governance-coordination-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Multi-level Governance Coordination Guide - Page ',
      sv: 'Guide för samordning av flernivåstyrning - Sida '
    }
  },
  {
    name: 'governance-readiness-assessment',
    category: 'energy',
    fileNames: {
      en: 'governance-readiness-assessment-en',
      sv: 'governance-readiness-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Governance Readiness Assessment Tool - Page ',
      sv: 'Verktyg för bedömning av styrningsberedskap - Sida '
    }
  },
  {
    name: 'innovation-acceleration-kit',
    category: 'energy',
    fileNames: {
      en: 'innovation-acceleration-kit-en',
      sv: 'innovation-acceleration-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Innovation Acceleration Kit - Page ',
      sv: 'Accelerationspaket för klimatinnovation - Sida '
    }
  },
  {
    name: 'institutional-reform-guide',
    category: 'energy',
    fileNames: {
      en: 'institutional-reform-guide-en',
      sv: 'institutional-reform-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Institutional Reform Guide - Page ',
      sv: 'Guide till klimatinstitutionell reform - Sida '
    }
  },
  {
    name: 'just-transition-planning-template',
    category: 'energy',
    fileNames: {
      en: 'just-transition-planning-template-en',
      sv: 'just-transition-planning-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Just Transition Planning Template - Page ',
      sv: 'Mall för planering av en rättvis övergång - Sida '
    }
  },
  {
    name: 'nature-based-solutions-tool',
    category: 'energy',
    fileNames: {
      en: 'nature-based-solutions-tool-en',
      sv: 'nature-based-solutions-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Nature-based Solutions Assessment Tool - Page ',
      sv: 'Utvärderingsverktyg för naturbaserade lösningar - Sida '
    }
  },
  {
    name: 'policy-brief-templates',
    category: 'energy',
    fileNames: {
      en: 'policy-brief-templates-en',
      sv: 'policy-brief-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Policy Brief Templates - Page ',
      sv: 'Mallar för klimatpolicyöversikter - Sida '
    }
  },
  {
    name: 'policy-integration-matrix',
    category: 'energy',
    fileNames: {
      en: 'policy-integration-matrix-en',
      sv: 'policy-integration-matrix-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate-Energy Policy Integration Matrix - Page ',
      sv: 'Integrationsmatris för klimat- och energipolitik - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-protocol',
    category: 'energy',
    fileNames: {
      en: 'stakeholder-engagement-protocol-en',
      sv: 'stakeholder-engagement-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Protocol - Page ',
      sv: 'Protokoll för intressentengagemang - Sida '
    }
  },
  {
    name: 'background-context-document',
    category: 'energy',
    fileNames: {
      en: 'background-context-document-en',
      sv: 'background-context-document-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Background/Context Document: Climate & Energy Governance Implementation Framework - Page ',
      sv: 'Bakgrunds-/kontextdokument: Ramverk för implementering av klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'case-studies-or-examples',
    category: 'energy',
    fileNames: {
      en: 'case-studies-or-examples-en',
      sv: 'case-studies-or-examples-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Case Studies or Examples: Climate & Energy Governance Implementation Framework - Page ',
      sv: 'Fallstudier eller exempel: Ramverk för implementering av klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'evaluation-or-monitoring-framework',
    category: 'energy',
    fileNames: {
      en: 'evaluation-or-monitoring-framework-en',
      sv: 'evaluation-or-monitoring-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Evaluation or Monitoring Framework - Page ',
      sv: 'Utvärderings- eller övervakningsramverk - Sida '
    }
  },
  {
    name: 'getting-started-guide',
    category: 'energy',
    fileNames: {
      en: 'getting-started-guide-en',
      sv: 'getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Climate Governance Seed Kit Getting Started Guide - Page ',
      sv: 'Guide för att komma igång med klimatstyrningsfröpaket - Sida '
    }
  },
  {
    name: 'regional-hub-connection-guide',
    category: 'energy',
    fileNames: {
      en: 'regional-hub-connection-guide-en',
      sv: 'regional-hub-connection-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Regional Hub Connection Guide - Page ',
      sv: 'Guide för regionala knutpunkter - Sida '
    }
  },
  {
    name: 'technical-guide-policymakers',
    category: 'peace',
    fileNames: {
      en: 'technical-guide-policymakers-en',
      sv: 'technical-guide-policymakers-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers and Mediators - Page ',
      sv: 'Teknisk guide för beslutsfattare och medlare - Sida '
    }
  },
  {
    name: 'community-peace-guide',
    category: 'peace',
    fileNames: {
      en: 'community-peace-guide-en',
      sv: 'community-peace-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Community Peace Implementation Guide - Page ',
      sv: 'Guide till implementering av fred i samhället - Sida '
    }
  },
  {
    name: 'youth-peace-action-guide',
    category: 'peace',
    fileNames: {
      en: 'youth-peace-action-guide-en',
      sv: 'youth-peace-action-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Youth Peace Action Guide - Page ',
      sv: 'Ungdomsfredsguide - Sida '
    }
  },
  {
    name: 'digital-peace-ethics-guide',
    category: 'peace',
    fileNames: {
      en: 'digital-peace-ethics-guide-en',
      sv: 'digital-peace-ethics-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Digital Peace Ethics Guide - Page ',
      sv: 'Digital fredsetisk guide - Sida '
    }
  },
  {
    name: 'conflict-analysis-framework',
    category: 'peace',
    fileNames: {
      en: 'conflict-analysis-framework-en',
      sv: 'conflict-analysis-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict Analysis Framework - Page ',
      sv: 'Ramverk för konfliktanalys - Sida '
    }
  },
  {
    name: 'peace-committee-charter',
    category: 'peace',
    fileNames: {
      en: 'peace-committee-charter-en',
      sv: 'peace-committee-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Local Peace Committee Charter Template - Page ',
      sv: 'Mall för stadgar för lokal fredskommitté - Sida '
    }
  },
  {
    name: 'multi-track-dialogue-protocol',
    category: 'peace',
    fileNames: {
      en: 'multi-track-dialogue-protocol-en',
      sv: 'multi-track-dialogue-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Multi-Track Dialogue Protocol - Page ',
      sv: 'Protokoll för flerspårig dialog - Sida '
    }
  },
  {
    name: 'early-warning-design-guide',
    category: 'peace',
    fileNames: {
      en: 'early-warning-design-guide-en',
      sv: 'early-warning-design-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Early Warning System Design Guide - Page ',
      sv: 'Guide för design av tidiga varningssystem - Sida '
    }
  },
  {
    name: 'peace-tech-ethics-assessment',
    category: 'peace',
    fileNames: {
      en: 'peace-tech-ethics-assessment-en',
      sv: 'peace-tech-ethics-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace-Technology Ethics Assessment - Page ',
      sv: 'Etisk bedömning av fredsteknologi - Sida '
    }
  },
  {
    name: 'value-system-mapping-template',
    category: 'peace',
    fileNames: {
      en: 'value-system-mapping-template-en',
      sv: 'value-system-mapping-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Value System Mapping Template - Page ',
      sv: 'Mall för värdesystemkartläggning - Sida '
    }
  },
  // Context-Specific Implementation Guides
  {
    name: 'urban-conflict-toolkit',
    category: 'peace',
    fileNames: {
      en: 'urban-conflict-toolkit-en',
      sv: 'urban-conflict-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Urban Conflict Mediation Toolkit - Page ',
      sv: 'Verktyg för medling av urbana konflikter - Sida '
    }
  },
  {
    name: 'resource-conflict-guide',
    category: 'peace',
    fileNames: {
      en: 'resource-conflict-guide-en',
      sv: 'resource-conflict-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Resource Conflict Transformation Guide - Page ',
      sv: 'Guide för omvandling av resurskonflikter - Sida '
    }
  },
  {
    name: 'reconciliation-framework',
    category: 'peace',
    fileNames: {
      en: 'reconciliation-framework-en',
      sv: 'reconciliation-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Post-Conflict Reconciliation Framework - Page ',
      sv: 'Ramverk för försoning efter konflikt - Sida '
    }
  },
  {
    name: 'business-peace-guide',
    category: 'peace',
    fileNames: {
      en: 'business-peace-guide-en',
      sv: 'business-peace-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Private Sector Peace Engagement Guide - Page ',
      sv: 'Guide för privat sektors fredsengagemang - Sida '
    }
  },
  {
    name: 'protection-transition-manual',
    category: 'peace',
    fileNames: {
      en: 'protection-transition-manual-en',
      sv: 'protection-transition-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Military-Civilian Protection Transition Manual - Page ',
      sv: 'Manual för militär-civil skyddsövergång - Sida '
    }
  },

  // Advocacy & Scaling Tools
  {
    name: 'peace-advocacy-toolkit',
    category: 'peace',
    fileNames: {
      en: 'peace-advocacy-toolkit-en',
      sv: 'peace-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Advocacy Campaign Toolkit - Page ',
      sv: 'Verktygslåda för fredsförespråkande kampanjer - Sida '
    }
  },
  {
    name: 'peace-financing-navigator',
    category: 'peace',
    fileNames: {
      en: 'peace-financing-navigator-en',
      sv: 'peace-financing-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Financing Navigator - Page ',
      sv: 'Navigator för fredsfinansiering - Sida '
    }
  },
  {
    name: 'institutional-integration-guide',
    category: 'peace',
    fileNames: {
      en: 'institutional-integration-guide-en',
      sv: 'institutional-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Institutional Peace Integration Guide - Page ',
      sv: 'Guide för institutionell fredsintegration - Sida '
    }
  },
  {
    name: 'media-peace-messaging-guide',
    category: 'peace',
    fileNames: {
      en: 'media-peace-messaging-guide-en',
      sv: 'media-peace-messaging-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Media Peace Messaging Guide - Page ',
      sv: 'Guide för mediefredsbudskap - Sida '
    }
  },

  // Low-Resource Funding Implementation Tools
  {
    name: 'community-peace-fund-guide',
    category: 'peace',
    fileNames: {
      en: 'community-peace-fund-guide-en',
      sv: 'community-peace-fund-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Community Peace Fund Establishment Guide - Page ',
      sv: 'Guide för upprättande av lokala fredsfonder - Sida '
    }
  },
  {
    name: 'peace-micro-grant-template',
    category: 'peace',
    fileNames: {
      en: 'peace-micro-grant-template-en',
      sv: 'peace-micro-grant-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Micro-Grant Template - Page ',
      sv: 'Mall för fredsmikrobidrag - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'peace',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Resource Mapping Tool - Page ',
      sv: 'Verktyg för resurskartläggning - Sida '
    }
  },
  {
    name: 'hybrid-funding-agreement',
    category: 'peace',
    fileNames: {
      en: 'hybrid-funding-agreement-en',
      sv: 'hybrid-funding-agreement-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Hybrid Funding Agreement Template - Page ',
      sv: 'Mall för hybridfinansieringsavtal - Sida '
    }
  },
  {
    name: 'peace-fund-sustainability-calculator',
    category: 'peace',
    fileNames: {
      en: 'peace-fund-sustainability-calculator-en',
      sv: 'peace-fund-sustainability-calculator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Fund Sustainability Calculator - Page ',
      sv: 'Hållbarhetskalkylator för fredsfonder - Sida '
    }
  },

  // Traditional Peace Tools
  {
    name: 'islamic-mediation-protocol',
    category: 'peace',
    fileNames: {
      en: 'islamic-mediation-protocol-en',
      sv: 'islamic-mediation-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Islamic-Informed Mediation Protocol - Page ',
      sv: 'Islamiskt informerat medlingsprotokoll - Sida '
    }
  },
  {
    name: 'confucian-dialogue-template',
    category: 'peace',
    fileNames: {
      en: 'confucian-dialogue-template-en',
      sv: 'confucian-dialogue-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Confucian Harmony-Based Dialogue Template - Page ',
      sv: 'Mall för konfuciansk harmonibaserad dialog - Sida '
    }
  },
  {
    name: 'trauma-informed-toolkit',
    category: 'peace',
    fileNames: {
      en: 'trauma-informed-toolkit-en',
      sv: 'trauma-informed-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Trauma-Informed Facilitation Toolkit - Page ',
      sv: 'Traumabaserad faciliteringsverktyg - Sida '
    }
  },
  {
    name: 'cross-cultural-integration-guide',
    category: 'peace',
    fileNames: {
      en: 'cross-cultural-integration-guide-en',
      sv: 'cross-cultural-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Cross-Cultural Peace Tradition Integration Guide - Page ',
      sv: 'Guide för integrering av tvärkulturella fredstraditioner - Sida '
    }
  },
  {
    name: 'causal-loop-template',
    category: 'peace',
    fileNames: {
      en: 'causal-loop-template-en',
      sv: 'causal-loop-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Causal Loop Diagramming Template - Page ',
      sv: 'Mall för kausal loopdiagram - Sida '
    }
  },
  {
    name: 'systemic-stakeholder-mapping',
    category: 'peace',
    fileNames: {
      en: 'systemic-stakeholder-mapping-en',
      sv: 'systemic-stakeholder-mapping-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systemic Stakeholder Mapping - Page ',
      sv: 'Systemisk intressentkartläggning - Sida '
    }
  },
  {
    name: 'system-boundary-guide',
    category: 'peace',
    fileNames: {
      en: 'system-boundary-guide-en',
      sv: 'system-boundary-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'System Boundary Definition Guide - Page ',
      sv: 'Guide för definition av systemgränser - Sida '
    }
  },
  {
    name: 'stock-flow-analysis',
    category: 'peace',
    fileNames: {
      en: 'stock-flow-analysis-en',
      sv: 'stock-flow-analysis-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Stock and Flow Analysis Framework for Peace & Conflict Resolution - Page ',
      sv: 'Analysramverk för lager och flöden inom freds- och konfliktarbete - Sida '
    }
  },
  {
    name: 'conflict-iceberg-template',
    category: 'peace',
    fileNames: {
      en: 'conflict-iceberg-template-en',
      sv: 'conflict-iceberg-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict Iceberg Model Template - Page ',
      sv: 'Mall för konfliktisbergsmodell - Sida '
    }
  },
  {
    name: 'conflict-archetype-guide',
    category: 'peace',
    fileNames: {
      en: 'conflict-archetype-guide-en',
      sv: 'conflict-archetype-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict System Archetype Guide - Page ',
      sv: 'Guide till arketyper för konfliktsystem - Sida '
    }
  },
  {
    name: 'leverage-point-matrix',
    category: 'peace',
    fileNames: {
      en: 'leverage-point-matrix-en',
      sv: 'leverage-point-matrix-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Leverage Point Identification Matrix - Page ',
      sv: 'Matris för identifiering av hävstångspunkter - Sida '
    }
  },
  {
    name: 'systems-scenario-planning',
    category: 'peace',
    fileNames: {
      en: 'systems-scenario-planning-en',
      sv: 'systems-scenario-planning-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systems-Based Scenario Planning - Page ',
      sv: 'Systembaserad scenarioplanering - Sida '
    }
  },
  {
    name: 'systemic-outcomes-harvesting',
    category: 'peace',
    fileNames: {
      en: 'systemic-outcomes-harvesting-en',
      sv: 'systemic-outcomes-harvesting-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systemic Outcomes Harvesting - Page ',
      sv: 'Systemisk utfallsuppsamling - Sida '
    }
  },
  {
    name: 'community-systems-mapping',
    category: 'peace',
    fileNames: {
      en: 'community-systems-mapping-en',
      sv: 'community-systems-mapping-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Community Systems Mapping Guide - Page ',
      sv: 'Guide för kartläggning av samhällssystem - Sida '
    }
  },
  {
    name: 'organizational-systems-analysis',
    category: 'peace',
    fileNames: {
      en: 'organizational-systems-analysis-en',
      sv: 'organizational-systems-analysis-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Organizational Systems Analysis Framework - Page ',
      sv: 'Ramverk för organisatorisk systemanalys - Sida '
    }
  },
  {
    name: 'policy-systems-assessment',
    category: 'peace',
    fileNames: {
      en: 'policy-systems-assessment-en',
      sv: 'policy-systems-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Policy Systems Assessment Framework - Page ',
      sv: 'Ramverk för bedömning av fredspolitiska system - Sida '
    }
  },
  // Lite Guides
  {
    name: 'technical-guide',
    category: 'economic',
    fileNames: {
      en: 'technical-guide-en',
      sv: 'technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers - Page ',
      sv: 'Teknisk guide för beslutsfattare - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'economic',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Community Economic Implementation Guide - Page ',
      sv: 'Samhällsguide för ekonomisk implementering - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'economic',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Youth Economic Action Guide - Page ',
      sv: 'Ekonomisk handlingsguide för ungdomar - Sida '
    }
  },
  {
    name: 'digital-ethics',
    category: 'economic',
    fileNames: {
      en: 'digital-ethics-en',
      sv: 'digital-ethics-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Digital Economic Ethics Guide - Page ',
      sv: 'Digital ekonomietikguide - Sida '
    }
  },
  {
    name: 'indigenous-guide',
    category: 'economic',
    fileNames: {
      en: 'indigenous-guide-en',
      sv: 'indigenous-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Indigenous Economic Stewardship Guide - Page ',
      sv: 'Urfolks ekonomiska förvaltningsguide - Sida '
    }
  },

  // Core Governance Tools
  {
    name: 'economic-analysis-framework',
    category: 'economic',
    fileNames: {
      en: 'economic-analysis-framework-en',
      sv: 'economic-analysis-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Analysis Framework - Page ',
      sv: 'Ramverk för ekonomisk analys - Sida '
    }
  },
  {
    name: 'currency-design-template',
    category: 'economic',
    fileNames: {
      en: 'currency-design-template-en',
      sv: 'currency-design-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Community Currency Design Template - Page ',
      sv: 'Mall för design av lokalvaluta - Sida '
    }
  },
  {
    name: 'participatory-budgeting-protocol',
    category: 'economic',
    fileNames: {
      en: 'participatory-budgeting-protocol-en',
      sv: 'participatory-budgeting-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Participatory Budgeting Protocol - Page ',
      sv: 'Protokoll för deltagarbudgetering - Sida '
    }
  },
  {
    name: 'ethical-trade-zone-charter',
    category: 'economic',
    fileNames: {
      en: 'ethical-trade-zone-charter-en',
      sv: 'ethical-trade-zone-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Ethical Trade Zone Charter - Page ',
      sv: 'Stadga för etisk handelszon - Sida '
    }
  },
  {
    name: 'aubi-implementation-guide',
    category: 'economic',
    fileNames: {
      en: 'aubi-implementation-guide-en',
      sv: 'aubi-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'AUBI Implementation Guide - Page ',
      sv: 'Implementeringsguide för AUBI - Sida '
    }
  },
  {
    name: 'commons-management-toolkit',
    category: 'economic',
    fileNames: {
      en: 'commons-management-toolkit-en',
      sv: 'commons-management-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Commons Management Toolkit - Page ',
      sv: 'Verktygslåda för allmänningsförvaltning - Sida '
    }
  },

  // Context-Specific Implementation Guides
  {
    name: 'urban-economic-toolkit',
    category: 'economic',
    fileNames: {
      en: 'urban-economic-toolkit-en',
      sv: 'urban-economic-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Urban Economic Integration Toolkit - Page ',
      sv: 'Verktygslåda för urban ekonomisk integration - Sida '
    }
  },
  {
    name: 'rural-cooperative-guide',
    category: 'economic',
    fileNames: {
      en: 'rural-cooperative-guide-en',
      sv: 'rural-cooperative-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Rural Cooperative Development Guide - Page ',
      sv: 'Utvecklingsguide för landsbygdskooperativ - Sida '
    }
  },
  {
    name: 'bioregional-protocol',
    category: 'economic',
    fileNames: {
      en: 'bioregional-protocol-en',
      sv: 'bioregional-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Bioregional Resource Sharing Protocol - Page ',
      sv: 'Protokoll för bioregional resursdelning - Sida '
    }
  },
  {
    name: 'global-commons-framework',
    category: 'economic',
    fileNames: {
      en: 'global-commons-framework-en',
      sv: 'global-commons-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Global Commons Governance Framework - Page ',
      sv: 'Ramverk för global allmänningsstyrning - Sida '
    }
  },

  // Advocacy & Scaling Tools
  {
    name: 'economic-advocacy-toolkit',
    category: 'economic',
    fileNames: {
      en: 'economic-advocacy-toolkit-en',
      sv: 'economic-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Advocacy Campaign Toolkit - Page ',
      sv: 'Verktygslåda för ekonomisk påverkanskampanj - Sida '
    }
  },
  {
    name: 'economic-financing-navigator',
    category: 'economic',
    fileNames: {
      en: 'economic-financing-navigator-en',
      sv: 'economic-financing-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Financing Navigator - Page ',
      sv: 'Navigator för ekonomisk finansiering - Sida '
    }
  },
  {
    name: 'institutional-integration-guide',
    category: 'economic',
    fileNames: {
      en: 'institutional-integration-guide-en',
      sv: 'institutional-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Institutional Economic Integration Guide - Page ',
      sv: 'Guide för institutionell ekonomisk integration - Sida '
    }
  },
  {
    name: 'ppp-template',
    category: 'economic',
    fileNames: {
      en: 'ppp-template-en',
      sv: 'ppp-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Public-Private Partnership Template - Page ',
      sv: 'Mall för offentlig-privat partnerskap - Sida '
    }
  },

  // Low-Resource Funding Tools
  {
    name: 'community-economic-fund-guide',
    category: 'economic',
    fileNames: {
      en: 'community-economic-fund-guide-en',
      sv: 'community-economic-fund-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Community Economic Fund Guide - Page ',
      sv: 'Guide för samhällsekonomisk fond - Sida '
    }
  },
  {
    name: 'economic-micro-grant-template',
    category: 'economic',
    fileNames: {
      en: 'economic-micro-grant-template-en',
      sv: 'economic-micro-grant-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Micro-Grant Template - Page ',
      sv: 'Mall för ekonomiskt mikrobidrag - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'economic',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Resource Mapping Tool - Page ',
      sv: 'Verktyg för resurskartläggning - Sida '
    }
  },

  // Digital Tools
  {
    name: 'currency-simulator-app',
    category: 'economic',
    fileNames: {
      en: 'currency-simulator-app-en',
      sv: 'currency-simulator-app-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Currency Simulator App - Page ',
      sv: 'Valutasimulatorapp - Sida '
    }
  },
  {
    name: 'nested-economic-health-dashboard',
    category: 'economic',
    fileNames: {
      en: 'nested-economic-health-dashboard-en',
      sv: 'nested-economic-health-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Nested Economic Health Index Dashboard - Page ',
      sv: 'Dashboard för nästlat ekonomiskt hälsoindex - Sida '
    }
  },
  {
    name: 'ai-chatbot-for-tool-navigation',
    category: 'economic',
    fileNames: {
      en: 'ai-chatbot-for-tool-navigation-en',
      sv: 'ai-chatbot-for-tool-navigation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'AI Chatbot for Tool Navigation - Page ',
      sv: 'AI-chatbot för verktygsnavigering - Sida '
    }
  },
  {
    name: 'real-time-collaboration-platform',
    category: 'economic',
    fileNames: {
      en: 'real-time-collaboration-platform-en',
      sv: 'real-time-collaboration-platform-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Real-Time Collaboration Platform - Page ',
      sv: 'Realtidssamarbetsplattform - Sida '
    }
  },
  {
    name: 'sample-audit-report-template',
    category: 'economic',
    fileNames: {
      en: 'sample-audit-report-template-en',
      sv: 'sample-audit-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Sample Audit Report Template - Page ',
      sv: 'Exempel på mall för revisionsrapport - Sida '
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

  // Filter tools by category if a target category was specified
  const toolsToProcess = targetCategory 
    ? tools.filter(tool => tool.category === targetCategory)
    : tools;
  
  console.log(`Processing ${toolsToProcess.length} tools in category: ${targetCategory || 'all'}`);

  try {
    for (const tool of toolsToProcess) {
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

          // Delete the temporary HTML file
          fs.unlinkSync(tempHtmlFile);
          console.log(`🗑️ Deleted temporary HTML file: ${tempHtmlFile}`);
          
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
    console.log(`\n🎉 PDF generation complete for category: ${targetCategory || 'all'}`);
  }
}

// Run the PDF generation
generatePDFs().catch(console.error);
