import type { User } from "firebase/auth";
import { readFlowSession, clearFlowSession, sportFromAnswers } from "@/lib/flowSession";
import { loadQuestions } from "@/lib/onboarding/questions";
import { saveOnboardingForUser } from "@/lib/onboarding/saveOnboarding";

export async function syncMemberFromSession(user: User, lang = "es"): Promise<void> {
  const session = readFlowSession();
  const hasAnswers =
    session.onboardingAnswers && Object.keys(session.onboardingAnswers).length > 0;

  if (!session.email && !session.primarySport && !hasAnswers) return;

  if (hasAnswers && session.onboardingAnswers) {
    const questions = await loadQuestions(lang);
    await saveOnboardingForUser(user, session.onboardingAnswers, questions, {
      generatePlan: true,
    });
    clearFlowSession();
    window.dispatchEvent(new Event("bivo-flow-session"));
    return;
  }

  const { doc, serverTimestamp, setDoc } = await import("firebase/firestore");
  const { COLLECTION_MEMBERS } = await import("@/lib/config");
  const { db } = await import("@/lib/firebase");

  const sport = session.primarySport ?? sportFromAnswers(session.onboardingAnswers);

  const payload: Record<string, unknown> = {
    email: user.email ?? session.email ?? "",
    displayName: user.displayName ?? "",
    updatedAt: serverTimestamp(),
  };

  if (sport) {
    payload.primarySport = sport;
    payload.sport = sport;
    payload.sportType = sport;
    payload.onboardingCompleted = true;
  }

  await setDoc(doc(db, COLLECTION_MEMBERS, user.uid), payload, { merge: true });
  clearFlowSession();
  window.dispatchEvent(new Event("bivo-flow-session"));
}
