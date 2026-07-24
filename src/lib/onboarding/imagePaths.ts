const LEGACY_PREFIX = "assets/images/";

const QUESTION_IMAGE_OVERRIDES: Record<string, string> = {
  "force.png": "/onboarding/onboardingFuerza/flexionesOnboarding.png",
};

function encodePublicPath(path: string): string {
  return path
    .split("/")
    .map((segment, index) => (index === 0 && segment === "" ? "" : encodeURIComponent(segment)))
    .join("/");
}

export function resolveOnboardingImage(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  let resolved: string;
  if (path.startsWith("/")) {
    resolved = path;
  } else {
    const override = QUESTION_IMAGE_OVERRIDES[path];
    if (override) {
      resolved = override;
    } else if (path.startsWith(LEGACY_PREFIX)) {
      resolved = `/${path.replace(LEGACY_PREFIX, "onboarding/")}`;
    } else {
      resolved = `/onboarding/${path}`;
    }
  }

  return encodePublicPath(resolved);
}
