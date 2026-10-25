import { Product, Collection } from "@/types";
import { Locale } from "./translations";

interface LocalizedProductInfo {
  name?: string;
  subtitle: string;
  collection: string;
  description: string;
  sensoryProfile: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  occasions?: string[];
}

const PRODUCT_LOCALES: Record<string, Record<"ar" | "en", LocalizedProductInfo>> = {
  "lev-01": {
    ar: {
      name: "أوند دور",
      subtitle: "خلاصة عطرية نقية ومركزة",
      collection: "المجموعة التوقيع",
      description: "موجة سائلة من الذهب الخالص تلامس البشرة بدفء مغناطيسي آسر. يجسد أوند دور كمال وتألق دار ليفانيا العطرية في زجاجة فخمة متوجة بالختم المنقوش.",
      sensoryProfile: "دافئ، عنبري متلألئ، محيط بالأحاسيس وعميق الأثر.",
      topNotes: ["برغموت كالابريا", "زعفران شرقي", "توت وردي"],
      heartNotes: ["ورد دمشقي", "تونكا فاخرة", "خشب أرز الأطلس"],
      baseNotes: ["عنبر شمسي", "فانيليا بوربون", "عود داكن", "مسك أبيض"],
      occasions: ["أمسيات فاخرة", "لحظات استثنائية", "بصمة شخصية"],
    },
    en: {
      name: "Onde d'Or",
      subtitle: "Pure Absolu Perfume Extract",
      collection: "The Signature Collection",
      description: "A liquid wave of pure gold that caresses the skin with magnetic warmth. Onde d'Or embodies the radiance and fullness of artisanal haute parfumerie Lévania, sculpted in a numbered flacon adorned with the burgundy and gold monogrammed seal.",
      sensoryProfile: "Warm, sparkling amber, enveloping and profoundly memorable.",
      topNotes: ["Calabrian Bergamot", "Eastern Saffron", "Pink Peppercorn"],
      heartNotes: ["Damascus Rose", "Chiseled Tonka Bean", "Atlas Cedarwood"],
      baseNotes: ["Solar Amber", "Bourbon Vanilla", "Dark Oud", "White Musk"],
      occasions: ["Gala Evenings", "Exceptional Moments", "Personal Signature"],
    },
  },
  "lev-02": {
    ar: {
      name: "سيّاج دوليفيي",
      subtitle: "ماء عطر نفيس وخالد",
      collection: "المجموعة التوقيع",
      description: "تحية إجلال لأشجار الزيتون المتوسطية المعمرة المغتسلة بنور الشمس الذهبي. عطر خشبي أروماتي نبيل، هادئ ومتقن الصنع، في علبته الأسطوانية الزيتونية التوقيع.",
      sensoryProfile: "خشبي أخضر، نبيل، راقٍ وبثبات فائق.",
      topNotes: ["أوراق زيتون نضرة", "مندرين أخضر", "هيل"],
      heartNotes: ["خشب زيتون معمر", "خزامى برية", "سوسن فلورنسا"],
      baseNotes: ["نجيل هند هايتي", "جلد ناعم", "طحلب السنديان", "صندل أبيض"],
      occasions: ["يوميات راقية", "لقاءات عمل", "الربيع والخريف"],
    },
    en: {
      name: "Sillage d'Olivier",
      subtitle: "Precious Eau de Parfum",
      collection: "The Signature Collection",
      description: "A tribute to Mediterranean olive groves bathed in golden light. A noble, serene and textured woody aromatic fragrance housed in its signature olive green cylinder case.",
      sensoryProfile: "Green woody, noble, refined with remarkable longevity.",
      topNotes: ["Crushed Olive Leaves", "Green Mandarin", "Cardamom"],
      heartNotes: ["Centenary Olive Wood", "Wild Lavender", "Florentine Iris"],
      baseNotes: ["Haitian Vetiver", "Soft Leather", "Oakmoss", "White Sandalwood"],
      occasions: ["Daily Elegance", "Business Meetings", "Spring & Autumn"],
    },
  },
  "lev-03": {
    ar: {
      name: "نيرولي فلوتان",
      subtitle: "ماء عطر منعش ومشرق",
      collection: "الأمواج الحريرية",
      description: "نسيم ربيعي منعش من حدائق زهر البرتقال في نابل. نيرولي نقي يطفو على موجة بيضاء ناعمة من المسك والياسمين ليعطيك إحساسًا استثنائيًا بالنقاء والأناقة.",
      sensoryProfile: "منعش، زهري شمسي، نقي ومضيء.",
      topNotes: ["نيرولي نابل النقي", "بيتي غران"],
      heartNotes: ["زهر البرتقال", "ياسمين أبيض"],
      baseNotes: ["مسك أبيض قطني", "أخشاب بيضاء"],
      occasions: ["صباحات الصيف", "الاسترخاء", "الانتعاش اليومي"],
    },
    en: {
      name: "Néroli Flottant",
      subtitle: "Fresh & Solar Eau de Parfum",
      collection: "Silken Wave",
      description: "A crisp spring breeze through the orange groves of Nabeul. Pure neroli floats on a gentle white wave of musk and jasmine, evoking irresistible cleanliness and Mediterranean sunshine.",
      sensoryProfile: "Fresh, solar floral, clean and luminous.",
      topNotes: ["Pure Nabeul Neroli", "Petitgrain"],
      heartNotes: ["Orange Blossom", "White Jasmine"],
      baseNotes: ["Cotton White Musk", "Clear Woods"],
      occasions: ["Summer Mornings", "Relaxation", "Daily Refreshment"],
    },
  },
  "lev-04": {
    ar: {
      name: "عود إمبريال",
      subtitle: "خلاصة عطرية خشبية فاخرة",
      collection: "الأمواج الداكنة والخشبية",
      description: "عطر ملكي مهيب يجمع بين العود الكمبودي النادر والجلد الفاخر ونفحات البخور العماني. حضور فائق وأثر استثنائي يدوم لأكثر من 18 ساعة.",
      sensoryProfile: "خشبي مدخن، مهيب، عميق وذو أثر لا يُنسى.",
      topNotes: ["بخور عماني", "فلفل أسود"],
      heartNotes: ["عود كمبودي نادر", "جلد قرطبي"],
      baseNotes: ["عنبر رمادي", "تبغ أشقر"],
      occasions: ["المناسبات الكبرى", "الأمسيات الشتوية", "الهيبة والحضور"],
    },
    en: {
      name: "Oud Impérial",
      subtitle: "Intense Woody Extrait de Parfum",
      collection: "Dark & Woody Wave",
      description: "A regal fragrance uniting rare Cambodian oud, fine leather and royal incense. A monumental presence that lingers effortlessly for over 18 hours.",
      sensoryProfile: "Smoky woody, majestic, deep and memorable.",
      topNotes: ["Omani Incense", "Black Pepper"],
      heartNotes: ["Cambodian Oud", "Cordovan Leather"],
      baseNotes: ["Ambergris", "Blonde Tobacco"],
      occasions: ["Grand Occasions", "Winter Evenings", "Executive Presence"],
    },
  },
  "lev-05": {
    ar: {
      name: "روز ديفر",
      subtitle: "خلاصة عطرية زهرية دافئة",
      collection: "الأمواج الحريرية",
      description: "وردة دمشقية متجمدة تحت أشعة الشمس الشتوية تذوب في بلسم دافئ من العنبر وخشب الكشمير.",
      sensoryProfile: "زهري مخملي، دافئ، جذاب وأنيق.",
      topNotes: ["بتلات الورد", "فلفل وردي"],
      heartNotes: ["ورد دمشقي نقي", "زعفران ناعم"],
      baseNotes: ["عنبر ذهبي", "كشمير", "باتشولي"],
      occasions: ["الأمسيات الرومانسية", "فصل الشتاء", "عشاء خاص"],
    },
    en: {
      name: "Rose d'Hiver",
      subtitle: "Warm Floral Extrait de Parfum",
      collection: "Silken Wave",
      description: "A frosted Damascus rose bathed in winter sunlight, melting into warm balsam, amber, and cashmere wood.",
      sensoryProfile: "Velvety floral, warm, alluring and elegant.",
      topNotes: ["Rose Petals", "Pink Pepper"],
      heartNotes: ["Pure Damascus Rose", "Gentle Saffron"],
      baseNotes: ["Golden Amber", "Cashmere Wood", "Patchouli"],
      occasions: ["Romantic Evenings", "Winter Season", "Fine Dining"],
    },
  },
  "lev-06": {
    ar: {
      name: "عنبر فلوفيال",
      subtitle: "ماء عطر عنبري عميق",
      collection: "المجموعة التوقيع",
      description: "تيار مائي من العنبر الدافئ والبنزوين مع لمسات فانيليا مدغشقر وجوزة الطيب.",
      sensoryProfile: "عنبري راتنجي، غني وناعم.",
      topNotes: ["جوزة الطيب", "قرفة سيلانية"],
      heartNotes: ["عنبر راتنجي", "بنزوين لاوس"],
      baseNotes: ["فانيليا مدغشقر", "خشب الصندل"],
      occasions: ["فصل الخريف", "جلسات مسائية", "دفء شخصي"],
    },
    en: {
      name: "Ambre Fluvial",
      subtitle: "Deep Amber Eau de Parfum",
      collection: "The Signature Collection",
      description: "A river of warm amber and benzoin laced with Madagascar vanilla and aromatic nutmeg.",
      sensoryProfile: "Resinous amber, opulent and smoothly comforting.",
      topNotes: ["Nutmeg", "Ceylon Cinnamon"],
      heartNotes: ["Resinous Amber", "Laotian Benzoin"],
      baseNotes: ["Madagascar Vanilla", "Sandalwood"],
      occasions: ["Autumn Season", "Cozy Evenings", "Personal Comfort"],
    },
  },
  "lev-07": {
    ar: {
      name: "ياسمين نابل",
      subtitle: "خلاصة الياسمين التونسي الأصيل",
      collection: "الأمواج الحريرية",
      description: "قطاف الفجر من حقول الياسمين الأبيض في نابل، ممزوج بنفحات المسك والمسك الرومي.",
      sensoryProfile: "زهري أبيض ناصع، حسي ورقيق.",
      topNotes: ["برغموت", "أوراق خضراء"],
      heartNotes: ["ياسمين سامباك", "مسك الروم"],
      baseNotes: ["مسك أبيض", "خشب الأرز"],
      occasions: ["الربيع", "الأفراح التونسية", "إشراقة النهار"],
    },
    en: {
      name: "Jasmin de Nabeul",
      subtitle: "Authentic Tunisian Jasmine Extract",
      collection: "Silken Wave",
      description: "Dawn harvest of white jasmine from Nabeul fields, embraced by crystalline musk and tuberose.",
      sensoryProfile: "Pure white floral, sensual and delicate.",
      topNotes: ["Bergamot", "Green Leaves"],
      heartNotes: ["Jasmine Sambac", "Tuberose"],
      baseNotes: ["White Musk", "Cedar"],
      occasions: ["Springtime", "Tunisian Weddings", "Radiant Days"],
    },
  },
  "lev-08": {
    ar: {
      name: "جلد قرطاج",
      subtitle: "خلاصة جلدية وتوابل قرطاجية",
      collection: "الأمواج الداكنة والخشبية",
      description: "استحضار لفخامة موانئ وأسواق قرطاج التاريخية. جلد ناعم مشبع بالمر والزعفران وخشب العرعر.",
      sensoryProfile: "جلدي، ترابي، مهيب وعميق.",
      topNotes: ["عرعر بري", "زعفران قرطاجي"],
      heartNotes: ["جلد أندلسي", "مر"],
      baseNotes: ["بتولا مدخنة", "عنبر أسود"],
      occasions: ["القمم واللقاءات الرسمية", "الشتاء", "حضور قوي"],
    },
    en: {
      name: "Cuir de Carthage",
      subtitle: "Carthaginian Leather & Spice Extract",
      collection: "Dark & Woody Wave",
      description: "Evoking the ancient splendor of Carthaginian ports. Supple leather steeped in myrrh, saffron, and wild juniper.",
      sensoryProfile: "Leathery, smoky, earthy, and commanding.",
      topNotes: ["Wild Juniper", "Carthaginian Saffron"],
      heartNotes: ["Andalusian Leather", "Myrrh"],
      baseNotes: ["Smoky Birch", "Black Amber"],
      occasions: ["Formal Galas", "Winter", "Unmistakable Presence"],
    },
  },
  "lev-09": {
    ar: {
      name: "فلور دو سيل",
      subtitle: "ماء عطر بحري ومعدني",
      collection: "الأمواج الحريرية",
      description: "رذاذ البحر الأبيض المتوسط على بلورات الملح الصافي في المهدية، متناغم مع المريمية والمسك.",
      sensoryProfile: "بحري مالح، منعش ومريح.",
      topNotes: ["ملح البحر", "جريب فروت"],
      heartNotes: ["مريمية", "أعشاب بحرية"],
      baseNotes: ["خشب طافي", "مسك شفاف"],
      occasions: ["أيام الصيف الحارة", "الشاطئ", "انتعاش مطلق"],
    },
    en: {
      name: "Fleur de Sel",
      subtitle: "Marine & Mineral Eau de Parfum",
      collection: "Silken Wave",
      description: "Mediterranean sea spray on pristine sea salt crystals of Mahdia, harmonious with coastal sage and musk.",
      sensoryProfile: "Salty marine, airy and rejuvenating.",
      topNotes: ["Sea Salt", "Grapefruit"],
      heartNotes: ["Coastal Sage", "Seaweed Extract"],
      baseNotes: ["Driftwood", "Sheer Musk"],
      occasions: ["Hot Summer Days", "Coastal Escapes", "Pure Freshness"],
    },
  },
  "lev-10": {
    ar: {
      name: "صندل سيليست",
      subtitle: "خلاصة الصندل الأثيري",
      collection: "المجموعة التوقيع",
      description: "صندل أبيض حليبي دافئ يعانق حبوب الهيل واللبان المقدس في تناغم روحي هادئ.",
      sensoryProfile: "صندل كريمي، خشبي ناعم ومهدئ.",
      topNotes: ["هيل أخضر", "زنجبيل ناعم"],
      heartNotes: ["صندل ميسور الحليبي", "لبان"],
      baseNotes: ["خشب الكشمير", "فانيليا كوتون"],
      occasions: ["التأمل", "الأناقة اليومية", "كل الفصول"],
    },
    en: {
      name: "Santal Céleste",
      subtitle: "Ethereal Sandalwood Extract",
      collection: "The Signature Collection",
      description: "Creamy milky sandalwood wrapped in gentle green cardamom and sacred frankincense in serene harmony.",
      sensoryProfile: "Creamy sandalwood, softly woody and comforting.",
      topNotes: ["Green Cardamom", "Mild Ginger"],
      heartNotes: ["Milky Mysore Sandalwood", "Frankincense"],
      baseNotes: ["Cashmere Wood", "Cotton Vanilla"],
      occasions: ["Serenity", "Daily Elegance", "All Seasons"],
    },
  },
};

