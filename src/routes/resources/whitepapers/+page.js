// src/routes/resources/whitepapers/+page.js

import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

// This replaces the slow import.meta.glob
import allPapers from '$lib/data/papers-index.json';

// Special case for Immanent Trust Protocol
const itpEn = {
  slug: 'immanent-trust-protocol',
  lang: 'en',
  meta: {
    title: 'The Immanent Trust Protocol',
    subtitle: 'A Post-Consensus Architecture for Decentralized, Observer-Relative Trust',
    description: 'Trust computed at the edge. Sybil rings mathematically collapsed. Coordination structures that auto-dissolve. A viable substrate for bioregional governance without global ledgers.',
    date: '2026-04-05',
    authors: 'Björn Kenneth Holmström (with AI collaboration: Claude, DeepSeek, Grok, Gemini)',
    readingTime: '~90 minutes',
    featured: true,
    type: 'technical'
  }
};

const itpSv = {
  slug: 'immanent-trust-protocol',
  lang: 'sv',
  meta: {
    title: 'Immanent Trust Protocol',
    subtitle: 'En post-konsensusarkitektur för decentraliserat, observatörsrelativt förtroende',
    description: 'Förtroende beräknat vid kanten. Sybil-ringar matematiskt kollapsade. Koordinationsstrukturer som auto-upplöses. Ett genomförbart substrat för bioregional styrning utan globala liggare.',
    date: '2026-04-05',
    authors: 'Björn Kenneth Holmström (med AI-samarbete: Claude, DeepSeek, Grok, Gemini)',
    readingTime: '~90 minuter',
    featured: true,
    type: 'technical'
  }
};

// Special case for Omega Proof flagship paper
const omegaProofEn = {
  slug: 'omega-proof',
  lang: 'en',
  meta: {
    title: 'The Omega Proof',
    subtitle: "An Empirical Demonstration of the Nation-State System's Terminal Incompatibility with Planetary Peace",
    description: 'A rigorous test of whether planetary-scale peace is achievable within current system constraints. Result: Peace is architecturally impossible under Westphalian rules.',
    date: '2026-01-04',
    authors: 'Björn Kenneth Holmström (with AI collaboration: Gemini, DeepSeek, Grok, Claude)',
    readingTime: '~60 minutes (full paper)',
    featured: true,
    type: 'flagship'
  }
};

const omegaProofSv = {
  slug: 'omega-proof',
  lang: 'sv',
  meta: {
    title: 'Omegabeviset',
    subtitle: "En empirisk demonstration av nationalstatssystemets fundamentala inkompatibilitet med planetär fred",
    description: 'Ett rigoröst test av huruvida planetär fred är möjlig inom nuvarande systemets begränsningar. Resultat: Fred är arkitektoniskt omöjlig under westfaliska regler.',
    date: '2026-01-04',
    authors: 'Björn Kenneth Holmström (med AI-samarbete: Gemini, DeepSeek, Grok, Claude)',
    readingTime: '~60 minuter (fullständig artikel)',
    featured: true,
    type: 'flagship'
  }
};

// Special case for Model Evaluation methodology paper
const modelEvaluationEn = {
  slug: 'model-evaluation',
  lang: 'en',
  meta: {
    title: 'Battle of the Architects',
    subtitle: 'A Case Study in Multi-Model Synthesis: Designing the Supermodular Labor Protocol',
    description: 'Six leading AI models tackle the same civilizational challenge. Which architectural approach proves most robust? An empirical validation of cognitive diversity in AI collaboration.',
    date: '2026-01-15',
    authors: 'Björn Kenneth Holmström (with AI collaboration: Claude, Gemini, DeepSeek, Grok, ChatGPT)',
    readingTime: '~25 minutes',
    featured: true,
    type: 'methodology'
  }
};

const modelEvaluationSv = {
  slug: 'model-evaluation',
  lang: 'sv',
  meta: {
    title: 'Arkitekternas strid',
    subtitle: 'En fallstudie i multimodellsyntes: Att designa det supermodulära arbetsprotokollet',
    description: 'Sex ledande AI-modeller tar sig an samma civilisationsutmaning. Vilket arkitektoniskt tillvägagångssätt visar sig mest robust? En empirisk validering av kognitiv mångfald i AI-samarbete.',
    date: '2026-01-15',
    authors: 'Björn Kenneth Holmström (med AI-samarbete: Claude, Gemini, DeepSeek, Grok, ChatGPT)',
    readingTime: '~25 minuter',
    featured: true,
    type: 'methodology'
  }
};

export const prerender = false;

export async function load({ depends, url }) {
  depends('app:locale');
  
  // Get current locale - handle prerendering safely
  let currentLocale = 'en';
  
  if (url && url.searchParams) {
    try {
      if (url.searchParams.has('lang')) {
        currentLocale = url.searchParams.get('lang');
      } else if (browser) {
        currentLocale = get(locale) || 'en';
      }
    } catch (e) {
      if (browser) {
        currentLocale = get(locale) || 'en';
      }
    }
  } else if (browser) {
    currentLocale = get(locale) || 'en';
  }

  console.log('Whitepapers page loading with locale:', currentLocale);

  // Get regular papers from index (excluding featured papers)
  let regularPapers = allPapers
    .filter(paper => {
      // Filter out papers without valid metadata or date
      if (!paper.meta || !paper.meta.date) {
        console.warn(`Paper ${paper.slug} (${paper.lang}) missing metadata or date, skipping`);
        return false;
      }
      
      const matches = paper.lang === currentLocale;
      return matches;
    })
    .sort((a, b) => {
      // Additional safety check for sorting
      const dateA = a.meta?.date ? new Date(a.meta.date) : new Date(0);
      const dateB = b.meta?.date ? new Date(b.meta.date) : new Date(0);
      
      return dateB - dateA; // Sort newest first
    });

  // Get featured papers based on locale
  const itp = currentLocale === 'sv' ? itpSv : itpEn;
  const omegaProof = currentLocale === 'sv' ? omegaProofSv : omegaProofEn;
  const modelEvaluation = currentLocale === 'sv' ? modelEvaluationSv : modelEvaluationEn;

  console.log('Papers loaded:', { regular: regularPapers.length, featured: 2 });

  return {
    omegaProof,
    modelEvaluation,
    itp,
    regularPapers,
    currentLocale
  };
}
