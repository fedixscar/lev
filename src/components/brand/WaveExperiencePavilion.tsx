"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WaveCanvas, WaveExpression } from "./WaveCanvas";
import { WaveMonogram } from "./WaveMonogram";
import { ArrowRight, Layers, Flame, Compass, Wind } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { formatTND, cn } from "@/lib/utils";

interface WaveFeatureData {
  title: string;
  tagline: string;
  paletteLabel: string;
  description: string;
  notes: string[];
  sillage: string;
  longevity: string;
  bestSellers: { name: string; slug: string; format: string; price: number; image: string }[];
  collectionSlug: string;
  bgGradient: string;
  borderAccent: string;
  themeColor: string;
}

const WAVE_EXPRESSIONS_DATA: Record<WaveExpression, WaveFeatureData> = {
  signature: {
    title: "L'Onde Signature (Équilibrée & Solaire)",
    tagline: "L'Équilibre Idéal • Bois d'Olivier & Ambre Doré",
    paletteLabel: "Vert Olive • Or Champagne • Ambre",
    description:
      "Le parfum emblématique de la maison. Un accord chaleureux et solaire où le bois d'olivier centenaire s'associe au safran pur et à la vanille douce. Idéal pour tous les jours comme pour les grandes occasions.",
    notes: ["Safran Méditerranéen", "Bois d'Olivier", "Ambre Solaire", "Vanille Bourbon"],
    sillage: "Diffusion Élégante (environ 2 mètres)",
    longevity: "Excellente Tenue (14h+)",
    bestSellers: [
      {
        name: "Onde d'Or",
        slug: "onde-d-or",
        format: "100ml Extrait",
        price: 295,
        image: "/brand/bottle-and-cylinder.jpg",
      },
      {
        name: "Sillage d'Olivier",
        slug: "sillage-d-olivier",
        format: "100ml Extrait",
        price: 295,
        image: "/brand/bottle-and-cylinder.jpg",
      },
    ],
    collectionSlug: "signature",
    bgGradient: "from-[#2A0B12]/95 via-[#3B121C] to-[#23181A]",
    borderAccent: "border-[#C7A66A]/40",
    themeColor: "#C7A66A",
  },
  soft: {
    title: "L'Onde Soyeuse (Fraîche & Florale)",
    tagline: "Douceur Florale • Fleur d'Oranger & Néroli",
    paletteLabel: "Ivoire • Fleur d'Oranger • Musc Blanc",
    description:
      "Un parfum lumineux et apaisant qui rappelle les jardins de Nabeul au printemps. Le néroli pur et la fleur d'oranger s'enveloppent de muscs blancs soyeux pour une sensation de propreté et d'élégance irrésistible.",
    notes: ["Néroli Pur de Nabeul", "Fleur d'Oranger", "Pétales de Jasmin", "Musc Blanc Coton"],
    sillage: "Subtil & Enveloppant",
    longevity: "Fraîcheur Durable (10h+)",
    bestSellers: [
      {
        name: "Néroli Flottant",
        slug: "neroli-flottant",
        format: "50ml Eau Noble",
        price: 175,
        image: "/brand/bottle-and-cylinder.jpg",
      },
      {
        name: "Écrin Duo Soyeux",
        slug: "coffret-prestige",
        format: "Coffret Sur-Mesure",
        price: 360,
        image: "/brand/cylinders-dual.jpg",
      },
    ],
    collectionSlug: "soyeuse",
    bgGradient: "from-[#FAF7F2] via-[#F3ECE1] to-[#EAE1D2]",
    borderAccent: "border-[#541B28]/25",
    themeColor: "#852538",
  },
  intense: {
    title: "L'Onde Sombre (Boisée & Intense)",
    tagline: "Caractère Affirmé • Oud Majestueux & Cuir",
    paletteLabel: "Noir Ébène • Oud Impérial • Épices",
    description:
      "Une fragrance intense et magnétique pour ceux qui aiment les sillages puissants. L'oud sauvage et le cuir se mêlent à l'encens et au patchouli pour laisser une présence inoubliable là où vous passez.",
    notes: ["Oud Sauvage", "Cuir Noble", "Encens Noir", "Patchouli Ambré"],
    sillage: "Intense & Remarquable",
    longevity: "Très Longue Tenue (18h+)",
    bestSellers: [
      {
        name: "Rose d'Hiver",
        slug: "rose-d-hiver",
        format: "100ml Extrait Pur",
        price: 295,
        image: "/brand/bottle-and-cylinder.jpg",
      },
      {
        name: "Mystic Noir Extrait",
        slug: "sillage-d-olivier",
        format: "100ml Extrait Pur",
        price: 310,
        image: "/brand/bottle-and-cylinder.jpg",
      },
    ],
    collectionSlug: "intense",
    bgGradient: "from-[#170E10] via-[#241316] to-[#120B0C]",
    borderAccent: "border-[#9E7D42]/50",
    themeColor: "#DFC68B",
  },
};

