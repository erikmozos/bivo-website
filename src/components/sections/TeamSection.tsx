import { Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const memberImages = [
  "/img2/team/Lluis.png",
  "/img2/team/Toni.png",
  "/img2/team/Antonio.png",
  "/img2/team/Erik.png",
  "/img2/team/Andres.png",
  "/img2/team/Marta.png",
  "/img2/team/Ferran.png",
  "/img2/team/Bep.png",
];

const memberLinks = [
  { linkedin: "https://www.linkedin.com/in/lluisvilasalord/", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/toni-bota-reyn%C3%A9s-a44774133/", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/antonio-carretero-111a12328", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/erikmozos", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/andresspitzer/", twitter: "#" },
  { linkedin: "#", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/ferran-st/", twitter: "#" },
  { linkedin: "https://www.linkedin.com/in/jponsf/", twitter: "#" },
];

const TeamSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  const membersData = t("team.members", { returnObjects: true }) as {
    name: string;
    role: string;
    bio: string;
  }[];

  const equipo = membersData.map((member, index) => ({
    nombre: member.name,
    cargo: member.role,
    imagen: memberImages[index],
    bio: member.bio,
    linkedin: memberLinks[index].linkedin,
    twitter: memberLinks[index].twitter,
  }));

  const isValidLink = (link: string) => {
    return link && link !== "#" && link.trim() !== "";
  };

  return (
    <section id="equipo" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4 text-white">
            {t("team.heading")}
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            {t("team.description")}
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
                      aria-label={t("team.socialAria.linkedin", { name: miembro.nombre })}
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
                      aria-label={t("team.socialAria.twitter", { name: miembro.nombre })}
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
