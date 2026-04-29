import type { Metadata } from "next";
import "./globals.css";
import { GamificationProvider } from "@/context/GamificationContext";
import Header from "@/components/Header";
import GalaxyBackground from "@/components/GalaxyBackground";
import AlienMentor from "@/components/AlienMentor";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Positive Alien Academy",
  description: "Absurdalna architektura z Monty Pythonem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body style={{ margin: 0, background: "#0a0a1a" }}>
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
