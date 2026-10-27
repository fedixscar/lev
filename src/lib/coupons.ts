import QRCode from "qrcode";
import { AppliedCoupon } from "@/types";

export type DurationPreset = "1h" | "1d" | "3d" | "7d" | "30d" | "custom" | "unlimited";

export interface PromoCode {
  id: string;
  code: string; // e.g. "LEV-X892A", "NOEL2026"
  description: string;
  discountType: "percent" | "fixed";
  discountValue: number; // percentage (e.g. 20) or fixed TND amount (e.g. 30)
  minSpendTND: number;
  durationPreset: DurationPreset;
  expiresAt: string | null; // ISO string or null
  maxUses: number | null; // e.g. 1 (single-use), 10, or null for unlimited
  usedCount: number;
  isActive: boolean;
  qrDataUrl?: string;
  createdAt: string;
  targetEventTitle?: string;
}

const STORAGE_KEY = "levania_promo_codes";
export const COUPONS_UPDATED_EVENT = "levania_coupons_updated";

// Default luxury promo codes seeded initially
const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    id: "promo-noel-2026",
    code: "NOEL2026",
    description: "Célébration Fin d'Année • Remise d'Exception",
    discountType: "percent",
    discountValue: 20,
    minSpendTND: 150,
    durationPreset: "30d",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    maxUses: 100,
    usedCount: 14,
    isActive: true,
    createdAt: new Date().toISOString(),
    targetEventTitle: "Féérie de Fin d'Année 2026",
  },
  {
    id: "promo-wave-20",
    code: "WAVE20",
    description: "Privilège Sillage • -20% dès 250 TND d'achat",
    discountType: "percent",
    discountValue: 20,
    minSpendTND: 250,
    durationPreset: "unlimited",
    expiresAt: null,
    maxUses: 50,
    usedCount: 22,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo-levania-10",
    code: "LEVANIA10",
    description: "Offre Bienvenue Haute Parfumerie",
    discountType: "percent",
    discountValue: 10,
    minSpendTND: 100,
    durationPreset: "unlimited",
    expiresAt: null,
    maxUses: null,
    usedCount: 38,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo-royal-50",
    code: "ROYAL50",
    description: "Bon Royal 50 DT pour grands flacons",
    discountType: "fixed",
    discountValue: 50,
    minSpendTND: 300,
    durationPreset: "7d",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxUses: 20,
    usedCount: 9,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo-flash-1h",
    code: "FLASH1H",
    description: "Vente Flash Exclusive 1 Heure",
    discountType: "percent",
    discountValue: 25,
    minSpendTND: 100,
    durationPreset: "1h",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    maxUses: 10,
    usedCount: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo-vip-1j",
    code: "VIP1J",
    description: "Passe Privé 24h • Accès Unique",
    discountType: "fixed",
    discountValue: 30,
    minSpendTND: 180,
    durationPreset: "1d",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    maxUses: 1, // Single-use
    usedCount: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Returns all saved promo codes from localStorage or defaults.
 */
export function getAllCoupons(): PromoCode[] {
  if (typeof window === "undefined") {
    return DEFAULT_PROMO_CODES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMO_CODES));
      return DEFAULT_PROMO_CODES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PROMO_CODES;
  } catch {
    return DEFAULT_PROMO_CODES;
  }
}

/**
 * Calculates expiration timestamp based on duration preset.
 */
export function calculateExpirationDate(preset: DurationPreset, customDate?: string): string | null {
  const now = Date.now();
  switch (preset) {
    case "1h":
      return new Date(now + 60 * 60 * 1000).toISOString();
    case "1d":
      return new Date(now + 24 * 60 * 60 * 1000).toISOString();
    case "3d":
      return new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString();
    case "7d":
      return new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
    case "30d":
      return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
    case "custom":
      return customDate ? new Date(customDate).toISOString() : null;
    case "unlimited":
    default:
      return null;
  }
}

/**
 * Generates a luxury QR Code Data URL for a promo code.
 * Scanning will redirect to the site and automatically activate the coupon.
 */
export async function generatePromoQrDataUrl(code: string, origin?: string): Promise<string> {
  const baseHost = origin || (typeof window !== "undefined" ? window.location.origin : "https://levania-parfums.com");
  const targetUrl = `${baseHost}/?coupon=${encodeURIComponent(code)}&autoApply=true`;

  try {
    const qrDataUrl = await QRCode.toDataURL(targetUrl, {
      margin: 2,
      width: 380,
      color: {
        dark: "#541B28", // Imperial Burgundy
        light: "#FAF7F2", // Luxury Warm Ivory
      },
      errorCorrectionLevel: "H",
    });
    return qrDataUrl;
  } catch (err) {
    console.error("Failed to generate promo QR code:", err);
    return "";
  }
}

/**
 * Generates a random alphanumeric luxury promo code string.
 */
