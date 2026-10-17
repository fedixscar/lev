"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Eye, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useNotification();
  const [selectedFormat, setSelectedFormat] = useState<"50ml" | "100ml">("50ml");
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activeFormat = product.formats.find((f) => f.size === selectedFormat) || product.formats[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images.main,
      formatSize: selectedFormat,
      unitPriceTND: activeFormat.priceTND,
      unitPriceMillimes: activeFormat.priceMillimes,
      quantity: 1,
    });

    showToast(
      "Flacon ajouté à votre panier",
      `${product.name} (${selectedFormat}) — ${formatTND(activeFormat.priceTND)}`,
      "luxury"
    );
  };

  const familyColors: Record<string, string> = {
    Amber: "bg-amber-950/60 text-amber-200 border-amber-500/30",
    Woody: "bg-[#20271E] text-[#C7A66A] border-[#C7A66A]/30",
    Floral: "bg-rose-950/60 text-rose-200 border-rose-500/30",
    Citrus: "bg-yellow-950/60 text-yellow-200 border-yellow-500/30",
    Spicy: "bg-orange-950/60 text-orange-200 border-orange-500/30",
    Fresh: "bg-sky-950/60 text-sky-200 border-sky-500/30",
    Sweet: "bg-purple-950/60 text-purple-200 border-purple-500/30",
    Oriental: "bg-red-950/60 text-red-200 border-red-500/30",
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-[#171715]/90 border border-[#C7A66A]/15 overflow-hidden transition-all duration-500 hover:border-[#C7A66A]/40 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span
          className={cn(
            "text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full border backdrop-blur-md pointer-events-auto",
            familyColors[product.fragranceFamily] || "bg-[#20271E] text-[#C7A66A] border-[#C7A66A]/30"
          )}
        >
          {product.fragranceFamily}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
            showToast(
              isWishlisted ? "Retiré de vos favoris" : "Ajouté à vos favoris",
              product.name,
              "info"
            );
          }}
          className={cn(
            "p-2 rounded-full backdrop-blur-md border transition-all pointer-events-auto",
            isWishlisted
              ? "bg-[#542B32] border-rose-400 text-rose-200"
              : "bg-black/40 border-white/10 text-[#89877F] hover:text-[#C7A66A] hover:border-[#C7A66A]/40"
          )}
          aria-label="Ajouter aux favoris"
        >
          <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
        </button>
      </div>

      {/* Image Area with luxury hover zoom */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-[#20271E]/40">
        <Image
          src={isHovered && product.images.packaging ? product.images.packaging : product.images.main}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Quick View Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="px-3 py-1.5 rounded-full bg-[#171715]/90 border border-[#C7A66A]/40 text-[#F6F1E8] text-xs font-medium backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>Découvrir</span>
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#C7A66A] font-medium mb-1">
            {product.collection}
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-xl text-[#F6F1E8] group-hover:text-gold-gradient transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#89877F] italic mt-0.5 line-clamp-1">{product.subtitle}</p>

          {/* Notes Preview */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.topNotes.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#E9DFCE]/70 border border-white/5"
              >
                {note}
              </span>
            ))}
            {product.baseNotes.length > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#C7A66A]/10 text-[#C7A66A] border border-[#C7A66A]/20">
                {product.baseNotes[0]}
              </span>
            )}
          </div>
        </div>

        {/* Price & Format Selector & Add Button */}
        <div className="mt-5 pt-4 border-t border-[#C7A66A]/15">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 bg-[#20271E] p-1 rounded-lg border border-[#C7A66A]/20">
              {product.formats.map((fmt) => (
                <button
                  key={fmt.size}
                  onClick={() => setSelectedFormat(fmt.size)}
                  className={cn(
                    "px-2.5 py-0.5 text-xs rounded transition-all",
                    selectedFormat === fmt.size
                      ? "bg-[#C7A66A] text-[#171715] font-semibold shadow-sm"
                      : "text-[#89877F] hover:text-[#F6F1E8]"
                  )}
                >
                  {fmt.size}
                </button>
              ))}
            </div>

            <div className="text-right">
              <span className="font-serif text-lg text-[#C7A66A] font-medium">
                {formatTND(activeFormat.priceTND)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-xl bg-[#20271E] hover:bg-gradient-to-r hover:from-[#C7A66A] hover:to-[#9E7D42] text-[#E9DFCE] hover:text-[#171715] border border-[#C7A66A]/30 hover:border-transparent text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Ajouter au Panier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
