import { httpsCallable } from "firebase/functions";
import { doc, getDoc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { db, functions } from "./firebase";
import {
  COLLECTION_MEMBERS,
  FN_GET_SUBSCRIPTION_STATUS,
  FN_REDEEM_PROMO_CODE,
} from "./config";
import type { MemberDoc, SubscriptionStatusResponse } from "@/types/member";

export async function redeemPromoCode(code: string) {
  const callable = httpsCallable<{ code: string }, { success: boolean; message?: string }>(
    functions,
    FN_REDEEM_PROMO_CODE
  );
  return callable({ code: code.trim().toUpperCase() });
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
  const callable = httpsCallable<Record<string, never>, SubscriptionStatusResponse>(
    functions,
    FN_GET_SUBSCRIPTION_STATUS
  );
  const result = await callable({});
  return result.data;
}

function isPremiumMember(data: MemberDoc | undefined): boolean {
  return data?.entitlementActive === true || data?.isDev === true;
}

/**
 * Espera a que el webhook de RevenueCat actualice `members/{uid}.entitlementActive`.
 * Hace polling de `getSubscriptionStatus` como fallback (handoff backend).
 */
export function waitForEntitlementActive(
  uid: string,
  timeoutMs = 30000
): Promise<MemberDoc> {
  return new Promise((resolve, reject) => {
    const ref = doc(db, COLLECTION_MEMBERS, uid);
    let settled = false;
    let unsubscribe: Unsubscribe | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      if (pollInterval) clearInterval(pollInterval);
      unsubscribe?.();
    };

    const finish = (data: MemberDoc) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(data);
    };

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    const pollStatus = async () => {
      try {
        const status = await getSubscriptionStatus();
        if (status.entitlementActive || status.isDev) {
          const snap = await getDoc(ref);
          const data = (snap.data() as MemberDoc | undefined) ?? {
            entitlementActive: status.entitlementActive,
            isDev: status.isDev,
            subscriptionStatus: status.subscriptionStatus,
            isTrial: status.isTrial,
          };
          finish(data);
        }
      } catch {
        // Ignorar errores transitorios del callable
      }
    };

    const timeoutId = window.setTimeout(async () => {
      await pollStatus();
      if (!settled) {
        fail(new Error("Timeout waiting for premium activation"));
      }
    }, timeoutMs);

    unsubscribe = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as MemberDoc | undefined;
        if (isPremiumMember(data)) {
          finish(data!);
        }
      },
      (error) => fail(error)
    );

    pollInterval = setInterval(pollStatus, 3000);
  });
}
