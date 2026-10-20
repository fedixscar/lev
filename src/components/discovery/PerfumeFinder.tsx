"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Check } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
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
            <GoldStarLozenge size={36} className="text-[#541B28] animate-pulse" />
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
          <div className="text-center mb-12">
            <div className="luxury-pill mb-4 inline-flex items-center gap-2.5">
              <WaveMonogram size="xs" variant="gold" />
              <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] font-bold">
                Vos 4 Correspondances Maîtresses
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light">
              Votre Signature Olfactive
            </h2>
            <p className="text-sm text-[#5A4B4E] mt-3 max-w-xl mx-auto font-light">
              Voici les quatre créations Lévania sculptées pour sublimer vos accords préférés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {recommendations.map(({ product, matchScore, reason }, idx) => (
              <div
                key={product.id}
                className="rounded-3xl bg-white border border-[#541B28]/15 p-6 sm:p-7 flex flex-col justify-between hover:border-[#C7A66A] transition-all duration-300 shadow-sm hover:shadow-2xl group"
              >
                <div>
                  <div className="flex gap-5 items-start">
                    <div className="relative w-28 h-32 rounded-2xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#541B28]/15 shadow-inner">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#541B28] font-bold">
                          Rang #{idx + 1}
                        </span>
                        <span className="font-cinzel text-[10px] tracking-wider px-3 py-1 rounded-full bg-[#541B28]/10 border border-[#541B28]/20 text-[#541B28] font-bold">
                          {matchScore}% affinité
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] mt-1.5 group-hover:text-[#541B28] transition-colors font-medium">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#756B6D] italic mt-0.5">{product.subtitle}</p>
                      <div className="font-cinzel text-xs text-[#541B28] font-bold tracking-luxury mt-2.5">
                        Dès {formatTND(product.formats[0].priceTND)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A4B4E] mt-5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/10 leading-relaxed font-light">
                    &laquo; {reason} &raquo;
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {product.topNotes.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#756B6D] border border-[#541B28]/10 font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-[#541B28]/15">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 py-3 text-center rounded-xl border border-[#541B28]/25 text-[#541B28] hover:bg-[#FAF7F2] font-cinzel text-[10px] tracking-luxury uppercase font-bold transition-colors"
                  >
                    Détails Flacon
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-[2] py-3 px-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[10px] tracking-luxury uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66A]" />
                    <span>Choisir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={resetFinder}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#541B28]/25 text-[#541B28] hover:bg-white font-cinzel text-xs tracking-luxury uppercase font-bold transition-all shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Refaire le Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* Step by Step Questionnaire */}
      {!isAnalyzing && !recommendations && (
        <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-14 shadow-2xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-10 pb-5 border-b border-[#541B28]/15">
            <span className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold">
              Étape {currentStepIndex + 1} sur {QUESTIONS.length}
            </span>
            <div className="flex gap-2">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStepIndex
                      ? "bg-[#541B28] w-12"
                      : i < currentStepIndex
                      ? "bg-[#C7A66A]"
                      : "bg-[#EAE1D2]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl text-[#23181A] font-light leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-[#5A4B4E] mt-3 font-light leading-relaxed">{currentQuestion.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3.5 mb-10">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#541B28]/10 border-[#541B28] text-[#23181A] shadow-md ring-1 ring-[#541B28]/30"
                      : "bg-[#FAF7F2] border-[#541B28]/15 text-[#23181A] hover:border-[#541B28] hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="pr-4">
                    <h4 className="font-serif font-medium text-base text-[#23181A] group-hover:text-[#541B28] transition-colors">
                      {opt.label}
                    </h4>
                    {opt.desc && (
                      <p className="text-xs text-[#756B6D] mt-1 font-light leading-relaxed">{opt.desc}</p>
                    )}
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-all ${
                      isSelected
                        ? "border-[#541B28] bg-[#541B28] text-[#FAF7F2] shadow-sm"
                        : "border-[#756B6D]/40 group-hover:border-[#541B28] group-hover:scale-105"
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Back & Skip */}
          <div className="flex items-center justify-between pt-6 border-t border-[#541B28]/10">
            {currentStepIndex > 0 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="flex items-center gap-2 text-xs text-[#756B6D] hover:text-[#541B28] font-cinzel tracking-luxury uppercase font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#C7A66A]" />
                <span>Question précédente</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleSkip}
              className="text-xs text-[#756B6D] hover:text-[#541B28] underline underline-offset-4 transition-colors font-medium"
            >
              Passer cette question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
