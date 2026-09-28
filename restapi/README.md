# 📘 Dokumentasi Arsitektur REST API & Sequence Diagram

Folder ini berisi dokumentasi resmi dan diagram urutan (**PlantUML Sequence Diagram**) yang mendokumentasikan seluruh alur kerja REST API, komunikasi antarmuka, proteksi keamanan, dan sinkronisasi data pada ekosistem web portofolio.

---

## 📂 Struktur Berkas dalam Folder `restapi/`

```
restapi/
├── DOKUMENTASI_REST_API.md                   <-- Dokumentasi Arsitektur Lengkap
├── README.md                                 <-- Panduan Cepat & Indeks Berkas
├── Portfolio_Backend_API.postman_collection.json <-- Koleksi Postman Siap Pakai (1-Click Import)
├── 01_arsitektur_global_dan_aliran_data.puml <-- Sequence Diagram Arsitektur & Interaksi Global
├── arsitektur_global_dan_aliran_data.png     <-- Gambar Visual Render Diagram 01
├── 02_alur_pengiriman_pesan_kontak.puml      <-- Sequence Diagram Pengiriman Form Kontak (/api/contact)
├── alur_pengiriman_pesan_kontak.png          <-- Gambar Visual Render Diagram 02
├── 03_alur_crud_proyek_dan_studi_kasus.puml  <-- Sequence Diagram CRUD Proyek & Detail Studi Kasus
├── alur_crud_proyek_dan_studi_kasus.png      <-- Gambar Visual Render Diagram 03
├── 04_alur_sinkronisasi_realtime_web.puml    <-- Sequence Diagram Sinkronisasi Realtime (Tanpa Refresh)
├── alur_sinkronisasi_realtime_web.png        <-- Gambar Visual Render Diagram 04
├── 05_alur_sinkronisasi_github_api.puml      <-- Sequence Diagram Integrasi GitHub REST API v3
└── alur_sinkronisasi_github_api.png          <-- Gambar Visual Render Diagram 05
```

---

## 🗺️ 1. Peta Seluruh Folder & Endpoint REST API

Sistem REST API dibagi menjadi 3 pilar utama:

```
portofolio-firman-fix/
├── portofolio-web/
│   └── src/
│       ├── app/api/                     <-- [REST API Internal Web]
│       │   └── contact/route.ts         <-- POST /api/contact (Pesan Masuk)
│       └── services/                    <-- [Consumer Data Web]
│           ├── contact.ts               <-- Mengirim form ke /api/contact
│           └── portfolio.ts             <-- Fetch data proyek, profil, skill, dll.
│
├── portofolio-admin/
│   └── frontend/
│       └── src/
│           ├── app/api/                 <-- [REST API Serverless Admin]
│           │   ├── auth/login/route.ts  <-- POST: Login Admin (Set Cookie)
│           │   ├── auth/logout/route.ts <-- POST: Logout Admin (Clear Cookie)
│           │   ├── auth/session/route.ts<-- GET: Cek status sesi login
│           │   ├── skills/route.ts      <-- GET, POST: Manajemen Skill
│           │   ├── skills/[id]/route.ts <-- PUT, DELETE: Operasi Skill per ID
│           │   ├── projects/route.ts    <-- GET, POST: Manajemen Proyek
│           │   ├── projects/[id]/route.ts<-- PUT, DELETE: Operasi Proyek per ID
│           │   ├── experiences/route.ts <-- GET, POST: Manajemen Pengalaman
│           │   ├── experiences/[id]/route.ts<-- PUT, DELETE: Pengalaman per ID
│           │   ├── messages/route.ts    <-- GET: Daftar Pesan Masuk
│           │   ├── messages/[id]/route.ts<-- PATCH, DELETE: Status Baca & Hapus
│           │   └── profile/route.ts     <-- GET, PUT: Profil & Narasi Hero/About
│           └── lib/api/                 <-- [Client API & External Integrator]
│               ├── github.ts            <-- Konsumen GitHub REST API v3
│               ├── projects.ts          <-- Handler CRUD Proyek & Studi Kasus
│               ├── skills.ts            <-- Handler CRUD Keahlian
│               ├── experiences.ts       <-- Handler CRUD Pengalaman
│               ├── messages.ts          <-- Handler Pesan Pengunjung
│               └── profile.ts           <-- Handler Pengaturan Profil
│
└── restapi/                             <-- [Dokumentasi & PlantUML Diagram]
```

