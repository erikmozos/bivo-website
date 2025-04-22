
import { FormData } from "../RegistrationForm";

interface Step2SportsProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2Sports: React.FC<Step2SportsProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  const deportes = ["Pádel", "Tenis", "Pickleball", "Squash", "Bádminton","Tenis playa"];
  const frecuencias = ["Diariamente", "2-3 veces por semana", "1 vez por semana", "Ocasionalmente"];
  
  const handleOtrosDeportes = (deporte: string) => {
    if (formData.otrosDeportes.includes(deporte)) {
      handleChange(
        "otrosDeportes",
        formData.otrosDeportes.filter((d) => d !== deporte)
      );
    } else {
      handleChange("otrosDeportes", [...formData.otrosDeportes, deporte]);
    }
  };
  
  const validateAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.deportePrincipal) {
      alert("Por favor, selecciona tu deporte principal.");
      return;
    }
    
    if (!formData.frecuencia) {
      alert("Por favor, indica la frecuencia de práctica.");
      return;
    }
    
    nextStep();
  };
  
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Preferencias deportivas</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Cuál es tu deporte principal? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {deportes.map((deporte) => (
              <div key={deporte} className="relative">
                <input
                  type="radio"
                  id={`deporte-${deporte}`}
                  name="deportePrincipal"
                  value={deporte}
                  checked={formData.deportePrincipal === deporte}
                  onChange={(e) => handleChange("deportePrincipal", e.target.value)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={`deporte-${deporte}`}
                  className="flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50"
                >
                  {deporte}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Practicas otros deportes de raqueta?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {deportes.map((deporte) => (
              <div key={`otro-${deporte}`} className="relative">
                <input
                  type="checkbox"
                  id={`otro-${deporte}`}
                  checked={formData.otrosDeportes.includes(deporte)}
                  onChange={() => handleOtrosDeportes(deporte)}
                  className="sr-only peer"
                  disabled={formData.deportePrincipal === deporte}
                />
                <label
                  htmlFor={`otro-${deporte}`}
                  className={`flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50 ${
                    formData.deportePrincipal === deporte ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {deporte}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Con qué frecuencia practicas tu deporte principal? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {frecuencias.map((frecuencia) => (
              <div key={frecuencia} className="relative">
                <input
                  type="radio"
                  id={`frecuencia-${frecuencia}`}
                  name="frecuencia"
                  value={frecuencia}
                  checked={formData.frecuencia === frecuencia}
                  onChange={(e) => handleChange("frecuencia", e.target.value)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={`frecuencia-${frecuencia}`}
                  className="flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all peer-checked:border-bivo-green peer-checked:bg-green-50 hover:bg-gray-50"
                >
                  {frecuencia}
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

export default Step2Sports;
