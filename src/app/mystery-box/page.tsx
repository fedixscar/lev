"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Package, ShieldCheck, Check, ShoppingBag } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
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
                Surprise de Prestige & Transparence
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light mt-1 mb-4">
              Les Mystery Boxes Lévania
            </h1>
            <p className="text-sm sm:text-base text-[#5A4B4E] leading-relaxed font-light max-w-2xl mx-auto">
              Le frisson du hasard allié à la rigueur de la haute parfumerie. Chaque boîte garantit une valeur marchande strictement supérieure au prix d&apos;achat.
            </p>
          </div>

          {/* Ethics & Guarantee Notice */}
          <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm mb-14 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs">
            <div className="flex items-center gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#434B36] shrink-0" />
              <span className="text-[#23181A] font-light">
                <strong className="font-semibold text-[#541B28]">Transparence Totale :</strong> Aucun produit périmé ni générique. Exclusivement des flacons officiels Lévania neufs et scellés.
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <WaveMonogram size="sm" variant="gold" withSeal={false} />
              <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#541B28] font-bold">Valeur Marchande Garantie</span>
            </div>
          </div>

          {/* Mystery Box Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MYSTERY_BOXES.map((box) => (
              <div
                key={box.id}
                className="rounded-3xl bg-white border border-[#541B28]/15 p-7 flex flex-col justify-between hover:border-[#C7A66A] transition-all duration-300 shadow-sm hover:shadow-2xl group relative overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#541B28]/15 shadow-sm mb-6">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#541B28] border border-[#541B28]/25 font-cinzel text-[10px] tracking-luxury uppercase font-bold shadow-sm backdrop-blur-sm">
                      <WaveMonogram size="sm" variant="burgundy" withSeal={false} />
                      <span>{box.waveTitle}</span>
                    </div>

                    <span className="absolute top-3.5 right-3.5 font-cinzel text-[10px] tracking-wider px-3 py-1.5 rounded-full bg-white/95 text-[#541B28] border border-[#541B28]/25 font-bold shadow-sm">
                      Reste {box.stockRemaining} ex.
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#23181A] group-hover:text-[#541B28] transition-colors font-medium">
                    {box.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#756B6D] mt-2 leading-relaxed font-light">{box.description}</p>

                  {/* Micro Wave Canvas for each box tier */}
                  <div className="my-4 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#541B28]/10 relative">
                    <WaveCanvas
                      expression={box.waveExpr}
                      interactive={false}
                      height="100%"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/10">
                    <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-2.5">
                      Contenus Possibles :
                    </span>
                    <ul className="space-y-2 text-xs text-[#5A4B4E]">
                      {box.possibleContents.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C7A66A] shrink-0 mt-0.5" />
                          <span className="font-light">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#541B28]/15">
                  <div className="flex items-baseline justify-between mb-5">
                    <div>
                      <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#756B6D] block">Prix Coffret</span>
                      <span className="font-serif text-3xl text-[#541B28] font-medium">
                        {formatTND(box.priceTND)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#756B6D] block">Valeur Min.</span>
                      <span className="font-cinzel text-xs text-[#434B36] font-bold">
                        {formatTND(box.guaranteedMinValueTND)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddMysteryBox(box)}
                    className="w-full py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all shadow-xl shadow-[#541B28]/25 flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
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
