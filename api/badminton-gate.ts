import { timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "bivobad1234!";

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  const len = Math.max(aBuf.length, bBuf.length, 1);
  const aPad = Buffer.alloc(len);
  const bPad = Buffer.alloc(len);
  aBuf.copy(aPad);
  bBuf.copy(bPad);
  return timingSafeEqual(aPad, bPad) && aBuf.length === bBuf.length;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const raw = req.body as Record<string, unknown> | undefined;
  const username = typeof raw?.username === "string" ? raw.username.trim() : "";
  const password = typeof raw?.password === "string" ? raw.password : "";

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  const expectedUser = (process.env.BADMINTON_GATE_USER?.trim() || DEFAULT_USER).toLowerCase();
  const expectedPassword = process.env.BADMINTON_GATE_PASSWORD || DEFAULT_PASSWORD;

  const userOk = safeEqual(username.toLowerCase(), expectedUser);
  const passOk = safeEqual(password, expectedPassword);

  if (!userOk || !passOk) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }

  return res.status(200).json({ success: true });
}
