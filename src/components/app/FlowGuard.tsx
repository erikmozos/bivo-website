import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { useAppFlow } from "@/hooks/useAppFlow";
import type { AppFlowStep } from "@/types/member";

const STEP_PATH: Record<AppFlowStep, string> = {
  email: "/empezar",
  onboarding: "/onboarding",
  training: "/entrenamiento",
  auth: "/registro",
  paywall: "/paywall",
  download: "/descargar",
};

interface FlowGuardProps {
  require: AppFlowStep;
  children: React.ReactNode;
}

const FlowGuard = ({ require: requiredStep, children }: FlowGuardProps) => {
  const { localePath } = useLocale();
  const { step, loading } = useAppFlow();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="rounded-full h-12 w-12 border-b-2 border-bivo-green"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
      </div>
    );
  }

  if (step !== requiredStep) {
    return <Navigate to={localePath(STEP_PATH[step])} replace />;
  }

  return <>{children}</>;
};

export function useFlowRedirect(requiredStep: AppFlowStep) {
  const { localePath } = useLocale();
  const { step, loading } = useAppFlow();

  const shouldRedirect = !loading && step !== requiredStep;
  const redirectTo = shouldRedirect ? localePath(STEP_PATH[step]) : null;

  return { loading, shouldRedirect, redirectTo };
}

export function FlowRedirectOnComplete({ targetStep }: { targetStep: AppFlowStep }) {
  const { localePath } = useLocale();
  const { step, loading } = useAppFlow();

  useEffect(() => {
    // no-op: navigation handled by render
  }, [step]);

  if (loading) return null;

  const order: AppFlowStep[] = [
    "email",
    "auth",
    "onboarding",
    "training",
    "paywall",
    "download",
  ];
  const currentIdx = order.indexOf(step);
  const targetIdx = order.indexOf(targetStep);

  if (currentIdx > targetIdx) {
    return <Navigate to={localePath(STEP_PATH[step])} replace />;
  }

  return null;
}

export default FlowGuard;
