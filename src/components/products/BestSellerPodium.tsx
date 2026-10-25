"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown, ShoppingBag, ArrowRight } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { getAllProducts, PRODUCTS_UPDATED_EVENT } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";
import { Card3DTilt } from "@/components/ui/Card3DTilt";

interface BestSellerPodiumProps {
  products: Product[];
}

export function BestSellerPodium({ products: initialProducts }: BestSellerPodiumProps) {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const [productsList, setProductsList] = useState<Product[]>(initialProducts);

  React.useEffect(() => {
    setProductsList(getAllProducts());
    const handleUpdate = () => setProductsList(getAllProducts());
    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
  }, []);

  // Top 3 Podium: rank 1, 2, 3
  const first = productsList.find((p) => p.bestsellerRank === 1) || productsList[0];
  const second = productsList.find((p) => p.bestsellerRank === 2) || productsList[1];
  const third = productsList.find((p) => p.bestsellerRank === 3) || productsList[2];

  // Selected formats for podium
  const [firstFormat, setFirstFormat] = useState<"50ml" | "100ml">("100ml");
  const [secondFormat, setSecondFormat] = useState<"50ml" | "100ml">("50ml");
  const [thirdFormat, setThirdFormat] = useState<"50ml" | "100ml">("50ml");

  // Remaining 7 bestsellers
  const otherBestsellers = productsList.filter(
    (p) => p.bestsellerRank && p.bestsellerRank > 3 && p.bestsellerRank <= 10
  );

  const handleQuickAdd = (p: Product, size: "50ml" | "100ml") => {
    const fmt = p.formats.find((f) => f.size === size) || p.formats[0];
    addItem({
      productId: p.id,
      productName: p.name,
      productSlug: p.slug,
      image: p.images.main,
      formatSize: fmt.size,
      unitPriceTND: fmt.priceTND,
      unitPriceMillimes: fmt.priceMillimes,
      quantity: 1,
    });
    showToast("Flacon réservé", `${p.name} (${fmt.size}) — ${formatTND(fmt.priceTND)}`, "luxury");
  };

  return (
    <section id="best-sellers" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F3ECE1]/60 to-[#FAF7F2] text-[#23181A]">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#541B28]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/25 font-cinzel text-[10px] text-[#541B28] uppercase tracking-luxury font-bold mb-3.5 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>Les Plus Demandés</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#541B28] font-normal tracking-tight mb-4">
            Nos 3 Meilleurs Parfums
          </h2>
          <p className="text-sm text-[#756B6D] leading-relaxed">
            Découvrez les parfums préférés de nos clients, reconnus pour leur élégance et leur tenue exceptionnelle.
          </p>
        </div>

        {/* 3-Product Podium with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto mb-20">
          {/* Rank 2 (Left) */}
          {second && (
            <Card3DTilt
              maxTilt={7}
              scale={1.02}
              enableGlare={true}
              glareOpacity={0.2}
              className="order-2 md:order-1"
            >
              <div className="relative rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 p-6 flex flex-col items-center text-center shadow-lg hover:border-[#541B28]/40 dark:hover:border-[#C7A66A]/45 transition-all group">
                <div className="absolute -top-4 w-9 h-9 rounded-full bg-white dark:bg-[#180B10] border-2 border-[#541B28]/30 dark:border-[#C7A66A]/40 flex items-center justify-center text-sm font-serif font-bold text-[#541B28] dark:text-[#DFC68B] shadow-md">
                  2
                </div>

                <div className="relative w-48 h-56 my-3 overflow-hidden rounded-2xl border border-[#541B28]/10 dark:border-[#C7A66A]/20 bg-[#FAF7F2] dark:bg-[#0E0709]">
                  <Image
                    src={second.images.main}
                    alt={second.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <WaveMonogram size="xs" variant="gold" />
                  <span className="text-[10px] uppercase tracking-widest text-[#852538] dark:text-[#EACCA0] font-bold">
                    {second.collection}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] font-medium">{second.name}</h3>
                <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-0.5 italic">{second.fragranceFamily}</p>

                {/* Notes Chips */}
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {second.topNotes.slice(0, 2).map((n, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] text-[#5A4B4E] dark:text-[#DCD0D3] border border-[#541B28]/10 dark:border-[#C7A66A]/20">
                      {n}
                    </span>
                  ))}
                </div>

                {/* Format Toggle & Price */}
                <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                  <div className="flex bg-[#FAF7F2] dark:bg-[#0E0709] p-0.5 rounded-lg border border-[#541B28]/15 dark:border-[#C7A66A]/20">
                    {(["50ml", "100ml"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSecondFormat(sz)}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer",
                          secondFormat === sz ? "bg-[#541B28] text-white" : "text-[#756B6D] dark:text-[#A8989C]"
                        )}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <div className="text-sm text-[#541B28] dark:text-[#DFC68B] font-serif font-bold">
                    {formatTND(second.formats.find((f) => f.size === secondFormat)?.priceTND || second.formats[0].priceTND)}
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-3">
                  <Link
                    href={`/products/${second.slug}`}
                    className="flex-1 py-2 text-xs rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#1E0D15] font-semibold transition-colors text-center"
                  >
                    Découvrir
                  </Link>
                  <button
                    onClick={() => handleQuickAdd(second, secondFormat)}
                    className="p-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-white transition-colors shadow-sm cursor-pointer"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3DTilt>
          )}

          {/* Rank 1 (Center — Elevated Pedestal) */}
          {first && (
            <Card3DTilt
              maxTilt={9}
              scale={1.03}
              enableGlare={true}
              glareOpacity={0.3}
              className="order-1 md:order-2 md:-translate-y-6"
            >
              <div className="relative rounded-3xl bg-white dark:bg-[#180B10] border-2 border-[#541B28] dark:border-[#C7A66A] p-8 flex flex-col items-center text-center shadow-2xl shadow-[#541B28]/15 dark:shadow-black/70 group">
                {/* Glowing Pedestal Base Contour */}
                <div className="absolute -bottom-3 left-8 right-8 h-6 bg-gradient-to-r from-transparent via-[#C7A66A]/50 to-transparent blur-md rounded-full pointer-events-none" />

                <div className="absolute -top-6 px-4 py-1.5 rounded-full bg-[#541B28] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl border border-[#C7A66A]/40">
                  <WaveMonogram size="xs" variant="gold" />
                  <span>N°1 des Ventes • Onde d&apos;Or</span>
                </div>

                <div className="relative w-56 h-64 my-3 overflow-hidden rounded-2xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 bg-[#FAF7F2] dark:bg-[#0E0709] shadow-inner">
                  <Image
                    src={first.images.main}
                    alt={first.name}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <span className="text-xs uppercase tracking-widest text-[#852538] dark:text-[#EACCA0] font-bold">
                  {first.collection}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#541B28] dark:text-[#DFC68B] font-semibold mt-0.5">{first.name}</h3>
                <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-0.5 max-w-xs">{first.subtitle}</p>

                {/* Notes Chips */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {first.topNotes.slice(0, 2).map((n, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] text-[#4A3B3E] dark:text-[#FAF7F2] border border-[#541B28]/15 dark:border-[#C7A66A]/20 font-medium">
                      {n}
                    </span>
                  ))}
                  {first.baseNotes.slice(0, 1).map((n, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] border border-[#541B28]/25 dark:border-[#C7A66A]/30 font-bold">
                      {n}
                    </span>
                  ))}
                </div>

                {/* Format Toggle & Price */}
                <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-[#541B28]/15 dark:border-[#C7A66A]/20">
                  <div className="flex bg-[#FAF7F2] dark:bg-[#0E0709] p-1 rounded-xl border border-[#541B28]/20 dark:border-[#C7A66A]/30">
                    {(["50ml", "100ml"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setFirstFormat(sz)}
                        className={cn(
                          "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                          firstFormat === sz ? "bg-[#541B28] text-white shadow-sm" : "text-[#756B6D] dark:text-[#A8989C]"
                        )}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <div className="text-xl text-[#541B28] dark:text-[#DFC68B] font-serif font-bold">
                    {formatTND(first.formats.find((f) => f.size === firstFormat)?.priceTND || first.formats[0].priceTND)}
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-4">
                  <Link
                    href={`/products/${first.slug}`}
                    className="flex-[2] py-3 text-xs rounded-xl bg-[#541B28] hover:bg-[#66182C] text-white font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-[#541B28]/20"
                  >
                    <span>Commander le N°1</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleQuickAdd(first, firstFormat)}
                    className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1E0D15] hover:bg-[#541B28] text-[#541B28] dark:text-[#DFC68B] hover:text-white border border-[#541B28]/30 dark:border-[#C7A66A]/30 transition-colors cursor-pointer"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3DTilt>
          )}

          {/* Rank 3 (Right) */}
          {third && (
            <Card3DTilt
              maxTilt={7}
              scale={1.02}
              enableGlare={true}
              glareOpacity={0.2}
              className="order-3"
            >
              <div className="relative rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 p-6 flex flex-col items-center text-center shadow-lg hover:border-[#541B28]/40 dark:hover:border-[#C7A66A]/45 transition-all group">
                <div className="absolute -top-4 w-9 h-9 rounded-full bg-white dark:bg-[#180B10] border-2 border-[#541B28]/30 dark:border-[#C7A66A]/40 flex items-center justify-center text-sm font-serif font-bold text-[#541B28] dark:text-[#DFC68B] shadow-md">
                  3
                </div>

                <div className="relative w-48 h-56 my-3 overflow-hidden rounded-2xl border border-[#541B28]/10 dark:border-[#C7A66A]/20 bg-[#FAF7F2] dark:bg-[#0E0709]">
                  <Image
                    src={third.images.main}
                    alt={third.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <WaveMonogram size="xs" variant="gold" />
                  <span className="text-[10px] uppercase tracking-widest text-[#852538] dark:text-[#EACCA0] font-bold">
                    {third.collection}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] font-medium">{third.name}</h3>
                <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-0.5 italic">{third.fragranceFamily}</p>

                {/* Notes Chips */}
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {third.topNotes.slice(0, 2).map((n, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] text-[#5A4B4E] dark:text-[#DCD0D3] border border-[#541B28]/10 dark:border-[#C7A66A]/20">
                      {n}
                    </span>
                  ))}
                </div>

                {/* Format Toggle & Price */}
                <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                  <div className="flex bg-[#FAF7F2] dark:bg-[#0E0709] p-0.5 rounded-lg border border-[#541B28]/15 dark:border-[#C7A66A]/20">
                    {(["50ml", "100ml"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setThirdFormat(sz)}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer",
                          thirdFormat === sz ? "bg-[#541B28] text-white" : "text-[#756B6D] dark:text-[#A8989C]"
                        )}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <div className="text-sm text-[#541B28] dark:text-[#DFC68B] font-serif font-bold">
                    {formatTND(third.formats.find((f) => f.size === thirdFormat)?.priceTND || third.formats[0].priceTND)}
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-3">
                  <Link
                    href={`/products/${third.slug}`}
                    className="flex-1 py-2 text-xs rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#1E0D15] font-semibold transition-colors text-center"
                  >
                    Découvrir
                  </Link>
                  <button
                    onClick={() => handleQuickAdd(third, thirdFormat)}
                    className="p-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-white transition-colors shadow-sm cursor-pointer"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3DTilt>
          )}
        </div>

        {/* 7 Additional Bestselling Fragrances */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#541B28]/15">
            <div>
              <h3 className="font-serif text-2xl text-[#541B28] font-semibold">
                Les 7 Autres Signatures Incontournables
              </h3>
              <p className="text-xs text-[#756B6D] mt-1">
                Du rang 4 au rang 10 • Sélectionnées par nos maîtres parfumeurs
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs text-[#541B28] hover:underline flex items-center gap-1 font-bold shrink-0"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherBestsellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
