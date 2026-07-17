import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import es from "./locales/es/translation.json";

const loadedLngs = new Set<string>();

const loadEn = async () => {
  if (loadedLngs.has("en")) return;
  const en = await import("./locales/en/translation.json");
  i18n.addResourceBundle("en", "translation", en.default, true, true);
  loadedLngs.add("en");
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
    },
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    load: "currentOnly",
    interpolation: {
      escapeValue: false,
      prefix: "{",
      suffix: "}",
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

const initLang = (i18n.language || "es").split("-")[0];
if (initLang === "en") {
  loadEn();
}

i18n.on("languageChanged", (lng) => {
  if (lng === "en") {
    loadEn();
  }
});

export default i18n;
