
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-bivo-black">
            <span className="text-bivo-green">Bivo</span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#form" className="text-black hover:text-bivo-green transition-colors">
            Registrarse
          </a>
          <a href="#alianzas" className="text-black hover:text-bivo-green transition-colors">
            Alianzas
          </a>
          <a href="#reconocimientos" className="text-black hover:text-bivo-green transition-colors">
            Reconocimientos
          </a>
          <a href="#equipo" className="text-black hover:text-bivo-green transition-colors">
            Equipo
          </a>
          <a href="#contacto" className="text-black hover:text-bivo-green transition-colors">
            Contacto
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            <a 
              href="#form" 
              className="text-black hover:text-bivo-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrarse
            </a>
            <a 
              href="#alianzas" 
              className="text-black hover:text-bivo-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Alianzas
            </a>
            <a 
              href="#reconocimientos" 
              className="text-black hover:text-bivo-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Reconocimientos
            </a>
            <a 
              href="#equipo" 
              className="text-black hover:text-bivo-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Equipo
            </a>
            <a 
              href="#contacto" 
              className="text-black hover:text-bivo-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
