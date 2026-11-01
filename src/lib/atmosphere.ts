import { PerfumeAtmosphere, ProductVideoConfig } from "@/types";

export interface AtmosphereConfig {
  id: PerfumeAtmosphere;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  visualIdentity: string;
  defaultVideoUrl: string;
  defaultPosterUrl: string;
  palette: {
    name: string;
    primary: string; // e.g. gold, electric blue, rose, platinum
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    cardBg: string;
    border: string;
    glow: string;
    textColor: string;
    subtextColor: string;
  };
  keywords: string[];
  animationStyle: "storm" | "stardust" | "architectural" | "sensual";
}

export const ATMOSPHERES: Record<PerfumeAtmosphere, AtmosphereConfig> = {
  SAUVAGE: {
    id: "SAUVAGE",
    name: "SAUVAGE",
    tagline: "Sauvage, Sombre & Puissant",
    subtitle: "La Force Brute des Éléments & de l'Orage Marin",
    description:
      "Vagues océaniques tumultueuses, orages profonds, ciels d'encre et éclairs fulgurants. Une intensité magnétique et mystérieuse pour les esprits conquérants.",
    visualIdentity:
      "Vagues d'océan déchaînées • Éclairs et tonnerre • Ciels orageux sombres • Pluie torrentielle • Atmosphère cinématographique obscure • Palette noir, charbon et bleu nuit profond.",
    // Default video loop for stormy ocean & lightning
    defaultVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    defaultPosterUrl: "/brand/bottle-and-cylinder.jpg",
    palette: {
      name: "Obsidienne & Bleu Tempête",
      primary: "#38BDF8", // Electric cyan / lightning
      secondary: "#60A5FA",
      accent: "#93C5FD",
      background: "#05080E",
      surface: "#0B111D",
      cardBg: "rgba(11, 17, 29, 0.75)",
      border: "rgba(56, 189, 248, 0.3)",
      glow: "rgba(56, 189, 248, 0.2)",
      textColor: "#F0F6FC",
      subtextColor: "#94A3B8",
    },
    keywords: ["boisé", "sauvage", "cuir", "orage", "océan", "puissant", "fumé", "épicé"],
    animationStyle: "storm",
  },

  LUXE: {
    id: "LUXE",
    name: "LUXE",
    tagline: "Luxe Royal & Exclusif",
    subtitle: "L'Or Absolu de la Haute Parfumerie Artisanale",
    description:
      "Particules d'or en apesanteur, reflets miroitants liquides, architecture royale et mouvements de caméra lents et majestueux. Le comble de l'opulence.",
    visualIdentity:
      "Particules d'or flottant dans l'air • Reflets dorés prestigieux • Environnements noirs et or impérial • Détails architecturaux précieux • Éclairage d'exception.",
    // Default video loop for golden particles and royal amber
    defaultVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    defaultPosterUrl: "/brand/cylinders-dual.jpg",
    palette: {
      name: "Or Impérial & Noir Velours",
      primary: "#DFC68B", // Imperial gold
      secondary: "#C7A66A",
      accent: "#FDE68A",
      background: "#080604",
      surface: "#140F0A",
      cardBg: "rgba(20, 15, 10, 0.8)",
      border: "rgba(223, 198, 139, 0.35)",
      glow: "rgba(199, 166, 106, 0.25)",
      textColor: "#FAF7F2",
      subtextColor: "#D1C4B2",
    },
    keywords: ["or", "ambre", "vanille", "royal", "prestige", "opulent", "gourmand"],
    animationStyle: "stardust",
  },

  CLASS: {
    id: "CLASS",
    name: "CLASS",
    tagline: "Class & Épure Architecturale",
    subtitle: "Sophistication, Marbre Blanc & Élégance Intemporelle",
    description:
      "Lignes architecturales minimalistes, surfaces de marbre veiné, ombres douces et reflets cristallins. Le raffinement discret et souverain des grandes maisons.",
    visualIdentity:
      "Architecture de luxe minimaliste • Surfaces de marbre noble • Ombres et reflets délicats • Intérieurs sophistiqués • Mouvements fluides • Palette ivoire, beige, argent et noir.",
    // Default video loop for architectural marble and minimalist light
    defaultVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    defaultPosterUrl: "/brand/logo-emblem.jpg",
    palette: {
      name: "Marbre Carrara & Platine",
      primary: "#E2E8F0", // Platinum silver
      secondary: "#CBD5E1",
      accent: "#F8FAFC",
      background: "#0A0B0E",
      surface: "#14171F",
      cardBg: "rgba(20, 23, 31, 0.75)",
      border: "rgba(226, 232, 240, 0.28)",
      glow: "rgba(226, 232, 240, 0.15)",
      textColor: "#F8FAFC",
      subtextColor: "#A1A1AA",
    },
    keywords: ["frais", "citrus", "élégant", "marbre", "intemporel", "minimaliste", "cristallin"],
    animationStyle: "architectural",
  },

  "FÉMININE & SEXY": {
    id: "FÉMININE & SEXY",
    name: "FÉMININE & SEXY",
    tagline: "Sensuelle, Envoûtante & Séductrice",
    subtitle: "Pétales de Rose Pourpre & Voile de Soie Voluptueux",
    description:
      "Drapé de soie pourpre glissant dans la pénombre, pétales de rose carmin en lévitation, volutes de fumée parfumée et lumière chaude et sensuelle.",
    visualIdentity:
      "Soie rouge ondulant au ralenti • Pétales de rose flottant dans les airs • Éclairage cinématographique intime • Effets de fumée voluptueux • Palette bordeaux, rouge profond, rose et noir.",
    // Default video loop for crimson silk & petals
    defaultVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    defaultPosterUrl: "/brand/hero-bottles.png",
    palette: {
      name: "Pourpre Impérial & Pétales Roses",
      primary: "#FB7185", // Rose petal / crimson
      secondary: "#E11D48",
      accent: "#FDA4AF",
      background: "#0E0407",
      surface: "#1A060F",
      cardBg: "rgba(26, 6, 15, 0.8)",
      border: "rgba(251, 113, 133, 0.35)",
      glow: "rgba(225, 29, 72, 0.25)",
      textColor: "#FFF1F2",
      subtextColor: "#FDA4AF",
    },
    keywords: ["floral", "rose", "soie", "sensuel", "sexy", "bordeaux", "pourpre", "envoûtant"],
    animationStyle: "sensual",
  },
};

