"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Clock, ArrowRight, ShoppingBag } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";

interface PromoOffer {
  id: string;
  theme: "Mariage" | "Omra & Célébration" | "Anniversaire" | "Duo Signature";
  title: string;
  tagline: string;
  description: string;
  originalPriceTND: number;
  promoPriceTND: number;
  image: string;
  badge: string;
  contents: string[];
}

const OFFERS: PromoOffer[] = [
  {
    id: "pack-mariage-royal",
    theme: "Mariage",
    title: "Le Coffret des Mariés \u2022 Noces d'Or",
    tagline: "L'union suprême de deux âmes olfactives",
    description: "Deux flacons d'exception (Onde d'Or 100ml + Néroli Flottant 100ml) dans leur grand coffret d'apparat, accompagnés d'un ruban satin bordeaux et d'une dédicace calligraphiée personnalisée.",
    originalPriceTND: 555.0,
    promoPriceTND: 440.0,
    image: "/brand/cylinders-dual.jpg",
    badge: "-115 TND Remise Cérémonie",
    contents: ["1x Onde d'Or (100ml)", "1x Néroli Flottant (100ml)", "Écrin Duo Rigide Or & Velours", "Livraison Express Offerte"],
  },
  {
    id: "pack-omra-serenite",
    theme: "Omra & Célébration",
    title: "Pack Sillage Sacré \u2022 Omra & Événements",
    tagline: "Pureté des accords précieux sans compromis",
    description: "Flacon Oud Impérial 100ml accompagné de l'extrait Ambre Méditerranéen 50ml et d'un étui de voyage cylindrique protecteur.",
    originalPriceTND: 535.0,
    promoPriceTND: 425.0,
    image: "/brand/bottle-and-cylinder.jpg",
    badge: "-20% Pack Spirituel",
    contents: ["1x Oud Impérial (100ml)", "1x Ambre Méditerranéen (50ml)", "Étui Nomade Cuir Lévania", "Certificat d'Authenticité"],
  },
  {
    id: "pack-anniversaire-prestige",
    theme: "Anniversaire",
    title: "Coffret Anniversaire \u2022 Sillage d'Olivier",
    tagline: "Pour marquer une date inoubliable",
    description: "Flacon Sillage d'Olivier 100ml avec son cylindre vert olive, un flacon échantillon prestige 10ml offert et la carte d'anniversaire gravée.",
    originalPriceTND: 310.0,
    promoPriceTND: 250.0,
    image: "/brand/bottle-and-cylinder.jpg",
    badge: "Échantillon Luxe Offert",
    contents: ["1x Sillage d'Olivier (100ml)", "1x Flacon Sac 10ml Offert", "Cylindre Vert Olive Scellé", "Carte Vœux Calligraphiée"],
  },
];

export default function PromotionsPage() {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const handleAddPack = (pack: PromoOffer) => {
    addItem({
      productId: pack.id,
      productName: pack.title,
      productSlug: "promotions",
      image: pack.image,
      formatSize: "100ml",
      unitPriceTND: pack.promoPriceTND,
      unitPriceMillimes: Math.round(pack.promoPriceTND * 1000),
      quantity: 1,
    });
    showToast("Pack Privilège Ajouté au Panier", `${pack.title} — ${formatTND(pack.promoPriceTND)}`, "luxury");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.25} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="luxury-pill mb-6 inline-flex items-center gap-2.5">
              <GoldStarLozenge size={12} className="text-[#C7A66A]" />
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-grand uppercase text-[#541B28] font-bold">
                Campagnes & Offres Spéciales
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light mt-1 mb-4">
              Les Offres du Mois
            </h1>
            <p className="text-sm sm:text-base text-[#5A4B4E] leading-relaxed font-light max-w-2xl mx-auto">
              Des compositions thématiques créées pour célébrer les moments majeurs de votre vie : mariages, retours d&apos;Omra, anniversaires et présents prestigieux.
            </p>
          </div>

          {/* Flash Sale Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2] border border-[#C7A66A]/30 mb-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-[#C7A66A]/40 flex items-center justify-center text-[#DFC68B] shrink-0">
                <Clock className="w-8 h-8 animate-pulse text-[#C7A66A]" />
              </div>
              <div>
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#DFC68B] font-bold block mb-1">
                  Vente Flash Privilège (24 Heures)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light">
                  -15% Supplémentaire avec le code : <span className="text-gold-gradient font-bold font-mono">WAVE20</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#D5C4C7] mt-1 font-light">
                  Dès 250 TND d&apos;achat sur tout le panier • Valable sur les flacons et les coffrets.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#DFC68B] text-[#2A0B12] font-cinzel text-xs font-bold uppercase tracking-luxury hover:brightness-110 transition-all shrink-0 flex items-center gap-2.5 shadow-xl active:scale-98"
            >
              <span>Profiter de la Vente Flash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Curated Packs */}
          <div className="space-y-12 sm:space-y-16">
            {OFFERS.map((pack) => (
              <div
                key={pack.id}
                className="rounded-3xl bg-white border border-[#541B28]/15 p-8 sm:p-12 hover:border-[#C7A66A] transition-all duration-300 shadow-sm hover:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#541B28]/15 shadow-md">
                  <Image src={pack.image} alt={pack.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 font-cinzel text-[10px] tracking-luxury uppercase px-4 py-1.5 rounded-full bg-[#541B28] text-[#FAF7F2] border border-[#C7A66A]/40 font-bold shadow-md">
                    {pack.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-1">
                      Thématique : {pack.theme}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                      {pack.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#756B6D] italic mt-1 font-light">{pack.tagline}</p>
                  </div>

                  <p className="text-sm text-[#5A4B4E] leading-relaxed font-light">
                    {pack.description}
                  </p>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/10 space-y-2">
                    <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-2">
                      Contenu Spécial Inclus :
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#23181A]">
                      {pack.contents.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A] shrink-0" />
                          <span className="font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-4 border-t border-[#541B28]/15">
                    <div>
                      <span className="font-cinzel text-xs text-[#756B6D] line-through block tracking-luxury">
                        {formatTND(pack.originalPriceTND)}
                      </span>
                      <span className="font-serif text-3xl text-[#541B28] font-medium">
                        {formatTND(pack.promoPriceTND)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddPack(pack)}
                      className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury shadow-xl shadow-[#541B28]/25 flex items-center justify-center gap-2.5 transition-all active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                      <span>Commander Ce Pack</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
