"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { formatTND } from "@/lib/utils";
import {
  Briefcase,
  Trophy,
  Target,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Send,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Layers,
} from "lucide-react";

export default function ResellerDashboardPage() {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<"overview" | "submit" | "sales" | "objectives" | "chat">("overview");

  // Reseller state
  const currentRank = "Master";
  const validatedSalesCount = 28;
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
      `Référence ${newSale.orderRef} enregistrée &bull; En attente de contrôle`,
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
    { name: "Iron", commission: "5 TND / vente", color: "text-zinc-400 border-zinc-500/30", bg: "bg-zinc-900" },
    { name: "Bronze", commission: "6 TND / vente", color: "text-amber-600 border-amber-600/30", bg: "bg-amber-950/40" },
    { name: "Gold", commission: "7.5 TND / vente", color: "text-amber-300 border-amber-300/30", bg: "bg-amber-900/40" },
    { name: "Platinum", commission: "8.5 TND / vente", color: "text-cyan-300 border-cyan-400/30", bg: "bg-cyan-950/40" },
    { name: "Diamond", commission: "9 TND / vente", color: "text-sky-200 border-sky-300/30", bg: "bg-sky-950/40" },
    { name: "Master", commission: "10 TND / vente", color: "text-gold-gradient border-[#C7A66A]", bg: "bg-[#20271E]" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C7A66A]/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Réseau Officiel Revendeurs Lévania</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
                Portail Revendeur &bull; {user?.name || "Amira Khemir"}
              </h1>
              <p className="text-xs text-[#89877F] mt-1">
                Identifiant : <span className="font-mono text-[#C7A66A]">RES-MASTER-77</span> &bull; Rang Actuel : <strong className="text-emerald-400">Master (10 TND / Vente)</strong>
              </p>
            </div>

            <button
              onClick={() => setActiveTab("submit")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-95"
            >
              <Plus className="w-4 h-4" />
              <span>Déclarer une Vente</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 no-scrollbar">
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
              {/* Financial & Performance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    Commissions Payées
                  </span>
                  <div className="font-serif text-3xl text-emerald-400 font-bold">
                    {formatTND(paidCommissionTND)}
                  </div>
                  <span className="text-xs text-[#89877F] mt-1 block">Versées sur compte bancaire</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    Commissions Validées (Payables)
                  </span>
                  <div className="font-serif text-3xl text-gold-gradient font-bold">
                    {formatTND(approvedCommissionTND)}
                  </div>
                  <span className="text-xs text-[#C7A66A] mt-1 block">Prêtes pour le virement du 20</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#89877F] font-semibold block mb-1">
                    En Cours d&apos;Audit Admin
                  </span>
                  <div className="font-serif text-3xl text-amber-400 font-bold">
                    {formatTND(pendingCommissionTND)}
                  </div>
                  <span className="text-xs text-[#89877F] mt-1 block">3 ventes en vérification</span>
                </div>

                <div className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/40 backdrop-blur-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block mb-1">
                    Rang Suprême Atteint
                  </span>
                  <div className="font-serif text-3xl text-[#F6F1E8] font-bold">
                    Master
                  </div>
                  <span className="text-xs text-emerald-300 mt-1 block">Taux max de 10 TND / flacon</span>
                </div>
              </div>

              {/* Ranks Hierarchy Showcase */}
              <div className="p-6 rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 backdrop-blur-xl space-y-4">
                <h3 className="font-serif text-xl text-[#F6F1E8]">
                  Hiérarchie des Rangs Métalliques & Commissions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {RANKS.map((r) => (
                    <div
                      key={r.name}
                      className={`p-4 rounded-2xl border text-center ${r.bg} ${
                        r.name === currentRank ? "ring-2 ring-[#C7A66A] border-[#C7A66A]" : "opacity-75"
                      }`}
                    >
                      <span className={`font-serif text-lg font-bold block ${r.color}`}>{r.name}</span>
                      <span className="text-xs text-[#E9DFCE] block mt-1">{r.commission}</span>
                      {r.name === currentRank && (
                        <span className="mt-2 text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#C7A66A] text-[#171715] font-bold block">
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
            <div className="max-w-2xl mx-auto rounded-3xl bg-[#20271E]/70 border border-[#C7A66A]/30 p-8 backdrop-blur-xl space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl text-gold-gradient font-light">
                  Déclarer une Nouvelle Vente
                </h3>
                <p className="text-xs text-[#89877F] mt-1">
                  Chaque vente déclarée est vérifiée par l&apos;administration avec la référence de la commande pour validation de votre commission.
                </p>
              </div>

              <form onSubmit={handleSubmitSale} className="space-y-4">
                <div>
                  <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                    Numéro de Commande Lévania (Ex: LEV-2026-9501)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="LEV-2026-XXXX"
                    value={orderRef}
                    onChange={(e) => setOrderRef(e.target.value)}
                    className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] uppercase font-mono focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                    Téléphone du Client Livré
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 XX XXX XXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                    Flacon Vendu
                  </label>
                  <select
                    value={productSold}
                    onChange={(e) => setProductSold(e.target.value)}
                    className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-3 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
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
                  <label className="text-[11px] text-[#89877F] uppercase tracking-wider block mb-1">
                    Commentaire ou Preuve Additionnelle
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Remarques éventuelles sur la livraison ou le client..."
                    value={evidenceNotes}
                    onChange={(e) => setEvidenceNotes(e.target.value)}
                    className="w-full bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#171715] border border-[#C7A66A]/20 flex justify-between items-center text-xs">
                  <span>Commission calculée pour ce flacon :</span>
                  <span className="font-serif text-base text-[#C7A66A] font-bold">10.000 TND</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg"
                >
                  Soumettre pour Audit
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SALES HISTORY */}
          {activeTab === "sales" && (
            <div className="rounded-3xl bg-[#20271E]/40 border border-[#C7A66A]/20 p-6 backdrop-blur-xl animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#F6F1E8] mb-4">
                Historique de Vos Ventes & Commissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#89877F] uppercase tracking-wider border-b border-white/5 pb-2">
                      <th className="pb-3">Réf Commande</th>
                      <th className="pb-3">Produit</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Commission</th>
                      <th className="pb-3">Statut Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {salesList.map((s) => (
                      <tr key={s.id} className="hover:bg-white/5">
                        <td className="py-3 font-mono font-bold text-[#C7A66A]">{s.orderRef}</td>
                        <td className="py-3 text-[#F6F1E8]">{s.product}</td>
                        <td className="py-3 text-[#89877F]">{s.date}</td>
                        <td className="py-3 font-serif text-[#C7A66A] font-semibold">
                          {formatTND(s.commissionTND)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                              s.status === "Payée"
                                ? "bg-emerald-950 text-emerald-300"
                                : s.status === "Approuvée"
                                ? "bg-cyan-950 text-cyan-300"
                                : "bg-amber-950 text-amber-300"
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
              <h3 className="font-serif text-2xl text-[#F6F1E8]">Objectifs Périodiques & Primes</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Objectif Hebdomadaire", target: "8 Flacons", current: "6 / 8", bonus: "+50 TND Bonus", deadline: "Ce Dimanche 23h59" },
                  { title: "Challenge Mensuel Prestige", target: "30 Flacons", current: "28 / 30", bonus: "+200 TND Bonus", deadline: "Fin du Mois" },
                  { title: "Défi Collection Sombre", target: "5 Flacons Oud Impérial", current: "3 / 5", bonus: "+1 Flacon 50ml Offert", deadline: "Dans 10 jours" },
                ].map((obj, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20">
                    <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-bold block mb-1">
                      {obj.title}
                    </span>
                    <h4 className="font-serif text-xl text-[#F6F1E8] mb-2">{obj.target}</h4>
                    <div className="flex justify-between text-xs text-[#89877F] mb-1">
                      <span>Progression : {obj.current}</span>
                      <span className="text-emerald-400 font-semibold">{obj.bonus}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] w-4/5" />
                    </div>
                    <span className="text-[10px] text-[#89877F] block mt-3">Échéance : {obj.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GROUP & PRIVATE CHAT */}
          {activeTab === "chat" && (
            <div className="rounded-3xl bg-[#20271E]/60 border border-[#C7A66A]/20 p-6 backdrop-blur-xl h-[560px] flex flex-col justify-between animate-in fade-in">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C7A66A]" />
                    <h3 className="font-serif text-lg text-[#F6F1E8]">Salon Officiel du Réseau Revendeurs</h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Modéré par la Direction Générale
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
                {chatMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed ${
                      m.role === "admin"
                        ? "bg-[#343B2B]/60 border border-[#C7A66A]/30 text-[#F6F1E8]"
                        : "bg-[#171715] border border-white/10 text-[#E9DFCE] ml-auto"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1 text-[10px]">
                      <span className="font-bold text-[#C7A66A]">{m.sender}</span>
                      <span className="text-[#89877F]">{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Compose */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-white/5">
                <input
                  type="text"
                  placeholder="Écrire un message au réseau ou à l'administration..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-[#171715] border border-[#C7A66A]/20 rounded-xl px-4 py-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C7A66A]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] hover:opacity-95"
                >
                  <Send className="w-4 h-4" />
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
