
import { FormData } from "../RegistrationForm";

interface Step3TrainingProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3Training: React.FC<Step3TrainingProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  const tiposEntrenamiento = [
    "Técnica",
    "Táctica",
    "Físico",
    "Mental",
    "Competición",
    "Análisis de vídeo"
  ];
  
  const horarios = [
    "Mañanas",
    "Mediodía",
    "Tardes",
    "Noches",
    "Fines de semana"
  ];
  
  const handleTipoEntrenamiento = (tipo: string) => {
    if (formData.tipoEntrenamiento.includes(tipo)) {
      handleChange(
        "tipoEntrenamiento",
        formData.tipoEntrenamiento.filter((t) => t !== tipo)
      );
    } else {
      handleChange("tipoEntrenamiento", [...formData.tipoEntrenamiento, tipo]);
    }
  };
  
  const validateAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.tipoEntrenamiento.length === 0) {
      alert("Por favor, selecciona al menos un tipo de entrenamiento.");
      return;
    }
    
    if (!formData.horarioPreferido) {
      alert("Por favor, selecciona tu horario preferido.");
      return;
    }
    
    nextStep();
  };
  
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Preferencias de entrenamiento</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Qué tipo de entrenamiento te interesa? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tiposEntrenamiento.map((tipo) => (
              <div key={tipo} className="relative">
                <input
                  type="checkbox"
                  id={`tipo-${tipo}`}
                  checked={formData.tipoEntrenamiento.includes(tipo)}
                  onChange={() => handleTipoEntrenamiento(tipo)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={`tipo-${tipo}`}
                  className="flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50"
                >
                  {tipo}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Cuál es tu horario preferido para entrenar? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {horarios.map((horario) => (
              <div key={horario} className="relative">
                <input
                  type="radio"
                  id={`horario-${horario}`}
                  name="horarioPreferido"
                  value={horario}
                  checked={formData.horarioPreferido === horario}
                  onChange={(e) => handleChange("horarioPreferido", e.target.value)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={`horario-${horario}`}
                  className="flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50"
                >
                  {horario}
                </label>
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
          onClick={validateAndContinue}
          className="bg-bivo-green text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Step3Training;
