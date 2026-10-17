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
                  ? "bg-[#541B28] text-[#FAF7F2] shadow-md shadow-[#541B28]/25 scale-110"
                  : currentStep > s.step
                  ? "bg-[#FAF7F2] text-[#541B28] border border-[#541B28]/40"
                  : "bg-[#F3ECE1] text-[#756B6D] border border-[#541B28]/15"
              )}
            >
              {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
            </div>
            <span
              className={cn(
                "text-[11px] mt-1.5 transition-colors",
                currentStep === s.step ? "text-[#541B28] font-bold" : "text-[#756B6D]"
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
            <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-8 shadow-xl">
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light mb-2">
                1. Choisissez Votre Format d&apos;Écrin
              </h2>
              <p className="text-xs text-[#5A4B4E] mb-6 leading-relaxed">
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
                        ? "bg-[#541B28]/8 border-[#541B28] shadow-md"
                        : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                    )}
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-[#541B28]/15 shadow-sm">
                      <Image src={b.image} alt={b.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg text-[#23181A] font-semibold">{b.name}</h4>
                        <span className="text-xs text-[#541B28] font-serif font-bold">
                          +{formatTND(b.priceTND)}
                        </span>
                      </div>
                      <p className="text-xs text-[#756B6D] mt-1">{b.description}</p>
                      <span className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#541B28]/10 text-[#541B28] font-bold">
                        Accueille jusqu&apos;à {b.capacity} parfum(s)
                      </span>
                    </div>

                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-2",
                        selectedBox.id === b.id
                          ? "border-[#541B28] bg-[#541B28] text-[#FAF7F2]"
                          : "border-[#756B6D]/30"
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
                  className="px-6 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Étape suivante: Flacons</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Perfumes */}
          {currentStep === 2 && (
            <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-2xl text-burgundy-gradient font-light">
                  2. Choisissez Vos Fragrances ({selectedPerfumes.length}/{selectedBox.capacity})
                </h2>
              </div>
              <p className="text-xs text-[#5A4B4E] mb-6 leading-relaxed">
                Sélectionnez jusqu&apos;à {selectedBox.capacity} parfum(s) pour composer votre harmonie.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-2">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedPerfumes.some((p) => p.product.id === prod.id);

                  return (
                    <div
                      key={prod.id}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                        isSelected
                          ? "bg-[#541B28]/8 border-[#541B28] shadow-sm"
                          : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-[#541B28]/15 shadow-sm">
                          <Image src={prod.images.main} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] uppercase tracking-wider text-[#541B28] font-bold">
                            {prod.collection}
                          </span>
                          <h4 className="font-serif text-base text-[#23181A] leading-tight mt-0.5 font-semibold">
                            {prod.name}
                          </h4>
                          <span className="text-xs text-[#541B28] font-serif font-bold block mt-1">
                            {formatTND(prod.formats[0].priceTND)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#541B28]/10">
                        <button
                          onClick={() => togglePerfume(prod, "50ml")}
                          className={cn(
                            "px-3 py-1 rounded text-xs transition-colors font-medium",
                            isSelected
                              ? "bg-rose-900/10 text-[#541B28] border border-[#541B28]/40"
                              : "bg-[#541B28] text-[#FAF7F2] hover:bg-[#66182C]"
                          )}
                        >
                          {isSelected ? "Retirer" : "Sélectionner (50ml)"}
                        </button>
                        {isSelected && (
                          <span className="text-xs text-[#541B28] flex items-center gap-1 font-bold">
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
                  className="px-4 py-2 rounded-xl border border-[#541B28]/30 text-xs text-[#756B6D] hover:text-[#541B28] flex items-center gap-1.5 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedPerfumes.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-40 shadow-md"
                >
                  <span>Étape suivante: Finitions</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Accessories & Personalized Message */}
          {currentStep === 3 && (
            <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-8 shadow-xl">
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light mb-2">
                3. Finitions Décoratives & Dédicace
              </h2>
              <p className="text-xs text-[#5A4B4E] mb-6 leading-relaxed">
                Chaque détail transforme votre coffret en une œuvre d&apos;art mémorable.
              </p>

              {/* Accessories Selection */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
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
                          ? "bg-[#541B28]/8 border-[#541B28]"
                          : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center text-xs",
                            isChecked
                              ? "bg-[#541B28] border-[#541B28] text-[#FAF7F2]"
                              : "border-[#756B6D]/30"
                          )}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs text-[#23181A] font-medium">{acc.name}</span>
                      </div>
                      <span className="text-xs text-[#541B28] font-bold">+{formatTND(acc.priceTND)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Personalized handwritten note */}
              <div className="space-y-3 pt-4 border-t border-[#541B28]/10">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                  Message Calligraphié Offert
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nom du destinataire (ex: Yasmine)"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                  />
                  <input
                    type="text"
                    placeholder="Votre mot tendre (ex: Pour célébrer ton éclat...)"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                  />
                </div>

                {customMessage && (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/25 text-center font-serif italic text-sm text-[#23181A] shadow-inner mt-2">
                    &laquo; Pour {recipientName || "Vous"} : {customMessage} &raquo;
                    <span className="block text-[10px] uppercase font-sans text-[#541B28] tracking-widest mt-1 font-bold">
                      Imprimé sur papier parchemin doré Lévania
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl border border-[#541B28]/30 text-xs text-[#756B6D] hover:text-[#541B28] flex items-center gap-1.5 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Voir l&apos;Aperçu Final</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Final Preview & Add to Cart */}
          {currentStep === 4 && (
            <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-8 shadow-xl">
              <h2 className="font-serif text-3xl text-burgundy-gradient font-light mb-2">
                4. Aperçu de Votre Création Sur-Mesure
              </h2>
              <p className="text-xs text-[#5A4B4E] mb-6 leading-relaxed">
                Votre coffret est prêt à être confectionné avec le plus grand soin par nos artisans.
              </p>

              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-white border border-[#541B28]/20 shrink-0 shadow-sm">
                    <Image src={selectedBox.image} alt={selectedBox.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#23181A] font-semibold">{selectedBox.name}</h3>
                    <p className="text-xs text-[#756B6D]">{selectedBox.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedPerfumes.map((p, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#541B28]/10 text-[#541B28] font-bold border border-[#541B28]/20">
                          {p.product.name} ({p.size})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {customMessage && (
                  <div className="p-3 rounded-xl bg-white border border-[#541B28]/15 text-center font-serif italic text-xs text-[#23181A]">
                    &laquo; Pour {recipientName || "Vous"} : {customMessage} &raquo;
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl border border-[#541B28]/30 text-xs text-[#756B6D] hover:text-[#541B28] flex items-center gap-1.5 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={handleAddBoxToCart}
                  className="px-8 py-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#541B28]/25 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DFC68B]" />
                  <span>Ajouter au Panier ({formatTND(totalPriceTND)})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Summary & Price Breakdown */}
        <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 shadow-xl h-fit sticky top-28 space-y-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#541B28] font-bold pb-3 border-b border-[#541B28]/15">
            <Gift className="w-4 h-4" />
            <span>Récapitulatif Coffret</span>
          </div>

          <div className="space-y-3 text-xs text-[#5A4B4E]">
            <div className="flex justify-between items-center">
              <span>{selectedBox.name}</span>
              <span className="text-[#23181A] font-medium">{formatTND(boxBasePrice)}</span>
            </div>

            {selectedPerfumes.map((p, idx) => {
              const fmt = p.product.formats.find((f) => f.size === p.size) || p.product.formats[0];
              return (
                <div key={idx} className="flex justify-between items-center pl-2 border-l-2 border-[#541B28]">
                  <span className="text-[#541B28] font-medium">
                    {p.product.name} ({p.size})
                  </span>
                  <span className="text-[#23181A] font-semibold">{formatTND(fmt.priceTND)}</span>
                </div>
              );
            })}

            {selectedAccessories.map((accId) => {
              const acc = ACCESSORIES.find((a) => a.id === accId);
              if (!acc) return null;
              return (
                <div key={accId} className="flex justify-between items-center pl-2 border-l-2 border-[#C7A66A] text-[#756B6D]">
                  <span>{acc.name}</span>
                  <span className="text-[#23181A]">+{formatTND(acc.priceTND)}</span>
                </div>
              );
            })}

            <div className="pt-3 border-t border-[#541B28]/20 flex justify-between items-baseline text-base font-serif text-[#23181A]">
              <span>Total du Coffret</span>
              <span className="text-[#541B28] font-bold text-xl">
                {formatTND(totalPriceTND)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 text-[11px] text-[#756B6D] space-y-1">
            <div className="flex items-center gap-1.5 text-[#541B28] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Garantie Haute Parfumerie</span>
            </div>
            <p>Emballage soigné, livraison assurée sous 24h à 48h partout en Tunisie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
