// The publish tool's back end. A password (PUBLISH_TOKEN), a version, and
// either a build (a .dmg, or a .zip holding the disk image and the update
// notes, stored in the RELEASES_FILES bucket) or a download address. The
// result is written to the RELEASES store as "latest", which /api/latest
// serves to the app and the download page.
const VERSION = /^[0-9]+(\.[0-9]+)*$/;
const TYPES = { dmg: 'application/x-apple-diskimage', zip: 'application/zip' };

// A zip starts with "PK"; a disk image ends with a 512-byte "koly" trailer.
// Suffix alone let arbitrary bytes be published under the build's name.
async function looksLikeABuild(file, extension) {
  if (file.size < 512) return false;
  if (extension === 'zip') {
    const head = new Uint8Array(await file.slice(0, 2).arrayBuffer());
    return head[0] === 0x50 && head[1] === 0x4b;
  }
  const trailer = new Uint8Array(await file.slice(file.size - 512, file.size - 508).arrayBuffer());
  return trailer[0] === 0x6b && trailer[1] === 0x6f && trailer[2] === 0x6c && trailer[3] === 0x79;
}

// The version comes from inside the file, never from its name or the form:
// a TalkOver disk image (from 1.0.4.36) carries "TalkOverVersion x.y.z.n" in
// the property list its koly trailer points at; a zip is searched for the
// disk image's entry name in its central directory.
const STAMP = /TalkOverVersion ([0-9]+(?:\.[0-9]+)*)/;
const ZIP_ENTRY = /TalkOver-([0-9]+(?:\.[0-9]+)+)[^\/\\"]*\.dmg/;

async function versionInside(file, extension) {
  if (extension === 'dmg') {
    const koly = new DataView(await file.slice(file.size - 512, file.size).arrayBuffer());
    const offset = Number(koly.getBigUint64(216));
    const length = Number(koly.getBigUint64(224));
    if (!length || offset + length > file.size || length > 64 * 1024 * 1024) return null;
    const xml = new TextDecoder().decode(await file.slice(offset, offset + length).arrayBuffer());
    const found = STAMP.exec(xml);
    return found ? found[1] : null;
  }
  const tail = new TextDecoder('latin1').decode(await file.slice(Math.max(0, file.size - 1024 * 1024), file.size).arrayBuffer());
  const found = ZIP_ENTRY.exec(tail);
  return found ? found[1] : null;
}

export async function onRequestPost({ request, env }) {
  if (!env.PUBLISH_TOKEN) return Response.json({ error: 'Publishing is not configured: set PUBLISH_TOKEN.' }, { status: 503 });
  if (!env.RELEASES) return Response.json({ error: 'Publishing is not configured: bind the RELEASES store.' }, { status: 503 });
  const form = await request.formData();
  const token = String(form.get('token') || '');
  if (token !== env.PUBLISH_TOKEN) return Response.json({ error: 'Wrong publish password.' }, { status: 401 });
  const typed = String(form.get('version') || '').trim();
  if (typed && !VERSION.test(typed)) return Response.json({ error: 'Version must look like 1.0.5.1.' }, { status: 400 });
  let version = typed;
  const notes = String(form.get('notes') || '').trim().slice(0, 200);
  const file = form.get('file');
  let url = String(form.get('url') || '').trim();
  let source = 'typed';
  if (file && typeof file === 'object' && file.size > 0) {
    if (!env.RELEASES_FILES) return Response.json({ error: 'Uploads are not configured: bind the RELEASES_FILES bucket, or give a download address.' }, { status: 503 });
    // The browser's accept list is a hint, not a check: a wrong click on a
    // notes file must not become "the new TalkOver" for every customer.
    const match = /\.(dmg|zip)$/i.exec(String(file.name || ''));
    if (!match) return Response.json({ error: 'The build must be a .dmg or a .zip.' }, { status: 400 });
    const extension = match[1].toLowerCase();
    if (!(await looksLikeABuild(file, extension))) {
      return Response.json({ error: `That file is not a ${extension === 'zip' ? 'zip' : 'disk image'}.` }, { status: 400 });
    }
    const inside = await versionInside(file, extension);
    if (inside) {
      if (typed && typed !== inside) {
        return Response.json({ error: `The file says it is version ${inside}, not ${typed}. The file is right; leave the version empty or type ${inside}.` }, { status: 400 });
      }
      version = inside;
      source = 'file';
    } else if (!typed) {
      return Response.json({ error: 'This file carries no version stamp (built before 1.0.4.36). Type its version, exactly.' }, { status: 400 });
    }
    const name = `TalkOver-${version}.${extension}`;
    await env.RELEASES_FILES.put(name, file.stream(), {
      httpMetadata: { contentType: TYPES[extension] },
      customMetadata: { version, published: new Date().toISOString() }
    });
    url = new URL(`/api/download/${name}`, request.url).toString();
  }
  if (!/^https:\/\//.test(url)) return Response.json({ error: 'Give a disk image or zip to upload, or an https download address.' }, { status: 400 });
  if (!version) return Response.json({ error: 'With a download address, type the version.' }, { status: 400 });
  const latest = { version, url, notes, published: new Date().toISOString() };
  await env.RELEASES.put('latest', JSON.stringify(latest));
  return Response.json({ ...latest, version_from: source });
}