export function WaveExperiencePavilion() {
  const [activeExpression, setActiveExpression] = useState<WaveExpression>("signature");
  const activeData = WAVE_EXPRESSIONS_DATA[activeExpression];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] text-[#23181A] relative overflow-hidden border-y border-[#541B28]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#541B28]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#541B28]/20 shadow-xs font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold mb-4">
            <WaveMonogram size="xs" variant="gold" />
            <span>Trois Styles de Parfums</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
            Choisissez Votre Style de Sillage
          </h2>

          <p className="text-sm text-[#5A4B4E] leading-relaxed mt-3">
            Chaque personne a sa personnalité. Découvrez nos <strong>trois univers de créations</strong>,
            du plus frais et délicat au plus boisé et intense.
          </p>
        </div>

        {/* ========================================================
            3 TACTILE HAUTE PARFUMERIE PORTALS
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {(["signature", "soft", "intense"] as WaveExpression[]).map((expr) => {
            const data = WAVE_EXPRESSIONS_DATA[expr];
            const isActive = activeExpression === expr;

            return (
              <button
                key={expr}
                onClick={() => setActiveExpression(expr)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-500 cursor-pointer flex flex-col justify-between group",
                  isActive
                    ? expr === "soft"
                      ? "bg-white border-[#541B28] shadow-xl ring-1 ring-[#541B28]/30 scale-[1.02]"
                      : "bg-[#3B121C] text-[#FAF7F2] border-[#C7A66A] shadow-xl ring-1 ring-[#C7A66A]/40 scale-[1.02]"
                    : "bg-white/70 hover:bg-white text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]/30 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <WaveMonogram
                    size="sm"
                    variant={
                      isActive
                        ? expr === "soft"
                          ? "burgundy"
                          : "gold"
                        : "olive"
                    }
                    withSeal
                  />
                  <span
                    className={cn(
                      "text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full border",
                      isActive
                        ? "bg-[#C7A66A]/20 border-[#C7A66A]/40 text-[#DFC68B]"
                        : "bg-black/5 border-black/10 text-[#756B6D]"
                    )}
                  >
                    {expr === "signature" ? "Signature" : expr === "soft" ? "Soyeuse" : "Sombre"}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-serif text-lg font-semibold transition-colors",
                      isActive
                        ? expr === "soft"
                          ? "text-[#541B28]"
                          : "text-[#FAF7F2]"
                        : "text-[#23181A] group-hover:text-[#541B28]"
                    )}
                  >
                    {data.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[11px] mt-1 leading-snug line-clamp-2",
                      isActive
                        ? expr === "soft"
                          ? "text-[#5A4B4E]"
                          : "text-[#D5C4C7]"
                        : "text-[#756B6D]"
                    )}
                  >
                    {data.paletteLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            MAIN INTERACTIVE WAVE PAVILION CARD
            ======================================================== */}
        <div
          className={cn(
            "rounded-3xl border shadow-2xl overflow-hidden transition-all duration-700",
            activeExpression === "soft"
              ? "bg-gradient-to-b from-white to-[#F3ECE1] text-[#23181A] border-[#541B28]/25"
              : "bg-gradient-to-b " + activeData.bgGradient + " text-[#FAF7F2] " + activeData.borderAccent
          )}
        >
          {/* Top Canvas Viewport */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-[#C7A66A]/20">
            {/* Live Harmonic Canvas Wave */}
            <WaveCanvas
              expression={activeExpression}
              speedMultiplier={1.0}
              amplitudeMultiplier={1.0}
              showParticles={true}
              interactive={true}
              height="100%"
              className="w-full h-full"
            />

            {/* In-Canvas Floating Badge */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-2xl backdrop-blur-md border shadow-lg flex items-center gap-2",
                  activeExpression === "soft"
                    ? "bg-white/90 border-[#541B28]/20 text-[#541B28]"
                    : "bg-[#23181A]/80 border-[#C7A66A]/40 text-[#DFC68B]"
                )}
              >
                <WaveMonogram size="sm" variant={activeExpression === "soft" ? "burgundy" : "gold"} />
                <span className="text-xs uppercase tracking-widest font-bold">
                  {activeData.title}
                </span>
              </div>
            </div>

            {/* Top-Right Concentration Badge */}
            <div className="hidden sm:block absolute top-5 right-5 z-20">
              <span
                className={cn(
                  "px-3 py-1.5 rounded-2xl backdrop-blur-md border text-[10px] font-serif uppercase tracking-widest font-bold",
                  activeExpression === "soft"
                    ? "bg-white/90 border-[#541B28]/20 text-[#541B28]"
                    : "bg-[#23181A]/80 border-[#C7A66A]/40 text-[#DFC68B]"
                )}
              >
                Extrait de Parfum • 28% Concentré
              </span>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-auto z-20 pointer-events-none">
              <span
                className={cn(
                  "inline-block max-w-full text-[9px] sm:text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full backdrop-blur-md border leading-relaxed",
                  activeExpression === "soft"
                    ? "bg-white/80 border-[#541B28]/20 text-[#541B28]"
                    : "bg-black/50 border-[#C7A66A]/30 text-[#DFC68B]"
                )}
              >
                <span className="sm:hidden">&sim; Touchez pour diffuser</span>
                <span className="hidden sm:inline">&sim; Touchez ou survolez pour diffuser l&apos;onde olfactive</span>
              </span>
            </div>
          </div>

          {/* Bottom Pavilion Content Grid */}
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Story & Accords (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span
                    className={cn(
                      "text-xs uppercase tracking-widest font-bold block mb-1",
                      activeExpression === "soft" ? "text-[#541B28]" : "text-[#DFC68B]"
                    )}
                  >
                    {activeData.paletteLabel}
                  </span>
                  <h3
                    className={cn(
                      "font-serif text-2xl sm:text-3xl font-light",
                      activeExpression === "soft" ? "text-burgundy-gradient" : "text-[#FAF7F2]"
                    )}
                  >
                    {activeData.tagline}
                  </h3>
                </div>

                <p
                  className={cn(
                    "text-xs sm:text-sm leading-relaxed",
                    activeExpression === "soft" ? "text-[#5A4B4E]" : "text-[#D5C4C7]"
                  )}
                >
                  {activeData.description}
                </p>

                {/* Olfactory Notes Pill Bar */}
                <div className="pt-2">
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest font-bold block mb-2",
                      activeExpression === "soft" ? "text-[#756B6D]" : "text-[#C4B2B6]"
                    )}
                  >
                    Accords Majeurs de cette Vague
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeData.notes.map((note, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium border",
                          activeExpression === "soft"
                            ? "bg-white border-[#541B28]/20 text-[#23181A]"
                            : "bg-white/10 border-[#C7A66A]/30 text-[#FAF7F2]"
                        )}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sillage & Longevity Indicators */}
                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border",
                    activeExpression === "soft"
                      ? "bg-white/70 border-[#541B28]/15 text-[#23181A]"
                      : "bg-white/5 border-white/10 text-[#FAF7F2]"
                  )}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                      Rayonnement du Sillage
                    </span>
                    <span className="text-xs font-semibold mt-0.5 block">{activeData.sillage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                      Concentration & Tenue
                    </span>
                    <span className="text-xs font-semibold mt-0.5 block">{activeData.longevity}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Flacons Matched to this Wave (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#C7A66A]/20">
                  <span
                    className={cn(
                      "text-xs uppercase tracking-widest font-bold",
                      activeExpression === "soft" ? "text-[#541B28]" : "text-[#DFC68B]"
                    )}
                  >
                    Flacons Porteurs de l&apos;Onde
                  </span>
                  <Link
                    href={`/collections`}
                    className="text-xs hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Voir les 3 collections</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {activeData.bestSellers.map((item, i) => (
                    <Link
                      key={i}
                      href={`/products/${item.slug}`}
                      className={cn(
                        "p-3 rounded-2xl border flex items-center gap-4 transition-all duration-300 group",
                        activeExpression === "soft"
                          ? "bg-white border-[#541B28]/15 hover:border-[#541B28] hover:shadow-md"
                          : "bg-white/5 border-[#C7A66A]/20 hover:border-[#C7A66A] hover:bg-white/10"
                      )}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-black/10 bg-[#FAF7F2]">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-semibold group-hover:text-[#C7A66A] transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] opacity-70 block">{item.format}</span>
                        <span className="font-serif text-sm font-bold text-[#C7A66A] mt-0.5 block">
                          {formatTND(item.price)}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[#C7A66A]/40 flex items-center justify-center shrink-0 group-hover:bg-[#C7A66A] group-hover:text-[#2A0B12] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Direct CTA */}
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className={cn(
                      "w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg",
                      activeExpression === "soft"
                        ? "bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2]"
                        : "bg-gradient-to-r from-[#C7A66A] via-[#DFC68B] to-[#C7A66A] hover:brightness-110 text-[#2A0B12]"
                    )}
                  >
                    <span>Explorer Toutes les Fragrances {activeData.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
