import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// Simple in-memory rate limiter per IP address
// Menyimpan riwayat timestamp pengiriman untuk tiap IP
interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 menit
const MAX_REQUESTS_PER_WINDOW = 4; // Maksimal 4 pesan per 10 menit per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { timestamps: [] };

  // Bersihkan timestamp yang sudah melewati batas window
  const validTimestamps = entry.timestamps.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, { timestamps: validTimestamps });
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: validTimestamps });
  return false;
}

// Regex validasi format email standar
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Ekstrak IP klien untuk Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Terlalu banyak pesan terkirim dari perangkat Anda. Silakan tunggu beberapa menit sebelum mencoba lagi.",
        },
        { status: 429 }
      );
    }

    // 2. Parse body request
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Payload data tidak valid (format JSON rusak)." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, botField } = body;

    // 3. Honeypot check (mendeteksi spam bot)
    if (botField && String(botField).trim().length > 0) {
      console.warn("🤖 Bot terdeteksi lewat honeypot trap:", { ip, botField });
      // Beri respons sukses palsu agar bot mengira sukses tapi tidak disimpan ke DB
      return NextResponse.json(
        { success: true, message: "Pesan Anda berhasil diterima." },
        { status: 200 }
      );
    }

    // 4. Server-Side Validasi Input
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanSubject = typeof subject === "string" ? subject.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Nama wajib diisi dan memiliki panjang 2 hingga 100 karakter.",
        },
        { status: 400 }
      );
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 120) {
      return NextResponse.json(
        {
          success: false,
          error: "Alamat email tidak valid. Masukkan format email yang benar.",
        },
        { status: 400 }
      );
    }

    if (cleanSubject && cleanSubject.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Subjek pesan maksimal 150 karakter.",
        },
        { status: 400 }
      );
    }

    if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          error: "Isi pesan wajib diisi dan memiliki panjang 5 hingga 3000 karakter.",
        },
        { status: 400 }
      );
    }

    // 5. Simpan ke database Supabase
    // Coba insert dengan subject terlebih dahulu
    const payloadWithSubject: Record<string, unknown> = {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      status: "unread",
    };

    if (cleanSubject) {
      payloadWithSubject.subject = cleanSubject;
    }

    let insertRes = await supabase.from("messages").insert([payloadWithSubject]);

    // Jika skema tabel Supabase belum memiliki kolom 'subject', fallback insert tanpa subject
    if (insertRes.error && insertRes.error.message.includes("subject")) {
      delete payloadWithSubject.subject;
      insertRes = await supabase.from("messages").insert([payloadWithSubject]);
    }

    if (insertRes.error) {
      console.error("Gagal insert pesan ke Supabase:", insertRes.error);
      return NextResponse.json(
        {
          success: false,
          error: "Gagal menyimpan pesan ke database. Silakan coba kembali nanti.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal API error di /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal pada server saat memproses pesan.",
      },
      { status: 500 }
    );
  }
}
