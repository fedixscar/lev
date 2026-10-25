"use client";

import React from "react";
import { SeasonalProvider } from "@/components/brand/SeasonalAtmosphere";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { LoyaltyProvider } from "./LoyaltyContext";
import { NotificationProvider } from "./NotificationContext";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SeasonalProvider>
          <AuthProvider>
            <CartProvider>
              <LoyaltyProvider>
                <NotificationProvider>{children}</NotificationProvider>
              </LoyaltyProvider>
            </CartProvider>
          </AuthProvider>
        </SeasonalProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
