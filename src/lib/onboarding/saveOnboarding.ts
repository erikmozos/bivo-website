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
import { calculateMemberLevel, generatePlan } from "./memberLevel";

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

export async function saveOnboardingForUser(
  user: User,
  answers: OnboardingAnswers,
  questions: FormQuestion[],
  options?: { generatePlan?: boolean }
): Promise<{ skillLevel?: string }> {
  const formatted = formatAnswers(answers, questions);
  const memberRef = doc(db, COLLECTION_MEMBERS, user.uid);
  const formRef = doc(collection(memberRef, "onboardingForm"), "latest");

  const sportValue = answers["3"] != null ? String(answers["3"]) : undefined;
  const displayName = answers["2"] != null ? String(answers["2"]).trim() : "";
  const materials = answers["10"];

  const updateData: Record<string, unknown> = {
    onboardingCompleted: true,
    onboardingCompletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    email: user.email ?? "",
    displayName: displayName || user.displayName || "",
  };

  if (answers["1"]) updateData.gender = String(answers["1"]);
  if (sportValue) {
    updateData.sport = sportValue;
    updateData.sportType = sportValue;
    updateData.primarySport = sportValue;
  }
  if (Array.isArray(materials)) {
    updateData.unboardingInformation = { material: materials };
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

  let skillLevel: string | undefined;
  try {
    const idToken = await user.getIdToken();
    const level = await calculateMemberLevel(idToken, answers, user.uid);
    skillLevel = level.recommendedLevel;
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
  } catch {
    // No bloquear el flujo si falla el cálculo de nivel
  }

  if (options?.generatePlan !== false) {
    try {
      const idToken = await user.getIdToken();
      await generatePlan(idToken, user.uid);
    } catch {
      // El plan se puede generar más tarde en la app
    }
  }

  return { skillLevel };
}
