
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white py-20 pt-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="h-full w-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3')",
            backgroundPosition: "center 40%"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="font-round text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Entrena como un profesional. <span className="text-bivo-green">Donde quieras, cuando quieras.</span>
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Pádel, tenis o pickleball: Bivo se adapta a ti.
          </p>
          
          <div className="mb-10">
            <a 
              href="#form"
              className="inline-flex items-center bg-bivo-green text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Quiero ser de los primeros
            </a>
          </div>
          
          <div className="mt-16 flex justify-center">
            <a href="#form" className="animate-bounce">
              <ArrowDown size={32} className="text-bivo-green" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
