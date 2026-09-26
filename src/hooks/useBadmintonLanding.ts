import { usePadelLanding } from "@/hooks/usePadelLanding";
import { BADMINTON_APP_SCREEN_CAROUSEL } from "@/lib/badmintonAppScreenCarousel";

export function useBadmintonLanding(pageTitle = "Bivo Training — Preparación física para bádminton") {
  return usePadelLanding(pageTitle, BADMINTON_APP_SCREEN_CAROUSEL);
}
