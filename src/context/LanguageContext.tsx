"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Locale, translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  dir: "ltr" | "rtl";
  t: (key: string, fallback?: string) => string;
  isArabic: boolean;
}

const STORAGE_KEY = "levania_lang";

const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  setLocale: () => {},
  dir: "ltr",
  t: (key: string, fallback?: string) => fallback || key,
  isArabic: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (stored === "fr" || stored === "ar" || stored === "en")) {
        setLocaleState(stored);
        applyLocale(stored);
      } else {
        applyLocale("fr");
      }
    } catch {
      applyLocale("fr");
    }
  }, []);

  const applyLocale = (newLocale: Locale) => {
    if (typeof document === "undefined") return;
    const isRtl = newLocale === "ar";
    document.documentElement.lang = newLocale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    if (isRtl) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
    applyLocale(newLocale);
  };

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";
  const isArabic = locale === "ar";

  const t = useMemo(() => {
    return (key: string, fallback?: string): string => {
      const entry = translations[key];
      if (entry && entry[locale]) {
        return entry[locale];
      }
      return fallback || key;
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dir,
      t,
      isArabic,
    }),
    [locale, dir, t, isArabic]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
