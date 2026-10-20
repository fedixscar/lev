"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { COLLECTIONS, PRODUCTS } from "@/lib/catalogue";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { ArrowRight } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";

export default function CollectionsPage() {
  const [activeCollectionSlug, setActiveCollectionSlug] = useState<string>("signature");

  const activeCollection =
    COLLECTIONS.find((c) => c.slug === activeCollectionSlug) || COLLECTIONS[0];
  const collectionProducts = PRODUCTS.filter(
    (p) => p.collectionSlug === activeCollectionSlug
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      {/* Dynamic Transparent Ambient Wave matching the selected collection */}
      <AmbientWaveBackdrop expression={activeCollection.waveExpression} opacity={0.3} />

      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="luxury-pill mb-6 inline-flex items-center gap-2.5">
              <GoldStarLozenge size={12} className="text-[#C7A66A]" />
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-grand uppercase text-[#541B28] font-bold">
                Les Univers Olfactifs
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light mt-2 mb-5">
              Les 3 Collections Lévania
            </h1>
            <p className="text-sm sm:text-base text-[#5A4B4E] leading-relaxed font-light max-w-2xl mx-auto">
              Trois expressions poétiques et sculpturales de la Vague. Des matières premières d&apos;exception travaillées dans le respect absolu de la tradition méditerranéenne.
            </p>
          </div>

          {/* Collection Tab Selectors */}
          <div className="flex justify-center gap-3.5 sm:gap-4 mb-14 sm:mb-16 flex-wrap">
            {COLLECTIONS.map((col) => (
              <button
                key={col.slug}
                onClick={() => setActiveCollectionSlug(col.slug)}
                className={`w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-cinzel text-xs uppercase tracking-wider sm:tracking-luxury font-bold transition-all flex items-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md ${
                  activeCollectionSlug === col.slug
                    ? "bg-[#541B28] text-[#FAF7F2] shadow-xl shadow-[#541B28]/25 scale-105 ring-2 ring-[#C7A66A]/30"
                    : "bg-white text-[#5A4B4E] hover:text-[#541B28] border border-[#541B28]/15 hover:border-[#541B28]"
                }`}
              >
                <WaveMonogram size="xs" variant={activeCollectionSlug === col.slug ? "gold" : "burgundy"} />
                <span>{col.name}</span>
              </button>
            ))}
          </div>

          {/* Active Collection Hero Banner with Live Wave */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 mb-20 relative overflow-hidden shadow-2xl">
            {/* Live Interactive Wave Canvas Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-auto">
              <WaveCanvas
                expression={activeCollection.waveExpression}
                interactive={true}
                height="100%"
                className="w-full h-full"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-16 max-w-2xl space-y-5">
              <div className="flex items-center gap-2.5">
                <WaveMonogram
                  size="sm"
                  variant={activeCollection.waveExpression === "soft" ? "burgundy" : "gold"}
                  withSeal
                />
                <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#541B28] font-bold">
                  Expression Olfactive : {activeCollection.waveExpression.toUpperCase()} WAVE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light">
                {activeCollection.name}
              </h2>
              <p className="font-serif text-lg text-[#541B28] italic font-medium">{activeCollection.tagline}</p>
              <p className="text-sm text-[#5A4B4E] leading-relaxed font-light">
                {activeCollection.description}
              </p>

              <div className="pt-2">
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#756B6D] block font-semibold">
                  <span className="sm:hidden">&sim; Touchez la vague</span>
                  <span className="hidden sm:inline">&sim; Cliquez ou survolez la vague pour éveiller le mouvement du fluide</span>
                </span>
              </div>
            </div>
          </div>

          {/* Products in this Collection */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 pb-4 border-b border-[#541B28]/15">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#23181A] font-light">
                Flacons de la Collection ({collectionProducts.length})
              </h3>
              <Link href="/shop" className="font-cinzel text-xs tracking-luxury uppercase text-[#541B28] hover:text-[#66182C] flex items-center gap-2 font-bold transition-colors shrink-0">
                <span>Voir tout le catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C7A66A]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {collectionProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
