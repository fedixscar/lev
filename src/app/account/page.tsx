"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { getAllProducts } from "@/lib/catalogue";
import { getLocalizedProduct } from "@/lib/i18n/catalogueLocale";
import { formatTND } from "@/lib/utils";
import { Flame, ShoppingBag, Heart, Trash2, ArrowRight } from "lucide-react";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, locale } = useLanguage();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useNotification();
  const [orders, setOrders] = useState<RealOrder[]>([]);

  const allCatalogueProducts = getAllProducts();
  const wishlistedProducts = allCatalogueProducts
    .filter((p) => wishlist.includes(p.id) || wishlist.includes(p.slug))
    .map((p) => getLocalizedProduct(p, locale));

  const handleAddWishlistToCart = (prod: any) => {
    const fmt = prod.formats[0];
    addItem({
      productId: prod.id,
      productName: prod.name,
      productSlug: prod.slug,
      image: prod.images.main,
      formatSize: fmt.size,
      unitPriceTND: fmt.priceTND,
      unitPriceMillimes: fmt.priceMillimes,
      quantity: 1,
    });
    setIsCartOpen(true);
    showToast(
      "Flacon Ajouté au Panier",
      `${prod.name} (${fmt.size}) a été transféré vers votre panier avec soin.`,
      "luxury"
    );
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("levania_orders");
      if (stored) {
        const allOrders: RealOrder[] = JSON.parse(stored);
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.22} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20">
            <div>
              <div className="luxury-pill mb-3 inline-flex items-center gap-2">
                <GoldStarLozenge size={12} className="text-[#C7A66A]" />
                <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                  {t("account.privilege_badge", "Espace Privilège Membre")}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient dark:text-[#DFC68B] font-light mt-1">
                {t("account.welcome", "Bienvenue, {name}").replace("{name}", user?.name || t("account.default_name", "Cher Connaisseur"))}
              </h1>
              <p className="text-xs sm:text-sm text-[#756B6D] dark:text-[#A8989C] mt-1 font-light">
                {user?.email ? (
                  <span>{t("account.certified_account", "Compte certifié • {email}").replace("{email}", user.email)}</span>
                ) : (
                  <Link href="/login?redirect=/account" className="text-[#541B28] dark:text-[#DFC68B] font-semibold underline underline-offset-2 hover:opacity-80">
                    {t("account.connect_sync", "Connectez-vous pour synchroniser vos flacons et points →")}
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
                <span>{t("account.spin_wheel_btn", "Lancer la Roue")}</span>
              </Link>
            </div>
          </div>

          {/* Quick Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {/* Luck Card */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("account.luck_balance_title", "Solde de Luck")}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-burgundy-gradient dark:text-[#DFC68B] font-medium">
                {luckBalance} Luck
              </div>
              <span className="text-xs text-[#23181A] dark:text-[#FAF7F2] block mt-1.5 font-light">
                {t("account.wave_label", "Vague :")} <strong className="font-semibold text-[#541B28] dark:text-[#DFC68B]">{currentTier || t("account.none_wave", "Aucune")}</strong>
              </span>
              <Link href="/account/luck" className="font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                {t("account.tour_wheel", "Tourner la Roue →")}
              </Link>
            </div>

            {/* Loyalty Points */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("account.loyalty_points_title", "Points Fidélité")}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#23181A] dark:text-[#FAF7F2] font-medium">
                {loyaltyPoints} {t("account.points_suffix", "Points")}
              </div>
              <span className="text-xs text-[#756B6D] dark:text-[#A8989C] block mt-1.5 font-light">
                {t("account.convert_discount", "Remise possible : {val} TND").replace("{val}", (loyaltyPoints * 0.1).toFixed(3))}
              </span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                {t("account.convert_btn", "Convertir →")}
              </Link>
            </div>

            {/* XP Level */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("account.xp_level_title", "Niveau d'Expérience")}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#541B28] dark:text-[#DFC68B] font-medium">
                {t("account.level_prefix", "Niveau {n}").replace("{n}", String(xpLevel))}
              </div>
              <span className="text-xs text-[#756B6D] dark:text-[#A8989C] block mt-1.5 font-light">
                {t("account.title_connoisseur", "Titre : Connaisseur Averti")}
              </span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                {t("account.progress_details", "Détails progression →")}
              </Link>
            </div>

            {/* Referrals */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block mb-1">
                {t("account.referral_title", "Parrainage")}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#434B36] dark:text-[#C7A66A] font-medium">
                {t("account.referral_count", "{n} Filleul(s)").replace("{n}", "0")}
              </div>
              <span className="text-xs text-[#756B6D] dark:text-[#A8989C] block mt-1.5 font-light font-mono">
                {t("account.referral_code_label", "Code : {code}").replace("{code}", user ? `LEV-${(user.name || "MEMBRE").split(" ")[0].toUpperCase()}` : "LEVANIA-VIP")}
              </span>
              <Link href="/account/loyalty" className="font-cinzel text-[11px] text-[#541B28] dark:text-[#DFC68B] font-bold tracking-luxury uppercase hover:underline mt-4 inline-block">
                {t("account.share_link", "Partager mon lien →")}
              </Link>
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-7 sm:p-10 shadow-xl mb-12">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pb-4 mb-6 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500 fill-current" />
                <h2 className="font-serif text-2xl sm:text-3xl text-[#23181A] dark:text-[#FAF7F2] font-light">
                  {t("account.wishlist_title", "Votre Vestiaire Olfactif Favori")}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold">
                  {wishlistedProducts.length} flacon{wishlistedProducts.length > 1 ? "s" : ""}
                </span>
              </div>
              <Link href="/shop" className="font-cinzel text-xs text-[#541B28] dark:text-[#DFC68B] font-bold uppercase tracking-luxury hover:underline shrink-0">
                {t("nav.shop", "Explorer le catalogue →")}
              </Link>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="py-12 text-center">
                <Heart className="w-10 h-10 text-rose-300/40 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#23181A] dark:text-[#FAF7F2] font-medium mb-1">
                  {t("account.empty_wishlist_title", "Aucun flacon favori pour le moment")}
                </h3>
                <p className="text-xs text-[#756B6D] dark:text-[#A8989C] max-w-md mx-auto mb-4 font-light">
                  {t("account.empty_wishlist_desc", "Touchez le cœur sur n'importe quel flacon de notre collection pour composer votre vestiaire de senteurs privées.")}
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[11px] font-bold uppercase tracking-luxury transition-all shadow-md"
                >
                  {t("account.explore_collections", "Découvrir les Flacons")}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/10 dark:border-[#C7A66A]/20 flex flex-col justify-between group hover:border-[#C7A66A]/50 transition-all shadow-sm"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/10 shrink-0 border border-black/10">
                        <Image
                          src={prod.images.main}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-cinzel text-[9px] uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold block truncate">
                          {prod.collection}
                        </span>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="font-serif text-lg text-[#23181A] dark:text-[#FAF7F2] font-semibold hover:underline block truncate mt-0.5"
                        >
                          {prod.name}
                        </Link>
                        <span className="font-serif text-sm font-bold text-[#541B28] dark:text-[#DFC68B] block mt-1">
                          {formatTND(prod.formats[0].priceTND)}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                          En stock ({prod.formats[0].stock} ex.)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                      <button
                        onClick={() => handleAddWishlistToCart(prod)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[10px] font-bold uppercase tracking-luxury flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#DFC68B]" />
                        <span>{t("nav.cart", "Panier")}</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(prod.id)}
                        className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Retirer des favoris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-7 sm:p-10 shadow-xl mb-12">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pb-4 mb-6 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#23181A] dark:text-[#FAF7F2] font-light">
                {t("account.recent_orders_title", "Vos Commandes Récentes")}
              </h2>
              <Link href="/shop" className="font-cinzel text-xs text-[#541B28] dark:text-[#DFC68B] font-bold uppercase tracking-luxury hover:underline shrink-0">
                {t("account.order_again", "Commander à nouveau")}
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-12 h-12 text-[#541B28]/40 dark:text-[#DFC68B]/40 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] font-medium mb-1">
                  {t("account.no_orders_title", "Aucune commande enregistrée pour le moment")}
                </h3>
                <p className="text-xs sm:text-sm text-[#756B6D] dark:text-[#A8989C] max-w-md mx-auto mb-6 font-light">
                  {t("account.no_orders_desc", "Vos flacons et coffrets commandés apparaîtront ici avec leur numéro de suivi et historique d'expédition.")}
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-7 py-3 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-luxury transition-all shadow-md"
                >
                  {t("account.explore_collections", "Découvrir les Collections")}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/10 dark:border-[#C7A66A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#23181A] dark:text-[#FAF7F2] text-sm">
                          {ord.number}
                        </span>
                        <span className="px-3 py-1 rounded-full border text-[10px] font-bold bg-amber-50 text-amber-800 border-amber-200">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[#5A4B4E] dark:text-[#D8CCD0] font-medium">{ord.items}</p>
                      <span className="text-[10px] text-[#756B6D] dark:text-[#A8989C] block">
                        {t("account.ordered_on", "Commandé le {date}").replace("{date}", ord.date)}
                      </span>
                    </div>

                    <div className="text-right rtl:text-left">
                      <span className="font-serif text-lg text-[#541B28] dark:text-[#DFC68B] font-medium block">
                        {formatTND(ord.totalTND)}
                      </span>
                      <span className="font-cinzel text-[10px] text-[#434B36] dark:text-[#C7A66A] font-bold tracking-luxury uppercase">
                        {t("account.express_shipping_badge", "Livraison Colis Express Tunisie")}
                      </span>
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
