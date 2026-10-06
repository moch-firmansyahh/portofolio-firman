# 📘 Dokumentasi Arsitektur REST API & Sequence Diagram

Folder ini berisi arsitektur resmi **REST API**, berkas diagram urutan (**PlantUML Sequence Diagram**), render visual gambar diagram, serta koleksi **Postman API v2.1** yang siap diimpor untuk pengujian seluruh endpoint pada ekosistem web portofolio.

---

## 📂 Struktur Berkas dalam Folder `restapi/`

Folder ini telah dirapikan secara modular menjadi beberapa subdirektori fungsional:

```
restapi/
├── README.md                                          <-- Panduan Cepat & Navigasi Utama Ini
├── docs/                                              <-- Spesifikasi Teknis & Dokumentasi Lengkap
│   └── DOKUMENTASI_REST_API.md                        <-- Detail Komprehensif Arsitektur & Payload
├── postman/                                           <-- Koleksi Postman Siap Pakai
│   └── Portfolio_Backend_API.postman_collection.json  <-- 1-Click Import ke Aplikasi Postman
├── diagrams/                                          <-- Diagram Alur & Urutan Sistem
│   ├── puml/                                          <-- Source Code PlantUML (.puml)
│   │   ├── 01_arsitektur_global_dan_aliran_data.puml
│   │   ├── 02_alur_pengiriman_pesan_kontak.puml
│   │   ├── 03_alur_crud_proyek_dan_studi_kasus.puml
│   │   ├── 04_alur_sinkronisasi_realtime_web.puml
│   │   ├── 05_alur_sinkronisasi_github_api.puml
│   │   └── 06_alur_kerja_cms_portofolio_admin.puml
│   └── images/                                        <-- Gambar Visual Render Diagram (.png)
│       ├── 01_arsitektur_global_dan_aliran_data.png
│       ├── 02_alur_pengiriman_pesan_kontak.png
│       ├── 03_alur_crud_proyek_dan_studi_kasus.png
│       ├── 04_alur_sinkronisasi_realtime_web.png
│       ├── 05_alur_sinkronisasi_github_api.png
│       └── 06_alur_kerja_cms_portofolio_admin.png
└── env-templates/                                     <-- Contoh Konfigurasi Environment Vercel
    ├── vercel-management-porto.env
    └── vercel-portofolio-web.env
```

---

## 🚀 1. Cara Menggunakan Koleksi Postman (1-Click Import)

Berkas koleksi Postman berada di:
[`postman/Portfolio_Backend_API.postman_collection.json`](./postman/Portfolio_Backend_API.postman_collection.json)

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** di kiri atas.
3. Tarik (*drag and drop*) berkas `Portfolio_Backend_API.postman_collection.json`.
4. Koleksi akan otomatis terimpor lengkap dengan **26 request endpoint**, variabel environment, contoh payload, dan dokumentasi per request.

### Variabel Environment Bawaan Postman:
| Variabel | Nilai Default | Keterangan |
| :--- | :--- | :--- |
| `baseUrl` | `http://localhost:5000` | Port server backend Express.js |
| `webBaseUrl` | `http://localhost:3000` | Port web publik Next.js (`portofolio-web`) |
| `adminBaseUrl` | `http://localhost:3001` | Port admin CMS Next.js (`portofolio-admin`) |
| `admin_password` | `firman2026` | Password autentikasi default admin |

---

## 🗺️ 2. Peta Endpoint REST API

### A. Server Backend Express.js (`http://localhost:5000/api`)
* **Kesehatan Server**: `GET /api/health`
* **Autentikasi**:
  - `POST /api/auth/login` (Login dengan bcrypt hash)
  - `GET /api/auth/session` (Verifikasi session token)
  - `POST /api/auth/logout` (Logout admin)
* **Profil**:
  - `GET /api/profile` (Data profil lengkap)
  - `PUT /api/profile` (Pembaruan data tersanitasi)
* **Manajemen Proyek**:
  - `GET /api/projects` (Daftar semua proyek)
  - `GET /api/projects/:id` (Detail proyek spesifik)
  - `POST /api/projects` (Tambah proyek baru)
  - `PUT /api/projects/:id` (Perbarui proyek)
  - `DELETE /api/projects/:id` (Hapus proyek)
  - `GET /api/projects/:id/case-study` (Ambil narasi & highlights studi kasus)
  - `POST /api/projects/:id/case-study` (Inisialisasi studi kasus)
  - `PUT /api/projects/:id/case-study` (Update narasi, checklist highlights, dan metrik)
* **Keahlian & Kategori**:
  - `GET /api/skills` (Daftar seluruh skill)
  - `POST /api/skills` (Tambah skill baru)
  - `PUT /api/skills/:id` (Perbarui skill)
  - `DELETE /api/skills/:id` (Hapus skill)
  - `POST /api/skills/category` (Buat kategori baru & batch skill)
  - `DELETE /api/skills/category/:category` (Hapus kategori beserta seluruh isinya)
