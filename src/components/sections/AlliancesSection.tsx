
const AlliancesSection = () => {
  const alianzas = [
    {
      nombre: "MQC",
      imagen: "/img/mqc.png",
      descripcion: "Movement Quality Center, referente en entrenamiento para deportistas exigentes y de alto nivel, es nuestro partner desde el inicio y base presencial de Bivo."
    },
    {
      nombre: "Bivo para entrenadores",
      imagen: "/img/monitor-padel.jpg",
      descripcion: "En Bivo optimizamos el rendimiento de tus alumnos con preparación física adaptada y preventiva. ¡Complementa tus clases con nuestro apoyo! Descubre como podemos ayudarte."
    },
    {
      nombre: "Club Pdpadel",
      imagen: "/img/pdpadel.jpg",
      descripcion: "Pdpadel, uno de los clubes más importantes de Baleares, ya confía en Bivo. Si eres un club de raqueta y quieres unirte, ¡pide más info!"
    }
  ];

  return (
    <section id="alianzas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            Alianzas y <span className="text-bivo-green">colaboraciones</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Bivo colabora con las principales organizaciones deportivas para garantizar la máxima calidad en el entrenamiento de deportes de raqueta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alianzas.map((alianza, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img 
                  src={alianza.imagen}
                  alt={alianza.nombre}
                  className="w-full h-full object-cover"
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
                <h3 className="font-round text-xl font-semibold mb-2">{alianza.nombre}</h3>
                <p className="text-gray-600">{alianza.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlliancesSection;
