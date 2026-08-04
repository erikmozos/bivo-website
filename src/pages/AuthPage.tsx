import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import { isFirebaseConfigured } from "@/lib/firebase";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bivo-green/60 focus:border-bivo-green/40 transition";

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const AuthPage = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const { user, loading: flowLoading, step } = useAppFlow();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
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
        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-[#1F1F1F] font-semibold text-sm border border-[#747775]/40 shadow-sm hover:shadow-md hover:bg-[#f8f9fa] transition disabled:opacity-60"
        >
          <GoogleLogo />
          {t("appFlow.auth.google")}
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">{t("appFlow.auth.or")}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

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
