"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type WaveExpression = "signature" | "soft" | "intense";

interface WaveCanvasProps {
  expression?: WaveExpression;
  interactive?: boolean;
  speedMultiplier?: number;
  amplitudeMultiplier?: number;
  showParticles?: boolean;
  height?: number | string;
  className?: string;
  onWaveClick?: () => void;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
  color: string;
}

export function WaveCanvas({
  expression = "signature",
  interactive = true,
  speedMultiplier = 1,
  amplitudeMultiplier = 1,
  showParticles = true,
  height = 240,
  className,
  onWaveClick,
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Pointer interaction state (ripples)
  const pointerRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: boolean;
    rippleIntensity: number;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
    rippleIntensity: 0,
  });

  const particlesRef = useRef<Particle[]>([]);

  // Expression color definitions matching the official brand palette
  const getPalette = useCallback((expr: WaveExpression) => {
    switch (expr) {
      case "soft":
        return {
          // Soft Wave: Ivory, Cream, Champagne, delicate Muted Rose
          primaryStart: "rgba(234, 225, 210, 0.85)",   // Sand / Ivory
          primaryMid: "rgba(199, 166, 106, 0.45)",     // Champagne Gold
          primaryEnd: "rgba(216, 168, 176, 0.75)",     // Muted Rosewater
          counterStart: "rgba(250, 247, 242, 0.6)",    // Pure Ivory
          counterEnd: "rgba(223, 198, 139, 0.35)",     // Soft Champagne
          crestHighlight: "rgba(255, 255, 255, 0.9)",
          crestGlow: "rgba(199, 166, 106, 0.4)",
          particleColors: ["#C7A66A", "#DFC68B", "#FFFFFF", "#EAE1D2"],
          particleGlow: "rgba(199, 166, 106, 0.3)",
          baseSpeed: 0.008,
          baseAmplitude: 24,
        };
      case "intense":
        return {
          // Intense Wave: Dark Midnight Burgundy, Deep Forest Olive, Metallic Gold
          primaryStart: "rgba(59, 18, 28, 0.95)",      // Dark Velvet Wine
          primaryMid: "rgba(84, 27, 40, 0.85)",        // Imperial Burgundy
          primaryEnd: "rgba(158, 125, 66, 0.7)",       // Metallic Gold
          counterStart: "rgba(35, 24, 26, 0.85)",      // Dark Charcoal
          counterEnd: "rgba(67, 75, 54, 0.5)",         // Deep Olive
          crestHighlight: "rgba(223, 198, 139, 0.95)",
          crestGlow: "rgba(199, 166, 106, 0.5)",
          particleColors: ["#DFC68B", "#9E7D42", "#C7A66A", "#7A263B"],
          particleGlow: "rgba(158, 125, 66, 0.4)",
          baseSpeed: 0.016,
          baseAmplitude: 38,
        };
      case "signature":
      default:
        return {
          // Signature Wave: Olive Green, Champagne Gold, Imperial Burgundy
          primaryStart: "rgba(84, 27, 40, 0.9)",       // Imperial Burgundy
          primaryMid: "rgba(199, 166, 106, 0.65)",     // Champagne Gold
          primaryEnd: "rgba(67, 75, 54, 0.75)",        // Noble Olive
          counterStart: "rgba(133, 37, 56, 0.7)",      // Wine
          counterEnd: "rgba(199, 166, 106, 0.4)",      // Gold
          crestHighlight: "rgba(243, 236, 225, 0.95)", // Pale Gold Shimmer
          crestGlow: "rgba(199, 166, 106, 0.45)",
          particleColors: ["#C7A66A", "#DFC68B", "#FAF7F2", "#852538"],
          particleGlow: "rgba(199, 166, 106, 0.35)",
          baseSpeed: 0.012,
          baseAmplitude: 30,
        };
    }
  }, []);

  // Initialize olfactory particles
  const initParticles = useCallback(
    (width: number, height: number, expr: WaveExpression) => {
      const palette = getPalette(expr);
      const count = expr === "intense" ? 28 : expr === "soft" ? 18 : 22;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 2.2,
          speedY: 0.2 + Math.random() * 0.4,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: 0.2 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          color: palette.particleColors[Math.floor(Math.random() * palette.particleColors.length)],
        });
      }
      particlesRef.current = particles;
    },
    [getPalette]
  );

  // Pointer event listeners
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current.targetX = e.clientX - rect.left;
    pointerRef.current.targetY = e.clientY - rect.top;
    pointerRef.current.active = true;
    pointerRef.current.rippleIntensity = Math.min(pointerRef.current.rippleIntensity + 0.15, 1.2);
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    pointerRef.current.x = clickX;
    pointerRef.current.y = clickY;
    pointerRef.current.rippleIntensity = 2.5; // Strong splash ripple

    // Atomizer burst effect: 14 radiant micro-droplets on click
    const palette = getPalette(expression);
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
      const speed = 1.0 + Math.random() * 2.2;
      particlesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 1.2 + Math.random() * 2.0,
        speedY: Math.abs(Math.sin(angle)) * speed + 0.6,
        speedX: Math.cos(angle) * speed,
        opacity: 0.95,
        phase: Math.random() * Math.PI * 2,
        color: palette.particleColors[Math.floor(Math.random() * palette.particleColors.length)],
      });
    }

    if (particlesRef.current.length > 70) {
      particlesRef.current = particlesRef.current.slice(-50);
    }

    if (onWaveClick) onWaveClick();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight || 240);
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight || 240;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles(width, height, expression);
    };

    resize();
    window.addEventListener("resize", resize);

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const palette = getPalette(expression);

      time += palette.baseSpeed * speedMultiplier;

      // Pointer smoothing
      const p = pointerRef.current;
      p.x += (p.targetX - p.x) * 0.08;
      p.y += (p.targetY - p.y) * 0.08;
      p.rippleIntensity *= 0.95; // Gentle exponential damping

      const baseY = height * 0.62;
      const amp = palette.baseAmplitude * amplitudeMultiplier;

      // ==========================================
      // 1. LAYER 1: Deep Volumetric Counter-Wave
      // ==========================================
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, baseY);

      for (let x = 0; x <= width; x += 6) {
        const distFromPointer = Math.abs(x - p.x);
        const ripple =
          p.rippleIntensity *
          Math.sin(distFromPointer * 0.04 - time * 3) *
          Math.exp(-distFromPointer * 0.008) *
          25;

        const y =
          baseY +
          Math.sin(x * 0.0035 + time * 0.8) * amp * 0.75 +
          Math.cos(x * 0.007 - time * 0.5) * amp * 0.4 +
          ripple * 0.5;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const gradCounter = ctx.createLinearGradient(0, baseY - amp, width, height);
      gradCounter.addColorStop(0, palette.counterStart);
      gradCounter.addColorStop(1, palette.counterEnd);
      ctx.fillStyle = gradCounter;
      ctx.fill();

      // ==========================================
      // 2. LAYER 2: Primary Sculptural Liquid Wave
      // ==========================================
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, baseY);

      const crestPoints: { x: number; y: number }[] = [];

      for (let x = 0; x <= width; x += 4) {
        const distFromPointer = Math.abs(x - p.x);
        const ripple =
          p.rippleIntensity *
          Math.sin(distFromPointer * 0.035 - time * 4) *
          Math.exp(-distFromPointer * 0.006) *
          35;

        // Multi-frequency harmonic wave formulation
        const y =
          baseY +
          Math.sin(x * 0.004 + time) * amp +
          Math.cos(x * 0.008 + time * 1.3) * (amp * 0.5) +
          Math.sin(x * 0.0015 - time * 0.6) * (amp * 0.35) +
          ripple;

        crestPoints.push({ x, y });
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const gradPrimary = ctx.createLinearGradient(0, baseY - amp * 1.5, width, height);
      gradPrimary.addColorStop(0, palette.primaryStart);
      gradPrimary.addColorStop(0.5, palette.primaryMid);
      gradPrimary.addColorStop(1, palette.primaryEnd);
      ctx.fillStyle = gradPrimary;
      ctx.fill();

      // ==========================================
      // 3. LAYER 3: Luminous Crest Specular Line
      // ==========================================
      ctx.beginPath();
      if (crestPoints.length > 0) {
        ctx.moveTo(crestPoints[0].x, crestPoints[0].y);
        for (let i = 1; i < crestPoints.length; i++) {
          ctx.lineTo(crestPoints[i].x, crestPoints[i].y);
        }
      }

      ctx.shadowColor = palette.crestGlow;
      ctx.shadowBlur = expression === "intense" ? 18 : 12;
      ctx.strokeStyle = palette.crestHighlight;
      ctx.lineWidth = expression === "intense" ? 2.5 : 1.8;
      ctx.stroke();

      // Sweeping Champagne Caustic Shimmer along the wave
      const beamX = ((time * 75) % (width * 1.5)) - width * 0.25;
      const beamGrad = ctx.createRadialGradient(beamX, baseY, 2, beamX, baseY, 140);
      beamGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      beamGrad.addColorStop(0.4, "rgba(223, 198, 139, 0.18)");
      beamGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);

      // Reset shadow for subsequent draw calls
      ctx.shadowBlur = 0;

      // ==========================================
      // 4. LAYER 4: Floating Olfactory Particles
      // ==========================================
      if (showParticles && particlesRef.current.length > 0) {
        particlesRef.current.forEach((particle) => {
          // Update position
          particle.y -= particle.speedY;
          particle.x += Math.sin(time + particle.phase) * particle.speedX;

          // Recycle particle when it floats off the top
          if (particle.y < 0) {
            particle.y = height + 10;
            particle.x = Math.random() * width;
          }

          // Draw shimmering particle
          const pulse = 0.7 + 0.3 * Math.sin(time * 3 + particle.phase);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * pulse;
          ctx.shadowColor = palette.particleGlow;
          ctx.shadowBlur = 8;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [expression, interactive, speedMultiplier, amplitudeMultiplier, showParticles, getPalette, initParticles]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={cn(
        "relative w-full overflow-hidden select-none cursor-pointer group",
        className
      )}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Interactive prompt hint when hovered */}
      {interactive && (
        <div className="absolute top-3 right-4 opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase font-serif text-[#FAF7F2] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C7A66A]/30">
            Onde Interactive &bull; Survolez ou Touchez
          </span>
        </div>
      )}
    </div>
  );
}
