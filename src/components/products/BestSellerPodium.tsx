"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { ProductCard } from "./ProductCard";

interface BestSellerPodiumProps {
  products: Product[];
}

export function BestSellerPodium({ products }: BestSellerPodiumProps) {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  // Top 3 Podium: rank 1, 2, 3
  const first = products.find((p) => p.bestsellerRank === 1) || products[0];
  const second = products.find((p) => p.bestsellerRank === 2) || products[1];
  const third = products.find((p) => p.bestsellerRank === 3) || products[2];

  // Remaining 7 bestsellers
  const otherBestsellers = products.filter(
    (p) => p.bestsellerRank && p.bestsellerRank > 3 && p.bestsellerRank <= 10
  );

  const handleQuickAdd = (p: Product) => {
    const fmt = p.formats[0];
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
    showToast("Flacon ajouté", `${p.name} (${fmt.size})`, "luxury");
  };

  return (
    <section id="best-sellers" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#171715] via-[#20271E]/50 to-[#171715]">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C7A66A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-widest font-medium mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>Palmarès Officiel Haute Parfumerie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light tracking-wide mb-4">
            Le Podium des Bestsellers
          </h2>
          <p className="text-sm text-[#89877F] leading-relaxed">
            Les trois chefs-d&apos;œuvre plébiscités par nos connaisseurs, incarnant l&apos;apogée du sillage et de la diffusion artisanale Lévania.
          </p>
        </div>

        {/* 3-Product Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto mb-20">
          {/* Rank 2 (Left) */}
          {second && (
            <div className="order-2 md:order-1 relative rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/20 p-6 flex flex-col items-center text-center shadow-xl hover:border-[#C7A66A]/50 transition-all group">
              <div className="absolute -top-4 w-9 h-9 rounded-full bg-[#20271E] border border-[#C7A66A]/40 flex items-center justify-center text-sm font-serif font-bold text-[#C7A66A] shadow-md">
                2
              </div>

              <div className="relative w-48 h-56 my-4 overflow-hidden rounded-xl border border-white/5 bg-black/40">
                <Image
                  src={second.images.main}
                  alt={second.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-medium">
                {second.collection}
              </span>
              <h3 className="font-serif text-xl text-[#F6F1E8] mt-1">{second.name}</h3>
              <p className="text-xs text-[#89877F] mt-1 italic">{second.fragranceFamily}</p>
              <div className="text-sm text-[#C7A66A] font-serif font-medium mt-3">
                {formatTND(second.formats[0].priceTND)}
              </div>

              <div className="flex gap-2 w-full mt-4">
                <Link
                  href={`/products/${second.slug}`}
                  className="flex-1 py-2 text-xs rounded-lg border border-[#C7A66A]/30 text-[#E9DFCE] hover:bg-white/5 transition-colors"
                >
                  Découvrir
                </Link>
                <button
                  onClick={() => handleQuickAdd(second)}
                  className="p-2 rounded-lg bg-[#343B2B] hover:bg-[#C7A66A] hover:text-[#171715] text-[#C7A66A] transition-colors"
                  aria-label="Ajouter"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Rank 1 (Center — Elevated Gold Pedestal) */}
          {first && (
            <div className="order-1 md:order-2 relative rounded-2xl bg-gradient-to-b from-[#20271E] to-[#171715] border-2 border-[#C7A66A] p-8 flex flex-col items-center text-center shadow-2xl shadow-[#C7A66A]/20 md:-translate-y-6 group">
              <div className="absolute -top-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                <Crown className="w-4 h-4" />
                <span>N°1 Absolu &bull; Onde d&apos;Or</span>
              </div>

              <div className="relative w-56 h-64 my-4 overflow-hidden rounded-2xl border border-[#C7A66A]/30 bg-black/50 shadow-inner">
                <Image
                  src={first.images.main}
                  alt={first.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                {first.collection}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient mt-1">{first.name}</h3>
              <p className="text-xs text-[#E9DFCE]/80 mt-1 max-w-xs">{first.subtitle}</p>
              <div className="text-lg text-[#C7A66A] font-serif font-medium mt-4">
                Dès {formatTND(first.formats[0].priceTND)}
              </div>

              <div className="flex gap-2 w-full mt-5">
                <Link
                  href={`/products/${first.slug}`}
                  className="flex-[2] py-2.5 text-xs rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] font-semibold tracking-wider uppercase hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <span>Explorer le N°1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleQuickAdd(first)}
                  className="p-2.5 rounded-xl bg-[#343B2B] hover:bg-[#C7A66A] hover:text-[#171715] text-[#C7A66A] border border-[#C7A66A]/40 transition-colors"
                  aria-label="Ajouter au panier"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Rank 3 (Right) */}
          {third && (
            <div className="order-3 relative rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/20 p-6 flex flex-col items-center text-center shadow-xl hover:border-[#C7A66A]/50 transition-all group">
              <div className="absolute -top-4 w-9 h-9 rounded-full bg-[#20271E] border border-[#C7A66A]/40 flex items-center justify-center text-sm font-serif font-bold text-[#C7A66A] shadow-md">
                3
              </div>

              <div className="relative w-48 h-56 my-4 overflow-hidden rounded-xl border border-white/5 bg-black/40">
                <Image
                  src={third.images.main}
                  alt={third.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-medium">
                {third.collection}
              </span>
              <h3 className="font-serif text-xl text-[#F6F1E8] mt-1">{third.name}</h3>
              <p className="text-xs text-[#89877F] mt-1 italic">{third.fragranceFamily}</p>
              <div className="text-sm text-[#C7A66A] font-serif font-medium mt-3">
                {formatTND(third.formats[0].priceTND)}
              </div>

              <div className="flex gap-2 w-full mt-4">
                <Link
                  href={`/products/${third.slug}`}
                  className="flex-1 py-2 text-xs rounded-lg border border-[#C7A66A]/30 text-[#E9DFCE] hover:bg-white/5 transition-colors"
                >
                  Découvrir
                </Link>
                <button
                  onClick={() => handleQuickAdd(third)}
                  className="p-2 rounded-lg bg-[#343B2B] hover:bg-[#C7A66A] hover:text-[#171715] text-[#C7A66A] transition-colors"
                  aria-label="Ajouter"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 7 Additional Bestselling Fragrances */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C7A66A]/15">
            <div>
              <h3 className="font-serif text-2xl text-[#F6F1E8]">
                Les 7 Autres Signatures Incontournables
              </h3>
              <p className="text-xs text-[#89877F] mt-1">
                Du rang 4 au rang 10 &bull; Sélectionnées par nos maîtres parfumeurs
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs text-[#C7A66A] hover:underline flex items-center gap-1 font-medium"
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
