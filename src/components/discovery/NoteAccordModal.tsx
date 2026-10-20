"use client";

import React, { useEffect, useCallback } from "react";
import { X, MapPin, Droplets, Clock, ShieldCheck } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { getOlfactoryNoteDetail } from "@/lib/olfactoryNotes";
import { WaveMonogram } from "@/components/brand/WaveMonogram";

interface NoteAccordModalProps {
  note: string | null;
  layer: "tête" | "cœur" | "fond" | null;
  onClose: () => void;
}

export function NoteAccordModal({ note, layer, onClose }: NoteAccordModalProps) {
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (note) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [note, handleKeyDown]);

  if (!note) return null;

  const detail = getOlfactoryNoteDetail(note);

  const layerLabel =
    layer === "tête"
      ? "Note de Tête &bull; L'Éveil (Première Impression)"
      : layer === "cœur"
      ? "Note de Cœur &bull; L'Âme du Sillage (Signature Centrale)"
      : layer === "fond"
      ? "Note de Fond &bull; L'Empreinte (Tenue Inoubliable)"
      : "Accord d'Exception";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#541B28]/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#23181A] overflow-hidden"
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#C7A66A]/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-[#541B28]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer le détail de l'accord"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#541B28] border border-[#541B28]/20 transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28] text-[#FAF7F2] font-cinzel text-[10px] uppercase tracking-luxury font-bold">
            <GoldStarLozenge size={10} className="text-[#DFC68B]" />
            <span dangerouslySetInnerHTML={{ __html: layerLabel }} />
          </div>
          <span className="font-cinzel text-[10px] px-3 py-1.5 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/40 text-[#541B28] font-bold uppercase tracking-luxury">
            {detail.family}
          </span>
        </div>

        {/* Note Title & Seal */}
        <div className="flex items-start gap-4 mb-5">
          <WaveMonogram size="sm" variant="gold" withSeal />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#756B6D] font-mono block">
              Matière Première &bull; Haute Parfumerie
            </span>
            <h3 id="note-modal-title" className="font-serif text-2xl sm:text-3xl text-[#541B28] font-semibold">
              {detail.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed mb-6 bg-white/80 p-3.5 rounded-xl border border-[#541B28]/10">
          {detail.description}
        </p>

        {/* Information Grid */}
        <div className="space-y-3">
          {/* Terroir / Origin */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
            <div className="p-2 rounded-lg bg-[#541B28]/10 text-[#541B28] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                Terroir d&apos;Origine
              </span>
              <span className="text-xs font-semibold text-[#23181A]">{detail.origin}</span>
            </div>
          </div>

          {/* Extraction Method */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
            <div className="p-2 rounded-lg bg-[#C7A66A]/20 text-[#541B28] shrink-0">
              <Droplets className="w-4 h-4 text-[#541B28]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                Méthode d&apos;Extraction
              </span>
              <span className="text-xs text-[#23181A]">{detail.extraction}</span>
            </div>
          </div>

          {/* Holding Time & Sillage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
              <Clock className="w-4 h-4 text-[#541B28] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#756B6D] font-bold block">
                  Tenue Active
                </span>
                <span className="text-xs font-bold text-[#541B28]">{detail.holdingTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
              <ShieldCheck className="w-4 h-4 text-[#434B36] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#756B6D] font-bold block">
                  Harmonie Onde
                </span>
                <span className="text-xs font-bold text-[#434B36]">{detail.resonance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-[#541B28]/15 flex items-center justify-between">
          <span className="text-[10px] text-[#756B6D] italic">
            Maison Lévania &bull; Alchimie Méditerranéenne
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
