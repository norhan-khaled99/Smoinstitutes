import { Notify } from "quasar";

export const handleApiError = (error, defaultMessage = "An unexpected error occurred.") => {
  console.log(error);
  const responseData = error.response?.data;
  let errorMessage = defaultMessage;
  
  if (responseData) {
    if (responseData.message) {
      errorMessage = responseData.message;
    }
    const errors = responseData.errors;
    if (errors) {
      const extractedMessages = [];

      for (const [key, value] of Object.entries(errors)) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (typeof v === "string") {
              // Handle cases where the backend sends a Python-like stringified error dict
              // e.g., "{'paper_no': [ErrorDetail(string='A valid integer is required.', code='invalid')]}"
              if (v.includes("ErrorDetail(string=")) {
                const regex = /['"]([^'"]+)['"]\s*:\s*\[?\s*ErrorDetail\(\s*string=(['"])(.*?)\2/g;
                let match;
                let foundAny = false;
                while ((match = regex.exec(v)) !== null) {
                  foundAny = true;
                  const parsedKey = match[1];
                  const parsedMsg = match[3];
                  extractedMessages.push(`<li><b>${parsedKey}</b> : ${parsedMsg}</li>`);
                }
                if (!foundAny) {
                  // Fallback
                  extractedMessages.push(`<li><b>${key}</b> : ${v}</li>`);
                }
              } else {
                // Regular string error message
                if (key === "__all__" || key === "non_field_errors") {
                  extractedMessages.push(`<li>${v}</li>`);
                } else {
                  extractedMessages.push(`<li><b>${key}</b> : ${v}</li>`);
                }
              }
            } else {
               extractedMessages.push(`<li><b>${key}</b> : ${JSON.stringify(v)}</li>`);
            }
          });
        } else if (typeof value === "string") {
            extractedMessages.push(`<li><b>${key}</b> : ${value}</li>`);
        } else {
           extractedMessages.push(`<li><b>${key}</b> : ${JSON.stringify(value)}</li>`);
        }
      }

      const fieldMessages = extractedMessages.join("");
        
      if (fieldMessages) {
        errorMessage = `<div style="font-weight: bold; margin-bottom: 5px;">${errorMessage}</div><ul style="margin: 0; padding-left: 20px;">${fieldMessages}</ul>`;
      }
    }
  }
  
  Notify.create({
    html: true,
    badgeStyle: "display:none",
    classes: "custom-Notify bg-white",
    textColor: "red-5",
    position: "bottom-right",
    message: errorMessage,
  });
};
