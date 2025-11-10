
import { ArrowDown } from "lucide-react";

import { useMemo } from "react";

const HERO_IMAGES = [
  // Replace these with your actual image filenames in /public/img
  "Fitness-dona.jpg",
  "Fitness-home.jpg",
  "padel.jpg",
  "Pickleball.jpg",
  "Tenis.jpg"
];

const HeroSection = () => {
  // Pick a random image only once per mount
  const randomImage = useMemo(() => {
    const idx = Math.floor(Math.random() * HERO_IMAGES.length);
    return `/img/${HERO_IMAGES[idx]}`;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-white py-20 pt-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${randomImage}')`,
            backgroundPosition: "center 40%"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="font-round text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Primera smart app con IA de preparación física en deportes de raqueta.
            <br></br>
            <span className="text-bivo-green">Live like a person, train like a pro.</span>
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Pádel, tenis o pickleball: Bivo se adapta a ti.
            <br></br>
            <span className="text-bivo-green">Entrena mejor, vive mejor.</span>
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
