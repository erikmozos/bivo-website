import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { getHomeSectionIds, translateSectionHash } from "@/lib/sectionIds";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { localePath, lang } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = t("nav.items", { returnObjects: true }) as string[];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname.replace(/^\/(en|es)/, "") === "/" || location.pathname === `/${lang}`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuClick = (sectionId: string) => {
    const basePath = location.pathname.replace(/^\/(en|es)/, "") || "/";
    if (basePath === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    } else {
      navigate(localePath("/"), { state: { scrollTo: sectionId } });
    }
    setIsMenuOpen(false);
  };

  const toggleLang = () => {
    const targetLang = lang === "es" ? "en" : "es";
    const path = location.pathname.replace(/^\/(en|es)/, "");
    const hash = location.hash
      ? translateSectionHash(location.hash, targetLang)
      : "";
    void i18n.changeLanguage(targetLang);
    navigate(`/${targetLang}${path}${hash}`);
  };

  const sectionIds = getHomeSectionIds(lang);

  return (
    <nav className="fixed w-full bg-black z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to={localePath("/")}
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/brand/logo-bivo-verde.png"
            alt={t("nav.logoAlt")}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((label, i) => (
            <button
              key={sectionIds[i]}
              onClick={() => handleMenuClick(sectionIds[i])}
              className="text-white hover:text-bivo-green transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="text-white hover:text-bivo-green transition-colors font-semibold text-sm border border-white/30 px-3 py-1 rounded hover:border-bivo-green"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLang}
            className="text-white hover:text-bivo-green transition-colors font-semibold text-sm border border-white/30 px-3 py-1 rounded"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            type="button"
            className="p-2 text-white hover:text-bivo-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t("nav.aria.closeMenu") : t("nav.aria.openMenu")}
          >
            {isMenuOpen ? (
              <X size={24} strokeWidth={2} aria-hidden />
            ) : (
              <Menu size={24} strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((label, i) => (
              <button
                key={sectionIds[i]}
                onClick={() => handleMenuClick(sectionIds[i])}
                className="text-white hover:text-bivo-green transition-colors py-2 text-left"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
