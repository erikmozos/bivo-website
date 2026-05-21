import type { VercelRequest, VercelResponse } from "@vercel/node";
// Importamos con extensión `.js` porque Vercel ejecuta las funciones como
// ESM (Node >=18) y la resolución sin extensión falla en runtime
// (ERR_MODULE_NOT_FOUND). TypeScript resuelve este `.js` al `.ts` real.
import {
  addEmailsToAddressBook,
  SendPulseError,
} from "./_lib/sendpulse.js";

const MAX_TEXT = 200;
const MAX_EMAIL = 254;
const MAX_LIST = 500;

function clean(value: unknown, max = MAX_TEXT): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\u2028\u2029]/g, " ")
    .trim()
    .slice(0, max);
}

function cleanList(value: unknown, max = MAX_LIST): string {
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v : ""))
      .map((v) => v.replace(/[\r\n\u2028\u2029]/g, " ").trim())
      .filter(Boolean)
      .join(", ")
      .slice(0, max);
  }
  return clean(value, max);
}

function toBool(value: unknown): boolean {
  return value === true || value === "true";
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
  // Aceptamos tanto `deporteRaqueta` (clave histórica del endpoint) como
  // `deportePrincipal` (clave usada por el payload de Google Sheets).
  const deporteRaqueta =
    clean(raw.deporteRaqueta) || clean(raw.deportePrincipal);
  const aceptaPoliticas = toBool(raw.aceptaPoliticas);

  // Resto de campos del payload "Google Doc" para guardarlos también en
  // SendPulse con los mismos nombres y mantener la información alineada.
  const sexo = clean(raw.sexo);
  const edad = clean(raw.edad, 20);
  const otrosDeportes = cleanList(raw.otrosDeportes);
  const frecuencia = clean(raw.frecuencia);
  const preparacionFisica = clean(raw.preparacionFisica);
  const tipoPrepFisica = clean(raw.tipoPrepFisica);
  const materialEnCasa = clean(raw.materialEnCasa);
  const tipoEntrenamiento = cleanList(raw.tipoEntrenamiento);
  const horarioPreferido = clean(raw.horarioPreferido);
  const nivelExperiencia = clean(raw.nivelExperiencia);
  const clubActual = clean(raw.clubActual);
  const comoNosConocio = clean(raw.comoNosConocio);
  const aceptaMarketing = toBool(raw.aceptaMarketing);
  const aceptaTerminos = toBool(raw.aceptaTerminos);

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

  const variables = {
    // Mismas variables/columnas que mandamos al Google Doc, para
    // que la información en SendPulse quede igual.
    deportePrincipal: deporteRaqueta,
    nombre,
    apellido,
    telefono,
    sexo,
    edad,
    otrosDeportes,
    frecuencia,
    preparacionFisica,
    tipoPrepFisica,
    materialEnCasa,
    tipoEntrenamiento,
    horarioPreferido,
    nivelExperiencia,
    clubActual,
    comoNosConocio,
    aceptaMarketing: (aceptaMarketing || aceptaPoliticas) ? "Sí" : "No",
    aceptaTerminos: (aceptaTerminos || aceptaPoliticas) ? "Sí" : "No",
    // Metadatos útiles que ya teníamos.
    FechaRegistro: new Date().toISOString(),
    Origen: "Web bivotraining.com",
  };

  console.log("[SendPulse] Enviando contacto al address book", addressbookId, {
    email,
    variables,
  });

  try {
    const result = await addEmailsToAddressBook(addressbookId, [
      { email, variables },
    ]);

    console.log("[SendPulse] Respuesta de la API:", result);

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
