"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/catalogue";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestseller">("featured");

  const families = ["all", "Amber", "Woody", "Floral", "Citrus", "Spicy"];

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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
              Boutique Haute Parfumerie
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-2 mb-3">
              Le Catalogue des Fragrances
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Explorez nos extraits et eaux de parfum artisanales, disponibles en flacons 50ml et 100ml scellés dans leur écrin cylindrique.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
              <input
                type="text"
                placeholder="Rechercher par note, nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
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
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap font-medium ${
                      selectedFamily === fam
                        ? "bg-[#541B28] text-[#FAF7F2] shadow-sm font-semibold"
                        : "bg-white text-[#5A4B4E] hover:text-[#541B28] border border-[#541B28]/15 hover:border-[#541B28]"
                    }`}
                  >
                    {fam === "all" ? "Toutes Familles" : fam}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 ml-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#541B28]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] border border-[#541B28]/20 rounded-lg px-2.5 py-1.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
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
            <div className="py-20 text-center text-[#756B6D]">
              <p className="font-serif text-xl text-[#23181A] mb-2">Aucun flacon ne correspond à votre filtre</p>
              <button
                onClick={() => {
                  setSelectedFamily("all");
                  setSelectedIntensity("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#541B28] font-bold underline"
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