/**
 * Returns the atmosphere configuration for a given atmosphere name,
 * with graceful fallback to 'LUXE'.
 */
export function getAtmosphereConfig(atmosphere?: string): AtmosphereConfig {
  if (!atmosphere) return ATMOSPHERES["LUXE"];
  const normalized = atmosphere.toUpperCase().trim();
  if (normalized.includes("SAUVAGE")) return ATMOSPHERES["SAUVAGE"];
  if (normalized.includes("FEMININE") || normalized.includes("FÉMININE") || normalized.includes("SEXY"))
    return ATMOSPHERES["FÉMININE & SEXY"];
  if (normalized.includes("CLASS")) return ATMOSPHERES["CLASS"];
  if (normalized.includes("LUXE")) return ATMOSPHERES["LUXE"];
  return ATMOSPHERES["LUXE"];
}

/**
 * Resolves the effective video URL for a product based on priority:
 * 1. Custom product video URL (if configured)
 * 2. Category default video URL
 * 3. Empty string if none
 */
export function getProductEffectiveVideo(
  product?: {
    atmosphere?: PerfumeAtmosphere;
    videoUrl?: string;
    videoConfig?: ProductVideoConfig;
  } | null
): {
  videoUrl: string;
  isCustom: boolean;
  atmosphere: PerfumeAtmosphere;
  config: AtmosphereConfig;
  videoConfig: ProductVideoConfig;
} {
  const atmosphere = (product?.atmosphere as PerfumeAtmosphere) || "LUXE";
  const config = getAtmosphereConfig(atmosphere);

  const videoConfig: ProductVideoConfig = {
    videoUrl: product?.videoUrl || product?.videoConfig?.videoUrl || "",
    useCategoryDefault:
      product?.videoConfig?.useCategoryDefault ??
      !(product?.videoUrl || product?.videoConfig?.videoUrl),
    overlayDarkness: product?.videoConfig?.overlayDarkness ?? 0.55,
    opacity: product?.videoConfig?.opacity ?? 1.0,
    displayMode: product?.videoConfig?.displayMode || "cover",
    positioning: product?.videoConfig?.positioning || "center",
  };

  const hasCustom = Boolean(videoConfig.videoUrl && !videoConfig.useCategoryDefault);
  const effectiveUrl = hasCustom ? (videoConfig.videoUrl as string) : config.defaultVideoUrl;

  return {
    videoUrl: effectiveUrl,
    isCustom: hasCustom,
    atmosphere,
    config,
    videoConfig,
  };
}
