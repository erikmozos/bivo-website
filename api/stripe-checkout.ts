import type { VercelRequest, VercelResponse } from "@vercel/node";

const STRIPE_API = "https://api.stripe.com/v1";

function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function stripeForm(
  secret: string,
  path: string,
  params: URLSearchParams,
  method: "GET" | "POST" = "POST"
) {
  const url =
    method === "GET" && [...params.keys()].length
      ? `${STRIPE_API}${path}?${params.toString()}`
      : `${STRIPE_API}${path}`;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${secret}`,
      ...(method === "POST"
        ? { "Content-Type": "application/x-www-form-urlencoded" }
        : {}),
    },
    body: method === "POST" ? params : undefined,
  });

  const json = (await response.json()) as Record<string, unknown>;
  if (!response.ok) {
    const err = json.error as { message?: string } | undefined;
    throw new Error(err?.message || `Stripe ${response.status}`);
  }
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    return res.status(501).json({
      error: "missing_stripe_secret",
      message: "Falta STRIPE_SECRET_KEY en Vercel.",
    });
  }

  const raw = (req.body || {}) as Record<string, unknown>;
  const priceId = clean(raw.priceId, 80);
  const promoCode = clean(raw.promoCode, 32).toUpperCase();
  const email = clean(raw.email, 254).toLowerCase();
  const appUserId = clean(raw.appUserId, 128);
  const successUrl = clean(raw.successUrl, 500);
  const cancelUrl = clean(raw.cancelUrl, 500);

  if (!priceId.startsWith("price_")) {
    return res.status(400).json({ error: "priceId de Stripe no válido" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email no válido" });
  }
  if (!appUserId) {
    return res.status(400).json({ error: "Falta appUserId" });
  }
  if (!successUrl.startsWith("http") || !cancelUrl.startsWith("http")) {
    return res.status(400).json({ error: "URLs de retorno no válidas" });
  }

  try {
    let promotionCodeId = "";
    if (promoCode) {
      const listed = await stripeForm(
        secret,
        "/promotion_codes",
        new URLSearchParams({
          code: promoCode,
          active: "true",
          limit: "1",
        }),
        "GET"
      );
      const data = Array.isArray(listed.data) ? listed.data : [];
      const first = data[0] as { id?: string } | undefined;
      promotionCodeId = first?.id ?? "";
      if (!promotionCodeId) {
        return res.status(400).json({
          error: "unknown_promo",
          message: `Stripe no encuentra el código ${promoCode}.`,
        });
      }
    }

    const sessionParams = new URLSearchParams();
    sessionParams.set("mode", "subscription");
    sessionParams.set("customer_email", email);
    sessionParams.set("client_reference_id", appUserId);
    sessionParams.set("success_url", successUrl);
    sessionParams.set("cancel_url", cancelUrl);
    sessionParams.set("line_items[0][price]", priceId);
    sessionParams.set("line_items[0][quantity]", "1");
    sessionParams.set("subscription_data[metadata][app_user_id]", appUserId);
    sessionParams.set("metadata[app_user_id]", appUserId);
    sessionParams.set("locale", "es");
    if (promotionCodeId) {
      sessionParams.set("discounts[0][promotion_code]", promotionCodeId);
    } else {
      sessionParams.set("allow_promotion_codes", "true");
    }

    const session = await stripeForm(secret, "/checkout/sessions", sessionParams);
    const url = typeof session.url === "string" ? session.url : "";
    if (!url) {
      throw new Error("Stripe no devolvió URL de checkout");
    }

    return res.status(200).json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error de Stripe";
    return res.status(502).json({ error: "stripe_error", message });
  }
}
