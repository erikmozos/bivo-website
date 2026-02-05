import { FormData } from "../components/form/RegistrationForm";

export async function submitToGoogleSheets(formData: FormData) {
  // Google Apps Script Web App URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbxjYF7iacx0r_bY1bKh1mGcqqmxs5yaYG37YYkBik4ROUeRsQpEktC3Hlo40FUQHVI5sg/exec";
  
  // Check if it's the new simplified form format (has deporteRaqueta)
  const isNewFormat = 'deporteRaqueta' in formData && formData.deporteRaqueta !== undefined;
  
  // Map new form data to the format expected by Google Apps Script
  let dataToSend: any;
  
  if (isNewFormat) {
    // New simplified form - map to old format for compatibility
    dataToSend = {
      deportePrincipal: formData.deporteRaqueta || "",
      nombre: formData.nombre || "",
      apellido: formData.apellido || "",
      email: formData.email || "",
      telefono: formData.telefono || "",
      // Set empty values for fields not in new form
      sexo: "",
      edad: "",
      otrosDeportes: [],
      frecuencia: "",
      preparacionFisica: "",
      tipoPrepFisica: "",
      materialEnCasa: "",
      tipoEntrenamiento: [],
      horarioPreferido: "",
      nivelExperiencia: "",
      clubActual: "",
      comoNosConocio: "",
      aceptaMarketing: false,
      aceptaTerminos: false
    };
  } else {
    // Old format - send as is
    dataToSend = formData;
  }
  
  // Check if we're in production (deployed on Vercel)
  const isProduction = window.location.hostname.includes('vercel.app') || 
                      !window.location.hostname.includes('localhost');
  
  try {
    // In production, directly use no-cors to avoid the CORS error completely
    if (isProduction) {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(dataToSend),
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
          body: JSON.stringify(dataToSend),
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
          body: JSON.stringify(dataToSend),
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

// Keep the existing Google Sheets function for backward compatibility
export async function submitFormToGoogleSheets(formData: FormData) {
  return submitToGoogleSheets(formData);
}

export async function submitFormToAirtable(formData: FormData) {
  const AIRTABLE_API_KEY = "YOUR_AIRTABLE_API_KEY";
  const AIRTABLE_BASE_ID = "YOUR_BASE_ID";
  const TABLE_NAME = "Form Responses";
  
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          "Nombre": formData.nombre,
          "Apellido": formData.apellido,
          "Email": formData.email,
          // Map other fields
        }
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting to Airtable:", error);
    throw error;
  }
} 