/**
 * scripts/framework-index.ts
 *
 * Answers: "which entities live in which cluster file, at what version, and
 * where is the outline file I need to bump?"
 *
 *   npx tsx scripts/framework-index.ts                 published entities, by file
 *   npx tsx scripts/framework-index.ts --all           include unpublished entities
 *   npx tsx scripts/framework-index.ts --frameworks    type === 'Framework' only
 *   npx tsx scripts/framework-index.ts --sort date     flat list, oldest updated first
 *   npx tsx scripts/framework-index.ts --stale 90      only updated > 90 days ago
 *   npx tsx scripts/framework-index.ts --grep housing  filter on id/name/slug/file
 *   npx tsx scripts/framework-index.ts --paths         print outline paths, nothing else
 *   npx tsx scripts/framework-index.ts --csv|--json|--md
 */

import { readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { GgfEntity } from '../src/lib/data/schema/_types';

const SCHEMA_DIR = resolve('src/lib/data/schema');
const OUTLINE_ROOT = 'src/lib/content/framework-outlines/en';
const PROSE_ROOT = 'src/lib/content/frameworks/en/implementation';

/** Only check for missing outline files when run from the repo root. */
const CAN_CHECK_FILES = existsSync(OUTLINE_ROOT);

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2);
const has = (f: string) => argv.includes(f);
const val = (f: string) => {
	const i = argv.indexOf(f);
	return i >= 0 ? argv[i + 1] : undefined;
};

const opts = {
	all: has('--all'),
	frameworksOnly: has('--frameworks'),
	sortByDate: val('--sort') === 'date',
	staleDays: val('--stale') ? Number(val('--stale')) : undefined,
	grep: val('--grep')?.toLowerCase(),
	paths: has('--paths'),
	csv: has('--csv'),
	json: has('--json'),
	md: has('--md')
};

// ---------------------------------------------------------------- model
type Row = {
	file: string;
	exportName: string;
	id: string;
	name: string;
	type: string;
	tier: number | '';
	status: string;
	source: 'outline' | 'prose' | 'legacy' | 'unpublished';
	version: string;
	updated: string;
	maturity: string;
	docPath: string;
	ageDays: number | '';
	flags: string[];
};

const isEntityArray = (v: unknown): v is GgfEntity[] =>
	Array.isArray(v) &&
	v.length > 0 &&
	v.every((e) => e && typeof e === 'object' && typeof (e as any).id === 'string' && typeof (e as any).type === 'string');

const daysSince = (iso?: string) => {
	if (!iso) return '' as const;
	const t = Date.parse(iso);
	return Number.isNaN(t) ? ('' as const) : Math.floor((Date.now() - t) / 86_400_000);
};

function toRow(e: GgfEntity, file: string, exportName: string): Row {
	const outline = e.ui?.outline;
	const prose = e.ui?.prose;
	const legacy = e.ui?.version;
	const flags: string[] = [];

	let source: Row['source'] = 'unpublished';
	let version = '';
	let updated = '';
	let maturity = '';
	let docPath = '';

	if (prose) {
		source = 'prose';
		version = prose.version;
		updated = prose.updated;
		maturity = prose.maturity;
		docPath = `${PROSE_ROOT}/${prose.dir ?? e.ui?.slug ?? '???'}/`;
	} else if (outline) {
		source = 'outline';
		version = outline.version;
		updated = outline.updated;
		maturity = outline.maturity;
		const dir = outline.dir ?? (e.tier !== undefined && e.ui?.slug ? `tier-${e.tier}/${e.ui.slug}` : undefined);
		docPath = dir ? `${OUTLINE_ROOT}/${dir}/versions/${outline.version}.md` : '(dir unresolvable)';
		if (!dir) flags.push('no-dir');
	} else if (legacy) {
		source = 'legacy';
		version = legacy;
		flags.push('legacy-ui.version');
	}

	if (prose && outline) flags.push('prose+outline');
	if (legacy && (outline || prose)) flags.push('legacy-ui.version-shadowed');
	if ((outline || prose) && !e.ui?.path) flags.push('no-ui.path');
	if (e.retired) flags.push('retired');
	if (CAN_CHECK_FILES && docPath.startsWith(OUTLINE_ROOT) && !existsSync(docPath)) flags.push('file-missing');

	return {
		file,
		exportName,
		id: e.id,
		name: e.name,
		type: e.type,
		tier: e.tier ?? '',
		status: e.status ?? '',
		source,
		version,
		updated,
		maturity,
		docPath,
		ageDays: daysSince(updated),
		flags
	};
}

