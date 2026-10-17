export interface OlfactoryNoteDetail {
  name: string;
  family: string;
  origin: string;
  extraction: string;
  description: string;
  holdingTime: string;
  resonance: string;
  color: string;
}

export const OLFACTORY_NOTES_REGISTRY: Record<string, OlfactoryNoteDetail> = {
  // Agrumes & Fraîcheurs
  "Bergamote": {
    name: "Bergamote de Calabre",
    family: "Hespéridé Lumineux",
    origin: "Plateaux ensoleillés de Calabre, Italie",
    extraction: "Expression mécanique à froid des écorces de fruits frais",
    description: "Une envolée pétillante, zestée et légèrement fleurie, apportant une clarté solaire immédiate dès la première pulvérisation.",
    holdingTime: "1 à 2 heures en tête",
    resonance: "Accord Solaire & Vif",
    color: "#D4AF37",
  },
  "Néroli": {
    name: "Néroli Précieux du Cap Bon",
    family: "Floral Hespéridé & Miellé",
    origin: "Vergers séculaires de Nabeul, Tunisie",
    extraction: "Distillation douce à la vapeur d'eau des fleurs fraîches de bigaradier cueillies à l'aube",
    description: "Fleur blanche d'une pureté absolue, caressée par la brise marine méditerranéenne, aux effluves suaves et aériennes.",
    holdingTime: "2 à 3 heures",
    resonance: "Onde Soyeuse Pure",
    color: "#E8C872",
  },
  "Fleur d'oranger": {
    name: "Absolu de Fleur d'Oranger",
    family: "Floral Blanc Sensuel",
    origin: "Bassin de Nabeul & Cap Bon, Tunisie",
    extraction: "Extraction aux solvants volatils puis purification en alcool pur",
    description: "Ronde, envoûtante et généreuse, cette note offre un cœur chaud et enveloppant qui réchauffe l'épiderme.",
    holdingTime: "4 à 6 heures en cœur",
    resonance: "Harmonie d'Or Céleste",
    color: "#F4A460",
  },
  "Mandarine": {
    name: "Mandarine Sanguine",
    family: "Hespéridé Fruité",
    origin: "Vergers de la Méditerranée",
    extraction: "Pression à froid des zestes mûrs",
    description: "Douceur juteuse et pulpeuse, une fraîcheur vibrante et légèrement sucrée qui réveille les sens.",
    holdingTime: "1 à 2 heures en tête",
    resonance: "Fraîcheur Rayonnante",
    color: "#FFA07A",
  },
  "Citron de Sicile": {
    name: "Citron Primo Fiore de Sicile",
    family: "Hespéridé Cristallin",
    origin: "Côtes de Sicile",
    extraction: "Expression à froid des écorces",
    description: "Une vivacité incisive et pure, aux accents de soleil matinal et de rosée méditerranéenne.",
    holdingTime: "1 heure en tête",
    resonance: "Éclat Boréal",
    color: "#F6E05E",
  },

  // Fleurs Nobles
  "Rose": {
    name: "Rose Centifolia & Rose de Mai",
    family: "Floral Noble & Velouté",
    origin: "Vallée des Roses & Terroirs de Grasse",
    extraction: "Distillation hydro-vapocentrée en alambics de cuivre étamé",
    description: "La reine incontestée de la parfumerie : pétales veloutés aux accents miellés, poivrés et aristocratiques.",
    holdingTime: "6 à 8 heures en cœur",
    resonance: "Sillage Impérial",
    color: "#C53030",
  },
  "Rose de Damas": {
    name: "Rose de Damas Royale",
    family: "Floral Boisé Sombre",
    origin: "Plateaux de Damas & Hautes Terres",
    extraction: "Distillation à double passage",
    description: "Une rose sombre, mystique et charnelle, aux reflets pourpres et aux facettes presque cuirées.",
    holdingTime: "8 heures en cœur & fond",
    resonance: "Onde Sombre Passion",
    color: "#852538",
  },
  "Jasmin": {
    name: "Jasmin Sambac Impérial",
    family: "Floral Blanc Nocturne",
    origin: "Jardins suspendus de Nabeul & Nil",
    extraction: "Extraction douce à basse température",
    description: "Cueillie à la tombée de la nuit au paroxysme de son rayonnement olfactif. Sillage voluptueux, opulent et magnétique.",
    holdingTime: "6 à 8 heures en cœur",
    resonance: "Onde Blanche Volupté",
    color: "#E2D9C8",
  },
  "Iris": {
    name: "Iris Pallida & Beurre d'Iris",
    family: "Poudré Aristocratique",
    origin: "Terres de Toscane & Florence",
    extraction: "Séchage des rhizomes pendant 3 ans puis distillation lente",
    description: "Le composant le plus précieux de la haute parfumerie. Époustouflant de sophistication, doux comme du velours.",
    holdingTime: "10 heures en cœur & fond",
    resonance: "Noblesse Céleste",
    color: "#9F7AEA",
  },

  // Bois Précieux & Riches
  "Oud": {
    name: "Oud Royal d'Assam Sauvage",
    family: "Boisé Oriental Majestueux",
    origin: "Forêts séculaires d'Assam",
    extraction: "Hydro-distillation artisanale en fûts anciens",
    description: "Le 'Bois des Dieux'. Fumé, résineux, d'une profondeur insondable et d'un magnétisme absolu.",
    holdingTime: "Plus de 24 heures en fond",
    resonance: "Onde Sombre Souveraine",
    color: "#2D1810",
  },
  "Bois de Santal": {
    name: "Santal Album de Mysore",
    family: "Boisé Crémeux & Sacré",
    origin: "Forêts protégées de Mysore",
    extraction: "Distillation lente à la vapeur d'eau de source",
    description: "Crémeux, lacté, spirituel et soyeux. Il offre une rondeur enveloppante comme une seconde peau.",
    holdingTime: "16 heures en fond",
    resonance: "Harmonie Soyeuse",
    color: "#D2B48C",
  },
  "Cèdre de l'Atlas": {
    name: "Cèdre Majestueux de l'Atlas",
    family: "Boisé Sec & Noble",
    origin: "Massifs montagneux de l'Atlas",
    extraction: "Entraînement à la vapeur d'eau des copeaux de cœur",
    description: "Une silhouette droite, altière et boisée qui structure la charpente du parfum avec une élégance immuable.",
    holdingTime: "12 heures en fond",
    resonance: "Architecture Éternelle",
    color: "#8B5A2B",
  },
  "Vétiver": {
    name: "Vétiver Bourbon d'Haïti",
    family: "Boisé Racinaire & Fumé",
    origin: "Terroirs volcaniques d'Haïti",
    extraction: "Lavage des racines et distillation à basse pression",
    description: "Terreux, vibrant, fumé avec des étincelles de pamplemousse amer. Une signature racée et intemporelle.",
    holdingTime: "14 heures en fond",
    resonance: "Terre & Onde Profonde",
    color: "#4A5568",
  },

  // Résines & Ambre
  "Ambre": {
    name: "Ambre Solaire Méditerranéen",
    family: "Ambré Résineux Chaud",
    origin: "Sélection exclusive Lévania",
    extraction: "Macération lente d'infusion ambrée en jarres de verre",
    description: "Une caresse dorée comme le sable chaud du Cap Bon au couchant. Balsamique, vanillé et infiniment sensuel.",
    holdingTime: "18 heures en fond",
    resonance: "Vague Signature Solaire",
    color: "#C7A66A",
  },
  "Encens": {
    name: "Encens Royal d'Oman (Al-Hojari)",
    family: "Balsamique Mystique",
    origin: "Désert du Dhofar, Oman",
    extraction: "Distillation des larmes de résine pures",
    description: "Une volute mystique qui s'élève vers les cieux, apportant noblesse, sérénité et une aura envoûtante.",
    holdingTime: "14 heures en cœur & fond",
    resonance: "Onde Spirituelle",
    color: "#718096",
  },
  "Vanille": {
    name: "Gousse de Vanille Bourbon Noire",
    family: "Gourmand Sophistiqué & Boisé",
    origin: "Plantations ombragées de Madagascar",
    extraction: "Extraction hydro-alcoolique d'affinage 12 mois",
    description: "Loin des vanilles sucrées synthétiques : gousse noire fendue, balsamique, cuirée et infiniment addictive.",
    holdingTime: "20 heures en fond",
    resonance: "Volupté Dorée",
    color: "#4A3728",
  },
  "Cuir": {
    name: "Accord Cuir de Russie Artisanal",
    family: "Cuiré Fumé Noble",
    origin: "Atelier Lévania Haute Parfumerie",
    extraction: "Accord exclusif à base de bouleau et cade sauvage",
    description: "Évocateur des fauteuils de club feutrés et des gants de voyage surpiqués d'or. Racé et aristocratique.",
    holdingTime: "16 heures en fond",
    resonance: "Onde Sombre Aristocrate",
    color: "#3B2F2F",
  },
};

/**
 * Helper to resolve note detail by name or substring
 */
export function getOlfactoryNoteDetail(noteName: string): OlfactoryNoteDetail {
  const cleanName = noteName.trim();

  // Direct match
  if (OLFACTORY_NOTES_REGISTRY[cleanName]) {
    return OLFACTORY_NOTES_REGISTRY[cleanName];
  }

  // Substring match
  const lower = cleanName.toLowerCase();
  for (const [key, detail] of Object.entries(OLFACTORY_NOTES_REGISTRY)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return {
        ...detail,
        name: cleanName,
      };
    }
  }

  // Graceful fallback for any bespoke note
  return {
    name: cleanName,
    family: "Accord Rare de Haute Parfumerie",
    origin: "Sélection d'Exception, Terroirs Méditerranéens & Orientaux",
    extraction: "Distillation artisanale de précision en fûts nobles",
    description: `Matière première sélectionnée par le Maître Nez Lévania pour son éclat unique et sa synergie harmonique au cœur de la fragrance.`,
    holdingTime: "6 à 14 heures de rayonnement",
    resonance: "Harmonie Lévania Exclusive",
    color: "#C7A66A",
  };
}
