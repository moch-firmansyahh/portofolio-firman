# 📘 Dokumentasi Lengkap Arsitektur REST API, Alur Sistem & Diagram Sekuens

Dokumentasi ini menyajikan arsitektur **REST API**, alur komunikasi data antara **`portofolio-web`** dan **`portofolio-admin`**, manajemen **Detail Studi Kasus**, sinkronisasi ke **GitHub API v3**, mekanisme **Realtime WebSocket (tanpa refresh)**, serta daftar diagram urutan (**Sequence Diagram**) berbasis **PlantUML**.

> [!TIP]
> Folder khusus [**`restapi/`**](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/) telah dibuat lengkap dengan berkas diagram PlantUML (`.puml`) yang dapat Anda buka langsung di IDE menggunakan ekstensi PlantUML atau di situs [PlantText](https://www.planttext.com/).

---

## 🗺️ 1. Peta Lokasi Seluruh Folder & Berkas REST API

Dalam ekosistem proyek ini, REST API dan pengolahan data dibagi menjadi:

```
portofolio-firman-fix/
├── restapi/                             <-- [Folder Khusus Dokumentasi & Diagram PlantUML]
│   ├── DOKUMENTASI_REST_API.md          <-- Berkas Dokumentasi Ini
│   ├── README.md                        <-- Panduan Cepat & Indeks Berkas
│   ├── 01_arsitektur_global_dan_aliran_data.puml
│   ├── arsitektur_global_dan_aliran_data.png
│   ├── 02_alur_pengiriman_pesan_kontak.puml
│   ├── alur_pengiriman_pesan_kontak.png
│   ├── 03_alur_crud_proyek_dan_studi_kasus.puml
│   ├── alur_crud_proyek_dan_studi_kasus.png
│   ├── 04_alur_sinkronisasi_realtime_web.puml
│   ├── alur_sinkronisasi_realtime_web.png
│   ├── 05_alur_sinkronisasi_github_api.puml
│   └── alur_sinkronisasi_github_api.png
│
├── portofolio-web/                      <-- [Website Publik Portofolio]
│   └── src/
│       ├── app/
│       │   ├── api/contact/route.ts     <-- Endpoint: POST /api/contact (Rate Limit + Honeypot)
│       │   └── projects/[id]/page.tsx   <-- Halaman Publik Detail Studi Kasus Proyek
│       ├── components/
│       │   ├── layout/Footer.tsx        <-- Realtime sync nama panggilan (shortName)
│       │   ├── sections/ProjectsSection.tsx <-- Tombol "Lihat Detail Studi Kasus"
│       │   └── sections/ContactSection.tsx  <-- Formulir kontak terproteksi
│       └── services/
│           ├── contact.ts               <-- Client fetcher untuk POST /api/contact
│           └── portfolio.ts             <-- Data fetcher profil, proyek, keahlian, & pengalaman
│
└── portofolio-admin/                    <-- [Dashboard Pengelola CMS]
    └── frontend/src/
        ├── app/
        │   ├── page.tsx                 <-- Dashboard Utama & State Management
        │   └── api/                     <-- [Next.js Route Handlers Serverless Admin]
        │       ├── auth/login/route.ts  <-- POST: Login Admin (Session Cookie)
        │       ├── auth/logout/route.ts <-- POST: Logout Admin (Clear Cookie)
        │       ├── auth/session/route.ts<-- GET: Status sesi login
        │       ├── projects/route.ts    <-- GET, POST: CRUD Proyek & Studi Kasus
        │       ├── projects/[id]/route.ts<-- PUT, DELETE: Edit / Hapus Proyek
        │       ├── skills/route.ts      <-- GET, POST: CRUD Keahlian
        │       ├── experiences/route.ts <-- GET, POST: CRUD Riwayat Karier & Edukasi
        │       ├── messages/route.ts    <-- GET: Membaca Pesan Kontak Masuk
        │       └── profile/route.ts     <-- GET, PUT: Profil & Narasi
        ├── components/
        │   ├── modals/
        │   │   ├── ProjectModal.tsx     <-- Modal Input Proyek dengan Tab "2. Detail Studi Kasus"
        │   │   └── CaseStudyModal.tsx   <-- Modal Pratinjau Cepat Studi Kasus
        │   └── tabs/
        │       └── ProjectsTab.tsx      <-- Tabel Proyek dengan Tombol "Detail Studi Kasus"
        └── lib/api/
            ├── github.ts                <-- Konsumen GitHub REST API v3
            ├── projects.ts              <-- Operasi Database Proyek & Studi Kasus
            └── profile.ts               <-- Operasi Database Profil
```

---

## 🌐 2. Endpoint REST API di `portofolio-web`

### Endpoint: `POST /api/contact`
* **File Lokasi**: [`portofolio-web/src/app/api/contact/route.ts`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/portofolio-web/src/app/api/contact/route.ts)
* **Tujuan**: Menerima pesan pengunjung dari form kontak, memfilter bot, melindungi server dari spam, lalu menyimpannya ke database.
* **Diagram Sekuens**: Lihat berkas [`restapi/02_alur_pengiriman_pesan_kontak.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/02_alur_pengiriman_pesan_kontak.puml)

#### Bedah Alur Kode:
```typescript
// 1. Rate Limiting (Maksimal 4 pesan per 10 menit per IP)
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 4;

const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous-client";
if (isRateLimited(ip)) {
  return NextResponse.json(
    { success: false, error: "Terlalu banyak permintaan pesan. Tunggu 10 menit." },
    { status: 429 } // 429 Too Many Requests
  );
}

// 2. Honeypot Trap (Field 'botField' disembunyikan dengan CSS)
// Hanya script bot otomatis yang mengisi field tersembunyi ini.
if (botField && String(botField).trim().length > 0) {
  // Berikan respons sukses palsu agar bot tertipu dan tidak mengulang serangan
  return NextResponse.json({ success: true, message: "Pesan Anda berhasil diterima." }, { status: 200 });
}

// 3. Server-Side Validation
if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
  return NextResponse.json({ success: false, error: "Alamat email tidak valid." }, { status: 400 });
}

// 4. Simpan ke Database
await supabase.from("messages").insert([payloadWithSubject]);
return NextResponse.json({ success: true, message: "Pesan Anda berhasil dikirimkan!" }, { status: 200 });
```

---

## 🛠️ 3. Endpoint REST API di `portofolio-admin`

Seluruh endpoint pada `portofolio-admin` dibangun dengan **Next.js App Router Route Handlers**.

| Endpoint | File Lokasi | HTTP Method | Penjelasan & Fungsi |
| :--- | :--- | :---: | :--- |
| `/api/auth/login` | `frontend/src/app/api/auth/login/route.ts` | `POST` | Autentikasi pengelola & pembuatan session cookie HTTP-only. |
| `/api/auth/logout` | `frontend/src/app/api/auth/logout/route.ts` | `POST` | Menghapus cookie sesi saat pengelola logout. |
| `/api/auth/session` | `frontend/src/app/api/auth/session/route.ts` | `GET` | Memverifikasi apakah session cookie masih valid. |
| `/api/projects` | `frontend/src/app/api/projects/route.ts` | `GET`, `POST` | `GET`: Daftar proyek. `POST`: Menambah proyek & studi kasus baru. |
| `/api/projects/[id]`| `frontend/src/app/api/projects/[id]/route.ts` | `PUT`, `DELETE` | `PUT`: Update proyek & studi kasus. `DELETE`: Hapus proyek. |
| `/api/skills` | `frontend/src/app/api/skills/route.ts` | `GET`, `POST` | `GET`: Semua skill. `POST`: Tambah skill baru. |
| `/api/skills/[id]` | `frontend/src/app/api/skills/[id]/route.ts` | `PUT`, `DELETE` | `PUT`: Update skill. `DELETE`: Hapus skill. |
| `/api/experiences` | `frontend/src/app/api/experiences/route.ts` | `GET`, `POST` | `GET`: Riwayat pengalaman. `POST`: Tambah pengalaman baru. |
| `/api/experiences/[id]` | `frontend/src/app/api/experiences/[id]/route.ts` | `PUT`, `DELETE` | `PUT`: Edit pengalaman. `DELETE`: Hapus pengalaman. |
| `/api/messages` | `frontend/src/app/api/messages/route.ts` | `GET` | Mengambil pesan kontak masuk dari pengunjung web. |
| `/api/messages/[id]`| `frontend/src/app/api/messages/[id]/route.ts` | `PATCH`, `DELETE` | `PATCH`: Menandai status pesan dibaca. `DELETE`: Hapus pesan. |
| `/api/profile` | `frontend/src/app/api/profile/route.ts` | `GET`, `PUT` | `GET`: Ambil data profil. `PUT`: Simpan perubahan profil. |

---

## 💼 4. Alur Manajemen "Detail Studi Kasus"

Studi Kasus adalah halaman komprehensif pada website publik (`/projects/[id]`) yang berisi:
1. **Latar Belakang & Solusi Proyek** (`longDescription`): Narasi mendalam mengenai masalah dan solusi teknis yang dibangun.
2. **Kemampuan Sistem / Fitur Utama** (`highlights`): Daftar checklist kemampuan fungsional sistem.
3. **Key Metrics / Sorotan Singkat** (`metrics`): Sorotan seperti *"Full-Stack • Real-time Stats • PWA Ready"*.
4. **Teknologi Digunakan** (`tags`): Badge tech stack pendukung.

### Cara Pengelolaan di Admin Dashboard:
* **Tabel Proyek**: Pada setiap baris proyek di [ProjectsTab.tsx](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/portofolio-admin/frontend/src/components/tabs/ProjectsTab.tsx), terdapat tombol **`Detail Studi Kasus (X Poin)`** dan ikon buku di kolom aksi.
* **Modal Pratinjau**: Mengklik tombol tersebut akan membuka [CaseStudyModal.tsx](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/portofolio-admin/frontend/src/components/modals/CaseStudyModal.tsx) untuk melihat preview studi kasus persis seperti tampilan di website.
* **Form Pengeditan**: Terdapat tombol **"Edit Detail Studi Kasus"** yang langsung membuka [ProjectModal.tsx](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/portofolio-admin/frontend/src/components/modals/ProjectModal.tsx) tepat pada tab **"2. Detail Studi Kasus"** lengkap dengan *Live Checklist Preview*.
* **Diagram Sekuens**: Lihat berkas [`restapi/03_alur_crud_proyek_dan_studi_kasus.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/03_alur_crud_proyek_dan_studi_kasus.puml).

