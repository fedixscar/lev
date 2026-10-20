"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { Users, Copy, Check } from "lucide-react";

export default function LoyaltyPage() {
  const { user } = useAuth();
  const { loyaltyPoints, redeemPoints, xpPoints, xpLevel, doubleXpActive } = useLoyalty();
  const { showToast } = useNotification();

  const [copiedLink, setCopiedLink] = useState(false);
  const referralCode = user ? `LEV-${user.id.slice(0, 6).toUpperCase()}` : "LEVANIA-PARRAIN";
  const referralLink = `https://levania-parfums.com/?ref=${referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
    showToast("Lien de Parrainage Copié", referralLink, "success");
  };

  const handleRedeem = (points: number, rewardLabel: string) => {
    if (redeemPoints(points)) {
      showToast("Points Convertis avec Succès", rewardLabel, "luxury");
    } else {
      showToast("Solde Insuffisant", "Vous n'avez pas assez de points fidélité.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
              Programme Ambassadeur & Fidélité
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1 mb-3">
              Vos Points & Parrainages
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
              Gagnez des points fidélité sur chaque achat et recevez 50% des points de vos filleuls sur leurs commandes qualifiées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Loyalty Balance */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Solde Fidélité
              </span>
              <div className="font-serif text-3xl text-[#23181A] font-bold">
                {loyaltyPoints} Points
              </div>
              <p className="text-xs text-[#756B6D] mt-1">
                Valeur convertible : {(loyaltyPoints * 0.1).toFixed(3)} TND en réductions
              </p>
            </div>

            {/* XP Level */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Rang d&apos;Expérience (XP)
              </span>
              <div className="font-serif text-3xl text-[#541B28] font-bold">
                Niveau {xpLevel} • {xpLevel >= 3 ? "Connaisseur" : xpLevel === 2 ? "Initié" : "Découvreur"}
              </div>
              <p className="text-xs text-[#756B6D] mt-1">
                {xpPoints} XP accumulés • {doubleXpActive ? "Double XP Actif !" : "Multiplicateur normal"}
              </p>
            </div>

            {/* Filleuls Actifs */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Filleuls Enregistrés
              </span>
              <div className="font-serif text-3xl text-[#434B36] font-bold">
                0 Ami Parrainé
              </div>
              <p className="text-xs text-[#756B6D] mt-1">
                Partagez votre lien exclusif pour percevoir 50% de leurs points d&apos;achat.
              </p>
            </div>
          </div>

          {/* Referral Program Section (50% rule) */}
          <div className="rounded-3xl bg-gradient-to-b from-[#F3ECE1] to-white border border-[#541B28]/20 p-6 sm:p-10 mb-14 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#541B28]/10 text-[#541B28] text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Règle Officielle de Parrainage Lévania</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light">
                  Recevez 50% des Points de Vos Amis
                </h2>
                <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed">
                  Partagez votre lien exclusif. Dès que votre filleul effectue son premier achat d&apos;au moins 100 TND, vous recevez automatiquement <strong>50% de ses points de fidélité gagnés</strong>, crédités sur votre compte sans limitation de temps.
                </p>

                {/* Copy Link Input */}
                <div className="pt-2">
                  <span className="text-[11px] text-[#756B6D] block mb-1 font-bold">Votre Lien Unique de Parrainage :</span>
                  <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="w-full min-w-0 flex-1 bg-white border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#541B28] font-mono font-bold focus:outline-none"
                    />
                    <button
                      onClick={copyReferral}
                      className="w-full sm:w-auto shrink-0 justify-center px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-[#DFC68B]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Rules Highlights */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-3 text-xs text-[#5A4B4E]">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                  Conditions de Transparence
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] shrink-0 mt-0.5" />
                    <span>S&apos;applique sur les points de fidélité réels (hors Luck de la Roue).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] shrink-0 mt-0.5" />
                    <span>Premier achat éligible dès 100 TND de commande livrée.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] shrink-0 mt-0.5" />
                    <span>L&apos;auto-parrainage est automatiquement bloqué par détection IP/adresse.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Points Redemption Catalogue */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#23181A] font-semibold">
              Convertir Vos Points en Privilèges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { points: 200, reward: "Bon d'Achat 20 TND", desc: "Valable sur toute commande" },
                { points: 400, reward: "Bon d'Achat 45 TND", desc: "Bonus +5 TND inclus" },
                { points: 800, reward: "Flacon 50ml Offert", desc: "Choix libre parmi le catalogue" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#541B28]/15 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[#541B28] block mb-1">
                      {item.points} Points Requis
                    </span>
                    <h4 className="font-serif text-xl text-[#23181A] font-semibold">{item.reward}</h4>
                    <p className="text-xs text-[#756B6D] mt-1">{item.desc}</p>
                  </div>

                  <button
                    onClick={() => handleRedeem(item.points, item.reward)}
                    disabled={loyaltyPoints < item.points}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loyaltyPoints >= item.points ? "Échanger Mes Points" : "Points Insuffisants"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
