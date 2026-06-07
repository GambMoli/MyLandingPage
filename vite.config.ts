import path from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "local-contact-api",
        configureServer(server) {
          server.middlewares.use("/api/contact", async (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(Buffer.from(chunk));
            }

            const rawBody = Buffer.concat(chunks).toString("utf8");
            const body = rawBody ? JSON.parse(rawBody) : {};
            const { name, email, company, message } = body;

            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Missing required fields" }));
              return;
            }

            const apiKey = env.BREVO_API_KEY;
            const senderEmail = env.BREVO_SENDER_EMAIL;
            const senderName = env.BREVO_SENDER_NAME || "Gabriel Molina Portfolio";
            const recipientEmail = env.CONTACT_TO_EMAIL || "g.molinabor@gmail.com";

            if (!apiKey || !senderEmail) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Brevo environment variables are missing" }));
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

            res.setHeader("Content-Type", "application/json");

            if (!brevoResponse.ok) {
              const errorText = await brevoResponse.text();
              res.statusCode = 502;
              res.end(JSON.stringify({ error: "Brevo request failed", details: errorText }));
              return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
