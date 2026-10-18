# Moral Fuel — Phase 2 audit

Audit of the Phase 1 repository on 2026-10-17, before any Phase 2 change (commit `17361bd`).

## How this audit was done

- Read `package.json`, `app.json`, routing (`src/app`), content models and data, storage, state,
  feature components, tests and docs.
- Ran the checks: `npm run typecheck` (clean), `npm run lint` (clean), `npm test` (11 suites, 67 tests
  pass), `npx expo-doctor` (20/20), `npx expo export -p web` and `-p ios` (both bundle).
- Walked through the web build in a browser (Playwright, 390×844, light and dark).
- **Not possible:** running on an iOS simulator, Android emulator or device. No iOS simulator runtime and
  no Android SDK are installed on this machine. The web preview is not proof that the native apps work.

## Existing architecture

| Area | What exists |
| --- | --- |
| Stack | Expo SDK 58.0.14, Expo Router 58, React 19.3, React Native 0.88, TypeScript 6 strict, React Compiler, Reanimated 4 |
| Routes | `src/app/_layout.tsx` (fonts, `AppStateProvider`, `Stack.Protected` onboarding guard), `onboarding`, `(tabs)/{index,journey,explore,you}` with `NativeTabs` on native and headless `expo-router/ui` tabs on web, `lesson/[id]` as a full-screen modal |
| Content | Typed models (`src/models/content.ts`), 7 lesson files, `journey.ts` (30 days, 4 sections, days 8–30 `PLANNED`), `taxonomy.ts`, `validate.ts`, content API in `src/content/index.ts` (`getDayViews`, `getLesson`, …) |
| State | One reducer and provider (`src/state`), persisted as one JSON record in AsyncStorage (`moralfuel.state.v1`) through a tolerant codec |
| Private text | Lesson reflections in expo-secure-store, split into 500-unit chunks, max 1,500 characters; memory only on web |
| Reminders | expo-notifications, one daily local notification at 08:00, 12:30 or 20:00; permission asked only on a user action; synced by the provider |
| UI | Theme tokens (light and dark), primitives in `src/ui`, feature folders in `src/features` |
| Tests | Jest (jest-expo), RNTL 14 (async render), unit tests for content, preferences, progress, codec, reflections, reducer, search; render tests for Today, DayRow, onboarding, lesson flow, You |

## Working features (verified)

Verified by tests and on the web: onboarding (5 steps, skippable, persisted, restartable), Today derived
from real progress, the Learn → Reflect → Live lesson flow with resume and completion, Journey with all
30 days and honest *Binnenkort* states, Explore search (accent-insensitive) and filters, You with
editable choices, reduce motion, privacy text, restart onboarding and erase all data, dark mode,
recovery from corrupt stored state.

## Missing or incomplete

1. Days 8–30 are planned only (title, summary, objective). Phase 2 needs 23 complete lessons.
2. No personal journal: only one reflection per lesson, no free entries, no browsing, editing, search or export.
3. Lessons have no separate *context* section (setting of the passage) apart from the explanation.
4. Reminders offer three fixed times, not a user-chosen time.
5. Journey shows no recommended next lesson and its four chapters look alike.
6. No native build setup: no `eas.json`, no `expo-dev-client`, no iOS bundle identifier or Android package.
7. App icon, adaptive icon and splash are still the Expo template's images. No brand assets were supplied.

## Bugs and risks

| # | Severity | Finding |
| --- | --- | --- |
| R1 | High | **Schema changes wipe user data.** `parseAppState` starts fresh on any version other than 1, so a Phase 2 schema change would reset onboarding and progress for every user. Needs real migrations. |
| R2 | High | **Native behaviour unverified**: native tabs, SecureStore, notifications, haptics and keyboard avoidance have never run on a device. |
| R3 | Medium | Reflections live in SecureStore chunks, which suits one short answer per lesson but not a journal of many entries (the Keychain is not a document store, and browsing would mean dozens of reads). |
| R4 | Medium | The reminder sync runs `cancelAllScheduledNotificationsAsync()` before scheduling. It is correct while the app owns all its notifications, but must stay the only scheduling path. |
| R5 | Medium | Accessibility: day titles in lists use the heading variant, so screen readers (and the web, as `h1`) announce many headings inside one list. |
| R6 | Low | Reading times are set by hand and not checked against the text length. |
| R7 | Low | Tests do not cover reminder scheduling, provider persistence across a restart, or migrations. |
| R8 | Low | `npm audit` reports 56 advisories, all in development tooling (ESLint 9, Jest); none ship in the app bundle. |
| R9 | Env | `~/.npm` contains root-owned files on this machine; installs use a temporary cache until the owner runs `sudo chown -R 502:20 ~/.npm`. |
| R10 | Env | The Expo dev server started with `CI=1` does not watch files and serves stale code; start it without `CI`. |

## Proposed implementation order

1. **Data safety first (R1):** versioned state with migrations; move private text behind one store.
2. **Content (Stage 2):** add a `context` field to lessons, update days 1–7, write days 8–30 as complete
   editorial drafts (three helpers in parallel, every reference reviewed before merge), extend the
   validator and tests to all 30.
3. **Journal (Stage 4):** an encrypted on-device journal (XChaCha20-Poly1305 via `@noble/ciphers`, key in
   SecureStore, ciphertext in the file system or AsyncStorage). Lesson reflections become journal entries;
   existing SecureStore reflections are migrated. On the web the journal is honest and memory-only.
4. **Lesson and Journey UX (Stage 3, 6):** distinct Learn / Reflect / Live sections, context block,
   review mode, recommended lesson, distinct chapters, heading semantics (R5).
5. **Reminders (Stage 5):** a user-chosen time, the suggested gentle copy, tests for the scheduling logic.
6. **Reliability (Stage 7):** migration and restart tests, progress consistency checks.
7. **Builds (Stage 8):** `expo-dev-client`, `eas.json` (development, preview, production), identifiers
   after the owner confirms them, documented signing steps.
8. **QA and docs (Stages 9–10):** all checks, the requested documents, and an honest list of what ran natively.
