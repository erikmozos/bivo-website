import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  addEmailsToAddressBook,
  SendPulseError,
} from "./_lib/sendpulse";

const MAX_TEXT = 200;
const MAX_EMAIL = 254;

function clean(value: unknown, max = MAX_TEXT): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\u2028\u2029]/g, " ")
    .trim()
    .slice(0, max);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const raw = (req.body || {}) as Record<string, unknown>;

  const nombre = clean(raw.nombre);
  const apellido = clean(raw.apellido);
  const email = clean(raw.email, MAX_EMAIL).toLowerCase();
  const telefono = clean(raw.telefono);
  const deporteRaqueta = clean(raw.deporteRaqueta);
  const aceptaPoliticas =
    raw.aceptaPoliticas === true || raw.aceptaPoliticas === "true";

  if (!nombre || !apellido || !email || !deporteRaqueta) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: "El correo electrónico no es válido" });
  }

  if (!aceptaPoliticas) {
    return res.status(400).json({
      error:
        "Debes aceptar la política de privacidad y los términos para registrarte",
    });
  }

  const addressbookId = process.env.SENDPULSE_ADDRESSBOOK_ID;
  if (!addressbookId) {
    console.error(
      "SENDPULSE_ADDRESSBOOK_ID no está configurado en las variables de entorno"
    );
    return res.status(500).json({
      error:
        "El servicio de registro no está configurado. Contacta con el administrador.",
    });
  }

  try {
    const result = await addEmailsToAddressBook(addressbookId, [
      {
        email,
        variables: {
          Nombre: nombre,
          Apellido: apellido,
          Telefono: telefono,
          Deporte: deporteRaqueta,
          AceptaPoliticas: aceptaPoliticas ? "Si" : "No",
          FechaRegistro: new Date().toISOString(),
          Origen: "Web bivotraining.com",
        },
      },
    ]);

    if (result?.result !== true) {
      console.warn("SendPulse devolvió result distinto de true:", result);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof SendPulseError) {
      console.error("SendPulse error en /api/register:", error.status, error.details);
      return res.status(502).json({
        error:
          "No pudimos guardar tu registro ahora mismo. Por favor, inténtalo de nuevo en unos minutos.",
      });
    }

    console.error("Error inesperado en /api/register:", error);
    return res.status(500).json({
      error: "Error interno al procesar el registro",
    });
  }
}
