/**
 * Shared legal page slugs used across the main site and sport landings.
 * Content lives in PrivacyPolicyContent / TermsConditionsContent — update once, applies everywhere.
 * Routes are mounted under /:lang and /:lang/:sport so ES/EN (and future locales) share the same content.
 */
export const LEGAL_SLUGS = {
  privacy: "privacidad",
  terms: "terminos",
  cookies: "cookies",
} as const;

export type LegalPage = keyof typeof LEGAL_SLUGS;
export type SportLandingSlug = "padel" | "estabilidad-hombro";

export const SPORT_LANDING_SLUGS: readonly SportLandingSlug[] = [
  "padel",
  "estabilidad-hombro",
] as const;

/** Path under a sport landing, e.g. padel/privacidad → used with localePath() */
export function sportLegalPath(sport: SportLandingSlug, page: LegalPage): string {
  return `/${sport}/${LEGAL_SLUGS[page]}`;
}

/** Main-site legal path, e.g. /privacidad → used with localePath() */
export function mainLegalPath(page: LegalPage): string {
  return `/${LEGAL_SLUGS[page]}`;
}

/** Detect sport landing from a locale-prefixed pathname like /es/padel/privacidad */
export function sportFromPathname(pathname: string): SportLandingSlug | null {
  const match = pathname.match(/^\/[^/]+\/([^/]+)(?:\/|$)/);
  const slug = match?.[1];
  if (slug && (SPORT_LANDING_SLUGS as readonly string[]).includes(slug)) {
    return slug as SportLandingSlug;
  }
  return null;
}
