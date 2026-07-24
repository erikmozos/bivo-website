import type { OnboardingAnswers } from "@/types/onboarding";

const STORAGE_KEY = "bivo_flow_session";

export interface FlowSession {
  email?: string;
  primarySport?: string;
  trainingViewed?: boolean;
  questionnaireCompleted?: boolean;
  onboardingAnswers?: OnboardingAnswers;
  skillLevel?: string;
  planId?: string;
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
