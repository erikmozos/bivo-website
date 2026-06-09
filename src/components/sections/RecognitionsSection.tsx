const RecognitionsSection = () => {
  const reconocimientos = [
    {
      titulo: "Premio Nacional a la Mejor Startup – Programa Impulsa Crea y Crece 2024",
      descripcion: "Cámara de Comercio de España, 2 abril 2025",
      imagen: "/img2/awards/dia-d-group.jpg",
    },
    {
      titulo: "Mejor idea de negocio – Cámara de Comercio de Menorca",
      descripcion: "14 enero 2025",
      imagen: "/img2/awards/dia-d-presentacion.jpg",
    },
  ];

  return (
    <section id="reconocimientos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            Reconocimientos y <span className="text-bivo-green">premios</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Estamos orgullosos de los reconocimientos que hemos recibido por nuestra tecnología e
            innovación en el mundo del deporte.
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
