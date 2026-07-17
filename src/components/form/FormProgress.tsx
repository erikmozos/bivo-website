import { useTranslation } from "react-i18next";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const { t } = useTranslation();
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-bivo-green">
          {t("form.progress.step", { current: currentStep, total: totalSteps })}
        </span>
        <span className="text-sm font-medium text-bivo-green">
          {t("form.progress.percent", { percent: Math.round(progress) })}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-bivo-green h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
