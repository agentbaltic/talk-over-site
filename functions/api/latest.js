// What the app reads, once a day, when its reader has said yes: the newest
// version and where to download it. Published from /publish into KV; until
// something has been published, the checked-in talkover/latest.json answers.
export async function onRequestGet({ request, env }) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache'
  };
  if (env.RELEASES) {
    const published = await env.RELEASES.get('latest');
    if (published) return new Response(published, { headers });
  }
  const fallback = await env.ASSETS.fetch(new URL('/talkover/latest.json', request.url));
  if (!fallback.ok) return Response.json({ error: 'No version published.' }, { status: 404 });
  return new Response(await fallback.text(), { headers });
}
