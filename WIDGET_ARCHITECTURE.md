# Widget architecture

How Moral Fuel's native iOS widgets get their data and stay current.

## Components

```
app (React Native)                                  widget extension (WidgetKit)
──────────────────                                  ───────────────────────────
AppStateProvider ─ state (progress, preferences)
        │
useWidgetSync ── buildWidgetBundle(state, now, strings)      src/widgets/*.tsx
        │            (pure, typed, tested)                    ('widget' directive, SwiftUI
        │                                                      through @expo/ui)
publishWidgetBundle ── updateTimeline / updateSnapshot ──▶ App Group container
   (publish.ios.ts;          (expo-widgets)                group.com.moralfuel.app
    no-op on Android/web)                                        │
                                                          WidgetKit renders the entry
                                                          for its date and family
```

| Piece | File | Role |
| --- | --- | --- |
| Inspirations | `src/content/inspirations.ts` | 40 original Dutch paraphrases with reference, theme, attribution, license and review state |
| Data layer | `src/features/widgets/widget-data.ts` | Typed view models (`DailyInspirationWidgetData`, `JourneyProgressWidgetData`, `TodayActionWidgetData`, `DashboardWidgetData`, `LockScreenWidgetData`), daily selection, timelines, deep links, content validation |
| Publishing | `src/features/widgets/publish.ios.ts` | Hands timelines and snapshots to expo-widgets; `publish.ts` is the no-op for Android and web |
| Sync | `src/features/widgets/use-widget-sync.ts` | Decides when to publish |
| Layouts | `src/widgets/*.tsx` | One file per widget, laid out per family |
| Gallery | `src/features/widgets/widget-gallery-screen.tsx`, `widget-previews.tsx` | In-app explanation, labelled previews, privacy switch |
| Native config | `app.json` → `expo-widgets` plugin | Widget names, gallery texts, families, App Group, per-widget configuration |

## The five widgets

| Widget (`name`) | Gallery name | Families | Data | Per-widget setting |
| --- | --- | --- | --- | --- |
| `DailyInspiration` | Dagelijkse inspiratie | small, medium, large | 30-day timeline | Thema (all, trust, hope, love, forgiveness, gratitude, peace, everyday) |
| `JourneyProgress` | Je reis | small, medium, large | snapshot | none |
| `TodayAction` | Om te doen vandaag | medium, large | snapshot | none |
| `Dashboard` | Moral Fuel vandaag | medium, large | 30-day timeline | none |
| `LockScreen` | Moral Fuel | circular, rectangular, inline | 30-day timeline | Toon (inspiration, progress) |

Per-widget settings use expo-widgets' `ios.configuration` (App Intents, iOS 17+). Each widget instance
reads its own `environment.configuration`, so two inspiration widgets can show different themes; the
app never overrides them with a global setting.

## Source of truth and data flow

The app is the source of truth. `buildWidgetBundle` reads the app state that already exists:

- progress: `getJourneyPosition` over the stored `LessonProgress` records (completed count, the
  recommended lesson, the chapter); nothing is derived from dates or streaks;
- today's action: the live step of the recommended lesson;
- preferences: language and the Lock Screen privacy switch (`lockScreenProgress`, off by default).

Every label a widget shows travels in its props, because widget code runs in an isolated runtime without
imports. Journal entries, reflections and any other private writing are never read by the data layer, so
they cannot reach the shared App Group container. A test asserts this.

## When the app publishes

`useWidgetSync` publishes 0.8 s after the stored state has loaded and after any change to progress,
onboarding, preferences or language, including *Alle gegevens wissen* (which republishes the empty
state, so old progress disappears from widgets). It also runs when the app returns to the foreground,
which picks up a new day or a new time zone. Each bundle carries a `signature` (data version, local day,
language, progress, action, privacy); an unchanged signature is not sent again, to respect WidgetKit's
reload budget. Errors are swallowed: a widget problem never breaks the app.

## Daily rotation without the app

Date-driven widgets receive a timeline of 30 entries, one per local midnight (`startOfLocalDay`, built
from calendar fields so daylight-saving changes are handled). WidgetKit switches entries on its own, with
the app closed and offline. Selection is deterministic: `inspirationFor(localDayNumber, theme)` indexes
the (theme-filtered) list by the local calendar day number, so an inspiration stays all day, changes at
midnight and cycles through a theme before repeating. The timeline is rebuilt from today whenever the
app runs, so it never runs dry for an active user; after 30 days without opening the app the last entry
stays until the next launch. WidgetKit decides the exact moment of a switch; it is usually within
minutes of midnight but is not guaranteed to the second.

## Deep links

Taps use `widgetURL` with the `moralfuel` scheme, handled by Expo Router on cold and warm starts:

| Link | Opens |
| --- | --- |
| `moralfuel://` | Today |
| `moralfuel://journey` | Journey |
| `moralfuel://lesson/<id>` | that lesson (an unknown or removed id falls back to Journey; the lesson route also shows a calm unavailable state) |

## Content rules

No Bible translation is quoted: exact wording from a licensed or verified public-domain source was not
available, so every entry is an original paraphrase, labelled *In eigen woorden* in every widget and
never placed in quotation marks. The model allows a future `quotation` only with a named translation
and a license other than original work; the validator enforces it. All entries are `EDITORIAL_DRAFT`
until a qualified reviewer approves them (see `CONTENT_REVIEW_CHECKLIST.md`).

## Platforms

- **iOS 17+** (development or production build): all widgets.
- **Expo Go**: no widgets (expo-widgets needs native code).
- **Android and web**: `publish.ts` does nothing; the gallery says honestly that widgets are iPhone-only.
  The rest of the app is unaffected.
