import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { coachLandingUrl } from "@/lib/coachLinks";

/** Enlace "BIVO Coach" del menú: abre un bocadillo que explica para quién es y lleva a la landing B2B. */
const CoachPopover = ({ triggerClassName }: { triggerClassName?: string }) => {
  const { t } = useTranslation();
  const { lang } = useLocale();

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        className={cn(
          "text-bivo-green hover:text-white data-[state=open]:text-white transition-colors font-semibold text-left",
          triggerClassName,
        )}
      >
        {t("nav.coach")}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="center"
          sideOffset={14}
          collisionPadding={16}
          className="z-[60] w-[min(21rem,calc(100vw-32px))] rounded-2xl bg-bivo-green p-5 text-black shadow-[0_20px_50px_-15px_rgba(57,255,20,0.45)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/60 mb-2">
            {t("nav.coachPopover.eyebrow")}
          </p>
          <p className="text-lg font-bold leading-snug mb-2">{t("nav.coachPopover.title")}</p>
          <p className="text-sm leading-relaxed text-black/80 mb-3">{t("nav.coachPopover.text")}</p>
          <p className="text-sm font-bold leading-snug mb-4">{t("nav.coachPopover.highlight")}</p>
          <a
            href={coachLandingUrl(lang)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {t("nav.coachPopover.cta")}
            <ArrowRight size={16} aria-hidden />
          </a>
          <PopoverPrimitive.Arrow width={22} height={11} className="fill-bivo-green" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default CoachPopover;
