import type { Package } from "@revenuecat/purchases-js";

export type StripeCheckoutIds = {
  priceId: string | null;
  productId: string | null;
  interval: "month" | "year";
  intervalCount: number;
};

function collectIds(pkg: Package): string[] {
  const product = pkg.webBillingProduct;
  const options = Object.values(product?.subscriptionOptions ?? {});
  return [
    product?.identifier,
    product?.defaultPurchaseOption?.id,
    product?.defaultPurchaseOption?.priceId,
    product?.defaultSubscriptionOption?.id,
    product?.defaultSubscriptionOption?.priceId,
    ...Object.keys(product?.subscriptionOptions ?? {}),
    ...options.flatMap((option) => [option.id, option.priceId]),
  ].filter((id): id is string => Boolean(id));
}

export function stripeIdsForPackage(pkg: Package): StripeCheckoutIds {
  const ids = collectIds(pkg);
  const interval =
    pkg.identifier === "$rc_annual"
      ? { interval: "year" as const, intervalCount: 1 }
      : pkg.identifier === "$rc_three_month"
        ? { interval: "month" as const, intervalCount: 3 }
        : { interval: "month" as const, intervalCount: 1 };

  return {
    priceId: ids.find((id) => id.startsWith("price_")) ?? null,
    productId: ids.find((id) => id.startsWith("prod_")) ?? null,
    ...interval,
  };
}

export async function startStripeCheckoutWithPromo(params: {
  priceId?: string | null;
  productId?: string | null;
  interval: "month" | "year";
  intervalCount: number;
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
