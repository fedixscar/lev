"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Sparkles, Clock, ArrowRight, ShoppingBag, Gift, Heart, Shield } from "lucide-react";
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
    title: "Le Coffret des Mariés &bull; Noces d'Or",
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
    title: "Pack Sillage Sacré &bull; Omra & Événements",
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
    title: "Coffret Anniversaire &bull; Sillage d'Olivier",
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
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#542B32]/60 border border-[#542B32] text-xs text-rose-200 uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Campagnes & Offres Spéciales</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-1 mb-3">
              Les Offres du Mois
            </h1>
            <p className="text-xs sm:text-sm text-[#89877F]">
              Des compositions thématiques créées pour célébrer les moments majeurs de votre vie : mariages, retours d&apos;Omra, anniversaires et présents prestigieux.
            </p>
          </div>

          {/* Flash Sale Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20271E] via-[#343B2B] to-[#20271E] border border-[#C7A66A]/40 mb-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-black/40 border border-[#C7A66A]/30 flex items-center justify-center text-[#C7A66A] shrink-0">
                <Clock className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-bold">
                  Vente Flash Privilège (24 Heures)
                </span>
                <h3 className="font-serif text-2xl text-[#F6F1E8]">
                  -15% Supplémentaire avec le code : <span className="text-gold-gradient">WAVE20</span>
                </h3>
                <p className="text-xs text-[#89877F] mt-0.5">
                  Dès 250 TND d&apos;achat sur tout le panier &bull; Valable sur les flacons et les coffrets.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2"
            >
              <span>Profiter de la Vente Flash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Curated Packs */}
          <div className="space-y-12">
            {OFFERS.map((pack) => (
              <div
                key={pack.id}
                className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-6 sm:p-10 backdrop-blur-xl hover:border-[#C7A66A]/40 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-[#C7A66A]/20">
                  <Image src={pack.image} alt={pack.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-[#542B32] text-rose-200 border border-[#C7A66A]/30 font-semibold shadow-md">
                    {pack.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-medium">
                      Thématique : {pack.theme}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light mt-1">
                      {pack.title}
                    </h3>
                    <p className="text-xs text-[#89877F] italic mt-0.5">{pack.tagline}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#E9DFCE]/80 leading-relaxed">
                    {pack.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#20271E]/60 border border-[#C7A66A]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#C7A66A] font-semibold block mb-2">
                      Contenu Spécial Inclus :
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E9DFCE]">
                      {pack.contents.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
                    <div>
                      <span className="text-xs text-[#89877F] line-through block">
                        {formatTND(pack.originalPriceTND)}
                      </span>
                      <span className="font-serif text-2xl text-[#C7A66A] font-semibold">
                        {formatTND(pack.promoPriceTND)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddPack(pack)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#C7A66A]/20 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
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
