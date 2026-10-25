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
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { GoldParticlesCanvas } from "./GoldParticlesCanvas";
import { Sparkles, Wind } from "lucide-react";

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
    tag: "N°1 des Ventes • Ambre & Safran",
  },
  {
    id: "lev-03",
    slug: "neroli-flottant",
    name: "Néroli Flottant",
    subtitle: "Eau de Parfum Fraîche & Solaire",
    collectionName: "Onde Soyeuse",
    expression: "soft",
    image: "/brand/bottle-and-cylinder.jpg",
    price50ml: 175,
    price100ml: 265,
    topNotes: ["Néroli Pur de Nabeul", "Petitgrain"],
    heartNotes: ["Fleur d'Oranger", "Jasmin Blanc"],
    baseNotes: ["Musc Blanc Coton", "Bois Clair"],
    tag: "Fleur d'Oranger & Néroli de Nabeul",
  },
  {
    id: "lev-04",
    slug: "oud-imperial",
    name: "Oud Impérial",
    subtitle: "Extrait de Parfum Boisé & Intense",
    collectionName: "Onde Sombre & Boisée",
    expression: "intense",
    image: "/brand/bottle-and-cylinder.jpg",
    price50ml: 230,
    price100ml: 350,
    topNotes: ["Encens d'Oman", "Poivre Noir"],
    heartNotes: ["Oud du Cambodge", "Cuir de Cordoue"],
    baseNotes: ["Ambre Gris", "Tabac Blond"],
    tag: "Intense & Boisé • Oud Précieux",
  },
];

