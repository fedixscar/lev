"use client";

import React from "react";
import { Trash2 } from "lucide-react";

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
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] dark:bg-[#180B10] w-full max-w-md rounded-3xl shadow-2xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-8 text-center space-y-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900">
          <Trash2 className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-rose-800 dark:text-rose-400 font-bold block mb-1">
            Suppression Définitive
          </span>
          <h3 className="font-serif text-2xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">
            Retirer {productName} ?
          </h3>
        </div>

        <p className="text-xs text-[#5A4B4E] dark:text-[#C5A48A] leading-relaxed">
          Ce flacon sera instantanément retiré du catalogue boutique, des filtres de recherche et des sélections clients.
        </p>

        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 bg-white dark:bg-[#201016] hover:bg-[#FAF7F2] dark:hover:bg-[#2A141D] text-[#541B28] dark:text-[#DFC68B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
