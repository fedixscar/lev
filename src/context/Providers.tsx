"use client";

import React from "react";
import { SeasonalProvider } from "@/components/brand/SeasonalAtmosphere";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { LoyaltyProvider } from "./LoyaltyContext";
import { NotificationProvider } from "./NotificationContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SeasonalProvider>
      <AuthProvider>
        <CartProvider>
          <LoyaltyProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </LoyaltyProvider>
        </CartProvider>
      </AuthProvider>
    </SeasonalProvider>
  );
}
