import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { COLLECTION_MEMBERS } from "@/lib/config";
import { db } from "@/lib/firebase";
import type { FormQuestion, FormattedOnboardingAnswer, OnboardingAnswers } from "@/types/onboarding";
import {
  buildMemberIdentityFields,
  calculateMemberLevel,
  generatePlan,
} from "./memberLevel";
import {
  ageFromBirthDate,
  birthDateFromOnboardingAnswer,
} from "./birthDate";
import { defaultAnthropometrics } from "./anthropometrics";

/** Material mínimo por defecto (peso corporal) cuando el usuario no selecciona equipamiento. */
const DEFAULT_EQUIPMENT = ["correr_aire_libre", "esterilla"];

const saveInFlight = new Map<string, Promise<{ skillLevel?: string; planGenerated: boolean; planId?: string }>>();

function formatAnswers(
  answers: OnboardingAnswers,
  questions: FormQuestion[]
): Record<string, FormattedOnboardingAnswer> {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const formatted: Record<string, FormattedOnboardingAnswer> = {};

  for (const [key, value] of Object.entries(answers)) {
    const id = parseInt(key, 10);
    formatted[key] = {
      question: byId.get(id)?.question ?? "Pregunta no encontrada",
      answer: value,
    };
  }

  return formatted;
}

function resolveMaterials(answers: OnboardingAnswers): string[] {
  const raw = answers["10"];
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map(String);
  }
  return DEFAULT_EQUIPMENT;
}

async function performSave(
  user: User,
  answers: OnboardingAnswers,
  questions: FormQuestion[],
  options?: { generatePlan?: boolean }
): Promise<{ skillLevel?: string; planGenerated: boolean; planId?: string }> {
  const formatted = formatAnswers(answers, questions);
  const materials = resolveMaterials(answers);
  const { heightCm, weightKg } = defaultAnthropometrics();

  const answersWithDefaults: OnboardingAnswers = {
    ...answers,
    "10": materials,
  };

  if (!formatted["10"]) {
    formatted["10"] = {
      question: questions.find((q) => q.id === 10)?.question ?? "¿De qué material dispones?",
      answer: materials,
    };
  }

  const memberRef = doc(db, COLLECTION_MEMBERS, user.uid);
  const formRef = doc(collection(memberRef, "onboardingForm"), "latest");

  const sportValue = answers["3"] != null ? String(answers["3"]) : undefined;
  const displayName = answers["2"] != null ? String(answers["2"]).trim() : "";
  const birthIso = birthDateFromOnboardingAnswer(answers["14"]);
  const age = birthIso ? ageFromBirthDate(birthIso) : null;

  const updateData: Record<string, unknown> = {
    ...buildMemberIdentityFields(user),
    onboardingCompleted: true,
    onboardingCompletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    displayName: displayName || user.displayName || "",
    heightCm,
    weightKg,
    unboardingInformation: { material: materials },
  };

  if (birthIso) {
    updateData.birthDate = birthIso;
    if (age != null && age > 0) {
      updateData.age = age;
    }
  }

  if (answers["1"]) updateData.gender = String(answers["1"]);
  if (sportValue) {
    updateData.sport = sportValue;
    updateData.sportType = sportValue;
    updateData.primarySport = sportValue;
  }

  await setDoc(
    formRef,
    {
      answers: formatted,
      completedAt: serverTimestamp(),
      userId: user.uid,
    },
    { merge: true }
  );

  await setDoc(memberRef, updateData, { merge: true });

  const idToken = await user.getIdToken();
  const level = await calculateMemberLevel(idToken, answersWithDefaults, user.uid);

  await updateDoc(memberRef, {
    skillLevel: level.recommendedLevel,
    memberLevelData: {
      recommendedLevel: level.recommendedLevel,
      physicalTestLevel: level.physicalTestLevel,
      experienceLevel: level.experienceLevel,
      selfPerceivedLevel: level.selfPerceivedLevel,
      ...(level.warning ? { warning: level.warning } : {}),
      message: level.message,
    },
  });

  let planGenerated = false;
  let planId: string | undefined;

  if (options?.generatePlan !== false) {
    const planResult = await generatePlan(user.uid);
    planId =
      typeof planResult.planId === "string"
        ? planResult.planId
        : typeof planResult.id === "string"
          ? planResult.id
          : undefined;
    planGenerated = true;
  }

  return { skillLevel: level.recommendedLevel, planGenerated, planId };
}

export async function saveOnboardingForUser(
  user: User,
  answers: OnboardingAnswers,
  questions: FormQuestion[],
  options?: { generatePlan?: boolean }
): Promise<{ skillLevel?: string; planGenerated: boolean; planId?: string }> {
  const existing = saveInFlight.get(user.uid);
  if (existing) return existing;

  const promise = performSave(user, answers, questions, options).finally(() => {
    saveInFlight.delete(user.uid);
  });

  saveInFlight.set(user.uid, promise);
  return promise;
}
