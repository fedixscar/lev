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
  Truck,
  QrCode,
  Star,
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
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GoldParticlesCanvas } from "@/components/brand/GoldParticlesCanvas";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================
            1. HERO SECTION (Haute Parfumerie & Signature Wave)
            ======================================================== */}
        <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
          {/* Ambient background glows in Imperial Burgundy and Champagne Gold */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#541B28]/8 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#C7A66A]/12 rounded-full blur-[140px] pointer-events-none" />

          {/* Golden Floating Stardust Particles */}
          <GoldParticlesCanvas particleCount={32} className="opacity-75" />

          {/* Background Signature Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-96 opacity-35 pointer-events-none">
            <SignatureWave expression="signature" intensity="normal" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Text Editorial Column */}
              <div className="lg:col-span-7 min-w-0 space-y-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/95 border border-[#541B28]/20 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold backdrop-blur-md shadow-xs">
                  <WaveMonogram size="xs" variant="gold" />
                  <span>Haute Parfumerie Artisanale • Nabeul, Tunisie</span>
                </div>

                <h1 className="font-serif text-fluid-hero font-light text-burgundy-gradient tracking-tight">
                  L&apos;Élégance d&apos;un Parfum{" "}
                  <span className="italic font-normal text-gold-gradient">Unique &amp; Longue Tenue.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#5A4B4E] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Créés en Tunisie avec les plus belles essences méditerranéennes : fleur d&apos;oranger, bois précieux et ambre solaire.
                  Chaque flacon est préparé avec soin et livré avec son certificat d&apos;authenticité à votre nom.
                </p>

                {/* Refined Luxury CTAs with Magnetic Motion */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <MagneticButton strength={0.2} className="w-full sm:w-auto">
                    <Link
                      href="/shop"
                      className="w-full sm:w-auto px-8 py-4 rounded-full luxury-btn-primary flex items-center justify-center gap-2.5 shadow-xl"
                    >
                      <span>Découvrir nos Parfums</span>
                      <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                    </Link>
                  </MagneticButton>

                  <MagneticButton strength={0.2} className="w-full sm:w-auto">
                    <Link
                      href="/discover"
                      className="w-full sm:w-auto px-8 py-4 rounded-full luxury-btn-secondary flex items-center justify-center gap-2 shadow-md"
                    >
                      <Compass className="w-4 h-4 text-[#C7A66A]" />
                      <span>Trouver Mon Parfum (Quiz 2 min)</span>
                    </Link>
                  </MagneticButton>
                </div>

                {/* Subtle Editorial Signature Line */}
                <div className="pt-4 flex justify-center lg:justify-start font-cinzel text-[9px] sm:text-[10px] tracking-luxury uppercase text-[#756B6D]">
                  <div className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-6">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#C7A66A] shadow-xs" />
                      <span>Longue Tenue Garantie (14h+)</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#541B28] shadow-xs" />
                      <span>Écrin Cadeau Cylindrique Offert</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#434B36] shadow-xs" />
                      <span>Flacon Dédié avec QR Code</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Haute Parfumerie Flacon Stage */}
              <div className="lg:col-span-5 min-w-0 relative flex items-center justify-center">
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
            REASSURANCE & TRUST BAR
            ======================================================== */}
        <section className="bg-white dark:bg-[#180B10] border-y border-[#541B28]/10 dark:border-[#C7A66A]/20 py-6 relative z-20 shadow-xs scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 flex items-center justify-center text-[#541B28] dark:text-[#DFC68B] shrink-0">
                  <Truck className="w-5 h-5 text-[#541B28] dark:text-[#DFC68B]" />
                </div>
                <div className="text-left">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#23181A] dark:text-[#FAF7F2]">Livraison 24-48h</h4>
                  <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">Partout en Tunisie</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 flex items-center justify-center text-[#541B28] dark:text-[#DFC68B] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#541B28] dark:text-[#DFC68B]" />
                </div>
                <div className="text-left">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#23181A] dark:text-[#FAF7F2]">Paiement à la Livraison</h4>
                  <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">En espèces ou par carte</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 flex items-center justify-center text-[#541B28] dark:text-[#DFC68B] shrink-0">
                  <Gift className="w-5 h-5 text-[#C7A66A]" />
                </div>
                <div className="text-left">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#23181A] dark:text-[#FAF7F2]">Écrin Cadeau Offert</h4>
                  <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">Boîte cylindrique luxe</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 flex items-center justify-center text-[#541B28] dark:text-[#DFC68B] shrink-0">
                  <QrCode className="w-5 h-5 text-[#434B36] dark:text-[#C7A66A]" />
                </div>
                <div className="text-left">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#23181A] dark:text-[#FAF7F2]">Flacon Personnalisé</h4>
                  <p className="text-[11px] text-[#756B6D] dark:text-[#A8989C]">QR Code &amp; Vidéo à votre nom</p>
                </div>
              </div>
            </div>
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
            6. L'ART D'OFFRIR : LE COFFRET CADEAU SUR MESURE
            ======================================================== */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#0E0709] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#F3ECE1] to-white dark:from-[#1C0D15] dark:to-[#12080D] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-8 sm:p-14 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border border-[#541B28]/20 dark:border-[#C7A66A]/30 font-cinzel text-[10px] text-[#541B28] dark:text-[#DFC68B] uppercase tracking-luxury font-bold shadow-xs">
                    <Gift className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />
                    <span>Idée Cadeau Idéale</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
                    Offrez un Coffret Cadeau Personnalisé
                  </h2>

                  <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed">
                    Choisissez votre flacon préféré (50ml ou 100ml) et ajoutez un mot doux personnalisé écrit à la main.
                    Chaque parfum est livré dans son élégant coffret cylindrique vert olive et or, prêt à être offert.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/compose-box"
                      className="px-8 py-4 rounded-full luxury-btn-primary flex items-center gap-2.5"
                    >
                      <Gift className="w-4 h-4 text-[#DFC68B]" />
                      <span>Créer Mon Coffret Cadeau</span>
                    </Link>
                  </div>
                </div>

                <Card3DTilt maxTilt={7} scale={1.02} enableGlare={true} className="rounded-2xl">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#541B28]/20 dark:border-[#C7A66A]/30 bg-white dark:bg-[#180B10] shadow-md group">
                    <Image
                      src="/brand/cylinders-dual.jpg"
                      alt="Coffrets cylindriques Lévania"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="font-cinzel text-[11px] text-[#FAF7F2] font-medium bg-[#541B28]/90 px-4 py-1.5 rounded-full border border-[#C7A66A]/40 backdrop-blur-md shadow-md tracking-luxury uppercase">
                        Écrins Cylindriques 50ml &amp; 100ml • Sceau Officiel Inclus
                      </span>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. QUIZ PARFUM RAPIDE (2 MINUTES)
            ======================================================== */}
        <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-r from-[#FAF7F2] via-[#F3ECE1] to-[#FAF7F2] dark:from-[#0E0709] dark:via-[#170B10] dark:to-[#0E0709] border-y border-[#541B28]/10 dark:border-[#C7A66A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold shadow-xs">
                  <Compass className="w-3.5 h-3.5 text-[#541B28]" />
                  <span>Conseil Parfum Rapide</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light leading-tight">
                  Vous Hésitez ? Trouvez Votre Parfum en 2 Minutes
                </h2>

                <p className="text-sm text-[#5A4B4E] leading-relaxed">
                  Vous ne savez pas quel parfum choisir ? Répondez à 4 questions simples selon vos préférences
                  (notes fraîches, boisées, florales ou intenses) et notre conseiller virtuel vous recommande instantanément
                  les <strong>parfums faits pour vous</strong>.
                </p>

                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full luxury-btn-primary"
                  >
                    <span>Faire le Quiz Parfum (2 min)</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </Link>
                </div>
              </div>

              {/* Visual preview card with 3D Tilt & gentle wave */}
              <Card3DTilt maxTilt={8} scale={1.02} enableGlare={true} className="rounded-3xl">
                <div className="relative rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-8 shadow-xl">
                  <div className="h-44 rounded-2xl overflow-hidden border border-[#541B28]/10 dark:border-[#C7A66A]/20 bg-[#FAF7F2] dark:bg-[#0E0709] mb-6 flex items-center justify-center">
                    <SignatureWave expression="soft" intensity="gentle" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#541B28] dark:text-[#DFC68B] font-semibold pb-3 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20">
                    <span>Recommandations Personnalisées</span>
                    <span>Simple &amp; Gratuit</span>
                  </div>
                  <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-3">
                    Découvrez en quelques clics le parfum qui sublimera votre quotidien.
                  </p>
                </div>
              </Card3DTilt>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. AVIS CLIENTS VÉRIFIÉS (RÉASSURANCE SOCIALE)
            ======================================================== */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2] dark:bg-[#0E0709] border-b border-[#541B28]/10 dark:border-[#C7A66A]/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-xs font-cinzel text-[10px] text-[#541B28] dark:text-[#DFC68B] uppercase tracking-luxury font-bold mb-3">
                <Star className="w-3.5 h-3.5 fill-[#C7A66A] text-[#C7A66A]" />
                <span>Avis Clients Vérifiés • 4.9 / 5</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                Ce Que Disent Nos Clients
              </h2>
              <p className="text-xs sm:text-sm text-[#756B6D] dark:text-[#A8989C] mt-2">
                Plus de 1 200 flacons livrés avec soin partout en Tunisie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarra M.",
                  city: "Tunis",
                  perfume: "Onde d'Or (100ml)",
                  comment: "Une tenue impressionnante. Je l'ai mis le matin avant de partir travailler, et le soir mes collègues me demandaient encore le nom de mon parfum. Le flacon cylindrique est somptueux !",
                  rating: 5,
                },
                {
                  name: "Karim B.",
                  city: "Sousse",
                  perfume: "Oud Impérial (100ml)",
                  comment: "J'ai commandé pour l'anniversaire de mon père. Le QR code avec son nom personnalisé sur la bouteille l'a énormément touché. Livraison reçue en 24h chrono.",
                  rating: 5,
                },
                {
                  name: "Amira K.",
                  city: "Sfax",
                  perfume: "Néroli Flottant (50ml)",
                  comment: "Une fleur d'oranger pure et délicate qui rappelle les jardins de Nabeul. Très frais et élégant sans être agressif. Je recommanderai sans hésiter !",
                  rating: 5,
                },
              ].map((rev, idx) => (
                <Card3DTilt key={idx} maxTilt={6} scale={1.02} enableGlare={false} className="h-full">
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-sm hover:border-[#541B28]/35 dark:hover:border-[#C7A66A]/40 transition-all flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-[#C7A66A]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#C7A66A]" />
                        ))}
                      </div>
                      <p className="text-xs text-[#5A4B4E] dark:text-[#DCD0D3] leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs text-[#23181A] dark:text-[#FAF7F2] block">{rev.name}</span>
                        <span className="text-[10px] text-[#756B6D] dark:text-[#A8989C]">{rev.city} • Client Vérifié</span>
                      </div>
                      <span className="font-cinzel text-[10px] text-[#541B28] dark:text-[#DFC68B] font-bold bg-[#541B28]/5 dark:bg-[#C7A66A]/10 px-2.5 py-1 rounded-full border border-[#541B28]/10 dark:border-[#C7A66A]/20">
                        {rev.perfume}
                      </span>
                    </div>
                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            9. LA ROUE CADEAU LÉVANIA
            ======================================================== */}
        <section className="py-20 sm:py-28 bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2] border-t border-[#C7A66A]/30 relative shadow-inner overflow-hidden">
          {/* Ambient Liquid Wave Atmosphere */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <WaveCanvas expression="intense" interactive={false} height="100%" />
          </div>

          {/* Golden Celebration Stardust */}
          <GoldParticlesCanvas particleCount={25} className="opacity-60" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center mb-3.5">
                <WaveMonogram size="md" variant="gold" withSeal />
              </div>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#C7A66A]/20 border border-[#C7A66A]/40 font-cinzel text-[10px] text-[#DFC68B] uppercase tracking-luxury font-bold mb-3.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-[#DFC68B]" />
                <span>Cadeaux &amp; Récompenses</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
                La Roue Cadeau Lévania
              </h2>
              <p className="text-xs sm:text-sm text-[#D5C4C7] mt-2 leading-relaxed">
                Gagnez 1 point de chance à chaque tranche de 10 DT d&apos;achat.
                Tournez la roue pour tenter de remporter des réductions immédiates, des échantillons ou des flacons offerts !
              </p>
            </div>

            <div className="flex justify-center">
              <MagneticButton strength={0.25}>
                <Link
                  href="/account/luck"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#DFC68B] to-[#C7A66A] text-[#2A0B12] font-cinzel font-bold text-xs uppercase tracking-luxury hover:scale-105 transition-transform shadow-xl flex items-center gap-2.5"
                >
                  <GoldStarLozenge size={14} className="text-[#2A0B12]" />
                  <span>Tourner la Roue Cadeau</span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
