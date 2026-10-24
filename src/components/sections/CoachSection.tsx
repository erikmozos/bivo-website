import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { coachLandingUrl } from "@/lib/coachLinks";

/** Sección de la home que presenta BIVO Coach (B2B) y lleva a su landing en bivocoach.com. */
const CoachSection = () => {
  const { t } = useTranslation();
  const { lang } = useLocale();

  const points = t("coachSection.points", { returnObjects: true }) as string[];

  return (
    <section id="bivo-coach" className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="inline-flex items-center rounded-full border border-bivo-green/40 bg-bivo-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-bivo-green mb-6">
              {t("coachSection.eyebrow")}
            </p>
            <h2 className="font-round text-4xl md:text-5xl font-bold mb-4">
              <span className="text-bivo-green">{t("coachSection.heading")}</span>
            </h2>
            <p className="text-xl md:text-2xl font-semibold leading-snug mb-5">
              {t("coachSection.subheading")}
            </p>
            <p className="text-gray-300 mb-6">{t("coachSection.description")}</p>

            <ul className="space-y-3 mb-8">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-gray-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bivo-green text-black">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="font-semibold text-white mb-6">{t("coachSection.highlight")}</p>

            <a
              href={coachLandingUrl(lang)}
              className="inline-flex items-center gap-2 rounded-full bg-bivo-green px-7 py-4 font-bold text-black transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bivo-green"
            >
              {t("coachSection.cta")}
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>

          <a
            href={coachLandingUrl(lang)}
            tabIndex={-1}
            aria-hidden
            className="block rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_30px_80px_-30px_rgba(57,255,20,0.35)] transition-transform hover:-translate-y-1"
          >
            <img
              src="/img2/coach/coach-planificacion.webp"
              alt={t("coachSection.imageAlt")}
              width={1400}
              height={699}
              loading="lazy"
              className="w-full h-auto rounded-xl"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
