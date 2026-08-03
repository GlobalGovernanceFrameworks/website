/**
 * schema-normalize.ts — syncs `ui.outline.updated` to the date declared in
 * each outline document. Nothing else.
 *
 *   npx tsx scripts/schema-normalize.ts --dry     # show what would change
 *   npx tsx scripts/schema-normalize.ts           # write
 *
 * Deliberately narrow. It rewrites one quoted date per entity by locating the
 * entity's `id:` line and taking the first `updated: '...'` that follows.
 * Anything broader risks eating comments, so renames and standfirsts stay
 * manual.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { allEntities } from '../src/lib/data/schema/_index';

const SCHEMA_DIR = 'src/lib/data/schema';
const OUTLINE_ROOT = 'src/lib/content/framework-outlines/en';
const dry = process.argv.includes('--dry');

/** `**Date:** 2026-08-01`, `date: 2026-08-01`, or `**Revision:** 1.5 (2026-08-01)` */
function declaredDate(text: string): string | null {
	return (
		text.match(/^\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ??
		text.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ??
		text.match(/^\*\*Revision:\*\*.*?\((\d{4}-\d{2}-\d{2})\)/m)?.[1] ??
		null
	);
}

// Cache each cluster file once so multiple entities in the same file compose.
const files = new Map<string, string>();
const load = (p: string) => {
	if (!files.has(p)) files.set(p, readFileSync(p, 'utf8'));
	return files.get(p)!;
};

const clusterFiles = readdirSync(SCHEMA_DIR)
	.filter((f) => f.startsWith('cluster.') && f.endsWith('.ts'))
	.map((f) => join(SCHEMA_DIR, f));

/** Which cluster file declares this entity id. */
function findFile(id: string): string | null {
	return clusterFiles.find((p) => load(p).includes(`id: '${id}'`)) ?? null;
}

let changed = 0;
let skipped = 0;

for (const e of allEntities) {
	const o = e.ui?.outline;
	if (!o) continue;

	const dir = o.dir ?? (e.tier != null && e.ui?.slug ? `tier-${e.tier}/${e.ui.slug}` : null);
	if (!dir) continue;
	const md = join(OUTLINE_ROOT, dir, 'versions', `${o.version}.md`);
	if (!existsSync(md)) {
		console.log(`  skip ${e.id} — no outline at ${md}`);
		skipped++;
		continue;
	}

	const date = declaredDate(readFileSync(md, 'utf8'));
	if (!date) {
		console.log(`  skip ${e.id} — outline declares no parseable date`);
		skipped++;
		continue;
	}
	if (date === o.updated) continue;

	const path = findFile(e.id);
	if (!path) {
		console.log(`  skip ${e.id} — not found in any cluster file`);
		skipped++;
		continue;
	}

	const src = load(path);
	const at = src.indexOf(`id: '${e.id}'`);
	const rel = src.slice(at).match(/updated:\s*'(\d{4}-\d{2}-\d{2})'/);
	if (!rel || rel[1] !== o.updated) {
		console.log(`  skip ${e.id} — could not locate its updated: field unambiguously`);
		skipped++;
		continue;
	}

	const abs = at + rel.index!;
	files.set(path, src.slice(0, abs) + `updated: '${date}'` + src.slice(abs + rel[0].length));
	console.log(`  ${e.id.padEnd(42)} ${o.updated} → ${date}`);
	changed++;
}

if (!dry) for (const [p, text] of files) writeFileSync(p, text);

console.log(`\n${changed} dates ${dry ? 'would change' : 'updated'}, ${skipped} skipped.`);
if (!dry && changed) console.log('Review with: git diff src/lib/data/schema');
