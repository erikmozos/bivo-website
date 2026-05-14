import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_NOMBRE = 200;
const MAX_EMAIL = 254;
const MAX_MENSAJE = 8000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHeaderInjection(s: string): string {
  return s.replace(/[\r\n\u2028\u2029]/g, " ").trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const raw = req.body as Record<string, unknown> | undefined;
  const nombre =
    typeof raw?.nombre === "string" ? stripHeaderInjection(raw.nombre).slice(0, MAX_NOMBRE) : "";
  const email =
    typeof raw?.email === "string" ? raw.email.trim().slice(0, MAX_EMAIL) : "";
  const mensaje =
    typeof raw?.mensaje === "string" ? raw.mensaje.slice(0, MAX_MENSAJE) : "";

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: "El correo electrónico no es válido" });
  }

  const clientId = process.env.SENDPULSE_CLIENT_ID;
  const clientSecret = process.env.SENDPULSE_CLIENT_SECRET;
  const fromEmail = process.env.SENDPULSE_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || "hello@bivotraining.com";
  const fromName = process.env.SENDPULSE_FROM_NAME?.trim() || "Web Bivo Training";

  if (!clientId || !clientSecret || !fromEmail) {
    console.error("SendPulse env vars not configured");
    return res.status(500).json({ error: "El servicio de email no está configurado" });
  }

  try {
    const tokenRes = await fetch("https://api.sendpulse.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = (await tokenRes.json()) as { access_token?: string };

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("SendPulse token error:", tokenRes.status, tokenData);
      throw new Error("token");
    }

    const nombreEsc = escapeHtml(nombre);
    const emailEsc = escapeHtml(email);
    const mensajeEsc = escapeHtml(mensaje).replace(/\n/g, "<br>");
    const subject = stripHeaderInjection(`Nuevo mensaje de contacto de ${nombre}`).slice(0, 250);

    const htmlRaw = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${nombreEsc}</p>
      <p><strong>Email:</strong> <a href="mailto:${encodeURIComponent(email)}">${emailEsc}</a></p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensajeEsc}</p>
    `.trim();

    const html = Buffer.from(htmlRaw, "utf8").toString("base64");
    const text = `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`;

    const emailRes = await fetch("https://api.sendpulse.com/smtp/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        email: {
          html,
          text,
          subject,
          from: {
            name: fromName,
            email: fromEmail,
          },
          to: [
            {
              name: "Bivo Training",
              email: toEmail,
            },
          ],
          reply_to: {
            name: nombre,
            email,
          },
        },
      }),
    });

    const emailPayload = (await emailRes.json()) as { result?: boolean };

    if (!emailRes.ok || emailPayload.result !== true) {
      console.error("SendPulse send error:", emailRes.status, emailPayload);
      throw new Error("send");
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({
      error: "No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
    });
  }
}
