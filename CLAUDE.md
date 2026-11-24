# CLAUDE.md — ipd-app

The IPD app (Innovation Plumbing + Design, Brisbane): a single `index.html` web app used mainly on iPhone and iPad. Owner: Matt.

## Matt's standing rules

1. Matt is a plumber with limited computer skills. Use plain words, no jargon, and short numbered steps. When Matt has to do something, give him one step at a time.
2. Tell Matt exactly what to click or type. Put anything he needs to copy in a code block.
3. Do the work yourself. Only stop and ask before:
   - pushing or merging to `main`
   - anything that writes to ServiceM8
   - deleting anything
   - anything outside the project folders
4. Never put API keys or passwords in notes, chat or the repo.
5. Staff on the shared PIN must never see a change until Matt says so. Always give Matt the undo.
6. Test on previews first, and give Matt exact things to check on his iPhone or iPad.
7. Keep `STATUS.md` short and current: what's live, what's on previews, what you're waiting on, what Matt needs to test. Update it after each job. Never include keys or customer data.
8. Easiest, simplest, quickest way for every step, with the least involvement from Matt. He has put months into this and wants to see the end of the project soon.
   - Prefer solutions that need no accounts, keys, sign-ins or clicks from Matt. Do the work yourself.
   - Only ask him for the approvals the rules require: anything to `main`, anything written to ServiceM8, anything deleted, anything outside the project folders.

## How things fit together

- Live app: Netlify, built from `main` (a push to `main` goes live within about a minute). It talks to the live server `ipd---proxy-server`.
- Previews: Render static site `ipd-app-preview-pilot` (set to whichever branch is being tested). Previews talk to the test server `ipd-proxy-auth-test`, never the live server.
- Server repo: `ipd-server`. Tests and edit scripts: `C:\Users\Matt\ipd-audit-scripts` (not a repo).

## Keeping the PIN app unchanged

- Everything new is shown only after a login, inside `body.pilot` (CSS) or the `tpl-*-pilot` templates (markup), switched on by `enablePilotUI()`.
- Before any merge, run `pin-compare.js` against `main` on iPhone SE, iPhone 13 and iPad. Only differences Matt has approved are allowed. The Stock screen and text edges show small noise even main against main; check by eye.

## iPhone and iPad

- Text boxes on logged-in screens use 16px text (iPhone Safari zooms in on smaller text and stays zoomed).
- Nothing may be wider than the screen; tab rows wrap. Run `width-check.js` (iPhone SE, 13, 15, 15 Pro Max).
- Logged-in screens block accidental pinch and double-tap zoom.
- Photos are shrunk on the phone, uploaded straight away, queued when offline, and cleared once the server confirms (a thumbnail stays).

## Working habits

- Branch for every change; never commit on `main`.
- Edit large files with small scripts that use function replacements, not string ones. The file uses Windows line endings.
- Show evidence (screenshots, read-backs) rather than claims.
