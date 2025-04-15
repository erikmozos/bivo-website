
import { FormData } from "../RegistrationForm";

interface Step1PersonalProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  nextStep: () => void;
}

const Step1Personal: React.FC<Step1PersonalProps> = ({ formData, handleChange, nextStep }) => {
  const validateAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nombre || !formData.apellido || !formData.email) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, introduce un email válido.");
      return;
    }
    
    nextStep();
  };
  
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Información personal</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
              required
            />
          </div>
          
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="apellido"
              value={formData.apellido}
              onChange={(e) => handleChange("apellido", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
            required
          />
        </div>
        
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
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

export default Step1Personal;
