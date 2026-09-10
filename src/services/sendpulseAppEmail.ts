import type { User } from "firebase/auth";

export type AppLifecycleEmailType = "welcome" | "onboarding";

export async function sendAppLifecycleEmail(
  user: User,
  type: AppLifecycleEmailType,
  lang: string
): Promise<void> {
  const email = user.email?.trim();
  if (!email) return;

  const idToken = await user.getIdToken();
  const response = await fetch("/api/app-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      type,
      lang: lang === "en" ? "en" : "es",
      nombre: user.displayName ?? "",
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(
      typeof payload?.error === "string"
        ? payload.error
        : `SendPulse ${type} email failed (${response.status})`
    );
  }
}

export function notifyAppLifecycleEmail(
  user: User,
  type: AppLifecycleEmailType,
  lang: string
): void {
  void sendAppLifecycleEmail(user, type, lang).catch((error) => {
    console.warn(`No se pudo enviar el email de ${type}:`, error);
  });
}
