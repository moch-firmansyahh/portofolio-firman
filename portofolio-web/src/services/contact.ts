import type { ContactMessagePayload, ContactApiResponse } from "@/types/contact";

/**
 * Mengirim pesan kontak ke endpoint aman /api/contact
 * Tidak lagi memanggil Supabase secara langsung dari client
 */
export async function sendContactMessage(
  payload: ContactMessagePayload
): Promise<ContactApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ContactApiResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Gagal mengirim pesan (Status ${response.status}).`,
      };
    }

    return {
      success: true,
      message: data.message || "Pesan Anda berhasil dikirim!",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Terjadi gangguan jaringan.";
    return {
      success: false,
      error: `Koneksi gagal: ${message}. Silakan periksa jaringan Anda.`,
    };
  }
}
