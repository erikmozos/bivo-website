import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import FlowUserBar from "@/components/app/FlowUserBar";
import FormSplashScreen from "@/components/onboarding/FormSplashScreen";
import OnboardingQuestionStep, {
  isAnswerValid,
  isNameAndBirthDateValid,
} from "@/components/onboarding/OnboardingQuestionStep";
import StrengthQuestionStep from "@/components/onboarding/StrengthQuestionStep";
import OnboardingSummaryScreen from "@/components/onboarding/OnboardingSummaryScreen";
import {
  OnboardingBackButton,
  OnboardingProgressRing,
  onboardingContinueButtonClass,
} from "@/components/onboarding/OnboardingUi";
import { useAuth } from "@/contexts/AuthContext";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import {
  applyStrengthBranchRules,
  filterQuestions,
  findNextQuestionIndex,
} from "@/lib/onboarding/filterQuestions";
import { isStrengthAnswerNo, isStrengthAnswerComplete, isStrengthYesIncomplete } from "@/lib/onboarding/strengthAnswer";
import { loadQuestions } from "@/lib/onboarding/questions";
import { saveOnboardingForUser } from "@/lib/onboarding/saveOnboarding";
import { calculateMemberLevel } from "@/lib/onboarding/memberLevel";
import { writeFlowSession, readFlowSession, sportFromAnswers } from "@/lib/flowSession";
import type { FormQuestion, OnboardingAnswers, OnboardingAnswerValue, StrengthAnswer } from "@/types/onboarding";

type Phase = "splash" | "question" | "summary";

