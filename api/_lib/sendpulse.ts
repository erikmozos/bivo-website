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

export type EmailContact = { name?: string; email: string };

export type SendTemplateEmailParams = {
  templateId: number | string;
  subject: string;
  from: EmailContact;
  to: EmailContact[];
  variables?: EmailVariables;
  replyTo?: EmailContact;
};

// Envía un email transaccional usando una plantilla almacenada en SendPulse.
// Las variables se sustituyen en la plantilla (sintaxis {{nombre}}).
export function sendTemplateEmail(
  params: SendTemplateEmailParams
): Promise<{ result?: boolean; id?: string }> {
  const { templateId, subject, from, to, variables, replyTo } = params;

  const email: Record<string, unknown> = {
    subject,
    template: {
      id: Number(templateId),
      ...(variables ? { variables } : {}),
    },
    from,
    to,
  };

  if (replyTo) {
    email.reply_to = replyTo;
  }

  return spFetch<{ result?: boolean; id?: string }>("/smtp/emails", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export type LifecycleEmailType = "welcome" | "onboarding";
export type LifecycleLang = "es" | "en";

// Plantillas reales de la cuenta SendPulse de Bivo (SMTP → Templates).
// Se pueden sobreescribir por env sin redeployar código.
const DEFAULT_TEMPLATES: Record<LifecycleEmailType, Record<LifecycleLang, string>> = {
  welcome: { es: "94006", en: "94686" },
  onboarding: { es: "94006", en: "94686" },
};

const DEFAULT_SUBJECTS: Record<LifecycleEmailType, Record<LifecycleLang, string>> = {
  welcome: {
    es: "Bienvenid@ a Bivo",
    en: "Welcome to Bivo!",
  },
  onboarding: {
    es: "¡Ya está todo listo! Tu plan te está esperando",
    en: "Everything is ready! Your plan is waiting",
  },
};

function envTemplateId(type: LifecycleEmailType, lang: LifecycleLang): string {
  const envKey =
    type === "welcome"
      ? lang === "en"
        ? "SENDPULSE_WELCOME_TEMPLATE_ID_EN"
        : "SENDPULSE_WELCOME_TEMPLATE_ID_ES"
      : lang === "en"
        ? "SENDPULSE_ONBOARDING_TEMPLATE_ID_EN"
        : "SENDPULSE_ONBOARDING_TEMPLATE_ID_ES";

  const fromEnv = process.env[envKey]?.trim();
  if (fromEnv) return fromEnv;

  if (type === "welcome") {
    const legacy = process.env.SENDPULSE_WELCOME_TEMPLATE_ID?.trim();
    if (legacy) return legacy;
  }

  return DEFAULT_TEMPLATES[type][lang];
}

export async function sendLifecycleEmail(params: {
  type: LifecycleEmailType;
  lang: LifecycleLang;
  email: string;
  nombre?: string;
}): Promise<{ result?: boolean; id?: string } | null> {
  const { type, lang, email } = params;
  const nombre = params.nombre?.trim() || "";
  const templateId = envTemplateId(type, lang);
  if (!templateId) return null;

  const fromEmail = process.env.SENDPULSE_FROM_EMAIL;
  if (!fromEmail) {
    console.warn("No se envía email de ciclo de vida: SENDPULSE_FROM_EMAIL no configurado");
    return null;
  }

  const fromName = process.env.SENDPULSE_FROM_NAME?.trim() || "Bivo Training";
  const subject = DEFAULT_SUBJECTS[type][lang];

  return sendTemplateEmail({
    templateId,
    subject,
    from: { name: fromName, email: fromEmail },
    to: [{ name: nombre || email, email }],
    variables: {
      nombre: nombre || email.split("@")[0],
      email,
      lang,
    },
  });
}
