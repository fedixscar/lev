"use client";

import React, { useState } from "react";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { Sparkles, Clock, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PyramidAct {
  id: "head" | "heart" | "base";
  actNumber: string;
  title: string;
  subtitle: string;
  timeframe: string;
  description: string;
  keyIngredients: { name: string; origin: string; role: string }[];
  sensation: string;
  badge: string;
  gradient: string;
}

const PYRAMID_ACTS: PyramidAct[] = [
  {
    id: "head",
    actNumber: "ACTE I",
    title: "L'Éveil Lumineux",
    subtitle: "Notes de Tête &bull; Le Premier Souffle",
    timeframe: "0 à 30 minutes après vaporisation",
    description:
      "La première onde olfactive libérée par l'atomiseur. Une envolée vive, hespéridée et précieusement épicée qui capte instantanément l'attention et éveille les sens sans jamais heurter.",
    keyIngredients: [
      { name: "Safran Pur", origin: "Méditerranée", role: "Éclat doré & chaleur vive" },
      { name: "Néroli Distillé", origin: "Nabeul, Cap Bon", role: "Fraîcheur florale cristalline" },
      { name: "Bergamote Noble", origin: "Calabre", role: "Zeste solaire pétillant" },
      { name: "Baies Roses", origin: "Océan Indien", role: "Vibration épicée subtile" },
    ],
    sensation: "Fraîcheur impériale, éclat solaire et diffusion immédiate.",
    badge: "Diffusion Immédiate",
    gradient: "from-[#F3ECE1] to-white",
  },
  {
    id: "heart",
    actNumber: "ACTE II",
    title: "L'Âme du Sillage",
    subtitle: "Notes de Cœur &bull; La Signature Vivante",
    timeframe: "30 minutes à 4 heures",
    description:
      "Le cœur battant de la création Lévania. Lorsque l'alcool s'est totalement évaporé, l'huile précieuse fusionne avec la chaleur de votre épiderme pour exprimer la véritable identité du parfum.",
    keyIngredients: [
      { name: "Bois d'Olivier", origin: "Cap Bon centenaire", role: "Texture boisée texturée & rondeur" },
      { name: "Rose Centifolia", origin: "Damas", role: "Velouté charnel & noblesse" },
      { name: "Fleur d'Oranger", origin: "Cap Bon", role: "Opulence solaire envoûtante" },
      { name: "Cèdre de l'Atlas", origin: "Atlas marocain", role: "Structure architecturale noble" },
    ],
    sensation: "Profondeur enveloppante, élégance royale et présence magnétique.",
    badge: "Cœur Vibrant",
    gradient: "from-[#541B28]/10 to-[#FAF7F2]",
  },
  {
    id: "base",
    actNumber: "ACTE III",
    title: "L'Empreinte Souveraine",
    subtitle: "Notes de Fond &bull; La Mémoire Éternelle",
    timeframe: "4 heures jusqu'à 18 heures et plus",
    description:
      "L'accord le plus dense et le plus opulent de notre formule. Fixé par de longues semaines de macération artisanale, il laisse sur les vêtements et la peau un sillage mémorable qui défie le temps.",
    keyIngredients: [
      { name: "Oud Sauvage", origin: "Orient rare", role: "Puissance tellurique & mystère" },
      { name: "Ambre Gris Solaire", origin: "Méditerranée", role: "Sillage chaud & tenue légendaire" },
      { name: "Muscs Blancs Coton", origin: "Haute Parfumerie", role: "Sensation seconde peau poudrée" },
      { name: "Vanille Bourbon", origin: "Madagascar", role: "Douceur balsamique enveloppante" },
    ],
    sensation: "Tenue magistrale, rémanence indélébile et signature intime.",
    badge: "Ultra-Persistance (18h+)",
    gradient: "from-[#3B121C]/15 to-white",
  },
];

export function OlfactoryPyramidStage() {
  const [activeAct, setActiveAct] = useState<"head" | "heart" | "base">("heart");
  const act = PYRAMID_ACTS.find((a) => a.id === activeAct) || PYRAMID_ACTS[1];

  return (
    <section className="py-24 relative overflow-hidden bg-white text-[#23181A] border-y border-[#541B28]/15">
      {/* Decorative ambient subtle wave background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C7A66A]/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#541B28]/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/25 text-xs text-[#541B28] uppercase tracking-[0.25em] font-bold mb-4">
            <Compass className="w-3.5 h-3.5 text-[#541B28]" />
            <span>Architecture Olfactive de la Maison</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
            Les Trois Actes du Sillage Lévania
          </h2>

          <p className="text-sm text-[#5A4B4E] leading-relaxed mt-3">
            Un grand parfum ne se dévoile jamais d&apos;un seul coup. C&apos;est une partition temporelle
            conçue pour évoluer harmonieusement au contact de votre chaleur corporelle.
          </p>
        </div>

        {/* 3 Interactive Act Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          {PYRAMID_ACTS.map((item) => {
            const isSelected = activeAct === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveAct(item.id)}
                className={cn(
                  "p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group",
                  isSelected
                    ? "bg-[#541B28] text-[#FAF7F2] border-[#C7A66A] shadow-xl ring-1 ring-[#C7A66A]/40 scale-[1.02]"
                    : "bg-[#FAF7F2] hover:bg-white text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]/40 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-serif text-xs font-bold tracking-widest uppercase",
                      isSelected ? "text-[#DFC68B]" : "text-[#541B28]"
                    )}
                  >
                    {item.actNumber}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border font-mono",
                      isSelected
                        ? "bg-[#C7A66A]/20 border-[#C7A66A]/40 text-[#DFC68B]"
                        : "bg-white border-[#541B28]/15 text-[#756B6D]"
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold transition-colors",
                      isSelected ? "text-[#FAF7F2]" : "text-[#23181A] group-hover:text-[#541B28]"
                    )}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-[11px] mt-1.5",
                      isSelected ? "text-[#D5C4C7]" : "text-[#756B6D]"
                    )}
                  >
                    <Clock className="w-3 h-3 text-[#C7A66A]" />
                    <span>{item.timeframe}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Act Presentation Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#541B28]/20 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <WaveMonogram size="sm" variant="gold" withSeal />
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#852538]">
                  {act.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                {act.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
                {act.description}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#541B28] font-bold block">
                  Empreinte Sensorielle :
                </span>
                <p className="font-serif italic text-sm text-[#23181A]">
                  &laquo; {act.sensation} &raquo;
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Explorer les Parfums en Boutique</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC68B]" />
                </Link>
              </div>
            </div>

            {/* Right Ingredients Grid Column */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Absolus & Matières Premières Révélées :
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {act.keyIngredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm hover:border-[#541B28] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-bold text-[#23181A]">
                        {ing.name}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#541B28]/10 text-[#541B28] font-semibold">
                        {ing.origin}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#756B6D]">{ing.role}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-[#541B28]/10 text-[11px] text-[#756B6D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#434B36] shrink-0" />
                <span>Macération prolongée en cuve inox thermorégulée selon les préceptes de Grasse et de Tunis.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
