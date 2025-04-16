
import { Linkedin, Twitter } from "lucide-react";

const TeamSection = () => {
  const equipo = [
    {
      nombre: "Alejandro Rodríguez",
      cargo: "CEO & Co-fundador",
      imagen: "https://images.unsplash.com/photo-1558391743-ca83be23f286?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3",
      bio: "Ex-jugador profesional de pádel con más de 15 años de experiencia en entrenamiento deportivo.",
      linkedin: "#",
      twitter: "#"
    },
    {
      nombre: "Marta Gómez",
      cargo: "CTO & Co-fundadora",
      imagen: "https://images.unsplash.com/photo-1573497019707-1c04de26e58c?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
      bio: "Ingeniera informática especializada en visión artificial y análisis de movimiento deportivo.",
      linkedin: "#",
      twitter: "#"
    },
    {
      nombre: "Carlos Martínez",
      cargo: "Director Deportivo",
      imagen: "https://images.unsplash.com/photo-1507398941619-c08bd3ff5144?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
      bio: "Entrenador nacional de tenis y pádel con experiencia en la formación de jugadores de élite.",
      linkedin: "#",
      twitter: "#"
    },
    {
      nombre: "Laura Fernández",
      cargo: "Directora de Marketing",
      imagen: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961&ixlib=rb-4.0.3",
      bio: "Especialista en marketing deportivo con experiencia en grandes eventos de raqueta.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  return (
    <section id="equipo" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4 text-white">
            Nuestro <span className="text-bivo-green">equipo</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Un grupo de apasionados por los deportes de raqueta y la tecnología, unidos para revolucionar el entrenamiento deportivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipo.map((miembro, index) => (
            <div 
              key={index} 
              className="bg-neutral-900 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <img 
                  src={miembro.imagen}
                  alt={miembro.nombre}
                  className="w-full h-full object-cover object-center"
                  onError={e => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/brand/placeholder-profile.png')) {
                      target.src = '/brand/placeholder-profile.png';
                    } else {
                      target.onerror = null;
                    }
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-round text-xl font-semibold mb-1 text-white">{miembro.nombre}</h3>
                <p className="text-bivo-green text-sm font-medium mb-3">{miembro.cargo}</p>
                <p className="text-white/80 text-sm mb-4">{miembro.bio}</p>
                
                <div className="flex space-x-3">
                  <a 
                    href={miembro.linkedin} 
                    className="text-gray-300 hover:text-bivo-green transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${miembro.nombre}`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href={miembro.twitter} 
                    className="text-gray-300 hover:text-bivo-green transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter de ${miembro.nombre}`}
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
