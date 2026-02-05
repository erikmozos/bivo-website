import { useState } from "react";
import { submitToGoogleSheets } from "../../services/formSubmission";

export interface FormData {
  // Deporte de raqueta (obligatorio, selección única)
  deporteRaqueta: string;
  
  // Información personal
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

const initialFormData: FormData = {
  deporteRaqueta: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
};

const deportesRaqueta = [
  "Pádel",
  "Tenis",
  "Pickleball",
  "Bádminton",
  "Squash",
  "Tenis Playa",
  "Ping Pong"
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (fieldName: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };
  
  const handleDeporteSelect = (deporte: string) => {
    handleChange("deporteRaqueta", deporte);
  };
  
  const validateForm = (): boolean => {
    if (!formData.deporteRaqueta || !formData.nombre || !formData.apellido || !formData.email) {
      alert("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, introduce un email válido.");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Google Sheets using Apps Script
      const success = await submitToGoogleSheets(formData);
      
      if (success) {
        console.log("Form submitted successfully:", formData);
        setSubmitSuccess(true);
        // Scroll to top of form section
        document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-round text-3xl font-bold mb-4">
              Únete a la comunidad <span className="text-bivo-green">Bivo</span>
            </h2>
            <p className="text-gray-600">
              Completa este formulario para ser de los primeros en probar Bivo.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Deporte de raqueta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Deporte de raqueta que practicas <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {deportesRaqueta.map((deporte) => (
                        <button
                          key={deporte}
                          type="button"
                          onClick={() => handleDeporteSelect(deporte)}
                          className={`px-4 py-2 rounded-full border-2 transition-all ${
                            formData.deporteRaqueta === deporte
                              ? "bg-bivo-green text-black border-bivo-green"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          {deporte}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Información personal */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
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
                  </div>
                  
                  {/* Botón de envío */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-bivo-green text-black px-8 py-3 rounded-md font-medium transition-all ${
                        isSubmitting 
                          ? "opacity-70 cursor-not-allowed" 
                          : "hover:bg-opacity-90"
                      }`}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg className="w-8 h-8 text-bivo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-round text-2xl font-bold mb-2">¡Muchas gracias por tu registro!</h3>
                <p className="text-gray-600 mb-6">
                  Cuando tengamos Bivo disponible para Iphone y Android, serás de los primeros en poderla usar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
