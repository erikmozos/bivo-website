/** Landing de BIVO Coach (B2B), servida por la app bivo-coach en su propio dominio. */
export const COACH_SITE_URL = "https://www.bivocoach.com";

export function coachLandingUrl(lang: string): string {
  return lang === "en" ? `${COACH_SITE_URL}/en` : `${COACH_SITE_URL}/`;
}
