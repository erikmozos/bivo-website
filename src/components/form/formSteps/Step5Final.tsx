
import { FormData } from "../RegistrationForm";

interface Step5FinalProps {
  formData: FormData;
  handleChange: (fieldName: keyof FormData, value: string | string[] | boolean) => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

const Step5Final: React.FC<Step5FinalProps> = ({ formData, handleChange, prevStep, isSubmitting }) => {
  return (
    <div>
      <h3 className="font-round text-xl font-semibold mb-6">Confirmación</h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Resumen de tu información:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
            <div>
              <span className="font-semibold">Sexo:</span> {formData.sexo || "No especificado"}
            </div>
            <div>
              <span className="font-semibold">Edad:</span> {formData.edad || "No especificado"}
            </div>
            <div>
              <span className="font-semibold">Nombre:</span> {formData.nombre} {formData.apellido}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {formData.email}
            </div>
            <div>
              <span className="font-semibold">Teléfono:</span> {formData.telefono || "No especificado"}
            </div>
            <div>
              <span className="font-semibold">Deporte principal:</span> {formData.deportePrincipal}
            </div>
            <div>
              <span className="font-semibold">Otros deportes:</span>{" "}
              {formData.otrosDeportes.length > 0 ? formData.otrosDeportes.join(", ") : "Ninguno"}
            </div>
            <div>
              <span className="font-semibold">Frecuencia:</span> {formData.frecuencia}
            </div>
            <div>
              <span className="font-semibold">Preparación física:</span> {formData.preparacionFisica || "No especificado"}
            </div>
            {formData.preparacionFisica === 'Sí' && (
              <div>
                <span className="font-semibold">Tipo de preparación:</span> {formData.tipoPrepFisica || "No especificado"}
              </div>
            )}
            <div>
              <span className="font-semibold">Material en casa:</span> {formData.materialEnCasa || "No especificado"}
            </div>
            <div>
              <span className="font-semibold">Tipos de entrenamiento:</span> {formData.tipoEntrenamiento.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Horario preferido:</span> {formData.horarioPreferido}
            </div>
            <div>
              <span className="font-semibold">Nivel de experiencia:</span> {formData.nivelExperiencia}
            </div>
            <div>
              <span className="font-semibold">Club actual:</span> {formData.clubActual || "No especificado"}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="aceptaMarketing"
                type="checkbox"
                checked={formData.aceptaMarketing}
                onChange={(e) => handleChange("aceptaMarketing", e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded accent-bivo-green"
              />
            </div>
            <label htmlFor="aceptaMarketing" className="ml-3 text-sm text-gray-600">
              Me gustaría recibir noticias, actualizaciones y ofertas especiales de Bivo.
            </label>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="aceptaTerminos"
                type="checkbox"
                checked={formData.aceptaTerminos}
                onChange={(e) => handleChange("aceptaTerminos", e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded accent-bivo-green"
                required
              />
            </div>
            <label htmlFor="aceptaTerminos" className="ml-3 text-sm text-gray-600">
              He leído y acepto la{" "}
              <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-bivo-green hover:underline">
                Política de Privacidad
              </a>
              , la{" "}
              <a href="/cookies" target="_blank" rel="noopener noreferrer" className="text-bivo-green hover:underline">
                Política de Cookies
              </a>
              {" y los "}
              <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-bivo-green hover:underline">
                Términos y Condiciones
              </a>{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          disabled={isSubmitting}
        >
          Atrás
        </button>
        <button
          type="submit"
          className={`bg-bivo-green text-black px-6 py-2 rounded-md font-medium transition-all ${
            !formData.aceptaTerminos || isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
          disabled={!formData.aceptaTerminos || isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Completar registro"}
        </button>
      </div>
    </div>
  );
};

export default Step5Final;
