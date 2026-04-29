import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import AlienMentor from "@/components/AlienMentor";
import { GamificationProvider } from "@/context/GamificationContext";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Positive Alien Academy — Absurdalna Architektura",
  description: "Ucz się architektury systemowej z Monty Pythonowskim humorem. Grawitacja, cząsteczki, absurd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${pressStart.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-space-900 text-white antialiased relative">
        <GamificationProvider>
          <GalaxyBackground />
          <div className="relative z-10 flex flex-col min-h-full">
            <Header />
            <main className="flex-1">{children}</main>
            <AlienMentor />
            <Footer />
          </div>
        </GamificationProvider>
      </body>
    </html>
  );
}
