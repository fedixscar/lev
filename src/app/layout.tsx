import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
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
      suppressHydrationWarning
      className={`${cinzel.variable} ${cormorant.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('levania_theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&m)){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] font-sans selection:bg-[#541B28] selection:text-[#FAF7F2] transition-colors duration-300">
        <AppProviders>
          {children}
          <AiConciergeModal />
        </AppProviders>
      </body>
    </html>
  );
}
