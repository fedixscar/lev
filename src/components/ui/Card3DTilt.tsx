"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 10)
  perspective?: number; // Perspective distance in px (default: 1000)
  scale?: number; // Scale on hover (default: 1.02)
  glareOpacity?: number; // Max glare opacity (default: 0.3)
  enableGlare?: boolean;
}

export function Card3DTilt({
  children,
  className,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.015,
  glareOpacity = 0.35,
  enableGlare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const xPercentage = (x / rect.width) * 100;
        const yPercentage = (y / rect.height) * 100;

        // Calculate rotation angles
        const rotateX = ((y / rect.height - 0.5) * -maxTilt).toFixed(2);
        const rotateY = ((x / rect.width - 0.5) * maxTilt).toFixed(2);

        setTransform(
          `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        );

        if (enableGlare) {
          setGlarePosition({
            x: xPercentage,
            y: yPercentage,
            opacity: glareOpacity,
          });
        }
      });
    },
    [maxTilt, perspective, scale, enableGlare, glareOpacity, prefersReducedMotion]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn("relative will-change-transform", className)}
    >
      {children}

      {/* Dynamic Specular Glare Layer */}
      {enableGlare && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(223, 198, 139, 0.38), rgba(255, 255, 255, 0.15) 30%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
