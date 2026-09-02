// Serves a published disk image from the RELEASES_FILES bucket, on this
// domain, so the app's download link never points anywhere else.
const NAME = /^TalkOver-[0-9]+(\.[0-9]+)*\.dmg$/;

export async function onRequestGet({ params, env }) {
  const name = String(params.name || '');
  if (!NAME.test(name)) return new Response('Not found', { status: 404 });
  if (!env.RELEASES_FILES) return new Response('Downloads are not configured.', { status: 503 });
  const object = await env.RELEASES_FILES.get(name);
  if (!object) return new Response('Not found', { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/x-apple-diskimage',
      'Content-Length': String(object.size),
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
