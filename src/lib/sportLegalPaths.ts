/**
 * Shared legal page slugs used across the main site and sport landings.
 * Content lives in PrivacyPolicyContent / TermsConditionsContent — update once, applies everywhere.
 */
export const LEGAL_SLUGS = {
  privacy: "privacidad",
  terms: "terminos",
  cookies: "cookies",
} as const;

export type SportLandingSlug = "padel" | "estabilidad-hombro";

/** Path under a sport landing, e.g. padel/privacidad → used with localePath() */
export function sportLegalPath(
  sport: SportLandingSlug,
  page: keyof typeof LEGAL_SLUGS
): string {
  return `/${sport}/${LEGAL_SLUGS[page]}`;
}
