# Testing the widgets on a real iPhone

Needs the Route 2 build (paid team) from `IPHONE_INSTALL_GUIDE.md`; a free-team build has no widgets.

1. Open Moral Fuel once and complete onboarding (widgets get their first data then).
2. Home Screen: long-press → **Wijzig/Edit** → **Voeg widget toe/Add Widget** → Moral Fuel. Add each
   widget in each size: Dagelijkse inspiratie (S/M/L), Je reis (S/M/L), Om te doen vandaag (M/L), Moral
   Fuel vandaag (M/L).
3. Add a second Dagelijkse inspiratie; long-press → **Wijzig widget** → choose another Thema. Both show
   their own theme.
4. Lock Screen: long-press → **Pas aan** → Lock Screen → widget area → Moral Fuel (circular,
   rectangular, inline). Set one to **Voortgang**: it keeps showing an inspiration until *Jij → Widgets →
   Toon voortgang op het toegangsscherm* is on.
5. Complete a lesson; return to the Home Screen: Je reis and the dashboard show the new count.
6. Tap each widget, also after force-quitting the app: Today, Journey or the lesson opens.
7. Turn on Airplane Mode and leave the app closed past midnight: the inspiration changes.
8. Switch dark mode and the tinted Home Screen style (Edit → Customise); text stays readable.
9. *Jij → Alle gegevens wissen*: widgets return to the welcome state.

Note results in `WIDGET_TESTING.md` (what passed, device, iOS version).