const COLLECTION_LOCALES: Record<string, Record<"ar" | "en", { name: string; tagline: string; description: string }>> = {
  signature: {
    ar: {
      name: "المجموعة التوقيع",
      tagline: "الأناقة الانسيابية للنوتات النبيلة",
      description: "جوهر دار ليفانيا للعطور. إبداعات عطرية خالدة تمزج بين العنبر الثمين والأخشاب النادرة والبلسم الشرقي الأصيل.",
    },
    en: {
      name: "The Signature Collection",
      tagline: "Fluid elegance of noble accords",
      description: "The quintessence of Lévania Parfums. Timeless creations uniting precious amber, rare woods, and oriental balsams.",
    },
  },
  soyeuse: {
    ar: {
      name: "الأمواج الحريرية",
      tagline: "رقة زهرية وانتعاش مشرق",
      description: "موجة من النعومة الأثيرية. بتلات النيرولي من نابل، الياسمين الأبيض، والمسك الحريري مع نسيم البحر الأبيض المتوسط.",
    },
    en: {
      name: "Silken Wave",
      tagline: "Floral delicacy and luminous freshness",
      description: "A wave of airy gentleness. Nabeul neroli petals, white jasmine, silken musk, and Mediterranean sea breeze.",
    },
  },
  intense: {
    ar: {
      name: "الأمواج الداكنة والخشبية",
      tagline: "قوة أصيلة وأثر مغناطيسي مهيب",
      description: "التعبير الجريء عن سحر الليل. عود مدخن، جلد فاخر، توابل مشتعلة وعنبر رمادي بفوحان أسطوري.",
    },
    en: {
      name: "Dark & Woody Wave",
      tagline: "Earthy power and magnetic presence",
      description: "The bold expression of the night. Smoky oud, vintage leather, warm spices, and monumental ambergris.",
    },
  },
};

