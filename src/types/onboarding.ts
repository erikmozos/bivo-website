export type QuestionInputType =
  | "radio"
  | "select"
  | "checkbox"
  | "number"
  | "string"
  | "weekdays";

export interface QuestionOption {
  value: string;
  label: string;
  imagePath?: string;
  subtitle?: string;
}

export interface FormQuestion {
  id: number;
  question: string;
  subtitle?: string;
  type: QuestionInputType;
  options?: QuestionOption[];
  placeholder?: string;
  forceAnswer?: boolean;
  image?: string;
}

export type OnboardingAnswerValue = string | string[] | number;

export type OnboardingAnswers = Record<string, OnboardingAnswerValue>;

export interface FormattedOnboardingAnswer {
  question: string;
  answer: OnboardingAnswerValue;
}