// ---------------------------------------------------------------- collect
const files = readdirSync(SCHEMA_DIR)
	.filter((f) => f.startsWith('cluster.') && f.endsWith('.ts'))
	.sort();

async function collect(): Promise<Row[]> {
	const rows: Row[] = [];
	for (const file of files) {
		const mod = await import(pathToFileURL(join(SCHEMA_DIR, file)).href);
		for (const [exportName, value] of Object.entries(mod)) {
			if (!isEntityArray(value)) continue;
			for (const e of value) rows.push(toRow(e, file, exportName));
		}
	}
	return rows;
}

main();

async function main() {
const rows = await collect();

// ---------------------------------------------------------------- filter
let out = rows;
if (!opts.all) out = out.filter((r) => r.source !== 'unpublished');
if (opts.frameworksOnly) out = out.filter((r) => r.type === 'Framework');
if (opts.staleDays !== undefined) out = out.filter((r) => typeof r.ageDays === 'number' && r.ageDays >= opts.staleDays!);
if (opts.grep) {
	const g = opts.grep;
	out = out.filter((r) => [r.id, r.name, r.file, r.docPath].join(' ').toLowerCase().includes(g));
}
if (opts.sortByDate) out = [...out].sort((a, b) => (a.updated || '9999').localeCompare(b.updated || '9999'));

// ---------------------------------------------------------------- output
const pad = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s.padEnd(n));

if (opts.json) {
	console.log(JSON.stringify(out, null, 2));
} else if (opts.csv) {
	console.log('file,export,id,name,type,tier,status,source,version,updated,maturity,ageDays,docPath,flags');
	for (const r of out) {
		const cells = [r.file, r.exportName, r.id, r.name, r.type, r.tier, r.status, r.source, r.version, r.updated, r.maturity, r.ageDays, r.docPath, r.flags.join('|')];
		console.log(cells.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','));
	}
} else if (opts.paths) {
	for (const r of out) if (r.docPath) console.log(r.docPath);
} else if (opts.md) {
	console.log('| File | Entity | Version | Updated | Maturity | Doc |');
	console.log('| --- | --- | --- | --- | --- | --- |');
	for (const r of out) console.log(`| ${r.file} | ${r.name} (\`${r.id}\`) | ${r.version} | ${r.updated} | ${r.maturity} | \`${r.docPath}\` |`);
} else if (opts.sortByDate) {
	console.log(pad('UPDATED', 12) + pad('AGE', 6) + pad('VERSION', 9) + pad('NAME', 40) + 'FILE');
	console.log('-'.repeat(110));
	for (const r of out) {
		console.log(pad(r.updated || '—', 12) + pad(String(r.ageDays === '' ? '—' : r.ageDays + 'd'), 6) + pad(r.version || '—', 9) + pad(r.name, 40) + r.file.replace(/^cluster\.|\.ts$/g, ''));
		if (r.flags.length) console.log('  ⚠ ' + r.flags.join(', '));
	}
} else {
	let shown = 0;
	for (const file of files) {
		const group = out.filter((r) => r.file === file);
		if (!group.length) continue;
		console.log(`\n${file}`);
		console.log('─'.repeat(100));
		for (const r of group) {
			shown++;
			console.log(
				'  ' + pad(r.version || '—', 9) + pad(r.updated || '—', 12) + pad(r.maturity || r.source, 13) + pad(`T${r.tier}`, 4) + pad(r.status || '—', 10) + r.name
			);
			console.log('    ' + pad(r.id, 44) + (r.docPath || ''));
			if (r.flags.length) console.log('    ⚠ ' + r.flags.join(', '));
		}
	}
	console.log(`\n${shown} entities across ${new Set(out.map((r) => r.file)).size} files (${rows.length} total in schema).`);
	const flagged = out.filter((r) => r.flags.length).length;
	if (flagged) console.log(`${flagged} carrying flags.`);
}
}
