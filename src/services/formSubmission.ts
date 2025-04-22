import { FormData } from "../components/form/RegistrationForm";

export async function submitToGoogleSheets(formData: FormData) {
  // Google Apps Script Web App URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbxjYF7iacx0r_bY1bKh1mGcqqmxs5yaYG37YYkBik4ROUeRsQpEktC3Hlo40FUQHVI5sg/exec";
  
  try {
    // First try with regular CORS
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