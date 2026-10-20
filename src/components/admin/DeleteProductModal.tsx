"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: DeleteProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] w-full max-w-md rounded-3xl shadow-2xl border border-[#541B28]/20 p-6 sm:p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto border border-rose-200">
          <Trash2 className="w-7 h-7 text-rose-700" />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-rose-800 font-bold block mb-1">
            Suppression Définitive
          </span>
          <h3 className="font-serif text-2xl text-[#23181A] font-semibold">
            Retirer {productName} ?
          </h3>
        </div>

        <p className="text-xs text-[#5A4B4E] leading-relaxed">
          Ce flacon sera instantanément retiré du catalogue boutique, des filtres de recherche et des sélections clients.
        </p>

        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#541B28]/20 bg-white hover:bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
