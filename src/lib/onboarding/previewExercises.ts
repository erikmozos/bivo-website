import type { TFunction } from "i18next";

export function getPreviewExercises(t: TFunction, sport: string): string[] {
  const sportKey = sport.trim().toLowerCase();
  if (sportKey) {
    const sportExercises = t(`appFlow.training.exercisesBySport.${sportKey}`, {
      returnObjects: true,
    });
    if (Array.isArray(sportExercises) && sportExercises.length > 0) {
      return sportExercises as string[];
    }
  }

  const fallback = t("appFlow.training.exercises", { returnObjects: true });
  return Array.isArray(fallback) ? (fallback as string[]) : [];
}
