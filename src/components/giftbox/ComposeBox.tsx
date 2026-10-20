"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Gift, Check, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";

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

  const boxWaveExpression: "signature" | "soft" | "intense" = React.useMemo(() => {
    if (selectedPerfumes.length === 0) return "signature";
    const softCount = selectedPerfumes.filter(
      (p) =>
        p.product.collectionSlug === "soyeuse" ||
        p.product.fragranceFamily === "Floral" ||
        p.product.fragranceFamily === "Citrus"
    ).length;
    const intenseCount = selectedPerfumes.filter(
      (p) =>
        p.product.collectionSlug === "intense" ||
        p.product.fragranceFamily === "Woody" ||
        p.product.fragranceFamily === "Amber"
    ).length;
    if (softCount > intenseCount) return "soft";
    if (intenseCount > softCount) return "intense";
    return "signature";
  }, [selectedPerfumes]);

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
    <div className="py-6 sm:py-10 max-w-6xl mx-auto px-4">
      {/* Step Stepper */}
      <div className="flex items-start justify-between max-w-3xl mx-auto mb-10 sm:mb-14 gap-1 sm:gap-2">
        {[
          { step: 1, label: "Écrin" },
          { step: 2, label: "Flacons" },
          { step: 3, label: "Finitions" },
          { step: 4, label: "Aperçu" },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step as 1 | 2 | 3 | 4)}
            className="flex flex-1 min-w-0 flex-col items-center group cursor-pointer"
          >
            <div
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-all duration-300",
                currentStep === s.step
                  ? "bg-[#541B28] text-[#FAF7F2] shadow-xl shadow-[#541B28]/30 scale-110 ring-2 ring-[#C7A66A]/40"
                  : currentStep > s.step
                  ? "bg-[#FAF7F2] text-[#541B28] border-2 border-[#541B28]"
                  : "bg-[#F3ECE1] text-[#756B6D] border border-[#541B28]/20"
              )}
            >
              {currentStep > s.step ? <Check className="w-4 h-4 text-[#C7A66A]" /> : s.step}
            </div>
            <span
              className={cn(
                "font-cinzel text-[9px] sm:text-[11px] tracking-wider sm:tracking-luxury uppercase mt-2.5 transition-colors font-bold text-center leading-tight",
                currentStep === s.step ? "text-[#541B28]" : "text-[#756B6D]"
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
                      "p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center",
                      selectedBox.id === b.id
                        ? "bg-[#541B28]/8 border-[#541B28] shadow-md"
                        : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                    )}
                  >
                    <div className="relative w-full h-40 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-[#541B28]/15 shadow-sm">
                      <Image src={b.image} alt={b.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base sm:text-lg text-[#23181A] font-semibold leading-snug">{b.name}</h4>
                        <p className="text-[11px] sm:text-xs text-[#756B6D] mt-1 leading-relaxed">{b.description}</p>
                        <span className="inline-block mt-2 text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#541B28]/10 text-[#541B28] font-bold">
                          Accueille jusqu&apos;à {b.capacity} parfum(s)
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-[#541B28] font-serif font-bold whitespace-nowrap">
                          +{formatTND(b.priceTND)}
                        </span>
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border flex items-center justify-center",
                            selectedBox.id === b.id
                              ? "border-[#541B28] bg-[#541B28] text-[#FAF7F2]"
                              : "border-[#756B6D]/30"
                          )}
                        >
                          {selectedBox.id === b.id && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-98"
                >
                  <span>Suivant : Flacons</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A]" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-h-[480px] sm:overflow-y-auto sm:pr-2">
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

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 text-xs text-[#756B6D] hover:text-[#541B28] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A]" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedPerfumes.length === 0}
                  className="w-full sm:w-auto justify-center px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center gap-2.5 transition-all disabled:opacity-40 shadow-lg hover:shadow-xl active:scale-98"
                >
                  <span>Suivant : Finitions</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A]" />
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
                        "p-3 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors",
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
                        <span className="text-xs text-[#23181A] font-medium min-w-0">{acc.name}</span>
                      </div>
                      <span className="text-xs text-[#541B28] font-bold shrink-0">+{formatTND(acc.priceTND)}</span>
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

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 text-xs text-[#756B6D] hover:text-[#541B28] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A]" />
                  <span>Retour</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full sm:w-auto justify-center px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-98"
                >
                  <span>Voir l&apos;Aperçu Final</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Final Preview & Add to Cart */}
          {currentStep === 4 && (
            <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-10 shadow-xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light mb-2">
                4. Aperçu de Votre Création Sur-Mesure
              </h2>
              <p className="text-sm text-[#5A4B4E] mb-8 leading-relaxed font-light">
                Votre coffret est prêt à être confectionné avec le plus grand soin par nos artisans.
              </p>

              <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-5 relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
                  <WaveMonogram size="lg" variant="gold" withSeal={false} />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <div className="relative w-full h-44 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-white border border-[#541B28]/20 shrink-0 shadow-md">
                    <Image src={selectedBox.image} alt={selectedBox.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start gap-2.5">
                      <WaveMonogram size="sm" variant="burgundy" withSeal />
                      <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] font-semibold">{selectedBox.name}</h3>
                    </div>
                    <p className="text-xs text-[#756B6D] mt-1.5 leading-relaxed">{selectedBox.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedPerfumes.map((p, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#541B28]/10 text-[#541B28] font-bold border border-[#541B28]/20">
                          {p.product.name} ({p.size})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {customMessage && (
                  <div className="p-5 rounded-2xl bg-white border border-[#541B28]/20 text-center font-serif italic text-sm sm:text-base text-[#23181A] shadow-inner">
                    &laquo; Pour {recipientName || "Vous"} : {customMessage} &raquo;
                    <span className="block text-[10px] uppercase font-cinzel text-[#541B28] tracking-grand mt-2 font-bold">
                      Scellé au cachet de cire monogrammé Lévania
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 text-xs text-[#756B6D] hover:text-[#541B28] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A]" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={handleAddBoxToCart}
                  className="w-full sm:w-auto justify-center px-5 sm:px-9 py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-luxury flex items-center gap-2.5 shadow-xl shadow-[#541B28]/25 transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                  <span>Ajouter au Panier ({formatTND(totalPriceTND)})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Summary & Price Breakdown */}
        <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-7 shadow-xl h-fit lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#541B28]/15">
            <div className="flex items-center gap-2.5 font-cinzel text-[11px] uppercase tracking-luxury text-[#541B28] font-bold">
              <Gift className="w-4 h-4 text-[#C7A66A]" />
              <span>Récapitulatif Coffret</span>
            </div>
            <WaveMonogram size="sm" variant="gold" withSeal={false} />
          </div>

          <div className="space-y-3 text-xs text-[#5A4B4E]">
            <div className="flex justify-between items-start gap-3">
              <span className="min-w-0">{selectedBox.name}</span>
              <span className="text-[#23181A] font-medium shrink-0">{formatTND(boxBasePrice)}</span>
            </div>

            {selectedPerfumes.map((p, idx) => {
              const fmt = p.product.formats.find((f) => f.size === p.size) || p.product.formats[0];
              return (
                <div key={idx} className="flex justify-between items-start gap-3 pl-2 border-l-2 border-[#541B28]">
                  <span className="text-[#541B28] font-medium min-w-0">
                    {p.product.name} ({p.size})
                  </span>
                  <span className="text-[#23181A] font-semibold shrink-0">{formatTND(fmt.priceTND)}</span>
                </div>
              );
            })}

            {selectedAccessories.map((accId) => {
              const acc = ACCESSORIES.find((a) => a.id === accId);
              if (!acc) return null;
              return (
                <div key={accId} className="flex justify-between items-start gap-3 pl-2 border-l-2 border-[#C7A66A] text-[#756B6D]">
                  <span className="min-w-0">{acc.name}</span>
                  <span className="text-[#23181A] shrink-0">+{formatTND(acc.priceTND)}</span>
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

          {/* Sillage Ondulatoire du Coffret */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#541B28] font-bold">
              <span>Onde du Coffret</span>
              <span className="text-[#434B36]">
                {boxWaveExpression === "soft"
                  ? "Harmonie Soyeuse"
                  : boxWaveExpression === "intense"
                  ? "Harmonie Sombre"
                  : "Harmonie Signature"}
              </span>
            </div>

            <div className="h-16 rounded-xl overflow-hidden bg-white/80 border border-[#541B28]/10 relative">
              <WaveCanvas
                expression={boxWaveExpression}
                interactive={false}
                height="100%"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 text-[11px] text-[#756B6D] space-y-1">
            <div className="flex items-center gap-2 text-[#541B28] font-cinzel font-bold tracking-luxury text-[11px] uppercase">
              <GoldStarLozenge size={12} className="text-[#C7A66A]" />
              <span>Garantie Haute Parfumerie</span>
            </div>
            <p>Emballage soigné, livraison assurée sous 24h à 48h partout en Tunisie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
