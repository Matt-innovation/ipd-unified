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

## 23 Nov 2026 (evening) — built while Matt was away (all PREVIEW ONLY, each behind a switch that is OFF on live)
Preview server switches now on: CLIENT_QUOTE, PRODUCT_LINKS, QUOTE_STAGES, QUOTE_ALERTS, QUOTE_OPTIONS, QUOTE_VERSIONS, SWMS_PROMPTS (+ REPORT_PROBLEM on by default; REPORT_PROBLEM=off turns it off). Live server: none of these set. Nothing merged to main. No ServiceM8 writes.
Full check: `node ipd-audit-scripts/regress.js` (13 suites + PIN comparison) — EVERYTHING PASSED after each piece.

Choices made without Matt (safest sensible default — change any of them):
- Report a problem: Home tile + Settings button, logged-in only; saved in our DB (collection problem-report) and emailed to PROBLEM_EMAIL or the owner login; 10/hour/person; owners can list.
- Product links (Matt's answers: KC + approved sites; I add 3 Sheet columns; find spec sheets; nothing auto-ticked): approved sites list in client-quote.js (APPROVED_SITES_DEFAULT, override APPROVED_LINK_SITES), includes reecegroup.com.au; hand links must be https, open, and not redirect off the site; sites that block checks (401/403/429) allowed if approved; 5 per line / 20 per quote; bundle lines match by name/tags only (no ServiceM8 bundle-part read yet). Sheet columns + Apps Script change = Google step for Matt: ipd-audit-scripts/reports/knowledge-sheet-columns-steps.txt (my Drive connection can't edit that Sheet). Spec sheets for approval: reports/spec-sheet-candidates-for-approval.txt.
- Stage entry: "This is a staged job" tick (off by default); stages cover total less deposit; Split 50/50 and 40/40/20; link only made when it adds up; kept per job on the phone.
- Alerts: to the link maker + all owners; phone push if turned on, else email (same as Staff Kiosk); first client open (staff preview excluded) and signing; in the background; recorded as "alert" events.
- Versions: same person within 10 min = one version; a send/link starts a new one; saved ~20 s after changes; warning if someone else saved the same job in the last 30 min; second Send to SM8 within 7 days asks first (reads our own records only); never merged or deleted.
- Options: Required / Optional (starts unticked) / Optional (starts ticked); independent extras only (no "choose one of" groups yet); not allowed with staged quotes; quoted total = required + ticked; server recomputes at signing and stores options + declined; Send to SM8 still sends all lines.
- SWMS: keyword rules for 8 high-risk work types (height >2 m, trench >1.5 m, asbestos, confined space, gas, mobile plant, traffic, demolition/structural) in index.html SW_RULES; advice only, asks once before sending if unanswered; answers kept with drafts/versions and on the client quote record (staff only). No ServiceM8 badge (needs OK).
Waiting for Matt: Day 1 launch OKs (merges to main, live switches); Knowledge Sheet columns (Google step); spec sheet approval; text/email sending service; Work Order move + diary copy; SWMS badge in ServiceM8; LINE_PRODUCTS on live; test database expires 11 Dec 2026; calendars/leave/push.


## 24 Nov 2026 — "accepted" alert also goes to the scheduling inbox (PREVIEW ONLY)
- Accepted (signed) client quotes: alert to the link maker + owners (as before) AND an email to the scheduling inbox, default info@innovationplumbing.com.au. Email has job number, client, address, contact, who signed and when, total, deposit, stages, options chosen / not chosen, photo permission, who made the quote, and a link to the signed quote (staff view `quote.html?staff=1#id`, not counted as a client open). Says nothing was changed in ServiceM8.
- "Opened" alerts unchanged (link maker + owners only, never the inbox).
- Setting: owners only, app Settings → Your login → "📬 Accepted quotes email". Saved in our database straight away (no redeploy); every change kept (collection cq-setting). Blank = no scheduling email. No saved value → SCHEDULE_EMAIL env → info@. Server: GET/POST /client-quote/settings.
- Still behind QUOTE_ALERTS (off on live). Tests: client-quote-check.js 171, new sched-check.js 9; full regress passed (PIN comparison: only the known Stock toast after re-runs).
- Test sign on job 7600 (preview) 24 Nov ~10:22 am: quote 2a9a88e8-5435-448c-9760-b079ebb8e2d7, both options ticked, total $3,160.50, deposit $632.10; "opened" emailed to the 2 owners, "accepted" to the 2 owners + info@.

