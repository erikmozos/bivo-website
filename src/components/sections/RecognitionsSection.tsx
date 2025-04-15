
import { Award, Trophy, Star, Medal } from "lucide-react";

const RecognitionsSection = () => {
  const reconocimientos = [
    {
      titulo: "Finalista StartUp Mallorca 2023",
      icono: <Trophy className="w-10 h-10 text-bivo-green" />,
      descripcion: "Reconocimiento en el concurso de startups más importante de las islas."
    },
    {
      titulo: "Premio Innovación Deportiva",
      icono: <Award className="w-10 h-10 text-bivo-green" />,
      descripcion: "Otorgado por el Consejo Superior de Deportes como plataforma innovadora."
    },
    {
      titulo: "Top 10 SportsTech España",
      icono: <Star className="w-10 h-10 text-bivo-green" />,
      descripcion: "Reconocida entre las 10 mejores startups deportivas españolas de 2023."
    },
    {
      titulo: "Mención de excelencia técnica",
      icono: <Medal className="w-10 h-10 text-bivo-green" />,
      descripcion: "Reconocimiento por la calidad de análisis técnico deportivo."
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
