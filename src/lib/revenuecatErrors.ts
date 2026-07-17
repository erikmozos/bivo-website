import { PurchasesError } from "@revenuecat/purchases-js";

/** Mensajes accionables para códigos backend de RevenueCat Web Billing */
const BACKEND_ERROR_HINTS: Record<number, string> = {
  7110: "Error interno de RevenueCat. Suele indicar Stripe mal conectado o productos Web Billing mal configurados.",
  7773: "Error del gateway de pago (Stripe). La API key de RevenueCat debe coincidir con el entorno Stripe (live strp_... con productos live; sandbox strp_sb_... con test mode).",
  7878: "La compra no pudo completarse. Verifica que el producto tenga precio en Stripe.",
  7879: "Se requiere email de facturación.",
  7898: "Stripe Tax no está activo. Actívalo en Stripe o desactívalo en RevenueCat Web Billing.",
  7899: "Dirección fiscal de origen inválida en la configuración de Stripe/RevenueCat.",
  7900: "Faltan permisos en la app de Stripe conectada a RevenueCat.",
  7901: "Estás en modo sandbox: usa la API key strp_sb_ y una cuenta Stripe en test mode.",
  7225: "API key inválida. En web debe ser strp_..., no sk_ ni pk_live_.",
};

export function formatRevenueCatError(error: unknown): string {
  if (error instanceof PurchasesError) {
    const backendCode = error.extra?.backendErrorCode;
    const status = error.extra?.statusCode;
    const hint = backendCode ? BACKEND_ERROR_HINTS[backendCode] : undefined;

    // El SDK incluye el body en underlyingErrorMessage para 500: "Body: {...}"
    const bodyMatch = error.underlyingErrorMessage?.match(/Body:\s*(.+?)\.?$/s);
    const bodyFromSdk = bodyMatch?.[1]?.trim();

    const parts = [
      error.message,
      bodyFromSdk && bodyFromSdk !== "null" ? bodyFromSdk : null,
      !bodyFromSdk ? error.underlyingErrorMessage : null,
      hint,
      backendCode != null ? `(RC backend: ${backendCode})` : null,
      status != null ? `(HTTP ${status})` : null,
    ].filter(Boolean);
    return parts.join(" — ");
  }

  if (error instanceof Error) return error.message;
  return String(error);
}

export function isPurchaseCancelled(error: unknown): boolean {
  return (
    error instanceof PurchasesError &&
    error.errorCode === 1 // ErrorCode.UserCancelledError
  );
}

export function logRevenueCatError(context: string, error: unknown) {
  if (error instanceof PurchasesError) {
    console.error(`[RevenueCat] ${context}`, {
      message: error.message,
      errorCode: error.errorCode,
      underlyingErrorMessage: error.underlyingErrorMessage,
      statusCode: error.extra?.statusCode,
      backendErrorCode: error.extra?.backendErrorCode,
    });
    return;
  }
  console.error(`[RevenueCat] ${context}`, error);
}
