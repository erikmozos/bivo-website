import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import type { SportLandingSlug } from "@/lib/sportLegalPaths";

/**
 * Minimal header shown on legal pages (privacidad/terminos) when reached from
 * a sport landing (/padel, /estabilidad-hombro), so the user never sees the
 * main site nav. Clicking the logo returns to that sport's landing page.
 */
const SportLegalHeader = ({ sport }: { sport: SportLandingSlug }) => {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  return (
    <nav className="fixed w-full bg-black z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <Link to={localePath(`/${sport}`)} className="flex items-center cursor-pointer">
          <img
            src="/brand/logo-bivo-verde.png"
            alt={t("nav.logoAlt")}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>
    </nav>
  );
};

export default SportLegalHeader;
