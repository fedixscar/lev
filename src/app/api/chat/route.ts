import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "@/lib/catalogue";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { rowToProduct } from "@/app/api/products/route";
import { Product } from "@/types";

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

    // 1. Fetch live catalogue from database to ensure AI knows all real products
    let catalogueProducts: Product[] = [];
    if (isSupabaseConfigured()) {
      try {
        const { data: rows, error: rowsErr } = await supabase.from("products").select("*");
        if (rows && rows.length > 0 && !rowsErr) {
          const { data: variants } = await supabase.from("product_variants").select("*");
          catalogueProducts = rows.map((r) => {
            const pVariants = variants ? variants.filter((v) => v.product_id === r.id) : [];
            return rowToProduct(r, pVariants);
          });
        }
      } catch (dbErr) {
        console.warn("Supabase fetch failed in chat, fallback to local catalogue:", dbErr);
      }
    }

    if (!catalogueProducts || catalogueProducts.length === 0) {
      catalogueProducts = PRODUCTS;
    }

    const validSlugs = new Set([
      ...catalogueProducts.map((p) => p.slug),
      "compose-box",
    ]);

    // Build dynamic catalog representation for AI prompt
    const productsListText = catalogueProducts
      .map(
        (p) => `- "${p.name}" (Slug: ${p.slug})
  Sous-titre: ${p.subtitle || "Haute Parfumerie Lévania"}
  Famille Olfactive: ${p.fragranceFamily}, Intensité: ${p.intensity}, Genre: ${p.gender || "Unisexe"}
  Notes de tête: ${(p.topNotes || []).join(", ") || "Notes hespéridées"}
  Notes de cœur: ${(p.heartNotes || []).join(", ") || "Notes florales et épicées"}
  Notes de fond: ${(p.baseNotes || []).join(", ") || "Ambre et muscs nobles"}
  Profil sensoriel: ${p.sensoryProfile || p.description}
  Tarifs: 50ml à ${p.formats[0]?.priceTND ?? 195} TND • 100ml à ${p.formats[1]?.priceTND ?? 295} TND`
      )
      .join("\n\n");

    const systemInstruction = `Vous êtes le Concierge Olfactif Privé et Maître Parfumeur de la prestigieuse Maison Lévania Parfums (Haute Parfumerie artisanale).
Votre rôle est de conseiller et guider les clients avec un ton luxueux, chaleureux, poétique, raffiné et hautement expert.

À PROPOS DE LA MAISON LÉVANIA:
- Maison de haute parfumerie alliant le patrimoine noble méditerranéen et des essences précieuses de Grasse et d'Orient.
- Flacons d'exception présentés dans de somptueux écrins cylindriques scellés de rubans de satin et ornés du sceau monogrammé bordeaux et or.
- Chaque flacon est certifié authentique avec un QR code infalsifiable.

CATALOGUE OFFICIEL ACTIF DES PARFUMS DISPONIBLES SUR LE SITE LÉVANIA :
${productsListText}

SERVICES & EXPÉRIENCES EXCLUSIVES :
1. "Composer Mon Coffret" (Slug: compose-box) : Coffret cylindrique de prestige de 2 ou 3 flacons sur mesure avec rubans satin et calligraphie offerte.
2. "La Roue Cadeau / Wheel of Chance" : Chaque 10 TND rapporte 1 point de chance pour tenter de remporter des réductions ou des flacons offerts.
3. "Livraison & Expédition" : Livraison express 24h-48h partout en Tunisie, offerte dès 200 TND d'achat (sinon 7 TND).

RÈGLES D'ORIENTATION OLFACTIVE CRUCIALES :
1. PARFUMS SUCRÉS / GOURMANDS / VANILLÉS :
   Si le client recherche un parfum sucré ("parfum sucré", "sucré", "gourmand", "vanille", "doux", "fruité doux", "sucrée"), vous DEVEZ OBLIGATOIREMENT lui recommander l'une de nos créations sucrées du site parmi :
   - "1 Million Elixir (Rabanne)" (slug: 1-million-elixir-rabanne) : Un chef-d'œuvre sucré et opulent dominé par une sublime absolue de vanille, pomme croquante, fève tonka et davana liquoreux.
   - "Ultra Male (Jean Paul Gaultier)" (slug: ultra-male-jean-paul-gaultier) : Gourmandise fruitée irrésistible avec sa poire sucrée juteuse, sa gousse de vanille noire intense et une touche de cannelle.
   - "Tobacco Vanille (Tom Ford)" (slug: tobacco-vanille-tom-ford) : Richesse somptueuse de vanille bourbon crémeuse, cacao doux, fève tonka et fruits secs miellés.
   - "Black XS (Rabanne)" (slug: black-xs-rabanne) : Accord chocolaté et gourmand avec sa praline sucrée fondante, cannelle et baume ambré chaud.
   - "Emporio Armani Stronger With You (Giorgio Armani)" (slug: emporio-armani-stronger-with-you-giorgio-armani) : Délicieuse note de châtaigne confite glacée, vanille veloutée et épices douces.
   - "Erba Pura (Xerjoff)" (slug: erba-pura-xerjoff) : Explosion joyeuse et sucrée de fruits méditerranéens veloutés drapés de vanille de Madagascar.
   - "Scandal Pour Homme (Jean Paul Gaultier)" (slug: scandal-pour-homme-jean-paul-gaultier) : Caramel brun gourmand, fève tonka et sauge raffinée.

2. PARFUMS FRAIS / HESPÉRIDÉS / MARINS :
   Recommander "Imagination (Louis Vuitton)" (slug: imagination-louis-vuitton) ou "Allure Homme Sport (Chanel)" (slug: allure-homme-sport-chanel).

3. PARFUMS BOISÉS / CUIRÉS / ORIENTAUX :
   Recommander "Bleu de Chanel Parfum (Chanel)" (slug: bleu-de-chanel-parfum-chanel), "Black Afgano (Nasomatto)" (slug: black-afgano-nasomatto), "Ombré Leather Parfum (Tom Ford)" (slug: ombre-leather-parfum-tom-ford), "Sauvage (Dior)" (slug: sauvage-dior), "The Most Wanted Parfum (Azzaro)" (slug: the-most-wanted-parfum-azzaro) ou "Aventus (Creed)" (slug: aventus-creed).

4. RÈGLE STRICTE SUR LE CATALOGUE :
   Ne suggérez QUE des parfums existant dans le catalogue ci-dessus ! Ne mentionnez aucun parfum extérieur non référencé.

5. FORMAT DE RECOMMANDATION OBLIGATOIRE :
   Lorsque vous recommandez un parfum ou le service coffret au client, terminez TOUJOURS impérativement votre réponse par une ligne distincte contenant :
   [RECOMMEND:slug]
   Exemple : [RECOMMEND:1-million-elixir-rabanne] ou [RECOMMEND:ultra-male-jean-paul-gaultier].
   N'utilisez qu'un slug valide existant dans la liste.

6. STYLE & TON :
   Répondez dans la langue de l'utilisateur (Français, Arabe ou Anglais). Soyez élégant, passionné, concis (2 à 3 paragraphes), et invitez délicatement le client à découvrir la création.`;

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
          systemInstruction: systemInstruction,
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
          systemInstruction: systemInstruction,
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
      if (validSlugs.has(extracted)) {
        recommendedSlug = extracted;
      } else {
        const found = Array.from(validSlugs).find(
          (s) => s.includes(extracted) || extracted.includes(s)
        );
        if (found) recommendedSlug = found;
      }
      rawText = rawText.replace(/\[RECOMMEND:[a-z0-9-]+\]/gi, "").trim();
    }

    let recommendedProduct: any = undefined;
    if (recommendedSlug && recommendedSlug !== "compose-box") {
      const matched = catalogueProducts.find((p) => p.slug === recommendedSlug);
      if (matched) {
        recommendedProduct = {
          id: matched.id,
          name: matched.name,
          slug: matched.slug,
          image: matched.images?.main || "/brand/bottle-and-cylinder.jpg",
          priceTND: matched.formats?.[0]?.priceTND || 195,
          fragranceFamily: matched.fragranceFamily,
          subtitle: matched.subtitle,
        };
      }
    }

    return NextResponse.json({
      success: true,
      reply: rawText,
      recommendedSlug,
      recommendedProduct,
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
