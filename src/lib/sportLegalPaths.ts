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
export type SportLandingSlug = "padel" | "badminton" | "tenis" | "pickleball" | "estabilidad-hombro";

/** Deportes de raqueta con mensaje propio en el registro. */
export const RACKET_SPORT_SLUGS = ["padel", "tenis", "pickleball", "badminton"] as const;
export type RacketSportSlug = (typeof RACKET_SPORT_SLUGS)[number];

export function isRacketSportSlug(value: string | null | undefined): value is RacketSportSlug {
  return !!value && (RACKET_SPORT_SLUGS as readonly string[]).includes(value);
}

export function registroPathWithSport(
  localePath: (path: string) => string,
  sport: RacketSportSlug,
  plan?: string,
): string {
  const params = new URLSearchParams();
  if (plan) params.set("plan", plan);
  params.set("sport", sport);
  return `${localePath("/registro")}?${params.toString()}`;
}

export const SPORT_LANDING_SLUGS: readonly SportLandingSlug[] = [
  "padel",
  "badminton",
  "tenis",
  "pickleball",
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
