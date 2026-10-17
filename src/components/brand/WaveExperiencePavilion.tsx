"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WaveCanvas, WaveExpression } from "./WaveCanvas";
import { WaveMonogram } from "./WaveMonogram";
import { Sparkles, ArrowRight, Layers, Flame, Compass, Wind, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

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
    title: "Vague Signature",
    tagline: "L'Équilibre Souverain &bull; Noblesse Méditerranéenne",
    paletteLabel: "Vert Olive &bull; Or Champagne &bull; Bordeaux Impérial",
    description:
      "L'expression originelle de la Maison Lévania. Une onde fluide et généreuse où le bois d'olivier centenaire s'enlace au safran pur et à l'ambre solaire. Ni trop dense, ni éphémère : elle signe une présence royale et inoubliable.",
    notes: ["Safran de Méditerranée", "Bois d'Olivier", "Ambre Solaire", "Vanille Bourbon"],
    sillage: "Rayonnant &bull; 2 à 3 mètres de diffusion contrôlée",
    longevity: "Tenue Haute Concentration (14h+)",
    bestSellers: [
      {
        name: "Onde d'Or",
        slug: "onde-d-or",
        format: "100ml Extrait",
        price: 295,
        image: "/brand/bottle-black-cap.jpg",
      },
      {
        name: "Sillage d'Olivier",
        slug: "sillage-d-olivier",
        format: "100ml Extrait",
        price: 295,
        image: "/brand/bottle-black-cap.jpg",
      },
    ],
    collectionSlug: "signature",
    bgGradient: "from-[#2A0B12]/95 via-[#3B121C] to-[#23181A]",
    borderAccent: "border-[#C7A66A]/40",
    themeColor: "#C7A66A",
  },
  soft: {
    title: "Onde Soyeuse",
    tagline: "La Caresse Diaphane &bull; Lumière & Voile Intime",
    paletteLabel: "Ivoire Impérial &bull; Crème de Riz &bull; Rose Poudrée",
    description:
      "Une onde délicate comme une mousseline de soie glissant sur la peau nue. La fraîcheur lumineuse du néroli pur de Nabeul et de la fleur d'oranger se fond dans un cœur poudré de muscs blancs. Une sensualité subtile qui ne s'impose jamais.",
    notes: ["Néroli Pur de Nabeul", "Fleur d'Oranger", "Poudre d'Iris", "Muscs Blancs Coton"],
    sillage: "Intime &bull; Halo enveloppant au creux du cou",
    longevity: "Fraîcheur Persistante (10h+)",
    bestSellers: [
      {
        name: "Néroli Flottant",
        slug: "neroli-flottant",
        format: "50ml Eau Noble",
        price: 175,
        image: "/brand/bottle-black-cap.jpg",
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
    title: "Onde Sombre & Boisée",
    tagline: "Le Sillage Tellurique &bull; Mystère & Puissance Orientale",
    paletteLabel: "Noir Ébène &bull; Oud Impérial &bull; Or Métallique",
    description:
      "La force brute et envoûtante des nuits sans lune. Conçue pour les connaisseurs de sillages audacieux, cette onde sculpte l'espace par des contrastes dramatiques d'encens noir, d'accord cuir tanné et d'oud sauvage de haute macération.",
    notes: ["Oud Sauvage", "Cuir d'Orient", "Encens d'Oman", "Patchouli Sombre"],
    sillage: "Monumental &bull; Sillage puissant qui traverse les pièces",
    longevity: "Ultra-Tenue Extrait (18h+)",
    bestSellers: [
      {
        name: "Rose d'Hiver",
        slug: "rose-d-hiver",
        format: "100ml Extrait Pur",
        price: 295,
        image: "/brand/bottle-black-cap.jpg",
      },
      {
        name: "Mystic Noir Extrait",
        slug: "sillage-d-olivier",
        format: "100ml Extrait Pur",
        price: 310,
        image: "/brand/bottle-black-cap.jpg",
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
  const [intensityMode, setIntensityMode] = useState<"gentle" | "normal" | "dramatic">("normal");
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  const activeData = WAVE_EXPRESSIONS_DATA[activeExpression];

  const intensityMultipliers = {
    gentle: { speed: 0.7, amp: 0.7, label: "Délicate" },
    normal: { speed: 1.0, amp: 1.0, label: "Équilibrée" },
    dramatic: { speed: 1.4, amp: 1.35, label: "Majestueuse" },
  };

  const currentMult = intensityMultipliers[intensityMode];

  return (
    <section className="py-24 bg-[#FAF7F2] text-[#23181A] relative overflow-hidden border-y border-[#541B28]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#541B28]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#541B28]/20 shadow-sm text-xs text-[#541B28] uppercase tracking-[0.25em] font-bold mb-4">
            <WaveMonogram size="xs" variant="gold" />
            <span>L&apos;Identité Fondatrice de la Maison</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
            La Vague Lévania &bull; L&apos;Onde Vivante des Sens
          </h2>

          <p className="text-sm text-[#5A4B4E] leading-relaxed mt-3">
            Le parfum n&apos;est pas une formule inerte : c&apos;est un fluide vivant en perpétuelle diffusion.
            Explorez nos <strong>trois expressions sculpturales</strong> en interagissant avec l&apos;onde ci-dessous.
          </p>
        </div>

        {/* ========================================================
            EXPRESSION SELECTOR TABS
            ======================================================== */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8 flex-wrap">
          {(["signature", "soft", "intense"] as WaveExpression[]).map((expr) => {
            const data = WAVE_EXPRESSIONS_DATA[expr];
            const isActive = activeExpression === expr;

            return (
              <button
                key={expr}
                onClick={() => setActiveExpression(expr)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-2.5 shadow-sm border",
                  isActive
                    ? expr === "soft"
                      ? "bg-white text-[#541B28] border-[#541B28] shadow-md scale-105"
                      : "bg-[#541B28] text-[#FAF7F2] border-[#C7A66A] shadow-md scale-105"
                    : "bg-white/80 text-[#756B6D] hover:text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]/40"
                )}
              >
                {expr === "signature" && <Sparkles className="w-3.5 h-3.5 text-[#DFC68B]" />}
                {expr === "soft" && <Layers className="w-3.5 h-3.5 text-[#852538]" />}
                {expr === "intense" && <Flame className="w-3.5 h-3.5 text-[#DFC68B]" />}
                <span>{data.title}</span>
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
          <div className="relative h-72 sm:h-96 w-full overflow-hidden border-b border-[#C7A66A]/20">
            {/* Live Harmonic Canvas Wave */}
            <WaveCanvas
              expression={activeExpression}
              speedMultiplier={currentMult.speed}
              amplitudeMultiplier={currentMult.amp}
              showParticles={particlesEnabled}
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

            {/* In-Canvas Floating Controls */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
              {/* Intensity Picker */}
              <div
                className={cn(
                  "px-3 py-1.5 rounded-2xl backdrop-blur-md border text-[11px] font-semibold flex items-center gap-2",
                  activeExpression === "soft"
                    ? "bg-white/90 border-[#541B28]/20 text-[#23181A]"
                    : "bg-[#23181A]/80 border-[#C7A66A]/30 text-[#FAF7F2]"
                )}
              >
                <Sliders className="w-3.5 h-3.5 text-[#C7A66A]" />
                <span className="hidden sm:inline">Intensité :</span>
                {(["gentle", "normal", "dramatic"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setIntensityMode(lvl)}
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] transition-colors",
                      intensityMode === lvl
                        ? "bg-[#C7A66A] text-[#2A0B12] font-bold"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {intensityMultipliers[lvl].label}
                  </button>
                ))}
              </div>

              {/* Particle Toggle */}
              <button
                onClick={() => setParticlesEnabled(!particlesEnabled)}
                title="Activer / Désactiver la brume d'essence"
                className={cn(
                  "p-2 rounded-2xl backdrop-blur-md border text-xs transition-colors",
                  particlesEnabled
                    ? "bg-[#C7A66A]/30 border-[#C7A66A] text-[#DFC68B]"
                    : "bg-black/30 border-white/20 text-white/50"
                )}
              >
                <Wind className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="absolute bottom-4 left-6 z-20 pointer-events-none">
              <span
                className={cn(
                  "text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full backdrop-blur-md border",
                  activeExpression === "soft"
                    ? "bg-white/80 border-[#541B28]/20 text-[#541B28]"
                    : "bg-black/50 border-[#C7A66A]/30 text-[#DFC68B]"
                )}
              >
                &sim; Touchez ou survolez la vague pour diffuser des ondes liquides
              </span>
            </div>
          </div>

          {/* Bottom Pavilion Content Grid */}
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Story & Pyramid (7 cols) */}
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
                <div className="flex items-center justify-between pb-2 border-b border-[#C7A66A]/20">
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
                    <span>Voir collection</span>
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
                      <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-black/10 bg-[#FAF7F2]">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-semibold group-hover:text-[#C7A66A] transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] opacity-70 block">{item.format}</span>
                        <span className="font-serif text-sm font-bold text-[#C7A66A] mt-0.5 block">
                          {item.price.toFixed(3)} TND
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
