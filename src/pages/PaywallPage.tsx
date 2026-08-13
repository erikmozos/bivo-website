import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { Package } from "@revenuecat/purchases-js";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useRevenueCatUser } from "@/hooks/useRevenueCatUser";
import { useLocale } from "@/hooks/useLocale";
import { PROMO_CODES, TRIAL_DAYS, type PlanKey } from "@/lib/config";
import { isPlanKey } from "@/lib/flowSession";
import {
  getCurrentOfferingPackages,
  isRevenueCatConfigured,
  isRevenueCatLive,
  isRevenueCatSandbox,
  purchasePackage,
} from "@/lib/revenuecat";
import {
  formatRevenueCatError,
  isPurchaseCancelled,
  logRevenueCatError,
} from "@/lib/revenuecatErrors";
import {
  formatRcApiErrorForUi,
  getLastRevenueCatApiError,
  installRevenueCatFetchDiagnostics,
  logPackageDiagnostics,
} from "@/lib/revenuecatDiagnostics";
import { redeemPromoCode, waitForEntitlementActive } from "@/lib/subscription";
import { shouldShowPaywall } from "@/types/member";

type PlanOption = {
  key: PlanKey;
  pkg: Package;
  featured: boolean;
};

const MONTHS_BY_PLAN: Record<PlanKey, number> = {
  monthly: 1,
  quarterly: 3,
  annual: 12,
};

function getProduct(pkg: Package) {
  return pkg.webBillingProduct ?? pkg.rcBillingProduct;
}

function formatPrice(pkg: Package) {
  const price = getProduct(pkg)?.price;
  if (!price) return "—";
  return price.formattedPrice;
}

function formatMonthlyEquivalent(pkg: Package, key: PlanKey, locale: string) {
  const product = getProduct(pkg);
  const monthlyPrice = product?.pricePerMonth ?? null;
  const price = monthlyPrice ?? product?.price;
  if (!price) return formatPrice(pkg);

  if (monthlyPrice?.formattedPrice) return monthlyPrice.formattedPrice;

  // amount is in cents (deprecated); amountMicros is micro-units
  const major =
    typeof price.amountMicros === "number"
      ? price.amountMicros / 1_000_000 / (monthlyPrice ? 1 : MONTHS_BY_PLAN[key])
      : typeof price.amount === "number"
        ? price.amount / 100 / (monthlyPrice ? 1 : MONTHS_BY_PLAN[key])
        : null;

  if (major == null) return formatPrice(pkg);

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: price.currency ?? "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    return `${major.toFixed(2)}€`;
  }
}

