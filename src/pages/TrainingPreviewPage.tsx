import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/hooks/useLocale";
import { writeFlowSession } from "@/lib/flowSession";
import { TRIAL_DAYS } from "@/lib/config";
import { loadMemberPlanWorkouts } from "@/lib/onboarding/planWorkouts";
import type { PlanWorkoutSummary } from "@/lib/onboarding/memberLevel";
import { SplitExerciseRow, onboardingContinueClass } from "@/components/onboarding/OnboardingUi";

const WORKOUT_SCREEN = "/assets2/app-screens/workout-progress.png";
const DETAIL_SCREEN = "/assets2/app-screens/workout-detail.png";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  pickleball: "Pickleball",
  badminton: "Bádminton",
};

function levelLabel(level: string | undefined, t: (k: string) => string): string {
  if (!level) return "—";
  const key = `appFlow.onboarding.summary.levels.${level.toLowerCase()}`;
  const translated = t(key);
  return translated !== key ? translated : level;
}

function blockTitle(title: string, t: (k: string) => string): string {
  const key = `appFlow.training.blocks.${title.toLowerCase().replace(/\s+/g, "-")}`;
  const translated = t(key);
  return translated !== key ? translated : title;
}

const TrainingPreviewPage = () => {
  const { t } = useTranslation();
  const { localePath, lang } = useLocale();
  const { user } = useAuth();
  const { session, member } = useAppFlow();
  const [planWorkouts, setPlanWorkouts] = useState<PlanWorkoutSummary[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [planError, setPlanError] = useState<string | null>(null);

  const sportKey =
    member?.primarySport ??
    member?.sport ??
    member?.sportType ??
    "";
  const sport =
    SPORT_LABELS[sportKey] ?? (sportKey || t("appFlow.training.defaultSport"));
  const level = session.skillLevel ?? member?.skillLevel ?? undefined;

  useEffect(() => {
    let cancelled = false;

    async function loadPlan() {
      if (!user) {
        setLoadingPlan(false);
        return;
      }

      setLoadingPlan(true);
      setPlanError(null);

      try {
        const plan = await loadMemberPlanWorkouts(user.uid, lang);
        if (!cancelled) {
          setPlanWorkouts(plan.workouts);
        }
      } catch (err) {
        if (!cancelled) {
          setPlanError(err instanceof Error ? err.message : t("appFlow.training.planLoadError"));
          setPlanWorkouts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingPlan(false);
        }
      }
    }

    loadPlan();
    return () => {
      cancelled = true;
    };
  }, [user, member?.currentPlanRefs, lang, t]);

  const firstWorkout = planWorkouts[0];
  const exerciseCount = useMemo(() => {
    if (firstWorkout?.blocks?.length) {
      return firstWorkout.blocks.reduce((sum, block) => sum + block.exercises.length, 0);
    }
    return firstWorkout?.exerciseCount ?? 0;
  }, [firstWorkout]);

  const planMeta = firstWorkout
    ? t("appFlow.training.planSessionMeta", {
        duration: firstWorkout.durationMinutes ?? 35,
        exercises: exerciseCount,
        level: levelLabel(level, t),
      })
    : "";

  const handleTrialClick = () => {
    writeFlowSession({ trainingViewed: true });
    notifyFlowSessionChange();
  };

  return (
    <FlowGuard require="training">
      <FlowLayout
        badge={t("appFlow.training.badge")}
        title={t("appFlow.training.title", { sport })}
        subtitle={t("appFlow.training.subtitle")}
      >
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="flex justify-center">
            <div className="relative w-[260px] sm:w-[280px]">
              <div className="relative rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden aspect-[9/19.5]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 rounded-b-xl z-20" />
                <div className="absolute inset-0 pt-6 pb-2 px-1">
                  <img
                    src={WORKOUT_SCREEN}
                    alt={t("appFlow.training.screenAlt")}
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-[2rem]"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-28 rounded-2xl border-2 border-bivo-green/40 shadow-xl overflow-hidden hidden sm:block"
                style={{ boxShadow: "0 12px 40px rgba(57,255,20,0.2)" }}
              >
                <img
                  src={DETAIL_SCREEN}
                  alt={t("appFlow.training.detailAlt")}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121c2e] p-5 sm:p-6">
            {loadingPlan && (
              <div className="py-8 text-center">
                <div
                  className="mx-auto mb-4 rounded-full h-10 w-10 border-b-2 border-bivo-green"
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
                <p className="text-sm text-gray-400">{t("appFlow.training.loadingPlan")}</p>
              </div>
            )}

            {!loadingPlan && planError && (
              <div className="py-8 text-center">
                <p className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                  {planError}
                </p>
              </div>
            )}

            {!loadingPlan && !planError && firstWorkout && (
              <>
                <p className="text-xs uppercase tracking-widest text-bivo-green font-bold mb-2">
                  {t("appFlow.training.planLabel")}
                </p>
                <h2 className="font-round text-xl font-bold text-white mb-1">
                  {firstWorkout.title ?? firstWorkout.name}
                </h2>
                <p className="text-sm text-gray-400 mb-6">{planMeta}</p>

                <div className="space-y-6 mb-8 max-h-[55vh] overflow-y-auto pr-1">
                  {firstWorkout.blocks?.map((block) => (
                    <div key={block.id}>
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                        {blockTitle(block.title, t)}
                      </p>
                      <ul className="space-y-2">
                        {block.exercises.map((exercise) => (
                          <li key={exercise.id}>
                            <SplitExerciseRow
                              name={exercise.name}
                              imageUrl={exercise.imageUrl}
                              meta={
                                exercise.series && exercise.repetitions
                                  ? t("appFlow.training.exerciseSets", {
                                      series: exercise.series,
                                      reps: exercise.repetitions,
                                    })
                                  : undefined
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-bivo-green/20 bg-bivo-green/[0.06] px-4 py-3 mb-6">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t("appFlow.training.hintGenerated", { count: planWorkouts.length })}
                  </p>
                </div>

            <Link
              to={localePath("/paywall")}
              onClick={handleTrialClick}
              className={`block text-center ${onboardingContinueClass}`}
            >
                  {t("appFlow.training.cta", { days: TRIAL_DAYS })}
                </Link>

                <p className="text-center text-xs text-gray-500 mt-4">
                  {t("appFlow.training.trialNote", { days: TRIAL_DAYS })}
                </p>
              </>
            )}
          </div>
        </div>
      </FlowLayout>
    </FlowGuard>
  );
};

export default TrainingPreviewPage;
