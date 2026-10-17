"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LevaniaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "emblem-only" | "wordmark-only";
  href?: string;
}

export function LevaniaLogo({
  className,
  size = "md",
  variant = "full",
  href = "/",
}: LevaniaLogoProps) {
  const sizeMap = {
    sm: { emblem: 32, text: "text-lg", sub: "text-[9px] tracking-[0.3em]" },
    md: { emblem: 44, text: "text-2xl", sub: "text-[10px] tracking-[0.35em]" },
    lg: { emblem: 64, text: "text-3xl", sub: "text-xs tracking-[0.4em]" },
    xl: { emblem: 96, text: "text-5xl", sub: "text-sm tracking-[0.45em]" },
  };

  const config = sizeMap[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 group transition-transform duration-300", className)}>
      {variant !== "wordmark-only" && (
        <div
          className="relative rounded-full overflow-hidden border border-[#C7A66A]/30 p-0.5 shadow-md shadow-black/40 group-hover:border-[#C7A66A] group-hover:shadow-[0_0_15px_rgba(199,166,106,0.3)] transition-all duration-300 bg-[#20271E]"
          style={{ width: config.emblem, height: config.emblem }}
        >
          <Image
            src="/brand/logo-emblem.jpg"
            alt="Lévania Parfums Sceau"
            width={config.emblem}
            height={config.emblem}
            className="w-full h-full object-cover rounded-full"
            priority={size === "lg" || size === "xl"}
          />
        </div>
      )}

      {variant !== "emblem-only" && (
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "font-serif font-light text-gold-gradient leading-tight tracking-[0.18em] uppercase group-hover:brightness-110 transition-all",
              config.text
            )}
          >
            LÉVANIA
          </span>
          <span
            className={cn(
              "font-sans font-medium text-[#C7A66A] opacity-90 uppercase mt-0.5",
              config.sub
            )}
          >
            PARFUMS
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66A]">
        {content}
      </Link>
    );
  }

  return content;
}