## 24 Nov 2026 — LAUNCH OK #2 DONE: app merged to main (Netlify), Matt's OK
- Netlify (no API access from here, checked by behaviour): live site = main byte-for-byte; main--site exists; claude-notes--site and preview-all--site = Netlify "site not found" although both were pushed many times (no branch deploys); /STATUS.md and /CLAUDE.md 404. Merged tree has no CLAUDE.md / STATUS.md; sw.js unchanged.
- Checks first: full regress EVERYTHING PASSED (PIN comparison: Stock toast only).
- main 4e57fca -> merge commit f1de95d (= preview-all eb327dc). Live at ~01:03 UTC (11:03 am Brisbane). Publishes index.html, quote.html, terms/ (new).
- After deploy, real live app + live server, WebKit iPhone SE and iPhone 13, PIN user, read only: PIN screen shown, search "tempering valve" 20 results, no errors, PILOT_UI false; PIN / Home / Search / Quote / Settings screenshots 0.000% different from before the merge.
- No live switches changed (waiting for OK #3).
- UNDO: Netlify -> Deploys -> the deploy of main@4e57fca -> "Publish deploy" (then Netlify locks auto publishing; unlock it after the fix). And `git revert -m 1 f1de95d` + push main so the next build doesn't republish it.

## 24 Nov 2026 — Training course built (PREVIEW ONLY, TRAINING_MODE=on on the preview server; not set on live)
- Server training.js (9499189), app 7a4abde. Tests: training-check.js 55, client-quote-check.js 173; full regress passed (PIN comparison: Stock toast only on clean runs; an occasional font-timing run shows the same tiny numbers as before any training code existed).
- Scripts to record: C:\Users\Matt\ipd-audit-scripts\reports\training-video-scripts.html (one page per video; regenerate with `node make-training-scripts.js` — it reads the same sections as the app).
Choices made without Matt (safe defaults — change any):
- Old guide fixes: labour rates now read from the app's own rates for everyone (same text while rates are 229/160/195/100/88). Home list = today's tiles and "AI Assistant" → "Ask Old Mate" only for logged-in staff; the shared-PIN guide text is unchanged (PIN rule) — switching the PIN guide too needs Matt's OK.
- Sections follow the switches and roles: Safety only with SWMS_PROMPTS, Client details + Send to client with CLIENT_QUOTE, Notes with NOTES_MODE, Kiosk/Suppliers/Social with any of them, Markup guide with GUIDE_MODE; Stock orders for owners + techs only. Hidden sections don't block the next one. On live today that is 12 of 14 (no Safety; Kiosk etc. shown).
- No video link yet → "Video coming soon" and the watched tick isn't needed (so staff aren't blocked). With a video: "I watched the video" is a tick box (honour system, no watch tracking).
- Owners = role Owner (or Manage users). Owners: Team progress (everyone, done/total, next section), Unlock (do it without the one before) and Reset (clear that section's ticks; later completed sections stay complete). Every change kept as an event with who and when; nothing deleted. Video links: YouTube → youtube-nocookie embed, Vimeo (incl. unlisted hash); https only; every change kept, newest wins.
- Practice mode: yellow banner, job fixed to 7600, its own draft per person (the real draft is put away and comes back on Stop), survives closing the app. Send to SM8 and stock orders are pretended on the phone (never reach the server); Notes & photos and Social photos can't be added; client links are allowed but marked PRACTICE (job 7600 only, PRACTICE banner on the client page, no alerts or emails); saved versions off; every other save (kiosk requests, report a problem, users…) is blocked with "Practice mode: nothing is saved or sent". Reading, search and Old Mate work.
- Some steps tick themselves (logged in, started practice, Reece/bundle/labour line added, practice send, practice client link, asked Old Mate); every step can also be ticked by hand.
- Limit: 3000 progress changes per person (stops runaway taps).
- Going live later needs Matt's OK: merge server + app to main, then TRAINING_MODE=on on live.

## 2026-11-24 ~1:50 pm: training course LIVE (Matt's OK)
- Server main = merge 1daca0e (previous 624ab86), deploy dep-dc2gc3dbedkc73avgnc0. App main = merge dbe9e36 (previous f1de95d) on Netlify.
- Live server env: TRAINING_MODE=on (was not set), deploy dep-dc2ghlu7bikc738k93eg. Nothing else changed (24 keys; LINE_PRODUCTS, SWMS_PROMPTS still not set).
- Checks before each merge: full regress passed (client link box timed out once, passed 137/137 on re-run and in the second full run). PIN app on real Netlify + live server, iPhone SE/13: 0.000% after each of the three steps. /training/* = 401 without login.
- Live shows 13 sections to owners/techs, 12 to office (no Safety while SWMS_PROMPTS is off). No video links yet on live -> "Video coming soon", watched tick not needed.
- Undo: (3) delete TRAINING_MODE on live + redeploy; (2) git revert -m 1 dbe9e36 in ipd-app, push main; (1) git revert -m 1 1daca0e in ipd-server, push main.
- Next (plan only, waiting for Matt): AI-made training videos, trial video 1.

## 2026-11-24: Azure unused
- Matt stopped the Azure setup. A free Azure account exists in his name, but nothing was created in it (no budget, no Speech service, no keys) and the command-line sign-in was cancelled before it finished.
- The Azure command-line tool and ffmpeg 9.1 are installed on this PC. Training-video voices now use a free voice engine on this PC (no accounts or keys); videos are hosted inside ipd-app, not YouTube.

## 2026-11-24 ~4 pm: training videos made on this PC (preview only)
- No accounts, keys or YouTube. Voice: Kokoro (free, on this PC). Recording: app on a simulated iPhone against a local test server; Trainee login + dummy code; nothing sent anywhere. Maker: `ipd-audit-scripts/video` (README there).
- Videos live in the app: `training/videos/*.mp4` + `training/videos.json` (built-in video wins over a pasted link). App preview-all f656981; training checks 58/58, full regress passed, PIN app unchanged.
- Video 1 trial (3:01, 4.9 MB) in two voices: A = George (British, in the course), B = Michael (American, `training/videos/01-login-voice-b.mp4`). Waiting for Matt to pick and approve; then videos 2-14 get made the same way on the preview. Removing the unpicked file needs his OK (a deletion).
- Not on live until Matt OKs a merge to main.
- ~5 pm update: video 1 remade sharp (Matt found the first one unclear on his PC). iPhone 390x844 recorded at 3x inside a 1296x3072 video, H.264 CRF 19, 12 MB for 3 min. George voice only; voice B removed (Matt: "George only"). On a PC the course shows it up to 84% of the screen height (never past real size); on a phone 62% of the height with a full-screen button. App preview-all b88a467; training checks 60/60, full regress passed, PIN app unchanged. Waiting for Matt's look before making videos 2-14.

## 2026-11-25: all 14 training videos made (preview only)
- Matt approved video 1 (George). "G'day" changed to "Hi" in every script and caption. All 14 made the same way: George only, sharp settings (1296x3072, H.264 CRF 19), 5.6 to 13.4 MB each, 1 to 3 minutes each, every tap checked (no missed taps).
- Voice and quality are set in one place: `ipd-audit-scripts/video/settings.js` (`voice`, `speed`, `crf`). Change it there and run `node make-all.js` to remake.
- The first try to make all 14 in one go was stopped by Claude Code because the PC ran low on memory (Chrome was using about 4 GB). They were then made one to three at a time, which worked.
- Defaults I picked (Matt said not to ask):
  - Videos 10 (stock review) and 11 (Ask Old Mate) show where Old Mate's answer appears, but no real answer: the preview server has no AI key, and nothing was sent to live. No made-up answers. With Matt's OK, one question could go to the live Old Mate and these two could be remade with real answers.
  - Video 12 uses an example notice and three made-up suppliers ("Example Plumbing Supplies" etc., 07 0000 000x), not real businesses.
  - Video 7 shows the client page with a made-up client ("Practice Client", 1 Practice St).
- App bug found and fixed on the preview only: opening the Staff Kiosk hid the Suppliers and Markup guide screens, so they came up blank (`setKTab` hid every `.k-panel` in the app). Fixed so it only touches the kiosk's own tabs. Needs Matt's OK to go live.
- Course text fixed on the preview (server training.js): the Materials allowance is on the Quote screen's Labour tab, not the Summary tab.
- Seen while recording, not changed (for Matt to decide): in practice the toast still says "Quote sent to ServiceM8!" even though nothing was sent; the green "sent" banner is hard to read on the orange practice background.
- Checks: training course 59/59 (updated: with all 14 built in there are no link boxes, so paste-a-link is only checked when a section has none), full regress passed (client link box timed out once, passed 137/137 on re-run); app preview-all 9dba59a, server preview-all f597894. PIN app unchanged.
- Not on live until Matt OKs a merge to main.
