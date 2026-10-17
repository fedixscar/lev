"use client";

import React, { useEffect, useRef, useState } from "react";
import { WaveCanvas, WaveExpression } from "./WaveCanvas";
import { cn } from "@/lib/utils";

interface AmbientWaveBackdropProps {
  expression: WaveExpression;
  className?: string;
  opacity?: number;
}

export function AmbientWaveBackdrop({
  expression,
  className,
  opacity = 0.28,
}: AmbientWaveBackdropProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ambient lighting palette per wave expression
  const ambientGlows = {
    signature: {
      glowTop: "bg-[#C7A66A]/14",
      glowMid: "bg-[#434B36]/10",
      glowBottom: "bg-[#541B28]/8",
    },
    soft: {
      glowTop: "bg-[#FAF7F2]/60",
      glowMid: "bg-[#D8A8B0]/18",
      glowBottom: "bg-[#C7A66A]/12",
    },
    intense: {
      glowTop: "bg-[#541B28]/18",
      glowMid: "bg-[#3B121C]/14",
      glowBottom: "bg-[#C7A66A]/12",
    },
  };

  const glows = ambientGlows[expression] || ambientGlows.signature;

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-opacity duration-1000",
        className
      )}
      style={{ opacity }}
    >
      {/* Dynamic Radial Ambient Lighting Halos */}
      <div
        className={cn(
          "absolute -top-24 left-1/4 w-[650px] h-[650px] rounded-full blur-[160px] transition-colors duration-1000",
          glows.glowTop
        )}
      />
      <div
        className={cn(
          "absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full blur-[140px] transition-colors duration-1000",
          glows.glowMid
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[160px] transition-colors duration-1000",
          glows.glowBottom
        )}
      />

      {/* Primary Atmospheric Wave Canvas Spanning Upper Viewport */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] opacity-80">
        <WaveCanvas
          expression={expression}
          speedMultiplier={0.8}
          amplitudeMultiplier={1.1}
          showParticles={true}
          interactive={false}
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Secondary Counter-Harmonic Wave Canvas Spanning Mid-to-Bottom Viewport */}
      <div className="absolute bottom-0 left-0 right-0 h-[55vh] opacity-70 transform rotate-180">
        <WaveCanvas
          expression={expression}
          speedMultiplier={0.65}
          amplitudeMultiplier={0.9}
          showParticles={false}
          interactive={false}
          height="100%"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
