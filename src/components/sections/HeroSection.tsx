import { ArrowDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const HERO_IMAGES = [
  "Fitness-dona.jpg",
  "Fitness-home.jpg",
  "padel.jpg",
  "Pickleball.jpg",
  "Tenis.jpg",
];

const APP_SCREENS = [
  "/assets2/app-screens/home.png",
  "/assets2/app-screens/onboarding-objetivo.png",
  "/assets2/app-screens/onboarding-dolor.jpg",
  "/assets2/app-screens/onboarding-material.png",
  "/assets2/app-screens/workout-progress.png",
  "/assets2/app-screens/stats.png",
  "/assets2/app-screens/agenda.png",
  "/assets2/app-screens/workout-detail.png",
];

const SLIDE_INTERVAL_MS = 3000;

const HeroSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);

  const randomImage = useMemo(() => {
    const idx = Math.floor(Math.random() * HERO_IMAGES.length);
    return `/img2/${HERO_IMAGES[idx]}`;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % APP_SCREENS.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-white py-20 pt-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${randomImage}')`,
            backgroundPosition: "center 40%",
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="lg:w-1/2 max-w-3xl">
            <h1 className="font-round text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("hero.title")}
              <br />
              <span className="text-bivo-green">{t("hero.subtitle")}</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              {t("hero.description")}
              <br />
              <span className="text-bivo-green">{t("hero.tagline")}</span>
            </p>

            <div className="mb-10">
              <a
                href="#precios"
                className="inline-flex items-center bg-bivo-green text-black px-8 py-3 rounded-lg font-extrabold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
              >
                {t("hero.cta")}
              </a>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <a href="#about" className="animate-bounce">
                <ArrowDown size={32} className="text-bivo-green" />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
              <div className="relative rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden aspect-[9/19.5]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 rounded-b-xl z-20" />
                <div className="absolute inset-0 pt-6 pb-2 px-1">
                  {APP_SCREENS.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={t("hero.appScreens.alt", { index: index + 1 })}
                      className={`absolute inset-0 w-full h-full object-cover object-top rounded-[2rem] transition-all duration-700 ease-in-out ${
                        index === activeSlide
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 translate-y-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              {APP_SCREENS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={t("hero.slideIndicator.aria", { index: index + 1 })}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "bg-bivo-green scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
