"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type Season = "none" | "winter" | "spring" | "summer" | "autumn";

interface SeasonalContextType {
  season: Season;
  setSeason: (season: Season) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const SeasonalContext = createContext<SeasonalContextType>({
  season: "autumn",
  setSeason: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
});

export const useSeasonal = () => useContext(SeasonalContext);

export function SeasonalProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>("autumn");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <SeasonalContext.Provider value={{ season, setSeason, reducedMotion, setReducedMotion }}>
      {children}
      {!reducedMotion && season !== "none" && <SeasonalAtmosphereLayer season={season} />}
    </SeasonalContext.Provider>
  );
}

function SeasonalAtmosphereLayer({ season }: { season: Season }) {
  if (season === "none") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    >
      {season === "winter" && (
        <div className="absolute inset-0">
          {/* Subtle slow winter crystalline particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                animationDuration: `${7 + (i % 5)}s`,
                animationDelay: `${i * 0.6}s`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      )}

      {season === "spring" && (
        <div className="absolute inset-0">
          {/* Soft rose & neroli floral petals */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-1.5 rounded-full bg-[#E9DFCE]/40 animate-float"
              style={{
                top: `${(i * 19) % 100}%`,
                left: `${(i * 29) % 100}%`,
                animationDuration: `${8 + (i % 6)}s`,
                animationDelay: `${i * 0.8}s`,
                transform: `rotate(${i * 35}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {season === "summer" && (
        <div className="absolute inset-0">
          {/* Golden sunlit warm caustic speckles */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#C7A66A]/30 animate-pulse-glow"
              style={{
                top: `${(i * 21) % 100}%`,
                left: `${(i * 31) % 100}%`,
                animationDuration: `${5 + (i % 4)}s`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {season === "autumn" && (
        <div className="absolute inset-0">
          {/* Warm amber & burgundy drifting leaf embers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute rounded-full animate-float",
                i % 2 === 0 ? "w-2 h-1 bg-[#C7A66A]/30" : "w-1.5 h-1.5 bg-[#542B32]/30"
              )}
              style={{
                top: `${(i * 15) % 100}%`,
                left: `${(i * 27) % 100}%`,
                animationDuration: `${9 + (i % 5)}s`,
                animationDelay: `${i * 0.7}s`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
