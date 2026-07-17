import type { FormQuestion, OnboardingAnswerValue } from "@/types/onboarding";
import { MAX_TRAINING_DAYS, WEEKDAYS } from "@/lib/onboarding/weekdays";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/60 focus:border-bivo-green/40 transition";

interface OnboardingQuestionStepProps {
  question: FormQuestion;
  value: OnboardingAnswerValue | undefined;
  onChange: (value: OnboardingAnswerValue) => void;
  weekdayLabels: Record<string, string>;
}

const OnboardingQuestionStep = ({
  question,
  value,
  onChange,
  weekdayLabels,
}: OnboardingQuestionStepProps) => {
  switch (question.type) {
    case "string":
      return (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={inputClass}
          autoComplete="given-name"
        />
      );

    case "select":
    case "radio":
      return (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {question.options?.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                  selected
                    ? "bg-bivo-green/15 border-bivo-green text-white"
                    : "bg-white/[0.03] border-white/10 text-gray-300 hover:border-bivo-green/40"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      );

    case "checkbox": {
      const selected = Array.isArray(value) ? value : [];
      const toggle = (optValue: string) => {
        if (selected.includes(optValue)) {
          onChange(selected.filter((v) => v !== optValue));
        } else {
          onChange([...selected, optValue]);
        }
      };
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
          {question.options?.map((opt) => {
            const isOn = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs sm:text-sm transition-all ${
                  isOn
                    ? "bg-bivo-green/15 border-bivo-green text-white"
                    : "bg-white/[0.03] border-white/10 text-gray-300 hover:border-bivo-green/40"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      );
    }

    case "weekdays": {
      const selected = Array.isArray(value) ? value : [];
      const toggleDay = (day: string) => {
        if (selected.includes(day)) {
          onChange(selected.filter((d) => d !== day));
        } else if (selected.length < MAX_TRAINING_DAYS) {
          onChange([...selected, day]);
        }
      };
      return (
        <div>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {WEEKDAYS.map((day) => {
              const isOn = selected.includes(day.value);
              const disabled = !isOn && selected.length >= MAX_TRAINING_DAYS;
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  disabled={disabled}
                  title={weekdayLabels[day.value]}
                  className={`w-11 h-11 rounded-full border-2 font-bold text-sm transition-all ${
                    isOn
                      ? "bg-bivo-green text-black border-bivo-green"
                      : disabled
                        ? "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-white/[0.04] border-white/15 text-gray-300 hover:border-bivo-green/40"
                  }`}
                >
                  {day.short}
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-500">
            {selected.length}/{MAX_TRAINING_DAYS}
          </p>
        </div>
      );
    }

    default:
      return null;
  }
};

export function isAnswerValid(
  question: FormQuestion,
  value: OnboardingAnswerValue | undefined
): boolean {
  if (!question.forceAnswer) return true;
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

export default OnboardingQuestionStep;
