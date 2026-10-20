"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { useCart } from "@/context/CartContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import { WaveMonogram } from "@/components/brand/WaveMonogram";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotalTND,
    discountTND,
    deliveryFeeTND,
    totalTND,
    totalMillimes,
    projectedLuck,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponCodeInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#541B28]/20 shadow-2xl flex flex-col text-[#23181A]">
          {/* Header */}
          <div className="p-6 border-b border-[#541B28]/15 flex items-center justify-between bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <WaveMonogram size="xs" variant="burgundy" />
              <span className="font-serif text-2xl text-[#541B28] font-normal">
                Votre Panier
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#541B28]/10 text-[#541B28] font-bold border border-[#541B28]/20">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#756B6D] hover:text-[#541B28] rounded-full hover:bg-black/5 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Wave Meter */}
          <div className="px-6 py-3 bg-[#F3ECE1]/70 border-b border-[#541B28]/10 text-xs text-[#5A4B4E]">
            {subtotalTND >= 200 ? (
              <div className="flex items-center gap-2 text-[#434B36] font-semibold">
                <GoldStarLozenge size={13} className="text-[#C7A66A]" />
                <span>Livraison Express Offerte partout en Tunisie !</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5 text-[11px]">
                  <span>Plus que <strong className="text-[#541B28]">{formatTND(200 - subtotalTND)}</strong> pour la livraison offerte</span>
                  <span className="font-mono text-[#541B28] font-bold">{Math.min(100, Math.round((subtotalTND / 200) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#541B28]/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#541B28] via-[#C7A66A] to-[#852538] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotalTND / 200) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#756B6D] py-12">
                <div className="w-16 h-16 rounded-full border border-[#541B28]/20 flex items-center justify-center mb-4 text-[#541B28] bg-white shadow-sm">
                  <WaveMonogram size="md" variant="burgundy" />
                </div>
                <p className="font-serif text-xl text-[#23181A] mb-2">Votre panier est vide</p>
                <p className="text-sm max-w-xs text-[#756B6D] mb-6">
                  Explorez nos créations olfactives artisanales et laissez-vous transporter.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#541B28] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#66182C] transition-all shadow-md"
                >
                  Découvrir la Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-[#541B28]/15 hover:border-[#541B28]/35 transition-all shadow-sm"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#541B28]/15">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#23181A] font-medium leading-tight">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#756B6D] hover:text-rose-600 p-1 transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#541B28]/10 text-[#541B28] font-bold">
                          {item.formatSize}
                        </span>
                        {item.giftBoxDetails && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#852538] border border-[#852538]/30 font-medium">
                            Coffret Cadeau
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-[#541B28]/25 rounded-lg p-1 bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#756B6D] hover:text-[#541B28]"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-[#23181A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#756B6D] hover:text-[#541B28]"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm text-[#541B28] font-bold">
                        {formatTND(item.unitPriceTND * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and projected Luck */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#541B28]/20 bg-white shadow-lg space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                  <input
                    type="text"
                    placeholder="Code Promo (ex: LEVANIA10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/25 rounded-xl pl-8 pr-3 py-2 text-xs text-[#23181A] uppercase tracking-wider placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Appliquer
                </button>
              </form>

              {couponMessage && (
                <p className={`text-xs ${couponMessage.error ? "text-rose-600" : "text-emerald-700"}`}>
                  {couponMessage.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#541B28]/10 border border-[#541B28]/20 text-xs">
                  <span className="text-[#541B28] font-bold">
                    Code activé: {appliedCoupon.code} (-{appliedCoupon.discountValue}{appliedCoupon.discountType === "percent" ? "%" : " TND"})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#756B6D] hover:text-rose-600 underline"
                  >
                    Retirer
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#756B6D] pt-2 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-[#23181A] font-medium">{formatTND(subtotalTND)}</span>
                </div>
                {discountTND > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Remise</span>
                    <span>-{formatTND(discountTND)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison (Tunisie)</span>
                  <span className="text-[#23181A] font-medium">
                    {deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif text-[#23181A] pt-2 border-t border-[#541B28]/20">
                  <span className="font-normal">Total Estimé</span>
                  <span className="text-[#541B28] font-bold text-lg">{formatMillimes(totalMillimes)}</span>
                </div>
              </div>

              {/* Projected Luck Badge */}
              {projectedLuck > 0 && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#541B28]/20 text-xs text-[#23181A]">
                  <GoldStarLozenge size={13} className="text-[#C7A66A] shrink-0" />
                  <span>
                    Cette commande vous rapportera{" "}
                    <strong className="text-[#541B28]">+{projectedLuck} Luck</strong> pour la Roue du Destin!
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3 text-center rounded-xl border border-[#541B28]/30 text-xs font-semibold text-[#541B28] hover:bg-[#FAF7F2] transition-colors"
                >
                  Voir Panier
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-[2] py-3 text-center rounded-xl bg-[#541B28] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#66182C] transition-colors shadow-lg shadow-[#541B28]/20 flex items-center justify-center gap-2"
                >
                  <span>Commander</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