export function generateRandomPromoCode(prefix: string = "LEV"): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomPart}`;
}

/**
 * Saves a new or updated promo code to localStorage and notifies listeners.
 */
export async function saveCoupon(coupon: PromoCode): Promise<PromoCode[]> {
  const all = getAllCoupons();
  let updatedCoupon = { ...coupon };

  // Ensure QR code is generated if not present
  if (!updatedCoupon.qrDataUrl) {
    updatedCoupon.qrDataUrl = await generatePromoQrDataUrl(updatedCoupon.code);
  }

  const existingIdx = all.findIndex((c) => c.id === coupon.id || c.code.toUpperCase() === coupon.code.toUpperCase());
  let nextList: PromoCode[];

  if (existingIdx > -1) {
    nextList = [...all];
    nextList[existingIdx] = updatedCoupon;
  } else {
    nextList = [updatedCoupon, ...all];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(COUPONS_UPDATED_EVENT));
    }
  } catch (e) {
    console.error("Failed to save promo codes:", e);
  }

  return nextList;
}

/**
 * Deletes a promo code by ID.
 */
export function deleteCoupon(id: string): PromoCode[] {
  const all = getAllCoupons();
  const nextList = all.filter((c) => c.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(COUPONS_UPDATED_EVENT));
    }
  } catch (e) {
    console.error("Failed to delete promo code:", e);
  }

  return nextList;
}

/**
 * Toggles a coupon's active status.
 */
export function toggleCouponActive(id: string): PromoCode | null {
  const all = getAllCoupons();
  const index = all.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated = [...all];
  updated[index] = {
    ...updated[index],
    isActive: !updated[index].isActive,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(COUPONS_UPDATED_EVENT));
    }
  } catch (e) {
    console.error("Failed to toggle coupon:", e);
  }

  return updated[index];
}

/**
 * Increments the used count for a given coupon code when an order is finalized.
 */
export function incrementCouponUsage(code: string): void {
  const cleanCode = code.trim().toUpperCase();
  const all = getAllCoupons();
  const idx = all.findIndex((c) => c.code.toUpperCase() === cleanCode);

  if (idx > -1) {
    const updated = [...all];
    const target = updated[idx];
    target.usedCount = (target.usedCount || 0) + 1;

    // Check if max uses reached
    if (target.maxUses !== null && target.usedCount >= target.maxUses) {
      // Keep it active flag as is or note depletion
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(COUPONS_UPDATED_EVENT));
      }
    } catch {
      // ignore
    }
  }
}

/**
 * Validates a promo code against current time, subtotal, and usage limits.
 */
export function validateCoupon(
  code: string,
  subtotalTND: number
): {
  isValid: boolean;
  valid: boolean;
  message: string;
  error?: string;
  coupon?: AppliedCoupon;
  appliedCoupon?: AppliedCoupon;
  promo?: PromoCode;
} {
  const cleanCode = code.trim().toUpperCase();
  const all = getAllCoupons();
  const found = all.find((c) => c.code.toUpperCase() === cleanCode);

  if (!found) {
    return {
      isValid: false,
      valid: false,
      message: "Code promotionnel invalide ou inexistant.",
      error: "Code promotionnel invalide ou inexistant.",
    };
  }

  if (!found.isActive) {
    return {
      isValid: false,
      valid: false,
      message: "Ce code promotionnel a été désactivé par l'administration.",
      error: "Ce code promotionnel a été désactivé par l'administration.",
    };
  }

  // 1. Expiration check
  if (found.expiresAt) {
    const expiryTime = new Date(found.expiresAt).getTime();
    if (Date.now() > expiryTime) {
      return {
        isValid: false,
        valid: false,
        message: "Ce code promotionnel a expiré (date limite dépassée).",
        error: "Ce code promotionnel a expiré (date limite dépassée).",
      };
    }
  }

  // 2. Max uses check
  if (found.maxUses !== null && found.usedCount >= found.maxUses) {
    return {
      isValid: false,
      valid: false,
      message: `Ce code promo a atteint sa limite maximale d'utilisations (${found.maxUses}/${found.maxUses}).`,
      error: `Ce code promo a atteint sa limite maximale d'utilisations (${found.maxUses}/${found.maxUses}).`,
    };
  }

  // 3. Minimum spend check
  if (found.minSpendTND && subtotalTND < found.minSpendTND) {
    return {
      isValid: false,
      valid: false,
      message: `Ce code nécessite un panier minimum de ${found.minSpendTND.toFixed(3)} TND.`,
      error: `Ce code nécessite un panier minimum de ${found.minSpendTND.toFixed(3)} TND.`,
    };
  }

  const applied: AppliedCoupon = {
    code: found.code,
    discountType: found.discountType,
    discountValue: found.discountValue,
    minSpendTND: found.minSpendTND,
  };

  return {
    isValid: true,
    valid: true,
    message: `Code ${found.code} appliqué avec succès (-${found.discountValue}${found.discountType === "percent" ? "%" : " TND"}) !`,
    coupon: applied,
    appliedCoupon: applied,
    promo: found,
  };
}

/**
 * Computes the remaining time string for a promo code or expiration ISO date string.
 */
export function getRemainingTimeLabel(target: PromoCode | string | null): string {
  if (!target) return "Permanent";

  const expiresAt = typeof target === "string" ? target : target.expiresAt;
  if (!expiresAt) return "Permanent";

  const diffMs = new Date(expiresAt).getTime() - Date.now();
  if (diffMs <= 0) return "Expiré";

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    const remainHours = diffHours % 24;
    return `${diffDays}j ${remainHours}h`;
  }

  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`;
  }

  return `${Math.max(1, diffMinutes)}m restants`;
}
