/**
 * export-outlines.ts — copies published outlines into a flat folder with
 * collision-free names, ready to upload to Claude project knowledge.
 *
 *   npx tsx scripts/export-outlines.ts                 # only the ones not yet uploaded
 *   npx tsx scripts/export-outlines.ts --all           # all 71
 *   npx tsx scripts/export-outlines.ts --out /tmp/x    # choose the folder
 *   npx tsx scripts/export-outlines.ts --check-current # audit current.md symlinks
 *   npx tsx scripts/export-outlines.ts --fix-current   # ...and relink them
 *
 * Resolution comes from `ui.outline.version` in the schema, never from
 * current.md — the symlinks are known to lag.
 *
 * Output filenames are `<slug>-<version>.md`, which is unique per framework.
 * The repo's own `versions/vX.Y.md` naming is fine on disk but collides in a
 * flat namespace: 71 frameworks share only 43 distinct version strings.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readlinkSync, lstatSync, symlinkSync, unlinkSync } from 'node:fs';
import { join, relative } from 'node:path';
import { allEntities } from '../src/lib/data/schema/_index';
import type { GgfEntity } from '../src/lib/data/schema/_types';

const OUTLINE_ROOT = 'src/lib/content/framework-outlines/en';

/** Already in project knowledge — the 39 that survived the filename collisions. */
const ALREADY_UPLOADED = new Set([
	'framework_aethelred_accord', 'framework_animal_welfare', 'framework_aubi',
	'framework_cairn_protocol', 'framework_climate_energy', 'framework_conduit_protocol',
	'framework_drr', 'framework_eco_intel', 'framework_education', 'framework_financial_systems',
	'framework_food', 'framework_fractal_intelligence', 'framework_gender', 'framework_global_health',
	'framework_gscl', 'framework_implementation_adaptation', 'framework_implementation_methods_tools',
	'framework_institutional_regeneration', 'framework_kintsugi_protocol', 'framework_mental_health',
	'framework_meta_gov', 'framework_mobility_commons', 'framework_mos', 'framework_nested_sovereignty',
	'framework_oceans_marine', 'framework_peace', 'framework_polycentric_governance',
	'framework_religious_dialogue', 'framework_rural_development', 'framework_shield',
	'framework_soil_health', 'framework_synoptic', 'framework_technology_governance',
	'framework_treaty', 'framework_urban_community', 'framework_water_sanitation',
	'framework_wdmip', 'framework_work_liberation', 'protocol_genesis'
]);

const args = process.argv.slice(2);
const all = args.includes('--all');
const checkCurrent = args.includes('--check-current') || args.includes('--fix-current');
const fixCurrent = args.includes('--fix-current');
const outDir = args[args.indexOf('--out') + 1]?.startsWith('/') ? args[args.indexOf('--out') + 1] : '/tmp/ggf-outlines';

const dirOf = (e: GgfEntity) =>
	e.ui?.outline?.dir ?? (e.tier != null && e.ui?.slug ? `tier-${e.tier}/${e.ui.slug}` : null);

const published = allEntities.filter((e) => e.ui?.outline);

// --- current.md audit -----------------------------------------------------
if (checkCurrent) {
	let wrong = 0;
	for (const e of published) {
		const dir = dirOf(e);
		if (!dir) continue;
		const link = join(OUTLINE_ROOT, dir, 'current.md');
		const want = `versions/${e.ui!.outline!.version}.md`;
		const target = join(OUTLINE_ROOT, dir, want);

		let have: string | null = null;
		try {
			have = lstatSync(link).isSymbolicLink() ? readlinkSync(link) : '(not a symlink)';
		} catch {
			have = null;
		}
		if (have === want) continue;

		wrong++;
		console.log(`  ${e.id.padEnd(40)} ${dir}\n      current.md → ${have ?? '(missing)'}   should be ${want}`);
		if (fixCurrent && existsSync(target)) {
			try { unlinkSync(link); } catch {}
			symlinkSync(want, link);
			console.log('      relinked');
		} else if (fixCurrent) {
			console.log('      NOT fixed — target file does not exist');
		}
	}
	console.log(`\n${wrong} current.md links disagree with the schema${fixCurrent ? ' (fixed where the target exists)' : ''}.`);
	process.exit(0);
}

// --- export ---------------------------------------------------------------
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let copied = 0;
const missingFiles: string[] = [];

for (const e of published) {
	if (!all && ALREADY_UPLOADED.has(e.id)) continue;

	const dir = dirOf(e);
	const version = e.ui!.outline!.version;
	if (!dir) { missingFiles.push(`${e.id} — no dir and no slug/tier to derive one`); continue; }

	const src = join(OUTLINE_ROOT, dir, 'versions', `${version}.md`);
	if (!existsSync(src)) { missingFiles.push(`${e.id} — ${src}`); continue; }

	const name = `${e.ui!.slug ?? e.id}-${version}.md`;
	writeFileSync(join(outDir, name), readFileSync(src));
	console.log(`  ${name.padEnd(48)} ← ${dir}/versions/${version}.md`);
	copied++;
}

console.log(`\n${copied} outlines copied to ${outDir}`);
if (missingFiles.length) {
	console.log(`\n${missingFiles.length} could not be resolved:`);
	for (const m of missingFiles) console.log(`  ${m}`);
}
