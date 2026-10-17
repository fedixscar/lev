"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, Flame, Crown, ShieldAlert, Copy, Check } from "lucide-react";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useNotification } from "@/context/NotificationContext";
import { WheelSpinRecord } from "@/types";
import { cn } from "@/lib/utils";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { WaveCanvas } from "@/components/brand/WaveCanvas";

export function WheelOfChance() {
  const { luckBalance, currentTier, spinWheel, isSpinning, spinHistory } = useLoyalty();
  const { showToast } = useNotification();

  const [activeResult, setActiveResult] = useState<WheelSpinRecord | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Wheel slices labels for visual presentation in authentic brand colors
  const slices = [
    { label: "Points Fidélité", color: "#541B28" },
    { label: "Coupon -10%", color: "#7A263B" },
    { label: "Échantillon Luxe", color: "#434B36" },
    { label: "Bon d'Achat", color: "#66182C" },
    { label: "Coupon -20%", color: "#7A263B" },
    { label: "Flacon Offert", color: "#C7A66A" },
    { label: "Coffret Cadeau", color: "#541B28" },
    { label: "Double XP", color: "#434B36" },
  ];

  const handleLaunchSpin = async () => {
    if (luckBalance < 1) {
      showToast(
        "Solde de Luck insuffisant",
        "Passez commande sur le site pour accumuler de la Luck (1 Luck par 10 TND dépensés).",
        "error"
      );
      return;
    }

    try {
      setAnimating(true);
      // Determine outcome from server / loyalty context first
      const result = await spinWheel();

      // Calculate dramatic spin rotation (e.g. 5 full rotations + random angle offset)
      const extraRotations = 360 * 6;
      const sliceAngle = 360 / slices.length;
      const targetAngle = Math.floor(Math.random() * slices.length) * sliceAngle;
      const finalDeg = rotationDegree + extraRotations + targetAngle;
      setRotationDegree(finalDeg);

      // Reveal after animation duration (4.5s)
      setTimeout(() => {
        setAnimating(false);
        setActiveResult(result);

        // Confetti celebration
        try {
          confetti({
            particleCount: result.tier === "Admin Wave" ? 250 : result.tier === "Royal Wave" ? 150 : 80,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#541B28", "#C7A66A", "#7A263B", "#FAF7F2"],
          });
        } catch {
          // ignore confetti if canvas unsupported
        }

        showToast(
          "Récompense Lévania Révélée !",
          `${result.rewardLabel} (${result.tier})`,
          "luxury"
        );
      }, 4500);
    } catch (err: unknown) {
      setAnimating(false);
      showToast("Erreur", err instanceof Error ? err.message : "Erreur de lancement", "error");
    }
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 3000);
    showToast("Code copié", code, "success");
  };

  // Tier styling theme adapted for ivory, burgundy and gold
  const tierTheme = {
    "Normal Wave": {
      name: "Onde Initiale (1–100 Luck)",
      border: "border-[#541B28]/20 shadow-sm",
      accent: "text-[#541B28]",
      bg: "bg-white",
      icon: Sparkles,
    },
    "Fire Wave": {
      name: "Onde Ardente (101–1,000 Luck)",
      border: "border-[#852538] shadow-[0_0_25px_rgba(133,37,56,0.15)]",
      accent: "text-[#852538]",
      bg: "bg-gradient-to-r from-white via-rose-50/50 to-white",
      icon: Flame,
    },
    "Royal Wave": {
      name: "Onde Royale (1,001–7,776 Luck)",
      border: "border-[#C7A66A] shadow-[0_0_35px_rgba(199,166,106,0.25)]",
      accent: "text-[#541B28]",
      bg: "bg-gradient-to-r from-white via-amber-50/50 to-white",
      icon: Crown,
    },
    "Admin Wave": {
      name: "Onde Impériale Suprême — Sceau 7,777",
      border: "border-[#DFC68B] shadow-[0_0_50px_rgba(223,198,139,0.35)]",
      accent: "text-[#DFC68B]",
      bg: "bg-gradient-to-r from-[#3B121C] via-[#541B28] to-[#3B121C] text-[#FAF7F2]",
      icon: ShieldAlert,
    },
  };

  const currentTheme = currentTier ? tierTheme[currentTier] : tierTheme["Normal Wave"];
  const TierIcon = currentTheme.icon;

  return (
    <div className="relative py-12 max-w-5xl mx-auto px-4">
      {/* Tier Status Banner */}
      <div
        className={cn(
          "mb-12 p-6 rounded-3xl border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 shadow-sm",
          currentTheme.bg,
          currentTheme.border
        )}
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#541B28] border border-[#C7A66A]/40 flex items-center justify-center text-[#DFC68B] shadow-md shrink-0">
            <TierIcon className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
              Votre Vague Olfactive Active
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
              {currentTheme.name}
            </h2>
            <p className="text-xs opacity-80 mt-1">
              Solde Actuel: <strong className="text-[#541B28] text-sm font-bold">{luckBalance} Luck</strong> &bull; Cap Suprême: 7,777
            </p>
          </div>
        </div>

        {/* Tier Milestones Progress */}
        <div className="w-full md:w-auto flex flex-col gap-2 min-w-[280px]">
          <div className="flex justify-between text-[11px] text-[#756B6D] font-medium">
            <span>Initiale (1)</span>
            <span>Ardente (101)</span>
            <span>Royale (1001)</span>
            <span>Impériale (7777)</span>
          </div>
          <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden p-0.5 border border-[#541B28]/20">
            <div
              className="h-full bg-gradient-to-r from-[#541B28] via-[#852538] to-[#C7A66A] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (luckBalance / 7777) * 100)}%` }}
            />
          </div>
          <div className="text-right text-[10px] text-[#541B28] font-bold">
            {luckBalance >= 7777 ? "Palier Exceptionnel Atteint !" : `Plus que ${7777 - luckBalance} Luck pour l'Onde Impériale`}
          </div>
        </div>
      </div>

      {/* The Wheel Centerpiece */}
      <div className="flex flex-col items-center justify-center my-8 relative">
        {/* Liquid Wave Atmosphere Halo behind the Wheel */}
        <div className="absolute -inset-8 rounded-full opacity-35 pointer-events-none overflow-hidden blur-md">
          <WaveCanvas
            expression={
              currentTier === "Admin Wave"
                ? "intense"
                : currentTier === "Royal Wave"
                ? "signature"
                : "soft"
            }
            interactive={false}
            height="100%"
          />
        </div>

        <div className="relative w-80 h-80 sm:w-96 sm:h-96 z-10">
          {/* Wheel Outer Border with Gold Bezel */}
          <div className="absolute inset-0 rounded-full border-4 border-[#C7A66A]/40 shadow-2xl p-2 bg-white" />

          {/* Indicator Arrow at Top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-[#541B28] filter drop-shadow-[0_2px_8px_rgba(84,27,40,0.5)]" />
          </div>

          {/* Rotating Wheel Disk */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[4500ms] ease-[cubic-bezier(0.15,0.9,0.2,1)]"
            style={{ transform: `rotate(${rotationDegree}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {slices.map((slice, i) => {
                const angle = 360 / slices.length;
                const startAngle = i * angle;
                const endAngle = (i + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                return (
                  <g key={i}>
                    <path
                      d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                      fill={slice.color}
                      stroke="#FAF7F2"
                      strokeWidth="0.8"
                    />
                    <text
                      x="50"
                      y="16"
                      fill="#FAF7F2"
                      fontSize="3.8"
                      fontFamily="serif"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                      className="select-none pointer-events-none"
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub Button: Royal Monogram Medallion */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={handleLaunchSpin}
              disabled={isSpinning || animating || luckBalance < 1}
              className={cn(
                "pointer-events-auto w-24 h-24 rounded-full border-2 border-[#C7A66A] shadow-2xl flex flex-col items-center justify-center transition-all duration-300",
                luckBalance >= 1
                  ? "bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(84,27,40,0.5)]"
                  : "bg-white text-[#756B6D] border-[#541B28]/20 cursor-not-allowed"
              )}
            >
              <div className="mb-0.5">
                <WaveMonogram size="sm" variant="gold" withSeal={false} />
              </div>
              <span className="font-serif text-[11px] font-bold uppercase tracking-wider">
                {animating ? "Destin..." : "LANCER"}
              </span>
              <span className="text-[9px] opacity-90 text-[#DFC68B]">
                {luckBalance >= 1 ? `${luckBalance} Luck` : "0 Luck"}
              </span>
            </button>
          </div>
        </div>

        {/* Spin action explanation */}
        <p className="text-xs text-[#756B6D] mt-8 text-center max-w-md leading-relaxed">
          {luckBalance >= 1 ? (
            <>
              Chaque lancer consomme l&apos;intégralité de vos <strong className="text-[#541B28] font-bold">{luckBalance} Luck</strong>.
              Le palier actuel garantit la table de récompenses <strong>{currentTier}</strong>.
            </>
          ) : (
            <>
              Vous avez 0 Luck actuellement. Effectuez un achat pour recharger votre balance (1 Luck par tranche de 10 TND d&apos;achat).
            </>
          )}
        </p>
      </div>

      {/* Result Modal */}
      {activeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full rounded-3xl bg-white border-2 border-[#541B28] p-8 text-center shadow-2xl relative animate-in zoom-in-95">
            <div className="flex justify-center mb-3">
              <WaveMonogram size="md" variant="gold" withSeal />
            </div>

            <div className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
              Révélation {activeResult.tier}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light mt-1 mb-2">
              {activeResult.rewardLabel}
            </h3>

            <p className="text-xs text-[#5A4B4E] mb-6">
              Votre chance de {activeResult.luckConsumed} Luck a été honorée par la Maison Lévania.
            </p>

            {/* Generated coupon display */}
            {activeResult.couponCodeGenerated && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/20 mb-6">
                <span className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Code Privilège Généré
                </span>
                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-[#541B28]/20">
                  <span className="font-mono text-sm font-bold text-[#541B28] tracking-wider">
                    {activeResult.couponCodeGenerated}
                  </span>
                  <button
                    onClick={() => copyCouponCode(activeResult.couponCodeGenerated!)}
                    className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#541B28] transition-colors"
                    title="Copier"
                  >
                    {copiedCoupon ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveResult(null)}
              className="w-full py-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-md transition-colors"
            >
              Célébrer & Continuer
            </button>
          </div>
        </div>
      )}

      {/* Spin History Ledger */}
      {spinHistory.length > 0 && (
        <div className="mt-16 pt-8 border-t border-[#541B28]/15">
          <h3 className="font-serif text-xl text-[#23181A] font-semibold mb-4">
            Historique de Vos Tirages du Destin
          </h3>
          <div className="space-y-2">
            {spinHistory.slice(0, 5).map((spin) => (
              <div
                key={spin.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#541B28]/10 text-xs text-[#23181A] shadow-sm"
              >
                <div>
                  <span className="font-serif text-sm text-[#23181A] font-medium block">
                    {spin.rewardLabel}
                  </span>
                  <span className="text-[10px] text-[#756B6D]">
                    {new Date(spin.timestamp).toLocaleDateString("fr-FR")} &bull; Vague: {spin.tier} ({spin.luckConsumed} Luck)
                  </span>
                </div>
                {spin.couponCodeGenerated && (
                  <span className="font-mono text-[11px] text-[#541B28] font-bold bg-[#FAF7F2] px-2 py-1 rounded border border-[#541B28]/20">
                    {spin.couponCodeGenerated}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
