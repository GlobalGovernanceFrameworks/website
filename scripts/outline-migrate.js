#!/usr/bin/env node

// scripts/outline-migrate.js
//
// Audits which framework routes can move to outline-first publication, and
// performs the move one slug at a time.
//
//   npm run outline:audit                    report on everything
//   npm run outline:audit -- --ready         only what can migrate today
//   npm run outline:migrate -- <slug>        archive the route, print schema
//   npm run outline:migrate -- <slug> --dry  show what would happen
//
// Add to package.json:
//   "outline:audit":   "tsx ./scripts/outline-migrate.js",
//   "outline:migrate": "tsx ./scripts/outline-migrate.js --migrate"

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const ROUTES = path.join(ROOT, 'src/routes/frameworks');
const OUTLINES = path.join(ROOT, 'src/lib/content/framework-outlines/en');
const ARCHIVE = path.join(ROOT, 'archive/outline-migration/routes/frameworks');

// Route folders that are not frameworks and must never be touched.
const NOT_FRAMEWORKS = new Set([
  '[slug]',
  'docs',
  'tools',
  'visuals',
  'guides',
  'hubs',
  'tier-0',
  'tier-1',
  'tier-2',
  'tier-3',
  'tier-4',
  'ai-futures'
]);

/* ------------------------------------------------------------------ */
/* Filesystem survey                                                   */
/* ------------------------------------------------------------------ */

function dirs(p) {
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter((f) => fs.statSync(path.join(p, f)).isDirectory());
}

function compareVersions(a, b) {
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

/** Every outline folder on disk, as { dir, slugGuess, tier, versions }. */
function surveyOutlines() {
  const out = [];
  for (const tier of dirs(OUTLINES)) {
    const tierNum = /^tier-(\d)$/.exec(tier)?.[1];
    for (const folder of dirs(path.join(OUTLINES, tier))) {
      const versionsDir = path.join(OUTLINES, tier, folder, 'versions');
      if (!fs.existsSync(versionsDir)) continue;

      const versions = fs
        .readdirSync(versionsDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''))
        .sort(compareVersions);

      if (!versions.length) continue;

      const reviewsDir = path.join(OUTLINES, tier, folder, 'reviews');
      const reviewCount = fs.existsSync(reviewsDir) ? countFiles(reviewsDir) : 0;

      out.push({
        dir: `${tier}/${folder}`,
        folder,
        tier: tierNum != null ? Number(tierNum) : null,
        versions,
        newest: versions[versions.length - 1],
        reviewCount
      });
    }
  }
  return out;
}

function countFiles(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (fs.statSync(p).isDirectory()) n += countFiles(p);
    else if (entry.endsWith('.md')) n += 1;
  }
  return n;
}

/* ------------------------------------------------------------------ */
/* mdsvex hostility check                                              */
/* ------------------------------------------------------------------ */

/**
 * mdsvex hands markdown to the Svelte compiler, so `{` and `}` become
 * expression delimiters and `<` can start a tag. Finds the places that will
 * need backticks before the file can render.
 */
