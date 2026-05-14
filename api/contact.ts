export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, mensaje } = req.body ?? {};

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const clientId = process.env.SENDPULSE_CLIENT_ID;
  const clientSecret = process.env.SENDPULSE_CLIENT_SECRET;
  const fromEmail = process.env.SENDPULSE_FROM_EMAIL;

  if (!clientId || !clientSecret || !fromEmail) {
    console.error("SendPulse env vars not configured");
    return res.status(500).json({ error: "El servicio de email no está configurado" });
  }

  try {
    // 1. Obtener token OAuth de SendPulse
    const tokenRes = await fetch("https://api.sendpulse.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenRes.json() as { access_token?: string };

    if (!tokenData.access_token) {
      throw new Error("No se pudo obtener el token de SendPulse");
    }

    // 2. Enviar el email via SMTP API de SendPulse
    const emailRes = await fetch("https://api.sendpulse.com/smtp/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        email: {
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Mensaje:</strong></p>
            <p>${mensaje.replace(/\n/g, "<br>")}</p>
          `,
          text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
          subject: `Nuevo mensaje de contacto de ${nombre}`,
          from: {
            name: "Web Bivo Training",
            email: fromEmail,
          },
          to: [
            {
              name: "Bivo Training",
              email: "hello@bivotraining.com",
            },
          ],
        },
      }),
    });

    if (!emailRes.ok) {
      const errorData = await emailRes.json();
      throw new Error(JSON.stringify(errorData));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email via SendPulse:", error);
    return res.status(500).json({ error: "No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo más tarde." });
  }
}
