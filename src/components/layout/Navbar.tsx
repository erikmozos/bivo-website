import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Precios", id: "precios" },
  { label: "Cómo funciona", id: "como-funciona" },
  { label: "Alianzas", id: "alianzas" },
  { label: "Reconocimientos", id: "reconocimientos" },
  { label: "Equipo", id: "equipo" },
  { label: "Contacto", id: "contacto" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuClick = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
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

        <button
          type="button"
          className="lg:hidden p-2 text-white hover:text-bivo-green transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <X size={24} strokeWidth={2} aria-hidden />
          ) : (
            <Menu size={24} strokeWidth={2} aria-hidden />
          )}
        </button>

        <div className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="text-white hover:text-bivo-green transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="text-white hover:text-bivo-green transition-colors py-2 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
