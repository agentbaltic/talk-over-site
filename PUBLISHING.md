# Publishing a new version

Open **https://talkoverapp.com/publish**, enter the publish password, the
version (for example `1.0.5.1`), what changed, and pick the build: the disk
image, or a **.zip** holding the disk image and the update notes. Press
Publish. Within a minute:

- `https://talkoverapp.com/api/latest` answers with the new version and its
  download address, which the app reads (only when its reader has turned on
  automatic checks) and shows as "TalkOver 1.0.5.1 is available".
- `https://talkoverapp.com/download` shows the same, for anyone checking by hand.
- The build is served from `https://talkoverapp.com/api/download/TalkOver-1.0.5.1.dmg`
  (or `.zip`, matching what was uploaded).

The app (from 1.0.4.26) downloads that file itself: a reader who presses
Download New Version is asked where to save it, and the file lands there. Only
a `.dmg` or `.zip` address is downloaded; any other address (a store page, the
download page) is opened in their browser instead.

A downloaded copy of the full app cannot run until it is activated with a
licence key, so the download can be public.

## One-time setup in the Cloudflare dashboard (Pages project → Settings)

**Done on 2 September 2026:** R2 subscribed (free tier), KV namespace
`talkover-releases` bound as `RELEASES`, R2 bucket `talkover-releases` bound as
`RELEASES_FILES`, secret `PUBLISH_TOKEN` set, site redeployed. A wrong password on
`/api/publish` answers 401, which proves all three are live. Kept below for the
day this has to be rebuilt.


1. **KV namespace**, bound to the project as `RELEASES`. Holds the published
   version. Until one is published, `talkover/latest.json` in this repo answers.
2. **R2 bucket**, bound as `RELEASES_FILES`. Holds the disk images. Without this
   binding, Publish still works with a download address typed in (for example
   a Payhip product page) instead of a file.
3. **Environment variable (secret)** `PUBLISH_TOKEN`: the publish password.
   Choose a long one; nothing but the publish page ever uses it.

Redeploy after adding bindings. The publish page is not linked from the site
and carries `noindex`.
