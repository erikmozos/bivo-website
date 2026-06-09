import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    flag: "🎾",
    name: "Marcos B.",
    text: "\"Desde que empecé a usar Bivo no he vuelto a tener molestias en mi rodilla y puedo jugar varios partidos seguidos.\"",
    featured: false,
  },
  {
    flag: "🏓",
    name: "Carlos M.",
    text: "\"Con Bivo ya aguanto tres partidos seguidos en los torneos de fin de semana sin ningún problema ni calambres.\"",
    featured: true,
  },
  {
    flag: "🎾",
    name: "Laura S.",
    text: "\"Como entrenadora de tenis, Bivo me ayuda a tener la condición física necesaria para aguantar todas las horas de trabajo de cada día y muchas horas en pista seguidas con clientes.\"",
    featured: false,
  },
  {
    flag: "🏆",
    name: "Javi R.",
    text: "\"Llevaba años entrenando por mi cuenta y siempre me faltaba estructura. Bivo organiza mi semana y por fin veo cómo mejoro partido tras partido.\"",
    featured: false,
  },
  {
    flag: "🥒",
    name: "Anna T.",
    text: "\"En pickleball es difícil encontrar prepa física específica. Bivo lo hace y se nota: muevo mejor los pies y reacciono más rápido.\"",
    featured: false,
  },
  {
    flag: "💪",
    name: "Pedro G.",
    text: "\"Lo que más me gusta es que adapta los entrenos cuando le digo que estoy cansado o que tengo torneo. Como tener un preparador en el bolsillo.\"",
    featured: false,
  },
];

const VISIBLE = 3;

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const maxIndex = testimonials.length - VISIBLE;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section
      id="testimonios"
      className="py-20 text-white overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container mx-auto px-4">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-bivo-green text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(57,255,20,0.1)",
              border: "1px solid rgba(57,255,20,0.3)",
            }}
          >
            Testimonios
          </div>
          <h2 className="font-round text-3xl font-bold mb-4">
            Lo que dicen <span className="text-bivo-green">nuestros usuarios</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#d1d5db" }}>
            Opiniones reales de jugadores y entrenadores que ya entrenan con Bivo.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto" style={{ padding: "0 50px" }}>
          {/* Mask fade lateral */}
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
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col"
                  style={{
                    flexBasis: `calc((100% - 48px) / ${VISIBLE})`,
                    minHeight: "220px",
                    background: "#141414",
                    border: t.featured
                      ? "1px solid rgba(57,255,20,0.45)"
                      : "1px solid #1f1f1f",
                    boxShadow: t.featured ? "0 0 40px rgba(57,255,20,0.08)" : undefined,
                    borderRadius: "16px",
                    padding: "28px 24px",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ fontSize: "18px" }}>{t.flag}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                      {t.name}
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
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="flex items-center justify-center gap-6 mt-9">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Anterior"
              className="testi-nav-btn w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: index === 0 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al grupo ${i + 1}`}
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
              disabled={index === maxIndex}
              aria-label="Siguiente"
              className="testi-nav-btn w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: index === maxIndex ? "not-allowed" : "pointer",
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
