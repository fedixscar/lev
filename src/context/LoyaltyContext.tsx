"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WheelTier, getWheelTier, MAX_LUCK_CAP } from "@/lib/utils";
import { WheelReward, WheelSpinRecord } from "@/types";

interface LoyaltyContextType {
  luckBalance: number;
  currentTier: WheelTier | null;
  awardLuck: (amount: number) => { added: number; newBalance: number };
  spinWheel: () => Promise<WheelSpinRecord>;
  spinHistory: WheelSpinRecord[];
  isSpinning: boolean;
  loyaltyPoints: number;
  redeemPoints: (points: number) => boolean;
  awardLoyaltyPoints: (points: number) => void;
  xpPoints: number;
  xpLevel: number;
  awardXP: (xp: number) => void;
  doubleXpActive: boolean;
  setDoubleXpActive: (active: boolean) => void;
}

const TIER_REWARDS_TABLE: Record<WheelTier, WheelReward[]> = {
  "Normal Wave": [
    { id: "nw-1", tier: "Normal Wave", label: "50 Points Fidélité Lévania", type: "points", value: 50, description: "Crédités immédiatement sur votre compte", weight: 35 },
    { id: "nw-2", tier: "Normal Wave", label: "Coupon -10% sur tout le catalogue", type: "percent_coupon", value: 10, description: "Valable 30 jours sans minimum", weight: 30 },
    { id: "nw-3", tier: "Normal Wave", label: "Échantillon Découverte 5ml Offert", type: "sample_pack", value: "sample-5ml", description: "Ajouté à votre prochaine commande", weight: 25 },
    { id: "nw-4", tier: "Normal Wave", label: "100 Points Fidélité Lévania", type: "points", value: 100, description: "Crédités immédiatement sur votre compte", weight: 10 },
  ],
  "Fire Wave": [
    { id: "fw-1", tier: "Fire Wave", label: "Coupon -20% sur la Collection Signature", type: "percent_coupon", value: 20, description: "Valable 30 jours", weight: 35 },
    { id: "fw-2", tier: "Fire Wave", label: "Coffret 3 Échantillons Luxe (3x5ml)", type: "sample_pack", value: "discovery-set-3", description: "Écrin velours offert", weight: 25 },
    { id: "fw-3", tier: "Fire Wave", label: "250 Points Fidélité Lévania", type: "points", value: 250, description: "Équivalent remise de 25 TND", weight: 25 },
    { id: "fw-4", tier: "Fire Wave", label: "Bon d'Achat 30 TND Immédiat", type: "fixed_coupon", value: 30, description: "Dès 150 TND d'achat", weight: 15 },
  ],
  "Royal Wave": [
    { id: "rw-1", tier: "Royal Wave", label: "Flacon Lévania 50ml au Choix Offert", type: "free_product", value: "free-50ml-bottle", description: "Livraison gracieuse incluse", weight: 20 },
    { id: "rw-2", tier: "Royal Wave", label: "Bon d'Achat 80 TND Royal", type: "fixed_coupon", value: 80, description: "Sans minimum d'achat", weight: 35 },
    { id: "rw-3", tier: "Royal Wave", label: "Coupon -35% Privilège Royal", type: "percent_coupon", value: 35, description: "Valable sur toute commande", weight: 30 },
    { id: "rw-4", tier: "Royal Wave", label: "Coffret Sur-Mesure 'Compose Your Box' Offert", type: "luxury_packaging", value: "free-custom-box", description: "Flacon + Accessoires dorés", weight: 15 },
  ],
  "Admin Wave": [
    { id: "aw-1", tier: "Admin Wave", label: "LE TRÉSOR LÉVANIA: 2 Flacons 100ml + Coffret Cylindrique Doré Offerts", type: "free_product", value: "grand-tresor-100ml-duo", description: "L'apogée ultime de la chance Lévania (Valeur 600 TND)", weight: 100 },
  ],
};

