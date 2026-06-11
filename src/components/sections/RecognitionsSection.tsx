import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const awardImages = [
  "/img2/awards/dia-d-group.jpg",
  "/img2/awards/dia-d-presentacion.jpg",
];

const RecognitionsSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();

  const awardsData = t("recognitions.awards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const reconocimientos = awardsData.map((award, index) => ({
    titulo: award.title,
    descripcion: award.description,
    imagen: awardImages[index],
  }));

  return (
    <section id="reconocimientos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("recognitions.heading")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("recognitions.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reconocimientos.map((reconocimiento, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-lg overflow-hidden min-h-[220px] flex items-end group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${reconocimiento.imagen}')` }}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative p-6 z-10">
                <h3 className="font-round text-xl font-semibold mb-2 text-white">
                  {reconocimiento.titulo}
                </h3>
                <p className="text-white/80">{reconocimiento.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionsSection;
