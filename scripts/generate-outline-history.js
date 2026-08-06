// scripts/generate-outline-history.js
//
// Generates lightweight version/review metadata for the framework outline UI.
// The archived Markdown files are inspected only as filesystem entries; their
// contents are never read or passed through mdsvex.
//
// Two content roots, one manifest:
//   framework-outlines/<lang>/tier-N/<slug>/  →  key "<lang>/tier-N/<slug>"
//   specifications/<lang>/<slug>/             →  key "<lang>/<slug>"
//
// The keys cannot collide: a framework key always carries a "tier-" segment.
// Both match the dir strings outlineRegistry.js builds from the schema.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const contentRoot = path.join(projectRoot, 'src', 'lib', 'content');

const outlineRoot = path.join(contentRoot, 'framework-outlines');
const specRoot = path.join(contentRoot, 'specifications');

const outputPath = path.join(
  projectRoot,
  'src',
  'lib',
  'data',
  'outlineHistory.generated.json'
);

const REVIEWERS = ['claude', 'gemini', 'grok', 'deepseek', 'chatgpt'];

function versionKey(version) {
  return version
    .replace(/^v/, '')
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);
}

function compareVersions(a, b) {
  const x = versionKey(a);
  const y = versionKey(b);

  for (let i = 0; i < Math.max(x.length, y.length); i += 1) {
    const difference = (x[i] ?? 0) - (y[i] ?? 0);
    if (difference !== 0) return difference;
  }

  return a.localeCompare(b);
}

async function directoriesAt(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function markdownFilesAt(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function walkMarkdown(directory, relativeDirectory = '') {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const results = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await walkMarkdown(absolutePath, relativePath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(relativePath);
    }
  }

  return results;
}

function buildLineage(reviewPaths) {
  const rounds = new Set();
  const reviewers = new Set();

  // This deliberately mirrors the old registry semantics:
  // the first directory under reviews/ is the round, and the next path segment
  // is inspected for reviewer names.
  for (const reviewPath of reviewPaths) {
    const [round, file = ''] = reviewPath.split('/');

    if (round) rounds.add(round);

    const lowerName = file.toLowerCase();
    for (const reviewer of REVIEWERS) {
      if (lowerName.includes(reviewer)) reviewers.add(reviewer);
    }
  }

  return {
    documentCount: reviewPaths.length,
    rounds: [...rounds].sort(compareVersions),
    reviewers: [...reviewers]
  };
}

/**
 * Reads one document folder — the leaf that holds versions/ and reviews/.
 * Returns null when the folder holds neither, so empty scaffolding never
 * enters the manifest.
 */
async function readDocumentFolder(documentPath) {
  const versionFiles = await markdownFilesAt(path.join(documentPath, 'versions'));
  const reviewPaths = await walkMarkdown(path.join(documentPath, 'reviews'));

  const versions = versionFiles
    .map((file) => file.replace(/\.md$/, ''))
    .sort(compareVersions);

  if (!versions.length && !reviewPaths.length) return null;

  return { versions, lineage: buildLineage(reviewPaths) };
}

/** framework-outlines: <lang>/tier-N/<slug> */
async function collectOutlines(manifest) {
  let count = 0;

  for (const language of await directoriesAt(outlineRoot)) {
    const languagePath = path.join(outlineRoot, language);

    for (const tier of await directoriesAt(languagePath)) {
      if (!tier.startsWith('tier-')) continue;

      const tierPath = path.join(languagePath, tier);

      for (const framework of await directoriesAt(tierPath)) {
        const record = await readDocumentFolder(path.join(tierPath, framework));
        if (!record) continue;

        manifest[`${language}/${tier}/${framework}`] = record;
        count += 1;
      }
    }
  }

  return count;
}

/** specifications: <lang>/<slug> */
async function collectSpecifications(manifest) {
  let count = 0;

  for (const language of await directoriesAt(specRoot)) {
    const languagePath = path.join(specRoot, language);

    for (const specification of await directoriesAt(languagePath)) {
      const record = await readDocumentFolder(path.join(languagePath, specification));
      if (!record) continue;

      manifest[`${language}/${specification}`] = record;
      count += 1;
    }
  }

  return count;
}

async function buildManifest() {
  const manifest = {};
  const outlines = await collectOutlines(manifest);
  const specifications = await collectSpecifications(manifest);

  return { manifest, outlines, specifications };
}

const { manifest, outlines, specifications } = await buildManifest();
const nextContents = `${JSON.stringify(manifest, null, 2)}\n`;

let previousContents = '';
try {
  previousContents = await fs.readFile(outputPath, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (nextContents !== previousContents) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, nextContents, 'utf8');
  console.log(
    `Generated ${path.relative(projectRoot, outputPath)} ` +
      `(${outlines} outlines, ${specifications} specifications).`
  );
} else {
  console.log('Outline history manifest is already up to date.');
}
