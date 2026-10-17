"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatTND, formatMillimes } from "@/lib/utils";

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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171715] border-l border-[#C7A66A]/20 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#C7A66A]/15 flex items-center justify-between bg-[#20271E]/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl text-gold-gradient font-light">
                Votre Panier
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#C7A66A]/20 text-[#C7A66A] font-medium border border-[#C7A66A]/30">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#89877F] hover:text-[#F6F1E8] rounded-full hover:bg-white/5 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#89877F] py-12">
                <div className="w-16 h-16 rounded-full border border-[#C7A66A]/20 flex items-center justify-center mb-4 text-[#C7A66A]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <p className="font-serif text-xl text-[#F6F1E8] mb-2">Votre panier est vide</p>
                <p className="text-sm max-w-xs text-[#E9DFCE]/70 mb-6">
                  Explorez nos créations olfactives artisanales et laissez-vous transporter.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#343B2B] text-[#C7A66A] border border-[#C7A66A]/40 text-sm font-medium hover:bg-[#C7A66A] hover:text-[#171715] transition-all"
                >
                  Découvrir la Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#20271E]/40 border border-[#C7A66A]/10 hover:border-[#C7A66A]/30 transition-all"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-black/40 shrink-0 border border-[#C7A66A]/20">
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
                        <h4 className="font-serif text-base text-[#F6F1E8] leading-tight">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#89877F] hover:text-rose-400 p-1 transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#C7A66A]/15 text-[#C7A66A] font-medium">
                          {item.formatSize}
                        </span>
                        {item.giftBoxDetails && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#542B32]/60 text-rose-200 border border-[#542B32]">
                            Coffret Cadeau
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-[#C7A66A]/30 rounded-lg p-1 bg-[#171715]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#89877F] hover:text-[#F6F1E8]"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 text-[#F6F1E8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#89877F] hover:text-[#F6F1E8]"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm text-[#C7A66A] font-medium">
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
            <div className="p-6 border-t border-[#C7A66A]/20 bg-[#20271E]/80 backdrop-blur-md space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#89877F]" />
                  <input
                    type="text"
                    placeholder="Code Promo (ex: LEVANIA10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="w-full bg-[#171715] border border-[#C7A66A]/25 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F6F1E8] uppercase tracking-wider placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#343B2B] hover:bg-[#C7A66A] hover:text-[#171715] text-[#C7A66A] text-xs font-medium border border-[#C7A66A]/40 transition-colors"
                >
                  Appliquer
                </button>
              </form>

              {couponMessage && (
                <p className={`text-xs ${couponMessage.error ? "text-rose-400" : "text-emerald-400"}`}>
                  {couponMessage.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#C7A66A]/10 border border-[#C7A66A]/30 text-xs">
                  <span className="text-[#C7A66A] font-medium">
                    Code activé: {appliedCoupon.code} (-{appliedCoupon.discountValue}{appliedCoupon.discountType === "percent" ? "%" : " TND"})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#89877F] hover:text-rose-400 underline"
                  >
                    Retirer
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#E9DFCE]/80 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-[#F6F1E8]">{formatTND(subtotalTND)}</span>
                </div>
                {discountTND > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise</span>
                    <span>-{formatTND(discountTND)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison (Tunisie)</span>
                  <span className="text-[#F6F1E8]">
                    {deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif text-[#F6F1E8] pt-2 border-t border-[#C7A66A]/20">
                  <span className="font-normal">Total Estimé</span>
                  <span className="text-[#C7A66A] font-medium">{formatMillimes(totalMillimes)}</span>
                </div>
              </div>

              {/* Projected Luck Badge */}
              {projectedLuck > 0 && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#343B2B]/60 border border-[#C7A66A]/30 text-xs text-[#F6F1E8]">
                  <Sparkles className="w-4 h-4 text-[#C7A66A] shrink-0 animate-pulse" />
                  <span>
                    Cette commande vous rapportera{" "}
                    <strong className="text-[#C7A66A]">+{projectedLuck} Luck</strong> pour la Roue du Destin!
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3 text-center rounded-xl border border-[#C7A66A]/30 text-xs font-medium text-[#F6F1E8] hover:bg-white/5 transition-colors"
                >
                  Voir Panier
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-[2] py-3 text-center rounded-xl bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-opacity shadow-lg shadow-[#C7A66A]/20 flex items-center justify-center gap-2"
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
