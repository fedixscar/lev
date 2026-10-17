"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PRODUCTS } from "@/lib/catalogue";
import { formatTND, formatMillimes } from "@/lib/utils";
import { useNotification } from "@/context/NotificationContext";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  QrCode,
  Flame,
  Check,
  X,
  Search,
  Filter,
  DollarSign,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "resellers" | "qr" | "luck">("overview");

  // Mock Admin State
  const [productList, setProductList] = useState(PRODUCTS);
  const [orders, setOrders] = useState([
    {
      id: "ord-101",
      number: "LEV-2026-9482",
      customer: "Elyes Ben Amor",
      phone: "+216 98 123 456",
      city: "La Marsa, Tunis",
      items: "Onde d'Or (100ml)",
      totalTND: 295.0,
      paymentMethod: "Paiement Livraison (COD)",
      status: "Livré",
      date: "14/02/2026",
    },
    {
      id: "ord-102",
      number: "LEV-2026-9501",
      customer: "Sarra Trabelsi",
      phone: "+216 22 555 777",
      city: "Sousse",
      items: "Duo Prestige (Onde d'Or + Sillage d'Olivier)",
      totalTND: 440.0,
      paymentMethod: "Carte Bancaire",
      status: "En Préparation",
      date: "15/02/2026",
    },
    {
      id: "ord-103",
      number: "LEV-2026-9504",
      customer: "Mohamed Dridi",
      phone: "+216 50 111 222",
      city: "Bizerte",
      items: "Néroli Flottant (50ml)",
      totalTND: 175.0,
      paymentMethod: "Paiement Livraison (COD)",
      status: "En Attente",
      date: "16/02/2026",
    },
  ]);

  const [resellerSales, setResellerSales] = useState([
    {
      id: "sale-1",
      resellerName: "Amira Khemir",
      rank: "Master",
      orderRef: "LEV-2026-9501",
      product: "Onde d'Or (100ml)",
      amountTND: 295.0,
      commissionTND: 10.0, // Master rank rule
      status: "En Attente",
      date: "15/02/2026",
    },
    {
      id: "sale-2",
      resellerName: "Walid Mansour",
      rank: "Bronze",
      orderRef: "LEV-2026-9482",
      product: "Sillage d'Olivier (50ml)",
      amountTND: 180.0,
      commissionTND: 6.0,
      status: "Approuvée",
      date: "14/02/2026",
    },
  ]);

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast("Statut Commande Mis à Jour", `Commande ${orderId} passée à '${newStatus}'`, "success");
  };

  const handleApproveResellerSale = (saleId: string) => {
    setResellerSales((prev) =>
      prev.map((s) => (s.id === saleId ? { ...s, status: "Approuvée" } : s))
    );
    showToast("Vente Revendeur Approuvée", `Commission validée pour ${saleId}`, "success");
  };

  const handleRejectResellerSale = (saleId: string) => {
    setResellerSales((prev) =>
      prev.map((s) => (s.id === saleId ? { ...s, status: "Rejetée" } : s))
    );
    showToast("Vente Rejetée", "Motif de rejet enregistré", "info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C7A66A]/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panneau de Contrôle &bull; Direction Générale</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
                Administration Centrale Lévania Parfums
              </h1>
              <p className="text-xs text-[#89877F] mt-1">
                Supervision des ventes, gestion des stocks, validation des commissions revendeurs et configuration des Vagues.
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 no-scrollbar">
            {[
              { id: "overview", label: "Vue Générale", icon: TrendingUp },
              { id: "products", label: "Produits & Podium", icon: Package },
              { id: "orders", label: "Commandes & Expéditions", icon: ShoppingBag },
              { id: "resellers", label: "Réseau Revendeurs", icon: Users },
              { id: "luck", label: "Roue & Paliers Luck", icon: Flame },
              { id: "qr", label: "Générateur QR Flacons", icon: QrCode },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#C7A66A] text-[#171715] shadow-lg shadow-[#C7A66A]/20"
                      : "bg-[#20271E] text-[#89877F] hover:text-[#F6F1E8] border border-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in">
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    Chiffre d&apos;Affaires Brut (Mois)
                  </span>
                  <div className="font-serif text-3xl text-gold-gradient font-bold">
                    18 420.000 TND
                  </div>
                  <span className="text-xs text-emerald-400 mt-1 block">+18.5% vs mois dernier</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    Commandes Confirmées
                  </span>
                  <div className="font-serif text-3xl text-[#F6F1E8] font-bold">
                    68 Commandes
                  </div>
                  <span className="text-xs text-[#89877F] mt-1 block">Panier moyen : 270.880 TND</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    Commissions Revendeurs En Attente
                  </span>
                  <div className="font-serif text-3xl text-amber-400 font-bold">
                    140.000 TND
                  </div>
                  <span className="text-xs text-[#89877F] mt-1 block">14 ventes soumises</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-rose-500/30 backdrop-blur-xl bg-rose-950/20">
                  <span className="text-[10px] uppercase tracking-widest text-rose-300 font-semibold block mb-1">
                    Alertes Stock Critique
                  </span>
                  <div className="font-serif text-3xl text-rose-400 font-bold">
                    2 Flacons &lt; 15 ex.
                  </div>
                  <span className="text-xs text-rose-300 mt-1 block">Oud Impérial & Cuir d&apos;Orient</span>
                </div>
              </div>

              {/* Recent Orders quick table */}
              <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <h3 className="font-serif text-xl text-[#F6F1E8]">Flux Récent des Commandes Clients</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-xs text-[#C7A66A] hover:underline">
                    Gérer toutes les commandes &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#89877F] uppercase tracking-wider border-b border-white/5 pb-2">
                        <th className="pb-3">Réf</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Ville</th>
                        <th className="pb-3">Articles</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-white/5">
                          <td className="py-3 font-mono font-bold text-[#C7A66A]">{ord.number}</td>
                          <td className="py-3 text-[#F6F1E8] font-medium">{ord.customer}</td>
                          <td className="py-3 text-[#89877F]">{ord.city}</td>
                          <td className="py-3 text-[#E9DFCE]">{ord.items}</td>
                          <td className="py-3 font-serif text-[#C7A66A] font-semibold">
                            {formatTND(ord.totalTND)}
                          </td>
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#343B2B] text-emerald-300 border border-[#C7A66A]/30 text-[10px]">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & PODIUM */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#F6F1E8]">Catalogue & Podium Bestsellers</h3>
                <button
                  onClick={() => showToast("Formulaire de création", "Module d'ajout flacon prêt", "info")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouveau Flacon</span>
                </button>
              </div>

              <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 backdrop-blur-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#89877F] uppercase tracking-wider border-b border-white/5 pb-2">
                      <th className="pb-3">Visuel</th>
                      <th className="pb-3">Nom & Collection</th>
                      <th className="pb-3">Famille</th>
                      <th className="pb-3">Prix (50ml / 100ml)</th>
                      <th className="pb-3">Stock Actuel</th>
                      <th className="pb-3">Rang Podium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {productList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-white/5">
                        <td className="py-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-black/40 border border-white/10">
                            <Image src={prod.images.main} alt={prod.name} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="font-serif text-sm text-[#F6F1E8] font-medium block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-[#C7A66A]">{prod.collection}</span>
                        </td>
                        <td className="py-3 text-[#E9DFCE]">{prod.fragranceFamily}</td>
                        <td className="py-3 font-serif text-[#C7A66A]">
                          {formatTND(prod.formats[0].priceTND)} / {formatTND(prod.formats[1]?.priceTND || 0)}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            prod.formats[0].stock < 15 ? "bg-rose-950 text-rose-300 border border-rose-500/40" : "bg-emerald-950 text-emerald-300"
                          }`}>
                            {prod.formats[0].stock} ex.
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#171715] border border-[#C7A66A]/30 text-[#C7A66A] font-bold">
                            #{prod.bestsellerRank || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#F6F1E8]">Gestion des Expéditions & Commandes</h3>
              <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 backdrop-blur-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#89877F] uppercase tracking-wider border-b border-white/5 pb-2">
                      <th className="pb-3">N° Commande</th>
                      <th className="pb-3">Client & Contact</th>
                      <th className="pb-3">Articles</th>
                      <th className="pb-3">Mode Paiement</th>
                      <th className="pb-3">Montant</th>
                      <th className="pb-3">Statut Actuel</th>
                      <th className="pb-3">Action Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/5">
                        <td className="py-3 font-mono font-bold text-[#C7A66A]">{ord.number}</td>
                        <td className="py-3">
                          <span className="text-[#F6F1E8] font-medium block">{ord.customer}</span>
                          <span className="text-[10px] text-[#89877F]">{ord.phone} &bull; {ord.city}</span>
                        </td>
                        <td className="py-3 text-[#E9DFCE]">{ord.items}</td>
                        <td className="py-3 text-[#89877F]">{ord.paymentMethod}</td>
                        <td className="py-3 font-serif text-[#C7A66A] font-semibold">{formatTND(ord.totalTND)}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#343B2B] text-emerald-300 text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-[#171715] border border-[#C7A66A]/30 rounded-lg px-2 py-1 text-xs text-[#F6F1E8]"
                          >
                            <option value="En Attente">En Attente</option>
                            <option value="Confirmée">Confirmée</option>
                            <option value="En Préparation">En Préparation</option>
                            <option value="Expédiée">Expédiée</option>
                            <option value="Livré">Livré</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RESELLERS VALIDATION */}
          {activeTab === "resellers" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#F6F1E8]">Validation des Ventes & Commissions Revendeurs</h3>
              <p className="text-xs text-[#89877F]">
                Règle: Les commissions ne sont payables qu&apos;après validation administrative de la preuve d&apos;achat et contrôle d&apos;absence de doublon.
              </p>

              <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 backdrop-blur-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#89877F] uppercase tracking-wider border-b border-white/5 pb-2">
                      <th className="pb-3">Revendeur</th>
                      <th className="pb-3">Rang</th>
                      <th className="pb-3">Réf Commande</th>
                      <th className="pb-3">Produit Vendu</th>
                      <th className="pb-3">Commission Prévue</th>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3">Décision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {resellerSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-white/5">
                        <td className="py-3 text-[#F6F1E8] font-medium">{sale.resellerName}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px]">
                            {sale.rank}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-[#C7A66A]">{sale.orderRef}</td>
                        <td className="py-3 text-[#E9DFCE]">{sale.product}</td>
                        <td className="py-3 font-serif text-[#C7A66A] font-semibold">{formatTND(sale.commissionTND)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            sale.status === "Approuvée"
                              ? "bg-emerald-950 text-emerald-300"
                              : sale.status === "Rejetée"
                              ? "bg-rose-950 text-rose-300"
                              : "bg-amber-950 text-amber-300"
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {sale.status === "En Attente" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveResellerSale(sale.id)}
                                className="p-1 rounded bg-emerald-900/60 hover:bg-emerald-600 text-emerald-200"
                                title="Approuver la commission"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectResellerSale(sale.id)}
                                className="p-1 rounded bg-rose-900/60 hover:bg-rose-600 text-rose-200"
                                title="Rejeter"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-[#89877F]">Traité</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: LUCK & WHEEL CONFIG */}
          {activeTab === "luck" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#F6F1E8]">Configuration des Vagues de la Roue du Destin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { tier: "Normal Wave", range: "1 à 100 Luck", topReward: "50 à 100 Points Fidélité / Échantillon 5ml", bg: "bg-[#20271E]" },
                  { tier: "Fire Wave", range: "101 à 1,000 Luck", topReward: "Coupon -20% / Bon 30 TND / Coffret 3 Échantillons", bg: "bg-[#542B32]/30" },
                  { tier: "Royal Wave", range: "1,001 à 7,776 Luck", topReward: "Flacon 50ml Offert / Bon 80 TND Royal / Coupon -35%", bg: "bg-[#343B2B]/40" },
                  { tier: "Admin Wave", range: "7,777 Luck (Cap)", topReward: "Trésor Lévania : 2 Flacons 100ml + Coffret Cylindrique Doré", bg: "bg-amber-950/40" },
                ].map((t, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl border border-[#C7A66A]/20 ${t.bg}`}>
                    <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-bold block mb-1">
                      {t.tier}
                    </span>
                    <h4 className="font-serif text-xl text-[#F6F1E8] mb-2">{t.range}</h4>
                    <p className="text-xs text-[#89877F] mb-4">Lot phare : <strong className="text-[#E9DFCE]">{t.topReward}</strong></p>
                    <span className="text-[10px] text-emerald-400">Poids probabiliste verrouillé côté serveur</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: QR CODE MANAGER */}
          {activeTab === "qr" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#F6F1E8]">Gestion des QR Codes de Traçabilité Flacons</h3>
              <p className="text-xs text-[#89877F]">
                Générez des jetons cryptographiques uniques pour chaque flacon scellé et associez-les au lot de mise en bouteille.
              </p>

              <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#F6F1E8]">Générer un Nouveau Lot de QR Codes</h4>
                  <p className="text-xs text-[#89877F]">Création par paquet de 50 jetons avec export planche imprimable.</p>
                </div>
                <button
                  onClick={() => showToast("Lot de 50 QR Codes généré", "Export PDF prêt pour l'atelier", "success")}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95"
                >
                  Générer le Lot
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
