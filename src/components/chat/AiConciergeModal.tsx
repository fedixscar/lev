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
  const { t, locale, isArabic } = useLanguage();
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

    // Knowledge-grounded Multilingual Concierge Response
    setTimeout(() => {
      let reply = "";
      let recommendedSlug: string | undefined = undefined;

      if (locale === "ar") {
        reply = "يقوم صانعو العطور لدينا بابتكار تركيبات نادرة وفق أعلى معايير العطور الراقية. هل ترغب في استكشاف عطرنا الأيقوني 'أوند دور' أم تفضل المساعدة في اختيار العطر المناسب لك؟";
        if (query.includes("توصيل") || query.includes("شحن") || query.includes("livraison") || query.includes("délai")) {
          reply = "التوصيل يتم خلال 24 إلى 48 ساعة في جميع أنحاء تونس عبر شركائنا المعتمدين. الشحن مجاني لجميع الطلبات بقيمة 200 دينار فما فوق (أو 7.000 دينار).";
        } else if (query.includes("حظ") || query.includes("عجلة") || query.includes("نقاط") || query.includes("luck") || query.includes("roue")) {
          reply = "عجلة الحظ لدار ليفانيا تمنحك فرصة ربح عطور مجانية وتخفيضات فورية! تكسب نقطة حظ واحدة لكل 10 دنانير مشتريات مؤهلة. كل دورة تستهلك نقاطك لتمنحك هدايا فاخرة.";
        } else if (query.includes("علبة") || query.includes("صندوق") || query.includes("هدية") || query.includes("coffret") || query.includes("cadeau")) {
          reply = "خدمتنا 'ابتكر صندوق الهدايا' تتيح لك تصميم علبة أسطوانية فاخرة مخصصة: اختر زجاجاتك (50 مل أو 100 مل) وأضف إهداءً شخصيًا مكتوبًا باليد مجانًا.";
          recommendedSlug = "compose-box";
        } else if (query.includes("ذهب") || query.includes("عنبر") || query.includes("أوند") || query.includes("or") || query.includes("onde")) {
          reply = "أوند دور (Onde d'Or) هو تحفتنا الأكثر مبيعًا. خلاصة عطرية عنبرية نقية مع زعفران شرقي وورد دمشقي وفانيليا بوربون (ابتداءً من 195 دينار).";
          recommendedSlug = "onde-d-or";
        } else if (query.includes("زيتون") || query.includes("خشب") || query.includes("سياج") || query.includes("olivier")) {
          reply = "سياج دوليفيي (Sillage d'Olivier) يجسد سحر أشجار الزيتون التونسية المعمرة مع الهيل وأرز الأطلس ونجيل الهند (ابتداءً من 180 دينار).";
          recommendedSlug = "sillage-d-olivier";
        } else if (query.includes("زهر") || query.includes("برتقال") || query.includes("نيرولي") || query.includes("neroli")) {
          reply = "نيرولي فلوتان (Néroli Flottant) يستحضر نسيم بساتين نابل بزهر البرتقال النقي والمسك الأبيض القطني (ابتداءً من 175 دينار).";
          recommendedSlug = "neroli-flottant";
        } else if (query.includes("عود") || query.includes("داكن") || query.includes("oud") || query.includes("sombre")) {
          reply = "عود إمبريال (Oud Impérial) هو عطرنا الأكثر هيبة وفخامة: عود كمبودي وجلد فاخر وبخور عماني بفوحان يدوم 18+ ساعة (ابتداءً من 230 دينار).";
          recommendedSlug = "oud-imperial";
        }
      } else if (locale === "en") {
        reply = "Our master perfumers craft exceptional fragrances according to the highest standards of Haute Parfumerie. Would you like to explore our #1 Onde d'Or or take the fragrance quiz?";
        if (query.includes("delivery") || query.includes("shipping") || query.includes("delay")) {
          reply = "Delivery is completed within 24 to 48 hours throughout Tunisia with trusted partners. Free for all orders from 200 TND (otherwise 7.000 TND).";
        } else if (query.includes("chance") || query.includes("luck") || query.includes("wheel")) {
          reply = "Lévania's Wheel of Chance rewards you with instant discounts, sample discoveries, and complimentary bottles. You earn 1 Luck point for every 10 TND of eligible purchase!";
        } else if (query.includes("box") || query.includes("gift") || query.includes("compose")) {
          reply = "Our 'Compose Your Box' service lets you design a bespoke cylindrical case: select your 50ml or 100ml fragrances, satin ribbons, and add a complimentary handwritten dedication.";
          recommendedSlug = "compose-box";
        } else if (query.includes("amber") || query.includes("gold") || query.includes("onde") || query.includes("bestseller")) {
          reply = "Onde d'Or is our #1 signature masterpiece: a pure solar amber extrait with bergamot, eastern saffron, Damascus rose, and bourbon vanilla (from 195 TND).";
          recommendedSlug = "onde-d-or";
        } else if (query.includes("wood") || query.includes("olive") || query.includes("sillage")) {
          reply = "Sillage d'Olivier honors centenary Mediterranean olive groves with cardamom, Florentine iris, and Haitian vetiver (from 180 TND).";
          recommendedSlug = "sillage-d-olivier";
        } else if (query.includes("flower") || query.includes("neroli") || query.includes("jasmine") || query.includes("fresh")) {
          reply = "Néroli Flottant captures the dawn radiance of Nabeul orange blossom and white jasmine over sheer cotton musk (from 175 TND).";
          recommendedSlug = "neroli-flottant";
        } else if (query.includes("oud") || query.includes("dark") || query.includes("leather") || query.includes("intense")) {
          reply = "Oud Impérial is our most commanding creation: royal incense, rare Cambodian oud, and vintage leather with 18h+ longevity (from 230 TND).";
          recommendedSlug = "oud-imperial";
        }
      } else {
        // French
        reply = "Nos maîtres parfumeurs composent des fragrances d'exception selon les plus hauts standards de la haute parfumerie. Souhaitez-vous explorer notre N°1 Onde d'Or ou faire le diagnostic olfactif ?";
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
    }, 1000);
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
                  <p>{m.text}</p>
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
              onClick={() => setInput(locale === "ar" ? "حدثني عن عطر أوند دور" : locale === "en" ? "Tell me about #1 Onde d'Or" : "Parlez-moi de votre N°1 Onde d'Or")}
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/15 dark:border-[#C7A66A]/25 whitespace-nowrap hover:border-[#541B28] cursor-pointer"
            >
              {t("concierge.q_onde_dor", "N°1 Onde d'Or")}
            </button>
            <button
              onClick={() => setInput(locale === "ar" ? "كيف تعمل عجلة الحظ والجوائز؟" : locale === "en" ? "How does the Wheel of Chance work?" : "Comment fonctionne la Roue Cadeau et les points ?")}
              className="px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1E0D15] text-[#541B28] dark:text-[#DFC68B] font-bold border border-[#541B28]/15 dark:border-[#C7A66A]/25 whitespace-nowrap hover:border-[#541B28] cursor-pointer"
            >
              {t("concierge.q_wheel", "La Roue Cadeau")}
            </button>
            <button
              onClick={() => setInput(locale === "ar" ? "ما هي شروط وتكلفة التوصيل؟" : locale === "en" ? "What are delivery terms and costs?" : "Quels sont les délais et frais de livraison ?")}
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
