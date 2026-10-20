"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Sparkles,
  Check,
  ImageIcon,
  Flame,
  Award,
  Layers,
  Wind,
  Palette,
  Heart,
  Droplets,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { Product, FragranceFamily, FragranceIntensity } from "@/types";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
}

const PRESET_IMAGES = [
  { label: "Flacon & Cylindre Signature", url: "/brand/bottle-and-cylinder.jpg" },
  { label: "Duo de Cylindres Prestige", url: "/brand/cylinders-dual.jpg" },
  { label: "Sceau & Monogramme Doré", url: "/brand/logo-emblem.jpg" },
  { label: "Écrin & Coffret Or", url: "/brand/hero-bottles.png" },
];

const COLLECTIONS = [
  { name: "La Collection Signature", slug: "signature" },
  { name: "Onde Soyeuse", slug: "soyeuse" },
  { name: "Onde Sombre", slug: "intense" },
  { name: "Collection Privilège", slug: "signature" },
];

const GENDERS = ["Unisexe", "Pour Elle", "Pour Lui"];

const WAVE_EXPRESSIONS = [
  { value: "signature", label: "Onde Signature (Majestueuse & Ambrée)" },
  { value: "soft", label: "Onde Soyeuse (Douce & Aérienne)" },
  { value: "intense", label: "Onde Sombre (Profonde & Boisée)" },
  { value: "crest", label: "Crête Dorée (Dynamique & Solaire)" },
  { value: "swirl", label: "Tourbillon Aromatique (Envoûtant)" },
  { value: "mist", label: "Brume Délicate (Frais & Fleuri)" },
  { value: "flow", label: "Flux Continu (Élégant & Fluide)" },
];

const WAVE_PALETTES = [
  { value: "burgundy", label: "Bordeaux Impérial Lévania", color: "#541B28" },
  { value: "gold", label: "Or Solaire Méditerranéen", color: "#C7A66A" },
  { value: "rose", label: "Rose Poudré & Pétales", color: "#852538" },
  { value: "sand", label: "Sable Chaud & Ivoire", color: "#EAE1D2" },
  { value: "night", label: "Nuit d'Orient & Ébène", color: "#23181A" },
  { value: "emerald", label: "Vert Olive Noble", color: "#434B36" },
];

const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  "Amber",
  "Woody",
  "Floral",
  "Citrus",
  "Spicy",
  "Fresh",
  "Sweet",
  "Oriental",
];

