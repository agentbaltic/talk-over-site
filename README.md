# Talk Over Website

Static product website for Talk Over, ready to deploy to Cloudflare Pages.

## Start Here

Open `editorial.html` for the main landing page. `index.html` redirects visitors there.

For a local preview on this Mac, the current address is:

`http://127.0.0.1:4174/`

Other devices on the same local network can use:

`http://192.168.68.100:4174/`

## Pages

- `editorial.html` - main landing page
- `features.html` - detailed product features, including Floating Prompt and Camera Take
- `installation.html` - Installation & Use guide, requirements, and annotated app screenshots
- `about.html` - founder story and YouTube channel links
- `contact.html` - support and feature-request form
- `installer-readme/README.html` - one-page styled installer Read Me
- `installer-readme/README.md` - plain-text installer Read Me

## Design and Assets

- `styles.css` - all shared visual design and responsive layout rules
- `assets/` - product visuals and site imagery
- `assets/screenshots/` - app screenshots used by the Features and Installation & Use pages

The current Floating Prompt conferencing screenshot is:

`assets/screenshots/09-floating-prompt-conferencing.png`

The Installation & Use page includes the provided app screens. The original Floating Prompt control image remains in the folder; the conferencing image is the one used on the Features page.

## Trial and Purchase Links

- Free trial: `https://resources.agentbaltic.com/b/UlS6B`
- Full version: `https://resources.agentbaltic.com/b/uxIl4`

These links are already wired into the navigation and purchase calls to action.

## Contact Form

`contact.html` uses `contact.js` to send submissions to the Cloudflare Pages Function at `functions/api/contact.js`.

Before deployment, add these two environment variables in the Cloudflare Pages project:

```text
RESEND_API_KEY=your Resend API key
CONTACT_FROM=Talk Over <support@agentbaltic.com>
```

`CONTACT_FROM` must be an email address or domain verified with Resend. Form messages are delivered to `julep@agentbaltic.com`, with the sender's email set as the reply address.

## Deploy to Cloudflare Pages

1. Create a new Cloudflare Pages project from this folder or its Git repository.
2. Use the project root as the build/output directory. There is no build step.
3. Add the two contact-form environment variables above.
4. Deploy.

Cloudflare automatically recognizes the `functions/api/contact.js` file and makes it available at `/api/contact`.

## Editing Content

Site copy is written directly in the page files. The shared layout and colors are in `styles.css`.

The most commonly updated places are:

- Hero and four feature blocks: `editorial.html`
- Long-form feature copy: `features.html`
- Installation instructions and screenshot captions: `installation.html`
- Founder story: `about.html`
- Support form wording: `contact.html`

## Product Facts Used on the Site

- Talk Over is for Apple Silicon Macs running macOS 11 or later; macOS 13 or later is recommended.
- It supports voice-following, timed scrolling, and manual reading controls.
- Scripts, voice recognition, and recordings stay on the user's Mac.
- The product is a one-time, single-Mac purchase with Version 1.x updates included.
- Version 1 customers receive an upgrade discount when Version 2 is released.
