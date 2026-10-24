"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WaveCanvas, WaveExpression } from "./WaveCanvas";
import { WaveMonogram } from "./WaveMonogram";
import { PRODUCTS, getAllProducts } from "@/lib/catalogue";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import {
  ShoppingBag,
  ArrowRight,
  Layers,
  Flame,
  Check,
  ShieldCheck,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";

interface HeroStageItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  collectionName: string;
  expression: WaveExpression;
  image: string;
  price50ml: number;
  price100ml: number;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  tag: string;
}

const HERO_STAGE_ITEMS: HeroStageItem[] = [
  {
    id: "lev-01",
    slug: "onde-d-or",
    name: "Onde d'Or",
    subtitle: "Extrait de Parfum Absolu",
    collectionName: "La Collection Signature",
    expression: "signature",
    image: "/brand/bottle-and-cylinder.jpg",
    price50ml: 195,
    price100ml: 295,
    topNotes: ["Safran d'Orient", "Bergamote"],
    heartNotes: ["Rose de Damas", "Cèdre Atlas"],
    baseNotes: ["Ambre Solaire", "Vanille Bourbon"],
    tag: "N°1 Sceau Doré & Bulles d'Ambre",
  },
  {
    id: "lev-03",
    slug: "neroli-flottant",
    name: "Néroli Flottant",
    subtitle: "Eau Noble de Méditerranée",
    collectionName: "Onde Soyeuse",
    expression: "soft",
    image: "/brand/bottle-and-cylinder.jpg",
    price50ml: 175,
    price100ml: 265,
    topNotes: ["Néroli Pur de Nabeul", "Petitgrain"],
    heartNotes: ["Fleur d'Oranger", "Jasmin Blanc"],
    baseNotes: ["Musc Blanc Coton", "Bois Clair"],
    tag: "Voile Lumineux & Néroli de Nabeul",
  },
  {
    id: "lev-04",
    slug: "oud-imperial",
    name: "Oud Impérial",
    subtitle: "Extrait de Parfum Majestueux",
    collectionName: "Onde Sombre & Boisée",
    expression: "intense",
    image: "/brand/bottle-and-cylinder.jpg",
    price50ml: 230,
    price100ml: 350,
    topNotes: ["Encens d'Oman", "Poivre Noir"],
    heartNotes: ["Oud du Cambodge", "Cuir de Cordoue"],
    baseNotes: ["Ambre Gris", "Tabac Blond"],
    tag: "Sillage Monumental & Oud Sombre",
  },
];

export function HeroFragranceStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<"50ml" | "100ml">("100ml");
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const activeItem = HERO_STAGE_ITEMS[activeIndex];
  const activePrice = selectedFormat === "50ml" ? activeItem.price50ml : activeItem.price100ml;

  const handleQuickAdd = () => {
    const product = getAllProducts().find((p) => p.slug === activeItem.slug) || PRODUCTS[0];
    const fmt = product.formats.find((f) => f.size === selectedFormat) || product.formats[0];

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images.main,
      formatSize: selectedFormat,
      unitPriceTND: activePrice,
      unitPriceMillimes: activePrice * 1000,
      quantity: 1,
    });

    showToast(
      "Flacon réservé au panier",
      `${activeItem.name} (${selectedFormat}) — ${formatTND(activePrice)}`,
      "luxury"
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Ambient Pedestal Glow */}
      <div className="absolute -bottom-6 left-10 right-10 h-12 bg-gradient-to-r from-transparent via-[#C7A66A]/35 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* 3-Flacon Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-5 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-[#541B28]/20 shadow-sm">
        {HERO_STAGE_ITEMS.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5",
                isSelected
                  ? "bg-[#541B28] text-[#FAF7F2] shadow-md shadow-[#541B28]/25 scale-105 border border-[#C7A66A]/40"
                  : "text-[#756B6D] hover:text-[#541B28]"
              )}
            >
              <WaveMonogram
                size="xs"
                variant={isSelected ? "gold" : item.expression === "soft" ? "burgundy" : "gold"}
              />
              <span className="hidden sm:inline font-cinzel text-[11px]">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Flacon Pedestal Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-[#541B28]/20 hover:border-[#C7A66A]/50 transition-all duration-500 shadow-2xl bg-white group">
        {/* Aspect Ratio Box with Product Image */}
        <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1]">
          <Image
            key={activeItem.slug}
            src={activeItem.image}
            alt={activeItem.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/80 via-[#23181A]/20 to-transparent opacity-70" />

          {/* Live Mini Wave Canvas on bottle base */}
          <div className="absolute bottom-0 left-0 right-0 h-28 opacity-45 pointer-events-none">
            <WaveCanvas
              expression={activeItem.expression}
              speedMultiplier={0.9}
              amplitudeMultiplier={0.8}
              showParticles={true}
              height="100%"
              className="w-full h-full"
            />
          </div>

          {/* Top Floating Badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#541B28]/20 font-cinzel text-[10px] uppercase tracking-luxury font-bold text-[#541B28] shadow-sm">
              <GoldStarLozenge size={10} className="text-[#C7A66A]" />
              <span>{activeItem.tag}</span>
            </div>

            <span className="hidden min-[360px]:inline-block font-cinzel text-[10px] uppercase tracking-luxury font-bold px-3 py-1.5 rounded-full bg-[#541B28]/90 text-white backdrop-blur-md border border-[#C7A66A]/30">
              {activeItem.expression.toUpperCase()} WAVE
            </span>
          </div>

          {/* Floating Luxury Details Card */}
          <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#541B28]/25 shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <WaveMonogram
                    size="xs"
                    variant={activeItem.expression === "soft" ? "burgundy" : "gold"}
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#852538] font-bold">
                    {activeItem.collectionName}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-burgundy-gradient font-light">
                  {activeItem.name}
                </h3>
                <p className="text-[11px] text-[#756B6D] italic -mt-0.5">{activeItem.subtitle}</p>
              </div>

              {/* Format Switcher */}
              <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#541B28]/15 shrink-0">
                {(["50ml", "100ml"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedFormat(sz)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all",
                      selectedFormat === sz
                        ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
                        : "text-[#756B6D] hover:text-[#541B28]"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Notes Preview */}
            <div className="flex flex-wrap gap-1.5 my-3 pt-3 border-t border-[#541B28]/10">
              {activeItem.topNotes.map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#4A3B3E] border border-[#541B28]/15"
                >
                  {note}
                </span>
              ))}
              {activeItem.baseNotes.map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#541B28]/10 text-[#541B28] font-semibold border border-[#541B28]/25"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Price & Action Row */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#756B6D] block">
                  Prix Flacon ({selectedFormat})
                </span>
                <span className="font-serif text-xl font-bold text-[#541B28]">
                  {formatTND(activePrice)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickAdd}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#541B28] via-[#66182C] to-[#541B28] hover:brightness-110 text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#541B28]/25 border border-[#C7A66A]/40 active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </button>

                <Link
                  href={`/products/${activeItem.slug}`}
                  className="p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#541B28] border border-[#541B28]/25 hover:border-[#541B28] transition-all active:scale-95"
                  title="Voir la fiche détaillée"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
