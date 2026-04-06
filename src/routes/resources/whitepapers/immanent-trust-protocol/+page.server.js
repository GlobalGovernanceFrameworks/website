// src/routes/resources/whitepapers/immanent-trust-protocol/+page.server.js
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const prerender = true;

const metadata = {
  title: 'The Immanent Trust Protocol',
  subtitle: 'A Post-Consensus Architecture for Decentralized, Observer-Relative Trust',
  description: 'ITP introduces a mathematically grounded trust substrate where trust is computed at the edge, Sybil rings collapse under the Trust Independence Metric, and coordination structures dissolve when no longer needed.',
  date: 'April 2026',
  authors: 'Björn Kenneth Holmström (with AI collaboration: Claude, DeepSeek, Grok, Gemini)',
  readingTime: '~90 minutes',
  slug: 'immanent-trust-protocol'
};

export async function load({ url }) {
  let currentLocale = 'en';
  try {
    currentLocale = url.searchParams?.get('lang') || 'en';
  } catch (e) {
    console.warn('Could not read lang from URL, using default en');
  }
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) currentLocale = 'en';

  let abstractPath = path.join('static', 'content', 'papers', currentLocale, 'immanent-trust-protocol', '00-abstract.md');
  let usedFallback = false;

  if (!fs.existsSync(abstractPath) && currentLocale === 'sv') {
    abstractPath = path.join('static', 'content', 'papers', 'en', 'immanent-trust-protocol', '00-abstract.md');
    usedFallback = true;
  }

  if (!fs.existsSync(abstractPath)) {
    throw error(404, 'Abstract not found');
  }

  const abstractRaw = fs.readFileSync(abstractPath, 'utf-8');

  // Build absolute URL for meta tags
  const origin = url.origin;
  const currentUrl = `${origin}${url.pathname}${url.search}`;

  return {
    paper: {
      meta: metadata,
      slug: 'immanent-trust-protocol',
      locale: currentLocale,
      abstractRaw,
      usedFallback
    },
    currentUrl,
    currentLocale
  };
}
