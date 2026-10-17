"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Check,
  Truck,
  Sparkles,
  QrCode,
  Star,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useNotification();

  const [selectedSize, setSelectedSize] = useState<"50ml" | "100ml">("50ml");
  const [selectedImage, setSelectedImage] = useState<string>(product.images.main);
  const [quantity] = useState(1);

  const activeFormat =
    product.formats.find((f) => f.size === selectedSize) || product.formats[0];

  const waveExpression =
    product.collectionSlug === "soyeuse"
      ? "soft"
      : product.collectionSlug === "intense"
      ? "intense"
      : "signature";

  const galleryImages = [
    product.images.main,
    product.images.packaging,
    product.images.bottleOnly || "/brand/logo-emblem.jpg",
  ].filter(Boolean) as string[];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images.main,
      formatSize: selectedSize,
      unitPriceTND: activeFormat.priceTND,
      unitPriceMillimes: activeFormat.priceMillimes,
      quantity,
    });
    showToast(
      "Flacon ajouté à votre panier",
      `${product.name} (${selectedSize}) x${quantity} — ${formatTND(activeFormat.priceTND * quantity)}`,
      "luxury"
    );
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images.main,
      formatSize: selectedSize,
      unitPriceTND: activeFormat.priceTND,
      unitPriceMillimes: activeFormat.priceMillimes,
      quantity,
    });
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.collectionSlug === product.collectionSlug
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative">
      {/* Specific Transparent Fluid Wave flowing in the background */}
      <AmbientWaveBackdrop expression={waveExpression} opacity={0.32} />

      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Active Transparent Wave Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <nav className="text-xs text-[#756B6D] flex items-center gap-2">
              <Link href="/" className="hover:text-[#541B28]">Accueil</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#541B28]">Boutique</Link>
              <span>/</span>
              <span className="text-[#541B28] font-semibold">{product.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#541B28]/20 text-[11px] text-[#541B28] shadow-sm self-start sm:self-auto">
              <WaveMonogram size="xs" variant={waveExpression === "soft" ? "burgundy" : "gold"} />
              <span>
                Onde en Fond :{" "}
                <strong className="font-bold">
                  {waveExpression === "soft"
                    ? "Onde Soyeuse Diaphane"
                    : waveExpression === "intense"
                    ? "Onde Sombre & Boisée"
                    : "Vague Signature Solaire"}
                </strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left: Product Images Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-[#541B28]/20 shadow-xl">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/40 via-transparent to-transparent pointer-events-none" />

                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/95 border border-[#541B28]/25 text-[#541B28] shadow-sm backdrop-blur-md">
                  {product.collection}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "relative w-20 h-24 rounded-xl overflow-hidden border transition-all cursor-pointer bg-white shadow-sm",
                      selectedImage === img
                        ? "border-[#541B28] ring-2 ring-[#541B28]/30 scale-105"
                        : "border-[#541B28]/15 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Aperçu ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
                  {product.subtitle}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-[#C7A66A]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#756B6D]">
                    {product.rating} ({product.reviewCount} avis vérifiés)
                  </span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#541B28]/15 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#756B6D] block">Prix Flacon</span>
                  <span className="font-serif text-2xl text-[#541B28] font-bold">
                    {formatTND(activeFormat.priceTND)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#434B36] flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    En stock ({activeFormat.stock} disponibles)
                  </span>
                  <span className="text-[11px] text-[#756B6D]">SKU: {activeFormat.sku}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
                {product.description}
              </p>

              {/* Format Selection (50ml / 100ml) */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold block mb-2">
                  Contenance du Flacon
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {product.formats.map((fmt) => (
                    <button
                      key={fmt.size}
                      onClick={() => setSelectedSize(fmt.size)}
                      className={cn(
                        "p-3 rounded-xl border text-center transition-all cursor-pointer",
                        selectedSize === fmt.size
                          ? "bg-[#541B28]/10 border-[#541B28] text-[#23181A] shadow-sm backdrop-blur-sm"
                          : "bg-white/80 backdrop-blur-sm border-[#541B28]/15 text-[#5A4B4E] hover:border-[#541B28]"
                      )}
                    >
                      <span className="font-serif text-base font-bold block">{fmt.size}</span>
                      <span className="text-xs text-[#541B28] font-bold">{formatTND(fmt.priceTND)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs: Add to cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-white/90 hover:bg-white text-[#541B28] border border-[#541B28]/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm backdrop-blur-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#541B28]" />
                    <span>Ajouter au Panier</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#541B28]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Acheter Immédiatement</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#541B28]/15 space-y-2 text-xs text-[#5A4B4E] shadow-sm">
                <div className="flex items-center gap-2 text-[#23181A]">
                  <Truck className="w-4 h-4 text-[#541B28]" />
                  <span>Livraison express en Tunisie sous 24h &bull; 48h (Offerte dès 200 TND)</span>
                </div>
                <div className="flex items-center gap-2 text-[#23181A]">
                  <QrCode className="w-4 h-4 text-[#541B28]" />
                  <span>Flacon certifié avec QR Code de traçabilité officiel Lévania</span>
                </div>
                <div className="flex items-center gap-2 text-[#23181A]">
                  <Sparkles className="w-4 h-4 text-[#541B28]" />
                  <span>Rapporte +{Math.floor(activeFormat.priceTND / 10)} Luck pour la Roue du Destin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Olfactory Diffusion Section */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#541B28]/10">
              <div className="flex items-center gap-3">
                <WaveMonogram
                  size="sm"
                  variant={waveExpression === "soft" ? "burgundy" : "gold"}
                  withSeal
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block">
                    Signature Ondulatoire du Flacon
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] font-semibold">
                    {waveExpression === "soft"
                      ? "Onde Soyeuse Diaphane &bull; Voile Intime"
                      : waveExpression === "intense"
                      ? "Onde Sombre & Boisée &bull; Sillage Monumental"
                      : "Vague Signature &bull; Noblesse Méditerranéenne"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#541B28]/20 text-[#541B28] font-bold shadow-sm">
                  Diffusion 14h &bull; Rayonnement 2.5m
                </span>
              </div>
            </div>

            {/* Interactive Wave Canvas for this fragrance */}
            <div className="h-32 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#541B28]/10 relative">
              <WaveCanvas
                expression={waveExpression}
                interactive={true}
                height="100%"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-4 pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-[#756B6D] font-mono bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#541B28]/15 shadow-sm">
                  &sim; Touchez ou survolez pour diffuser l&apos;onde olfactive
                </span>
              </div>
            </div>
          </div>

          {/* Fragrance Pyramid Section */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-12 mb-20 shadow-xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light mb-8 text-center">
              La Pyramide Olfactive
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Top Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold">
                  Notes de Tête (Première Impression)
                </span>
                <h4 className="font-serif text-xl text-[#23181A] mt-2 mb-4 font-semibold">L&apos;Éveil</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.topNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white border border-[#541B28]/15 text-[#23181A]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/20 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold">
                  Notes de Cœur (Signature Centrale)
                </span>
                <h4 className="font-serif text-xl text-burgundy-gradient mt-2 mb-4 font-semibold">L&apos;Âme du Sillage</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.heartNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white border border-[#541B28]/20 text-[#541B28] font-bold">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold">
                  Notes de Fond (Tenue Inoubliable)
                </span>
                <h4 className="font-serif text-xl text-[#23181A] mt-2 mb-4 font-semibold">L&apos;Empreinte</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.baseNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white border border-[#541B28]/15 text-[#23181A]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Fragrances */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold mb-6">
                Dans la Même Collection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
