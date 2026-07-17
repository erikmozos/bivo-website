import type { Package } from "@revenuecat/purchases-js";

let installed = false;

export type RcApiErrorDetails = {
  url: string;
  status: number;
  rawBody: string;
  parsedBody: unknown;
  requestBody: string | null;
  timestamp: number;
};

let lastError: RcApiErrorDetails | null = null;

export function getLastRevenueCatApiError(): RcApiErrorDetails | null {
  return lastError;
}

function parseBody(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

function parseRequestBody(init?: RequestInit): string | null {
  if (!init?.body) return null;
  if (typeof init.body === "string") return init.body;
  return String(init.body);
}

/** En dev, loguea el body de errores de api.revenuecat.com (p. ej. checkout/start 500). */
export function installRevenueCatFetchDiagnostics() {
  if (!import.meta.env.DEV || installed || typeof window === "undefined") return;
  installed = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await originalFetch(input, init);
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    if (url.includes("api.revenuecat.com/rcbilling") && !response.ok) {
      const rawBody = await response.clone().text();
      const parsedBody = parseBody(rawBody);
      const requestBody = parseRequestBody(init);

      const details: RcApiErrorDetails = {
        url,
        status: response.status,
        rawBody,
        parsedBody,
        requestBody,
        timestamp: Date.now(),
      };

      lastError = details;

      console.error("[RevenueCat API error] URL:", url);
      console.error("[RevenueCat API error] Status:", response.status);
      if (requestBody) console.error("[RevenueCat API error] Request:", requestBody);
      console.error("[RevenueCat API error] Response body:", rawBody || "(vacío)");
      if (parsedBody && typeof parsedBody === "object") {
        console.error("[RevenueCat API error] Parsed:", parsedBody);
      }

      window.dispatchEvent(new CustomEvent("rc-api-error", { detail: details }));
    }

    return response;
  };
}

export function logPackageDiagnostics(packages: Package[]) {
  if (!import.meta.env.DEV) return;

  console.group("[RevenueCat] Packages loaded");
  for (const pkg of packages) {
    const product = pkg.webBillingProduct ?? pkg.rcBillingProduct;
    const option = product?.defaultPurchaseOption;
    console.log(pkg.identifier, {
      productId: product?.identifier,
      priceId: option?.priceId,
      currency: product?.price?.currency ?? product?.currentPrice?.currency,
      productType: product?.productType,
      hasWebBillingProduct: Boolean(pkg.webBillingProduct),
    });
  }
  console.groupEnd();
}

export function formatRcApiErrorForUi(details: RcApiErrorDetails | null): string | null {
  if (!details) return null;

  const parsed = details.parsedBody;
  if (parsed && typeof parsed === "object" && parsed !== null) {
    const obj = parsed as Record<string, unknown>;
    const code = typeof obj.code === "number" ? obj.code : Number(obj.code);
    const message = String(obj.message ?? obj.error ?? "");

    if (code === 7773) {
      return `Error 7773 — Stripe no responde. Verifica que la API key (live strp_... / sandbox strp_sb_...) coincida con el entorno de los productos en RevenueCat. Producto: ${extractProductId(details.requestBody)}. Trace: ${extractTraceId(details.requestBody)}`;
    }

    if (code || message) {
      return [code ? `Error ${code}` : null, message].filter(Boolean).join(": ");
    }
  }

  if (details.rawBody) return details.rawBody.slice(0, 500);
  return `HTTP ${details.status} sin cuerpo — suele ser desajuste entre API key RevenueCat y entorno Stripe (live vs sandbox).`;
}

function extractProductId(requestBody: string | null): string {
  if (!requestBody) return "?";
  try {
    const parsed = JSON.parse(requestBody) as { product_id?: string };
    return parsed.product_id ?? "?";
  } catch {
    return "?";
  }
}

function extractTraceId(requestBody: string | null): string {
  if (!requestBody) return "?";
  try {
    const parsed = JSON.parse(requestBody) as { trace_id?: string };
    return parsed.trace_id ?? "?";
  } catch {
    return "?";
  }
}

export function assertWebBillingPackage(pkg: Package): void {
  const product = pkg.webBillingProduct;
  if (!product?.identifier) {
    throw new Error(
      "Este paquete no tiene producto Web Billing. En RevenueCat, los packages del offering deben usar productos web (no solo App Store / Play Store)."
    );
  }

  const priceId = product.defaultPurchaseOption?.priceId;
  if (!priceId) {
    throw new Error(
      `El producto "${product.identifier}" no tiene priceId. Revisa la configuración del producto en RevenueCat Web Billing.`
    );
  }
}