export function HeroFragranceStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<"50ml" | "100ml">("100ml");
  const [isSpraying, setIsSpraying] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const activeItem = HERO_STAGE_ITEMS[activeIndex];
  const activePrice = selectedFormat === "50ml" ? activeItem.price50ml : activeItem.price100ml;

  const handleSprayMist = () => {
    setIsSpraying(true);
    showToast(
      "Sillage Libéré",
      `Notes de ${activeItem.name} en diffusion active...`,
      "luxury"
    );
    setTimeout(() => {
      setIsSpraying(false);
    }, 2800);
  };

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
      "Ajouté au panier !",
      `${activeItem.name} (${selectedFormat}) — ${formatTND(activePrice)}`,
      "luxury"
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Ambient Pedestal Glow */}
      <div className="absolute -bottom-6 left-10 right-10 h-12 bg-gradient-to-r from-transparent via-[#C7A66A]/35 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* 3D Interactive Helper Tag */}
      <div className="flex items-center justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-[#180B10]/70 backdrop-blur-md border border-[#C7A66A]/30 text-[10px] font-cinzel uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] shadow-xs">
          <Sparkles className="w-3 h-3 text-[#C7A66A] animate-pulse" />
          <span>Scène 3D Interactive • Déplacez le curseur</span>
        </div>
      </div>

      {/* 3-Flacon Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-5 bg-white/80 dark:bg-[#180B10]/80 backdrop-blur-md p-1.5 rounded-full border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-sm">
        {HERO_STAGE_ITEMS.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                isSelected
                  ? "bg-[#541B28] text-[#FAF7F2] shadow-md shadow-[#541B28]/25 scale-105 border border-[#C7A66A]/40"
                  : "text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
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

      {/* Main Flacon Pedestal Frame with 3D Tilt */}
      <Card3DTilt
        maxTilt={8}
        perspective={1200}
        scale={1.02}
        enableGlare={true}
        glareOpacity={0.25}
        className="rounded-3xl"
      >
        <div className="relative rounded-3xl overflow-hidden border border-[#541B28]/20 dark:border-[#C7A66A]/30 hover:border-[#C7A66A]/50 transition-all duration-500 shadow-2xl bg-white dark:bg-[#170B10] group">
          {/* Aspect Ratio Box with Product Image */}
          <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1] dark:from-[#170B10] dark:to-[#0E0709]">
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

            {/* Live Gold Stardust Particles inside bottle atmosphere */}
            <GoldParticlesCanvas particleCount={25} className="opacity-80" />

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

            {/* Atomizer Mist Vapor Effect on click */}
            {isSpraying && (
              <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[#C7A66A]/45 via-[#DFC68B]/35 to-transparent blur-3xl animate-ping" />
                <div className="relative z-40 flex flex-col items-center gap-2 p-4 text-center">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-luxury text-[#FAF7F2] bg-[#541B28]/95 px-5 py-2 rounded-full border border-[#C7A66A] shadow-2xl backdrop-blur-md animate-bounce">
                    ✨ Sillage : {activeItem.topNotes[0]} &amp; {activeItem.heartNotes[0]}
                  </span>
                  <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#DFC68B] bg-black/75 px-3 py-1 rounded-full backdrop-blur-md border border-[#DFC68B]/30">
                    Tenue 14h+ Garantie • Extrait Absolu
                  </span>
                </div>
              </div>
            )}

            {/* Top Floating Badge & Spray Mist Button */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#170B10]/90 backdrop-blur-md border border-[#541B28]/20 dark:border-[#C7A66A]/30 font-cinzel text-[10px] uppercase tracking-luxury font-bold text-[#541B28] dark:text-[#DFC68B] shadow-sm">
                <GoldStarLozenge size={10} className="text-[#C7A66A]" />
                <span>{activeItem.tag}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSprayMist}
                  disabled={isSpraying}
                  className="pointer-events-auto px-3 py-1.5 rounded-full bg-[#541B28]/90 hover:bg-[#66182C] text-[#FAF7F2] text-[10px] font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#C7A66A]/40 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                  title="Vaporiser pour diffuser les notes olfactives"
                >
                  <Wind className={cn("w-3 h-3 text-[#DFC68B]", isSpraying && "animate-spin")} />
                  <span>{isSpraying ? "Diffusion..." : "Vaporiser"}</span>
                </button>

                <span className="hidden min-[360px]:inline-block font-cinzel text-[10px] uppercase tracking-luxury font-bold px-3 py-1.5 rounded-full bg-[#541B28]/90 text-white backdrop-blur-md border border-[#C7A66A]/30">
                  {activeItem.expression.toUpperCase()}
                </span>
              </div>
            </div>

          {/* Floating Luxury Details Card */}
          <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 dark:bg-[#170B10]/95 backdrop-blur-xl border border-[#541B28]/25 dark:border-[#C7A66A]/35 shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <WaveMonogram
                    size="xs"
                    variant={activeItem.expression === "soft" ? "burgundy" : "gold"}
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#852538] dark:text-[#EACCA0] font-bold">
                    {activeItem.collectionName}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-burgundy-gradient font-light">
                  {activeItem.name}
                </h3>
                <p className="text-[11px] text-[#756B6D] dark:text-[#B0A0A4] italic -mt-0.5">{activeItem.subtitle}</p>
              </div>

              {/* Format Switcher */}
              <div className="flex bg-[#FAF7F2] dark:bg-[#0E0709] p-1 rounded-xl border border-[#541B28]/15 dark:border-[#C7A66A]/20 shrink-0">
                {(["50ml", "100ml"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedFormat(sz)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all",
                      selectedFormat === sz
                        ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
                        : "text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Notes Preview */}
            <div className="flex flex-wrap gap-1.5 my-3 pt-3 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
              {activeItem.topNotes.map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] text-[#4A3B3E] dark:text-[#FAF7F2] border border-[#541B28]/15 dark:border-[#C7A66A]/20"
                >
                  {note}
                </span>
              ))}
              {activeItem.baseNotes.map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-semibold border border-[#541B28]/25 dark:border-[#C7A66A]/30"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Price & Action Row */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#A8989C] block">
                  Prix Flacon ({selectedFormat})
                </span>
                <span className="font-serif text-xl font-bold text-[#541B28] dark:text-[#DFC68B]">
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
                  className="p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#14080D] hover:bg-white dark:hover:bg-[#220E16] text-[#541B28] dark:text-[#DFC68B] border border-[#541B28]/25 dark:border-[#C7A66A]/30 hover:border-[#541B28] transition-all active:scale-95"
                  title="Voir la fiche détaillée"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Card3DTilt>
    </div>
  );
}
