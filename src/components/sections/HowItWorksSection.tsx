import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const stepImages = [
  { ext: "png", file: "01-valora" },
  { ext: "jpg", file: "02-entrenamiento" },
  { ext: "png", file: "03-mejora" },
  { ext: "png", file: "04-calendario" },
  { ext: "png", file: "05-adapta" },
];

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  const stepsData = t("howItWorks.steps", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const steps = stepsData.map((step, index) => ({
    number: index + 1,
    title: step.title,
    description: step.description,
    image: `/img2/flow/${stepImages[index].file}.${stepImages[index].ext}`,
  }));

  return (
    <section id="como-funciona" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("howItWorks.heading")}
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <Link
            to={localePath("/empezar")}
            className="inline-flex items-center justify-center bg-bivo-green text-black px-8 py-3.5 rounded-xl font-extrabold text-base sm:text-lg uppercase tracking-wide hover:bg-opacity-90 transition-all transform hover:scale-[1.02] shadow-[0_8px_32px_rgba(57,255,20,0.25)]"
          >
            {t("howItWorks.cta")}
          </Link>
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
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)",
                }}
              />

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
