"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  PRODUCTS,
  getAllProducts,
  fetchRemoteProducts,
  saveProduct,
  deleteProduct,
  clearAllProducts,
  resetDefaultProducts,
  PRODUCTS_UPDATED_EVENT,
} from "@/lib/catalogue";
import { formatTND } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { Product } from "@/types";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { DeleteProductModal } from "@/components/admin/DeleteProductModal";
import { OrderBottlesModal } from "@/components/admin/OrderBottlesModal";
import { CreateCouponModal } from "@/components/admin/CreateCouponModal";
import { PrintCouponVoucherModal } from "@/components/admin/PrintCouponVoucherModal";
import { EditEventModal } from "@/components/admin/EditEventModal";
import { DEFAULT_ACCOUNTS } from "@/context/AuthContext";
import {
  PromoCode,
  getAllCoupons,
  deleteCoupon,
  toggleCouponActive,
  getRemainingTimeLabel,
  COUPONS_UPDATED_EVENT,
} from "@/lib/coupons";
import {
  SeasonalEvent,
  getAllEvents,
  getActiveEvent,
  toggleEventActive,
  deleteEvent,
  EVENTS_UPDATED_EVENT,
} from "@/lib/events";
import {
  BottleCertificate,
  getAllCertificates,
  saveCertificate,
  CERTIFICATES_UPDATED_EVENT,
} from "@/lib/certificates";
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
  Film,
  ExternalLink,
  Printer,
  Search,
  Sparkles,
  Tag,
  Copy,
  Calendar,
  Snowflake,
  Power,
  Gift,
  Ticket,
  Clock,
  RotateCcw,
  Wand2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, isLoading, signIn } = useAuth();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "coupons" | "events" | "resellers" | "qr" | "luck"
  >("overview");

  // Dynamic Store & Catalogue State
  const [productList, setProductList] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productModalMode, setProductModalMode] = useState<"create" | "edit">("create");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Quick Fragrantica AI Import
  const [quickFragranticaUrl, setQuickFragranticaUrl] = useState("");
  const [isQuickScraping, setIsQuickScraping] = useState(false);
  const [quickScrapeError, setQuickScrapeError] = useState<string | null>(null);

  const [orders, setOrders] = useState<Array<{
    id: string;
    number: string;
    customer: string;
    email?: string;
    phone?: string;
    city?: string;
    items: string;
    itemsList?: any[];
    certificates?: BottleCertificate[];
    totalTND: number;
    paymentMethod: string;
    status: string;
    date: string;
  }>>([]);

  const [selectedOrderForBottles, setSelectedOrderForBottles] = useState<any | null>(null);
  const [isOrderBottlesModalOpen, setIsOrderBottlesModalOpen] = useState(false);
  const [allCertificates, setAllCertificates] = useState<BottleCertificate[]>([]);
  const [certSearch, setCertSearch] = useState("");
  const [certFilter, setCertFilter] = useState<"all" | "with-video" | "no-video">("all");

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

  // Coupons & QR State
  const [couponsList, setCouponsList] = useState<PromoCode[]>([]);
  const [isCreateCouponModalOpen, setIsCreateCouponModalOpen] = useState(false);
  const [selectedCouponForPrint, setSelectedCouponForPrint] = useState<PromoCode | null>(null);
  const [isPrintVoucherModalOpen, setIsPrintVoucherModalOpen] = useState(false);
  const [couponSearch, setCouponSearch] = useState("");
  const [couponFilter, setCouponFilter] = useState<"all" | "active" | "expired">("all");
  const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(null);

  // Events & Visual Themes State
  const [eventsList, setEventsList] = useState<SeasonalEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<SeasonalEvent | null>(null);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);

  // Load real orders, products, certificates, coupons, events, and reseller sales on client mount
  React.useEffect(() => {
    setProductList(getAllProducts());
    fetchRemoteProducts().then((remoteProds) => {
      if (Array.isArray(remoteProds)) {
        setProductList(remoteProds);
      }
    });
    setAllCertificates(getAllCertificates());
    setCouponsList(getAllCoupons());
    setEventsList(getAllEvents());

    const handleProductsUpdated = () => setProductList(getAllProducts());
    const handleCertsUpdated = () => setAllCertificates(getAllCertificates());
    const handleCouponsUpdated = () => setCouponsList(getAllCoupons());
    const handleEventsUpdated = () => setEventsList(getAllEvents());

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleProductsUpdated);
    window.addEventListener(CERTIFICATES_UPDATED_EVENT, handleCertsUpdated);
    window.addEventListener(COUPONS_UPDATED_EVENT, handleCouponsUpdated);
    window.addEventListener(EVENTS_UPDATED_EVENT, handleEventsUpdated);

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
      window.removeEventListener(CERTIFICATES_UPDATED_EVENT, handleCertsUpdated);
      window.removeEventListener(COUPONS_UPDATED_EVENT, handleCouponsUpdated);
      window.removeEventListener(EVENTS_UPDATED_EVENT, handleEventsUpdated);
    };
  }, []);

  const handlePrintSingleLabel = (cert: BottleCertificate) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Étiquette Flacon QR - ${cert.serialNumber}</title>
          <style>
            @page { size: 70mm 100mm; margin: 0; }
            body {
              font-family: 'Cinzel', serif, system-ui;
              margin: 0;
              padding: 20px;
              background: #FAF7F2;
              color: #23181A;
              text-align: center;
              box-sizing: border-box;
            }
            .border-box {
              border: 2px solid #541B28;
              border-radius: 16px;
              padding: 16px 12px;
              background: #FFF;
            }
            .logo {
              font-size: 14px;
              font-weight: 700;
              color: #541B28;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .sub {
              font-size: 8px;
              color: #756B6D;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 12px;
            }
            .qr-img {
              width: 140px;
              height: 140px;
              margin: 0 auto 10px auto;
              display: block;
              border: 1px solid #541B28;
              border-radius: 8px;
              padding: 4px;
              background: #FAF7F2;
            }
            .name {
              font-size: 13px;
              font-weight: 700;
              color: #23181A;
              margin-bottom: 2px;
            }
            .customer {
              font-size: 10px;
              color: #541B28;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .serial {
              font-family: monospace;
              font-size: 9px;
              color: #5A4B4E;
              background: #FAF7F2;
              padding: 4px 8px;
              border-radius: 4px;
              display: inline-block;
              margin-bottom: 8px;
            }
            .notice {
              font-size: 7px;
              color: #756B6D;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="border-box">
            <div class="logo">LÉVANIA</div>
            <div class="sub">Haute Parfumerie &bull; Flacon Scellé</div>
            ${cert.qrDataUrl ? `<img src="${cert.qrDataUrl}" class="qr-img" />` : ""}
            <div class="name">${cert.productName} (${cert.formatSize})</div>
            <div class="customer">Dédié à ${cert.customerName}</div>
            <div class="serial">${cert.serialNumber}</div>
            <div class="notice">Scannez pour accéder au certificat numérique &amp; à la vidéo artisanale</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleOpenBottleOrder = (cert: BottleCertificate) => {
    const matchingOrder = orders.find(
      (o) => o.number === cert.orderNumber || o.id === cert.orderId
    ) || {
      id: cert.orderId || `ord-${cert.token}`,
      number: cert.orderNumber || "LEV-OFFICIEL",
      customer: cert.customerName || "Client Lévania",
      email: cert.customerEmail || "",
      phone: cert.customerPhone || "",
      items: `${cert.productName} (${cert.formatSize})`,
    };
    setSelectedOrderForBottles(matchingOrder);
    setIsOrderBottlesModalOpen(true);
  };

  const handleOpenCreateProduct = () => {
    setProductModalMode("create");
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setProductModalMode("edit");
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
    const targetId = productToDelete.id || productToDelete.slug;
    const updated = deleteProduct(targetId);
    setProductList(updated);
    setIsDeleteModalOpen(false);
    showToast(
      "Flacon Retiré du Catalogue",
      `${productToDelete.name} a été supprimé du catalogue.`,
      "info"
    );
    setProductToDelete(null);
  };

  const handleClearAllCatalogue = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer tous les flacons du catalogue ? Cette action vide entièrement la boutique pour vous permettre d'ajouter vos propres parfums."
      )
    ) {
      const updated = clearAllProducts();
      setProductList(updated);
      showToast("Catalogue Vidé", "Tous les flacons ont été retirés de la boutique.", "info");
    }
  };

  const handleRestoreDefaults = () => {
    if (
      window.confirm(
        "Souhaitez-vous restaurer les 10 flacons originaux de la Maison Lévania ?"
      )
    ) {
      const updated = resetDefaultProducts();
      setProductList(updated);
      showToast(
        "Catalogue Initial Restauré",
        "Les 10 créations d'origine ont été réactivées.",
        "luxury"
      );
    }
  };

  const handleQuickFragranticaImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickFragranticaUrl.trim() || isQuickScraping) return;

    setIsQuickScraping(true);
    setQuickScrapeError(null);

    try {
      const res = await fetch("/api/admin/scrape-perfume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: quickFragranticaUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Impossible d'extraire les données du parfum.");
      }

      const rawName = data.name || "Nouveau Parfum";
      const slug = rawName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const newProduct: Product = {
        id: `lev-${Date.now()}`,
        name: rawName,
        slug,
        frenchName: rawName,
        subtitle: data.subtitle || (data.brand ? `${data.brand} • Eau de Parfum` : "Extrait de Parfum Absolu"),
        collection: data.collection || "La Collection Signature",
        collectionSlug: "signature",
        gender: data.gender || "Unisexe",
        waveExpression: "signature",
        wavePalette: "gold",
        fragranceFamily: data.fragranceFamily || "Amber",
        intensity: data.intensity || "Intense",
        occasions: ["Signature Personnelle", "Moments d'Exception"],
        description: data.description || "",
        sensoryProfile: data.sensoryProfile || "",
        topNotes: Array.isArray(data.topNotes) && data.topNotes.length > 0 ? data.topNotes : ["Bergamote"],
        heartNotes: Array.isArray(data.heartNotes) && data.heartNotes.length > 0 ? data.heartNotes : ["Rose"],
        baseNotes: Array.isArray(data.baseNotes) && data.baseNotes.length > 0 ? data.baseNotes : ["Ambre"],
        formats: [
          {
            size: "50ml",
            priceTND: Number(data.price50) || 195,
            priceMillimes: Math.round((Number(data.price50) || 195) * 1000),
            stock: Number(data.stock50) || 40,
            sku: `LEV-${slug.slice(0, 4).toUpperCase()}-50`,
          },
          {
            size: "100ml",
            priceTND: Number(data.price100) || 295,
            priceMillimes: Math.round((Number(data.price100) || 295) * 1000),
            stock: Number(data.stock100) || 25,
            sku: `LEV-${slug.slice(0, 4).toUpperCase()}-100`,
          },
        ],
        images: {
          main: "/brand/bottle-and-cylinder.jpg",
          packaging: "/brand/cylinders-dual.jpg",
          lifestyle: "/brand/bottle-and-cylinder.jpg",
          bottleOnly: "/brand/logo-emblem.jpg",
        },
        isFeatured: false,
        isBestseller: false,
        rating: 5.0,
        reviewCount: 0,
        qrEligible: true,
        createdAt: new Date().toISOString(),
      };

      setProductModalMode("create");
      setEditingProduct(newProduct);
      setIsProductModalOpen(true);
      setQuickFragranticaUrl("");
      showToast(
        "Extraction IA Réussie !",
        `${newProduct.name} a été importé depuis Fragrantica. Toutes les notes ont été pré-remplies.`,
        "luxury"
      );
    } catch (err: any) {
      setQuickScrapeError(
        err.message || "Erreur lors de l'extraction. Vérifiez le lien ou le nom."
      );
    } finally {
      setIsQuickScraping(false);
    }
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

  // Coupons & QR Handlers
  const handleToggleCouponActive = (id: string) => {
    const updated = toggleCouponActive(id);
    setCouponsList(getAllCoupons());
    if (updated) {
      showToast(
        updated.isActive ? "Code Promo Activé" : "Code Promo Désactivé",
        `Le code ${updated.code} est désormais ${updated.isActive ? "utilisable" : "mis en pause"}.`,
        "info"
      );
    }
  };

  const handleDeleteCoupon = (id: string, code: string) => {
    if (window.confirm(`Confirmer la suppression définitive du code promo ${code} ?`)) {
      deleteCoupon(id);
      setCouponsList(getAllCoupons());
      showToast("Code Promo Supprimé", `Le code ${code} a été retiré.`, "info");
    }
  };

  const handleCopyCouponLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://levania-parfums.com";
    const link = `${origin}/?coupon=${encodeURIComponent(code)}&autoApply=true`;
    navigator.clipboard.writeText(link);
    setCopiedCouponCode(code);
    showToast("Lien QR Copié", `Lien de scan direct pour ${code}`, "success");
    setTimeout(() => setCopiedCouponCode(null), 2500);
  };

  const handleOpenPrintCoupon = (coupon: PromoCode) => {
    setSelectedCouponForPrint(coupon);
    setIsPrintVoucherModalOpen(true);
  };

  // Seasonal Events Handlers
  const handleToggleEventActive = (id: string) => {
    const updated = toggleEventActive(id);
    setEventsList(getAllEvents());
    if (updated) {
      showToast(
        updated.isActive ? "Campagne Événementielle Activée" : "Événement Mis en Pause",
        `L'événement « ${updated.title} » avec effet « ${updated.visualEffect} » est ${updated.isActive ? "en direct sur le site" : "désactivé"}.`,
        "luxury"
      );
    }
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Confirmer la suppression de la campagne « ${title} » ?`)) {
      deleteEvent(id);
      setEventsList(getAllEvents());
      showToast("Campagne Supprimée", `L'événement ${title} a été supprimé.`, "info");
    }
  };

  const handleOpenEditEvent = (ev: SeasonalEvent) => {
    setEditingEvent(ev);
    setIsEditEventModalOpen(true);
  };

  const handleOpenCreateEvent = () => {
    setEditingEvent(null);
    setIsEditEventModalOpen(true);
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

  const filteredCertificates = allCertificates.filter((cert: BottleCertificate) => {
    const query = certSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      cert.customerName.toLowerCase().includes(query) ||
      cert.serialNumber.toLowerCase().includes(query) ||
      cert.token.toLowerCase().includes(query) ||
      cert.productName.toLowerCase().includes(query) ||
      cert.orderNumber.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (certFilter === "with-video") return !!cert.videoUrl;
    if (certFilter === "no-video") return !cert.videoUrl;
    return true;
  });

  const filteredCoupons = couponsList.filter((coupon) => {
    const q = couponSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      coupon.code.toLowerCase().includes(q) ||
      coupon.description.toLowerCase().includes(q) ||
      (coupon.targetEventTitle && coupon.targetEventTitle.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    const isExpired =
      (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) ||
      (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses);

    if (couponFilter === "active") return coupon.isActive && !isExpired;
    if (couponFilter === "expired") return isExpired || !coupon.isActive;
    return true;
  });

  const activeCouponsCount = couponsList.filter((c) => {
    const isExpired =
      (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now()) ||
      (c.maxUses !== null && c.usedCount >= c.maxUses);
    return c.isActive && !isExpired;
  }).length;

  const totalCouponUses = couponsList.reduce((acc, c) => acc + (c.usedCount || 0), 0);
  const activeSeasonalEvent = eventsList.find((e) => e.isActive) || null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] dark:bg-[#0E0709]">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#541B28] dark:border-[#DFC68B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#541B28] dark:text-[#DFC68B] font-bold">Vérification des accréditations...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-28">
          <div className="max-w-md w-full bg-white dark:bg-[#160D10] rounded-3xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#C7A66A] flex items-center justify-center mx-auto mb-4 border border-[#541B28]/20 dark:border-[#C7A66A]/30">
              <ShieldCheck className="w-8 h-8 text-[#541B28] dark:text-[#C7A66A]" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#541B28] dark:text-[#C7A66A] font-bold block mb-1">
              Zone Sécurisée
            </span>
            <h1 className="font-serif text-2xl text-burgundy-gradient dark:text-[#FAF7F2] font-semibold mb-3">
              Accès Administration Réservé
            </h1>
            <p className="text-xs text-[#5A4B4E] dark:text-[#C5A48A] leading-relaxed mb-6">
              Cet espace est strictement réservé à la direction générale et aux administrateurs autorisés de la maison LÉVANIA PARFUMS.
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={async () => {
                  const res = await signIn(DEFAULT_ACCOUNTS.admin.email, DEFAULT_ACCOUNTS.admin.password);
                  if (res.success) {
                    showToast("Bienvenue Direction Générale", "Accréditation administrateur validée.", "luxury");
                  }
                }}
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#C7A66A] via-[#DFBA73] to-[#C7A66A] text-[#23181A] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:brightness-105 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#541B28]" />
                <span>Connexion Immédiate Démo Admin</span>
              </button>

              <Link
                href="/login?redirect=/admin"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-6 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <span>S&apos;identifier manuellement</span>
              </Link>
              <Link
                href="/"
                className="block text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#C7A66A] transition-colors"
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0709] text-[#23181A] dark:text-[#FAF7F2] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] text-xs font-bold mb-2 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />
                <span>Panneau de Contrôle • Direction Générale</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
                Administration Centrale Lévania Parfums
              </h1>
              <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1">
                Supervision des ventes, gestion des stocks, validation des commissions revendeurs et configuration des Vagues.
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20 no-scrollbar">
            {[
              { id: "overview", label: "Vue Générale", icon: TrendingUp },
              { id: "products", label: "Produits & Podium", icon: Package },
              { id: "orders", label: "Commandes & Expéditions", icon: ShoppingBag },
              { id: "coupons", label: "Codes Promo & QR", icon: Tag },
              { id: "events", label: "Événements & Neige", icon: Snowflake },
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
                      : "bg-white dark:bg-[#180B10] text-[#5A4B4E] dark:text-[#D8CCD0] hover:text-[#541B28] dark:hover:text-[#DFC68B] border border-[#541B28]/15 dark:border-[#C7A66A]/20"
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
                    {productList.length} flacon{productList.length > 1 ? "s" : ""} référencé{productList.length > 1 ? "s" : ""} • Créez, modifiez ou supprimez vos parfums avec synchronisation instantanée sur la boutique.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleOpenCreateProduct}
                    className="px-5 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#DFC68B]" />
                    <span>Nouveau Flacon</span>
                  </button>

                  {productList.length > 0 && (
                    <button
                      onClick={handleClearAllCatalogue}
                      className="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                      title="Supprimer tous les flacons du catalogue"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                      <span className="hidden sm:inline">Vider le catalogue</span>
                    </button>
                  )}

                  <button
                    onClick={handleRestoreDefaults}
                    className="px-4 py-2.5 rounded-xl border border-[#541B28]/25 bg-white hover:bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                    title="Restaurer les 10 créations par défaut de Lévania"
                  >
                    <RotateCcw className="w-4 h-4 text-[#C7A66A]" />
                    <span>Restaurer par défaut</span>
                  </button>
                </div>
              </div>

              {/* BARRE D'IMPORTATION RAPIDE FRAGRANTICA (IA) */}
              <div className="rounded-2xl bg-gradient-to-r from-[#FAF5EC] via-[#F6EDE0] to-[#FAF5EC] border-2 border-[#C7A66A]/60 p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#541B28] text-[#DFC68B] flex items-center justify-center shrink-0 shadow-sm">
                      <Wand2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-[#541B28]">
                          Importation Magique Fragrantica (IA)
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-[#541B28]/10 text-[#541B28] border border-[#541B28]/25">
                          Direct
                        </span>
                      </div>
                      <p className="text-xs text-[#756B6D]">
                        Collez ci-dessous le lien Fragrantica d&apos;un parfum pour extraire et ajouter automatiquement toutes ses notes olfactives.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleQuickFragranticaImport} className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={quickFragranticaUrl}
                      onChange={(e) => setQuickFragranticaUrl(e.target.value)}
                      placeholder="Ex: https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-45651.html ou 'Scandal Jean Paul Gaultier'"
                      className="w-full bg-white border-2 border-[#C7A66A]/60 focus:border-[#541B28] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#23181A] placeholder:text-[#8C7B80] shadow-inner outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isQuickScraping || !quickFragranticaUrl.trim()}
                    className="px-6 py-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isQuickScraping ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                        <span>Extraction IA en cours...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#DFC68B]" />
                        <span>Importer & Remplir</span>
                      </>
                    )}
                  </button>
                </form>

                {quickScrapeError && (
                  <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl font-medium animate-in fade-in">
                    ⚠️ {quickScrapeError}
                  </div>
                )}
              </div>

              {productList.length === 0 ? (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-12 text-center shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#541B28]/10 text-[#541B28] flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 text-[#541B28]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#23181A] font-semibold">
                      Le catalogue boutique est actuellement vide
                    </h4>
                    <p className="text-xs text-[#756B6D] max-w-md mx-auto mt-1 leading-relaxed">
                      Tous les flacons factices ont été retirés. Vous pouvez désormais ajouter vos propres créations en collant directement un lien Fragrantica, ou restaurer les 10 flacons d&apos;origine à tout moment.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={handleOpenCreateProduct}
                      className="px-6 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#DFC68B]" />
                      <span>Ajouter un Parfum (Fragrantica IA)</span>
                    </button>
                    <button
                      onClick={handleRestoreDefaults}
                      className="px-5 py-2.5 rounded-xl border border-[#541B28]/20 bg-white hover:bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-[#C7A66A]" />
                      <span>Restaurer par défaut</span>
                    </button>
                  </div>
                </div>
              ) : (
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
                              {prod.formats[0]?.stock || 0} ex. (50ml) • {prod.formats[1]?.stock || 0} ex. (100ml)
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
                                className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-[#FAF7F2] transition-colors border border-[#541B28]/20 cursor-pointer"
                                title="Modifier ce flacon"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenDeleteModal(prod)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white transition-colors border border-rose-200 cursor-pointer"
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
              )}
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
                        <th className="pb-3">Flacons &amp; QR Codes</th>
                        <th className="pb-3">Mode Paiement</th>
                        <th className="pb-3">Montant</th>
                        <th className="pb-3">Statut Actuel</th>
                        <th className="pb-3">Action Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#541B28]/5">
                      {orders.map((ord) => {
                        const orderCerts = allCertificates.filter(
                          (c) => c.orderNumber === ord.number || c.orderId === ord.id
                        );
                        const hasVideo = orderCerts.some((c) => !!c.videoUrl);

                        return (
                          <tr key={ord.id} className="hover:bg-[#FAF7F2]">
                            <td className="py-3 font-mono font-bold text-[#541B28]">{ord.number}</td>
                            <td className="py-3">
                              <span className="text-[#23181A] font-semibold block">{ord.customer}</span>
                              <span className="text-[10px] text-[#756B6D]">{ord.phone || "—"} • {ord.city || "—"}</span>
                            </td>
                            <td className="py-3 text-[#5A4B4E]">{ord.items}</td>
                            <td className="py-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedOrderForBottles(ord);
                                  setIsOrderBottlesModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-[#FAF7F2] transition-colors border border-[#541B28]/20 flex items-center gap-1.5 text-[11px] font-semibold shadow-xs"
                                title="Gérer les QR Codes, vidéos artisanales et étiquettes pour chaque flacon"
                              >
                                <QrCode className="w-3.5 h-3.5 text-[#541B28]" />
                                <span>{orderCerts.length > 0 ? `${orderCerts.length} Flacon${orderCerts.length > 1 ? "s" : ""}` : "Flacons QR"}</span>
                                {hasVideo && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold ml-1">
                                    <Film className="w-2.5 h-2.5" />
                                    Vidéo
                                  </span>
                                )}
                              </button>
                            </td>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: PROMO CODES & QR CODES */}
          {activeTab === "coupons" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">
                    Codes Promotionnels &amp; QR Codes Privilèges
                  </h3>
                  <p className="text-xs text-[#756B6D] dark:text-[#C5A48A] mt-0.5">
                    Générez des remises sur-mesure ou aléatoires avec QR Codes scannables, expirations (1H, 1J, 7J...) et quotas d&apos;utilisations.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateCouponModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#541B28] to-[#6E2435] hover:brightness-110 text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Plus className="w-4 h-4 text-[#DFC68B]" />
                  <span>Nouveau Code Promo &amp; QR</span>
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#C5A48A] font-bold block">
                    Total Codes Promo
                  </span>
                  <span className="font-serif text-2xl text-[#541B28] dark:text-[#C7A66A] font-bold">
                    {couponsList.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#C5A48A] font-bold block">
                    Codes Actifs &amp; Valides
                  </span>
                  <span className="font-serif text-2xl text-emerald-600 dark:text-emerald-400 font-bold">
                    {activeCouponsCount}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#C5A48A] font-bold block">
                    Utilisations Enregistrées
                  </span>
                  <span className="font-serif text-2xl text-[#23181A] dark:text-[#FAF7F2] font-bold">
                    {totalCouponUses} fois
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#C5A48A] font-bold block">
                    Codes Expirés / Épuisés
                  </span>
                  <span className="font-serif text-2xl text-amber-600 dark:text-amber-400 font-bold">
                    {couponsList.length - activeCouponsCount}
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-[#756B6D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Rechercher par code (ex: NOEL2026, LEV-...) ou événement..."
                    value={couponSearch}
                    onChange={(e) => setCouponSearch(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#201216] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl pl-9 pr-3 py-2 text-xs text-[#23181A] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C7A66A]"
                  />
                </div>

                <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {[
                    { id: "all", label: `Tous (${couponsList.length})` },
                    { id: "active", label: `Actifs (${activeCouponsCount})` },
                    { id: "expired", label: `Expirés (${couponsList.length - activeCouponsCount})` },
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      onClick={() => setCouponFilter(filterTab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        couponFilter === filterTab.id
                          ? "bg-[#541B28] text-[#FAF7F2] shadow-xs"
                          : "bg-[#FAF7F2] dark:bg-[#201216] text-[#5A4B4E] dark:text-[#D8CCD0] hover:text-[#541B28] border border-[#541B28]/15 dark:border-[#C7A66A]/20"
                      }`}
                    >
                      {filterTab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupons Table */}
              {couponsList.length === 0 ? (
                <div className="rounded-3xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-12 text-center shadow-sm">
                  <Tag className="w-12 h-12 text-[#541B28]/40 mx-auto mb-3" />
                  <h4 className="font-serif text-lg text-[#23181A] dark:text-[#FAF7F2] font-semibold mb-1">
                    Aucun code promo créé
                  </h4>
                  <p className="text-xs text-[#756B6D] dark:text-[#C5A48A] max-w-md mx-auto mb-6">
                    Créez votre premier code promotionnel avec QR code pour booster vos ventes festives et fidéliser vos clients.
                  </p>
                  <button
                    onClick={() => setIsCreateCouponModalOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#DFC68B]" />
                    <span>Créer le Premier Code Promo</span>
                  </button>
                </div>
              ) : filteredCoupons.length === 0 ? (
                <div className="rounded-3xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-10 text-center shadow-sm">
                  <p className="text-xs text-[#756B6D] dark:text-[#C5A48A]">
                    Aucun code promo ne correspond au filtre &ldquo;{couponSearch}&rdquo;.
                  </p>
                  <button
                    onClick={() => {
                      setCouponSearch("");
                      setCouponFilter("all");
                    }}
                    className="mt-3 text-xs text-[#541B28] dark:text-[#C7A66A] font-bold hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#756B6D] dark:text-[#C5A48A] uppercase tracking-wider border-b border-[#541B28]/10 dark:border-[#C7A66A]/20 pb-2 font-bold">
                        <th className="pb-3">QR Scan</th>
                        <th className="pb-3">Code &amp; Intitulé</th>
                        <th className="pb-3">Remise Accordée</th>
                        <th className="pb-3">Validité Temporelle</th>
                        <th className="pb-3">Quota Utilisations</th>
                        <th className="pb-3">Statut</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#541B28]/5 dark:divide-white/5">
                      {filteredCoupons.map((coupon) => {
                        const remaining = getRemainingTimeLabel(coupon);
                        const isExpired =
                          (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) ||
                          (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses);

                        const usagePercent =
                          coupon.maxUses === null ? 0 : Math.min(100, (coupon.usedCount / coupon.maxUses) * 100);

                        return (
                          <tr key={coupon.id} className="hover:bg-[#FAF7F2] dark:hover:bg-[#201216]/60 transition-colors">
                            {/* QR Thumbnail */}
                            <td className="py-3">
                              <button
                                onClick={() => handleOpenPrintCoupon(coupon)}
                                title="Cliquer pour voir et imprimer le bon cadeau"
                                className="w-12 h-12 rounded-lg overflow-hidden border border-[#541B28]/20 dark:border-[#C7A66A]/30 bg-white p-1 relative shrink-0 hover:scale-105 transition-transform"
                              >
                                {coupon.qrDataUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={coupon.qrDataUrl}
                                    alt={`QR ${coupon.code}`}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <QrCode className="w-full h-full text-stone-300" />
                                )}
                              </button>
                            </td>

                            {/* Code & Title */}
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-black text-[#541B28] dark:text-[#C7A66A] tracking-wider">
                                  {coupon.code}
                                </span>
                                {coupon.targetEventTitle && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#541B28]/10 text-[#541B28] dark:bg-[#C7A66A]/15 dark:text-[#C7A66A] border border-[#541B28]/20 dark:border-[#C7A66A]/30">
                                    {coupon.targetEventTitle}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#756B6D] dark:text-[#C5A48A] block truncate max-w-xs mt-0.5">
                                {coupon.description}
                              </span>
                            </td>

                            {/* Remise */}
                            <td className="py-3">
                              <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-[#541B28] text-white">
                                {coupon.discountType === "percent"
                                  ? `-${coupon.discountValue}%`
                                  : `-${coupon.discountValue.toFixed(3)} TND`}
                              </span>
                              {coupon.minSpendTND > 0 && (
                                <span className="text-[10px] text-[#756B6D] dark:text-[#C5A48A] block mt-1">
                                  Dès {coupon.minSpendTND} TND
                                </span>
                              )}
                            </td>

                            {/* Temporal validity */}
                            <td className="py-3">
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                  isExpired
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : remaining.includes("heure") || remaining.includes("jour")
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                }`}
                              >
                                <Clock className="w-3 h-3" />
                                {remaining}
                              </span>
                              {coupon.expiresAt && (
                                <span className="text-[10px] text-stone-400 block mt-1">
                                  Jusqu&apos;au {new Date(coupon.expiresAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </span>
                              )}
                            </td>

                            {/* Usage Quota */}
                            <td className="py-3">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-semibold text-[#23181A] dark:text-[#FAF7F2]">
                                    {coupon.usedCount}
                                  </span>
                                  <span className="text-stone-400">
                                    / {coupon.maxUses === null ? "Illimité" : `${coupon.maxUses} max`}
                                  </span>
                                </div>
                                {coupon.maxUses !== null && (
                                  <div className="w-24 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        usagePercent >= 100
                                          ? "bg-rose-500"
                                          : usagePercent >= 75
                                          ? "bg-amber-500"
                                          : "bg-emerald-500"
                                      }`}
                                      style={{ width: `${usagePercent}%` }}
                                    />
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  !coupon.isActive
                                    ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                                    : isExpired
                                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                }`}
                              >
                                {!coupon.isActive ? "En pause" : isExpired ? "Expiré" : "Actif"}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => handleCopyCouponLink(coupon.code)}
                                  className="p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#201216] hover:bg-[#541B28] text-[#541B28] hover:text-white dark:text-[#FAF7F2] transition-colors border border-[#541B28]/20 dark:border-[#C7A66A]/30"
                                  title="Copier le lien direct avec QR"
                                >
                                  {copiedCouponCode === coupon.code ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleOpenPrintCoupon(coupon)}
                                  className="p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#201216] hover:bg-[#541B28] text-[#541B28] hover:text-white dark:text-[#FAF7F2] transition-colors border border-[#541B28]/20 dark:border-[#C7A66A]/30"
                                  title="Imprimer le bon cadeau privilège"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleToggleCouponActive(coupon.id)}
                                  className={`p-1.5 rounded-lg transition-colors border ${
                                    coupon.isActive
                                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 hover:bg-amber-100 border-emerald-300"
                                      : "bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-emerald-100 border-stone-300"
                                  }`}
                                  title={coupon.isActive ? "Mettre en pause" : "Activer"}
                                >
                                  <Power className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-700 text-rose-700 hover:text-white transition-colors border border-rose-200 dark:border-rose-900"
                                  title="Supprimer ce code promo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: SEASONAL EVENTS & VISUAL EFFECTS */}
          {activeTab === "events" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#23181A] dark:text-[#FAF7F2] font-semibold">
                    Campagnes Événementielles &amp; Ambiance Féerique
                  </h3>
                  <p className="text-xs text-[#756B6D] dark:text-[#C5A48A] mt-0.5">
                    Pilotez les célébrations de l&apos;année (Fin d&apos;Année, Printemps, Nuits d&apos;Orient...) avec chute de neige givrée, pétales ou étoiles sur l&apos;ensemble du site.
                  </p>
                </div>
                <button
                  onClick={handleOpenCreateEvent}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#541B28] to-[#6E2435] hover:brightness-110 text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Plus className="w-4 h-4 text-[#DFC68B]" />
                  <span>Nouvel Événement Saisonnier</span>
                </button>
              </div>

              {/* Active Event Spotlight Hero Card */}
              {activeSeasonalEvent ? (
                <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#3B111A] via-[#541B28] to-[#250910] text-white border-2 border-[#C7A66A]/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-96 h-96 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#23181A] shadow-md flex items-center gap-1.5">
                          {activeSeasonalEvent.visualEffect === "snow" && <span>❄️ Effet Chute de Neige Actif</span>}
                          {activeSeasonalEvent.visualEffect === "petals" && <span>🌸 Effet Pétales Actif</span>}
                          {activeSeasonalEvent.visualEffect === "stardust" && <span>✨ Effet Étoiles Actif</span>}
                          {activeSeasonalEvent.visualEffect === "none" && <span>Bannière Active</span>}
                        </span>
                        <span className="text-xs text-[#DFC68B] font-mono">
                          • Intensité {activeSeasonalEvent.effectIntensity.toUpperCase()}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
                        {activeSeasonalEvent.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed">
                        {activeSeasonalEvent.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {activeSeasonalEvent.promoCode && (
                          <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-[#C7A66A]/50 text-xs font-mono">
                            Code lié: <strong className="text-[#C7A66A] tracking-wider">{activeSeasonalEvent.promoCode}</strong>
                          </div>
                        )}
                        {activeSeasonalEvent.discountHighlight && (
                          <span className="text-xs text-[#DFC68B] font-semibold">
                            {activeSeasonalEvent.discountHighlight}
                          </span>
                        )}
                        {activeSeasonalEvent.showTopBanner && (
                          <span className="text-[11px] text-emerald-300 bg-emerald-900/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                            Bandeau festif affiché
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions on Active Event */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                      <button
                        onClick={() => handleToggleEventActive(activeSeasonalEvent.id)}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <Power className="w-4 h-4 text-emerald-400" />
                        <span>Mettre en Pause l&apos;Événement</span>
                      </button>
                      <button
                        onClick={() => handleOpenEditEvent(activeSeasonalEvent)}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#DFBA73] text-[#23181A] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:brightness-105 flex items-center justify-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Modifier la Campagne</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white dark:bg-[#160D10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 text-center space-y-3">
                  <Snowflake className="w-12 h-12 text-[#541B28]/40 mx-auto" />
                  <h4 className="font-serif text-lg font-semibold text-[#23181A] dark:text-[#FAF7F2]">
                    Aucune campagne événementielle active
                  </h4>
                  <p className="text-xs text-[#756B6D] dark:text-[#C5A48A] max-w-md mx-auto">
                    Activez ci-dessous une campagne pour habiller immédiatement la boutique de neige givrée, pétales ou étoiles.
                  </p>
                </div>
              )}

              {/* All Events Catalog Grid */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-semibold text-[#23181A] dark:text-[#FAF7F2]">
                  Catalogue des Thèmes Saisonnier ({eventsList.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsList.map((ev) => {
                    return (
                      <div
                        key={ev.id}
                        className={`p-6 rounded-3xl border transition-all ${
                          ev.isActive
                            ? "bg-white dark:bg-[#1C1014] border-[#C7A66A] shadow-lg ring-1 ring-[#C7A66A]"
                            : "bg-white dark:bg-[#160D10] border-[#541B28]/15 dark:border-[#C7A66A]/20 opacity-85 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                            style={{
                              backgroundColor: `${ev.themeColor}20`,
                              color: ev.themeColor,
                              border: `1px solid ${ev.themeColor}50`,
                            }}
                          >
                            {ev.visualEffect === "snow" && <span>❄️ Neige</span>}
                            {ev.visualEffect === "petals" && <span>🌸 Pétales</span>}
                            {ev.visualEffect === "stardust" && <span>✨ Étoiles</span>}
                            {ev.visualEffect === "none" && <span>🚫 Standard</span>}
                            <span>• {ev.badgeText}</span>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ev.isActive
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                : "bg-stone-500/10 text-stone-500"
                            }`}
                          >
                            {ev.isActive ? "Actif sur le site" : "Inactif"}
                          </span>
                        </div>

                        <h4 className="font-serif text-lg font-bold text-[#23181A] dark:text-[#FAF7F2] mb-1">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-[#756B6D] dark:text-[#C5A48A] mb-4 line-clamp-2">
                          {ev.description}
                        </p>

                        {ev.promoCode && (
                          <div className="mb-4 p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#201216] border border-[#541B28]/10 dark:border-[#C7A66A]/20 text-[11px] flex items-center justify-between">
                            <span className="text-[#756B6D] dark:text-[#C5A48A]">Code promo associé :</span>
                            <span className="font-mono font-bold text-[#541B28] dark:text-[#C7A66A]">
                              {ev.promoCode}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                          <button
                            onClick={() => handleToggleEventActive(ev.id)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                              ev.isActive
                                ? "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300"
                                : "bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] shadow-sm"
                            }`}
                          >
                            {ev.isActive ? "Désactiver" : "Activer sur le site"}
                          </button>
                          <button
                            onClick={() => handleOpenEditEvent(ev)}
                            className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#541B28] dark:text-[#FAF7F2]"
                            title="Modifier"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {ev.id.startsWith("event-custom-") && (
                            <button
                              onClick={() => handleDeleteEvent(ev.id, ev.title)}
                              className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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

          {/* TAB 6: QR CODE & ARTISAN VIDEO MANAGER */}
          {activeTab === "qr" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#23181A] font-semibold">
                    Traçabilité Cryptographique &amp; Dédicaces Vidéo
                  </h3>
                  <p className="text-xs text-[#756B6D] mt-0.5">
                    Chaque flacon commandé possède son propre jeton cryptographique QR scellé avec le nom nominatif du client et une vidéo artisanale attachée.
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                    Flacons Certifiés
                  </span>
                  <span className="font-serif text-2xl text-[#541B28] font-bold">
                    {allCertificates.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                    Vidéos Attachées
                  </span>
                  <span className="font-serif text-2xl text-emerald-700 font-bold">
                    {allCertificates.filter((c) => !!c.videoUrl).length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                    En Attente de Vidéo
                  </span>
                  <span className="font-serif text-2xl text-amber-600 font-bold">
                    {allCertificates.filter((c) => !c.videoUrl).length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                    Commandes Clients
                  </span>
                  <span className="font-serif text-2xl text-[#23181A] font-bold">
                    {new Set(allCertificates.map((c) => c.orderNumber)).size}
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#541B28]/15 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-[#756B6D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Rechercher par client, flacon, série LEV..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                  />
                </div>

                <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {[
                    { id: "all", label: `Tous (${allCertificates.length})` },
                    { id: "with-video", label: `Avec Vidéo (${allCertificates.filter((c) => !!c.videoUrl).length})` },
                    { id: "no-video", label: `Sans Vidéo (${allCertificates.filter((c) => !c.videoUrl).length})` },
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      onClick={() => setCertFilter(filterTab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        certFilter === filterTab.id
                          ? "bg-[#541B28] text-[#FAF7F2] shadow-xs"
                          : "bg-[#FAF7F2] text-[#5A4B4E] hover:text-[#541B28] border border-[#541B28]/15"
                      }`}
                    >
                      {filterTab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certificates List */}
              {allCertificates.length === 0 ? (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-12 text-center shadow-sm">
                  <QrCode className="w-12 h-12 text-[#541B28]/40 mx-auto mb-3" />
                  <h4 className="font-serif text-lg text-[#23181A] font-semibold mb-1">
                    Aucun Certificat QR Flacon Généré
                  </h4>
                  <p className="text-xs text-[#756B6D] max-w-md mx-auto mb-6">
                    Dès qu&apos;un client passe une commande sur la boutique, les QR codes nominatifs de chaque flacon sont automatiquement scellés ici.
                  </p>
                  {orders.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedOrderForBottles(orders[0]);
                        setIsOrderBottlesModalOpen(true);
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#DFC68B]" />
                      <span>Générer pour la commande {orders[0].number}</span>
                    </button>
                  )}
                </div>
              ) : filteredCertificates.length === 0 ? (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-10 text-center shadow-sm">
                  <p className="text-xs text-[#756B6D]">
                    Aucun certificat ne correspond à votre recherche &ldquo;{certSearch}&rdquo;.
                  </p>
                  <button
                    onClick={() => { setCertSearch(""); setCertFilter("all"); }}
                    className="mt-3 text-xs text-[#541B28] font-bold hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-[#756B6D] uppercase tracking-wider border-b border-[#541B28]/10 pb-2 font-bold">
                        <th className="pb-3">QR Flacon</th>
                        <th className="pb-3">N° Série &amp; Jeton</th>
                        <th className="pb-3">Client Dédié</th>
                        <th className="pb-3">Flacon Commandé</th>
                        <th className="pb-3">Réf Commande</th>
                        <th className="pb-3">Vidéo Artisanale</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#541B28]/5">
                      {filteredCertificates.map((cert) => (
                        <tr key={cert.token} className="hover:bg-[#FAF7F2]">
                          <td className="py-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#541B28]/20 bg-[#FAF7F2] relative shrink-0">
                              {cert.qrDataUrl ? (
                                <Image src={cert.qrDataUrl} alt="QR Code" fill className="object-contain" unoptimized />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <QrCode className="w-5 h-5 text-[#541B28]" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="font-mono text-xs font-bold text-[#541B28] block">
                              {cert.serialNumber}
                            </span>
                            <span className="font-mono text-[9px] text-[#756B6D] block">
                              {cert.batchCode} &bull; {cert.bottlingDate}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-[#23181A] font-semibold block">
                              {cert.customerName}
                            </span>
                            <span className="text-[10px] text-[#756B6D]">
                              {cert.customerEmail || cert.customerPhone || "Client Nominatif"}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-[#23181A] font-medium block">
                              {cert.productName}
                            </span>
                            <span className="text-[10px] text-[#541B28] font-bold">
                              Format {cert.formatSize}
                            </span>
                          </td>
                          <td className="py-3 font-mono text-[#5A4B4E]">
                            {cert.orderNumber}
                          </td>
                          <td className="py-3">
                            {cert.videoUrl ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-[#434B36] font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                <Film className="w-3 h-3 text-emerald-700" />
                                <span>Vidéo Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                En attente vidéo
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenBottleOrder(cert)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-[#FAF7F2] transition-colors border border-[#541B28]/20 flex items-center gap-1 text-[11px] font-semibold"
                                title="Uploader ou modifier la vidéo pour ce flacon"
                              >
                                <Film className="w-3.5 h-3.5" />
                                <span>Vidéo</span>
                              </button>
                              <button
                                onClick={() => handlePrintSingleLabel(cert)}
                                className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-white transition-colors border border-[#541B28]/20"
                                title="Imprimer l'étiquette QR flacon"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/p/${cert.token}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] transition-colors"
                                title="Voir le certificat client en direct"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
        mode={productModalMode}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name || "ce flacon"}
      />

      <OrderBottlesModal
        isOpen={isOrderBottlesModalOpen}
        onClose={() => setIsOrderBottlesModalOpen(false)}
        order={selectedOrderForBottles}
        onCertificatesUpdated={() => setAllCertificates(getAllCertificates())}
      />

      <CreateCouponModal
        isOpen={isCreateCouponModalOpen}
        onClose={() => setIsCreateCouponModalOpen(false)}
        onCouponCreated={(newCoupon) => {
          setCouponsList(getAllCoupons());
          showToast(
            "Code Promo & QR Créé avec Succès",
            `Le code ${newCoupon.code} est immédiatement fonctionnel en boutique.`,
            "luxury"
          );
        }}
      />

      <PrintCouponVoucherModal
        coupon={selectedCouponForPrint}
        isOpen={isPrintVoucherModalOpen}
        onClose={() => {
          setIsPrintVoucherModalOpen(false);
          setSelectedCouponForPrint(null);
        }}
      />

      <EditEventModal
        event={editingEvent}
        isOpen={isEditEventModalOpen}
        onClose={() => {
          setIsEditEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSaved={(savedEv) => {
          setEventsList(getAllEvents());
          showToast(
            "Campagne Enregistrée",
            `L'événement "${savedEv.title}" a été mis à jour.`,
            "luxury"
          );
        }}
      />

      <Footer />
    </div>
  );
}
