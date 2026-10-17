"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/catalogue";
import { Product, FragranceFamily } from "@/types";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { SignatureWave } from "@/components/brand/SignatureWave";

interface QuestionStep {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; value: string; desc?: string }[];
}

const QUESTIONS: QuestionStep[] = [
  {
    id: "family",
    question: "Quelles familles olfactives vous inspirent ?",
    subtitle: "Sélectionnez l'univers qui fait écho à votre sensibilité.",
    options: [
      { label: "Ambrée & Solaire", value: "Amber", desc: "Chaleur de l'ambre, vanille noble, baumes suaves" },
      { label: "Boisée & Noble", value: "Woody", desc: "Cèdre de l'Atlas, oud sombre, vétiver terreux" },
      { label: "Florale & Soyeuse", value: "Floral", desc: "Néroli blanc, rose centifolia, jasmin voluptueux" },
      { label: "Agrumes & Fraîcheur", value: "Citrus", desc: "Bergamote de Calabre, cédrat vivifiant, petitgrain" },
      { label: "Épicée & Chaude", value: "Spicy", desc: "Safran d'Orient, cannelle de Ceylan, poivre noir" },
    ],
  },
  {
    id: "intensity",
    question: "Quelle intensité et quel sillage recherchez-vous ?",
    subtitle: "De la caresse intime au sillage monumental et inoubliable.",
    options: [
      { label: "Subtile & Intime", value: "Subtle", desc: "Un voile de peau discret, perceptible uniquement de près" },
      { label: "Équilibrée & Élégante", value: "Balanced", desc: "Parfaite harmonie entre présence et raffinement" },
      { label: "Intense & Remarquable", value: "Intense", desc: "Un sillage riche qui signe votre passage" },
      { label: "Monumentale & Audacieuse", value: "Monumental", desc: "Concentration extrait pur, tenue exceptionnelle" },
    ],
  },
  {
    id: "occasion",
    question: "Pour quels moments d'exception ce parfum est-il destiné ?",
    subtitle: "Votre rituel personnel ou les grandes célébrations.",
    options: [
      { label: "Signature Quotidienne", value: "daily", desc: "Un compagnon fidèle pour chaque journée" },
      { label: "Soirées de Gala & Événements", value: "gala", desc: "Prestance, distinction et haute société" },
      { label: "Moments Romantiques & Intimes", value: "romance", desc: "Sensualité, velours et magnétisme" },
      { label: "Célébration & Cadeau Précieux", value: "gift", desc: "L'art d'offrir l'excellence artisanale" },
    ],
  },
  {
    id: "preferredNote",
    question: "Y a-t-il une note maîtresse que vous chérissez particulièrement ?",
    subtitle: "La matière première qui éveille votre mémoire émotionnelle.",
    options: [
      { label: "Safran & Ambre Doré", value: "safran", desc: "L'or rouge des épices précieuses" },
      { label: "Bois d'Olivier & Forêt Méditerranéenne", value: "olive", desc: "L'authenticité et la noblesse de nos terres" },
      { label: "Fleur d'Oranger de Nabeul & Néroli", value: "neroli", desc: "La pureté des vergers en fleur sous le soleil" },
      { label: "Oud Impérial & Cuir Sombre", value: "oud", desc: "Le mystère puissant des nuits d'Orient" },
      { label: "Je laisse le Maître Parfumeur me guider", value: "any", desc: "Ouvert à toutes les découvertes olfactives" },
    ],
  },
];

interface RecommendedItem {
  product: Product;
  matchScore: number;
  reason: string;
}

