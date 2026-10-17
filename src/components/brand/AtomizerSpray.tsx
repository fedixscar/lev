"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Wind } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

interface AtomizerSprayProps {
  productName: string;
  onSpray?: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  maxLife: number;
  life: number;
}

export function AtomizerSpray({ productName, onSpray, className = "" }: AtomizerSprayProps) {
  const [isSpraying, setIsSpraying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const { showToast } = useNotification();

  // Play a soft synthetic aerosol mist sound using native Web Audio API
  const playMistSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const bufferSize = Math.floor(ctx.sampleRate * 0.4);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Generate shaped white noise
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 3.5);
        output[i] = (Math.random() * 2 - 1) * envelope;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter centered around 3400Hz for a delicate luxury spray hiss
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3400, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // Audio is optional, proceed silently if blocked
    }
  }, []);

  const triggerSpray = () => {
    if (isSpraying) return;
    setIsSpraying(true);
    playMistSound();

    if (onSpray) onSpray();

    showToast(
      "Élixir Vaporisé",
      `Sillage de ${productName} libéré • Rayonnement 2.5m & tenue active 14h`,
      "luxury"
    );

    // Initialize particle burst
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const originX = rect.width / 2;
      const originY = rect.height * 0.45; // Atomizer nozzle level

      const colors = ["#DFC68B", "#C7A66A", "#FAF7F2", "#541B28", "#E8C872"];
      const newParticles: Particle[] = [];

      for (let i = 0; i < 65; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4; // upward cone
        const speed = 2.5 + Math.random() * 5.5;
        const maxLife = 50 + Math.random() * 45;

        newParticles.push({
          x: originX + (Math.random() - 0.5) * 12,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.2 + Math.random() * 2.8,
          alpha: 0.95,
          color: colors[Math.floor(Math.random() * colors.length)],
          maxLife,
          life: 0,
        });
      }
      particlesRef.current = newParticles;
    }

    setTimeout(() => {
      setIsSpraying(false);
    }, 1800);
  };

  // Particle loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;

    const render = () => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      if (particles.length > 0) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          // Gentle air resistance & micro gravity
          p.vx *= 0.97;
          p.vy = p.vy * 0.97 + 0.04;

          const progress = p.life / p.maxLife;
          p.alpha = Math.max(0, 1 - progress);

          if (p.life >= p.maxLife || p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          // Draw droplet with soft glow
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 400;
        canvas.height = canvas.parentElement?.clientHeight || 500;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Overlay Canvas for Mist Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* Luxury Vaporizer Trigger Button */}
      <button
        type="button"
        onClick={triggerSpray}
        disabled={isSpraying}
        aria-label="Vaporiser l'élixir pour révéler le sillage"
        className={`group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg select-none ${
          isSpraying
            ? "bg-[#541B28] border-[#DFC68B] text-[#DFC68B] scale-95 shadow-[#541B28]/40"
            : "bg-white/95 hover:bg-white border-[#541B28]/25 text-[#541B28] hover:scale-105 hover:border-[#541B28] hover:shadow-xl"
        }`}
      >
        {isSpraying ? (
          <Wind className="w-4 h-4 text-[#DFC68B] animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 text-[#C7A66A] group-hover:rotate-12 transition-transform" />
        )}

        <span className="text-xs uppercase tracking-widest font-bold">
          {isSpraying ? "Vaporisation en cours..." : "Vaporiser l'Élixir"}
        </span>

        <span className="w-2 h-2 rounded-full bg-[#C7A66A] animate-ping" />
      </button>
    </div>
  );
}
