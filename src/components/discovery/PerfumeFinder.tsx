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
import { useLanguage } from "@/context/LanguageContext";

interface QuestionStep {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; value: string; desc?: string }[];
}

const QUESTIONS_BY_LOCALE: Record<"fr" | "ar" | "en", QuestionStep[]> = {
  fr: [
    {
      id: "family",
      question: "Quelles senteurs préférez-vous ?",
      subtitle: "Choisissez l'univers qui vous correspond le plus.",
      options: [
        { label: "Ambrée & Chaude", value: "Amber", desc: "Ambre chaleureux, vanille douce, notes solaires" },
        { label: "Boisée & Élégante", value: "Woody", desc: "Bois de cèdre, oud précieux, vétiver" },
        { label: "Florale & Fraîche", value: "Floral", desc: "Fleur d'oranger, rose délicate, jasmin" },
        { label: "Agrumes & Fraîcheur", value: "Citrus", desc: "Bergamote pétillante, citron d'Italie, mandarine" },
        { label: "Épicée & Envoûtante", value: "Spicy", desc: "Safran oriental, cannelle douce, poivre noir" },
      ],
    },
    {
      id: "intensity",
      question: "Quelle intensité préférez-vous ?",
      subtitle: "Du parfum discret et subtil au sillage très intense et remarqué.",
      options: [
        { label: "Légère & Discrète", value: "Subtle", desc: "Un parfum intime, perceptible uniquement de près" },
        { label: "Équilibrée & Élégante", value: "Balanced", desc: "Idéale au quotidien : présente sans être entêtante" },
        { label: "Intense & Remarquée", value: "Intense", desc: "Un sillage remarquable qui tient toute la journée" },
        { label: "Très Intense & Puissante", value: "Monumental", desc: "Extrait de parfum concentré, tenue exceptionnelle (18h+)" },
      ],
    },
    {
      id: "occasion",
      question: "Pour quelle occasion recherchez-vous ce parfum ?",
      subtitle: "Pour vous accompagner au quotidien ou pour marquer un événement.",
      options: [
        { label: "Pour Tous les Jours", value: "daily", desc: "Votre parfum signature au bureau et en journée" },
        { label: "Soirées & Événements", value: "gala", desc: "Mariages, dîners, réceptions et fêtes" },
        { label: "Rendez-vous Romantiques", value: "romance", desc: "Sensuel, séduisant et captivant" },
        { label: "À Offrir en Cadeau", value: "gift", desc: "Un cadeau d'exception avec écrin offert" },
      ],
    },
    {
      id: "preferredNote",
      question: "Avez-vous un ingrédient ou une note préférée ?",
      subtitle: "L'odeur qui vous fait immédiatement craquer.",
      options: [
        { label: "Safran & Ambre Doré", value: "safran", desc: "Chaleureux, luxueux et gourmand" },
        { label: "Bois d'Olivier & Notes Boisées", value: "olive", desc: "Naturel, noble et réconfortant" },
        { label: "Fleur d'Oranger & Néroli", value: "neroli", desc: "Frais, lumineux et solaire (Nabeul)" },
        { label: "Oud Impérial & Cuir", value: "oud", desc: "Caractère affirmé, profond et royal" },
        { label: "Laissez-vous surprendre", value: "any", desc: "Ouvert à toutes les belles découvertes" },
      ],
    },
  ],
  ar: [
    {
      id: "family",
      question: "ما هي الروائح والعوالم العطرية التي تفضلها؟",
      subtitle: "اختر العائلة العطرية الأقرب إلى ذوقك وشخصيتك.",
      options: [
        { label: "عنبرية ودافئة", value: "Amber", desc: "عنبر دافئ، فانيليا فاخرة ونفحات شمسية جذابة" },
        { label: "خشبية وأنيقة", value: "Woody", desc: "خشب الأرز، عود نقي ونفحات نجيل الهند" },
        { label: "زهرية ومنعشة", value: "Floral", desc: "زهر البرتقال، ورد جوري وياسمين أبيض" },
        { label: "حمضيات منعشة", value: "Citrus", desc: "برغموت فوار، ليمون متوسطي ومندرين" },
        { label: "توابل شرقية آسرة", value: "Spicy", desc: "زعفران أصيل، قرفة ناعمة وفلفل أسود" },
      ],
    },
    {
      id: "intensity",
      question: "ما هي قوة وفوحان العطر التي تبحث عنها؟",
      subtitle: "من الرائحة الهادئة القريبة إلى الفوحان القوي الأخّاذ.",
      options: [
        { label: "خفيفة وهادئة", value: "Subtle", desc: "عطر حميمي ناعم يُشعر به عن قرب" },
        { label: "متوازنة وأنيقة", value: "Balanced", desc: "مثالية للاستخدام اليومي دون إزعاج" },
        { label: "قوية وبارزة", value: "Intense", desc: "فوحان واضح وحضور لافت يدوم كامل اليوم" },
        { label: "مركزة واستثنائية", value: "Monumental", desc: "خلاصة عطرية نقية مع ثبات لا يُضاهى (18+ ساعة)" },
      ],
    },
    {
      id: "occasion",
      question: "لأي مناسبة تختار هذا العطر؟",
      subtitle: "ليرافقك في روتينك اليومي أو لتخليد لحظاتك الخاصة.",
      options: [
        { label: "لكل يوم والعمل", value: "daily", desc: "بصمتك العطرية الدائمة في المكتب ويومياتك" },
        { label: "السهرات والمناسبات", value: "gala", desc: "الأعرس، العشاء الفاخر والاحتفالات الكبرى" },
        { label: "لقاءات رومانسية خاصة", value: "romance", desc: "جذاب، حسي وساحر للقلوب" },
        { label: "هدية قيمة لشخص مميز", value: "gift", desc: "هدية استثنائية في علبة أسطوانية فاخرة مجانية" },
      ],
    },
    {
      id: "preferredNote",
      question: "هل لديك مكون أو نوتة عطرية مفضلة؟",
      subtitle: "الرائحة التي تأسر حواسك من اللحظة الأولى.",
      options: [
        { label: "الزعفران والعنبر الذهبي", value: "safran", desc: "دفء، فخامة وجاذبية شرقية راقية" },
        { label: "خشب الزيتون والنوتات الخشبية", value: "olive", desc: "أصالة طبيعية ونبل متوسطي" },
        { label: "زهر البرتقال والنيرولي", value: "neroli", desc: "انتعاش مشرق ونقاء حدائق نابل" },
        { label: "العود الملكي والجلد الفاخر", value: "oud", desc: "شخصية قوية وهيبة ملكية عميقة" },
        { label: "دعني أكتشف المفاجأة", value: "any", desc: "منفتح على كل التجارب العطرية الاستثنائية" },
      ],
    },
  ],
  en: [
    {
      id: "family",
      question: "Which scents do you prefer?",
      subtitle: "Choose the olfactory universe that best reflects you.",
      options: [
        { label: "Warm & Amber", value: "Amber", desc: "Solar amber, sweet vanilla, radiant notes" },
        { label: "Woody & Elegant", value: "Woody", desc: "Cedarwood, precious oud, vetiver" },
        { label: "Floral & Fresh", value: "Floral", desc: "Orange blossom, delicate rose, jasmine" },
        { label: "Citrus & Sparkling", value: "Citrus", desc: "Zesty bergamot, Italian lemon, mandarin" },
        { label: "Spicy & Captivating", value: "Spicy", desc: "Eastern saffron, gentle cinnamon, black pepper" },
      ],
    },
    {
      id: "intensity",
      question: "What sillage intensity are you seeking?",
      subtitle: "From a subtle intimate scent to a monumental, lasting sillage.",
      options: [
        { label: "Light & Intimate", value: "Subtle", desc: "A close-to-skin fragrance noticed up close" },
        { label: "Balanced & Elegant", value: "Balanced", desc: "Ideal for daily wear: noticeable yet refined" },
        { label: "Intense & Remarkable", value: "Intense", desc: "A striking sillage that lasts all day" },
        { label: "Very Intense & Monumental", value: "Monumental", desc: "Pure perfume extract with 18h+ longevity" },
      ],
    },
    {
      id: "occasion",
      question: "For what occasion is this fragrance?",
      subtitle: "To elevate your everyday routine or celebrate memorable moments.",
      options: [
        { label: "Daily Signature", value: "daily", desc: "Your signature scent at the office and daytime" },
        { label: "Evening & Events", value: "gala", desc: "Weddings, dinners, galas and celebrations" },
        { label: "Romantic Encounters", value: "romance", desc: "Sensual, alluring and captivating" },
        { label: "As an Exceptional Gift", value: "gift", desc: "Prestige gift with complimentary presentation box" },
      ],
    },
    {
      id: "preferredNote",
      question: "Do you have a favorite olfactory note?",
      subtitle: "The scent that instantly captivates your senses.",
      options: [
        { label: "Saffron & Golden Amber", value: "safran", desc: "Warm, luxurious and enveloping" },
        { label: "Olive Wood & Woody Accords", value: "olive", desc: "Natural, noble and Mediterranean" },
        { label: "Orange Blossom & Neroli", value: "neroli", desc: "Fresh, solar and luminous (Nabeul)" },
        { label: "Imperial Oud & Leather", value: "oud", desc: "Deep character, royal and commanding" },
        { label: "Surprise Me", value: "any", desc: "Open to discovering new signature scents" },
      ],
    },
  ],
};

