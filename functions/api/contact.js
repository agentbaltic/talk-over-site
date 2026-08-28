export async function onRequestPost({ request, env }) {
  const { name, email, topic, message } = await request.json();
  if (![name, email, topic, message].every(value => typeof value === 'string' && value.trim())) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM) {
    // Temporary: report which binding is missing so the cause is visible.
    // Presence only — no value is ever returned.
    return Response.json({
      error: 'Contact form is not configured.',
      has: { RESEND_API_KEY: Boolean(env.RESEND_API_KEY), CONTACT_FROM: Boolean(env.CONTACT_FROM) },
      keys: Object.keys(env)
    }, { status: 503 });
  }

  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: ['julep@agentbaltic.com'],
      reply_to: email.trim(),
      subject: `[TalkOver] ${topic.trim()} from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic.trim()}\n\n${message.trim()}`
    })
  });

  if (!result.ok) return Response.json({ error: 'Message delivery failed.' }, { status: 502 });
  return Response.json({ ok: true });
}
