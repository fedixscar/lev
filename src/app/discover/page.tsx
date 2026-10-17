"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PerfumeFinder } from "@/components/discovery/PerfumeFinder";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
              Diagnostic Olfactif Sur-Mesure
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-2 mb-3">
              Trouvez Votre Signature Lévania
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Répondez à quelques questions subtiles pour que notre intelligence olfactive identifie avec exactitude les 4 fragrances qui sublimeront votre aura.
            </p>
          </div>

          <PerfumeFinder />
        </div>
      </main>

      <Footer />
    </div>
  );
}
