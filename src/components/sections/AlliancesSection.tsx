import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { getSectionId } from "@/lib/sectionIds";

const partnerImages = [
  "/img2/mqc.png",
  "/img2/monitor-padel.jpg",
  "/img2/pdpadel.jpg",
  "/img2/emprenbit.png",
  "/img2/fpib.png",
];

const AlliancesSection = () => {
  const { t } = useTranslation();
  const { lang } = useLocale();

  const partnersData = t("alliances.partners", { returnObjects: true }) as {
    name: string;
    description: string;
  }[];

  const alianzas = partnersData.map((partner, index) => ({
    nombre: partner.name,
    imagen: partnerImages[index],
    descripcion: partner.description,
  }));

  return (
    <section id={getSectionId(lang, "alliances")} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("alliances.heading")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("alliances.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alianzas.map((alianza, index) => {
            const isLogo = alianza.imagen.includes("emprenbit") || alianza.imagen.includes("fpib");
            return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-40 bg-white relative overflow-hidden flex items-center justify-center">
                <img
                  src={alianza.imagen}
                  alt={alianza.nombre}
                  className={`w-full h-full ${isLogo ? "object-contain p-6" : "object-cover"}`}
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
              <div className="p-6">
                <h3 className="font-round text-xl font-semibold mb-2">{alianza.nombre}</h3>
                <p className="text-gray-600">{alianza.descripcion}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AlliancesSection;
