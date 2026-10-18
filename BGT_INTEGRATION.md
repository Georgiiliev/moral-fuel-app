# BGT integration

Moral Fuel shows the full text of every Bible passage its lessons refer to, in the Bijbel in Gewone
Taal (BGT), inside the app and offline.

## Permission

The owner has written permission from the Nederlands-Vlaams Bijbelgenootschap (NVB) to use the
original BGT text in Moral Fuel. This is recorded in `AGENTS.md` ("Moral Fuel — Bible Content
Authorization"); the letter itself is not in the repository.

## Source

- Publisher site: https://www.debijbel.nl
- Chapter pages: `https://www.debijbel.nl/bijbel/BGT/<BOOK>.<CHAPTER>`, with USFM book codes
  (`JAS.1`, `1CO.13`, `PSA.139`, `JUD.1`). `chapterUrl()` in `src/content/bible.ts` builds them.
- Plain scripted requests (curl, Node `fetch`) get HTTP 403 from the site's CloudFront ("Request
  blocked"), for `robots.txt` as well. `npm run bible:import -- --fetch` therefore stops at once.
- On the owner's instruction, the pages were retrieved with a real browser (Playwright): the chapter
  page was opened normally, then each needed chapter was requested from within that page, one at a
  time, 2.5 s apart, 69 pages in all, on 2026-10-18. No login, CAPTCHA or block was involved or
  worked around; no private API was used.
- Pages the owner saves in a browser (Chrome: ⌘S, "Webpage, Complete") work the same way. The
  browser-rendered page was checked to parse to exactly the same text as the server page.

### Page structure

Observed on all 69 pages and documented at the top of `scripts/bible/parse-page.ts`:

| Markup | Meaning | Stored as |
| --- | --- | --- |
| `bible-ms > h2.ms`, `bible-s > h4.s` | Major and section headings | `heading` |
| `bible-p > p.p` | Prose paragraph | `paragraph`, style `prose` |
| bare `ibep-bible-passage` | End of a paragraph begun in the previous chapter (GAL.5:1) | `paragraph`, style `prose` |
| `bible-q > p.q` | Poetry line | `paragraph`, style `poetry` |
| `bible-b > p.b` | Stanza break | `break` |
| `bible-cl > h3.cl` | Psalm label, repeats the chapter title | skipped |
| `sub.v` | Verse marker as printed, `7` or `28-30` | `label` |
| `span.verse.BGT.JAS.1.7[.BGT.JAS.1.8]` | Verse text; one class per verse it holds | `first`, `last`, `text` |
| span without a marker before it | Verse running on from the line above | segment without `label` |
| `.bible-copyright` | "Bijbel in Gewone Taal © Nederlands-Vlaams Bijbelgenootschap" | translation check |

Any other element inside the chapter text fails the page, so a change on the site is reported, not
guessed. Whitespace runs are collapsed to one space; nothing else in the text is changed.

## Import workflow

```bash
npm run bible:import             # saved pages in bible-sources/bgt -> src/content/bible/bgt.json + reports
npm run bible:import -- --fetch  # first tries to fetch missing chapters (stops at robots.txt or any refusal)
npm run bible:validate           # re-checks the bundle against the pages; exit 1 on any problem
npm run bible:coverage           # what the lessons can show; writes BGT_CONTENT_COVERAGE.md
npm run bible:manifest           # rewrites BGT_REFERENCE_MANIFEST.json
```

1. The manifest lists every lesson reference (each lesson's `passage` and `relatedPassages`) and the
   chapters they need, each with the verses needed (`first`..`last`, or the whole chapter).
2. Source pages are read from `bible-sources/bgt/*.html` (owner-saved) and
   `bible-sources/bgt/fetched/*.html` (retrieved). The folder is git-ignored; it stays on the
   owner's Mac. Each file's SHA-256 is recorded with the chapter.
3. Each page is parsed; the chapter is identified from the verse ids, not the file name.
4. Only the needed span of each needed chapter is kept (`blocksInRange`, the same function the app
   uses), so unrelated chapters and verses are not bundled.
5. The result is verified (below), written to `src/content/bible/bgt.json`, and reported in
   `BGT_IMPORT_REPORT.md`, `BGT_VERIFICATION_REPORT.md` and `BGT_CONTENT_COVERAGE.md`.

To add a chapter after new lessons are written: save its page into `bible-sources/bgt/` (or ask an
agent to retrieve it in a browser as above), then run `npm run bible:import`.

## Storage

`src/models/bible.ts`. A chapter keeps its source blocks in order:

```ts
{
  translation: 'BGT', book: 'JAS', chapter: 1, verseCount: 27,
  blocks: [
    { kind: 'heading', text: 'Word niet meteen boos' },
    { kind: 'paragraph', style: 'prose', verses: [{ first: 23, last: 24, label: '23-24', text: '…' }] },
  ],
  source: { url: 'https://www.debijbel.nl/bijbel/BGT/JAS.1', retrievedOn: '2026-10-18', via: 'fetch', sha256: '…', importVersion: 1 },
  status: 'VERIFIED',
}
```

Grouped verses stay one block under their printed marker; they are never split. References remain
single-chapter `BibleReference`s (`book`, `chapter`, optional `verseStart`/`verseEnd`), as in the
lessons.

## Lookup

`src/content/bible.ts`: `getPassage`, `getPassages`, `hasPassage`, `getChapter`, `validatePassage`,
`getTranslationMetadata`, `getMissingReferences`, `appBibleReferences`, `chapterUrl`.

- A range that touches a grouped verse returns the whole group.
- A heading is included when the paragraph after it starts inside the range.
- A reference whose chapter is not imported is `MISSING`; one with a verse gap or verses beyond the
  chapter is `ERROR`. Both return no text, never part of a passage, and the reader then says so and
  links to the chapter on debijbel.nl.

## Offline

The dataset is a JSON file bundled into the JavaScript bundle (243 KB; `expo export` confirms the
text is inside the iOS and Android bundles). Nothing is downloaded when a passage opens.

## UI

- `BiblePassageAccordion` (`src/features/bible/passage-accordion.tsx`): header with book icon,
  BIJBELGEDEELTE, the reference and "Bijbel in Gewone Taal"; one tap opens, the next closes. Open, it
  shows the passage with verse markers, headings, poetry lines and stanza breaks, then the credit
  "Bijbel in Gewone Taal · © Nederlands-Vlaams Bijbelgenootschap 2014". It records nothing and never
  completes a lesson. The body fades in, or simply appears with reduced motion. `aria-expanded`,
  labels and hints are set; text scales with the system font size (scripture text up to 2×).
- The Learn step of every lesson shows the main passage and each related passage ("Lees ook") as
  separate accordions. Explore and completed-lesson review open the same lesson screen.
- Today: "Lees Bijbelgedeelte" on the lesson card opens `bible/[lessonId]`, a modal with the lesson's
  passages in full.
- Jij: "Bijbelvertaling en bronvermelding" names the translation and publisher, with a link to
  debijbel.nl.
- Widgets are unchanged; they show no Bible text.

## Verification

A chapter is `VERIFIED` only when its source page is present and unchanged since import (SHA-256),
re-parses to exactly the stored blocks, and every stored verse and heading appears verbatim, in
order, in the page's plain text (read without the block parser). Anything else is `NEEDS_REVIEW`.
Tests: `scripts/bible/__tests__/parse-page.test.ts` (markup rules and refusals, on placeholder text),
`src/content/__tests__/bible.test.ts` (lookup rules), `src/content/__tests__/bible-dataset.test.ts`
(the bundle: one source per chapter, markers match verses, no verse marked twice, clean text, every
lesson reference verified), `src/features/bible/__tests__/passage-accordion.test.tsx` and
`src/features/lesson/__tests__/learn-step-bible.test.tsx` (every one of the 30 lessons).

## Known limitations

- References cannot span chapters, because no lesson needs that; `BibleReference` would need an end
  chapter first.
- References are structured data in the lessons; there is no parser for free-text Dutch references.
- `bible:validate` can only re-verify on a machine that has `bible-sources/` (the owner's Mac);
  elsewhere it keeps the last status and says so.
- The daily inspirations (widgets) keep their own paraphrases and do not open the reader.
- English has no Bible text; the BGT is Dutch.
