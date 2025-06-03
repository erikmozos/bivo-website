import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
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
    setSubmitError(false);
    setErrorMessage("");
    
    try {
      // EmailJS configuration
      const serviceId = "YOUR_EMAILJS_SERVICE_ID"; // Replace with your actual service ID
      const templateId = "YOUR_EMAILJS_TEMPLATE_ID"; // Replace with your actual template ID
      const publicKey = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your actual public key
      
      // Prepare template parameters from form data
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        message: formData.mensaje
      };
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      if (response.status === 200) {
        console.log("Contact form submitted:", formData);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          nombre: "",
          email: "",
          mensaje: ""
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
      setErrorMessage("No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.");
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
                    
                    {submitError && (
                      <div className="text-red-500 text-sm py-2">
                        {errorMessage}
                      </div>
                    )}
                    
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
              <h3 className="font-round text-xl font-semibold mb-6">Síguenos en redes sociales</h3>
              <div className="mt-8">
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/bivotraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
                    Instagram
                  </a>
                  <a href="https://www.youtube.com/@BivoTraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="7" ry="7"/></svg>
                    Youtube
                  </a>
                  <a href="https://www.linkedin.com/company/bivotraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="16" y2="8"/></svg>
                    Linkedin
                  </a>
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
