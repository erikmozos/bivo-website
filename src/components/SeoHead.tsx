import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { OG_IMAGE, SEO, SITE_ORIGIN } from "@/lib/seo";

export default function SeoHead() {
  const { lang } = useParams<{ lang: string }>();
  const { pathname } = useLocation();
  const locale = lang === "en" ? "en" : "es";
  const seo = SEO[locale];
  const other = locale === "en" ? "es" : "en";
  const canonical = `${SITE_ORIGIN}${pathname === `/${locale}` ? `/${locale}/` : pathname}`;
  const esPath = pathname.replace(/^\/(en|es)/, "/es") || "/es/";
  const enPath = pathname.replace(/^\/(en|es)/, "/en") || "/en/";

  return (
    <Helmet prioritizeSeoTags>
      <html lang={seo.htmlLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={`${SITE_ORIGIN}${esPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_ORIGIN}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_ORIGIN}${esPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bivo" />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={seo.ogLocale} />
      <meta property="og:locale:alternate" content={SEO[other].ogLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
