"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send, Sparkles, Bot, ArrowRight, User } from "lucide-react";
import { PRODUCTS } from "@/lib/catalogue";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  recommendedSlug?: string;
  timestamp: string;
}

export function AiConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Bienvenue chez Lévania Parfums. Je suis votre Concierge Olfactif privé. Comment puis-je vous guider aujourd'hui dans le choix de votre sillage ?",
      timestamp: "En direct",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const query = input.toLowerCase();
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Knowledge-grounded Concierge Response (backed by official catalogue and rules)
    setTimeout(() => {
      let reply = "Nos maîtres parfumeurs composent des fragrances d'exception selon les plus hauts standards de la haute parfumerie. Souhaitez-vous explorer notre N°1 Onde d'Or ou faire le diagnostic olfactif ?";
      let recommendedSlug: string | undefined = undefined;

      if (query.includes("livraison") || query.includes("délai") || query.includes("frais")) {
        reply = "La livraison est effectuée sous 24h à 48h partout en Tunisie par nos transporteurs partenaires. Elle est offerte pour toute commande à partir de 200 TND (sinon 7.000 TND).";
      } else if (query.includes("chance") || query.includes("luck") || query.includes("roue") || query.includes("vague")) {
        reply = "La Roue du Destin Lévania comporte 4 Vagues (Normal, Fire, Royal, Admin Wave à 7,777 Luck). Vous gagnez 1 point de Luck pour chaque 10 TND d'achat éligible ! Chaque lancer consomme votre solde pour vous faire gagner coupons, flacons ou cadeaux précieux.";
      } else if (query.includes("coffret") || query.includes("composer") || query.includes("cadeau")) {
        reply = "Notre service 'Composer Mon Coffret' vous permet de concevoir votre écrin cylindrique sur mesure : choisissez vos parfums 50ml ou 100ml, vos rubans de satin et ajoutez une dédicace calligraphiée offerte.";
        recommendedSlug = "compose-box";
      } else if (query.includes("ambre") || query.includes("or") || query.includes("onde d'or") || query.includes("bestseller")) {
        reply = `Onde d'Or est notre chef-d'œuvre N°1. Un extrait de parfum absolu ambré solaire avec bergamote, safran d'Orient, rose de Damas et fève tonka (dès 195.000 TND).`;
        recommendedSlug = "onde-d-or";
      } else if (query.includes("bois") || query.includes("olivier") || query.includes("sillage")) {
        reply = `Sillage d'Olivier célèbre l'âme de nos oliviers centenaires avec cardamome, iris de Florence et vétiver d'Haïti (dès 180.000 TND).`;
        recommendedSlug = "sillage-d-olivier";
      } else if (query.includes("fleur") || query.includes("néroli") || query.includes("jasmin") || query.includes("frais")) {
        reply = `Néroli Flottant capture l'éclat de la fleur d'oranger de Nabeul et du jasmin sambac. Une onde soyeuse lumineuse et aérienne (dès 175.000 TND).`;
        recommendedSlug = "neroli-flottant";
      } else if (query.includes("oud") || query.includes("sombre") || query.includes("cuir") || query.includes("nuit")) {
        reply = `Oud Impérial & Cuir d'Orient sont nos créations les plus monumentales : encens d'Oman, patchouli noirci, oud précieux et cuir vintage (dès 230.000 TND).`;
        recommendedSlug = "oud-imperial";
      } else if (query.includes("revendeur") || query.includes("commission")) {
        reply = "Notre réseau de revendeurs Lévania propose 6 rangs prestigieux (Iron, Bronze, Gold, Platinum, Diamond, Master) avec des commissions attractives dès chaque vente validée. Vous pouvez accéder au portail revendeur depuis le menu.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: reply,
          recommendedSlug,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border border-[#C7A66A]/40"
        aria-label="Ouvrir le Concierge Olfactif IA"
      >
        <Sparkles className="w-5 h-5 text-[#DFC68B] animate-spin" style={{ animationDuration: "8s" }} />
        <span className="hidden sm:inline font-serif text-xs font-bold tracking-wider uppercase">
          Concierge Olfactif IA
        </span>
      </button>

      {/* Floating Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[520px] rounded-3xl bg-white border-2 border-[#541B28] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
          {/* Header */}
          <div className="p-4 bg-[#541B28] text-[#FAF7F2] border-b border-[#C7A66A]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#C7A66A]/50 overflow-hidden bg-black/40">
                <Image src="/brand/logo-emblem.jpg" alt="Lévania" width={32} height={32} className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-sm text-[#FAF7F2] font-semibold leading-tight">
                  Concierge Olfactif
                </h4>
                <span className="text-[10px] text-amber-200 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Maison Lévania &bull; En ligne
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#FAF7F2]/80 hover:text-[#FAF7F2] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-[#FAF7F2]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px]",
                    m.sender === "user"
                      ? "bg-[#541B28] text-[#FAF7F2]"
                      : "bg-white text-[#541B28] border border-[#541B28]/25 shadow-sm"
                  )}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={cn(
                    "p-3 rounded-2xl leading-relaxed shadow-sm",
                    m.sender === "user"
                      ? "bg-[#541B28] text-[#FAF7F2] rounded-tr-none font-medium"
                      : "bg-white text-[#23181A] rounded-tl-none border border-[#541B28]/15"
                  )}
                >
                  <p>{m.text}</p>
                  {m.recommendedSlug && (
                    <Link
                      href={m.recommendedSlug === "compose-box" ? "/compose-box" : `/products/${m.recommendedSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase font-bold text-[#541B28] hover:underline"
                    >
                      <span>Découvrir la création</span>
                      <ArrowRight className="w-3 h-3 text-[#C7A66A]" />
                    </Link>
                  )}
                  <span className="block text-[9px] opacity-60 text-right mt-1">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-[#756B6D] text-xs pl-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#541B28] animate-bounce delay-300" />
                <span className="text-[10px] ml-1 font-medium">Lévania analyse vos désirs...</span>
              </div>
            )}
          </div>

          {/* Quick Questions Suggestions */}
          <div className="px-3 py-2 bg-white border-t border-[#541B28]/10 flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
            <button
              onClick={() => setInput("Parlez-moi de votre N°1 Onde d'Or")}
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#541B28] font-bold border border-[#541B28]/15 whitespace-nowrap hover:border-[#541B28]"
            >
              N°1 Onde d&apos;Or
            </button>
            <button
              onClick={() => setInput("Comment fonctionne la Roue du Destin et la Luck ?")}
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#541B28] font-bold border border-[#541B28]/15 whitespace-nowrap hover:border-[#541B28]"
            >
              La Roue & Luck
            </button>
            <button
              onClick={() => setInput("Quels sont les délais et frais de livraison ?")}
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#541B28] font-bold border border-[#541B28]/15 whitespace-nowrap hover:border-[#541B28]"
            >
              Livraison
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#541B28]/15 flex gap-2">
            <input
              type="text"
              placeholder="Posez votre question au Maître Parfumeur..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-3 py-2 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] disabled:opacity-40 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4 text-[#DFC68B]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
