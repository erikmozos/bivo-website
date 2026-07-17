import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import { sportFromAnswers, writeFlowSession } from "@/lib/flowSession";
import { TRIAL_DAYS } from "@/lib/config";

const WORKOUT_SCREEN = "/assets2/app-screens/workout-progress.png";
const DETAIL_SCREEN = "/assets2/app-screens/workout-detail.png";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  pickleball: "Pickleball",
  badminton: "Bádminton",
};

const TrainingPreviewPage = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const { session } = useAppFlow();

  const answers = session.onboardingAnswers ?? {};
  const sportKey = sportFromAnswers(session.onboardingAnswers) ?? "";
  const sport =
    SPORT_LABELS[sportKey] ?? (sportKey || t("appFlow.training.defaultSport"));
  const exercises = t("appFlow.training.exercises", { returnObjects: true }) as string[];
  const level = answers["7"] ? String(answers["7"]) : "principiante";

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

          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            style={{ boxShadow: "0 0 80px rgba(57,255,20,0.06)" }}
          >
            <p className="text-xs uppercase tracking-widest text-bivo-green font-bold mb-2">
              {t("appFlow.training.planLabel")}
            </p>
            <h2 className="font-round text-xl font-bold text-white mb-1">
              {t("appFlow.training.planTitle")}
            </h2>
            <p className="text-sm text-gray-400 mb-2">{t("appFlow.training.planMeta")}</p>
            <p className="text-xs text-gray-500 mb-6 capitalize">
              {t("appFlow.onboarding.summary.level")}: {level}
            </p>

            <ul className="space-y-3 mb-8">
              {exercises.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bivo-green/15 text-bivo-green">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-200">{name}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-bivo-green/20 bg-bivo-green/[0.06] px-4 py-3 mb-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                {t("appFlow.training.hint")}
              </p>
            </div>

            <Link
              to={localePath("/registro")}
              onClick={handleTrialClick}
              className="block w-full py-3.5 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm text-center hover:bg-opacity-90 transition"
            >
              {t("appFlow.training.cta", { days: TRIAL_DAYS })}
            </Link>

            <p className="text-center text-xs text-gray-500 mt-4">
              {t("appFlow.training.trialNote", { days: TRIAL_DAYS })}
            </p>
          </div>
        </div>
      </FlowLayout>
    </FlowGuard>
  );
};

export default TrainingPreviewPage;
