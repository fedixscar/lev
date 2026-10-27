// Seasonal and festive event management system for Levania Parfums

export type VisualEffectType = "snow" | "petals" | "stardust" | "none";
export type EffectIntensity = "subtle" | "medium" | "festive";

export interface SeasonalEvent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  badgeText: string;
  themeColor: string; // Hex color for accents
  visualEffect: VisualEffectType;
  effectIntensity: EffectIntensity;
  isActive: boolean;
  promoCode?: string; // Linked coupon code, e.g. "NOEL2026"
  discountHighlight?: string; // Short badge label, e.g. "-20% immédiat"
  showTopBanner: boolean;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  featuredProductIds?: string[];
}

const STORAGE_KEY = "levania_seasonal_events";
export const EVENTS_UPDATED_EVENT = "levania_events_updated";

export const DEFAULT_EVENTS: SeasonalEvent[] = [
  {
    id: "event-fin-annee",
    slug: "fin-annee-2026",
    title: "Féérie de Fin d'Année & Célébration 2026",
    tagline: "L'élégance givrée des grands soirs d'hiver",
    description: "Célébrez les fêtes de fin d'année avec les créations exclusives Levania. Profitez de remises rares et d'un coffret offert dès 300 TND d'achat.",
    badgeText: "Hiver Féerique",
    themeColor: "#93C5FD", // Ice blue
    visualEffect: "snow",
    effectIntensity: "festive",
    isActive: true, // Default active as requested
    promoCode: "NOEL2026",
    discountHighlight: "-20% avec le code NOEL2026",
    showTopBanner: true,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    featuredProductIds: ["1", "4", "7"],
  },
  {
    id: "event-printemps-jasmin",
    slug: "printemps-jasmin",
    title: "Printemps du Jasmin & Fleurs Blanches",
    tagline: "L'éveil floral et la fraîcheur printanière de Carthage",
    description: "Une explosion de senteurs solaires, néroli et jasmin sambac pour fêter l'arrivée des beaux jours.",
    badgeText: "Saison Florale",
    themeColor: "#F472B6", // Soft floral pink
    visualEffect: "petals",
    effectIntensity: "medium",
    isActive: false,
    promoCode: "JASMIN15",
    discountHighlight: "-15% sur les floraux",
    showTopBanner: true,
    startDate: null,
    endDate: null,
    createdAt: new Date().toISOString(),
    featuredProductIds: ["2", "5"],
  },
  {
    id: "event-nuits-orient",
    slug: "nuits-orient",
    title: "Nuits d'Orient & Prestige de l'Aïd",
    tagline: "Oud impérial, ambre gris et poussière d'étoiles",
    description: "Rendez hommage à la richesse des effluves orientaux avec notre sélection de grands extraits et de coffrets cadeaux dorés à la feuille d'or.",
    badgeText: "Prestige Impérial",
    themeColor: "#C7A66A", // Warm gold
    visualEffect: "stardust",
    effectIntensity: "festive",
    isActive: false,
    promoCode: "ORIENT25",
    discountHighlight: "-25% Prestige",
    showTopBanner: true,
    startDate: null,
    endDate: null,
    createdAt: new Date().toISOString(),
    featuredProductIds: ["3", "6"],
  },
];

/**
 * Get all configured seasonal events
 */
export function getAllEvents(): SeasonalEvent[] {
  if (typeof window === "undefined") {
    return DEFAULT_EVENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to read seasonal events from storage", err);
    return DEFAULT_EVENTS;
  }
}

/**
 * Get the currently active event (if any). Only one event is active at a time.
 */
export function getActiveEvent(): SeasonalEvent | null {
  const events = getAllEvents();
  return events.find((e) => e.isActive) || null;
}

/**
 * Save or update a seasonal event
 */
export function saveEvent(event: SeasonalEvent): SeasonalEvent {
  const events = getAllEvents();
  const index = events.findIndex((e) => e.id === event.id);

  let updatedList: SeasonalEvent[];
  if (index >= 0) {
    // If setting this one to active, optionally deactivate other events so effects don't collide
    if (event.isActive) {
      updatedList = events.map((e) => (e.id === event.id ? event : { ...e, isActive: false }));
    } else {
      updatedList = [...events];
      updatedList[index] = event;
    }
  } else {
    if (event.isActive) {
      updatedList = events.map((e) => ({ ...e, isActive: false }));
      updatedList.unshift(event);
    } else {
      updatedList = [event, ...events];
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent(EVENTS_UPDATED_EVENT, { detail: event }));
  }

  return event;
}

/**
 * Toggle event active state
 */
export function toggleEventActive(id: string): SeasonalEvent | null {
  const events = getAllEvents();
  const target = events.find((e) => e.id === id);
  if (!target) return null;

  const nextState = !target.isActive;
  let updatedList: SeasonalEvent[];

  if (nextState) {
    // Deactivate other events to ensure single active theme
    updatedList = events.map((e) => (e.id === id ? { ...e, isActive: true } : { ...e, isActive: false }));
  } else {
    updatedList = events.map((e) => (e.id === id ? { ...e, isActive: false } : e));
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent(EVENTS_UPDATED_EVENT));
  }

  return updatedList.find((e) => e.id === id) || null;
}

/**
 * Delete an event
 */
export function deleteEvent(id: string): void {
  const events = getAllEvents().filter((e) => e.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new CustomEvent(EVENTS_UPDATED_EVENT));
  }
}

/**
 * Reset events to default presets
 */
export function resetEventsToDefault(): SeasonalEvent[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
    window.dispatchEvent(new CustomEvent(EVENTS_UPDATED_EVENT));
  }
  return DEFAULT_EVENTS;
}
