import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setCookiePreferences } from '@/lib/cookieUtils';

const COOKIE_PREFERENCES_EVENT = 'bivo-open-cookie-preferences';

export const openCookiePreferences = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_EVENT));
  }
};

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const timer = setTimeout(() => {
      try {
        const hasConsent = localStorage.getItem('bivo-cookie-consent');
        if (!hasConsent) {
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
        setShowBanner(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowPreferencesModal(true);
      const analytics = localStorage.getItem('bivo-analytics-enabled') === 'true';
      setAnalyticsEnabled(analytics);
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  const closeBanner = () => {
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('bivo-cookie-consent', 'set');
      localStorage.setItem('bivo-analytics-enabled', 'true');
      closeBanner();
    } catch (error) {
      console.error('Error accepting cookies:', error);
      closeBanner();
    }
  };

  const handleRejectAll = () => {
    try {
      localStorage.setItem('bivo-cookie-consent', 'set');
      localStorage.setItem('bivo-analytics-enabled', 'false');
      closeBanner();
    } catch (error) {
      console.error('Error rejecting cookies:', error);
      closeBanner();
    }
  };

  const handleOpenPreferences = () => {
    setShowPreferencesModal(true);
    setShowBanner(false);
    const analytics = localStorage.getItem('bivo-analytics-enabled') === 'true';
    setAnalyticsEnabled(analytics);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('bivo-cookie-consent', 'set');
      localStorage.setItem('bivo-analytics-enabled', analyticsEnabled.toString());
      setCookiePreferences({ essential: true, analytics: analyticsEnabled });
      closeBanner();
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
      closeBanner();
    }
  };

  const handleClosePreferencesModal = () => {
    setShowPreferencesModal(false);
    const hasConsent = localStorage.getItem('bivo-cookie-consent');
    if (!hasConsent) {
      setShowBanner(true);
    }
  };

  if (!isClient) return null;

  // Modal de preferencias (desde banner o footer "Configurar cookies")
  if (showPreferencesModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
        <div className="bg-black text-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Configurar cookies</h3>

          <div className="space-y-6 mb-6">
            <div>
              <h4 className="font-medium mb-2">Cookies técnicas (siempre activas)</h4>
              <p className="text-sm text-gray-300">
                Estas cookies son necesarias para el funcionamiento básico del sitio web y no pueden
                desactivarse. Incluyen, por ejemplo, cookies de sesión o de gestión del
                consentimiento.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Cookies analíticas</h4>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-bivo-green focus:ring-offset-2 focus:ring-offset-black ${
                    analyticsEnabled ? 'bg-bivo-green' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
                      analyticsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-300">
                Estas cookies permiten analizar el uso del sitio web con el fin de mejorar el
                servicio. Solo se activan si el usuario lo consiente.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
            >
              Aceptar todas
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-6 py-2 text-sm bg-bivo-green text-black font-medium hover:bg-opacity-90 transition-all rounded-md flex-1 sm:flex-initial"
            >
              Guardar preferencias
            </button>
          </div>

          <button
            onClick={handleClosePreferencesModal}
            className="mt-4 w-full text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">🍪 Usamos cookies</h3>
            <p className="text-sm text-gray-300 mb-2">
              Utilizamos cookies esenciales para el funcionamiento del sitio y, con su consentimiento,
              cookies analíticas para mejorar la experiencia. Puede aceptar todas, rechazar las no
              esenciales o configurar sus preferencias en cualquier momento.
            </p>
            <p className="text-xs text-gray-400">
              Consulta nuestra{' '}
              <Link to="/privacidad" className="text-bivo-green hover:underline">
                Política de Privacidad
              </Link>
              {' y '}
              <Link to="/cookies" className="text-bivo-green hover:underline">
                Política de Cookies
              </Link>
              {' para más información.'}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
              >
                Rechazar todas
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
              >
                Solo esenciales
              </button>
              <button
                onClick={handleOpenPreferences}
                className="px-4 py-2 text-sm border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors rounded-md"
              >
                Configurar
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
    </div>
  );
};

export default ConsentBanner;
