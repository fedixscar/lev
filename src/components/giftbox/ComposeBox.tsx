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
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedProduct } from "@/lib/i18n/catalogueLocale";

interface BoxType {
  id: string;
  name: string;
  capacity: number;
  priceTND: number;
  image: string;
  description: string;
}

interface Accessory {
  id: string;
  name: string;
  priceTND: number;
}

function getBoxTypes(t: (k: string, fb?: string) => string): BoxType[] {
  return [
    {
      id: "box-single-cylinder",
      name: t("compose.box1_name", "L'Écrin Cylindrique Signature (1 Flacon)"),
      capacity: 1,
      priceTND: 25.0,
      image: "/brand/bottle-and-cylinder.jpg",
      description: t("compose.box1_desc", "Le cylindre iconique vert olive doré Lévania, doublé d'une mousse protectrice sur mesure."),
    },
    {
      id: "box-dual-prestige",
      name: t("compose.box2_name", "Le Coffret Duo Prestige (2 Flacons)"),
      capacity: 2,
      priceTND: 40.0,
      image: "/brand/cylinders-dual.jpg",
      description: t("compose.box2_desc", "Duo de flacons 50ml ou 100ml dans leur écrin double rigide aux finitions bordeaux et or."),
    },
    {
      id: "box-triptych-royal",
      name: t("compose.box3_name", "Le Grand Triptyque Royal (3 Flacons)"),
      capacity: 3,
      priceTND: 60.0,
      image: "/brand/cylinders-dual.jpg",
      description: t("compose.box3_desc", "Coffret d'apparat contenant trois élixirs au choix, scellé d'un médaillon en cire monogrammé Lévania."),
    },
  ];
}

function getAccessories(t: (k: string, fb?: string) => string): Accessory[] {
  return [
    { id: "ribbon", name: t("compose.acc_ribbon", "Ruban de Satin Bordeaux & Or Ciselé"), priceTND: 6.0 },
    { id: "flowers", name: t("compose.acc_flowers", "Fleurs Séchées de Néroli & Lavande Méditerranéenne"), priceTND: 9.0 },
    { id: "sealing", name: t("compose.acc_sealing", "Cachet de Cire Lévania & Écrin Velours"), priceTND: 12.0 },
  ];
}

