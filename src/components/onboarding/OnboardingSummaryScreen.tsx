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

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#141c2a] text-bivo-green [&>svg]:h-[22px] [&>svg]:w-[22px]">
      {children}
    </span>
  );
}

function RacketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.5 3.5c2.8 0 5 2.2 5 5 0 3.4-2.6 6.2-5.2 8.5L12 19.2l-2.3-2.2C7.1 14.7 4.5 11.9 4.5 8.5c0-2.8 2.2-5 5-5 1.4 0 2.7.6 3.5 1.5.8-.9 2.1-1.5 3.5-1.5Z" />
      <circle cx="12" cy="9.5" r="2.2" />
      <path d="M12 19.2 10.2 22" />
      <path d="M8.5 6.8h7M7.8 9.5h8.4M8.5 12.2h7" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20V12" />
      <path d="M10 20V6" />
      <path d="M16 20v-8" />
      <path d="M22 20V3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}

function KneeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3c0 2.5-.4 4.2-1.2 6.2-.7 1.7-1.3 3-1.3 5.3 0 3 2 5.5 5.5 5.5S16.5 17.5 16.5 14.5c0-2-.5-3.4-1.3-5.1C14.3 7.3 14 5.6 14 3" />
      <circle cx="11.5" cy="13.5" r="2.2" />
      <path d="M9.8 12.2 7.5 9.5M13.2 12.2 15.5 9.5" />
    </svg>
  );
}

function HipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 4c0 2.2-1 4.5-1 7 0 2.8 1.8 4.5 5 4.5s5-1.7 5-4.5c0-2.5-1-4.8-1-7" />
      <path d="M7 11.5c-1.8.4-3 1.8-3 3.7C4 18 6.2 20 9 20h6c2.8 0 5-2 5-4.8 0-1.9-1.2-3.3-3-3.7" />
      <path d="M12 15.5V20" />
    </svg>
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
      className={`flex flex-1 items-center gap-3 min-h-0 ${
        isLast ? "" : "border-b border-white/[0.08]"
      }`}
    >
      <IconBox>{icon}</IconBox>
      <div className="min-w-0 [text-shadow:0_1px_3px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9)]">
        <p className="text-[10px] uppercase tracking-[0.07em] text-white/80 mb-0.5 leading-tight font-semibold">
          {label}
        </p>
        <div className="text-[16px] sm:text-[17px] font-extrabold text-white leading-snug">{children}</div>
        {note && <p className="text-[11px] text-white/70 mt-0.5 font-medium">{note}</p>}
      </div>
    </div>
  );
}

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

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[18px] border border-bivo-green/45 bg-black aspect-[3/2] min-h-[320px]">
        <img
          src="/onboarding/padel-players-summary.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain object-center select-none"
          draggable={false}
        />

        <div className="relative z-10 flex h-full min-h-[320px] w-[50%] flex-col justify-between py-4 pl-4 pr-2 sm:py-5 sm:pl-5">
          <SummaryRow icon={<RacketIcon />} label={t("appFlow.onboarding.summary.sport")}>
            {sportLabel(sport, t)}
          </SummaryRow>

          <SummaryRow icon={<LevelIcon />} label={t("appFlow.onboarding.summary.level")}>
            {levelLoading
              ? t("appFlow.onboarding.summary.calculatingLevel")
              : levelLabel(skillLevel, t)}
          </SummaryRow>

          {daysLabel && (
            <SummaryRow
              icon={<CalendarIcon />}
              label={t("appFlow.onboarding.summary.frequency")}
              note={t("appFlow.onboarding.summary.frequencyNote")}
            >
              {daysLabel}
            </SummaryRow>
          )}

          {pains.length > 0 && (
            <SummaryRow icon={<KneeIcon />} label={t("appFlow.onboarding.summary.painsTitle")}>
              <div className="flex flex-wrap gap-1.5">
                {pains.map((p) => (
                  <span
                    key={p}
                    className="text-[13px] font-semibold px-2.5 py-[3px] rounded-full bg-[#5a2428]/90 border border-[#a34b52]/50 text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </SummaryRow>
          )}

          {mobility.length > 0 && (
            <SummaryRow
              icon={<HipIcon />}
              label={t("appFlow.onboarding.summary.mobilityTitle")}
              isLast
            >
              <div className="flex flex-wrap gap-1.5">
                {mobility.map((m) => (
                  <span
                    key={m}
                    className="text-[13px] font-semibold px-2.5 py-[3px] rounded-full bg-[#4a321c]/90 border border-[#9a6a3a]/45 text-white"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </SummaryRow>
          )}
        </div>
      </div>

      <div className="rounded-[18px] border border-white/10 bg-[#0e1520] p-4 flex gap-3.5 items-start">
        <ShieldCheck size={26} className="shrink-0 text-bivo-green mt-0.5" strokeWidth={1.75} />
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
