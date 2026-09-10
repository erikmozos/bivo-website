import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { getSectionId } from "@/lib/sectionIds";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const partnerImages = [
  "/img2/alliances/mqc.png",
  "/img2/alliances/pdpadel.jpg",
  "/img2/alliances/logosalle-1.png",
  "/img2/alliances/emprenbit.png",
  "/img2/alliances/fpib.png",
  "/img2/alliances/febab.png",
];

const isPartnerLogo = (src: string) =>
  /emprenbit|fpib|febab|logosalle/.test(src);

const AlliancesSection = () => {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const partnersData = t("alliances.partners", { returnObjects: true }) as {
    name: string;
    description: string;
  }[];

  const alianzas = partnersData.map((partner, index) => ({
    nombre: partner.name,
    imagen: partnerImages[index],
    descripcion: partner.description,
  }));

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSnapCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isHovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 4500);
    return () => window.clearInterval(timer);
  }, [api, isHovering]);

  return (
    <section id={getSectionId(lang, "alliances")} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("alliances.heading")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("alliances.description")}
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 items-stretch">
              {alianzas.map((alianza) => (
                <CarouselItem
                  key={alianza.nombre}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <article className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-40 bg-white relative overflow-hidden flex items-center justify-center">
                      <img
                        src={alianza.imagen}
                        alt={alianza.nombre}
                        className={`w-full h-full ${
                          alianza.imagen.includes("logosalle")
                            ? "object-contain p-0 scale-[1.28] translate-y-1"
                            : isPartnerLogo(alianza.imagen)
                              ? "object-contain p-6"
                              : "object-cover"
                        }`}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith("/brand/placeholder-profile.png")) {
                            target.src = "/brand/placeholder-profile.png";
                          } else {
                            target.onerror = null;
                          }
                        }}
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-round text-xl font-semibold mb-2">
                        {alianza.nombre}
                      </h3>
                      <p className="text-gray-600">{alianza.descripcion}</p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center justify-center gap-6 mt-9">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label={t("alliances.navigation.prev")}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-800 transition-all hover:bg-bivo-green hover:border-bivo-green hover:text-black"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: snapCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={t("alliances.navigation.slide", { index: index + 1 })}
                  aria-current={index === selected}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === selected ? 26 : 8,
                    background: index === selected ? "#39ff14" : "#d1d5db",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label={t("alliances.navigation.next")}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-800 transition-all hover:bg-bivo-green hover:border-bivo-green hover:text-black"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlliancesSection;
