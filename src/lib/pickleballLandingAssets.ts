export const PICKLEBALL_LP = "/lp/pickleball";

export const pickleballAsset = (path: string) =>
  `${PICKLEBALL_LP}/${path.replace(/^\//, "")}`;
