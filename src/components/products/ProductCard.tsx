"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { WaveMonogram } from "@/components/brand/WaveMonogram";

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
    Amber: "bg-[#541B28]/10 text-[#541B28] border-[#541B28]/30",
    Woody: "bg-[#434B36]/10 text-[#434B36] border-[#434B36]/30",
    Floral: "bg-rose-50 text-rose-800 border-rose-300",
    Citrus: "bg-amber-50 text-amber-900 border-amber-300",
    Spicy: "bg-orange-50 text-orange-900 border-orange-300",
    Fresh: "bg-sky-50 text-sky-900 border-sky-300",
    Sweet: "bg-purple-50 text-purple-900 border-purple-300",
    Oriental: "bg-[#541B28]/15 text-[#541B28] border-[#541B28]/40",
  };

  return (
    <div
      className={cn(
        "group relative rounded-3xl bg-white border border-[#541B28]/15 overflow-hidden transition-all duration-500 hover:border-[#541B28]/40 hover:shadow-xl hover:shadow-[#541B28]/8 flex flex-col justify-between text-[#23181A]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        <span
          className={cn(
            "font-cinzel text-[10px] tracking-luxury uppercase font-bold px-3.5 py-1.5 rounded-full border backdrop-blur-md pointer-events-auto shadow-sm",
            familyColors[product.fragranceFamily] || "bg-white text-[#541B28] border-[#541B28]/30"
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
            "p-2 rounded-full backdrop-blur-md border transition-all pointer-events-auto shadow-sm",
            isWishlisted
              ? "bg-[#541B28] border-[#541B28] text-white"
              : "bg-white/90 border-[#541B28]/20 text-[#756B6D] hover:text-[#541B28] hover:border-[#541B28]"
          )}
          aria-label="Ajouter aux favoris"
        >
          <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
        </button>
      </div>

      {/* Image Area with luxury hover zoom */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-[#FAF7F2]">
        <Image
          src={isHovered && product.images.packaging ? product.images.packaging : product.images.main}
          alt={product.name}
          fill
          priority={priority}
          unoptimized={(product.images.main || "").startsWith("data:")}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Quick View Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 border border-[#541B28]/30 text-[#541B28] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#541B28]" />
            <span>Découvrir</span>
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between font-cinzel text-[10px] uppercase tracking-luxury text-[#852538] font-bold mb-1.5">
            <span>{product.collection}</span>
            <WaveMonogram
              size="xs"
              variant={product.collectionSlug === "soyeuse" ? "burgundy" : "gold"}
            />
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] group-hover:text-[#541B28] transition-colors font-medium">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#756B6D] italic mt-0.5 line-clamp-1">{product.subtitle}</p>

          {/* Notes Preview */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {product.topNotes.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#4A3B3E] border border-[#541B28]/15 font-medium"
              >
                {note}
              </span>
            ))}
            {product.baseNotes.length > 0 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#541B28]/10 text-[#541B28] border border-[#541B28]/25 font-semibold">
                {product.baseNotes[0]}
              </span>
            )}
          </div>
        </div>

        {/* Price & Format Selector & Add Button */}
        <div className="mt-5 pt-4 border-t border-[#541B28]/10">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#541B28]/15">
              {product.formats.map((fmt) => (
                <button
                  key={fmt.size}
                  onClick={() => setSelectedFormat(fmt.size)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-lg transition-all font-cinzel",
                    selectedFormat === fmt.size
                      ? "bg-[#541B28] text-white font-bold shadow-sm"
                      : "text-[#756B6D] hover:text-[#541B28]"
                  )}
                >
                  {fmt.size}
                </button>
              ))}
            </div>

            <div className="text-right">
              <span className="font-serif text-xl text-[#541B28] font-bold">
                {formatTND(activeFormat.priceTND)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 px-5 rounded-xl bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-white border border-[#541B28]/30 hover:border-transparent font-cinzel text-[11px] font-bold tracking-luxury uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Ajouter au Panier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
