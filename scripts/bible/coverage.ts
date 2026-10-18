/**
 * npm run bible:coverage
 *
 * How many of the lessons' references the bundled BGT text can show, written to
 * BGT_CONTENT_COVERAGE.md and printed.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { formatReference } from '@/content';
import { appBibleReferences, getPassage } from '@/content/bible';
import type { BibleTextStatus } from '@/models/bible';

import { buildManifest, PROJECT_ROOT } from './manifest';

const REPORT_PATH = join(PROJECT_ROOT, 'BGT_CONTENT_COVERAGE.md');

function main() {
  const references = appBibleReferences().map((ref) => ({ ...ref, label: formatReference(ref.reference, 'nl'), status: getPassage(ref.reference).status }));
  const manifest = buildManifest();
  const count = (status: BibleTextStatus) => references.filter((ref) => ref.status === status).length;
  const unavailable = references.filter((ref) => ref.status === 'MISSING' || ref.status === 'ERROR');
  const affectedDays = [...new Set(unavailable.map((ref) => ref.day))].sort((a, b) => a - b);
  const summary = [
    `References in lessons: ${references.length} (${manifest.uniqueReferences} unique)`,
    `Source chapters: ${manifest.chapters.length}`,
    `Shown with text: ${references.length - unavailable.length} (VERIFIED ${count('VERIFIED')}, IMPORTED ${count('IMPORTED')}, NEEDS_REVIEW ${count('NEEDS_REVIEW')})`,
    `Missing: ${count('MISSING')}, error: ${count('ERROR')}`,
    `Lessons with a missing passage: ${affectedDays.length}${affectedDays.length > 0 ? ` (days ${affectedDays.join(', ')})` : ''}`,
  ];
  const lines = [
    '# BGT content coverage',
    '',
    `Generated on ${new Date().toISOString().slice(0, 10)} by \`npm run bible:coverage\`.`,
    '',
    ...summary.map((line) => `- ${line}`),
    '',
    '| Day | Role | Reference | Status |',
    '| --- | --- | --- | --- |',
    ...references.map((ref) => `| ${ref.day} | ${ref.role} | ${ref.label} | ${ref.status} |`),
    '',
  ];
  writeFileSync(REPORT_PATH, lines.join('\n'));
  console.log(summary.join('\n'));
}

main();
