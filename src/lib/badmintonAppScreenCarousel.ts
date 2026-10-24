import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const BADMINTON_HOME = "/lp/badminton/assets/app-screens/home.png";

/** Same carousel as the main funnel, with home swapped to badminton. */
export const BADMINTON_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) =>
  src.endsWith("/plan-home.jpeg") ? BADMINTON_HOME : src
);
