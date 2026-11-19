# STATUS — ipd-app

Last updated: 19 Nov 2026

## Live (main, on Netlify)
- Shared PIN app, unchanged for staff without a login (except the old ServiceM8 key box was removed from Settings, as Matt asked).
- For people with a login (private `?pilot=1` address): new home page, Ask Old Mate, quote tabs (Summary, Products, Bundles, Labour, Notes & photos), Staff Kiosk, Suppliers, Social Media, Systems health (owners).
- Labour and uplift costs are sent to ServiceM8. iPhone width fixes (no sideways scrolling, no zoom on tapping a box).
- Known problem: the single "Invoice description" box goes to the wrong ServiceM8 field. Fixed on the `three-texts` preview, not yet live.

## On previews (branch `three-texts`, ipd-app-preview-pilot)
- Summary tab has three boxes: Job description, Invoice description (the client sees this), Notes / concerns for the diary.
- Accidental pinch and double-tap zoom blocked on logged-in screens (iPhone and iPad).

## Waiting on
- Matt: retest `three-texts`, then OK to merge.
- Matt: whether to move the three boxes higher on the Summary tab (on iPhone they're a long scroll down).
- Matt: Part B quote-sending decisions (see ipd-server STATUS.md).

## Matt to test
1. In Safari, close any old preview tab, then open https://ipd-app-preview-pilot.onrender.com/?pilot=1 and log in.
2. Quote, then Summary: scroll down past the totals and job number to the three boxes.
3. Fill all three, enter job 7600, tap Send to SM8, then check ServiceM8 (Details, Billing, Diary).
4. Try pinching and double-tapping: the screen should not zoom.
