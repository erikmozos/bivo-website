import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const BADMINTON_HOME = "/lp/badminton/assets/app-screens/home.png";
const BADMINTON_STATS = "/lp/badminton/assets/app-screens/stats.png";

/** Same carousel as the main funnel, with home + stats swapped to badminton. */
export const BADMINTON_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) => {
  if (src.endsWith("/home.png")) return BADMINTON_HOME;
  if (src.endsWith("/stats.png")) return BADMINTON_STATS;
  return src;
});
