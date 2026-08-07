import { useTranslation } from "react-i18next";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAppFlow } from "@/hooks/useAppFlow";
import { APP_STORE_URL, GOOGLE_PLAY_URL, APP_DOWNLOAD_QR } from "@/lib/storeLinks";

const storeButtonClass =
  "group flex flex-1 items-center justify-center gap-3 rounded-2xl border border-bivo-green bg-black px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-bivo-green/[0.08] hover:shadow-[0_12px_40px_rgba(57,255,20,0.2)]";

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

const CalendarCheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4M16 3v4" />
    <path d="M9 15.5l2 2 4-4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green" aria-hidden>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green shrink-0" aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const DownloadAppPage = () => {
  const { t } = useTranslation();
  const { member } = useAppFlow();

  const periodEnd = formatPeriodEnd(member?.currentPeriodEndsAt);
  const statusKey = member?.subscriptionStatus ?? "active";

  return (
    <FlowGuard require="download">
      <FlowLayout>
        <header className="text-center mb-8 lg:mb-10">
          <p className="font-round text-2xl sm:text-3xl font-bold text-white mb-2">
            {t("appFlow.download.readyTitle")}
          </p>
          <h1 className="font-round text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bivo-green mb-4">
            {t("appFlow.download.title")}
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t("appFlow.download.subtitleBefore")}
            <span className="text-bivo-green font-semibold">
              {t("appFlow.download.subtitleHighlight")}
            </span>
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={storeButtonClass}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[11px] text-white/60 leading-tight">
                {t("appFlow.download.appStoreLabel")}
              </div>
              <div className="text-base font-bold text-white leading-tight">
                {t("appFlow.download.appStoreName")}
              </div>
            </div>
          </a>

          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={storeButtonClass}
          >
            <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
              <path fill="#00C1FF" d="M31.2 4.4C19.6 11 12 23.4 12 37.6v436.8c0 14.2 7.6 26.6 19.2 33.2l3.6 2L274 270.4v-5.4L34.8 2.4l-3.6 2z" />
              <path fill="#FFD900" d="M352.6 348.8l-78.6-78.4v-5.4l78.6-78.6 1.8 1L456 249.6c29.2 16.6 29.2 43.8 0 60.4l-101.6 57.6-1.8 1.2z" />
              <path fill="#FF3333" d="M354.4 347.6L274 267.2 31.2 509.6C40 518.8 53.4 519.4 68.4 511l286-163.4" />
              <path fill="#00EE76" d="M354.4 188.4L68.4 25C53.4 16.4 40 17.2 31.2 26.4L274 268.8l80.4-80.4z" />
            </svg>
            <div className="text-left">
              <div className="text-[11px] uppercase tracking-wider text-white/60 leading-tight">
                {t("appFlow.download.playLabel")}
              </div>
              <div className="text-base font-bold text-white leading-tight">
                {t("appFlow.download.playName")}
              </div>
            </div>
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 text-center text-sm text-white/70 mb-8">
          <UserIcon />
          {t("appFlow.download.loginHint")}
        </p>

        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-center">
            <div className="flex flex-col items-center md:items-start gap-2 md:pr-6 text-center md:text-left">
              <CalendarCheckIcon />
              <p className="text-white font-semibold text-sm">
                {t(`appFlow.download.status.${statusKey}`, { defaultValue: statusKey })}
              </p>
              {periodEnd && (
                <p className="text-sm text-white/60">
                  {t("appFlow.download.renewsOnLabel")}{" "}
                  <span className="text-bivo-green font-semibold">{periodEnd}</span>
                </p>
              )}
              {member?.isTrial && (
                <p className="text-xs text-bivo-green font-medium">
                  {t("appFlow.download.trialActive")}
                </p>
              )}
            </div>

            <div className="flex justify-center md:px-8 md:border-x md:border-white/10">
              <img
                src={APP_DOWNLOAD_QR}
                alt={t("footer.qrAlt")}
                className="h-36 w-36 rounded-lg bg-white p-2"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-2 md:pl-6 text-center md:text-left">
              <PhoneIcon />
              <p className="text-white font-semibold text-sm">
                {t("appFlow.download.desktopTitle")}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                {t("appFlow.download.desktopBodyBefore")}
                <span className="text-bivo-green font-semibold">
                  {t("appFlow.download.desktopBodyHighlight")}
                </span>
                {t("appFlow.download.desktopBodyAfter")}
              </p>
            </div>
          </div>
        </div>
      </FlowLayout>
    </FlowGuard>
  );
};

export default DownloadAppPage;
