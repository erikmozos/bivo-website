export const HOME_NAV_SECTIONS = [
  "pricing",
  "howItWorks",
  "alliances",
  "recognition",
  "team",
  "contact",
] as const;

export type SectionKey = (typeof HOME_NAV_SECTIONS)[number];

const SECTION_IDS = {
  es: {
    pricing: "precios",
    howItWorks: "como-funciona",
    alliances: "alianzas",
    recognition: "reconocimientos",
    team: "equipo",
    contact: "contacto",
  },
  en: {
    pricing: "pricing",
    howItWorks: "how-it-works",
    alliances: "alliances",
    recognition: "recognition",
    team: "team",
    contact: "contact",
  },
} as const;

function localeFromLang(lang: string): "es" | "en" {
  return lang.toLowerCase().startsWith("en") ? "en" : "es";
}

export function getSectionId(lang: string, key: SectionKey): string {
  return SECTION_IDS[localeFromLang(lang)][key];
}

export function getHomeSectionIds(lang: string): string[] {
  return HOME_NAV_SECTIONS.map((key) => getSectionId(lang, key));
}

/** Maps a hash from either language to the section id that exists on the current page. */
export function resolveSectionId(hash: string, lang: string): string {
  const normalized = hash.replace(/^#/, "");
  for (const key of HOME_NAV_SECTIONS) {
    if (
      SECTION_IDS.es[key] === normalized ||
      SECTION_IDS.en[key] === normalized
    ) {
      return getSectionId(lang, key);
    }
  }
  return normalized;
}

/** Translates a section hash when switching ES ↔ EN. */
export function translateSectionHash(hash: string, targetLang: string): string {
  const resolved = resolveSectionId(hash, targetLang);
  return resolved ? `#${resolved}` : "";
}
