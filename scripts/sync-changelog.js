#!/usr/bin/env node
/**
 * Reads the latest version block from CHANGELOG.md (written by standard-version)
 * and prepends a matching entry to the RELEASES[] array in Changelog.tsx.
 * Also updates src/version.ts to match the new package.json version.
 *
 * Why: Changelog.tsx is the rendered changelog UI — it must stay in sync with
 * the machine-generated CHANGELOG.md without manual edits.
 */
import { readFileSync, writeFileSync } from 'fs';

const SECTION_TYPE = {
  Features: 'feature',
  'Bug Fixes': 'fix',
  Performance: 'improvement',
  Refactoring: 'improvement',
  Improvements: 'improvement',
  Documentation: 'improvement',
  Infrastructure: 'infra',
  Tests: 'infra',
};

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const version = pkg.version;
const today = new Date().toISOString().split('T')[0];

// Update src/version.ts
writeFileSync('src/version.ts', `export const APP_VERSION = '${version}';\n`);
console.log(`✓ src/version.ts → ${version}`);

// Extract the first (newest) version block from CHANGELOG.md
const changelog = readFileSync('CHANGELOG.md', 'utf8');
const parts = changelog.split('\n## [');
// parts[0] = file header (# Changelog …)
// parts[1] = "X.Y.Z] (date)\n### …"
// parts[n] = older blocks
if (parts.length < 2) {
  console.log('No version blocks found in CHANGELOG.md — skipping Changelog.tsx update.');
  process.exit(0);
}

const latestRaw = '[' + parts[1];

// Parse version: ## [X.Y.Z] (YYYY-MM-DD) or ## [X.Y.Z](url) (YYYY-MM-DD)
const versionMatch = latestRaw.match(/\[([^\]]+)\]/);
if (!versionMatch) {
  console.log('Could not parse version from latest CHANGELOG.md block — skipping.');
  process.exit(0);
}
const parsedVersion = versionMatch[1];

// Guard: don't insert if already present in Changelog.tsx
const changelogTsx = readFileSync('src/pages/Changelog/Changelog.tsx', 'utf8');
if (changelogTsx.includes(`version: '${parsedVersion}'`)) {
  console.log(`v${parsedVersion} already in RELEASES[] — skipping.`);
  process.exit(0);
}

// Parse ### Section → bullet points
const changes = [];
const sectionRegex = /^### (.+)$/gm;
const bulletRegex = /^\* (.+)$/gm;
let sectionMatch;

// Split block by sections
const sectionSplit = latestRaw.split(/^### /m).slice(1);
for (const chunk of sectionSplit) {
  const nameEnd = chunk.indexOf('\n');
  const sectionName = chunk.slice(0, nameEnd).trim();
  const type = SECTION_TYPE[sectionName] ?? 'improvement';
  const body = chunk.slice(nameEnd);
  let m;
  bulletRegex.lastIndex = 0;
  while ((m = bulletRegex.exec(body)) !== null) {
    const text = m[1]
      // strip **scope:** markdown bold
      .replace(/\*\*([^*]+):\*\* ?/g, '$1: ')
      // strip trailing ([hash](url)) commit links
      .replace(/\s*\(\[[a-f0-9]+\]\([^)]+\)\)$/i, '')
      .trim();
    if (text) changes.push({ type, text });
  }
}

void sectionMatch; // suppress unused warning

if (changes.length === 0) {
  console.log('No bullet points found in latest CHANGELOG.md block — skipping Changelog.tsx update.');
  process.exit(0);
}

// Build a terse summary from the first two changes
const summary = changes.length === 1
  ? changes[0].text
  : changes.slice(0, 2).map(c => c.text).join('. ') + (changes.length > 2 ? ` (+${changes.length - 2} more)` : '.');

const changesStr = changes
  .map(c => `      { type: '${c.type}', text: ${JSON.stringify(c.text)} },`)
  .join('\n');

const newEntry = `  {
    version: '${parsedVersion}',
    date: '${today}',
    summary: ${JSON.stringify(summary)},
    changes: [
${changesStr}
    ],
  },`;

const MARKER = 'const RELEASES: Release[] = [';
if (!changelogTsx.includes(MARKER)) {
  console.error('Could not find RELEASES array marker in Changelog.tsx — aborting.');
  process.exit(1);
}

const updated = changelogTsx.replace(MARKER, `${MARKER}\n${newEntry}`);
writeFileSync('src/pages/Changelog/Changelog.tsx', updated);
console.log(`✓ Prepended v${parsedVersion} to RELEASES[] in Changelog.tsx`);
