#!/usr/bin/env node

// scripts/validate-schema.js
//
// Validates the GGF Schema against itself and against the filesystem.
//
// The important rule is "Outline Publication Integrity": if a schema entity
// says it publishes v1.3 and there is no v1.3.md on disk, the build fails.
// That is what keeps the schema and the outline files from drifting apart.
//
// The schema is TypeScript, so run this through tsx:
//   "scripts": { "validate:schema": "tsx scripts/validate-schema.js" }
//
// Exits 1 on errors, 0 on warnings only.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import en from '../src/lib/i18n/en/framework.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTLINE_ROOT = path.join(__dirname, '../src/lib/content/framework-outlines/en');
const SPEC_ROOT = path.join(__dirname, '../src/lib/content/specifications/en');
const SCHEMA_PATH = '../src/lib/data/schema/_index.ts';

// Two document kinds, distinguished by ui.outline.kind. Frameworks are
// tier-partitioned under framework-outlines and served by /frameworks/[slug];
// specifications are flat under specifications and served by
// /specifications/[slug]. Both use the same versions/ + current.md convention.
const KIND = {
  framework: {
    root: OUTLINE_ROOT,
    routeBase: '/frameworks',
    label: 'framework-outlines/en',
    tiered: true
  },
  specification: {
    root: SPEC_ROOT,
    routeBase: '/specifications',
    label: 'specifications/en',
    tiered: false
  }
};

const VALID_MATURITY = ['internal', 'adversarial', 'external', 'piloted'];

