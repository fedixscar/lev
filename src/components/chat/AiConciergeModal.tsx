"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send, Bot, ArrowRight, User } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  recommendedSlug?: string;
  timestamp: string;
}

export function AiConciergeModal() {
  const { t, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize or reset welcome message when locale changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome-1",
        sender: "ai",
        text: t(
          "concierge.welcome",
          "Bienvenue chez Lévania Parfums. Je suis votre Concierge Olfactif privé. Comment puis-je vous guider aujourd'hui dans le choix de votre sillage ?"
        ),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [locale, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const currentHistory = [...messages];
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: currentHistory.map((m) => ({
            id: m.id,
            sender: m.sender,
            text: m.text,
          })),
          locale,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      const aiReply =
        data.reply ||
        (locale === "ar"
          ? "أنا في خدمتكم لمساعدتكم في اختيار عطرك المميز من دار ليفانيا."
          : locale === "en"
          ? "I remain at your service to guide you through Lévania's fragrance collection."
          : "Je reste à votre entière disposition pour vous guider vers votre sillage idéal.");

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiReply,
          recommendedSlug: data.recommendedSlug,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      console.error("AI Concierge request error:", err);
      // Informative luxury error notice so users and developers know the connection state
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text:
            locale === "ar"
              ? "تعذر الاتصال بخدمة المستشار العطري في الوقت الحالي. يرجى التأكد من تشغيل الخادم المحلي والمحاولة مجددًا."
              : locale === "en"
              ? "Unable to reach the Lévania Concierge service right now. Please ensure your server is running and try again."
              : "Le service de Conciergerie Olfactive est momentanément indisponible. Veuillez vérifier que le serveur local est actif et réessayer.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 rtl:left-auto rtl:right-4 rtl:sm:right-6 z-40 px-4 sm:px-5 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group border border-[#C7A66A]/40 cursor-pointer"
        aria-label={t("concierge.open_aria", "Ouvrir le Concierge Olfactif IA")}
      >
        <GoldStarLozenge size={16} className="text-[#DFC68B] group-hover:rotate-45 transition-transform duration-500" />
        <span className="hidden sm:inline font-cinzel text-[11px] font-bold tracking-luxury uppercase">
          {t("concierge.btn", "Concierge Olfactif IA")}
        </span>
      </button>

      {/* Floating Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 rtl:left-auto rtl:right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[520px] rounded-3xl bg-white dark:bg-[#180B10] border-2 border-[#541B28] dark:border-[#C7A66A]/40 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
          {/* Header */}
          <div className="p-4 bg-[#541B28] text-[#FAF7F2] border-b border-[#C7A66A]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#C7A66A]/50 overflow-hidden bg-black/40">
                <Image src="/brand/logo-emblem.jpg" alt="Lévania" width={32} height={32} className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-sm text-[#FAF7F2] font-semibold leading-tight">
                  {t("concierge.title", "Concierge Olfactif")}
                </h4>
                <span className="text-[10px] text-amber-200 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t("concierge.online_status", "Maison Lévania • En ligne")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#FAF7F2]/80 hover:text-[#FAF7F2] rounded-full transition-colors cursor-pointer"
              aria-label={t("aria.close", "Fermer")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-[#FAF7F2] dark:bg-[#0E0709]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  m.sender === "user" ? "ml-auto rtl:ml-0 rtl:mr-auto flex-row-reverse" : "mr-auto rtl:mr-0 rtl:ml-auto"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px]",
                    m.sender === "user"
                      ? "bg-[#541B28] text-[#FAF7F2]"
                      : "bg-white dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] border border-[#541B28]/25 dark:border-[#C7A66A]/30 shadow-sm"
                  )}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={cn(
                    "p-3 rounded-2xl leading-relaxed shadow-sm",
                    m.sender === "user"
                      ? "bg-[#541B28] text-[#FAF7F2] rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none font-medium"
                      : "bg-white dark:bg-[#180B10] text-[#23181A] dark:text-[#FAF7F2] rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none border border-[#541B28]/15 dark:border-[#C7A66A]/25"
                  )}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  {m.recommendedSlug && (
                    <Link
                      href={m.recommendedSlug === "compose-box" ? "/compose-box" : `/products/${m.recommendedSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase font-bold text-[#541B28] dark:text-[#DFC68B] hover:underline"
                    >
                      <span>{t("concierge.discover_creation", "Découvrir la création")}</span>
                      <ArrowRight className="w-3 h-3 text-[#C7A66A] rtl:rotate-180" />
                    </Link>
                  )}
                  <span className="block text-[9px] opacity-60 text-right rtl:text-left mt-1">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-[#756B6D] dark:text-[#A8989C] text-xs pl-8 rtl:pl-0 rtl:pr-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] dark:bg-[#DFC68B] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] dark:bg-[#DFC68B] animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] dark:bg-[#DFC68B] animate-bounce delay-300" />
                <span className="text-[10px] ml-1 rtl:ml-0 rtl:mr-1 font-medium">
                  {t("concierge.typing", "Lévania analyse vos désirs...")}
                </span>
              </div>
            )}
          </div>

          {/* Quick Questions Suggestions */}
          <div className="px-3 py-2 bg-white dark:bg-[#14080D] border-t border-[#541B28]/10 dark:border-[#C7A66A]/20 flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
            <button
              onClick={() =>
                sendMessage(
                  locale === "ar"
                    ? "حدثني عن عطر أوند دور"
                    : locale === "en"
                    ? "Tell me about #1 Onde d'Or"
                    : "Parlez-moi de votre N°1 Onde d'Or"
                )
              }
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/15 dark:border-[#C7A66A]/25 whitespace-nowrap hover:border-[#541B28] cursor-pointer"
            >
              {t("concierge.q_onde_dor", "N°1 Onde d'Or")}
            </button>
            <button
              onClick={() =>
                sendMessage(
                  locale === "ar"
                    ? "كيف تعمل عجلة الحظ والجوائز؟"
                    : locale === "en"
                    ? "How does the Wheel of Chance work?"
                    : "Comment fonctionne la Roue Cadeau et les points ?"
                )
              }
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/15 dark:border-[#C7A66A]/25 whitespace-nowrap hover:border-[#541B28] cursor-pointer"
            >
              {t("concierge.q_wheel", "La Roue Cadeau")}
            </button>
            <button
              onClick={() =>
                sendMessage(
                  locale === "ar"
                    ? "ما هي شروط وتكلفة التوصيل؟"
                    : locale === "en"
                    ? "What are delivery terms and costs?"
                    : "Quels sont les délais et frais de livraison ?"
                )
              }
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/15 dark:border-[#C7A66A]/25 whitespace-nowrap hover:border-[#541B28] cursor-pointer"
            >
              {t("concierge.q_delivery", "Livraison")}
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#180B10] border-t border-[#541B28]/15 dark:border-[#C7A66A]/25 flex gap-2">
            <input
              type="text"
              placeholder={t("concierge.input_placeholder", "Posez votre question au Maître Parfumeur...")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/20 dark:border-[#C7A66A]/30 rounded-xl px-3 py-2 text-xs text-[#23181A] dark:text-[#FAF7F2] placeholder:text-[#756B6D] dark:placeholder:text-[#8C7B80] focus:outline-none focus:border-[#541B28] dark:focus:border-[#DFC68B]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4 text-[#DFC68B] rtl:rotate-180" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
