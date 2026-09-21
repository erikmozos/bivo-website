import { usePadelLanding } from "@/hooks/usePadelLanding";
import { BADMINTON_APP_SCREEN_CAROUSEL } from "@/lib/badmintonAppScreenCarousel";

export function useBadmintonLanding() {
  return usePadelLanding(
    "Bivo Training — Preparación física para bádminton",
    BADMINTON_APP_SCREEN_CAROUSEL
  );
}
