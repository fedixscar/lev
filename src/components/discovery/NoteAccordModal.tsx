"use client";

import React, { useEffect, useCallback } from "react";
import { X, MapPin, Droplets, Clock, ShieldCheck } from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import { getOlfactoryNoteDetail, OlfactoryNoteDetail } from "@/lib/olfactoryNotes";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { useLanguage } from "@/context/LanguageContext";

interface NoteAccordModalProps {
  note: string | null;
  layer: "tête" | "cœur" | "fond" | null;
  onClose: () => void;
}

const LOCALIZED_NOTES: Record<string, Record<"ar" | "en", Partial<OlfactoryNoteDetail>>> = {
  "bergamote": {
    ar: { name: "برغموت كالابريا", family: "حمضيات مشعة", origin: "هضاب كالابريا المشمسة، إيطاليا", extraction: "عصر ميكانيكي بارد لقشور الثمار الطازجة", description: "انطلاقة منعشة فوارة وحمضية تمنح إشراقة شمسية فورية.", holdingTime: "1 إلى 2 ساعة في الافتتاحية", resonance: "تناغم شمسي وحيوي" },
    en: { name: "Calabrian Bergamot", family: "Luminous Citrus", origin: "Sunny plateaus of Calabria, Italy", extraction: "Cold mechanical expression of fresh peels", description: "A sparkling, zesty burst imparting immediate solar radiance.", holdingTime: "1 to 2 hours in head notes", resonance: "Solar & Lively Accord" },
  },
  "néroli": {
    ar: { name: "نيرولي الوطن القبلي النفيس", family: "زهري حمضي وعسلي", origin: "بساتين نابل العريقة، تونس", extraction: "تقطير لطيف ببخار الماء لزهور النارنج المقطوفة فجرًا", description: "زهر أبيض ناصع النقاء تداعبه نسائم البحر المتوسط بنفحات عذبة وأثيرية.", holdingTime: "2 إلى 3 ساعات", resonance: "موجة حريرية نقية" },
    en: { name: "Precious Cap Bon Neroli", family: "Citrus Floral & Honeyed", origin: "Centenary groves of Nabeul, Tunisia", extraction: "Gentle steam distillation of dawn-harvested bitter orange blossom", description: "White flower of pristine purity caressed by Mediterranean sea breezes.", holdingTime: "2 to 3 hours", resonance: "Pure Silken Wave" },
  },
  "fleur d'oranger": {
    ar: { name: "خلاصة زهر البرتقال", family: "زهري أبيض حسي", origin: "حوض نابل والوطن القبلي، تونس", extraction: "استخلاص نقي بالمذيبات العضوية ثم التصفية في كحول نقي", description: "قلب دافئ ومحيط يمنح البشرة راحة وجاذبية لا تُقاوم.", holdingTime: "4 إلى 6 ساعات في القلب", resonance: "تناغم ذهبي سماوي" },
    en: { name: "Orange Blossom Absolu", family: "Sensual White Floral", origin: "Nabeul & Cap Bon basin, Tunisia", extraction: "Solvent extraction followed by pure alcohol refinement", description: "Enveloping and generous, offering a warm comforting heart notes.", holdingTime: "4 to 6 hours in heart", resonance: "Celestial Golden Harmony" },
  },
  "rose": {
    ar: { name: "ورد دمشقي ملكي", family: "زهري خشبي عميق", origin: "هضاب دمشق العريقة والمرتفعات", extraction: "تقطير مزدوج في أوانٍ نحاسية تقليدية", description: "ملكة العطور بلا منازع: بتلات مخملية بنفحات عسلية وتوابل لطيفة.", holdingTime: "6 إلى 8 ساعات في القلب", resonance: "أثر إمبراطوري فاخر" },
    en: { name: "Royal Damascus Rose", family: "Dark Woody Floral", origin: "Damascus plateaus & highlands", extraction: "Double distillation in traditional copper alembics", description: "The undisputed queen of perfumery: velvety petals with honeyed accents.", holdingTime: "6 to 8 hours in heart", resonance: "Imperial Sillage" },
  },
  "oud": {
    ar: { name: "عود كمبودي نادر وطبيعي", family: "خشبي مدخن مهيب", origin: "غابات كمبوديا العتيقة", extraction: "تقطير تقليدي طويل الأمد لأخشاب العود المعمرة", description: "خشب أسطوري مهيب بلمسات جلدية وبخورية تمنح حضورًا لا يُنسى.", holdingTime: "18+ ساعة في القاعدة", resonance: "الموجة الداكنة الأسطورية" },
    en: { name: "Wild Cambodian Oud", family: "Majestic Smoky Woody", origin: "Ancient Cambodian forests", extraction: "Traditional long-maceration distillation of aged agarwood", description: "Legendary majestic wood with leather and incense facets.", holdingTime: "18+ hours in base", resonance: "Monumental Dark Wave" },
  },
  "ambre": {
    ar: { name: "عنبر شمسي دافئ", family: "عنبري راتنجي غني", origin: "شواطئ البحر الأبيض المتوسط", extraction: "نقع وتعتيق بطيء للمواد العنبرية الطبيعية", description: "دفء مغناطيسي مشع يندمج مع البشرة ليمنح ثباتًا استثنائيًا.", holdingTime: "14 إلى 18 ساعة", resonance: "الموجة التوقيع الذهبية" },
    en: { name: "Solar Amber", family: "Rich Resinous Amber", origin: "Mediterranean shores", extraction: "Slow infusion and aging of natural amber resins", description: "Magnetic radiant warmth that merges intimately with the skin.", holdingTime: "14 to 18 hours", resonance: "Golden Signature Wave" },
  },
  "safran": {
    ar: { name: "زعفران شرقي نقي", family: "تابلي دافئ ومذهب", origin: "واحات الشرق وحوض المتوسط", extraction: "تجفيف يدوي دقيق للشعيرات الحمراء الذهبية", description: "الذهب الأحمر للشرق يضفي لمسة توابل راقية ودفئًا ملكيًا.", holdingTime: "3 إلى 5 ساعات", resonance: "بريق ذهبي شرقي" },
    en: { name: "Eastern Saffron", family: "Warm Golden Spicy", origin: "Eastern oases & Mediterranean", extraction: "Artisanal hand-drying of red-gold stigmas", description: "Red gold of the Orient imparting spicy luxury and regal warmth.", holdingTime: "3 to 5 hours", resonance: "Eastern Golden Radiance" },
  },
  "olivier": {
    ar: { name: "خشب الزيتون المعمر", family: "خشبي نبيل وأخضر", origin: "أشجار زيتون معمرة من الساحل والوطن القبلي", extraction: "استخلاص ميكانيكي لزيوت الخشب الصمغي", description: "تحية إجلال لأشجار الزيتون التونسية، قوام خشبي دافئ وأصيل.", holdingTime: "10 إلى 14 ساعة", resonance: "أصالة تونسية خالدة" },
    en: { name: "Centenary Olive Wood", family: "Noble Green Woody", origin: "Centenary olive trees of Cap Bon & Sahel", extraction: "Mechanical extraction of resinous wood essences", description: "Tribute to Tunisian heritage: structured, warm, textured wood.", holdingTime: "10 to 14 hours", resonance: "Timeless Tunisian Nobility" },
  },
  "vanille": {
    ar: { name: "فانيليا بوربون مدغشقر", family: "بلسمي ناعم وغورماند", origin: "مزارع مدغشقر الاستوائية", extraction: "استخلاص بطيء لقرون الفانيليا السوداء الناضجة", description: "حلاوة راقية ومستديرة تخفف من حدة الأخشاب وتزيد الجاذبية.", holdingTime: "12 إلى 16 ساعة", resonance: "عذوبة حريرية آسرة" },
    en: { name: "Bourbon Vanilla", family: "Gourmand Soft Balsamic", origin: "Tropical plantations of Madagascar", extraction: "Slow extraction of mature black vanilla pods", description: "Sophisticated sweetness tempering woods and heightening allure.", holdingTime: "12 to 16 hours", resonance: "Enchanting Silken Sweetness" },
  },
  "musc": {
    ar: { name: "مسك أبيض قطني نقي", family: "مسكي بودري ناعم", origin: "مختبرات العطور الراقية", extraction: "جزيئات مسكية نقية عالية الثبات", description: "شعور لا يُقاوم بالنظافة والأناقة، كالحرير المغسول تحت أشعة الشمس.", holdingTime: "14+ ساعة في القاعدة", resonance: "صفاء حريري مستدام" },
    en: { name: "Cotton White Musk", family: "Soft Powdery Musky", origin: "Haute Parfumerie laboratories", extraction: "Pure high-fixation musk molecules", description: "Irresistible clean-skin sensation, reminiscent of fresh linen in the sun.", holdingTime: "14+ hours in base", resonance: "Enduring Silken Serenity" },
  },
};

