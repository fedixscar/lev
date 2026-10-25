"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, getAllProducts, PRODUCTS_UPDATED_EVENT } from "@/lib/catalogue";
import { Product } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type WaveFilter = "all" | "signature" | "soyeuse" | "intense";

const WAVE_TABS = [
  {
    id: "all" as WaveFilter,
    labelKey: "shop.tab_all",
    label: "Toutes les Ondes",
    subKey: "shop.tab_all_sub",
    sub: "Catalogue Complet",
    color: "#541B28",
    canvasExpr: "signature" as const,
  },
  {
    id: "signature" as WaveFilter,
    labelKey: "shop.tab_sig",
    label: "Onde Signature",
    subKey: "shop.tab_sig_sub",
    sub: "Méditerranée & Or",
    color: "#C7A66A",
    canvasExpr: "signature" as const,
  },
  {
    id: "soyeuse" as WaveFilter,
    labelKey: "shop.tab_soyeuse",
    label: "Onde Soyeuse",
    subKey: "shop.tab_soyeuse_sub",
    sub: "Fleurs, Néroli & Voile",
    color: "#852538",
    canvasExpr: "soft" as const,
  },
  {
    id: "intense" as WaveFilter,
    labelKey: "shop.tab_intense",
    label: "Onde Sombre",
    subKey: "shop.tab_intense_sub",
    sub: "Oud, Bois & Ébène",
    color: "#23181A",
    canvasExpr: "intense" as const,
  },
];

