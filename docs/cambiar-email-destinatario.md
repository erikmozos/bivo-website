# Cambiar Email Destinatario del Formulario de Contacto

## Situación Actual

El código del formulario de contacto ya está configurado para enviar emails a `hello@bivotraining.com`, pero los emails están llegando a `lluis@bivotraining.com` porque la configuración real del destinatario se establece en la **plantilla de EmailJS**, no en el código.

## Solución: Actualizar la Plantilla en EmailJS

### Paso 1: Acceder al Dashboard de EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Inicia sesión con la cuenta que configuró Andrés
3. Ve al dashboard principal

### Paso 2: Localizar la Plantilla Actual

1. En el menú lateral, haz clic en **"Email Templates"** (Plantillas de Email)
2. Busca la plantilla que está siendo usada actualmente (debería tener el `Template ID` que coincide con la variable de entorno `VITE_EMAILJS_TEMPLATE_ID`)

### Paso 3: Editar el Campo "To Email"

1. Haz clic en la plantilla para editarla
2. Busca el campo **"To Email"** o **"To"** (Destinatario)
3. Cambia el email de `lluis@bivotraining.com` a `hello@bivotraining.com`
4. **Importante**: Si el campo tiene `{{to_email}}`, también debes cambiarlo a `hello@bivotraining.com` directamente, o asegurarte de que el parámetro `to_email` en el código se esté usando correctamente

### Paso 4: Guardar los Cambios

1. Haz clic en **"Save"** (Guardar) para guardar los cambios en la plantilla
2. Los cambios se aplicarán inmediatamente

### Paso 5: Verificar la Configuración

Asegúrate de que la plantilla tenga esta configuración:

```
To Email: hello@bivotraining.com
Subject: Nuevo mensaje de contacto desde Bivo - {{from_name}}

Contenido del email:
Hola,

Has recibido un nuevo mensaje de contacto desde la web de Bivo:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de bivotraining.com
```

## Verificación del Código

El código en `src/components/sections/ContactSection.tsx` ya está correctamente configurado:

```typescript
const templateParams = {
  from_name: formData.nombre,
  from_email: formData.email,
  message: formData.mensaje,
  to_email: "hello@bivotraining.com"  // ✅ Ya está configurado correctamente
};
```

## Prueba de Envío

Después de actualizar la plantilla en EmailJS:

1. Ve a la página de contacto en la web
2. Completa el formulario con datos de prueba
3. Envía el formulario
4. Verifica que el email llegue a `hello@bivotraining.com` y NO a `lluis@bivotraining.com`

## Notas Importantes

- ⚠️ **El cambio debe hacerse en EmailJS**, no en el código
- El código ya está correcto y no necesita cambios
- Si Andrés tiene acceso al dashboard de EmailJS, puede hacer este cambio directamente
- Los cambios en EmailJS se aplican inmediatamente, no requieren despliegue

## Si No Tienes Acceso a EmailJS

Si no tienes acceso al dashboard de EmailJS:

1. Contacta a **Andrés** (quien creó el formulario) para que haga el cambio
2. O solicita acceso a la cuenta de EmailJS para poder hacer el cambio tú mismo

## Checklist de Verificación

- [ ] Acceder al dashboard de EmailJS
- [ ] Localizar la plantilla correcta
- [ ] Cambiar el campo "To Email" de `lluis@bivotraining.com` a `hello@bivotraining.com`
- [ ] Guardar los cambios
- [ ] Hacer prueba de envío desde el formulario
- [ ] Verificar que el email llegue a `hello@bivotraining.com`
- [ ] Confirmar que NO llegue a `lluis@bivotraining.com`

---

**Última actualización**: Febrero 2025  
**Asignado a**: Erik  
**Estado**: ⏳ Pendiente de cambio en EmailJS
