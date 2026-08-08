#!/usr/bin/env node

// scripts/entity-provenance.js
//
// For every entity that nothing points at, search the outline corpus for the
// entity's name and report which documents mention it. This separates three
// cases the connectivity warning collapses into one:
//
//   retired      — deliberately disconnected, nothing to do
//   unclaimed    — the establishing framework exists but declares no edge
//   unsourced    — no document mentions it at all; it exists only in the schema
//
// Run:  npx tsx scripts/entity-provenance.js [--json]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = '../src/lib/data/schema/_index.ts';
const CONTENT_ROOTS = [
  path.join(__dirname, '../src/lib/content/framework-outlines/en'),
  path.join(__dirname, '../src/lib/content/specifications/en')
];

const JSON_OUT = process.argv.includes('--json');

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (p.endsWith('.md')) acc.push(p);
  }
  return acc;
}

/** Search terms for an entity: full name, shortName, and the name minus any parenthetical. */
function termsFor(entity) {
  const terms = new Set();
  const base = (entity.name ?? '').replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  if (base.length > 3) terms.add(base);
  if (entity.shortName && entity.shortName.length > 3) terms.add(entity.shortName);
  const paren = (entity.name ?? '').match(/\(([^)]+)\)/);
  if (paren && paren[1].length > 3) terms.add(paren[1]);
  return [...terms];
}

const schema = await import(SCHEMA_PATH);
const entities = schema.allEntities ?? [];
const relationships = schema.allRelationships ?? [];

const inbound = new Set();
for (const r of relationships) inbound.add(r.to);
for (const e of entities) {
  for (const id of e.dependencies ?? []) inbound.add(id);
  for (const id of e.enables ?? []) inbound.add(id);
}

const docs = CONTENT_ROOTS.flatMap((r) => walk(r)).map((p) => ({
  file: path.relative(path.join(__dirname, '..'), p),
  text: fs.readFileSync(p, 'utf8').toLowerCase()
}));

const byId = new Map(entities.map((e) => [e.id, e]));
const results = [];

for (const e of entities) {
  if (inbound.has(e.id)) continue;

  const retired = e.status === 'Retired' || !!e.retired;
  const hits = [];
  for (const term of termsFor(e)) {
    const t = term.toLowerCase();
    for (const d of docs) if (d.text.includes(t) && !hits.includes(d.file)) hits.push(d.file);
  }

  results.push({
    id: e.id,
    name: e.name,
    type: e.type,
    tier: e.tier,
    verdict: retired ? 'retired' : hits.length ? 'unclaimed' : 'unsourced',
    declaredParents: (e.dependencies ?? []).map((d) => byId.get(d)?.name ?? d),
    mentionedIn: hits
  });
}

if (JSON_OUT) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const group of ['unsourced', 'unclaimed', 'retired']) {
    const rows = results.filter((r) => r.verdict === group);
    console.log(`\n${group.toUpperCase()} — ${rows.length}`);
    for (const r of rows) {
      console.log(`  ${r.name} (${r.type}, tier ${r.tier})`);
      console.log(`     declared parents: ${r.declaredParents.join(', ') || '(none)'}`);
      if (r.mentionedIn.length) console.log(`     mentioned in:     ${r.mentionedIn.join(', ')}`);
    }
  }
  console.log('');
}
