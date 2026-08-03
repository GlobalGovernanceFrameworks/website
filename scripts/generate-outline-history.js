// scripts/generate-outline-history.js
//
// Generates lightweight version/review metadata for the framework outline UI.
// The archived Markdown files are inspected only as filesystem entries; their
// contents are never read or passed through mdsvex.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const outlineRoot = path.join(
  projectRoot,
  'src',
  'lib',
  'content',
  'framework-outlines'
);
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

async function buildManifest() {
  const manifest = {};

  for (const language of await directoriesAt(outlineRoot)) {
    const languagePath = path.join(outlineRoot, language);

    for (const tier of await directoriesAt(languagePath)) {
      if (!tier.startsWith('tier-')) continue;

      const tierPath = path.join(languagePath, tier);

      for (const framework of await directoriesAt(tierPath)) {
        const frameworkPath = path.join(tierPath, framework);
        const versionFiles = await markdownFilesAt(
          path.join(frameworkPath, 'versions')
        );
        const reviewPaths = await walkMarkdown(
          path.join(frameworkPath, 'reviews')
        );

        const versions = versionFiles
          .map((file) => file.replace(/\.md$/, ''))
          .sort(compareVersions);

        if (!versions.length && !reviewPaths.length) continue;

        manifest[`${language}/${tier}/${framework}`] = {
          versions,
          lineage: buildLineage(reviewPaths)
        };
      }
    }
  }

  return manifest;
}

const manifest = await buildManifest();
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
    `Generated ${path.relative(projectRoot, outputPath)} (${Object.keys(manifest).length} outlines).`
  );
} else {
  console.log('Outline history manifest is already up to date.');
}
