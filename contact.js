(() => {
  "use strict";

  // The design file drove this form through the prototyping runtime's own state.
  // Served as a static page there is no runtime, so the behaviour it described
  // is written out here: validate, send, and say what happened either way.

  const form = document.getElementById("contact-form");
  if (!form) return;

  const name = document.getElementById("contact-name");
  const email = document.getElementById("contact-email");
  const topic = document.getElementById("contact-topic");
  const message = document.getElementById("contact-message");
  const submit = document.getElementById("contact-submit");
  const status = document.getElementById("contact-status");

  const say = (text) => { status.textContent = text; };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      topic: topic.value,
      message: message.value.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      say("Please fill in your name, email, and message.");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    say("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));
      name.value = "";
      email.value = "";
      message.value = "";
      say("Thanks. Your message has been sent.");
    } catch (error) {
      say("Could not send your message just now. Please try again shortly.");
    } finally {
      submit.disabled = false;
      submit.textContent = "Send message";
    }
  });
})();
