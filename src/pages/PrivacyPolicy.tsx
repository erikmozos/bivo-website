import React from "react";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => (
  <Layout>
    <div className="min-h-screen bg-white text-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad y Cookies</h1>
        
        {/* Privacy Policy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>
          <p className="mb-4">
            En Bivo, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2">1. Información que recopilamos</h3>
          <p className="mb-4">
            Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico y cualquier mensaje enviado a través de nuestros formularios de contacto. También podemos recopilar información automáticamente mediante cookies y tecnologías similares.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2">2. Uso de la información</h3>
          <p className="mb-4">
            Utilizamos tus datos para responder a tus consultas, mejorar nuestros servicios, analizar el uso de nuestro sitio web y, si lo autorizas, enviarte comunicaciones comerciales.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2">3. Protección de datos</h3>
          <p className="mb-4">
            Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados, alteraciones o divulgación.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2">4. Derechos del usuario</h3>
          <p className="mb-4">
            Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición contactándonos en hello@bivotraining.com.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-2">5. Cambios en la política</h3>
          <p className="mb-4">
            Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o mejoras del servicio.
          </p>
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
            <strong>Última actualización:</strong> 16 de abril de 2025
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
