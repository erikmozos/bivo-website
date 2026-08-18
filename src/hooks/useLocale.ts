import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useLocale() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const fromUrl = urlLang && ["es", "en"].includes(urlLang) ? urlLang : null;
  const lang = fromUrl || (i18n.language || "es").split("-")[0];

  const localePath = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${lang}${clean}`;
  };

  return { lang, localePath };
}
