"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCart } from "@/context/CartContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
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

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<{ message: string; error: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponStatus({ message: res.message, error: !res.success });
    if (res.success) setCouponInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mb-8">
            Votre Panier Lévania
          </h1>

          {items.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-8">
              <ShoppingBag className="w-16 h-16 text-[#C7A66A] mx-auto mb-4 opacity-60" />
              <h2 className="font-serif text-2xl text-[#F6F1E8] mb-2">Votre panier est actuellement vide</h2>
              <p className="text-xs text-[#89877F] max-w-md mx-auto mb-6">
                Découvrez nos collections d&apos;exception et laissez l&apos;Onde olfactive vous guider.
              </p>
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95"
              >
                Explorer la Boutique
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Items List (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#20271E]/60 border border-[#C7A66A]/20 flex flex-col sm:flex-row gap-5 items-center justify-between"
                  >
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/40 border border-[#C7A66A]/20 shrink-0">
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-[#F6F1E8]">{item.productName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded bg-[#C7A66A]/15 text-[#C7A66A]">
                            {item.formatSize}
                          </span>
                          {item.giftBoxDetails && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#542B32] text-rose-200">
                              Coffret Cadeau
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#C7A66A] font-serif font-medium block mt-2">
                          {formatTND(item.unitPriceTND)} l&apos;unité
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 border border-[#C7A66A]/30 rounded-lg p-1 bg-[#171715]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#89877F] hover:text-[#F6F1E8]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#F6F1E8]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#89877F] hover:text-[#F6F1E8]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-lg text-[#C7A66A] font-semibold min-w-[90px] text-right">
                        {formatTND(item.unitPriceTND * item.quantity)}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#89877F] hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Projected Luck Box */}
                {projectedLuck > 0 && (
                  <div className="p-4 rounded-2xl bg-[#343B2B]/60 border border-[#C7A66A]/30 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#C7A66A] shrink-0 animate-pulse" />
                    <span className="text-xs text-[#F6F1E8]">
                      Cette commande vous attribuera <strong className="text-[#C7A66A]">+{projectedLuck} points de Luck</strong> pour la Roue du Destin (1 Luck par 10 TND).
                    </span>
                  </div>
                )}
              </div>

              {/* Order Summary (4 cols) */}
              <div className="lg:col-span-4 rounded-3xl bg-[#20271E]/80 border border-[#C7A66A]/20 p-6 backdrop-blur-xl h-fit space-y-5">
                <h3 className="font-serif text-xl text-[#F6F1E8] pb-3 border-b border-white/5">
                  Récapitulatif de Commande
                </h3>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#89877F]" />
                    <input
                      type="text"
                      placeholder="Code (ex: LEVANIA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#171715] border border-[#C7A66A]/25 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F6F1E8] uppercase placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#343B2B] hover:bg-[#C7A66A] hover:text-[#171715] text-[#C7A66A] text-xs font-semibold border border-[#C7A66A]/40 transition-colors"
                  >
                    Valider
                  </button>
                </form>

                {couponStatus && (
                  <p className={`text-xs ${couponStatus.error ? "text-rose-400" : "text-emerald-400"}`}>
                    {couponStatus.message}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#C7A66A]/10 border border-[#C7A66A]/30 text-xs">
                    <span className="text-[#C7A66A] font-medium">
                      Code {appliedCoupon.code} appliqué (-{appliedCoupon.discountValue}{appliedCoupon.discountType === "percent" ? "%" : " TND"})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-[#89877F] hover:text-rose-400 underline">
                      Retirer
                    </button>
                  </div>
                )}

                {/* Breakdown */}
                <div className="space-y-2 text-xs text-[#E9DFCE]/80 pt-3 border-t border-white/5">
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
                    <span>Frais de Livraison (Tunisie)</span>
                    <span className="text-[#F6F1E8]">{deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}</span>
                  </div>
                  <div className="pt-3 border-t border-[#C7A66A]/20 flex justify-between items-baseline text-lg font-serif text-[#F6F1E8]">
                    <span>Total Net</span>
                    <span className="text-[#C7A66A] font-semibold text-2xl">{formatMillimes(totalMillimes)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#C7A66A]/20 flex items-center justify-center gap-2"
                >
                  <span>Passer la Commande</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
