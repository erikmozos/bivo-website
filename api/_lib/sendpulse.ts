// Helper de SendPulse compartido entre endpoints de /api.
// IMPORTANTE: este archivo está dentro de api/_lib/ y NO debe ser publicado
// como serverless function. Vercel ignora los archivos cuyo directorio
// empieza por "_" al rutear /api.

const SENDPULSE_BASE = "https://api.sendpulse.com";

type Token = { access_token: string; expires_at: number };

// Cache en memoria a nivel de proceso. En serverless puede vivir entre
// invocaciones cuando se reutiliza la misma instancia.
let cachedToken: Token | null = null;

export class SendPulseError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "SendPulseError";
    this.status = status;
    this.details = details;
  }
}

export function getSendPulseConfig() {
  const clientId = process.env.SENDPULSE_CLIENT_ID;
  const clientSecret = process.env.SENDPULSE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new SendPulseError(
      "Credenciales de SendPulse no configuradas",
      500,
      { hasClientId: !!clientId, hasClientSecret: !!clientSecret }
    );
  }

  return { clientId, clientSecret };
}

export async function getSendPulseToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expires_at - 60_000 > now) {
    return cachedToken.access_token;
  }

  const { clientId, clientSecret } = getSendPulseConfig();

  const res = await fetch(`${SENDPULSE_BASE}/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    throw new SendPulseError(
      "No se pudo obtener token de SendPulse",
      res.status,
      data
    );
  }

  const expiresIn = typeof data.expires_in === "number" ? data.expires_in : 3600;
  cachedToken = {
    access_token: data.access_token,
    expires_at: now + expiresIn * 1000,
  };

  return data.access_token;
}

async function spFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = await getSendPulseToken();
  const res = await fetch(`${SENDPULSE_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    throw new SendPulseError(
      `SendPulse respondió ${res.status} en ${path}`,
      res.status,
      data
    );
  }

  return data as T;
}

export type AddressBook = {
  id: number;
  name: string;
  all_email_qty?: number;
  status?: number;
};

export function listAddressBooks(): Promise<AddressBook[]> {
  return spFetch<AddressBook[]>("/addressbooks");
}

export function createAddressBook(name: string): Promise<{ id: number }> {
  return spFetch<{ id: number }>("/addressbooks", {
    method: "POST",
    body: JSON.stringify({ bookName: name }),
  });
}

export type EmailVariables = Record<string, string | number | boolean | undefined>;

export type ContactToAdd = {
  email: string;
  variables?: EmailVariables;
};

export function addEmailsToAddressBook(
  addressbookId: number | string,
  contacts: ContactToAdd[]
): Promise<{ result?: boolean }> {
  return spFetch<{ result?: boolean }>(
    `/addressbooks/${addressbookId}/emails`,
    {
      method: "POST",
      body: JSON.stringify({ emails: contacts }),
    }
  );
}
