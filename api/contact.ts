type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, company, message } = (req.body ?? {}) as ContactPayload;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Gabriel Molina Portfolio";
  const recipientEmail = process.env.CONTACT_TO_EMAIL || "g.molinabor@gmail.com";

  if (!apiKey || !senderEmail) {
    res.status(500).json({ error: "Brevo environment variables are missing" });
    return;
  }

  const emailHtml = `
    <h2>Nuevo mensaje desde la landing</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company || "No especificada")}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: recipientEmail,
          name: "Gabriel Molina",
        },
      ],
      replyTo: {
        email,
        name,
      },
      subject: `Nuevo contacto desde portfolio: ${name}`,
      htmlContent: emailHtml,
      textContent: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || "No especificada"}\n\nMensaje:\n${message}`,
    }),
  });

  if (!brevoResponse.ok) {
    const errorText = await brevoResponse.text();
    res.status(502).json({ error: "Brevo request failed", details: errorText });
    return;
  }

  const brevoPayload = await brevoResponse.json().catch(() => null);
  const messageId =
    brevoPayload && typeof brevoPayload === "object" && "messageId" in brevoPayload
      ? String((brevoPayload as { messageId?: string }).messageId)
      : null;

  console.log("Contact email accepted by Brevo", {
    recipientEmail,
    senderEmail,
    replyToEmail: email,
    messageId,
  });

  res.status(200).json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
