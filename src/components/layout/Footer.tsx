
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
          <p className="text-gray-400">
            &copy; {currentYear} Bivo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
