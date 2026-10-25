"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCart } from "@/context/CartContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotalTND,
    discountTND,
    deliveryFeeTND,
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.22} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-pill mb-4 inline-flex items-center gap-2.5">
            <GoldStarLozenge size={12} className="text-[#C7A66A]" />
            <span className="font-cinzel text-[10px] sm:text-[11px] tracking-grand uppercase text-[#541B28] font-bold">
              Votre Sélection Haute Parfumerie
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light mb-12 sm:mb-14">
            Votre Panier Lévania
          </h1>

          {items.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-white border border-[#541B28]/15 p-8 sm:p-14 shadow-sm">
              <ShoppingBag className="w-16 h-16 text-[#541B28] mx-auto mb-4 opacity-50" />
              <h2 className="font-serif text-2xl sm:text-3xl text-[#23181A] mb-2 font-light">Votre panier est actuellement vide</h2>
              <p className="text-sm text-[#756B6D] max-w-md mx-auto mb-8 font-light">
                Découvrez nos collections d&apos;exception et laissez l&apos;Onde olfactive vous guider vers votre sillage idéal.
              </p>
              <Link
                href="/shop"
                className="inline-block px-9 py-4 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all shadow-xl shadow-[#541B28]/20"
              >
                Explorer la Boutique
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Items List (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-center justify-between"
                  >
                    <div className="flex gap-5 items-center w-full sm:w-auto">
                      <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#541B28]/10 shrink-0 shadow-inner">
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-[#23181A] font-medium">{item.productName}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="font-cinzel text-[10px] tracking-luxury uppercase px-3 py-1 rounded-full bg-[#541B28]/10 text-[#541B28] font-bold">
                            {item.formatSize}
                          </span>
                          {item.giftBoxDetails && (
                            <span className="font-cinzel text-[10px] tracking-luxury uppercase px-3 py-1 rounded-full bg-[#FAF7F2] text-[#852538] font-bold border border-[#852538]/20">
                              Coffret Cadeau
                            </span>
                          )}
                        </div>
                        <span className="font-cinzel text-xs text-[#541B28] font-bold tracking-luxury block mt-2.5">
                          {formatTND(item.unitPriceTND)} l&apos;unité
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 border border-[#541B28]/20 rounded-xl p-1 bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#756B6D] hover:text-[#541B28] hover:bg-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-cinzel text-xs font-bold px-2 text-[#23181A]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#756B6D] hover:text-[#541B28] hover:bg-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-xl text-[#541B28] font-medium min-w-[100px] text-right">
                        {formatTND(item.unitPriceTND * item.quantity)}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#756B6D] hover:text-rose-600 transition-colors"
                        title="Supprimer du panier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Projected Luck Box */}
                {projectedLuck > 0 && (
                  <div className="p-5 rounded-2xl bg-[#541B28]/8 border border-[#541B28]/20 flex items-center gap-3.5">
                    <GoldStarLozenge size={18} className="text-[#C7A66A] shrink-0" />
                    <span className="text-xs sm:text-sm text-[#23181A] font-light">
                      Cette commande vous attribuera <strong className="font-cinzel text-[#541B28] font-bold">+{projectedLuck} points de Luck</strong> pour la Roue du Destin (1 Luck par 10 TND).
                    </span>
                  </div>
                )}
              </div>

              {/* Order Summary (4 cols) */}
              <div className="lg:col-span-4 rounded-3xl bg-white border border-[#541B28]/20 p-7 shadow-xl h-fit space-y-6">
                <h3 className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold pb-4 border-b border-[#541B28]/15">
                  Récapitulatif de Commande
                </h3>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                    <input
                      type="text"
                      placeholder="Code privilège"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#23181A] uppercase placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[10px] tracking-luxury uppercase font-bold transition-colors"
                  >
                    Valider
                  </button>
                </form>

                {couponStatus && (
                  <p className={`text-xs ${couponStatus.error ? "text-rose-600" : "text-emerald-600"} font-medium`}>
                    {couponStatus.message}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#541B28]/10 border border-[#541B28]/20 text-xs">
                    <span className="text-[#541B28] font-bold">
                      Code {appliedCoupon.code} appliqué (-{appliedCoupon.discountValue}{appliedCoupon.discountType === "percent" ? "%" : " TND"})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-[#756B6D] hover:text-rose-600 underline">
                      Retirer
                    </button>
                  </div>
                )}

                {/* Breakdown */}
                <div className="space-y-3 text-xs text-[#5A4B4E] pt-4 border-t border-[#541B28]/10">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span className="text-[#23181A] font-semibold">{formatTND(subtotalTND)}</span>
                  </div>
                  {discountTND > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Remise</span>
                      <span>-{formatTND(discountTND)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Frais de Livraison (Tunisie)</span>
                    <span className="text-[#23181A] font-semibold">{deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}</span>
                  </div>
                  <div className="pt-4 border-t border-[#541B28]/15 flex justify-between items-baseline text-lg font-serif text-[#23181A]">
                    <span>Total Net</span>
                    <span className="text-[#541B28] font-bold text-2xl">{formatMillimes(totalMillimes)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury shadow-xl shadow-[#541B28]/25 transition-all flex items-center justify-center gap-2.5 active:scale-98"
                >
                  <span>Passer la Commande</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A66A]" />
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
