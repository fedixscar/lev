"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "luxury";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface NotificationContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message?: string, type: ToastType = "luxury") => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5",
              toast.type === "luxury" && "bg-[#20271E]/95 border-[#C7A66A]/40 text-[#F6F1E8]",
              toast.type === "success" && "bg-[#1E2E20]/95 border-emerald-500/40 text-emerald-100",
              toast.type === "error" && "bg-[#331C1E]/95 border-rose-500/40 text-rose-100",
              toast.type === "info" && "bg-[#171715]/95 border-neutral-700 text-neutral-200"
            )}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "luxury" && <Sparkles className="w-5 h-5 text-[#C7A66A]" />}
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 text-sm">
              <h4 className="font-medium text-[#F6F1E8] tracking-wide">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-[#E9DFCE]/80 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#89877F] hover:text-[#F6F1E8] p-1 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
