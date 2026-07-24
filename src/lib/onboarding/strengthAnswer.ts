import type { OnboardingAnswerValue, OnboardingAnswers, StrengthAnswer } from "@/types/onboarding";

export function clampStrengthNumber(value: unknown): number | undefined {
  if (value === "" || value == null) return undefined;
  const n = typeof value === "number" ? value : parseInt(String(value), 10);
  if (Number.isNaN(n)) return undefined;
  return Math.min(99, Math.max(0, n));
}

export function parseStrengthAnswer(
  value: OnboardingAnswerValue | undefined
): StrengthAnswer | null {
  if (value == null) return null;

  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim();
    if (normalized === "si" || normalized === "sí") return { fuerza: "si" };
    if (normalized === "no") return { fuerza: "no" };
    return null;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    const map = value as Record<string, unknown>;
    const fuerza = String(map.fuerza ?? "").toLowerCase().trim();
    if (fuerza === "si" || fuerza === "sí") {
      return {
        fuerza: "si",
        sentadillas: clampStrengthNumber(map.sentadillas),
        flexiones: clampStrengthNumber(map.flexiones),
      };
    }
    if (fuerza === "no") return { fuerza: "no" };
  }

  return null;
}

export function hasTrainedStrength(answers: OnboardingAnswers): boolean {
  return parseStrengthAnswer(answers["5"])?.fuerza === "si";
}

export function isStrengthAnswerNo(value: OnboardingAnswerValue | undefined): boolean {
  return parseStrengthAnswer(value)?.fuerza === "no";
}

export function isStrengthReadyToSubmit(value: OnboardingAnswerValue | undefined): boolean {
  const parsed = parseStrengthAnswer(value);
  return parsed?.fuerza === "si" || parsed?.fuerza === "no";
}

export function isStrengthAnswerComplete(value: OnboardingAnswerValue | undefined): boolean {
  const parsed = parseStrengthAnswer(value);
  if (!parsed) return false;
  if (parsed.fuerza === "no") return true;
  return parsed.sentadillas != null && parsed.flexiones != null;
}

export function isStrengthYesIncomplete(value: OnboardingAnswerValue | undefined): boolean {
  const parsed = parseStrengthAnswer(value);
  return parsed?.fuerza === "si" && !isStrengthAnswerComplete(value);
}

export function buildStrengthAnswer(
  current: OnboardingAnswerValue | undefined,
  patch: Partial<StrengthAnswer>
): StrengthAnswer {
  const parsed = parseStrengthAnswer(current) ?? { fuerza: "si" as const };
  const next: StrengthAnswer = { ...parsed, ...patch };

  if (next.fuerza === "no") {
    delete next.sentadillas;
    delete next.flexiones;
  }

  return next;
}