export default function ShopPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWave, setSelectedWave] = useState<WaveFilter>("all");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestseller">("featured");

  React.useEffect(() => {
    setProducts(getAllProducts());
    const handleUpdate = () => setProducts(getAllProducts());
    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
  }, []);

  const families = ["all", "Amber", "Woody", "Floral", "Citrus", "Spicy"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.baseNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesWave =
        selectedWave === "all" || product.collectionSlug === selectedWave;

      const matchesFamily =
        selectedFamily === "all" || product.fragranceFamily === selectedFamily;

      const matchesIntensity =
        selectedIntensity === "all" || product.intensity === selectedIntensity;

      return matchesSearch && matchesWave && matchesFamily && matchesIntensity;
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
  }, [searchQuery, selectedWave, selectedFamily, selectedIntensity, sortBy]);

  const activeWaveTab = WAVE_TABS.find((t) => t.id === selectedWave) || WAVE_TABS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative">
      {/* Dynamic Ambient Fluid Wave flowing in the background matching selected wave filter */}
      <AmbientWaveBackdrop expression={activeWaveTab.canvasExpr} opacity={0.28} />

      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border border-[#541B28]/20 dark:border-[#C7A66A]/30 font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] uppercase tracking-luxury font-bold mb-3 shadow-sm">
              <GoldStarLozenge size={11} className="text-[#C7A66A]" />
              <span>{t("nav.brand_subtitle", "Boutique Haute Parfumerie")}</span>
            </div>
            <h1 className="font-serif text-fluid-section text-burgundy-gradient font-light mb-3">
              {t("shop.title", "Le Catalogue des Fragrances")}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed">
              {t("shop.subtitle", "Explorez nos extraits et eaux de parfum artisanales, disponibles en flacons 50ml et 100ml scellés dans leur écrin cylindrique.")}
            </p>
          </div>

          {/* Interactive Wave Banner Header */}
          <div className="mb-10 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/25 p-5 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <WaveMonogram
                  size="md"
                  variant={
                    selectedWave === "soyeuse"
                      ? "burgundy"
                      : selectedWave === "intense"
                      ? "olive"
                      : "gold"
                  }
                  withSeal
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold block">
                    {t("shop.selected_wave_label", "Sillage Ondulatoire Sélectionné")}
                  </span>
                  <h3 className="font-serif text-lg text-[#23181A] dark:text-[#FAF7F2] font-semibold">
                    {t(activeWaveTab.labelKey, activeWaveTab.label)} • {t(activeWaveTab.subKey, activeWaveTab.sub)}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#541B28] dark:text-[#DFC68B] font-bold px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm">
                  {filteredProducts.length} {t("shop.bottles_count", "flacon(s) affiché(s)")}
                </span>
              </div>
            </div>

            {/* Live Wave Canvas reacting to active wave filter */}
            <div className="h-24 sm:h-28 rounded-2xl overflow-hidden bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] dark:from-[#0E0709] dark:via-[#180B10] dark:to-[#0E0709] border border-[#541B28]/10 dark:border-[#C7A66A]/20 relative">
              <WaveCanvas
                expression={activeWaveTab.canvasExpr}
                interactive={true}
                height="100%"
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-3 right-3 sm:right-auto pointer-events-none">
                <span className="inline-block max-w-full text-[9px] uppercase tracking-wider text-[#756B6D] dark:text-[#A8989C] font-mono bg-white/80 dark:bg-[#180B10]/80 px-2 py-0.5 rounded-full border border-[#541B28]/15 dark:border-[#C7A66A]/20 leading-relaxed">
                  <span className="sm:hidden">&sim; {t("shop.wave_interact_mobile", "Touchez la vague")}</span>
                  <span className="hidden sm:inline">&sim; {t("shop.wave_interact_desktop", "Cliquez ou survolez la vague pour diffuser les effluves")}</span>
                </span>
              </div>
            </div>

            {/* Wave Tabs Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
              {WAVE_TABS.map((tab) => {
                const isSelected = selectedWave === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedWave(tab.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between",
                      isSelected
                        ? "bg-[#541B28] text-[#FAF7F2] border-[#541B28] shadow-md shadow-[#541B28]/25 scale-[1.02]"
                        : "bg-[#FAF7F2] dark:bg-[#14080D] text-[#23181A] dark:text-[#FAF7F2] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28] dark:hover:border-[#DFC68B]"
                    )}
                  >
                    <span className="font-serif text-xs font-bold tracking-wide">
                      {t(tab.labelKey, tab.label)}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] mt-0.5",
                        isSelected ? "text-[#DFC68B]" : "text-[#756B6D] dark:text-[#A8989C]"
                      )}
                    >
                      {t(tab.subKey, tab.sub)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Olfactory Family Toolbar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-[#756B6D] dark:text-[#A8989C]" />
              <input
                type="text"
                placeholder={t("shop.search_placeholder", "Rechercher par note, nom...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl pl-9 rtl:pl-8 rtl:pr-9 pr-8 py-2 text-xs text-[#23181A] dark:text-[#FAF7F2] placeholder:text-[#756B6D] dark:placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-1/2 -translate-y-1/2 text-[#756B6D] hover:text-[#541B28] dark:hover:text-[#DFC68B] p-1"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
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
                        : "bg-white dark:bg-[#1A0C13] text-[#5A4B4E] dark:text-[#D8CCD0] hover:text-[#541B28] dark:hover:text-[#DFC68B] border border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28] dark:hover:border-[#DFC68B]"
                    }`}
                  >
                    {fam === "all" ? t("shop.all_families", "Toutes Familles") : fam}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 ml-auto rtl:ml-0 rtl:mr-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#23181A] dark:text-[#FAF7F2] font-medium focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
                >
                  <option value="featured">{t("shop.sort_featured", "Sélection Vedette")}</option>
                  <option value="bestseller">{t("shop.sort_bestseller", "Classement Bestsellers")}</option>
                  <option value="price-asc">{t("shop.sort_price_asc", "Prix : Croissant")}</option>
                  <option value="price-desc">{t("shop.sort_price_desc", "Prix : Décroissant")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-[#756B6D]">
              <p className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] mb-2">
                {t("shop.no_results", "Aucun flacon ne correspond à votre filtre")}
              </p>
              <button
                onClick={() => {
                  setSelectedWave("all");
                  setSelectedFamily("all");
                  setSelectedIntensity("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#541B28] dark:text-[#DFC68B] font-bold underline cursor-pointer"
              >
                {t("shop.reset_filters", "Réinitialiser les filtres")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod, idx) => (
                <ProductCard key={prod.id} product={prod} priority={idx < 4} />
              ))}
            </div>
          )}

          {/* Luxury Reassurance Bar */}
          <div className="mt-16 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] block">
                  {t("shop.reassurance_sealed_title", "Flacons Scellés à la Main")}
                </span>
                <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">
                  {t("shop.reassurance_sealed_desc", "Chaque création est numérotée et scellée à la cire dans notre atelier de Nabeul.")}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] block">
                  {t("shop.reassurance_qr_title", "Certificat Numérique QR")}
                </span>
                <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">
                  {t("shop.reassurance_qr_desc", "Accédez au certificat dédié à votre nom et à la vidéo de mise en flacon.")}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] block">
                  {t("shop.reassurance_delivery_title", "Livraison Sécurisée en Tunisie")}
                </span>
                <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">
                  {t("shop.reassurance_delivery_desc", "Expédition soignée 24-48h avec paiement à la livraison (espèces ou carte).")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
