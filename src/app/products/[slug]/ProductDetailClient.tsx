"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Share2,
  Check,
  ShieldCheck,
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

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useNotification();

  const [selectedSize, setSelectedSize] = useState<"50ml" | "100ml">("50ml");
  const [selectedImage, setSelectedImage] = useState<string>(product.images.main);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activeFormat =
    product.formats.find((f) => f.size === selectedSize) || product.formats[0];

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
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#89877F] mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-[#F6F1E8]">Accueil</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#F6F1E8]">Boutique</Link>
            <span>/</span>
            <span className="text-[#C7A66A]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left: Product Images Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#20271E]/60 border border-[#C7A66A]/30 shadow-2xl">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#171715]/90 border border-[#C7A66A]/40 text-[#C7A66A] backdrop-blur-md">
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
                      "relative w-20 h-24 rounded-xl overflow-hidden border transition-all cursor-pointer bg-black/40",
                      selectedImage === img
                        ? "border-[#C7A66A] ring-2 ring-[#C7A66A]/30 scale-105"
                        : "border-white/10 opacity-70 hover:opacity-100"
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
                <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
                  {product.subtitle}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-1 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-[#C7A66A]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#89877F]">
                    {product.rating} ({product.reviewCount} avis vérifiés)
                  </span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-2xl bg-[#20271E]/60 border border-[#C7A66A]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#89877F] block">Prix Flacon</span>
                  <span className="font-serif text-2xl text-[#C7A66A] font-semibold">
                    {formatTND(activeFormat.priceTND)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    En stock ({activeFormat.stock} disponibles)
                  </span>
                  <span className="text-[11px] text-[#89877F]">SKU: {activeFormat.sku}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#E9DFCE]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Format Selection (50ml / 100ml) */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold block mb-2">
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
                          ? "bg-[#C7A66A]/15 border-[#C7A66A] text-[#F6F1E8]"
                          : "bg-[#20271E]/40 border-[#C7A66A]/15 text-[#89877F] hover:border-[#C7A66A]/40"
                      )}
                    >
                      <span className="font-serif text-base font-bold block">{fmt.size}</span>
                      <span className="text-xs text-[#C7A66A] font-medium">{formatTND(fmt.priceTND)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs: Add to cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#20271E] hover:bg-[#343B2B] text-[#F6F1E8] border border-[#C7A66A]/40 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                    <span>Ajouter au Panier</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#C7A66A]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Acheter Immédiatement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-[#171715] border border-white/5 space-y-2 text-xs text-[#89877F]">
                <div className="flex items-center gap-2 text-[#E9DFCE]">
                  <Truck className="w-4 h-4 text-[#C7A66A]" />
                  <span>Livraison express en Tunisie sous 24h &bull; 48h (Offerte dès 200 TND)</span>
                </div>
                <div className="flex items-center gap-2 text-[#E9DFCE]">
                  <QrCode className="w-4 h-4 text-[#C7A66A]" />
                  <span>Flacon certifié avec QR Code de traçabilité officiel Lévania</span>
                </div>
                <div className="flex items-center gap-2 text-[#E9DFCE]">
                  <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                  <span>Rapporte +{Math.floor(activeFormat.priceTND / 10)} Luck pour la Roue du Destin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fragrance Pyramid Section */}
          <div className="rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 p-8 sm:p-12 mb-20 backdrop-blur-xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light mb-8 text-center">
              La Pyramide Olfactive
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Top Notes */}
              <div className="p-6 rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/15 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  Notes de Tête (Première Impression)
                </span>
                <h4 className="font-serif text-xl text-[#F6F1E8] mt-2 mb-4">L&apos;Éveil</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.topNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#20271E] border border-[#C7A66A]/20 text-[#E9DFCE]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="p-6 rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/20 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  Notes de Cœur (Signature Centrale)
                </span>
                <h4 className="font-serif text-xl text-gold-gradient mt-2 mb-4">L&apos;Âme du Sillage</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.heartNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#343B2B] border border-[#C7A66A]/30 text-[#C7A66A] font-medium">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="p-6 rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/15 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  Notes de Fond (Tenue Inoubliable)
                </span>
                <h4 className="font-serif text-xl text-[#F6F1E8] mt-2 mb-4">L&apos;Empreinte</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {product.baseNotes.map((n, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#20271E] border border-[#C7A66A]/20 text-[#E9DFCE]">
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
              <h3 className="font-serif text-2xl text-[#F6F1E8] mb-6">
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
