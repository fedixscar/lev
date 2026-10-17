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
    sm: { emblem: 34, text: "text-lg", sub: "text-[9px] tracking-[0.35em]" },
    md: { emblem: 46, text: "text-2xl", sub: "text-[10px] tracking-[0.4em]" },
    lg: { emblem: 68, text: "text-3xl", sub: "text-xs tracking-[0.45em]" },
    xl: { emblem: 104, text: "text-5xl", sub: "text-sm tracking-[0.5em]" },
  };

  const config = sizeMap[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3.5 group transition-transform duration-300", className)}>
      {variant !== "wordmark-only" && (
        <div
          className="relative rounded-full overflow-hidden border border-[#541B28]/20 p-0.5 shadow-sm shadow-[#541B28]/10 group-hover:border-[#541B28] group-hover:shadow-[0_0_15px_rgba(84,27,40,0.15)] transition-all duration-300 bg-white"
          style={{ width: config.emblem, height: config.emblem }}
        >
          <Image
            src="/brand/logo-emblem.jpg"
            alt="Lévania Parfums Sceau Officiel"
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
              "font-serif font-normal text-[#541B28] leading-tight tracking-[0.2em] uppercase group-hover:text-[#7A263B] transition-colors",
              config.text
            )}
          >
            LÉVANIA
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3 h-[0.5px] bg-[#C7A66A]" />
            <span
              className={cn(
                "font-sans font-semibold text-[#852538] uppercase",
                config.sub
              )}
            >
              PARFUMS
            </span>
            <span className="w-3 h-[0.5px] bg-[#C7A66A]" />
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#541B28]">
        {content}
      </Link>
    );
  }

  return content;
}
