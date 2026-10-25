"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useNotification } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatTND, formatMillimes } from "@/lib/utils";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateCertificatesForOrder, BottleCertificate } from "@/lib/certificates";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowRight,
  Lock,
  QrCode,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { WaveCanvas } from "@/components/brand/WaveCanvas";

import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";

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
  const { t } = useLanguage();

  const { user } = useAuth();

  // Form states - dynamic and clean
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [governorate, setGovernorate] = useState("Tunis");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with authenticated user profile
  useEffect(() => {
    if (user) {
      if (!fullName && user.name) setFullName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
    }
  }, [user]);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    luckAwarded: number;
    totalTND: number;
    certificates: BottleCertificate[];
  } | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Generate unique order number
      const orderNum = `LEV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderId = `ord-${Date.now()}`;

      // Award authoritative Luck (1 Luck per 10 TND)
      const luckResult = awardLuck(projectedLuck);
      awardLoyaltyPoints(Math.floor(totalTND));

      // Automatically generate unique authentic QR Code bottle certificates for each flacon
      const structuredItems = items.map((it) => ({
        name: it.productName,
        size: it.formatSize,
        quantity: it.quantity,
        priceTND: it.unitPriceTND,
        image: it.image,
      }));

      const certificates = await generateCertificatesForOrder({
        id: orderId,
        number: orderNum,
        customer: fullName,
        email: email.toLowerCase(),
        phone: phone,
        itemsList: structuredItems,
      });

      const newOrder = {
        id: orderId,
        number: orderNum,
        customer: fullName,
        email: email.toLowerCase(),
        phone: phone,
        address: `${address}, ${city}, ${governorate}`,
        city: `${city}, ${governorate}`,
        items: items.map((it) => `${it.productName} (${it.formatSize}) x${it.quantity}`).join(" + "),
        itemsList: structuredItems,
        certificates: certificates,
        totalTND: totalTND,
        paymentMethod: paymentMethod === "cod" ? "Paiement à la Livraison (Espèces)" : "Carte Bancaire (Flouci/Konnect)",
        status: "En Attente",
        date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }),
        timestamp: new Date().toISOString(),
      };

      // Persist to local storage
      try {
        const stored = localStorage.getItem("levania_orders");
        const existing = stored ? JSON.parse(stored) : [];
        localStorage.setItem("levania_orders", JSON.stringify([newOrder, ...existing]));
      } catch {
        // Ignore
      }

      // Sync with Supabase if configured
      if (isSupabaseConfigured()) {
        try {
          await supabase.from("orders").insert({
            order_number: orderNum,
            customer_id: user?.id || null,
            customer_name: fullName,
            customer_email: email.toLowerCase(),
            customer_phone: phone,
            shipping_street: address,
            shipping_city: city,
            shipping_governorate: governorate,
            subtotal_millimes: Math.round(subtotalTND * 1000),
            discount_millimes: Math.round(discountTND * 1000),
            delivery_fee_millimes: Math.round(deliveryFeeTND * 1000),
            total_millimes: Math.round(totalTND * 1000),
            status: "pending",
            payment_status: paymentMethod === "cod" ? "cod" : "pending",
            payment_method: paymentMethod === "cod" ? "cod" : "online",
            luck_awarded: luckResult.added,
          });
        } catch {
          // Graceful fallback: local store holds the order
        }
      }

      setConfirmedOrder({
        orderNumber: orderNum,
        luckAwarded: luckResult.added,
        totalTND,
        certificates,
      });

      clearCart();

      showToast(
        "Commande Validée avec Succès",
        `Réf ${orderNum} \u2022 +${luckResult.added} Luck crédités!`,
        "luxury"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.2} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmed Order Screen */}
          {confirmedOrder ? (
            <div className="max-w-2xl mx-auto py-14 px-8 rounded-3xl bg-white dark:bg-[#180B10] border-2 border-[#541B28] dark:border-[#C7A66A]/40 text-center shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
              <div className="flex justify-center mb-6">
                <WaveMonogram size="lg" variant="gold" withSeal />
              </div>

              <div className="h-14 rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-[#12080D] border border-[#541B28]/15 dark:border-[#C7A66A]/20 mb-6 max-w-sm mx-auto">
                <WaveCanvas expression="signature" interactive={false} height="100%" />
              </div>

              <div className="luxury-pill mb-4 inline-flex items-center gap-2">
                <GoldStarLozenge size={12} className="text-[#C7A66A]" />
                <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] font-bold">
                  Haute Parfumerie Lévania • Sillage Garanti
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient dark:text-[#DFC68B] font-light mt-1 mb-4">
                {t("checkout.success_title", "Merci, Votre Commande est Confirmée")}
              </h1>

              <p className="text-sm text-[#5A4B4E] dark:text-[#D5C4C7] max-w-md mx-auto mb-8 font-light leading-relaxed">
                {t("checkout.success_desc", "Votre commande a été enregistrée avec succès. Nos maîtres artisans préparent vos flacons avec le plus grand soin.")}{" "}
                <strong className="text-[#541B28] dark:text-[#EACCA0] font-mono font-bold text-base block mt-2">
                  {confirmedOrder.orderNumber}
                </strong>
              </p>

              {/* Generated QR Bottle Certificates */}
              {confirmedOrder.certificates && confirmedOrder.certificates.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#12080D] border border-[#541B28]/20 dark:border-[#C7A66A]/20 mb-8 max-w-lg mx-auto text-left rtl:text-right space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#541B28]/15">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#541B28]" />
                      <span className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold">
                        {t("checkout.cert_title", "Certificats QR Flacons Dédiés")} ({confirmedOrder.certificates.length})
                      </span>
                    </div>
                    <span className="text-[10px] text-[#434B36] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Scellés &amp; Numérotés
                    </span>
                  </div>

                  <div className="space-y-3">
                    {confirmedOrder.certificates.map((cert) => (
                      <div
                        key={cert.token}
                        className="p-3.5 rounded-xl bg-white dark:bg-[#1C0D15] border border-[#541B28]/15 dark:border-[#C7A66A]/20 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          {cert.qrDataUrl ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#541B28]/20 relative shrink-0">
                              <Image src={cert.qrDataUrl} alt="QR Code" fill className="object-contain" unoptimized />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] flex items-center justify-center shrink-0">
                              <QrCode className="w-5 h-5 text-[#541B28]" />
                            </div>
                          )}
                          <div>
                            <span className="font-serif text-sm font-semibold text-[#23181A] block">
                              {cert.productName} ({cert.formatSize})
                            </span>
                            <span className="text-[11px] text-[#541B28] font-medium block">
                              Flacon dédié à : <strong>{cert.customerName}</strong>
                            </span>
                            <span className="font-mono text-[10px] text-[#756B6D] block">
                              Série : {cert.serialNumber}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/p/${cert.token}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0"
                        >
                          Certificat &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Luck Awarded Celebration Card */}
              {confirmedOrder.luckAwarded > 0 && (
                <div className="p-6 rounded-2xl bg-[#541B28]/10 border border-[#541B28]/30 mb-8 max-w-md mx-auto text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#541B28] font-bold mb-1.5 font-cinzel">
                    <GoldStarLozenge size={14} className="text-[#C7A66A]" />
                    <span>+{confirmedOrder.luckAwarded} Points Gagnés !</span>
                  </div>
                  <p className="text-xs text-[#756B6D] font-light">
                    Vos points sont disponibles. Vous pouvez dès à présent tenter votre chance sur la Roue Cadeau Lévania.
                  </p>
                  <Link
                    href="/account/luck"
                    className="inline-block mt-3 text-xs uppercase font-cinzel font-bold text-[#541B28] hover:underline tracking-luxury"
                  >
                    Tourner la Roue Cadeau &rarr;
                  </Link>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all shadow-md"
                >
                  Continuer mes Achats
                </Link>
                <Link
                  href="/account"
                  className="px-8 py-3.5 rounded-full border border-[#541B28]/30 text-[#541B28] font-cinzel text-xs font-semibold hover:bg-white tracking-luxury transition-all"
                >
                  Voir Mon Compte & Commandes
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
                <div className="luxury-pill mb-4 inline-flex items-center gap-2">
                  <GoldStarLozenge size={12} className="text-[#C7A66A]" />
                  <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] font-bold">
                    Paiement & Livraison Sécurisée
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl text-burgundy-gradient font-light mt-1 mb-3">
                  {t("checkout.title", "Finaliser Votre Commande")}
                </h1>
                <p className="text-sm text-[#5A4B4E] font-light">
                  {t("checkout.subtitle", "Expédition sous 24h à 48h partout en Tunisie avec suivi par SMS.")}
                </p>
              </div>

              <form onSubmit={handleSubmitOrder}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left: Shipping & Payment Form (7 cols) */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* 1. Contact Info */}
                    <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-5">
                      <h2 className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold flex items-center gap-2 pb-3 border-b border-[#541B28]/10">
                        <span>{t("checkout.contact_section", "1. Coordonnées du Destinataire")}</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            {t("checkout.full_name", "Nom Complet")}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Sarah Ben Salem"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div>
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            {t("checkout.phone", "Numéro de Téléphone (Tunisie)")}
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+216 98 000 000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            {t("checkout.email", "Adresse Email pour la Confirmation")}
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="votre.email@domaine.tn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Delivery Address in Tunisia */}
                    <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-5">
                      <h2 className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold flex items-center gap-2 pb-3 border-b border-[#541B28]/10">
                        <Truck className="w-4 h-4 text-[#C7A66A]" />
                        <span>{t("checkout.shipping_section", "2. Adresse de Livraison (Tunisie)")}</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            Rue, Résidence, Appartement
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Numéro, rue, bâtiment, étage..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                        <div>
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            Gouvernorat (24 Régions)
                          </label>
                          <select
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          >
                            {GOVERNORATES.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="font-cinzel text-[10px] text-[#756B6D] uppercase tracking-luxury block mb-1.5 font-bold">
                            Ville / Délégation
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: La Marsa, Ennasr, Sousse..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Payment Method */}
                    <div className="p-7 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-5">
                      <h2 className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold flex items-center gap-2 pb-3 border-b border-[#541B28]/10">
                        <Lock className="w-4 h-4 text-[#C7A66A]" />
                        <span>{t("checkout.payment_section", "3. Mode de Règlement")}</span>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                            paymentMethod === "cod"
                              ? "bg-[#541B28]/8 border-[#541B28] shadow-sm ring-1 ring-[#541B28]/20"
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
                            <span className="font-cinzel text-xs font-bold text-[#23181A] block tracking-luxury uppercase">
                              {t("checkout.payment_cod", "Paiement à la Livraison")}
                            </span>
                            <span className="text-[10px] text-[#756B6D]">{t("checkout.payment_cod_desc", "Espèces au livreur")}</span>
                          </div>
                        </label>

                        <label
                          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                            paymentMethod === "card"
                              ? "bg-[#541B28]/8 border-[#541B28] shadow-sm ring-1 ring-[#541B28]/20"
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
                            <span className="font-cinzel text-xs font-bold text-[#23181A] block tracking-luxury uppercase">
                              {t("checkout.payment_card", "Carte Bancaire")}
                            </span>
                            <span className="text-[10px] text-[#756B6D]">{t("checkout.payment_card_desc", "Paiement crypté SSL (Flouci/Konnect)")}</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Items & Price Summary (5 cols) */}
                  <div className="lg:col-span-5 rounded-3xl bg-white border border-[#541B28]/20 p-7 shadow-xl h-fit space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#541B28]/10">
                      <h3 className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold">
                        Articles Commandés ({items.length})
                      </h3>
                      <WaveMonogram size="sm" variant="gold" withSeal={false} />
                    </div>

                    <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3.5 items-center text-xs">
                          <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#541B28]/15 shrink-0 shadow-inner">
                            <Image src={item.image} alt={item.productName} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-base text-[#23181A] font-medium">{item.productName}</h4>
                            <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#756B6D]">
                              {item.formatSize} • qté {item.quantity}
                            </span>
                          </div>
                          <span className="font-cinzel text-xs text-[#541B28] font-bold tracking-luxury">
                            {formatTND(item.unitPriceTND * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 text-xs text-[#5A4B4E] pt-4 border-t border-[#541B28]/10">
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
                      <div className="pt-4 border-t border-[#541B28]/15 flex justify-between items-baseline text-lg font-serif text-[#23181A]">
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
                      className="w-full py-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury shadow-xl shadow-[#541B28]/25 disabled:opacity-40 flex items-center justify-center gap-2.5 transition-all active:scale-98"
                    >
                      {isSubmitting ? (
                        <span>Validation en cours...</span>
                      ) : (
                        <>
                          <span>{t("checkout.confirm_btn", "Confirmer la Commande")}</span>
                          <ArrowRight className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-[#756B6D] pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1.5 text-[#434B36]" />
                      <span className="font-cinzel tracking-luxury uppercase">Garantie Haute Parfumerie • Paiement Sécurisé</span>
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
