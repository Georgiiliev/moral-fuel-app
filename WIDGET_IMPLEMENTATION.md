# Widget implementation

What was built for native iOS widgets, why, and how to build and test it on an iPhone. The data flow
is in `WIDGET_ARCHITECTURE.md`; the test results are in `WIDGET_TESTING.md`.

## Choice of technology

- **expo-widgets 58** (the official Expo package for this SDK) with **@expo/ui SwiftUI components**.
  It generates a real WidgetKit extension through its config plugin, so `npx expo prebuild` reproduces
  the native project at any time; nothing is edited by hand in `ios/`.
- No SDK upgrade was needed. Android widgets in expo-widgets are left off; the feature is iOS-only.
- Widgets need a native build (development, preview or production). They do not run in Expo Go.

## Native configuration (`app.json`)

| Setting | Value |
| --- | --- |
| App bundle identifier | `com.moralfuel.app` (chosen by the owner) |
| Widget extension | `com.moralfuel.app.ExpoWidgetsTarget` (expo-widgets default) |
| App Group | `group.com.moralfuel.app`, on the app and the extension |
| URL scheme | `moralfuel` |
| Widgets | `DailyInspiration`, `JourneyProgress`, `TodayAction`, `Dashboard`, `LockScreen`, each with Dutch gallery name, description, supported families and an `initialLayout` shown before the app has run |
| Per-widget settings | `DailyInspiration.theme` and `LockScreen.content` (enum, iOS 17+) |

No notification or push permission is involved: widgets read the shared container only.

## Apple Developer requirements

The simulator needs nothing. A real iPhone needs signing:

1. A paid Apple Developer Program membership (needed for App Groups on devices).
2. In Certificates, Identifiers & Profiles, or automatically through EAS:
   - App ID `com.moralfuel.app` with the **App Groups** capability, group `group.com.moralfuel.app`;
   - App ID `com.moralfuel.app.ExpoWidgetsTarget` with the same App Group.
3. EAS creates and manages these identifiers and profiles when you build with it (recommended); with
   local Xcode builds, choose your team in Xcode for both targets after `npx expo prebuild`.

## Build and test on an iPhone

With EAS (recommended, after `npx eas-cli@latest login` and `npx eas-cli@latest init`):

```bash
npx eas-cli@latest build --profile development --platform ios     # registered iPhone
npx eas-cli@latest build --profile development-simulator --platform ios
npm start                                                         # then open the development build
```

Locally on a Mac with Xcode:

```bash
npx expo run:ios                         # simulator
npx expo run:ios --device                # a connected iPhone (needs signing, see above)
```

Local iOS builds need CocoaPods on Ruby 3.1 or newer. On the development Mac, CocoaPods runs on
Homebrew's bundled Ruby through `~/Library/cocoapods-bin/pod`; put that folder first on `PATH`.

Then add the widgets: long-press the Home Screen, tap **Wijzig** (Edit) → **Voeg widget toe** (Add
Widget) → **Moral Fuel**. Lock Screen: long-press the Lock Screen → **Pas aan** (Customize). Settings per
widget: long-press the widget → **Wijzig widget** (Edit Widget).

## Files

| File | Purpose |
| --- | --- |
| `src/content/inspirations.ts` | Inspiration content and model |
| `src/features/widgets/widget-data.ts` | Typed data, selection, timelines, links, validation |
| `src/features/widgets/publish.ios.ts`, `publish.ts` | Publishing to WidgetKit / no-op elsewhere |
| `src/features/widgets/use-widget-sync.ts` | Sync triggers, called in the root layout |
| `src/widgets/*.tsx` | The five SwiftUI widget layouts |
| `src/features/widgets/widget-gallery-screen.tsx`, `widget-previews.tsx`, `src/app/widgets.tsx` | In-app gallery, opened from *Jij* → *Widgets* |
| `src/features/widgets/__tests__/*` | Data, selection, time zones, privacy, links, sync and gallery tests |

## Design

Each family has its own composition: small shows one idea (an inspiration or a progress ring), medium
pairs two, large adds the explanation and today's action. Ivory and forest backgrounds with gold
accents follow the app; dark appearance uses the app's dark palette; the system serif (New York) gives
the editorial voice. Lock Screen widgets set no colours, so iOS renders them correctly in vibrant and
tinted modes. Text sizes stay readable and long text is clamped rather than shrunk to nothing.

## Known limitations

- WidgetKit decides when timelines advance and how often reloads are honoured; switches happen around
  local midnight, not to the second.
- If the app is not opened for 30 days, the inspiration stays on the last scheduled day until it is.
- Per-widget settings need iOS 17; on iOS 16 widgets show the default theme.
- The inspirations are unreviewed editorial drafts and paraphrases, never quotations.
- No widget can mark a lesson complete; completion stays in the app.
