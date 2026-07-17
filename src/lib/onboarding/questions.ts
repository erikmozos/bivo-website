import type { FormQuestion, QuestionInputType } from "@/types/onboarding";

export async function loadQuestions(lang: string): Promise<FormQuestion[]> {
  const code = lang === "en" ? "en" : "es";
  const res = await fetch(`/assets/questions_${code}.json`);
  if (!res.ok) {
    throw new Error(`Failed to load questions_${code}.json`);
  }
  const json = (await res.json()) as Array<Record<string, unknown>>;
  return json.map((item) => ({
    id: item.id as number,
    question: item.question as string,
    subtitle: item.subtitle as string | undefined,
    type: item.type as QuestionInputType,
    placeholder: item.placeholder as string | undefined,
    forceAnswer: (item.forceAnswer as boolean | undefined) ?? false,
    image: item.image as string | undefined,
    options: item.options as FormQuestion["options"],
  }));
}
