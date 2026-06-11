import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { submitToGoogleSheets } from "../../services/formSubmission";
import LegalDialog from "@/components/legal/LegalDialog";

export interface FormData {
  deporteRaqueta: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
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

const RegistrationForm = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const deportesRaqueta = t("form.registration.sports", { returnObjects: true }) as string[];

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
      alert(t("form.registration.validation.requiredFields"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert(t("form.registration.validation.invalidEmail"));
      return false;
    }

    if (!formData.aceptaPoliticas) {
      alert(t("form.registration.validation.acceptPolicies"));
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
      alert(t("form.registration.validation.submitError"));
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
              {t("form.registration.heading")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("form.registration.description")}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t("form.registration.sportLabel")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {deportesRaqueta.map((deporte: string) => (
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

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-round text-xl font-semibold mb-6">
                      {t("form.registration.personalInfo")}
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {t("form.registration.fields.name.label")} <span className="text-red-500">*</span>
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
                            {t("form.registration.fields.lastname.label")} <span className="text-red-500">*</span>
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
                          {t("form.registration.fields.email.label")} <span className="text-red-500">*</span>
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
                          {t("form.registration.fields.phone.label")}
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
                      <Trans
                        i18nKey="form.registration.legal.checkbox"
                        components={{
                          privacy: <LegalDialog type="privacy"><button type="button" className="text-bivo-green font-semibold underline-offset-2 hover:underline focus:outline-none focus:underline" /></LegalDialog>,
                          terms: <LegalDialog type="terms"><button type="button" className="text-bivo-green font-semibold underline-offset-2 hover:underline focus:outline-none focus:underline" /></LegalDialog>,
                        }}
                      />
                      <span className="text-red-500"> *</span>
                    </label>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center bg-bivo-green text-black px-8 py-3 rounded-lg font-extrabold text-base sm:text-lg uppercase tracking-wide transition-all transform shadow-md ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-opacity-90 hover:scale-105"
                      }`}
                    >
                      {isSubmitting
                        ? t("form.registration.submitting")
                        : t("form.registration.submit")}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 px-2 sm:px-6">
                <div className="flex justify-center mb-8">
                  <img
                    src="/brand/logo-bivo-verde.png"
                    alt={t("nav.logoAlt")}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="font-round text-2xl sm:text-3xl font-extrabold mb-6 leading-tight">
                  {t("form.registration.success.title")}
                </h3>
                <p className="text-gray-700 mb-4 max-w-xl mx-auto leading-relaxed">
                  {t("form.registration.success.message", { freeMonths: 1 })}
                </p>
                <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                  {t("form.registration.success.earlyAccess")}
                </p>
                <button
                  type="button"
                  onClick={handlePerfecto}
                  className="inline-flex items-center justify-center bg-bivo-green text-black px-10 py-3 rounded-lg font-extrabold text-base sm:text-lg uppercase tracking-wide shadow-md transition-all transform hover:bg-opacity-90 hover:scale-105"
                >
                  {t("form.registration.success.button")}
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
