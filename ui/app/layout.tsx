import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AppProvider from "@/components/feature/app-provider";
import ClientErrorReporter from "@/components/feature/client-error-reporter";
import Particles from "@/components/feature/Particles";
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
  title: "Quoc Hau — Portfolio",
  description:
    "Personal portfolio of Quoc Hau — a Full-stack Developer building web apps, backends and production systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="vi" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
          <ClientErrorReporter />
          <Particles
            className="animate-fade-in fixed inset-0 -z-10"
            quantity={100}
          />
          <Preloader>
            {children}
            <Toaster />
          </Preloader>
        </body>
      </html>
    </AppProvider>
  );
}
