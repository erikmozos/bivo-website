import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import { readFlowSession } from "@/lib/flowSession";
import { isFirebaseConfigured } from "@/lib/firebase";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/60 focus:border-bivo-green/40 transition";

const AuthPage = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const { user, loading: flowLoading, step } = useAppFlow();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState(() => readFlowSession().email ?? "");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isFirebaseConfigured()) {
    return (
      <FlowLayout title={t("appFlow.auth.configErrorTitle")} subtitle={t("appFlow.auth.configError")} />
    );
  }

  if (!flowLoading && user && step !== "auth") {
    const paths = {
      email: "/empezar",
      onboarding: "/onboarding",
      training: "/entrenamiento",
      auth: "/registro",
      paywall: "/paywall",
      download: "/descargar",
    } as const;
    return <Navigate to={localePath(paths[step])} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password, displayName || undefined);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("appFlow.auth.genericError"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("appFlow.auth.genericError"));
    } finally {
      setSubmitting(false);
    }
  };

  const content = (
    <FlowLayout
      badge={t("appFlow.auth.badge")}
      title={mode === "signup" ? t("appFlow.auth.signupTitle") : t("appFlow.auth.loginTitle")}
      subtitle={t("appFlow.auth.subtitle")}
    >
      <div
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
        style={{ boxShadow: "0 0 80px rgba(57,255,20,0.06)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="displayName" className="block text-sm text-gray-400 mb-2">
                {t("appFlow.auth.displayName")}
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              {t("appFlow.auth.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
              {t("appFlow.auth.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
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
            {submitting
              ? t("appFlow.auth.submitting")
              : mode === "signup"
                ? t("appFlow.auth.signupCta")
                : t("appFlow.auth.loginCta")}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">{t("appFlow.auth.or")}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="w-full py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white font-semibold text-sm hover:border-bivo-green/40 hover:bg-bivo-green/[0.06] transition disabled:opacity-60"
        >
          {t("appFlow.auth.google")}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "signup" ? t("appFlow.auth.hasAccount") : t("appFlow.auth.noAccount")}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setError(null);
            }}
            className="text-bivo-green font-semibold hover:underline"
          >
            {mode === "signup" ? t("appFlow.auth.switchLogin") : t("appFlow.auth.switchSignup")}
          </button>
        </p>
      </div>
    </FlowLayout>
  );

  if (user) return content;

  return <FlowGuard require="auth">{content}</FlowGuard>;
};

export default AuthPage;
