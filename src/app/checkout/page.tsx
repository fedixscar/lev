"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCart } from "@/context/CartContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useNotification } from "@/context/NotificationContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
} from "lucide-react";

const GOVERNORATES = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
  "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine",
  "Tataouine", "Gafsa", "Tozeur", "Kébili",
];

export default function CheckoutPage() {
  const { items, subtotalTND, discountTND, deliveryFeeTND, totalTND, totalMillimes, projectedLuck, clearCart } =
    useCart();
  const { awardLuck, awardLoyaltyPoints } = useLoyalty();
  const { showToast } = useNotification();

  // Form states
  const [fullName, setFullName] = useState("Elyes Ben Amor");
  const [email, setEmail] = useState("elyes.benamor@gmail.com");
  const [phone, setPhone] = useState("+216 98 123 456");
  const [address, setAddress] = useState("Avenue Habib Bourguiba, Résidence Les Palmiers");
  const [city, setCity] = useState("La Marsa");
  const [governorate, setGovernorate] = useState("Tunis");
  const [postalCode, setPostalCode] = useState("2070");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    luckAwarded: number;
    totalTND: number;
  } | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate unique order number
      const orderNum = `LEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Award authoritative Luck (1 Luck per 10 TND)
      const luckResult = awardLuck(projectedLuck);
      awardLoyaltyPoints(Math.floor(totalTND));

      setConfirmedOrder({
        orderNumber: orderNum,
        luckAwarded: luckResult.added,
        totalTND,
      });

      clearCart();
      setIsSubmitting(false);

      showToast(
        "Commande Validée avec Succès",
        `Réf ${orderNum} &bull; +${luckResult.added} Luck crédités!`,
        "luxury"
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmed Order Screen */}
          {confirmedOrder ? (
            <div className="max-w-2xl mx-auto py-12 px-6 rounded-3xl bg-[#20271E]/80 border-2 border-[#C7A66A] text-center shadow-2xl backdrop-blur-xl animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#C7A66A] to-[#9E7D42] text-[#171715] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#C7A66A]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                Haute Parfumerie Lévania
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light mt-1 mb-3">
                Merci, Votre Commande est Confirmée
              </h1>

              <p className="text-sm text-[#E9DFCE] max-w-md mx-auto mb-6">
                Votre référence officielle est{" "}
                <strong className="text-[#C7A66A] font-mono font-bold text-base">
                  {confirmedOrder.orderNumber}
                </strong>
                . Nos maîtres artisans préparent vos flacons avec le plus grand soin.
              </p>

              {/* Luck Awarded Celebration Card */}
              {confirmedOrder.luckAwarded > 0 && (
                <div className="p-5 rounded-2xl bg-[#343B2B]/70 border border-[#C7A66A]/40 mb-8 max-w-md mx-auto text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#C7A66A] font-bold mb-1">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>+{confirmedOrder.luckAwarded} Points de Luck Gagnés !</span>
                  </div>
                  <p className="text-xs text-[#89877F]">
                    Votre solde de Luck est actualisé. Vous pouvez dès à présent lancer la Roue du Destin Lévania.
                  </p>
                  <Link
                    href="/account/luck"
                    className="inline-block mt-3 text-xs uppercase font-bold text-[#C7A66A] hover:underline"
                  >
                    Aller à la Roue du Destin &rarr;
                  </Link>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/shop"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95"
                >
                  Continuer la Visite
                </Link>
                <Link
                  href="/account"
                  className="px-8 py-3 rounded-full border border-[#C7A66A]/30 text-[#E9DFCE] text-xs font-medium hover:bg-white/5"
                >
                  Voir Mon Compte & Commandes
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-2xl mx-auto text-center mb-10">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
                  Paiement & Livraison Sécurisée
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light mt-1 mb-2">
                  Finaliser Votre Commande
                </h1>
                <p className="text-xs text-[#89877F]">
                  Expédition sous 24h à 48h partout en Tunisie avec suivi par SMS.
                </p>
              </div>

              <form onSubmit={handleSubmitOrder}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Shipping & Payment Form (7 cols) */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* 1. Contact Info */}
                    <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl space-y-4">
                      <h2 className="font-serif text-xl text-[#F6F1E8] flex items-center gap-2">
                        <span>1. Coordonnées du Destinataire</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Nom Complet
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Numéro de Téléphone (Tunisie)
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Adresse Email pour la Confirmation
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Delivery Address in Tunisia */}
                    <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl space-y-4">
                      <h2 className="font-serif text-xl text-[#F6F1E8] flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#C7A66A]" />
                        <span>2. Adresse de Livraison (Tunisie)</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Rue, Résidence, Appartement
                          </label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Gouvernorat (24 Régions)
                          </label>
                          <select
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-3 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          >
                            {GOVERNORATES.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                            Ville / Délégation
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Payment Method */}
                    <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl space-y-4">
                      <h2 className="font-serif text-xl text-[#F6F1E8] flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#C7A66A]" />
                        <span>3. Mode de Règlement</span>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                            paymentMethod === "cod"
                              ? "bg-[#C7A66A]/15 border-[#C7A66A]"
                              : "bg-[#171715] border-[#C7A66A]/15 hover:border-[#C7A66A]/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="hidden"
                          />
                          <Banknote className="w-5 h-5 text-[#C7A66A] shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-[#F6F1E8] block">
                              Paiement à la Livraison
                            </span>
                            <span className="text-[10px] text-[#89877F]">Espèces au livreur</span>
                          </div>
                        </label>

                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                            paymentMethod === "card"
                              ? "bg-[#C7A66A]/15 border-[#C7A66A]"
                              : "bg-[#171715] border-[#C7A66A]/15 hover:border-[#C7A66A]/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="hidden"
                          />
                          <CreditCard className="w-5 h-5 text-[#C7A66A] shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-[#F6F1E8] block">
                              Carte Bancaire &bull; Flouci / Konnect
                            </span>
                            <span className="text-[10px] text-[#89877F]">Paiement crypté SSL</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Items & Price Summary (5 cols) */}
                  <div className="lg:col-span-5 rounded-3xl bg-[#20271E]/80 border border-[#C7A66A]/20 p-6 backdrop-blur-xl h-fit space-y-6">
                    <h3 className="font-serif text-xl text-[#F6F1E8] pb-3 border-b border-white/5">
                      Articles Commandés ({items.length})
                    </h3>

                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center text-xs">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                            <Image src={item.image} alt={item.productName} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-sm text-[#F6F1E8]">{item.productName}</h4>
                            <span className="text-[11px] text-[#89877F]">
                              {item.formatSize} x{item.quantity}
                            </span>
                          </div>
                          <span className="font-serif text-xs text-[#C7A66A] font-medium">
                            {formatTND(item.unitPriceTND * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 text-xs text-[#E9DFCE]/80 pt-4 border-t border-white/5">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span className="text-[#F6F1E8]">{formatTND(subtotalTND)}</span>
                      </div>
                      {discountTND > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Remise Code Promo</span>
                          <span>-{formatTND(discountTND)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Frais de Port (Tunisie)</span>
                        <span className="text-[#F6F1E8]">
                          {deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#C7A66A]/20 flex justify-between items-baseline text-lg font-serif text-[#F6F1E8]">
                        <span>Total Net à Régler</span>
                        <span className="text-[#C7A66A] font-semibold text-2xl">
                          {formatMillimes(totalMillimes)}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || items.length === 0}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C7A66A] via-[#E3D1A9] to-[#C7A66A] text-[#171715] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#C7A66A]/20 disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Validation en cours...</span>
                      ) : (
                        <>
                          <span>Confirmer la Commande</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-[#89877F]">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                      Garantie Haute Parfumerie &bull; Paiement sécurisé et contrôlé
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
