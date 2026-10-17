"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ComposeBox } from "@/components/giftbox/ComposeBox";

export default function ComposeBoxPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
              Atelier Cadeaux d&apos;Exception
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-2 mb-3">
              Composer Mon Coffret
            </h1>
            <p className="text-xs sm:text-sm text-[#89877F]">
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
