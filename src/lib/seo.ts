export const SITE_ORIGIN = "https://bivotraining.com";
export const OG_IMAGE = `${SITE_ORIGIN}/img/bivo-training.png`;

export type SeoLang = "es" | "en";

export const SEO = {
  es: {
    htmlLang: "es",
    ogLocale: "es_ES",
    title: "Bivo - Entrena como un profesional. Donde quieras, cuando quieras.",
    ogTitle: "Bivo · Preparación física inteligente para deportes de raqueta",
    description:
      "Pádel, tenis, pickleball... y más. Entrena como un pro, aunque no lo seas. Bivo lleva el alto rendimiento a tu deporte y a tu nivel.",
    canonicalPath: "/es/",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Bivo - Train like a professional. Anywhere, anytime.",
    ogTitle: "Bivo · Smart physical training for racket sports",
    description:
      "Padel, tennis, pickleball... and more. Train like a pro, even if you are not one. Bivo brings high performance to your sport and your level.",
    canonicalPath: "/en/",
  },
} as const;

function replaceAttr(
  html: string,
  tag: "property" | "name",
  key: string,
  content: string
): string {
  const re = new RegExp(
    `(<meta\\s+${tag}="${key}"\\s+content=")[^"]*(")`,
    "i"
  );
  if (re.test(html)) {
    return html.replace(re, `$1${content}$2`);
  }
  return html.replace(
    "</head>",
    `    <meta ${tag}="${key}" content="${content}" />\n  </head>`
  );
}

function replaceTagAttr(
  html: string,
  tag: string,
  attr: string,
  value: string
): string {
  const re = new RegExp(
    `(<link\\s+rel="${tag}"\\s+${attr}=")[^"]*(")`,
    "i"
  );
  if (re.test(html)) {
    return html.replace(re, `$1${value}$2`);
  }
  return html.replace(
    "</head>",
    `    <link rel="${tag}" ${attr}="${value}" />\n  </head>`
  );
}

/** Rewrites OG/title/description in a static HTML string for crawlers (WhatsApp, etc.). */
export function applySeoToHtml(html: string, lang: SeoLang): string {
  const seo = SEO[lang];
  const other: SeoLang = lang === "en" ? "es" : "en";
  const canonical = `${SITE_ORIGIN}${seo.canonicalPath}`;

  let out = html;
  out = out.replace(/<html\s+lang="[^"]*"/i, `<html lang="${seo.htmlLang}"`);
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${seo.title}</title>`);
  out = replaceAttr(out, "name", "description", seo.description);
  out = replaceAttr(out, "property", "og:title", seo.ogTitle);
  out = replaceAttr(out, "property", "og:description", seo.description);
  out = replaceAttr(out, "property", "og:url", canonical);
  out = replaceAttr(out, "property", "og:locale", seo.ogLocale);
  out = replaceAttr(out, "property", "og:locale:alternate", SEO[other].ogLocale);
  out = replaceAttr(out, "name", "twitter:title", seo.ogTitle);
  out = replaceAttr(out, "name", "twitter:description", seo.description);
  out = replaceTagAttr(out, "canonical", "href", canonical);

  const hreflangEs = `${SITE_ORIGIN}/es/`;
  const hreflangEn = `${SITE_ORIGIN}/en/`;
  out = out.replace(
    /(<link\s+rel="alternate"\s+hreflang="es"\s+href=")[^"]*(")/i,
    `$1${hreflangEs}$2`
  );
  out = out.replace(
    /(<link\s+rel="alternate"\s+hreflang="en"\s+href=")[^"]*(")/i,
    `$1${hreflangEn}$2`
  );
  out = out.replace(
    /(<link\s+rel="alternate"\s+hreflang="x-default"\s+href=")[^"]*(")/i,
    `$1${hreflangEs}$2`
  );

  return out;
}