export function PerfumeFinder() {
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedItem[] | null>(null);

  const currentQuestion = QUESTIONS[currentStepIndex];

  const handleSelectOption = (val: string) => {
    const updated = { ...answers, [currentQuestion.id]: val };
    setAnswers(updated);

    if (currentStepIndex < QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      triggerRecommendationEngine(updated);
    }
  };

  const handleSkip = () => {
    if (currentStepIndex < QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      triggerRecommendationEngine(answers);
    }
  };

  const triggerRecommendationEngine = (currentAnswers: Record<string, string>) => {
    setIsAnalyzing(true);

    // Simulate AI synthesis with Soft Wave animation
    setTimeout(() => {
      // Score products deterministically against user answers
      const scored = PRODUCTS.map((prod) => {
        let score = 75; // base score

        if (currentAnswers.family && prod.fragranceFamily === currentAnswers.family) {
          score += 15;
        }
        if (currentAnswers.intensity && prod.intensity === currentAnswers.intensity) {
          score += 10;
        }

        // Notes matching
        if (currentAnswers.preferredNote === "safran" && prod.topNotes.some((n) => n.includes("Safran"))) {
          score += 15;
        }
        if (currentAnswers.preferredNote === "olive" && prod.heartNotes.some((n) => n.includes("Olivier"))) {
          score += 15;
        }
        if (currentAnswers.preferredNote === "neroli" && (prod.topNotes.some((n) => n.includes("Oranger")) || prod.name.includes("Néroli"))) {
          score += 15;
        }
        if (currentAnswers.preferredNote === "oud" && prod.heartNotes.some((n) => n.includes("Oud"))) {
          score += 15;
        }

        let reason = `Correspondance parfaite avec vos affinités pour les accords ${prod.fragranceFamily.toLowerCase()}s et une intensité ${prod.intensity.toLowerCase()}.`;
        if (prod.bestsellerRank === 1) {
          reason = "Notre N°1 Absolu: un accord ambré majestueux qui sublime chaque instant de prestige.";
        } else if (prod.slug === "sillage-d-olivier") {
          reason = "Alliance noble d'arômes boisés méditerranéens et de sérénité aristocratique.";
        } else if (prod.slug === "neroli-flottant") {
          reason = "Une caresse de néroli solaire et de fleurs blanches, aérienne et lumineuse.";
        }

        return {
          product: prod,
          matchScore: Math.min(99, score),
          reason,
        };
      });

      // Sort by score descending and take exactly 4 best matches
      scored.sort((a, b) => b.matchScore - a.matchScore);
      const top4 = scored.slice(0, 4);

      setRecommendations(top4);
      setIsAnalyzing(false);
    }, 1800);
  };

  const resetFinder = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setRecommendations(null);
  };

  const handleAddToCart = (product: Product) => {
    const fmt = product.formats[0];
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      image: product.images.main,
      formatSize: fmt.size,
      unitPriceTND: fmt.priceTND,
      unitPriceMillimes: fmt.priceMillimes,
      quantity: 1,
    });
    showToast("Recommandation ajoutée au panier", `${product.name} (${fmt.size})`, "luxury");
  };

  return (
    <div className="relative py-12 max-w-4xl mx-auto px-4 min-h-[600px] flex flex-col justify-center">
      {/* Analyzing / AI Loading state with Soft Wave */}
      {isAnalyzing && (
        <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
          <div className="w-24 h-24 rounded-full border border-[#C7A66A]/30 flex items-center justify-center relative mb-6">
            <Sparkles className="w-10 h-10 text-[#C7A66A] animate-spin" />
            <div className="absolute inset-0 rounded-full border border-[#C7A66A] animate-ping opacity-30" />
          </div>
          <h3 className="font-serif text-3xl text-gold-gradient font-light mb-2">
            Harmonisation Olfactive en cours...
          </h3>
          <p className="text-xs text-[#89877F] max-w-md mb-8">
            Notre moteur d&apos;intelligence olfactive compare vos réponses à la composition pyamidale de chaque flacon Lévania.
          </p>
          <div className="w-full max-w-md h-24 overflow-hidden rounded-2xl border border-[#C7A66A]/20 bg-[#20271E]/50">
            <SignatureWave expression="soft" intensity="gentle" />
          </div>
        </div>
      )}

      {/* Recommendations view (exactly 4 products) */}
      {!isAnalyzing && recommendations && (
        <div className="animate-in fade-in slide-in-from-bottom-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-xs text-[#C7A66A] uppercase tracking-widest font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vos 4 Correspondances Maîtresses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-light">
              Votre Signature Olfactive
            </h2>
            <p className="text-xs text-[#89877F] mt-2 max-w-xl mx-auto">
              Voici les quatre créations Lévania sculptées pour sublimer vos accords préférés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map(({ product, matchScore, reason }, idx) => (
              <div
                key={product.id}
                className="rounded-2xl bg-[#171715]/90 border border-[#C7A66A]/20 p-5 flex flex-col justify-between hover:border-[#C7A66A]/50 transition-all shadow-xl group"
              >
                <div>
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-[#C7A66A]/20">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                          Rang #{idx + 1}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                          {matchScore}% affinité
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-[#F6F1E8] mt-1 group-hover:text-gold-gradient transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#89877F] italic">{product.subtitle}</p>
                      <div className="text-xs text-[#C7A66A] font-serif font-medium mt-2">
                        Dès {formatTND(product.formats[0].priceTND)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#E9DFCE]/80 mt-4 p-3 rounded-xl bg-[#20271E]/60 border border-[#C7A66A]/10 leading-relaxed">
                    &laquo; {reason} &raquo;
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.topNotes.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#E9DFCE]/70 border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-5 pt-3 border-t border-[#C7A66A]/15">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 py-2 text-center text-xs rounded-xl border border-[#C7A66A]/30 text-[#E9DFCE] hover:bg-white/5 transition-colors"
                  >
                    Détails du Flacon
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-[2] py-2 px-3 rounded-xl bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Choisir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={resetFinder}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C7A66A]/30 text-xs text-[#C7A66A] hover:bg-white/5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refaire le Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* Step by Step Questionnaire */}
      {!isAnalyzing && !recommendations && (
        <div className="rounded-3xl bg-[#171715]/90 border border-[#C7A66A]/20 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C7A66A]/15">
            <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
              Étape {currentStepIndex + 1} sur {QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    i === currentStepIndex
                      ? "bg-[#C7A66A]"
                      : i < currentStepIndex
                      ? "bg-[#343B2B]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F6F1E8] font-light leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-[#89877F] mt-2">{currentQuestion.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#C7A66A]/15 border-[#C7A66A] text-[#F6F1E8]"
                      : "bg-[#20271E]/40 border-[#C7A66A]/10 text-[#E9DFCE] hover:border-[#C7A66A]/40 hover:bg-[#20271E]/70"
                  }`}
                >
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-gold-gradient transition-colors">
                      {opt.label}
                    </h4>
                    {opt.desc && (
                      <p className="text-xs text-[#89877F] mt-0.5">{opt.desc}</p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors ${
                      isSelected
                        ? "border-[#C7A66A] bg-[#C7A66A] text-[#171715]"
                        : "border-[#89877F]/40 group-hover:border-[#C7A66A]"
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Back & Skip */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            {currentStepIndex > 0 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="flex items-center gap-1.5 text-xs text-[#89877F] hover:text-[#F6F1E8] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Question précédente</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleSkip}
              className="text-xs text-[#89877F] hover:text-[#C7A66A] underline transition-colors"
            >
              Passer cette question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
