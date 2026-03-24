import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're on the home page, scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If we're on another page, the Link will handle navigation to home
  };

  const handleMenuClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // If we're on the home page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll to section
      navigate('/', { state: { scrollTo: sectionId } });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-black z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img 
            src="/brand/logo-bivo-verde.png" 
            alt="Bivo Training Logo" 
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-white hover:text-bivo-green transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} strokeWidth={2} aria-hidden /> : <Menu size={24} strokeWidth={2} aria-hidden />}
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <button 
            onClick={() => handleMenuClick('form')}
            className="text-white hover:text-bivo-green transition-colors"
          >
            Registrarse
          </button>
          <button 
            onClick={() => handleMenuClick('alianzas')}
            className="text-white hover:text-bivo-green transition-colors"
          >
            Alianzas
          </button>
          <button 
            onClick={() => handleMenuClick('reconocimientos')}
            className="text-white hover:text-bivo-green transition-colors"
          >
            Reconocimientos
          </button>
          <button 
            onClick={() => handleMenuClick('equipo')}
            className="text-white hover:text-bivo-green transition-colors"
          >
            Equipo
          </button>
          <button 
            onClick={() => handleMenuClick('contacto')}
            className="text-white hover:text-bivo-green transition-colors"
          >
            Contacto
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => handleMenuClick('form')}
              className="text-white hover:text-bivo-green transition-colors py-2 text-left"
            >
              Registrarse
            </button>
            <button 
              onClick={() => handleMenuClick('alianzas')}
              className="text-white hover:text-bivo-green transition-colors py-2 text-left"
            >
              Alianzas
            </button>
            <button 
              onClick={() => handleMenuClick('reconocimientos')}
              className="text-white hover:text-bivo-green transition-colors py-2 text-left"
            >
              Reconocimientos
            </button>
            <button 
              onClick={() => handleMenuClick('equipo')}
              className="text-white hover:text-bivo-green transition-colors py-2 text-left"
            >
              Equipo
            </button>
            <button 
              onClick={() => handleMenuClick('contacto')}
              className="text-white hover:text-bivo-green transition-colors py-2 text-left"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
