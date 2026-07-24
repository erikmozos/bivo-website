import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { readFlowSession, clearFlowSession, sportFromAnswers } from "@/lib/flowSession";
import { loadQuestions } from "@/lib/onboarding/questions";
import { saveOnboardingForUser } from "@/lib/onboarding/saveOnboarding";
import { COLLECTION_MEMBERS } from "@/lib/config";
import { db } from "@/lib/firebase";

export async function syncMemberFromSession(user: User, lang = "es"): Promise<void> {
  const session = readFlowSession();
  const hasAnswers =
    session.onboardingAnswers && Object.keys(session.onboardingAnswers).length > 0;

  if (!session.email && !session.primarySport && !hasAnswers) return;

  const memberRef = doc(db, COLLECTION_MEMBERS, user.uid);
  const memberSnap = await getDoc(memberRef);
  const memberData = memberSnap.data();

  if (memberData?.onboardingCompleted === true) {
    await setDoc(
      memberRef,
      {
        uid: user.uid,
        id: user.uid,
        email: user.email ?? session.email ?? "",
        displayName: user.displayName ?? "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return;
  }

  if (hasAnswers && session.onboardingAnswers) {
    const questions = await loadQuestions(lang);
    await saveOnboardingForUser(user, session.onboardingAnswers, questions, {
      generatePlan: true,
    });
    clearFlowSession();
    window.dispatchEvent(new Event("bivo-flow-session"));
    return;
  }

  const sport = session.primarySport ?? sportFromAnswers(session.onboardingAnswers);

  const payload: Record<string, unknown> = {
    uid: user.uid,
    id: user.uid,
    email: user.email ?? session.email ?? "",
    displayName: user.displayName ?? "",
    updatedAt: serverTimestamp(),
  };

  if (sport) {
    payload.primarySport = sport;
    payload.sport = sport;
    payload.sportType = sport;
  }

  await setDoc(memberRef, payload, { merge: true });
  window.dispatchEvent(new Event("bivo-flow-session"));
}
