# 🧠 Contexto del Proyecto - Landing Page Bivo

## 📝 Propósito del Proyecto

Este proyecto es una **landing page promocional para Bivo**, una plataforma de entrenamiento físico adaptado a deportes de raqueta (pádel, tenis, pickleball). La landing tiene como objetivo captar leads y validar el interés de usuarios mediante un formulario interactivo y contenido informativo sobre el producto, su equipo y sus reconocimientos.

## 🎯 Objetivos Clave

- Captar usuarios interesados en entrenamientos personalizados.
- Obtener datos relevantes de los leads mediante un formulario paso a paso.
- Transmitir profesionalismo, modernidad y energía.
- Estar optimizada para rendimiento en dispositivos móviles.
- Ser escalable para futuras secciones o funcionalidades (blog, vídeos, etc.).

---

## ⚙️ Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/)  
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)  
- **Bundler / Dev Server:** [Vite](https://vitejs.dev/)  

---


## 📐 Diseño y Branding

- **Language** Todo el contenido en castellano. 
- **Estética:** Moderna, deportiva, clara y energética.
- **Colores principales:**
  - Blanco (fondo)
  - Verde fosforescente: `#39ff14`
  - Negro: `#000000`
- **Tipografía:**
  - Titulares: familia *Round*
  - Texto: familia *Arbeit*
- **Fotografías:** Stock de Adobe (proporcionadas por el equipo)
- **Referencia visual:** Manual de uso del branding → [Ver guía](https://drive.google.com/file/d/1FLGETe0KFvTOMOsmr1LOb7h5nZ4M8Iu0/view)

---

## 🧩 Estructura General

1. **Sección Hero**
   - Imagen llamativa + mensaje motivador + CTA

2. **Formulario paso a paso (sin recarga de página)**
   - Flujo de onboarding con scroll continuo y lógica de estados
   - Datos recogidos: deporte, nivel, frecuencia, edad, género, equipo, etc.

3. **Acuerdos y Alianzas**
   - Validación social con federaciones y clubes

4. **Reconocimientos**
   
   - 🥇 Premio Nacional a la Mejor Startup – Programa Impulsa Crea y Crece 2024  
     (Cámara de Comercio de España, 2 abril 2025)
   - 🏅 Mejor idea de negocio – Cámara de Comercio de Menorca  
     (14 enero 2025)

5. **Equipo**
   - Foto + nombre + rol (opcional)

6. **Contacto**
   - Formulario básico: nombre, email, mensaje

---

## 🛠 Requisitos Técnicos

- Todo debe funcionar en una **única experiencia scroll**, sin recargar página.
- **Diseño responsive**, optimizado especialmente para móvil.
- **Velocidad de carga** prioritaria.
- **Integración con Google Sheets** para volcado de datos del formulario.
- Preparado para **analítica** (Google Analytics, Meta Pixel, Hotjar, etc.).
- Posibilidad de **expansión futura** con blog o nuevas secciones.
- Enlace persistente a [Política de privacidad](https://docs.google.com/document/d/1KZb6JAKiW8XIJHxpRvoWk_6NugizGiYZqnbIYxjNdog/edit?usp=sharing)

---

## ✅ Consideraciones para la IA

- Utiliza componentes reutilizables con Tailwind.
- Aplica buenas prácticas de accesibilidad (ARIA, contrastes).
- Mantén una estructura de carpetas modular: `/components`, `/sections`, `/hooks`, etc.
- Prioriza interacciones fluidas en el formulario usando React state o context.
- Usa animaciones suaves para mejorar la experiencia en el scroll.
- Optimiza para rendimiento (Lazy loading, imágenes en WebP, etc.).