"use client";

import React from "react";
import { WaveCanvas, WaveExpression } from "./WaveCanvas";
import { cn } from "@/lib/utils";

export interface SignatureWaveProps {
  expression?: WaveExpression;
  className?: string;
  intensity?: "gentle" | "normal" | "dramatic";
  showParticles?: boolean;
  interactive?: boolean;
  height?: number | string;
}

export function SignatureWave({
  expression = "signature",
  className,
  intensity = "normal",
  showParticles = true,
  interactive = true,
  height = "100%",
}: SignatureWaveProps) {
  // Intensity multipliers for amplitude and flow speed
  const intensityMap = {
    gentle: { speed: 0.7, amp: 0.65 },
    normal: { speed: 1.0, amp: 1.0 },
    dramatic: { speed: 1.45, amp: 1.35 },
  };

  const { speed, amp } = intensityMap[intensity];

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <WaveCanvas
        expression={expression}
        speedMultiplier={speed}
        amplitudeMultiplier={amp}
        showParticles={showParticles}
        interactive={interactive}
        height={height}
        className="w-full h-full"
      />
    </div>
  );
}
