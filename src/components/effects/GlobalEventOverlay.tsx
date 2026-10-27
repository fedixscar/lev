"use client";

import React, { useEffect, useRef, useState } from "react";
import { getActiveEvent, SeasonalEvent, EVENTS_UPDATED_EVENT } from "@/lib/events";
import { useCart } from "@/context/CartContext";
import { Sparkles, X, Copy, Check, Gift } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
  rotation?: number;
  rotationSpeed?: number;
  color?: string;
}

export function GlobalEventOverlay() {
  const [activeEvent, setActiveEvent] = useState<SeasonalEvent | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [appliedToast, setAppliedToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const { applyCoupon } = useCart();

  // Load and listen to active event changes
  useEffect(() => {
    const updateEvent = () => {
      const ev = getActiveEvent();
      setActiveEvent(ev);
    };

    updateEvent();

    const handleCustomUpdate = () => updateEvent();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "levania_seasonal_events") updateEvent();
    };

    window.addEventListener(EVENTS_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(EVENTS_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Canvas particle animation
  useEffect(() => {
    if (!activeEvent || activeEvent.visualEffect === "none") {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle count according to intensity and screen width
    const multiplier =
      activeEvent.effectIntensity === "festive" ? 1.4 : activeEvent.effectIntensity === "subtle" ? 0.6 : 1.0;
    const baseCount = width < 768 ? 40 : 85;
    const particleCount = Math.floor(baseCount * multiplier);

    const particles: Particle[] = [];

    // Initialize particles based on visual effect
    for (let i = 0; i < particleCount; i++) {
      if (activeEvent.visualEffect === "snow") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.8 + 1.2,
          speedY: Math.random() * 1.2 + 0.6,
          speedX: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.7 + 0.3,
          swaySpeed: Math.random() * 0.02 + 0.008,
          swayOffset: Math.random() * Math.PI * 2,
        });
      } else if (activeEvent.visualEffect === "petals") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3.5 + 2.0,
          speedY: Math.random() * 0.9 + 0.4,
          speedX: Math.random() * 0.8 - 0.4,
          opacity: Math.random() * 0.6 + 0.35,
          swaySpeed: Math.random() * 0.025 + 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          color: Math.random() > 0.4 ? "rgba(244, 114, 182, " : "rgba(255, 230, 240, ",
        });
      } else if (activeEvent.visualEffect === "stardust") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          speedY: Math.random() * 0.7 + 0.3,
          speedX: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.8 + 0.2,
          swaySpeed: Math.random() * 0.03 + 0.015,
          swayOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? "rgba(199, 166, 106, " : "rgba(254, 240, 138, ",
        });
      }
    }

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const render = () => {
      if (!isDocumentVisible) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.swayOffset += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.6;

        // Wrap around borders
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;

        // Draw particle based on effect type
        if (activeEvent.visualEffect === "snow") {
          // Delicate glowing snowflake
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 249, 255, ${p.opacity})`;
          ctx.shadowBlur = p.radius > 2.5 ? 6 : 0;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.fill();
        } else if (activeEvent.visualEffect === "petals") {
          // Petal with slight ellipse and rotation
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) {
            p.rotation += p.rotationSpeed || 0.01;
            ctx.rotate(p.rotation);
          }
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color || "rgba(244, 114, 182, "}${p.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(244, 114, 182, 0.4)";
          ctx.fill();
          ctx.restore();
        } else if (activeEvent.visualEffect === "stardust") {
          // Shimmering stardust diamond / star
          ctx.save();
          ctx.translate(p.x, p.y);
          const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.swayOffset * 2));
          ctx.fillStyle = `${p.color || "rgba(199, 166, 106, "}${currentOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(199, 166, 106, 0.9)";

          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 1.3);
          ctx.lineTo(p.radius * 0.4, 0);
          ctx.lineTo(0, p.radius * 1.3);
          ctx.lineTo(-p.radius * 0.4, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeEvent]);

  // Handle banner code copy
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Handle direct apply to cart
  const handleApplyCoupon = (code: string) => {
    const res = applyCoupon(code);
    if (res.valid) {
      setAppliedToast(true);
      setTimeout(() => setAppliedToast(false), 3000);
    }
  };

  if (!activeEvent) return null;

  return (
    <>
      {/* Visual Effect Canvas Overlay (pointer-events-none so it doesn't block clicks) */}
      {activeEvent.visualEffect !== "none" && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[9997] select-none"
        />
      )}

      {/* Seasonal Top Announcement Banner */}
      {activeEvent.showTopBanner && !bannerDismissed && (
        <aside
          role="region"
          aria-label="Annonce événementielle"
          className="relative z-[9998] w-full bg-gradient-to-r from-[#3A101C] via-[#541B28] to-[#2B0B14] text-white border-b border-[#C7A66A]/30 shadow-md backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-2 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            {/* Left badge & title */}
            <div className="flex items-center gap-2.5 flex-1 min-w-[260px]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#C7A66A]/20 text-[#FAF7F2] border border-[#C7A66A]/50">
                {activeEvent.visualEffect === "snow" && <span>❄️</span>}
                {activeEvent.visualEffect === "petals" && <span>🌸</span>}
                {activeEvent.visualEffect === "stardust" && <span>✨</span>}
                {activeEvent.badgeText}
              </span>
              <p className="font-serif font-medium text-white/95 truncate">
                <span className="font-semibold">{activeEvent.title}</span>
                {activeEvent.discountHighlight && (
                  <span className="hidden md:inline text-[#FAF7F2]/80 ml-2">
                    — {activeEvent.discountHighlight}
                  </span>
                )}
              </p>
            </div>

            {/* Right promo code action & dismiss */}
            <div className="flex items-center gap-2">
              {activeEvent.promoCode && (
                <div className="flex items-center gap-1.5 bg-black/30 border border-[#C7A66A]/40 rounded-lg px-2.5 py-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/80 font-mono">
                    Code: <strong className="text-white tracking-widest">{activeEvent.promoCode}</strong>
                  </span>
                  <button
                    onClick={() => handleCopyCode(activeEvent.promoCode!)}
                    title="Copier le code"
                    className="p-1 text-[#FAF7F2] hover:text-white hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleApplyCoupon(activeEvent.promoCode!)}
                    className="ml-1 text-[11px] bg-gradient-to-r from-[#C7A66A] to-[#DFBA73] text-[#23181A] font-semibold px-2 py-0.5 rounded hover:brightness-110 transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Gift className="w-3 h-3" />
                    Appliquer
                  </button>
                </div>
              )}

              <button
                onClick={() => setBannerDismissed(true)}
                title="Fermer le bandeau"
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer la bannière"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Toast feedback when applied */}
          {appliedToast && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#1B1014] text-[#FAF7F2] border border-[#C7A66A]/50 px-4 py-2 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Sparkles className="w-4 h-4 text-[#C7A66A]" />
              <span>Privilège <strong>{activeEvent.promoCode}</strong> activé dans votre panier !</span>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
