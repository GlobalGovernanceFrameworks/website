#!/usr/bin/env node

// scripts/fix-outline-angles.js
//
// mdsvex hands markdown to the Svelte compiler, so a bare `<` before a digit
// or space — <5%, <48 hours — is read as the start of a tag and fails with
// "Expected a valid element or component name".
//
// The fix is a code span. HTML entities do NOT work: remark decodes &lt; back
// to a literal < before the Svelte compiler sees it, so the escape is undone
// in transit. Code spans are escaped on output and are the reliable fix.
//
//   npm run outline:fix-angles              show what would change
//   npm run outline:fix-angles -- --write   apply
//   npm run outline:fix-angles -- --write --only tier-1/gaian-trade
//
// Also undoes any &lt; left behind by the previous version of this script.
// Skips fenced code blocks and existing inline code spans.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTLINES = path.join(__dirname, '../src/lib/content/framework-outlines/en');

const WRITE = process.argv.includes('--write');
const ONLY = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null;

/**
 * A `<` that cannot begin a tag, plus whatever it is attached to.
 *   <2%    -> gap "",  token "2%"
 *   < 0.1  -> gap " ", token "0.1"
 */
const BARE_ANGLE = /<(?![a-zA-Z/!])(\s*)(\S*)/g;

function collectVersionFiles(root) {
  const files = [];
  for (const tier of fs.readdirSync(root)) {
    const tierPath = path.join(root, tier);
    if (!fs.statSync(tierPath).isDirectory()) continue;

    for (const folder of fs.readdirSync(tierPath)) {
      const versionsDir = path.join(tierPath, folder, 'versions');
      if (!fs.existsSync(versionsDir)) continue;

      const dir = `${tier}/${folder}`;
      if (ONLY && dir !== ONLY) continue;

      for (const file of fs.readdirSync(versionsDir)) {
        if (file.endsWith('.md')) {
          files.push({
            dir,
            version: file.replace(/\.md$/, ''),
            path: path.join(versionsDir, file)
          });
        }
      }
    }
  }
  return files;
}

function fixLine(line) {
  // Undo the entity escape from the earlier version of this script.
  const work = line.replace(/&lt;/g, '<');

  // Protect existing inline code, where `<` is already safe.
  const spans = [];
  const masked = work.replace(/`[^`]*`/g, (m) => {
    spans.push(m);
    return `\u0000${spans.length - 1}\u0000`;
  });

  const unmask = (s) => s.replace(/\u0000(\d+)\u0000/g, (_, n) => spans[Number(n)]);

  BARE_ANGLE.lastIndex = 0;
  const hasBare = BARE_ANGLE.test(masked);
  BARE_ANGLE.lastIndex = 0;

  if (!hasBare) {
    const restored = unmask(masked);
    return restored === line ? null : restored;
  }

  const fixed = masked.replace(BARE_ANGLE, (_m, gap, token) => {
    if (!gap && token) return `\`<${token}\``;
    return `\`<\`${gap}${token}`;
  });

  const restored = unmask(fixed);
  return restored === line ? null : restored;
}

function fixSource(source) {
  const lines = source.split('\n');
  const changes = [];
  let inFence = false;

  const out = lines.map((line, i) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;

    const fixed = fixLine(line);
    if (fixed === null) return line;

    changes.push({
      line: i + 1,
      before: line.trim().slice(0, 100),
      after: fixed.trim().slice(0, 100)
    });
    return fixed;
  });

  return { text: out.join('\n'), changes };
}

/* ------------------------------------------------------------------ */

const files = collectVersionFiles(OUTLINES);
let filesChanged = 0;
let totalChanges = 0;

console.log('');
console.log(WRITE ? 'Wrapping bare angle brackets in code spans' : 'Bare angle brackets (dry run)');
console.log('');

for (const file of files) {
  const source = fs.readFileSync(file.path, 'utf8');
  const { text, changes } = fixSource(source);

  if (!changes.length) continue;

  filesChanged += 1;
  totalChanges += changes.length;

  console.log(`${file.dir}/versions/${file.version}.md — ${changes.length}`);
  changes.slice(0, 3).forEach((c) => {
    console.log(`   ${c.line}:  ${c.before}`);
    console.log(`       →  ${c.after}`);
  });
  if (changes.length > 3) console.log(`   … and ${changes.length - 3} more`);
  console.log('');

  if (WRITE) fs.writeFileSync(file.path, text, 'utf8');
}

console.log('─'.repeat(60));
console.log(`   ${totalChanges} replacements across ${filesChanged} files`);
if (!WRITE && totalChanges) {
  console.log('');
  console.log('   Re-run with --write to apply.');
}
console.log('');
