import type { Package } from "@revenuecat/purchases-js";

export function stripePriceIdForPackage(pkg: Package): string | null {
  const priceId = pkg.webBillingProduct?.defaultPurchaseOption?.priceId;
  return priceId?.startsWith("price_") ? priceId : null;
}

export async function startStripeCheckoutWithPromo(params: {
  priceId: string;
  promoCode: string;
  email: string;
  appUserId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const response = await fetch("/api/stripe-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = (await response.json()) as {
    url?: string;
    message?: string;
    error?: string;
  };

  if (!response.ok || !data.url) {
    throw new Error(data.message || data.error || "No se pudo abrir Stripe");
  }

  return data.url;
}
