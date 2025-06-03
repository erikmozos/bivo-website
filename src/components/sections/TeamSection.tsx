import { Linkedin, Twitter } from "lucide-react";

const TeamSection = () => {
  const equipo = [
    {
      nombre: "Lluis Vila",
      cargo: "CEO & Co-founder",
      imagen: "/img/team/Lluis.png",
      bio: "Ex deportista de alto nivel reconocido por el BOE, economista, apasionado del deporte y amante del marketing y el emprendimiento.",
      linkedin: "https://www.linkedin.com/in/lluisvilasalord/",
      twitter: "#"
    },
    {
      nombre: "Toni Bota",
      cargo: "CSO & Co-founder",
      imagen: "/img/team/Toni.png",
      bio: "Graduado en CAFYD, preparador físico de jugadores ATP y atletas de élite, Readaptador, apasionado del deporte y el emprendimiento.",
      linkedin: "https://www.linkedin.com/in/toni-bota-reyn%C3%A9s-a44774133/ ",
      twitter: "#"
    },
    {
      nombre: "Marta Pons",
      cargo: "CDO",
      imagen: "/img/team/Marta.png",
      bio: "Licenciada en Bellas Artes, especialista en diseño y defensora de la armonía visual y funcional.",
      linkedin: "#",
      twitter: "#"
    },
    {
      nombre: "Ferran Sánchez",
      cargo: "CCO",
      imagen: "/img/team/Ferran.png",
      bio: "Emprendedor creativo, apasionado del branding, el diseño estratégico y la experiencia de usuario.",
      linkedin: "https://www.linkedin.com/in/ferran-st/ ",
      twitter: "#"
    },
    {
      nombre: "Josep Pons",
      cargo: "CFO",
      imagen: "/img/team/Bep.png",
      bio: "Consultor y Auditor, experto en finanzas, planificación estratégica y crecimiento empresarial.",
      linkedin: "https://www.linkedin.com/in/jponsf/",
      twitter: "#"
    },
    {
      nombre: "Andres Spitzer",
      cargo: "Advisor",
      imagen: "/img/team/Andres.png",
      bio: "Ex ejecutivo en Amazon, CPO en Civitatis y mentor de startups con amplia experiencia en escalado de producto",
      linkedin: "https://www.linkedin.com/in/andresspitzer/ ",
      twitter: "#"
    }
  ];

  const isValidLink = (link: string) => {
    return link && link !== "#" && link.trim() !== "";
  };

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
              <div className="h-64 bg-black relative overflow-hidden">
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
                  {isValidLink(miembro.linkedin) && (
                    <a 
                      href={miembro.linkedin} 
                      className="text-gray-300 hover:text-bivo-green transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${miembro.nombre}`}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {isValidLink(miembro.twitter) && (
                    <a 
                      href={miembro.twitter} 
                      className="text-gray-300 hover:text-bivo-green transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Twitter de ${miembro.nombre}`}
                    >
                      <Twitter size={18} />
                    </a>
                  )}
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