---

## ⚡ 5. Alur Pembaruan Realtime (Tanpa Refresh)

Website publik (`portofolio-web`) tidak memerlukan refresh manual ketika admin mengubah profil atau proyek:
1. Komponen React (seperti `Footer.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `ProjectsSection.tsx`) mendaftarkan langganan WebSocket melalui:
   ```typescript
   const channel = supabase
     .channel("realtime-channel-name")
     .on("postgres_changes", { event: "*", schema: "public", table: "..." }, () => {
       loadLiveData(); // Memperbarui state komponen secara instan
     })
     .subscribe();
   ```
2. Ketika pengelola menyimpan data di dashboard admin, database memancarkan event ke server WebSocket Supabase yang langsung diteruskan ke browser pengunjung.
3. Ditambahkan fallback listener `window.addEventListener('focus', loadLiveData)` untuk menyinkronkan data secara otomatis ketika pengunjung kembali ke tab browser.
* **Diagram Sekuens**: Lihat berkas [`restapi/04_alur_sinkronisasi_realtime_web.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/04_alur_sinkronisasi_realtime_web.puml).

---

## 🐙 6. Integrasi GitHub REST API v3

* **File Lokasi**: [`portofolio-admin/frontend/src/lib/api/github.ts`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/portofolio-admin/frontend/src/lib/api/github.ts)
* **Alur**:
  1. Tombol *"Sinkronkan dengan GitHub"* memicu pemanggilan langsung ke:
     - `GET https://api.github.com/users/moch-firmansyahh` (Profil & followers)
     - `GET https://api.github.com/users/moch-firmansyahh/repos?per_page=100&sort=updated` (Daftar repositori)
  2. Klien admin menghitung akumulasi total bintang (*stars*), bahasa pemrograman baru, dan repositori yang belum terdaftar.
  3. Dialog konfirmasi ditampilkan kepada admin sebelum data diimpor ke database.
