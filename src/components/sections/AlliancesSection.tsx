
const AlliancesSection = () => {
  const alianzas = [
    {
      nombre: "Federación Balear de Pádel",
      imagen: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      descripcion: "Colaboración oficial con la Federación Balear de Pádel para el desarrollo de jugadores."
    },
    {
      nombre: "Club Deportivo Padelma",
      imagen: "https://images.unsplash.com/photo-1622279488866-19f1bb0d8d0f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      descripcion: "Programa de entrenamiento exclusivo para miembros del club más grande de Mallorca."
    },
    {
      nombre: "Asociación de Tenis de Baleares",
      imagen: "https://images.unsplash.com/photo-1599786095546-ac225acc2b09?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      descripcion: "Proveedor oficial de análisis técnico para la asociación de tenis regional."
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/300x150/f0f0f0/808080?text=Deportes+de+Raqueta";
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
