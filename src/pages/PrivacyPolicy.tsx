import React from "react";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => (
  <Layout>
    <div className="min-h-screen bg-white text-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <p className="mb-4">
          En Bivo, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Información que recopilamos</h2>
        <p className="mb-4">
          Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico y cualquier mensaje enviado a través de nuestros formularios de contacto.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Uso de la información</h2>
        <p className="mb-4">
          Utilizamos tus datos para responder a tus consultas, mejorar nuestros servicios y, si lo autorizas, enviarte comunicaciones comerciales.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Protección de datos</h2>
        <p className="mb-4">
          Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados, alteraciones o divulgación.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Derechos del usuario</h2>
        <p className="mb-4">
          Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición contactándonos en hello@bivotraining.com.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Cambios en la política</h2>
        <p className="mb-4">
          Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o mejoras del servicio.
        </p>
        <p className="text-sm text-gray-600 mt-8">Última actualización: 16 de abril de 2025</p>
      </div>
    </div>
  </Layout>
);

export default PrivacyPolicy;