* **Diagram Sekuens**: Lihat berkas [`restapi/05_alur_sinkronisasi_github_api.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/05_alur_sinkronisasi_github_api.puml).

---

## 📊 7. Ringkasan Sequence Diagram Terpadu

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengunjung Web
    participant Web as portofolio-web
    participant APIContact as API (/api/contact)
    database DB as Database PostgreSQL
    participant Realtime as Realtime WebSocket
    participant AdminApp as portofolio-admin (CMS)
    actor Admin as Firman (Admin)
    participant GitHub as GitHub API v3

    %% 1. Kunjungan Web
    User->>Web: Buka Beranda Portofolio
    Web->>DB: Query Proyek, Profil, Skill, dll.
    DB-->>Web: Data Terkini (Status 200 OK)
    Web->>Realtime: Subscribe channel realtime
    Web-->>User: Render halaman interaktif

    %% 2. Kirim Pesan
    User->>Web: Isi form kontak & klik Kirim
    Web->>APIContact: POST /api/contact {name, email, message, botField}
    APIContact->>APIContact: Rate Limit Check (Maks 4 / 10 mnt) & Honeypot
    APIContact->>DB: INSERT into messages
    DB-->>APIContact: Status 201 Created
    APIContact-->>Web: {success: true} (Status 200 OK)
    Web-->>User: Animasi Confetti & Notifikasi Sukses
    DB-->>Realtime: Event New Message
    Realtime-->>AdminApp: Update Badge Inbox (+1)

    %% 3. Admin Update Studi Kasus
    Admin->>AdminApp: Buka Tab Proyek & Klik "Detail Studi Kasus"
    AdminApp-->>Admin: Menampilkan Modal Pratinjau Studi Kasus
    Admin->>AdminApp: Edit Narasi Latar Belakang & Checklist Fitur
    Admin->>AdminApp: Klik "Simpan Proyek"
    AdminApp->>DB: UPDATE projects SET longDescription, highlights...
    DB-->>AdminApp: Status 200 OK
    AdminApp-->>Admin: Toast: "Proyek berhasil diperbarui!"
    
    %% 4. Realtime Push ke Web
    DB-->>Realtime: Event UPDATE projects
    Realtime-->>Web: Push data baru via WebSocket
    Web-->>User: Tampilan ter-update otomatis (Tanpa Reload!)

    %% 5. Sinkronisasi GitHub
    Admin->>AdminApp: Klik "Sinkronkan dengan GitHub"
    AdminApp->>GitHub: GET /users/moch-firmansyahh & /repos
    GitHub-->>AdminApp: Data repositori, stars, & bahasa pemrograman
    AdminApp-->>Admin: Dialog konfirmasi impor
    Admin->>AdminApp: Konfirmasi setuju
    AdminApp->>DB: INSERT into skills / projects
```

---

## 📑 8. Daftar Kode Status HTTP

| Kode Status | Keterangan | Penggunaan dalam Sistem |
| :---: | :--- | :--- |
| **`200 OK`** | Permintaan Berhasil | Mengambil data proyek/profil, atau pengiriman form kontak berhasil. |
| **`201 Created`** | Entitas Baru Terbuat | Menambahkan skill, proyek baru, atau pesan kontak baru ke database. |
| **`400 Bad Request`** | Data Permintaan Tidak Valid | Format email salah, input wajib kosong, atau data tidak memenuhi skema. |
| **`401 Unauthorized`** | Belum Terautentikasi | Mengakses fitur admin tanpa sesi login yang valid. |
| **`404 Not Found`** | Tidak Ditemukan | Membuka rute proyek atau data ber-ID yang tidak ada di sistem. |
| **`429 Too Many Requests`** | Batas Pengiriman Terlampaui | Mengirim lebih dari 4 pesan kontak dalam kurun waktu 10 menit dari IP yang sama. |
| **`500 Internal Server Error`** | Kendala Internal Server | Terjadi galat pada serverless function atau koneksi database terputus. |

---

## 🚀 9. Berkas Diagram PlantUML yang Tersedia

Seluruh diagram PlantUML beresolusi tinggi tersedia di dalam folder [**`restapi/`**](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/):
* [`01_arsitektur_global_dan_aliran_data.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/01_arsitektur_global_dan_aliran_data.puml)
* [`02_alur_pengiriman_pesan_kontak.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/02_alur_pengiriman_pesan_kontak.puml)
* [`03_alur_crud_proyek_dan_studi_kasus.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/03_alur_crud_proyek_dan_studi_kasus.puml)
* [`04_alur_sinkronisasi_realtime_web.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/04_alur_sinkronisasi_realtime_web.puml)
* [`05_alur_sinkronisasi_github_api.puml`](file:///c:/Users/Firman/Documents/WebDev/Website/portofolio-firman-fix/restapi/05_alur_sinkronisasi_github_api.puml)
