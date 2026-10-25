"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Check,
  Truck,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { GoldStarLozenge, LuxuryDrop } from "@/components/ui/LuxuryIcons";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, getAllProducts } from "@/lib/catalogue";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { AtomizerSpray } from "@/components/brand/AtomizerSpray";
import { NoteAccordModal } from "@/components/discovery/NoteAccordModal";
import { AuthenticityCertificateModal } from "@/components/products/AuthenticityCertificateModal";
import { StickyPurchaseBar } from "@/components/products/StickyPurchaseBar";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedProduct, getLocalizedProducts } from "@/lib/i18n/catalogueLocale";

interface ProductDetailClientProps {
  product?: Product;
  initialProduct?: Product;
  slug?: string;
}

export function ProductDetailClient({
  product: directProduct,
  initialProduct,
  slug,
}: ProductDetailClientProps) {
  const [baseProduct, setBaseProduct] = useState<Product | null>(directProduct || initialProduct || null);

  React.useEffect(() => {
    if (!baseProduct && slug) {
      const all = getAllProducts();
      const found = all.find((p) => p.slug === slug);
      if (found) {
        setBaseProduct(found);
        setSelectedImage(found.images.main);
      }
    }
  }, [slug, baseProduct]);

  const router = useRouter();
  const { t, locale } = useLanguage();
  const product = baseProduct ? getLocalizedProduct(baseProduct, locale) : null;
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useNotification();

  const [selectedSize, setSelectedSize] = useState<"50ml" | "100ml">("50ml");
  const [selectedImage, setSelectedImage] = useState<string>(
    directProduct?.images.main || initialProduct?.images.main || "/brand/bottle-and-cylinder.jpg"
  );
  const [quantity] = useState(1);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<"tête" | "cœur" | "fond" | null>(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] text-[#23181A]">
        <div className="w-10 h-10 border-2 border-[#541B28] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28]">Chargement du flacon...</p>
      </div>
    );
  }

  const activeFormat =
    product.formats.find((f) => f.size === selectedSize) || product.formats[0];

  const waveExpression =
    (product.waveExpression as any) ||
    (product.collectionSlug === "soyeuse"
      ? "soft"
      : product.collectionSlug === "intense"
      ? "intense"
      : "signature");

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

  const relatedProducts = getLocalizedProducts(
    PRODUCTS.filter(
      (p) => p.id !== product.id && p.collectionSlug === product.collectionSlug
    ).slice(0, 3),
    locale
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative">
      {/* Specific Transparent Fluid Wave flowing in the background */}
      <AmbientWaveBackdrop expression={waveExpression} opacity={0.32} />

      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Active Transparent Wave Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <nav className="font-cinzel text-[11px] tracking-luxury text-[#756B6D] dark:text-[#A8989C] flex items-center gap-2 uppercase font-medium">
              <Link href="/" className="hover:text-[#541B28] dark:hover:text-[#DFC68B]">{t("nav.home", "Accueil")}</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#541B28] dark:hover:text-[#DFC68B]">{t("nav.shop", "Boutique")}</Link>
              <span>/</span>
              <span className="text-[#541B28] dark:text-[#DFC68B] font-bold">{product.name}</span>
            </nav>

            <div className="luxury-pill inline-flex items-center gap-2.5 self-start sm:self-auto">
              <WaveMonogram size="xs" variant={waveExpression === "soft" ? "burgundy" : "gold"} />
              <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                {t("product.wave_bg_label", "Onde en Fond :")}{" "}
                <span className="text-[#C7A66A]">
                  {waveExpression === "soft"
                    ? t("product.wave_soyeuse", "Onde Soyeuse Diaphane")
                    : waveExpression === "intense"
                    ? t("product.wave_sombre", "Onde Sombre & Boisée")
                    : t("product.wave_signature", "Vague Signature Solaire")}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24">
            {/* Left: Product Images Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-2xl">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  unoptimized={selectedImage.startsWith("data:")}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23181A]/40 via-transparent to-transparent pointer-events-none" />

                <span className="absolute top-5 left-5 font-cinzel text-[10px] uppercase tracking-luxury font-bold px-4 py-1.5 rounded-full bg-white/95 dark:bg-[#180B10]/95 border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] shadow-sm backdrop-blur-md">
                  {product.collection}
                </span>

                {/* Interactive Atomizer Vaporizer Action */}
                <div className="absolute bottom-5 right-5 z-20">
                  <AtomizerSpray productName={product.name} />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "relative w-20 h-24 rounded-2xl overflow-hidden border transition-all cursor-pointer bg-white shadow-sm",
                      selectedImage === img
                        ? "border-[#541B28] ring-2 ring-[#541B28]/30 scale-105"
                        : "border-[#541B28]/15 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Aperçu ${i}`}
                      fill
                      unoptimized={img.startsWith("data:")}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-cinzel text-[11px] uppercase tracking-grand text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                  {product.subtitle}
                </span>
                <h1 className="font-serif text-fluid-section text-burgundy-gradient font-light mt-1 mb-3">
                  {product.name}
                </h1>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#180B10]/80 border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-xs">
                  <GoldStarLozenge size={12} className="text-[#C7A66A]" />
                  <span className="font-cinzel text-[10px] tracking-wider uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                    {t("product.certified_badge", "Haute Parfumerie Artisanale • Flacon Scellé & Traçable")}
                  </span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#180B10]/90 backdrop-blur-md border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#756B6D] dark:text-[#A8989C] block">{t("product.price_label", "Prix Flacon")}</span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#541B28] dark:text-[#DFC68B] font-medium">
                    {formatTND(activeFormat.priceTND)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-xs text-[#434B36] dark:text-[#C7A66A] flex items-center gap-1.5 font-bold uppercase tracking-luxury">
                    <Check className="w-4 h-4 text-[#434B36] dark:text-[#C7A66A]" />
                    {t("product.in_stock", "En stock")} ({activeFormat.stock} {t("product.available", "disponibles")})
                  </span>
                  <span className="font-mono text-[10px] text-[#756B6D] dark:text-[#A8989C] mt-0.5 block">SKU: {activeFormat.sku}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Format Selection (50ml / 100ml) */}
              <div className="space-y-2.5">
                <span className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block">
                  {t("product.size_label", "Contenance du Flacon")}
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  {product.formats.map((fmt) => (
                    <button
                      key={fmt.size}
                      onClick={() => setSelectedSize(fmt.size)}
                      className={cn(
                        "p-4 rounded-2xl border text-center transition-all cursor-pointer",
                        selectedSize === fmt.size
                          ? "bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border-[#541B28] dark:border-[#DFC68B] text-[#23181A] dark:text-[#FAF7F2] shadow-md ring-1 ring-[#541B28]/30 dark:ring-[#DFC68B]/30 backdrop-blur-sm"
                          : "bg-white/80 dark:bg-[#180B10]/80 backdrop-blur-sm border-[#541B28]/15 dark:border-[#C7A66A]/20 text-[#5A4B4E] dark:text-[#D8CCD0] hover:border-[#541B28] dark:hover:border-[#DFC68B] hover:bg-white dark:hover:bg-[#1C0D15]"
                      )}
                    >
                      <span className="font-cinzel text-sm font-bold tracking-luxury block">{fmt.size}</span>
                      <span className="font-serif text-sm text-[#541B28] dark:text-[#DFC68B] font-bold mt-1 block">{formatTND(fmt.priceTND)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs: Add to cart & Buy Now */}
              <div className="space-y-3 pt-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 py-4 px-4 sm:px-6 rounded-2xl luxury-btn-secondary flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                    <span>{t("nav.cart", "Ajouter au Panier")}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full sm:flex-1 py-4 px-4 sm:px-6 rounded-2xl luxury-btn-primary flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t("product.buy_now", "Acheter Immédiatement")}</span>
                    <ArrowRight className="w-4 h-4 text-[#DFC68B] rtl:rotate-180" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#541B28]/15 space-y-2.5 text-xs text-[#5A4B4E] shadow-sm">
                <div className="flex items-center gap-2 text-[#23181A]">
                  <Truck className="w-4 h-4 text-[#541B28] shrink-0" />
                  <span>{t("product.free_delivery_notice", "Livraison express en Tunisie sous 24h • 48h (Offerte dès 200 TND)")}</span>
                </div>
                
                {/* Interactive Certificate Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCertOpen(true)}
                  className="w-full flex items-center justify-between text-left rtl:text-right p-1.5 -mx-1.5 rounded-xl hover:bg-[#541B28]/5 dark:hover:bg-[#C7A66A]/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-[#23181A]">
                    <QrCode className="w-4 h-4 text-[#541B28] shrink-0" />
                    <span>{t("product.certified_notice", "Flacon certifié avec QR Code de traçabilité officiel Lévania")}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#541B28] underline underline-offset-2 group-hover:text-[#66182C] shrink-0">
                    {t("product.consult", "Consulter")}
                  </span>
                </button>

                <div className="flex items-center gap-2.5 text-[#23181A]">
                  <GoldStarLozenge size={13} className="text-[#C7A66A] shrink-0" />
                  <span>{t("product.luck_points_prefix", "Rapporte")} +{Math.floor(activeFormat.priceTND / 10)} {t("product.luck_points_suffix", "Luck pour la Roue du Destin")}</span>
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
                    {t("product.wave_signature_title", "Signature Ondulatoire du Flacon")}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] font-semibold">
                    {waveExpression === "soft"
                      ? t("product.wave_soyeuse_full", "Onde Soyeuse Diaphane • Voile Intime")
                      : waveExpression === "intense"
                      ? t("product.wave_sombre_full", "Onde Sombre & Boisée • Sillage Monumental")
                      : t("product.wave_signature_full", "Vague Signature • Noblesse Méditerranéenne")}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#541B28]/20 text-[#541B28] font-bold shadow-sm">
                  {t("product.diffusion_spec", "Diffusion 14h • Rayonnement 2.5m")}
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
              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto pointer-events-none">
                <span className="inline-block max-w-full text-[9px] uppercase tracking-widest text-[#756B6D] font-mono bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#541B28]/15 shadow-sm leading-relaxed">
                  <span className="sm:hidden">{t("pavilion.tap_diffuse_mobile", "~ Touchez pour diffuser")}</span>
                  <span className="hidden sm:inline">{t("pavilion.tap_diffuse_desktop", "~ Touchez ou survolez pour diffuser l'onde olfactive")}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Fragrance Pyramid Section */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-12 mb-20 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#541B28] font-bold block mb-1">
                {t("product.harmonic_arch", "Architecture Harmonique")}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light">
                {t("product.interactive_pyramid", "La Pyramide Olfactive")}
              </h3>
              <p className="text-xs text-[#756B6D] mt-2">
                {t("product.click_note", "Touchez ou cliquez sur une note pour révéler son terroir d'origine, sa méthode de distillation et son rayonnement.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Top Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 text-center">
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold">
                  {t("product.head_notes", "Notes de Tête (Première Impression)")}
                </span>
                <h4 className="font-serif text-xl text-[#23181A] mt-2 mb-4 font-semibold">{t("product.layer_awakening", "L'Éveil")}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.topNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("tête");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white hover:bg-[#541B28] hover:text-[#FAF7F2] border border-[#541B28]/15 text-[#23181A] transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop size={12} className="text-[#C7A66A] opacity-70 group-hover/tag:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/20 text-center">
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold">
                  {t("product.heart_notes", "Notes de Cœur (Signature Centrale)")}
                </span>
                <h4 className="font-serif text-xl text-burgundy-gradient mt-2 mb-4 font-semibold">{t("product.layer_soul", "L'Âme du Sillage")}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.heartNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("cœur");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white hover:bg-[#541B28] hover:text-[#FAF7F2] border border-[#541B28]/25 text-[#541B28] font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop size={12} className="text-[#DFC68B] opacity-80 group-hover/tag:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 text-center">
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold">
                  {t("product.base_notes", "Notes de Fond (Tenue Inoubliable)")}
                </span>
                <h4 className="font-serif text-xl text-[#23181A] mt-2 mb-4 font-semibold">{t("product.layer_imprint", "L'Empreinte")}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.baseNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("fond");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white hover:bg-[#541B28] hover:text-[#FAF7F2] border border-[#541B28]/15 text-[#23181A] transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop size={12} className="text-[#C7A66A] opacity-70 group-hover/tag:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Fragrances */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold mb-6">
                {t("product.related_title", "Dans la Même Collection")}
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

      {/* Interactive Sensory Modals & Sticky Purchase Bar */}
      <NoteAccordModal
        note={selectedNote}
        layer={selectedLayer}
        onClose={() => setSelectedNote(null)}
      />

      <AuthenticityCertificateModal
        product={product}
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
      />

      <StickyPurchaseBar
        product={product}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <Footer />
    </div>
  );
}
