"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PerfumeFinder } from "@/components/discovery/PerfumeFinder";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function DiscoverPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Haute Parfumerie Wave Backdrop */}
      <AmbientWaveBackdrop expression="soft" opacity={0.25} />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="luxury-pill mb-6 inline-flex items-center gap-2.5">
              <GoldStarLozenge size={12} className="text-[#C7A66A]" />
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-grand uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                {t("quiz.tag", "Diagnostic Olfactif Sur Mesure")}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light tracking-tight mt-2 mb-5">
              {t("quiz_section.title", "Trouvez Votre Parfum Idéal")}
            </h1>

            <p className="text-sm sm:text-base text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed font-light max-w-2xl mx-auto">
              {t("quiz_section.desc", "Répondez à 4 questions simples. Découvrez immédiatement les créations Lévania qui correspondent parfaitement à vos goûts et à votre style.")}
            </p>
          </div>

          <PerfumeFinder />
        </div>
      </main>

      <Footer />
    </div>
  );
}

