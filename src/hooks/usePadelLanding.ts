import { useCallback, useEffect, useRef, useState } from "react";
import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

export function usePadelLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const vslVideoRef = useRef<HTMLVideoElement>(null);
  /** True while the user expects the VSL to be playing (ignores transient pause events while buffering). */
  const vslShouldPlayRef = useRef(false);
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
      // Only restore the poster when the user (or ended state) actually stopped playback.
      // Browsers can emit transient pause events while buffering; those must not block play.
      if (!vslShouldPlayRef.current) {
        setVslOverlayVisible(true);
      }
    };
    const onPlaying = () => {
      setVslOverlayVisible(false);
    };
    const onEnded = () => {
      vslShouldPlayRef.current = false;
      setVslOverlayVisible(true);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("pause", onPause);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("playing", onPlaying);
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
      setCarouselIndex((i) => (i + 1) % APP_SCREEN_CAROUSEL.length);
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

  const playVsl = useCallback(() => {
    const video = vslVideoRef.current;
    if (!video) return;

    if (!video.paused && !video.ended) {
      vslShouldPlayRef.current = false;
      video.pause();
      setVslOverlayVisible(true);
      return;
    }

    vslShouldPlayRef.current = true;
    setVslOverlayVisible(false);

    const attempt = video.play();
    if (attempt && typeof attempt.then === "function") {
      void attempt.catch(() => {
        vslShouldPlayRef.current = false;
        setVslOverlayVisible(true);
      });
    }
  }, []);

  const carouselPrev = () => {
    setCarouselIndex((i) => (i - 1 + APP_SCREEN_CAROUSEL.length) % APP_SCREEN_CAROUSEL.length);
  };

  const carouselNext = () => {
    setCarouselIndex((i) => (i + 1) % APP_SCREEN_CAROUSEL.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const handleTestimonialClick = (video: HTMLVideoElement, btn: HTMLElement) => {
    if (video.paused) {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        void playAttempt
          .then(() => {
            btn.classList.add("hidden");
          })
          .catch(() => {
            btn.classList.remove("hidden");
          });
        return;
      }

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
    carouselImages: APP_SCREEN_CAROUSEL,
    openFaq,
    toggleFaq,
    countdown,
    playVsl,
    handleTestimonialClick,
  };
}
