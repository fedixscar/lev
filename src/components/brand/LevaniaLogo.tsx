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
  tone?: "default" | "light";
}

export function LevaniaLogo({
  className,
  size = "md",
  variant = "full",
  href = "/",
  tone = "default",
}: LevaniaLogoProps) {
  const sizeMap = {
    sm: { emblem: 34, text: "text-lg", sub: "text-[9px] tracking-[0.35em]" },
    md: { emblem: 46, text: "text-2xl", sub: "text-[10px] tracking-[0.4em]" },
    lg: { emblem: 68, text: "text-3xl", sub: "text-xs tracking-[0.45em]" },
    xl: { emblem: 104, text: "text-5xl", sub: "text-sm tracking-[0.5em]" },
  };

  const config = sizeMap[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2 sm:gap-3.5 group transition-transform duration-300", className)}>
      {variant !== "wordmark-only" && (
        <div
          className={cn(
            "relative rounded-full overflow-hidden border p-0.5 shadow-sm transition-all duration-300 bg-white",
            tone === "light"
              ? "border-[#C7A66A]/40 shadow-black/20 group-hover:border-[#C7A66A] group-hover:shadow-[0_0_15px_rgba(199,166,106,0.25)]"
              : "border-[#541B28]/20 shadow-[#541B28]/10 group-hover:border-[#541B28] group-hover:shadow-[0_0_15px_rgba(84,27,40,0.15)]"
          )}
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
              "font-serif font-normal leading-tight tracking-[0.2em] uppercase transition-colors",
              tone === "light"
                ? "text-[#FAF7F2] group-hover:text-[#DFC68B]"
                : "text-[#541B28] group-hover:text-[#7A263B]",
              config.text
            )}
          >
            LÉVANIA
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3 h-[0.5px] bg-[#C7A66A]" />
            <span
              className={cn(
                "font-sans font-semibold uppercase",
                tone === "light" ? "text-[#DFC68B]" : "text-[#852538]",
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
