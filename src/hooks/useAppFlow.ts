import { useMemo, useSyncExternalStore } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { readFlowSession } from "@/lib/flowSession";
import { useMember } from "@/hooks/useMember";
import { getAppFlowStep, type AppFlowStep } from "@/types/member";

function subscribeSession(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("bivo-flow-session", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("bivo-flow-session", handler);
  };
}

function getSessionSnapshot() {
  return JSON.stringify(readFlowSession());
}

export function notifyFlowSessionChange() {
  window.dispatchEvent(new Event("bivo-flow-session"));
}

export function useAppFlow() {
  const { user, loading: authLoading } = useAuth();
  const { member, loading: memberLoading } = useMember(user?.uid);

  const sessionKey = useSyncExternalStore(subscribeSession, getSessionSnapshot, () => "{}");
  const session = useMemo(() => JSON.parse(sessionKey), [sessionKey]);

  const step: AppFlowStep = useMemo(() => {
    if (!user) return "auth";
    return getAppFlowStep(member, session, true);
  }, [user, member, session]);

  const loading = authLoading || (Boolean(user) && memberLoading);

  return {
    user,
    member,
    session,
    step,
    loading,
    showPaywall:
      member?.onboardingCompleted === true &&
      member?.entitlementActive !== true &&
      member?.isDev !== true,
  };
}
