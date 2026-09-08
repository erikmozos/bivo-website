import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TRIAL_DAYS } from "@/lib/config";
import type { OnboardingAnswers } from "@/types/onboarding";
import { onboardingContinueClass } from "./OnboardingUi";

interface OnboardingSummaryScreenProps {
  answers: OnboardingAnswers;
  skillLevel?: string;
  levelLoading?: boolean;
  submitting?: boolean;
  weekdayLabels?: Record<string, string>;
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

const ICON_DIR = "/onboarding/summary-icons";

const SPORT_ICONS: Record<string, string> = {
  padel: `${ICON_DIR}/padel.png`,
  tenis: `${ICON_DIR}/tenis.png`,
  pickleball: `${ICON_DIR}/pickleball.png`,
  badminton: `${ICON_DIR}/badminton.png`,
};

function SummaryIcon({ src }: { src: string }) {
  return (
    <span className="isolate flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#0e141d]">
      <img
        src={src}
        alt=""
        aria-hidden
        className="h-full w-full object-cover mix-blend-lighten select-none"
        draggable={false}
      />
    </span>
  );
}

function SummaryRow({
  icon,
  label,
  children,
  note,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  note?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 py-4 ${
        isLast ? "" : "border-b border-white/[0.08]"
      }`}
    >
      {icon}
      <div className="min-w-0 flex-1 [text-shadow:0_1px_3px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9)]">
        <p className="text-[11px] uppercase tracking-[0.08em] text-white/80 mb-1 font-semibold">
          {label}
        </p>
        <div className="text-[16px] sm:text-[17px] font-extrabold text-white leading-snug">
          {children}
        </div>
        {note && <p className="text-[12px] text-white/70 mt-1 font-medium">{note}</p>}
      </div>
    </div>
  );
}

const SUMMARY_HERO_BY_SPORT: Record<string, string> = {
  padel: "/onboarding/padel-players-summary.png",
  tenis: "/onboarding/tenis-players-summary.png",
  badminton: "/onboarding/badminton-players-summary.png",
  pickleball: "/onboarding/pickleball-players-summary.png",
};

const OnboardingSummaryScreen = ({
  answers,
  skillLevel,
  levelLoading,
  submitting,
  weekdayLabels,
  onContinue,
}: OnboardingSummaryScreenProps) => {
  const { t, i18n } = useTranslation();

  const sport = answers["3"] ? String(answers["3"]) : "";
  const heroImage = SUMMARY_HERO_BY_SPORT[sport];
  const hasHero = Boolean(heroImage);
  const pains = listLabels(answers["6"], "appFlow.onboarding.summary.pains", t);
  const mobility = listLabels(answers["4"], "appFlow.onboarding.summary.mobility", t);
  const selectedDays = Array.isArray(answers["8"]) ? (answers["8"] as string[]) : [];
  const dayNames =
    weekdayLabels && selectedDays.length > 0
      ? selectedDays.map((id) => weekdayLabels[id] ?? id)
      : [];
  const daysLabel =
    dayNames.length > 0
      ? new Intl.ListFormat(i18n.language, { style: "long", type: "conjunction" }).format(dayNames)
      : selectedDays.length > 0
        ? t("appFlow.onboarding.summary.daysPerWeek", { count: selectedDays.length })
        : null;

  const chipClass = hasHero
    ? {
        pain: "bg-[#5a2428]/90 border border-[#a34b52]/50 text-white",
        mobility: "bg-[#4a321c]/90 border border-[#9a6a3a]/45 text-white",
      }
    : {
        pain: "bg-red-500/15 border border-red-400/30 text-red-200",
        mobility: "bg-amber-500/15 border border-amber-400/30 text-amber-100",
      };

  const rows = (
    <>
      <SummaryRow
        icon={<SummaryIcon src={SPORT_ICONS[sport] ?? SPORT_ICONS.padel} />}
        label={t("appFlow.onboarding.summary.sport")}
      >
        {sportLabel(sport, t)}
      </SummaryRow>

      <SummaryRow
        icon={<SummaryIcon src={`${ICON_DIR}/level.png`} />}
        label={t("appFlow.onboarding.summary.level")}
      >
        {levelLoading
          ? t("appFlow.onboarding.summary.calculatingLevel")
          : levelLabel(skillLevel, t)}
      </SummaryRow>

      {daysLabel && (
        <SummaryRow
          icon={<SummaryIcon src={`${ICON_DIR}/calendar.png`} />}
          label={t("appFlow.onboarding.summary.frequency")}
          note={t("appFlow.onboarding.summary.frequencyNote")}
        >
          {daysLabel}
        </SummaryRow>
      )}

      {pains.length > 0 && (
        <SummaryRow
          icon={<SummaryIcon src={`${ICON_DIR}/knee.png?v=5`} />}
          label={t("appFlow.onboarding.summary.painsTitle")}
        >
          <div className="flex flex-wrap gap-1.5">
            {pains.map((p) => (
              <span
                key={p}
                className={`text-[13px] font-semibold px-2.5 py-[3px] rounded-full ${chipClass.pain}`}
              >
                {p}
              </span>
            ))}
          </div>
        </SummaryRow>
      )}

      {mobility.length > 0 && (
        <SummaryRow
          icon={<SummaryIcon src={`${ICON_DIR}/hip.png?v=5`} />}
          label={t("appFlow.onboarding.summary.mobilityTitle")}
          isLast
        >
          <div className="flex flex-wrap gap-1.5">
            {mobility.map((m) => (
              <span
                key={m}
                className={`text-[13px] font-semibold px-2.5 py-[3px] rounded-full ${chipClass.mobility}`}
              >
                {m}
              </span>
            ))}
          </div>
        </SummaryRow>
      )}
    </>
  );

  return (
    <div className="space-y-5">
      <div
        className={`relative overflow-hidden rounded-[20px] border border-bivo-green/40 bg-[#0a0f18] ${
          hasHero ? "aspect-[3/2] min-h-[320px]" : ""
        }`}
      >
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain object-center select-none"
            draggable={false}
          />
        )}

        <div
          className={`relative z-10 ${
            hasHero
              ? "flex h-full min-h-[320px] w-[50%] flex-col justify-between py-4 pl-4 pr-2 sm:py-5 sm:pl-5"
              : "p-5 sm:p-6"
          }`}
        >
          {hasHero ? (
            rows
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 sm:px-5">{rows}</div>
          )}
        </div>
      </div>

      <div className="rounded-[18px] border border-bivo-green/20 bg-bivo-green/[0.05] p-4 flex gap-3.5 items-start">
        <ShieldCheck size={26} className="shrink-0 text-bivo-green mt-0.5 drop-shadow-[0_0_5px_rgba(57,255,20,0.55)]" strokeWidth={1.75} />
        <div>
          <p className="font-bold text-white text-[15px] leading-snug">
            {t("appFlow.onboarding.summary.guaranteeTitle")}
          </p>
          <p className="text-[13px] text-gray-400 leading-relaxed mt-1">
            {t("appFlow.onboarding.summary.guaranteeBody")}
          </p>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={onContinue}
          disabled={submitting || levelLoading || !skillLevel}
          className={`${onboardingContinueClass} disabled:opacity-60 flex items-center justify-center gap-2`}
        >
          {submitting
            ? t("appFlow.onboarding.summary.submitting")
            : t("appFlow.onboarding.summary.cta", { days: TRIAL_DAYS })}
          {!submitting && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
        {submitting ? (
          <p className="text-center text-xs text-gray-500 mt-3">
            {t("appFlow.onboarding.processingPlan")}
          </p>
        ) : (
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-500 mt-3">
            <Lock size={12} />
            {t("appFlow.onboarding.summary.noCommitment")}
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingSummaryScreen;
