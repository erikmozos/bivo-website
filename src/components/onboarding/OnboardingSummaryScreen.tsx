import { useTranslation } from "react-i18next";
import { TRIAL_DAYS } from "@/lib/config";
import type { OnboardingAnswers } from "@/types/onboarding";
import { onboardingContinueClass } from "./OnboardingUi";

interface OnboardingSummaryScreenProps {
  answers: OnboardingAnswers;
  skillLevel?: string;
  levelLoading?: boolean;
  submitting?: boolean;
  onContinue: () => void;
}

function sportLabel(sport: string, t: (k: string) => string): string {
  const key = `appFlow.onboarding.summary.sports.${sport}`;
  const translated = t(key);
  return translated !== key ? translated : sport;
}

function levelLabel(level: string | undefined, t: (k: string) => string): string {
  if (!level) return "—";
  const key = `appFlow.onboarding.summary.levels.${level.toLowerCase()}`;
  const translated = t(key);
  return translated !== key ? translated : level;
}

function listLabels(
  values: unknown,
  prefix: string,
  t: (k: string) => string
): string[] {
  if (!Array.isArray(values) || values.length === 0) return [];
  return values.map((v) => {
    const key = `${prefix}.${v}`;
    const translated = t(key);
    return translated !== key ? translated : String(v);
  });
}

const OnboardingSummaryScreen = ({
  answers,
  skillLevel,
  levelLoading,
  submitting,
  onContinue,
}: OnboardingSummaryScreenProps) => {
  const { t } = useTranslation();

  const sport = answers["3"] ? String(answers["3"]) : "";
  const pains = listLabels(answers["6"], "appFlow.onboarding.summary.pains", t);
  const mobility = listLabels(answers["4"], "appFlow.onboarding.summary.mobility", t);
  const days = Array.isArray(answers["8"]) ? answers["8"].length : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-[#121c2e] p-5">
        <p className="text-xs uppercase tracking-widest text-bivo-green font-bold mb-4">
          {t("appFlow.onboarding.summary.badge")}
        </p>

        <dl className="space-y-4 mb-6">
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {t("appFlow.onboarding.summary.sport")}
            </dt>
            <dd className="text-white font-semibold">{sportLabel(sport, t)}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {t("appFlow.onboarding.summary.level")}
            </dt>
            <dd className="text-white font-semibold">
              {levelLoading
                ? t("appFlow.onboarding.summary.calculatingLevel")
                : levelLabel(skillLevel, t)}
            </dd>
          </div>
          {days > 0 && (
            <div>
              <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {t("appFlow.onboarding.summary.frequency")}
              </dt>
              <dd className="text-white font-semibold">
                {t("appFlow.onboarding.summary.daysPerWeek", { count: days })}
              </dd>
            </div>
          )}
          {pains.length > 0 && (
            <div>
              <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {t("appFlow.onboarding.summary.painsTitle")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {pains.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-200"
                  >
                    {p}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {mobility.length > 0 && (
            <div>
              <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {t("appFlow.onboarding.summary.mobilityTitle")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {mobility.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-100"
                  >
                    {m}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <button
          type="button"
          onClick={onContinue}
          disabled={submitting || levelLoading || !skillLevel}
          className={`${onboardingContinueClass} disabled:opacity-60`}
        >
          {submitting
            ? t("appFlow.onboarding.summary.submitting")
            : t("appFlow.onboarding.summary.cta", { days: TRIAL_DAYS })}
        </button>
        {submitting && (
          <p className="text-center text-xs text-gray-500 mt-3">
            {t("appFlow.onboarding.processingPlan")}
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingSummaryScreen;
