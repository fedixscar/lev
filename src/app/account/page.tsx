"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { formatTND } from "@/lib/utils";
import {
  Sparkles,
  Package,
  Heart,
  Users,
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const { luckBalance, currentTier, loyaltyPoints, xpLevel } = useLoyalty();

  const mockOrders = [
    {
      id: "ord-1",
      number: "LEV-2026-9482",
      date: "14 Février 2026",
      items: "Onde d'Or (100ml) + Néroli Flottant (50ml)",
      totalTND: 470.0,
      status: "Livré",
      statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      id: "ord-2",
      number: "LEV-2026-8821",
      date: "02 Janvier 2026",
      items: "Coffret Sur-Mesure Signature (2 Flacons)",
      totalTND: 415.0,
      status: "Livré",
      statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#C7A66A]/15">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
                Espace Privilège Membre
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light mt-1">
                Bienvenue, {user?.name || "Cher Connaisseur"}
              </h1>
              <p className="text-xs text-[#89877F] mt-1">{user?.email || "elyes.benamor@gmail.com"}</p>
            </div>

            <div className="flex gap-2">
              <Link
                href="/account/luck"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 flex items-center gap-1.5 shadow-md"
              >
                <Flame className="w-4 h-4" />
                <span>Lancer la Roue</span>
              </Link>
            </div>
          </div>

          {/* Quick Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Luck Card */}
            <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block mb-1">
                Solde de Luck
              </span>
              <div className="font-serif text-3xl text-gold-gradient font-bold">
                {luckBalance} Luck
              </div>
              <span className="text-xs text-[#E9DFCE] block mt-1 font-medium">
                Vague : {currentTier || "Aucune"}
              </span>
              <Link href="/account/luck" className="text-[11px] text-[#C7A66A] hover:underline mt-3 inline-block">
                Tourner la Roue &rarr;
              </Link>
            </div>

            {/* Loyalty Points */}
            <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block mb-1">
                Points Fidélité
              </span>
              <div className="font-serif text-3xl text-[#F6F1E8] font-bold">
                {loyaltyPoints} Points
              </div>
              <span className="text-xs text-[#89877F] block mt-1">
                Remise possible : {(loyaltyPoints * 0.1).toFixed(3)} TND
              </span>
              <Link href="/account/loyalty" className="text-[11px] text-[#C7A66A] hover:underline mt-3 inline-block">
                Convertir &rarr;
              </Link>
            </div>

            {/* XP Level */}
            <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block mb-1">
                Niveau d&apos;Expérience
              </span>
              <div className="font-serif text-3xl text-[#C7A66A] font-bold">
                Niveau {xpLevel}
              </div>
              <span className="text-xs text-[#89877F] block mt-1">Titre : Connaisseur Averti</span>
              <Link href="/account/loyalty" className="text-[11px] text-[#C7A66A] hover:underline mt-3 inline-block">
                Détails progression &rarr;
              </Link>
            </div>

            {/* Referrals */}
            <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block mb-1">
                Parrainage (50% Points)
              </span>
              <div className="font-serif text-3xl text-emerald-400 font-bold">
                3 Filleuls
              </div>
              <span className="text-xs text-[#89877F] block mt-1">Code : LEVANIA-ELYES-77</span>
              <Link href="/account/loyalty" className="text-[11px] text-[#C7A66A] hover:underline mt-3 inline-block">
                Partager mon lien &rarr;
              </Link>
            </div>
          </div>

          {/* Orders Section */}
          <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 sm:p-8 backdrop-blur-xl mb-12">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
              <h2 className="font-serif text-2xl text-[#F6F1E8]">Vos Dernières Commandes</h2>
              <Link href="/shop" className="text-xs text-[#C7A66A] hover:underline">
                Commander à nouveau
              </Link>
            </div>

            <div className="space-y-4">
              {mockOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-[#171715]/80 border border-[#C7A66A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#F6F1E8] text-sm">
                        {ord.number}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${ord.statusColor}`}>
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-[#89877F]">{ord.items}</p>
                    <span className="text-[10px] text-[#89877F] block">Commandé le {ord.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base text-[#C7A66A] font-semibold block">
                      {formatTND(ord.totalTND)}
                    </span>
                    <span className="text-[10px] text-emerald-400">Livraison Colis Tunisie Suivie</span>
                  </div>
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
