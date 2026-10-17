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
        `Réf ${orderNum} \u2022 +${luckResult.added} Luck crédités!`,
        "luxury"
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmed Order Screen */}
          {confirmedOrder ? (
            <div className="max-w-2xl mx-auto py-12 px-6 rounded-3xl bg-white border-2 border-[#541B28] text-center shadow-2xl animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-[#541B28] text-[#FAF7F2] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#541B28]/25">
                <CheckCircle2 className="w-10 h-10 text-[#DFC68B]" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
                Haute Parfumerie Lévania
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light mt-1 mb-3">
                Merci, Votre Commande est Confirmée
              </h1>

              <p className="text-sm text-[#5A4B4E] max-w-md mx-auto mb-6">
                Votre référence officielle est{" "}
                <strong className="text-[#541B28] font-mono font-bold text-base">
                  {confirmedOrder.orderNumber}
                </strong>
                . Nos maîtres artisans préparent vos flacons avec le plus grand soin.
              </p>

              {/* Luck Awarded Celebration Card */}
              {confirmedOrder.luckAwarded > 0 && (
                <div className="p-5 rounded-2xl bg-[#541B28]/10 border border-[#541B28]/30 mb-8 max-w-md mx-auto text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#541B28] font-bold mb-1">
                    <Sparkles className="w-4 h-4 animate-spin text-[#C7A66A]" />
                    <span>+{confirmedOrder.luckAwarded} Points de Luck Gagnés !</span>
                  </div>
                  <p className="text-xs text-[#756B6D]">
                    Votre solde de Luck est actualisé. Vous pouvez dès à présent lancer la Roue du Destin Lévania.
                  </p>
                  <Link
                    href="/account/luck"
                    className="inline-block mt-3 text-xs uppercase font-bold text-[#541B28] hover:underline"
                  >
                    Aller à la Roue du Destin &rarr;
                  </Link>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/shop"
                  className="px-8 py-3 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Continuer la Visite
                </Link>
                <Link
                  href="/account"
                  className="px-8 py-3 rounded-full border border-[#541B28]/30 text-[#541B28] text-xs font-semibold hover:bg-white transition-colors"
                >
                  Voir Mon Compte & Commandes
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-2xl mx-auto text-center mb-10">
                <span className="text-xs uppercase tracking-[0.25em] text-[#541B28] font-bold">
                  Paiement & Livraison Sécurisée
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light mt-1 mb-2">
                  Finaliser Votre Commande
                </h1>
                <p className="text-xs text-[#5A4B4E]">
                  Expédition sous 24h à 48h partout en Tunisie avec suivi par SMS.
                </p>
              </div>

              <form onSubmit={handleSubmitOrder}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Shipping & Payment Form (7 cols) */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* 1. Contact Info */}
                    <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-4">
                      <h2 className="font-serif text-xl text-[#23181A] font-semibold flex items-center gap-2">
                        <span>1. Coordonnées du Destinataire</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Nom Complet
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Numéro de Téléphone (Tunisie)
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Adresse Email pour la Confirmation
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Delivery Address in Tunisia */}
                    <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-4">
                      <h2 className="font-serif text-xl text-[#23181A] font-semibold flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#541B28]" />
                        <span>2. Adresse de Livraison (Tunisie)</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Rue, Résidence, Appartement
                          </label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Gouvernorat (24 Régions)
                          </label>
                          <select
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          >
                            {GOVERNORATES.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                            Ville / Délégation
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Payment Method */}
                    <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-4">
                      <h2 className="font-serif text-xl text-[#23181A] font-semibold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#541B28]" />
                        <span>3. Mode de Règlement</span>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                            paymentMethod === "cod"
                              ? "bg-[#541B28]/8 border-[#541B28]"
                              : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="hidden"
                          />
                          <Banknote className="w-5 h-5 text-[#541B28] shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-[#23181A] block">
                              Paiement à la Livraison
                            </span>
                            <span className="text-[10px] text-[#756B6D]">Espèces au livreur</span>
                          </div>
                        </label>

                        <label
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                            paymentMethod === "card"
                              ? "bg-[#541B28]/8 border-[#541B28]"
                              : "bg-[#FAF7F2] border-[#541B28]/15 hover:border-[#541B28]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="hidden"
                          />
                          <CreditCard className="w-5 h-5 text-[#541B28] shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-[#23181A] block">
                              Carte Bancaire &bull; Flouci / Konnect
                            </span>
                            <span className="text-[10px] text-[#756B6D]">Paiement crypté SSL</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Items & Price Summary (5 cols) */}
                  <div className="lg:col-span-5 rounded-3xl bg-white border border-[#541B28]/20 p-6 shadow-xl h-fit space-y-6">
                    <h3 className="font-serif text-xl text-[#23181A] font-semibold pb-3 border-b border-[#541B28]/10">
                      Articles Commandés ({items.length})
                    </h3>

                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center text-xs">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#541B28]/15 shrink-0">
                            <Image src={item.image} alt={item.productName} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-sm text-[#23181A] font-semibold">{item.productName}</h4>
                            <span className="text-[11px] text-[#756B6D]">
                              {item.formatSize} x{item.quantity}
                            </span>
                          </div>
                          <span className="font-serif text-xs text-[#541B28] font-bold">
                            {formatTND(item.unitPriceTND * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 text-xs text-[#5A4B4E] pt-4 border-t border-[#541B28]/10">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span className="text-[#23181A] font-semibold">{formatTND(subtotalTND)}</span>
                      </div>
                      {discountTND > 0 && (
                        <div className="flex justify-between text-emerald-600 font-semibold">
                          <span>Remise Code Promo</span>
                          <span>-{formatTND(discountTND)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Frais de Port (Tunisie)</span>
                        <span className="text-[#23181A] font-semibold">
                          {deliveryFeeTND === 0 ? "Offerte" : formatTND(deliveryFeeTND)}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#541B28]/15 flex justify-between items-baseline text-lg font-serif text-[#23181A]">
                        <span>Total Net à Régler</span>
                        <span className="text-[#541B28] font-bold text-2xl">
                          {formatMillimes(totalMillimes)}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || items.length === 0}
                      className="w-full py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#541B28]/20 disabled:opacity-40 flex items-center justify-center gap-2 transition-all"
                    >
                      {isSubmitting ? (
                        <span>Validation en cours...</span>
                      ) : (
                        <>
                          <span>Confirmer la Commande</span>
                          <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-[#756B6D]">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-[#434B36]" />
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
