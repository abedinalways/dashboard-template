interface ApiErrorData {
  message?: string | string[];
  error?: string;
  errors?: Record<string, string[] | string>;
  title?: string;
}

/**
 * Extracts a human-readable error message from arbitrary API errors (RTK Query, Axios, Error).
 */
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred."): string {
  if (!error) return fallbackMessage;

  if (typeof error === "string") return error;

  if (typeof error === "object") {
    // RTK Query error with status and data
    const rtkError = error as { data?: ApiErrorData; message?: string; status?: number | string };

    if (rtkError.data) {
      const data = rtkError.data;

      if (typeof data.message === "string") return data.message;
      if (Array.isArray(data.message) && data.message.length > 0) return data.message.join(", ");
      if (typeof data.error === "string") return data.error;
      if (typeof data.title === "string") return data.title;

      // Validation errors dictionary
      if (data.errors && typeof data.errors === "object") {
        const firstField = Object.values(data.errors)[0];
        if (Array.isArray(firstField) && firstField[0]) return firstField[0];
        if (typeof firstField === "string") return firstField;
      }
    }

    if (typeof rtkError.message === "string") return rtkError.message;
  }

  if (error instanceof Error) return error.message;

  return fallbackMessage;
}