const ONBOARDING_BG = "#0a1018";

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
  const [strengthError, setStrengthError] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<string | undefined>();
  const [levelLoading, setLevelLoading] = useState(false);
  const savingRef = useRef(false);

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
  const canContinueQuestion =
    currentQuestion != null &&
    (currentQuestion.id === 2
      ? isNameAndBirthDateValid(answers["2"], answers["14"])
      : isAnswerValid(currentQuestion, answers[String(currentQuestion.id)]));

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

  useEffect(() => {
    if (phase !== "summary" || !user) return;

    let cancelled = false;
    setLevelLoading(true);
    setSkillLevel(undefined);

    (async () => {
      try {
        const idToken = await user.getIdToken();
        const level = await calculateMemberLevel(idToken, answers, user.uid);
        if (!cancelled) setSkillLevel(level.recommendedLevel);
      } catch {
        if (!cancelled) setSkillLevel(undefined);
      } finally {
        if (!cancelled) setLevelLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase, user, answers]);

  const handleAnswerChange = (value: OnboardingAnswerValue) => {
    if (!currentQuestion) return;
    let next = { ...answers, [String(currentQuestion.id)]: value };
    if (currentQuestion.id === 5) {
      next = applyStrengthBranchRules(next, 5, value);
      setStrengthError(null);
    }
    persistAnswers(next);
  };

  const handleBirthDateChange = (value: OnboardingAnswerValue) => {
    persistAnswers({ ...answers, "14": value });
  };

  const handleStrengthChange = (value: StrengthAnswer) => {
    handleAnswerChange(value);
  };

  const goNextQuestion = () => {
    if (!currentQuestion) return;

    const rawAnswer = answers[String(currentQuestion.id)];

    if (currentQuestion.id === 5 && isStrengthYesIncomplete(rawAnswer)) {
      setStrengthError(t("appFlow.onboarding.strength.incompleteFields"));
      return;
    }

    setStrengthError(null);

    if (currentQuestion.id === 2) {
      if (!isNameAndBirthDateValid(rawAnswer, answers["14"])) return;
    } else if (!isAnswerValid(currentQuestion, rawAnswer)) {
      return;
    }

    if (currentQuestion.id === 5 && !isStrengthAnswerComplete(rawAnswer)) return;

    const strengthNo = currentQuestion.id === 5 && isStrengthAnswerNo(rawAnswer);

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
    if (!user) {
      setError(t("appFlow.onboarding.authRequired"));
      return;
    }
    if (savingRef.current) return;

    savingRef.current = true;
    setSubmitting(true);
    setError(null);

    const sport = sportFromAnswers(answers);
    try {
      const result = await saveOnboardingForUser(user, answers, questions, {
        generatePlan: true,
      });

      writeFlowSession({
        questionnaireCompleted: true,
        onboardingAnswers: answers,
        primarySport: sport,
        skillLevel: result.skillLevel,
        planId: result.planId,
      });
      notifyFlowSessionChange();
      setSkillLevel(result.skillLevel);

      navigate(localePath("/entrenamiento"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("appFlow.onboarding.error"));
      setSubmitting(false);
      savingRef.current = false;
    }
  };

  if (loadingQuestions) {
    return (
      <FlowGuard require="onboarding">
        <div
          className="flex items-center justify-center min-h-screen"
          style={{ background: ONBOARDING_BG }}
        >
          <div
            className="rounded-full h-12 w-12 border-b-2 border-bivo-green"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
        </div>
      </FlowGuard>
    );
  }

  if (phase === "splash") {
    return (
      <FlowGuard require="onboarding">
        <FlowLayout badge={t("appFlow.onboarding.badge")}>
          <FormSplashScreen onStart={() => setPhase("question")} />
        </FlowLayout>
      </FlowGuard>
    );
  }

  return (
    <FlowGuard require="onboarding">
      <div className="min-h-screen text-white" style={{ background: ONBOARDING_BG }}>
        <div className={`mx-auto px-4 py-6 sm:py-8 lg:py-12 ${phase === "summary" ? "max-w-xl lg:max-w-3xl" : "max-w-md lg:max-w-2xl"}`}>
          <div className="flex justify-center mb-5 lg:mb-8">
            <img
              src="/brand/logo-bivo-verde.png"
              alt={t("nav.logoAlt")}
              className="h-9 lg:h-12 w-auto object-contain"
            />
          </div>

          <FlowUserBar />

          {phase === "question" && currentQuestion && (
            <>
              <div className="flex items-center justify-between mb-6 mt-4">
                <OnboardingBackButton onClick={goBack} label={t("appFlow.onboarding.back")} />
                <OnboardingProgressRing current={progressCurrent} total={progressTotal} />
              </div>

              <h1 className="font-round text-2xl sm:text-[1.65rem] lg:text-3xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                {currentQuestion.question}
              </h1>

              {currentQuestion.id === 5 ? (
                <StrengthQuestionStep
                  question={currentQuestion}
                  value={answers[String(currentQuestion.id)]}
                  onChange={handleStrengthChange}
                  validationError={strengthError}
                />
              ) : (
                <OnboardingQuestionStep
                  question={currentQuestion}
                  value={answers[String(currentQuestion.id)]}
                  onChange={handleAnswerChange}
                  weekdayLabels={weekdayLabels}
                  birthDateValue={answers["14"]}
                  onBirthDateChange={
                    currentQuestion.id === 2 ? handleBirthDateChange : undefined
                  }
                  birthDateLabel={
                    questions.find((q) => q.id === 14)?.question ??
                    t("appFlow.onboarding.birthDate.title")
                  }
                />
              )}

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mt-4">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={goNextQuestion}
                disabled={!canContinueQuestion}
                className={`${onboardingContinueButtonClass(canContinueQuestion)} mt-8`}
              >
                {questionIndex >= filteredQuestions.length - 1
                  ? t("appFlow.onboarding.finish")
                  : t("appFlow.onboarding.cta")}
              </button>
            </>
          )}

          {phase === "summary" && (
            <>
              <div className="flex items-center mb-5 mt-2">
                <OnboardingBackButton onClick={goBack} label={t("appFlow.onboarding.back")} />
              </div>

              <h1 className="font-round text-[1.75rem] sm:text-3xl font-bold text-white text-center mb-2 leading-tight">
                {t("appFlow.onboarding.summary.title")}
              </h1>
              <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed max-w-sm mx-auto">
                {t("appFlow.onboarding.summary.subtitle")}
              </p>

              <OnboardingSummaryScreen
                answers={answers}
                skillLevel={skillLevel}
                levelLoading={levelLoading}
                submitting={submitting}
                weekdayLabels={weekdayLabels}
                onContinue={handleSummaryContinue}
              />
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mt-4">
                  {error}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </FlowGuard>
  );
};

export default OnboardingPage;
