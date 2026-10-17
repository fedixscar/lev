"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/catalogue";
import { FragranceFamily, FragranceIntensity } from "@/types";
import { Search, Filter, SlidersHorizontal, Sparkles } from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestseller">("featured");

  const families = ["all", "Amber", "Woody", "Floral", "Citrus", "Spicy"];
  const intensities = ["all", "Subtle", "Balanced", "Intense", "Monumental"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.baseNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFamily =
        selectedFamily === "all" || product.fragranceFamily === selectedFamily;

      const matchesIntensity =
        selectedIntensity === "all" || product.intensity === selectedIntensity;

      return matchesSearch && matchesFamily && matchesIntensity;
    }).sort((a, b) => {
      if (sortBy === "bestseller") {
        return (a.bestsellerRank || 99) - (b.bestsellerRank || 99);
      }
      if (sortBy === "price-asc") {
        return a.formats[0].priceTND - b.formats[0].priceTND;
      }
      if (sortBy === "price-desc") {
        return b.formats[0].priceTND - a.formats[0].priceTND;
      }
      return 0;
    });
  }, [searchQuery, selectedFamily, selectedIntensity, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
              Boutique Haute Parfumerie
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-2 mb-3">
              Le Catalogue des Fragrances
            </h1>
            <p className="text-xs sm:text-sm text-[#89877F]">
              Explorez nos extraits et eaux de parfum artisanales, disponibles en flacons 50ml et 100ml scellés dans leur écrin cylindrique.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-md mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#89877F]" />
              <input
                type="text"
                placeholder="Rechercher par note, nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F6F1E8] placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Family Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs no-scrollbar">
                {families.map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
                      selectedFamily === fam
                        ? "bg-[#C7A66A] text-[#171715] font-semibold"
                        : "bg-[#171715] text-[#89877F] hover:text-[#F6F1E8] border border-white/5"
                    }`}
                  >
                    {fam === "all" ? "Toutes Familles" : fam}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 ml-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C7A66A]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#171715] border border-[#C7A66A]/25 rounded-lg px-2.5 py-1 text-xs text-[#F6F1E8] focus:outline-none"
                >
                  <option value="featured">Sélection Vedette</option>
                  <option value="bestseller">Classement Bestsellers</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-[#89877F]">
              <p className="font-serif text-xl text-[#F6F1E8] mb-2">Aucun flacon ne correspond à votre filtre</p>
              <button
                onClick={() => {
                  setSelectedFamily("all");
                  setSelectedIntensity("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#C7A66A] underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod, idx) => (
                <ProductCard key={prod.id} product={prod} priority={idx < 4} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
