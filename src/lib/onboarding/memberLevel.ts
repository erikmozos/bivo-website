import { httpsCallable } from "firebase/functions";
import type { User } from "firebase/auth";
import { FN_GENERATE_PLAN, FUNCTIONS_REGION } from "@/lib/config";
import { functions } from "@/lib/firebase";
import type { OnboardingAnswers } from "@/types/onboarding";

function getAnswer(answers: OnboardingAnswers, questionId: number): string | undefined {
  const data = answers[String(questionId)];
  if (data == null) return undefined;
  if (typeof data === "object" && data !== null && "answer" in (data as object)) {
    return String((data as { answer: unknown }).answer);
  }
  return String(data);
}

export function buildMemberIdentityFields(user: User): Record<string, string> {
  return {
    uid: user.uid,
    id: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
  };
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

export interface WorkoutExerciseItem {
  id: string;
  name: string;
  series?: number;
  repetitions?: number;
  imageUrl?: string;
}

export interface WorkoutBlockItem {
  id: string;
  title: string;
  exercises: WorkoutExerciseItem[];
}

export interface PlanWorkoutSummary {
  id?: string;
  name?: string;
  title?: string;
  scheduledDate?: string;
  durationMinutes?: number;
  exerciseCount?: number;
  blocks?: WorkoutBlockItem[];
}

export interface PlanWorkoutsResult {
  planId?: string;
  workouts: PlanWorkoutSummary[];
  totalWorkoutCount?: number;
}

const FUNCTIONS_BASE = `https://${FUNCTIONS_REGION}-bivo-6b26a.cloudfunctions.net`;

function formatApiError(value: unknown, fallback: string): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
    try {
      return JSON.stringify(value);
    } catch {
      return fallback;
    }
  }
  return String(value);
}

function unwrapPayload(json: Record<string, unknown>): Record<string, unknown> {
  const nested = json.result ?? json.data;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return nested as Record<string, unknown>;
  }
  return json;
}

function parseLevelResult(payload: Record<string, unknown>): MemberLevelResult {
  const recommendedLevel = String(payload.recommendedLevel ?? "beginner");
  return {
    recommendedLevel,
    physicalTestLevel: payload.physicalTestLevel as string | undefined,
    experienceLevel: payload.experienceLevel as string | undefined,
    selfPerceivedLevel: payload.selfPerceivedLevel as string | undefined,
    warning: payload.warning as string | undefined,
    message: payload.message as string | undefined,
  };
}

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
      formatApiError(json.details ?? json.error ?? json.message, `Error ${res.status}`)
    );
  }

  const payload = unwrapPayload(json);
  if (!payload.recommendedLevel && json.success === false) {
    throw new Error(String(json.message ?? "Invalid server response"));
  }

  return parseLevelResult(payload);
}

export async function generatePlan(memberId: string): Promise<Record<string, unknown>> {
  const callable = httpsCallable<{ memberId: string }, Record<string, unknown>>(
    functions,
    FN_GENERATE_PLAN
  );
  try {
    const result = await callable({ memberId });
    const data = result.data;
    if (data && typeof data === "object") {
      return data as Record<string, unknown>;
    }
    return {};
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "No se pudo generar el plan";
    throw new Error(message);
  }
}

function normalizeWorkoutSummary(item: Record<string, unknown>): PlanWorkoutSummary {
  const nested =
    item.workout && typeof item.workout === "object"
      ? (item.workout as Record<string, unknown>)
      : null;
  const source = nested ?? item;
  const exercises = source.exercises ?? item.exercises;

  return {
    id: (item.id ?? item.workoutId ?? item.eventId ?? source.id) as string | undefined,
    name: (source.name ?? source.title ?? source.workoutName ?? item.name ?? item.title ?? item.workoutName) as
      | string
      | undefined,
    title: (source.title ?? source.name ?? source.workoutName ?? item.title ?? item.name ?? item.workoutName) as
      | string
      | undefined,
    scheduledDate: (item.scheduledDate ?? item.date ?? item.startDate ?? item.eventDate ?? source.scheduledDate) as
      | string
      | undefined,
    durationMinutes:
      Number(
        source.durationMinutes ??
          source.duration ??
          source.estimatedDuration ??
          item.durationMinutes ??
          item.duration ??
          item.estimatedDuration ??
          0
      ) || undefined,
    exerciseCount: Array.isArray(exercises)
      ? exercises.length
      : Number(source.exerciseCount ?? source.exercisesCount ?? item.exerciseCount ?? item.exercisesCount ?? 0) ||
          undefined,
  };
}

function parsePlanWorkouts(json: Record<string, unknown>): PlanWorkoutsResult {
  const payload = unwrapPayload(json);
  const rawWorkouts = payload.workouts ?? payload.events ?? payload.planWorkouts;
  const workouts = Array.isArray(rawWorkouts)
    ? (rawWorkouts as Record<string, unknown>[]).map(normalizeWorkoutSummary)
    : [];

  return {
    planId: payload.planId as string | undefined,
    totalWorkoutCount: Number(payload.totalWorkoutCount ?? payload.eventCount ?? workouts.length),
    workouts,
  };
}

export async function getPlanWorkouts(
  idToken: string,
  memberId: string
): Promise<PlanWorkoutsResult> {
  const url = new URL(`${FUNCTIONS_BASE}/getPlanWorkouts`);
  url.searchParams.set("memberId", memberId);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(
      formatApiError(json.details ?? json.error ?? json.message, `Error ${res.status}`)
    );
  }

  const parsed = parsePlanWorkouts(json);
  if (parsed.workouts.length === 0 && json.success === false) {
    throw new Error(formatApiError(json.message ?? json.error, "Plan vacío"));
  }

  return parsed;
}

export async function getPlanWorkoutsWithRetry(
  idToken: string,
  memberId: string,
  options?: { attempts?: number; delayMs?: number }
): Promise<PlanWorkoutsResult> {
  const attempts = options?.attempts ?? 4;
  const delayMs = options?.delayMs ?? 1500;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const result = await getPlanWorkouts(idToken, memberId);
      if (result.workouts.length > 0) return result;
      lastError = new Error("Plan sin entrenamientos");
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }

    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError ?? new Error("No se pudo cargar el plan");
}