/**
 * Returns a localized clone of a single Product according to current locale.
 */
export function getLocalizedProduct(product: Product, locale: Locale): Product {
  if (locale === "fr") return product;

  const locInfo = PRODUCT_LOCALES[product.id]?.[locale];
  if (!locInfo) return product;

  return {
    ...product,
    name: locInfo.name || product.name,
    subtitle: locInfo.subtitle || product.subtitle,
    collection: locInfo.collection || product.collection,
    description: locInfo.description || product.description,
    sensoryProfile: locInfo.sensoryProfile || product.sensoryProfile,
    topNotes: locInfo.topNotes || product.topNotes,
    heartNotes: locInfo.heartNotes || product.heartNotes,
    baseNotes: locInfo.baseNotes || product.baseNotes,
    occasions: locInfo.occasions || product.occasions,
  };
}

/**
 * Returns a localized list of products.
 */
export function getLocalizedProducts(products: Product[], locale: Locale): Product[] {
  if (locale === "fr") return products;
  return products.map((p) => getLocalizedProduct(p, locale));
}

/**
 * Returns a localized clone of a Collection according to current locale.
 */
export function getLocalizedCollection(collection: Collection, locale: Locale): Collection {
  if (locale === "fr") return collection;

  const locInfo = COLLECTION_LOCALES[collection.slug]?.[locale];
  if (!locInfo) return collection;

  return {
    ...collection,
    name: locInfo.name || collection.name,
    tagline: locInfo.tagline || collection.tagline,
    description: locInfo.description || collection.description,
  };
}

/**
 * Returns a localized list of Collections.
 */
export function getLocalizedCollections(collections: Collection[], locale: Locale): Collection[] {
  if (locale === "fr") return collections;
  return collections.map((c) => getLocalizedCollection(c, locale));
}
