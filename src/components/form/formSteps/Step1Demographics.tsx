
import { FormData } from "../RegistrationForm";

interface Step1DemographicsProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
}

const Step1Demographics: React.FC<Step1DemographicsProps> = ({ formData, handleChange, nextStep }) => {
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Información básica</h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
            Sexo
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Hombre', 'Mujer', 'Prefiero no decirlo'].map((option) => (
              <div key={option}>
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-md border ${
                    formData.sexo === option
                      ? 'bg-bivo-green text-black border-bivo-green'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('sexo', option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-1">
            ¿Cuál es tu edad?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Menos de 18',
              '18-24',
              '25-34',
              '35-44',
              '45-54',
              '55+'
            ].map((option) => (
              <div key={option}>
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-md border ${
                    formData.edad === option
                      ? 'bg-bivo-green text-black border-bivo-green'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('edad', option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
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

export default Step1Demographics;
