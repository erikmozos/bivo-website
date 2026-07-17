import { useCallback, useEffect, useRef, useState } from "react";

const CAROUSEL_IMAGES = [
  "assets/app-screens/workout-progress.png",
  "assets/app-screens/stats.png",
  "assets/app-screens/agenda.png",
  "assets/app-screens/workout-detail.png",
] as const;

export function usePadelLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const vslVideoRef = useRef<HTMLVideoElement>(null);
  const [vslOverlayVisible, setVslOverlayVisible] = useState(true);
  const [ctaUnlocked, setCtaUnlocked] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState("--:--:--");

  const unlockCta = useCallback(() => {
    setCtaUnlocked(true);
  }, []);

  useEffect(() => {
    document.title = "Bivo Training — Preparación física para pádel";
    return () => {
      document.title = "Bivo Training";
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll<HTMLElement>(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = vslVideoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= 60) unlockCta();
    };
    const onPause = () => {
      if (!video.ended) setVslOverlayVisible(true);
    };
    const onEnded = () => setVslOverlayVisible(true);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [unlockCta]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) unlockCta();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [unlockCta]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setCountdown(
        `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
      );
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const playVsl = () => {
    const video = vslVideoRef.current;
    if (!video) return;
    void video.play();
    setVslOverlayVisible(false);
  };

  const carouselPrev = () => {
    setCarouselIndex((i) => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const carouselNext = () => {
    setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const handleTestimonialClick = (video: HTMLVideoElement, btn: HTMLElement) => {
    if (video.paused) {
      void video.play();
      btn.classList.add("hidden");
    } else {
      video.pause();
      btn.classList.remove("hidden");
    }
  };

  return {
    rootRef,
    vslVideoRef,
    vslOverlayVisible,
    ctaUnlocked,
    carouselIndex,
    carouselPrev,
    carouselNext,
    carouselImages: CAROUSEL_IMAGES,
    openFaq,
    toggleFaq,
    countdown,
    playVsl,
    handleTestimonialClick,
  };
}
