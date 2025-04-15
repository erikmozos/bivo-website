
import { FormData } from "../RegistrationForm";

interface Step4ExperienceProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step4Experience: React.FC<Step4ExperienceProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  const niveles = [
    "Principiante",
    "Intermedio",
    "Avanzado",
    "Competitivo",
    "Profesional"
  ];
  
  const validateAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nivelExperiencia) {
      alert("Por favor, selecciona tu nivel de experiencia.");
      return;
    }
    
    nextStep();
  };
  
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Tu experiencia</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Cuál es tu nivel de experiencia en tu deporte principal? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {niveles.map((nivel) => (
              <div key={nivel} className="relative">
                <input
                  type="radio"
                  id={`nivel-${nivel}`}
                  name="nivelExperiencia"
                  value={nivel}
                  checked={formData.nivelExperiencia === nivel}
                  onChange={(e) => handleChange("nivelExperiencia", e.target.value)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={`nivel-${nivel}`}
                  className="flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50"
                >
                  {nivel}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="clubActual" className="block text-sm font-medium text-gray-700 mb-1">
            Si perteneces a un club, ¿cuál es?
          </label>
          <input
            type="text"
            id="clubActual"
            value={formData.clubActual}
            onChange={(e) => handleChange("clubActual", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
            placeholder="Nombre del club (opcional)"
          />
        </div>
        
        <div>
          <label htmlFor="comoNosConocio" className="block text-sm font-medium text-gray-700 mb-1">
            ¿Cómo conociste Bivo?
          </label>
          <select
            id="comoNosConocio"
            value={formData.comoNosConocio}
            onChange={(e) => handleChange("comoNosConocio", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
          >
            <option value="">Selecciona una opción</option>
            <option value="Redes sociales">Redes sociales</option>
            <option value="Amigos">Amigos</option>
            <option value="Club">Club</option>
            <option value="Evento">Evento</option>
            <option value="Internet">Internet</option>
            <option value="Otro">Otro</option>
          </select>
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

export default Step4Experience;
