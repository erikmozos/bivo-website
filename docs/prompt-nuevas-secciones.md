# Prompt para crear nuevas secciones en bivo-website-erik

Usa este prompt completo cuando le pidas a una IA que cree o modifique secciones de este proyecto. Cópialo entero antes de dar la instrucción específica.

---

## CONTEXTO DEL PROYECTO

Estás trabajando en **bivo-website-erik**, una web en **React + TypeScript + Vite** con **Tailwind CSS** y **React Router**. Es la web de marketing de Bivo, una app de preparación física para deportes de raqueta.

## SISTEMA DE DISEÑO — REGLAS ESTRICTAS

### Colores
- Verde acento: `text-bivo-green` / `bg-bivo-green` → es `#39ff14` (verde neón)
- Negro puro: `bg-black` / `text-white`
- Blanco: `bg-white` / `text-gray-600`
- Gris claro: `bg-gray-50`
- Texto secundario oscuro: `text-gray-600`
- Texto secundario claro (sobre negro): `text-white/80` o `text-white/90`
- **NUNCA uses otros colores de fondo que no sean estos cuatro.**

### Tipografía
- Títulos de sección: `font-round text-3xl font-bold mb-4`
- Subtítulo de sección (párrafo descriptivo): `text-gray-600 max-w-3xl mx-auto` (sobre blanco) / `text-white/80 max-w-3xl mx-auto` (sobre negro)
- Texto normal: sin clase de fuente (hereda sans-serif por defecto)
- **NUNCA uses `font-sans`, `font-serif`, ni otras font-family. Solo `font-round` para títulos.**

### Patrón de título de sección
Siempre estructura los títulos así:
```tsx
<h2 className="font-round text-3xl font-bold mb-4">
  Palabra normal <span className="text-bivo-green">palabra verde</span>
</h2>
```

### Estructura de sección
Todas las secciones siguen este patrón:
```tsx
<section id="id-seccion" className="py-20 bg-[COLOR]">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 ...>Título <span className="text-bivo-green">acento</span></h2>
      <p className="text-gray-600 max-w-3xl mx-auto">Descripción...</p>
    </div>
    {/* Contenido */}
  </div>
</section>
```

### Alternancia de fondos de sección (en orden en la página)
1. Hero → fondo imagen con overlay negro
2. WhatIsBivo → `bg-black` (texto blanco)
3. HowItWorks → `bg-white`
4. Alianzas → `bg-black` (texto blanco)
5. Reconocimientos → `bg-gray-50`
6. Testimonios → `bg-black` (texto blanco)
7. Precios → `bg-white`
8. Equipo → `bg-black` (texto blanco)
9. Contacto → `bg-white`
**Respeta esta alternancia. No pongas dos secciones del mismo fondo seguidas.**

### Cards sobre fondo blanco
```tsx
<div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  <div className="h-40 bg-gray-200 relative overflow-hidden">
    <img src={...} alt={...} className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h3 className="font-round text-xl font-semibold mb-2">{titulo}</h3>
    <p className="text-gray-600">{descripcion}</p>
  </div>
</div>
```

### Cards sobre fondo negro
```tsx
<div className="bg-neutral-900 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
  <div className="h-64 bg-black relative overflow-hidden">
    <img src={...} alt={...} className="w-full h-full object-cover object-center" />
  </div>
  <div className="p-6">
    <h3 className="font-round text-xl font-semibold mb-1 text-white">{nombre}</h3>
    <p className="text-bivo-green text-sm font-medium mb-3">{cargo}</p>
    <p className="text-white/80 text-sm">{bio}</p>
  </div>
</div>
```

### Botón CTA principal
```tsx
<a
  href="#seccion"
  className="inline-flex items-center bg-bivo-green text-black px-8 py-3 rounded-lg font-extrabold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
>
  Texto del botón
</a>
```

### Botón secundario (outline)
```tsx
<a
  href="#seccion"
  className="inline-flex items-center border-2 border-bivo-green text-bivo-green px-8 py-3 rounded-lg font-extrabold text-lg hover:bg-bivo-green hover:text-black transition-all"
>
  Texto del botón
</a>
```

### Grids
- 3 columnas: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- 4 columnas: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`
- 2 columnas: `grid grid-cols-1 md:grid-cols-2 gap-8`
- 5 columnas (flow): `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6`

### Imagen con fallback de error
Siempre añade el handler de error en imágenes:
```tsx
onError={(e) => {
  const target = e.currentTarget;
  if (!target.src.endsWith("/brand/placeholder-profile.png")) {
    target.src = "/brand/placeholder-profile.png";
  } else {
    target.onerror = null;
  }
}}
```

### Links y navegación
- Este proyecto usa **React Router**. Importa `Link`, `useLocation`, `useNavigate` de `"react-router-dom"` cuando necesites navegación.
- Para scroll interno a una sección: `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`
- Para iconos usa **Lucide React**: `import { NombreIcono } from "lucide-react"`

### Assets — rutas obligatorias
Los assets nuevos están en `public/` con sufijo `2`:
- Imágenes generales: `/img2/[archivo]`
- Fotos del equipo: `/img2/team/[archivo]`
- Imágenes de premios: `/img2/awards/[archivo]`
- Imágenes de pasos (flow): `/img2/flow/[archivo]`
- Pantallas de la app: `/assets2/app-screens/[archivo]`
- Video de la app: `/assets2/bivo-video.mp4`
- Logo alternativo: `/brand2/logo-bivo-verde.png`
- Assets originales (aún válidos): `/img/[archivo]`, `/brand/logo-bivo-verde.png`

---

## INSTRUCCIÓN ESPECÍFICA

[Aquí escribe lo que quieres que haga, por ejemplo:]

> Crea el componente `HowItWorksSection.tsx` en `src/components/sections/` con las 5 flow cards, fondo negro, y añádelo en `Index.tsx` después de `WhatIsBivoSection`.
