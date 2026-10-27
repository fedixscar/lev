"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SeasonalEvent,
  VisualEffectType,
  EffectIntensity,
  saveEvent,
} from "@/lib/events";
import { getAllCoupons } from "@/lib/coupons";
import {
  X,
  Sparkles,
  Snowflake,
  Flower2,
  Stars,
  Ban,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

interface EditEventModalProps {
  event: SeasonalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (event: SeasonalEvent) => void;
}

export function EditEventModal({
  event,
  isOpen,
  onClose,
  onSaved,
}: EditEventModalProps) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [themeColor, setThemeColor] = useState("#93C5FD");
  const [visualEffect, setVisualEffect] = useState<VisualEffectType>("snow");
  const [effectIntensity, setEffectIntensity] = useState<EffectIntensity>("festive");
  const [isActive, setIsActive] = useState(true);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discountHighlight, setDiscountHighlight] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (event) {
        setTitle(event.title);
        setTagline(event.tagline);
        setDescription(event.description);
        setBadgeText(event.badgeText);
        setThemeColor(event.themeColor);
        setVisualEffect(event.visualEffect);
        setEffectIntensity(event.effectIntensity);
        setIsActive(event.isActive);
        setShowTopBanner(event.showTopBanner);
        setPromoCode(event.promoCode || "");
        setDiscountHighlight(event.discountHighlight || "");
      } else {
        // Create new preset
        setTitle("Nouvel Événement Saisonnier");
        setTagline("Une célébration d'exception chez Lévania");
        setDescription("Profitez de nos offres exclusives et de créations olfactives rares.");
        setBadgeText("Édition Limitée");
        setThemeColor("#93C5FD");
        setVisualEffect("snow");
        setEffectIntensity("festive");
        setIsActive(false);
        setShowTopBanner(true);
        setPromoCode("NOEL2026");
        setDiscountHighlight("-20% Exceptionnel");
      }
    }
  }, [isOpen, event]);

  // Mini canvas preview for selected effect
  useEffect(() => {
    if (!isOpen) return;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = canvas.offsetWidth || 300);
    const h = (canvas.height = canvas.offsetHeight || 120);

    const particles: any[] = [];
    const count = effectIntensity === "festive" ? 45 : effectIntensity === "subtle" ? 15 : 25;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.5 + 1.2,
        speedY: Math.random() * 1.0 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      if (visualEffect !== "none") {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.swayOffset += 0.02;
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.swayOffset) * 0.5;

          if (p.y > h + 5) p.y = -5;
          if (p.x > w + 5) p.x = -5;
          if (p.x < -5) p.x = w + 5;

          if (visualEffect === "snow") {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(224, 242, 254, 0.9)";
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#93C5FD";
            ctx.fill();
          } else if (visualEffect === "petals") {
            ctx.save();
            ctx.translate(p.x, p.y);
            p.rotation += 0.015;
            ctx.rotate(p.rotation);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 1.5, p.radius * 0.7, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(244, 114, 182, 0.85)";
            ctx.fill();
            ctx.restore();
          } else if (visualEffect === "stardust") {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.fillStyle = "rgba(199, 166, 106, 0.9)";
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#C7A66A";
            ctx.beginPath();
            ctx.moveTo(0, -p.radius * 1.2);
            ctx.lineTo(p.radius * 0.4, 0);
            ctx.lineTo(0, p.radius * 1.2);
            ctx.lineTo(-p.radius * 0.4, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen, visualEffect, effectIntensity]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SeasonalEvent = {
      id: event?.id || `event-${Date.now()}`,
      slug:
        event?.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      badgeText: badgeText.trim() || "Événement",
      themeColor,
      visualEffect,
      effectIntensity,
      isActive,
      showTopBanner,
      promoCode: promoCode.trim() || undefined,
      discountHighlight: discountHighlight.trim() || undefined,
      startDate: event?.startDate || new Date().toISOString(),
      endDate: event?.endDate || null,
      createdAt: event?.createdAt || new Date().toISOString(),
      featuredProductIds: event?.featuredProductIds || ["1", "4"],
    };

    saveEvent(updated);
    onSaved(updated);
    onClose();
  };

  const existingCoupons = getAllCoupons();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#160D10] text-[#23181A] dark:text-[#FAF7F2] rounded-2xl border border-[#C7A66A]/30 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#541B28] to-[#3B111A] text-white px-6 py-5 flex items-center justify-between border-b border-[#C7A66A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C7A66A]/20 border border-[#C7A66A]/50 flex items-center justify-center text-[#C7A66A]">
              <Sparkles className="w-5 h-5 text-[#FAF7F2]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wide">
                {event ? "Modifier la Campagne Événementielle" : "Nouvel Événement Saisonnier"}
              </h2>
              <p className="text-xs text-[#FAF7F2]/75">
                Activez des effets visuels (neige, pétales, étoiles) et des bannières festives
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Active status toggle */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#541B28]/10 via-[#C7A66A]/10 to-transparent border border-[#C7A66A]/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-[#541B28] dark:text-[#C7A66A] flex items-center gap-2">
                <span>Statut de l'Événement :</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-stone-500/20 text-stone-500"}`}>
                  {isActive ? "Actif sur le site" : "En pause"}
                </span>
              </div>
              <p className="text-xs text-[#735A60] dark:text-[#C5A48A]">
                {isActive
                  ? "Les effets visuels et la bannière sont visibles par tous les visiteurs."
                  : "L'événement est désactivé et n'apparaît pas sur la boutique."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isActive ? "bg-[#541B28] dark:bg-[#C7A66A]" : "bg-stone-300 dark:bg-stone-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isActive ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Visual Effect Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-2">
              Effet Visuel Féerique sur tout le site
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "snow" as const, label: "Flocons de Neige", icon: Snowflake, desc: "Fin d'année & Hiver" },
                { id: "petals" as const, label: "Pétales de Jasmin", icon: Flower2, desc: "Printemps floral" },
                { id: "stardust" as const, label: "Poussière Dorée", icon: Stars, desc: "Nuits d'Orient & Aïd" },
                { id: "none" as const, label: "Aucun Effet", icon: Ban, desc: "Bannière simple" },
              ].map((opt) => {
                const Icon = opt.icon;
                const selected = visualEffect === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVisualEffect(opt.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selected
                        ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28] dark:bg-[#C7A66A] text-white dark:text-[#23181A] font-bold shadow-md"
                        : "border-black/10 dark:border-white/10 hover:border-black/20 text-xs"
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1.5" />
                    <div className="text-xs">{opt.label}</div>
                    <div className="text-[10px] opacity-75">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Animation Preview Box */}
          <div className="rounded-xl overflow-hidden border border-[#C7A66A]/40 bg-[#160D10] relative p-3">
            <div className="flex items-center justify-between text-[11px] text-white/80 font-mono mb-1 z-10 relative">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
                Aperçu Direct de l&apos;Effet
              </span>
              <span className="uppercase text-[#C7A66A] font-bold">{visualEffect}</span>
            </div>
            <canvas
              ref={previewCanvasRef}
              className="w-full h-24 rounded-lg bg-black/40 pointer-events-none"
            />
            {visualEffect === "none" && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">
                Effet visuel désactivé
              </div>
            )}
          </div>

          {/* Intensity & Theme Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Intensité des Particules
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["subtle", "medium", "festive"] as EffectIntensity[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setEffectIntensity(lvl)}
                    className={`py-2 px-1 text-xs rounded-xl border text-center uppercase tracking-wider font-semibold transition-all ${
                      effectIntensity === lvl
                        ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/10 dark:bg-[#C7A66A]/20 text-[#541B28] dark:text-[#FAF7F2]"
                        : "border-black/10 dark:border-white/10 opacity-70"
                    }`}
                  >
                    {lvl === "subtle" ? "Subtil" : lvl === "medium" ? "Modéré" : "Féerique"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Badge Saisonnier
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="Ex: Hiver Féerique, Printemps..."
                className="w-full px-3 py-2 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-semibold"
                required
              />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Titre de l'Événement
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Féérie de Fin d'Année 2026"
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Sous-titre / Slogan
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Ex: L'élégance givrée des grands soirs d'hiver"
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs"
              />
            </div>
          </div>

          {/* Promo code association & top banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Code Promo Associé (Optionnel)
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Ex: NOEL2026"
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] font-mono text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Accroche Remise Bandeau
              </label>
              <input
                type="text"
                value={discountHighlight}
                onChange={(e) => setDiscountHighlight(e.target.value)}
                placeholder="Ex: -20% avec le code NOEL2026"
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs"
              />
            </div>
          </div>

          {/* Toggle Top Banner */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="topBannerToggle"
              checked={showTopBanner}
              onChange={(e) => setShowTopBanner(e.target.checked)}
              className="w-4 h-4 rounded text-[#541B28] focus:ring-[#C7A66A]"
            />
            <label htmlFor="topBannerToggle" className="text-xs font-medium cursor-pointer">
              Afficher le bandeau festive en haut de toutes les pages avec bouton de copie 1-clic
            </label>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#541B28] to-[#6E2435] hover:brightness-110 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C7A66A]" />
              Sauvegarder l'Événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
