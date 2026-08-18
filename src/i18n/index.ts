import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import es from "./locales/es/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
      prefix: "{",
      suffix: "}",
    },
    detection: {
      // URL prefix (/en, /es) wins over a previous visit saved in localStorage
      order: ["path", "localStorage"],
      caches: ["localStorage"],
      lookupFromPathIndex: 0,
    },
  });

if (typeof window !== "undefined") {
  const pathLang = window.location.pathname.split("/")[1];
  if (pathLang === "en" || pathLang === "es") {
    void i18n.changeLanguage(pathLang);
  }
}

export default i18n;
