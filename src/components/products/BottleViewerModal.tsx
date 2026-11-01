"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Sparkles, Eye } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface BottleViewerModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BottleViewerModal({ product, isOpen, onClose }: BottleViewerModalProps) {
  const { t } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeAngle, setActiveAngle] = useState<number>(0); // 0 to 360 deg
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Collect available images
  const images = [
    product.images.main,
    product.images.packaging,
    ...(Array.isArray(product.images.gallery) ? product.images.gallery : []),
    product.images.lifestyle,
    product.images.bottleOnly,
  ].filter((img, idx, arr): img is string => Boolean(img) && arr.indexOf(img) === idx);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Automatic gentle rotation toggle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRotating && isOpen) {
      interval = setInterval(() => {
        setActiveAngle((prev) => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating, isOpen]);

  if (!isOpen) return null;

  const currentImage = images[activeImageIndex] || product.images.main;

  const craftPoints = [
    { title: "Verre Cristallin 120g", desc: "Poli à la flamme, transparence optique et fond de flacon épais." },
    { title: "Capot Zamak Aimanté", desc: "Métal massif brossé, fermeture magnétique au clic feutré luxueux." },
    { title: "Nébuliseur Haute Précision", desc: "Pompe micro-aérosol diffusant un nuage ultra-fin de 0.08ml." },
    { title: "Macération 90 Jours", desc: "Mûrissement prolongé en cuve inox garantissant rondeur et sillage." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0C0B0E] border border-[#DFC68B]/30 shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
          <div className="flex items-center gap-3">
            <WaveMonogram size="sm" variant="gold" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#DFC68B] font-bold">
                  Haute Parfumerie Artisanale • Studio 360° & Loupe HD
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl text-white font-medium">
                {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Visual Viewer, Right Craftsmanship Story */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full aspect-[4/5] max-h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b from-black/80 via-black/40 to-black/80 border border-white/10 flex items-center justify-center group shadow-2xl">
              {/* Studio spotlight gradient */}
              <div className="absolute inset-0 bg-radial from-[#DFC68B]/10 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Image with zoom and angle tilt */}
              <div
                className="relative w-full h-full transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${activeAngle * 0.04}deg)`,
                }}
              >
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  priority
                  unoptimized={currentImage.startsWith("data:")}
                  className="object-contain p-4"
                />
              </div>

              {/* Floating Loupe Zoom Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
                  title="Dézoomer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-[10px] text-[#DFC68B] px-1 font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
                  title="Zoomer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setActiveAngle(0);
                    setIsRotating(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* 360 Spin Toggle Button */}
              <div className="absolute top-4 left-4 z-20">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-[10px] font-cinzel uppercase tracking-luxury font-bold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-md",
                    isRotating
                      ? "bg-[#DFC68B] text-black border-[#DFC68B]"
                      : "bg-black/75 text-white/90 border-white/20 hover:border-[#DFC68B]"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRotating ? "Rotation Active" : "Rotation Studio 360°"}</span>
                </button>
              </div>
            </div>

            {/* Angle Slider */}
            <div className="w-full flex items-center gap-3 px-2">
              <span className="font-cinzel text-[10px] uppercase text-white/60 tracking-wider shrink-0">
                Angle Studio :
              </span>
              <input
                type="range"
                min="0"
                max="360"
                value={activeAngle}
                onChange={(e) => setActiveAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#DFC68B]"
              />
              <span className="font-mono text-xs text-[#DFC68B] w-10 text-right shrink-0">
                {activeAngle}°
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "relative w-14 h-16 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer bg-black/60",
                    activeImageIndex === i
                      ? "border-[#DFC68B] scale-105 shadow-md shadow-[#DFC68B]/20"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Aperçu ${i + 1}`}
                    fill
                    unoptimized={img.startsWith("data:")}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Craftsmanship & Flacon Engineering (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC68B]/10 border border-[#DFC68B]/30 text-[#DFC68B]">
                <GoldStarLozenge size={12} className="text-[#DFC68B]" />
                <span className="font-cinzel text-[10px] uppercase tracking-luxury font-bold">
                  Ingénierie & Savoir-Faire
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-light">
                Anatomie d&apos;un Flacon Lévania
              </h3>

              <p className="text-xs text-white/70 leading-relaxed font-light">
                Chaque flacon Lévania est une œuvre d&apos;art verrière façonnée pour préserver l&apos;intégrité moléculaire des essences les plus nobles de la Méditerranée et de l&apos;Orient.
              </p>

              {/* Craft Points Grid */}
              <div className="space-y-3 pt-2">
                {craftPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFC68B]/30 transition-colors"
                  >
                    <span className="font-cinzel text-xs font-bold text-[#DFC68B] block mb-0.5">
                      {pt.title}
                    </span>
                    <span className="text-[11px] text-white/80 font-light block leading-relaxed">
                      {pt.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seal & Certification Footer */}
            <div className="p-4 rounded-2xl bg-[#DFC68B]/10 border border-[#DFC68B]/20 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#DFC68B] shrink-0" />
              <div className="text-[11px]">
                <strong className="text-white font-semibold block">
                  Scellé et Poinçonné à la Main
                </strong>
                <span className="text-white/70">
                  Numéro de série gravé au laser sous le culot du flacon avec certificat numérique.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
