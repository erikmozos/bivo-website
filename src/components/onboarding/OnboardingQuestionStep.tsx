import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { addMonths, format, setMonth as setDateMonth, setYear as setDateYear } from "date-fns";
import { es, enUS } from "date-fns/locale";
import type { CaptionProps } from "react-day-picker";
import type { FormQuestion, OnboardingAnswerValue, QuestionOption } from "@/types/onboarding";
import { resolveOnboardingImage } from "@/lib/onboarding/imagePaths";
import { isStrengthReadyToSubmit } from "@/lib/onboarding/strengthAnswer";
import { MAX_TRAINING_DAYS, WEEKDAYS } from "@/lib/onboarding/weekdays";
import {
  ageFromBirthDate,
  formatBirthDate,
  formatBirthDateDisplay,
  isOptionalBirthDateValid,
  maxSelectableBirthDate,
  minSelectableBirthDate,
  parseBirthDate,
} from "@/lib/onboarding/birthDate";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  MobilityOptionCard,
  OnboardingQuestionShell,
  RadioOptionRow,
  SplitOptionCard,
  onboardingInputClass,
} from "./OnboardingUi";

const selectClass =
  "appearance-none rounded-lg border border-white/15 bg-[#0a1018] px-2.5 py-1.5 text-sm text-white outline-none focus:border-bivo-green/50 focus:ring-1 focus:ring-bivo-green/40";

const navBtnClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none";


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

function BirthDateField({
  value,
  onChange,
  placeholder,
}: {
  value: OnboardingAnswerValue | undefined;
  onChange: (value: OnboardingAnswerValue) => void;
  placeholder: string;
}) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const iso = typeof value === "string" && value.trim() ? value.trim() : "";
  const selected = parseBirthDate(iso);
  const display = formatBirthDateDisplay(iso);
  const age = ageFromBirthDate(iso);
  const minDate = minSelectableBirthDate();
  const maxDate = maxSelectableBirthDate();
  const locale = i18n.language?.startsWith("en") ? enUS : es;

  const [month, setMonth] = useState<Date>(() => selected ?? maxDate);

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y -= 1) {
      list.push(y);
    }
    return list;
  }, [minDate, maxDate]);

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: format(new Date(2000, i, 1), "MMMM", { locale }),
      })),
    [locale]
  );

  const canGoPrev = addMonths(month, -1) >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canGoNext = addMonths(month, 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const BirthCaption = ({ displayMonth }: CaptionProps) => (
    <div className="mb-3 flex items-center gap-2">
      <select
        className={`${selectClass} min-w-0 flex-1 capitalize`}
        value={displayMonth.getMonth()}
        aria-label={t("appFlow.onboarding.birthDate.month")}
        onChange={(e) => {
          setMonth(setDateMonth(displayMonth, Number(e.target.value)));
        }}
      >
        {monthOptions.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      <select
        className={`${selectClass} w-[5.5rem] shrink-0`}
        value={displayMonth.getFullYear()}
        aria-label={t("appFlow.onboarding.birthDate.year")}
        onChange={(e) => {
          setMonth(setDateYear(displayMonth, Number(e.target.value)));
        }}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <div className="ml-auto flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          className={navBtnClass}
          disabled={!canGoPrev}
          aria-label={t("appFlow.onboarding.birthDate.prevMonth")}
          onClick={() => setMonth(addMonths(displayMonth, -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={navBtnClass}
          disabled={!canGoNext}
          aria-label={t("appFlow.onboarding.birthDate.nextMonth")}
          onClick={() => setMonth(addMonths(displayMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <OnboardingQuestionShell>
      <p className="text-center text-sm text-gray-400 leading-relaxed">
        <span className="text-bivo-green font-medium">{t("appFlow.onboarding.birthDate.optional")}</span>
        {" — "}
        {t("appFlow.onboarding.birthDate.hint")}
      </p>

      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) setMonth(selected ?? maxDate);
        }}
      >
        <div className={`${onboardingInputClass} flex items-center gap-3`}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
              aria-label={t("appFlow.onboarding.birthDate.title")}
            >
              <CalendarIcon className="h-5 w-5 shrink-0 text-bivo-green" aria-hidden />
              <span className={`truncate ${display ? "text-white" : "text-gray-500"}`}>
                {display ?? placeholder}
              </span>
            </button>
          </PopoverTrigger>
          {display && (
            <button
              type="button"
              aria-label={t("appFlow.onboarding.birthDate.clear")}
              className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <PopoverContent
          align="center"
          className="w-auto border-white/10 bg-[#121c2e] p-3 text-white shadow-xl"
        >
          <Calendar
            mode="single"
            locale={locale}
            month={month}
            onMonthChange={setMonth}
            selected={selected ?? undefined}
            fromDate={minDate}
            toDate={maxDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatBirthDate(date));
              setOpen(false);
            }}
            components={{ Caption: BirthCaption }}
            className="p-0"
            classNames={{
              months: "flex flex-col",
              month: "space-y-2",
              caption: "relative",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell:
                "text-gray-400 w-9 font-medium text-[0.7rem] uppercase tracking-wide",
              row: "flex w-full mt-1",
              cell: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
              day: "h-9 w-9 rounded-full p-0 font-normal text-white hover:bg-white/10 aria-selected:opacity-100",
              day_selected:
                "bg-bivo-green text-black hover:bg-bivo-green hover:text-black focus:bg-bivo-green focus:text-black",
              day_today: "ring-1 ring-bivo-green/50 text-bivo-green",
              day_outside: "text-gray-600 opacity-40",
              day_disabled: "text-gray-600 opacity-30",
              nav: "hidden",
            }}
          />
        </PopoverContent>
      </Popover>

      {age != null && (
        <p className="text-center text-sm text-gray-400">
          {t("appFlow.onboarding.birthDate.currentAge", { age })}
        </p>
      )}
    </OnboardingQuestionShell>
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

    case "date":
      return (
        <BirthDateField
          value={value}
          onChange={onChange}
          placeholder={question.placeholder ?? t("appFlow.onboarding.birthDate.placeholder")}
        />
      );

    case "number":
      return (
        <OnboardingQuestionShell>
          <div className="rounded-2xl border border-white/10 bg-[#121c2e] p-3">
            <input
              type="number"
              inputMode="numeric"
              value={typeof value === "number" ? value : value != null ? String(value) : ""}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") {
                  onChange("");
                  return;
                }
                const n = parseInt(raw, 10);
                onChange(Number.isNaN(n) ? "" : n);
              }}
              placeholder={question.placeholder}
              className={onboardingInputClass}
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
  if (question.type === "date" || question.id === 14) {
    return isOptionalBirthDateValid(value);
  }
  if (question.type === "number") {
    const n = typeof value === "number" ? value : parseInt(String(value ?? ""), 10);
    return Number.isFinite(n) && n >= 10 && n <= 100;
  }
  if (question.type === "weekdays") {
    return Array.isArray(value) && value.length > 0;
  }
  if (!question.forceAnswer) return true;
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

export default OnboardingQuestionStep;
