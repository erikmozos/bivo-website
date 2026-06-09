const steps = [
  {
    number: 1,
    title: "Bivo te valora y te conoce",
    description:
      "Test inicial para entender tu nivel, deporte, objetivos, lesiones previas y disponibilidad.",
    image: "/img2/flow/01-valora.png",
  },
  {
    number: 2,
    title: "Entrenamiento personalizado",
    description:
      "Plan específico para tu deporte de raqueta basado en tus datos, sin plantillas genéricas.",
    image: "/img2/flow/02-entrenamiento.jpg",
  },
  {
    number: 3,
    title: "Registra tu mejora",
    description:
      "Estadísticas claras de adherencia, velocidad y escudo de lesiones. Visualiza tu progreso.",
    image: "/img2/flow/03-mejora.png",
  },
  {
    number: 4,
    title: "Gestiona tu calendario",
    description:
      "Organiza tus sesiones, partidos y descansos en un mismo lugar. Sin solapamientos.",
    image: "/img2/flow/04-calendario.png",
  },
  {
    number: 5,
    title: "Se adapta a ti",
    description:
      "¿Cambias de objetivo, te lesionas o tienes menos tiempo? Bivo recalcula tu plan automáticamente.",
    image: "/img2/flow/05-adapta.png",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-round text-3xl font-bold mb-4">
            Cómo <span className="text-bivo-green">funciona</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            En cinco pasos sencillos, Bivo te acompaña desde el primer test hasta tu progreso a largo
            plazo. Todo se adapta a ti automáticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flow-card group relative overflow-hidden rounded-2xl flex flex-col justify-end p-6"
              style={{
                minHeight: "360px",
                background: `#141414 url('${step.image}') center top / cover no-repeat`,
                border: "1px solid #1f1f1f",
                isolation: "isolate",
                transition: "transform 0.35s, border-color 0.3s, box-shadow 0.3s",
              }}
            >
              {/* Gradiente oscuro encima de la imagen */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)",
                }}
              />

              {/* Badge número */}
              <span
                className="absolute top-4 left-4 z-20 flex items-center justify-center font-round font-extrabold text-black text-base"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#39ff14",
                  boxShadow: "0 6px 18px rgba(57,255,20,0.45), 0 0 0 4px rgba(0,0,0,0.4)",
                }}
              >
                {step.number}
              </span>

              {/* Texto en la parte inferior */}
              <div className="relative z-20">
                <h3
                  className="font-round font-extrabold text-white mb-2 leading-tight"
                  style={{ fontSize: "17px", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-white/82 leading-relaxed"
                  style={{ fontSize: "13px", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .flow-card:hover {
          transform: translateY(-6px);
          border-color: rgba(57,255,20,0.4) !important;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(57,255,20,0.2);
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
