import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import type { OnboardingAnswers } from "@/types/onboarding";
import { TRIAL_DAYS } from "@/lib/config";

interface OnboardingSummaryScreenProps {
  answers: OnboardingAnswers;
  skillLevel?: string;
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
  submitting,
  onContinue,
}: OnboardingSummaryScreenProps) => {
  const { t } = useTranslation();

  const sport = answers["3"] ? String(answers["3"]) : "";
  const pains = listLabels(answers["6"], "appFlow.onboarding.summary.pains", t);
  const mobility = listLabels(answers["4"], "appFlow.onboarding.summary.mobility", t);
  const level = skillLevel ?? (answers["7"] ? String(answers["7"]) : undefined);
  const days = Array.isArray(answers["8"]) ? answers["8"].length : 0;
  const exercises = t("appFlow.training.exercises", { returnObjects: true }) as string[];

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        style={{ boxShadow: "0 0 80px rgba(57,255,20,0.06)" }}
      >
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
            <dd className="text-white font-semibold">{levelLabel(level, t)}</dd>
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

        <p className="text-sm text-gray-400 mb-4">{t("appFlow.onboarding.summary.planTeaser")}</p>

        <ul className="space-y-2 mb-6">
          {exercises.slice(0, 4).map((name) => (
            <li key={name} className="flex items-center gap-2 text-sm text-gray-300">
              <Check size={14} className="text-bivo-green shrink-0" />
              {name}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onContinue}
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm disabled:opacity-60"
        >
          {submitting
            ? t("appFlow.onboarding.summary.submitting")
            : t("appFlow.onboarding.summary.cta", { days: TRIAL_DAYS })}
        </button>
      </div>
    </div>
  );
};

export default OnboardingSummaryScreen;
