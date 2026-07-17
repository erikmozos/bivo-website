import type { OnboardingAnswers } from "@/types/onboarding";

function getAnswer(answers: OnboardingAnswers, questionId: number): string | undefined {
  const data = answers[String(questionId)];
  if (data == null) return undefined;
  if (typeof data === "object" && data !== null && "answer" in (data as object)) {
    return String((data as { answer: unknown }).answer);
  }
  return String(data);
}

export function mapFormAnswersToLevelRequest(
  answers: OnboardingAnswers,
  memberId: string
): Record<string, unknown> {
  const sexRaw = getAnswer(answers, 1)?.toLowerCase();
  const sex = sexRaw === "femenino" || sexRaw === "female" ? "female" : "male";

  const raw5 = answers["5"];
  let squatsIn10s = 0;
  let pushupsIn10s = 0;

  if (raw5 && typeof raw5 === "object" && !Array.isArray(raw5)) {
    const map = raw5 as Record<string, unknown>;
    const fuerza = String(map.fuerza ?? "").toLowerCase();
    if (fuerza === "si") {
      squatsIn10s = clampInt(map.sentadillas, 0);
      pushupsIn10s = clampInt(map.flexiones, 0);
    }
  }

  const experienceRaw = getAnswer(answers, 13);
  const trainingExperienceMonths = clampMonths(mapExperienceToMonths(experienceRaw));

  const levelRaw = getAnswer(answers, 7)?.toLowerCase();
  const selfPerceivedLevel = mapSelfPerceivedLevel(levelRaw);

  return {
    memberId,
    sex,
    squatsIn10s,
    pushupsIn10s,
    trainingExperienceMonths,
    selfPerceivedLevel,
  };
}

function mapExperienceToMonths(value?: string): number {
  switch (value) {
    case "menos_6_meses":
      return 3;
    case "6_meses_3_anos":
      return 18;
    case "mas_3_anos":
      return 48;
    default:
      return 3;
  }
}

function mapSelfPerceivedLevel(value?: string): string {
  switch (value) {
    case "principiante":
      return "beginner";
    case "intermedio":
      return "intermediate";
    case "avanzado":
      return "advanced";
    case "pro":
      return "pro";
    default:
      return "beginner";
  }
}

function clampInt(value: unknown, fallback: number): number {
  if (value == null) return fallback;
  const n = typeof value === "number" ? value : parseInt(String(value), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(100, Math.max(0, n));
}

function clampMonths(n: number): number {
  return Math.min(600, Math.max(0, n));
}

export interface MemberLevelResult {
  recommendedLevel: string;
  physicalTestLevel?: string;
  experienceLevel?: string;
  selfPerceivedLevel?: string;
  warning?: string;
  message?: string;
}

const FUNCTIONS_BASE = "https://europe-west1-bivo-6b26a.cloudfunctions.net";

export async function calculateMemberLevel(
  idToken: string,
  answers: OnboardingAnswers,
  memberId: string
): Promise<MemberLevelResult> {
  const body = mapFormAnswersToLevelRequest(answers, memberId);
  const res = await fetch(`${FUNCTIONS_BASE}/calculateMemberLevel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(
      String(json.details ?? json.error ?? json.message ?? `Error ${res.status}`)
    );
  }

  const result = (json.result ?? json.data) as Record<string, unknown> | undefined;
  if (!json.success || !result) {
    throw new Error(String(json.message ?? "Invalid server response"));
  }

  return {
    recommendedLevel: String(result.recommendedLevel ?? "beginner"),
    physicalTestLevel: result.physicalTestLevel as string | undefined,
    experienceLevel: result.experienceLevel as string | undefined,
    selfPerceivedLevel: result.selfPerceivedLevel as string | undefined,
    warning: result.warning as string | undefined,
    message: result.message as string | undefined,
  };
}

export async function generatePlan(idToken: string, memberId: string): Promise<void> {
  const res = await fetch(`${FUNCTIONS_BASE}/generatePlan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ memberId }),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    throw new Error(String(json.message ?? json.error ?? `Error ${res.status}`));
  }
}
