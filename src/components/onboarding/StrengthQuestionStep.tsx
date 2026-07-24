import { useTranslation } from "react-i18next";
import type { FormQuestion, OnboardingAnswerValue, StrengthAnswer } from "@/types/onboarding";
import { resolveOnboardingImage } from "@/lib/onboarding/imagePaths";
import { buildStrengthAnswer, parseStrengthAnswer } from "@/lib/onboarding/strengthAnswer";
import {
  ExerciseImageBox,
  RadioOptionRow,
  onboardingInputClass,
} from "./OnboardingUi";

const SQUATS_IMAGE = "/onboarding/onboardingFuerza/sentadillasOnboarding.png";
const PUSHUPS_IMAGE = "/onboarding/onboardingFuerza/flexionesOnboarding.png";

interface StrengthQuestionStepProps {
  question: FormQuestion;
  value: OnboardingAnswerValue | undefined;
  onChange: (value: StrengthAnswer) => void;
  validationError?: string | null;
}

const StrengthQuestionStep = ({
  question,
  value,
  onChange,
  validationError,
}: StrengthQuestionStepProps) => {
  const { t } = useTranslation();
  const parsed = parseStrengthAnswer(value);
  const selectedFuerza = parsed?.fuerza;
  const heroImage = resolveOnboardingImage(question.image) ?? resolveOnboardingImage(PUSHUPS_IMAGE);

  const selectFuerza = (fuerza: "si" | "no") => {
    onChange(buildStrengthAnswer(value, { fuerza }));
  };

  const updateMetric = (field: "sentadillas" | "flexiones", raw: string) => {
    if (raw === "") {
      const current = parseStrengthAnswer(value) ?? { fuerza: "si" as const };
      const next: StrengthAnswer = { ...current, fuerza: "si" };
      delete next[field];
      onChange(next);
      return;
    }

    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return;
    onChange(buildStrengthAnswer(value, { fuerza: "si", [field]: Math.min(99, Math.max(0, n)) }));
  };

  return (
    <div className="space-y-4">
      {heroImage && selectedFuerza !== "si" && (
        <ExerciseImageBox src={heroImage} alt="" />
      )}

      <div className="space-y-2">
        {question.options?.map((opt) => (
          <RadioOptionRow
            key={opt.value}
            label={opt.label}
            selected={selectedFuerza === opt.value}
            onSelect={() => selectFuerza(opt.value as "si" | "no")}
          />
        ))}
      </div>

      {selectedFuerza === "si" && (
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div>
            <ExerciseImageBox
              src={resolveOnboardingImage(SQUATS_IMAGE)!}
              alt={t("appFlow.onboarding.strength.squatsLabel")}
            />
            <p className="text-sm text-gray-300 mb-3">
              {t("appFlow.onboarding.strength.squatsQuestion")}
            </p>
            <input
              type="number"
              min={0}
              max={99}
              inputMode="numeric"
              value={parsed?.sentadillas ?? ""}
              onChange={(e) => updateMetric("sentadillas", e.target.value)}
              placeholder="0-99"
              className={onboardingInputClass}
              aria-label={t("appFlow.onboarding.strength.squatsLabel")}
            />
          </div>

          <div>
            <ExerciseImageBox
              src={resolveOnboardingImage(PUSHUPS_IMAGE)!}
              alt={t("appFlow.onboarding.strength.pushupsLabel")}
            />
            <p className="text-sm text-gray-300 mb-3">
              {t("appFlow.onboarding.strength.pushupsQuestion")}
            </p>
            <input
              type="number"
              min={0}
              max={99}
              inputMode="numeric"
              value={parsed?.flexiones ?? ""}
              onChange={(e) => updateMetric("flexiones", e.target.value)}
              placeholder="0-99"
              className={onboardingInputClass}
              aria-label={t("appFlow.onboarding.strength.pushupsLabel")}
            />
          </div>
        </div>
      )}

      {validationError && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
          {validationError}
        </p>
      )}
    </div>
  );
};

export default StrengthQuestionStep;
