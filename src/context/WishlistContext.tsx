"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotification } from "./NotificationContext";
import { useLanguage } from "./LanguageContext";

interface WishlistContextType {
  wishlist: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string, productName?: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "levania_user_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useNotification();
  const { t } = useLanguage();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = (items: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const isInWishlist = (productId: string): boolean => {
    if (!productId) return false;
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId: string, productName?: string): boolean => {
    if (!productId) return false;

    let updated: string[];
    let added = false;

    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
      added = false;
      showToast(
        t("toast.removed_wishlist", "Retiré de vos favoris"),
        productName || "Flacon d'exception",
        "info"
      );
    } else {
      updated = [...wishlist, productId];
      added = true;
      showToast(
        t("toast.added_wishlist", "Ajouté à vos favoris"),
        productName ? `${productName} a rejoint votre vestiaire olfactif.` : "Flacon d'exception ajouté.",
        "luxury"
      );
    }

    setWishlist(updated);
    saveToStorage(updated);
    return added;
  };

  const removeFromWishlist = (productId: string) => {
    if (!productId) return;
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    saveToStorage(updated);
  };

  const clearWishlist = () => {
    setWishlist([]);
    saveToStorage([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
