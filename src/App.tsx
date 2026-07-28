import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./i18n";
import Index from "./pages/Index";
import ConsentBanner from "./components/ConsentBanner";
import { AuthProvider } from "./contexts/AuthContext";

const NotFound = lazy(() => import("./pages/NotFound"));
const StartPage = lazy(() => import("./pages/StartPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const TrainingPreviewPage = lazy(() => import("./pages/TrainingPreviewPage"));
const PaywallPage = lazy(() => import("./pages/PaywallPage"));
const DownloadAppPage = lazy(() => import("./pages/DownloadAppPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const ShoulderStabilityLanding = lazy(() => import("./pages/ShoulderStabilityLanding"));
const PadelLandingPage = lazy(() => import("./pages/PadelLandingPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div
      className="rounded-full h-12 w-12 border-b-2 border-bivo-green"
      style={{ animation: "spin 0.8s linear infinite" }}
    />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LocaleLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  const supportedLangs = ["es", "en"];
  const locale = supportedLangs.includes(lang || "") ? lang! : null;

  useLayoutEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale || "es";
  }, [locale, i18n]);

  if (!locale) {
    return <Navigate to={`/es${location.pathname}`} replace />;
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <html lang={locale} />
      </Helmet>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/es" replace />} />
                <Route path="/:lang" element={<LocaleLayout />}>
                  <Route index element={<Index />} />
                  <Route path="empezar" element={<StartPage />} />
                  <Route path="registro" element={<AuthPage />} />
                  <Route path="onboarding" element={<OnboardingPage />} />
                  <Route path="entrenamiento" element={<TrainingPreviewPage />} />
                  <Route path="paywall" element={<PaywallPage />} />
                  <Route path="descargar" element={<DownloadAppPage />} />
                  <Route path="privacidad" element={<PrivacyPolicy />} />
                  <Route path="cookies" element={<CookiePolicy />} />
                  <Route path="terminos" element={<TermsConditions />} />
                  <Route path="estabilidad-hombro">
                    <Route index element={<ShoulderStabilityLanding />} />
                    <Route path="privacidad" element={<PrivacyPolicy />} />
                    <Route path="terminos" element={<TermsConditions />} />
                  </Route>
                  <Route path="padel">
                    <Route index element={<PadelLandingPage />} />
                    <Route path="privacidad" element={<PrivacyPolicy />} />
                    <Route path="terminos" element={<TermsConditions />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ConsentBanner />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
