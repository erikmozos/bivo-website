import { useTranslation } from "react-i18next";
import type { FormQuestion, OnboardingAnswerValue, QuestionOption } from "@/types/onboarding";
import { resolveOnboardingImage } from "@/lib/onboarding/imagePaths";
import { isStrengthReadyToSubmit } from "@/lib/onboarding/strengthAnswer";
import { MAX_TRAINING_DAYS, WEEKDAYS } from "@/lib/onboarding/weekdays";
import {
  MobilityOptionCard,
  OnboardingQuestionShell,
  RadioOptionRow,
  SplitOptionCard,
  onboardingInputClass,
} from "./OnboardingUi";

interface OnboardingQuestionStepProps {
  question: FormQuestion;
  value: OnboardingAnswerValue | undefined;
  onChange: (value: OnboardingAnswerValue) => void;
  weekdayLabels: Record<string, string>;
}

function useSplitStack(question: FormQuestion): boolean {
  return [1, 3, 6, 10].includes(question.id);
}

function useMobilityLayout(question: FormQuestion): boolean {
  return question.id === 4;
}

function renderOption(
  question: FormQuestion,
  opt: QuestionOption,
  selected: boolean,
  onSelect: () => void
) {
  const imageSrc = resolveOnboardingImage(opt.imagePath);

  if (useMobilityLayout(question)) {
    return (
      <MobilityOptionCard
        key={opt.value}
        label={opt.label}
        subtitle={opt.subtitle}
        selected={selected}
        onSelect={onSelect}
        imageSrc={imageSrc}
      />
    );
  }

  if (useSplitStack(question) || imageSrc) {
    return (
      <SplitOptionCard
        key={opt.value}
        label={opt.label}
        subtitle={opt.subtitle}
        selected={selected}
        onSelect={onSelect}
        imageSrc={imageSrc}
      />
    );
  }

  return (
    <RadioOptionRow
      key={opt.value}
      label={opt.label}
      selected={selected}
      onSelect={onSelect}
    />
  );
}

const OnboardingQuestionStep = ({
  question,
  value,
  onChange,
  weekdayLabels,
}: OnboardingQuestionStepProps) => {
  const { t } = useTranslation();
  const questionImage = resolveOnboardingImage(question.image);
  const stackGap = useSplitStack(question) || useMobilityLayout(question) ? "space-y-3" : "space-y-2";

  switch (question.type) {
    case "string":
      return (
        <OnboardingQuestionShell>
          {questionImage && (
            <div className="rounded-2xl border border-white/10 bg-[#121c2e] p-4">
              <img src={questionImage} alt="" className="mx-auto max-h-40 object-contain" loading="lazy" />
            </div>
          )}
          <div className="rounded-2xl border border-white/10 bg-[#121c2e] p-3">
            <input
              type="text"
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              className={onboardingInputClass}
              autoComplete="given-name"
            />
          </div>
        </OnboardingQuestionShell>
      );

    case "select":
    case "radio": {
      const containerClass = `${stackGap} max-h-[58vh] overflow-y-auto pr-1`;

      return (
        <OnboardingQuestionShell>
          {questionImage && (
            <div className="mb-2 overflow-hidden rounded-2xl bg-white px-3 py-4">
              <img src={questionImage} alt="" className="mx-auto max-h-40 w-full object-contain" loading="lazy" />
            </div>
          )}
          <div className={containerClass}>
            {question.options?.map((opt) =>
              renderOption(question, opt, value === opt.value, () => onChange(opt.value))
            )}
          </div>
        </OnboardingQuestionShell>
      );
    }

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
        <OnboardingQuestionShell>
          {questionImage && (
            <div className="mb-2 overflow-hidden rounded-2xl bg-white px-3 py-4">
              <img src={questionImage} alt="" className="mx-auto max-h-40 w-full object-contain" loading="lazy" />
            </div>
          )}
          <div className={`${stackGap} max-h-[58vh] overflow-y-auto pr-1`}>
            {question.options?.map((opt) =>
              renderOption(question, opt, selected.includes(opt.value), () => toggle(opt.value))
            )}
          </div>
        </OnboardingQuestionShell>
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
        <OnboardingQuestionShell>
          <div className="flex flex-wrap justify-center gap-3">
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
                  className={`h-12 w-12 rounded-full border-2 font-bold text-sm transition-all ${
                    isOn
                      ? "bg-bivo-green text-black border-bivo-green"
                      : disabled
                        ? "bg-[#121c2e] border-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-[#121c2e] border-white/15 text-gray-300 hover:border-bivo-green/40"
                  }`}
                >
                  {day.short}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500">
            {t("appFlow.onboarding.weekdaysSelected", { count: selected.length, max: MAX_TRAINING_DAYS })}
          </p>
        </OnboardingQuestionShell>
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
  if (question.id === 5) return isStrengthReadyToSubmit(value);
  if (!question.forceAnswer) return true;
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

export default OnboardingQuestionStep;
