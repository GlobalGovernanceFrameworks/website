// src/routes/resources/whitepapers/immanent-trust-protocol/+page.js
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;

const metadata = {
  title: 'The Immanent Trust Protocol',
  subtitle: 'A Post-Consensus Architecture for Decentralized, Observer-Relative Trust',
  description: 'ITP introduces a mathematically grounded trust substrate where trust is computed at the edge, Sybil rings collapse under the Trust Independence Metric, and coordination structures dissolve when no longer needed.',
  date: 'April 2026',
  authors: 'Björn Kenneth Holmström (with AI collaboration: Claude, DeepSeek, Grok, Gemini)',
  readingTime: '~90 minutes',
  slug: 'immanent-trust-protocol'
};

async function loadMarkdownWithFallback(sectionId, currentLocale) {
  try {
    const module = await import(`$lib/content/papers/${currentLocale}/immanent-trust-protocol/${sectionId}.md`);
    return {
      component: module.default,
      meta: module.metadata,
      locale: currentLocale,
      fellbackToEnglish: false
    };
  } catch (e) {
    if (currentLocale !== 'sv') {
      throw e;
    }
    
    try {
      const englishModule = await import(`$lib/content/papers/en/immanent-trust-protocol/${sectionId}.md`);
      return {
        component: englishModule.default,
        meta: englishModule.metadata,
        locale: 'en',
        fellbackToEnglish: true
      };
    } catch (englishError) {
      throw new Error(`Section ${sectionId} not found in either ${currentLocale} or English`);
    }
  }
}

export async function load({ params, depends, url }) {
  depends('app:locale');
  
  let currentLocale = 'en';
  
  try {
    if (url?.searchParams?.has('lang')) {
      currentLocale = url.searchParams.get('lang');
    } else if (browser) {
      currentLocale = get(locale) || 'en';
    }
  } catch (e) {
    if (browser) {
      currentLocale = get(locale) || 'en';
    }
  }
  
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) {
    currentLocale = 'en';
  }

  try {
    let currentUrl;
    try {
      currentUrl = browser ? window.location.href : `${url.origin}${url.pathname}${url.search}`;
    } catch (urlError) {
      currentUrl = 'https://www.globalgovernanceframeworks.org/resources/whitepapers/immanent-trust-protocol';
    }

    const abstract = await loadMarkdownWithFallback('00-abstract', currentLocale);

    return {
      paper: {
        meta: metadata,
        slug: 'immanent-trust-protocol',
        locale: currentLocale,
        abstract,
        usedFallback: abstract.fellbackToEnglish
      },
      currentUrl,
      currentLocale
    };
  } catch (e) {
    console.error('Error loading ITP whitepaper:', e);
    
    throw error(404, {
      message: 'ITP whitepaper content not available',
      details: {
        locale: currentLocale,
        originalError: e.message
      }
    });
  }
}
