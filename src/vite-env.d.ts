/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ESTABILIDAD_URL?: string;
  /** URL absoluta del endpoint de contacto (p. ej. preview). Por defecto `/api/contact`. */
  readonly VITE_CONTACT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
