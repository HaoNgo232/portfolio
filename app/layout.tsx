import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ngô Gia Hạo — Portfolio",
  description:
    "Portfolio của Ngô Gia Hạo — Với background Mạng máy tính, học lập trình qua dự án thực tế, làm backend NestJS/Node.js, làm việc với Docker và Kubernetes.",
  keywords: [
    "web developer",
    "portfolio",
    "NestJS",
    "Next.js",
    "Kubernetes",
    "fullstack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
