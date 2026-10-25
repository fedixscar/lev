"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

const LANGUAGES: Array<{ code: Locale; label: string; native: string }> = [
  { code: "fr", label: "Français", native: "Français" },
  { code: "ar", label: "Arabe", native: "العربية" },
  { code: "en", label: "Anglais", native: "English" },
];

export function LanguageSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "pills" }) {
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

  if (variant === "pills") {
    return (
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAF7F2] dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25">
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[#541B28] text-[#FAF7F2] dark:bg-[#C7A66A] dark:text-[#180B10] shadow-sm font-bold"
                  : "text-[#756B6D] dark:text-[#C5B5B8] hover:text-[#541B28] dark:hover:text-[#DFC68B]"
              )}
            >
              {lang.native}
            </button>
          );
        })}
      </div>
    );
  }

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-xs font-semibold text-[#541B28] dark:text-[#DFC68B] hover:border-[#541B28] dark:hover:border-[#DFC68B] transition-all shadow-xs cursor-pointer active:scale-95"
        title="Changer de langue / Change language / تغيير اللغة"
        aria-label="Sélection de la langue"
      >
        <Globe className="w-3.5 h-3.5 text-[#C7A66A]" />
        <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider">
          {locale === "ar" ? "عربي" : locale.toUpperCase()}
        </span>
        <ChevronDown
          className={cn("w-3 h-3 text-[#756B6D] dark:text-[#A8989C] transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
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
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-[10px] uppercase font-bold text-[#756B6D] dark:text-[#A8989C] w-5">
                    {lang.code.toUpperCase()}
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
