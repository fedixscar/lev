import { NextResponse } from "next/server";
import { getWheelTier, MAX_LUCK_CAP } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { luckBalance } = await req.json();

    if (typeof luckBalance !== "number" || luckBalance < 1) {
      return NextResponse.json(
        { success: false, error: "Solde de Luck insuffisant pour lancer la Roue (minimum 1 Luck requis)." },
        { status: 400 }
      );
    }

    const tier = getWheelTier(luckBalance);
    if (!tier) {
      return NextResponse.json(
        { success: false, error: "Niveau de Vague indéterminé." },
        { status: 400 }
      );
    }

    // Atomic server-determined reward
    const rewardsMap: Record<string, { label: string; type: string; value: any }> = {
      "Normal Wave": { label: "Coupon Réduction -10%", type: "percent_coupon", value: 10 },
      "Fire Wave": { label: "Coupon Privilège -20%", type: "percent_coupon", value: 20 },
      "Royal Wave": { label: "Flacon Lévania 50ml Offert", type: "free_product", value: "free-50ml" },
      "Admin Wave": { label: "Grand Trésor Lévania (2 Flacons 100ml Offerts)", type: "free_product", value: "grand-tresor-100ml-duo" },
    };

    const selected = rewardsMap[tier];
    const couponCode = `ROUE-${tier.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      tier,
      luckConsumed: luckBalance,
      reward: selected,
      couponCode,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la validation du tirage." },
      { status: 500 }
    );
  }
}
