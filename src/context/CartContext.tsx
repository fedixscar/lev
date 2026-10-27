"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, AppliedCoupon } from "@/types";
import { calculateLuckFromTND } from "@/lib/utils";
import { validateCoupon, incrementCouponUsage, COUPONS_UPDATED_EVENT } from "@/lib/coupons";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; valid: boolean; message: string };
  removeCoupon: () => void;
  recordCouponUsed: () => void;
  subtotalTND: number;
  discountTND: number;
  deliveryFeeTND: number;
  totalTND: number;
  totalMillimes: number;
  projectedLuck: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("levania_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem("levania_coupon");
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch {
      // Ignore storage errors
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("levania_cart", JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem("levania_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("levania_coupon");
      }
    } catch {
      // Ignore storage errors
    }
  }, [items, appliedCoupon, isInitialized]);

  const addItem = (item: Omit<CartItem, "id">) => {
    setItems((prev) => {
      // If item with same productId, formatSize and no custom gift box details exists, increment quantity
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.formatSize === item.formatSize &&
          !i.giftBoxDetails &&
          !item.giftBoxDetails
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }

      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.formatSize}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotalTND = items.reduce(
    (acc, item) => acc + item.unitPriceTND * item.quantity,
    0
  );

  let discountTND = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percent") {
      discountTND = (subtotalTND * appliedCoupon.discountValue) / 100;
    } else {
      discountTND = Math.min(subtotalTND, appliedCoupon.discountValue);
    }
  }

  // Delivery: Free for orders >= 200 TND, otherwise 7.000 TND flat delivery in Tunisia
  const deliveryFeeTND = subtotalTND === 0 || subtotalTND >= 200 ? 0 : 7.0;

  const totalTND = Math.max(0, subtotalTND - discountTND + deliveryFeeTND);
  const totalMillimes = Math.round(totalTND * 1000);

  // Eligible amount for Luck excludes delivery fees and discounts: subtotal - discount
  const eligibleAmountTND = Math.max(0, subtotalTND - discountTND);
  const projectedLuck = calculateLuckFromTND(eligibleAmountTND);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string): { success: boolean; valid: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const result = validateCoupon(cleanCode, subtotalTND);

    if (!result.valid || !result.appliedCoupon) {
      return {
        success: false,
        valid: false,
        message: result.error || "Code promotionnel invalide ou expiré.",
      };
    }

    setAppliedCoupon(result.appliedCoupon);
    return {
      success: true,
      valid: true,
      message: `Privilège « ${result.appliedCoupon.code} » appliqué (${result.appliedCoupon.discountType === "percent" ? `-${result.appliedCoupon.discountValue}%` : `-${result.appliedCoupon.discountValue.toFixed(3)} TND`}) !`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const recordCouponUsed = () => {
    if (appliedCoupon?.code) {
      incrementCouponUsage(appliedCoupon.code);
    }
  };

  // Auto-apply promo code from QR code scan or URL query parameter (?coupon=CODE)
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const couponParam = params.get("coupon");
      if (couponParam && (!appliedCoupon || appliedCoupon.code !== couponParam.toUpperCase())) {
        const res = applyCoupon(couponParam);
        if (res.valid && params.get("autoApply") === "true") {
          setIsCartOpen(true);
        }
      }
    } catch {
      // Ignore URL param parsing errors
    }
  }, [isInitialized]);

  // Revalidate coupon if coupons list is updated or cart subtotal changes
  useEffect(() => {
    if (!appliedCoupon) return;
    const handleCouponsUpdate = () => {
      const check = validateCoupon(appliedCoupon.code, subtotalTND);
      if (!check.valid) {
        setAppliedCoupon(null);
      }
    };
    window.addEventListener(COUPONS_UPDATED_EVENT, handleCouponsUpdate);
    return () => window.removeEventListener(COUPONS_UPDATED_EVENT, handleCouponsUpdate);
  }, [appliedCoupon, subtotalTND]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        recordCouponUsed,
        subtotalTND,
        discountTND,
        deliveryFeeTND,
        totalTND,
        totalMillimes,
        projectedLuck,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
