// src/routes/resources/whitepapers/immanent-trust-protocol/white-paper/+page.server.js
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const baseContentPath = 'static/content/papers';

// Main sections (in order)
const sectionIds = [
  '00-abstract',
  '01-introduction',
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'
];

// Appendices and references
const appendixIds = [
  'appendix-a', 'appendix-b', 'appendix-c', 'appendix-d', 'appendix-e',
  'references'
];

// Map file IDs to clean anchor IDs
const anchorMap = {
  '00-abstract': 'abstract',
  '01-introduction': 'section-1',
  '02': 'section-2',
  '03': 'section-3',
  '04': 'section-4',
  '05': 'section-5',
  '06': 'section-6',
  '07': 'section-7',
  '08': 'section-8',
  '09': 'section-9',
  '10': 'section-10',
  '11': 'section-11',
  '12': 'section-12',
  '13': 'section-13',
  'appendix-a': 'appendix-a',
  'appendix-b': 'appendix-b',
  'appendix-c': 'appendix-c',
  'appendix-d': 'appendix-d',
  'appendix-e': 'appendix-e',
  'references': 'references'
};

export async function load({ url }) {
  let currentLocale = url.searchParams.get('lang') || 'en';
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) currentLocale = 'en';

  const allIds = [...sectionIds, ...appendixIds];
  const sections = [];
  let anyFallback = false;

  for (const fileId of allIds) {
    let locale = currentLocale;
    let filePath = path.join(baseContentPath, locale, 'immanent-trust-protocol', `${fileId}.md`);
    let fellbackToEnglish = false;

    if (!fs.existsSync(filePath) && locale === 'sv') {
      locale = 'en';
      filePath = path.join(baseContentPath, 'en', 'immanent-trust-protocol', `${fileId}.md`);
      fellbackToEnglish = true;
      anyFallback = true;
    }

    if (!fs.existsSync(filePath)) {
      throw error(404, `Markdown file not found: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    sections.push({
      fileId,
      anchorId: anchorMap[fileId],
      raw,
      locale,
      fellbackToEnglish
    });
  }

  return {
    sections,
    currentLocale,
    usedFallback: anyFallback
  };
}
