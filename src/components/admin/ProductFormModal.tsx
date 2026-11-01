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
  Wand2,
  Plus,
  Trash2,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { Product, FragranceFamily, FragranceIntensity } from "@/types";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void | Promise<void>;
  initialProduct?: Product | null;
  mode?: "create" | "edit";
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
  mode = "create",
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const packagingFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

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
  const [packagingImage, setPackagingImage] = useState("/brand/cylinders-dual.jpg");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [bestsellerRank, setBestsellerRank] = useState<number>(1);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [packagingUploadLoading, setPackagingUploadLoading] = useState(false);
  const [galleryUploadLoading, setGalleryUploadLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fragrantica AI Auto-fill state
  const [fragranticaUrl, setFragranticaUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeSuccess, setScrapeSuccess] = useState<string | null>(null);

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
      setPackagingImage(initialProduct.images?.packaging || "/brand/cylinders-dual.jpg");
      setGalleryImages(Array.isArray(initialProduct.images?.gallery) ? initialProduct.images.gallery : []);
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
      setPackagingImage("/brand/cylinders-dual.jpg");
      setGalleryImages([]);
      setIsFeatured(false);
      setIsBestseller(false);
      setBestsellerRank(1);
      setFragranticaUrl("");
      setScrapeError(null);
      setScrapeSuccess(null);
    }
  }, [initialProduct, isOpen]);

  const handleScrapeFragrantica = async () => {
    if (!fragranticaUrl.trim() || isScraping) return;
    setIsScraping(true);
    setScrapeError(null);
    setScrapeSuccess(null);

    try {
      const res = await fetch("/api/admin/scrape-perfume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: fragranticaUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Impossible d'extraire les données du parfum");
      }

      const p = data.data;
      if (p.name) {
        setName(p.brand ? `${p.name} (${p.brand})` : p.name);
      }
      if (p.subtitle) setSubtitle(p.subtitle);
      if (p.collection) setCollection(p.collection);
      if (p.gender && GENDERS.includes(p.gender)) setGender(p.gender);
      if (p.fragranceFamily) setFragranceFamily(p.fragranceFamily);
      if (p.intensity) setIntensity(p.intensity);
      if (p.topNotes) setTopNotes(Array.isArray(p.topNotes) ? p.topNotes.join(", ") : p.topNotes);
      if (p.heartNotes) setHeartNotes(Array.isArray(p.heartNotes) ? p.heartNotes.join(", ") : p.heartNotes);
      if (p.baseNotes) setBaseNotes(Array.isArray(p.baseNotes) ? p.baseNotes.join(", ") : p.baseNotes);
      if (p.description) setDescription(p.description);
      if (p.sensoryProfile) setSensoryProfile(p.sensoryProfile);
      if (p.price50) setPrice50(Number(p.price50));
      if (p.price100) setPrice100(Number(p.price100));
      if (p.stock50 !== undefined) setStock50(Number(p.stock50));
      if (p.stock100 !== undefined) setStock100(Number(p.stock100));

      setScrapeSuccess(`Notes et profil olfactif de "${p.name}" importés avec succès !`);
    } catch (err: any) {
      console.error("Erreur scrape:", err);
      setScrapeError(err.message || "Erreur de connexion lors de l'extraction Fragrantica.");
    } finally {
      setIsScraping(false);
    }
  };

  if (!isOpen) return null;

  const compressImageFile = (
    file: File,
    maxWidth = 600,
    maxHeight = 750,
    quality = 0.75
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = document.createElement("img");
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(readerEvent.target?.result as string);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL("image/jpeg", quality);
          resolve(compressed);
        };
        img.onerror = () => {
          resolve(readerEvent.target?.result as string);
        };
        img.src = readerEvent.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadLoading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 600, 750, 0.75);
      setMainImage(compressedDataUrl);
    } catch {
      alert("Erreur lors de la compression de la photo. Veuillez réessayer.");
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handlePackagingUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPackagingUploadLoading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 600, 750, 0.75);
      setPackagingImage(compressedDataUrl);
    } catch {
      alert("Erreur lors de la compression de la photo d'écrin/packaging.");
    } finally {
      setPackagingUploadLoading(false);
    }
  };

  const handleAddGalleryImage = (url = "") => {
    setGalleryImages((prev) => [...prev, url]);
  };

  const handleUpdateGalleryImage = (index: number, url: string) => {
    setGalleryImages((prev) => {
      const copy = [...prev];
      copy[index] = url;
      return copy;
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGalleryUploadLoading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 600, 750, 0.75);
      if (typeof targetIndex === "number") {
        handleUpdateGalleryImage(targetIndex, compressedDataUrl);
      } else {
        handleAddGalleryImage(compressedDataUrl);
      }
    } catch {
      alert("Erreur lors de la compression de la photo de galerie.");
    } finally {
      setGalleryUploadLoading(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = "";
      }
    }
  };

  const handleCollectionChange = (collName: string) => {
    setCollection(collName);
    const found = COLLECTIONS.find((c) => c.name === collName);
    if (found) {
      setCollectionSlug(found.slug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Veuillez renseigner le nom du parfum.");
      return;
    }

    setIsSaving(true);
    try {
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
          packaging: packagingImage || "/brand/cylinders-dual.jpg",
          lifestyle: mainImage,
          bottleOnly: "/brand/logo-emblem.jpg",
          gallery: galleryImages.filter(Boolean),
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

      await onSave(productPayload);
    } catch (err: any) {
      console.error("Save error:", err);
      alert(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#541B28]/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-[#541B28]/15 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center border border-[#541B28]/20 shadow-xs">
              <GoldStarLozenge size={18} className="text-[#C7A66A]" />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-grand text-[#541B28] font-bold block">
                Haute Parfumerie • Atelier de Création
              </span>
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light">
                {mode === "edit"
                  ? `Modifier ${initialProduct?.name || name}`
                  : name
                  ? `Nouveau Flacon : ${name}`
                  : "Nouveau Flacon Lévania"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#756B6D] hover:text-[#541B28] hover:bg-[#541B28]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
            {/* FRAGRANTICA AI AUTO-FILL WIDGET */}
          <div className="bg-gradient-to-br from-[#FAF5EC] via-[#F8EFE0] to-[#F3E5D0] dark:from-[#231219] dark:to-[#1B0C12] rounded-2xl p-5 border-2 border-[#C7A66A]/50 shadow-md space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#541B28] text-[#DFC68B] flex items-center justify-center shrink-0 shadow-sm">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#541B28] dark:text-[#DFC68B]">
                    Remplissage Magique Fragrantica (IA)
                  </h4>
                  <p className="text-[11px] text-[#5A4B4E] dark:text-[#C5A48A] leading-tight">
                    Collez le lien Fragrantica ou le nom du parfum pour extraire automatiquement les notes, la famille et la description.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="text"
                value={fragranticaUrl}
                onChange={(e) => setFragranticaUrl(e.target.value)}
                placeholder="Ex: https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-45651.html ou 'Scandal Jean Paul Gaultier'"
                className="flex-1 bg-white dark:bg-[#14080D] border border-[#C7A66A]/50 rounded-xl px-4 py-2.5 text-xs text-[#23181A] dark:text-[#FAF7F2] placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B] shadow-inner"
              />
              <button
                type="button"
                onClick={handleScrapeFragrantica}
                disabled={isScraping || !fragranticaUrl.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isScraping ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Extraction en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#DFC68B]" />
                    <span>Importer & Remplir</span>
                  </>
                )}
              </button>
            </div>

            {scrapeError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                {scrapeError}
              </p>
            )}
            {scrapeSuccess && (
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {scrapeSuccess}
              </p>
            )}
          </div>

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

          {/* SECTION 5: IMAGES & GALERIE DU PARFUM */}
          <div className="bg-white rounded-2xl p-6 border border-[#541B28]/15 shadow-sm space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#541B28]/10">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C7A66A]" />
                <div>
                  <h3 className="font-serif text-lg text-[#23181A] font-semibold">
                    5. Visuels & Galerie Photos du Parfum
                  </h3>
                  <p className="text-[11px] text-[#756B6D]">
                    Gérez la photo principale du flacon, la photo de l&apos;écrin packaging, et ajoutez autant de photos de galerie que vous souhaitez.
                  </p>
                </div>
              </div>
            </div>

            {/* 5.1 PHOTO 1 : FLACON PRINCIPAL */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#541B28] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  Photo Principale : Le Flacon (Visuel Boutique)
                </span>
                <span className="text-[10px] text-[#756B6D] font-mono">Affichage principal catalogue</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Preview */}
                <div className="sm:col-span-3 flex flex-col items-center text-center">
                  <div className="relative w-32 h-40 rounded-2xl overflow-hidden bg-white border-2 border-[#541B28]/25 shadow-md">
                    <Image
                      src={mainImage || "/brand/bottle-and-cylinder.jpg"}
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
                  <span className="text-[9px] text-[#756B6D] mt-1 font-medium">Aperçu Flacon</span>
                </div>

                {/* Upload & Select */}
                <div className="sm:col-span-9 space-y-3">
                  <div>
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
                      className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#541B28]/30 hover:border-[#541B28] bg-white hover:bg-white/80 text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#C7A66A]" />
                      <span>Uploader la photo du flacon (JPG, PNG, WEBP)</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Ou choisir parmi les presets studio :
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          type="button"
                          key={preset.url}
                          onClick={() => setMainImage(preset.url)}
                          className={`p-2 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                            mainImage === preset.url
                              ? "bg-[#541B28] text-[#FAF7F2] border-[#541B28] shadow-xs"
                              : "bg-white text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]"
                          }`}
                        >
                          <span className="font-medium text-[10px] block truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Ou collez une URL : https://.../flacon.jpg"
                      value={mainImage}
                      onChange={(e) => setMainImage(e.target.value)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-1.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5.2 PHOTO 2 : ÉCRIN CYLINDRIQUE & PACKAGING */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C7A66A] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  Photo Secondaire : L&apos;Écrin Cylindrique & Packaging
                </span>
                <span className="text-[10px] text-[#756B6D] font-mono">2ème photo de présentation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Preview */}
                <div className="sm:col-span-3 flex flex-col items-center text-center">
                  <div className="relative w-32 h-40 rounded-2xl overflow-hidden bg-white border-2 border-[#541B28]/25 shadow-md">
                    <Image
                      src={packagingImage || "/brand/cylinders-dual.jpg"}
                      alt="Aperçu packaging"
                      fill
                      className="object-cover"
                      unoptimized={packagingImage.startsWith("data:")}
                    />
                    {packagingUploadLoading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#756B6D] mt-1 font-medium">Aperçu Packaging</span>
                </div>

                {/* Upload & Select */}
                <div className="sm:col-span-9 space-y-3">
                  <div>
                    <input
                      ref={packagingFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePackagingUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => packagingFileInputRef.current?.click()}
                      className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#541B28]/30 hover:border-[#541B28] bg-white hover:bg-white/80 text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#C7A66A]" />
                      <span>Uploader la 2ème photo (Écrin / Boîte / Cylindre)</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Ou choisir parmi les visuels d&apos;écrin :
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          type="button"
                          key={preset.url}
                          onClick={() => setPackagingImage(preset.url)}
                          className={`p-2 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                            packagingImage === preset.url
                              ? "bg-[#541B28] text-[#FAF7F2] border-[#541B28] shadow-xs"
                              : "bg-white text-[#23181A] border-[#541B28]/15 hover:border-[#541B28]"
                          }`}
                        >
                          <span className="font-medium text-[10px] block truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Ou collez une URL : https://.../packaging.jpg"
                      value={packagingImage}
                      onChange={(e) => setPackagingImage(e.target.value)}
                      className="w-full bg-white border border-[#541B28]/20 rounded-xl px-3 py-1.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5.3 PHOTOS ADDITIONNELLES & GALERIE (NOMBRE ILLIMITÉ) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#541B28] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#756B6D] text-white text-[10px] flex items-center justify-center font-bold">3+</span>
                    Photos Additionnelles & Galerie ({galleryImages.length} photo{galleryImages.length > 1 ? "s" : ""})
                  </span>
                  <p className="text-[11px] text-[#756B6D] mt-0.5">
                    Modifiez le nombre de photos affichées sur la fiche produit en ajoutant ou supprimant des visuels.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGalleryUpload(e)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    disabled={galleryUploadLoading}
                    className="px-3 py-2 rounded-xl bg-white border border-[#541B28]/25 text-[#541B28] text-xs font-bold hover:bg-[#FAF7F2] flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#C7A66A]" />
                    <span>Uploader une photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddGalleryImage("")}
                    className="px-3 py-2 rounded-xl bg-[#541B28] text-white text-xs font-bold hover:bg-[#66182C] flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#DFC68B]" />
                    <span>+ Ajouter un visuel</span>
                  </button>
                </div>
              </div>

              {galleryImages.length === 0 ? (
                <div className="text-center py-6 px-4 bg-white rounded-xl border border-dashed border-[#541B28]/20">
                  <ImageIcon className="w-8 h-8 mx-auto text-[#C7A66A]/60 mb-1" />
                  <p className="text-xs text-[#756B6D] font-medium">
                    Aucune photo additionnelle pour le moment.
                  </p>
                  <p className="text-[10px] text-[#756B6D]/80">
                    Cliquez sur &quot;+ Ajouter un visuel&quot; ou &quot;Uploader une photo&quot; pour enrichir la galerie du flacon.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-[#541B28]/15 flex items-center gap-4 shadow-xs"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#541B28]/20 shrink-0">
                        {imgUrl ? (
                          <Image
                            src={imgUrl}
                            alt={`Photo galerie ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={imgUrl.startsWith("data:")}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#756B6D] font-mono">
                            Vide
                          </div>
                        )}
                      </div>

                      {/* URL input */}
                      <div className="flex-1 space-y-1">
                        <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">
                          Photo #{idx + 3} de la fiche produit
                        </label>
                        <input
                          type="text"
                          placeholder="https://... ou collez une image / data:image"
                          value={imgUrl}
                          onChange={(e) => handleUpdateGalleryImage(idx, e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-lg px-3 py-1.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                        />
                      </div>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-2 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg border border-rose-200 transition-colors cursor-pointer shrink-0"
                        title="Supprimer cette photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
        </div>

        {/* Docked Footer Actions */}
          <div className="px-6 py-4 bg-white border-t border-[#541B28]/15 flex items-center justify-end gap-3 shrink-0 shadow-sm">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl border border-[#541B28]/20 bg-white hover:bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-7 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                  <span>Enregistrement & Publication...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#DFC68B]" />
                  <span>{mode === "edit" ? "Mettre à Jour le Flacon" : "Enregistrer & Publier"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
