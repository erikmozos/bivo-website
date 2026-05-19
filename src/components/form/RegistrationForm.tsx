import { useState } from "react";
import { submitToGoogleSheets } from "../../services/formSubmission";
import LegalDialog from "@/components/legal/LegalDialog";

export interface FormData {
  // Deporte de raqueta (obligatorio, selección única)
  deporteRaqueta: string;

  // Información personal
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;

  // Aceptación de políticas legales (obligatorio)
  aceptaPoliticas: boolean;
}

const initialFormData: FormData = {
  deporteRaqueta: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  aceptaPoliticas: false,
};

const deportesRaqueta = [
  "Pádel",
  "Tenis",
  "Pickleball",
  "Bádminton",
  "Squash",
  "Tenis Playa",
  "Ping Pong",
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePerfecto = () => {
    setSubmitSuccess(false);
    setFormData(initialFormData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (
    fieldName: keyof FormData,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleDeporteSelect = (deporte: string) => {
    handleChange("deporteRaqueta", deporte);
  };

  const validateForm = (): boolean => {
    if (
      !formData.deporteRaqueta ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.email
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, introduce un email válido.");
      return false;
    }

    if (!formData.aceptaPoliticas) {
      alert(
        "Debes aceptar la política de privacidad y los términos y condiciones para continuar."
      );
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
      const success = await submitToGoogleSheets(formData);

      if (success) {
        console.log("Form submitted successfully:", formData);
        setSubmitSuccess(true);
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
            <h2 className="font-round text-3xl md:text-4xl font-bold mb-4">
              ¡Sé de los Primeros en Probar la App{" "}
              <span className="text-bivo-green">Bivo</span> y Obtén 1 Mes GRATIS!
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Regístrate ahora para acceder antes que nadie a tu preparación
              física específica y personalizada para tu deporte de raqueta.
              ¡Empieza a entrenar como un pro!
            </p>
          </div>

          <div
            className={`bg-white rounded-lg shadow-lg p-6 md:p-8 ${
              submitSuccess ? "border-[3px] border-indigo-200" : ""
            }`}
          >
            {!submitSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Deporte de raqueta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tu Deporte de Raqueta para Entrenar{" "}
                      <span className="text-red-500">*</span>
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
                    <h3 className="font-round text-xl font-semibold mb-6">
                      Información personal
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nombre <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) =>
                              handleChange("nombre", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="apellido"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Apellido <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="apellido"
                            value={formData.apellido}
                            onChange={(e) =>
                              handleChange("apellido", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="telefono"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) =>
                            handleChange("telefono", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bivo-green focus:border-bivo-green"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Aceptación legal */}
                  <div className="flex items-start gap-3">
                    <input
                      id="aceptaPoliticas"
                      type="checkbox"
                      checked={formData.aceptaPoliticas}
                      onChange={(e) =>
                        handleChange("aceptaPoliticas", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-bivo-green focus:ring-bivo-green accent-bivo-green cursor-pointer"
                      required
                    />
                    <label
                      htmlFor="aceptaPoliticas"
                      className="text-sm text-gray-700 leading-relaxed cursor-pointer select-none"
                    >
                      Acepto la{" "}
                      <LegalDialog type="privacy">
                        <button
                          type="button"
                          className="text-bivo-green font-semibold underline-offset-2 hover:underline focus:outline-none focus:underline"
                        >
                          política de privacidad
                        </button>
                      </LegalDialog>
                      ,{" "}
                      <LegalDialog type="terms">
                        <button
                          type="button"
                          className="text-bivo-green font-semibold underline-offset-2 hover:underline focus:outline-none focus:underline"
                        >
                          términos y condiciones
                        </button>
                      </LegalDialog>{" "}
                      y recibir noticias de Bivo{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Botón de acceso */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center bg-bivo-green text-black px-8 py-3 rounded-lg font-semibold text-base sm:text-lg uppercase tracking-wide transition-all transform shadow-md ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-opacity-90 hover:scale-105"
                      }`}
                    >
                      {isSubmitting
                        ? "Enviando..."
                        : "¡Obtener mi acceso anticipado y mes gratis!"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 px-2 sm:px-6">
                <div className="flex justify-center mb-8">
                  <img
                    src="/brand/logo-bivo-verde.png"
                    alt="Bivo Training Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="font-round text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                  <span className="mr-2" role="img" aria-label="pelota de tenis">
                    🎾
                  </span>
                  ¡Ya casi formas parte de{" "}
                  <span className="text-bivo-green">Bivo</span>!
                </h3>
                <p className="text-gray-700 mb-4 max-w-xl mx-auto leading-relaxed">
                  Te avisaremos en cuanto lancemos la app para que puedas
                  disfrutar de tu{" "}
                  <span className="text-bivo-green font-semibold">
                    1 mes gratis
                  </span>{" "}
                  de preparación física específica de raqueta.{" "}
                  <span role="img" aria-label="brazo flexionando">
                    💪
                  </span>
                </p>
                <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                  Muy pronto recibirás tu{" "}
                  <strong className="font-semibold">acceso anticipado</strong>.
                </p>
                <button
                  type="button"
                  onClick={handlePerfecto}
                  className="inline-flex items-center justify-center bg-bivo-green text-black px-10 py-3 rounded-lg font-semibold text-base sm:text-lg uppercase tracking-wide shadow-md transition-all transform hover:bg-opacity-90 hover:scale-105"
                >
                  Perfecto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
