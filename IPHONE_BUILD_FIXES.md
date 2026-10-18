# iPhone build fixes

Changes made while preparing the physical iPhone build, and why.

| Change | Why |
| --- | --- |
| `app.config.ts` with `MORAL_FUEL_WIDGETS=off` | The owner has a free Apple ID; Apple refuses App Groups for free teams. The switch leaves out only the widget extension (plugin and EAS extension entry, verified with `npx expo config`). Without it every build, including EAS, keeps the widgets. |
| Widget publishing loads only when the `ExpoWidgets` native module exists | A build without the extension (or Expo Go) would otherwise load the widget modules and could crash at start. |
| Package scripts `iphone:*`, `ios:release:sim`, `preflight` | One command per step: login, init, device registration, EAS preview and development builds, local Release builds, and all checks before a build. |
| CocoaPods through `~/Library/cocoapods-bin/pod` | System Ruby 2.6 cannot run CocoaPods 1.17; Homebrew's bundled Ruby can. Documented in `BUILD_TROUBLESHOOTING.md`. |
| `expo-notifications` with `enableRemoteNotifications: false` (`app.json`) | The plugin added the push entitlement `aps-environment` by default, which free teams cannot sign. The app uses only local reminders and never asks for a push token, so every build now requests no push entitlement. |
| Apple WWDR G3 intermediate certificate imported into the login keychain | The new Apple Development certificate showed as "0 valid identities": the Mac only had the G1 intermediate, expired in 2023. G3 downloaded from apple.com/certificateauthority and verified against Apple Root CA before import. |
| Earlier: widget props never contain `null` | `updateTimeline` threw on the simulator; empty values are absent keys now (test included). |

## Verified

- Free-team Release build without widgets on the physical iPhone 15 Pro Max (iOS 26.6), 2026-10-18:
  Build Succeeded, signed with the owner's Personal Team, installed (`devicectl` lists Moral Fuel 1.0.0).
  After the owner tapped Trust, `devicectl device process launch` opened it with no Metro server running
  on the Mac, and the process stayed running: the app works standalone.
- Release build for the simulator (`npx expo run:ios --configuration Release`): Build Succeeded,
  `main.jsbundle` bundled inside the app (no Metro), `ExpoWidgetsTarget.appex` embedded in the Release
  product, app installed and opened on the iPhone 17 Pro simulator.
- 237 tests, TypeScript, ESLint and expo-doctor pass.

## Not changed

- No SDK upgrade, no change of bundle identifier, App Group or display name.
- No entitlement was removed from the regular build.
- `ios/` and `android/` remain generated and git-ignored; `prebuild --clean` only regenerates them.
