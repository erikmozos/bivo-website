
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with your backend API
      // For this demo, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Contact form submitted:", formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        nombre: "",
        email: "",
        mensaje: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            Contacta con <span className="text-bivo-green">nosotros</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta o comentario? No dudes en contactarnos, estaremos encantados de ayudarte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-round text-xl font-semibold mb-6">Envíanos un mensaje</h3>
              
              {!submitSuccess ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className={`w-full bg-bivo-green text-black py-2 px-4 rounded-md font-medium transition-all ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-opacity-90"
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <svg className="w-8 h-8 text-bivo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="font-round text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Te responderemos lo antes posible.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-round text-xl font-semibold mb-6">Información de contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-bivo-green" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold">Dirección</h4>
                    <p className="text-gray-600">
                      Calle Innovación 42<br />
                      07001 Palma de Mallorca<br />
                      Islas Baleares, España
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="w-6 h-6 text-bivo-green" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@bivo.app" className="hover:text-bivo-green">
                        info@bivo.app
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="w-6 h-6 text-bivo-green" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold">Teléfono</h4>
                    <p className="text-gray-600">
                      <a href="tel:+34971123456" className="hover:text-bivo-green">
                        +34 971 123 456
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-base font-semibold mb-4">Horario de atención</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
