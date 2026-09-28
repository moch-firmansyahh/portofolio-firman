export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  botField?: string; // Honeypot field
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
