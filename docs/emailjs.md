# Configuración de EmailJS para el Formulario de Contacto

Este documento explica cómo configurar EmailJS para permitir que el formulario de contacto envíe emails sin necesidad de un backend.

## ¿Qué es EmailJS?

EmailJS es un servicio que permite enviar emails directamente desde el código JavaScript del cliente, sin necesidad de un servidor backend. Es ideal para formularios de contacto en sitios web estáticos como el nuestro.

## Paso 1: Crear una cuenta en EmailJS

1. Visita [EmailJS.com](https://www.emailjs.com/) y regístrate para obtener una cuenta gratuita
2. El plan gratuito incluye:
   - 200 emails por mes
   - Soporte para múltiples plantillas
   - No requiere tarjeta de crédito

## Paso 2: Configurar un servicio de email

1. Inicia sesión en tu dashboard de EmailJS
2. Ve a "Email Services" (Servicios de Email) y haz clic en "Add New Service" (Agregar Nuevo Servicio)
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. Una vez configurado, verás un `Service ID` - guárdalo para usarlo más tarde

## Paso 3: Crear una plantilla de email

1. Ve a la sección "Email Templates" (Plantillas de Email)
2. Haz clic en "Create New Template" (Crear Nueva Plantilla)
3. Diseña tu plantilla con el siguiente formato recomendado:

```
Asunto: Nuevo mensaje de contacto de {{from_name}}

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}
```

4. Guarda la plantilla y anota el `Template ID` que se te asignará

## Paso 4: Obtener tu Public Key

1. Ve a la sección "Account" (Cuenta)
2. Busca tu "API Keys" (Claves API)
3. Copia tu "Public Key" (Clave Pública)

## Paso 5: Actualizar el código del formulario de contacto

Abre el archivo `src/components/sections/ContactSection.tsx` y reemplaza las siguientes líneas:

```typescript
// EmailJS configuration
const serviceId = "YOUR_EMAILJS_SERVICE_ID"; // Replace with your actual service ID
const templateId = "YOUR_EMAILJS_TEMPLATE_ID"; // Replace with your actual template ID
const publicKey = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your actual public key
```

Con tus datos reales:

```typescript
// EmailJS configuration
const serviceId = "service_abc123"; // Tu Service ID de EmailJS
const templateId = "template_xyz789"; // Tu Template ID de EmailJS
const publicKey = "uV-YourPublicKey123"; // Tu Public Key de EmailJS
```

## Paso 6: Probar el formulario

1. Ejecuta tu aplicación en desarrollo (`npm run dev`)
2. Navega hasta el formulario de contacto
3. Completa todos los campos y envía el formulario
4. Verifica en tu email que recibiste el mensaje correctamente

## Consideraciones de seguridad

- Es seguro incluir tu Public Key en el código del cliente
- Sin embargo, para mayor seguridad, considera usar variables de entorno para almacenar estas claves
- Ejemplo:
  ```typescript
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  ```

## Solución de problemas

Si tienes problemas con el envío de emails:

1. Verifica la consola del navegador para ver errores detallados
2. Asegúrate de que tus IDs (Service, Template y Public Key) sean correctos
3. Revisa los límites de tu plan gratuito (200 emails/mes)
4. Verifica que tu servicio de email esté correctamente conectado en EmailJS

## Referencias

- [Documentación oficial de EmailJS](https://www.emailjs.com/docs/)
- [Ejemplos de integración](https://www.emailjs.com/docs/examples/reactjs/)
- [Guía de plantillas](https://www.emailjs.com/docs/user-guide/creating-email-templates/) 