interface RecommendedItem {
  product: Product;
  matchScore: number;
  reason: string;
}

export function PerfumeFinder() {
  const { t, locale } = useLanguage();
  const { addItem } = useCart();
  const { showToast } = useNotification();

  const questions = QUESTIONS_BY_LOCALE[(locale as "fr" | "ar" | "en")] || QUESTIONS_BY_LOCALE.fr;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedItem[] | null>(null);

  const currentQuestion = questions[currentStepIndex] || questions[0];

  const handleSelectOption = (val: string) => {
    const updated = { ...answers, [currentQuestion.id]: val };
    setAnswers(updated);

    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      triggerRecommendationEngine(updated);
    }
  };

  const handleSkip = () => {
    if (currentStepIndex < questions.length - 1) {
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
    showToast(t("hero.added_toast", "Recommandation ajoutée au panier"), `${product.name} (${fmt.size})`, "luxury");
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
            {t("quiz.analyzing_title", "Recherche de votre parfum idéal...")}
          </h3>
          <p className="text-xs text-[#5A4B4E] max-w-md mb-8">
            {t("quiz.analyzing_desc", "Nous analysons vos réponses pour sélectionner les parfums qui correspondent exactement à vos préférences.")}
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
              <span className="font-cinzel text-[10px] tracking-grand uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                {t("quiz_section.recom_title", "Vos Recommandations Personnalisées")}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-gradient font-light">
              {t("quiz.result_title", "Votre Parfum Idéal")}
            </h2>
            <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] mt-3 max-w-xl mx-auto font-light">
              {t("quiz.result_subtitle", "Voici les créations Lévania sélectionnées sur mesure selon vos goûts.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {recommendations.map(({ product, matchScore, reason }, idx) => (
              <div
                key={product.id}
                className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 p-6 sm:p-7 flex flex-col justify-between hover:border-[#C7A66A] dark:hover:border-[#DFC68B] transition-all duration-300 shadow-sm hover:shadow-2xl group"
              >
                <div>
                  <div className="flex gap-5 items-start">
                    <div className="relative w-28 h-32 rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-[#0E0709] shrink-0 border border-[#541B28]/15 dark:border-[#C7A66A]/20 shadow-inner">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-[10px] tracking-luxury uppercase text-[#541B28] dark:text-[#DFC68B] font-bold">
                          {t("quiz.rank", "Rang")} #{idx + 1}
                        </span>
                        <span className="font-cinzel text-[10px] tracking-wider px-3 py-1 rounded-full bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] font-bold">
                          {matchScore}% {t("quiz.affinity", "affinité")}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#23181A] dark:text-[#FAF7F2] mt-1.5 group-hover:text-[#541B28] dark:group-hover:text-[#DFC68B] transition-colors font-medium">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#756B6D] dark:text-[#A8989C] italic mt-0.5">{product.subtitle}</p>
                      <div className="font-cinzel text-xs text-[#541B28] dark:text-[#DFC68B] font-bold tracking-luxury mt-2.5">
                        {t("quiz.from_price", "Dès")} {formatTND(product.formats[0].priceTND)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A4B4E] dark:text-[#D8CCD0] mt-5 p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#0E0709] border border-[#541B28]/10 dark:border-[#C7A66A]/20 leading-relaxed font-light">
                    &laquo; {reason} &raquo;
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {product.topNotes.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#0E0709] text-[#756B6D] dark:text-[#A8989C] border border-[#541B28]/10 dark:border-[#C7A66A]/20 font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-[#541B28]/15 dark:border-[#C7A66A]/20">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 py-3 text-center rounded-xl border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#1E0D14] font-cinzel text-[10px] tracking-luxury uppercase font-bold transition-colors"
                  >
                    {t("product.consult", "Voir le Parfum")}
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-[2] py-3 px-4 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] font-cinzel text-[10px] tracking-luxury uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66A]" />
                    <span>{t("hero.add_btn", "Ajouter")}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={resetFinder}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#541B28]/25 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] hover:bg-white dark:hover:bg-[#1E0D14] font-cinzel text-xs tracking-luxury uppercase font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>{t("quiz.restart", "Recommencer le Quiz")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step by Step Questionnaire */}
      {!isAnalyzing && !recommendations && (
        <div className="rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 p-8 sm:p-14 shadow-2xl relative">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-10 pb-5 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20">
            <span className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] dark:text-[#DFC68B] font-bold">
              {t("quiz.step_prefix", "Étape")} {currentStepIndex + 1} {t("quiz.step_of", "sur")} {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStepIndex
                      ? "bg-[#541B28] dark:bg-[#DFC68B] w-12"
                      : i < currentStepIndex
                      ? "bg-[#C7A66A]"
                      : "bg-[#EAE1D2] dark:bg-[#2A131E]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl text-[#23181A] dark:text-[#FAF7F2] font-light leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-[#5A4B4E] dark:text-[#D8CCD0] mt-3 font-light leading-relaxed">{currentQuestion.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3.5 mb-10">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-[#541B28]/10 dark:bg-[#C7A66A]/15 border-[#541B28] dark:border-[#DFC68B] text-[#23181A] dark:text-[#FAF7F2] shadow-md ring-1 ring-[#541B28]/30 dark:ring-[#DFC68B]/30"
                      : "bg-[#FAF7F2] dark:bg-[#14080D] border-[#541B28]/15 dark:border-[#C7A66A]/20 text-[#23181A] dark:text-[#FAF7F2] hover:border-[#541B28] dark:hover:border-[#DFC68B] hover:bg-white dark:hover:bg-[#1C0D15] hover:shadow-md"
                  }`}
                >
                  <div className="pr-4 rtl:pr-0 rtl:pl-4">
                    <h4 className="font-serif font-medium text-base text-[#23181A] dark:text-[#FAF7F2] group-hover:text-[#541B28] dark:group-hover:text-[#DFC68B] transition-colors">
                      {opt.label}
                    </h4>
                    {opt.desc && (
                      <p className="text-xs text-[#756B6D] dark:text-[#A8989C] mt-1 font-light leading-relaxed">{opt.desc}</p>
                    )}
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ml-4 rtl:ml-0 rtl:mr-4 transition-all ${
                      isSelected
                        ? "border-[#541B28] dark:border-[#DFC68B] bg-[#541B28] dark:bg-[#DFC68B] text-[#FAF7F2] dark:text-[#23181A] shadow-sm"
                        : "border-[#756B6D]/40 dark:border-[#C7A66A]/30 group-hover:border-[#541B28] dark:group-hover:border-[#DFC68B] group-hover:scale-105"
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 rtl:rotate-180" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Back & Skip */}
          <div className="flex items-center justify-between pt-6 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
            {currentStepIndex > 0 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="flex items-center gap-2 text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] font-cinzel tracking-luxury uppercase font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#C7A66A] rtl:rotate-180" />
                <span>{t("quiz.prev_question", "Question précédente")}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleSkip}
              className="text-xs text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] underline underline-offset-4 transition-colors font-medium cursor-pointer"
            >
              {t("quiz.skip_question", "Passer cette question")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
