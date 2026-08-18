import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { getSectionId } from "@/lib/sectionIds";

const ContactSection = () => {
  const { t } = useTranslation();
  const { lang } = useLocale();
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
      const apiUrl =
        import.meta.env.VITE_CONTACT_API_URL?.trim() || "/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          mensaje: formData.mensaje.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || t("contact.form.error")
        );
      }

      setSubmitSuccess(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("contact.form.error"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
    setFormData({
      nombre: "",
      email: "",
      mensaje: ""
    });
  };

  return (
    <section id={getSectionId(lang, "contact")} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-round text-xl font-semibold mb-6">{t("contact.form.title")}</h3>
              
              {!submitSuccess ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.fields.name.label")} <span className="text-red-500">{t("contact.form.fields.name.required")}</span>
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
                        {t("contact.form.fields.email.label")} <span className="text-red-500">{t("contact.form.fields.email.required")}</span>
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
                        {t("contact.form.fields.message.label")} <span className="text-red-500">{t("contact.form.fields.message.required")}</span>
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
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
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
                        {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
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
                  <h3 className="font-round text-xl font-semibold mb-2">{t("contact.form.success.title")}</h3>
                  <p className="text-gray-600 mb-4">
                    {t("contact.form.success.description")}
                  </p>
                  <button
                    onClick={handleNewMessage}
                    className="bg-bivo-green text-black py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                  >
                    {t("contact.form.success.newMessage")}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-round text-xl font-semibold mb-6">{t("contact.info.title")}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bivo-green rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.email")}</p>
                    <a 
                      href="mailto:hello@bivotraining.com" 
                      className="text-bivo-green hover:underline"
                    >
                      hello@bivotraining.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bivo-green rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t("contact.info.location")}</p>
                    <p className="text-gray-600">{t("contact.info.address")}</p>
                  </div>
                </div>
              </div>

              <h4 className="font-round text-lg font-semibold mb-4">{t("contact.social.title")}</h4>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.instagram.com/bivotraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
                  {t("contact.social.instagram")}
                </a>
                <a href="https://www.youtube.com/@BivoTraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="7" ry="7"/></svg>
                  {t("contact.social.youtube")}
                </a>
                <a href="https://www.linkedin.com/company/bivotraining" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-bivo-green transition-colors">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="16" y2="8"/></svg>
                  {t("contact.social.linkedin")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
