import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/catalogue";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { family, intensity, preferredNote, occasion } = body;

    // Score catalogue products objectively
    const scored = PRODUCTS.map((prod) => {
      let score = 70;

      if (family && prod.fragranceFamily.toLowerCase() === family.toLowerCase()) {
        score += 15;
      }
      if (intensity && prod.intensity.toLowerCase() === intensity.toLowerCase()) {
        score += 10;
      }
      if (preferredNote && prod.topNotes.concat(prod.heartNotes, prod.baseNotes).some((n) => n.toLowerCase().includes(preferredNote.toLowerCase()))) {
        score += 15;
      }

      return {
        product: prod,
        matchScore: Math.min(99, score),
        reason: `Harmonie naturelle avec vos préférences pour les notes ${prod.fragranceFamily} et l'intensité ${prod.intensity}.`,
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    const top4 = scored.slice(0, 4);

    return NextResponse.json({ success: true, recommendations: top4 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur lors du calcul des recommandations" },
      { status: 500 }
    );
  }
}
