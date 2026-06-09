# Documento de Integración: bivo-entrega → bivo-website-erik (Next.js)

**Fecha:** 5 junio 2026  
**Objetivo:** Integrar todos los cambios del HTML estático (`bivo-entrega`) en el proyecto Next.js/React (`bivo-website-erik`), actualizando secciones existentes y creando las nuevas.

---

## 1. Assets ya copiados

Las carpetas de `bivo-entrega` ya están copiadas en `public/` con sufijo `2`:

| Origen (bivo-entrega) | Destino (Next.js public/) |
|---|---|
| `assets/` | `public/assets2/` |
| `img/` | `public/img2/` |
| `brand/` | `public/brand2/` |

### Archivos disponibles:

- `public/assets2/bivo-video.mp4` — video principal de la app
- `public/assets2/app-screens/` — 10 pantallas de la app para el mockup del Hero
- `public/img2/flow/` — 5 imágenes para la sección Cómo funciona
- `public/img2/awards/` — 2 imágenes para Reconocimientos
- `public/img2/team/` — fotos de los 8 miembros del equipo
- `public/img2/emprenbit.png` — logo alianza EmprenBIT
- `public/img2/fpib.png` — logo FPIB
- `public/brand2/logo-bivo-verde.png` — logo alternativo

> ⚠️ Las rutas en los componentes React deben usar `/img2/`, `/assets2/`, `/brand2/` (con el número 2).

---

## 2. Cambios en secciones EXISTENTES

### 2.1 Hero Section (`src/components/sections/HeroSection.tsx`)

**Cambio principal:** Añadir el phone mockup con slideshow rotativo de pantallas de la app.

El mockup actual no existe. En `bivo-entrega` hay un teléfono flotante a la derecha del héroe que rota automáticamente entre 7 capturas de pantalla de la app con transición suave.

**Pantallas del slideshow (en orden):**
```
/assets2/app-screens/onboarding-objetivo.png
/assets2/app-screens/onboarding-dolor.jpg
/assets2/app-screens/onboarding-material.png
/assets2/app-screens/workout-progress.png
/assets2/app-screens/stats.png
/assets2/app-screens/agenda.png
/assets2/app-screens/workout-detail.png
```

**Comportamiento:** Cambia de slide automáticamente cada ~3s, con transición `opacity + transform`. Hay dots indicadores debajo del teléfono.

**CTA actualizar:** El HTML estático dice "Pruébalo 7 días gratis" y enlaza a `#precios`. Mantener consistente con lo que decida el equipo (actualmente en Next.js dice "¡OBTÉN 1 MES GRATIS!"). Se recomienda cambiar a "Pruébalo 7 días gratis" porque el flujo ahora va a una sección de Precios, no al formulario.

**Subtítulo sport:** Añadir "bádminton" al texto de la descripción: "Pádel, tenis, pickleball o bádminton: Bivo se adapta a ti."

---

### 2.2 WhatIsBivo Section (`src/components/sections/WhatIsBivoSection.tsx`)

**Cambio:** Añadir el video de la app (`/assets2/bivo-video.mp4`) con un player personalizado (no el `<video>` nativo estándar).

En el HTML estático el video tiene:
- Thumbnail/poster mientras está pausado
- Botón de play grande centrado en el video (`▶ VIDEO BIVO`)
- Al hacer click reproduce el video inline

El texto "Entrena como los profesionales" y los 4 párrafos descriptivos están bien en Next.js, no necesitan cambios de contenido.

---

### 2.3 Alliances Section (`src/components/sections/AlliancesSection.tsx`)

**Cambio:** Añadir las 2 alianzas que faltan (actualmente solo hay 3, faltan 2):

**Alianza 4 — EmprenBIT:**
- Imagen: `/img2/emprenbit.png`
- Nombre: `#EMPRENBIT`
- Descripción: "Formamos parte del programa EmprenBIT de la Fundació BIT, que acompaña a startups tecnológicas de las Islas Baleares en sus primeras etapas de crecimiento."

**Alianza 5 — FPIB:**
- Imagen: `/img2/fpib.png`
- Nombre: `Federación Balear de Pádel`
- Descripción: "Acuerdo de colaboración con la FPIB para impulsar la preparación física de los jugadores y jugadoras de pádel de las Islas Baleares."

---

### 2.4 Team Section (`src/components/sections/TeamSection.tsx`)

**Cambio:** Añadir los 2 miembros que faltan y actualizar las fotos de todos a las nuevas de `/img2/team/`.

**Miembros que faltan:**

| Nombre | Rol | Foto | LinkedIn |
|---|---|---|---|
| Antonio Carretero | CTO — Tecnología y arquitectura | `/img2/team/Antonio.png` | No en estático |
| Erik Mozos | Developer — Frontend y experiencia | `/img2/team/Erik.png` | No en estático |

