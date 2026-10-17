"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Gift, Sparkles, Check, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";

interface BoxType {
  id: string;
  name: string;
  capacity: number; // how many perfumes
  priceTND: number;
  image: string;
  description: string;
}

const BOX_TYPES: BoxType[] = [
  {
    id: "box-single-cylinder",
    name: "L'Écrin Cylindrique Signature (1 Flacon)",
    capacity: 1,
    priceTND: 25.0,
    image: "/brand/bottle-and-cylinder.jpg",
    description: "Le cylindre iconique vert olive doré Lévania, doublé d'une mousse protectrice sur mesure.",
  },
  {
    id: "box-dual-prestige",
    name: "Le Coffret Duo Prestige (2 Flacons)",
    capacity: 2,
    priceTND: 40.0,
    image: "/brand/cylinders-dual.jpg",
    description: "Duo de flacons 50ml ou 100ml dans leur écrin double rigide aux finitions bordeaux et or.",
  },
  {
    id: "box-triptych-royal",
    name: "Le Grand Triptyque Royal (3 Flacons)",
    capacity: 3,
    priceTND: 60.0,
    image: "/brand/cylinders-dual.jpg",
    description: "Coffret d'apparat contenant trois élixirs au choix, scellé d'un médaillon en cire monogrammé Lévania.",
  },
];

interface Accessory {
  id: string;
  name: string;
  priceTND: number;
}

const ACCESSORIES: Accessory[] = [
  { id: "ribbon", name: "Ruban de Satin Bordeaux & Or Ciselé", priceTND: 6.0 },
  { id: "flowers", name: "Fleurs Séchées de Néroli & Lavande Méditerranéenne", priceTND: 9.0 },
  { id: "sealing", name: "Cachet de Cire Lévania & Écrin Velours", priceTND: 12.0 },
];

