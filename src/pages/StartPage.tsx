import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import { writeFlowSession } from "@/lib/flowSession";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/60 focus:border-bivo-green/40 transition";

const StartPage = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(t("appFlow.email.invalid"));
      setSubmitting(false);
      return;
    }

    writeFlowSession({ email: trimmed });
    notifyFlowSessionChange();
    navigate(localePath("/onboarding"));
    setSubmitting(false);
  };

  return (
    <FlowGuard require="email">
      <FlowLayout
        badge={t("appFlow.email.badge")}
        title={t("appFlow.email.title")}
        subtitle={t("appFlow.email.subtitle")}
      >
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
          style={{ boxShadow: "0 0 80px rgba(57,255,20,0.06)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="flowEmail" className="block text-sm text-gray-400 mb-2">
                {t("appFlow.email.label")}
              </label>
              <input
                id="flowEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder={t("appFlow.email.placeholder")}
                required
                autoComplete="email"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm disabled:opacity-60"
            >
              {submitting ? t("appFlow.email.submitting") : t("appFlow.email.cta")}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
            {t("appFlow.email.note")}
          </p>
        </div>
      </FlowLayout>
    </FlowGuard>
  );
};

export default StartPage;
