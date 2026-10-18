# Mobile testing guide

How to run Moral Fuel on iOS and Android, what was verified natively in Phase 2, and what still needs a
device.

## 1. Quickest: Expo Go (no accounts needed)

```bash
cd moral-fuel
npm install
npm run start:go      # starts Metro in Expo Go mode
```

- **iPhone:** install *Expo Go* from the App Store (it must support SDK 58), then scan the QR code
  with the Camera app. Phone and computer must be on the same network.
- **Android:** install *Expo Go* from Google Play and scan the QR code inside Expo Go.
- **iOS simulator (Mac with Xcode):** press `i` in the terminal. The first time Expo installs Expo Go
  in the simulator.
- **Android emulator (Android Studio):** start an emulator, then press `a`.

Everything in Moral Fuel works in Expo Go. Expo Go prints a warning that `expo-notifications` is
"not fully supported": that concerns **remote push**, which Moral Fuel does not use. Local daily
reminders work in Expo Go.

## 2. Development builds (recommended for beta testers)

A development build is your own app binary with the Moral Fuel name and settings, instead of Expo Go.

### Once: accounts and identifiers

1. The app identifiers are set in `app.json`: `com.moralfuel.app` for iOS (`expo.ios.bundleIdentifier`)
   and Android (`expo.android.package`). They cannot be changed after the first store upload.
2. Create a free Expo account and log in: `npx eas-cli@latest login`.
3. Link the project: `npx eas-cli@latest init` (adds `expo.extra.eas.projectId` to `app.json`).
4. For iPhones: an Apple Developer Program membership (paid) is required to install builds on
   devices; register test devices with `npx eas-cli@latest device:create`.
5. For Android: no account is needed for internal APKs; Google Play needs a developer account later.

### Build

```bash
npx eas-cli@latest build --profile development-simulator --platform ios   # runs in the iOS simulator
npx eas-cli@latest build --profile development --platform ios             # registered iPhones
npx eas-cli@latest build --profile development --platform android         # any Android phone
npx eas-cli@latest build --profile preview --platform android             # installable APK for testers
```

Then `npm start` and open the installed development build. Profiles are in `eas.json`.

### Or build locally (Mac with Xcode, Android Studio)

```bash
npm run ios        # expo run:ios: generates ios/, installs pods, builds, opens the simulator
npm run android    # expo run:android: generates android/ and builds
```

`ios/` and `android/` are generated (Continuous Native Generation) and ignored by git; change native
settings in `app.json`, never in those folders.

Local iOS builds need CocoaPods, which needs Ruby 3.1 or newer. macOS ships Ruby 2.6, so on this Mac
first run `xcode-select --install` (Command Line Tools), then `brew install cocoapods`. Local Android
builds need Java 17 and the Android SDK: on the build machine they live in `~/Library/Java/temurin-17`
and `~/Library/Android/sdk` (set `JAVA_HOME` and `ANDROID_HOME` to those).

## 3. What to test on a device

Use the manual test paths in `README.md`, plus:

1. **Reminders:** choose *Eigen tijdstip* a few minutes ahead, allow notifications, put the app in the
   background, and check the notification arrives with the text *Neem even een moment om stil te
   staan bij wat er vandaag toe doet.* Change the time and check only one reminder arrives. Withdraw
   the permission in system settings and reopen the app: *Jij* shows the reminder as off with an
   explanation.
2. **Journal privacy:** write an entry, force-quit, reopen: the entry is there. *Alle gegevens wissen*
   removes it. A reinstall starts with an empty journal.
3. **Keyboard:** in the reflect step and the journal editor, the text field and buttons stay visible
   above the keyboard on both platforms.
4. **Accessibility:** VoiceOver (iOS) and TalkBack (Android) read every control with a label; the
   largest text size keeps every screen usable; reduce motion removes the entrance animations.
5. **Small screens:** iPhone SE size and a small Android phone: no clipped buttons.

## 4. Native verification in Phase 2

Run on 2026-10-17 in **Expo Go on an iPhone 17 Pro simulator, iOS 26.5**, driven with idb:

| Checked | Result |
| --- | --- |
| App starts, fonts and colours, light and dark | Works |
| Onboarding, all five steps, back navigation | Works |
| Notification permission asked only after choosing a time; refusal keeps the reminder off and explains | Works |
| Custom reminder time saved and shown in *Jij* | Works |
| Lesson: learn, reflect (typing), live, completion; Today moves to day 2 | Works |
| Reflection appears in the journal under its lesson | Works |
| Force-quit and relaunch: progress and journal intact | Works |
| Journal file on disk contains ciphertext only | Verified in the simulator's app container |
| Custom reminder time (23:45), permission allowed: notification delivered at 23:45 with the calm copy | Works |
| Journal: new note in the editor sheet, list, search field, entry count | Works |
| *Alle gegevens wissen*: confirmation dialog, onboarding returns, encrypted journal file removed from disk | Works |
| Content under the status bar in the full-screen lesson | Found and fixed |
| Fast typing in a new note created one entry per keystroke (16 entries) | Found, fixed, re-verified (one entry), regression test added |
| Onboarding summary showed *Uit* for a custom reminder time | Found and fixed |
| Largest accessibility text size (onboarding): text scales, page scrolls, button reachable | Works |

Run on 2026-10-18 on an **Android 16 emulator (Pixel 8)**, in Expo Go and in a local development build:

| Checked | Result |
| --- | --- |
| App start in Expo Go | Crashed (expo-notifications push module missing in Expo Go on Android); fixed, verified |
| Onboarding, reminder step explains reminders need the real app (Expo Go) | Works |
| Lesson resume at the saved step, completion with a reflection | Works |
| Journal entry under its lesson; force-stop and relaunch keep progress and journal | Works |
| Journal file on disk contains ciphertext only (checked with adb root) | Verified |
| *Alle gegevens wissen* removes the encrypted journal file | Works |
| Local development build (`npx expo run:android`) | Builds, installs and runs |
| Custom-time reminder in the development build: permission prompt, notification delivered with the calm copy | Works (Android delivers within a ~2 minute window) |

**Not verified natively:** a physical Android phone, a physical iPhone,
VoiceOver and TalkBack, the largest text size on every screen, journal export through the share sheet, and a
development build (needs an Expo account and identifiers).
