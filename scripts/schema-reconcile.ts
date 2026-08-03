/**
 * schema-reconcile.ts — diffs the GGF schema against the canonical outlines.
 *
 *   npx tsx scripts/schema-reconcile.ts                  # metadata drift, all frameworks
 *   npx tsx scripts/schema-reconcile.ts --links          # + relationship drift, all frameworks
 *   npx tsx scripts/schema-reconcile.ts framework_aubi   # full report for one framework
 *   npx tsx scripts/schema-reconcile.ts --min 3          # raise mention threshold (default 2)
 *
 * The outline is authoritative. This script never writes — it produces a worklist.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { allEntities, allRelationships } from '../src/lib/data/schema/_index';
import type { GgfEntity } from '../src/lib/data/schema/_types';

const OUTLINE_ROOT = 'src/lib/content/framework-outlines/en';

// Names too generic to match on, plus manual aliases for concepts the outlines
// refer to by a different word than the schema `name`/`shortName`.
const STOPWORDS = new Set([
	'framework', 'protocol', 'council', 'accord', 'layer', 'commons', 'treaty',
	'the treaty', 'global governance', 'core governance'
]);
const ALIASES: Record<string, string[]> = {
	mechanism_hearts: ['Hearts'],
	mechanism_leaves: ['Leaves'],
	platform_love_ledger: ['Love Ledger'],
	institution_baz_council: ['BAZ Council'],
	council_earth: ['Earth Council'],
	protocol_fpic2: ['FPIC 2.0', 'FPIC2']
	// extend as false negatives show up
};

const args = process.argv.slice(2);
const only = args.find((a) => !a.startsWith('--'));
const wantLinks = args.includes('--links') || Boolean(only);
const MIN = Number(args[args.indexOf('--min') + 1]) || 2;

const byId = new Map(allEntities.map((e) => [e.id, e]));

/** Undirected adjacency — direction is a separate editorial question. */
const linked = new Map<string, Set<string>>();
for (const r of allRelationships) {
	if (!linked.has(r.from)) linked.set(r.from, new Set());
	if (!linked.has(r.to)) linked.set(r.to, new Set());
	linked.get(r.from)!.add(r.to);
	linked.get(r.to)!.add(r.from);
}

function outlineDir(e: GgfEntity): string | null {
	const d = e.ui?.outline?.dir ?? (e.tier != null && e.ui?.slug ? `tier-${e.tier}/${e.ui.slug}` : null);
	return d ? join(OUTLINE_ROOT, d, 'versions') : null;
}

function readOutline(e: GgfEntity) {
	const dir = outlineDir(e);
	const version = e.ui?.outline?.version;
	if (!dir || !version) return { dir, missing: true as const };
	if (!existsSync(dir)) return { dir, missing: true as const };
	const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
	const file = files.find((f) => f.replace(/\.md$/, '') === version);
	return { dir, files, file, missing: !file, text: file ? readFileSync(join(dir, file), 'utf8') : '' };
}

