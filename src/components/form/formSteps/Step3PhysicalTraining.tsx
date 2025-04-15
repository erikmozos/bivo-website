
import { FormData } from "../RegistrationForm";

interface Step3PhysicalTrainingProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3PhysicalTraining: React.FC<Step3PhysicalTrainingProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Preparación física</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            💪 ¿Te preparas físicamente?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Sí', 'No'].map((option) => (
              <div key={option}>
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-md border ${
                    formData.preparacionFisica === option
                      ? 'bg-bivo-green text-black border-bivo-green'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('preparacionFisica', option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {formData.preparacionFisica === 'Sí' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cómo?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['En casa', 'En gimnasio', 'En club', 'Con preparador físico'].map((option) => (
                <div key={option}>
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-md border ${
                      formData.tipoPrepFisica === option
                        ? 'bg-bivo-green text-black border-bivo-green'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleChange('tipoPrepFisica', option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🏠 ¿Tienes material de entrenamiento en casa?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Sí', 'No'].map((option) => (
              <div key={option}>
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-md border ${
                    formData.materialEnCasa === option
                      ? 'bg-bivo-green text-black border-bivo-green'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('materialEnCasa', option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-bivo-green text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step3PhysicalTraining;
