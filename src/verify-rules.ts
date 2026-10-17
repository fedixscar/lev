import {
  calculateLuckFromTND,
  calculateLuckFromMillimes,
  getWheelTier,
  formatTND,
  formatMillimes,
  MAX_LUCK_CAP,
} from "./lib/utils";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`FAIL: ${msg}`);
  }
  console.log(`✓ PASS: ${msg}`);
}

console.log("=== LÉVANIA PARFUMS — BUSINESS LOGIC VERIFICATION ===");

// 1. LUCK FORMULA TESTS
assert(calculateLuckFromTND(9) === 0, "9 TND awards 0 Luck");
assert(calculateLuckFromTND(59) === 5, "59 TND awards 5 Luck");
assert(calculateLuckFromTND(100) === 10, "100 TND awards 10 Luck");
assert(calculateLuckFromTND(259.5) === 25, "259.5 TND awards 25 Luck");
assert(calculateLuckFromTND(1000) === 100, "1,000 TND awards 100 Luck");

// 2. MILLIMES FORMULA TESTS
assert(calculateLuckFromMillimes(9000) === 0, "9,000 millimes awards 0 Luck");
assert(calculateLuckFromMillimes(59000) === 5, "59,000 millimes awards 5 Luck");
assert(calculateLuckFromMillimes(100000) === 10, "100,000 millimes awards 10 Luck");

// 3. CAP TEST
assert(MAX_LUCK_CAP === 7777, "Luck Cap is exactly 7,777");

// 4. WHEEL TIER BOUNDARY TESTS
assert(getWheelTier(0) === null, "0 Luck has no active tier");
assert(getWheelTier(1) === "Normal Wave", "1 Luck enters Normal Wave");
assert(getWheelTier(100) === "Normal Wave", "100 Luck is in Normal Wave");
assert(getWheelTier(101) === "Fire Wave", "101 Luck enters Fire Wave");
assert(getWheelTier(1000) === "Fire Wave", "1,000 Luck is in Fire Wave");
assert(getWheelTier(1001) === "Royal Wave", "1,001 Luck enters Royal Wave");
assert(getWheelTier(7776) === "Royal Wave", "7,776 Luck is in Royal Wave");
assert(getWheelTier(7777) === "Admin Wave", "7,777 Luck unlocks Admin Wave");

// 5. FORMATTING TESTS
assert(formatTND(195, true) === "195.000 TND", "Format 195 TND with millimes");
assert(formatMillimes(195000) === "195.000 TND", "Format 195,000 millimes to TND string");

console.log("\nALL CRITICAL BUSINESS RULES & LUCK FORMULAS VERIFIED SUCCESSFULLY!");
