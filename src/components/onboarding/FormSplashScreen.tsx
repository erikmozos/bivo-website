import { useTranslation } from "react-i18next";

interface FormSplashScreenProps {
  onStart: () => void;
}

const FormSplashScreen = ({ onStart }: FormSplashScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[70vh] justify-between">
      <div className="text-center pt-4">
        <h1 className="font-round text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
          {t("appFlow.onboarding.splash.titleLine1")}
          <br />
          <span className="text-bivo-green">{t("appFlow.onboarding.splash.titleLine2")}</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          {t("appFlow.onboarding.splash.subtitle")}
        </p>
      </div>

      <div
        className="my-8 mx-auto w-full max-w-sm aspect-[4/3] rounded-2xl border border-white/10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(57,255,20,0.12) 0%, rgba(0,0,0,0.4) 100%), url('/assets2/app-screens/onboarding-objetivo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      <div>
        <button
          type="button"
          onClick={onStart}
          className="w-full py-3.5 rounded-xl bg-bivo-green text-black font-bold uppercase tracking-wider text-sm hover:bg-opacity-90 transition"
        >
          {t("appFlow.onboarding.splash.cta")}
        </button>
        <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
          {t("appFlow.onboarding.splash.footer")}
        </p>
      </div>
    </div>
  );
};

export default FormSplashScreen;
