import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const PICKLEBALL_HOME = "/lp/pickleball/assets/app-screens/home.png";

/** Same carousel as the main funnel, with home swapped to pickleball. */
export const PICKLEBALL_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) =>
  src.endsWith("/home.png") ? PICKLEBALL_HOME : src
);
