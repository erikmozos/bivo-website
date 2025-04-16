
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
                <a href="#form" className="text-gray-300 hover:text-bivo-green transition-colors">
                  Registrarse
                </a>
              </li>
              <li>
                <a href="#alianzas" className="text-gray-300 hover:text-bivo-green transition-colors">
                  Alianzas
                </a>
              </li>
              <li>
                <a href="#reconocimientos" className="text-gray-300 hover:text-bivo-green transition-colors">
                  Reconocimientos
                </a>
              </li>
              <li>
                <a href="#equipo" className="text-gray-300 hover:text-bivo-green transition-colors">
                  Equipo
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-bivo-green transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-round text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://docs.google.com/document/d/1KZb6JAKiW8XIJHxpRvoWk_6NugizGiYZqnbIYxjNdog/edit?usp=sharing" 
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.google.com/document/d/1KZb6JAKiW8XIJHxpRvoWk_6NugizGiYZqnbIYxjNdog/edit?usp=sharing" 
                  className="text-gray-300 hover:text-bivo-green transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Términos y condiciones
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
            <a href="https://www.facebook.com/bivotraining" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bivo-green transition-colors" aria-label="Facebook">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3.64l.36-4H14V7a1 1 0 0 1 1-1h3z"/></svg>
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