const PaywallPage = () => {
  const { t, i18n } = useTranslation();
  const { localePath, lang } = useLocale();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { member, session } = useAppFlow();

  useRevenueCatUser();

  const lockedPlanKey = isPlanKey(session.selectedPlanKey) ? session.selectedPlanKey : null;

  useEffect(() => {
    installRevenueCatFetchDiagnostics();

    const onApiError = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      const message = formatRcApiErrorForUi(detail) ?? `HTTP ${detail?.status ?? 500}`;
      setApiErrorDetail(message);
      setError(message);
    };

    window.addEventListener("rc-api-error", onApiError);
    const previous = getLastRevenueCatApiError();
    if (previous) {
      setApiErrorDetail(formatRcApiErrorForUi(previous));
    }

    return () => window.removeEventListener("rc-api-error", onApiError);
  }, []);

  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [selectedKey, setSelectedKey] = useState<PlanKey>(lockedPlanKey ?? "quarterly");
  const [loadingOfferings, setLoadingOfferings] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [redeemingPromo, setRedeemingPromo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiErrorDetail, setApiErrorDetail] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const features = t("appFlow.paywall.features", { returnObjects: true }) as string[];

  const goToDownload = () => navigate(localePath("/descargar"), { replace: true });

  useEffect(() => {
    if (lockedPlanKey) {
      setSelectedKey(lockedPlanKey);
    }
  }, [lockedPlanKey]);

  useEffect(() => {
    if (member && !shouldShowPaywall(member)) {
      if (member.entitlementActive || member.isDev) {
        goToDownload();
      }
    }
  }, [member]);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function load() {
      if (!isRevenueCatConfigured()) {
        setError(t("appFlow.paywall.rcNotConfigured"));
        setLoadingOfferings(false);
        return;
      }

      try {
        const offering = await getCurrentOfferingPackages();

        const entries: PlanOption[] = [];
        if (offering.monthly) entries.push({ key: "monthly", pkg: offering.monthly, featured: false });
        if (offering.quarterly) entries.push({ key: "quarterly", pkg: offering.quarterly, featured: true });
        if (offering.annual) entries.push({ key: "annual", pkg: offering.annual, featured: false });

        if (!cancelled) {
          setPlans(entries);
          logPackageDiagnostics(entries.map((e) => e.pkg));
          const preferred = lockedPlanKey ?? "quarterly";
          if (entries.length && !entries.find((p) => p.key === preferred)) {
            setSelectedKey(entries.find((p) => p.featured)?.key ?? entries[0].key);
          } else if (lockedPlanKey && entries.find((p) => p.key === lockedPlanKey)) {
            setSelectedKey(lockedPlanKey);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t("appFlow.paywall.loadError"));
        }
      } finally {
        if (!cancelled) setLoadingOfferings(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, t, lockedPlanKey]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.key === selectedKey) ?? null,
    [plans, selectedKey]
  );

  const visiblePlans = useMemo(() => {
    if (!lockedPlanKey) return plans;
    const locked = plans.find((p) => p.key === lockedPlanKey);
    return locked ? [locked] : plans;
  }, [plans, lockedPlanKey]);

  const handleAfterPurchaseOrPromo = async () => {
    if (!user) return;
    setStatusMessage(t("appFlow.paywall.activating"));
    await waitForEntitlementActive(user.uid);
    goToDownload();
  };

  const handlePurchase = async () => {
    if (!user || !selectedPlan) return;

    setPurchasing(true);
    setError(null);
    setStatusMessage(null);

    try {
      await purchasePackage(selectedPlan.pkg, {
        locale: lang === "en" ? "en" : "es",
        discountCode: appliedPromoCode === "FPIB26" ? appliedPromoCode : undefined,
      });
      await handleAfterPurchaseOrPromo();
    } catch (err) {
      logRevenueCatError("purchase", err);
      if (!isPurchaseCancelled(err)) {
        setError(formatRevenueCatError(err) || t("appFlow.paywall.purchaseError"));
      }
    } finally {
      setPurchasing(false);
      setStatusMessage(null);
    }
  };

  const handleRedeemPromo = async () => {
    if (!user || !promoCode.trim()) return;

    const code = promoCode.trim().toUpperCase();
    if (!PROMO_CODES.includes(code as (typeof PROMO_CODES)[number])) {
      setError(t("appFlow.paywall.promoInvalid"));
      return;
    }

    setRedeemingPromo(true);
    setError(null);
    setStatusMessage(null);

    try {
      await redeemPromoCode(code);

      if (code === "BIVO1") {
        setStatusMessage(t("appFlow.paywall.promoBivo1"));
        await handleAfterPurchaseOrPromo();
        return;
      }

      if (code === "FPIB26") {
        setAppliedPromoCode(code);
        setStatusMessage(t("appFlow.paywall.promoFpib26"));
        return;
      }

      setStatusMessage(t("appFlow.paywall.promoApplied"));
      await handleAfterPurchaseOrPromo();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("appFlow.paywall.promoError"));
    } finally {
      setRedeemingPromo(false);
    }
  };

  const billedLabel = (plan: PlanOption) => {
    if (plan.key === "monthly") return t("appFlow.paywall.billed.monthly");
    return t(`appFlow.paywall.billed.${plan.key}`, { price: formatPrice(plan.pkg) });
  };

  const badgeFor = (plan: PlanOption) => {
    if (plan.key === "quarterly") return t("appFlow.paywall.popular");
    if (plan.key === "annual") return t("appFlow.paywall.bestValue");
    return null;
  };

  return (
    <FlowGuard require="paywall">
      <FlowLayout>
        <header className="text-center mb-8 lg:mb-10">
          <p className="text-bivo-green text-[13px] font-semibold uppercase tracking-[0.12em] mb-3">
            {t("appFlow.paywall.preHeadline")}
          </p>
          <h1 className="font-round text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {t("appFlow.paywall.title", { days: TRIAL_DAYS })}
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            {t("appFlow.paywall.subtitle")}
          </p>
        </header>

        {member?.isTrial && (
          <p className="text-center text-bivo-green text-sm mb-6">
            {t("appFlow.paywall.trialActive")}
          </p>
        )}

        <div className="max-w-[700px] mx-auto mb-8 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center">
            <div className="text-[12px] text-white/50 mb-1">{t("appFlow.paywall.anchor.oldLabel")}</div>
            <div className="text-lg font-bold text-red-400 line-through">
              {t("appFlow.paywall.anchor.oldPrice")}
            </div>
          </div>
          <div className="text-center text-lg font-extrabold text-white/40 uppercase">
            {t("appFlow.paywall.anchor.vs")}
          </div>
          <div className="rounded-2xl bg-bivo-green px-5 py-4 text-center text-black">
            <div className="text-[12px] font-semibold mb-1">{t("appFlow.paywall.anchor.newLabel")}</div>
            <div className="text-lg font-extrabold">{t("appFlow.paywall.anchor.newPrice")}</div>
          </div>
        </div>

        {lockedPlanKey && (
          <p className="text-center text-sm text-white/60 mb-4">
            {t("appFlow.paywall.planLocked", {
              plan: t(`appFlow.paywall.planNames.${lockedPlanKey}`),
            })}
          </p>
        )}

        {loadingOfferings ? (
          <div className="flex justify-center py-16">
            <div
              className="rounded-full h-10 w-10 border-b-2 border-bivo-green"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          </div>
        ) : plans.length === 0 ? (
          <p className="text-center text-gray-400 py-8">{t("appFlow.paywall.loadError")}</p>
        ) : (
          <div
            className={`grid gap-4 mb-8 items-start ${
              lockedPlanKey ? "max-w-sm mx-auto grid-cols-1" : "sm:grid-cols-3"
            }`}
          >
            {visiblePlans.map((plan) => {
              const badge = badgeFor(plan);
              const selected = selectedKey === plan.key;
              const interactive = !lockedPlanKey;
              return (
                <button
                  key={plan.key}
                  type="button"
                  onClick={interactive ? () => setSelectedKey(plan.key) : undefined}
                  disabled={!interactive}
                  className={`relative text-center rounded-2xl p-6 border transition-all ${
                    selected || plan.featured
                      ? "border-bivo-green border-2 bg-[#111] shadow-[0_0_40px_rgba(57,255,20,0.15)]"
                      : "border-white/10 bg-[#111] hover:border-bivo-green/40"
                  } ${selected ? "ring-2 ring-bivo-green/40" : ""} ${
                    !interactive ? "cursor-default" : ""
                  }`}
                >
                  {badge && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap ${
                        plan.key === "annual"
                          ? "bg-[#1a1a1a] text-bivo-green border border-bivo-green"
                          : "bg-bivo-green text-black"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                  <div className="text-[12px] uppercase tracking-[0.1em] text-white/45 font-bold mb-3">
                    {t(`appFlow.paywall.planNames.${plan.key}`)}
                  </div>
                  <div className="font-round text-[34px] font-extrabold text-white leading-none">
                    {formatMonthlyEquivalent(plan.pkg, plan.key, i18n.language)}
                    <span className="text-base font-medium text-white/60">
                      {" "}
                      {t(`appFlow.paywall.periods.${plan.key}`)}
                    </span>
                  </div>
                  <div className="text-sm text-white/45 mt-2">{billedLabel(plan)}</div>
                  {(plan.key === "quarterly" || plan.key === "annual") && (
                    <div className="text-sm text-bivo-green font-semibold mt-1">
                      {t(`appFlow.paywall.savings.${plan.key}`)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="max-w-[600px] mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-x-6">
          {Array.isArray(features) &&
            features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-white">
                <span className="text-bivo-green font-bold" aria-hidden>
                  ✓
                </span>
                {feature}
              </div>
            ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6">
          <label htmlFor="promo" className="block text-sm text-gray-400 mb-2">
            {t("appFlow.paywall.promoLabel")}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="promo"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder={t("appFlow.paywall.promoPlaceholder")}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/60 uppercase"
            />
            <button
              type="button"
              onClick={handleRedeemPromo}
              disabled={redeemingPromo || !promoCode.trim()}
              className="px-5 py-3 rounded-xl bg-bivo-green text-black font-bold text-sm hover:brightness-110 disabled:opacity-50 transition"
            >
              {redeemingPromo ? t("appFlow.paywall.promoApplying") : t("appFlow.paywall.promoCta")}
            </button>
          </div>
        </div>

        {statusMessage && (
          <p className="text-center text-bivo-green text-sm mb-4">{statusMessage}</p>
        )}

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handlePurchase}
          disabled={purchasing || !selectedPlan || loadingOfferings}
          className="w-full py-4 rounded-xl bg-bivo-green text-black font-bold text-base disabled:opacity-50 hover:brightness-110 transition"
        >
          {purchasing
            ? t("appFlow.paywall.processing")
            : t("appFlow.paywall.cta", { days: TRIAL_DAYS })}
        </button>

        <div className="mt-6 max-w-[600px] mx-auto rounded-2xl border border-bivo-green/25 bg-bivo-green/[0.06] px-5 py-4 flex gap-3 items-start">
          <span className="text-2xl shrink-0" aria-hidden>
            🛡️
          </span>
          <div>
            <strong className="block text-sm font-bold text-white mb-1">
              {t("appFlow.paywall.guaranteeTitle", { days: TRIAL_DAYS })}
            </strong>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              {t("appFlow.paywall.guaranteeBody")}
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">{t("appFlow.paywall.note")}</p>

        {import.meta.env.DEV && isRevenueCatSandbox() && (
          <p className="text-center text-amber-500/80 text-xs mt-3 max-w-md mx-auto">
            {t("appFlow.paywall.sandboxHint")}
          </p>
        )}

        {import.meta.env.DEV && isRevenueCatLive() && (
          <p className="text-center text-amber-500/80 text-xs mt-3 max-w-md mx-auto">
            {t("appFlow.paywall.liveHint")}
          </p>
        )}

        {import.meta.env.DEV && apiErrorDetail && (
          <pre className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-300 text-[10px] whitespace-pre-wrap break-all max-h-40 overflow-auto">
            {apiErrorDetail}
          </pre>
        )}
      </FlowLayout>
    </FlowGuard>
  );
};

export default PaywallPage;
