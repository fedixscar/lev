import { WheelTier } from "../lib/utils";

export type FragranceFamily =
  | "Woody"
  | "Floral"
  | "Amber"
  | "Citrus"
  | "Spicy"
  | "Fresh"
  | "Sweet"
  | "Oriental";

export type FragranceIntensity = "Subtle" | "Balanced" | "Intense" | "Monumental";

export type ProductFormat = {
  size: "50ml" | "100ml";
  priceTND: number;
  priceMillimes: number;
  stock: number;
  sku: string;
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  frenchName: string;
  collection: string;
  collectionSlug: string;
  fragranceFamily: FragranceFamily;
  intensity: FragranceIntensity;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  occasions: string[];
  description: string;
  sensoryProfile: string;
  images: {
    main: string;
    packaging: string;
    lifestyle?: string;
    bottleOnly?: string;
  };
  formats: ProductFormat[];
  isFeatured: boolean;
  isBestseller: boolean;
  bestsellerRank?: number; // 1 to 10
  rating: number;
  reviewCount: number;
  qrEligible: boolean;
  createdAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  waveExpression: "signature" | "soft" | "intense";
  bannerImage: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  formatSize: "50ml" | "100ml";
  unitPriceTND: number;
  unitPriceMillimes: number;
  quantity: number;
  giftBoxDetails?: {
    boxType: string;
    wrapping: string;
    accessories: string[];
    customMessage?: string;
  };
}

export interface AppliedCoupon {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number; // percentage (e.g. 15 for 15%) or fixed TND amount
  minSpendTND?: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "cod";

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    governorate: string;
    postalCode: string;
    notes?: string;
  };
  items: CartItem[];
  subtotalMillimes: number;
  discountMillimes: number;
  deliveryFeeMillimes: number;
  totalMillimes: number;
  totalTND: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "online" | "cod";
  luckAwarded: number;
  loyaltyPointsAwarded: number;
  trackingNumber?: string;
  appliedCoupon?: string;
  createdAt: string;
  updatedAt: string;
}

/* Loyalty & Gamification Models */
export interface LuckWallet {
  customerId: string;
  balance: number; // Max 7,777
  tier: WheelTier | null;
  lifetimeEarned: number;
  lifetimeConsumed: number;
  lastSpinAt?: string;
}

export interface LoyaltyWallet {
  customerId: string;
  pointsBalance: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
}

export interface XPWallet {
  customerId: string;
  xpBalance: number;
  level: number;
  levelTitle: string;
  doubleXpActive: boolean;
  multiplierExpiry?: string;
}

export interface WheelReward {
  id: string;
  tier: WheelTier;
  label: string;
  type: "points" | "percent_coupon" | "fixed_coupon" | "free_product" | "sample_pack" | "luxury_packaging";
  value: number | string;
  description: string;
  weight: number; // relative probability weight
  remainingStock?: number;
}

export interface WheelSpinRecord {
  id: string;
  customerId: string;
  tier: WheelTier;
  luckConsumed: number;
  rewardId: string;
  rewardLabel: string;
  rewardType: string;
  rewardValue: number | string;
  couponCodeGenerated?: string;
  timestamp: string;
}

/* Reseller Ecosystem Models */
export type ResellerRank = "Iron" | "Bronze" | "Gold" | "Platinum" | "Diamond" | "Master";

export interface ResellerProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  currentRank: ResellerRank;
  rankBadgeUrl: string;
  pendingCommissionTND: number;
  approvedCommissionTND: number;
  paidCommissionTND: number;
  totalValidatedSales: number;
  joinedAt: string;
}

export type ResellerSaleStatus = "submitted" | "under_review" | "approved" | "rejected" | "paid";

export interface ResellerSale {
  id: string;
  resellerId: string;
  resellerName: string;
  orderReference: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  size: "50ml" | "100ml";
  saleAmountTND: number;
  commissionRateTND: number; // snapshotted at time of sale
  status: ResellerSaleStatus;
  evidenceNotes?: string;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface ResellerObjective {
  id: string;
  rank: ResellerRank;
  period: "daily" | "weekly" | "monthly";
  title: string;
  targetSalesCount: number;
  currentSalesCount: number;
  bonusRewardTND: number;
  deadline: string;
  isCompleted: boolean;
}

/* Chat & Realtime Messaging */
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "customer" | "admin" | "reseller" | "ai";
  content: string;
  timestamp: string;
  read: boolean;
}

/* Physical Perfume QR Experience */
export interface QRProductToken {
  token: string;
  productId: string;
  bottleSerialNumber: string;
  batchCode: string;
  bottlingDate: string;
  isActivated: boolean;
  scanCount: number;
  lastScannedAt?: string;
  associatedCustomerName?: string;
}

/* Custom Gift Box */
export interface GiftBoxOption {
  id: string;
  name: string;
  description: string;
  priceTND: number;
  type: "box" | "wrapping" | "accessory";
  previewImage?: string;
}
