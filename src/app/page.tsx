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
  ShieldCheck,
  Star,
  ChevronDown,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { BestSellerPodium } from "@/components/products/BestSellerPodium";
import { PRODUCTS, COLLECTIONS } from "@/lib/catalogue";
import { formatTND } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8] selection:bg-[#C7A66A] selection:text-[#171715]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================
            1. HERO SECTION (Haute Parfumerie & Signature Wave)
            ======================================================== */}
        <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#343B2B]/25 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#542B32]/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Background Signature Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-60 pointer-events-none">
            <SignatureWave expression="signature" intensity="normal" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Editorial Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20271E]/90 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-[0.25em] font-medium backdrop-blur-md shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Haute Parfumerie Artisanale</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-gold-gradient leading-[1.08] tracking-tight">
                  Découvrez la fragrance qui bouge avec vous.
                </h1>

                <p className="text-base sm:text-lg text-[#E9DFCE]/80 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Une onde olfactive liquide sculptée dans la noblesse des bois rares, des ambrés solaires et des fleurs méditerranéennes. L&apos;élégance pure d&apos;un sillage inoubliable.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] font-semibold text-xs uppercase tracking-[0.18em] shadow-xl shadow-[#C7A66A]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explorer la Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/discover"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#20271E] hover:bg-[#343B2B] text-[#F6F1E8] border border-[#C7A66A]/40 font-medium text-xs uppercase tracking-[0.18em] backdrop-blur-md transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#C7A66A]" />
                    <span>Diagnostic Parfum IA</span>
                  </Link>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-6 border-t border-[#C7A66A]/15 grid grid-cols-3 gap-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                  <div>
                    <span className="font-serif text-lg text-[#C7A66A] font-medium block">
                      100% Authentique
                    </span>
                    <span className="text-[11px] text-[#89877F]">Flacon & Sceau scellés</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[#C7A66A] font-medium block">
                      24h &bull; 48h
                    </span>
                    <span className="text-[11px] text-[#89877F]">Livraison toute Tunisie</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[#C7A66A] font-medium block">
                      Roue du Destin
                    </span>
                    <span className="text-[11px] text-[#89877F]">10 TND = 1 Luck</span>
                  </div>
                </div>
              </div>

              {/* Product Visual Centerpiece */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-80 sm:w-96 aspect-[3/4] rounded-3xl overflow-hidden border border-[#C7A66A]/30 bg-[#20271E]/60 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md group">
                  <Image
                    src="/brand/bottle-and-cylinder.jpg"
                    alt="Lévania Parfums Flacon et Écrin Cylindrique"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  {/* Gradient overlays for cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-transparent to-black/30 opacity-70" />

                  {/* Floating Luxury Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#171715]/85 backdrop-blur-xl border border-[#C7A66A]/30 text-center">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] font-semibold block">
                      Création Signature
                    </span>
                    <h3 className="font-serif text-2xl text-gold-gradient font-light mt-0.5">
                      Onde d&apos;Or &bull; Extrait Absolu
                    </h3>
                    <p className="text-[11px] text-[#89877F] italic mt-0.5">
                      Flacon verre lourd, bouchon noir ébène & cylindre vert olive doré
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#89877F] text-[10px] uppercase tracking-widest gap-1 animate-bounce opacity-60">
            <span>Découvrir</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C7A66A]" />
          </div>
        </section>

        {/* ========================================================
            2. THE CONCEPT: THE WAVE (Signature, Soft, Intense)
            ======================================================== */}
        <section className="py-20 bg-[#20271E]/40 border-y border-[#C7A66A]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
                L&apos;Identité Fondatrice
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-2 mb-4">
                La Vague Lévania &bull; L&apos;Onde des Sens
              </h2>
              <p className="text-sm text-[#89877F] leading-relaxed">
                Le parfum n&apos;est pas une formule figée : c&apos;est un fluide vivant en perpétuelle diffusion. Nos trois expressions de la Vague traduisent la diversité de vos émotions olfactives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Signature Wave */}
              <div className="p-8 rounded-3xl bg-[#171715]/80 border border-[#C7A66A]/20 hover:border-[#C7A66A] transition-all group shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#343B2B] border border-[#C7A66A]/40 flex items-center justify-center text-[#C7A66A] mb-6 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#F6F1E8] group-hover:text-gold-gradient transition-colors">
                  Vague Signature
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#C7A66A] block mt-1 mb-3">
                  Vert Olive &bull; Or Champagne &bull; Bordeaux
                </span>
                <p className="text-xs text-[#89877F] leading-relaxed">
                  L&apos;harmonie classique de la maison. Ambre solaire, bois d&apos;olivier centenaire et vanille noble. Une présence royale et équilibrée.
                </p>
              </div>

              {/* Soft Wave */}
              <div className="p-8 rounded-3xl bg-[#171715]/80 border border-[#C7A66A]/20 hover:border-[#C7A66A] transition-all group shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#E9DFCE]/20 border border-[#E9DFCE]/30 flex items-center justify-center text-[#E9DFCE] mb-6 shadow-md">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#F6F1E8] group-hover:text-gold-gradient transition-colors">
                  Onde Soyeuse
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#E9DFCE] block mt-1 mb-3">
                  Ivoire &bull; Crème &bull; Néroli de Nabeul
                </span>
                <p className="text-xs text-[#89877F] leading-relaxed">
                  Courbes délicates, fraîcheur florale lumineuse et voiles poudrés intimes. Une sensation de soie glissant sur la peau nue.
                </p>
              </div>

              {/* Intense Wave */}
              <div className="p-8 rounded-3xl bg-[#171715]/80 border border-[#C7A66A]/20 hover:border-[#C7A66A] transition-all group shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#542B32]/40 border border-[#542B32] flex items-center justify-center text-rose-300 mb-6 shadow-md">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#F6F1E8] group-hover:text-gold-gradient transition-colors">
                  Onde Sombre & Boisée
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-rose-300 block mt-1 mb-3">
                  Noir Ébène &bull; Oud &bull; Cuir d&apos;Orient
                </span>
                <p className="text-xs text-[#89877F] leading-relaxed">
                  Contraste dramatique, encens fumé et sillage tellurique puissant. Sculpté pour les connaisseurs de sillages audacieux et magnétiques.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. BEST-SELLER PODIUM (Top 3 elevated + 7 bestsellers)
            ======================================================== */}
        <BestSellerPodium products={PRODUCTS} />

        {/* ========================================================
            4. DISCOVER YOUR PERFUME (AI Diagnostic Teaser)
            ======================================================== */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#20271E] via-[#171715] to-[#20271E] border-y border-[#C7A66A]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-widest font-medium">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Diagnostic Olfactif Guidé</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light leading-tight">
                  Vous hésitez ? Laissez l&apos;Onde Révéler Votre Sillage.
                </h2>

                <p className="text-sm text-[#89877F] leading-relaxed">
                  En quelques questions concises sur vos affinités (notes boisées, solaires, florales ou intenses), notre moteur d&apos;intelligence olfactive analyse l&apos;intégralité de nos formules et vous recommande exactement vos <strong>4 correspondances idéales</strong>.
                </p>

                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#C7A66A]/20"
                  >
                    <span>Lancer le Questionnaire (2 min)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual preview card */}
              <div className="relative rounded-3xl bg-[#171715] border border-[#C7A66A]/30 p-8 shadow-2xl">
                <div className="h-44 rounded-2xl overflow-hidden border border-[#C7A66A]/20 bg-[#20271E]/50 mb-6 flex items-center justify-center">
                  <SignatureWave expression="soft" intensity="gentle" />
                </div>
                <div className="flex items-center justify-between text-xs text-[#C7A66A] pb-3 border-b border-white/5">
                  <span>Pyramide & Accords Harmonisés</span>
                  <span>100% Personnalisé</span>
                </div>
                <p className="text-xs text-[#89877F] mt-3">
                  Recommandations objectives ancrées uniquement dans notre catalogue officiel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. COMPOSE YOUR BOX TEASER (Custom Gift Experience)
            ======================================================== */}
        <section className="py-24 bg-[#171715] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#20271E] to-[#171715] border border-[#C7A66A]/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#542B32]/60 border border-[#542B32] text-xs text-rose-200 uppercase tracking-widest font-medium">
                    <Gift className="w-3.5 h-3.5 text-[#C7A66A]" />
                    <span>L&apos;Art d&apos;Offrir Lévania</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                    Composez Votre Coffret Cadeau Sur Mesure
                  </h2>

                  <p className="text-sm text-[#89877F] leading-relaxed">
                    Créez un ensemble inoubliable : sélectionnez votre écrin cylindrique signature, choisissez 1 à 3 élixirs 50ml ou 100ml, ajoutez un ruban de satin ou des fleurs de néroli séchées et inscrivez votre message d&apos;amour calligraphié.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/compose-box"
                      className="px-8 py-3.5 rounded-full bg-[#C7A66A] text-[#171715] font-semibold text-xs uppercase tracking-wider hover:bg-[#E3D1A9] transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Concevoir Mon Coffret</span>
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C7A66A]/30 bg-black/40">
                  <Image
                    src="/brand/cylinders-dual.jpg"
                    alt="Coffrets cylindriques Lévania"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-xs text-[#C7A66A] font-serif font-medium bg-[#171715]/80 px-3 py-1 rounded-full border border-[#C7A66A]/30 backdrop-blur-md">
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
        <section className="py-20 bg-[#20271E]/60 border-t border-[#C7A66A]/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-widest font-medium mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>Gamification & Récompenses</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                La Roue du Destin Lévania
              </h2>
              <p className="text-xs sm:text-sm text-[#89877F] mt-2">
                1 point de Luck pour chaque 10 TND dépensés. Atteignez la Vague Royale ou l&apos;Admin Wave (7,777 Luck) pour remporter des flacons offerts et bons d&apos;achat immédiats.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                href="/account/luck"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Accéder à la Roue du Destin</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. VERIFIED CUSTOMER REVIEWS
            ======================================================== */}
        <section className="py-20 bg-[#171715]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                Témoignages Vérifiés
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] font-light mt-1">
                L&apos;Émotion de Nos Clients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sonia Mansour",
                  city: "La Marsa, Tunis",
                  product: "Onde d'Or (100ml)",
                  review:
                    "Un parfum majestueux. Le safran et l'ambre créent un sillage que tout le monde remarque dès que j'entre dans une pièce. Le packaging cylindrique est somptueux.",
                  rating: 5,
                },
                {
                  name: "Karim Ben Salem",
                  city: "Sousse",
                  product: "Sillage d'Olivier (50ml)",
                  review:
                    "La subtilité du bois d'olivier et de la cardamome est incroyable. Rien à voir avec les parfums génériques de synthèse. Une vraie haute parfumerie tunisienne.",
                  rating: 5,
                },
                {
                  name: "Dr. Meriem Cherif",
                  city: "Sfax",
                  product: "Coffret Sur-Mesure",
                  review:
                    "J'ai composé un coffret cadeau pour le mariage de ma sœur avec Néroli Flottant et le ruban bordeaux. Livraison reçue en 24h, présentation irréprochable.",
                  rating: 5,
                },
              ].map((rev, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#20271E]/50 border border-[#C7A66A]/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-[#C7A66A] mb-3">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#E9DFCE] italic leading-relaxed">
                      &laquo; {rev.review} &raquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <h4 className="font-serif text-sm text-[#F6F1E8] font-medium">{rev.name}</h4>
                    <span className="text-[10px] text-[#89877F] block">
                      {rev.city} &bull; Achat vérifié ({rev.product})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
