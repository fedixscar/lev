"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ComposeBox } from "@/components/giftbox/ComposeBox";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";

export default function ComposeBoxPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative">
      <AmbientWaveBackdrop expression="signature" opacity={0.25} />
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
              Atelier Cadeaux d&apos;Exception
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-2 mb-3">
              Composer Mon Coffret
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Choisissez votre format d&apos;écrin cylindrique ou coffret prestige, associez les élixirs de votre choix et personnalisez votre message calligraphié.
            </p>
          </div>

          <ComposeBox />
        </div>
      </main>

      <Footer />
    </div>
  );
}
