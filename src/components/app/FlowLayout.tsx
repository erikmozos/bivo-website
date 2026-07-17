import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FlowUserBar from "@/components/app/FlowUserBar";

interface FlowLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
}

const FlowLayout = ({ children, title, subtitle, badge }: FlowLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(57,255,20,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex justify-center mb-4">
          <img
            src="/brand/logo-bivo-verde.png"
            alt={t("nav.logoAlt")}
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        <FlowUserBar />

        {(badge || title || subtitle) && (
          <header className="text-center mb-8">
            {badge && (
              <span className="mb-4 inline-block rounded-full border border-bivo-green/30 bg-bivo-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-bivo-green">
                {badge}
              </span>
            )}
            {title && (
              <h1 className="font-round text-2xl sm:text-3xl font-bold text-white mb-3">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
    </div>
  );
};

export default FlowLayout;