export function ComposeBox() {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBox, setSelectedBox] = useState<BoxType>(BOX_TYPES[0]);
  const [selectedPerfumes, setSelectedPerfumes] = useState<{ product: Product; size: "50ml" | "100ml" }[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["ribbon"]);
  const [customMessage, setCustomMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const togglePerfume = (product: Product, size: "50ml" | "100ml" = "50ml") => {
    const existingIndex = selectedPerfumes.findIndex((p) => p.product.id === product.id);

    if (existingIndex > -1) {
      // Remove
      setSelectedPerfumes((prev) => prev.filter((_, idx) => idx !== existingIndex));
    } else {
      if (selectedPerfumes.length >= selectedBox.capacity) {
        showToast(
          "Capacité maximale atteinte",
          `Ce coffret accueille au maximum ${selectedBox.capacity} flacon(s).`,
          "info"
        );
        return;
      }
      setSelectedPerfumes((prev) => [...prev, { product, size }]);
    }
  };

  const toggleAccessory = (accId: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId]
    );
  };

  // Price Calculation
  const boxBasePrice = selectedBox.priceTND;
  const perfumesPrice = selectedPerfumes.reduce((sum, item) => {
    const fmt = item.product.formats.find((f) => f.size === item.size) || item.product.formats[0];
    return sum + fmt.priceTND;
  }, 0);
  const accessoriesPrice = selectedAccessories.reduce((sum, accId) => {
    const acc = ACCESSORIES.find((a) => a.id === accId);
    return sum + (acc ? acc.priceTND : 0);
  }, 0);

  const totalPriceTND = boxBasePrice + perfumesPrice + accessoriesPrice;

  const handleAddBoxToCart = () => {
    if (selectedPerfumes.length === 0) {
      showToast("Veuillez sélectionner au moins un flacon", "", "error");
      return;
    }

    const perfumeNames = selectedPerfumes
      .map((p) => `${p.product.name} (${p.size})`)
      .join(" + ");

    addItem({
      productId: `box-custom-${selectedBox.id}-${Date.now()}`,
      productName: `${selectedBox.name}: ${perfumeNames}`,
      productSlug: "compose-box",
      image: selectedBox.image,
      formatSize: selectedPerfumes[0].size,
      unitPriceTND: totalPriceTND,
      unitPriceMillimes: Math.round(totalPriceTND * 1000),
      quantity: 1,
      giftBoxDetails: {
        boxType: selectedBox.name,
        wrapping: "Papier de Soie Nacré & Velours Lévania",
        accessories: selectedAccessories.map(
          (id) => ACCESSORIES.find((a) => a.id === id)?.name || id
        ),
        customMessage: customMessage.trim() ? `Pour ${recipientName}: "${customMessage}"` : undefined,
      },
    });

    showToast(
      "Coffret Personnalisé Ajouté au Panier",
      `${selectedBox.name} — ${formatTND(totalPriceTND)}`,
      "luxury"
    );
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      {/* Step Stepper */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
        {[
          { step: 1, label: "1. Écrin" },
          { step: 2, label: "2. Flacons" },
          { step: 3, label: "3. Finitions & Message" },
          { step: 4, label: "4. Aperçu & Panier" },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step as any)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                currentStep === s.step
                  ? "bg-[#C7A66A] text-[#171715] shadow-lg shadow-[#C7A66A]/30 scale-110"
                  : currentStep > s.step
                  ? "bg-[#343B2B] text-[#C7A66A] border border-[#C7A66A]/40"
                  : "bg-[#20271E] text-[#89877F] border border-neutral-700"
              )}
            >
              {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
            </div>
            <span
              className={cn(
                "text-[11px] mt-1.5 transition-colors",
                currentStep === s.step ? "text-[#C7A66A] font-semibold" : "text-[#89877F]"
              )}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Step Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: Select Box Format */}
          {currentStep === 1 && (
            <div className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="font-serif text-2xl text-gold-gradient font-light mb-2">
                1. Choisissez Votre Format d&apos;Écrin
              </h2>
              <p className="text-xs text-[#89877F] mb-6">
                Nos boîtes cylindriques et coffrets rigides sont réalisés artisanalement en carton recyclé noble et finitions dorées.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {BOX_TYPES.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBox(b)}
                    className={cn(
                      "p-5 rounded-2xl border transition-all cursor-pointer flex gap-5 items-center",
                      selectedBox.id === b.id
                        ? "bg-[#C7A66A]/10 border-[#C7A66A] shadow-xl"
                        : "bg-[#20271E]/40 border-[#C7A66A]/15 hover:border-[#C7A66A]/40"
                    )}
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-[#C7A66A]/20">
                      <Image src={b.image} alt={b.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg text-[#F6F1E8]">{b.name}</h4>
                        <span className="text-xs text-[#C7A66A] font-serif font-medium">
                          +{formatTND(b.priceTND)}
                        </span>
                      </div>
                      <p className="text-xs text-[#89877F] mt-1">{b.description}</p>
                      <span className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C7A66A]/15 text-[#C7A66A]">
                        Accueille jusqu&apos;à {b.capacity} parfum(s)
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-2",
                        selectedBox.id === b.id
                          ? "border-[#C7A66A] bg-[#C7A66A] text-[#171715]"
                          : "border-neutral-700"
                      )}
                    >
                      {selectedBox.id === b.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:opacity-95"
                >
                  <span>Étape suivante: Flacons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Perfumes */}
          {currentStep === 2 && (
            <div className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-2xl text-gold-gradient font-light">
                  2. Choisissez Vos Fragrances ({selectedPerfumes.length}/{selectedBox.capacity})
                </h2>
              </div>
              <p className="text-xs text-[#89877F] mb-6">
                Sélectionnez jusqu&apos;à {selectedBox.capacity} parfum(s) pour composer votre harmonie.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-2">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedPerfumes.some((p) => p.product.id === prod.id);
                  const selectedEntry = selectedPerfumes.find((p) => p.product.id === prod.id);

                  return (
                    <div
                      key={prod.id}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                        isSelected
                          ? "bg-[#C7A66A]/15 border-[#C7A66A]"
                          : "bg-[#20271E]/40 border-[#C7A66A]/10 hover:border-[#C7A66A]/30"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-black/40 shrink-0 border border-white/5">
                          <Image src={prod.images.main} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] uppercase tracking-wider text-[#C7A66A]">
                            {prod.collection}
                          </span>
                          <h4 className="font-serif text-base text-[#F6F1E8] leading-tight mt-0.5">
                            {prod.name}
                          </h4>
                          <span className="text-xs text-[#C7A66A] font-serif block mt-1">
                            {formatTND(prod.formats[0].priceTND)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                        <button
                          onClick={() => togglePerfume(prod, "50ml")}
                          className={cn(
                            "px-3 py-1 rounded text-xs transition-colors",
                            isSelected
                              ? "bg-rose-900/60 text-rose-200 border border-rose-600/40"
                              : "bg-[#343B2B] text-[#C7A66A] hover:bg-[#C7A66A] hover:text-[#171715]"
                          )}
                        >
                          {isSelected ? "Retirer" : "Sélectionner (50ml)"}
                        </button>
                        {isSelected && (
                          <span className="text-xs text-[#C7A66A] flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" />
                            <span>Inclus</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl border border-[#C7A66A]/30 text-xs text-[#89877F] hover:text-[#F6F1E8] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedPerfumes.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 disabled:opacity-40"
                >
                  <span>Étape suivante: Finitions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Accessories & Personalized Message */}
          {currentStep === 3 && (
            <div className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="font-serif text-2xl text-gold-gradient font-light mb-2">
                3. Finitions Décoratives & Dédicace
              </h2>
              <p className="text-xs text-[#89877F] mb-6">
                Chaque détail transforme votre coffret en une œuvre d&apos;art mémorable.
              </p>

              {/* Accessories Selection */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                  Accessoires d&apos;Élégance
                </h4>
                {ACCESSORIES.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={cn(
                        "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors",
                        isChecked
                          ? "bg-[#C7A66A]/10 border-[#C7A66A]"
                          : "bg-[#20271E]/40 border-[#C7A66A]/10 hover:border-[#C7A66A]/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center text-xs",
                            isChecked
                              ? "bg-[#C7A66A] border-[#C7A66A] text-[#171715]"
                              : "border-neutral-700"
                          )}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs text-[#F6F1E8]">{acc.name}</span>
                      </div>
                      <span className="text-xs text-[#C7A66A]">+{formatTND(acc.priceTND)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Personalized handwritten note */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                  Message Calligraphié Offert
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nom du destinataire (ex: Yasmine)"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="bg-[#20271E] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
                  />
                  <input
                    type="text"
                    placeholder="Votre mot tendre (ex: Pour célébrer ton éclat...)"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="bg-[#20271E] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>

                {customMessage && (
                  <div className="p-4 rounded-xl bg-[#20271E]/80 border border-[#C7A66A]/30 text-center font-serif italic text-sm text-[#F6F1E8] shadow-inner mt-2">
                    &laquo; Pour {recipientName || "Vous"} : {customMessage} &raquo;
                    <span className="block text-[10px] uppercase font-sans text-[#C7A66A] tracking-widest mt-1">
                      Imprimé sur papier parchemin doré Lévania
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl border border-[#C7A66A]/30 text-xs text-[#89877F] hover:text-[#F6F1E8] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:opacity-95"
                >
                  <span>Voir l&apos;Aperçu Final</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Final Preview & Add to Cart */}
          {currentStep === 4 && (
            <div className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="font-serif text-3xl text-gold-gradient font-light mb-2">
                4. Aperçu de Votre Création Sur-Mesure
              </h2>
              <p className="text-xs text-[#89877F] mb-6">
                Votre coffret est prêt à être confectionné avec le plus grand soin par nos artisans.
              </p>

              <div className="p-6 rounded-2xl bg-[#20271E]/60 border border-[#C7A66A]/20 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-black/40 border border-[#C7A66A]/30 shrink-0">
                    <Image src={selectedBox.image} alt={selectedBox.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#F6F1E8]">{selectedBox.name}</h3>
                    <p className="text-xs text-[#89877F]">{selectedBox.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedPerfumes.map((p, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#C7A66A]/20 text-[#C7A66A] font-medium border border-[#C7A66A]/30">
                          {p.product.name} ({p.size})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {customMessage && (
                  <div className="p-3 rounded-xl bg-black/40 border border-[#C7A66A]/20 text-center font-serif italic text-xs text-[#E9DFCE]">
                    &laquo; Pour {recipientName || "Vous"} : {customMessage} &raquo;
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl border border-[#C7A66A]/30 text-xs text-[#89877F] hover:text-[#F6F1E8] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={handleAddBoxToCart}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#C7A66A]/20 hover:opacity-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier ({formatTND(totalPriceTND)})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Summary & Price Breakdown */}
        <div className="rounded-3xl bg-[#20271E]/80 border border-[#C7A66A]/20 p-6 backdrop-blur-xl h-fit sticky top-28 space-y-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C7A66A] font-semibold pb-3 border-b border-white/5">
            <Gift className="w-4 h-4" />
            <span>Récapitulatif Coffret</span>
          </div>

          <div className="space-y-3 text-xs text-[#E9DFCE]/80">
            <div className="flex justify-between items-center">
              <span>{selectedBox.name}</span>
              <span className="text-[#F6F1E8]">{formatTND(boxBasePrice)}</span>
            </div>

            {selectedPerfumes.map((p, idx) => {
              const fmt = p.product.formats.find((f) => f.size === p.size) || p.product.formats[0];
              return (
                <div key={idx} className="flex justify-between items-center pl-2 border-l border-[#C7A66A]/30">
                  <span className="text-[#C7A66A]">
                    {p.product.name} ({p.size})
                  </span>
                  <span className="text-[#F6F1E8]">{formatTND(fmt.priceTND)}</span>
                </div>
              );
            })}

            {selectedAccessories.map((accId) => {
              const acc = ACCESSORIES.find((a) => a.id === accId);
              if (!acc) return null;
              return (
                <div key={accId} className="flex justify-between items-center pl-2 border-l border-white/10 text-[#89877F]">
                  <span>{acc.name}</span>
                  <span className="text-[#F6F1E8]">+{formatTND(acc.priceTND)}</span>
                </div>
              );
            })}

            <div className="pt-3 border-t border-[#C7A66A]/20 flex justify-between items-baseline text-base font-serif text-[#F6F1E8]">
              <span>Total du Coffret</span>
              <span className="text-[#C7A66A] font-semibold text-xl">
                {formatTND(totalPriceTND)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#171715] border border-[#C7A66A]/20 text-[11px] text-[#89877F] space-y-1">
            <div className="flex items-center gap-1.5 text-[#C7A66A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garantie Haute Parfumerie</span>
            </div>
            <p>Emballage soigné, livraison assurée sous 24h à 48h partout en Tunisie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
