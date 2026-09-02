// The publish tool's back end. A password (PUBLISH_TOKEN), a version, and
// either a disk image (stored in the RELEASES_FILES bucket) or a download
// address. The result is written to the RELEASES store as "latest", which
// /api/latest serves to the app and the download page.
const VERSION = /^[0-9]+(\.[0-9]+)*$/;

export async function onRequestPost({ request, env }) {
  if (!env.PUBLISH_TOKEN) return Response.json({ error: 'Publishing is not configured: set PUBLISH_TOKEN.' }, { status: 503 });
  if (!env.RELEASES) return Response.json({ error: 'Publishing is not configured: bind the RELEASES store.' }, { status: 503 });
  const form = await request.formData();
  const token = String(form.get('token') || '');
  if (token !== env.PUBLISH_TOKEN) return Response.json({ error: 'Wrong publish password.' }, { status: 401 });
  const version = String(form.get('version') || '').trim();
  if (!VERSION.test(version)) return Response.json({ error: 'Version must look like 1.0.5.1.' }, { status: 400 });
  const notes = String(form.get('notes') || '').trim().slice(0, 200);
  const file = form.get('file');
  let url = String(form.get('url') || '').trim();
  if (file && typeof file === 'object' && file.size > 0) {
    if (!env.RELEASES_FILES) return Response.json({ error: 'Uploads are not configured: bind the RELEASES_FILES bucket, or give a download address.' }, { status: 503 });
    const name = `TalkOver-${version}.dmg`;
    await env.RELEASES_FILES.put(name, file.stream(), {
      httpMetadata: { contentType: 'application/x-apple-diskimage' },
      customMetadata: { version, published: new Date().toISOString() }
    });
    url = new URL(`/api/download/${name}`, request.url).toString();
  }
  if (!/^https:\/\//.test(url)) return Response.json({ error: 'Give a disk image to upload, or an https download address.' }, { status: 400 });
  const latest = { version, url, notes, published: new Date().toISOString() };
  await env.RELEASES.put('latest', JSON.stringify(latest));
  return Response.json(latest);
}
