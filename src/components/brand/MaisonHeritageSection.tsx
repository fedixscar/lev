"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WaveMonogram } from "./WaveMonogram";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";

export function MaisonHeritageSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] text-[#23181A] relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C7A66A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#541B28]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Authentic Dual Cylinder Imagery & Craft Pedestal */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-[#541B28]/20 shadow-2xl group">
              <Image
                src="/brand/cylinders-dual.jpg"
                alt="Écrins cylindriques Lévania Parfums"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/80 via-[#23181A]/10 to-transparent opacity-60" />

              {/* Floating Bottom Emblem Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-[#180B10]/95 backdrop-blur-xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-xl flex items-center gap-4">
                <WaveMonogram size="md" variant="gold" withSeal />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#852538] dark:text-[#DFC68B] font-bold block">
                    Architecture &amp; Conservation
                  </span>
                  <h4 className="font-serif text-base text-[#23181A] dark:text-[#FAF7F2] font-semibold">
                    L&apos;Écrin Cylindrique Vert Olive &amp; Or
                  </h4>
                  <p className="text-[11px] text-[#756B6D] dark:text-[#B0A0A4] mt-0.5">
                    Protection absolue contre la lumière pour préserver la macération des huiles.
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge Top Right */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#541B28] text-[#FAF7F2] border border-[#C7A66A]/40 shadow-xl font-cinzel text-[11px] tracking-luxury uppercase">
              <GoldStarLozenge size={12} className="text-[#DFC68B]" />
              <span>Artisanat du Cap Bon • 2026</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Craft Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/25 font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] uppercase tracking-luxury font-bold shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Artisanat &amp; Savoir-Faire • Nabeul</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
              L&apos;Excellence du Parfum Artisanal en Tunisie.
            </h2>

            <p className="text-sm sm:text-base text-[#5A4B4E] dark:text-[#DCD0D3] leading-relaxed">
              Née à Nabeul au cœur des vergers du Cap Bon, la <strong>Maison LÉVANIA PARFUMS</strong> crée des fragrances
              uniques à haute concentration. Nous allions la fraîcheur du néroli et de la fleur d&apos;oranger à la noblesse
              des bois d&apos;olivier et des résines orientales pour une tenue remarquable.
            </p>

            <blockquote className="p-5 rounded-2xl bg-white dark:bg-[#180B10] border-l-4 border-[#541B28] dark:border-[#C7A66A] shadow-xs font-serif italic text-sm text-[#23181A] dark:text-[#FAF7F2] leading-relaxed">
              &laquo; Nous créons des parfums authentiques qui marquent les esprits et durent toute la journée, protégés dans un écrin digne des plus grands noms. &raquo;
              <span className="block text-[10px] uppercase font-sans font-bold text-[#852538] dark:text-[#DFC68B] tracking-widest mt-2 not-italic">
                &mdash; L&apos;Atelier Lévania Parfums
              </span>
            </blockquote>

            {/* 3 Pillars List */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-[#180B10]/80 border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A] dark:text-[#FAF7F2]">
                    Ingrédients Purs &amp; Longue Tenue (14h+)
                  </h4>
                  <p className="text-xs text-[#756B6D] dark:text-[#B0A0A4] mt-0.5 leading-relaxed">
                    Néroli pur de Nabeul, safran, bois d&apos;olivier et oud. Forte concentration en huiles parfumées pour un sillage durable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-[#180B10]/80 border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A] dark:text-[#FAF7F2]">
                    Écrin Cylindrique Offert pour Chaque Flacon
                  </h4>
                  <p className="text-xs text-[#756B6D] dark:text-[#B0A0A4] mt-0.5 leading-relaxed">
                    Boîte rigide vert olive et or qui protège le parfum de la lumière. Idéal et prêt à offrir en cadeau.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-[#180B10]/80 border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A] dark:text-[#FAF7F2]">
                    Flacon Dédié avec Certificat QR &amp; Nom du Client
                  </h4>
                  <p className="text-xs text-[#756B6D] dark:text-[#B0A0A4] mt-0.5 leading-relaxed">
                    Chaque bouteille porte un QR code exclusif qui affiche sur votre téléphone votre certificat nominatif officiel.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/collections"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full luxury-btn-primary flex items-center justify-center gap-2"
              >
                <span>Découvrir nos Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC68B]" />
              </Link>

              <Link
                href="/compose-box"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full luxury-btn-secondary flex items-center justify-center gap-2"
              >
                <span>Composer un Coffret Cadeau</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
