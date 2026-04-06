// src/routes/resources/whitepapers/immanent-trust-protocol/in-simple-terms/+page.server.js
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const prerender = true;   // ensure static generation

export async function load({ url }) {
  let currentLocale = 'en';
  try {
    currentLocale = url.searchParams?.get('lang') || 'en';
  } catch (e) {
    console.warn('Could not read lang from URL, using default en');
  }
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) currentLocale = 'en';

  let filePath = path.join('static', 'content', 'papers', currentLocale, 'immanent-trust-protocol', 'in-simple-terms.md');
  let fellbackToEnglish = false;

  if (!fs.existsSync(filePath) && currentLocale === 'sv') {
    filePath = path.join('static', 'content', 'papers', 'en', 'immanent-trust-protocol', 'in-simple-terms.md');
    fellbackToEnglish = true;
  }

  if (!fs.existsSync(filePath)) {
    throw error(404, 'in-simple-terms content not found');
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  return {
    raw,
    currentLocale,
    usedFallback: fellbackToEnglish
  };
}
