import { useTranslation } from "react-i18next";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAppFlow } from "@/hooks/useAppFlow";
import { APP_STORE_URL, GOOGLE_PLAY_URL, APP_DOWNLOAD_QR } from "@/lib/storeLinks";

const storeButtonClass =
  "group flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-bivo-green/60 hover:bg-bivo-green/[0.06] hover:shadow-[0_12px_40px_rgba(57,255,20,0.15)]";

function formatPeriodEnd(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString();
  }
  if (typeof value === "object" && value !== null && "seconds" in value) {
    const d = new Date((value as { seconds: number }).seconds * 1000);
    return d.toLocaleDateString();
  }
  if (value instanceof Date) return value.toLocaleDateString();
  return null;
}

const DownloadAppPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { member } = useAppFlow();

  const periodEnd = formatPeriodEnd(member?.currentPeriodEndsAt);
  const statusKey = member?.subscriptionStatus ?? "active";

  return (
    <FlowGuard require="download">
      <FlowLayout
        badge={t("appFlow.download.badge")}
        title={t("appFlow.download.title")}
        subtitle={t("appFlow.download.subtitle")}
      >
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          style={{ boxShadow: "0 0 80px rgba(57,255,20,0.08)" }}
        >
          <p className="text-center text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
            {t("appFlow.download.message")}
          </p>

          {user?.email && (
            <p className="text-center text-xs text-gray-500 mb-6">
              {t("appFlow.download.signedInAs", { email: user.email })}
            </p>
          )}

          {(member?.isTrial || member?.subscriptionStatus) && (
            <div className="rounded-xl border border-bivo-green/20 bg-bivo-green/[0.06] px-4 py-3 mb-6 text-center">
              {member.isTrial && (
                <p className="text-sm text-bivo-green font-semibold mb-1">
                  {t("appFlow.download.trialActive")}
                </p>
              )}
              <p className="text-xs text-gray-400">
                {t(`appFlow.download.status.${statusKey}`, {
                  defaultValue: statusKey,
                })}
                {periodEnd ? ` · ${t("appFlow.download.renewsOn", { date: periodEnd })}` : ""}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={storeButtonClass}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-bivo-green/10">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white transition-colors group-hover:text-bivo-green">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </span>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">{t("footer.appStore.label")}</div>
                <div className="mt-0.5 text-sm font-bold text-white transition-colors group-hover:text-bivo-green">
                  {t("footer.appStore.store")}
                </div>
              </div>
            </a>

            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={storeButtonClass}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-bivo-green/10">
                <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#00C1FF" d="M31.2 4.4C19.6 11 12 23.4 12 37.6v436.8c0 14.2 7.6 26.6 19.2 33.2l3.6 2L274 270.4v-5.4L34.8 2.4l-3.6 2z" />
                  <path fill="#FFD900" d="M352.6 348.8l-78.6-78.4v-5.4l78.6-78.6 1.8 1L456 249.6c29.2 16.6 29.2 43.8 0 60.4l-101.6 57.6-1.8 1.2z" />
                  <path fill="#FF3333" d="M354.4 347.6L274 267.2 31.2 509.6C40 518.8 53.4 519.4 68.4 511l286-163.4" />
                  <path fill="#00EE76" d="M354.4 188.4L68.4 25C53.4 16.4 40 17.2 31.2 26.4L274 268.8l80.4-80.4z" />
                </svg>
              </span>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">{t("footer.googlePlay.label")}</div>
                <div className="mt-0.5 text-sm font-bold text-white transition-colors group-hover:text-bivo-green">
                  {t("footer.googlePlay.store")}
                </div>
              </div>
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src={APP_DOWNLOAD_QR}
              alt={t("footer.qrAlt")}
              className="h-32 w-32 rounded-xl bg-white p-2"
            />
          </div>
        </div>
      </FlowLayout>
    </FlowGuard>
  );
};

export default DownloadAppPage;
