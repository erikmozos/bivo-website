import { Link, useLocation, useNavigate } from "react-router-dom";
import { openCookiePreferences } from "@/components/ConsentBanner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuickLink = (sectionId: string) => {
    if (location.pathname === "/") {
      // If we're already on the main page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to main page with scroll target
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-round text-xl font-bold mb-4">
              <span className="text-bivo-green">Bivo</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Entrenamientos inteligentes con IA para deportes de raqueta. Donde quieras, cuando quieras.
            </p>
            <span className="text-bivo-green">Live like a person, train like a pro.</span>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-bivo-green hover:text-bivo-green transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white/50 leading-none">Descarga en el</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-bivo-green hover:text-bivo-green transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#00C1FF" d="M31.2 4.4C19.6 11 12 23.4 12 37.6v436.8c0 14.2 7.6 26.6 19.2 33.2l3.6 2L274 270.4v-5.4L34.8 2.4l-3.6 2z"/>
                  <path fill="#FFD900" d="M352.6 348.8l-78.6-78.4v-5.4l78.6-78.6 1.8 1L456 249.6c29.2 16.6 29.2 43.8 0 60.4l-101.6 57.6-1.8 1.2z"/>
                  <path fill="#FF3333" d="M354.4 347.6L274 267.2 31.2 509.6C40 518.8 53.4 519.4 68.4 511l286-163.4"/>
                  <path fill="#00EE76" d="M354.4 188.4L68.4 25C53.4 16.4 40 17.2 31.2 26.4L274 268.8l80.4-80.4z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white/50 leading-none">Disponible en</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-round text-lg font-bold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleQuickLink("precios")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Precios
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink("como-funciona")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink("alianzas")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Alianzas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink("reconocimientos")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Reconocimientos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink("equipo")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Equipo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink("contacto")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-round text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacidad"
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos"
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Configurar cookies
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="mb-4 flex justify-center gap-6">
            <a href="https://www.instagram.com/bivotraining" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bivo-green transition-colors" aria-label="Instagram">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
            
            <a href="https://www.youtube.com/@BivoTraining" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bivo-green transition-colors" aria-label="Youtube">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="7" ry="7"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/bivotraining" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bivo-green transition-colors" aria-label="Linkedin">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="16" y1="8" x2="16" y2="8"/></svg>
            </a>
          </div>
          <p className="text-gray-400">
            &copy; {currentYear} Bivo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
