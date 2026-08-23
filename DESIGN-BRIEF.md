# Talk Over — design brief

For a designer or design tool rebuilding this site as an editable, better-looking static site for Cloudflare Pages.

The existing folder is a working ChatGPT-built site. Treat it as a content source and a set of constraints, not as a layout to preserve. `README.md` in this folder covers deployment; this file covers everything else — the facts, the copy, the structure, and the gaps.

Everything in section 2 was checked against the Talk Over 1.0 source and the shipping DMG. Do not change those numbers or invent new ones.

---

## 1. The product in one paragraph

Talk Over is a teleprompter for Mac that listens while you read and moves the script to keep pace with you. Pause and it waits; go back over a line and it goes back with you. It also does ordinary timed scrolling and manual control. It runs entirely on your own Mac — no account, no cloud, works with the Wi-Fi off — and it is a one-time purchase rather than a subscription, which is the main thing separating it from the online tools it competes with.

**Who is buying it:** YouTubers, course and tutorial makers, people recording product demos and internal training videos, and anyone presenting on a video call who wants notes near the camera. Mostly non-technical. They have usually been burned by a subscription tool or by a prompter that scrolls at the wrong speed.

**What makes them buy:** seeing it actually follow a voice. A demo video is worth more than any amount of copy.

**What makes them hesitate:** "is my script going somewhere?", "will this work in my language?", "what happens when the trial ends?", "what does it cost?"

---

## 2. Verified product facts

Do not alter these. If a design needs a number that is not here, ask rather than estimating.

**Requirements**
- Apple Silicon only — M1, M2, M3, M4 or later. Intel Macs are not supported.
- macOS 11 Big Sur minimum; macOS 13 or later recommended.
- Download is 63 MB. Installed it is 81 MB. Allow about 250 MB free.
- A microphone (built-in is fine) for voice-following. A camera only if using Camera Take.
- Internet is needed only to download it.

**Trial and purchase**
- 30-day free trial. The app warns during the final 7 days.
- **There is no licence key and no activation.** The trial and the full version are two separate downloads. Buying means downloading a different file and dragging it over the app you already have.
- Nothing phones home. There is no server that can check whether someone bought it.
- When the trial ends, nothing is deleted or locked. Scripts stay in `~/Library/Application Support/Talk Over` and the full version picks up the same library.
- One-time purchase, one Mac. Every 1.x update included. Version 2 will be a paid upgrade at a discount for Version 1 owners.

**How it works**
- Runs as a local app that uses your browser as its window. It is not a website — the app is on your Mac. This surprises people and needs explaining, not hiding.
- Small menu-bar icon alongside the Dock icon.
- Speech recognition is **English (US) only.** Timed and manual scrolling work in any language; voice-following does not.
- Fully offline. Nothing is uploaded, ever.

**Scripts**
- Paste text, or import `.txt`, `.md`, `.markdown`, `.rtf`. Maximum 2 MB.
- Your original is never edited. Talk Over builds a separate reading copy that strips headings, notes to self, and bracketed stage directions.
- Every save creates a new numbered version and no version is ever deleted. Restoring an old one adds it as the newest rather than discarding what came after.
- It remembers your place per script, using the words either side of the line so an edit does not lose the spot.

**Reading**
- Three modes, switchable mid-take: voice-following, timed crawl, manual.
- Space starts and pauses. Arrows nudge a line. **Shift + arrow** jumps most of a screen (Page Up / Page Down also work, but most Mac laptops have no such key, so lead with Shift + arrow). Home and End jump to the start or end. Plus and minus change crawl speed.
- Click any word to restart the take from there.
- Text size, column width, line height, paragraph spacing and read-line height are all adjustable.

**Floating Prompt**
- A transparent, always-on-top window you drag anywhere and resize.
- A shade slider sets how see-through it is, from a faint tint to nearly solid.
- Sits over Zoom, Meet, Teams, Keynote or a browser, leaving them usable underneath.
- Share the meeting app's window rather than the whole screen and the prompt stays private to you.

