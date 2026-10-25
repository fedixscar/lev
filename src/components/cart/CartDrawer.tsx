"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { useCart } from "@/context/CartContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { useLanguage } from "@/context/LanguageContext";

export function CartDrawer() {
  const { t } = useLanguage();
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

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] dark:bg-[#0E0709] border-l rtl:border-l-0 rtl:border-r border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-2xl flex flex-col text-[#23181A] dark:text-[#FAF7F2]">
          {/* Header */}
          <div className="p-6 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20 flex items-center justify-between bg-white/90 dark:bg-[#180B10]/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <WaveMonogram size="xs" variant="gold" />
              <span className="font-serif text-2xl text-[#541B28] dark:text-[#DFC68B] font-normal">
                {t("cart.drawer_title", "Votre Panier")}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/20 dark:border-[#C7A66A]/30">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2] rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label={t("common.close", "Fermer")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Wave Meter */}
          <div className="px-6 py-3 bg-[#F3ECE1]/70 dark:bg-[#180B10]/70 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20 text-xs text-[#5A4B4E] dark:text-[#DCD0D3]">
            {subtotalTND >= 200 ? (
              <div className="flex items-center gap-2 text-[#434B36] font-semibold">
                <GoldStarLozenge size={13} className="text-[#C7A66A]" />
                <span>{t("cart.free_shipping_achieved", "Livraison Express Offerte partout en Tunisie !")}</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5 text-[11px]">
                  <span>{t("cart.free_shipping_prefix", "Plus que")} <strong className="text-[#541B28]">{formatTND(200 - subtotalTND)}</strong> {t("cart.free_shipping_suffix", "pour la livraison offerte")}</span>
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
              <div className="h-full flex flex-col items-center justify-center text-center text-[#756B6D] dark:text-[#A8989C] py-12">
                <div className="w-16 h-16 rounded-full border border-[#541B28]/20 dark:border-[#C7A66A]/30 flex items-center justify-center mb-4 text-[#541B28] dark:text-[#DFC68B] bg-white dark:bg-[#180B10] shadow-sm">
                  <WaveMonogram size="md" variant="burgundy" />
                </div>
                <p className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] mb-2">{t("cart.empty_title", "Votre panier est vide")}</p>
                <p className="text-sm max-w-xs text-[#756B6D] dark:text-[#A8989C] mb-6">
                  {t("cart.empty_desc", "Explorez nos créations olfactives artisanales et laissez-vous transporter.")}
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#541B28] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#66182C] transition-all shadow-md"
                >
                  {t("cart.explore_btn", "Découvrir la Collection")}
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 hover:border-[#541B28]/35 dark:hover:border-[#C7A66A]/45 transition-all shadow-sm"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#0E0709] shrink-0 border border-[#541B28]/15 dark:border-[#C7A66A]/20">
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
                        <h4 className="font-serif text-base text-[#23181A] dark:text-[#FAF7F2] font-medium leading-tight">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#756B6D] dark:text-[#A8989C] hover:text-rose-600 p-1 transition-colors"
                          aria-label={t("cart.delete_title", "Supprimer")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-bold">
                          {item.formatSize}
                        </span>
                        {item.giftBoxDetails && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#0E0709] text-[#852538] dark:text-[#EACCA0] border border-[#852538]/30 dark:border-[#C7A66A]/30 font-medium">
                            {t("cart.order_gift_box", "Coffret Cadeau")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-[#541B28]/25 dark:border-[#C7A66A]/30 rounded-lg p-1 bg-[#FAF7F2] dark:bg-[#0E0709]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B]"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-[#23181A] dark:text-[#FAF7F2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B]"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm text-[#541B28] dark:text-[#DFC68B] font-bold">
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
            <div className="p-6 border-t border-[#541B28]/20 dark:border-[#C7A66A]/25 bg-white dark:bg-[#180B10] shadow-lg space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D] dark:text-[#A8989C]" />
                  <input
                    type="text"
                    placeholder={t("cart.coupon_placeholder", "Code Promo (ex: LEVANIA10)")}
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/25 dark:border-[#C7A66A]/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[#23181A] dark:text-[#FAF7F2] uppercase tracking-wider placeholder:text-[#756B6D] dark:placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  {t("cart.coupon_apply", "Appliquer")}
                </button>
              </form>

              {couponMessage && (
                <p className={`text-xs ${couponMessage.error ? "text-rose-600" : "text-emerald-700 dark:text-emerald-400"}`}>
                  {couponMessage.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-xs">
                  <span className="text-[#541B28] dark:text-[#DFC68B] font-bold">
                    {t("cart.coupon_active", "Code activé :")} {appliedCoupon.code} (-{appliedCoupon.discountValue}{appliedCoupon.discountType === "percent" ? "%" : " TND"})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-rose-600 underline cursor-pointer"
                  >
                    {t("cart.coupon_remove", "Retirer")}
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#756B6D] dark:text-[#A8989C] pt-2 border-t border-neutral-100 dark:border-[#C7A66A]/15">
                <div className="flex justify-between">
                  <span>{t("cart.subtotal", "Sous-total")}</span>
                  <span className="text-[#23181A] dark:text-[#FAF7F2] font-medium">{formatTND(subtotalTND)}</span>
                </div>
                {discountTND > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>{t("cart.coupon_discount", "Remise")}</span>
                    <span>-{formatTND(discountTND)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t("cart.shipping", "Livraison (Tunisie)")}</span>
                  <span className="text-[#23181A] dark:text-[#FAF7F2] font-medium">
                    {deliveryFeeTND === 0 ? t("cart.free", "Offerte") : formatTND(deliveryFeeTND)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif text-[#23181A] dark:text-[#FAF7F2] pt-2 border-t border-[#541B28]/20 dark:border-[#C7A66A]/25">
                  <span className="font-normal">{t("cart.total", "Total Estimé")}</span>
                  <span className="text-[#541B28] dark:text-[#DFC68B] font-bold text-lg">{formatMillimes(totalMillimes)}</span>
                </div>
              </div>

              {/* Projected Luck Badge */}
              {projectedLuck > 0 && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/25 text-xs text-[#23181A] dark:text-[#FAF7F2]">
                  <GoldStarLozenge size={13} className="text-[#C7A66A] shrink-0" />
                  <span>
                    {t("product.luck_points_prefix", "Cette commande vous offre")}{" "}
                    <strong className="text-[#541B28] dark:text-[#DFC68B]">+{projectedLuck} points</strong> {t("cart.luck_reward_suffix", "pour la Roue Cadeau !")}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3 text-center rounded-xl border border-[#541B28]/30 dark:border-[#C7A66A]/30 text-xs font-semibold text-[#541B28] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#1E0D15] transition-colors"
                >
                  {t("nav.cart", "Voir Panier")}
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-[2] py-3 text-center rounded-xl bg-[#541B28] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#66182C] transition-colors shadow-lg shadow-[#541B28]/20 flex items-center justify-center gap-2"
                >
                  <span>{t("cart.checkout_btn", "Commander")}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
