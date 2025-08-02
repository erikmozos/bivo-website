import React from "react";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => (
  <Layout>
    <div className="min-h-screen bg-white text-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <h1 className="text-3xl font-bold mb-6">Aviso Legal y Política de Privacidad</h1>
        
        {/* Legal Notice and Privacy Policy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Aviso Legal y Política de Privacidad</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Información del titular</h3>
          <p className="mb-4">
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que esta página web es gestionada por Bivo Training S.L., con CIF B-22728117, y domicilio social en Av. des Camp Verd, 4, Parc Bit Menorca (Alaior), Islas Baleares.
          </p>
          <p className="mb-4">
            <strong>Correo electrónico de contacto:</strong> hello@bivotraining.com
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Propiedad intelectual e industrial</h3>
          <p className="mb-4">
            Todos los contenidos de este sitio web (textos, imágenes, logotipos, vídeos, diseño, estructura…) están protegidos por derechos de propiedad intelectual o industrial, titularidad de Bivo o de terceros autorizados. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización previa y por escrito.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Responsabilidad</h3>
          <p className="mb-2">Bivo no se hace responsable de:</p>
          <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
            <li>El uso indebido de los contenidos de esta web.</li>
            <li>Los daños derivados del acceso o mal uso del sitio.</li>
            <li>La veracidad o actualidad de los contenidos enlazados a sitios externos.</li>
          </ul>
          <p className="mb-4">
            Nos reservamos el derecho de modificar o eliminar cualquier contenido sin previo aviso.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Protección de datos personales</h3>
          <p className="mb-4">
            Bivo garantiza el cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales (LOPDGDD).
          </p>
          
          <div className="mb-4">
            <p className="mb-2"><strong>Responsable del tratamiento:</strong> Bivo</p>
            <p className="mb-4"><strong>Email de contacto:</strong> hello@bivotraining.com</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Finalidad del tratamiento:</h4>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Atender solicitudes recibidas a través de formularios.</li>
              <li>Gestionar el acceso a nuestra app de entrenamiento físico.</li>
              <li>Enviar comunicaciones comerciales (en caso de consentimiento previo).</li>
              <li>Mejorar la experiencia de navegación.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Base jurídica:</h4>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Consentimiento expreso del usuario.</li>
              <li>Ejecución de medidas precontractuales o contrato (en caso de registro en la app).</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Conservación de datos:</h4>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Mientras dure la relación o hasta que el usuario solicite su supresión.</li>
              <li>Los datos de la app se conservarán mientras el usuario mantenga su cuenta activa o según plazos legales.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Destinatarios:</h4>
            <p className="ml-4 mb-4 text-gray-700">
              No se cederán datos salvo obligación legal o prestación técnica necesaria.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Derechos del usuario:</h4>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Acceder, rectificar, suprimir, oponerse, limitar y solicitar portabilidad.</li>
              <li>Puedes ejercerlos escribiendo a hello@bivotraining.com.</li>
              <li>En caso de disconformidad, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</li>
            </ul>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Política de Cookies</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">¿Qué son las cookies?</h3>
          <p className="mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia y a entender cómo interactúas con nuestro contenido.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Tipos de cookies que utilizamos</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Cookies esenciales</h4>
            <p className="mb-2">
              Son necesarias para el funcionamiento básico del sitio web. Incluyen:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Cookies de sesión para mantener tu navegación</li>
              <li>Cookies de preferencias de idioma</li>
              <li>Cookies de consentimiento de cookies</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Cookies de análisis</h4>
            <p className="mb-2">
              Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
              <li>Google Analytics para estadísticas de uso</li>
              <li>Métricas de rendimiento del sitio</li>
              <li>Análisis de comportamiento de usuarios (de forma anónima)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Gestión de cookies</h3>
          <p className="mb-4">
            Puedes gestionar tus preferencias de cookies a través del banner que aparece en tu primera visita al sitio. También puedes:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
            <li>Configurar tu navegador para rechazar todas las cookies</li>
            <li>Eliminar las cookies existentes desde la configuración de tu navegador</li>
            <li>Cambiar tus preferencias en cualquier momento</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies de terceros</h3>
          <p className="mb-4">
            Algunos servicios de terceros pueden establecer sus propias cookies cuando visitas nuestro sitio:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
            <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
            <li><strong>Formularios de contacto:</strong> Para el funcionamiento de EmailJS</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Duración de las cookies</h3>
          <p className="mb-4">
            Las cookies que utilizamos tienen diferentes duraciones:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 text-gray-700">
            <li><strong>Cookies de sesión:</strong> Se eliminan al cerrar el navegador</li>
            <li><strong>Cookies persistentes:</strong> Permanecen hasta 2 años o hasta que las elimines</li>
            <li><strong>Cookies de consentimiento:</strong> Se mantienen por 1 año</li>
          </ul>
        </section>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">
            <strong>Última actualización:</strong> 02 de agosto de 2025
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Para cualquier consulta sobre esta política, contacta con nosotros en:{" "}
            <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
              hello@bivotraining.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default PrivacyPolicy;
