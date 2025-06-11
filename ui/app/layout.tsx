import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AppProvider from "@/components/feature/app-provider";
import Particles from "@/components/feature/Particles";
import SmoothScroll from "@/components/feature/smooth-scroll";
import Preloader from "@/components/layout/preloader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Quốc Hậu Portfolio",
  description: "Quốc Hậu Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="vi">
        <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
          <Particles
            className="animate-fade-in fixed inset-0 -z-10"
            quantity={100}
          />
          <Preloader>
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster />
          </Preloader>
        </body>
      </html>
    </AppProvider>
  );
}
