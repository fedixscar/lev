"use client";

import React, { useState, useEffect } from "react";
import {
  PromoCode,
  DurationPreset,
  calculateExpirationDate,
  generateRandomPromoCode,
  generatePromoQrDataUrl,
  saveCoupon,
} from "@/lib/coupons";
import { getAllEvents } from "@/lib/events";
import {
  X,
  Sparkles,
  QrCode,
  Calendar,
  Clock,
  Tag,
  Hash,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCouponCreated: (coupon: PromoCode) => void;
}

export function CreateCouponModal({
  isOpen,
  onClose,
  onCouponCreated,
}: CreateCouponModalProps) {
  const [codeType, setCodeType] = useState<"custom" | "random">("random");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minSpendTND, setMinSpendTND] = useState<number>(100);
  const [durationPreset, setDurationPreset] = useState<DurationPreset>("7d");
  const [customExpiresAt, setCustomExpiresAt] = useState("");
  const [usageLimitType, setUsageLimitType] = useState<"unlimited" | "single" | "custom">("single");
  const [maxUses, setMaxUses] = useState<number>(1);
  const [targetEventTitle, setTargetEventTitle] = useState("");

  const [qrPreview, setQrPreview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate initial code on modal open
  useEffect(() => {
    if (isOpen) {
      if (codeType === "random") {
        setCode(generateRandomPromoCode("LEV"));
      } else if (!code) {
        setCode("PRIVILEGE20");
      }
      setDescription("Offre Privilège Maison Lévania");
      setError(null);
    }
  }, [isOpen]);

  // Update QR Code preview whenever code changes
  useEffect(() => {
    let isCancelled = false;
    const updateQr = async () => {
      if (!code.trim()) {
        setQrPreview("");
        return;
      }
      try {
        const origin = typeof window !== "undefined" ? window.location.origin : "https://levania-parfums.com";
        const url = await generatePromoQrDataUrl(code.trim().toUpperCase(), origin);
        if (!isCancelled) {
          setQrPreview(url);
        }
      } catch {
        // Ignore
      }
    };
    updateQr();
    return () => {
      isCancelled = true;
    };
  }, [code]);

  if (!isOpen) return null;

  const handleRandomize = () => {
    const newCode = generateRandomPromoCode("LEV");
    setCode(newCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode || cleanCode.length < 3) {
      setError("Le code doit comporter au moins 3 caractères.");
      return;
    }

    if (discountValue <= 0) {
      setError("La remise doit être supérieure à 0.");
      return;
    }

    if (discountType === "percent" && discountValue > 100) {
      setError("Le pourcentage de remise ne peut excéder 100%.");
      return;
    }

    setIsGenerating(true);

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://levania-parfums.com";
      const qrDataUrl = await generatePromoQrDataUrl(cleanCode, origin);

      const expiresAt =
        durationPreset === "custom"
          ? customExpiresAt
            ? new Date(customExpiresAt).toISOString()
            : null
          : calculateExpirationDate(durationPreset);

      const computedMaxUses =
        usageLimitType === "unlimited" ? null : usageLimitType === "single" ? 1 : Math.max(1, maxUses);

      const newCoupon: PromoCode = {
        id: `promo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        code: cleanCode,
        description: description.trim() || `Remise Privilège ${cleanCode}`,
        discountType,
        discountValue,
        minSpendTND: Math.max(0, minSpendTND),
        durationPreset,
        expiresAt,
        maxUses: computedMaxUses,
        usedCount: 0,
        isActive: true,
        qrDataUrl,
        createdAt: new Date().toISOString(),
        targetEventTitle: targetEventTitle.trim() || undefined,
      };

      saveCoupon(newCoupon);
      onCouponCreated(newCoupon);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la création du code promo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const availableEvents = getAllEvents();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
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
              <QrCode className="w-5 h-5 text-[#FAF7F2]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold tracking-wide">
                Nouveau Code Promo & QR Code
              </h2>
              <p className="text-xs text-[#FAF7F2]/75">
                Générez des privilèges sur-mesure ou aléatoires avec QR scan automatique
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Code generation type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-2">
              Format du Code Promo
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => {
                  setCodeType("random");
                  setCode(generateRandomPromoCode("LEV"));
                }}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  codeType === "random"
                    ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/5 dark:bg-[#C7A66A]/10 text-[#541B28] dark:text-[#FAF7F2] font-semibold"
                    : "border-black/10 dark:border-white/10 hover:border-black/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Aléatoire Sécurisé</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
                </div>
                <p className="text-[11px] opacity-70">Ex: LEV-8G3K2M (idéal pour QR codes uniques)</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCodeType("custom");
                  if (code.startsWith("LEV-")) setCode("NOEL2026");
                }}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  codeType === "custom"
                    ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/5 dark:bg-[#C7A66A]/10 text-[#541B28] dark:text-[#FAF7F2] font-semibold"
                    : "border-black/10 dark:border-white/10 hover:border-black/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Sur-Mesure / Mémorisable</span>
                  <Tag className="w-3.5 h-3.5 text-[#C7A66A]" />
                </div>
                <p className="text-[11px] opacity-70">Ex: NOEL2026, VIP50, AIDMOUBARAK</p>
              </button>
            </div>

            {/* Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder={codeType === "random" ? "LEV-XXXXXX" : "EXEMPLE: NOEL2026"}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] font-mono font-bold tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A66A]"
                  required
                />
              </div>
              {codeType === "random" && (
                <button
                  type="button"
                  onClick={handleRandomize}
                  title="Générer un autre code"
                  className="px-3.5 py-2.5 rounded-xl border border-[#C7A66A]/40 bg-[#C7A66A]/10 hover:bg-[#C7A66A]/20 text-[#541B28] dark:text-[#FAF7F2] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Regénérer
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Discount & Min Spend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Type de Remise
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-medium focus:ring-2 focus:ring-[#C7A66A]"
              >
                <option value="percent">Pourcentage (%)</option>
                <option value="fixed">Montant Fixe (TND)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Valeur ({discountType === "percent" ? "%" : "TND"})
              </label>
              <input
                type="number"
                min="1"
                max={discountType === "percent" ? 100 : 1000}
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-semibold focus:ring-2 focus:ring-[#C7A66A]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Panier Min. (TND)
              </label>
              <input
                type="number"
                min="0"
                step="10"
                value={minSpendTND}
                onChange={(e) => setMinSpendTND(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-semibold focus:ring-2 focus:ring-[#C7A66A]"
              />
            </div>
          </div>

          {/* Section 3: Expiration Rules (Presets 1H, 1J, 3J, 7J, 30J, etc.) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C7A66A]" />
                Validité Temporelle (Date Limite)
              </label>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {(
                [
                  { id: "1h", label: "1 Heure", desc: "Flash" },
                  { id: "1d", label: "1 Jour", desc: "24h" },
                  { id: "3d", label: "3 Jours", desc: "Week-end" },
                  { id: "7d", label: "7 Jours", desc: "1 Semaine" },
                  { id: "30d", label: "30 Jours", desc: "1 Mois" },
                  { id: "unlimited", label: "Illimité", desc: "Permanent" },
                ] as { id: DurationPreset; label: string; desc: string }[]
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setDurationPreset(preset.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    durationPreset === preset.id
                      ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28] dark:bg-[#C7A66A] text-white dark:text-[#23181A] font-bold shadow-md"
                      : "border-black/10 dark:border-white/10 hover:border-black/20 text-xs"
                  }`}
                >
                  <div className="text-xs">{preset.label}</div>
                  <div className="text-[10px] opacity-75">{preset.desc}</div>
                </button>
              ))}
            </div>

            {durationPreset === "custom" && (
              <div className="mt-2">
                <label className="block text-[11px] text-[#735A60] dark:text-[#C5A48A] mb-1">
                  Sélectionnez la date et heure d'expiration :
                </label>
                <input
                  type="datetime-local"
                  value={customExpiresAt}
                  onChange={(e) => setCustomExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs"
                />
              </div>
            )}
          </div>

          {/* Section 4: Usage Limit (Single-use vs Multi) */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-2 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#C7A66A]" />
              Limite d'Utilisations (Nombre Max)
            </label>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <button
                type="button"
                onClick={() => {
                  setUsageLimitType("single");
                  setMaxUses(1);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  usageLimitType === "single"
                    ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/10 dark:bg-[#C7A66A]/15 font-semibold text-[#541B28] dark:text-[#FAF7F2]"
                    : "border-black/10 dark:border-white/10 opacity-80"
                }`}
              >
                <div className="font-bold">1 Utilisation Seule</div>
                <div className="text-[10px] opacity-75">Expire dès le premier achat</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUsageLimitType("custom");
                  if (maxUses <= 1) setMaxUses(10);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  usageLimitType === "custom"
                    ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/10 dark:bg-[#C7A66A]/15 font-semibold text-[#541B28] dark:text-[#FAF7F2]"
                    : "border-black/10 dark:border-white/10 opacity-80"
                }`}
              >
                <div className="font-bold">Nombre Limité</div>
                <div className="text-[10px] opacity-75">5, 10, 50 clients max</div>
              </button>

              <button
                type="button"
                onClick={() => setUsageLimitType("unlimited")}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  usageLimitType === "unlimited"
                    ? "border-[#541B28] dark:border-[#C7A66A] bg-[#541B28]/10 dark:bg-[#C7A66A]/15 font-semibold text-[#541B28] dark:text-[#FAF7F2]"
                    : "border-black/10 dark:border-white/10 opacity-80"
                }`}
              >
                <div className="font-bold">Illimité</div>
                <div className="text-[10px] opacity-75">Valable sans quota</div>
              </button>
            </div>

            {usageLimitType === "custom" && (
              <div className="flex items-center gap-3">
                <span className="text-xs">Nombre maximal d'utilisations autorisées :</span>
                <input
                  type="number"
                  min="2"
                  max="10000"
                  value={maxUses}
                  onChange={(e) => setMaxUses(Math.max(2, Number(e.target.value)))}
                  className="w-24 px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs font-bold"
                />
              </div>
            )}
          </div>

          {/* Section 5: Description & Linked Event */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Description / Motif
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Célébration Client VIP, Salon Carthage..."
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735A60] dark:text-[#C5A48A] mb-1.5">
                Associer à un Événement (Optionnel)
              </label>
              <select
                value={targetEventTitle}
                onChange={(e) => setTargetEventTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#201216] text-xs"
              >
                <option value="">Aucun événement particulier</option>
                {availableEvents.map((ev) => (
                  <option key={ev.id} value={ev.title}>
                    {ev.badgeText} • {ev.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 6: Live QR Code Preview Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F2EDE4] dark:from-[#201216] dark:to-[#170B0E] border border-[#C7A66A]/30 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-md border border-[#C7A66A]/40 flex items-center justify-center flex-shrink-0">
              {qrPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrPreview}
                  alt={`QR Code ${code}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <QrCode className="w-10 h-10 text-stone-300 animate-pulse" />
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-base font-bold tracking-widest text-[#541B28] dark:text-[#C7A66A]">
                  {code || "---"}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#541B28] text-white">
                  {discountType === "percent" ? `-${discountValue}%` : `-${discountValue} TND`}
                </span>
              </div>
              <p className="text-xs text-[#735A60] dark:text-[#C5A48A]">
                Scan automatique : le client scanne ce QR Code depuis son smartphone et la remise est directement appliquée dans son panier !
              </p>
              <div className="text-[11px] text-stone-500 flex flex-wrap gap-x-3 gap-y-1 justify-center sm:justify-start pt-1">
                <span>• Validité: <strong>{durationPreset.toUpperCase()}</strong></span>
                <span>• Quota: <strong>{usageLimitType === "single" ? "1 seule fois" : usageLimitType === "custom" ? `${maxUses} fois` : "Illimité"}</strong></span>
                {minSpendTND > 0 && <span>• Min: <strong>{minSpendTND} TND</strong></span>}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isGenerating || !code}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#541B28] to-[#6E2435] hover:brightness-110 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C7A66A]" />
              {isGenerating ? "Création..." : "Créer le Code Promo & QR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
