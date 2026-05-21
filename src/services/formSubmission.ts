import { FormData } from "../components/form/RegistrationForm";

// Google Apps Script Web App URL (mantenemos el destino existente).
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxjYF7iacx0r_bY1bKh1mGcqqmxs5yaYG37YYkBik4ROUeRsQpEktC3Hlo40FUQHVI5sg/exec";

// Payload "fuente de la verdad" del lead. Se usa tanto para Google Sheets
// como para SendPulse, así la información se guarda de la misma forma en
// ambos destinos.
function buildLeadPayload(formData: FormData) {
  return {
    deportePrincipal: formData.deporteRaqueta || "",
    nombre: formData.nombre || "",
    apellido: formData.apellido || "",
    email: formData.email || "",
    telefono: formData.telefono || "",
    // Campos no presentes en el formulario actual, los enviamos vacíos para
    // mantener compatibilidad con la hoja de cálculo existente y para que
    // SendPulse también tenga las mismas columnas/variables.
    sexo: "",
    edad: "",
    otrosDeportes: [] as string[],
    frecuencia: "",
    preparacionFisica: "",
    tipoPrepFisica: "",
    materialEnCasa: "",
    tipoEntrenamiento: [] as string[],
    horarioPreferido: "",
    nivelExperiencia: "",
    clubActual: "",
    comoNosConocio: "",
    aceptaMarketing: formData.aceptaPoliticas ?? false,
    aceptaTerminos: formData.aceptaPoliticas ?? false,
  };
}

function isProductionHost(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.location.hostname.includes("vercel.app") ||
    !window.location.hostname.includes("localhost")
  );
}

async function sendToGoogleSheets(formData: FormData): Promise<boolean> {
  const payload = buildLeadPayload(formData);

  try {
    if (isProductionHost()) {
      // En producción usamos no-cors directamente para evitar errores CORS.
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      return true;
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      return result.result === "success";
    } catch {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      return true;
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
}

async function sendToSendPulse(formData: FormData): Promise<boolean> {
  try {
    // Mandamos a SendPulse exactamente la misma información que a Google
    // Sheets (mismo payload), para que las variables del contacto en
    // SendPulse reflejen las columnas del Google Doc.
    const payload = {
      ...buildLeadPayload(formData),
      // Mantenemos también la clave usada anteriormente por el endpoint
      // para no romper compatibilidad y validar el deporte obligatorio.
      deporteRaqueta: formData.deporteRaqueta || "",
      aceptaPoliticas: formData.aceptaPoliticas ?? false,
    };

    console.log("[SendPulse] Enviando datos a /api/register:", payload);
    console.table(payload);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
    };

    if (!response.ok || !data.success) {
      console.warn(
        "[SendPulse] Registro fallido:",
        response.status,
        data.error || data
      );
      return false;
    }

    console.log("[SendPulse] Registro guardado correctamente.");
    return true;
  } catch (error) {
    console.error("[SendPulse] Error al enviar:", error);
    return false;
  }
}

// Envío principal del formulario de registro.
// Lanza ambas integraciones en paralelo. Devolvemos `true` si al menos
// una de las dos consigue guardar el lead, para no perder registros
// si SendPulse no está configurado todavía.
export async function submitToGoogleSheets(formData: FormData) {
  const [sheetsOk, sendpulseOk] = await Promise.all([
    sendToGoogleSheets(formData),
    sendToSendPulse(formData),
  ]);

  if (!sheetsOk && !sendpulseOk) {
    return false;
  }

  if (!sheetsOk) {
    console.warn("Lead guardado solo en SendPulse: fallo en Google Sheets.");
  }
  if (!sendpulseOk) {
    console.warn(
      "Lead guardado solo en Google Sheets: fallo en SendPulse (¿falta SENDPULSE_ADDRESSBOOK_ID?)."
    );
  }

  return true;
}

// Alias para retrocompatibilidad.
export async function submitFormToGoogleSheets(formData: FormData) {
  return submitToGoogleSheets(formData);
}
