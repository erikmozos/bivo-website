/** Valores fijos requeridos por generatePlan; no se preguntan en el onboarding web. */
export const DEFAULT_HEIGHT_CM = 170;
export const DEFAULT_WEIGHT_KG = 70;

export function defaultAnthropometrics(): { heightCm: number; weightKg: number } {
  return { heightCm: DEFAULT_HEIGHT_CM, weightKg: DEFAULT_WEIGHT_KG };
}
