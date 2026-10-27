import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Veuillez fournir un lien Fragrantica ou un nom de parfum valide." },
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
        { error: "Clé Gemini API non configurée sur le serveur." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Tu es un maître parfumeur et documentaliste expert de l'encyclopédie mondiale Fragrantica.
L'utilisateur souhaite ajouter un parfum à la boutique de luxe Lévania à partir de cette référence: "${url.trim()}".

Identifie précisément ce parfum et sa pyramide olfactive authentique enregistrée sur Fragrantica (ou dans l'univers de la parfumerie).
Renvoie STRICTEMENT un objet JSON valide avec cette structure exacte (sans bloc de code ni balises superflues):
{
  "name": "Nom du parfum (ex: Scandal)",
  "brand": "Maison ou Marque (ex: Jean Paul Gaultier)",
  "subtitle": "Sous-titre poétique et évocateur en français (ex: Eau de Parfum Miel & Gardénia)",
  "collection": "La Collection Signature",
  "gender": "Pour Elle" ou "Pour Lui" ou "Unisexe",
  "fragranceFamily": "Floral" ou "Amber" ou "Woody" ou "Citrus" ou "Spicy" ou "Sweet" ou "Oriental",
  "intensity": "Subtle" ou "Balanced" ou "Intense" ou "Monumental",
  "topNotes": ["note de tete 1", "note de tete 2"],
  "heartNotes": ["note de coeur 1", "note de coeur 2"],
  "baseNotes": ["note de fond 1", "note de fond 2"],
  "description": "Description luxueuse et séduisante de 2 à 3 phrases en français mettant en valeur le sillage.",
  "sensoryProfile": "Court profil sensoriel (ex: Gourmand, floral blanc, mielleux et chaleureux)",
  "price50": 195,
  "price100": 295,
  "stock50": 30,
  "stock100": 20
}`;

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const fallbackModel = "gemini-2.5-flash-lite";

    let jsonString = "";

    try {
      const response = await ai.models.generateContent({
        model: primaryModel,
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      });
      jsonString = response.text || "";
    } catch (primaryErr) {
      console.warn(`Primary model failed for scrape, falling back to ${fallbackModel}:`, primaryErr);
      const fallbackRes = await ai.models.generateContent({
        model: fallbackModel,
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      });
      jsonString = fallbackRes.text || "";
    }

    const perfumeData = JSON.parse(jsonString);

    return NextResponse.json({
      success: true,
      data: perfumeData,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'extraction Fragrantica:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Impossible d'extraire les données du parfum depuis ce lien.",
      },
      { status: 500 }
    );
  }
}
