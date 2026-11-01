"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Check,
  Truck,
  QrCode,
  ArrowRight,
  Zap,
  Crown,
  Gem,
  Heart,
  Sparkles,
  Film,
} from "lucide-react";
import { GoldStarLozenge, LuxuryDrop } from "@/components/ui/LuxuryIcons";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, getAllProducts } from "@/lib/catalogue";
import { Product, PerfumeAtmosphere } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveCanvas } from "@/components/brand/WaveCanvas";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { AtomizerSpray } from "@/components/brand/AtomizerSpray";
import { NoteAccordModal } from "@/components/discovery/NoteAccordModal";
import { AuthenticityCertificateModal } from "@/components/products/AuthenticityCertificateModal";
import { StickyPurchaseBar } from "@/components/products/StickyPurchaseBar";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedProduct, getLocalizedProducts } from "@/lib/i18n/catalogueLocale";
import { CinematicAtmosphereBackground } from "@/components/products/CinematicAtmosphereBackground";
import { getAtmosphereConfig } from "@/lib/atmosphere";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [baseProduct, setBaseProduct] = useState<Product | null>(
    directProduct || initialProduct || null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // GSAP animation refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const bottleWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const pricingCardRef = useRef<HTMLDivElement>(null);
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const atmosphereSectionRef = useRef<HTMLDivElement>(null);

  // If directly rendered without full props, hydrate from catalogue
  useEffect(() => {
    if (!baseProduct && slug) {
      const all = getAllProducts();
      const found = all.find((p) => p.slug === slug || p.id === slug);
      if (found) {
        setBaseProduct(found);
      }
      setIsLoaded(true);
    } else {
      setIsLoaded(true);
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

  useEffect(() => {
    if (product?.images?.main) {
      setSelectedImage(product.images.main);
    }
  }, [product?.id, product?.images?.main]);

  const [quantity] = useState(1);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<"tête" | "cœur" | "fond" | null>(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

  // Resolve Atmosphere
  const atmosphere: PerfumeAtmosphere = (product?.atmosphere as PerfumeAtmosphere) || "LUXE";
  const atmConfig = getAtmosphereConfig(atmosphere);

  // GSAP ScrollTrigger & Entrance Animation
  useEffect(() => {
    if (!product) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bottleWrapperRef.current) {
        tl.fromTo(
          bottleWrapperRef.current,
          { scale: 0.84, y: 70, opacity: 0, rotationY: -8 },
          { scale: 1, y: 0, opacity: 1, rotationY: 0, duration: 1.5 }
        );
      }

      if (heroTextRef.current) {
        tl.fromTo(
          heroTextRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 1 },
          "-=1.1"
        );
      }

      // 2. Parallax Bottle Movement on Scroll
      if (bottleWrapperRef.current && heroSectionRef.current) {
        gsap.to(bottleWrapperRef.current, {
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: 75,
          scale: 0.95,
          rotation: 2,
        });
      }

      // 3. Progressive Scroll Reveal for Atmosphere Section
      if (atmosphereSectionRef.current) {
        gsap.fromTo(
          atmosphereSectionRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: atmosphereSectionRef.current,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }

      // 4. Progressive Scroll Reveal for Fragrance Pyramid
      if (pyramidSectionRef.current) {
        gsap.fromTo(
          pyramidSectionRef.current.querySelectorAll(".pyramid-card"),
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: pyramidSectionRef.current,
              start: "top 80%",
            },
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.1,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [product?.id]);

  if (!product) {
    if (!isLoaded) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#080604] text-[#FAF7F2]">
          <div className="w-10 h-10 border-2 border-[#DFC68B] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-cinzel text-xs uppercase tracking-luxury text-[#DFC68B]">
            Chargement de l&apos;atmosphère du flacon...
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col bg-[#0A0B0E] text-[#FAF7F2]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32 pb-24">
          <div className="w-16 h-16 rounded-full bg-[#541B28]/20 text-[#DFC68B] flex items-center justify-center mb-4 border border-[#DFC68B]/30">
            <GoldStarLozenge size={24} className="text-[#DFC68B]" />
          </div>
          <h1 className="font-serif text-3xl text-[#DFC68B] mb-2">Flacon Non Référencé</h1>
          <p className="text-sm text-[#A8989C] max-w-md mb-6">
            Ce parfum n&apos;est plus disponible dans le catalogue actuel de la Maison Lévania.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-[#541B28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#66182C] transition-all shadow-md"
          >
            Découvrir nos créations
          </Link>
        </main>
        <Footer />
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

  const rawGallery = [
    product.images.main,
    product.images.packaging,
    ...(Array.isArray(product.images.gallery) ? product.images.gallery : []),
    product.images.lifestyle,
    product.images.bottleOnly,
  ];
  const galleryImages = rawGallery.filter(
    (img, index, self): img is string => Boolean(img) && self.indexOf(img) === index
  );

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
    setIsCartOpen(true);
    showToast(
      "Flacon Ajouté au Panier",
      `${product.name} (${selectedSize}) a été déposé dans votre panier avec soin.`,
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
    getAllProducts()
      .filter((p) => p.id !== product.id && p.collectionSlug === product.collectionSlug)
      .slice(0, 3),
    locale
  );

  const getAtmosphereIcon = () => {
    switch (atmosphere) {
      case "SAUVAGE":
        return <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case "LUXE":
        return <Crown className="w-3.5 h-3.5 text-[#DFC68B]" />;
      case "CLASS":
        return <Gem className="w-3.5 h-3.5 text-[#E2E8F0]" />;
      case "FÉMININE & SEXY":
        return <Heart className="w-3.5 h-3.5 text-[#FB7185]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#DFC68B]" />;
    }
  };

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen flex flex-col text-[#FAF7F2] relative selection:bg-[#541B28] selection:text-[#FAF7F2] overflow-x-hidden"
      style={{ backgroundColor: atmConfig.palette.background }}
    >
      {/* 1. CINEMATIC FULL-VIEWPORT VIDEO BACKGROUND */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <CinematicAtmosphereBackground
          atmosphere={atmosphere}
          videoUrl={product.videoUrl}
          videoConfig={product.videoConfig}
          posterImage={product.images.main}
          productName={product.name}
        />
      </div>

      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Active Atmospheric Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <nav className="font-cinzel text-[11px] tracking-luxury text-white/70 flex items-center gap-2 uppercase font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                {t("nav.home", "Accueil")}
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-white transition-colors">
                {t("nav.shop", "Boutique")}
              </Link>
              <span>/</span>
              <span className="text-white font-bold" style={{ color: atmConfig.palette.primary }}>
                {product.name}
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-lg self-start sm:self-auto">
              {getAtmosphereIcon()}
              <span className="font-cinzel text-[10px] tracking-luxury uppercase font-bold text-white/90">
                Atmosphère :{" "}
                <span style={{ color: atmConfig.palette.primary }}>{atmConfig.name}</span>
              </span>
            </div>
          </div>

          {/* HERO GRID: Bottle Left, Luxury Details Right */}
          <div
            ref={heroSectionRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20 sm:mb-28 items-start"
          >
            {/* Left: Product Images Gallery with GSAP 3D entrance */}
            <div ref={bottleWrapperRef} className="lg:col-span-7 space-y-4">
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border shadow-2xl transition-all"
                style={{ borderColor: atmConfig.palette.border }}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  unoptimized={selectedImage.startsWith("data:")}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Collection & Atmosphere pill */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="font-cinzel text-[10px] uppercase tracking-luxury font-bold px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-white shadow-md backdrop-blur-md">
                    {product.collection}
                  </span>
                  <span
                    className="font-cinzel text-[9px] uppercase tracking-luxury font-bold px-3 py-1 rounded-full text-black shadow-md backdrop-blur-md"
                    style={{ backgroundColor: atmConfig.palette.primary }}
                  >
                    {atmosphere}
                  </span>
                </div>

                {/* Interactive Atomizer Vaporizer Action */}
                <div className="absolute bottom-5 right-5 z-20">
                  <AtomizerSpray productName={product.name} />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "relative w-20 h-24 rounded-2xl overflow-hidden border transition-all cursor-pointer bg-black/40 backdrop-blur-md shrink-0 shadow-sm",
                      selectedImage === img
                        ? "scale-105 ring-2"
                        : "opacity-70 hover:opacity-100 border-white/15"
                    )}
                    style={{
                      borderColor: selectedImage === img ? atmConfig.palette.primary : undefined,
                      boxShadow:
                        selectedImage === img ? `0 0 15px ${atmConfig.palette.glow}` : undefined,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Aperçu ${i + 1}`}
                      fill
                      unoptimized={img.startsWith("data:")}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div ref={heroTextRef} className="lg:col-span-5 space-y-6">
              <div>
                <span
                  className="font-cinzel text-[11px] uppercase tracking-grand font-bold block mb-1"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {product.subtitle}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                  {product.name}
                </h1>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xs mt-3">
                  <GoldStarLozenge size={12} className="text-[#DFC68B]" />
                  <span className="font-cinzel text-[10px] tracking-wider uppercase text-white/90 font-bold">
                    {t("product.certified_badge", "Haute Parfumerie Artisanale • Flacon Scellé & Traçable")}
                  </span>
                </div>
              </div>

              {/* Price & Stock Card */}
              <div
                ref={pricingCardRef}
                className="p-5 rounded-2xl bg-black/55 backdrop-blur-xl border shadow-xl flex items-center justify-between"
                style={{ borderColor: atmConfig.palette.border }}
              >
                <div>
                  <span className="font-cinzel text-[10px] tracking-luxury uppercase text-white/60 block">
                    {t("product.price_label", "Prix Flacon")}
                  </span>
                  <span
                    className="font-serif text-2xl sm:text-3xl font-medium block mt-0.5"
                    style={{ color: atmConfig.palette.primary }}
                  >
                    {formatTND(activeFormat.priceTND)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-xs text-emerald-400 flex items-center gap-1.5 font-bold uppercase tracking-luxury">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {t("product.in_stock", "En stock")} ({activeFormat.stock}{" "}
                    {t("product.available", "disponibles")})
                  </span>
                  <span className="font-mono text-[10px] text-white/60 mt-0.5 block">
                    SKU: {activeFormat.sku}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Format Selection (50ml / 100ml) */}
              <div className="space-y-2.5">
                <span
                  className="font-cinzel text-xs uppercase tracking-luxury font-bold block"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {t("product.size_label", "Contenance du Flacon")}
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  {product.formats.map((fmt) => (
                    <button
                      key={fmt.size}
                      onClick={() => setSelectedSize(fmt.size)}
                      className={cn(
                        "p-4 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-md",
                        selectedSize === fmt.size
                          ? "bg-white/15 text-white shadow-lg ring-1"
                          : "bg-black/35 border-white/15 text-white/70 hover:border-white/40 hover:bg-black/50"
                      )}
                      style={{
                        borderColor: selectedSize === fmt.size ? atmConfig.palette.primary : undefined,
                      }}
                    >
                      <span className="font-cinzel text-sm font-bold tracking-luxury block">
                        {fmt.size}
                      </span>
                      <span
                        className="font-serif text-sm font-bold mt-1 block"
                        style={{ color: atmConfig.palette.primary }}
                      >
                        {formatTND(fmt.priceTND)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs: Add to cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 py-4 px-4 sm:px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-cinzel text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DFC68B]" />
                    <span>{t("nav.cart", "Ajouter au Panier")}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full sm:flex-1 py-4 px-4 sm:px-6 rounded-2xl text-black font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shadow-2xl"
                    style={{
                      backgroundColor: atmConfig.palette.primary,
                      boxShadow: `0 0 25px ${atmConfig.palette.glow}`,
                    }}
                  >
                    <span>{t("product.buy_now", "Acheter Immédiatement")}</span>
                    <ArrowRight className="w-4 h-4 text-black rtl:rotate-180" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div
                className="p-4 rounded-2xl bg-black/55 backdrop-blur-xl border space-y-2.5 text-xs text-white/80 shadow-lg"
                style={{ borderColor: atmConfig.palette.border }}
              >
                <div className="flex items-center gap-2 text-white/90">
                  <Truck className="w-4 h-4 shrink-0 text-[#DFC68B]" />
                  <span>
                    {t(
                      "product.free_delivery_notice",
                      "Livraison express en Tunisie sous 24h • 48h (Offerte dès 200 TND)"
                    )}
                  </span>
                </div>

                {/* Interactive Certificate Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCertOpen(true)}
                  className="w-full flex items-center justify-between text-left rtl:text-right p-1.5 -mx-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-white/90">
                    <QrCode className="w-4 h-4 text-[#DFC68B] shrink-0" />
                    <span>
                      {t(
                        "product.certified_notice",
                        "Flacon certifié avec QR Code de traçabilité officiel Lévania"
                      )}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold underline underline-offset-2 shrink-0"
                    style={{ color: atmConfig.palette.primary }}
                  >
                    {t("product.consult", "Consulter")}
                  </span>
                </button>

                <div className="flex items-center gap-2.5 text-white/90">
                  <GoldStarLozenge size={13} className="text-[#DFC68B] shrink-0" />
                  <span>
                    {t("product.luck_points_prefix", "Rapporte")} +
                    {Math.floor(activeFormat.priceTND / 10)}{" "}
                    {t("product.luck_points_suffix", "Luck pour la Roue du Destin")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. ATMOSPHERE CINEMATIC SHOWCASE BANNER */}
          <div
            ref={atmosphereSectionRef}
            className="rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden backdrop-blur-xl border"
            style={{
              backgroundColor: atmConfig.palette.cardBg,
              borderColor: atmConfig.palette.border,
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15">
                  <Film className="w-3.5 h-3.5 text-[#DFC68B]" />
                  <span className="font-cinzel text-[10px] tracking-luxury uppercase font-bold text-white">
                    Univers Cinématographique • {atmConfig.name}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  {atmConfig.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {atmConfig.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
                  {atmConfig.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80 uppercase font-mono"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 p-4 rounded-2xl bg-black/40 border border-white/15 text-center space-y-1">
                <span className="font-cinzel text-[10px] uppercase text-white/60 block">
                  Identité Visuelle
                </span>
                <span
                  className="font-serif text-lg font-bold block"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {atmConfig.palette.name}
                </span>
                <span className="text-[10px] text-white/60 font-mono block">
                  Expérience Immersive 4K
                </span>
              </div>
            </div>
          </div>

          {/* 3. WAVE OLFACTORY DIFFUSION SECTION */}
          <div
            className="rounded-3xl p-6 sm:p-8 mb-16 shadow-xl relative overflow-hidden backdrop-blur-xl border"
            style={{
              backgroundColor: atmConfig.palette.cardBg,
              borderColor: atmConfig.palette.border,
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/15">
              <div className="flex items-center gap-3">
                <WaveMonogram
                  size="sm"
                  variant={waveExpression === "soft" ? "burgundy" : "gold"}
                  withSeal
                />
                <div>
                  <span
                    className="text-[10px] uppercase tracking-widest font-bold block"
                    style={{ color: atmConfig.palette.primary }}
                  >
                    {t("product.wave_signature_title", "Signature Ondulatoire du Flacon")}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">
                    {waveExpression === "soft"
                      ? t("product.wave_soyeuse_full", "Onde Soyeuse Diaphane • Voile Intime")
                      : waveExpression === "intense"
                      ? t("product.wave_sombre_full", "Onde Sombre & Boisée • Sillage Monumental")
                      : t("product.wave_signature_full", "Vague Signature • Noblesse Méditerranéenne")}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-bold shadow-sm">
                  {t("product.diffusion_spec", "Diffusion 14h • Rayonnement 2.5m")}
                </span>
              </div>
            </div>

            {/* Interactive Wave Canvas for this fragrance */}
            <div className="h-32 sm:h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative">
              <WaveCanvas
                expression={waveExpression}
                interactive={true}
                height="100%"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto pointer-events-none">
                <span className="inline-block max-w-full text-[9px] uppercase tracking-widest text-white/80 font-mono bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm leading-relaxed">
                  <span className="sm:hidden">
                    {t("pavilion.tap_diffuse_mobile", "~ Touchez pour diffuser")}
                  </span>
                  <span className="hidden sm:inline">
                    {t(
                      "pavilion.tap_diffuse_desktop",
                      "~ Touchez ou survolez pour diffuser l'onde olfactive"
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* 4. FRAGRANCE PYRAMID SECTION */}
          <div
            ref={pyramidSectionRef}
            className="rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl backdrop-blur-xl border"
            style={{
              backgroundColor: atmConfig.palette.cardBg,
              borderColor: atmConfig.palette.border,
            }}
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <span
                className="text-[10px] uppercase tracking-[0.25em] font-bold block mb-1"
                style={{ color: atmConfig.palette.primary }}
              >
                {t("product.harmonic_arch", "Architecture Harmonique")}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                {t("product.interactive_pyramid", "La Pyramide Olfactive")}
              </h3>
              <p className="text-xs text-white/70 mt-2">
                {t(
                  "product.click_note",
                  "Touchez ou cliquez sur une note pour révéler son terroir d'origine, sa méthode de distillation et son rayonnement."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Top Notes */}
              <div className="pyramid-card p-6 rounded-2xl bg-black/45 border border-white/15 text-center backdrop-blur-md">
                <span
                  className="font-cinzel text-[10px] uppercase tracking-luxury font-bold"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {t("product.head_notes", "Notes de Tête (Première Impression)")}
                </span>
                <h4 className="font-serif text-xl text-white mt-2 mb-4 font-semibold">
                  {t("product.layer_awakening", "L'Éveil")}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.topNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("tête");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop
                        size={12}
                        className="text-[#DFC68B] opacity-70 group-hover/tag:opacity-100 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="pyramid-card p-6 rounded-2xl bg-black/45 border border-white/20 text-center backdrop-blur-md">
                <span
                  className="font-cinzel text-[10px] uppercase tracking-luxury font-bold"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {t("product.heart_notes", "Notes de Cœur (Signature Centrale)")}
                </span>
                <h4 className="font-serif text-xl text-white mt-2 mb-4 font-semibold">
                  {t("product.layer_soul", "L'Âme du Sillage")}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.heartNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("cœur");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white/15 hover:bg-white hover:text-black border border-white/30 text-white font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop
                        size={12}
                        className="text-[#DFC68B] opacity-80 group-hover/tag:opacity-100 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className="pyramid-card p-6 rounded-2xl bg-black/45 border border-white/15 text-center backdrop-blur-md">
                <span
                  className="font-cinzel text-[10px] uppercase tracking-luxury font-bold"
                  style={{ color: atmConfig.palette.primary }}
                >
                  {t("product.base_notes", "Notes de Fond (Tenue Inoubliable)")}
                </span>
                <h4 className="font-serif text-xl text-white mt-2 mb-4 font-semibold">
                  {t("product.layer_imprint", "L'Empreinte")}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.baseNotes.map((n, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedNote(n);
                        setSelectedLayer("fond");
                      }}
                      className="group/tag inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-all cursor-pointer shadow-sm hover:scale-105"
                      title={t("product.consult", "Découvrir l'accord")}
                    >
                      <span>{n}</span>
                      <LuxuryDrop
                        size={12}
                        className="text-[#DFC68B] opacity-70 group-hover/tag:opacity-100 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. RELATED FRAGRANCES */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl text-white font-semibold mb-6">
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