---

## 🌐 2. Spesifikasi Lengkap Endpoint REST API

### 1. `POST /api/contact` (Di `portofolio-web`)
* **File**: `portofolio-web/src/app/api/contact/route.ts`
* **Fungsi**: Menerima pesan dari formulir kontak publik, menyaring spam/bot, melakukan validasi email & panjang pesan, lalu menyimpannya ke database.
* **Keamanan**:
  1. **Rate Limiting**: Maksimal **4 pesan per 10 menit per IP address**. Request ke-5 akan diblokir dengan kode HTTP `429 Too Many Requests`.
  2. **Honeypot Trap**: Memeriksa input tersembunyi `botField`. Jika terisi (diisi oleh skrip bot otomatis), server langsung mengembalikan `200 OK` palsu agar bot tertipu tanpa mencemari database.
  3. **Regex Email Validation**: Menguji format email valid dengan ekspresi reguler berstandar RFC.

#### Contoh Request Body (JSON):
```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "subject": "Penawaran Kolaborasi Proyek",
  "message": "Halo Firman, saya tertarik dengan portofolio web yang Anda bangun...",
  "botField": ""
}
```

#### Contoh Response:
```json
// Berhasil (HTTP 200 OK):
{
  "success": true,
  "message": "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya."
}

// Terkena Rate Limit (HTTP 429 Too Many Requests):
{
  "success": false,
  "error": "Terlalu banyak permintaan pesan. Silakan tunggu 10 menit sebelum mencoba lagi."
}
```

---

### 2. Endpoint Autentikasi Admin (`portofolio-admin`)
* **`POST /api/auth/login`**: Memvalidasi password admin. Jika valid, membuat token sesi terenkripsi yang disimpan dalam **HTTP-Only Cookie** (aman dari serangan XSS).
* **`POST /api/auth/logout`**: Menghapus cookie sesi dari browser admin.
* **`GET /api/auth/session`**: Memeriksa apakah admin saat ini berstatus login aktif.

---

### 3. Endpoint Manajemen Proyek & Detail Studi Kasus (`portofolio-admin`)
* **`GET /api/projects`**: Mengambil seluruh daftar proyek aktif.
* **`POST /api/projects`**: Menambahkan proyek baru beserta data studi kasusnya.
* **`PUT /api/projects/[id]`**: Memperbarui informasi proyek dan detail studi kasus.
* **`DELETE /api/projects/[id]`**: Menghapus proyek dari sistem.

#### Struktur Data Proyek & Studi Kasus:
```typescript
{
  id: "kontrakan-pa-iman",
  title: "Kontrakan Pa Iman",
  subtitle: "Sistem Manajemen Kost Digital Modern & Responsif",
  category: "Web App",
  year: "2026",
  featured: true,
  description: "Aplikasi web Full-Stack Digital Management...",       // Ringkasan kartu depan web
  longDescription: "Kontrakan Pa Iman adalah aplikasi web...",       // Overview Studi Kasus (/projects/[id])
  highlights: [                                                      // Kemampuan Sistem Checklist
    "Dashboard Ringkasan Real-Time dengan 4 Stat Card interaktif",
    "Manajemen Unit Kamar dengan Instant Search",
    "Manajemen Penghuni & Histori Transaksi"
  ],
  metrics: "Full-Stack • Real-time Stats • PWA Ready",               // Sorotan Cepat
  tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  image: "/projects/manajemen-kontrakan.png",
  demoUrl: "https://manajemen-kontrakan-iman.vercel.app/",
  githubUrl: "https://github.com/moch-firmansyahh/manajemen-kost-v2"
}
```

---

### 4. Integrasi GitHub REST API v3
* **File**: `portofolio-admin/frontend/src/lib/api/github.ts`
* **Endpoint Eksternal**:
  - `GET https://api.github.com/users/moch-firmansyahh`: Mengambil total repositori publik, followers, avatar, dan bio.
  - `GET https://api.github.com/users/moch-firmansyahh/repos?per_page=100&sort=updated`: Mengambil daftar repositori publik, menghitung total akumulasi bintang (*stargazers*), dan mendeteksi bahasa pemrograman baru untuk diimpor ke tab Skills.

