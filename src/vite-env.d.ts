/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ESTABILIDAD_URL?: string;
  /** URL absoluta del endpoint de contacto (p. ej. preview). Por defecto `/api/contact`. */
  readonly VITE_CONTACT_API_URL?: string;
  /** RevenueCat Web Billing (Stripe) — prefijo strp_ */
  readonly VITE_REVENUECAT_API_KEY?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_FUNCTIONS_EMULATOR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
