# Widget testing

## Automated (npm test)

237 tests pass, including for widgets:

- inspiration content: 40 entries, unique ids, attribution, license, review state, real book codes,
  paraphrases only, at least four per theme, quotation rules;
- daily selection: one inspiration per local day, change at local midnight, local-calendar day across
  time zones (Amsterdam vs. New York at the same instant), daylight-saving midnight, full rotation per theme;
- data mapping: fresh install, real progress and next lesson, all lessons done, 30 timeline entries at
  local midnights, signature changes only with progress or day, reset clears progress, Dutch fallback;
- privacy: Lock Screen progress absent unless switched on; no journal or reflection text in any bundle;
  no null in anything sent to the native bridge;
- deep links: known lesson, removed lesson falls back to Journey, Today;
- sync triggers: publish after load, not again when unchanged, after a lesson completion, after an erase,
  on return to the foreground on a new day, not before stored state has loaded;
- gallery: five labelled previews, no add button, privacy switch off by default and saving the choice.

`npm test` runs with `TZ=Europe/Amsterdam` so date tests are deterministic.

## Native, iOS simulator (verified 2026-10-18)

Development build (`npx expo run:ios`, Xcode 26.6, iPhone 17 Pro simulator, iOS 26.5), driven with idb:

| Check | Result |
| --- | --- |
| Build with widget extension (`ExpoWidgetsTarget.appex`) and App Group container | Works |
| Moral Fuel appears in the system widget gallery with Dutch names and descriptions; 10 Home Screen variants | Works |
| Widgets render real data: daily inspiration (Filippenzen 4:4, *In eigen woorden*), progress 1/30 with next lesson, dashboard with inspiration, progress and today's action | Works |
| Dashboard widget added to the Home Screen | Works |
| Tapping the widget opens the app in lesson 2 (deep link, warm start) | Works |
| Completing lesson 2 updates the widget to 2/30, 7% | Works |
| Dark appearance of the Home Screen dashboard widget | Works |
| Lock Screen widget publishing | Failed at first (null in props), fixed, verified publishing |

## Not verified natively

- Lock Screen widgets placed on the Lock Screen, and their vibrant rendering.
- Per-widget settings (theme, Lock Screen content) through Edit Widget.
- Rotation at local midnight with the app closed for days (by design of the timeline; tested in unit tests).
- Tinted Home Screen appearance, multiple instances side by side, cold-start deep links.
- A physical iPhone (needs Apple Developer signing, see `WIDGET_IMPLEMENTATION.md`).

## Manual test plan on an iPhone

1. Install the development build; open Moral Fuel once.
2. Add each widget (Home Screen → Edit → Add Widget → Moral Fuel), in every size.
3. Add two inspiration widgets and give them different themes (long-press → Edit Widget).
4. Add Lock Screen widgets (circular, rectangular, inline); set one to show progress: it stays an
   inspiration until *Jij → Widgets → Toon voortgang op het toegangsscherm* is on.
5. Complete a lesson; widgets show the new count within moments.
6. Tap each widget: Today, Journey or the lesson opens, also when the app was closed.
7. Close the app, turn on Airplane Mode, wait past midnight: the inspiration changes.
8. Switch dark mode and the tinted Home Screen style; check readability.
9. *Jij → Alle gegevens wissen*: widgets return to the welcome state.
