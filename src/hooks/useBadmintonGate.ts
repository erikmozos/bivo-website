import { useCallback, useState } from "react";

const STORAGE_KEY = "bivo.badminton.gate";

function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function useBadmintonGate() {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/badminton-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setError(data.error || "Usuario o contraseña incorrectos");
        return false;
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Private mode can block storage; the session still unlocks in memory.
      }
      setUnlocked(true);
      return true;
    } catch {
      setError("No se ha podido comprobar el acceso. Inténtalo de nuevo.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { unlocked, login, submitting, error };
}
