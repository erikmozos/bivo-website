
import { Award, Trophy, Star, Medal } from "lucide-react";

const RecognitionsSection = () => {
  const reconocimientos = [
    {
      titulo: "Premio Nacional a la Mejor Startup – Programa Impulsa Crea y Crece 2024",
      icono: <Trophy className="w-10 h-10 text-bivo-green" />, 
      descripcion: "Cámara de Comercio de España, 2 abril 2025"
    },
    {
      titulo: "Mejor idea de negocio – Cámara de Comercio de Menorca",
      icono: <Medal className="w-10 h-10 text-bivo-green" />, 
      descripcion: "14 enero 2025"
    }
  
  ];

  return (
    <section id="reconocimientos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            Reconocimientos y <span className="text-bivo-green">premios</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Estamos orgullosos de los reconocimientos que hemos recibido por nuestra tecnología e innovación en el mundo del deporte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reconocimientos.map((reconocimiento, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex items-start"
            >
              <div className="mr-4 mt-1">
                {reconocimiento.icono}
              </div>
              <div>
                <h3 className="font-round text-xl font-semibold mb-2">{reconocimiento.titulo}</h3>
                <p className="text-gray-600">{reconocimiento.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionsSection;
