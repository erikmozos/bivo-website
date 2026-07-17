import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import FormSplashScreen from "@/components/onboarding/FormSplashScreen";
import OnboardingQuestionStep, {
  isAnswerValid,
} from "@/components/onboarding/OnboardingQuestionStep";
import OnboardingSummaryScreen from "@/components/onboarding/OnboardingSummaryScreen";
import { useAuth } from "@/contexts/AuthContext";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import {
  applyStrengthBranchRules,
  filterQuestions,
  findNextQuestionIndex,
} from "@/lib/onboarding/filterQuestions";
import { loadQuestions } from "@/lib/onboarding/questions";
import { saveOnboardingForUser } from "@/lib/onboarding/saveOnboarding";
import { writeFlowSession, readFlowSession, sportFromAnswers } from "@/lib/flowSession";
import type { FormQuestion, OnboardingAnswers, OnboardingAnswerValue } from "@/types/onboarding";

type Phase = "splash" | "question" | "summary";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const { lang, localePath } = useLocale();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [phase, setPhase] = useState<Phase>("splash");
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>(
    () => readFlowSession().onboardingAnswers ?? {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    setLoadingQuestions(true);
    loadQuestions(lang)
      .then((data) => {
        if (!cancelled) setQuestions(data);
      })
      .catch(() => {
        if (!cancelled) setError(t("appFlow.onboarding.loadError"));
      })
      .finally(() => {
        if (!cancelled) setLoadingQuestions(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang, t]);

  const filteredQuestions = useMemo(
    () => filterQuestions(questions, answers),
    [questions, answers]
  );

  const currentQuestion = filteredQuestions[questionIndex];
  const progressCurrent = phase === "question" ? questionIndex + 1 : 0;
  const progressTotal = filteredQuestions.length;

  const weekdayLabels = useMemo(
    () =>
      t("appFlow.onboarding.weekdays", { returnObjects: true }) as Record<string, string>,
    [t]
  );

  const persistAnswers = useCallback((next: OnboardingAnswers) => {
    setAnswers(next);
    writeFlowSession({ onboardingAnswers: next });
    notifyFlowSessionChange();
  }, []);

  const handleAnswerChange = (value: OnboardingAnswerValue) => {
    if (!currentQuestion) return;
    let next = { ...answers, [String(currentQuestion.id)]: value };
    if (currentQuestion.id === 5 && typeof value === "string") {
      next = applyStrengthBranchRules(next, 5, value);
    }
    persistAnswers(next);
  };

  const goNextQuestion = () => {
    if (!currentQuestion) return;

    const rawAnswer = answers[String(currentQuestion.id)];
    if (!isAnswerValid(currentQuestion, rawAnswer)) return;

    const strengthNo =
      currentQuestion.id === 5 &&
      String(rawAnswer).toLowerCase().trim() === "no";

    const nextIndex = findNextQuestionIndex(
      filteredQuestions,
      currentQuestion.id,
      strengthNo
    );

    if (nextIndex >= filteredQuestions.length) {
      setPhase("summary");
      return;
    }

    setQuestionIndex(nextIndex);
  };

  const goBack = () => {
    if (phase === "summary") {
      setPhase("question");
      setQuestionIndex(Math.max(0, filteredQuestions.length - 1));
      return;
    }
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      return;
    }
    setPhase("splash");
  };

  const handleSummaryContinue = async () => {
    setSubmitting(true);
    setError(null);

    const sport = sportFromAnswers(answers);
    try {
      writeFlowSession({
        questionnaireCompleted: true,
        onboardingAnswers: answers,
        primarySport: sport,
      });
      notifyFlowSessionChange();

      if (user) {
        const result = await saveOnboardingForUser(user, answers, questions);
        setSkillLevel(result.skillLevel);
      }

      navigate(localePath("/entrenamiento"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("appFlow.onboarding.error"));
      setSubmitting(false);
    }
  };

  if (loadingQuestions) {
    return (
      <FlowGuard require="onboarding">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div
            className="rounded-full h-12 w-12 border-b-2 border-bivo-green"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
        </div>
      </FlowGuard>
    );
  }

  const showProgress = phase === "question";

  return (
    <FlowGuard require="onboarding">
      <FlowLayout
        badge={
          phase === "splash"
            ? t("appFlow.onboarding.badge")
            : phase === "summary"
              ? t("appFlow.onboarding.summary.badge")
              : t("appFlow.onboarding.questionBadge", {
                  current: progressCurrent,
                  total: progressTotal,
                })
        }
        title={
          phase === "splash"
            ? undefined
            : phase === "summary"
              ? t("appFlow.onboarding.summary.title")
              : currentQuestion?.question
        }
        subtitle={
          phase === "question" && currentQuestion?.subtitle
            ? currentQuestion.subtitle
            : phase === "summary"
              ? t("appFlow.onboarding.summary.subtitle")
              : undefined
        }
      >
        {showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <button type="button" onClick={goBack} className="text-bivo-green hover:underline">
                {t("appFlow.onboarding.back")}
              </button>
              <span>
                {progressCurrent}/{progressTotal}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-bivo-green transition-all duration-300"
                style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
              />
            </div>
          </div>
        )}

        {phase === "splash" && (
          <FormSplashScreen onStart={() => setPhase("question")} />
        )}

        {phase === "question" && currentQuestion && (
          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            style={{ boxShadow: "0 0 80px rgba(57,255,20,0.06)" }}
          >
            <OnboardingQuestionStep
              question={currentQuestion}
              value={answers[String(currentQuestion.id)]}
              onChange={handleAnswerChange}
              weekdayLabels={weekdayLabels}
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-4">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={goNextQuestion}
              disabled={!isAnswerValid(currentQuestion, answers[String(currentQuestion.id)])}
              className="w-full mt-6 py-3.5 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm disabled:opacity-50"
            >
              {questionIndex >= filteredQuestions.length - 1
                ? t("appFlow.onboarding.finish")
                : t("appFlow.onboarding.cta")}
            </button>
          </div>
        )}

        {phase === "summary" && (
          <>
            <OnboardingSummaryScreen
              answers={answers}
              skillLevel={skillLevel}
              submitting={submitting}
              onContinue={handleSummaryContinue}
            />
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-4">
                {error}
              </p>
            )}
          </>
        )}
      </FlowLayout>
    </FlowGuard>
  );
};

export default OnboardingPage;
