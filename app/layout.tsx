import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "JonVikBoi | Portfolio",
  description: "A cinematic red-identity portfolio experience.",
  icons: {
    icon: "/logo.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        <SmoothScroll />
        <Navbar />
        <div className="bg-grain" />
        <div className="bg-gradient-overlay" />
        {children}
      </body>
    </html>
  );
}
