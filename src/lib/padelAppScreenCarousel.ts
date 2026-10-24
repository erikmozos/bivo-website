import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";

const PADEL_HOME = "/assets2/app-screens/home.png";

/** Same carousel as the main funnel, with home swapped to padel. */
export const PADEL_APP_SCREEN_CAROUSEL = APP_SCREEN_CAROUSEL.map((src) =>
  src.endsWith("/plan-home.jpeg") ? PADEL_HOME : src
);
