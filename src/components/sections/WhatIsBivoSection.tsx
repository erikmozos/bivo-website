
import { Smartphone, Video, Award, Target } from "lucide-react";

const WhatIsBivoSection = () => {
  const features = [
    {
      icon: <Smartphone className="w-10 h-10 text-bivo-green" />,
      title: "Entrena desde cualquier lugar",
      description: "Accede a entrenamientos personalizados desde tu dispositivo móvil, sin importar dónde te encuentres."
    },
    {
      icon: <Video className="w-10 h-10 text-bivo-green" />,
      title: "Análisis técnico profesional",
      description: "Recibe indicaciones precisas sobre la ejecución de movimientos y la técnica adecuada para mejorar tu rendimiento físico de forma segura y eficiente."
    },
    {
      icon: <Award className="w-10 h-10 text-bivo-green" />,
      title: "Entrenadores de élite",
      description: "Aprende con metodologías desarrolladas por entrenadores profesionales de deportes de raqueta."
    },
    {
      icon: <Target className="w-10 h-10 text-bivo-green" />,
      title: "Objetivos personalizados",
      description: "Establece metas y sigue un plan adaptado a tu nivel y necesidades específicas."
    }
  ];

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            ¿Qué es <span className="text-bivo-green">Bivo</span>?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
          Bivo es la primera smart app creada para quienes viven los deportes de raqueta con pasión. Tecnología, experiencia y preparación física especializada para pádel, tenis y pickleball. Cambiando las reglas del juego.

          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden h-full">
              <img 
                src="/img/bivo-train-at-home.jpg" 
                alt="Entrenamiento Bivo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="font-round text-2xl font-semibold mb-4">Entrena como los profesionales</h3>
            <p className="text-gray-300 mb-6">
            Con Bivo accedes a entrenamientos diseñados por preparadores físicos que trabajan con jugadores de élite, adaptados a tu nivel y objetivos. Tanto si estás empezando como si eres un amateur muy exigente, en Bivo encuentras lo mejor de la preparación profesional, ajustado a tu ritmo y a tus necesidades.
            </p>
            <p className="text-gray-300 mb-6">
           Tomamos lo mejor del entrenamiento de los profesionales y lo ponemos al alcance de cualquier jugador o jugadora, con programas personalizados que te ayudan a mejorar tu rendimiento, prevenir lesiones y cuidar tu salud mientras disfrutas del pádel, tenis o pickleball.
            </p>
            <p className="text-gray-300">
            Nuestra tecnología se adapta a ti para que entrenes con inteligencia, independientemente de tu punto de partida.
            
            </p>
            <p><span className="text-bivo-green">Esa es nuestra esencia: vivir como una persona, entrenar como un profesional.</span></p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-round text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsBivoSection;