export function ComposeBox() {
  const { addItem } = useCart();
  const { showToast } = useNotification();
  const { t, locale } = useLanguage();

  const boxTypes = getBoxTypes(t);
  const accessories = getAccessories(t);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBoxId, setSelectedBoxId] = useState<string>("box-single-cylinder");
  const [selectedPerfumes, setSelectedPerfumes] = useState<{ product: Product; size: "50ml" | "100ml" }[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["ribbon"]);
  const [customMessage, setCustomMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const selectedBox = boxTypes.find((b) => b.id === selectedBoxId) || boxTypes[0];

  const togglePerfume = (product: Product, size: "50ml" | "100ml" = "50ml") => {
    const existingIndex = selectedPerfumes.findIndex((p) => p.product.id === product.id);

    if (existingIndex > -1) {
      setSelectedPerfumes((prev) => prev.filter((_, idx) => idx !== existingIndex));
    } else {
      if (selectedPerfumes.length >= selectedBox.capacity) {
        showToast(
          t("compose.capacity_reached_title", "Capacité maximale atteinte"),
          t("compose.capacity_reached_desc", "Ce coffret accueille au maximum {n} flacon(s).").replace("{n}", String(selectedBox.capacity)),
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
    const acc = accessories.find((a) => a.id === accId);
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
      showToast(t("compose.select_at_least_one", "Veuillez sélectionner au moins un flacon"), "", "error");
      return;
    }

    const perfumeNames = selectedPerfumes
      .map((p) => {
        const lp = getLocalizedProduct(p.product, locale);
        return `${lp.name} (${p.size})`;
      })
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
        wrapping: t("compose.wrapping_name", "Papier de Soie Nacré & Velours Lévania"),
        accessories: selectedAccessories.map(
          (id) => accessories.find((a) => a.id === id)?.name || id
        ),
        customMessage: customMessage.trim() ? `${t("compose.for_prefix", "Pour")} ${recipientName || t("compose.you_default", "Vous")}: "${customMessage}"` : undefined,
      },
    });

    showToast(
      t("compose.toast_added", "Coffret Personnalisé Ajouté au Panier"),
      `${selectedBox.name} — ${formatTND(totalPriceTND)}`,
      "luxury"
    );
  };

  const stepsList = [
    { step: 1, label: t("compose.step_box", "Écrin") },
    { step: 2, label: t("compose.step_perfumes", "Flacons") },
    { step: 3, label: t("compose.step_finishing", "Finitions") },
    { step: 4, label: t("compose.step_preview", "Aperçu") },
  ];

  return (
    <div className="py-6 sm:py-10 max-w-6xl mx-auto px-4">
      {/* Step Stepper */}
      <div className="flex items-start justify-between max-w-3xl mx-auto mb-10 sm:mb-14 gap-1 sm:gap-2">
        {stepsList.map((s) => (
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
                  ? "bg-[#FAF7F2] dark:bg-[#180B10] text-[#541B28] dark:text-[#DFC68B] border-2 border-[#541B28] dark:border-[#C7A66A]"
                  : "bg-[#F3ECE1] dark:bg-[#15090E] text-[#756B6D] border border-[#541B28]/20 dark:border-[#C7A66A]/20"
              )}
            >
              {currentStep > s.step ? <Check className="w-4 h-4 text-[#C7A66A]" /> : s.step}
            </div>
            <span
              className={cn(
                "font-cinzel text-[9px] sm:text-[11px] tracking-wider sm:tracking-luxury uppercase mt-2.5 transition-colors font-bold text-center leading-tight",
                currentStep === s.step ? "text-[#541B28] dark:text-[#DFC68B]" : "text-[#756B6D] dark:text-[#A8989C]"
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
            <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-8 shadow-xl">
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light mb-2">
                {t("compose.step1_title", "1. Choisissez Votre Format d'Écrin")}
              </h2>
              <p className="text-xs text-[#5A4B4E] dark:text-[#D8CCD0] mb-6 leading-relaxed">
                {t("compose.step1_desc", "Nos boîtes cylindriques et coffrets rigides sont réalisés artisanalement en carton recyclé noble et finitions dorées.")}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {boxTypes.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBoxId(b.id)}
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center",
                      selectedBox.id === b.id
                        ? "bg-[#541B28]/8 dark:bg-[#C7A66A]/15 border-[#541B28] dark:border-[#DFC68B] shadow-md"
                        : "bg-[#FAF7F2] dark:bg-[#0E0709] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28] dark:hover:border-[#C7A66A]"
                    )}
                  >
                    <div className="relative w-full h-40 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-[#541B28]/15 shadow-sm">
                      <Image src={b.image} alt={b.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base sm:text-lg text-[#23181A] dark:text-[#FAF7F2] font-semibold leading-snug">{b.name}</h4>
                        <p className="text-[11px] sm:text-xs text-[#756B6D] dark:text-[#A8989C] mt-1 leading-relaxed">{b.description}</p>
                        <span className="inline-block mt-2 text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#541B28]/10 dark:bg-[#C7A66A]/20 text-[#541B28] dark:text-[#DFC68B] font-bold">
                          {t("compose.holds_up_to", "Accueille jusqu'à {n} parfum(s)").replace("{n}", String(b.capacity))}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-[#541B28] dark:text-[#DFC68B] font-serif font-bold whitespace-nowrap">
                          +{formatTND(b.priceTND)}
                        </span>
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border flex items-center justify-center",
                            selectedBox.id === b.id
                              ? "border-[#541B28] dark:border-[#DFC68B] bg-[#541B28] dark:bg-[#DFC68B] text-[#FAF7F2] dark:text-[#0E0709]"
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
                  className="w-full sm:w-auto px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer"
                >
                  <span>{t("compose.next_perfumes", "Suivant : Flacons")}</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Perfumes */}
          {currentStep === 2 && (
            <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-2xl text-burgundy-gradient font-light">
                  {t("compose.step2_title", "2. Choisissez Vos Fragrances")} ({selectedPerfumes.length}/{selectedBox.capacity})
                </h2>
              </div>
              <p className="text-xs text-[#5A4B4E] dark:text-[#D8CCD0] mb-6 leading-relaxed">
                {t("compose.step2_desc", "Sélectionnez jusqu'à {n} parfum(s) pour composer votre harmonie.").replace("{n}", String(selectedBox.capacity))}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-h-[480px] sm:overflow-y-auto sm:pr-2">
                {PRODUCTS.map((prod) => {
                  const locProd = getLocalizedProduct(prod, locale);
                  const isSelected = selectedPerfumes.some((p) => p.product.id === prod.id);

                  return (
                    <div
                      key={prod.id}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all flex flex-col justify-between",
                        isSelected
                          ? "bg-[#541B28]/8 dark:bg-[#C7A66A]/15 border-[#541B28] dark:border-[#DFC68B] shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#0E0709] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28] dark:hover:border-[#C7A66A]"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-[#541B28]/15 shadow-sm">
                          <Image src={prod.images.main} alt={locProd.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] font-bold">
                            {locProd.collection}
                          </span>
                          <h4 className="font-serif text-base text-[#23181A] dark:text-[#FAF7F2] leading-tight mt-0.5 font-semibold">
                            {locProd.name}
                          </h4>
                          <span className="text-xs text-[#541B28] dark:text-[#DFC68B] font-serif font-bold block mt-1">
                            {formatTND(prod.formats[0].priceTND)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                        <button
                          onClick={() => togglePerfume(prod, "50ml")}
                          className={cn(
                            "px-3 py-1 rounded text-xs transition-colors font-medium cursor-pointer",
                            isSelected
                              ? "bg-rose-900/10 text-[#541B28] dark:text-[#DFC68B] border border-[#541B28]/40 dark:border-[#C7A66A]/40"
                              : "bg-[#541B28] text-[#FAF7F2] hover:bg-[#66182C]"
                          )}
                        >
                          {isSelected ? t("compose.remove", "Retirer") : t("compose.select_50ml", "Sélectionner (50ml)")}
                        </button>
                        {isSelected && (
                          <span className="text-xs text-[#541B28] dark:text-[#DFC68B] flex items-center gap-1 font-bold">
                            <Check className="w-3.5 h-3.5" />
                            <span>{t("compose.included", "Inclus")}</span>
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
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                  <span>{t("compose.back", "Retour")}</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedPerfumes.length === 0}
                  className="w-full sm:w-auto justify-center px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center gap-2.5 transition-all disabled:opacity-40 shadow-lg hover:shadow-xl active:scale-98 cursor-pointer"
                >
                  <span>{t("compose.next_finishes", "Suivant : Finitions")}</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Accessories & Personalized Message */}
          {currentStep === 3 && (
            <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-8 shadow-xl">
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light mb-2">
                {t("compose.step3_title", "3. Finitions Décoratives & Dédicace")}
              </h2>
              <p className="text-xs text-[#5A4B4E] dark:text-[#D8CCD0] mb-6 leading-relaxed">
                {t("compose.step3_desc", "Chaque détail transforme votre coffret en une œuvre d'art mémorable.")}
              </p>

              {/* Accessories Selection */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold">
                  {t("compose.accessories_label", "Accessoires d'Élégance")}
                </h4>
                {accessories.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={cn(
                        "p-3 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-colors",
                        isChecked
                          ? "bg-[#541B28]/8 dark:bg-[#C7A66A]/15 border-[#541B28] dark:border-[#DFC68B]"
                          : "bg-[#FAF7F2] dark:bg-[#0E0709] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:border-[#541B28] dark:hover:border-[#C7A66A]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center text-xs",
                            isChecked
                              ? "bg-[#541B28] dark:bg-[#DFC68B] border-[#541B28] dark:border-[#DFC68B] text-[#FAF7F2] dark:text-[#0E0709]"
                              : "border-[#756B6D]/30"
                          )}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs text-[#23181A] dark:text-[#FAF7F2] font-medium min-w-0">{acc.name}</span>
                      </div>
                      <span className="text-xs text-[#541B28] dark:text-[#DFC68B] font-bold shrink-0">+{formatTND(acc.priceTND)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Personalized handwritten note */}
              <div className="space-y-3 pt-4 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold">
                  {t("compose.calligraphy_label", "Message Calligraphié Offert")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={t("compose.recipient_placeholder", "Nom du destinataire (ex: Yasmine)")}
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl px-4 py-2.5 text-xs text-[#23181A] dark:text-[#FAF7F2] placeholder:text-[#756B6D] dark:placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
                  />
                  <input
                    type="text"
                    placeholder={t("compose.message_placeholder", "Votre mot tendre (ex: Pour célébrer ton éclat...)")}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl px-4 py-2.5 text-xs text-[#23181A] dark:text-[#FAF7F2] placeholder:text-[#756B6D] dark:placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
                  />
                </div>

                {customMessage && (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-center font-serif italic text-sm text-[#23181A] dark:text-[#FAF7F2] shadow-inner mt-2">
                    &laquo; {t("compose.for_prefix", "Pour")} {recipientName || t("compose.you_default", "Vous")} : {customMessage} &raquo;
                    <span className="block text-[10px] uppercase font-sans text-[#541B28] dark:text-[#DFC68B] tracking-widest mt-1 font-bold">
                      {t("compose.parchment_label", "Imprimé sur papier parchemin doré Lévania")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                  <span>{t("compose.back", "Retour")}</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full sm:w-auto justify-center px-5 sm:px-8 py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs tracking-luxury uppercase font-bold flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer"
                >
                  <span>{t("compose.view_preview", "Voir l'Aperçu Final")}</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Final Preview & Add to Cart */}
          {currentStep === 4 && (
            <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-10 shadow-xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light mb-2">
                {t("compose.step4_title", "4. Aperçu de Votre Création Sur-Mesure")}
              </h2>
              <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] mb-8 leading-relaxed font-light">
                {t("compose.step4_desc", "Votre coffret est prêt à être confectionné avec le plus grand soin par nos artisans.")}
              </p>

              <div className="p-7 rounded-2xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/15 dark:border-[#C7A66A]/20 space-y-5 relative overflow-hidden">
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 opacity-20 pointer-events-none">
                  <WaveMonogram size="lg" variant="gold" withSeal={false} />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <div className="relative w-full h-44 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-white shrink-0 border border-[#541B28]/20 shadow-md">
                    <Image src={selectedBox.image} alt={selectedBox.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start gap-2.5">
                      <WaveMonogram size="sm" variant="burgundy" withSeal />
                      <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">{selectedBox.name}</h3>
                    </div>
                    <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1.5 leading-relaxed">{selectedBox.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedPerfumes.map((p, i) => {
                        const lp = getLocalizedProduct(p.product, locale);
                        return (
                          <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/20 dark:border-[#C7A66A]/30">
                            {lp.name} ({p.size})
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {customMessage && (
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-center font-serif italic text-sm sm:text-base text-[#23181A] dark:text-[#FAF7F2] shadow-inner">
                    &laquo; {t("compose.for_prefix", "Pour")} {recipientName || t("compose.you_default", "Vous")} : {customMessage} &raquo;
                    <span className="block text-[10px] uppercase font-cinzel text-[#541B28] dark:text-[#DFC68B] tracking-grand mt-2 font-bold">
                      {t("compose.wax_imprint_label", "Scellé au cachet de cire monogrammé Lévania")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] font-cinzel tracking-luxury uppercase font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                  <span>{t("compose.modify", "Modifier")}</span>
                </button>
                <button
                  onClick={handleAddBoxToCart}
                  className="w-full sm:w-auto justify-center px-5 sm:px-9 py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-luxury flex items-center gap-2.5 shadow-xl shadow-[#541B28]/25 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                  <span>{t("compose.add_to_cart_btn", "Ajouter au Panier")} ({formatTND(totalPriceTND)})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Summary & Price Breakdown */}
        <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-7 shadow-xl h-fit lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20">
            <div className="flex items-center gap-2.5 font-cinzel text-[11px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold">
              <Gift className="w-4 h-4 text-[#C7A66A]" />
              <span>{t("compose.summary_title", "Récapitulatif Coffret")}</span>
            </div>
            <WaveMonogram size="sm" variant="gold" withSeal={false} />
          </div>

          <div className="space-y-3 text-xs text-[#5A4B4E] dark:text-[#D8CCD0]">
            <div className="flex justify-between items-start gap-3">
              <span className="min-w-0">{selectedBox.name}</span>
              <span className="text-[#23181A] dark:text-[#FAF7F2] font-medium shrink-0">{formatTND(boxBasePrice)}</span>
            </div>

            {selectedPerfumes.map((p, idx) => {
              const locP = getLocalizedProduct(p.product, locale);
              const fmt = p.product.formats.find((f) => f.size === itemSize(p)) || p.product.formats[0];
              return (
                <div key={idx} className="flex justify-between items-start gap-3 pl-2 rtl:pl-0 rtl:pr-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#541B28] dark:border-[#DFC68B]">
                  <span className="text-[#541B28] dark:text-[#DFC68B] font-medium min-w-0">
                    {locP.name} ({p.size})
                  </span>
                  <span className="text-[#23181A] dark:text-[#FAF7F2] font-semibold shrink-0">{formatTND(fmt.priceTND)}</span>
                </div>
              );
            })}

            {selectedAccessories.map((accId) => {
              const acc = accessories.find((a) => a.id === accId);
              if (!acc) return null;
              return (
                <div key={accId} className="flex justify-between items-start gap-3 pl-2 rtl:pl-0 rtl:pr-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C7A66A] text-[#756B6D] dark:text-[#A8989C]">
                  <span className="min-w-0">{acc.name}</span>
                  <span className="text-[#23181A] dark:text-[#FAF7F2] shrink-0">+{formatTND(acc.priceTND)}</span>
                </div>
              );
            })}

            <div className="pt-3 border-t border-[#541B28]/20 dark:border-[#C7A66A]/20 flex justify-between items-baseline text-base font-serif text-[#23181A] dark:text-[#FAF7F2]">
              <span>{t("compose.box_total", "Total du Coffret")}</span>
              <span className="text-[#541B28] dark:text-[#DFC68B] font-bold text-xl">
                {formatTND(totalPriceTND)}
              </span>
            </div>
          </div>

          {/* Sillage Ondulatoire du Coffret */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/15 dark:border-[#C7A66A]/20 space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] font-bold">
              <span>{t("compose.box_wave", "Onde du Coffret")}</span>
              <span className="text-[#434B36] dark:text-[#C7A66A]">
                {boxWaveExpression === "soft"
                  ? t("compose.harmony_soft", "Harmonie Soyeuse")
                  : boxWaveExpression === "intense"
                  ? t("compose.harmony_dark", "Harmonie Sombre")
                  : t("compose.harmony_signature", "Harmonie Signature")}
              </span>
            </div>

            <div className="h-16 rounded-xl overflow-hidden bg-white/80 dark:bg-[#180B10]/80 border border-[#541B28]/10 dark:border-[#C7A66A]/20 relative">
              <WaveCanvas
                expression={boxWaveExpression}
                interactive={false}
                height="100%"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/15 dark:border-[#C7A66A]/20 text-[11px] text-[#756B6D] dark:text-[#A8989C] space-y-1">
            <div className="flex items-center gap-2 text-[#541B28] dark:text-[#DFC68B] font-cinzel font-bold tracking-luxury text-[11px] uppercase">
              <GoldStarLozenge size={12} className="text-[#C7A66A]" />
              <span>{t("compose.guarantee_title", "Garantie Haute Parfumerie")}</span>
            </div>
            <p>{t("compose.guarantee_desc", "Emballage soigné, livraison assurée sous 24h à 48h partout en Tunisie.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function itemSize(p: { size: "50ml" | "100ml" }): "50ml" | "100ml" {
  return p.size;
}
