"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

const LANGUAGES: Array<{ code: Locale; label: string; native: string; short: string }> = [
  { code: "fr", label: "Français", native: "Français", short: "FR" },
  { code: "ar", label: "Arabe", native: "العربية", short: "عربي" },
  { code: "en", label: "Anglais", native: "English", short: "EN" },
];

interface LanguageSwitcherProps {
  variant?: "segmented" | "dropdown" | "pills" | "floating";
  className?: string;
}

export function LanguageSwitcher({ variant = "segmented", className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Variant 1: Segmented buttons (FR | عربي | EN) - 1-click instant switch
  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-full bg-white/95 dark:bg-[#180B10]/95 border border-[#541B28]/25 dark:border-[#C7A66A]/35 backdrop-blur-md shadow-xs transition-all",
          className
        )}
        role="group"
        aria-label="Changer de langue / Change language / تغيير اللغة"
      >
        <div className="pl-2 pr-1 text-[#C7A66A] hidden sm:flex items-center">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-0.5">
          {LANGUAGES.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={cn(
                  "px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-cinzel font-bold transition-all duration-300 cursor-pointer active:scale-95",
                  isActive
                    ? "bg-[#541B28] text-[#FAF7F2] dark:bg-[#C7A66A] dark:text-[#180B10] shadow-sm scale-100 font-extrabold"
                    : "text-[#756B6D] dark:text-[#C5B5B8] hover:text-[#541B28] dark:hover:text-[#DFC68B] hover:bg-black/5 dark:hover:bg-white/5"
                )}
                title={`Passer en ${lang.label} (${lang.native})`}
                aria-label={`Passer en ${lang.label}`}
                aria-pressed={isActive}
              >
                {lang.short}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Variant 2: Full-width pills (for mobile navigation drawer)
  if (variant === "pills") {
    return (
      <div className={cn("grid grid-cols-3 gap-2 w-full", className)}>
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className={cn(
                "px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5 text-center border",
                isActive
                  ? "bg-[#541B28] text-[#FAF7F2] dark:bg-[#C7A66A] dark:text-[#180B10] border-[#541B28] dark:border-[#C7A66A] shadow-md font-bold"
                  : "bg-white dark:bg-[#180B10] text-[#756B6D] dark:text-[#C5B5B8] border-[#541B28]/15 dark:border-[#C7A66A]/20 hover:text-[#541B28] dark:hover:text-[#DFC68B]"
              )}
            >
              <span className="font-cinzel text-[10px] uppercase font-bold opacity-80">{lang.short}</span>
              <span className="text-xs">{lang.native}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Variant 3: Floating quick switcher button (fixed at bottom-right or bottom-left)
  if (variant === "floating") {
    return (
      <div className={cn("fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40", className)}>
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/95 dark:bg-[#180B10]/95 border-2 border-[#541B28] dark:border-[#C7A66A]/60 shadow-2xl backdrop-blur-xl">
          <div className="px-2 text-[#C7A66A] flex items-center">
            <Globe className="w-4 h-4 animate-spin-slow" />
          </div>
          {LANGUAGES.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-cinzel font-bold transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-[#541B28] text-[#FAF7F2] dark:bg-[#C7A66A] dark:text-[#180B10] shadow-md font-extrabold"
                    : "text-[#756B6D] dark:text-[#C5B5B8] hover:text-[#541B28] dark:hover:text-[#DFC68B]"
                )}
                title={`Passer en ${lang.label}`}
              >
                {lang.short}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Variant 4: Classic dropdown
  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/25 dark:border-[#C7A66A]/35 text-xs font-semibold text-[#541B28] dark:text-[#DFC68B] hover:border-[#541B28] dark:hover:border-[#DFC68B] transition-all shadow-xs cursor-pointer active:scale-95"
        title="Changer de langue / Change language / تغيير اللغة"
        aria-label="Sélection de la langue"
      >
        <Globe className="w-3.5 h-3.5 text-[#C7A66A]" />
        <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider">
          {currentLang.short}
        </span>
        <ChevronDown
          className={cn("w-3 h-3 text-[#756B6D] dark:text-[#A8989C] transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 text-[10px] uppercase font-cinzel tracking-wider text-[#756B6D] dark:text-[#A8989C] border-b border-[#541B28]/10 dark:border-[#C7A66A]/15 font-bold mb-1">
            Sélection de la Langue
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left rtl:text-right",
                  isSelected
                    ? "bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] font-bold"
                    : "text-[#23181A] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#251019]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-cinzel text-[10px] uppercase font-bold text-[#756B6D] dark:text-[#A8989C] w-6">
                    {lang.short}
                  </span>
                  <span className="font-medium">{lang.native}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C7A66A]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
