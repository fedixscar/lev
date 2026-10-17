"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatTND, cn } from "@/lib/utils";

interface StickyPurchaseBarProps {
  product: Product;
  selectedSize: "50ml" | "100ml";
  onSelectSize: (size: "50ml" | "100ml") => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function StickyPurchaseBar({
  product,
  selectedSize,
  onSelectSize,
  onAddToCart,
  onBuyNow,
}: StickyPurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 520px
      if (window.scrollY > 520) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const activeFormat =
    product.formats.find((f) => f.size === selectedSize) || product.formats[0];

  return (
    <aside
      aria-label="Barre d'achat rapide"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#541B28]/20 shadow-2xl py-3 px-4 sm:px-6 transition-transform animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Product Info & Thumbnail */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#541B28]/20 bg-white shrink-0 shadow-sm">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block truncate">
              {product.collection}
            </span>
            <h4 className="font-serif text-sm sm:text-base text-[#541B28] font-bold truncate">
              {product.name}
            </h4>
          </div>
        </div>

        {/* Center / Right: Format Switcher, Price & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Format Selector Pills */}
          <div className="hidden xs:flex items-center p-1 rounded-xl bg-white/80 border border-[#541B28]/15 text-xs">
            {product.formats.map((fmt) => (
              <button
                key={fmt.size}
                type="button"
                onClick={() => onSelectSize(fmt.size)}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-serif font-bold transition-all cursor-pointer",
                  selectedSize === fmt.size
                    ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
                    : "text-[#5A4B4E] hover:text-[#541B28]"
                )}
              >
                {fmt.size}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-serif text-base sm:text-lg text-[#541B28] font-bold block whitespace-nowrap">
              {formatTND(activeFormat.priceTND)}
            </span>
          </div>

          {/* Buttons */}
          <button
            type="button"
            onClick={onAddToCart}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#541B28] border border-[#541B28]/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            title="Ajouter au Panier"
          >
            <ShoppingBag className="w-4 h-4 text-[#541B28]" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>

          <button
            type="button"
            onClick={onBuyNow}
            className="px-4 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-md shadow-[#541B28]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="hidden xs:inline">Commander</span>
            <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
          </button>
        </div>
      </div>
    </aside>
  );
}
