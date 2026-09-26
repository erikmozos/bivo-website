import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const PICKLEBALL_HOME = "/lp/pickleball/assets/app-screens/home.png";
const PICKLEBALL_STATS = "/lp/pickleball/assets/app-screens/stats.png";

/** Same carousel as the main funnel, with home + stats swapped to pickleball. */
export const PICKLEBALL_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) => {
  if (src.endsWith("/home.png")) return PICKLEBALL_HOME;
  if (src.endsWith("/stats.png")) return PICKLEBALL_STATS;
  return src;
});
