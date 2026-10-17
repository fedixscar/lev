"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Package, ShieldCheck, Check, ShoppingBag, Sparkles } from "lucide-react";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { WaveCanvas } from "@/components/brand/WaveCanvas";

interface MysteryBoxTier {
  id: string;
  name: string;
  waveExpr: "soft" | "signature" | "intense";
  waveTitle: string;
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
    name: "Mystery Box \u2022 Initiation Olfactive",
    waveExpr: "soft",
    waveTitle: "Onde Soyeuse",
    priceTND: 150.0,
    guaranteedMinValueTND: 195.0,
    description: "Un élixir 50ml garanti au hasard parmi nos bestsellers + 2 échantillons découverte 5ml scellés dans l'écrin cylindrique.",
    image: "/brand/bottle-and-cylinder.jpg",
    possibleContents: ["1 Flacon 50ml (Onde d'Or, Sillage d'Olivier ou Néroli Flottant)", "2x Échantillons Luxe 5ml", "1x Pochette Velours Lévania"],
    stockRemaining: 14,
  },
  {
    id: "mystery-gold",
    name: "Mystery Box \u2022 Or Impérial",
    waveExpr: "signature",
    waveTitle: "Onde Signature",
    priceTND: 250.0,
    guaranteedMinValueTND: 350.0,
    description: "Au minimum un grand flacon 100ml de la Collection Signature ou Sombre & Boisée + un accessoire précieux (Ruban, Écrin double).",
    image: "/brand/cylinders-dual.jpg",
    possibleContents: ["1 Flacon 100ml au hasard (Valeur jusqu'à 350 TND)", "1x Écrin Rigide Double Cylindre", "1x Carte Privilège & 50 Points Fidélité"],
    stockRemaining: 8,
  },
  {
    id: "mystery-royal",
    name: "Mystery Box \u2022 Grand Sceau Royal",
    waveExpr: "intense",
    waveTitle: "Onde Sombre",
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-widest font-bold mb-3">
              <Package className="w-3.5 h-3.5 text-[#541B28]" />
              <span>Surprise de Prestige & Transparence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1 mb-3">
              Les Mystery Boxes Lévania
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Le frisson du hasard allié à la rigueur de la haute parfumerie. Chaque boîte garantit une valeur marchande strictement supérieure au prix d&apos;achat.
            </p>
          </div>

          {/* Ethics & Guarantee Notice */}
          <div className="p-5 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#434B36] shrink-0" />
              <span className="text-[#23181A]">
                <strong>Transparence Totale :</strong> Aucun produit périmé ni générique. Exclusivement des flacons officiels Lévania neufs et scellés.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <WaveMonogram size="sm" variant="gold" withSeal={false} />
              <span className="text-[#541B28] font-bold">Valeur Marchande Garantie</span>
            </div>
          </div>

          {/* Mystery Box Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MYSTERY_BOXES.map((box) => (
              <div
                key={box.id}
                className="rounded-3xl bg-white border border-[#541B28]/20 p-6 flex flex-col justify-between hover:border-[#541B28] transition-all shadow-sm hover:shadow-xl group relative overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#541B28]/15 shadow-sm mb-5">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#541B28] border border-[#541B28]/25 text-[10px] font-bold shadow-sm backdrop-blur-sm">
                      <WaveMonogram size="sm" variant="burgundy" withSeal={false} />
                      <span>{box.waveTitle}</span>
                    </div>

                    <span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-white/95 text-[#541B28] border border-[#541B28]/25 font-bold shadow-sm">
                      Reste {box.stockRemaining} ex.
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] group-hover:text-[#541B28] transition-colors font-semibold">
                    {box.name}
                  </h3>
                  <p className="text-xs text-[#756B6D] mt-2 leading-relaxed">{box.description}</p>

                  {/* Micro Wave Canvas for each box tier */}
                  <div className="my-3 h-10 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#541B28]/10 relative">
                    <WaveCanvas
                      expression={box.waveExpr}
                      interactive={false}
                      height="100%"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#541B28]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#541B28] font-bold block mb-2">
                      Contenus Possibles :
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#5A4B4E]">
                      {box.possibleContents.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#541B28] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#541B28]/15">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-[#756B6D] block">Prix du Coffret</span>
                      <span className="font-serif text-2xl text-[#541B28] font-bold">
                        {formatTND(box.priceTND)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#756B6D] block">Valeur Garantie Min.</span>
                      <span className="text-xs text-[#434B36] font-bold">
                        {formatTND(box.guaranteedMinValueTND)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddMysteryBox(box)}
                    className="w-full py-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DFC68B]" />
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
