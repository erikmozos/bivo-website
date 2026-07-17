import { useRef, useState, useEffect } from "react";
import { Smartphone, Video, Award, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

const WhatIsBivoSection = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const paragraphs = t("whatIsBivo.paragraphs", { returnObjects: true }) as string[];

  const features = [
    {
      icon: <Smartphone className="w-10 h-10 text-bivo-green" />,
      title: t("whatIsBivo.features.0.title"),
      description: t("whatIsBivo.features.0.description"),
    },
    {
      icon: <Video className="w-10 h-10 text-bivo-green" />,
      title: t("whatIsBivo.features.1.title"),
      description: t("whatIsBivo.features.1.description"),
    },
    {
      icon: <Award className="w-10 h-10 text-bivo-green" />,
      title: t("whatIsBivo.features.2.title"),
      description: t("whatIsBivo.features.2.description"),
    },
    {
      icon: <Target className="w-10 h-10 text-bivo-green" />,
      title: t("whatIsBivo.features.3.title"),
      description: t("whatIsBivo.features.3.description"),
    },
  ];

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
    if (isPlaying) v.pause(); else v.play();
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

        <div className="text-center mb-12">
          <h2 className="font-round text-3xl font-bold mb-4">
            {t("whatIsBivo.heading")}
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            {t("whatIsBivo.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_1fr] gap-9 items-center max-w-5xl mx-auto mb-14">

          <div className="relative flex justify-center items-center py-4">
            <div
              className="absolute w-[110%] h-[110%] top-[-5%] left-[-5%] rounded-full pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(57,255,20,0.22) 0%, rgba(57,255,20,0.08) 30%, transparent 65%)",
                filter: "blur(40px)",
                animation: "aboutGlowPulse 5s ease-in-out infinite",
              }}
            />

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

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "28px",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
                }}
              />

              <div
                className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
              >
                <button
                  type="button"
                  onClick={rewind}
                  aria-label={t("whatIsBivo.video.controls.rewind")}
                  className="text-white/80 hover:text-bivo-green transition-colors flex-shrink-0"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                    <polyline points="11 19 2 12 11 5 11 19" />
                    <polyline points="22 19 13 12 22 5 22 19" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? t("whatIsBivo.video.controls.pause") : t("whatIsBivo.video.controls.play")}
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

                <button
                  type="button"
                  onClick={forward}
                  aria-label={t("whatIsBivo.video.controls.forward")}
                  className="text-white/80 hover:text-bivo-green transition-colors flex-shrink-0"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                    <polyline points="13 19 22 12 13 5 13 19" />
                    <polyline points="2 19 11 12 2 5 2 19" />
                  </svg>
                </button>

                <div
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-bivo-green rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? t("whatIsBivo.video.controls.unmute") : t("whatIsBivo.video.controls.mute")}
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

          <div className="flex flex-col justify-center">
            <h3 className="font-round text-2xl font-semibold mb-4">{t("whatIsBivo.subheading")}</h3>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-white/80 mb-5">
                {paragraph}
              </p>
            ))}
            <p className="text-bivo-green">
              {t("whatIsBivo.essence")}
            </p>
          </div>
        </div>

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
