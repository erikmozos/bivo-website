import { useRef, useState, useEffect } from "react";
import { Smartphone, Video, Award, Target } from "lucide-react";

const features = [
  {
    icon: <Smartphone className="w-10 h-10 text-bivo-green" />,
    title: "Entrena desde cualquier lugar",
    description:
      "Accede a entrenamientos personalizados desde tu dispositivo móvil, sin importar dónde te encuentres.",
  },
  {
    icon: <Video className="w-10 h-10 text-bivo-green" />,
    title: "Análisis técnico profesional",
    description:
      "Recibe indicaciones precisas sobre la ejecución de movimientos y la técnica adecuada para mejorar tu rendimiento físico de forma segura y eficiente.",
  },
  {
    icon: <Award className="w-10 h-10 text-bivo-green" />,
    title: "Entrenadores de élite",
    description:
      "Aprende con metodologías desarrolladas por entrenadores profesionales de deportes de raqueta.",
  },
  {
    icon: <Target className="w-10 h-10 text-bivo-green" />,
    title: "Objetivos personalizados",
    description:
      "Establece metas y sigue un plan adaptado a tu nivel y necesidades específicas.",
  },
];

const WhatIsBivoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    isPlaying ? v.pause() : v.play();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const rewind = () => {
    if (videoRef.current) videoRef.current.currentTime -= 5;
  };

  const forward = () => {
    if (videoRef.current) videoRef.current.currentTime += 5;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            ¿Qué es <span className="text-bivo-green">Bivo</span>?
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Bivo es la primera smart app creada para quienes viven los deportes de raqueta con pasión.
            Tecnología, experiencia y preparación física especializada para pádel, tenis y pickleball.
            Cambiando las reglas del juego.
          </p>
        </div>

        {/* Video + texto */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_1fr] gap-9 items-center max-w-5xl mx-auto mb-14">

          {/* Video portrait con glow y float */}
          <div className="relative flex justify-center items-center py-4">
            {/* Glow verde detrás */}
            <div
              className="absolute w-[110%] h-[110%] top-[-5%] left-[-5%] rounded-full pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(57,255,20,0.22) 0%, rgba(57,255,20,0.08) 30%, transparent 65%)",
                filter: "blur(40px)",
                animation: "aboutGlowPulse 5s ease-in-out infinite",
              }}
            />

            {/* Contenedor del video */}
            <div
              className="relative w-full max-w-[320px] z-10 group"
              style={{
                aspectRatio: "9/16",
                borderRadius: "28px",
                overflow: "hidden",
                background: "#0a0a0a",
                boxShadow:
                  "0 40px 80px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), 0 0 100px rgba(57,255,20,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                animation: "aboutFloat 6s ease-in-out infinite",
              }}
            >
              <video
                ref={videoRef}
                src="/assets2/bivo-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover block"
              />

              {/* Overlay interno sutil */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "28px",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
                }}
              />

              {/* Controles custom */}
              <div
                className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
              >
                {/* Rewind */}
                <button
                  type="button"
                  onClick={rewind}
                  aria-label="Retroceder 5 segundos"
                  className="text-white/80 hover:text-bivo-green transition-colors flex-shrink-0"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                    <polyline points="11 19 2 12 11 5 11 19" />
                    <polyline points="22 19 13 12 22 5 22 19" />
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-bivo-green text-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 pl-0.5">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  )}
                </button>

                {/* Forward */}
                <button
                  type="button"
                  onClick={forward}
                  aria-label="Adelantar 5 segundos"
                  className="text-white/80 hover:text-bivo-green transition-colors flex-shrink-0"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                    <polyline points="13 19 22 12 13 5 13 19" />
                    <polyline points="2 19 11 12 2 5 2 19" />
                  </svg>
                </button>

                {/* Barra de progreso */}
                <div
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-bivo-green rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Mute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                  className="text-white/80 hover:text-bivo-green transition-colors flex-shrink-0"
                >
                  {isMuted ? (
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <h3 className="font-round text-2xl font-semibold mb-4">Entrena como los profesionales</h3>
            <p className="text-white/80 mb-5">
              Con Bivo accedes a entrenamientos diseñados por preparadores físicos que trabajan con
              jugadores de élite, adaptados a tu nivel y objetivos. Tanto si estás empezando como si
              eres un amateur muy exigente, en Bivo encuentras lo mejor de la preparación profesional,
              ajustado a tu ritmo y a tus necesidades.
            </p>
            <p className="text-white/80 mb-5">
              Tomamos lo mejor del entrenamiento de los profesionales y lo ponemos al alcance de
              cualquier jugador o jugadora, con programas personalizados que te ayudan a mejorar tu
              rendimiento, prevenir lesiones y cuidar tu salud mientras disfrutas del pádel, tenis o
              pickleball.
            </p>
            <p className="text-white/80 mb-4">
              Nuestra tecnología se adapta a ti para que entrenes con inteligencia,
              independientemente de tu punto de partida.
            </p>
            <p className="text-bivo-green">
              Esa es nuestra esencia: vivir como una persona, entrenar como un profesional.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-round text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes globales para esta sección */}
      <style>{`
        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes aboutGlowPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
};

export default WhatIsBivoSection;