const TIER_NAMES = {
  0: 'Constitutional Layer',
  1: 'Core Operating Systems',
  2: 'Foundational Application Layer',
  3: 'Equity & Cultural Flourishing',
  4: 'Visionary & Meta-Governance'
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function compareVersionStrings(a, b) {
  const key = (v) =>
    v
      .replace(/^v/, '')
      .split('.')
      .map((n) => parseInt(n, 10) || 0);
  const [x, y] = [key(a), key(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

function kindFor(entity) {
  return entity.ui?.outline?.kind ?? 'framework';
}

function outlineDirFor(entity) {
  if (entity.ui?.outline?.dir) return entity.ui.outline.dir;

  return KIND[kindFor(entity)]?.tiered
    ? `tier-${entity.tier}/${entity.ui?.slug}`
    : `${entity.ui?.slug}`;
}

function listVersionsOnDisk(versionsDir) {
  return fs
    .readdirSync(versionsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort(compareVersionStrings);
}

/* ------------------------------------------------------------------ */
/* Rule 1 — Outline publication integrity (filesystem-checked)         */
/* ------------------------------------------------------------------ */

export function validateOutlinePublication(entities) {
  const errors = [];
  const warnings = [];
  const seenSlugs = new Map();

  const published = entities.filter((e) => e.ui?.outline);

  for (const entity of published) {
    const label = entity.name || entity.id;
    const o = entity.ui.outline;

    if (!entity.ui.slug) {
      errors.push(`${label}: has ui.outline but no ui.slug`);
      continue;
    }

    if (seenSlugs.has(entity.ui.slug)) {
      errors.push(
        `Duplicate published slug "${entity.ui.slug}": ${label} and ${seenSlugs.get(entity.ui.slug)}`
      );
    }
    seenSlugs.set(entity.ui.slug, label);

    const kind = kindFor(entity);
    const kindSpec = KIND[kind];

    if (!kindSpec) {
      errors.push(
        `${label}: unknown ui.outline.kind "${kind}" (expected one of ${Object.keys(KIND).join(', ')})`
      );
      continue;
    }

    const expectedPath = `${kindSpec.routeBase}/${entity.ui.slug}`;
    if (entity.ui.path !== expectedPath) {
      errors.push(
        `${label}: ui.path is "${entity.ui.path}" but the [slug] route serves "${expectedPath}"`
      );
    }

    if (!VALID_MATURITY.includes(o.maturity)) {
      errors.push(
        `${label}: unknown maturity "${o.maturity}" (expected one of ${VALID_MATURITY.join(', ')})`
      );
    }
    if (!en.maturity?.[o.maturity]?.label) {
      warnings.push(`${label}: no i18n label for maturity "${o.maturity}" in en/framework.json`);
    }

    if (!o.version) {
      errors.push(`${label}: ui.outline.version is missing`);
      continue;
    }

    if (!o.updated || !/^\d{4}-\d{2}-\d{2}$/.test(o.updated)) {
      warnings.push(`${label}: ui.outline.updated should be an ISO date, got "${o.updated}"`);
    }

    const dir = outlineDirFor(entity);
    const versionsDir = path.join(kindSpec.root, dir, 'versions');

    if (!fs.existsSync(versionsDir)) {
      errors.push(
        `${label}: no outline folder at ${kindSpec.label}/${dir}/versions/ ` +
          `(set ui.outline.dir if the folder name differs from the slug)`
      );
      continue;
    }

    const onDisk = listVersionsOnDisk(versionsDir);

    if (!onDisk.includes(o.version)) {
      errors.push(
        `${label}: schema names ${o.version} but that file does not exist. ` +
          `Available: ${onDisk.join(', ') || '(none)'}`
      );
      continue;
    }

    const newest = onDisk[onDisk.length - 1];
    if (newest !== o.version) {
      warnings.push(`${label}: publishing ${o.version} while ${newest} exists on disk`);
    }

    if (entity.ui.version && entity.ui.version !== o.version) {
      warnings.push(
        `${label}: deprecated ui.version "${entity.ui.version}" disagrees with ` +
          `ui.outline.version "${o.version}" — remove ui.version`
      );
    }

    if (o.maturity === 'internal' && ['Ready', 'Implemented'].includes(entity.status)) {
      warnings.push(
        `${label}: status "${entity.status}" but maturity "internal" — one of these overclaims`
      );
    }

    if (o.maturity !== 'piloted' && entity.status === 'Pilot') {
      warnings.push(`${label}: status "Pilot" but maturity is not "piloted"`);
    }
  }

  // Document folders on disk that no schema entity claims. A folder is only
  // orphaned relative to its own kind, so the claim set is keyed by both.
  const orphanFolders = [];
  const claimedDirs = new Set(published.map((e) => `${kindFor(e)}:${outlineDirFor(e)}`));

  function checkOrphan(kind, dir) {
    const folderPath = path.join(KIND[kind].root, dir);
    if (!fs.existsSync(path.join(folderPath, 'versions'))) return;
    if (!claimedDirs.has(`${kind}:${dir}`)) {
      orphanFolders.push(`${KIND[kind].label}/${dir}`);
    }
  }

  if (fs.existsSync(OUTLINE_ROOT)) {
    for (const tier of fs.readdirSync(OUTLINE_ROOT)) {
      const tierPath = path.join(OUTLINE_ROOT, tier);
      if (!fs.statSync(tierPath).isDirectory()) continue;

      for (const folder of fs.readdirSync(tierPath)) {
        if (!fs.statSync(path.join(tierPath, folder)).isDirectory()) continue;
        checkOrphan('framework', `${tier}/${folder}`);
      }
    }
  }

  if (fs.existsSync(SPEC_ROOT)) {
    for (const folder of fs.readdirSync(SPEC_ROOT)) {
      if (!fs.statSync(path.join(SPEC_ROOT, folder)).isDirectory()) continue;
      checkOrphan('specification', folder);
    }
  }

  const byMaturity = VALID_MATURITY.reduce((acc, m) => {
    acc[m] = published.filter((e) => e.ui.outline.maturity === m).length;
    return acc;
  }, {});

  return {
    errors,
    warnings,
    stats: {
      publishedOutlines: published.filter((e) => kindFor(e) === 'framework').length,
      publishedSpecifications: published.filter((e) => kindFor(e) === 'specification').length,
      unpublishedOutlineFolders: orphanFolders.length,
      byMaturity,
      orphanFolders
    }
  };
}

/* ------------------------------------------------------------------ */
/* Rule 2 — Tier dependency logic                                      */
/* ------------------------------------------------------------------ */

export function validateTierLogic(entities) {
  const unresolved = []; // blocking — a dangling ID breaks graph rendering
  const violations = []; // hygiene  — a real modelling question, not a crash
  const warnings = [];
  const byId = new Map(entities.map((e) => [e.id, e]));

  for (const entity of entities) {
    for (const depId of entity.dependencies ?? []) {
      const dep = byId.get(depId);
      if (!dep) {
        unresolved.push(`${entity.name}: depends on unknown entity "${depId}"`);
        continue;
      }
      if (
        typeof entity.tier === 'number' &&
        typeof dep.tier === 'number' &&
        entity.tier < dep.tier
      ) {
        violations.push(
          `${entity.name} (tier ${entity.tier}) depends on ${dep.name} (tier ${dep.tier})`
        );
      }
    }

    for (const enId of entity.enables ?? []) {
      if (!byId.has(enId)) {
        unresolved.push(`${entity.name}: enables unknown entity "${enId}"`);
      }
    }

    if (
      entity.tier === 0 &&
      entity.status !== 'Retired' &&
      !entity.retired &&
      entity.implementationPriority &&
      !['Critical', 'High'].includes(entity.implementationPriority)
    ) {
      warnings.push(
        `${entity.name}: tier 0 entity with priority "${entity.implementationPriority}"`
      );
    }
  }

  return { unresolved, violations, warnings };
}

/* ------------------------------------------------------------------ */
/* Rule 3 — Relationship validity                                      */
/* ------------------------------------------------------------------ */

export function validateRelationships(entities, relationships) {
  const errors = [];
  const duplicates = [];
  const warnings = [];
  const ids = new Set(entities.map((e) => e.id));
  const seen = new Set();

  for (const rel of relationships) {
    if (!ids.has(rel.from)) errors.push(`Relationship references unknown entity: ${rel.from}`);
    if (!ids.has(rel.to)) errors.push(`Relationship references unknown entity: ${rel.to}`);
    if (rel.from === rel.to) warnings.push(`Self-referencing relationship on ${rel.from}`);

    const key = `${rel.from} --${rel.type}--> ${rel.to}`;
    if (seen.has(key)) duplicates.push(key);
    seen.add(key);
  }

  return { errors, duplicates, warnings };
}

/* ------------------------------------------------------------------ */
/* Rule 4 — UI metadata consistency                                    */
/* ------------------------------------------------------------------ */

export function validateUIConsistency(entities, groupMetadata = {}) {
  const errors = [];
  const warnings = [];

  const withUI = entities.filter((e) => e.ui);
  const paths = new Set();
  const titleKeys = new Set();

  for (const entity of withUI) {
    const label = entity.name || entity.id;

    if (entity.ui.path) {
      if (paths.has(entity.ui.path)) errors.push(`Duplicate UI path: ${entity.ui.path}`);
      paths.add(entity.ui.path);
    }

    if (entity.ui.titleKey) {
      if (titleKeys.has(entity.ui.titleKey)) {
        errors.push(`Duplicate title key: ${entity.ui.titleKey}`);
      }
      titleKeys.add(entity.ui.titleKey);

      if (!entity.ui.titleKey.startsWith('framework.docs.nav.frameworkTitles.')) {
        warnings.push(`${label}: title key does not follow convention (${entity.ui.titleKey})`);
      }
    }

    if (entity.ui.path && entity.ui.slug) {
      const expected = entity.ui.path.split('/').pop();
      if (entity.ui.slug !== expected) {
        warnings.push(`${label}: slug "${entity.ui.slug}" does not match path tail "${expected}"`);
      }
    }

    if (entity.ui.group && Object.keys(groupMetadata).length && !groupMetadata[entity.ui.group]) {
      warnings.push(`${label}: unknown ui.group "${entity.ui.group}"`);
    }
  }

  // Tier 0–2 frameworks that are invisible on the site
  for (const entity of entities) {
    if (entity.type === 'Framework' && entity.tier <= 2 && !entity.ui) {
      warnings.push(`${entity.name}: Tier ${entity.tier} framework with no UI metadata`);
    }
  }

  return { errors, warnings };
}

/* ------------------------------------------------------------------ */
/* Rule 5 — Circular dependencies                                      */
/* ------------------------------------------------------------------ */

export function findCircularDependencies(entities) {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const cycles = [];
  const visited = new Set();
  const stack = new Set();

  function dfs(id, path) {
    if (stack.has(id)) {
      cycles.push([...path.slice(path.indexOf(id)), id]);
      return;
    }
    if (visited.has(id)) return;

    visited.add(id);
    stack.add(id);

    for (const depId of byId.get(id)?.dependencies ?? []) {
      if (byId.has(depId)) dfs(depId, [...path, id]);
    }

    stack.delete(id);
  }

  for (const entity of entities) {
    if (!visited.has(entity.id)) dfs(entity.id, []);
  }

  return cycles;
}

/* ------------------------------------------------------------------ */
/* Rule 6 — Orphaned entities                                          */
/* ------------------------------------------------------------------ */

/**
 * Entities nobody points at and which point at nobody. Usually a concept
 * invented in an outline and never wired into the graph — worth cleaning up,
 * never worth blocking a build over.
 */
export function findOrphanedEntities(entities, relationships) {
  const inbound = new Set();
  const outbound = new Set();

  for (const rel of relationships) {
    outbound.add(rel.from);
    inbound.add(rel.to);
  }
  for (const e of entities) {
    const edges = [...(e.dependencies ?? []), ...(e.enables ?? [])];
    if (edges.length) outbound.add(e.id);
    for (const id of edges) inbound.add(id);
  }

  const label = (e) =>
    `${e.name || e.id} (${e.type}${e.tier != null ? `, tier ${e.tier}` : ''})`;
  const isRetired = (e) => e.status === 'Retired' || !!e.retired;
  const live = entities.filter((e) => !isRetired(e));

  return {
    isolated: live.filter((e) => !inbound.has(e.id) && !outbound.has(e.id)).map(label),
    unclaimed: live.filter((e) => !inbound.has(e.id) && outbound.has(e.id)).map(label),
    // The real retirement invariant: nothing live may still point at a retired entity.
    retiredButReferenced: entities.filter((e) => isRetired(e) && inbound.has(e.id)).map(label)
  };
}

/* ------------------------------------------------------------------ */
/* Runner                                                              */
/* ------------------------------------------------------------------ */

const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose') || !!process.env.VERBOSE;

/** How many items of a warning category to print before collapsing. */
const WARN_PREVIEW = 4;

async function loadSchema() {
  try {
    return await import(SCHEMA_PATH);
  } catch (e) {
    const msg = e.message ?? String(e);
    const isSyntaxError = /Transform failed|Expected|Unexpected|SyntaxError/i.test(msg);

    console.error('❌ Could not load the schema from', SCHEMA_PATH);
    console.error('');

    if (isSyntaxError) {
      console.error('   The schema files do not parse. This is a syntax error in the');
      console.error('   schema itself, not a problem with this script. Fix the file and');
      console.error('   line named below, then re-run.');
    } else {
      console.error('   The schema is TypeScript, so this script must run through tsx:');
      console.error('     "validate:schema": "tsx ./scripts/validate-schema.js"');
    }

    console.error('');
    console.error(
      msg
        .split('\n')
        .map((l) => `   ${l}`)
        .join('\n')
    );
    process.exit(1);
  }
}

async function main() {
  const schema = await loadSchema();
  const entities = schema.allEntities ?? [];
  const relationships = schema.allRelationships ?? [];
  const groupMetadata = schema.groupMetadata ?? {};

  console.log('🔍 Validating GGF Master Schema');
  console.log(`   ${entities.length} entities, ${relationships.length} relationships`);
  if (STRICT) console.log('   Running in --strict mode: hygiene issues count as errors');
  console.log('');

  const outline = validateOutlinePublication(entities);
  const tier = validateTierLogic(entities);
  const rels = validateRelationships(entities, relationships);
  const ui = validateUIConsistency(entities, groupMetadata);
  const cycles = findCircularDependencies(entities);
  const orphans = findOrphanedEntities(entities, relationships);

  /*
   * Two severities.
   *
   *   blocking — the site or the outline pipeline is broken. Always exits 1.
   *              Keep this set small and unambiguous, because `npm run dev`
   *              depends on it via prepare:content.
   *
   *   hygiene  — the model has drifted, but nothing is broken. Reported, and
   *              only fatal under --strict.
   */
  const checks = [
    {
      name: 'Outline files exist',
      severity: 'blocking',
      items: outline.errors,
      pass: `${outline.stats.publishedOutlines} published outline${
        outline.stats.publishedOutlines === 1 ? '' : 's'
      } present on disk`
    },
    {
      name: 'Entity references resolve',
      severity: 'blocking',
      items: [...rels.errors, ...tier.unresolved],
      pass: 'Every relationship, dependency and enables target exists'
    },
    {
      name: 'Routes are unique',
      severity: 'blocking',
      items: ui.errors,
      pass: 'No duplicate UI paths, slugs or title keys'
    },
    {
      name: 'Tier ordering',
      severity: 'hygiene',
      items: tier.violations,
      pass: 'No entity depends on a higher tier'
    },
    {
      name: 'Dependency cycles',
      severity: 'hygiene',
      items: cycles.map((c) => `${c.join(' → ')}`),
      pass: 'No circular dependencies'
    },
    {
      name: 'Duplicate relationships',
      severity: 'hygiene',
      items: rels.duplicates,
      pass: 'No relationship declared twice'
    },
    {
      name: 'Isolated entities',
      severity: 'hygiene',
      items: orphans.isolated,
      pass: 'No entity sits outside the graph entirely'
    },
    {
      name: 'Unclaimed entities',
      severity: 'hygiene',
      items: orphans.unclaimed,
      pass: 'Every entity has something that establishes it'
    },
    {
      name: 'Retirement integrity',
      severity: 'hygiene',
      items: orphans.retiredButReferenced.map((l) => `${l} — retired but still referenced`),
      pass: 'No live entity points at a retired one'
    },
    {
      name: 'Metadata conventions',
      severity: 'hygiene',
      items: [...outline.warnings, ...tier.warnings, ...ui.warnings, ...rels.warnings],
      pass: 'Versions, statuses and title keys are consistent'
    }
  ];

  const blocking = checks.filter((c) => c.severity === 'blocking');
  const hygiene = checks.filter((c) => c.severity === 'hygiene');

  /* ---- blocking checks ---- */

  console.log('BLOCKING — these break the site');
  console.log('');
  for (const check of blocking) {
    const failed = check.items.length > 0;
    console.log(`  ${failed ? '❌' : '✅'} ${check.name}`);
    if (failed) {
      check.items.forEach((i) => console.log(`       ✗ ${i}`));
    } else {
      console.log(`       ${check.pass}`);
    }
  }

  /* ---- hygiene checks ---- */

  console.log('');
  console.log('HYGIENE — the model has drifted, but nothing is broken');
  console.log('');
  for (const check of hygiene) {
    const n = check.items.length;
    if (n === 0) {
      console.log(`  ✅ ${check.name}`);
      console.log(`       ${check.pass}`);
      continue;
    }

    console.log(`  ⚠️  ${check.name} — ${n}`);
    const shown = VERBOSE ? check.items : check.items.slice(0, WARN_PREVIEW);
    shown.forEach((i) => console.log(`       • ${i}`));
    if (!VERBOSE && n > WARN_PREVIEW) {
      console.log(`       … and ${n - WARN_PREVIEW} more (run with --verbose)`);
    }
  }

  /* ---- statistics ---- */

  const byTier = entities.reduce((acc, e) => {
    if (typeof e.tier === 'number') acc[e.tier] = (acc[e.tier] ?? 0) + 1;
    return acc;
  }, {});

  console.log('');
  console.log('SCHEMA');
  console.log('');
  console.log(`  Entities             ${entities.length}`);
  console.log(`  Frameworks           ${entities.filter((e) => e.type === 'Framework').length}`);
  console.log(`  Relationships        ${relationships.length}`);
  console.log(`  Entities with UI     ${entities.filter((e) => e.ui).length}`);
  console.log('');
  Object.keys(byTier)
    .sort()
    .forEach((t) => {
      console.log(`  Tier ${t}  ${(TIER_NAMES[t] ?? '').padEnd(32)} ${byTier[t]}`);
    });

  console.log('');
  console.log('OUTLINE PUBLICATION');
  console.log('');
  console.log(`  Frameworks published                ${outline.stats.publishedOutlines}`);
  console.log(`  Specifications published            ${outline.stats.publishedSpecifications}`);
  console.log(`  Document folders not yet published  ${outline.stats.unpublishedOutlineFolders}`);
  console.log('');
  Object.entries(outline.stats.byMaturity).forEach(([m, n]) => {
    console.log(`  ${m.padEnd(14)} ${n}`);
  });

  if (outline.stats.orphanFolders.length && VERBOSE) {
    console.log('');
    console.log('  Not yet published:');
    outline.stats.orphanFolders.forEach((d) => console.log(`    ${d}`));
  }

  /* ---- result ---- */

  const blockingCount = blocking.reduce((n, c) => n + c.items.length, 0);
  const hygieneCount = hygiene.reduce((n, c) => n + c.items.length, 0);

  console.log('');

  if (blockingCount > 0) {
    console.log(`❌ ${blockingCount} blocking issue${blockingCount === 1 ? '' : 's'}. Fix these first.`);
    process.exit(1);
  }

  if (STRICT && hygieneCount > 0) {
    console.log(`❌ ${hygieneCount} hygiene issue${hygieneCount === 1 ? '' : 's'} (--strict).`);
    process.exit(1);
  }

  if (hygieneCount > 0) {
    console.log(
      `✅ Nothing broken. ${hygieneCount} hygiene issue${hygieneCount === 1 ? '' : 's'} to work through.`
    );
  } else {
    console.log('✅ Schema validation passed');
  }

  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error('❌ Validation crashed:', e);
    process.exit(1);
  });
}
