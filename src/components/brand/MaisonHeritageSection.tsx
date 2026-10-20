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
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#541B28]/20 shadow-xl flex items-center gap-4">
                <WaveMonogram size="md" variant="gold" withSeal />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#852538] font-bold block">
                    Architecture & Conservation
                  </span>
                  <h4 className="font-serif text-base text-[#23181A] font-semibold">
                    L&apos;Écrin Cylindrique Vert Olive & Or
                  </h4>
                  <p className="text-[11px] text-[#756B6D] mt-0.5">
                    Protection absolue contre la lumière pour préserver la macération des huiles.
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge Top Right */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#541B28] text-[#FAF7F2] border border-[#C7A66A]/40 shadow-xl font-cinzel text-[11px] tracking-luxury uppercase">
              <GoldStarLozenge size={12} className="text-[#DFC68B]" />
              <span>Artisanat du Cap Bon &bull; 2026</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Craft Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#541B28]/20 font-cinzel text-[11px] text-[#541B28] uppercase tracking-luxury font-bold shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Le Manifeste de la Maison</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
              Façonnée entre les Vents de Méditerranée & la Noblesse d&apos;Orient.
            </h2>

            <p className="text-sm sm:text-base text-[#5A4B4E] leading-relaxed">
              Née sous le ciel ardent de la Tunisie et nourrie par les secrets séculaires des alambics de Nabeul,
              la <strong>Maison LÉVANIA PARFUMS</strong> conçoit le parfum non comme un apparat statique, mais comme
              une onde vivante en perpétuelle pulsation.
            </p>

            <blockquote className="p-5 rounded-2xl bg-white border-l-4 border-[#541B28] shadow-sm font-serif italic text-sm text-[#23181A] leading-relaxed">
              &laquo; Chaque flacon Lévania enferme la mémoire d&apos;un olivier centenaire, le frisson d&apos;un néroli pur cueilli à l&apos;aube et l&apos;obscure majesté d&apos;un oud vieilli dans l&apos;ombre. &raquo;
              <span className="block text-[10px] uppercase font-sans font-bold text-[#852538] tracking-widest mt-2 not-italic">
                &mdash; Le Nez de la Maison Lévania
              </span>
            </blockquote>

            {/* 3 Pillars List */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#541B28]/15 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  I
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A]">
                    Le Terroir Méditerranéen & Matières Premières Rares
                  </h4>
                  <p className="text-xs text-[#756B6D] mt-0.5 leading-relaxed">
                    Néroli pur du Cap Bon, absolu de rose de Damas, safran et bois précieux d&apos;olivier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#541B28]/15 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  II
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A]">
                    Le Flacon Iconique & son Cylindre Vert Olive
                  </h4>
                  <p className="text-xs text-[#756B6D] mt-0.5 leading-relaxed">
                    Verre lourd, capot noir d&apos;ébène et étiquette ornée du sceau officiel Lévania.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#541B28]/15 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                  III
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#23181A]">
                    Traçabilité par Sceau Numéroté & QR Code
                  </h4>
                  <p className="text-xs text-[#756B6D] mt-0.5 leading-relaxed">
                    Chaque flacon est scellé individuellement et accompagné de son certificat numérique.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/collections"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#541B28]/20 transition-all"
              >
                <span>Découvrir les 3 Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC68B]" />
              </Link>

              <Link
                href="/compose-box"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#541B28] border border-[#541B28]/30 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Composer Mon Coffret</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
