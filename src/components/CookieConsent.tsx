import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hasGivenConsent, setCookiePreferences, initializeAnalytics } from '@/lib/cookieUtils';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasGivenConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
    });
    setShowBanner(false);
    initializeAnalytics();
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
    });
    setShowBanner(false);
    initializeAnalytics();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">🍪 Usamos cookies</h3>
            <p className="text-sm text-gray-300 mb-2">
              Utilizamos cookies esenciales para el funcionamiento del sitio y cookies de análisis para mejorar tu experiencia. 
              Puedes gestionar tus preferencias en cualquier momento.
            </p>
            <p className="text-xs text-gray-400">
              Consulta nuestra{' '}
              <Link 
                to="/privacidad" 
                className="text-bivo-green hover:underline"
              >
                Política de Privacidad y Cookies
              </Link>{' '}
              para más información.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-sm bg-bivo-green text-black font-medium hover:bg-opacity-90 transition-all rounded-md"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 