const INTENSITIES: FragranceIntensity[] = [
  "Subtle",
  "Balanced",
  "Intense",
  "Monumental",
];

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("Extrait de Parfum Absolu");
  const [collection, setCollection] = useState("La Collection Signature");
  const [collectionSlug, setCollectionSlug] = useState("signature");
  const [gender, setGender] = useState("Unisexe");
  const [waveExpression, setWaveExpression] = useState("signature");
  const [wavePalette, setWavePalette] = useState("gold");
  const [fragranceFamily, setFragranceFamily] = useState<FragranceFamily>("Amber");
  const [intensity, setIntensity] = useState<FragranceIntensity>("Intense");
  const [description, setDescription] = useState("");
  const [sensoryProfile, setSensoryProfile] = useState("");
  const [topNotes, setTopNotes] = useState("");
  const [heartNotes, setHeartNotes] = useState("");
  const [baseNotes, setBaseNotes] = useState("");
  const [price50, setPrice50] = useState<number>(195);
  const [stock50, setStock50] = useState<number>(40);
  const [price100, setPrice100] = useState<number>(295);
  const [stock100, setStock100] = useState<number>(25);
  const [mainImage, setMainImage] = useState("/brand/bottle-and-cylinder.jpg");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [bestsellerRank, setBestsellerRank] = useState<number>(1);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setSubtitle(initialProduct.subtitle || "Extrait de Parfum Absolu");
      setCollection(initialProduct.collection || "La Collection Signature");
      setCollectionSlug(initialProduct.collectionSlug || "signature");
      setGender(initialProduct.gender || "Unisexe");
      setWaveExpression(initialProduct.waveExpression || "signature");
      setWavePalette(initialProduct.wavePalette || "gold");
      setFragranceFamily(initialProduct.fragranceFamily || "Amber");
      setIntensity(initialProduct.intensity || "Intense");
      setDescription(initialProduct.description || "");
      setSensoryProfile(initialProduct.sensoryProfile || "");
      setTopNotes((initialProduct.topNotes || []).join(", "));
      setHeartNotes((initialProduct.heartNotes || []).join(", "));
      setBaseNotes((initialProduct.baseNotes || []).join(", "));
      setPrice50(initialProduct.formats[0]?.priceTND ?? 195);
      setStock50(initialProduct.formats[0]?.stock ?? 40);
      setPrice100(initialProduct.formats[1]?.priceTND ?? 295);
      setStock100(initialProduct.formats[1]?.stock ?? 25);
      setMainImage(initialProduct.images?.main || "/brand/bottle-and-cylinder.jpg");
      setIsFeatured(initialProduct.isFeatured || false);
      setIsBestseller(initialProduct.isBestseller || false);
      setBestsellerRank(initialProduct.bestsellerRank || 1);
    } else {
      setName("");
      setSubtitle("Extrait de Parfum Absolu");
      setCollection("La Collection Signature");
      setCollectionSlug("signature");
      setGender("Unisexe");
      setWaveExpression("signature");
      setWavePalette("gold");
      setFragranceFamily("Amber");
      setIntensity("Intense");
      setDescription("");
      setSensoryProfile("");
      setTopNotes("Bergamote de Calabre, Baies Roses");
      setHeartNotes("Rose de Damas, Bois d'Olivier");
      setBaseNotes("Ambre Solaire, Musc Blanc, Oud");
      setPrice50(195);
      setStock50(40);
      setPrice100(295);
      setStock100(25);
      setMainImage("/brand/bottle-and-cylinder.jpg");
      setIsFeatured(false);
      setIsBestseller(false);
      setBestsellerRank(1);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Le fichier est trop volumineux (max 5 Mo)");
      return;
    }

    setImageUploadLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setMainImage(result);
      }
      setImageUploadLoading(false);
    };
    reader.onerror = () => {
      setImageUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCollectionChange = (collName: string) => {
    setCollection(collName);
    const found = COLLECTIONS.find((c) => c.name === collName);
    if (found) {
      setCollectionSlug(found.slug);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Veuillez renseigner le nom du parfum.");
      return;
    }

    const slug = initialProduct
      ? initialProduct.slug
      : name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

    const id = initialProduct ? initialProduct.id : `lev-${Date.now()}`;

    const topArr = topNotes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const heartArr = heartNotes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const baseArr = baseNotes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload: Product = {
      id,
      slug,
      name: name.trim(),
      subtitle: subtitle.trim(),
      frenchName: name.trim(),
      collection,
      collectionSlug,
      gender,
      waveExpression,
      wavePalette,
      fragranceFamily,
      intensity,
      description:
        description.trim() ||
        `Création haute parfumerie de la maison Lévania. ${name} déploie un sillage raffiné et mémorable.`,
      sensoryProfile: sensoryProfile.trim() || "Noble, raffiné et d'une tenue remarquable.",
      topNotes: topArr.length > 0 ? topArr : ["Bergamote", "Baies Roses"],
      heartNotes: heartArr.length > 0 ? heartArr : ["Rose Précieuse", "Bois Ciselé"],
      baseNotes: baseArr.length > 0 ? baseArr : ["Ambre", "Musc Blanc"],
      occasions: ["Signature Personnelle", "Moments d'Exception"],
      images: {
        main: mainImage,
        packaging: "/brand/cylinders-dual.jpg",
        lifestyle: mainImage,
        bottleOnly: "/brand/logo-emblem.jpg",
      },
      formats: [
        {
          size: "50ml",
          priceTND: Number(price50) || 195,
          priceMillimes: Math.round((Number(price50) || 195) * 1000),
          stock: Number(stock50) || 0,
          sku: `LEV-${slug.slice(0, 4).toUpperCase()}-50`,
        },
        {
          size: "100ml",
          priceTND: Number(price100) || 295,
          priceMillimes: Math.round((Number(price100) || 295) * 1000),
          stock: Number(stock100) || 0,
          sku: `LEV-${slug.slice(0, 4).toUpperCase()}-100`,
        },
      ],
      isFeatured,
      isBestseller,
      bestsellerRank: isBestseller ? Number(bestsellerRank) : undefined,
      rating: initialProduct?.rating || 5.0,
      reviewCount: initialProduct?.reviewCount || 0,
      qrEligible: true,
      createdAt: initialProduct?.createdAt || new Date().toISOString(),
    };

    onSave(productPayload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#541B28]/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-[#541B28]/15 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center border border-[#541B28]/20 shadow-xs">
              <GoldStarLozenge size={18} className="text-[#C7A66A]" />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-grand text-[#541B28] font-bold block">
                Haute Parfumerie &bull; Atelier de Création
              </span>
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light">
                {initialProduct ? `Modifier ${initialProduct.name}` : "Nouveau Flacon Lévania"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#756B6D] hover:text-[#541B28] hover:bg-[#541B28]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* SECTION 1: IDENTITÉ & COLLECTION */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <Sparkles className="w-4 h-4 text-[#C7A66A]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">1. Identité & Univers du Flacon</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Nom du Parfum *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Onde d'Or"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] font-serif font-bold focus:outline-none focus:border-[#541B28]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Sous-titre Poétique
                </label>
                <input
                  type="text"
                  placeholder="Ex: Extrait de Parfum Absolu"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Collection
                </label>
                <select
                  value={collection}
                  onChange={(e) => handleCollectionChange(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {COLLECTIONS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Genre de la Fragrance
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: VAGUE & CARACTÈRE OLFACTIF */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <Wind className="w-4 h-4 text-[#541B28]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">2. Vague Signature & Style Visuel</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Animation de la Vague en Arrière-plan
                </label>
                <select
                  value={waveExpression}
                  onChange={(e) => setWaveExpression(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {WAVE_EXPRESSIONS.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Nuance & Palette de la Vague
                </label>
                <select
                  value={wavePalette}
                  onChange={(e) => setWavePalette(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {WAVE_PALETTES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Famille Olfactive
                </label>
                <select
                  value={fragranceFamily}
                  onChange={(e) => setFragranceFamily(e.target.value as FragranceFamily)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {FRAGRANCE_FAMILIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Intensité & Sillage
                </label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as FragranceIntensity)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                >
                  {INTENSITIES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: NOTES & HISTOIRE */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <Droplets className="w-4 h-4 text-[#434B36]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">3. Pyramide Olfactive & Narration</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Notes de Tête (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Bergamote, Safran, Baies Roses"
                  value={topNotes}
                  onChange={(e) => setTopNotes(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Notes de Cœur (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Rose de Damas, Iris, Bois d'Olivier"
                  value={heartNotes}
                  onChange={(e) => setHeartNotes(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Notes de Fond (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Ambre Solaire, Vanille Bourbon, Oud"
                  value={baseNotes}
                  onChange={(e) => setBaseNotes(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Description Poétique & Histoire
                </label>
                <textarea
                  rows={3}
                  placeholder="Racontez la légende et l'émotion de ce parfum..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl p-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Profil Sensoriel (Court résumé d&apos;impact)
                </label>
                <textarea
                  rows={3}
                  placeholder="Chaleureux, ambré scintillant, enveloppant et profondément mémorable."
                  value={sensoryProfile}
                  onChange={(e) => setSensoryProfile(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl p-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: FORMATS & PRIX TND */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <Layers className="w-4 h-4 text-[#541B28]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">4. Formats & Tarification (TND)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Format 50ml */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-3">
                <span className="font-cinzel text-xs text-[#541B28] font-bold block uppercase tracking-wider">
                  Format 50ml Découverte
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Prix (TND) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      required
                      value={price50}
                      onChange={(e) => setPrice50(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] font-serif font-bold focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Stock Flacons
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock50}
                      onChange={(e) => setStock50(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                </div>
              </div>

              {/* Format 100ml */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-3">
                <span className="font-cinzel text-xs text-[#541B28] font-bold block uppercase tracking-wider">
                  Format 100ml Grand Prestige
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Prix (TND) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      required
                      value={price100}
                      onChange={(e) => setPrice100(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] font-serif font-bold focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Stock Flacons
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock100}
                      onChange={(e) => setStock100(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: IMAGE & UPLOAD */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <ImageIcon className="w-4 h-4 text-[#C7A66A]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">5. Visuel & Photo du Flacon</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Preview */}
              <div className="sm:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-36 h-48 rounded-2xl overflow-hidden bg-[#FAF7F2] border-2 border-[#541B28]/20 shadow-md mb-2">
                  <Image
                    src={mainImage}
                    alt="Aperçu flacon"
                    fill
                    className="object-cover"
                    unoptimized={mainImage.startsWith("data:")}
                  />
                  {imageUploadLoading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#756B6D] font-mono">Aperçu en direct</span>
              </div>

              {/* Upload Controls */}
              <div className="sm:col-span-8 space-y-4">
                <div>
                  <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    1. Uploader une photo depuis votre ordinateur / téléphone
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#541B28]/30 hover:border-[#541B28] bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Upload className="w-4 h-4 text-[#C7A66A]" />
                    <span>Choisir une image locale (JPG, PNG, WEBP)</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    2. Ou choisir parmi les visuels studio Lévania
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => setMainImage(preset.url)}
                        className={`p-2 rounded-xl text-left text-xs border transition-all ${
                          mainImage === preset.url
                            ? "bg-[#541B28] text-[#FAF7F2] border-[#541B28] shadow-xs"
                            : "bg-[#FAF7F2] text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]"
                        }`}
                      >
                        <span className="font-medium text-[11px] block truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    3. Ou coller une URL d&apos;image externe
                  </span>
                  <input
                    type="text"
                    placeholder="https://.../photo-flacon.jpg"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: PODIUM & VEDETTE */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#541B28]/10">
              <Award className="w-4 h-4 text-[#C7A66A]" />
              <h3 className="font-serif text-lg text-[#23181A] font-semibold">6. Visibilité & Podium Bestsellers</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#541B28] focus:ring-[#541B28] w-4 h-4"
                />
                <span className="text-xs text-[#23181A] font-bold">Flacon Vedette (Accueil)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="rounded text-[#541B28] focus:ring-[#541B28] w-4 h-4"
                />
                <span className="text-xs text-[#23181A] font-bold">Afficher sur le Podium</span>
              </label>

              {isBestseller && (
                <div>
                  <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    Rang sur le Podium (1 à 10)
                  </label>
                  <select
                    value={bestsellerRank}
                    onChange={(e) => setBestsellerRank(parseInt(e.target.value, 10))}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] font-bold focus:outline-none focus:border-[#541B28]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        Rang #{num}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-[#541B28]/15 flex items-center justify-end gap-3 sticky bottom-0 bg-[#FAF7F2] py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#541B28]/20 bg-white hover:bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#DFC68B]" />
              <span>{initialProduct ? "Mettre à Jour le Flacon" : "Enregistrer & Publier"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
