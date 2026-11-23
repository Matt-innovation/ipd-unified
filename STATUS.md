# STATUS — ipd-app

Last updated: 20 Nov 2026

## Live (main, on Netlify)
- Shared PIN app unchanged for staff without a login.
- For people with a login (private `?pilot=1` address): home page, Ask Old Mate, quote tabs, Notes & photos, Staff Kiosk, Suppliers, Social Media, Systems health (owners), labour costs to ServiceM8, iPhone width fixes.

## On the preview (`preview-all` at ipd-app-preview-pilot)
`preview-all` = `three-texts` + `markup-guide` + `materials-line`.
- Summary tab: three boxes — Job description, Invoice description (the client sees this), Notes / concerns for the diary.
- No accidental pinch or double-tap zoom on logged-in screens (iPhone and iPad).
- Markup guide screen (home page button): bands with GP %, calculator, owner-only editing, "price never drops at a band edge" rule (switchable).
- Materials allowance card at the top of the Labour tab: cost ex/inc GST, markup % or $, the guide's suggestion, GP shown; the client sees one line with the sell price only.
- Labour lines are labelled "Labour" (not "Reece") on the Summary tab.

## Waiting on Matt
- Test the preview, then OK to merge each branch (three-texts, markup-guide, materials-line).
- Before merging claude-notes: `_redirects` blocks CLAUDE.md and STATUS.md on Netlify (check the live address after the merge).

## Matt to test (iPhone first)
1. Close any old preview tab, open https://ipd-app-preview-pilot.onrender.com/?pilot=1 in Safari, and log in.
2. Quote → Labour: Materials allowance — cost 550, ex GST; check the suggested markup and the sell price; Add; check Summary shows one "Materials" line.
3. Quote → Summary: scroll down to the three boxes; send to job 7600; check Details, Billing and Diary in ServiceM8.
4. Pinch and double-tap: the screen should not zoom.
5. Home → Markup guide: try the calculator.

## 20 Nov 2026
- New branch `client-terms` (also in `preview-all`): client quote page `quote.html` + approved terms `terms/ipd-terms.txt` (v1, QBCC 1141791), version history in `terms/ipd-terms.json` and `terms/history/`. Edit terms only with `ipd-audit-scripts/terms-version.js record "what changed"`.
- 23 Nov 2026: terms **v2** (Matt): payment key term reworded; clause 11 now "Concrete and hard surfaces" (hard surfaces extra unless listed); v1 kept in history. Address shows "Servicing Brisbane" (page, PDF header and footer). Payment schedule shows only when a quote has stages (server `stages` field; deposit + stages = total). Signed record shows terms version + date; a quote signed under an old version keeps showing that version. Tech entry of stages: planned, not built. 46 phone/iPad checks pass. Preview only.
- Not on the live Netlify site (main unchanged).
- 23 Nov 2026: branch `client-photos` (in `preview-all` 8271d79): **Send to client** box on the logged-in Summary tab (PIN staff unchanged) + **photos & mock-ups** (Take photo / Photos or file / From this job; caption; Photo or Mock-up; whole quote or a line; order; offline-safe). Limits 12 per quote, 4 per line (Matt). Mock-up label: "Mock-up. For illustration only, final layout may vary." Quote page: gallery, line thumbnails, full-screen viewer (swipe, pinch, double-tap), PDF photos page. Tests: client-quote-check 102, cq-app-check 58, notes-check 42 pass. Preview only.
- 23 Nov 2026: branch `client-details` (in `preview-all`): Part B Phase 1 item 1. Client details READ from ServiceM8 (job client name, job address, job + client contacts; GET /client-quote/job/:n/client). Tech can change name, phone, email and add contacts (max 6) for that quote only; job address always from ServiceM8; what ServiceM8 said is kept with the quote. Client page/PDF show name + job address only. Saving back to ServiceM8 NOT built (needs Matt OK). Tests: client-quote-check 116, cq-app-check 83, notes-check 42.
- 23 Nov 2026: branch `quote-drafts` (in `preview-all` 6c03d6f): Step A quote drafts on the phone (logged-in only; per job, per person; restore on reopen with price-change check; Clear/Start new keep a copy). Tests: drafts-check 48, cq-app-check 83, client-quote-check 116, notes-check 42, quote-check-pilot 72, home-check 54, width-check 60 screens, materials-check 23, layout ok. pin-compare main vs preview: PIN screens identical (only a toast caught mid-fade). LAUNCH target: within 3 days (by Thu 26 Nov) — see chat plan.
