import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { configureRevenueCat, isRevenueCatConfigured } from "@/lib/revenuecat";

/** Configura RevenueCat con el Firebase UID (mismo que `members/{uid}`). */
export function useRevenueCatUser() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !isRevenueCatConfigured()) return;
    configureRevenueCat(user.uid).catch(() => {
      // El paywall mostrará error si falla la configuración
    });
  }, [user]);
}
