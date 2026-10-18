# Moral Fuel — Phase 2 implementation

What Phase 2 changed, why, and how it was verified. The starting point is recorded in
`PHASE2_AUDIT.md`; testing instructions are in `MOBILE_TESTING_GUIDE.md`.

## Summary

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Lessons | 7 written, 23 planned | **30 written** editorial drafts, each with context, tradition and care notes where needed |
| Private writing | One SecureStore reflection per lesson | **Encrypted journal**: free entries and lesson reflections, search, edit, delete, export |
| Reminders | Three fixed times | Three suggestions **or any time**, calm copy, tested scheduling |
| Journey | One list | **Four chapters** with their own progress, recommended next lesson |
| Lesson | Learn / Reflect / Live | Adds the passage **context**, labels interpretation, links to the journal |
| Data | Version mismatch reset everything | **Migration chain**; Phase 1 reflections moved into the journal once |
| Native | Never run | Run in the **iOS 26.5 simulator**; two native layout bugs found and fixed |
| Builds | Expo Go only | `expo-dev-client`, `eas.json` profiles, prebuild verified for iOS and Android |
| Tests | 67 | **211** |

## Content (Stage 2)

- `LearnStep` gained a required `context` field (setting of the passage). Days 1–7 received context
  paragraphs; the other content was kept.
- Days 8–30 were written by three helper agents in parallel (week 2, week 3, week 4 plus days 29–30)
  against a strict brief: Dutch, original summaries, no quotations, exact single-chapter references,
  grace before effort, neutral tradition notes, and care notes limited to known Dutch help lines. The
  editor checked every reference and every flagged historical claim before merging.
- All 66 Bible books are known (`BIBLE_BOOKS`, USFM codes; Dutch and English names); a reference may
  cover a whole chapter (used for Psalms, whose verse numbering differs between Dutch and English).
- Reading time is computed from the text (`src/content/reading-time.ts`, 180 words a minute) and the
  validator rejects a stored value that does not match.
- Validation tests run per lesson: id names its day, context and explanation present, the question
  ends with a question mark, no exclamation marks, only known help-line numbers, unique titles, no
  quotation marks in passage summaries, every lesson `EDITORIAL_DRAFT`.

## Journal (Stage 4)

- **Storage** (`src/storage/journal-store.ts`): the whole journal is serialised, encrypted with
  XChaCha20-Poly1305 (`@noble/ciphers`, audited, pure JavaScript so it runs in Expo Go) and written to
  `journal.v1.json` in the app's document folder. The 256-bit key is random (`expo-crypto`) and lives in
  `expo-secure-store` (Keychain / Keystore). A missing key or a damaged file gives an honest
  *unreadable* state with a way to start over; the app never guesses.
- **Why not SecureStore for entries:** it suits small secrets, not a growing document; one encrypted
  file keeps search and browsing fast. **Why not SQLCipher:** it needs a development build; the chosen
  design also works in Expo Go.
- **Web:** no secure key storage, so the journal stays in memory and the screen says so.
- **Provider** (`src/state/journal.tsx`): the only writer. Saves are debounced, queued in order, and
  flushed when the app goes to the background. *Alle gegevens wissen* removes the file and the key.
- **Lesson reflections** are journal entries with a `lessonId` (one per lesson; clearing removes it).
  Phase 1 reflections are imported once from SecureStore and the old keys deleted.
- **Screens:** *Dagboek* tab (search by text and lesson title, entries grouped by day, export) and an
  editor sheet (create on first keystroke, edit, delete with confirmation, link back to the lesson).
- **Export** is user-initiated plain text through the system share sheet (a download on the web), with
  a warning that shared text is no longer encrypted.
- Journal text is never logged and there is no analytics.

## Reminders (Stage 5)

- `ReminderTimeChooser` serves onboarding and *Jij*: off, 08:00, 12:30, 20:00 or a custom time with
  accessible hour and minute steppers (five-minute steps).
- Permission is requested only after the user picks a time. `syncReminder` is the single scheduling
  path: it cancels and reschedules on every change and on app start, so there are never duplicates;
  without permission it schedules nothing and the preference falls back to off.
- Copy: *Neem even een moment om stil te staan bij wat er vandaag toe doet.*
- Not offered on the web.

## Learning experience and UX (Stages 3 and 6)

- Learn shows: passage, core idea, what the text says (summary, not a quotation), **Achtergrond**
  (context), **Uitleg** (marked as interpretation), the everyday example, tradition and care notes.
- Completion offers: next lesson, back to Today, **Schrijf in je dagboek**, review the lesson.
- Journey: chapter cards with a large week number, description and progress; the recommended lesson is
  marked; every day opens; nothing is locked by the calendar.
- A shared `SearchField` (Explore and journal), option rows read as selected buttons by VoiceOver,
  list titles no longer announced as headings.
- `Screen` takes safe-area insets from the root provider (the native SafeAreaView reported no top inset
  inside the full-screen lesson modal), clips scrolled content at the safe area, and leaves room above
  the floating iOS 26 tab bar.

## Data and reliability (Stage 7)

- `MIGRATIONS` and `migrateState` upgrade stored state one version at a time; an unknown or newer
  version starts fresh instead of crashing. Tested with a sample chain.
- Progress, preferences and onboarding are unchanged in shape (version 1), so Phase 1 users keep
  everything.
- Erase all data clears app state, the journal file and key, legacy reflection keys and the migration
  flag, then all providers reload.

## Builds (Stage 8)

- `expo-dev-client` installed; `eas.json` profiles: `development`, `development-simulator`, `preview`
  (internal, Android APK), `production`.
- `npx expo prebuild` was run for both platforms to verify the configuration, then the generated
  folders were removed (they are generated and git-ignored).
- App identifiers: `com.moralfuel.app` on both platforms, chosen by the owner. EAS needs an Expo
  account login, which is not available here.

## Verification (Stage 9)

| Check | Result |
| --- | --- |
| `npm test` | 211 tests pass (content incl. all 30 lessons, crypto, journal, migrations, legacy import, reminders, preferences, progress, search, reducer, component tests) |
| `npm run typecheck` | Clean |
| `npm run lint` | Clean |
| `expo-doctor` | 20/20 |
| `expo export` web and iOS | Bundle |
| `expo prebuild` iOS and Android | Succeeds |
| iOS simulator (Expo Go, iOS 26.5) | See `MOBILE_TESTING_GUIDE.md` §4 |
| Android | **Not run** (no emulator or device available) |
| Physical devices, VoiceOver, TalkBack | **Not run** |
