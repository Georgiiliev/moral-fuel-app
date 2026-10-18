import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { PROJECT_ROOT } from './manifest';
import { parseChapterPage, type ParsedChapterPage } from './parse-page';

/** Chapter pages the owner saved from debijbel.nl; fetched pages land in its fetched/ folder. */
export const SOURCES_DIR = join(PROJECT_ROOT, 'bible-sources', 'bgt');
export const FETCHED_DIR = join(SOURCES_DIR, 'fetched');
export const DATASET_PATH = join(PROJECT_ROOT, 'src', 'content', 'bible', 'bgt.json');
export const IMPORT_VERSION = 1;

export interface SourcePage {
  file: string;
  html: string;
  sha256: string;
  savedOn: string;
  via: 'fetch' | 'saved-page';
  page: ParsedChapterPage;
}

export const chapterKey = (chapter: { book: string; chapter: number }) => `${chapter.book}.${chapter.chapter}`;

const sha256 = (text: string) => createHash('sha256').update(text).digest('hex');

function htmlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return path === FETCHED_DIR ? htmlFiles(path) : [];
    return /\.html?$/i.test(entry.name) ? [path] : [];
  });
}

/** Every readable chapter page, by chapter; the most recently saved file wins a duplicate. */
export function readSourcePages(): { pages: Map<string, SourcePage>; problems: string[] } {
  const pages = new Map<string, SourcePage>();
  const problems: string[] = [];
  for (const file of htmlFiles(SOURCES_DIR)) {
    const html = readFileSync(file, 'utf8');
    const name = file.slice(SOURCES_DIR.length + 1);
    let page: ParsedChapterPage;
    try {
      page = parseChapterPage(html);
    } catch (error) {
      problems.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    const source: SourcePage = {
      file: name,
      html,
      sha256: sha256(html),
      savedOn: statSync(file).mtime.toISOString().slice(0, 10),
      via: file.startsWith(FETCHED_DIR) ? 'fetch' : 'saved-page',
      page,
    };
    const known = pages.get(chapterKey(page));
    if (known) problems.push(`${chapterKey(page)}: ${name} and ${known.file} hold the same chapter; the newest is used`);
    if (!known || known.savedOn <= source.savedOn) pages.set(chapterKey(page), source);
  }
  return { pages, problems };
}
