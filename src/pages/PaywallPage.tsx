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

const PaywallPage = () => {
  const { t } = useTranslation();
  const { localePath, lang } = useLocale();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { member } = useAppFlow();

  useRevenueCatUser();

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
  const [selectedKey, setSelectedKey] = useState<PlanKey>("quarterly");
  const [loadingOfferings, setLoadingOfferings] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [redeemingPromo, setRedeemingPromo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiErrorDetail, setApiErrorDetail] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const goToDownload = () => navigate(localePath("/descargar"), { replace: true });

  // Si el webhook ya activó premium, saltar paywall
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
          if (entries.length && !entries.find((p) => p.key === selectedKey)) {
            setSelectedKey(entries.find((p) => p.featured)?.key ?? entries[0].key);
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
  }, [user, t]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.key === selectedKey) ?? null,
    [plans, selectedKey]
  );

  const formatPrice = (pkg: Package) => {
    const product = pkg.webBillingProduct ?? pkg.rcBillingProduct;
    const price = product?.price;
    if (!price) return "—";
    return price.formattedPrice;
  };

  const formatPeriod = (key: PlanKey) => t(`appFlow.paywall.periods.${key}`);

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

  return (
    <FlowGuard require="paywall">
      <FlowLayout
        badge={t("appFlow.paywall.badge", { days: TRIAL_DAYS })}
        title={t("appFlow.paywall.title")}
        subtitle={t("appFlow.paywall.subtitle", { days: TRIAL_DAYS })}
      >
        {member?.isTrial && (
          <p className="text-center text-bivo-green text-sm mb-6">
            {t("appFlow.paywall.trialActive")}
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
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {plans.map((plan) => (
              <button
                key={plan.key}
                type="button"
                onClick={() => setSelectedKey(plan.key)}
                className={`relative text-left rounded-2xl p-5 border transition-all ${
                  selectedKey === plan.key
                    ? "border-bivo-green/60 bg-bivo-green/[0.08] shadow-[0_0_40px_rgba(57,255,20,0.12)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-bivo-green text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                    {t("appFlow.paywall.popular")}
                  </span>
                )}
                <div className="text-xs uppercase tracking-widest text-bivo-green font-bold mb-2">
                  {t(`appFlow.paywall.planNames.${plan.key}`)}
                </div>
                <div className="font-round text-3xl font-extrabold text-white mb-1">
                  {formatPrice(plan.pkg)}
                </div>
                <div className="text-sm text-gray-400">{formatPeriod(plan.key)}</div>
              </button>
            ))}
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6">
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
              className="px-5 py-3 rounded-xl border border-white/15 text-white font-semibold text-sm hover:border-bivo-green/40 disabled:opacity-50"
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
          className="w-full py-4 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm disabled:opacity-50"
        >
          {purchasing
            ? t("appFlow.paywall.processing")
            : t("appFlow.paywall.cta", { days: TRIAL_DAYS })}
        </button>

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