/** Compare loosely: subtitles, acronyms, articles and version suffixes drift constantly. */
const norm = (s: string) =>
	s
		.replace(/\([^)]*\)/g, ' ') // parenthetical acronyms
		.replace(/\s+[-–—:]\s+.*$/, '') // subtitle after a dash or colon
		.replace(/\bv?\d+(\.\d+)*\b/gi, ' ') // version suffixes
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, ' ')
		.replace(/\b(the|a|an|framework|protocol|accord|layer|for|of|and)\b/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

/** Only real drift: neither name contains the other after normalisation. */
const nameDrifted = (a: string, b: string) => {
	const [x, y] = [norm(a), norm(b)];
	return x !== y && !x.includes(y) && !y.includes(x);
};

function outlineTitle(text: string): string | null {
	const fm = text.match(/^---\n([\s\S]*?)\n---/);
	if (fm) {
		const t = fm[1].match(/^title:\s*(.+)$/m);
		if (t) return t[1].trim().replace(/^["']|["']$/g, '');
	}
	const h = text.match(/^#\s+(.+)$/m);
	return h ? h[1].replace(/[*_`]/g, '').trim() : null;
}

const declaredId = (t: string) => t.match(/[Ff]ramework[ _][Ii][Dd]:?\**\s*`?([a-z_]+_[a-z_]+)`?/)?.[1] ?? null;
const declaredDate = (t: string) =>
	t.match(/^\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? t.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;

// ---- lexicon -------------------------------------------------------------
type Term = { term: string; id: string; re: RegExp };
const lexicon: Term[] = [];
for (const e of allEntities) {
	const terms = new Set<string>(ALIASES[e.id] ?? []);
	for (const raw of [e.shortName, e.name]) {
		if (!raw) continue;
		const t = raw.replace(/\s*[-–—:(].*$/, '').trim();
		if (t.length >= 6 && !STOPWORDS.has(t.toLowerCase())) terms.add(t);
	}
	for (const term of terms) {
		lexicon.push({ term, id: e.id, re: new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi') });
	}
}

function mentions(text: string, selfId: string) {
	const counts = new Map<string, number>();
	for (const { id, re } of lexicon) {
		if (id === selfId) continue;
		const n = (text.match(re) ?? []).length;
		if (n) counts.set(id, Math.max(counts.get(id) ?? 0, n));
	}
	return counts;
}

// ---- report --------------------------------------------------------------
const published = allEntities.filter((e) => e.ui?.outline).filter((e) => !only || e.id === only);
if (only && published.length === 0) {
	console.error(`No published entity with id "${only}".`);
	process.exit(1);
}

const label = (id: string) => `${id} — ${byId.get(id)?.shortName ?? byId.get(id)?.name ?? '??'}`;
let drift = 0;

for (const e of published) {
	const o = e.ui!.outline!;
	const r = readOutline(e);
	const notes: string[] = [];

	if (r.missing) {
		const seen = r.files?.length ? ` (present: ${r.files.join(', ')})` : '';
		notes.push(`**missing outline** — expected \`${r.dir}/${o.version}.md\`${seen}`);
	} else {
		const newest = r.files!.map((f) => f.replace(/\.md$/, '')).sort()
			.filter((v) => v.localeCompare(o.version, undefined, { numeric: true }) > 0);
		if (newest.length) notes.push(`**stale version** — schema says ${o.version}, newer on disk: ${newest.join(', ')}`);

		const title = outlineTitle(r.text!);
		if (title && nameDrifted(title, e.name)) notes.push(`**name drift** — schema \`${e.name}\` / outline \`${title}\``);

		const did = declaredId(r.text!);
		if (did && did !== e.id) notes.push(`**id drift** — schema \`${e.id}\` / outline declares \`${did}\``);

		const date = declaredDate(r.text!);
		if (date && date !== o.updated) notes.push(`**date drift** — schema ${o.updated} / outline ${date}`);
	}
	if (!o.standfirst?.trim()) notes.push('empty `standfirst`');

	let links: string[] = [];
	if (wantLinks && !r.missing) {
		const counts = mentions(r.text!, e.id);
		const have = linked.get(e.id) ?? new Set<string>();
		const missing = [...counts].filter(([id, n]) => n >= MIN && !have.has(id)).sort((a, b) => b[1] - a[1]);
		const unsupported = [...have].filter((id) => !counts.has(id)).sort();
		if (missing.length) links.push(`  - candidate links (${missing.length}): ` + missing.map(([id, n]) => `${label(id)} ×${n}`).join('; '));
		if (unsupported.length) links.push(`  - unsupported links (${unsupported.length}): ` + unsupported.map(label).join('; '));
	}

	if (notes.length || links.length) {
		drift++;
		console.log(`\n### ${e.id} — ${e.name} (${o.version})`);
		for (const n of notes) console.log(`  - ${n}`);
		for (const l of links) console.log(l);
	}
}

// Entities nothing points at — usually orphans from a superseded outline.
const isolated = allEntities.filter((e) => !(linked.get(e.id)?.size));
console.log(`\n---\n${published.length} published entities checked, ${drift} with drift.`);
if (!only && isolated.length) {
	console.log(`\n### ${isolated.length} entities with zero relationships`);
	for (const e of isolated) console.log(`  - ${e.id} — ${e.name}`);
}