function checkMdsvex(filePath) {
  const problems = [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    // Strip inline code spans — those are already safe.
    const bare = line.replace(/`[^`]*`/g, '');

    if (/[{}]/.test(bare)) {
      problems.push({ line: i + 1, kind: 'brace', text: line.trim().slice(0, 90) });
    }
    // `<` not followed by a letter or `/` is not a tag, and Svelte may choke.
    if (/<(?![a-zA-Z/!])/.test(bare)) {
      problems.push({ line: i + 1, kind: 'angle', text: line.trim().slice(0, 90) });
    }
  });

  return problems;
}

/* ------------------------------------------------------------------ */
/* Matching routes to outlines                                         */
/* ------------------------------------------------------------------ */

async function loadSchema() {
  try {
    return await import('../src/lib/data/schema/_index.ts');
  } catch (e) {
    console.error('❌ Could not load the schema. Run npm run validate:schema first.');
    console.error(`   ${e.message}`);
    process.exit(1);
  }
}

function matchOutline(slug, tier, outlines) {
  // 1. exact folder name in the expected tier
  const exact = outlines.find((o) => o.folder === slug && o.tier === tier);
  if (exact) return { outline: exact, needsDirOverride: false };

  // 2. exact folder name in any tier
  const anyTier = outlines.find((o) => o.folder === slug);
  if (anyTier) return { outline: anyTier, needsDirOverride: true, reason: 'tier mismatch' };

  // 3. one is a prefix of the other — usually a shortened route slug
  const partial = outlines.filter(
    (o) => o.folder.startsWith(slug) || slug.startsWith(o.folder)
  );
  if (partial.length === 1) {
    return { outline: partial[0], needsDirOverride: true, reason: 'folder name differs' };
  }

  // 4. same letters, different spelling — catches typos like millenium/millennium
  const normalise = (s) => s.replace(/[^a-z]/g, '');
  const fuzzy = outlines.filter((o) => {
    const a = normalise(o.folder);
    const b = normalise(slug);
    return levenshtein(a, b) <= 2;
  });
  if (fuzzy.length === 1) {
    return { outline: fuzzy[0], needsDirOverride: true, reason: 'likely spelling difference' };
  }

  return { outline: null };
}

function levenshtein(a, b) {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      m[i][j] = Math.min(
        m[i - 1][j] + 1,
        m[i][j - 1] + 1,
        m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return m[a.length][b.length];
}

/** 'The Weaver Protocol' -> 'weaver-protocol' */
function slugifyName(name = '') {
  return name
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Finds the schema entity that corresponds to an outline folder, including
 * entities that have no `ui` block at all.
 *
 * Matching order: declared outline dir, then ui.slug, then the entity's own
 * name. The name fallback is what lets an unpublished entity be recognised.
 */
function entityForOutline(outline, entities) {
  const byDir = entities.find(
    (e) =>
      e.ui?.slug &&
      (e.ui.outline?.dir ?? `tier-${e.tier}/${e.ui.slug}`) === outline.dir
  );
  if (byDir) return byDir;
 
  const bySlug = entities.find((e) => e.ui?.slug === outline.folder);
  if (bySlug) return bySlug;
 
  return (
    entities.find((e) => {
      const name = slugifyName(e.name);
      const short = slugifyName(e.shortName);
      if (name === outline.folder || short === outline.folder) return true;
 
      // Tolerate small spelling differences, but only on names long enough
      // that a near-match is not a coincidence.
      const a = name.replace(/-/g, '');
      const b = outline.folder.replace(/-/g, '');
      return a.length > 10 && levenshtein(a, b) <= 2;
    }) ?? null
  );
}


/* ------------------------------------------------------------------ */
/* Audit                                                               */
/* ------------------------------------------------------------------ */

async function audit({ readyOnly }) {
  const schema = await loadSchema();
  const outlines = surveyOutlines();
  const entities = schema.allEntities ?? [];
 
  const routeFolders = dirs(ROUTES).filter((d) => !NOT_FRAMEWORKS.has(d));
 
  const entityBySlug = new Map(
    entities.filter((e) => e.ui?.slug).map((e) => [e.ui.slug, e])
  );
 
  const buckets = {
    migrated: [],
    ready: [],
    needsDir: [],
    needsEscaping: [],
    noOutline: [],
    noEntity: [],
    unpublished: []
  };
 
  for (const slug of routeFolders) {
    const entity = entityBySlug.get(slug);
 
    if (entity?.ui?.outline || entity?.ui?.prose) {
      buckets.migrated.push({ slug, note: 'route folder still present — safe to archive' });
      continue;
    }
 
    const tier = entity?.tier ?? null;
    const { outline, needsDirOverride, reason } = matchOutline(slug, tier, outlines);
 
    if (!outline) {
      buckets.noOutline.push({ slug, entity });
      continue;
    }
 
    if (!entity) {
      buckets.needsDir.push({
        slug,
        entity: null,
        outline,
        needsDirOverride: true,
        reason: 'no schema entity — create one first',
        problems: []
      });
      continue;
    }
 
    const newestPath = path.join(OUTLINES, outline.dir, 'versions', `${outline.newest}.md`);
    const problems = checkMdsvex(newestPath);
    const record = { slug, entity, outline, needsDirOverride, reason, problems };
 
    if (problems.length) buckets.needsEscaping.push(record);
    else if (needsDirOverride) buckets.needsDir.push(record);
    else buckets.ready.push(record);
  }
 
  /* ---- outlines that no route folder accounted for ---- */
 
  const claimedDirs = new Set(
    [...buckets.ready, ...buckets.needsDir, ...buckets.needsEscaping].map((r) => r.outline.dir)
  );
 
  for (const o of outlines) {
    if (claimedDirs.has(o.dir)) continue;
 
    const entity = entityForOutline(o, entities);
 
    if (!entity) {
      buckets.noEntity.push({ outline: o });
      continue;
    }
 
    // An entity exists. If it publishes, its route was handled above; if not,
    // this is a deliberate decision to keep the work out of the site.
    if (!entity.ui?.outline && !entity.ui?.prose) {
      buckets.unpublished.push({ outline: o, entity });
    }
  }
 
  /* ---- output ---- */
 
  console.log('');
  console.log('OUTLINE MIGRATION AUDIT');
  console.log('');
 
  section('✅ READY — migrate now', buckets.ready, (r) => {
    console.log(`   ${r.slug}`);
    console.log(
      `      ${r.outline.dir}  ${r.outline.newest}  ` +
        `(${r.outline.versions.length} versions, ${r.outline.reviewCount} reviews)`
    );
  });
 
  if (readyOnly) return finish(buckets);
 
  section('🔧 NEEDS ui.outline.dir', buckets.needsDir, (r) => {
    console.log(`   ${r.slug}  — ${r.reason}`);
    console.log(`      dir: '${r.outline.dir}'   version: '${r.outline.newest}'`);
  });
 
  section('⚠️  NEEDS ESCAPING before it will render', buckets.needsEscaping, (r) => {
    console.log(`   ${r.slug}  → ${r.outline.dir}/versions/${r.outline.newest}.md`);
    r.problems.slice(0, 5).forEach((p) => {
      console.log(`      line ${p.line} (${p.kind}): ${p.text}`);
    });
    if (r.problems.length > 5) console.log(`      … and ${r.problems.length - 5} more`);
  });
 
  section('📄 NO OUTLINE — decide what to do with the prose draft', buckets.noOutline, (r) => {
    console.log(`   ${r.slug}  (schema status: ${r.entity?.status ?? 'unknown'})`);
  });
 
  section('👻 OUTLINE WITH NO SCHEMA ENTITY — nothing knows this exists', buckets.noEntity, (r) => {
    console.log(`   ${r.outline.dir}  ${r.outline.newest}`);
  });
 
  section('🔕 KNOWN BUT UNPUBLISHED — entity exists, no ui block', buckets.unpublished, (r) => {
    console.log(`   ${r.outline.dir}  ${r.outline.newest}`);
    console.log(`      ${r.entity.id} — ${r.entity.name}`);
  });
 
  section('📦 ALREADY MIGRATED — route folder can be archived', buckets.migrated, (r) => {
    console.log(`   ${r.slug}`);
  });
 
  finish(buckets);
}

function section(title, items, render) {
  console.log(`${title} — ${items.length}`);
  console.log('');
  if (!items.length) console.log('   (none)');
  items.forEach(render);
  console.log('');
}

function finish(buckets) {
  console.log('─'.repeat(60));
  console.log(
    `   ready ${buckets.ready.length} · needs dir ${buckets.needsDir.length} · ` +
      `needs escaping ${buckets.needsEscaping.length} · no outline ${buckets.noOutline.length}`
  );
  console.log(
    `   unclaimed outlines: ${buckets.noEntity.length} with no entity, ` +
      `${buckets.unpublished.length} known but unpublished`
  );
  console.log('');
  console.log('   Migrate one:  npm run outline:migrate -- <slug>');
  console.log('');
}


/* ------------------------------------------------------------------ */
/* Migrate                                                             */
/* ------------------------------------------------------------------ */

async function migrate(slug, { dry }) {
  const schema = await loadSchema();
  const outlines = surveyOutlines();

  const entity = schema.allEntities.find((e) => e.ui?.slug === slug);
  if (!entity) {
    console.error(`❌ No schema entity with ui.slug "${slug}".`);
    process.exit(1);
  }

  const { outline, needsDirOverride } = matchOutline(slug, entity.tier, outlines);
  if (!outline) {
    console.error(`❌ No outline folder found for "${slug}". Run the audit.`);
    process.exit(1);
  }

  const newestPath = path.join(OUTLINES, outline.dir, 'versions', `${outline.newest}.md`);
  const problems = checkMdsvex(newestPath);

  if (problems.length) {
    console.error(`❌ ${outline.newest}.md will not render until these are fixed:`);
    problems.forEach((p) => console.error(`     line ${p.line} (${p.kind}): ${p.text}`));
    console.error('');
    console.error('   Wrap the offending text in backticks, then re-run.');
    process.exit(1);
  }

  const from = path.join(ROUTES, slug);
  const to = path.join(ARCHIVE, slug);

  console.log('');
  console.log(`Migrating ${slug}`);
  console.log('');

  /* ---- 1. the schema block to paste ---- */

  const today = new Date().toISOString().slice(0, 10);
  console.log('1. Add to the entity in src/lib/data/schema/:');
  console.log('');
  console.log('      outline: {');
  if (needsDirOverride) console.log(`        dir: '${outline.dir}',`);
  console.log(`        version: '${outline.newest}',`);
  console.log(`        updated: '${today}',`);
  console.log(`        maturity: '${outline.reviewCount > 0 ? 'adversarial' : 'internal'}',`);
  console.log(`        standfirst: ''  // two or three sentences — write this`);
  console.log('      }');
  console.log('');
  console.log('   And remove the deprecated ui.version line if present.');
  console.log('');

  /* ---- 2. the move ---- */

  console.log('2. Archive the route folder:');
  console.log('');

  if (!fs.existsSync(from)) {
    console.log(`   (no route folder at src/routes/frameworks/${slug} — nothing to move)`);
  } else if (dry) {
    console.log(`   [dry run] git mv ${path.relative(ROOT, from)} ${path.relative(ROOT, to)}`);
  } else {
    fs.mkdirSync(ARCHIVE, { recursive: true });
    try {
      execSync(`git mv "${from}" "${to}"`, { cwd: ROOT, stdio: 'pipe' });
      console.log(`   Moved to archive/outline-migration/routes/frameworks/${slug}`);
    } catch {
      fs.renameSync(from, to);
      console.log(`   Moved (not tracked by git) to archive/.../${slug}`);
    }
  }

  console.log('');
  console.log('3. npm run schema:check');
  console.log('');
}

/* ------------------------------------------------------------------ */

const args = process.argv.slice(2);

if (args.includes('--migrate')) {
  const slug = args[args.indexOf('--migrate') + 1];
  if (!slug || slug.startsWith('--')) {
    console.error('Usage: npm run outline:migrate -- <slug> [--dry]');
    process.exit(1);
  }
  migrate(slug, { dry: args.includes('--dry') });
} else {
  audit({ readyOnly: args.includes('--ready') });
}
