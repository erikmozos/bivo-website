import type { FlowSession } from "@/lib/flowSession";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "expired"
  | "none"
  | string;

export interface MemberDoc {
  onboardingCompleted?: boolean;
  entitlementActive?: boolean;
  isDev?: boolean;
  subscriptionStatus?: SubscriptionStatus;
  isTrial?: boolean;
  currentPeriodEndsAt?: { seconds: number; nanoseconds: number } | Date | string;
  email?: string;
  displayName?: string;
  primarySport?: string;
  sport?: string;
  sportType?: string;
  skillLevel?: string;
  gender?: string;
  currentPlanRefs?: string[];
  createdAt?: { seconds: number; nanoseconds: number } | Date | string;
  updatedAt?: { seconds: number; nanoseconds: number } | Date | string;
}

export interface SubscriptionStatusResponse {
  entitlementActive: boolean;
  isDev: boolean;
  subscriptionStatus?: SubscriptionStatus;
  productId?: string;
  store?: string;
  isTrial?: boolean;
  currentPeriodEndsAt?: string;
}

export type AppFlowStep =
  | "onboarding"
  | "training"
  | "auth"
  | "paywall"
  | "download";

export function getAppFlowStep(
  member: MemberDoc | null | undefined,
  session: FlowSession,
  isAuthenticated: boolean
): AppFlowStep {
  if (!isAuthenticated) {
    return "auth";
  }

  if (member?.entitlementActive === true || member?.isDev === true) {
    return "download";
  }

  const onboardingDone =
    member?.onboardingCompleted === true || session.questionnaireCompleted === true;

  if (!onboardingDone) {
    return "onboarding";
  }

  if (!session.trainingViewed) {
    return "training";
  }

  if (shouldShowPaywall(member)) {
    return "paywall";
  }

  return "paywall";
}

export function shouldShowPaywall(member: MemberDoc | null | undefined): boolean {
  return (
    member?.onboardingCompleted === true &&
    member?.entitlementActive !== true &&
    member?.isDev !== true
  );
}
