import type { PlanKey } from "@/lib/config";
import type { OnboardingAnswers } from "@/types/onboarding";

const STORAGE_KEY = "bivo_flow_session";

export interface FlowSession {
  primarySport?: string;
  trainingViewed?: boolean;
  questionnaireCompleted?: boolean;
  onboardingAnswers?: OnboardingAnswers;
  skillLevel?: string;
  planId?: string;
  /** Plan de suscripción elegido en home/VSL antes del registro. */
  selectedPlanKey?: PlanKey;
}

export function isPlanKey(value: string | null | undefined): value is PlanKey {
  return value === "monthly" || value === "quarterly" || value === "annual";
}

export function readFlowSession(): FlowSession {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as FlowSession;
  } catch {
    return {};
  }
}

export function writeFlowSession(patch: Partial<FlowSession>): FlowSession {
  const next = { ...readFlowSession(), ...patch };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearFlowSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function sportFromAnswers(answers?: OnboardingAnswers): string | undefined {
  const sport = answers?.["3"];
  return sport != null ? String(sport) : undefined;
}
