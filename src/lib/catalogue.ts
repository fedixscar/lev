import { Product, Collection } from "../types";

export const COLLECTIONS: Collection[] = [
  {
    id: "col-signature",
    slug: "signature",
    name: "La Collection Signature",
    tagline: "L'élégance fluide des accords nobles",
    description: "La quintessence de Lévania Parfums. Des créations olfactives intemporelles mêlant l'ambre précieux, les bois rares et les baumes orientaux.",
    waveExpression: "signature",
    bannerImage: "/brand/bottle-and-cylinder.jpg",
    productCount: 4,
  },
  {
    id: "col-soyeuse",
    slug: "soyeuse",
    name: "Onde Soyeuse",
    tagline: "Délicatesse florale et fraîcheur lumineuse",
    description: "Une vague de douceur aérienne. Pétales de néroli de Nabeul, jasmin blanc, musc soyeux et brise méditerranéenne.",
    waveExpression: "soft",
    bannerImage: "/brand/cylinders-dual.jpg",
    productCount: 3,
  },
  {
    id: "col-intense",
    slug: "intense",
    name: "Onde Sombre & Boisée",
    tagline: "Puissance tellurique et sillage magnétique",
    description: "L'expression audacieuse de la nuit. Oud fumé, cuir vintage, épices brûlantes et ambre gris d'une intensité monumentale.",
    waveExpression: "intense",
    bannerImage: "/brand/bottle-and-cylinder.jpg",
    productCount: 3,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "lev-01",
    slug: "onde-d-or",
    name: "Onde d'Or",
    subtitle: "Extrait de Parfum Absolu",
    frenchName: "Onde d'Or",
    collection: "La Collection Signature",
    collectionSlug: "signature",
    fragranceFamily: "Amber",
    intensity: "Intense",
    topNotes: ["Bergamote de Calabre", "Safran d'Orient", "Baies Roses"],
    heartNotes: ["Rose de Damas", "Fève Tonka Ciselée", "Bois de Cèdre de l'Atlas"],
    baseNotes: ["Ambre Solaire", "Vanille Bourbon", "Oud Sombre", "Musc Blanc"],
    occasions: ["Soirée de Gala", "Moments d'Exception", "Signature Personnelle"],
    description: "Une onde liquide d'or pur qui caresse la peau d'une chaleur magnétique. Onde d'Or incarne la plénitude et l'éclat de la haute parfumerie artisanale Lévania, sculptée dans un flacon d'exception orné du sceau monogrammé bordeaux et or.",
    sensoryProfile: "Chaleureux, ambré scintillant, enveloppant et profondément mémorable.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
      lifestyle: "/brand/bottle-and-cylinder.jpg",
      bottleOnly: "/brand/logo-emblem.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 195.0, priceMillimes: 195000, stock: 42, sku: "LEV-OR-50" },
      { size: "100ml", priceTND: 295.0, priceMillimes: 295000, stock: 28, sku: "LEV-OR-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 1, // Number 1 on Podium
    rating: 4.95,
    reviewCount: 128,
    qrEligible: true,
    createdAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "lev-02",
    slug: "sillage-d-olivier",
    name: "Sillage d'Olivier",
    subtitle: "Eau de Parfum Précieuse",
    frenchName: "Sillage d'Olivier",
    collection: "La Collection Signature",
    collectionSlug: "signature",
    fragranceFamily: "Woody",
    intensity: "Balanced",
    topNotes: ["Feuilles d'Olivier Froissées", "Mandarine Verte", "Cardamome"],
    heartNotes: ["Bois d'Olivier Centenaire", "Lavande Sauvage", "Iris de Florence"],
    baseNotes: ["Vétiver d'Haïti", "Cuir Doux", "Mousse de Chêne", "Santal Blanc"],
    occasions: ["Quotidien Élégant", "Rendez-vous d'Affaires", "Printemps & Automne"],
    description: "Hommage aux collines d'oliviers méditerranéens baignées de lumière dorée. Une fragrance boisée aromatique noble, sereine et texturée, logée dans son écrin cylindrique vert olive signature.",
    sensoryProfile: "Boisé vert, noble, raffiné et d'une tenue remarquable.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
      lifestyle: "/brand/bottle-and-cylinder.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 180.0, priceMillimes: 180000, stock: 35, sku: "LEV-OLI-50" },
      { size: "100ml", priceTND: 270.0, priceMillimes: 270000, stock: 19, sku: "LEV-OLI-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 2, // Number 2 on Podium
    rating: 4.88,
    reviewCount: 94,
    qrEligible: true,
    createdAt: "2026-01-18T00:00:00Z",
  },
  {
    id: "lev-03",
    slug: "neroli-flottant",
    name: "Néroli Flottant",
    subtitle: "Extrait Floral Lumineux",
    frenchName: "Néroli Flottant",
    collection: "Onde Soyeuse",
    collectionSlug: "soyeuse",
    fragranceFamily: "Floral",
    intensity: "Subtle",
    topNotes: ["Fleur d'Oranger de Nabeul", "Petitgrain Bigarade", "Citron Primofiore"],
    heartNotes: ["Jasmin Sambac", "Ylang-Ylang des Comores", "Fleur de Coton"],
    baseNotes: ["Musc Soyeux", "Bois Blancs Flottés", "Ambrette Délicate"],
    occasions: ["Journée Ensoleillée", "Moments Intimes", "Été Méditerranéen"],
    description: "Une caresse de brise marine sur des vergers de néroli en fleurs. Fraîcheur éclatante et volupté florale soyeuse créant un halo de pureté lumineuse.",
    sensoryProfile: "Aérien, floral immaculé, solaire et apaisant.",
    images: {
      main: "/brand/cylinders-dual.jpg",
      packaging: "/brand/bottle-and-cylinder.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 175.0, priceMillimes: 175000, stock: 50, sku: "LEV-NER-50" },
      { size: "100ml", priceTND: 260.0, priceMillimes: 260000, stock: 31, sku: "LEV-NER-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 3, // Number 3 on Podium
    rating: 4.92,
    reviewCount: 81,
    qrEligible: true,
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "lev-04",
    slug: "oud-imperial",
    name: "Oud Impérial Lévania",
    subtitle: "Extrait de Parfum Majestueux",
    frenchName: "Oud Impérial",
    collection: "Onde Sombre & Boisée",
    collectionSlug: "intense",
    fragranceFamily: "Woody",
    intensity: "Monumental",
    topNotes: ["Encens d'Oman", "Poivre Noir", "Noix de Muscade"],
    heartNotes: ["Oud du Cambodge", "Patchouli Noirci", "Tabac Blond"],
    baseNotes: ["Ambre Gris Naturel", "Cuir de Cordoue", "Ciste Ladanum"],
    occasions: ["Grand Soir", "Hiver Froid", "Séduction Intense"],
    description: "Le caractère suprême des bois résineux et du cuir impérial. Une signature dense, opulente et envoûtante pour les connaisseurs de sillages audacieux.",
    sensoryProfile: "Sombre, fumé boisé, cuiré et hypnotique.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 230.0, priceMillimes: 230000, stock: 18, sku: "LEV-OUD-50" },
      { size: "100ml", priceTND: 350.0, priceMillimes: 350000, stock: 12, sku: "LEV-OUD-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 4,
    rating: 4.97,
    reviewCount: 110,
    qrEligible: true,
    createdAt: "2026-02-05T00:00:00Z",
  },
  {
    id: "lev-05",
    slug: "rose-bourguignonne",
    name: "Rose Bourguignonne",
    subtitle: "Élixir Floral Velours",
    frenchName: "Rose Bourguignonne",
    collection: "La Collection Signature",
    collectionSlug: "signature",
    fragranceFamily: "Floral",
    intensity: "Intense",
    topNotes: ["Litchi Glacé", "Géranium Bourbon", "Poivre Rose"],
    heartNotes: ["Rose Centifolia de Grasse", "Vin de Bordeaux Réduit", "Pivoine Noire"],
    baseNotes: ["Santal Rouge", "Patchouli Velouté", "Muscs Charnels"],
    occasions: ["Dîner Romantique", "Soirée d'Automne", "Occasion Célébration"],
    description: "Une rose sombre veloutée aux reflets bordeaux précieux, faisant écho aux tons bordeaux de l'ornement Lévania. Voluptueuse, aristocratique et inoubliable.",
    sensoryProfile: "Floral velours, liquoreux, riche et charnel.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 190.0, priceMillimes: 190000, stock: 24, sku: "LEV-ROSE-50" },
      { size: "100ml", priceTND: 285.0, priceMillimes: 285000, stock: 15, sku: "LEV-ROSE-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 5,
    rating: 4.89,
    reviewCount: 67,
    qrEligible: true,
    createdAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "lev-06",
    slug: "ambre-mediterraneen",
    name: "Ambre Méditerranéen",
    subtitle: "Parfum Chaleur Marine",
    frenchName: "Ambre Méditerranéen",
    collection: "La Collection Signature",
    collectionSlug: "signature",
    fragranceFamily: "Amber",
    intensity: "Balanced",
    topNotes: ["Zeste de Bergamote", "Sel Marin Flottant", "Gingembre Frais"],
    heartNotes: ["Résine d'Élémi", "Immortelle des Dunes", "Cannelle Douce"],
    baseNotes: ["Ambre Doré", "Bois Flotté Salé", "Fève Tonka", "Benjoin de Siam"],
    occasions: ["Coucher de Soleil", "Voyages", "Saison Estivale & Automnale"],
    description: "Le souffle minéral et doré des vagues caressant les roches antiques. Une symbiose parfaite entre le sel marin et la volupté d'un ambre radieux.",
    sensoryProfile: "Ambré marin, réconfortant et sensuel.",
    images: {
      main: "/brand/cylinders-dual.jpg",
      packaging: "/brand/bottle-and-cylinder.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 185.0, priceMillimes: 185000, stock: 32, sku: "LEV-AMB-50" },
      { size: "100ml", priceTND: 275.0, priceMillimes: 275000, stock: 22, sku: "LEV-AMB-100" },
    ],
    isFeatured: true,
    isBestseller: true,
    bestsellerRank: 6,
    rating: 4.86,
    reviewCount: 54,
    qrEligible: true,
    createdAt: "2026-02-14T00:00:00Z",
  },
  {
    id: "lev-07",
    slug: "vetiver-nocturne",
    name: "Vétiver Nocturne",
    subtitle: "Extrait Boisé Énigmatique",
    frenchName: "Vétiver Nocturne",
    collection: "Onde Sombre & Boisée",
    collectionSlug: "intense",
    fragranceFamily: "Woody",
    intensity: "Intense",
    topNotes: ["Pamplemousse Noir", "Cardamome Fumée", "Angélique"],
    heartNotes: ["Racines de Vétiver Sauvage", "Cyprès Bleu", "Feuilles de Violette"],
    baseNotes: ["Goudron de Bouleau", "Bois de Gaïac", "Cèdre de Virginie"],
    occasions: ["Crépuscule", "Tenue Formelle", "Temps Pluvieux"],
    description: "Un vétiver terreux et fumé traversé d'éclairs d'agrumes noirs. La force tranquille d'une nuit sous les étoiles du Sud.",
    sensoryProfile: "Terreux noble, boisé fumé et mystérieux.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 180.0, priceMillimes: 180000, stock: 29, sku: "LEV-VET-50" },
      { size: "100ml", priceTND: 270.0, priceMillimes: 270000, stock: 16, sku: "LEV-VET-100" },
    ],
    isFeatured: false,
    isBestseller: true,
    bestsellerRank: 7,
    rating: 4.83,
    reviewCount: 42,
    qrEligible: true,
    createdAt: "2026-02-20T00:00:00Z",
  },
  {
    id: "lev-08",
    slug: "fleur-de-soie",
    name: "Fleur de Soie",
    subtitle: "Voile Poudré Intime",
    frenchName: "Fleur de Soie",
    collection: "Onde Soyeuse",
    collectionSlug: "soyeuse",
    fragranceFamily: "Floral",
    intensity: "Subtle",
    topNotes: ["Poire Blanche", "Freesia Transparent", "Aldéhydes Doux"],
    heartNotes: ["Héliotrope Poudré", "Iris Florentin", "Muguet de Mai"],
    baseNotes: ["Musc Coton", "Lait d'Amande", "Santal Léger"],
    occasions: ["Matinée Sérénité", "Moments Cocooning", "Parfum de Peau"],
    description: "La sensation tactile d'un drap de soie pur glissant sur la peau nue. Une texture poudrée et lactée d'un raffinement absolu.",
    sensoryProfile: "Poudré doux, lacté floral et intime.",
    images: {
      main: "/brand/cylinders-dual.jpg",
      packaging: "/brand/bottle-and-cylinder.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 170.0, priceMillimes: 170000, stock: 38, sku: "LEV-SOIE-50" },
      { size: "100ml", priceTND: 255.0, priceMillimes: 255000, stock: 20, sku: "LEV-SOIE-100" },
    ],
    isFeatured: false,
    isBestseller: true,
    bestsellerRank: 8,
    rating: 4.87,
    reviewCount: 49,
    qrEligible: true,
    createdAt: "2026-02-24T00:00:00Z",
  },
  {
    id: "lev-09",
    slug: "cuir-d-orient",
    name: "Cuir d'Orient",
    subtitle: "Parfum Chaud & Épicé",
    frenchName: "Cuir d'Orient",
    collection: "Onde Sombre & Boisée",
    collectionSlug: "intense",
    fragranceFamily: "Spicy",
    intensity: "Intense",
    topNotes: ["Cannelle de Ceylan", "Cumin Doré", "Orange Confite"],
    heartNotes: ["Cuir Russe", "Safran d'Ispahan", "Clou de Girofle"],
    baseNotes: ["Ladanum Épais", "Styrax", "Baume du Pérou", "Castoréum Végétal"],
    occasions: ["Soirées d'Hiver", "Événements Prestigieux", "Amateurs de Cuir"],
    description: "Une chevauchée nocturne dans les caravansérails d'antan. Des cuirs somptueux patinés par le temps, infusés d'épices chaudes et de résines sacrées.",
    sensoryProfile: "Cuiré épicé, chaud, opulent et tenace.",
    images: {
      main: "/brand/bottle-and-cylinder.jpg",
      packaging: "/brand/cylinders-dual.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 210.0, priceMillimes: 210000, stock: 15, sku: "LEV-CUIR-50" },
      { size: "100ml", priceTND: 310.0, priceMillimes: 310000, stock: 9, sku: "LEV-CUIR-100" },
    ],
    isFeatured: false,
    isBestseller: true,
    bestsellerRank: 9,
    rating: 4.91,
    reviewCount: 38,
    qrEligible: true,
    createdAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "lev-10",
    slug: "jardin-d-agrumes",
    name: "Jardin d'Agrumes",
    subtitle: "Cologne Royale Concentrée",
    frenchName: "Jardin d'Agrumes",
    collection: "Onde Soyeuse",
    collectionSlug: "soyeuse",
    fragranceFamily: "Citrus",
    intensity: "Balanced",
    topNotes: ["Cédrat de Corse", "Bergamote Pressée", "Orange Sanguine"],
    heartNotes: ["Basilic Grand Vert", "Thé Blanc Impérial", "Fleur de Romarin"],
    baseNotes: ["Musc Cristallin", "Vétiver Vert", "Ambrette"],
    occasions: ["Réveil Énergisant", "Journée d'Été", "Fraîcheur Intemporelle"],
    description: "L'éclat vivifiant d'un verger d'agrumes sous le soleil méditerranéen. La fraîcheur de la rosée matinale combinée à la tenue d'une concentration haute parfumerie.",
    sensoryProfile: "Hespéridé pétillant, vert aromatique et vivifiant.",
    images: {
      main: "/brand/cylinders-dual.jpg",
      packaging: "/brand/bottle-and-cylinder.jpg",
    },
    formats: [
      { size: "50ml", priceTND: 165.0, priceMillimes: 165000, stock: 45, sku: "LEV-AGR-50" },
      { size: "100ml", priceTND: 245.0, priceMillimes: 245000, stock: 26, sku: "LEV-AGR-100" },
    ],
    isFeatured: false,
    isBestseller: true,
    bestsellerRank: 10,
    rating: 4.82,
    reviewCount: 63,
    qrEligible: true,
    createdAt: "2026-03-05T00:00:00Z",
  },
];

export const PRODUCTS_UPDATED_EVENT = "levania_products_updated";

/**
 * Returns either custom stored products from localStorage (if any exist) or default PRODUCTS.
 */
export function getAllProducts(): Product[] {
  if (typeof window === "undefined") return PRODUCTS;
  try {
    const stored = localStorage.getItem("levania_custom_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return PRODUCTS;
}

/**
 * Saves a new product or updates an existing one (matching by id).
 */
export function saveProduct(product: Product): Product[] {
  const current = getAllProducts();
  const existingIdx = current.findIndex((p) => p.id === product.id);
  let updated: Product[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = product;
  } else {
    updated = [product, ...current];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("levania_custom_products", JSON.stringify(updated));
      window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
    } catch {
      // ignore
    }
  }

  return updated;
}

/**
 * Deletes a product by id.
 */
export function deleteProduct(productId: string): Product[] {
  const current = getAllProducts();
  const updated = current.filter((p) => p.id !== productId);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("levania_custom_products", JSON.stringify(updated));
      window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
    } catch {
      // ignore
    }
  }

  return updated;
}
