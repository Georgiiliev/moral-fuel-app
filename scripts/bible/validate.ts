/**
 * npm run bible:validate
 *
 * Checks the bundled BGT text against the saved source pages and checks every lesson reference.
 * A chapter becomes VERIFIED only when its source page is present, unchanged since import, parses
 * to exactly the stored blocks, and every stored verse and heading appears verbatim in the page's
 * plain text. Exits with 1 when anything is missing or wrong.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

import { formatReference } from '@/content';
import { appBibleReferences, BGT, blocksInRange, chapterUrl, validatePassage } from '@/content/bible';
import type { BibleChapterText, BibleDataset, BibleTextBlock, BibleTextStatus } from '@/models/bible';

import { buildManifest, PROJECT_ROOT } from './manifest';
import { pagePlainText } from './parse-page';
import { chapterKey, DATASET_PATH, readSourcePages, type SourcePage } from './sources';

const REPORT_PATH = join(PROJECT_ROOT, 'BGT_VERIFICATION_REPORT.md');

export interface Verification {
  chapters: BibleChapterText[];
  rows: { key: string; status: BibleTextStatus; detail: string }[];
  problems: string[];
}

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();

function blockTexts(blocks: readonly BibleTextBlock[]): string[] {
  return blocks.flatMap((block) => {
    if (block.kind === 'heading') return [block.text];
    return block.kind === 'paragraph' ? block.verses.map((verse) => verse.text) : [];
  });
}

/** Stored texts that do not appear, in order, in the page's plain text. */
function textsNotInPage(blocks: readonly BibleTextBlock[], pageText: string): string[] {
  const page = normalize(pageText);
  let from = 0;
  const missing: string[] = [];
  for (const text of blockTexts(blocks).map(normalize)) {
    const at = page.indexOf(text, from);
    if (at < 0) missing.push(text);
    else from = at + text.length;
  }
  return missing;
}

function storedSpan(blocks: readonly BibleTextBlock[]) {
  const verses = blocks.flatMap((block) => (block.kind === 'paragraph' ? block.verses : []));
  return { first: verses[0]?.first ?? 1, last: verses[verses.length - 1]?.last ?? 0, count: verses.length };
}

/** Re-reads each chapter's source page and sets its status from what it finds. */
export function verifyDataset(dataset: BibleDataset, pages: Map<string, SourcePage>): Verification {
  const rows: Verification['rows'] = [];
  const problems: string[] = [];
  const chapters = dataset.chapters.map((chapter): BibleChapterText => {
    const key = chapterKey(chapter);
    const mark = (status: BibleChapterText['status'], detail: string, problem: boolean) => {
      rows.push({ key, status, detail });
      if (problem) problems.push(`${key}: ${detail}`);
      return { ...chapter, status };
    };
    if (chapter.translation !== 'BGT') return mark('NEEDS_REVIEW', 'translation is not BGT', true);
    if (chapter.source.url !== chapterUrl(chapter.book, chapter.chapter)) {
      return mark('NEEDS_REVIEW', `source URL ${chapter.source.url} is not the chapter's page`, true);
    }
    const source = pages.get(key);
    if (!source) return mark(chapter.status, 'source page not on this machine; status kept from the last run', false);
    if (source.sha256 !== chapter.source.sha256) {
      return mark('NEEDS_REVIEW', `${source.file} changed since import; run npm run bible:import`, true);
    }
    const span = storedSpan(chapter.blocks);
    if (!isDeepStrictEqual(blocksInRange(source.page.blocks, span.first, span.last), chapter.blocks)) {
      return mark('NEEDS_REVIEW', `stored text differs from ${source.file}`, true);
    }
    const notInPage = textsNotInPage(chapter.blocks, pagePlainText(source.html));
    if (notInPage.length > 0) {
      return mark('NEEDS_REVIEW', `not found verbatim in ${source.file}: "${notInPage[0].slice(0, 60)}"`, true);
    }
    if (chapter.notes?.length) return mark('NEEDS_REVIEW', chapter.notes.join('; '), true);
    return mark('VERIFIED', `${span.count} verse markers (${span.first}-${span.last}) match ${source.file}`, false);
  });
  return { chapters, rows, problems };
}

export function writeVerificationReport(verification: Verification) {
  const manifest = buildManifest();
  const imported = new Set(verification.chapters.map(chapterKey));
  const missing = manifest.chapters.filter((chapter) => !imported.has(chapterKey(chapter)));
  const count = (status: BibleTextStatus) => verification.rows.filter((row) => row.status === status).length;
  const lines = [
    '# BGT verification report',
    '',
    `Generated on ${new Date().toISOString().slice(0, 10)} by \`npm run bible:import\` or \`npm run bible:validate\`.`,
    '',
    `Translation: ${BGT.name} (${BGT.id}), ${BGT.copyright}. Source: ${BGT.website}.`,
    '',
    'VERIFIED means: the saved source page is present and unchanged since import, it parses to exactly the',
    'stored text, and every stored verse and heading appears verbatim, in order, in the page text.',
    '',
    '| Status | Chapters |',
    '| --- | --- |',
    `| VERIFIED | ${count('VERIFIED')} |`,
    `| IMPORTED | ${count('IMPORTED')} |`,
    `| NEEDS_REVIEW | ${count('NEEDS_REVIEW')} |`,
    `| ERROR | ${count('ERROR')} |`,
    `| MISSING | ${missing.length} |`,
    '',
    '## Chapters',
    '',
    ...(verification.rows.length > 0 ? ['| Chapter | Status | Detail |', '| --- | --- | --- |'] : ['No chapters imported yet.']),
    ...verification.rows.map((row) => `| ${row.key} | ${row.status} | ${row.detail} |`),
    '',
    '## Missing chapters',
    '',
    ...(missing.length > 0 ? missing.map((chapter) => `- ${chapterKey(chapter)}: ${chapter.url}`) : ['None.']),
    '',
  ];
  writeFileSync(REPORT_PATH, lines.join('\n'));
}

if (require.main === module) {
  const dataset = JSON.parse(readFileSync(DATASET_PATH, 'utf8')) as BibleDataset;
  const { pages, problems: sourceProblems } = readSourcePages();
  const verification = verifyDataset(dataset, pages);
  writeFileSync(DATASET_PATH, `${JSON.stringify({ ...dataset, chapters: verification.chapters }, null, 2)}\n`);
  writeVerificationReport(verification);

  const referenceProblems = appBibleReferences().flatMap(({ day, reference }) =>
    validatePassage(reference).map((problem) => `Day ${day}, ${formatReference(reference, 'nl')}: ${problem}`),
  );
  const problems = [...sourceProblems, ...verification.problems, ...referenceProblems];
  for (const problem of problems) console.error(`- ${problem}`);
  console.log(`${problems.length} problems; ${verification.rows.filter((row) => row.status === 'VERIFIED').length} chapters verified (BGT_VERIFICATION_REPORT.md).`);
  if (problems.length > 0) process.exit(1);
}
