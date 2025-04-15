
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
      description: "Recibe feedback detallado de tus movimientos y técnica para mejorar tu rendimiento."
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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            ¿Qué es <span className="text-bivo-green">Bivo</span>?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Bivo es una plataforma innovadora que combina tecnología y experiencia deportiva para 
            revolucionar el entrenamiento en deportes de raqueta como pádel, tenis y pickleball.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                alt="Entrenamiento Bivo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="font-round text-2xl font-semibold mb-4">Entrena como los profesionales</h3>
            <p className="text-gray-600 mb-6">
              Nuestra plataforma te permite acceder a entrenamientos diseñados por profesionales, 
              adaptados a tu nivel y objetivos. Ya sea que estés comenzando o busques perfeccionar tu 
              técnica, Bivo te ofrece las herramientas para mejorar tu juego.
            </p>
            <p className="text-gray-600">
              Utilizamos tecnología avanzada para analizar tu técnica, movimientos y rendimiento, 
              proporcionándote feedback personalizado y ejercicios específicos para mejorar en cada 
              aspecto de tu juego.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-round text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsBivoSection;
