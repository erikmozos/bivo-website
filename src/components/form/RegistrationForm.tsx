
import { useState } from "react";
import Step1Personal from "./formSteps/Step1Personal";
import Step2Sports from "./formSteps/Step2Sports";
import Step3Training from "./formSteps/Step3Training";
import Step4Experience from "./formSteps/Step4Experience";
import Step5Final from "./formSteps/Step5Final";
import FormProgress from "./FormProgress";

export interface FormData {
  // Personal info
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  
  // Sports preferences
  deportePrincipal: string;
  otrosDeportes: string[];
  frecuencia: string;
  
  // Training preferences
  tipoEntrenamiento: string[];
  horarioPreferido: string;
  
  // Experience
  nivelExperiencia: string;
  clubActual: string;
  
  // Marketing
  comoNosConocio: string;
  aceptaMarketing: boolean;
  
  // Terms
  aceptaTerminos: boolean;
}

const initialFormData: FormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  
  deportePrincipal: "",
  otrosDeportes: [],
  frecuencia: "",
  
  tipoEntrenamiento: [],
  horarioPreferido: "",
  
  nivelExperiencia: "",
  clubActual: "",
  
  comoNosConocio: "",
  aceptaMarketing: false,
  
  aceptaTerminos: false
};

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const totalSteps = 5;
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll to form section again
      document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to form section again
      document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleChange = (fieldName: keyof FormData, value: string | string[] | boolean) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with Google Sheets or any backend API
      // For this demo, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted successfully:", formData);
      setSubmitSuccess(true);
      
      // Reset form after submission
      // setFormData(initialFormData);
      // setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
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
          
          <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <Step1Personal 
                    formData={formData} 
                    handleChange={handleChange} 
                    nextStep={nextStep} 
                  />
                )}
                
                {currentStep === 2 && (
                  <Step2Sports
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                
                {currentStep === 3 && (
                  <Step3Training
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                
                {currentStep === 4 && (
                  <Step4Experience
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                
                {currentStep === 5 && (
                  <Step5Final
                    formData={formData}
                    handleChange={handleChange}
                    prevStep={prevStep}
                    isSubmitting={isSubmitting}
                  />
                )}
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg className="w-8 h-8 text-bivo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-round text-2xl font-bold mb-2">¡Registro completado!</h3>
                <p className="text-gray-600 mb-6">
                  Gracias por registrarte. Te contactaremos pronto con más información.
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
