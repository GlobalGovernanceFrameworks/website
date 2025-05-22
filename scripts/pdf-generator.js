// pdf-generator.js
// Generates PDFs for all frameworks: full frameworks, tools and quick-start guides
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
- digital
- ethics
- justice
- spiritual
- financial-systems
- governance
- environmental-stewardship

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
  'digital': path.join(__dirname, '..', 'static', 'framework', 'tools', 'digital'),
  'ethics': path.join(__dirname, '..', 'static', 'framework', 'tools', 'ethics'),
  'justice': path.join(__dirname, '..', 'static', 'framework', 'tools', 'justice'),
  'spiritual': path.join(__dirname, '..', 'static', 'framework', 'tools', 'spiritual'),
  'financial-systems': path.join(__dirname, '..', 'static', 'framework', 'tools', 'financial-systems'),
  'environmental-stewardship': path.join(__dirname, '..', 'static', 'framework', 'tools', 'environmental-stewardship'),
  'governance': path.join(__dirname, '..', 'static', 'framework', 'tools', 'governance')
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
    name: 'ethics-framework-standard',
    category: 'ethics',
    fileNames: {
      en: 'Global-Ethics-Rights',
      sv: 'Global-Ethics-Rights'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'standard'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'standard')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Rights of Beings Standard - Page ',
      sv: 'Rättigheter för Varelser Standard - Sida '
    },
    // Full framework combined sections in proper order
    sections: [
      '0-preamble',
      '1-introduction',
      '2-foundational-values',
      '2.3-global-ethical-traditions',
      '2.5-rights-of-beings',
      '2.6-scientific-foundations',
      '3-commitments',
      '3.1-traditional-rights',
      '3.2-emerging-rights',
      '3.2.1-ai-consciousness',
      '3.2.1a-assessment-hub-network',
      '3.2.1b-scientific-standards',
      '3.2.2-ambiguous-entities',
      '3.2.3-measurement-standards',
      '3.2.4-recognition-pathways',
      '3.2.5-non-western-recognition',
      '3.3-conflict-resolution',
      '3.3.1-moon-wish-test',
      '4-governance-mechanisms',
      '4.1-transparency',
      '4.2-inclusive-decision-making',
      '4.3-conflict-resolution',
      '4.4-guardianship-councils',
      '4.4.1-enforcement-mechanisms',
      '4.4.2-non-compliance-strategy',
      '4.5-funding-model',
      '4.5.1-hub-sustainability',
      '4.5.2-resource-optimization',
      '4.6-governance-accountability',
      '4.7-entity-conflict-resolution',
      '4.8-interoperability',
      '4.9-decision-making',
      '4.10-coordination-mechanisms',
      '5-implementation',
      '5.1-quick-wins',
      '5.1.1-cost-analysis',
      '5.2-phased-rollout',
      '5.2.1-space-ethics',
      '5.3-education-accessibility',
      '5.3.1-resource-constraint',
      '5.3.2-cultural-accessibility',
      '5.3.3-knowledge-integration',
      '5.4-global-cooperation',
      '5.5-monitoring',
      '5.6-public-engagement',
      '5.7-stakeholder-strategy',
      '5.7.1-consensus-building',
      '5.7.2-resistant-stakeholder',
      '5.8-resistance-handling',
      '5.8.1-opposition-response',
      '5.8.2-learning-system',
      '5.9-benchmarks-metrics',
      '5.10-scenario-planning',
      '5.11-accessibility-matrix',
      '6-appendices',
      '6.1-emerging-rights-toolkit',
      '6.2-case-studies',
      '6.3-ethical-forecasting',
      '6.3.1-speculative-paradigm',
      '6.3.2-validation-protocols',
      '6.4-reporting-portal',
      '6.5-plain-language',
      '6.6-edge-case-protocols',
      '6.7-philosophy-of-rights',
      '6.8-spiral-aware-primer',
      '6.9-impact-assessment',
      '6.10-pioneer-pilots',
      '6.11-crisis-ethics',
      '6.12-technical-protocols'
    ]
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
  },
  // Digital Commons Framework - Main Guides
  {
    name: 'technical-guide',
    category: 'digital',
    fileNames: {
      en: 'technical-guide-en',
      sv: 'technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers: Digital Commons Framework - Page ',
      sv: 'Teknisk guide för beslutsfattare: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'digital',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Community Implementation Guide: Digital Commons Framework - Page ',
      sv: 'Samhällsguide för implementering: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'digital',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Youth Engagement Guide: Digital Commons Framework - Page ',
      sv: 'Engagemangsguide för ungdomar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'digital-ethics-guide',
    category: 'digital',
    fileNames: {
      en: 'digital-ethics-guide-en',
      sv: 'digital-ethics-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Digital Ethics Guide: Digital Commons Framework - Page ',
      sv: 'Digital etikguide: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'indigenous-guide',
    category: 'digital',
    fileNames: {
      en: 'indigenous-guide-en',
      sv: 'indigenous-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Indigenous Data Stewardship Guide: Digital Commons Framework - Page ',
      sv: 'Förvaltningsguide för urfolksdata: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Core Governance Tools
  {
    name: 'node-setup-guide',
    category: 'digital',
    fileNames: {
      en: 'node-setup-guide-en',
      sv: 'node-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Node Setup Guide: Digital Commons Framework - Page ',
      sv: 'Guide för nodinställning: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'sms-voting-template',
    category: 'digital',
    fileNames: {
      en: 'sms-voting-template-en',
      sv: 'sms-voting-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'SMS Voting Template: Digital Commons Framework - Page ',
      sv: 'SMS röstmall: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'data-sovereignty-protocol',
    category: 'digital',
    fileNames: {
      en: 'data-sovereignty-protocol-en',
      sv: 'data-sovereignty-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Data Sovereignty Protocol: Digital Commons Framework - Page ',
      sv: 'Datsuveränitetsprotokoll: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'ethical-ai-audit-checklist',
    category: 'digital',
    fileNames: {
      en: 'ethical-ai-audit-checklist-en',
      sv: 'ethical-ai-audit-checklist-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Ethical AI Audit Checklist: Digital Commons Framework - Page ',
      sv: 'Etisk AI-granskningschecklista: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'glossary',
    category: 'digital',
    fileNames: {
      en: 'glossary-en',
      sv: 'glossary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Commons Glossary: Digital Commons Framework - Page ',
      sv: 'Allmänningsordlista: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'failure-analysis-report-template',
    category: 'digital',
    fileNames: {
      en: 'failure-analysis-report-template-en',
      sv: 'failure-analysis-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Failure Analysis Report Template: Digital Commons Framework - Page ',
      sv: 'Mall för felhändelsanalys: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'impact-assessment-template',
    category: 'digital',
    fileNames: {
      en: 'impact-assessment-template-en',
      sv: 'impact-assessment-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Impact Assessment Template: Digital Commons Framework - Page ',
      sv: 'Mall för konsekvensanalys: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Context-Specific Implementation Guides
  {
    name: 'commons-in-practice-documentation',
    category: 'digital',
    fileNames: {
      en: 'commons-in-practice-documentation-en',
      sv: 'commons-in-practice-documentation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Digital Commons in Practice Documentation - Page ',
      sv: 'Dokumentation om digitala allmänna villkor i praktiken - Sida '
    }
  },
  {
    name: 'rural-digital-commons-toolkit',
    category: 'digital',
    fileNames: {
      en: 'rural-digital-commons-toolkit-en',
      sv: 'rural-digital-commons-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Rural Digital Commons Toolkit: Digital Commons Framework - Page ',
      sv: 'Verktygslåda för landsortens digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'urban-digital-commons-guide',
    category: 'digital',
    fileNames: {
      en: 'urban-digital-commons-guide-en',
      sv: 'urban-digital-commons-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Urban Digital Commons Guide: Digital Commons Framework - Page ',
      sv: 'Guide för urbana digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'disaster-resilient-commons-protocol',
    category: 'digital',
    fileNames: {
      en: 'disaster-resilient-commons-protocol-en',
      sv: 'disaster-resilient-commons-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Disaster-Resilient Commons Protocol: Digital Commons Framework - Page ',
      sv: 'Katastrofmotståndskraftigt allmänningsprotokoll: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'global-commons-governance-framework',
    category: 'digital',
    fileNames: {
      en: 'global-commons-governance-framework-en',
      sv: 'global-commons-governance-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Global Commons Governance Framework: Digital Commons Framework - Page ',
      sv: 'Globalt styrsystem för allmänningar: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Advocacy & Scaling Tools
  {
    name: 'digital-commons-advocacy-toolkit',
    category: 'digital',
    fileNames: {
      en: 'digital-commons-advocacy-toolkit-en',
      sv: 'digital-commons-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Digital Commons Advocacy Toolkit: Digital Commons Framework - Page ',
      sv: 'Verktygslåda för förespråkande av digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'funding-navigator',
    category: 'digital',
    fileNames: {
      en: 'funding-navigator-en',
      sv: 'funding-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Funding Navigator: Digital Commons Framework - Page ',
      sv: 'Finansieringsnavigator: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'ppp-template',
    category: 'digital',
    fileNames: {
      en: 'ppp-template-en',
      sv: 'ppp-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Public-Private Partnership Template: Digital Commons Framework - Page ',
      sv: 'Mall för offentlig-privat partnerskap: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Low-Resource Tools
  {
    name: 'community-funding-guide',
    category: 'digital',
    fileNames: {
      en: 'community-funding-guide-en',
      sv: 'community-funding-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'low-resource'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'low-resource')
    },
    pageFooter: {
      en: 'Community Funding Guide: Digital Commons Framework - Page ',
      sv: 'Guide för samhällsfinansiering: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'digital',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'low-resource'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'low-resource')
    },
    pageFooter: {
      en: 'Resource Mapping Tool: Digital Commons Framework - Page ',
      sv: 'Verktyg för resurskartering: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Audit Tools
  {
    name: 'audit-report-template',
    category: 'digital',
    fileNames: {
      en: 'audit-report-template-en',
      sv: 'audit-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'audit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'audit')
    },
    pageFooter: {
      en: 'Audit Report Template: Digital Commons Framework - Page ',
      sv: 'Mall för granskningsrapport: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Appendices (for the seed kit)
  {
    name: 'appendix-b-visual-companion-toolkit',
    category: 'digital',
    fileNames: {
      en: 'visual-companion-toolkit-en',
      sv: 'visual-companion-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix B: Visual Companion Toolkit - Digital Commons Framework - Page ',
      sv: 'Bilaga B: Visuellt Följeslagarverktyg - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-c-corporate-participation-playbook',
    category: 'digital',
    fileNames: {
      en: 'corporate-participation-playbook-en',
      sv: 'corporate-participation-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix C: Corporate Participation Playbook - Digital Commons Framework - Page ',
      sv: 'Bilaga C: Spelbok för Företagsdeltagande - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-d-digital-ethics-charter',
    category: 'digital',
    fileNames: {
      en: 'digital-ethics-charter-en',
      sv: 'digital-ethics-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix D: Digital Ethics Charter - Digital Commons Framework - Page ',
      sv: 'Bilaga D: Digital Etikstadga - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-e-commons-glossary',
    category: 'digital',
    fileNames: {
      en: 'commons-glossary-en',
      sv: 'commons-glossary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix E: Commons Glossary - Digital Commons Framework - Page ',
      sv: 'Bilaga E: Commons-ordlista - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-f-minimal-viable-node-quickstart',
    category: 'digital',
    fileNames: {
      en: 'minimal-viable-node-quickstart-en',
      sv: 'minimal-viable-node-quickstart-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix F: Minimal-Viable Node Quickstart - Digital Commons Framework - Page ',
      sv: 'Bilaga F: Minimal-Genomförbar Nodsnabbstart - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-g-field-test-logbook-template',
    category: 'digital',
    fileNames: {
      en: 'field-test-logbook-template-en',
      sv: 'field-test-logbook-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix G: Field-Test Logbook Template - Digital Commons Framework - Page ',
      sv: 'Bilaga G: Mall för Fälttestloggbok - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-i-diplomatic-mini-deck',
    category: 'digital',
    fileNames: {
      en: 'diplomatic-mini-deck-en',
      sv: 'diplomatic-mini-deck-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix I: Diplomatic Mini Deck - Digital Commons Framework - Page ',
      sv: 'Bilaga I: Diplomatiskt Mini-Däck - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-j-historical-commons-context',
    category: 'digital',
    fileNames: {
      en: 'historical-commons-context-en',
      sv: 'historical-commons-context-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix J: Historical Commons Context - Digital Commons Framework - Page ',
      sv: 'Bilaga J: Historisk Allmänningskontext - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-k-impact-assessment-framework',
    category: 'digital',
    fileNames: {
      en: 'impact-assessment-framework-en',
      sv: 'impact-assessment-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix K: Impact Assessment Framework - Digital Commons Framework - Page ',
      sv: 'Bilaga K: Ramverk för Konsekvensanalys - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'how-to-use-the-digital-commons-seed-kit',
    category: 'digital',
    fileNames: {
      en: 'how-to-use-the-digital-commons-seed-kit-en',
      sv: 'how-to-use-the-digital-commons-seed-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'How to Use the Digital Commons Seed Kit - Page ',
      sv: 'Så här använder du Digital Commons Seed Kit - Sida '
    }
  },

  // Digital Commons Framework - Digital Tools
  {
    name: 'governance-simulator-app',
    category: 'digital',
    fileNames: {
      en: 'governance-simulator-app-en',
      sv: 'governance-simulator-app-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Governance Simulator App Documentation - Page ',
      sv: 'Dokumentation för appen Governance Simulator - Sida '
    }
  },
  {
    name: 'ai-chatbot',
    category: 'digital',
    fileNames: {
      en: 'ai-chatbot-en',
      sv: 'ai-chatbot-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'AI Chatbot for Tool Navigation Documentation - Page ',
      sv: 'Dokumentation för verktygsnavigerings-AI-chatbot - Sida '
    }
  },
  {
    name: 'collaboration-platform',
    category: 'digital',
    fileNames: {
      en: 'collaboration-platform-en',
      sv: 'collaboration-platform-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Real-Time Collaboration Platform Documentation - Page ',
      sv: 'Dokumentation för plattform för samarbete i realtid - Sida '
    }
  },
  {
    name: 'health-dashboard',
    category: 'digital',
    fileNames: {
      en: 'health-dashboard-en',
      sv: 'health-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Digital Commons Health Dashboard Documentation - Page ',
      sv: 'Dokumentation av Digital Commons Health Dashboard - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'ethics',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Youth & Community Action Guide: Rights of All Beings - Page ',
      sv: 'Handledning för ungdomar och samhällsaktiviteter: Alla varelsers rättigheter - Sida '
    }
  },
  {
    name: 'business-guide',
    category: 'ethics',
    fileNames: {
      en: 'business-guide-en',
      sv: 'business-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Business Leaders: Implementation Guide - Page ',
      sv: 'Varelsers rättigheter för företagsledare: Implementeringsguide - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'ethics',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Communities - Page ',
      sv: 'Varelsers rättigheter för samhällen och gemenskaper - Sida '
    }
  },
  {
    name: 'crisis-guide',
    category: 'ethics',
    fileNames: {
      en: 'crisis-guide-en',
      sv: 'crisis-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings in Crisis Situations: Emergency Implementation Guide - Page ',
      sv: 'Rättigheter för varelser i krissituationer: Guide till implementering av nödsituationer - Sida '
    }
  },
  {
    name: 'educators-guide',
    category: 'ethics',
    fileNames: {
      en: 'educators-guide-en',
      sv: 'educators-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Educators: Implementation Guide - Page ',
      sv: 'Varelsers rättigheter för lärare: Implementeringsguide - Sida '
    }
  },
  {
    name: 'indigenous-communities-guide',
    category: 'ethics',
    fileNames: {
      en: 'indigenous-communities-guide-en',
      sv: 'indigenous-communities-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Indigenous Communities - Page ',
      sv: 'Rättigheter för varelser för ursprungsbefolkningar - Sida '
    }
  },
  {
    name: 'policy-guide',
    category: 'ethics',
    fileNames: {
      en: 'policy-guide-en',
      sv: 'policy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Policymakers - Page ',
      sv: 'Varelsers rättigheter för beslutsfattare - Sida '
    }
  },
  {
    name: 'religious-communities-guide',
    category: 'ethics',
    fileNames: {
      en: 'religious-communities-guide-en',
      sv: 'religious-communities-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Religious Communities - Page ',
      sv: 'Varelsers rättigheter för religiösa samfund - Sida '
    }
  },
  {
    name: 'crisis-ethics-field-guide',
    category: 'ethics',
    fileNames: {
      en: 'crisis-ethics-field-guide-en',
      sv: 'crisis-ethics-field-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Crisis Ethics Field Guide - Page ',
      sv: 'Fältguide för krisetik - Sida '
    }
  },
  {
    name: 'rights-assessment-methodology',
    category: 'ethics',
    fileNames: {
      en: 'rights-assessment-methodology-en',
      sv: 'rights-assessment-methodology-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Rights Assessment Methodology Handbook - Page ',
      sv: 'Handbok för metodik för rättighetsbedömning - Sida '
    }
  },
  {
    name: 'rights-recognition-starter-kit',
    category: 'ethics',
    fileNames: {
      en: 'rights-recognition-starter-kit-en',
      sv: 'rights-recognition-starter-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Rights Recognition Starter Kit - Page ',
      sv: 'Startpaket för erkännande av rättigheter - Sida '
    }
  },
  {
    name: 'spiral-aware-implementation-guide',
    category: 'ethics',
    fileNames: {
      en: 'spiral-aware-implementation-guide-en',
      sv: 'spiral-aware-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Spiral-Aware Implementation Guide - Page ',
      sv: 'Spiralmedveten implementeringsguide - Sida '
    }
  },
  {
    name: 'conflict-resolution-guide',
    category: 'ethics',
    fileNames: {
      en: 'conflict-resolution-guide-en',
      sv: 'conflict-resolution-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Conflict Resolution Protocol Guide - Page ',
      sv: 'Guide till protokoll för konfliktlösning - Sida '
    }
  },
  {
    name: 'consciousness-assessment-toolkit',
    category: 'ethics',
    fileNames: {
      en: 'consciousness-assessment-toolkit-en',
      sv: 'consciousness-assessment-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Consciousness Assessment Toolkit - Page ',
      sv: 'Verktygslåda för medvetandebedömning - Sida '
    }
  },
  {
    name: 'guardianship-handbook',
    category: 'ethics',
    fileNames: {
      en: 'guardianship-handbook-en',
      sv: 'guardianship-handbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Guardianship Council Handbook - Page ',
      sv: 'Handbok för förmynderskapsrådet - Sida '
    }
  },
  {
    name: 'indigenous-knowledge-protocol',
    category: 'ethics',
    fileNames: {
      en: 'indigenous-knowledge-protocol-en',
      sv: 'indigenous-knowledge-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Indigenous Knowledge Integration Protocol - Page ',
      sv: 'Protokoll för integration av ursprungsbefolkningens kunskap - Sida '
    }
  },
  {
    name: 'pioneer-pilots-manual',
    category: 'ethics',
    fileNames: {
      en: 'pioneer-pilots-manual-en',
      sv: 'pioneer-pilots-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Pioneer Pilots Implementation Manual - Page ',
      sv: 'Implementeringsmanual för Pioneer Pilots - Sida '
    }
  },
  {
    name: 'resistance-management-playbook',
    category: 'ethics',
    fileNames: {
      en: 'resistance-management-playbook-en',
      sv: 'resistance-management-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Resistance Management Playbook - Page ',
      sv: 'Handbok för hantering av motstånd - Sida '
    }
  },
  {
    name: 'edge-case-handbook',
    category: 'ethics',
    fileNames: {
      en: 'edge-case-handbook-en',
      sv: 'edge-case-handbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Edge Case Handbook - Page ',
      sv: 'Handbok för gränsfall - Sida '
    }
  },
  // Justice Framework
  {
    name: 'justice-framework-lite-guide',
    category: 'justice',
    fileNames: {
      en: 'justice-framework-lite-guide-en',
      sv: 'justice-framework-lite-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk - Sida '
    }
  },
  {
    name: 'justice-lite-guide-community',
    category: 'justice',
    fileNames: {
      en: 'justice-lite-guide-community-en',
      sv: 'justice-lite-guide-community-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide (Community) - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk (Samhälle) - Sida '
    }
  },
  {
    name: 'youth-justice-guide',
    category: 'justice',
    fileNames: {
      en: 'youth-justice-guide-en',
      sv: 'youth-justice-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide (Youth) - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk (Ungdom) - Sida '
    }
  },

  // Core Tools
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'justice',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Självbedömningsverktyg för pilotberedskap - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'justice',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter - Page ',
      sv: 'Charta för intressentengagemang - Sida '
    }
  },
  {
    name: 'restorative-justice-guide',
    category: 'justice',
    fileNames: {
      en: 'restorative-justice-guide-en',
      sv: 'restorative-justice-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Restorative Justice Guide - Page ',
      sv: 'Guide för reparativ rättvisa - Sida '
    }
  },
  {
    name: 'indigenous-justice-integration-template',
    category: 'justice',
    fileNames: {
      en: 'indigenous-justice-integration-template-en',
      sv: 'indigenous-justice-integration-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Indigenous Justice Integration Template - Page ',
      sv: 'Mall för integrering av ursprungsfolks rättvisesystem - Sida '
    }
  },
  {
    name: 'monitoring-evaluation-rubric',
    category: 'justice',
    fileNames: {
      en: 'monitoring-evaluation-rubric-en',
      sv: 'monitoring-evaluation-rubric-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Monitoring & Evaluation Rubric - Page ',
      sv: 'Bedömningsmatris för övervakning och utvärdering - Sida '
    }
  },

  // Advocacy Tools
  {
    name: 'advocacy-playbook',
    category: 'justice',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Handbok för påverkansarbete - Sida '
    }
  },
  {
    name: 'policy-harmonization-toolkit',
    category: 'justice',
    fileNames: {
      en: 'policy-harmonization-toolkit-en',
      sv: 'policy-harmonization-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Policy Harmonization Toolkit - Page ',
      sv: 'Verktygslåda för policyharmonisering - Sida '
    }
  },
  {
    name: 'executive-summary',
    category: 'justice',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Executive Summary - Page ',
      sv: 'Sammanfattning för beslutsfattare - Sida '
    }
  },
  {
    name: 'policy-brief',
    category: 'justice',
    fileNames: {
      en: 'policy-brief-en',
      sv: 'policy-brief-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Policy Brief - Page ',
      sv: 'Policydokument - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'justice',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Modell för kostnads-nyttoanalys - Sida '
    }
  },

  // Simulation Tools
  {
    name: 'stakeholder-simulation-guide',
    category: 'justice',
    fileNames: {
      en: 'stakeholder-simulation-guide-en',
      sv: 'stakeholder-simulation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'justice', 'tools', 'simulation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'justice', 'tools', 'simulation')
    },
    pageFooter: {
      en: 'Stakeholder Simulation Guide - Page ',
      sv: 'Guide för intressentsimulering - Sida '
    }
  },
  // Spiritual & Religious Dialogue Framework
  // 1. Main guides
  {
    name: 'executive-brief',
    category: 'spiritual',
    fileNames: {
      en: 'executive-brief-en',
      sv: 'executive-brief-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Executive Brief - Page ',
      sv: 'Sammanfattning för Beslutsfattare - Sida '
    }
  },
  {
    name: 'policy-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-guide-en',
      sv: 'policy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Policy Guide - Page ',
      sv: 'Policyguide - Sida '
    }
  },
  {
    name: 'youth-and-broad-audiences-guide',
    category: 'spiritual',
    fileNames: {
      en: 'youth-and-broad-audiences-guide-en',
      sv: 'youth-and-broad-audiences-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Youth & Broad Audiences Guide - Page ',
      sv: 'Guide för Ungdomar & Bred Publik - Sida '
    }
  },

  // 2. Implementation tools
  {
    name: 'adaptive-facilitation-tools',
    category: 'spiritual',
    fileNames: {
      en: 'adaptive-facilitation-tools-en',
      sv: 'adaptive-facilitation-tools-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Adaptive Facilitation Tools - Page ',
      sv: 'Adaptiva Faciliteringsverktyg - Sida '
    }
  },
  {
    name: 'digital-feedback-dashboard',
    category: 'spiritual',
    fileNames: {
      en: 'digital-feedback-dashboard-en',
      sv: 'digital-feedback-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Digital Feedback Dashboard - Page ',
      sv: 'Digital Feedback Dashboard - Sida '
    }
  },

  // 3. Core Tools
  {
    name: 'dialogue-facilitation-scripts',
    category: 'spiritual',
    fileNames: {
      en: 'dialogue-facilitation-scripts-en',
      sv: 'dialogue-facilitation-scripts-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Dialogue Facilitation Scripts - Page ',
      sv: 'Dialogfaciliteringsskript - Sida '
    }
  },
  {
    name: 'digital-access-inclusion-audit',
    category: 'spiritual',
    fileNames: {
      en: 'digital-access-inclusion-audit-en',
      sv: 'digital-access-inclusion-audit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Digital Access & Inclusion Audit - Page ',
      sv: 'Digital Tillgång & Inkludering Granskning - Sida '
    }
  },
  {
    name: 'truth-reconciliation-toolkit',
    category: 'spiritual',
    fileNames: {
      en: 'truth-reconciliation-toolkit-en',
      sv: 'truth-reconciliation-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Truth & Reconciliation Toolkit - Page ',
      sv: 'Sannings & Försoningsverktygslåda - Sida '
    }
  },
  {
    name: 'wisdom-documentation-templates',
    category: 'spiritual',
    fileNames: {
      en: 'wisdom-documentation-templates-en',
      sv: 'wisdom-documentation-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Wisdom Documentation Templates - Page ',
      sv: 'Visdomsdokumentationsmallar - Sida '
    }
  },

  // 4. Implementation Tools
  {
    name: 'adaptive-learning-protocol',
    category: 'spiritual',
    fileNames: {
      en: 'adaptive-learning-protocol-en',
      sv: 'adaptive-learning-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Adaptive Learning Protocol - Page ',
      sv: 'Adaptivt Inlärningsprotokoll - Sida '
    }
  },
  {
    name: 'impact-assessment-guide',
    category: 'spiritual',
    fileNames: {
      en: 'impact-assessment-guide-en',
      sv: 'impact-assessment-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Impact Assessment Guide - Page ',
      sv: 'Guide för Effektbedömning - Sida '
    }
  },
  {
    name: 'representation-metrics-dashboard',
    category: 'spiritual',
    fileNames: {
      en: 'representation-metrics-dashboard-en',
      sv: 'representation-metrics-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Representation Metrics Dashboard - Page ',
      sv: 'Dashboard för Representationsmått - Sida '
    }
  },

  // 5. Policy Tools
  {
    name: 'cross-tradition-values-mapping-tool',
    category: 'spiritual',
    fileNames: {
      en: 'cross-tradition-values-mapping-tool-en',
      sv: 'cross-tradition-values-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Cross-Tradition Values Mapping Tool - Page ',
      sv: 'Traditionsövergripande Värdemappningsverktyg - Sida '
    }
  },
  {
    name: 'ethics-charter-template',
    category: 'spiritual',
    fileNames: {
      en: 'ethics-charter-template-en',
      sv: 'ethics-charter-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Ethics Charter Template - Page ',
      sv: 'Mall för Etiskt Stadga - Sida '
    }
  },
  {
    name: 'policy-development-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-development-guide-en',
      sv: 'policy-development-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Policy Development Guide - Page ',
      sv: 'Guide för Policyutveckling - Sida '
    }
  },
  {
    name: 'policy-translation-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-translation-guide-en',
      sv: 'policy-translation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Policy Translation Guide - Page ',
      sv: 'Guide för Policyöversättning - Sida '
    }
  },
  {
    name: 'wisdom-repository-starter-kit',
    category: 'spiritual',
    fileNames: {
      en: 'wisdom-repository-starter-kit-en',
      sv: 'wisdom-repository-starter-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Wisdom Repository Starter Kit - Page ',
      sv: 'Startkit för Visdomsförvar - Sida '
    }
  },

  // 6. Seed Kit Tools
  {
    name: 'conflict-de-escalation-protocols',
    category: 'spiritual',
    fileNames: {
      en: 'conflict-de-escalation-protocols-en',
      sv: 'conflict-de-escalation-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Conflict De-escalation Protocols - Page ',
      sv: 'Protokoll för Konfliktdeeskalering - Sida '
    }
  },
  {
    name: 'cultural-appropriation-prevention',
    category: 'spiritual',
    fileNames: {
      en: 'cultural-appropriation-prevention-en',
      sv: 'cultural-appropriation-prevention-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Cultural Appropriation Prevention - Page ',
      sv: 'Förebyggande av Kulturell Appropriering - Sida '
    }
  },
  {
    name: 'dialogue-facilitation-guide',
    category: 'spiritual',
    fileNames: {
      en: 'dialogue-facilitation-guide-en',
      sv: 'dialogue-facilitation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Dialogue Facilitation Guide - Page ',
      sv: 'Guide för Dialogfacilitering - Sida '
    }
  },
  {
    name: 'local-partnership-templates',
    category: 'spiritual',
    fileNames: {
      en: 'local-partnership-templates-en',
      sv: 'local-partnership-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Local Partnership Templates - Page ',
      sv: 'Mallar för Lokala Partnerskap - Sida '
    }
  },
  {
    name: 'regional-customization-framework',
    category: 'spiritual',
    fileNames: {
      en: 'regional-customization-framework-en',
      sv: 'regional-customization-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Regional Customization Framework - Page ',
      sv: 'Ramverk för Regional Anpassning - Sida '
    }
  },
  {
    name: 'representation-assessment-tool',
    category: 'spiritual',
    fileNames: {
      en: 'representation-assessment-tool-en',
      sv: 'representation-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Representation Assessment Tool - Page ',
      sv: 'Verktyg för Representationsbedömning - Sida '
    }
  },
  {
    name: 'sacred-space-setup-guide',
    category: 'spiritual',
    fileNames: {
      en: 'sacred-space-setup-guide-en',
      sv: 'sacred-space-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Sacred Space Setup Guide - Page ',
      sv: 'Guide för Uppsättning av Heliga Rum - Sida '
    }
  },
  {
    name: 'tradition-protocol-cards',
    category: 'spiritual',
    fileNames: {
      en: 'tradition-protocol-cards-en',
      sv: 'tradition-protocol-cards-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Tradition-Specific Protocol Cards - Page ',
      sv: 'Tradtiionsspecifika Protokollkort - Sida '
    }
  },

  // Full framework combined PDF
  {
    name: 'spiritual-dialogue-framework',
    category: 'spiritual',
    fileNames: {
      en: 'Spiritual-Dialogue',
      sv: 'Spiritual-Dialogue'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Religious & Spiritual Dialogue Framework - Page ',
      sv: 'Religiös & Spirituell Dialog Ramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      '01-introduction',
      '02-core-principles',
      '03-objectives',
      '04-governance-structure',
      '05-implementation-mechanisms',
      '06-key-activities',
      '07-funding-and-resources',
      '08-challenges-and-mitigation-strategies',
      '09-timeline',
      '10-conclusion',
      'appendix-a',
      'appendix-b',
      'appendix-c',
      'appendix-d',
      'appendix-e',
      'appendix-f',
      'appendix-g',
      'appendix-h'
    ]
  },

  // Sacred Seed Kit combined PDF 
  {
    name: 'sacred-seed-kit',
    category: 'spiritual',
    fileNames: {
      en: 'sacred-seed-kit-en',
      sv: 'sacred-seed-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Sacred Seed Kit - Page ',
      sv: 'Heligt Startkit - Sida '
    },
    // Special config to combine all seed kit files
    combinedFiles: [
      'dialogue-facilitation-guide',
      'representation-assessment-tool',
      'cultural-appropriation-prevention',
      'conflict-de-escalation-protocols',
      'local-partnership-templates',
      'regional-customization-framework',
      'sacred-space-setup-guide',
      'tradition-protocol-cards'
    ]
  },

  // Financial Systems

  // Quick Guides
  {
    name: 'quick-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-en',
      sv: 'quick-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Quick Guide - Page ',
      sv: 'Snabbguide - Sida '
    }
  },
  {
    name: 'quick-guide-medium',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-medium-en',
      sv: 'quick-guide-medium-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Community Guide - Page ',
      sv: 'Samhällsguide - Sida '
    }
  },
  {
    name: 'quick-guide-youth',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-youth-en',
      sv: 'quick-guide-youth-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Youth Guide - Page ',
      sv: 'Ungdomsguide - Sida '
    }
  },

  // Implementation Tools
  {
    name: 'hearts-toolkit',
    category: 'financial-systems',
    fileNames: {
      en: 'hearts-toolkit-en',
      sv: 'hearts-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Hearts Implementation Toolkit - Page ',
      sv: 'Hearts Implementeringsverktyg - Sida '
    }
  },
  {
    name: 'transition-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'transition-guide-en',
      sv: 'transition-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Transition Guide - Page ',
      sv: 'Övergångsguide - Sida '
    }
  },
  {
    name: 'validator-training',
    category: 'financial-systems',
    fileNames: {
      en: 'validator-training-en',
      sv: 'validator-training-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Validator Training Manual - Page ',
      sv: 'Validatorträningsmanual - Sida '
    }
  },
  {
    name: 'love-ledger-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'love-ledger-guide-en',
      sv: 'love-ledger-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Love Ledger User Guide - Page ',
      sv: 'Love Ledger Användarguide - Sida '
    }
  },
  {
    name: 'hearts-technical-spec',
    category: 'financial-systems',
    fileNames: {
      en: 'hearts-technical-spec-en',
      sv: 'hearts-technical-spec-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Hearts Technical Specification - Page ',
      sv: 'Hearts Teknisk Specifikation - Sida '
    }
  },
  {
    name: 'translation-layer',
    category: 'financial-systems',
    fileNames: {
      en: 'translation-layer-en',
      sv: 'translation-layer-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Inter-Currency Translation Layer - Page ',
      sv: 'Inter-Valuta Översättningslager - Sida '
    }
  },
  {
    name: 'proof-of-care',
    category: 'financial-systems',
    fileNames: {
      en: 'proof-of-care-en',
      sv: 'proof-of-care-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Proof of Care Protocol - Page ',
      sv: 'Proof of Care Protokoll - Sida '
    }
  },
  // Full framework combined PDF
  {
    name: 'financial-systems-framework',
    category: 'financial-systems',
    fileNames: {
      en: 'Financial-Systems-Framework',
      sv: 'Finansiella-Systems-Ramverk'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'financial-systems')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Financial Systems Framework - Page ',
      sv: 'Finansiella Systems Ramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      '01-introduction',
      '02-core-principles',
      '03-structural-components',
      '04-implementation-approaches',
      '05-metrics-evaluation',
      '06-supporting-sections',
      '07-appendices'
    ]
  },

  // General Governance
  // Core Tools
  {
    name: 'decidetogether-platform-guide',
    category: 'governance',
    fileNames: {
      en: 'decidetogether-platform-guide-en',
      sv: 'decidetogether-platform-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'governance','tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'governance', 'tools', 'core')
    },
    pageFooter: {
      en: 'DecideTogether Platform Guide - Page ',
      sv: 'Guide till DecideTogether-plattformen - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'governance',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'governance','tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'governance', 'tools', 'core')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter Template - Page ',
      sv: 'Mall för stadga för intressentengagemang - Sida '
    }
  },
  {
    name: 'community-well-being-index',
    category: 'governance',
    fileNames: {
      en: 'community-well-being-index-en',
      sv: 'community-well-being-index-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'governance','tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'governance', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Community Well-Being Index - Page ',
      sv: 'Index för samhällets välbefinnande - Sida '
    }
  },

  // Environmental Stewardship Framework
  // Core Tools
  {
    name: 'dynamic-rights-spectrum-guide',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'dynamic-rights-spectrum-guide-en',
      sv: 'dynamic-rights-spectrum-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'core')
    },
    pageFooter: {
      en: 'Dynamic Rights Spectrum Guide - Page ',
      sv: 'Guide för dynamiskt rättighetsspektrum - Sida '
    }
  },
  {
    name: 'reparations-protocol',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'reparations-protocol-en',
      sv: 'reparations-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship', 'tools', 'governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'governance')
    },
    pageFooter: {
      en: 'Reparations Protocol - Page ',
      sv: 'Reparationsprotokoll - Sida '
    }
  },
  {
    name: 'ecosystem-health-indicators',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'ecosystem-health-indicators-en',
      sv: 'ecosystem-health-indicators-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship', 'tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Ecosystem Health Indicators - Page ',
      sv: 'Indikatorer för ekosystemhälsa - Sida '
    }
  },
  {
    name: 'nexus-impact-assessment-tool',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'nexus-impact-assessment-tool-en',
      sv: 'nexus-impact-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship', 'tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Nexus Impact Assessment Tool - Page ',
      sv: 'Nexus konsekvensbedömningsverktyg - Sida '
    }
  },
  // Guides
  {
    name: 'one-page-essence',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'one-page-essence-en',
      sv: 'one-page-essence-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship')
    },
    pageFooter: {
      en: 'Environmental Stewardship Framework - One Page Essence - Page ',
      sv: 'Ramverk för miljöförvaltning - Essens på en sida - Sida '
    }
  },
  {
    name: 'first-100-days-playbook',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'first-100-days-playbook-en',
      sv: 'first-100-days-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship')
    },
    pageFooter: {
      en: 'First 100 Days Playbook - Page ',
      sv: 'Handbok för de första 100 dagarna - Sida '
    }
  },
  // Full framework
  {
    name: 'environmental-stewardship-framework',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'Environmental-Stewardship-Framework',
      sv: 'Environmental-Stewardship-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'framework', 'sv', 'implementation', 'environmental-stewardship')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Environmental Stewardship Framework for Multi-Level Governance - Page ',
      sv: 'Miljöförvaltningsramverk för Flernivåstyrning - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      '01-introduction',
      '02-guiding-principles',
      '03-governance-structure',
      '04-core-pillars',
      '05-policy-mechanisms',
      '06-stakeholder-engagement',
      '07-financing-mechanisms',
      '08-implementation-roadmap',
      '09-metrics-for-success',
      '10-visualizations',
      '11-challenges-and-solutions',
      '12-implementation-tools',
      '13-reparations-protocol',
      '14-conclusion',
      '15-appendices'
    ]
  },
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
  .svg-container {
    text-align: center;
    margin: 2em 0;
  }
  .svg-container img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em auto;
  }
  .svg-container svg {
    max-width: 700px;
    height: auto;
    margin: 0 auto;
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

// Process SVG images in markdown
function processSvgReferences(markdown, inputFileDir) {
  // Find all image references in markdown
  const imgRegex = /!\[(.*?)\]\(([^)]+)\)/g;
  let match;
  let processedMarkdown = markdown;
  
  while ((match = imgRegex.exec(markdown)) !== null) {
    const altText = match[1];
    let imgPath = match[2];
    
    // Check if it's a relative path to an SVG file
    if (imgPath.endsWith('.svg') && !imgPath.startsWith('http')) {
      // Normalize path with file directory
      if (imgPath.startsWith('/')) {
        // Absolute path from project root
        imgPath = path.join(__dirname, '..', 'static', imgPath);
      } else {
        // Relative path from markdown file
        imgPath = path.join(inputFileDir, imgPath);
      }
      
      console.log(`Processing SVG reference: ${imgPath}`);
      
      // Check if SVG file exists
      if (fs.existsSync(imgPath)) {
        try {
          // Read SVG content
          const svgContent = fs.readFileSync(imgPath, 'utf8');
          
          // Ensure SVG has namespace
          let processedSvg = svgContent;
          if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
            processedSvg = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
          }
          
          // Create data URI
          const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(processedSvg)}`;
          
          // Replace image reference with embedded SVG container
          processedMarkdown = processedMarkdown.replace(
            match[0],
            `<div class="svg-container"><img src="${svgDataUri}" alt="${altText}" /></div>`
          );
          
          console.log(`Embedded SVG: ${path.basename(imgPath)}`);
        } catch (error) {
          console.warn(`Error processing SVG ${imgPath}: ${error.message}`);
        }
      } else {
        console.warn(`SVG file not found: ${imgPath}`);
      }
    }
  }
  
  return processedMarkdown;
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
        
        // Determine the output directory - use tool-specific outputDir if provided, otherwise use the category default
        let outputDir;
        if (tool.outputDir && tool.outputDir[lang]) {
          // Use tool-specific output directory if provided
          outputDir = tool.outputDir[lang];
          console.log(`Using custom output directory: ${outputDir}`);
        } else {
          // Use default category directory
          outputDir = outputDirs[tool.category];
        }
        
        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
          console.log(`Created directory: ${outputDir}`);
        }
        
        const outputFile = path.join(outputDir, `${fileName}.pdf`);
       
        console.log(`\nProcessing ${lang.toUpperCase()} version of ${tool.name}:`);
        
        let markdown = '';
        
        // Check if this is a combined PDF
        if (tool.sections && Array.isArray(tool.sections)) {
          // Full framework with sections
          console.log(`📚 Generating combined PDF from ${tool.sections.length} sections...`);

          for (const section of tool.sections) {
            const sectionFile = path.join(tool.sourceDir[lang], `${section}.md`);
            if (fs.existsSync(sectionFile)) {
              let sectionContent = fs.readFileSync(sectionFile, 'utf8');
              // Remove frontmatter from each section
              sectionContent = sectionContent.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');
              markdown += sectionContent + '\n\n';
              console.log(`  Added section: ${section}`);
            } else {
              console.warn(`  ⚠️ Section file not found: ${sectionFile}`);
            }
          }
          
        } else if (tool.combinedFiles && Array.isArray(tool.combinedFiles)) {
          // Seed kit with multiple files
          console.log(`📚 Generating combined PDF from ${tool.combinedFiles.length} files...`);
          
          // Add a title for the combined document
          const title = tool.name === 'sacred-seed-kit' ? '# Sacred Seed Kit\n\n' : `# ${tool.name}\n\n`;
          markdown += title;
          
          for (const fileId of tool.combinedFiles) {
            // Look through all tools to find the matching ones
            const subTool = tools.find(t => t.name === fileId && t.category === tool.category);
            if (subTool) {
              const subFile = path.join(subTool.sourceDir[lang], `${fileId}.md`);
              if (fs.existsSync(subFile)) {
                let fileContent = fs.readFileSync(subFile, 'utf8');
                // Remove frontmatter from each component file
                fileContent = fileContent.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');
                markdown += fileContent + '\n\n---\n\n'; // Add separator between files
                console.log(`  Added file: ${fileId}`);
              } else {
                console.warn(`  ⚠️ Component file not found: ${subFile}`);
              }
            } else {
              console.warn(`  ⚠️ Component tool definition not found: ${fileId}`);
            }
          }
          
        } else {
          // Regular single file
          const inputFile = path.join(tool.sourceDir[lang], `${tool.name}.md`);
          
          if (!fs.existsSync(inputFile)) {
            console.warn(`⚠️ WARNING: Input file not found: ${inputFile}`);
            console.warn(`    Skipping ${fileName}.pdf generation\n`);
            continue;
          }
          
          console.log(`Input file: ${inputFile}`);
          markdown = fs.readFileSync(inputFile, 'utf8');
          console.log(`Read ${markdown.length} characters from source file`);
        }
        
        console.log(`Output file: ${outputFile}`);
        
        try {
          // Robust frontmatter removal that handles various formats
          markdown = markdown.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');

          // Process SVG references
          markdown = processSvgReferences(markdown, path.dirname(tool.sourceDir[lang]));
                    
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
          const markdownOutputFile = path.join(outputDir, `${fileName}.md`);
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
