import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { GamificationProvider } from "@/context/GamificationContext";
import Header from "@/components/Header";
import GalaxyBackground from "@/components/GalaxyBackground";
import AlienMentor from "@/components/AlienMentor";
import Footer from "@/components/Footer";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Positive Alien Academy",
  description: "Absurdalna architektura z Monty Pythonem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={pressStart.variable}>
      <body className="m-0 bg-space-900">
        <GamificationProvider>
          <GalaxyBackground />
          <Header />
          {children}
          <Footer />
          <AlienMentor />
        </GamificationProvider>
      </body>
    </html>
  );
}
