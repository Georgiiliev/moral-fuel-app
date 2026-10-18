# Build troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `pod: command not found`, CocoaPods needs a newer Ruby, or expo-doctor's "CocoaPods version check failed" | macOS Ruby 2.6 is too old for CocoaPods 1.17 | Put `~/Library/cocoapods-bin` first on `PATH` (wraps Homebrew's bundled Ruby), or install the Command Line Tools and `brew install cocoapods` |
| Homebrew: "Xcode alone is not sufficient" | Command Line Tools missing | `xcode-select --install` |
| Signing: "Personal development teams do not support the App Groups capability" | Free Apple ID | Build with `MORAL_FUEL_WIDGETS=off` (no widgets) or use a paid team |
| Signing: "Personal development teams do not support the Push Notifications capability" | Push entitlement requested | Fixed: `enableRemoteNotifications: false` in `app.json`; regenerate with `prebuild --clean` |
| "No code signing certificates are available", or `security find-identity -v -p codesigning` shows 0 valid while a certificate exists | No Apple Development certificate yet, or the Apple WWDR G3 intermediate is missing | Xcode → Settings → Apple Accounts → account → Manage Certificates → + → Apple Development; if it stays invalid, import `https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer` into the login keychain |
| "No profiles for 'com.moralfuel.app' were found … pass -allowProvisioningUpdates" | A previous run already wrote the team into `ios/`, and Expo only allows provisioning updates on the run that writes it | Run `MORAL_FUEL_WIDGETS=off npx expo prebuild --clean --platform ios` again, then the build |
| "Developer Mode disabled" in the destination list | Developer Mode turned on for another iPhone | Check with `xcrun devicectl device info details --device <name>` (`developerModeStatus`) |
| `No device UDID or name matching` | `--device` was given the CoreDevice identifier | Pass the device name (as in `xcrun devicectl list devices`) or its hardware UDID |
| App opened fine, now refuses to start | Free provisioning expired (7 days) | Rebuild with the Route 1 command in `IPHONE_INSTALL_GUIDE.md` |
| "Untrusted Developer" on the iPhone, or `expo run:ios` ends with CoreDeviceError 10002 "profile has not been explicitly trusted" (the app is installed) | Free-team app not trusted yet | Settings → General → VPN & Device Management → Trust |
| Device not listed by `expo run:ios --device` | Developer Mode off, phone locked, or not paired | Turn on Developer Mode, unlock, connect with a cable, trust the Mac |
| Bundle identifier already in use | Another team registered `com.moralfuel.app` | Choose another identifier in `app.json` (it is permanent once published) |
| EAS: "An Expo user account is required" | Not logged in | `npm run iphone:login` |
| EAS preview build will not install | iPhone not registered before the build | `npm run iphone:register`, then build again |
| Widget does not update | App not opened since the change, or WidgetKit budget | Open the app once; updates follow within moments |
| `[widgets] publishing failed` in development logs | A widget rejected its props (for example a `null`) | Props must never contain `null`; see `widget-data.ts` |
| Expo Go on Android crashes at start | Push module missing in Expo Go on Android | Fixed: notifications load lazily; reminders need a real build there |
| Web dev server shows old code | Started with `CI=1` (no file watching) | Start it without `CI` |
| `npm` permission errors in `~/.npm` | Root-owned files in the npm cache | `sudo chown -R 502:20 ~/.npm`, or set `npm_config_cache` to a writable folder |
