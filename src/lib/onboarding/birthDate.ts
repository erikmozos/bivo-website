/** Fecha de nacimiento ISO `YYYY-MM-DD` (sin zona horaria). Alineado con BIV-490 / app. */

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isBirthDateIso(value: string | null | undefined): boolean {
  if (!value || !ISO_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export function parseBirthDate(iso: string | null | undefined): Date | null {
  if (!isBirthDateIso(iso)) return null;
  const [y, m, d] = iso!.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatBirthDate(date: Date): string {
  const y = date.getFullYear().toString().padStart(4, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** DD/MM/YYYY para mostrar en UI (como la app). */
export function formatBirthDateDisplay(iso: string | null | undefined): string | null {
  const date = parseBirthDate(iso);
  if (!date) return null;
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/** Edad actual en años. Null si la fecha no es válida. */
export function ageFromBirthDate(value: string | null | undefined, today = new Date()): number | null {
  const birth = parseBirthDate(value);
  if (!birth) return null;
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age -= 1;
  }
  return age;
}

export function maxSelectableBirthDate(today = new Date()): Date {
  return new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
}

export function minSelectableBirthDate(today = new Date()): Date {
  return new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
}

/** Vacío = ok (opcional). Si hay valor, ISO válida y edad 10–100. */
export function isOptionalBirthDateValid(value: unknown): boolean {
  if (value == null) return true;
  // Edad numérica legacy del onboarding web anterior: se ignora (sigue siendo opcional).
  if (typeof value === "number") return true;
  const s = String(value).trim();
  if (!s) return true;
  const age = ageFromBirthDate(s);
  return age != null && age >= 10 && age <= 100;
}

/** Extrae ISO desde respuesta onboarding (string ISO; legacy edad/año ignorados o convertidos). */
export function birthDateFromOnboardingAnswer(answerData: unknown): string | null {
  let raw: unknown = answerData;
  if (answerData && typeof answerData === "object" && "answer" in answerData) {
    raw = (answerData as { answer: unknown }).answer;
  }
  if (raw == null) return null;
  if (typeof raw === "number") return null;
  const s = String(raw).trim();
  return isBirthDateIso(s) ? s : null;
}
