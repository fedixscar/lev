"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";
import { formatTND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { WaveMonogram } from "@/components/brand/WaveMonogram";

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
          <div className="w-24 h-24 rounded-full border border-[#541B28]/30 flex items-center justify-center relative mb-6">
            <Sparkles className="w-10 h-10 text-[#541B28] animate-spin" />
            <div className="absolute inset-0 rounded-full border border-[#541B28] animate-ping opacity-20" />
          </div>
          <h3 className="font-serif text-3xl text-burgundy-gradient font-light mb-2">
            Harmonisation Olfactive en cours...
          </h3>
          <p className="text-xs text-[#5A4B4E] max-w-md mb-8">
            Notre moteur d&apos;intelligence olfactive compare vos réponses à la composition pyramidale de chaque flacon Lévania.
          </p>
          <div className="w-full max-w-md h-24 overflow-hidden rounded-2xl border border-[#541B28]/20 bg-white shadow-sm">
            <SignatureWave expression="soft" intensity="gentle" />
          </div>
        </div>
      )}

      {/* Recommendations view (exactly 4 products) */}
      {!isAnalyzing && recommendations && (
        <div className="animate-in fade-in slide-in-from-bottom-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-xs text-[#541B28] uppercase tracking-widest font-bold mb-3">
              <WaveMonogram size="xs" variant="gold" />
              <span>Vos 4 Correspondances Maîtresses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light">
              Votre Signature Olfactive
            </h2>
            <p className="text-xs text-[#5A4B4E] mt-2 max-w-xl mx-auto">
              Voici les quatre créations Lévania sculptées pour sublimer vos accords préférés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map(({ product, matchScore, reason }, idx) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white border border-[#541B28]/20 p-5 flex flex-col justify-between hover:border-[#541B28] transition-all shadow-sm hover:shadow-xl group"
              >
                <div>
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#541B28]/15">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold">
                          Rang #{idx + 1}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#541B28]/10 border border-[#541B28]/25 text-[#541B28] font-bold">
                          {matchScore}% affinité
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-[#23181A] mt-1 group-hover:text-[#541B28] transition-colors font-medium">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#756B6D] italic">{product.subtitle}</p>
                      <div className="text-xs text-[#541B28] font-serif font-bold mt-2">
                        Dès {formatTND(product.formats[0].priceTND)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A4B4E] mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#541B28]/10 leading-relaxed">
                    &laquo; {reason} &raquo;
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.topNotes.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#756B6D] border border-[#541B28]/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-5 pt-3 border-t border-[#541B28]/15">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 py-2 text-center text-xs rounded-xl border border-[#541B28]/30 text-[#541B28] hover:bg-[#FAF7F2] font-semibold transition-colors"
                  >
                    Détails du Flacon
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-[2] py-2 px-3 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#541B28]/30 text-xs text-[#541B28] hover:bg-white font-semibold transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refaire le Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* Step by Step Questionnaire */}
      {!isAnalyzing && !recommendations && (
        <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-12 shadow-xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#541B28]/15">
            <span className="text-xs uppercase tracking-widest text-[#541B28] font-bold">
              Étape {currentStepIndex + 1} sur {QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    i === currentStepIndex
                      ? "bg-[#541B28]"
                      : i < currentStepIndex
                      ? "bg-[#C7A66A]"
                      : "bg-[#EAE1D2]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-4xl text-[#23181A] font-light leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-[#5A4B4E] mt-2">{currentQuestion.subtitle}</p>
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
                      ? "bg-[#541B28]/10 border-[#541B28] text-[#23181A] shadow-sm"
                      : "bg-[#FAF7F2] border-[#541B28]/15 text-[#23181A] hover:border-[#541B28] hover:bg-white"
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-sm text-[#23181A] group-hover:text-[#541B28] transition-colors">
                      {opt.label}
                    </h4>
                    {opt.desc && (
                      <p className="text-xs text-[#756B6D] mt-0.5">{opt.desc}</p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors ${
                      isSelected
                        ? "border-[#541B28] bg-[#541B28] text-[#FAF7F2]"
                        : "border-[#756B6D]/40 group-hover:border-[#541B28]"
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Back & Skip */}
          <div className="flex items-center justify-between pt-4 border-t border-[#541B28]/10">
            {currentStepIndex > 0 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="flex items-center gap-1.5 text-xs text-[#756B6D] hover:text-[#541B28] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Question précédente</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleSkip}
              className="text-xs text-[#756B6D] hover:text-[#541B28] underline transition-colors"
            >
              Passer cette question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
