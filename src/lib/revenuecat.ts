import { Purchases, type Package } from "@revenuecat/purchases-js";
import {
  RC_API_KEY,
  RC_ENTITLEMENT_ID,
  RC_OFFERING_ID,
} from "./config";
import { assertWebBillingPackage } from "./revenuecatDiagnostics";

let configuredForUser: string | null = null;

export function isRevenueCatConfigured(): boolean {
  return Boolean(RC_API_KEY);
}

export function isRevenueCatSandbox(): boolean {
  return RC_API_KEY.startsWith("strp_sb_");
}

export function isRevenueCatLive(): boolean {
  return RC_API_KEY.startsWith("strp_") && !RC_API_KEY.startsWith("strp_sb_");
}

export async function configureRevenueCat(appUserId: string): Promise<void> {
  if (!RC_API_KEY) {
    throw new Error("RevenueCat API key is not configured");
  }

  if (configuredForUser === appUserId && Purchases.isConfigured()) {
    return;
  }

  Purchases.configure({
    apiKey: RC_API_KEY,
    appUserId,
  });

  configuredForUser = appUserId;
}

/** True si el member debe ver el offering de descuento afiliado. */
export function memberGetsAffiliateDiscountOffering(member: {
  affiliateOfferType?: string | null;
  affiliateDiscountPercent?: number | null;
} | null | undefined): boolean {
  if (!member) return false;
  if (member.affiliateOfferType === "discount") return true;
  const percent = member.affiliateDiscountPercent;
  return typeof percent === "number" && percent >= 25;
}

export async function getCurrentOfferingPackages(options?: {
  offeringId?: string;
}) {
  const preferredId = options?.offeringId?.trim();

  const offerings = await Purchases.getSharedInstance().getOfferings({
    currency: "EUR",
    ...(preferredId ? { offeringIdentifier: preferredId } : {}),
  });

  const fromPreferred =
    preferredId && offerings.all?.[preferredId]?.availablePackages?.length
      ? offerings.all[preferredId]
      : undefined;

  const fromDefault = offerings.all?.[RC_OFFERING_ID]?.availablePackages?.length
    ? offerings.all[RC_OFFERING_ID]
    : undefined;

  const offering = fromPreferred ?? fromDefault ?? offerings.current ?? null;

  if (!offering) {
    throw new Error("No current offering available");
  }

  return {
    offering,
    monthly: offering.monthly ?? null,
    quarterly: offering.threeMonth ?? null,
    annual: offering.annual ?? null,
    availablePackages: offering.availablePackages,
  };
}

export async function purchasePackage(
  pkg: Package,
  options?: { customerEmail?: string; locale?: string; discountCode?: string }
) {
  assertWebBillingPackage(pkg);

  const result = await Purchases.getSharedInstance().purchase({
    rcPackage: pkg,
    customerEmail: options?.customerEmail,
    selectedLocale: options?.locale ?? "es",
    defaultLocale: "es",
    discountCode: options?.discountCode,
    skipSuccessPage: true,
  });

  const hasPremium =
    RC_ENTITLEMENT_ID in (result.customerInfo.entitlements.active ?? {});

  return { ...result, hasPremium };
}

export function resetRevenueCatSession() {
  configuredForUser = null;
}
