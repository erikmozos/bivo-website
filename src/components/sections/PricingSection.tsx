import { useState } from "react";
import { useTranslation } from "react-i18next";
import StoreChooserModal from "@/components/StoreChooserModal";

const CheckIcon = () => (
  <span
    className="flex-shrink-0 flex items-center justify-center"
    style={{
      width: "22px", height: "22px", borderRadius: "50%",
      background: "rgba(57,255,20,0.15)",
      border: "1px solid rgba(57,255,20,0.4)",
      color: "#39ff14",
    }}
  >
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const SavingsIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PricingSection = () => {
  const { t } = useTranslation();
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const includedFeatures = t("pricing.features", { returnObjects: true }) as string[];

  const plansData = t("pricing.plans", { returnObjects: true }) as {
    name: string;
    description: string;
    amount: string;
    period: string;
    meta: string;
    metaBold: string;
    savings: string;
    savingsExtra: string;
    badge: { text: string; gold: boolean } | null;
  }[];

  const plans = plansData.map((plan, index) => ({
    name: plan.name,
    desc: plan.description,
    amount: plan.amount,
    period: plan.period,
    meta: plan.meta,
    metaBold: plan.metaBold || null,
    savings: plan.savings || null,
    savingsExtra: plan.savingsExtra || null,
    badge: plan.badge || null,
    featured: index === 1,
  }));

  return (
    <section
      id="precios"
      className="py-24 text-white relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(57,255,20,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        <div className="text-center mb-4">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("pricing.headingNormal")}
            <span className="text-bivo-green">{t("pricing.headingGreen")}</span>
          </h2>
          <p style={{ color: "#d1d5db" }} className="max-w-2xl mx-auto">
            {t("pricing.description")}
          </p>
        </div>

        <div
          className="max-w-5xl mx-auto mt-12 mb-14"
          style={{
            background: "linear-gradient(135deg, rgba(57,255,20,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "32px 36px",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="text-center mb-6 uppercase tracking-widest font-bold"
            style={{ fontSize: "13px", color: "#39ff14" }}>
            {t("pricing.featuresTitle")}
          </p>
          <ul className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(1,1fr)", listStyle: "none", padding: 0, margin: 0 }}>
            {includedFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3" style={{ fontSize: "14px", color: "#e5e7eb" }}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 max-w-5xl mx-auto" style={{ gridTemplateColumns: "1fr" }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card-item relative flex flex-col"
              style={{
                background: plan.featured
                  ? "linear-gradient(180deg, rgba(57,255,20,0.08) 0%, #0a0a0a 35%)"
                  : "#0a0a0a",
                border: plan.featured
                  ? "1px solid rgba(57,255,20,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.featured
                  ? "0 0 0 1px rgba(57,255,20,0.2), 0 0 80px rgba(57,255,20,0.18), 0 30px 60px -20px rgba(0,0,0,0.6)"
                  : undefined,
                borderRadius: "20px",
                padding: "36px 32px 32px",
                transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, box-shadow 0.3s",
              }}
            >
              {plan.badge && (
                <div className="absolute font-round font-extrabold uppercase tracking-wider"
                  style={{
                    top: "-14px", left: "50%", transform: "translateX(-50%)",
                    padding: "7px 18px", borderRadius: "100px",
                    fontSize: "11px", letterSpacing: "0.12em", whiteSpace: "nowrap",
                    background: plan.badge.gold ? "linear-gradient(135deg, #ffd700, #ffaa00)" : "#39ff14",
                    color: plan.badge.gold ? "#1a1100" : "#000",
                    boxShadow: plan.badge.gold
                      ? "0 10px 26px rgba(255,170,0,0.4)"
                      : "0 10px 26px rgba(57,255,20,0.45)",
                  }}>
                  {plan.badge.text}
                </div>
              )}

              <div className="font-round font-extrabold uppercase tracking-widest mb-2"
                style={{ fontSize: "13px", color: "#39ff14" }}>
                {plan.name}
              </div>

              <p className="mb-7" style={{ color: "#a3a3a3", fontSize: "14px", lineHeight: 1.5, minHeight: "42px" }}>
                {plan.desc}
              </p>

              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="font-round font-extrabold text-white"
                  style={{ fontSize: "56px", letterSpacing: "-2.5px", lineHeight: 1 }}>
                  {plan.amount}
                </span>
                <span className="text-white font-semibold" style={{ fontSize: "24px", marginLeft: "4px" }}>€</span>
                <span style={{ color: "#888", fontSize: "14px", marginLeft: "6px", fontWeight: 500 }}>
                  {plan.period}
                </span>
              </div>

              <p style={{ color: "#a3a3a3", fontSize: "13px", marginBottom: "14px" }}>
                {plan.meta}
                {plan.metaBold && <strong style={{ color: "#fff", fontWeight: 700 }}>{plan.metaBold}</strong>}
              </p>

              <div className="flex flex-wrap gap-2 mb-1">
                {plan.savings && (
                  <div className="inline-flex items-center gap-1.5 self-start"
                    style={{
                      background: "rgba(57,255,20,0.12)",
                      border: "1px solid rgba(57,255,20,0.3)",
                      color: "#39ff14",
                      padding: "6px 12px", borderRadius: "8px",
                      fontSize: "12.5px", fontWeight: 700,
                    }}>
                    <SavingsIcon />
                    {plan.savings}
                  </div>
                )}
                {plan.savingsExtra && (
                  <div className="inline-flex items-center gap-1.5 self-start"
                    style={{
                      background: "rgba(57,255,20,0.12)",
                      border: "1px solid rgba(57,255,20,0.3)",
                      color: "#39ff14",
                      padding: "6px 12px", borderRadius: "8px",
                      fontSize: "12.5px", fontWeight: 700,
                    }}>
                    <SavingsIcon />
                    {plan.savingsExtra}
                  </div>
                )}
              </div>

              <div className="my-6" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

              <button
                type="button"
                onClick={() => setStoreModalOpen(true)}
                className="block w-full text-center font-bold uppercase tracking-wider mt-auto transition-all cursor-pointer"
                style={{
                  padding: "16px 24px", borderRadius: "12px",
                  fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none",
                  ...(plan.featured
                    ? { background: "#39ff14", color: "#000" }
                    : { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }),
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (plan.featured) {
                    el.style.filter = "brightness(1.08)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 14px 32px rgba(57,255,20,0.35)";
                  } else {
                    el.style.background = "rgba(57,255,20,0.08)";
                    el.style.borderColor = "#39ff14";
                    el.style.color = "#39ff14";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.filter = "";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  if (plan.featured) {
                    el.style.background = "#39ff14";
                    el.style.color = "#000";
                  } else {
                    el.style.background = "transparent";
                    el.style.borderColor = "rgba(255,255,255,0.2)";
                    el.style.color = "#fff";
                  }
                }}
              >
                {t("pricing.cta")}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center mt-10" style={{ color: "#6b7280", fontSize: "13px" }}>
          {t("pricing.note")}
        </p>
      </div>

      <StoreChooserModal open={storeModalOpen} onOpenChange={setStoreModalOpen} />

      <style>{`
        @media (min-width: 768px) {
          #precios .grid { grid-template-columns: repeat(3, 1fr) !important; gap: 28px !important; align-items: stretch; }
          #precios .feat-list { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 640px) {
          #precios .feat-list { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .pricing-card-item:hover {
          transform: translateY(-6px);
          border-color: rgba(57,255,20,0.3) !important;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6) !important;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
