"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "levania_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
      return "system";
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    try {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  // Helper to sync document element and color-scheme meta tag per Modern Web Guidance
  const applyTheme = (targetTheme: ThemePreference) => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemDark = mediaQuery.matches;
    const isDark = targetTheme === "dark" || (targetTheme === "system" && systemDark);
    const resolved: ResolvedTheme = isDark ? "dark" : "light";

    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }

    // Update <meta name="color-scheme"> per Modern Web Guidance
    let meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "color-scheme";
      document.head.appendChild(meta);
    }
    meta.content = targetTheme === "system" ? "light dark" : targetTheme;
  };

  // Initial client hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      const initialTheme: ThemePreference =
        stored === "light" || stored === "dark" ? stored : "system";
      setThemeState(initialTheme);
      applyTheme(initialTheme);
    } catch {
      applyTheme("system");
    }
    setMounted(true);
  }, []);

  // Listen to OS prefers-color-scheme changes when in system mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Only react if user has not set an explicit override
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || stored === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (newTheme: ThemePreference) => {
    startTransition(() => {
      setThemeState(newTheme);
      applyTheme(newTheme);

      try {
        if (newTheme === "system") {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, newTheme);
        }
      } catch {
        // Ignore storage errors in private browsing
      }
    });
  };

  // Smart 2-state toggle adhering to modern-web-guidance
  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemScheme: ResolvedTheme = mediaQuery.matches ? "dark" : "light";
    const nextResolved: ResolvedTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (nextResolved === systemScheme) {
      // Revert to system default without hard pinning
      setTheme("system");
    } else {
      // Explicit override
      setTheme(nextResolved);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : "system",
        resolvedTheme: mounted ? resolvedTheme : "light",
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
