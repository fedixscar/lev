"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Gift,
  Flame,
  ChevronDown,
  ShieldCheck,
  Award,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveExperiencePavilion } from "@/components/brand/WaveExperiencePavilion";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { HeroFragranceStage } from "@/components/brand/HeroFragranceStage";
import { MaisonHeritageSection } from "@/components/brand/MaisonHeritageSection";
import { OlfactoryPyramidStage } from "@/components/discovery/OlfactoryPyramidStage";
import { BestSellerPodium } from "@/components/products/BestSellerPodium";
import { PRODUCTS } from "@/lib/catalogue";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================
            1. HERO SECTION (Haute Parfumerie & Signature Wave)
            ======================================================== */}
        <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
          {/* Ambient background glows in Imperial Burgundy and Champagne Gold */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#541B28]/8 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#C7A66A]/12 rounded-full blur-[140px] pointer-events-none" />

          {/* Background Signature Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-35 pointer-events-none">
            <SignatureWave expression="signature" intensity="normal" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Text Editorial Column */}
              <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/95 border border-[#541B28]/20 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold backdrop-blur-md shadow-sm">
                  <WaveMonogram size="xs" variant="gold" />
                  <span>Haute Parfumerie &bull; Nabeul &bull; Cap Bon</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-burgundy-gradient leading-[1.06] tracking-tight">
                  L&apos;Art du Sillage en Mouvement.
                </h1>

                <p className="text-base sm:text-lg text-[#5A4B4E] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Une onde liquide sculptée dans la noblesse des bois d&apos;olivier centenaires,
                  du safran pur et des fleurs solaires de Méditerranée. L&apos;élégance vivante d&apos;un sillage inoubliable.
                </p>

                {/* Refined Luxury CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#541B28] via-[#7A263B] to-[#541B28] text-[#FAF7F2] font-cinzel font-bold text-xs uppercase tracking-luxury shadow-xl shadow-[#541B28]/25 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-[#C7A66A]/40"
                  >
                    <span>Explorer la Maison</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </Link>

                  <Link
                    href="/discover"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#F3ECE1] text-[#541B28] border border-[#541B28]/30 font-cinzel font-bold text-xs uppercase tracking-luxury shadow-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#C7A66A]" />
                    <span>Diagnostic Sillage IA</span>
                  </Link>
                </div>

                {/* Subtle Editorial Signature Line */}
                <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 font-cinzel text-[10px] tracking-luxury uppercase text-[#756B6D]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C7A66A]" />
                    <span>Extraits Purs & Eaux Nobles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#541B28]" />
                    <span>Écrins Cylindriques Scellés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#434B36]" />
                    <span>Créations Numérotées</span>
                  </div>
                </div>
              </div>

              {/* Interactive Haute Parfumerie Flacon Stage */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <HeroFragranceStage />
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#756B6D] text-[10px] uppercase tracking-widest gap-1 animate-bounce opacity-80 pointer-events-none">
            <span>Découvrir</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#541B28]" />
          </div>
        </section>

        {/* ========================================================
            2. LE MANIFESTE DE LA MAISON LÉVANIA
            ======================================================== */}
        <MaisonHeritageSection />

        {/* ========================================================
            3. LE PAVILLON SENSORIEL DE LA VAGUE (Signature, Soyeuse, Sombre)
            ======================================================== */}
        <WaveExperiencePavilion />

        {/* ========================================================
            4. LES TROIS ACTES DU SILLAGE (Pyramide Olfactive)
            ======================================================== */}
        <OlfactoryPyramidStage />

        {/* ========================================================
            5. LE PANTHÉON DES CRÉATIONS (Best-Seller Podium & Galerie)
            ======================================================== */}
        <BestSellerPodium products={PRODUCTS} />

        {/* ========================================================
            6. L'ART D'OFFRIR : LE COFFRET CYLINDRIQUE SUR MESURE
            ======================================================== */}
        {/* ========================================================
            6. L'ART D'OFFRIR : LE COFFRET CYLINDRIQUE SUR MESURE
            ======================================================== */}
        <section className="py-24 sm:py-32 bg-[#FAF7F2] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#F3ECE1] to-white border border-[#541B28]/20 p-8 sm:p-14 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold shadow-sm">
                    <Gift className="w-3.5 h-3.5 text-[#541B28]" />
                    <span>L&apos;Art d&apos;Offrir Lévania</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
                    Composez Votre Coffret Cylindrique Sur Mesure
                  </h2>

                  <p className="text-sm text-[#5A4B4E] leading-relaxed">
                    Créez un ensemble inoubliable : sélectionnez votre écrin cylindrique signature, choisissez 1 à 3 élixirs 50ml ou 100ml,
                    ajoutez un ruban de satin ou des fleurs de néroli séchées et inscrivez votre mot doux calligraphié sur parchemin doré.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/compose-box"
                      className="px-8 py-4 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel font-bold text-xs uppercase tracking-luxury transition-all flex items-center gap-2.5 shadow-lg shadow-[#541B28]/20"
                    >
                      <Gift className="w-4 h-4 text-[#DFC68B]" />
                      <span>Concevoir Mon Coffret Personnalisé</span>
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#541B28]/20 bg-white shadow-md group">
                  <Image
                    src="/brand/cylinders-dual.jpg"
                    alt="Coffrets cylindriques Lévania"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="font-cinzel text-[11px] text-[#FAF7F2] font-medium bg-[#541B28]/90 px-4 py-1.5 rounded-full border border-[#C7A66A]/40 backdrop-blur-md shadow-md tracking-luxury uppercase">
                      Écrins Cylindriques 50ml & 100ml &bull; Sceau de Cire Officiel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. LA CONSULTATION PRIVÉE — DIAGNOSTIC PARFUM IA
            ======================================================== */}
        <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-r from-[#FAF7F2] via-[#F3ECE1] to-[#FAF7F2] border-y border-[#541B28]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-[#541B28]" />
                  <span>Consultation Confidentielle</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
                  Vous hésitez ? Laissez l&apos;Onde Révéler Votre Sillage.
                </h2>

                <p className="text-sm text-[#5A4B4E] leading-relaxed">
                  En quelques questions confidentielles sur vos affinités (notes boisées, solaires, florales ou intenses),
                  notre moteur d&apos;intelligence olfactive analyse l&apos;intégralité de nos formules et vous recommande exactement
                  vos <strong>4 correspondances idéales</strong>.
                </p>

                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#541B28] to-[#7A263B] text-[#FAF7F2] font-cinzel font-bold text-xs uppercase tracking-luxury hover:opacity-95 shadow-xl shadow-[#541B28]/20"
                  >
                    <span>Lancer la Consultation Privée (2 min)</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </Link>
                </div>
              </div>

              {/* Visual preview card with gentle wave */}
              <div className="relative rounded-3xl bg-white border border-[#541B28]/20 p-8 shadow-xl">
                <div className="h-44 rounded-2xl overflow-hidden border border-[#541B28]/10 bg-[#FAF7F2] mb-6 flex items-center justify-center">
                  <SignatureWave expression="soft" intensity="gentle" />
                </div>
                <div className="flex items-center justify-between text-xs text-[#541B28] font-semibold pb-3 border-b border-[#541B28]/10">
                  <span>Accords Olfactifs Harmonisés</span>
                  <span>100% Personnalisé</span>
                </div>
                <p className="text-xs text-[#756B6D] mt-3">
                  Recommandations exclusives ancrées uniquement dans notre catalogue officiel de haute parfumerie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. LE SANCTUAIRE PRIVILÈGE & LA ROUE DU DESTIN
            ======================================================== */}
        <section className="py-24 sm:py-32 bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2] border-t border-[#C7A66A]/30 relative shadow-inner overflow-hidden">
          {/* Ambient Liquid Wave Atmosphere in Section 8 */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <WaveCanvas expression="intense" interactive={false} height="100%" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="flex justify-center mb-3.5">
                <WaveMonogram size="md" variant="gold" withSeal />
              </div>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#C7A66A]/20 border border-[#C7A66A]/40 font-cinzel text-[10px] text-[#DFC68B] uppercase tracking-luxury font-bold mb-3.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-[#DFC68B]" />
                <span>Le Cercle Privilège Lévania</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                La Roue du Destin Lévania
              </h2>
              <p className="text-xs sm:text-sm text-[#D5C4C7] mt-2 leading-relaxed">
                1 point de Luck pour chaque 10 TND dépensés. Atteignez l&apos;Onde Royale ou l&apos;Onde Impériale Suprême (7,777 Luck)
                pour remporter des flacons offerts et bons d&apos;achat immédiats.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                href="/account/luck"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#DFC68B] to-[#C7A66A] text-[#2A0B12] font-cinzel font-bold text-xs uppercase tracking-luxury hover:scale-105 transition-transform shadow-xl flex items-center gap-2.5"
              >
                <GoldStarLozenge size={14} className="text-[#2A0B12]" />
                <span>Accéder à la Roue du Destin</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
