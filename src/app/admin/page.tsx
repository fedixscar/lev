"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PRODUCTS, getAllProducts, saveProduct, deleteProduct, PRODUCTS_UPDATED_EVENT } from "@/lib/catalogue";
import { formatTND } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { Product } from "@/types";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { DeleteProductModal } from "@/components/admin/DeleteProductModal";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  QrCode,
  Flame,
  Check,
  X,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, isLoading } = useAuth();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "resellers" | "qr" | "luck">("overview");

  // Dynamic Store & Catalogue State
  const [productList, setProductList] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [orders, setOrders] = useState<Array<{
    id: string;
    number: string;
    customer: string;
    phone?: string;
    city?: string;
    items: string;
    totalTND: number;
    paymentMethod: string;
    status: string;
    date: string;
  }>>([]);

  const [resellerSales, setResellerSales] = useState<Array<{
    id: string;
    resellerName: string;
    rank: string;
    orderRef: string;
    product: string;
    amountTND?: number;
    commissionTND: number;
    status: string;
    date: string;
  }>>([]);

  // Load real orders, products, and reseller sales on client mount
  React.useEffect(() => {
    setProductList(getAllProducts());
    const handleProductsUpdated = () => setProductList(getAllProducts());
    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleProductsUpdated);

    try {
      const storedOrders = localStorage.getItem("levania_orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
      const storedSales = localStorage.getItem("levania_reseller_sales");
      if (storedSales) {
        const parsed = JSON.parse(storedSales);
        if (Array.isArray(parsed)) {
          setResellerSales(parsed);
        }
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleProductsUpdated);
    };
  }, []);

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleOpenDeleteModal = (prod: Product) => {
    setProductToDelete(prod);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = (prod: Product) => {
    const updated = saveProduct(prod);
    setProductList(updated);
    setIsProductModalOpen(false);
    showToast(
      editingProduct ? "Flacon Modifié" : "Flacon Ajouté au Catalogue",
      `${prod.name} est maintenant disponible sur la boutique.`,
      "luxury"
    );
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const updated = deleteProduct(productToDelete.id);
    setProductList(updated);
    setIsDeleteModalOpen(false);
    showToast(
      "Flacon Retiré du Catalogue",
      `${productToDelete.name} a été supprimé.`,
      "info"
    );
    setProductToDelete(null);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem("levania_orders", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast("Statut Commande Mis à Jour", `Commande passée à '${newStatus}'`, "success");
  };

  const handleApproveResellerSale = (saleId: string) => {
    setResellerSales((prev) => {
      const updated = prev.map((s) => (s.id === saleId ? { ...s, status: "Approuvée" } : s));
      try {
        localStorage.setItem("levania_reseller_sales", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast("Vente Revendeur Approuvée", `Commission validée pour ${saleId}`, "success");
  };

  const handleRejectResellerSale = (saleId: string) => {
    setResellerSales((prev) => {
      const updated = prev.map((s) => (s.id === saleId ? { ...s, status: "Rejetée" } : s));
      try {
        localStorage.setItem("levania_reseller_sales", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast("Vente Rejetée", "Statut mis à jour", "info");
  };

  // Real-time computed metrics from active orders and catalogue
  const totalRevenueTND = orders.reduce((sum, o) => sum + (Number(o.totalTND) || 0), 0);
  const totalOrdersCount = orders.length;
  const avgBasketTND = totalOrdersCount > 0 ? totalRevenueTND / totalOrdersCount : 0;
  const pendingCommissionsTND = resellerSales
    .filter((s) => s.status === "En Attente" || s.status === "En Attente de Revue")
    .reduce((sum, s) => sum + (Number(s.commissionTND) || 0), 0);
  const pendingSalesCount = resellerSales.filter(
    (s) => s.status === "En Attente" || s.status === "En Attente de Revue"
  ).length;
  const criticalStockItems = productList.flatMap((p) =>
    p.formats.filter((f) => f.stock < 20).map((f) => `${p.name} (${f.size})`)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#541B28] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#541B28] font-bold">Vérification des accréditations...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-28">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#541B28]/20 p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto mb-4 border border-[#541B28]/20">
              <ShieldCheck className="w-8 h-8 text-[#541B28]" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold block mb-1">
              Zone Sécurisée
            </span>
            <h1 className="font-serif text-2xl text-burgundy-gradient font-light mb-3">
              Accès Administration Réservé
            </h1>
            <p className="text-xs text-[#5A4B4E] leading-relaxed mb-6">
              Cet espace est strictement réservé à la direction générale et aux administrateurs autorisés de la maison LÉVANIA PARFUMS.
            </p>
            <div className="space-y-3">
              <Link
                href="/login?redirect=/admin"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-6 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <span>S&apos;identifier avec un Compte Admin</span>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#541B28]/25 text-[#541B28] text-xs font-bold mb-2 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#541B28]" />
                <span>Panneau de Contrôle &bull; Direction Générale</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                Administration Centrale Lévania Parfums
              </h1>
              <p className="text-xs text-[#756B6D] mt-1">
                Supervision des ventes, gestion des stocks, validation des commissions revendeurs et configuration des Vagues.
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#541B28]/10 no-scrollbar">
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
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    Chiffre d&apos;Affaires Réalisé
                  </span>
                  <div className="font-serif text-3xl text-burgundy-gradient font-bold">
                    {formatTND(totalRevenueTND)}
                  </div>
                  <span className="text-xs text-[#434B36] font-bold mt-1 block">
                    {totalOrdersCount} commande{totalOrdersCount > 1 ? "s" : ""} enregistrée{totalOrdersCount > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    Commandes Confirmées
                  </span>
                  <div className="font-serif text-3xl text-[#23181A] font-bold">
                    {totalOrdersCount} Commande{totalOrdersCount > 1 ? "s" : ""}
                  </div>
                  <span className="text-xs text-[#756B6D] mt-1 block">
                    Panier moyen : {formatTND(avgBasketTND)}
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#756B6D] font-bold block mb-1">
                    Commissions Revendeurs En Attente
                  </span>
                  <div className="font-serif text-3xl text-[#541B28] font-bold">
                    {formatTND(pendingCommissionsTND)}
                  </div>
                  <span className="text-xs text-[#756B6D] mt-1 block">
                    {pendingSalesCount} vente{pendingSalesCount > 1 ? "s" : ""} à valider
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-300 text-rose-900 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-rose-800 font-bold block mb-1">
                    Alertes Stock Critique
                  </span>
                  <div className="font-serif text-3xl text-rose-700 font-bold">
                    {criticalStockItems.length} Flacon{criticalStockItems.length > 1 ? "s" : ""} &lt; 20 ex.
                  </div>
                  <span className="text-xs text-rose-800 mt-1 block font-medium truncate">
                    {criticalStockItems.length > 0 ? criticalStockItems.slice(0, 2).join(", ") : "Stock nominal"}
                  </span>
                </div>
              </div>

              {/* Recent Orders quick table */}
              <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#541B28]/10">
                  <h3 className="font-serif text-xl text-[#23181A] font-semibold">Flux Récent des Commandes Clients</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-xs text-[#541B28] font-bold hover:underline">
                    Gérer toutes les commandes &rarr;
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-[#FAF7F2]/60 border border-[#541B28]/10">
                    <ShoppingBag className="w-10 h-10 text-[#541B28]/40 mx-auto mb-3" />
                    <h4 className="font-serif text-base text-[#23181A] font-semibold mb-1">
                      Aucune commande enregistrée pour le moment
                    </h4>
                    <p className="text-xs text-[#756B6D] max-w-md mx-auto">
                      Dès qu&apos;un client finalise un panier sur la boutique, sa commande et ses coordonnées apparaîtront en direct ici.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                          <th className="pb-3">Réf</th>
                          <th className="pb-3">Client</th>
                          <th className="pb-3">Ville</th>
                          <th className="pb-3">Articles</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#541B28]/5">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3 font-mono font-bold text-[#541B28]">{ord.number}</td>
                            <td className="py-3 text-[#23181A] font-medium">{ord.customer}</td>
                            <td className="py-3 text-[#756B6D]">{ord.city || "—"}</td>
                            <td className="py-3 text-[#5A4B4E]">{ord.items}</td>
                            <td className="py-3 font-serif text-[#541B28] font-bold">
                              {formatTND(ord.totalTND)}
                            </td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & PODIUM */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Catalogue & Podium Bestsellers</h3>
                  <p className="text-xs text-[#756B6D] mt-0.5">
                    {productList.length} flacon{productList.length > 1 ? "s" : ""} référencé{productList.length > 1 ? "s" : ""} &bull; Créez, modifiez ou supprimez vos parfums avec synchronisation instantanée sur la boutique.
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateProduct}
                  className="px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Plus className="w-4 h-4 text-[#DFC68B]" />
                  <span>Nouveau Flacon</span>
                </button>
              </div>

              <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                      <th className="pb-3">Visuel</th>
                      <th className="pb-3">Nom & Collection</th>
                      <th className="pb-3">Genre / Famille</th>
                      <th className="pb-3">Prix (50ml / 100ml)</th>
                      <th className="pb-3">Stock Actuel</th>
                      <th className="pb-3">Rang Podium</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#541B28]/5">
                    {productList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                        <td className="py-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#541B28]/15 shadow-xs">
                            <Image
                              src={prod.images.main}
                              alt={prod.name}
                              fill
                              className="object-cover"
                              unoptimized={prod.images.main.startsWith("data:")}
                            />
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="font-serif text-sm text-[#23181A] font-semibold block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-[#541B28] font-bold">{prod.collection}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-[#23181A] font-medium block">{prod.gender || "Unisexe"}</span>
                          <span className="text-[10px] text-[#756B6D]">{prod.fragranceFamily}</span>
                        </td>
                        <td className="py-3 font-serif text-[#541B28] font-bold">
                          {formatTND(prod.formats[0]?.priceTND || 0)} / {formatTND(prod.formats[1]?.priceTND || 0)}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            (prod.formats[0]?.stock || 0) < 15 ? "bg-rose-50 text-rose-800 border border-rose-300" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          }`}>
                            {prod.formats[0]?.stock || 0} ex. (50ml) &bull; {prod.formats[1]?.stock || 0} ex. (100ml)
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#541B28]/20 text-[#541B28] font-bold">
                            #{prod.bestsellerRank || "—"}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-[#FAF7F2] transition-colors border border-[#541B28]/20"
                              title="Modifier ce flacon"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(prod)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white transition-colors border border-rose-200"
                              title="Supprimer ce flacon"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Gestion des Expéditions & Commandes</h3>
              {orders.length === 0 ? (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-12 text-center shadow-sm">
                  <ShoppingBag className="w-12 h-12 text-[#541B28]/40 mx-auto mb-3" />
                  <h4 className="font-serif text-lg text-[#23181A] font-semibold mb-1">
                    Le registre des commandes est actuellement vide
                  </h4>
                  <p className="text-xs text-[#756B6D] max-w-md mx-auto">
                    Aucune commande n&apos;a encore été passée. Lorsqu&apos;un visiteur achète un flacon, sa commande apparaîtra ici avec son statut et le mode d&apos;expédition.
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                        <th className="pb-3">N° Commande</th>
                        <th className="pb-3">Client & Contact</th>
                        <th className="pb-3">Articles</th>
                        <th className="pb-3">Mode Paiement</th>
                        <th className="pb-3">Montant</th>
                        <th className="pb-3">Statut Actuel</th>
                        <th className="pb-3">Action Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#541B28]/5">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF7F2]">
                          <td className="py-3 font-mono font-bold text-[#541B28]">{ord.number}</td>
                          <td className="py-3">
                            <span className="text-[#23181A] font-semibold block">{ord.customer}</span>
                            <span className="text-[10px] text-[#756B6D]">{ord.phone || "—"} &bull; {ord.city || "—"}</span>
                          </td>
                          <td className="py-3 text-[#5A4B4E]">{ord.items}</td>
                          <td className="py-3 text-[#756B6D]">{ord.paymentMethod}</td>
                          <td className="py-3 font-serif text-[#541B28] font-bold">{formatTND(ord.totalTND)}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="bg-[#FAF7F2] border border-[#541B28]/20 rounded-lg px-2.5 py-1 text-xs text-[#23181A] font-medium"
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
              )}
            </div>
          )}

          {/* TAB 4: RESELLERS VALIDATION */}
          {activeTab === "resellers" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Validation des Ventes & Commissions Revendeurs</h3>
              <p className="text-xs text-[#756B6D]">
                Règle: Les commissions ne sont payables qu&apos;après validation administrative de la preuve d&apos;achat et contrôle d&apos;absence de doublon.
              </p>

              {resellerSales.length === 0 ? (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-12 text-center shadow-sm">
                  <Users className="w-12 h-12 text-[#541B28]/40 mx-auto mb-3" />
                  <h4 className="font-serif text-lg text-[#23181A] font-semibold mb-1">
                    Aucune déclaration de vente revendeur
                  </h4>
                  <p className="text-xs text-[#756B6D] max-w-md mx-auto">
                    Les revendeurs accrédités peuvent déclarer leurs ventes via le portail Revendeur. Les demandes apparaîtront ici pour arbitrage.
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                        <th className="pb-3">Revendeur</th>
                        <th className="pb-3">Rang</th>
                        <th className="pb-3">Réf Commande</th>
                        <th className="pb-3">Produit Vendu</th>
                        <th className="pb-3">Commission Prévue</th>
                        <th className="pb-3">Statut</th>
                        <th className="pb-3">Décision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#541B28]/5">
                      {resellerSales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-[#FAF7F2]">
                          <td className="py-3 text-[#23181A] font-semibold">{sale.resellerName}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[#434B36] border border-[#434B36]/30 text-[10px] font-bold">
                              {sale.rank}
                            </span>
                          </td>
                          <td className="py-3 font-mono text-[#541B28] font-bold">{sale.orderRef}</td>
                          <td className="py-3 text-[#5A4B4E]">{sale.product}</td>
                          <td className="py-3 font-serif text-[#541B28] font-bold">{formatTND(sale.commissionTND)}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              sale.status === "Approuvée"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : sale.status === "Rejetée"
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}>
                              {sale.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {sale.status === "En Attente" || sale.status === "En Attente de Revue" ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleApproveResellerSale(sale.id)}
                                  className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                                  title="Approuver la commission"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectResellerSale(sale.id)}
                                  className="p-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-800"
                                  title="Rejeter"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-[#756B6D]">Traité ({sale.status})</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LUCK & WHEEL CONFIG */}
          {activeTab === "luck" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Configuration des Vagues de la Roue du Destin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { tier: "Normal Wave", range: "1 à 100 Luck", topReward: "50 à 100 Points Fidélité / Échantillon 5ml", bg: "bg-white" },
                  { tier: "Fire Wave", range: "101 à 1,000 Luck", topReward: "Coupon -20% / Bon 30 TND / Coffret 3 Échantillons", bg: "bg-rose-50/40" },
                  { tier: "Royal Wave", range: "1,001 à 7,776 Luck", topReward: "Flacon 50ml Offert / Bon 80 TND Royal / Coupon -35%", bg: "bg-amber-50/40" },
                  { tier: "Admin Wave", range: "7,777 Luck (Cap)", topReward: "Trésor Lévania : 2 Flacons 100ml + Coffret Cylindrique Doré", bg: "bg-gradient-to-r from-[#3B121C] to-[#541B28] text-[#FAF7F2]" },
                ].map((t, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl border border-[#541B28]/20 shadow-sm ${t.bg}`}>
                    <span className="text-xs uppercase tracking-widest font-bold block mb-1">
                      {t.tier}
                    </span>
                    <h4 className="font-serif text-xl font-semibold mb-2">{t.range}</h4>
                    <p className="text-xs opacity-80 mb-4">Lot phare : <strong>{t.topReward}</strong></p>
                    <span className="text-[10px] font-bold text-emerald-600">Poids probabiliste verrouillé côté serveur</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: QR CODE MANAGER */}
          {activeTab === "qr" && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-serif text-2xl text-[#23181A] font-semibold">Gestion des QR Codes de Traçabilité Flacons</h3>
              <p className="text-xs text-[#756B6D]">
                Générez des jetons cryptographiques uniques pour chaque flacon scellé et associez-les au lot de mise en bouteille.
              </p>

              <div className="p-6 rounded-3xl bg-white border border-[#541B28]/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#23181A] font-semibold">Générer un Nouveau Lot de QR Codes</h4>
                  <p className="text-xs text-[#756B6D]">Création par paquet de 50 jetons avec export planche imprimable.</p>
                </div>
                <button
                  onClick={() => showToast("Lot de 50 QR Codes généré", "Export PDF prêt pour l'atelier", "success")}
                  className="px-6 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Générer le Lot
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name || "ce flacon"}
      />

      <Footer />
    </div>
  );
}
