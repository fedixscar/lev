"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { Users, Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LoyaltyPage() {
  const { user } = useAuth();
  const { loyaltyPoints, redeemPoints, xpPoints, xpLevel, doubleXpActive } = useLoyalty();
  const { showToast } = useNotification();
  const { t } = useLanguage();

  const [copiedLink, setCopiedLink] = useState(false);
  const referralCode = user ? `LEV-${user.id.slice(0, 6).toUpperCase()}` : "LEVANIA-PARRAIN";
  const referralLink = `https://levania-parfums.com/?ref=${referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
    showToast(t("loyalty.toast_copied", "Lien de Parrainage Copié"), referralLink, "success");
  };

  const handleRedeem = (points: number, rewardLabel: string) => {
    if (redeemPoints(points)) {
      showToast(t("loyalty.toast_redeemed", "Points Convertis avec Succès"), rewardLabel, "luxury");
    } else {
      showToast(t("loyalty.toast_insufficient", "Solde Insuffisant"), t("wheel.insufficient_luck_desc", "Vous n'avez pas assez de points fidélité."), "error");
    }
  };

  const redeemOffers = [
    {
      points: 200,
      reward: t("loyalty.reward1_title", "Bon d'Achat 20 TND"),
      desc: t("loyalty.reward1_desc", "Valable sur toute commande"),
    },
    {
      points: 400,
      reward: t("loyalty.reward2_title", "Bon d'Achat 45 TND"),
      desc: t("loyalty.reward2_desc", "Bonus +5 TND inclus"),
    },
    {
      points: 800,
      reward: t("loyalty.reward3_title", "Flacon 50ml Offert"),
      desc: t("loyalty.reward3_desc", "Choix libre parmi le catalogue"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] dark:text-[#DFC68B] font-bold">
              {t("loyalty.tag", "Programme Ambassadeur & Fidélité")}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient dark:text-[#DFC68B] font-light mt-1 mb-3">
              {t("loyalty.title", "Vos Points & Parrainages")}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed">
              {t("loyalty.subtitle", "Gagnez des points fidélité sur chaque achat et recevez 50% des points de vos filleuls sur leurs commandes qualifiées.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Loyalty Balance */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("loyalty.balance_title", "Solde Fidélité")}
              </span>
              <div className="font-serif text-3xl text-[#23181A] dark:text-[#FAF7F2] font-bold">
                {loyaltyPoints} {t("account.points_suffix", "Points")}
              </div>
              <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1">
                {t("loyalty.balance_value_desc", "Valeur convertible : {val} TND en réductions").replace("{val}", (loyaltyPoints * 0.1).toFixed(3))}
              </p>
            </div>

            {/* XP Level */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("loyalty.xp_title", "Rang d'Expérience (XP)")}
              </span>
              <div className="font-serif text-3xl text-[#541B28] dark:text-[#DFC68B] font-bold">
                {t("account.level_prefix", "Niveau {n}").replace("{n}", String(xpLevel))} • {xpLevel >= 3 ? "Connaisseur" : xpLevel === 2 ? "Initié" : "Découvreur"}
              </div>
              <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1">
                {t("loyalty.xp_accumulated", "{points} XP accumulés • {mult}")
                  .replace("{points}", String(xpPoints))
                  .replace("{mult}", doubleXpActive ? t("loyalty.double_xp_active", "Double XP Actif !") : t("loyalty.normal_mult", "Multiplicateur normal"))}
              </p>
            </div>

            {/* Filleuls Actifs */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("loyalty.referrals_title", "Filleuls Enregistrés")}
              </span>
              <div className="font-serif text-3xl text-[#434B36] dark:text-[#C7A66A] font-bold">
                {t("loyalty.referrals_count", "{n} Ami(s) Parrainé(s)").replace("{n}", "0")}
              </div>
              <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1">
                {t("loyalty.referrals_desc", "Partagez votre lien exclusif pour percevoir 50% de leurs points d'achat.")}
              </p>
            </div>
          </div>

          {/* Referral Program Section (50% rule) */}
          <div className="rounded-3xl bg-gradient-to-b from-[#F3ECE1] to-white dark:from-[#180B10] dark:to-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 sm:p-10 mb-14 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/20 text-[#541B28] dark:text-[#DFC68B] text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t("loyalty.referral_rule_tag", "Règle Officielle de Parrainage Lévania")}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient dark:text-[#DFC68B] font-light">
                  {t("loyalty.referral_rule_title", "Recevez 50% des Points de Vos Amis")}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A4B4E] dark:text-[#D8CCD0] leading-relaxed">
                  {t("loyalty.referral_rule_desc", "Partagez votre lien exclusif. Dès que votre filleul effectue son premier achat d'au moins 100 TND, vous recevez automatiquement 50% de ses points de fidélité gagnés, crédités sur votre compte sans limitation de temps.")}
                </p>

                {/* Copy Link Input */}
                <div className="pt-2">
                  <span className="text-[11px] text-[#756B6D] dark:text-[#A8989C] block mb-1 font-bold">
                    {t("loyalty.unique_link_label", "Votre Lien Unique de Parrainage :")}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="w-full min-w-0 flex-1 bg-white dark:bg-[#15080E] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl px-4 py-2.5 text-xs text-[#541B28] dark:text-[#DFC68B] font-mono font-bold focus:outline-none"
                    />
                    <button
                      onClick={copyReferral}
                      className="w-full sm:w-auto shrink-0 justify-center px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-[#DFC68B]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? t("loyalty.copied_link", "Copié !") : t("loyalty.copy_link", "Copier")}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Rules Highlights */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 space-y-3 text-xs text-[#5A4B4E] dark:text-[#D8CCD0]">
                <h4 className="text-xs uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold">
                  {t("loyalty.transparency_title", "Conditions de Transparence")}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] dark:text-[#C7A66A] shrink-0 mt-0.5" />
                    <span>{t("loyalty.rule1", "S'applique sur les points de fidélité réels (hors Luck de la Roue).")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] dark:text-[#C7A66A] shrink-0 mt-0.5" />
                    <span>{t("loyalty.rule2", "Premier achat éligible dès 100 TND de commande livrée.")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#434B36] dark:text-[#C7A66A] shrink-0 mt-0.5" />
                    <span>{t("loyalty.rule3", "L'auto-parrainage est automatiquement bloqué par détection IP/adresse.")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Points Redemption Catalogue */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">
              {t("loyalty.redeem_title", "Convertir Vos Points en Privilèges")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {redeemOffers.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[#541B28] dark:text-[#DFC68B] block mb-1">
                      {t("loyalty.points_required", "{points} Points Requis").replace("{points}", String(item.points))}
                    </span>
                    <h4 className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">{item.reward}</h4>
                    <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1">{item.desc}</p>
                  </div>

                  <button
                    onClick={() => handleRedeem(item.points, item.reward)}
                    disabled={loyaltyPoints < item.points}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  >
                    {loyaltyPoints >= item.points
                      ? t("loyalty.redeem_btn", "Échanger Mes Points")
                      : t("loyalty.insufficient_points", "Points Insuffisants")}
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
