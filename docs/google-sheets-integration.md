# Integración del Formulario de Registro con Google Sheets

Este documento explica cómo está implementada la integración del formulario de registro con Google Sheets a través de Google Apps Script para almacenar las respuestas del formulario sin necesidad de un backend tradicional.

## Visión General

Nuestro formulario de registro (`RegistrationForm.tsx`) envía datos directamente a una hoja de cálculo de Google Sheets utilizando Google Apps Script. Esta solución es:

- **Gratuita**: No requiere servicios de backend pagados
- **Simple**: No requiere mantenimiento de servidores
- **Segura**: No expone credenciales sensibles
- **Escalable**: Permite hasta 20,000 solicitudes por día en el plan gratuito

## Componentes de la Solución

La integración está compuesta por tres componentes principales:

1. **Formulario de Registro React**: Componente que recopila los datos del usuario
2. **Servicio de Envío de Formularios**: Servicio JavaScript que maneja el envío de datos
3. **Google Apps Script**: Script alojado en Google que recibe los datos y los escribe en una hoja de cálculo

## 1. Configuración de Google Sheets y Apps Script

### Paso 1: Crear una Hoja de Cálculo de Google

1. Crea una nueva hoja de cálculo en [Google Sheets](https://sheets.google.com)
2. Agrega los siguientes encabezados en la fila 1 para todos los campos del formulario:

```
Timestamp | Sexo | Edad | Nombre | Apellido | Email | Telefono | DeportePrincipal | OtrosDeportes | Frecuencia | PreparacionFisica | TipoPrepFisica | MaterialEnCasa | TipoEntrenamiento | HorarioPreferido | NivelExperiencia | ClubActual | ComoNosConocio | AceptaMarketing | AceptaTerminos
```

### Paso 2: Configurar Google Apps Script

1. En tu hoja de cálculo, ve a **Extensiones > Apps Script**
2. Reemplaza el código predeterminado con el siguiente:

```javascript
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add a row with all form data
    sheet.appendRow([
      new Date(),                                  // Timestamp
      
      // Demographics
      data.sexo || "",                            // Sexo
      data.edad || "",                            // Edad
      
      // Personal info
      data.nombre || "",                          // Nombre
      data.apellido || "",                        // Apellido
      data.email || "",                           // Email
      data.telefono || "",                        // Telefono
      
      // Sports preferences
      data.deportePrincipal || "",                // DeportePrincipal
      (data.otrosDeportes || []).join(", "),      // OtrosDeportes
      data.frecuencia || "",                      // Frecuencia
      
      // Physical Training
      data.preparacionFisica || "",               // PreparacionFisica
      data.tipoPrepFisica || "",                  // TipoPrepFisica
      data.materialEnCasa || "",                  // MaterialEnCasa
      
      // Training preferences
      (data.tipoEntrenamiento || []).join(", "),  // TipoEntrenamiento
      data.horarioPreferido || "",                // HorarioPreferido
      
      // Experience
      data.nivelExperiencia || "",                // NivelExperiencia
      data.clubActual || "",                      // ClubActual
      
      // Marketing
      data.comoNosConocio || "",                  // ComoNosConocio
      data.aceptaMarketing ? "Sí" : "No",         // AceptaMarketing
      
      // Terms
      data.aceptaTerminos ? "Sí" : "No"           // AceptaTerminos
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error and return error response
    console.error("Error processing form submission: " + error.message);
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'message': error.message 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Add this function to handle GET requests for testing
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ 'status': 'The API is working!' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Guarda el proyecto con un nombre descriptivo (por ejemplo, "Bivo Form Handler")

### Paso 3: Implementar el Apps Script como Aplicación Web

1. Haz clic en **Implementar > Nueva implementación**
2. Selecciona **Aplicación web** como tipo
3. Asigna una descripción como "Bivo Registration Form Handler"
4. Configura **Ejecutar como** en "Yo" (tu cuenta)
5. Configura **Quién tiene acceso** en "Cualquier persona"
6. Haz clic en **Implementar**
7. Copia la URL de la aplicación web que se genera (se verá como `https://script.google.com/macros/s/XXXXXXX/exec`)

## 2. Servicio de Envío de Formularios

El servicio de envío de formularios (`formSubmission.ts`) está implementado para manejar la comunicación con Google Apps Script:

```typescript
// src/services/formSubmission.ts
import { FormData } from "../components/form/RegistrationForm";

export async function submitToGoogleSheets(formData: FormData) {
  // Google Apps Script Web App URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbxjYF7iacx0r_bY1bKh1mGcqqmxs5yaYG37YYkBik4ROUeRsQpEktC3Hlo40FUQHVI5sg/exec";
  
  // Check if we're in production (deployed on Vercel)
  const isProduction = window.location.hostname.includes('vercel.app') || 
                      !window.location.hostname.includes('localhost');
  
  try {
    // In production, directly use no-cors to avoid the CORS error completely
    if (isProduction) {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      // Since we can't read the response in no-cors mode,
      // we'll just assume success
      return true;
    } else {
      // In development, try regular CORS first
      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        const result = await response.json();
        return result.result === 'success';
      } catch (corsError) {
        console.log("CORS error, falling back to no-cors mode");
        
        // Fall back to no-cors mode
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        // Since we can't read the response in no-cors mode,
        // we'll just assume success
        return true;
      }
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
}

// Alias for backward compatibility
export async function submitFormToGoogleSheets(formData: FormData) {
  return submitToGoogleSheets(formData);
}
```

## 3. Implementación en el Formulario de Registro

El formulario de registro (`RegistrationForm.tsx`) utiliza el servicio de envío para mandar los datos a Google Sheets:

```tsx
// src/components/form/RegistrationForm.tsx
import { submitToGoogleSheets } from "../../services/formSubmission";

// ... other imports and code ...

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(false);
  
  try {
    // Submit to Google Sheets using Apps Script
    const success = await submitToGoogleSheets(formData);
    
    if (success) {
      console.log("Form submitted successfully:", formData);
      setSubmitSuccess(true);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitError(true);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 4. Gestión de CORS

Google Apps Script tiene limitaciones con CORS (Cross-Origin Resource Sharing) que pueden causar problemas al enviar datos desde dominios diferentes. Nuestra implementación maneja esto de dos formas:

1. **En desarrollo (localhost)**: Intenta primero con CORS normal, y si falla, utiliza el modo `no-cors`
2. **En producción**: Utiliza directamente el modo `no-cors` para evitar errores

El modo `no-cors` tiene la desventaja de que no podemos leer la respuesta del servidor, pero los datos aún se envían correctamente a Google Sheets.

## 5. Estructura de Datos del Formulario

La interfaz `FormData` define todos los campos que se recopilan en el formulario:

```typescript
export interface FormData {
  // Demographics
  sexo: string;
  edad: string;
  
  // Personal info
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  
  // Sports preferences
  deportePrincipal: string;
  otrosDeportes: string[];
  frecuencia: string;
  
  // Physical Training
  preparacionFisica: string;
  tipoPrepFisica: string;
  materialEnCasa: string;
  
  // Training preferences
  tipoEntrenamiento: string[];
  horarioPreferido: string;
  
  // Experience
  nivelExperiencia: string;
  clubActual: string;
  
  // Marketing
  comoNosConocio: string;
  aceptaMarketing: boolean;
  
  // Terms
  aceptaTerminos: boolean;
}
```

## 6. Mantenimiento y Solución de Problemas

### Acceso a los Datos

Los datos enviados se pueden acceder de las siguientes formas:

1. Directamente en la hoja de cálculo de Google Sheets
2. Exportando los datos a CSV, Excel u otros formatos
3. Utilizando la API de Google Sheets para integraciones más avanzadas

### Solución de Problemas Comunes

1. **Errores de CORS**: Si aparecen en la consola del navegador, verifica que el modo `no-cors` esté habilitado
2. **Datos no aparecen en la hoja**: Verifica que la URL del script en `formSubmission.ts` sea correcta
3. **Errores en el formato de datos**: Verifica que la estructura de datos enviada coincida con lo que espera el Apps Script

### Límites a Considerar

- Google Apps Script tiene un límite de 20,000 solicitudes por día
- Cada ejecución tiene un tiempo límite de 30 segundos
- La hoja de cálculo puede almacenar hasta 5 millones de celdas

## 7. Actualizaciones y Modificaciones

### Agregar Nuevos Campos al Formulario

1. Actualiza la interfaz `FormData` en `RegistrationForm.tsx`
2. Agrega el nuevo campo en la hoja de cálculo de Google
3. Actualiza el script de Google Apps Script para incluir el nuevo campo en `sheet.appendRow()`

### Cambiar la URL del Script

Si necesitas reimplementar el Apps Script, recuerda actualizar la URL en `formSubmission.ts`:

```typescript
const scriptUrl = "TU_NUEVA_URL_AQUÍ";
```

## 8. Seguridad y Privacidad

- Los datos se almacenan en Google Sheets, que está protegido por tu cuenta de Google
- No se almacenan credenciales sensibles en el código del frontend
- Considera implementar alguna forma de protección contra spam (como reCAPTCHA)
- Asegúrate de tener una política de privacidad que mencione cómo se almacenan los datos 