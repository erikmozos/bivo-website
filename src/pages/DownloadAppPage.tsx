import { useTranslation } from "react-i18next";
import FlowGuard from "@/components/app/FlowGuard";
import FlowLayout from "@/components/app/FlowLayout";
import { useAppFlow } from "@/hooks/useAppFlow";
import { APP_STORE_URL, GOOGLE_PLAY_URL, APP_DOWNLOAD_QR } from "@/lib/storeLinks";

const storeButtonClass =
  "group flex flex-1 items-center justify-center gap-4 rounded-xl border-2 border-bivo-green bg-black px-7 py-5 min-h-[92px] sm:min-h-[104px] transition-colors duration-200 hover:bg-bivo-green/[0.07]";

function formatPeriodEnd(value: unknown, locale: string): string | null {
  if (!value) return null;
  let date: Date | null = null;
  if (typeof value === "string") {
    const d = new Date(value);
    date = Number.isNaN(d.getTime()) ? null : d;
  } else if (typeof value === "object" && value !== null && "seconds" in value) {
    date = new Date((value as { seconds: number }).seconds * 1000);
  } else if (value instanceof Date) {
    date = value;
  }
  if (!date) return null;
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const CalendarCheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4M16 3v4" />
    <path d="M9 15.5l2 2 4-4" />
  </svg>
);

const CalendarPlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4M16 3v4" />
    <path d="M12 14v5M9.5 16.5h5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-bivo-green" aria-hidden>
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
  const { t, i18n } = useTranslation();
  const { member } = useAppFlow();

  const periodEnd = formatPeriodEnd(member?.currentPeriodEndsAt, i18n.language);
  const statusKey = member?.subscriptionStatus ?? "none";
  const isActiveStatus = statusKey === "active" || statusKey === "trialing";
  const showRenewal = Boolean(periodEnd) && statusKey !== "none" && statusKey !== "expired";

  return (
    <FlowGuard require="download">
      <FlowLayout variant="finale">
        <header className="text-center mb-10 lg:mb-12">
          <p className="font-round text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-1.5">
            {t("appFlow.download.readyTitle")}
          </p>
          <h1
            className="font-round text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bivo-green leading-[1.05] tracking-tight mb-5"
            style={{ textShadow: "0 0 42px rgba(57,255,20,0.38)" }}
          >
            {t("appFlow.download.title")}
          </h1>
          <p className="text-white text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t("appFlow.download.subtitleBefore")}
            <span className="text-bivo-green font-semibold">
              {t("appFlow.download.subtitleHighlight")}
            </span>
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={storeButtonClass}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs sm:text-sm text-white/70 leading-tight">
                {t("appFlow.download.appStoreLabel")}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white leading-tight">
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
            <svg width="38" height="38" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
              <path fill="#00C1FF" d="M31.2 4.4C19.6 11 12 23.4 12 37.6v436.8c0 14.2 7.6 26.6 19.2 33.2l3.6 2L274 270.4v-5.4L34.8 2.4l-3.6 2z" />
              <path fill="#FFD900" d="M352.6 348.8l-78.6-78.4v-5.4l78.6-78.6 1.8 1L456 249.6c29.2 16.6 29.2 43.8 0 60.4l-101.6 57.6-1.8 1.2z" />
              <path fill="#FF3333" d="M354.4 347.6L274 267.2 31.2 509.6C40 518.8 53.4 519.4 68.4 511l286-163.4" />
              <path fill="#00EE76" d="M354.4 188.4L68.4 25C53.4 16.4 40 17.2 31.2 26.4L274 268.8l80.4-80.4z" />
            </svg>
            <div className="text-left">
              <div className="text-xs sm:text-sm uppercase tracking-wider text-white/70 leading-tight">
                {t("appFlow.download.playLabel")}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {t("appFlow.download.playName")}
              </div>
            </div>
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 text-center text-sm text-white mb-12 lg:mb-14">
          <UserIcon />
          {t("appFlow.download.loginHint")}
        </p>

        <div className="border-t border-white/20 pt-10 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center">
            <div className="flex flex-col items-center md:items-end gap-2.5 md:pr-10 text-center md:text-right">
              {isActiveStatus ? <CalendarPlusIcon /> : <CalendarCheckIcon />}
              <p className="text-white font-semibold text-[15px]">
                {t(`appFlow.download.status.${statusKey}`, { defaultValue: statusKey })}
              </p>
              {showRenewal && (
                <p className="text-[15px] text-white">
                  {t("appFlow.download.renewsOnLabel")}{" "}
                  <span className="text-bivo-green font-semibold">{periodEnd}</span>
                </p>
              )}
            </div>

            <div className="flex justify-center md:px-10 md:border-x md:border-white/20">
              <img
                src={APP_DOWNLOAD_QR}
                alt={t("footer.qrAlt")}
                className="h-44 w-44 sm:h-52 sm:w-52 rounded-md bg-white p-2.5"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-2.5 md:pl-10 text-center md:text-left">
              <PhoneIcon />
              <p className="text-white font-semibold text-[15px]">
                {t("appFlow.download.desktopTitle")}
              </p>
              <p className="text-[15px] text-white leading-relaxed max-w-[240px]">
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
