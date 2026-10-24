"use client";

import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "dropdown" | "pill";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme();

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-full border border-[#541B28]/20 dark:border-[#C7A66A]/30 bg-white/80 dark:bg-[#180B10]/80 backdrop-blur-md shadow-xs",
          className
        )}
      >
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "p-1.5 rounded-full text-xs font-cinzel transition-all",
            theme === "light"
              ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
              : "text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
          )}
          title="Mode Clair"
          aria-label="Mode Clair"
        >
          <Sun className="w-3.5 h-3.5 text-[#C7A66A]" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "p-1.5 rounded-full text-xs font-cinzel transition-all",
            theme === "dark"
              ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
              : "text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
          )}
          title="Mode Sombre (Noir Impérial)"
          aria-label="Mode Sombre"
        >
          <Moon className="w-3.5 h-3.5 text-[#DFC68B]" />
        </button>

        <button
          onClick={() => setTheme("system")}
          className={cn(
            "p-1.5 rounded-full text-xs font-cinzel transition-all",
            theme === "system"
              ? "bg-[#541B28] text-[#FAF7F2] shadow-sm"
              : "text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
          )}
          title="Automatique (Système)"
          aria-label="Mode Système"
        >
          <Laptop className="w-3.5 h-3.5 text-[#C7A66A]" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-all duration-300 group cursor-pointer",
        "bg-white/90 dark:bg-[#180B10]/90",
        "border border-[#541B28]/20 dark:border-[#C7A66A]/40",
        "hover:border-[#C7A66A] dark:hover:border-[#DFC68B]",
        "shadow-xs hover:shadow-md hover:scale-105 active:scale-95",
        className
      )}
      title={
        resolvedTheme === "dark"
          ? "Passer en mode clair (Solaire)"
          : "Passer en mode sombre (Noir Impérial)"
      }
      aria-label={
        resolvedTheme === "dark"
          ? "Passer en mode clair"
          : "Passer en mode sombre"
      }
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-[#DFC68B] transition-transform duration-500 rotate-0 scale-100 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-[#541B28] transition-transform duration-500 rotate-0 scale-100 group-hover:rotate-45" />
        )}
      </div>
    </button>
  );
}
