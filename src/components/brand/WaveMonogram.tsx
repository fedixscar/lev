"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WaveMonogramProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "burgundy" | "ivory" | "olive";
  withSeal?: boolean;
  animated?: boolean;
  className?: string;
}

export function WaveMonogram({
  size = "md",
  variant = "gold",
  withSeal = false,
  animated = false,
  className,
}: WaveMonogramProps) {
  const sizeMap = {
    xs: { box: 20, stroke: 1.6 },
    sm: { box: 28, stroke: 1.8 },
    md: { box: 40, stroke: 2.2 },
    lg: { box: 56, stroke: 2.6 },
    xl: { box: 80, stroke: 3.2 },
  };

  const { box, stroke } = sizeMap[size];

  const colors = {
    gold: {
      primary: "#C7A66A",
      secondary: "#DFC68B",
      tertiary: "#9E7D42",
      bg: "bg-[#541B28]",
      border: "border-[#C7A66A]/40",
    },
    burgundy: {
      primary: "#541B28",
      secondary: "#7A263B",
      tertiary: "#3B121C",
      bg: "bg-[#FAF7F2]",
      border: "border-[#541B28]/25",
    },
    ivory: {
      primary: "#FAF7F2",
      secondary: "#DFC68B",
      tertiary: "#EAE1D2",
      bg: "bg-[#3B121C]",
      border: "border-[#C7A66A]/30",
    },
    olive: {
      primary: "#434B36",
      secondary: "#C7A66A",
      tertiary: "#2B3123",
      bg: "bg-[#FAF7F2]",
      border: "border-[#434B36]/30",
    },
  }[variant];

  const content = (
    <svg
      width={box}
      height={box}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animated && "hover:scale-105 transition-transform duration-500")}
    >
      <defs>
        <linearGradient id={`wave-monogram-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.secondary} />
          <stop offset="50%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.tertiary} />
        </linearGradient>

        <filter id={`wave-monogram-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Signature 2D Minimal Wave Curve */}
      {/* Primary S-curve representing the fragrance diffusion wave */}
      <path
        d="M15,62 C28,62 34,36 50,36 C66,36 72,64 85,64"
        stroke={`url(#wave-monogram-grad-${variant})`}
        strokeWidth={stroke * 2.2}
        strokeLinecap="round"
        fill="none"
        filter={`url(#wave-monogram-glow-${variant})`}
      />

      {/* Harmonic Secondary Echo Line */}
      <path
        d="M20,68 C32,68 38,44 50,44 C62,44 68,69 80,69"
        stroke={`url(#wave-monogram-grad-${variant})`}
        strokeWidth={stroke * 1.2}
        strokeLinecap="round"
        strokeOpacity="0.55"
        fill="none"
      />

      {/* Micro-pearl droplets representing the perfume essence */}
      <circle cx="50" cy="24" r="2.5" fill={colors.secondary} opacity="0.9" />
      <circle cx="86" cy="55" r="1.8" fill={colors.primary} opacity="0.75" />
      <circle cx="14" cy="53" r="1.5" fill={colors.secondary} opacity="0.6" />
    </svg>
  );

  if (withSeal) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center p-2.5 shadow-md border transition-all",
          colors.bg,
          colors.border,
          className
        )}
      >
        {content}
      </div>
    );
  }

  return <div className={cn("inline-flex items-center justify-center", className)}>{content}</div>;
}
