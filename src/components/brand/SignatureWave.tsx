"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SignatureWaveProps {
  expression?: "signature" | "soft" | "intense";
  className?: string;
  intensity?: "gentle" | "normal" | "dramatic";
  showParticles?: boolean;
}

export function SignatureWave({
  expression = "signature",
  className,
  intensity = "normal",
  showParticles = true,
}: SignatureWaveProps) {
  const waveId = useId().replace(/:/g, "");

  // Palettes per expression
  const palettes = {
    signature: {
      gradientStart: "#343B2B", // Deep Olive
      gradientMid: "#C7A66A",   // Champagne Gold
      gradientEnd: "#542B32",   // Burgundy
      glow: "rgba(199, 166, 106, 0.25)",
      particles: "#C7A66A",
    },
    soft: {
      gradientStart: "#E9DFCE", // Cream
      gradientMid: "#F6F1E8",   // Warm Ivory
      gradientEnd: "#D8A8B0",   // Muted Rose
      glow: "rgba(246, 241, 232, 0.35)",
      particles: "#F6F1E8",
    },
    intense: {
      gradientStart: "#171715", // Charcoal / Black
      gradientMid: "#20271E",   // Dark Forest
      gradientEnd: "#9E7D42",   // Metallic Gold
      glow: "rgba(84, 43, 50, 0.35)",
      particles: "#C7A66A",
    },
  };

  const current = palettes[expression];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden pointer-events-none select-none transition-colors duration-1000",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full min-w-[800px]"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wave-grad-1-${waveId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={current.gradientStart} stopOpacity="0.85" />
            <stop offset="50%" stopColor={current.gradientMid} stopOpacity="0.4" />
            <stop offset="100%" stopColor={current.gradientEnd} stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id={`wave-grad-2-${waveId}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={current.gradientMid} stopOpacity="0.6" />
            <stop offset="60%" stopColor={current.gradientStart} stopOpacity="0.25" />
            <stop offset="100%" stopColor={current.gradientEnd} stopOpacity="0.5" />
          </linearGradient>

          <filter id={`wave-glow-${waveId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Ambient Wave */}
        <path
          d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,144C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill={`url(#wave-grad-1-${waveId})`}
          className="animate-wave-flow opacity-80"
        />

        {/* Secondary Counter Wave */}
        <path
          d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          fill={`url(#wave-grad-2-${waveId})`}
          className="animate-wave-flow-reverse opacity-60"
        />

        {/* Luminous crest highlight line */}
        <path
          d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,144C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224"
          stroke={current.gradientMid}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
          filter={`url(#wave-glow-${waveId})`}
          className="animate-wave-flow"
        />
      </svg>

      {/* Subtle floating olfactory particles */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full animate-float opacity-50"
            style={{ backgroundColor: current.particles, boxShadow: `0 0 10px ${current.glow}` }}
          />
          <div
            className="absolute top-1/2 left-3/5 w-2 h-2 rounded-full animate-float opacity-40 delay-1000"
            style={{ backgroundColor: current.particles, boxShadow: `0 0 12px ${current.glow}` }}
          />
          <div
            className="absolute top-2/3 left-4/5 w-1 h-1 rounded-full animate-float opacity-60 delay-700"
            style={{ backgroundColor: current.particles, boxShadow: `0 0 8px ${current.glow}` }}
          />
        </div>
      )}
    </div>
  );
}
