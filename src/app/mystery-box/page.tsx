"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Sparkles, Package, ShieldCheck, Check, ShoppingBag, Eye } from "lucide-react";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";

interface MysteryBoxTier {
  id: string;
  name: string;
  priceTND: number;
  guaranteedMinValueTND: number;
  description: string;
  image: string;
  possibleContents: string[];
  stockRemaining: number;
}

const MYSTERY_BOXES: MysteryBoxTier[] = [
  {
    id: "mystery-bronze",
    name: "Mystery Box &bull; Initiation Olfactive",
    priceTND: 150.0,
    guaranteedMinValueTND: 195.0,
    description: "Un élixir 50ml garanti au hasard parmi nos bestsellers + 2 échantillons découverte 5ml scellés dans l'écrin cylindrique.",
    image: "/brand/bottle-and-cylinder.jpg",
    possibleContents: ["1 Flacon 50ml (Onde d'Or, Sillage d'Olivier ou Néroli Flottant)", "2x Échantillons Luxe 5ml", "1x Pochette Velours Lévania"],
    stockRemaining: 14,
  },
  {
    id: "mystery-gold",
    name: "Mystery Box &bull; Or Impérial",
    priceTND: 250.0,
    guaranteedMinValueTND: 350.0,
    description: "Au minimum un grand flacon 100ml de la Collection Signature ou Sombre & Boisée + un accessoire précieux (Ruban, Écrin double).",
    image: "/brand/cylinders-dual.jpg",
    possibleContents: ["1 Flacon 100ml au hasard (Valeur jusqu'à 350 TND)", "1x Écrin Rigide Double Cylindre", "1x Carte Privilège & 50 Points Fidélité"],
    stockRemaining: 8,
  },
  {
    id: "mystery-royal",
    name: "Mystery Box &bull; Grand Sceau Royal",
    priceTND: 420.0,
    guaranteedMinValueTND: 580.0,
    description: "Le sommet de la surprise de luxe : 2 Flacons garantis (1x 100ml + 1x 50ml) + ensemble d'échantillons complet de la maison.",
    image: "/brand/cylinders-dual.jpg",
    possibleContents: ["2 Flacons Complets (100ml + 50ml)", "Coffret Triptyque Royal", "Ensemble Découverte des 10 Parfums en 2ml", "Bon de Réduction 50 TND sur votre prochain achat"],
    stockRemaining: 5,
  },
];

export default function MysteryBoxPage() {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const handleAddMysteryBox = (box: MysteryBoxTier) => {
    addItem({
      productId: box.id,
      productName: box.name,
      productSlug: "mystery-box",
      image: box.image,
      formatSize: "100ml",
      unitPriceTND: box.priceTND,
      unitPriceMillimes: Math.round(box.priceTND * 1000),
      quantity: 1,
    });
    showToast("Mystery Box Ajoutée au Panier", `${box.name} — ${formatTND(box.priceTND)}`, "luxury");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-widest font-semibold mb-3">
              <Package className="w-3.5 h-3.5" />
              <span>Surprise de Prestige & Transparence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-1 mb-3">
              Les Mystery Boxes Lévania
            </h1>
            <p className="text-xs sm:text-sm text-[#89877F]">
              Le frisson du hasard allié à la rigueur de la haute parfumerie. Chaque boîte garantit une valeur marchande strictement supérieure au prix d&apos;achat.
            </p>
          </div>

          {/* Ethics & Guarantee Notice */}
          <div className="p-4 rounded-2xl bg-[#20271E]/60 border border-[#C7A66A]/20 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-[#E9DFCE]">
                <strong>Transparence Totale :</strong> Aucun produit périmé ni générique. Exclusivement des flacons officiels Lévania neufs et scellés.
              </span>
            </div>
            <span className="text-[#C7A66A] font-medium shrink-0">Valeur Minimum Garantie</span>
          </div>

          {/* Mystery Box Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MYSTERY_BOXES.map((box) => (
              <div
                key={box.id}
                className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-6 flex flex-col justify-between hover:border-[#C7A66A]/50 transition-all shadow-xl group"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-[#C7A66A]/20 mb-5">
                    <Image src={box.image} alt={box.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-[#20271E]/90 text-emerald-300 border border-emerald-500/40">
                      Reste {box.stockRemaining} ex.
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#F6F1E8] group-hover:text-gold-gradient transition-colors">
                    {box.name}
                  </h3>
                  <p className="text-xs text-[#89877F] mt-2 leading-relaxed">{box.description}</p>

                  <div className="mt-5 p-3 rounded-xl bg-[#20271E]/60 border border-[#C7A66A]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#C7A66A] font-semibold block mb-2">
                      Contenus Possibles :
                    </span>
                    <ul className="space-y-1 text-xs text-[#E9DFCE]/80">
                      {box.possibleContents.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#C7A66A] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C7A66A]/15">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-[#89877F] block">Prix du Coffret</span>
                      <span className="font-serif text-2xl text-[#C7A66A] font-semibold">
                        {formatTND(box.priceTND)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#89877F] block">Valeur Garantie Min.</span>
                      <span className="text-xs text-emerald-400 font-medium">
                        {formatTND(box.guaranteedMinValueTND)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddMysteryBox(box)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tenter la Surprise</span>
                  </button>
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
