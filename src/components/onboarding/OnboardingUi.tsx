import { Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export const onboardingInputClass =
  "w-full px-5 py-4 rounded-2xl border border-white/10 bg-[#121c2e] text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/50 focus:border-bivo-green/40 transition";

export const onboardingContinueClass =
  "w-full py-4 rounded-full bg-bivo-green text-black font-bold text-base disabled:opacity-40 transition hover:bg-opacity-90";

interface ProgressRingProps {
  current: number;
  total: number;
}

export function OnboardingProgressRing({ current, total }: ProgressRingProps) {
  const pct = total > 0 ? current / total : 0;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44" aria-hidden>
        <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#39ff14"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">
        {current}/{total}
      </span>
    </div>
  );
}

interface SplitOptionCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  imageSrc?: string;
  subtitle?: string;
}

export function SplitOptionCard({
  label,
  selected,
  onSelect,
  imageSrc,
  subtitle,
}: SplitOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full min-h-[76px] overflow-hidden rounded-2xl border-2 text-left transition-all ${
        selected
          ? "border-bivo-green bg-[#121c2e]"
          : "border-white/10 bg-[#121c2e] hover:border-white/20"
      }`}
    >
      <span className="flex flex-1 flex-col justify-center px-4 py-3 min-w-0">
        <span className={`text-sm font-medium leading-snug ${selected ? "text-bivo-green" : "text-white"}`}>
          {label}
        </span>
        {subtitle && (
          <span className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-500">{subtitle}</span>
        )}
      </span>
      {imageSrc && (
        <span className="flex w-[38%] min-w-[108px] max-w-[132px] items-center justify-center bg-white px-2 py-1">
          <img src={imageSrc} alt="" className="max-h-[68px] w-full object-contain" loading="lazy" />
        </span>
      )}
    </button>
  );
}

interface MobilityOptionCardProps {
  label: string;
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
  imageSrc?: string;
}

export function MobilityOptionCard({
  label,
  subtitle,
  selected,
  onSelect,
  imageSrc,
}: MobilityOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full overflow-hidden rounded-2xl border-2 text-left transition-all ${
        selected
          ? "border-bivo-green bg-[#121c2e]"
          : "border-white/10 bg-[#121c2e] hover:border-white/20"
      }`}
    >
      {imageSrc && (
        <div className="bg-[#f3efe6] px-2 py-2">
          <img src={imageSrc} alt="" className="mx-auto h-28 w-full object-contain" loading="lazy" />
        </div>
      )}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className={`font-semibold ${selected ? "text-bivo-green" : "text-white"}`}>{label}</p>
          {subtitle && (
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <ChevronRight size={18} className="shrink-0 text-gray-500" />
      </div>
    </button>
  );
}

interface RadioOptionRowProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioOptionRow({ label, selected, onSelect }: RadioOptionRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-sm transition-all ${
        selected
          ? "border-bivo-green bg-[#121c2e] text-bivo-green"
          : "border-white/10 bg-[#121c2e] text-gray-300 hover:border-white/20"
      }`}
    >
      <span>{label}</span>
      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bivo-green text-black">
          <Check size={14} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export function ExerciseImageBox({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-white px-3 py-4">
      <img src={src} alt={alt} className="mx-auto max-h-44 w-full object-contain" loading="lazy" />
    </div>
  );
}

interface SplitExerciseRowProps {
  name: string;
  meta?: string;
  imageUrl?: string;
}

export function SplitExerciseRow({ name, meta, imageUrl }: SplitExerciseRowProps) {
  return (
    <div className="flex min-h-[76px] overflow-hidden rounded-2xl border border-white/10 bg-[#121c2e]">
      <div className="flex flex-1 flex-col justify-center px-4 py-3 min-w-0">
        <p className="text-sm font-medium text-white leading-snug">{name}</p>
        {meta && <p className="text-xs text-gray-500 mt-0.5">{meta}</p>}
      </div>
      {imageUrl ? (
        <div className="flex w-[38%] min-w-[108px] max-w-[132px] items-center justify-center bg-white px-2 py-1">
          <img src={imageUrl} alt={name} className="max-h-[68px] w-full object-contain" loading="lazy" />
        </div>
      ) : (
        <div className="flex w-[38%] min-w-[108px] max-w-[132px] items-center justify-center bg-white/10">
          <Check size={20} className="text-bivo-green" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export function OnboardingBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition"
    >
      <ChevronRight size={20} className="rotate-180" />
    </button>
  );
}

export function OnboardingQuestionShell({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