**Camera Take**
- Your camera picture sits behind the words so you read while looking at the lens.
- Choose the camera and the microphone, then a three-second countdown.
- The recording is written straight to your Mac. The script, controls and settings are never burned into the video.
- The prompt can be flipped horizontally, vertically or both for beam-splitter teleprompter glass.

---

## 3. Hard constraints

- **Static site, no build step.** Cloudflare Pages serves the folder directly.
- **Keep the contact form working.** `contact.html` posts via `contact.js` to the Pages Function at `functions/api/contact.js`, which needs `RESEND_API_KEY` and `CONTACT_FROM` set in the Pages project. Mail goes to `julep@agentbaltic.com`. A redesign may restyle the form but must keep that request contract.
- **Payhip links are fixed:**
  - Free trial — `https://resources.agentbaltic.com/b/UlS6B`
  - Full version — `https://resources.agentbaltic.com/b/uxIl4`
- **Support email:** `julep@agentbaltic.com`. It must appear as selectable text somewhere, not only behind a form.
- **YouTube channels:** [Agent Baltic](https://youtube.com/@agentbaltic) and [Dave Tries This](https://youtube.com/@davetriesthis).
- `index.html` is currently a meta-refresh redirect to `editorial.html`. Fix this: the landing page should *be* `index.html`. Search engines and link previews currently see an empty page.

---

## 4. Page structure and section order

### Nav
Currently: Features · Installation & Use · About Us · Contact · Help · Free Trial · Purchase — seven items, with Contact and Help pointing at the same page, and no Pricing.

Use: **Features · How it works · Pricing · FAQ · About · Contact**, plus a single **Free Trial** button. Drop "Help" (it duplicates Contact) and rename "Installation & Use" to "How it works", which is what a visitor is actually looking for.

### Home page

Current order buries the two strongest things. The demo video sits fifth, and six paragraphs of founder story stand between the features and the buy button.

Suggested order:

1. **Hero** — promise, both buttons, the reassurance line.
2. **Demo video.** Move it directly under the hero. For a product whose whole claim is "it follows your voice", proof belongs above everything else. Until the video exists, use the floating-prompt-over-a-call screenshot here.
3. **Four feature cards** — voice-following, ordinary prompter modes, Floating Prompt, Camera Take. (This is already good; keep it.)
4. **Presenter screenshot on the dark band.**
5. **Pull-quote / interlude.** David is writing this — leave the slot.
6. **Pricing, with the actual price shown.**
7. **Short FAQ** — four or five questions, right before the last call to action, because this is where objections get answered.
8. **About, cut to two sentences** with a link to the full story.
9. **Footer** with support email and legal links.

The founder story currently appears in full on both the home page and `about.html`, word for word. Keep the long version on About only.

### Features page

The eight sections are good content. Three fixes:

- **Reorder** so "Read it your way" comes second, right after voice-following. It answers the immediate worry — *what if the voice thing doesn't work for me?* — and reassures people before they read further.
- **The alternating left/right rhythm breaks.** Sections 4 and 5 both carry the `reverse` class, so two images land on the same side in a row.
- **Two screenshots are used twice each** (`03-editor.png` and `04-presenter-voice-following.png`). On one page that reads as padding. Either capture two more or drop to six sections.

### How it works (installation)

Order is already right: requirements → install → first run → first take → screen guide. One addition: a **"How buying works"** block immediately after the install steps (see 5.2 — this is the single most important missing piece).

### New pages needed

**Pricing**, **FAQ**, and three short legal pages — **Refund policy**, **Terms**, **Privacy**. A paid consumer download needs a refund statement, and a product whose main promise is privacy needs a page that actually says "nothing is collected." Link all three in the footer.

---

## 5. Content that is missing

### 5.1 The price appears nowhere
Three separate Buy buttons and not one number. Put the price on the pricing card and beside the hero button.

### 5.2 How buying works is never explained
The most important gap. There is no licence key, so every buyer will email asking where theirs is. Suggested copy:

> **How buying works**
>
> There is no licence key to type in. The trial and the full version are two separate downloads. When you buy, you get the full version — drag it into Applications over the trial and open it as usual.
>
> Your scripts, settings and saved versions are already there, because they live in your folder rather than inside the app.

### 5.3 What happens after 30 days
The app handles this gracefully and it is a reason to start the trial, so say it rather than leaving people to assume the worst:

> When the 30 days are up, Talk Over stops prompting — and that is all it does. Nothing is deleted, nothing is locked, and every script stays exactly where it was. Install the full version and your library is waiting.

### 5.4 English only
Nowhere on the site. This is the most likely cause of a refund request. Put it in the requirements list and the FAQ, stated plainly:

> Voice-following understands English. Timed scrolling and manual control work with a script in any language.

### 5.5 "One purchase for one Mac" needs honesty
There is no activation, so nothing enforces it. Do not imply a lock that does not exist:

> One purchase covers your Mac. There is no activation server and nothing phones home — we are trusting you.

### 5.6 Smaller gaps
- **Updates** — 1.x updates are promised, but not how anyone receives them.
- **The 2 MB script limit** is buried mid-paragraph; it belongs in the requirements list.
- **Camera Take output** — what format, roughly what size, where it lands. People want to know before buying.

### 5.7 SEO and sharing
Every page has only a `<title>`. Add per-page `<meta name="description">`, Open Graph and Twitter card tags, and a favicon. Shared to Slack or iMessage today, this site renders as a bare grey link.

---

## 6. Copy: how to make it sound human

The current writing is competent but *composed*. Two habits cause it:

- Sentences that keep going, using dashes and colons where a full stop belongs.
- Headings written as slogans rather than saying the thing. "A prompter that works the way you do" tells a reader nothing.

There is also a tic: some form of *yours / your own / stays on your Mac* appears in nearly every section. Once it is a promise; seven times it sounds defensive. Keep it in the hero, one feature, and the FAQ.

**The model to follow is already on the site.** The About section — *"I've always had a love-hate relationship with teleprompters"* — is the best writing here: plain, specific, first person. Move everything else toward that voice.

Also: pick British or American spelling and hold it. "memorise" currently sits beside American forms.

### Rewrites

**Hero headline.** Current: *"Keep your eyes up and your place intact."* — rhythmic but abstract.
Suggested: **"The teleprompter that waits for you."**

**Hero body.** Current:
> Read naturally with a prompter that follows your voice, or use it the familiar way: set a scrolling pace or take control with buttons. Talk Over adapts to the way you record.

Suggested:
> Talk Over listens while you read and moves the script to match you. Pause to think and it waits. Go back over a line and it goes back with you. Prefer a steady scroll, or to drive it yourself? Both still work.

**Features page headline.** Current: *"A prompter that works the way you do."*
Suggested: **"Everything Talk Over does."** A features page does not need a slogan; the visitor is already interested.

**Voice-following.** Current is one 78-word chain:
> Talk Over listens while you talk and moves the script to keep pace with you. There is no timer to guess at and no speed dial to keep nudging: start speaking and the words come to you, pause to think and the prompt waits, go off-script for a moment and it picks you back up when you return to the page.

Suggested:
> No timer to guess at. No speed dial to keep nudging. Start speaking and the words come to you. Pause, and it waits. Wander off-script and it picks you back up when you come back to the page.

**Version history heading.** Current: *"Nothing you write is ever thrown away."*
Suggested: **"Every save keeps the last one."** Same promise, without the defensive framing.

**First-run explanation.** Current:
> Talk Over appears in your Dock and a small TO icon appears in the menu bar. Your web browser then opens to the Talk Over screen. This is normal: Talk Over uses your browser as its window while still running entirely on your Mac.

Suggested:
> Talk Over opens in your browser. That surprises people, so: it is not a website. The app is running on your Mac and the browser is just the window it draws in. Turn your Wi-Fi off and it carries on working.

**Founder section link.** Current: *"Visit his channels"* — third person, immediately after six paragraphs of "I".
Suggested: **"Find me on YouTube"**. More broadly, the site is titled "About Us" and the contact page says "we", while the story says "I". It is a one-person product and that is an advantage against subscription competitors — use "I" throughout.

### Draft FAQ

> **What does it cost?** [price] once. Not a subscription.
> **What happens after the 30-day trial?** Talk Over stops prompting. Nothing is deleted and your scripts stay on your Mac.
> **How do I get the full version after I buy?** You download it and drag it over the trial. There is no licence key. Your library is already there.
> **Does it work in my language?** Voice-following understands English. Timed and manual scrolling work with any language.
> **Does anything get uploaded?** No. It works with the Wi-Fi off.
> **Will it run on my Intel Mac?** No — Apple Silicon only, M1 or later.
> **Can I use it with teleprompter glass?** Yes, the prompt flips horizontally, vertically or both.
> **How do I get updates?** [needs an answer]
> **Can I get a refund?** [needs an answer]

---

## 7. Assets

In `assets/screenshots/`:

| File | Shows |
|---|---|
| `01-first-run-welcome.png` | First-run guide |
| `02-script-library.png` | Saved scripts list |
| `03-editor.png` | Editing the reading copy |
| `04-presenter-voice-following.png` | Presenter with the current line marked |
| `05-display-settings.png` | Text size, spacing, read-line height |
| `06-help-and-shortcuts.png` | Keyboard shortcuts |
| `07-microphone-explainer.png` | What the mic is for, before macOS asks |
| `08-mirrored-for-teleprompter.png` | Flipped for beam-splitter glass |
| `09-floating-prompt.png` | **Misnamed** — this is the fullscreen presenter, not the floating window |
| `09-floating-prompt-conferencing.png` | ChatGPT's composite — see below |
| `10-camera-take.png` | Camera Take setup |
| `11-floating-prompt-over-call.png` | **Use this one.** The real floating window over a call |

In `assets/`: `julep-teleprompter.jpg` (hero), `julep-presenter.png`, `julep-editor.png`, `julep-library.png`.

**On the two floating-prompt composites.** There are now two attempts at the same shot. `09-floating-prompt-conferencing.png` is the fullscreen presenter pasted over a call image at near-full opacity — it fills the frame and does not read as a window at all, which undercuts the feature it is illustrating. `11-floating-prompt-over-call.png` is a genuine capture of the floating window at its real transparency, with the call participants visible through the script and a proper window shape and shadow. Use `11`, and either delete `09-floating-prompt-conferencing.png` or keep it clearly marked as superseded.

`11-floating-prompt-over-call.png` is also the best candidate for the `og:image`, since it is the most legible of the set at small sizes.

**Still needed:** the demo video (highest value), and if the Features page keeps eight sections, two more distinct screenshots so none is reused.

---

## 8. Current visual identity

From `styles.css`, in case the redesign wants to keep or deliberately depart from it.

- **Type:** Inter, weights 400–900. Headings are very heavy (800–900) with tight negative tracking (-.04em to -.06em) and sub-1.0 line height — a confident editorial look.
- **Palette:** ink `#1a1a1a`, cream `#f7f5f0`, amber `#e3a945`, slate `#4a5568`, teal `#2a9e76`, violet `#7a2eac`, rust `#b85c1a`. In practice only ink, cream, amber and slate carry the site; the other three are barely used.
- **Accent:** amber, as 3px top-borders on feature cards and as the eyebrow colour on dark sections.
- **Rhythm:** white sections alternating with cream bands and full-black reveals.
- **Layout:** 1120px content column, generous `clamp()` padding, 8px radii, 1px hairline borders.

The identity is decent and worth keeping. Its weakness is uniformity — nearly every section is a heading plus a paragraph plus one wide screenshot, so the page reads flat despite the strong type. More variety in section shape would do more than any change of colour.

---

## 9. Also worth knowing

Not a website issue, but it affects the launch: the build script currently gives the trial DMG and the paid DMG **the same filename**. If the wrong one reaches the wrong Payhip product, either paying customers get an app that expires after 30 days, or the trial link gives away the full version. This should be fixed before either file is uploaded.
