import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const flags = ["🎾", "🏓", "🎾", "🏆", "🥒", "💪"];

const VISIBLE = 3;

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const [index, setIndex] = useState(0);

  const testimonialsData = t("testimonials.list", { returnObjects: true }) as {
    name: string;
    text: string;
  }[];

  const testimonials = testimonialsData.map((item, i) => ({
    flag: flags[i],
    name: item.name,
    text: item.text,
    featured: i === 1,
  }));

  const maxIndex = testimonials.length - VISIBLE;

  const prev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i === maxIndex ? 0 : i + 1));

  return (
    <section
      id="testimonios"
      className="py-20 text-white overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-bivo-green text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(57,255,20,0.1)",
              border: "1px solid rgba(57,255,20,0.3)",
            }}
          >
            {t("testimonials.badge")}
          </div>
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("testimonials.heading")}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#d1d5db" }}>
            {t("testimonials.description")}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto" style={{ padding: "0 50px" }}>
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div
              className="flex"
              style={{
                  gap: "24px",
                  transform: `translateX(calc(-${index} * (100% / ${VISIBLE} + 8px)))`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {testimonials.map((tItem, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col"
                  style={{
                    flexBasis: `calc((100% - 48px) / ${VISIBLE})`,
                    minHeight: "220px",
                    background: "#141414",
                    border: tItem.featured
                      ? "1px solid rgba(57,255,20,0.45)"
                      : "1px solid #1f1f1f",
                    boxShadow: tItem.featured ? "0 0 40px rgba(57,255,20,0.08)" : undefined,
                    borderRadius: "16px",
                    padding: "28px 24px",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ fontSize: "18px" }}>{tItem.flag}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                      {tItem.name}
                    </span>
                  </div>
                  <div
                    className="mb-2 text-bivo-green"
                    style={{ fontSize: "13px", letterSpacing: "2px" }}
                  >
                    ★★★★★
                  </div>
                  <p
                    className="flex-1"
                    style={{
                      fontSize: "14px",
                      color: "#d1d5db",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {tItem.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-9">
            <button
              onClick={prev}
              aria-label={t("testimonials.navigation.prev")}
              className="testi-nav-btn w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={t("testimonials.navigation.group", { index: i + 1 })}
                  style={{
                    width: i === index ? "26px" : "8px",
                    height: "8px",
                    borderRadius: i === index ? "4px" : "50%",
                    background:
                      i === index ? "#39ff14" : "rgba(255,255,255,0.2)",
                    border: 0,
                    transition: "all 0.3s",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label={t("testimonials.navigation.next")}
              className="testi-nav-btn w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testi-nav-btn:not(:disabled):hover {
          background: #39ff14 !important;
          color: #000 !important;
          border-color: #39ff14 !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