**Equipo completo (orden del HTML estático):**
1. Lluis Vila — Estrategia y liderazgo — `/img2/team/Lluis.png` — LinkedIn
2. Toni Bota — Desarrollo deportivo y producto — `/img2/team/Toni.png` — LinkedIn
3. Antonio Carretero — CTO — `/img2/team/Antonio.png`
4. Erik Mozos — Developer — `/img2/team/Erik.png`
5. Andres Spitzer — Asesor en producto e ingeniería — `/img2/team/Andres.png` — LinkedIn
6. Marta Pons — Diseño y experiencia visual — `/img2/team/Marta.png`
7. Ferran Sánchez — Branding y creatividad — `/img2/team/Ferran.png` — LinkedIn
8. Josep Pons — Finanzas y estrategia empresarial — `/img2/team/Bep.png` — LinkedIn

> Nota: También hay `Xavi.png` en la carpeta team que no aparece en el HTML estático. Confirmar si debe incluirse.

---

### 2.5 Recognitions Section (`src/components/sections/RecognitionsSection.tsx`)

**Cambio:** Añadir las imágenes de fondo a las recognition cards.

El HTML estático usa fotos reales de los eventos como background de cada card:

| Premio | Imagen |
|---|---|
| Premio Nacional Startup – Impulsa Crea y Crece 2024 | `/img2/awards/dia-d-group.jpg` |
| Mejor idea de negocio – Cámara de Comercio de Menorca | `/img2/awards/dia-d-presentacion.jpg` |

Actualmente en Next.js las cards usan iconos Lucide sin imagen de fondo real.

---

### 2.6 Navbar (`src/components/layout/Navbar.tsx`)

**Cambio:** Añadir los 2 links que faltan y reordenar.

**Orden correcto (del HTML estático):**
1. Precios → `#precios`
2. Cómo funciona → `#como-funciona`
3. Alianzas → `#alianzas`
4. Equipo → `#equipo`
5. Contacto → `#contacto`

Actualmente en Next.js el orden es: Alianzas, Reconocimientos, Equipo, Contacto (sin Precios ni Cómo funciona, pero con Reconocimientos que no está en el estático).

**Decisión a tomar:** ¿Se incluye "Reconocimientos" en el navbar? No aparece en bivo-entrega pero sí existe como sección. Recomendación: incluirlo entre Alianzas y Equipo.

---

## 3. Secciones NUEVAS a crear

### 3.1 `HowItWorksSection.tsx` — "Cómo funciona"

**Ubicación en Index.tsx:** Después de `WhatIsBivoSection`, antes de `AlliancesSection`.

**ID de sección:** `como-funciona`

**Contenido:** 5 flow cards numeradas en grid horizontal (scrollable en móvil):

| Nº | Título | Descripción | Imagen |
|---|---|---|---|
| 1 | Bivo te valora y te conoce | Test inicial para entender tu nivel, deporte, objetivos, lesiones previas y disponibilidad. | `/img2/flow/01-valora.png` |
| 2 | Entrenamiento personalizado | Plan específico para ti, basado en tus datos. Sin plantillas genéricas. | `/img2/flow/02-entrenamiento.jpg` |
| 3 | Registra tu mejora | Estadísticas claras de adherencia, velocidad y espacio de mejora. Visualiza tu progreso. | `/img2/flow/03-mejora.png` |
| 4 | Gestiona tu calendario | Organiza tus sesiones, partidos y descansos en un único lugar. Sin solapamientos. | `/img2/flow/04-calendario.png` |
| 5 | Se adapta a ti | ¿Cambias de objetivo, te lesionas o te vas de viaje? Bivo recalcula tu plan automáticamente. | `/img2/flow/05-adapta.png` |

**Diseño:** Cada card tiene la imagen como background oscurecida, número verde, título y descripción. En desktop 5 columnas, en móvil scroll horizontal.

**Heading de la sección:** "Cómo funciona" con "funciona" en verde.

---

### 3.2 `TestimonialsSection.tsx` — "Lo que dicen nuestros usuarios"

**Ubicación en Index.tsx:** Después de `RecognitionsSection`, antes de `PricingSection`.

**ID de sección:** `testimonios`

**Contenido:** Carousel con 6 testimonios (3 visibles en desktop, 1 en móvil):

| Emoji | Nombre | Texto |
|---|---|---|
| 🎾 | Marcos B. | "Desde que empecé a usar Bivo no he vuelto a tener molestias en mi rodilla derecha. El trabajo preventivo que incluyen los planes es lo que marca la diferencia." |
| 🏓 | Carlos M. | "Con Bivo ya aguanto tres partidos seguidos sin quedarme sin pilas. La prepa física que hacemos en el club era muy genérica, esto va a otro nivel." |
| 🎾 | Laura S. | "Como entrenadora de tenis, Bivo me ayuda a estructurar la prepa física de mis alumnos de una forma que nunca había podido hacer sola. Es una herramienta brutal para entrenadores." |
| 🏆 | Javi R. | "Llevaba años entrenando por mi cuenta y siempre me faltaba estructura. Bivo organiza mi semana y fin veo cómo mejoro partido tras partido." |
| 🥒 | Anna T. | "En pickleball es difícil encontrar prepa física específica. Bivo lo hace y se nota: muevo mejor los pies y reacciono más rápido." |
| 💪 | Pedro G. | "Lo que más me gusta es que adapta los entrenos cuando le digo que estoy cansado o que tengo torneo. Como tener un preparador en el bolsillo." |

