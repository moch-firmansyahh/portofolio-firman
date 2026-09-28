import type { Project } from "@/types/project";
import type { Skill, SkillCategory } from "@/types/skill";
import type { ExperienceItem } from "@/types/experience";
import type { PersonalInfo } from "@/types/profile";

export type { Project, Skill, SkillCategory, ExperienceItem, PersonalInfo };

export const PERSONAL_INFO = {
  name: "Moch. Firmansyah",
  shortName: "Firman",
  role: "Frontend Developer & Security Enthusiast",
  tagline: "Code that looks good. Systems that stay safe.",
  about: "Mahasiswa Informatika Telkom University yang fokus memadukan Frontend Development modern dengan pemahaman Network & Web Security untuk menciptakan aplikasi web yang responsif, interaktif, dan aman.",
  subheadline: "Mahasiswa Informatika Telkom University yang fokus memadukan Frontend Development modern dengan pemahaman Network & Web Security untuk menciptakan aplikasi web yang responsif, interaktif, dan aman.",
  bio: `Sebagai mahasiswa **Teknik Informatika di Telkom University**, saya berdedikasi untuk menerapkan keterampilan analitis dan keahlian teknis saya dalam peran **Front-End Developer** di industri teknologi. Latar belakang akademik telah membekali saya dengan fondasi yang kuat dalam pemrograman, pengembangan web modern, dan pengelolaan basis data.

Saya memiliki pengalaman langsung dalam membangun aplikasi web menggunakan **React** dan **Next.js**, didukung oleh pemahaman yang solid dalam pengembangan front-end maupun back-end, termasuk perancangan dan manajemen database.

Di samping pengembangan antarmuka, saya memiliki ketertarikan mendalam pada **Cyber Security** dan **Network Security**. Berbekal sertifikasi spesialisasi dari Google, saya aktif menerapkan prinsip **Secure Coding** dan validasi data ketat guna memastikan setiap aplikasi web yang saya bangun tidak hanya estetik dan responsif, tetapi juga aman dan terlindungi.

Saya bersemangat untuk memanfaatkan keahlian ini dalam menciptakan antarmuka yang ramah pengguna, berkinerja tinggi, serta berkontribusi pada pengembangan solusi web yang inovatif dan terukur (*scalable*).`,
  status: "Available for opportunities",
  location: "Bandung, Indonesia",
  email: "firmanajah366@gmail.com",
  phone: "+62 812-3456-7890",
  resumeUrl: "#contact",
  socialLinks: {
    github: "https://github.com/moch-firmansyahh",
    linkedin: "https://www.linkedin.com/in/moch-firmansyah-532122323/",
    instagram: "https://www.instagram.com/frmzyxx/",
    tiktok: "https://www.tiktok.com/@frmnzy_",
  },
  stats: [
    { label: "Tahun Belajar & Berkarya", value: "2+" },
    { label: "Proyek Selesai", value: "5+" },
    { label: "Lighthouse Performance", value: "98%" },
    { label: "Dedikasi & Presisi", value: "100%" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Front-End Web Development",
    description: "Keahlian utama dalam membangun antarmuka web modern, responsif, dan performan.",
    skills: [
      { name: "HTML", level: "Expert", highlight: true },
      { name: "CSS", level: "Expert", highlight: true },
      { name: "JavaScript", level: "Expert", highlight: true },
      { name: "React", level: "Expert", highlight: true },
      { name: "Next.js", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    title: "Programming Languages",
    description: "Bahasa pemrograman untuk pemecahan masalah algoritma, backend, dan logika komputasi.",
    skills: [
      { name: "C++", level: "Advanced", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "Java", level: "Proficient", highlight: true },
      { name: "Go (Golang)", level: "Proficient", highlight: true },
    ],
  },
  {
    title: "Developer Tools",
    description: "Perangkat lunak, environment, dan alat analisis untuk menunjang siklus pengembangan.",
    skills: [
      { name: "Git / GitHub", level: "Expert", highlight: true },
      { name: "VS Code", level: "Expert", highlight: true },
      { name: "Postman", level: "Advanced", highlight: true },
      { name: "Antigravity", level: "Advanced", highlight: true },
      { name: "Figma", level: "Advanced", highlight: true },
      { name: "Wireshark", level: "Proficient" },
      { name: "MySQL Workbench", level: "Advanced" },
    ],
  },
  {
    title: "Soft Skills & Professional",
    description: "Kemampuan interpersonal, manajemen, dan pemecahan masalah teknis secara kolaboratif.",
    skills: [
      { name: "Technical Problem-Solving", level: "Expert", highlight: true },
      { name: "Analytical Thinking", level: "Expert", highlight: true },
      { name: "Team Collaboration", level: "Expert", highlight: true },
      { name: "Time Management", level: "Advanced" },
      { name: "Client Management", level: "Advanced" },
    ],
  },
  {
    title: "Achievements & Certifications",
    description: "Sertifikasi profesional Google AI, Network Security, dan kredensial resmi terverifikasi.",
    skills: [
      {
        name: "Sertifikat Profesional Google AI",
        level: "Specialization",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "LHOBD1DIAJJI",
        highlight: true,
      },
      {
        name: "Google Network Security Spesialisasi",
        level: "Specialization",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "CJ9Y8P9DNC7C",
        highlight: true,
      },
      {
        name: "AI Fundamentals",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "YHC0Y81QJQEP",
        highlight: true,
      },
      {
        name: "Network Architecture",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "QGLKQZYW85M4",
        highlight: true,
      },
      {
        name: "AI for Research and Insights",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "L7LZ85MKND2X",
      },
      {
        name: "Network Operations",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "SNCGYJI238LL",
      },
      {
        name: "AI for Writing and Communicating",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "LN1RVG8C81ZN",
      },
      {
        name: "Secure Against Network Intrusions",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "OQJ95K5ZGRCB",
        highlight: true,
      },
      {
        name: "AI for Content Creation",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "O28EDV4M8XUI",
      },
      {
        name: "Security Hardening",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "PXE1WGPT2QN3",
        highlight: true,
      },
      {
        name: "AI for Data Analysis",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "XFF8VDO21R68",
      },
      {
        name: "AI for App Building",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "W00HFW7JUN7A",
        highlight: true,
      },
      {
        name: "Network Monitoring and Analysis",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "UWO1F2TR0STG",
      },
      {
        name: "Network Traffic and Logs Using IDS and SIEM Tools",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "O1RF3PQ0GG26",
      },
      {
        name: "AI for Brainstorming and Planning",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "I9IN66PDVSZJ",
      },
      {
        name: "Introduction to Detection and Incident Response",
        level: "Course Certificate",
        issuer: "Google",
        issueDate: "Jun 2026",
        credentialId: "B7BQBL44M7D8",
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "manajemen-kontrakan-pa-iman",
    title: "Kontrakan Pa Iman",
    subtitle: "Sistem Manajemen Kost Digital Modern & Responsif",
    description: "Aplikasi web Full-Stack Digital Management yang dirancang khusus untuk pemilik kost dalam mengelola unit kamar, data penghuni (aktif & alumni), dan pencatatan riwayat pembayaran bulanan secara efisien, terstruktur, dan otomatis.",
    longDescription: "Kontrakan Pa Iman adalah aplikasi web Full-Stack Digital Management yang dirancang khusus untuk pemilik kost dalam mengelola unit kamar, data penghuni (aktif & alumni), dan pencatatan riwayat pembayaran bulanan secara efisien, terstruktur, dan otomatis. Dibangun dengan arsitektur modern Next.js 16, Express.js 5, Prisma ORM, dan PostgreSQL untuk menyederhanakan operasional bisnis sewa properti.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Express.js 5", "Prisma ORM", "PostgreSQL", "Shadcn UI", "JWT Auth", "PWA Ready"],
    category: "Web App",
    featured: true,
    image: "/projects/manajemen-kontrakan.png",
    demoUrl: "https://manajemen-kontrakan-iman.vercel.app/",
    githubUrl: "https://github.com/moch-firmansyahh/manajemen-kost-v2",
    metrics: "Full-Stack • Real-time Stats • PWA Ready",
    highlights: [
      "Dashboard Ringkasan Real-Time dengan 4 Stat Card interaktif, monitoring tagihan sewa pending, dan popover notifikasi",
      "Manajemen Unit Kamar: Filter & instant search nomor/tipe kamar, modal operasi CRUD, serta histori lengkap transaksi kamar",
      "Manajemen Penghuni: Pengelompokan tab Penghuni Aktif & Alumni, profil identitas lengkap, dan sistem checkout otomatis",
      "Manajemen Pembayaran & Struk: Pencatatan status tagihan sewa bulanan, filter periode transaksi, dan halaman cetak invoice",
      "Keunggulan UI/UX: Dual Theme (Dark/Light mode) mulus, animasi welcome screen & loader kustom, serta instalasi PWA standalone",
    ],
    year: "2026",
  },
  {
    id: "voluntrip",
    title: "Voluntrip",
    subtitle: "Aplikasi Perencana Trip, Rundown Perjalanan Interaktif & Manajemen Budget Kelompok",
    description: "Platform perencana perjalanan modern yang dirancang untuk mempermudah traveler dan kelompok perjalanan dalam menyusun jadwal kegiatan (rundown), mengelola anggaran (budgeting), dan melacak pengeluaran secara real-time.",
    longDescription: "Voluntrip adalah platform perencana perjalanan modern yang dirancang untuk mempermudah traveler dan kelompok perjalanan dalam menyusun jadwal kegiatan (rundown), mengelola anggaran (budgeting), dan melacak pengeluaran secara real-time. Dengan antarmuka interaktif yang intuitif, Voluntrip memastikan itinerary bebas bentrok jam, fleksibel untuk diubah lewat fitur drag & drop, serta mudah dibagikan ke anggota trip lainnya.",
    tags: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "PostgreSQL", "Dnd Kit", "PWA Ready", "JWT Auth", "Leaflet"],
    category: "Web App",
    featured: true,
    image: "/projects/voluntrip.png",
    demoUrl: "https://voluntrip-five.vercel.app/",
    githubUrl: "https://github.com/moch-firmansyahh/voluntrip",
    metrics: "Drag & Drop • Real-time Budgeting • PWA Ready",
    highlights: [
      "Interactive Itinerary & Rundown Builder dengan Drag & Drop (Dnd-Kit) dan Auto-Reschedule sekuensial bebas tabrakan jam",
      "Autocomplete lokasi destinasi terintegrasi Photon OpenStreetMap API (Komoot) dan visualisasi titik peta Leaflet",
      "Expense Tracker, Budgeting & Split Bill kalkulator otomatis untuk pembagian tagihan rata (equal share) antar anggota trip",
      "Sistem Autentikasi JWT terenkripsi dengan HTTP-only cookie, opsi Ingat Saya 30 hari, dan instant logout",
      "Dukungan Progressive Web App (PWA Standalone), Traveloka-Style Splash Screen, serta Public Share Link dengan token unik",
    ],
    year: "2026",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Feb 2026 - Present",
    role: "Study Group Member",
    company: "Central Computer Improvement Telkom University",
    location: "Bandung, West Java, Indonesia",
    description: "Actively participated in the Central Computer Improvement (CCI) Study Group, specializing in modern web development. Gained hands-on experience building responsive user interfaces with Tailwind CSS and mastering the Next.js framework. Core focus areas included handling complex React state management, implementing dynamic routing architectures, and optimizing data fetching strategies (SSR & Client-Side) using Axios and Fetch to integrate REST APIs efficiently.",
    technologies: ["Next.js", "React", "Tailwind CSS", "REST API", "Front-End Development", "Software System Analysis"],
    type: "Work",
  },
  {
    period: "Nov 2025 - Dec 2025",
    role: "Study Group Member",
    company: "Cyber Physical System Laboratory",
    location: "Bandung, West Java, Indonesia",
    description: "Actively participated in the Website Development Study Group to build web applications end-to-end. Hands-on practice included Front-End development with React.js and Tailwind CSS, Back-End (REST API) architecture with Node.js, Express.js, and MySQL, as well as API testing, integration, and public cloud deployment.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "REST API", "Cloud Deployment"],
    type: "Work",
  },
  {
    period: "Nov 2024 - Jun 2025",
    role: "Study Group Member",
    company: "GDGoC Telkom University Bandung",
    location: "Bandung, West Java, Indonesia",
    description: "Active member of the Web Development Study Group at Google Developer Groups on Campus (GDGoC), learning and practicing modern web development alongside fellow members. Participated in group learning sessions, hands-on workshops, and collaborative projects focusing on web design and modern frontend engineering.",
    technologies: ["Web Development", "Web Design", "JavaScript", "HTML/CSS", "Collaboration"],
    type: "Work",
  },
];
