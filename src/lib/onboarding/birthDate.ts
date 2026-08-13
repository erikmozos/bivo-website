/** Año / fecha de nacimiento. En web pedimos solo el año; se guarda como ISO `YYYY-01-01`. */

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR_RE = /^\d{4}$/;

export function minBirthYear(today = new Date()): number {
  return today.getFullYear() - 100;
}

export function maxBirthYear(today = new Date()): number {
  return today.getFullYear() - 10;
}

export function yearFromBirthValue(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : null;
  }
  const s = String(value).trim();
  if (!s) return null;
  if (YEAR_RE.test(s)) return parseInt(s, 10);
  if (ISO_RE.test(s)) return parseInt(s.slice(0, 4), 10);
  return null;
}

/** Convierte un año a ISO `YYYY-01-01` para persistir en birthDate. */
export function birthDateFromYear(year: number): string {
  return `${year.toString().padStart(4, "0")}-01-01`;
}

export function isBirthDateIso(value: string | null | undefined): boolean {
  if (!value || !ISO_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

/** Edad a partir del año (o ISO). Null si no es válido. */
export function ageFromBirthDate(value: string | null | undefined, today = new Date()): number | null {
  const year = yearFromBirthValue(value);
  if (year == null) return null;
  const age = today.getFullYear() - year;
  if (age < 10 || age > 100) return null;
  return age;
}

/** Vacío = ok (opcional). Si hay valor, año con edad 10–100. */
export function isOptionalBirthDateValid(value: unknown): boolean {
  if (value == null) return true;
  const s = typeof value === "string" ? value.trim() : "";
  if (s === "") return true;
  // Mientras escribe (1–3 dígitos) no bloqueamos el paso: el año sigue siendo opcional.
  if (/^\d{1,3}$/.test(s)) return true;
  // Número suelto: edad legacy 10–100 se ignora; años 4 dígitos se validan.
  if (typeof value === "number") {
    if (value >= 10 && value <= 100) return true;
    const age = ageFromBirthDate(String(value));
    return age != null;
  }
  const age = ageFromBirthDate(s);
  return age != null;
}

/** Extrae ISO desde respuesta onboarding (año o ISO; legacy edad ignorada). */
export function birthDateFromOnboardingAnswer(answerData: unknown): string | null {
  let raw: unknown = answerData;
  if (answerData && typeof answerData === "object" && "answer" in answerData) {
    raw = (answerData as { answer: unknown }).answer;
  }
  if (raw == null) return null;
  if (typeof raw === "number") {
    // Edad legacy 10–100: no hay año fiable
    if (raw >= 10 && raw <= 100) return null;
    if (raw >= minBirthYear() && raw <= maxBirthYear()) {
      return birthDateFromYear(raw);
    }
    return null;
  }
  const s = String(raw).trim();
  if (!s) return null;
  if (YEAR_RE.test(s)) {
    const year = parseInt(s, 10);
    if (year >= minBirthYear() && year <= maxBirthYear()) {
      return birthDateFromYear(year);
    }
    return null;
  }
  return isBirthDateIso(s) ? s : null;
}