function getLocalizedNoteDetail(rawNote: string, locale: "fr" | "ar" | "en"): OlfactoryNoteDetail {
  const base = getOlfactoryNoteDetail(rawNote);
  if (locale === "fr") return base;

  const lower = rawNote.toLowerCase();
  for (const [key, locMap] of Object.entries(LOCALIZED_NOTES)) {
    if (lower.includes(key)) {
      const match = locMap[locale];
      if (match) {
        return {
          ...base,
          ...match,
          name: match.name || base.name,
        };
      }
    }
  }

  if (locale === "ar") {
    return {
      ...base,
      family: "توليفة نادرة من العطور الراقية",
      origin: "مختارات نادرة من بساتين المتوسط والشرق",
      extraction: "تقطير يدوي فائق الدقة في أوانٍ معتقة",
      description: "مادة أولية اختارها كبير صانعي عطور ليفانيا لبريقها الاستثنائي وتناغمها التام مع تركيبة العطر.",
      holdingTime: "6 إلى 14 ساعة من الفوحان النشط",
      resonance: "تناغم ليفانيا الحصري",
    };
  }

  return {
    ...base,
    family: "Rare Haute Parfumerie Accord",
    origin: "Exclusive selection from Mediterranean & Oriental terroirs",
    extraction: "Precision artisanal distillation in noble barrels",
    description: "Raw essence handpicked by Lévania Master Perfumer for singular radiance and harmonious synergy.",
    holdingTime: "6 to 14 hours active diffusion",
    resonance: "Exclusive Lévania Harmony",
  };
}

