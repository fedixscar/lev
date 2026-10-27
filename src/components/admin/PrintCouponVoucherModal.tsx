"use client";

import React, { useRef } from "react";
import { PromoCode, getRemainingTimeLabel } from "@/lib/coupons";
import { X, Printer, Sparkles, Check, Gift } from "lucide-react";

interface PrintCouponVoucherModalProps {
  coupon: PromoCode | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrintCouponVoucherModal({
  coupon,
  isOpen,
  onClose,
}: PrintCouponVoucherModalProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen || !coupon) return null;

  const handlePrint = () => {
    window.print();
  };

  const remaining = getRemainingTimeLabel(coupon);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#140C0E] text-[#23181A] dark:text-[#FAF7F2] rounded-3xl border border-[#C7A66A]/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar (Hidden on print) */}
        <div className="print:hidden bg-[#1E0F14] text-white px-6 py-4 flex items-center justify-between border-b border-[#C7A66A]/30">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#C7A66A]" />
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase text-[#FAF7F2]">
              Bon Privilège Haute Parfumerie
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#DFBA73] text-[#23181A] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:brightness-105 transition-all"
            >
              <Printer className="w-4 h-4" />
              Imprimer / Exporter PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Luxury Voucher Body */}
        <div className="p-6 sm:p-10">
          <div
            ref={cardRef}
            className="relative border-4 border-double border-[#C7A66A] bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F5EFE6] dark:from-[#1E1115] dark:via-[#170C0F] dark:to-[#0D0608] rounded-2xl p-6 sm:p-8 shadow-xl text-[#23181A] dark:text-[#FAF7F2] overflow-hidden"
          >
            {/* Background filigree watermark */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#C7A66A]/10 pointer-events-none blur-2xl" />
            <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-[#541B28]/10 pointer-events-none blur-2xl" />

            {/* Top Brand Header */}
            <div className="text-center space-y-1 mb-6 border-b border-[#C7A66A]/30 pb-5">
              <div className="inline-flex items-center gap-2 text-[#C7A66A] text-xs tracking-[0.3em] font-semibold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Maison de Haute Parfumerie
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-widest text-[#541B28] dark:text-[#FAF7F2]">
                LÉVANIA
              </h1>
              <p className="text-[11px] font-mono tracking-widest text-[#735A60] dark:text-[#C5A48A] uppercase">
                Tunis • Carthage • Paris • Sillage d&apos;Élite
              </p>
            </div>

            {/* Voucher Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Left Details */}
              <div className="sm:col-span-2 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#541B28] text-[#FAF7F2] border border-[#C7A66A]/40 shadow-sm">
                  {coupon.targetEventTitle || "Privilège Exclusif"}
                </span>

                <div>
                  <div className="text-xs uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A]">
                    Avantage Accordé
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#541B28] dark:text-[#C7A66A] tracking-tight">
                    {coupon.discountType === "percent"
                      ? `-${coupon.discountValue}% DE REMISE`
                      : `-${coupon.discountValue.toFixed(3)} TND DE REMISE`}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#735A60] dark:text-[#C5A48A] leading-relaxed">
                  {coupon.description}
                </p>

                {/* Promo Code Box */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] font-semibold">
                    Code Privilège à appliquer :
                  </div>
                  <div className="inline-block mt-1 px-4 py-2 rounded-xl bg-white dark:bg-[#2A161C] border-2 border-dashed border-[#C7A66A] font-mono text-xl sm:text-2xl font-black tracking-widest text-[#541B28] dark:text-[#FAF7F2] shadow-inner select-all">
                    {coupon.code}
                  </div>
                </div>

                {/* Validity terms */}
                <div className="text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5 pt-2">
                  <div>• Validité : <strong>{remaining}</strong></div>
                  {coupon.minSpendTND > 0 && (
                    <div>• Minimum de commande : <strong>{coupon.minSpendTND} TND</strong></div>
                  )}
                  {coupon.maxUses && (
                    <div>• Utilisation : <strong>{coupon.maxUses === 1 ? "Usage unique (1 seule utilisation)" : `Limité à ${coupon.maxUses} utilisations`}</strong></div>
                  )}
                </div>
              </div>

              {/* Right QR Code */}
              <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#201216] rounded-2xl border border-[#C7A66A]/40 shadow-md">
                {coupon.qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coupon.qrDataUrl}
                    alt={`QR ${coupon.code}`}
                    className="w-36 h-36 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center text-xs text-stone-400">
                    QR non disponible
                  </div>
                )}
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#541B28] dark:text-[#C7A66A] block">
                    Scannez & Commandez
                  </span>
                  <span className="text-[9px] text-stone-400 block leading-tight">
                    Remise appliquée automatiquement
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Authenticity Seal */}
            <div className="mt-8 pt-4 border-t border-[#C7A66A]/20 flex flex-wrap items-center justify-between text-[10px] text-stone-500 dark:text-stone-400 gap-2">
              <span className="font-mono">ID: {coupon.id.toUpperCase()}</span>
              <span className="italic">Présentable en boutique officielle ou sur levania-parfums.com</span>
              <span className="font-serif font-bold text-[#541B28] dark:text-[#C7A66A]">
                ⚜ LÉVANIA SIGNATURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
