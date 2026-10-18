# Installing Moral Fuel on your iPhone

Two routes. Both produce a standalone app: the JavaScript is bundled in, so the app runs without this
computer or a Metro server.

## Route 1: free Apple ID, without widgets (works today)

Apple does not sign App Groups for free teams, so this build leaves out only the widget extension
(`MORAL_FUEL_WIDGETS=off`). Everything else is included. Free provisioning expires after **7 days**;
after that the app does not open until it is rebuilt with the same command.

Once, on the Mac and the iPhone:

1. Xcode → Settings (⌘,) → **Apple Accounts** (Xcode 26; older Xcode: Accounts) → **+** → Apple Account;
   sign in and confirm the two-factor code. Then, still there: select the account → **Manage
   Certificates…** → **+** → Apple Development.
2. iPhone: Settings → Privacy & Security → **Developer Mode** → on; restart; tap **Turn On**.
3. Connect the iPhone with a cable (or keep it on the same Wi-Fi, paired), unlocked.

Build and install (from `moral-fuel/`):

```bash
MORAL_FUEL_WIDGETS=off npx expo prebuild --clean --platform ios
PATH=~/Library/cocoapods-bin:$PATH MORAL_FUEL_WIDGETS=off npx expo run:ios --device --configuration Release
```

`--device` lists connected devices; choose the iPhone. If Xcode asks for a team, choose your Personal
Team. Then on the iPhone: Settings → General → **VPN & Device Management** → your Apple ID → **Trust**.

To renew after 7 days, run both commands again. `prebuild --clean` matters: Expo only lets Xcode
create a new provisioning profile on the run that first writes the team into the project.

## Route 2: paid Apple Developer Program, with widgets (recommended for testing)

Needs the paid membership (99 USD a year). Gives a signed preview build with all widgets, installed
from a link, valid for a year.

```bash
npm run iphone:login      # Expo account; type your own password in the terminal
npm run iphone:init       # links the project, writes the EAS project id into app.json
npm run iphone:register   # shows a link/QR: open it on the iPhone and install the profile
npm run iphone:build      # preview build; sign in to Apple when asked (two-factor)
```

EAS creates the distribution certificate and ad hoc profiles for the app and the widget extension
(`com.moralfuel.app`, `com.moralfuel.app.ExpoWidgetsTarget`, App Group `group.com.moralfuel.app`).
When the build finishes, open its link on the iPhone and tap **Install**. Register a new device before
building, since an ad hoc profile only covers devices registered at build time.

Never paste passwords, tokens or codes into the chat; type them only into the terminal or Apple's dialogs.
