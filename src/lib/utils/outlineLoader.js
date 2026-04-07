// src/lib/utils/outlineLoader.js

/**
 * Loads all framework outline current.md files at build time using Vite's import.meta.glob.
 * Falls back to English since outlines are currently only available in English.
 */

// Eagerly load all current.md files as raw strings
const outlineModules = import.meta.glob(
  '/src/lib/content/framework-outlines/en/**/current.md',
  { query: '?raw', import: 'default', eager: true }
);

// Build a slug → content map
const outlinesBySlug = {};
for (const [path, content] of Object.entries(outlineModules)) {
  // Path format: /src/lib/content/framework-outlines/en/tier-X/some-slug/current.md
  const parts = path.split('/');
  const slug = parts[parts.length - 2]; // folder name = slug
  outlinesBySlug[slug] = content;
}

/**
 * Get the outline markdown for a framework by slug.
 * @param {string} slug - The framework slug (e.g., 'kinship-garden')
 * @returns {string|null} The raw markdown content, or null if not found
 */
export function getOutline(slug) {
  return outlinesBySlug[slug] || null;
}

/**
 * Check if an outline exists for a given framework slug.
 * @param {string} slug - The framework slug
 * @returns {boolean}
 */
export function hasOutline(slug) {
  return slug in outlinesBySlug;
}

/**
 * Get all available outline slugs.
 * @returns {string[]}
 */
export function getAvailableOutlineSlugs() {
  return Object.keys(outlinesBySlug);
}