const LoyaltyContext = createContext<LoyaltyContextType | null>(null);

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  // Production baseline: clean state, points & luck earned on real purchases
  const [luckBalance, setLuckBalance] = useState<number>(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [xpPoints, setXpPoints] = useState<number>(0);
  const [doubleXpActive, setDoubleXpActive] = useState<boolean>(false);
  const [spinHistory, setSpinHistory] = useState<WheelSpinRecord[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedLuck = localStorage.getItem("levania_luck_balance");
      if (storedLuck !== null) setLuckBalance(parseInt(storedLuck, 10));

      const storedPoints = localStorage.getItem("levania_loyalty_points");
      if (storedPoints !== null) setLoyaltyPoints(parseInt(storedPoints, 10));

      const storedXp = localStorage.getItem("levania_xp_points");
      if (storedXp !== null) setXpPoints(parseInt(storedXp, 10));

      const storedSpins = localStorage.getItem("levania_spin_history");
      if (storedSpins) setSpinHistory(JSON.parse(storedSpins));
    } catch {
      // Ignore
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("levania_luck_balance", luckBalance.toString());
      localStorage.setItem("levania_loyalty_points", loyaltyPoints.toString());
      localStorage.setItem("levania_xp_points", xpPoints.toString());
      localStorage.setItem("levania_spin_history", JSON.stringify(spinHistory));
    } catch {
      // Ignore
    }
  }, [luckBalance, loyaltyPoints, xpPoints, spinHistory, isInitialized]);

  const currentTier = getWheelTier(luckBalance);

  // Award luck respecting the cap of 7,777
  const awardLuck = (amount: number) => {
    if (amount <= 0) return { added: 0, newBalance: luckBalance };

    let added = amount;
    if (luckBalance + amount > MAX_LUCK_CAP) {
      added = Math.max(0, MAX_LUCK_CAP - luckBalance);
    }
    const newBal = luckBalance + added;
    setLuckBalance(newBal);
    return { added, newBalance: newBal };
  };

  const awardLoyaltyPoints = (points: number) => {
    setLoyaltyPoints((prev) => prev + points);
  };

  const redeemPoints = (points: number): boolean => {
    if (loyaltyPoints < points) return false;
    setLoyaltyPoints((prev) => prev - points);
    return true;
  };

  const awardXP = (xp: number) => {
    const finalXp = doubleXpActive ? xp * 2 : xp;
    setXpPoints((prev) => prev + finalXp);
  };

  const xpLevel = Math.floor(xpPoints / 500) + 1;

  // Spin wheel: server-side authority simulation
  const spinWheel = async (): Promise<WheelSpinRecord> => {
    if (luckBalance <= 0) {
      throw new Error("Solde de Luck insuffisant pour lancer la Roue du Destin.");
    }

    const tier = getWheelTier(luckBalance);
    if (!tier) {
      throw new Error("Aucun niveau de Vague actif.");
    }

    setIsSpinning(true);

    try {
      // Consume entire balance atomically
      const consumed = luckBalance;
      const rewards = TIER_REWARDS_TABLE[tier];

      // Weighted random selection
      const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
      let rand = Math.random() * totalWeight;
      let selectedReward = rewards[0];
      for (const r of rewards) {
        if (rand < r.weight) {
          selectedReward = r;
          break;
        }
        rand -= r.weight;
      }

      // Generate coupon code if reward is a coupon
      let couponCode: string | undefined = undefined;
      if (selectedReward.type === "percent_coupon" || selectedReward.type === "fixed_coupon") {
        couponCode = `ROUE-${tier.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      } else if (selectedReward.type === "points") {
        awardLoyaltyPoints(Number(selectedReward.value));
      }

      const record: WheelSpinRecord = {
        id: `spin-${Date.now()}`,
        customerId: "cust-001",
        tier,
        luckConsumed: consumed,
        rewardId: selectedReward.id,
        rewardLabel: selectedReward.label,
        rewardType: selectedReward.type,
        rewardValue: selectedReward.value,
        couponCodeGenerated: couponCode,
        timestamp: new Date().toISOString(),
      };

      // Reset balance to 0 as required by rules
      setLuckBalance(0);
      setSpinHistory((prev) => [record, ...prev]);

      return record;
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <LoyaltyContext.Provider
      value={{
        luckBalance,
        currentTier,
        awardLuck,
        spinWheel,
        spinHistory,
        isSpinning,
        loyaltyPoints,
        redeemPoints,
        awardLoyaltyPoints,
        xpPoints,
        xpLevel,
        awardXP,
        doubleXpActive,
        setDoubleXpActive,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
}