* **Riwayat Pengalaman**:
  - `GET /api/experiences` (Otomatis terurut kronologis terbaru ke terlama)
  - `POST /api/experiences` (Tambah riwayat pengalaman)
  - `PUT /api/experiences/:id` (Perbarui pengalaman)
  - `DELETE /api/experiences/:id` (Hapus pengalaman)
* **Pesan Masuk**:
  - `GET /api/messages` (Daftar pesan masuk dari form kontak)
  - `PATCH /api/messages/:id/read` (Ubah status baca/belum dibaca)
  - `DELETE /api/messages/:id` (Hapus pesan dari database)

### B. Web Portofolio Publik (`http://localhost:3000/api`)
* **Form Kontak Publik**: `POST /api/contact`
  - **Rate Limit**: Maksimal 4 pesan per 10 menit per IP address.
  - **Honeypot Trap**: Kolom tersembunyi `botField` mendeteksi bot pengirim spam secara otomatis.
  - **Validasi**: Regex RFC untuk validitas email dan batas panjang teks pesan.

### C. Admin CMS Media Storage (`http://localhost:3001/api`)
* **Unggah Gambar Proyek**: `POST /api/upload`
  - **Multipart/Form-Data**: Menerima berkas gambar (PNG, JPG, WebP, SVG) maksimal 10 MB.
  - **Penyimpanan**: Disimpan langsung ke bucket Supabase Storage (`portfolio-assets`) dan mengembalikan URL CDN publik.

---

## 📊 3. Visual Sequence Diagram Sistem

Berikut adalah render visual dari 5 diagram urutan resmi sistem:

### 1. Arsitektur Global & Aliran Data Terpadu
> Source: [`diagrams/puml/01_arsitektur_global_dan_aliran_data.puml`](./diagrams/puml/01_arsitektur_global_dan_aliran_data.puml)

![Diagram 01 - Arsitektur Global](./diagrams/images/01_arsitektur_global_dan_aliran_data.png)

---

### 2. Alur Pengiriman Pesan Kontak Publik (`POST /api/contact`)
> Source: [`diagrams/puml/02_alur_pengiriman_pesan_kontak.puml`](./diagrams/puml/02_alur_pengiriman_pesan_kontak.puml)

![Diagram 02 - Alur Form Kontak](./diagrams/images/02_alur_pengiriman_pesan_kontak.png)

---

### 3. Alur CRUD Proyek & Detail Studi Kasus (`/projects/[id]`)
> Source: [`diagrams/puml/03_alur_crud_proyek_dan_studi_kasus.puml`](./diagrams/puml/03_alur_crud_proyek_dan_studi_kasus.puml)

![Diagram 03 - Alur CRUD Proyek & Studi Kasus](./diagrams/images/03_alur_crud_proyek_dan_studi_kasus.png)

---

### 4. Alur Sinkronisasi Realtime Web (Tanpa Reload)
> Source: [`diagrams/puml/04_alur_sinkronisasi_realtime_web.puml`](./diagrams/puml/04_alur_sinkronisasi_realtime_web.puml)

![Diagram 04 - Alur Realtime Web](./diagrams/images/04_alur_sinkronisasi_realtime_web.png)

---

### 5. Alur Sinkronisasi GitHub REST API v3
> Source: [`diagrams/puml/05_alur_sinkronisasi_github_api.puml`](./diagrams/puml/05_alur_sinkronisasi_github_api.puml)

![Diagram 05 - Alur Integrasi GitHub API](./diagrams/images/05_alur_sinkronisasi_github_api.png)

---

### 6. Alur Kerja & Operasional portofolio-admin (CMS & Dashboard)
> Source: [`diagrams/puml/06_alur_kerja_cms_portofolio_admin.puml`](./diagrams/puml/06_alur_kerja_cms_portofolio_admin.puml)

![Diagram 06 - Alur Kerja portofolio-admin CMS](./diagrams/images/06_alur_kerja_cms_portofolio_admin.png)

---

## 🎨 4. Cara Melihat & Mengedit Kode Diagram PlantUML (`.puml`)

Anda dapat melihat diagram `.puml` secara langsung melalui:
1. **VS Code / Antigravity IDE**: Pasang ekstensi **PlantUML** (`jebbs.plantuml`), buka file `.puml` di folder `diagrams/puml/`, lalu tekan `Alt + D`.
2. **PlantText Online**: Buka [PlantText.com](https://www.planttext.com/), tempelkan isi berkas `.puml` untuk melihat render visual dan mengekspor ke format SVG/PNG.
