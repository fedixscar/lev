"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PerfumeAtmosphere, ProductVideoConfig } from "@/types";
import { getAtmosphereConfig, getProductEffectiveVideo } from "@/lib/atmosphere";
import { Sparkles, Eye, Volume2, VolumeX } from "lucide-react";

interface CinematicAtmosphereBackgroundProps {
  atmosphere?: PerfumeAtmosphere;
  videoUrl?: string;
  videoConfig?: ProductVideoConfig;
  posterImage?: string;
  productName?: string;
  enableScrollParallax?: boolean;
}

export function CinematicAtmosphereBackground({
  atmosphere = "LUXE",
  videoUrl,
  videoConfig,
  posterImage,
  productName,
  enableScrollParallax = true,
}: CinematicAtmosphereBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const resolved = getProductEffectiveVideo({
    atmosphere,
    videoUrl,
    videoConfig,
  });

  const config = resolved.config;
  const overlayDarkness = videoConfig?.overlayDarkness ?? 0.6;
  const videoOpacity = videoConfig?.opacity ?? 1.0;
  const effectivePoster = posterImage || config.defaultPosterUrl;

  // Try playing video smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoError(false);
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked by browser policy, keep fallback canvas/poster
      console.log("Video autoplay prevented by browser; fallback active.");
    });
  }, [resolved.videoUrl]);

  // Atmospheric Canvas Particle / Ambiance Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle state according to atmosphere
    const style = config.animationStyle;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      life?: number;
    }

    const particles: Particle[] = [];
    const count = style === "stardust" ? 65 : style === "sensual" ? 35 : style === "storm" ? 90 : 25;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          style === "sensual"
            ? 6 + Math.random() * 8 // Rose petals
            : style === "stardust"
            ? 1.5 + Math.random() * 3.5 // Golden dust
            : style === "storm"
            ? 1 + Math.random() * 2.5 // Rain/spray
            : 1 + Math.random() * 2,
        speedX:
          style === "storm"
            ? 1.5 + Math.random() * 3
            : style === "sensual"
            ? -1 + Math.random() * 2
            : (Math.random() - 0.5) * 0.8,
        speedY:
          style === "storm"
            ? 8 + Math.random() * 12 // Fast rain
            : style === "stardust"
            ? -(0.3 + Math.random() * 0.8) // Rising gold dust
            : style === "sensual"
            ? 0.5 + Math.random() * 1.5 // Floating petals down
            : 0.2 + Math.random() * 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color:
          style === "stardust"
            ? Math.random() > 0.4
              ? "#DFC68B"
              : "#FDE68A"
            : style === "sensual"
            ? Math.random() > 0.5
              ? "#E11D48"
              : "#FB7185"
            : style === "storm"
            ? "#38BDF8"
            : "#E2E8F0",
      });
    }

    // Lightning state for SAUVAGE
    let lightningOpacity = 0;
    let nextLightning = Date.now() + 3000 + Math.random() * 5000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // SAUVAGE: Trigger lightning flash
      if (style === "storm") {
        const now = Date.now();
        if (now > nextLightning) {
          lightningOpacity = 0.45;
          nextLightning = now + 4000 + Math.random() * 6000;
        }
        if (lightningOpacity > 0) {
          ctx.fillStyle = `rgba(186, 230, 253, ${lightningOpacity})`;
          ctx.fillRect(0, 0, width, height);
          lightningOpacity -= 0.04;
        }
      }

      // CLASS: Soft architectural light sweep
      if (style === "architectural") {
        const time = Date.now() * 0.0003;
        const grad = ctx.createLinearGradient(0, 0, width, height);
        const shift = Math.sin(time) * 0.15;
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(Math.min(1, Math.max(0, 0.4 + shift)), "rgba(226, 232, 240, 0.04)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render Particles
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (style === "sensual") {
          // Draw organic rose petal shape
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (style === "stardust") {
          // Draw sparkling star/circle
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (style === "storm") {
          // Draw slanted rain streak
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.6;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-p.speedX * 2, -p.speedY * 1.5);
          ctx.stroke();
        } else {
          // Elegant white dust
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.animationStyle]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      style={{ backgroundColor: config.palette.background }}
    >
      {/* 1. Static Poster Background (instant fallback) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={effectivePoster}
          alt={productName || "Ambiance Lévania"}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 filter blur-[2px] transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 0.3 : 0.85 }}
        />
      </div>

      {/* 2. Full Viewport HTML5 Video Background */}
      {resolved.videoUrl && !videoError && (
        <video
          ref={videoRef}
          src={resolved.videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            console.warn("Video stream unreachable, graceful canvas fallback active.");
            setVideoError(true);
          }}
          className={`absolute inset-0 w-full h-full object-${
            videoConfig?.displayMode === "contain" ? "contain" : "cover"
          } transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            opacity: videoLoaded ? videoOpacity : 0,
            objectPosition: videoConfig?.positioning || "center",
          }}
        />
      )}

      {/* 3. Luxury Vignette & Darkening Overlay */}
      <div
        className="absolute inset-0 w-full h-full transition-colors duration-700 pointer-events-none"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayDarkness})`,
          backgroundImage: `
            radial-gradient(circle at 50% 35%, transparent 15%, rgba(0, 0, 0, 0.75) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.85) 90%, ${config.palette.background} 100%)
          `,
        }}
      />

      {/* 4. Atmosphere-Specific Dynamic Canvas (lightning, stardust, petals) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 5. Luxury Atmosphere Watermark Badge */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 pointer-events-auto">
        {resolved.videoUrl && !videoError && (
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Activer le son d'ambiance" : "Couper le son"}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        )}

        <div className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-xl">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: config.palette.primary }}
          />
          <span className="font-cinzel text-[10px] tracking-luxury uppercase text-white/90 font-bold">
            Atmosphère {config.name}
          </span>
        </div>
      </div>
    </div>
  );
}
