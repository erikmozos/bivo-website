import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./storeLinks";

export const RC_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY ?? "";
export const RC_OFFERING_ID = "default";
export const RC_ENTITLEMENT_ID = "premium";

export const RC_PACKAGES = {
  monthly: "$rc_monthly",
  quarterly: "$rc_three_month",
  annual: "$rc_annual",
} as const;

export const PRODUCT_IDS = {
  monthly: "bivo_monthly",
  quarterly: "bivo_quarterly",
  annual: "bivo_yearly",
} as const;

export const FIREBASE_PROJECT_ID =
  import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "bivo-6b26a";
export const FUNCTIONS_REGION = "europe-west1";

export const FN_GET_SUBSCRIPTION_STATUS = "getSubscriptionStatus";
export const FN_REDEEM_PROMO_CODE = "redeemPromoCode";

export const COLLECTION_MEMBERS = "members";

export const PROMO_CODES = ["BIVO1", "FPIB26"] as const;

export const TRIAL_DAYS = 7;

export { APP_STORE_URL, GOOGLE_PLAY_URL };

export type PlanKey = keyof typeof RC_PACKAGES;
