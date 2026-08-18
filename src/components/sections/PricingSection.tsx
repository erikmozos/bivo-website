import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { getSectionId } from "@/lib/sectionIds";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import type { PlanKey } from "@/lib/config";
import { writeFlowSession } from "@/lib/flowSession";

type PlanData = {
  name: string;
  amount: string;
  period: string;
  billed?: string;
  savings?: string;
  badge?: string | null;
  badgeStyle?: "popular" | "value" | null;
  featured?: boolean;
};

const PLAN_KEYS: PlanKey[] = ["monthly", "quarterly", "annual"];

const CheckIcon = () => (
  <span className="text-bivo-green font-bold shrink-0" aria-hidden>
    ✓
  </span>
);

const PricingSection = () => {
  const { t } = useTranslation();
  const { localePath, lang } = useLocale();

  const includedFeatures = t("pricing.features", { returnObjects: true }) as string[];
  const plansData = t("pricing.plans", { returnObjects: true }) as PlanData[];

  const plans = plansData.map((plan, index) => ({
    ...plan,
    key: PLAN_KEYS[index] ?? "quarterly",
    featured: index === 1,
  }));

  const startPath = (planKey: PlanKey) => {
    const params = new URLSearchParams({ plan: planKey });
    return `${localePath("/registro")}?${params.toString()}`;
  };

  const handleSelectPlan = (planKey: PlanKey) => {
    writeFlowSession({ selectedPlanKey: planKey });
    notifyFlowSessionChange();
  };

  return (
    <section
      id={getSectionId(lang, "pricing")}
      className="py-24 text-white relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(57,255,20,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-bivo-green text-[13px] font-semibold uppercase tracking-[0.12em] mb-4">
            {t("pricing.preHeadline")}
          </p>
          <h2 className="font-round text-3xl sm:text-4xl lg:text-[50px] font-bold leading-tight mb-3">
            {t("pricing.heading")}
          </h2>
          <p className="text-white/70 text-lg">{t("pricing.subheading")}</p>
        </div>

        <div className="max-w-[700px] mx-auto mb-12 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5 text-center">
            <div className="text-[13px] text-white/50 mb-1.5">{t("pricing.anchor.oldLabel")}</div>
            <div className="text-[22px] font-bold text-red-400 line-through">
              {t("pricing.anchor.oldPrice")}
            </div>
          </div>
          <div className="text-center text-xl font-extrabold text-white/40 uppercase">
            {t("pricing.anchor.vs")}
          </div>
          <div className="rounded-2xl bg-bivo-green px-6 py-5 text-center text-black">
            <div className="text-[13px] font-semibold mb-1.5">{t("pricing.anchor.newLabel")}</div>
            <div className="text-[22px] font-extrabold">{t("pricing.anchor.newPrice")}</div>
          </div>
        </div>

        <div className="grid gap-5 max-w-[960px] mx-auto mb-12 grid-cols-1 md:grid-cols-3 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-7 text-center ${
                plan.featured
                  ? "border-2 border-bivo-green shadow-[0_0_40px_rgba(57,255,20,0.18)] bg-[#111]"
                  : "border border-white/10 bg-[#111]"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-[12px] font-bold tracking-wide whitespace-nowrap ${
                    plan.badgeStyle === "value"
                      ? "bg-[#1a1a1a] text-bivo-green border border-bivo-green"
                      : "bg-bivo-green text-black"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="text-[13px] font-bold tracking-[0.1em] uppercase text-white/45 mb-4">
                {plan.name}
              </div>

              <div className="font-round text-[42px] font-extrabold text-white leading-none">
                {plan.amount}
                <span className="text-lg font-medium text-white/70"> {plan.period}</span>
              </div>

              {plan.billed && (
                <div className="text-[15px] text-white/45 mt-1">{plan.billed}</div>
              )}

              {plan.savings && (
                <div className="text-sm text-bivo-green font-semibold mt-1">{plan.savings}</div>
              )}

              <Link
                to={startPath(plan.key)}
                onClick={() => handleSelectPlan(plan.key)}
                className="mt-5 block w-full rounded-xl bg-bivo-green px-5 py-3.5 text-center text-base font-bold text-black transition hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(57,255,20,0.35)]"
              >
                {t("pricing.cta")}
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-[600px] mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-x-6">
          {includedFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-[15px] text-white">
              <CheckIcon />
              {feature}
            </div>
          ))}
        </div>

        <div className="max-w-[600px] mx-auto rounded-2xl border border-bivo-green/25 bg-bivo-green/[0.06] px-6 py-5 flex gap-4 items-start">
          <span className="text-[28px] shrink-0" aria-hidden>
            🛡️
          </span>
          <div>
            <strong className="block text-base font-bold text-white mb-1.5">
              {t("pricing.guaranteeTitle")}
            </strong>
            <p className="text-sm text-white/60 leading-relaxed m-0">
              {t("pricing.guaranteeBody")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
