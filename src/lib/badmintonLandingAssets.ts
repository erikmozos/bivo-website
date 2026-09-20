export const BADMINTON_LP = "/lp/badminton";

export const badmintonAsset = (path: string) =>
  `${BADMINTON_LP}/${path.replace(/^\//, "")}`;
