import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/storeLinks";

interface StoreChooserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const storeButtonClass =
  "group flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-bivo-green/60 hover:bg-bivo-green/[0.06] hover:shadow-[0_12px_40px_rgba(57,255,20,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bivo-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

const StoreChooserModal = ({ open, onOpenChange }: StoreChooserModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-0 text-white shadow-[0_0_80px_rgba(57,255,20,0.12)] sm:rounded-2xl [&>button.absolute]:hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(57,255,20,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-4 px-6 pt-6">
          <div className="flex-1" />
          <DialogClose
            aria-label={t("pricing.storeModal.close")}
            className="inline-flex items-center justify-center rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-bivo-green focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
            <span className="sr-only">{t("pricing.storeModal.close")}</span>
          </DialogClose>
        </div>

        <div className="relative px-6 pb-2 text-center">
          <span className="mb-4 inline-block rounded-full border border-bivo-green/30 bg-bivo-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-bivo-green">
            {t("pricing.storeModal.badge")}
          </span>
          <DialogTitle className="font-round text-xl font-bold text-white sm:text-2xl">
            {t("pricing.storeModal.title")}
          </DialogTitle>
          <DialogDescription className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
            {t("pricing.storeModal.description")}
          </DialogDescription>
        </div>

        <div className="relative flex flex-row gap-3 p-6 pt-5">
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
      </DialogContent>
    </Dialog>
  );
};

export default StoreChooserModal;
