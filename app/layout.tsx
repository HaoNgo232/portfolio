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
  title: "Ngô Gia Hạo — Web Developer",
  description:
    "Portfolio của Ngô Gia Hạo — Web Developer với background Mạng máy tính, làm backend NestJS/Node.js, biết Docker và Kubernetes.",
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