**Diseño:** Cards con fondo dark, estrellas ★★★★★ en verde, emoji+nombre en header, texto entrecomillado. Navegación con flechas izquierda/derecha y dots indicadores debajo. El segundo testimonio puede destacarse como "featured".

**Heading:** "Lo que dicen" + "nuestros usuarios" en verde. Badge "RESEÑAS" encima del título.

---

### 3.3 `PricingSection.tsx` — "Elige tu plan"

**Ubicación en Index.tsx:** Después de `TestimonialsSection`, antes de `TeamSection`.

**ID de sección:** `precios`

**Heading:** "Elige tu" + "plan" en verde.

**Subheading:** "Empieza con 7 días gratis en cualquier plan. Sin compromiso, cancela cuando quieras. Todos los planes incluyen acceso completo a la app."

**Panel de características incluidas en todos los planes:**
- ✓ Plan personalizado con IA
- ✓ Adaptación automática
- ✓ Estadísticas de progreso
- ✓ Calendario y agenda
- ✓ Prevención de lesiones
- ✓ Soporte por email

**3 Pricing Cards:**

#### Plan Mensual
- Badge: ninguno
- Precio: **€14,99**/mes
- Facturación mensual
- Características:
  - ✓ Plan personalizado con IA
  - ✓ Adaptación automática
  - ✓ Estadísticas de progreso
  - ✓ Calendario y agenda
- CTA: "Obtén 7 días gratis" → enlaza a `#contacto`

#### Plan Trimestral ⭐ RECOMENDADO (destacado con borde verde)
- Badge: "RECOMENDADO" (verde)
- Precio: **€34,99**/3 meses
- Equivale a 11,66€/mes · Ahorra 22%
- Características:
  - ✓ Todo lo del plan mensual
  - ✓ Calentamientos pre-partido
  - ✓ Programas de prevención de lesiones
  - ✓ Movilidad y readaptación
- CTA: "Obtén 7 días gratis" → enlaza a `#contacto` (botón verde sólido)

#### Plan Anual 🥇 MEJOR VALOR
- Badge: "MEJOR VALOR" (dorado/gold)
- Precio: **€89,99**/año
- Equivale a 7,50€/mes · Ahorra 50%
- Características:
  - ✓ Todo lo del plan trimestral
  - ✓ Analítica de progreso avanzada
  - ✓ Soporte prioritario
  - ✓ Acceso a nuevas funciones
- CTA: "Obtén 7 días gratis" → enlaza a `#contacto`

> ⚠️ Todos los CTAs de precios enlazan al formulario de contacto (`#contacto`) porque la app aún no tiene sistema de pago integrado.

---

## 4. Orden final de secciones en `Index.tsx`

```tsx
<Navbar />
<HeroSection />           // actualizada: phone mockup + CTA "7 días gratis"
<WhatIsBivoSection />     // actualizada: video embed
<HowItWorksSection />     // NUEVA
<AlliancesSection />      // actualizada: 5 alianzas
<RecognitionsSection />   // actualizada: fotos de fondo
<TestimonialsSection />   // NUEVA
<PricingSection />        // NUEVA
<TeamSection />           // actualizada: 8 miembros
<ContactSection />        // sin cambios
<Footer />
```

---

## 5. Resumen de archivos a crear/modificar

### Archivos nuevos:
- `src/components/sections/HowItWorksSection.tsx`
- `src/components/sections/TestimonialsSection.tsx`
- `src/components/sections/PricingSection.tsx`

### Archivos a modificar:
- `src/pages/Index.tsx` — importar y añadir las 3 secciones nuevas en orden
- `src/components/sections/HeroSection.tsx` — phone mockup + slideshow
- `src/components/sections/WhatIsBivoSection.tsx` — video embed
- `src/components/sections/AlliancesSection.tsx` — añadir EmprenBIT y FPIB
- `src/components/sections/RecognitionsSection.tsx` — añadir fotos de fondo
- `src/components/sections/TeamSection.tsx` — añadir Antonio y Erik, 8 miembros total
- `src/components/layout/Navbar.tsx` — añadir Precios y Cómo funciona, reordenar

### Assets ya disponibles (no mover nada):
Todos los assets ya están en `public/img2/`, `public/assets2/` y `public/brand2/`.
