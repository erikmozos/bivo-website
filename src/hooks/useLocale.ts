import { useTranslation } from "react-i18next";

export function useLocale() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "es").split("-")[0];

  const localePath = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${lang}${clean}`;
  };

  return { lang, localePath };
}
