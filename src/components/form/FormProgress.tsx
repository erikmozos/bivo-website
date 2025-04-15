
interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-bivo-green">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-bivo-green">
          {Math.round(progress)}%
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
