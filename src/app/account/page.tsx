"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { formatTND } from "@/lib/utils";
import { Flame } from "lucide-react";

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
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      id: "ord-2",
      number: "LEV-2026-8821",
      date: "02 Janvier 2026",
      items: "Coffret Sur-Mesure Signature (2 Flacons)",
      totalTND: 415.0,
      status: "Livré",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#541B28]/15">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
                Espace Privilège Membre
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light mt-1">
                Bienvenue, {user?.name || "Cher Connaisseur"}
              </h1>
              <p className="text-xs text-[#756B6D] mt-1">
                {user?.email ? user.email : (
                  <Link href="/login?redirect=/account" className="text-[#541B28] font-semibold underline underline-offset-2 hover:opacity-80">
                    Connectez-vous pour synchroniser vos flacons et points &rarr;
                  </Link>
                )}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href="/account/luck"
                className="px-5 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Flame className="w-4 h-4 text-[#DFC68B]" />
                <span>Lancer la Roue</span>
              </Link>
            </div>
          </div>

          {/* Quick Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Luck Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Solde de Luck
              </span>
              <div className="font-serif text-3xl text-burgundy-gradient font-bold">
                {luckBalance} Luck
              </div>
              <span className="text-xs text-[#23181A] block mt-1 font-medium">
                Vague : {currentTier || "Aucune"}
              </span>
              <Link href="/account/luck" className="text-[11px] text-[#541B28] font-bold hover:underline mt-3 inline-block">
                Tourner la Roue &rarr;
              </Link>
            </div>

            {/* Loyalty Points */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Points Fidélité
              </span>
              <div className="font-serif text-3xl text-[#23181A] font-bold">
                {loyaltyPoints} Points
              </div>
              <span className="text-xs text-[#756B6D] block mt-1">
                Remise possible : {(loyaltyPoints * 0.1).toFixed(3)} TND
              </span>
              <Link href="/account/loyalty" className="text-[11px] text-[#541B28] font-bold hover:underline mt-3 inline-block">
                Convertir &rarr;
              </Link>
            </div>

            {/* XP Level */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Niveau d&apos;Expérience
              </span>
              <div className="font-serif text-3xl text-[#541B28] font-bold">
                Niveau {xpLevel}
              </div>
              <span className="text-xs text-[#756B6D] block mt-1">Titre : Connaisseur Averti</span>
              <Link href="/account/loyalty" className="text-[11px] text-[#541B28] font-bold hover:underline mt-3 inline-block">
                Détails progression &rarr;
              </Link>
            </div>

            {/* Referrals */}
            <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                Parrainage (50% Points)
              </span>
              <div className="font-serif text-3xl text-[#434B36] font-bold">
                3 Filleuls
              </div>
              <span className="text-xs text-[#756B6D] block mt-1">
                Code : {user ? `LEVANIA-${user.name.split(" ")[0].toUpperCase()}-77` : "LEVANIA-VIP-2026"}
              </span>
              <Link href="/account/loyalty" className="text-[11px] text-[#541B28] font-bold hover:underline mt-3 inline-block">
                Partager mon lien &rarr;
              </Link>
            </div>
          </div>

          {/* Orders Section */}
          <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 sm:p-8 shadow-sm mb-12">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#541B28]/10">
              <h2 className="font-serif text-2xl text-[#23181A] font-semibold">Vos Dernières Commandes</h2>
              <Link href="/shop" className="text-xs text-[#541B28] font-bold hover:underline">
                Commander à nouveau
              </Link>
            </div>

            <div className="space-y-4">
              {mockOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#23181A] text-sm">
                        {ord.number}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${ord.statusColor}`}>
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-[#5A4B4E]">{ord.items}</p>
                    <span className="text-[10px] text-[#756B6D] block">Commandé le {ord.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base text-[#541B28] font-bold block">
                      {formatTND(ord.totalTND)}
                    </span>
                    <span className="text-[10px] text-[#434B36] font-medium">Livraison Colis Tunisie Suivie</span>
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
