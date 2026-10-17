"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Gift,
  Flame,
  ChevronDown,
  Layers,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { WaveExperiencePavilion } from "@/components/brand/WaveExperiencePavilion";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
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
        <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
          {/* Ambient background glows in Imperial Burgundy and Champagne Gold */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#541B28]/8 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#C7A66A]/12 rounded-full blur-[140px] pointer-events-none" />

          {/* Background Signature Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-35 pointer-events-none">
            <SignatureWave expression="signature" intensity="normal" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Editorial Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-[0.25em] font-medium backdrop-blur-md shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
                  <span>Haute Parfumerie Artisanale</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-burgundy-gradient leading-[1.08] tracking-tight">
                  Découvrez la fragrance qui bouge avec vous.
                </h1>

                <p className="text-base sm:text-lg text-[#5A4B4E] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Une onde olfactive liquide sculptée dans la noblesse des bois rares, des ambrés solaires et des fleurs méditerranéennes. L&apos;élégance pure d&apos;un sillage inoubliable.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#541B28] via-[#7A263B] to-[#541B28] text-[#FAF7F2] font-semibold text-xs uppercase tracking-[0.18em] shadow-xl shadow-[#541B28]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explorer la Collection</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </Link>

                  <Link
                    href="/discover"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#F3ECE1] text-[#541B28] border border-[#541B28]/30 font-medium text-xs uppercase tracking-[0.18em] shadow-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#C7A66A]" />
                    <span>Diagnostic Parfum IA</span>
                  </Link>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-6 border-t border-[#541B28]/15 grid grid-cols-3 gap-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                  <div>
                    <span className="font-serif text-lg text-[#541B28] font-bold block">
                      100% Authentique
                    </span>
                    <span className="text-[11px] text-[#756B6D]">Flacon & Sceau scellés</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[#541B28] font-bold block">
                      24h &bull; 48h
                    </span>
                    <span className="text-[11px] text-[#756B6D]">Livraison toute Tunisie</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[#541B28] font-bold block">
                      Roue du Destin
                    </span>
                    <span className="text-[11px] text-[#756B6D]">10 TND = 1 Luck</span>
                  </div>
                </div>
              </div>

              {/* Product Visual Centerpiece */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-80 sm:w-96 aspect-[3/4] rounded-3xl overflow-hidden border border-[#541B28]/20 bg-white shadow-[0_25px_60px_rgba(84,27,40,0.12)] group">
                  <Image
                    src="/brand/bottle-and-cylinder.jpg"
                    alt="Lévania Parfums Flacon et Écrin Cylindrique"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  {/* Gradient overlays for cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/70 via-transparent to-black/20 opacity-60" />

                  {/* Floating Luxury Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#541B28]/20 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <WaveMonogram size="xs" variant="burgundy" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#541B28] font-bold">
                        Création Signature
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-burgundy-gradient font-light mt-0.5">
                      Onde d&apos;Or &bull; Extrait Absolu
                    </h3>
                    <p className="text-[11px] text-[#756B6D] italic mt-0.5">
                      Flacon verre lourd, bouchon noir ébène & cylindre vert olive doré
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#756B6D] text-[10px] uppercase tracking-widest gap-1 animate-bounce opacity-80">
            <span>Découvrir</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#541B28]" />
          </div>
        </section>

        {/* ========================================================
            2. THE CONCEPT: THE WAVE (Signature, Soft, Intense Pavilion)
            ======================================================== */}
        <WaveExperiencePavilion />

        {/* ========================================================
            3. BEST-SELLER PODIUM (Top 3 elevated + 7 bestsellers)
            ======================================================== */}
        <BestSellerPodium products={PRODUCTS} />

        {/* ========================================================
            4. DISCOVER YOUR PERFUME (AI Diagnostic Teaser)
            ======================================================== */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#FAF7F2] via-[#F3ECE1] to-[#FAF7F2] border-y border-[#541B28]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-widest font-semibold">
                  <Compass className="w-3.5 h-3.5 text-[#541B28]" />
                  <span>Diagnostic Olfactif Guidé</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
                  Vous hésitez ? Laissez l&apos;Onde Révéler Votre Sillage.
                </h2>

                <p className="text-sm text-[#5A4B4E] leading-relaxed">
                  En quelques questions concises sur vos affinités (notes boisées, solaires, florales ou intenses), notre moteur d&apos;intelligence olfactive analyse l&apos;intégralité de nos formules et vous recommande exactement vos <strong>4 correspondances idéales</strong>.
                </p>

                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#541B28] to-[#7A263B] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#541B28]/20"
                  >
                    <span>Lancer le Questionnaire (2 min)</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </Link>
                </div>
              </div>

              {/* Visual preview card */}
              <div className="relative rounded-3xl bg-white border border-[#541B28]/20 p-8 shadow-xl">
                <div className="h-44 rounded-2xl overflow-hidden border border-[#541B28]/10 bg-[#FAF7F2] mb-6 flex items-center justify-center">
                  <SignatureWave expression="soft" intensity="gentle" />
                </div>
                <div className="flex items-center justify-between text-xs text-[#541B28] font-semibold pb-3 border-b border-[#541B28]/10">
                  <span>Pyramide & Accords Harmonisés</span>
                  <span>100% Personnalisé</span>
                </div>
                <p className="text-xs text-[#756B6D] mt-3">
                  Recommandations objectives ancrées uniquement dans notre catalogue officiel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. COMPOSE YOUR BOX TEASER (Custom Gift Experience)
            ======================================================== */}
        <section className="py-24 bg-[#FAF7F2] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#F3ECE1] to-white border border-[#541B28]/20 p-8 sm:p-14 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-widest font-semibold">
                    <Gift className="w-3.5 h-3.5 text-[#541B28]" />
                    <span>L&apos;Art d&apos;Offrir Lévania</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light">
                    Composez Votre Coffret Cadeau Sur Mesure
                  </h2>

                  <p className="text-sm text-[#5A4B4E] leading-relaxed">
                    Créez un ensemble inoubliable : sélectionnez votre écrin cylindrique signature, choisissez 1 à 3 élixirs 50ml ou 100ml, ajoutez un ruban de satin ou des fleurs de néroli séchées et inscrivez votre message d&apos;amour calligraphié.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/compose-box"
                      className="px-8 py-3.5 rounded-full bg-[#541B28] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:bg-[#66182C] transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <Gift className="w-4 h-4 text-[#DFC68B]" />
                      <span>Concevoir Mon Coffret</span>
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#541B28]/20 bg-white shadow-md">
                  <Image
                    src="/brand/cylinders-dual.jpg"
                    alt="Coffrets cylindriques Lévania"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-xs text-[#FAF7F2] font-serif font-medium bg-[#541B28]/90 px-3.5 py-1.5 rounded-full border border-[#C7A66A]/40 backdrop-blur-md shadow-md">
                      Écrins Cylindriques 50ml & 100ml avec Sceau Doré
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. WHEEL OF CHANCE & LUCK TEASER
            ======================================================== */}
        <section className="py-20 bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2] border-t border-[#C7A66A]/30 relative shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7A66A]/20 border border-[#C7A66A]/40 text-xs text-[#DFC68B] uppercase tracking-widest font-semibold mb-3">
                <Flame className="w-3.5 h-3.5 text-[#DFC68B]" />
                <span>Gamification & Récompenses</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                La Roue du Destin Lévania
              </h2>
              <p className="text-xs sm:text-sm text-[#D5C4C7] mt-2 leading-relaxed">
                1 point de Luck pour chaque 10 TND dépensés. Atteignez la Vague Royale ou l&apos;Admin Wave (7,777 Luck) pour remporter des flacons offerts et bons d&apos;achat immédiats.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                href="/account/luck"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#DFC68B] to-[#C7A66A] text-[#2A0B12] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Accéder à la Roue du Destin</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. MAISON ENGAGEMENTS & SAVOIR-FAIRE
            ======================================================== */}
        <section className="py-20 bg-[#FAF7F2] border-t border-[#541B28]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                Excellence & Savoir-Faire
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#23181A] font-light mt-1">
                Les Engagements de la Maison Lévania
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#23181A] font-semibold mb-2">
                  Matières Premières Rares
                </h3>
                <p className="text-xs text-[#5A4B4E] leading-relaxed">
                  Sélection rigoureuse des absolus et huiles précieuses. Néroli pur du Cap Bon, ambre gris et essences de bois d&apos;olivier centenaire.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#23181A] font-semibold mb-2">
                  Traçabilité QR Certifiée
                </h3>
                <p className="text-xs text-[#5A4B4E] leading-relaxed">
                  Chaque flacon Lévania porte son sceau doré et un QR code unique certifiant son authenticité, son lot de macération et son détenteur officiel.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#23181A] font-semibold mb-2">
                  Écrins Haute Parfumerie
                </h3>
                <p className="text-xs text-[#5A4B4E] leading-relaxed">
                  Packaging cylindrique exclusif paré d&apos;or champagne, de bordeaux et de vert olive, conçu pour magnifier et protéger la tenue de chaque création.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
