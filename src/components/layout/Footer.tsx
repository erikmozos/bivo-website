
import { Link, useLocation, useNavigate } from "react-router-dom";

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
              Entrena como un profesional. Donde quieras, cuando quieras.
            </p>
          </div>
          
          <div>
            <h4 className="font-round text-lg font-bold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleQuickLink("form")}
                  className="text-gray-300 hover:text-bivo-green transition-colors text-left"
                >
                  Registrarse
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
                <a 
                  href="/privacidad" 
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                >
                  Política de privacidad y cookies
                </a>
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
