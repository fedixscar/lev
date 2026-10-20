"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { formatTND } from "@/lib/utils";
import { Flame, ShoppingBag } from "lucide-react";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";

interface RealOrder {
  id: string;
  number: string;
  customer: string;
  email?: string;
  items: string;
  totalTND: number;
  status: string;
  date: string;
}

export default function AccountPage() {
  const { user } = useAuth();
  const { luckBalance, currentTier, loyaltyPoints, xpLevel } = useLoyalty();
  const [orders, setOrders] = useState<RealOrder[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("levania_orders");
      if (stored) {
        const allOrders: RealOrder[] = JSON.parse(stored);
        // If user is logged in with email, show their orders, else show all browser orders
        if (user?.email) {
          const userOrders = allOrders.filter(
            (o) => !o.email || o.email.toLowerCase() === user.email.toLowerCase()
          );
          setOrders(userOrders.length > 0 ? userOrders : allOrders);
        } else {
          setOrders(allOrders);
        }
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.22} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#541B28]/15">
            <div>
              <div className="luxury-pill mb-3 inline-flex items-center gap-2">
                <GoldStarLozenge size={12} className="text-[#C7A66A]" />
                <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] font-bold">
                  Espace Privilège Membre
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1">
                Bienvenue, {user?.name || "Cher Connaisseur"}
              </h1>
              <p className="text-xs sm:text-sm text-[#756B6D] mt-1 font-light">
                {user?.email ? (
                  <span>Compte certifié &bull; {user.email}</span>
                ) : (
                  <Link href="/login?redirect=/account" className="text-[#541B28] font-semibold underline underline-offset-2 hover:opacity-80">
                    Connectez-vous pour synchroniser vos flacons et points &rarr;
                  </Link>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/account/luck"
                className="px-7 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-98"
              >
                <Flame className="w-4 h-4 text-[#C7A66A]" />
                <span>Lancer la Roue</span>
              </Link>
            </div>
          </div>

          {/* Quick Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {/* Luck Card */}
            <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-1">
                Solde de Luck
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-medium">
                {luckBalance} Luck
              </div>
              <span className="text-xs text-[#23181A] block mt-1.5 font-light">
                Vague : <strong className="font-semibold text-[#541B28]">{currentTier || "Aucune"}</strong>
              </span>
              <Link href="/account/luck" className="font-cinzel text-[11px] text-[#541B28] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                Tourner la Roue &rarr;
              </Link>
            </div>

            {/* Loyalty Points */}
            <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-1">
                Points Fidélité
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#23181A] font-medium">
                {loyaltyPoints} Points
              </div>
              <span className="text-xs text-[#756B6D] block mt-1.5 font-light">
                Remise possible : {(loyaltyPoints * 0.1).toFixed(3)} TND
              </span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                Convertir &rarr;
              </Link>
            </div>

            {/* XP Level */}
            <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-1">
                Niveau d&apos;Expérience
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#541B28] font-medium">
                Niveau {xpLevel}
              </div>
              <span className="text-xs text-[#756B6D] block mt-1.5 font-light">Titre : Connaisseur Averti</span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                Détails progression &rarr;
              </Link>
            </div>

            {/* Referrals */}
            <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] font-bold block mb-1">
                Parrainage
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#434B36] font-medium">
                0 Filleul
              </div>
              <span className="text-xs text-[#756B6D] block mt-1.5 font-light font-mono">
                Code : {user ? `LEV-${(user.name || "MEMBRE").split(" ")[0].toUpperCase()}` : "LEVANIA-VIP"}
              </span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                Partager mon lien &rarr;
              </Link>
            </div>
          </div>

          {/* Orders Section */}
          <div className="rounded-3xl bg-white border border-[#541B28]/15 p-7 sm:p-10 shadow-xl mb-12">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#541B28]/10">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#23181A] font-light">Vos Commandes Récentes</h2>
              <Link href="/shop" className="font-cinzel text-xs text-[#541B28] font-bold uppercase tracking-luxury hover:underline">
                Commander à nouveau
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-12 h-12 text-[#541B28]/40 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#23181A] font-medium mb-1">Aucune commande enregistrée pour le moment</h3>
                <p className="text-xs sm:text-sm text-[#756B6D] max-w-md mx-auto mb-6 font-light">
                  Vos flacons et coffrets commandés apparaîtront ici avec leur numéro de suivi et historique d&apos;expédition.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-7 py-3 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all shadow-md"
                >
                  Découvrir les Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#23181A] text-sm">
                          {ord.number}
                        </span>
                        <span className="px-3 py-1 rounded-full border text-[10px] font-bold bg-amber-50 text-amber-800 border-amber-200">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[#5A4B4E] font-medium">{ord.items}</p>
                      <span className="text-[10px] text-[#756B6D] block">Commandé le {ord.date}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-lg text-[#541B28] font-medium block">
                        {formatTND(ord.totalTND)}
                      </span>
                      <span className="font-cinzel text-[10px] text-[#434B36] font-bold tracking-luxury uppercase">Livraison Colis Express Tunisie</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