export function NoteAccordModal({ note, layer, onClose }: NoteAccordModalProps) {
  const { t, locale } = useLanguage();
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (note) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [note, handleKeyDown]);

  if (!note) return null;

  const detail = getLocalizedNoteDetail(note, locale);

  const layerLabel =
    layer === "tête"
      ? t("note_modal.head_label", "Note de Tête • L'Éveil (Première Impression)")
      : layer === "cœur"
      ? t("note_modal.heart_label", "Note de Cœur • L'Âme du Sillage (Signature Centrale)")
      : layer === "fond"
      ? t("note_modal.base_label", "Note de Fond • L'Empreinte (Tenue Inoubliable)")
      : t("note_modal.raw_material", "Matière Première • Haute Parfumerie");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#541B28]/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#23181A] overflow-hidden"
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#C7A66A]/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-[#541B28]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t("aria.close", "Fermer")}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#541B28] border border-[#541B28]/20 transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#541B28] text-[#FAF7F2] font-cinzel text-[10px] uppercase tracking-luxury font-bold">
            <GoldStarLozenge size={10} className="text-[#DFC68B]" />
            <span dangerouslySetInnerHTML={{ __html: layerLabel }} />
          </div>
          <span className="font-cinzel text-[10px] px-3 py-1.5 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/40 text-[#541B28] font-bold uppercase tracking-luxury">
            {detail.family}
          </span>
        </div>

        {/* Note Title & Seal */}
        <div className="flex items-start gap-4 mb-5">
          <WaveMonogram size="sm" variant="gold" withSeal />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#756B6D] font-mono block">
              {t("note_modal.raw_material", "Matière Première • Haute Parfumerie")}
            </span>
            <h3 id="note-modal-title" className="font-serif text-2xl sm:text-3xl text-[#541B28] font-semibold">
              {detail.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5A4B4E] leading-relaxed mb-6 bg-white/80 p-3.5 rounded-xl border border-[#541B28]/10">
          {detail.description}
        </p>

        {/* Information Grid */}
        <div className="space-y-3">
          {/* Terroir / Origin */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
            <div className="p-2 rounded-lg bg-[#541B28]/10 text-[#541B28] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                {t("note_modal.origin", "Terroir d'Origine")}
              </span>
              <span className="text-xs font-semibold text-[#23181A]">{detail.origin}</span>
            </div>
          </div>

          {/* Extraction Method */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
            <div className="p-2 rounded-lg bg-[#C7A66A]/20 text-[#541B28] shrink-0">
              <Droplets className="w-4 h-4 text-[#541B28]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] font-bold block">
                {t("note_modal.extraction", "Méthode d'Extraction")}
              </span>
              <span className="text-xs text-[#23181A]">{detail.extraction}</span>
            </div>
          </div>

          {/* Holding Time & Sillage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
              <Clock className="w-4 h-4 text-[#541B28] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#756B6D] font-bold block">
                  {t("note_modal.holding_time", "Tenue Active")}
                </span>
                <span className="text-xs font-bold text-[#541B28]">{detail.holdingTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-[#541B28]/10">
              <ShieldCheck className="w-4 h-4 text-[#434B36] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#756B6D] font-bold block">
                  {t("note_modal.wave_harmony", "Harmonie Onde")}
                </span>
                <span className="text-xs font-bold text-[#434B36]">{detail.resonance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-[#541B28]/15 flex items-center justify-between">
          <span className="text-[10px] text-[#756B6D] italic">
            {t("note_modal.house_seal", "Maison Lévania • Alchimie Méditerranéenne")}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            {t("note_modal.close", "Fermer")}
          </button>
        </div>
      </div>
    </div>
  );
}
