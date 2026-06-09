import { Linkedin, Twitter } from "lucide-react";

const TeamSection = () => {
  const equipo = [
    {
      nombre: "Lluis Vila",
      cargo: "Estrategia y liderazgo",
      imagen: "/img2/team/Lluis.png",
      bio: "Ex deportista de alto nivel reconocido por el BOE, economista, apasionado del deporte y amante del marketing y el emprendimiento.",
      linkedin: "https://www.linkedin.com/in/lluisvilasalord/",
      twitter: "#",
    },
    {
      nombre: "Toni Bota",
      cargo: "Desarrollo deportivo y producto",
      imagen: "/img2/team/Toni.png",
      bio: "Graduado en CAFYD, preparador físico de jugadores ATP y atletas de élite, Readaptador, apasionado del deporte y el emprendimiento.",
      linkedin: "https://www.linkedin.com/in/toni-bota-reyn%C3%A9s-a44774133/",
      twitter: "#",
    },
    {
      nombre: "Antonio Carretero",
      cargo: "CTO — Tecnología y arquitectura",
      imagen: "/img2/team/Antonio.png",
      bio: "Experto en arquitectura de software y desarrollo de productos tecnológicos, liderando la plataforma técnica de Bivo.",
      linkedin: "https://www.linkedin.com/in/antonio-carretero-111a12328",
      twitter: "#",
    },
    {
      nombre: "Erik Mozos",
      cargo: "Developer — Frontend y experiencia",
      imagen: "/img2/team/Erik.png",
      bio: "Especialista en desarrollo frontend y diseño de experiencias de usuario, creando la interfaz de la app Bivo.",
      linkedin: "https://www.linkedin.com/in/erikmozos",
      twitter: "#",
    },
    {
      nombre: "Andres Spitzer",
      cargo: "Asesor en producto e ingeniería",
      imagen: "/img2/team/Andres.png",
      bio: "Ex ejecutivo en Amazon, CPO en Civitatis y mentor de startups con amplia experiencia en escalado de producto e ingeniería.",
      linkedin: "https://www.linkedin.com/in/andresspitzer/",
      twitter: "#",
    },
    {
      nombre: "Marta Pons",
      cargo: "Diseño y experiencia visual",
      imagen: "/img2/team/Marta.png",
      bio: "Licenciada en Bellas Artes, especialista en diseño y defensora de la armonía visual y funcional.",
      linkedin: "#",
      twitter: "#",
    },
    {
      nombre: "Ferran Sánchez",
      cargo: "Branding y creatividad",
      imagen: "/img2/team/Ferran.png",
      bio: "Emprendedor creativo, apasionado del branding, el diseño estratégico y la experiencia de usuario.",
      linkedin: "https://www.linkedin.com/in/ferran-st/",
      twitter: "#",
    },
    {
      nombre: "Josep Pons",
      cargo: "Finanzas y estrategia empresarial",
      imagen: "/img2/team/Bep.png",
      bio: "Consultor y Auditor, experto en finanzas, planificación estratégica y crecimiento empresarial.",
      linkedin: "https://www.linkedin.com/in/jponsf/",
      twitter: "#",
    },
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
            Un grupo de apasionados por los deportes de raqueta y la tecnología, unidos para
            revolucionar el entrenamiento deportivo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipo.map((miembro, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col"
            >
              <div className="h-64 bg-white relative overflow-hidden flex items-end justify-center">
                <img
                  src={miembro.imagen}
                  alt={miembro.nombre}
                  className={`w-full h-full object-contain object-bottom transition-transform ${miembro.nombre === "Antonio Carretero" ? "scale-125" : ""}`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith("/brand/placeholder-profile.png")) {
                      target.src = "/brand/placeholder-profile.png";
                    } else {
                      target.onerror = null;
                    }
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-round text-xl font-semibold mb-1 text-white">
                  {miembro.nombre}
                </h3>
                <p className="text-bivo-green text-sm font-medium mb-3">{miembro.cargo}</p>
                <p className="text-white/80 text-sm mb-4 flex-grow">{miembro.bio}</p>

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
