import type { FormQuestion, OnboardingAnswers } from "@/types/onboarding";

export function hasTrainedStrength(answers: OnboardingAnswers): boolean {
  const raw = answers["5"];
  if (raw == null) return false;
  const value = String(raw).toLowerCase().trim();
  return value === "si" || value === "sí" || value === "yes";
}

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
  answer: string
): OnboardingAnswers {
  const next = { ...answers, [String(questionId)]: answer };
  if (questionId === 5 && answer.toLowerCase().trim() === "no") {
    next["7"] = "principiante";
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
