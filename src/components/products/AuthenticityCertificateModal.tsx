"use client";

import React, { useEffect, useCallback, useState } from "react";
import { X, ShieldCheck, QrCode, Copy, Check, Award, Compass } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import Image from "next/image";
import { Product } from "@/types";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedProduct } from "@/lib/i18n/catalogueLocale";

interface AuthenticityCertificateModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function AuthenticityCertificateModal({
  product: rawProduct,
  isOpen,
  onClose,
}: AuthenticityCertificateModalProps) {
  const { t, locale } = useLanguage();
  const product = getLocalizedProduct(rawProduct, locale);
  const [copied, setCopied] = useState(false);

  const batchCode = `LV-2026-${product.id.slice(0, 4).toUpperCase()}-CB71`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const copyBatchCode = () => {
    navigator.clipboard.writeText(batchCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FAF7F2] border-2 border-[#C7A66A] rounded-3xl p-6 sm:p-10 shadow-2xl text-[#23181A] overflow-hidden"
      >
        {/* Decorative Luxury Inner Border */}
        <div className="absolute inset-3 border border-[#541B28]/20 rounded-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t("aria.close", "Fermer")}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#541B28] border border-[#541B28]/20 transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header / Seal */}
        <div className="text-center relative z-10 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#541B28] text-[#DFC68B] shadow-lg mb-3.5 border-2 border-[#C7A66A]/40">
            <WaveMonogram size="sm" variant="gold" />
          </div>
          <span className="font-cinzel text-[10px] uppercase tracking-grand text-[#541B28] font-bold block mb-1">
            {t("cert_modal.seal_title", "Maison Lévania • Paris • Nabeul")}
          </span>
          <h2 id="cert-modal-title" className="font-serif text-2xl sm:text-4xl text-[#541B28] font-light">
            {t("cert_modal.title", "Certificat d'Authenticité & de Traçabilité")}
          </h2>
          <p className="text-xs text-[#756B6D] max-w-md mx-auto mt-1 italic">
            {t("cert_modal.subtitle", "Registre officiel de haute parfumerie artisanale • Cueillette & Macération certifiées")}
          </p>
        </div>

        {/* Product Identity Card */}
        <div className="relative z-10 bg-white/90 rounded-2xl border border-[#541B28]/15 p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#541B28]/10">
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#756B6D] font-bold block">
                {t("cert_modal.creation_label", "Création Olfactive")}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#23181A] font-semibold">{product.name}</h3>
              <span className="font-cinzel text-[11px] text-[#541B28] font-medium tracking-luxury uppercase">{product.subtitle} • {product.collection}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#434B36]/10 text-[#434B36] border border-[#434B36]/30 font-cinzel text-[10px] uppercase tracking-luxury font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("cert_modal.verified_compliant", "Vérifié Conforme")}
              </span>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_concentration", "Concentration")}</span>
              <span className="font-serif font-bold text-[#541B28]">{t("cert_modal.spec_concentration_val", "28% Extrait Pur")}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_maceration", "Macération")}</span>
              <span className="font-semibold text-[#23181A]">{t("cert_modal.spec_maceration_val", "180 Jours en Verre Obscurci")}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_terroir", "Terroir Clé")}</span>
              <span className="font-semibold text-[#23181A]">Cap Bon, Nabeul</span>
            </div>

            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_wax", "Cire & Scellé")}</span>
              <span className="font-semibold text-[#23181A]">{t("cert_modal.spec_wax_val", "Tampon d'Artisan Manuel")}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_vintage", "Millésime")}</span>
              <span className="font-semibold text-[#23181A]">{t("cert_modal.spec_vintage_val", "Édition 2026")}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block font-bold">{t("cert_modal.spec_glass", "Flaconnage")}</span>
              <span className="font-semibold text-[#23181A]">{t("cert_modal.spec_glass_val", "Verre Haute Densité")}</span>
            </div>
          </div>
        </div>

        {/* Unique Batch Code & Security Stamp */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#541B28]/5 border border-[#541B28]/15 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#541B28]/20 flex items-center justify-center text-[#541B28] shadow-sm shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                {t("cert_modal.batch_label", "N° de Lot Sécurisé • Clé d'Authenticité")}
              </span>
              <span className="font-mono text-sm font-bold text-[#541B28] tracking-wider">
                {batchCode}
              </span>
            </div>
          </div>

          <button
            onClick={copyBatchCode}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#541B28] border border-[#541B28]/20 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{t("cert_modal.copied_btn", "Copié")}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t("cert_modal.copy_btn", "Copier le N°")}</span>
              </>
            )}
          </button>
        </div>

        {/* Master Perfumer Vow & Signature */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#541B28]/15 text-[11px] text-[#756B6D]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C7A66A]" />
            <span>{t("cert_modal.haute_parfumerie_vow", "Formulé selon les préceptes de la Haute Parfumerie")}</span>
          </div>

          <div className="text-right rtl:text-left">
            <span className="font-serif italic font-bold text-[#541B28] text-sm block">
              {t("cert_modal.atelier_title", "Atelier Lévania")}
            </span>
            <span className="text-[10px] text-[#756B6D]">{t("cert_modal.master_perfumer", "Maître Nez Parfumeur")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