---

## 📊 3. Daftar File Diagram PlantUML (`.puml`)

Dalam folder ini tersedia 5 berkas PlantUML yang menggambarkan setiap skenario:

1. **[`01_arsitektur_global_dan_aliran_data.puml`](./01_arsitektur_global_dan_aliran_data.puml)**:
   Diagram arsitektur end-to-end yang memperlihatkan interaksi antara Pengunjung Web, Serverless API Routes, PostgreSQL Database, Dashboard Admin, dan GitHub API.
2. **[`02_alur_pengiriman_pesan_kontak.puml`](./02_alur_pengiriman_pesan_kontak.puml)**:
   Diagram sekuens mendalam untuk endpoint `/api/contact`, memperlihatkan alur rate limiting (429), honeypot trap, validasi masukan (400), penyimpanan database (201), dan animasi confetti.
3. **[`03_alur_crud_proyek_dan_studi_kasus.puml`](./03_alur_crud_proyek_dan_studi_kasus.puml)**:
   Diagram alur pengoperasian **Detail Studi Kasus**, dari tombol aksi tabel, modal pratinjau `CaseStudyModal.tsx`, pengeditan di `ProjectModal.tsx`, hingga pembaruan halaman publik `/projects/[id]`.
4. **[`04_alur_sinkronisasi_realtime_web.puml`](./04_alur_sinkronisasi_realtime_web.puml)**:
   Diagram alur mekanisme pembaruan otomatis tanpa refresh menggunakan **Supabase Realtime (WebSocket)** pada seluruh bagian website (`Footer`, `Hero`, `About`, `Skills`, dll.).
5. **[`05_alur_sinkronisasi_github_api.puml`](./05_alur_sinkronisasi_github_api.puml)**:
   Diagram sekuens interaksi dengan GitHub REST API v3, pemrosesan akumulasi bintang, deteksi bahasa pemrograman, dan dialog konfirmasi impor data.

---

## 🎨 4. Cara Melihat / Render Diagram PlantUML

Anda dapat membuka dan melihat diagram `.puml` dengan cara-cara berikut:

### Opsi A: Menggunakan Ekstensi VS Code / Antigravity IDE (Paling Mudah)
1. Pasang ekstensi **PlantUML** (`jebbs.plantuml`) di IDE.
2. Buka salah satu file `.puml` di atas.
3. Tekan tombol pintas `Alt + D` untuk langsung melihat preview diagram secara visual di panel samping.

### Opsi B: Menggunakan Layanan Online (Tanpa Pasang Ekstensi)
1. Salin seluruh isi teks dari salah satu file `.puml`.
2. Buka situs [PlantText.com](https://www.planttext.com/) atau [PlantUML Web Server](http://www.plantuml.com/plantuml/uml/).
3. Tempelkan kode dan klik **Submit / Refresh** untuk melihat atau mengunduh gambarnya (PNG / SVG).

---

## 📑 5. Daftar Kode Status HTTP (HTTP Response Codes)

| Kode HTTP | Nama Status | Kapan Digunakan di Aplikasi Ini? |
| :---: | :--- | :--- |
| **`200`** | `OK` | Data berhasil diambil (GET), atau operasi update/kirim pesan berhasil diproses. |
| **`201`** | `Created` | Entitas baru berhasil dibuat dan disimpan ke database (proyek baru, skill baru, pesan baru). |
| **`400`** | `Bad Request` | Payload yang dikirim klien tidak lengkap atau format salah (misal: email tidak sesuai regex). |
| **`401`** | `Unauthorized` | Klien mencoba mengakses rute admin tanpa session cookie yang valid. |
| **`404`** | `Not Found` | Proyek atau studi kasus dengan ID yang diminta tidak ditemukan di sistem. |
| **`429`** | `Too Many Requests` | Pengunjung mengirim form kontak melebihi batas rate limit (lebih dari 4 kali dalam 10 menit). |
| **`500`** | `Internal Server Error` | Terjadi kegagalan jaringan atau kendala internal pada server database. |
