import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const TENIS_HOME = "/lp/tenis/assets/app-screens/home.png";

/** Same carousel as the main funnel, with home swapped to tennis. */
export const TENIS_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) =>
  src.endsWith("/home.png") ? TENIS_HOME : src
);
