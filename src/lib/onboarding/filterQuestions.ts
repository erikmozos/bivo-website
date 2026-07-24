import type { FormQuestion, OnboardingAnswers } from "@/types/onboarding";
import { hasTrainedStrength, parseStrengthAnswer } from "@/lib/onboarding/strengthAnswer";

export { hasTrainedStrength } from "@/lib/onboarding/strengthAnswer";

export function filterQuestions(
  questions: FormQuestion[],
  answers: OnboardingAnswers
): FormQuestion[] {
  const trained = hasTrainedStrength(answers);
  return questions.filter((q) => {
    if (q.id === 7 || q.id === 13) return trained;
    return true;
  });
}

export function applyStrengthBranchRules(
  answers: OnboardingAnswers,
  questionId: number,
  answer: OnboardingAnswers[string]
): OnboardingAnswers {
  const next = { ...answers, [String(questionId)]: answer };
  if (questionId === 5) {
    const parsed = parseStrengthAnswer(answer);
    if (parsed?.fuerza === "no") {
      next["7"] = "principiante";
    } else if (parsed?.fuerza === "si") {
      delete next["7"];
    }
  }
  return next;
}

export function findNextQuestionIndex(
  filtered: FormQuestion[],
  currentQuestionId: number,
  answeredNoStrength: boolean
): number {
  const currentIdx = filtered.findIndex((q) => q.id === currentQuestionId);
  if (currentIdx < 0) return 0;

  if (answeredNoStrength && currentQuestionId === 5) {
    const next = filtered.findIndex((q) => q.id > 5 && q.id !== 13 && q.id !== 7);
    return next >= 0 ? next : currentIdx + 1;
  }

  return currentIdx + 1;
}
