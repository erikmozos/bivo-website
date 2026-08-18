import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { useLocale } from "@/hooks/useLocale";
import { clearFlowSession } from "@/lib/flowSession";

const FlowUserBar = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    setLoading(true);
    try {
      clearFlowSession();
      notifyFlowSessionChange();
      await logout();
      navigate(localePath("/registro"), { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 text-[13px] sm:text-sm">
      <span className="text-white truncate max-w-[280px]">
        {t("appFlow.session.signedInAs")} {user.email}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="text-bivo-green font-semibold hover:underline disabled:opacity-50 shrink-0"
      >
        {loading ? t("appFlow.session.loggingOut") : t("appFlow.session.logout")}
      </button>
    </div>
  );
};

export default FlowUserBar;
