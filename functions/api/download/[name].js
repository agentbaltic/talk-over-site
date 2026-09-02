// Serves a published build (a disk image, or a zip with the notes inside)
// from the RELEASES_FILES bucket, on this domain, so the app's download link
// never points anywhere else.
const NAME = /^TalkOver-[0-9]+(\.[0-9]+)*\.(dmg|zip)$/;
const TYPES = { dmg: 'application/x-apple-diskimage', zip: 'application/zip' };

export async function onRequestGet({ params, env }) {
  const name = String(params.name || '');
  if (!NAME.test(name)) return new Response('Not found', { status: 404 });
  if (!env.RELEASES_FILES) return new Response('Downloads are not configured.', { status: 503 });
  const object = await env.RELEASES_FILES.get(name);
  if (!object) return new Response('Not found', { status: 404 });
  const extension = name.slice(name.lastIndexOf('.') + 1);
  return new Response(object.body, {
    headers: {
      'Content-Type': TYPES[extension],
      'Content-Length': String(object.size),
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
