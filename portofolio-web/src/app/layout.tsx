import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mochfirmansyah.dev"
  ),
  title: "Moch. Firmansyah — Portfolio",
  description:
    "Portfolio of Moch. Firmansyah — Frontend Developer & Security Enthusiast specializing in React, Next.js, TypeScript, Tailwind CSS, and secure web architectures.",
  icons: {
    icon: [
      { url: "/icon.jpg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.jpg",
  },
  keywords: [
    "Moch. Firmansyah",
    "Frontend Developer",
    "Cyber Security Enthusiast",
    "React Developer",
    "Next.js Portfolio",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer Indonesia",
    "Telkom University",
  ],
  authors: [{ name: "Moch. Firmansyah" }],
  creator: "Moch. Firmansyah",
  openGraph: {
    title: "Moch. Firmansyah — Portfolio",
    description:
      "Crafting visually refined, high-performance, and secure web experiences with modern React, Next.js, and fluid animations.",
    type: "website",
    locale: "id_ID",
    siteName: "Moch. Firmansyah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moch. Firmansyah — Portfolio",
    description:
      "Frontend Developer & Security Enthusiast crafting refined, secure web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable}`}>
      <body className="min-h-screen bg-[#F5EFE6] text-[#1A1A1A] font-sans antialiased selection:bg-[#F7EAE5] selection:text-[#B5654A]">
        {children}
      </body>
    </html>
  );
}
