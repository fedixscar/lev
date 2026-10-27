import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "@/lib/catalogue";

const VALID_SLUGS = new Set([
  ...PRODUCTS.map((p) => p.slug),
  "compose-box",
]);

const SYSTEM_INSTRUCTION = `Vous êtes le Concierge Olfactif Privé et Maître Parfumeur de la prestigieuse Maison Lévania Parfums (Haute Parfumerie artisanale).
Votre mission est de guider les clients avec un ton luxueux, raffiné, bienveillant, poétique et hautement expert.

À PROPOS DE LA MAISON LÉVANIA:
- Maison de haute parfumerie artisanale alliant le patrimoine noble méditerranéen (Tunisie, Grasse) et des essences rares mondiales.
- Flacons d'exception présentés dans de somptueux écrins cylindriques scellés de rubans de satin et ornés du sceau monogrammé bordeaux et or.
- Chaque flacon est certifié authentique avec un QR code infalsifiable.

CATALOGUE DES CRÉATIONS LÉVANIA (Slugs & Notes):
${PRODUCTS.map(
  (p) => `- "${p.name}" (Slug: ${p.slug}): ${p.subtitle}. Famille: ${p.fragranceFamily}, Intensité: ${p.intensity}.
    Notes de tête: ${p.topNotes.join(", ")}.
    Notes de cœur: ${p.heartNotes.join(", ")}.
    Notes de fond: ${p.baseNotes.join(", ")}.
    Occasions idéales: ${p.occasions.join(", ")}.
    Prix: 50ml à ${p.formats[0]?.priceTND} TND, 100ml à ${p.formats[1]?.priceTND} TND.
    Description: ${p.description}`
).join("\n")}

SERVICES & EXPÉRIENCES EXCLUSIVES:
1. "Composer Mon Coffret" (Slug: compose-box): Service sur mesure permettant de composer un coffret cylindrique de prestige de 2 ou 3 flacons (50ml ou 100ml) avec rubans en satin personnalisés et une dédicace calligraphiée à la main offerte.
2. "La Roue du Destin / Wheel of Chance": Programme de fidélité ludique. Chaque 10 TND d'achat rapporte 1 point de Luck. Les lancers permettent de remporter des réductions immédiates, des sets découvertes d'échantillons ou des flacons offerts.
3. "Livraison & Expédition": Livraison express en 24h à 48h partout en Tunisie via nos transporteurs partenaires. Offerte dès 200 TND d'achat (sinon 7.000 TND).
4. "Réseau Revendeurs": Programme officiel pour partenaires avec 6 rangs prestigieux (Iron, Bronze, Gold, Platinum, Diamond, Master) et commissions attractives.

CONSIGNES DE RÉPONSE:
1. Adoptez un langage élégant, digne des plus grands salons de haute parfumerie.
2. Répondez toujours dans la langue de l'utilisateur (Français, Arabe ou Anglais). En arabe, utilisez un arabe soigné et chaleureux adapté à la clientèle du luxe.
3. Si votre réponse met en valeur ou recommande un parfum spécifique ou le service coffret, terminez TOUJOURS votre message par une ligne contenant uniquement:
[RECOMMEND:slug]
(où slug est l'un des slugs officiels: onde-d-or, sillage-d-olivier, neroli-flottant, oud-imperial, rose-bourguignonne, ambre-mediterraneen, vetiver-nocturne, fleur-de-soie, cuir-d-orient, jardin-d-agrumes, compose-box).
Ne mettez cette balise que si une recommandation claire d'une création spécifique est faite.
4. Restez concis, captivant et accueillant (2 à 3 paragraphes maximum).`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [], locale = "fr" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message requis" },
        { status: 400 }
      );
    }

    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      try {
        const fs = await import("fs");
        const path = await import("path");
        const envPath = path.join(process.cwd(), ".env.local");
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf8");
          const match = content.match(/GEMINI_API_KEY\s*=\s*([^\r\n]+)/);
          if (match) {
            apiKey = match[1].trim().replace(/^['"]|['"]$/g, "");
          }
        }
      } catch (err) {
        console.warn("Unable to read .env.local fallback:", err);
      }
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Clé Gemini non configurée",
          reply:
            locale === "ar"
              ? "مرحبًا بكم في ليفانيا بارفان. يرجى تهيئة مفتاح الذكاء الاصطناعي للاستفادة الكاملة من خدمة المستشار الخاص."
              : locale === "en"
              ? "Welcome to Lévania Parfums. Please configure the AI API key to converse with your private fragrance concierge."
              : "Bienvenue chez Lévania Parfums. Le service de Conciergerie Olfactif est temporairement en cours d'initialisation.",
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format previous conversation turns including initial greeting
    const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (!item.text) continue;
        formattedContents.push({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      }
    }

    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [
        {
          text: `[Langue du client: ${locale}]\n${message}`,
        },
      ],
    });

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const fallbackModel = "gemini-2.5-flash-lite";

    let rawText = "";

    try {
      const response = await ai.models.generateContent({
        model: primaryModel,
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      rawText = response.text || "";
    } catch (primaryErr) {
      console.warn(`Primary model ${primaryModel} failed, trying fallback ${fallbackModel}:`, primaryErr);
      const fallbackResponse = await ai.models.generateContent({
        model: fallbackModel,
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      rawText = fallbackResponse.text || "";
    }

    // Extract [RECOMMEND:slug] if present
    let recommendedSlug: string | undefined = undefined;
    const match = rawText.match(/\[RECOMMEND:([a-z0-9-]+)\]/i);
    if (match) {
      const extracted = match[1].toLowerCase().trim();
      if (VALID_SLUGS.has(extracted)) {
        recommendedSlug = extracted;
      } else {
        const found = Array.from(VALID_SLUGS).find(
          (s) => s.includes(extracted) || extracted.includes(s)
        );
        if (found) recommendedSlug = found;
      }
      rawText = rawText.replace(/\[RECOMMEND:[a-z0-9-]+\]/gi, "").trim();
    }

    return NextResponse.json({
      success: true,
      reply: rawText,
      recommendedSlug,
    });
  } catch (error: any) {
    console.error("Erreur API Chat Gemini:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Erreur lors de la communication avec le Concierge",
        reply:
          "Maison Lévania Parfums vous remercie. Nos maîtres parfumeurs sont à votre disposition pour vous guider vers votre sillage d'exception.",
      },
      { status: 500 }
    );
  }
}
