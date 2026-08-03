// src/lib/data/outlineRegistry.js
//
// Adapter over the GGF schema. Nothing is declared twice: the schema says what
// is published and at which version, the filesystem says what exists.
//
// Two publication modes:
//   ui.outline — one canonical outline document (the normal case)
//   ui.prose   — a multi-section prose draft (the exception; see Pathfinder)
//
// An entity may carry both. Prose supplies the text, outline supplies the
// version lineage shown in the provenance strip.

import { allEntities, allRelationships } from './schema/_index';
import { MATURITY } from './schema/_types';
import outlineHistory from './outlineHistory.generated.json';

export { MATURITY };

/* ------------------------------------------------------------------ */
/* Module maps                                                         */
/* ------------------------------------------------------------------ */

// Only canonical, published outline documents are compiled by mdsvex.
// Historical versions and reviews are represented by a generated metadata
// manifest below, so they never enter Vite's module graph.
const outlineModules = import.meta.glob('../content/framework-outlines/*/*/*/current.md');

// Prose is deliberately narrow. A broad glob over content/frameworks would
// push every archived draft in the repo through mdsvex at build time.
// Add one line per prose-published framework.
const proseModules = {
  ...import.meta.glob('../content/frameworks/*/implementation/pathfinder-protocol/*.md'),
  ...import.meta.glob('../content/frameworks/*/implementation/emergent-governance-protocol/*.md'),
  ...import.meta.glob('../content/frameworks/*/implementation/global-citizenship-practice/*.md')
};

const OUTLINE_ROOT = '../content/framework-outlines';
const PROSE_ROOT = '../content/frameworks';

/* ------------------------------------------------------------------ */
/* Schema projection                                                   */
/* ------------------------------------------------------------------ */

function outlineDir(entity) {
  return entity.ui.outline?.dir ?? `tier-${entity.tier}/${entity.ui.slug}`;
}

function proseDir(entity) {
  return entity.ui.prose?.dir ?? entity.ui.slug;
}

/** Every entity published by either mode. */
const publishedEntities = allEntities.filter(
  (e) => e.ui?.slug && (e.ui.outline || e.ui.prose)
);

const bySlug = new Map(publishedEntities.map((e) => [e.ui.slug, e]));

/**
 * "Read alongside" — computed from the relationship graph, filtered to
 * frameworks that are themselves published, so links can never dangle.
 */
function relatedSlugs(entity) {
  const ids = new Set();

  for (const rel of allRelationships) {
    if (rel.from === entity.id) ids.add(rel.to);
    if (rel.to === entity.id) ids.add(rel.from);
  }
  for (const id of entity.dependencies ?? []) ids.add(id);
  for (const id of entity.enables ?? []) ids.add(id);
  ids.delete(entity.id);

  return publishedEntities
    .filter((e) => ids.has(e.id))
    .map((e) => ({ slug: e.ui.slug, title: e.name, emoji: e.ui.emoji ?? '📋' }));
}

/** Schema entity → the flat shape the page renders. */
function toEntry(entity) {
  const prose = entity.ui.prose;
  const outline = entity.ui.outline;
  const primary = prose ?? outline;

  return {
    id: entity.id,
    slug: entity.ui.slug,
    path: entity.ui.path,
    title: entity.name,
    subtitle: primary.subtitle ?? entity.description ?? '',
    standfirst: primary.standfirst ?? '',
    emoji: entity.ui.emoji ?? '📋',
    tier: entity.tier,
    titleKey: entity.ui.titleKey,

    mode: prose ? 'prose' : 'outline',
    version: primary.version,
    updated: primary.updated,
    maturity: primary.maturity,

    // Text location
    proseDir: prose ? proseDir(entity) : null,
    sections: prose?.sections ?? null,

    // Lineage location — present whenever an outline folder exists, even in
    // prose mode, because that is where the version history lives.
    outlineDir: outline || prose ? outlineDir(entity) : null,
    outlineVersion: outline?.version ?? null,

    related: relatedSlugs(entity)
  };
}

/* ------------------------------------------------------------------ */
/* Version and review discovery                                        */
/* ------------------------------------------------------------------ */

function outlinePath(dir, lang = 'en') {
  return `${OUTLINE_ROOT}/${lang}/${dir}/current.md`;
}

function historyFor(dir, lang = 'en') {
  return (
    outlineHistory[`${lang}/${dir}`] ??
    outlineHistory[`en/${dir}`] ??
    { versions: [], lineage: { documentCount: 0, rounds: [], reviewers: [] } }
  );
}

function prosePath(dir, section, lang = 'en') {
  return `${PROSE_ROOT}/${lang}/implementation/${dir}/${section}.md`;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function getOutlineEntry(slug) {
  const entity = bySlug.get(slug);
  return entity ? toEntry(entity) : null;
}

export function listOutlineSlugs() {
  return [...bySlug.keys()];
}

export function listPublishedOutlines() {
  return publishedEntities.map(toEntry).sort((a, b) => a.tier - b.tier);
}

/** Every version filename on disk for this outline folder, oldest first. */
export function listVersions(dir, lang = 'en') {
  if (!dir) return [];
  return [...historyFor(dir, lang).versions];
}

/** How many review documents sit behind this outline, and from whom. */
export function getReviewLineage(dir, lang = 'en') {
  if (!dir) return { documentCount: 0, rounds: [], reviewers: [] };

  const lineage = historyFor(dir, lang).lineage;
  return {
    documentCount: lineage.documentCount,
    rounds: [...lineage.rounds],
    reviewers: [...lineage.reviewers]
  };
}

/** Diagnostic: which version modules Vite resolved for this folder. */
export function listAvailableOutlinePaths(dir, lang = 'en') {
  const prefix = `${OUTLINE_ROOT}/${lang}/${dir}/`;
  return Object.keys(outlineModules)
    .filter((p) => p.startsWith(prefix))
    .map((p) => p.slice(prefix.length));
}

/* ---- loading ---- */

export async function loadOutline(dir, version, lang = 'en') {
  const path = outlinePath(dir, lang);
  const fallbackPath = outlinePath(dir, 'en');
  const loader = outlineModules[path] ?? outlineModules[fallbackPath];

  if (!loader) {
    throw new Error(
      `Outline not found on disk: ${path} (schema version: ${version})`
    );
  }

  const mod = await loader();
  return {
    component: mod.default,
    metadata: mod.metadata ?? {},
    usedEnglishFallback: lang !== 'en' && !outlineModules[path]
  };
}

/** Loads a single section of a prose-published framework. */
export async function loadProseSection(dir, section, lang = 'en') {
  const path = prosePath(dir, section, lang);
  const loader = proseModules[path] ?? proseModules[prosePath(dir, section, 'en')];

  if (!loader) throw new Error(`Prose section not found on disk: ${path}`);

  const mod = await loader();
  return {
    component: mod.default,
    metadata: mod.metadata ?? {},
    usedEnglishFallback: lang !== 'en' && !proseModules[path]
  };
}
