import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyFirebaseIdToken } from "./_lib/firebaseAuth.js";
import {
  SendPulseError,
  sendLifecycleEmail,
  type LifecycleEmailType,
  type LifecycleLang,
} from "./_lib/sendpulse.js";

function readBearer(req: VercelRequest): string {
  const header = req.headers.authorization;
  if (typeof header === "string" && header.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }
  return "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const verified = await verifyFirebaseIdToken(readBearer(req));
  if (!verified) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const raw = (req.body || {}) as Record<string, unknown>;
  const type = raw.type === "onboarding" ? "onboarding" : "welcome";
  const lifecycleType = type as LifecycleEmailType;
  const lang: LifecycleLang = raw.lang === "en" ? "en" : "es";
  const nombre =
    typeof raw.nombre === "string"
      ? raw.nombre.replace(/[\r\n\u2028\u2029]/g, " ").trim().slice(0, 200)
      : "";

  try {
    const result = await sendLifecycleEmail({
      type: lifecycleType,
      lang,
      email: verified.email,
      nombre,
    });

    if (result && result.result !== true) {
      console.warn("SendPulse lifecycle email result:", lifecycleType, result);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof SendPulseError) {
      console.error(
        "SendPulse error en /api/app-email:",
        lifecycleType,
        error.status,
        error.details
      );
      return res.status(502).json({ error: "No se pudo enviar el email" });
    }

    console.error("Error inesperado en /api/app-email:", error);
    return res.status(500).json({ error: "Error interno al enviar el email" });
  }
}
