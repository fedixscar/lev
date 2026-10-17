"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { COLLECTIONS, PRODUCTS } from "@/lib/catalogue";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  const [activeCollectionSlug, setActiveCollectionSlug] = useState<string>("signature");

  const activeCollection =
    COLLECTIONS.find((c) => c.slug === activeCollectionSlug) || COLLECTIONS[0];
  const collectionProducts = PRODUCTS.filter(
    (p) => p.collectionSlug === activeCollectionSlug
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
              Les Univers Olfactifs
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-2 mb-3">
              Les 3 Collections Lévania
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Trois expressions poétiques de la Vague. Des matières premières d&apos;exception travaillées dans le respect absolu de la tradition méditerranéenne.
            </p>
          </div>

          {/* Collection Tab Selectors */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {COLLECTIONS.map((col) => (
              <button
                key={col.slug}
                onClick={() => setActiveCollectionSlug(col.slug)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCollectionSlug === col.slug
                    ? "bg-[#541B28] text-[#FAF7F2] shadow-md shadow-[#541B28]/25 scale-105"
                    : "bg-white text-[#5A4B4E] hover:text-[#541B28] border border-[#541B28]/15"
                }`}
              >
                {col.name}
              </button>
            ))}
          </div>

          {/* Active Collection Hero Banner */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-12 mb-16 relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                Expression : {activeCollection.waveExpression.toUpperCase()} WAVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                {activeCollection.name}
              </h2>
              <p className="text-sm text-[#541B28] italic font-medium">{activeCollection.tagline}</p>
              <p className="text-xs text-[#5A4B4E] leading-relaxed">
                {activeCollection.description}
              </p>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
              <SignatureWave expression={activeCollection.waveExpression} />
            </div>
          </div>

          {/* Products in this Collection */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#541B28]/15">
              <h3 className="font-serif text-2xl text-[#23181A]">
                Flacons de la Collection ({collectionProducts.length})
              </h3>
              <Link href="/shop" className="text-xs text-[#541B28] hover:underline flex items-center gap-1 font-semibold">
                <span>Voir tout le catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
