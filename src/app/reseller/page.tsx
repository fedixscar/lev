"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { formatTND } from "@/lib/utils";
import {
  Briefcase,
  Target,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Send,
  Plus,
} from "lucide-react";

export default function ResellerDashboardPage() {
  const { user, isLoading } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<"overview" | "submit" | "sales" | "objectives" | "chat">("overview");

  // Reseller state
  const currentRank = "Master";
  const pendingCommissionTND = 30.0;
  const approvedCommissionTND = 140.0;
  const paidCommissionTND = 280.0;

  // New Sale Form
  const [orderRef, setOrderRef] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [productSold, setProductSold] = useState("Onde d'Or (100ml)");
  const [evidenceNotes, setEvidenceNotes] = useState("");

  // Submitted sales history
  const [salesList, setSalesList] = useState([
    {
      id: "sub-1",
      orderRef: "LEV-2026-9501",
      product: "Onde d'Or (100ml)",
      commissionTND: 10.0,
      status: "En Attente de Revue",
      date: "15/02/2026",
    },
    {
      id: "sub-2",
      orderRef: "LEV-2026-9482",
      product: "Sillage d'Olivier (100ml)",
      commissionTND: 10.0,
      status: "Approuvée",
      date: "14/02/2026",
    },
    {
      id: "sub-3",
      orderRef: "LEV-2026-9210",
      product: "Néroli Flottant (50ml)",
      commissionTND: 10.0,
      status: "Payée",
      date: "10/02/2026",
    },
  ]);

  // Chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: "c1",
      sender: "Direction Lévania",
      role: "admin",
      text: "Félicitations à tous les revendeurs pour les performances de la Saint-Valentin ! Le bonus mensuel sera clôturé ce dimanche.",
      time: "10:15",
    },
    {
      id: "c2",
      sender: "Walid Mansour",
      role: "reseller",
      text: "Le stock d'Onde d'Or 100ml sera-t-il réapprovisionné d'ici vendredi ?",
      time: "11:20",
    },
    {
      id: "c3",
      sender: "Direction Lévania",
      role: "admin",
      text: "Oui Walid, 40 nouveaux flacons scellés arrivent de l'atelier de fabrication demain matin.",
      time: "11:25",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmitSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderRef.trim()) return;

    const newSale = {
      id: `sub-${Date.now()}`,
      orderRef: orderRef.trim().toUpperCase(),
      product: productSold,
      commissionTND: 10.0, // Master rate
      status: "En Attente de Revue",
      date: new Date().toLocaleDateString("fr-FR"),
    };

    setSalesList([newSale, ...salesList]);
    setOrderRef("");
    setCustomerPhone("");
    setEvidenceNotes("");
    setActiveTab("sales");

    showToast(
      "Vente Soumise à l'Administration",
      `Référence ${newSale.orderRef} enregistrée \u2022 En attente de contrôle`,
      "luxury"
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        sender: user?.name || "Amira Khemir",
        role: "reseller",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  const RANKS = [
    { name: "Iron", commission: "5 TND / vente", color: "text-zinc-600", bg: "bg-zinc-50" },
    { name: "Bronze", commission: "6 TND / vente", color: "text-amber-700", bg: "bg-amber-50" },
    { name: "Gold", commission: "7.5 TND / vente", color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Platinum", commission: "8.5 TND / vente", color: "text-slate-700", bg: "bg-slate-50" },
    { name: "Diamond", commission: "9 TND / vente", color: "text-sky-700", bg: "bg-sky-50" },
    { name: "Master", commission: "10 TND / vente", color: "text-[#541B28]", bg: "bg-[#FAF7F2]" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#541B28] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#541B28] font-bold">Vérification de l&apos;accréditation revendeur...</p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== "reseller" && user.role !== "admin")) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-28">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#541B28]/20 p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto mb-4 border border-[#541B28]/20">
              <Briefcase className="w-8 h-8 text-[#541B28]" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
              Portail Partenaires
            </span>
            <h1 className="font-serif text-2xl text-burgundy-gradient font-light mb-3">
              Espace Revendeurs Agréés
            </h1>
            <p className="text-xs text-[#5A4B4E] leading-relaxed mb-6">
              Cet espace est strictement réservé aux partenaires revendeurs de la maison LÉVANIA PARFUMS. Connectez-vous avec vos identifiants pour accéder à votre tableau de bord des commissions.
            </p>
            <div className="space-y-3">
              <Link
                href="/login?redirect=/reseller"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-6 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <span>S&apos;identifier en tant que Revendeur</span>
              </Link>
              <Link
                href="/"
                className="block text-xs text-[#756B6D] hover:text-[#541B28] transition-colors"
              >
                Retourner à la boutique publique
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#541B28]/15">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#434B36]/30 text-[#434B36] text-xs font-bold mb-2 shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Réseau Officiel Revendeurs Lévania</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                Portail Revendeur &bull; {user?.name || "Amira Khemir"}
              </h1>
              <p className="text-xs text-[#756B6D] mt-1">
                Identifiant : <span className="font-mono text-[#541B28] font-bold">RES-MASTER-77</span> &bull; Rang Actuel : <strong className="text-[#434B36] font-bold">Master (10 TND / Vente)</strong>
              </p>
            </div>

            <button
              onClick={() => setActiveTab("submit")}
              className="px-6 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4 text-[#DFC68B]" />
              <span>Déclarer une Vente</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#541B28]/10 no-scrollbar">
            {[
              { id: "overview", label: "Tableau de Bord", icon: TrendingUp },
              { id: "submit", label: "Déclarer une Vente", icon: Plus },
              { id: "sales", label: "Suivi des Commissions", icon: DollarSign },
              { id: "objectives", label: "Objectifs & Bonus", icon: Target },
              { id: "chat", label: "Messagerie Réseau", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap shadow-sm ${
                    activeTab === tab.id
                      ? "bg-[#541B28] text-[#FAF7F2] shadow-md shadow-[#541B28]/25"
                      : "bg-white text-[#5A4B4E] hover:text-[#541B28] border border-[#541B28]/15"
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
              {/* Financial & Performance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    Commissions Payées
                  </span>
                  <div className="font-serif text-3xl text-[#434B36] font-bold">
                    {formatTND(paidCommissionTND)}
                  </div>
                  <span className="text-xs text-[#756B6D] mt-1 block">Versées sur compte bancaire</span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    Commissions Validées (Payables)
                  </span>
                  <div className="font-serif text-3xl text-burgundy-gradient font-bold">
                    {formatTND(approvedCommissionTND)}
                  </div>
                  <span className="text-xs text-[#541B28] font-bold mt-1 block">Prêtes pour le virement du 20</span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    En Cours d&apos;Audit Admin
                  </span>
                  <div className="font-serif text-3xl text-[#852538] font-bold">
                    {formatTND(pendingCommissionTND)}
                  </div>
                  <span className="text-xs text-[#756B6D] mt-1 block">3 ventes en vérification</span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/20 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                    Rang Suprême Atteint
                  </span>
                  <div className="font-serif text-3xl text-[#23181A] font-bold">
                    Master
                  </div>
                  <span className="text-xs text-[#434B36] font-bold mt-1 block">Taux max de 10 TND / flacon</span>
                </div>
              </div>

              {/* Ranks Hierarchy Showcase */}
              <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-[#23181A] font-semibold">
                  Hiérarchie des Rangs Métalliques & Commissions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {RANKS.map((r) => (
                    <div
                      key={r.name}
                      className={`p-4 rounded-2xl border text-center ${r.bg} ${
                        r.name === currentRank ? "ring-2 ring-[#541B28] border-[#541B28] bg-white shadow-md" : "border-[#541B28]/10 opacity-75"
                      }`}
                    >
                      <span className={`font-serif text-lg font-bold block ${r.color}`}>{r.name}</span>
                      <span className="text-xs text-[#5A4B4E] block mt-1">{r.commission}</span>
                      {r.name === currentRank && (
                        <span className="mt-2 text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#541B28] text-[#FAF7F2] font-bold block">
                          Actuel
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMIT SALE */}
          {activeTab === "submit" && (
            <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-[#541B28]/20 p-8 shadow-xl space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl text-burgundy-gradient font-light">
                  Déclarer une Nouvelle Vente
                </h3>
                <p className="text-xs text-[#756B6D] mt-1">
                  Chaque vente déclarée est vérifiée par l&apos;administration avec la référence de la commande pour validation de votre commission.
                </p>
              </div>

              <form onSubmit={handleSubmitSale} className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    Numéro de Commande Lévania (Ex: LEV-2026-9501)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="LEV-2026-XXXX"
                    value={orderRef}
                    onChange={(e) => setOrderRef(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] uppercase font-mono focus:outline-none focus:border-[#541B28]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    Téléphone du Client Livré
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 XX XXX XXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    Flacon Vendu
                  </label>
                  <select
                    value={productSold}
                    onChange={(e) => setProductSold(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2.5 text-xs text-[#23181A] font-medium focus:outline-none focus:border-[#541B28]"
                  >
                    <option value="Onde d'Or (100ml)">Onde d&apos;Or (100ml)</option>
                    <option value="Onde d'Or (50ml)">Onde d&apos;Or (50ml)</option>
                    <option value="Sillage d'Olivier (100ml)">Sillage d&apos;Olivier (100ml)</option>
                    <option value="Néroli Flottant (50ml)">Néroli Flottant (50ml)</option>
                    <option value="Oud Impérial (100ml)">Oud Impérial (100ml)</option>
                    <option value="Coffret Sur-Mesure">Coffret Sur-Mesure</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                    Commentaire ou Preuve Additionnelle
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Remarques éventuelles sur la livraison ou le client..."
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 flex justify-between items-center text-xs">
                  <span className="text-[#5A4B4E]">Commission calculée pour ce flacon :</span>
                  <span className="font-serif text-base text-[#541B28] font-bold">10.000 TND</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Soumettre pour Audit
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SALES HISTORY */}
          {activeTab === "sales" && (
            <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold mb-4">
                Historique de Vos Ventes & Commissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                      <th className="pb-3">Réf Commande</th>
                      <th className="pb-3">Produit</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Commission</th>
                      <th className="pb-3">Statut Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#541B28]/5">
                    {salesList.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF7F2]">
                        <td className="py-3 font-mono font-bold text-[#541B28]">{s.orderRef}</td>
                        <td className="py-3 text-[#23181A] font-medium">{s.product}</td>
                        <td className="py-3 text-[#756B6D]">{s.date}</td>
                        <td className="py-3 font-serif text-[#541B28] font-bold">
                          {formatTND(s.commissionTND)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              s.status === "Payée"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : s.status === "Approuvée"
                                ? "bg-sky-50 text-sky-800 border border-sky-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: OBJECTIVES & BONUSES */}
          {activeTab === "objectives" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Objectifs Périodiques & Primes</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Objectif Hebdomadaire", target: "8 Flacons", current: "6 / 8", bonus: "+50 TND Bonus", deadline: "Ce Dimanche 23h59" },
                  { title: "Challenge Mensuel Prestige", target: "30 Flacons", current: "28 / 30", bonus: "+200 TND Bonus", deadline: "Fin du Mois" },
                  { title: "Défi Collection Sombre", target: "5 Flacons Oud Impérial", current: "3 / 5", bonus: "+1 Flacon 50ml Offert", deadline: "Dans 10 jours" },
                ].map((obj, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                    <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
                      {obj.title}
                    </span>
                    <h4 className="font-serif text-xl text-[#23181A] font-semibold mb-2">{obj.target}</h4>
                    <div className="flex justify-between text-xs text-[#756B6D] mb-1">
                      <span>Progression : {obj.current}</span>
                      <span className="text-[#434B36] font-bold">{obj.bonus}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#FAF7F2] border border-[#541B28]/15 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#541B28] to-[#852538] w-4/5 rounded-full" />
                    </div>
                    <span className="text-[10px] text-[#756B6D] block mt-3">Échéance : {obj.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GROUP & PRIVATE CHAT */}
          {activeTab === "chat" && (
            <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-xl h-[560px] flex flex-col justify-between animate-in fade-in">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#541B28]/10">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#541B28]" />
                    <h3 className="font-serif text-lg text-[#23181A] font-semibold">Salon Officiel du Réseau Revendeurs</h3>
                  </div>
                  <span className="text-[10px] text-[#434B36] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Modéré par la Direction Générale
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
                {chatMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed shadow-sm ${
                      m.role === "admin"
                        ? "bg-[#FAF7F2] border border-[#541B28]/15 text-[#23181A]"
                        : "bg-[#541B28] text-[#FAF7F2] ml-auto"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 text-[10px]">
                      <span className="font-bold">{m.sender}</span>
                      <span className="opacity-70">{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Compose */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-[#541B28]/10">
                <input
                  type="text"
                  placeholder="Écrire un message au réseau ou à l'administration..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#DFC68B]" />
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
