import { useLocation } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import {
  LEGAL_SLUGS,
  mainLegalPath,
  sportFromPathname,
  sportLegalPath,
  type LegalPage,
} from "@/lib/sportLegalPaths";

/**
 * Resolves privacy/terms/cookies URLs for the current surface:
 * - on /:lang/padel/* → /:lang/padel/privacidad (etc.)
 * - on main site → /:lang/privacidad
 * Same shared content components; only the URL prefix changes.
 */
export function useLegalPath() {
  const { localePath } = useLocale();
  const { pathname } = useLocation();
  const sport = sportFromPathname(pathname);

  const legalPath = (page: LegalPage) =>
    localePath(sport ? sportLegalPath(sport, page) : mainLegalPath(page));

  return {
    sport,
    legalPath,
    privacyPath: legalPath("privacy"),
    termsPath: legalPath("terms"),
    cookiesPath: localePath(mainLegalPath("cookies")),
    slugs: LEGAL_SLUGS,
  };
}
