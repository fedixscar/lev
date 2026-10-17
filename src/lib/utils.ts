import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Tunisian Dinar (TND)
 * Default displays 3 decimal places (millimes) or standard TND format
 */
export function formatTND(amountInTND: number, showMillimes: boolean = true): string {
  if (showMillimes) {
    return `${amountInTND.toFixed(3)} TND`;
  }
  return `${amountInTND.toFixed(0)} TND`;
}

/**
 * Format millimes integer to TND string
 */
export function formatMillimes(millimes: number): string {
  const tnd = millimes / 1000;
  return `${tnd.toFixed(3)} TND`;
}

/**
 * Official LÉVANIA Luck Calculation:
 * 1 point of Luck for every 10 TND of eligible product spending.
 * Formula: Luck earned = floor(eligible amount in millimes / 10,000)
 * Maximum cap: 7,777 Luck
 */
export const MAX_LUCK_CAP = 7777;

export function calculateLuckFromMillimes(eligibleMillimes: number): number {
  if (eligibleMillimes <= 0) return 0;
  return Math.floor(eligibleMillimes / 10000);
}

export function calculateLuckFromTND(tndAmount: number): number {
  const millimes = Math.round(tndAmount * 1000);
  return calculateLuckFromMillimes(millimes);
}

export type WheelTier = 'Normal Wave' | 'Fire Wave' | 'Royal Wave' | 'Admin Wave';

/**
 * Server-authoritative tier determination based on exact Luck balance:
 * - Normal Wave: 1–100 Luck
 * - Fire Wave: 101–1,000 Luck
 * - Royal Wave: 1,001–7,776 Luck
 * - Admin Wave: exactly 7,777 Luck
 */
export function getWheelTier(luckBalance: number): WheelTier | null {
  if (luckBalance <= 0) return null;
  if (luckBalance >= 1 && luckBalance <= 100) return 'Normal Wave';
  if (luckBalance >= 101 && luckBalance <= 1000) return 'Fire Wave';
  if (luckBalance >= 1001 && luckBalance <= 7776) return 'Royal Wave';
  if (luckBalance >= 7777) return 'Admin Wave';
  return 'Normal Wave';
}

/**
 * Generate a cryptographically strong random token
 */
export function generateToken(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
