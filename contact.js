const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = 'Sending...';
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!response.ok) throw new Error('Message delivery failed');
    form.reset();
    status.textContent = 'Thanks. Your message has been sent.';
  } catch {
    status.textContent = 'We could not send your message just now. Please try again shortly.';
  } finally {
    button.disabled = false;
  }
});
