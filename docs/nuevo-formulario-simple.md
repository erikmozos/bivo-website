# Nuevo Formulario Simplificado - Documentación

## Resumen de Cambios

El formulario de registro ha sido transformado de un formulario multi-paso (7 pasos) a un formulario de una sola pantalla, más rápido y orientado a la conversión de leads.

## Estructura del Nuevo Formulario

### Campos Obligatorios
- **Deporte de raqueta**: Selección única entre las siguientes opciones:
  - Pádel
  - Tenis
  - Pickleball
  - Bádminton
  - Squash
  - Tenis Playa
  - Ping Pong
- **Nombre**
- **Apellido**
- **Email**

### Campos Opcionales
- **Teléfono**

## Características Implementadas

### 1. Selección de Deporte
- Las pastillas de deporte cambian a **verde fosforescente** (`#39ff14`) cuando se seleccionan
- Solo se puede seleccionar un deporte a la vez
- El fondo cambia de gris claro a verde fosforescente con texto negro

### 2. Validación
- El formulario no se puede enviar si faltan campos obligatorios
- Al intentar enviar sin completar todos los campos obligatorios, se muestra una alerta: **"Por favor, completa todos los campos obligatorios."**
- Validación adicional de formato de email

### 3. Pantalla de Éxito
Después del envío exitoso, se muestra:
- Título: **"¡Muchas gracias por tu registro!"**
- Mensaje: **"Cuando tengamos Bivo disponible para Iphone y Android, serás de los primeros en poderla usar."**

## Estructura de Datos

El nuevo formulario envía los siguientes datos a Google Sheets:

```typescript
{
  deporteRaqueta: string,  // Ej: "Pádel", "Tenis", etc.
  nombre: string,
  apellido: string,
  email: string,
  telefono: string         // Opcional, puede estar vacío
}
```

## Actualización del Google Apps Script

Para mantener la compatibilidad con el archivo de Google Sheets existente, necesitas actualizar el script de Google Apps Script para manejar el nuevo formato de datos.

### Script Actualizado Recomendado

```javascript
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Check if it's the new simplified form format
    const isNewFormat = data.deporteRaqueta !== undefined;
    
    if (isNewFormat) {
      // New simplified form format
      sheet.appendRow([
        new Date(),                    // Timestamp
        "",                            // Sexo (vacío para nuevo formato)
        "",                            // Edad (vacío para nuevo formato)
        data.nombre || "",            // Nombre
        data.apellido || "",          // Apellido
        data.email || "",             // Email
        data.telefono || "",          // Telefono
        data.deporteRaqueta || "",    // DeportePrincipal (ahora deporteRaqueta)
        "",                            // OtrosDeportes (vacío para nuevo formato)
        "",                            // Frecuencia (vacío para nuevo formato)
        "",                            // PreparacionFisica (vacío para nuevo formato)
        "",                            // TipoPrepFisica (vacío para nuevo formato)
        "",                            // MaterialEnCasa (vacío para nuevo formato)
        "",                            // TipoEntrenamiento (vacío para nuevo formato)
        "",                            // HorarioPreferido (vacío para nuevo formato)
        "",                            // NivelExperiencia (vacío para nuevo formato)
        "",                            // ClubActual (vacío para nuevo formato)
        "",                            // ComoNosConocio (vacío para nuevo formato)
        "",                            // AceptaMarketing (vacío para nuevo formato)
        ""                             // AceptaTerminos (vacío para nuevo formato)
      ]);
    } else {
      // Old multi-step form format (mantener compatibilidad)
      sheet.appendRow([
        new Date(),                                  // Timestamp
        data.sexo || "",                            // Sexo
        data.edad || "",                            // Edad
        data.nombre || "",                          // Nombre
        data.apellido || "",                        // Apellido
        data.email || "",                           // Email
        data.telefono || "",                        // Telefono
        data.deportePrincipal || "",                // DeportePrincipal
        (data.otrosDeportes || []).join(", "),      // OtrosDeportes
        data.frecuencia || "",                      // Frecuencia
        data.preparacionFisica || "",               // PreparacionFisica
        data.tipoPrepFisica || "",                  // TipoPrepFisica
        data.materialEnCasa || "",                  // MaterialEnCasa
        (data.tipoEntrenamiento || []).join(", "),  // TipoEntrenamiento
        data.horarioPreferido || "",                // HorarioPreferido
        data.nivelExperiencia || "",                // NivelExperiencia
        data.clubActual || "",                      // ClubActual
        data.comoNosConocio || "",                  // ComoNosConocio
        data.aceptaMarketing ? "Sí" : "No",         // AceptaMarketing
        data.aceptaTerminos ? "Sí" : "No"           // AceptaTerminos
      ]);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Pasos para Actualizar el Script

1. Abre tu archivo de Google Sheets: [Formulario Leads – Google Sheets](https://docs.google.com/spreadsheets/d/your-sheet-id)
2. Ve a **Extensiones > Apps Script**
3. Reemplaza el código del `doPost` con el código actualizado de arriba
4. Guarda el script (Ctrl+S o Cmd+S)
5. Despliega como aplicación web:
   - Haz clic en **Desplegar > Nueva implementación**
   - Selecciona **Tipo: Aplicación web**
   - Ejecuta como: **Yo**
   - Quién tiene acceso: **Cualquiera**
   - Haz clic en **Desplegar**
6. Copia la URL de la aplicación web y actualízala en `src/services/formSubmission.ts` si es necesario

## Archivos Modificados

- `src/components/form/RegistrationForm.tsx` - Completamente reescrito como formulario de una sola pantalla
- `src/services/formSubmission.ts` - Sin cambios necesarios (ya funciona con el nuevo formato)

## Archivos que Ya No Se Usan (pero se mantienen por compatibilidad)

- `src/components/form/FormProgress.tsx` - Ya no se usa
- `src/components/form/formSteps/Step1Demographics.tsx` - Ya no se usa
- `src/components/form/formSteps/Step1Personal.tsx` - Ya no se usa
- `src/components/form/formSteps/Step2Sports.tsx` - Ya no se usa
- `src/components/form/formSteps/Step3PhysicalTraining.tsx` - Ya no se usa
- `src/components/form/formSteps/Step3Training.tsx` - Ya no se usa
- `src/components/form/formSteps/Step4Experience.tsx` - Ya no se usa
- `src/components/form/formSteps/Step5Final.tsx` - Ya no se usa

## Pruebas Recomendadas

1. ✅ Verificar que las pastillas de deporte cambien a verde fosforescente al seleccionarlas
2. ✅ Verificar que solo se pueda seleccionar un deporte a la vez
3. ✅ Intentar enviar el formulario sin completar campos obligatorios - debe mostrar alerta
4. ✅ Completar todos los campos obligatorios y enviar - debe funcionar correctamente
5. ✅ Verificar que los datos se guarden correctamente en Google Sheets
6. ✅ Verificar que la pantalla de éxito muestre el mensaje correcto

## Notas Importantes

- El formulario mantiene la misma URL de Google Apps Script para mantener compatibilidad
- Los registros antiguos del formulario multi-paso se mantienen en Google Sheets
- Los nuevos registros se añaden en las mismas columnas, pero con campos vacíos para los datos que ya no se recopilan
- El campo `deporteRaqueta` del nuevo formulario se guarda en la columna `DeportePrincipal` de Google Sheets

---

**Fecha de implementación**: Febrero 2025  
**Versión**: 2.0  
**Estado**: ✅ Implementado y listo para pruebas
