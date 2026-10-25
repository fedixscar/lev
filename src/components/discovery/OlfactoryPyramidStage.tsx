"use client";

import React, { useState } from "react";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { Clock, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
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
    actNumber: "TEMPS 1",
    title: "L'Ouverture Fraîche",
    subtitle: "Notes de Tête • Les 30 Premières Minutes",
    timeframe: "Dès la vaporisation (0 à 30 min)",
    description:
      "C'est la première impression que vous et votre entourage ressentez. Une envolée vive, hespéridée et pétillante qui éveille les sens avec élégance.",
    keyIngredients: [
      { name: "Safran Pur", origin: "Méditerranée", role: "Éclat doré & chaleur vive" },
      { name: "Néroli Distillé", origin: "Nabeul, Cap Bon", role: "Fraîcheur florale cristalline" },
      { name: "Bergamote Noble", origin: "Calabre", role: "Zeste solaire pétillant" },
      { name: "Baies Roses", origin: "Océan Indien", role: "Vibration épicée subtile" },
    ],
    sensation: "Fraîcheur vive, éclat solaire et énergie immédiate.",
    badge: "Première Impression",
    gradient: "from-[#F3ECE1] to-white",
  },
  {
    id: "heart",
    actNumber: "TEMPS 2",
    title: "Le Cœur du Parfum",
    subtitle: "Notes de Cœur • Votre Vraie Signature",
    timeframe: "Pendant 30 min à 4 heures",
    description:
      "Le véritable caractère de votre parfum. Les huiles précieuses se réchauffent au contact de votre peau pour exprimer votre charme et votre présence.",
    keyIngredients: [
      { name: "Bois d'Olivier", origin: "Cap Bon centenaire", role: "Texture boisée chaleureuse" },
      { name: "Rose Centifolia", origin: "Damas", role: "Élégance florale noble" },
      { name: "Fleur d'Oranger", origin: "Cap Bon", role: "Douceur solaire envoûtante" },
      { name: "Cèdre de l'Atlas", origin: "Atlas marocain", role: "Structure boisée raffinée" },
    ],
    sensation: "Profondeur enveloppante, élégance naturelle et présence magnétique.",
    badge: "Signature Quotidienne",
    gradient: "from-[#541B28]/10 to-[#FAF7F2]",
  },
  {
    id: "base",
    actNumber: "TEMPS 3",
    title: "La Longue Tenue",
    subtitle: "Notes de Fond • Jusqu'au Lendemain",
    timeframe: "De 4h à 18h et plus",
    description:
      "L'accord le plus riche et persistant. Grâce à une macération artisanale prolongée, ces notes nobles restent sur votre peau et vos vêtements jusqu'au lendemain.",
    keyIngredients: [
      { name: "Oud Sauvage", origin: "Orient rare", role: "Puissance & caractère" },
      { name: "Ambre Gris Solaire", origin: "Méditerranée", role: "Chaleur & tenue exceptionnelle" },
      { name: "Muscs Blancs Coton", origin: "Haute Parfumerie", role: "Douceur soyeuse et propre" },
      { name: "Vanille Bourbon", origin: "Madagascar", role: "Rondeur délicate et gourmande" },
    ],
    sensation: "Tenue remarquable, réconfort et sillage inoubliable.",
    badge: "Très Longue Tenue (18h+)",
    gradient: "from-[#3B121C]/15 to-white",
  },
];

export function OlfactoryPyramidStage() {
  const [activeAct, setActiveAct] = useState<"head" | "heart" | "base">("heart");
  const act = PYRAMID_ACTS.find((a) => a.id === activeAct) || PYRAMID_ACTS[1];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#12080D] text-[#23181A] dark:text-[#FAF7F2] border-y border-[#541B28]/15 dark:border-[#C7A66A]/20">
      {/* Decorative ambient subtle wave background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C7A66A]/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#541B28]/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border border-[#541B28]/25 dark:border-[#C7A66A]/30 font-cinzel text-[10px] text-[#541B28] dark:text-[#DFC68B] uppercase tracking-luxury font-bold mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />
            <span>Guide Olfactif &bull; Comprendre les Parfums</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
            Comment Évolue Votre Parfum ?
          </h2>

          <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed mt-3">
            Un parfum de qualité vit et change au cours de la journée. Voici les <strong>trois temps</strong> qui composent
            chaque flacon Lévania pour vous offrir une tenue exceptionnelle.
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
                    : "bg-[#FAF7F2] dark:bg-[#180B10] hover:bg-white dark:hover:bg-[#200F17] text-[#23181A] dark:text-[#FAF7F2] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28]/40 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-serif text-xs font-bold tracking-widest uppercase",
                      isSelected ? "text-[#DFC68B]" : "text-[#541B28] dark:text-[#DFC68B]"
                    )}
                  >
                    {item.actNumber}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border font-mono",
                      isSelected
                        ? "bg-[#C7A66A]/20 border-[#C7A66A]/40 text-[#DFC68B]"
                        : "bg-white dark:bg-[#12080D] border-[#541B28]/15 dark:border-[#C7A66A]/20 text-[#756B6D] dark:text-[#A8989C]"
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold transition-colors",
                      isSelected ? "text-[#FAF7F2]" : "text-[#23181A] dark:text-[#FAF7F2] group-hover:text-[#541B28] dark:group-hover:text-[#DFC68B]"
                    )}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-[11px] mt-1.5",
                      isSelected ? "text-[#D5C4C7]" : "text-[#756B6D] dark:text-[#A8989C]"
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
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] dark:from-[#1C0D15] dark:via-[#14080D] dark:to-[#1C0D15] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <WaveMonogram size="sm" variant="gold" withSeal />
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#852538] dark:text-[#DFC68B]">
                  {act.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                {act.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed">
                {act.description}
              </p>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] font-bold block">
                  Empreinte Sensorielle :
                </span>
                <p className="font-serif italic text-sm text-[#23181A] dark:text-[#FAF7F2]">
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
              <span className="text-xs uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                Absolus & Matières Premières Révélées :
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {act.keyIngredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-sm hover:border-[#541B28] dark:hover:border-[#DFC68B] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-bold text-[#23181A] dark:text-[#FAF7F2]">
                        {ing.name}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-semibold">
                        {ing.origin}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">{ing.role}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/70 dark:bg-[#180B10]/70 border border-[#541B28]/10 dark:border-[#C7A66A]/20 text-[11px] text-[#756B6D] dark:text-[#A8989C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#434B36] dark:text-[#C7A66A] shrink-0" />
                <span>Macération prolongée en cuve inox thermorégulée selon les préceptes de Grasse et de Tunis.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
