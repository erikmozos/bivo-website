/** Año de nacimiento `YYYY`, o ISO legacy `YYYY-MM-DD`. */

const YEAR_RE = /^\d{4}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isBirthDateIso(value: string | null | undefined): boolean {
  if (!value || !ISO_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export function parseBirthYear(value: string | null | undefined): number | null {
  if (!value) return null;
  const s = value.trim();
  const year = YEAR_RE.test(s)
    ? Number(s)
    : ISO_RE.test(s)
      ? Number(s.slice(0, 4))
      : NaN;
  if (!Number.isInteger(year) || year < 1900 || year > 2100) return null;
  return year;
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

/** Año para mostrar en UI. Acepta `YYYY` o ISO legacy. */
export function formatBirthDateDisplay(iso: string | null | undefined): string | null {
  const year = parseBirthYear(iso);
  return year != null ? String(year) : null;
}

/** Edad actual en años. Con solo año, es año actual − año de nacimiento. */
export function ageFromBirthDate(value: string | null | undefined, today = new Date()): number | null {
  if (isBirthDateIso(value)) {
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
  const year = parseBirthYear(value);
  if (year == null) return null;
  return today.getFullYear() - year;
}

export function maxSelectableBirthYear(today = new Date()): number {
  return today.getFullYear() - 10;
}

export function minSelectableBirthYear(today = new Date()): number {
  return today.getFullYear() - 100;
}

export function maxSelectableBirthDate(today = new Date()): Date {
  return new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
}

export function minSelectableBirthDate(today = new Date()): Date {
  return new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
}

/** Vacío = ok (opcional). Si hay valor, año o ISO y edad 10–100. */
export function isOptionalBirthDateValid(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "number") return true;
  const s = String(value).trim();
  if (!s) return true;
  const age = ageFromBirthDate(s);
  return age != null && age >= 10 && age <= 100;
}

/** Extrae ISO `YYYY-01-01` desde año, o la ISO completa si ya venía así. */
export function birthDateFromOnboardingAnswer(answerData: unknown): string | null {
  let raw: unknown = answerData;
  if (answerData && typeof answerData === "object" && "answer" in answerData) {
    raw = (answerData as { answer: unknown }).answer;
  }
  if (raw == null) return null;
  if (typeof raw === "number") {
    const year = parseBirthYear(String(raw));
    return year != null ? `${year}-01-01` : null;
  }
  const s = String(raw).trim();
  if (isBirthDateIso(s)) return s;
  const year = parseBirthYear(s);
  return year != null ? `${year}-01-01` : null;
}
