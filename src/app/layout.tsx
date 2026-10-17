import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://levania-parfums.com"),
  title: "LÉVANIA PARFUMS — Haute Parfumerie & Luxury Fragrances",
  description: "Discover the fragrance that moves with you. Artisanal perfumes, bespoke gift boxes, loyalty gamification, and an exclusive luxury olfactory experience.",
  keywords: ["LÉVANIA", "Lévania Parfums", "Luxury Perfume", "Haute Parfumerie", "Tunisia", "Scent Finder", "Compose Your Box", "Wheel of Chance"],
  openGraph: {
    title: "LÉVANIA PARFUMS — Haute Parfumerie",
    description: "Discover the fragrance that moves with you.",
    images: ["/brand/bottle-and-cylinder.jpg"],
    type: "website",
  },
};

import { AppProviders } from "@/context/Providers";
import { AiConciergeModal } from "@/components/chat/AiConciergeModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#171715] text-[#F6F1E8] font-sans selection:bg-[#C7A66A] selection:text-[#171715]">
        <AppProviders>
          {children}
          <AiConciergeModal />
        </AppProviders>
      </body>
    </html>
  );
}
