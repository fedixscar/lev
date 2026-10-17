"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Sparkles, Clock, ArrowRight, ShoppingBag } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-widest font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Campagnes & Offres Spéciales</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1 mb-3">
              Les Offres du Mois
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Des compositions thématiques créées pour célébrer les moments majeurs de votre vie : mariages, retours d&apos;Omra, anniversaires et présents prestigieux.
            </p>
          </div>

          {/* Flash Sale Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2] border border-[#C7A66A]/30 mb-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-[#C7A66A]/40 flex items-center justify-center text-[#DFC68B] shrink-0">
                <Clock className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#DFC68B] font-bold">
                  Vente Flash Privilège (24 Heures)
                </span>
                <h3 className="font-serif text-2xl text-[#FAF7F2]">
                  -15% Supplémentaire avec le code : <span className="text-gold-gradient font-bold">WAVE20</span>
                </h3>
                <p className="text-xs text-[#D5C4C7] mt-0.5">
                  Dès 250 TND d&apos;achat sur tout le panier &bull; Valable sur les flacons et les coffrets.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#DFC68B] text-[#2A0B12] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shrink-0 flex items-center gap-2 shadow-lg"
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
                className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-10 hover:border-[#541B28] transition-all shadow-sm hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#541B28]/15 shadow-sm">
                  <Image src={pack.image} alt={pack.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-[#541B28] text-[#FAF7F2] border border-[#C7A66A]/40 font-semibold shadow-md">
                    {pack.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                      Thématique : {pack.theme}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light mt-1">
                      {pack.title}
                    </h3>
                    <p className="text-xs text-[#756B6D] italic mt-0.5">{pack.tagline}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
                    {pack.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#541B28] font-bold block mb-2">
                      Contenu Spécial Inclus :
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#23181A]">
                      {pack.contents.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#541B28]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#541B28]/10">
                    <div>
                      <span className="text-xs text-[#756B6D] line-through block">
                        {formatTND(pack.originalPriceTND)}
                      </span>
                      <span className="font-serif text-2xl text-[#541B28] font-bold">
                        {formatTND(pack.promoPriceTND)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddPack(pack)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#541B28]/20 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#DFC68B]" />
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
