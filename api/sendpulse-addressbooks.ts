import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createAddressBook,
  listAddressBooks,
  SendPulseError,
} from "./_lib/sendpulse";

// Endpoint administrativo para configurar la integración con SendPulse.
//
// GET  /api/sendpulse-addressbooks?secret=...
//      Devuelve la lista de libretas de la cuenta SendPulse.
//
// POST /api/sendpulse-addressbooks?secret=...
//      Body: { "name": "Bivo Leads Web" }
//      Crea una nueva libreta y devuelve su ID.
//
// Protegido por la variable de entorno SENDPULSE_ADMIN_SECRET.
// Si no está configurada, el endpoint queda deshabilitado.
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const adminSecret = process.env.SENDPULSE_ADMIN_SECRET;
  if (!adminSecret) {
    return res
      .status(503)
      .json({ error: "Endpoint deshabilitado: define SENDPULSE_ADMIN_SECRET" });
  }

  const provided =
    (typeof req.query.secret === "string" ? req.query.secret : "") ||
    (req.headers["x-admin-secret"] as string | undefined) ||
    "";

  if (provided !== adminSecret) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    if (req.method === "GET") {
      const books = await listAddressBooks();
      return res.status(200).json({
        success: true,
        addressbooks: books.map((b) => ({
          id: b.id,
          name: b.name,
          emails: b.all_email_qty ?? 0,
        })),
      });
    }

    if (req.method === "POST") {
      const raw = (req.body || {}) as Record<string, unknown>;
      const name =
        typeof raw.name === "string" ? raw.name.trim().slice(0, 120) : "";
      if (!name) {
        return res
          .status(400)
          .json({ error: "Debes incluir 'name' en el body" });
      }

      const created = await createAddressBook(name);
      return res.status(201).json({
        success: true,
        addressbook: { id: created.id, name },
        envExample: `SENDPULSE_ADDRESSBOOK_ID=${created.id}`,
      });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    if (error instanceof SendPulseError) {
      console.error("SendPulse admin error:", error.status, error.details);
      return res
        .status(502)
        .json({ error: "SendPulse respondió con error", details: error.details });
    }

    console.error("Error inesperado en sendpulse-addressbooks:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}
