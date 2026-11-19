import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/storeLinks";

type Store = "appStore" | "googlePlay";

// Tienda de origen de cada reseña real, en el mismo orden que testimonials.list
const reviewStores: Store[] = ["googlePlay", "googlePlay", "appStore", "googlePlay", "googlePlay"];

const storeUrls: Record<Store, string> = {
  appStore: APP_STORE_URL,
  googlePlay: GOOGLE_PLAY_URL,
};

const StoreIcon = ({ store, size = 14 }: { store: Store; size?: number }) =>
  store === "appStore" ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <path fill="#00C1FF" d="M31.2 4.4C19.6 11 12 23.4 12 37.6v436.8c0 14.2 7.6 26.6 19.2 33.2l3.6 2L274 270.4v-5.4L34.8 2.4l-3.6 2z" />
      <path fill="#FFD900" d="M352.6 348.8l-78.6-78.4v-5.4l78.6-78.6 1.8 1L456 249.6c29.2 16.6 29.2 43.8 0 60.4l-101.6 57.6-1.8 1.2z" />
      <path fill="#FF3333" d="M354.4 347.6L274 267.2 31.2 509.6C40 518.8 53.4 519.4 68.4 511l286-163.4" />
      <path fill="#00EE76" d="M354.4 188.4L68.4 25C53.4 16.4 40 17.2 31.2 26.4L274 268.8l80.4-80.4z" />
    </svg>
  );

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const VISIBLE = 3;

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const testimonialsData = t("testimonials.list", { returnObjects: true }) as {
    name: string;
    text: string;
    translated?: boolean;
  }[];

  const testimonials = testimonialsData.map((item, i) => ({
    store: reviewStores[i] ?? "googlePlay",
    name: item.name,
    text: item.text,
    translated: item.translated === true,
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

          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            aria-label={t("testimonials.storesLabel")}
          >
            {(["appStore", "googlePlay"] as Store[]).map((store) => (
              <a
                key={store}
                href={storeUrls[store]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-colors hover:border-bivo-green/60"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <StoreIcon store={store} size={16} />
                <span className="font-semibold">{t("testimonials.rating")}</span>
                <span className="text-bivo-green" aria-hidden="true">★</span>
                <span style={{ color: "#9ca3af" }}>{t(`footer.${store}.store`)}</span>
              </a>
            ))}
          </div>
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
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-bivo-green text-black"
                      style={{ fontSize: "14px", fontWeight: 700 }}
                      aria-hidden="true"
                    >
                      {initials(tItem.name)}
                    </span>
                    <div className="min-w-0">
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                        {tItem.name}
                      </div>
                      <div
                        className="flex items-center gap-1.5"
                        style={{ fontSize: "12px", color: "#9ca3af" }}
                      >
                        <StoreIcon store={tItem.store} size={12} />
                        {t(`testimonials.source.${tItem.store}`)}
                      </div>
                    </div>
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
                    }}
                  >
                    {tItem.text}
                  </p>
                  {tItem.translated && (
                    <p className="mt-3" style={{ fontSize: "11px", color: "#6b7280" }}>
                      {t("testimonials.translated")}
                    </p>
                  )}
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
