# Phase 3 recommendations

What Phase 2 leaves for the next phase, in a sensible order. Each item says why it matters.

## Before a public beta

1. **Theological and pastoral review of all 30 lessons.** Use `CONTENT_REVIEW_CHECKLIST.md`. Until a
   qualified reviewer approves them, the app keeps its beta notice. This is the main gate.
2. **Accounts.** The identifiers are set (`com.moralfuel.app`). Create the Expo, Apple Developer and
   Google Play accounts, and run the
   first `eas build --profile development` for both platforms (see `MOBILE_TESTING_GUIDE.md`).
3. **Brand assets.** The app icon, adaptive icon and splash image are still the Expo template's.
   Commission a Moral Fuel icon and splash mark; `app.json` already points at the right slots.
4. **Device testing.** Run the manual test paths on at least one recent iPhone, one small iPhone (SE
   size), one Android phone and one Android tablet, with VoiceOver/TalkBack and the largest text size.
   Android has not run on an emulator or device yet.
5. **Privacy statement and store listings.** The app collects nothing, but the stores need a privacy
   policy URL and data-safety answers ("no data collected"); the journal's encryption is worth naming.

## Product

- **English.** The types and `localize()` are ready: add `en` to `src/i18n/strings.ts` and `en` text to
  each lesson; add a language switch in *Jij* once English content exists.
- **Shorter reading paths.** Phase 2 keeps one complete version per lesson. If the 2-minute
  preference proves popular, write deliberate short versions per lesson rather than cutting text
  automatically.
- **A second journey.** After day 30 the app offers review only. Plan a follow-up path (for example a
  gospel read-through) on the same content model.
- **Journal export formats.** Export is plain text through the share sheet; a PDF or Markdown export
  could follow if testers ask.
- **Reading the passage in-app.** Licensing a modern Dutch translation (or using a public-domain one
  such as the Statenvertaling with care) would let readers open the passage without leaving the app.

## Engineering

- **CMS.** Replace the static imports in `src/content/index.ts` with a loader that returns the same
  `Lesson` and `Journey` types and runs `validateContent` on what it receives; keep a bundled copy for
  offline use.
- **End-to-end tests.** Phase 2 drove the iOS simulator with idb by hand. Maestro or Detox flows for
  onboarding, a lesson, the journal and erase-all would make this repeatable in CI.
- **Journal at scale.** The journal is one encrypted file rewritten on each save, which is fine for
  hundreds of entries. Beyond a few thousand, move to per-month files or an encrypted SQLite database
  (expo-sqlite with SQLCipher, which needs a development build).
- **Over-the-air updates.** Add `expo-updates` and EAS Update channels so content fixes ship without a
  store release; content changes must still pass review first.
- **Crash reporting.** If added, choose a provider that can be configured to never capture journal text
  or reflection input, and document it in the privacy statement.
