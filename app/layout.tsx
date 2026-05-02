import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

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
    "Portfolio của Ngô Gia Hạo — các dự án cá nhân về web app, e-commerce, công cụ desktop và thử nghiệm triển khai ứng dụng với Docker/Kubernetes.",
  keywords: [
    "web developer",
    "portfolio",
    "NestJS",
    "Next.js",
    "Kubernetes",
    "web projects",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
