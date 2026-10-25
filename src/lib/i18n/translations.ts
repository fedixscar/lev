export type Locale = "fr" | "ar" | "en";

export interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.brand_subtitle": {
    fr: "Haute Parfumerie Tunisienne",
    ar: "دار العطور التونسية الفاخرة",
    en: "Tunisian Haute Parfumerie",
  },
  "nav.shop": {
    fr: "Boutique",
    ar: "المتجر",
    en: "Boutique",
  },
  "nav.collections": {
    fr: "Collections",
    ar: "المجموعات",
    en: "Collections",
  },
  "nav.discover": {
    fr: "Trouver Mon Parfum",
    ar: "اكتشف عطري",
    en: "Find My Perfume",
  },
  "nav.compose": {
    fr: "Coffrets",
    ar: "صناديق الهدايا",
    en: "Gift Boxes",
  },
  "nav.promotions": {
    fr: "Offres du Mois",
    ar: "عروض الشهر",
    en: "Monthly Offers",
  },
  "nav.cart": {
    fr: "Panier",
    ar: "سلة التسوق",
    en: "Shopping Bag",
  },
  "nav.account": {
    fr: "Mon Compte",
    ar: "حسابي",
    en: "My Account",
  },
  "nav.concierge": {
    fr: "Concierge Olfactif",
    ar: "المستشار العطري",
    en: "Scent Concierge",
  },
  "nav.theme_toggle": {
    fr: "Changer de thème",
    ar: "تغيير المظهر",
    en: "Toggle theme",
  },
  "nav.lang_select": {
    fr: "Langue",
    ar: "اللغة",
    en: "Language",
  },

  // Hero Section
  "hero.badge": {
    fr: "Haute Parfumerie Artisanale • Tunisie",
    ar: "صناعة عطور تقليدية فاخرة • تونس",
    en: "Artisanal Haute Parfumerie • Tunisia",
  },
  "hero.title_part1": {
    fr: "L'Élégance du",
    ar: "فخامة الأثر العطري",
    en: "The Elegance of",
  },
  "hero.title_highlight": {
    fr: "Sillage Éternel",
    ar: "الخالد",
    en: "Timeless Sillage",
  },
  "hero.subtitle": {
    fr: "Extraits de parfum d'exception élaborés à la main en Tunisie. Une tenue remarquable et des accords nobles livrés dans un écrin d'apparat numéroté.",
    ar: "خلاصات عطرية استثنائية مصنوعة يدويًا في تونس. ثبات فائق ونوتات ملكية تصلك في علبة فاخرة مرقمة مع شهادة أصالة شخصية.",
    en: "Exceptional handcrafted perfume extracts from Tunisia. Long-lasting performance and noble accords delivered in a numbered luxury case.",
  },
  "hero.cta_explore": {
    fr: "Découvrir Nos Flacons",
    ar: "اكتشف عطورنا",
    en: "Explore Fragrances",
  },
  "hero.cta_finder": {
    fr: "Trouver Mon Sillage (Quiz)",
    ar: "اختبار العطر المناسب",
    en: "Find My Sillage (Quiz)",
  },
  "hero.trust_longevity": {
    fr: "Tenue 12h+ Garantie",
    ar: "ثبات مضمون لأكثر من 12 ساعة",
    en: "12h+ Long-Lasting Guaranteed",
  },
  "hero.trust_free_delivery": {
    fr: "Livraison Offerte dès 200 TND",
    ar: "توصيل مجاني ابتداءً من 200 د.ت",
    en: "Free Delivery over 200 TND",
  },
  "hero.trust_certified": {
    fr: "Certificat QR d'Authenticité",
    ar: "شهادة توثيق برمز QR لكل زجاجة",
    en: "QR Authenticity Certificate",
  },

  // Reassurance Bar
  "reassurance.delivery": {
    fr: "Livraison Express Partout en Tunisie",
    ar: "توصيل سريع لكافة أنحاء تونس (24-48 ساعة)",
    en: "Express Delivery Across Tunisia",
  },
  "reassurance.delivery_sub": {
    fr: "Expédié sous 24h à 48h avec suivi par SMS",
    ar: "تتبع دقيق عبر الرسائل القصيرة",
    en: "Dispatched in 24h to 48h with SMS tracking",
  },
  "reassurance.authenticity": {
    fr: "Certificat d'Authenticité Dédié",
    ar: "شهادة أصالة مخصصة لكل عميل",
    en: "Dedicated Authenticity Certificate",
  },
  "reassurance.authenticity_sub": {
    fr: "Chaque flacon porte votre nom et son QR unique",
    ar: "كل زجاجة محفورة باسمك ورمز QR فريد",
    en: "Every bottle engraved with your name & QR",
  },
  "reassurance.payment": {
    fr: "Paiement à la Livraison ou Carte",
    ar: "الدفع عند الاستلام أو بالبطاقة البنكية",
    en: "Pay on Delivery or Card",
  },
  "reassurance.payment_sub": {
    fr: "Réglez en espèces au livreur en toute sérénité",
    ar: "ادفع نقدًا عند الاستلام بكل أمان وراحة",
    en: "Pay cash upon delivery with total peace of mind",
  },

  // Olfactory Pyramid Stage
  "pyramid.tag": {
    fr: "L'Art de la Pyramide",
    ar: "فن الهرم العطري",
    en: "The Art of the Pyramid",
  },
  "pyramid.title": {
    fr: "La Symphonie Olfactive en Trois Actes",
    ar: "سيمفونية العطر في ثلاث مراحل",
    en: "The Olfactory Symphony in Three Acts",
  },
  "pyramid.subtitle": {
    fr: "Chaque fragrance Lévania évolue au fil des heures sur votre peau pour dévoiler toute sa richesse.",
    ar: "يتطور كل عطر من ليفانيا على بشرتك عبر الساعات ليكشف عن أرقى النغمات العطرية.",
    en: "Every Lévania fragrance unfolds gracefully across hours on your skin to reveal its opulent depth.",
  },
  "pyramid.head": {
    fr: "Tête • L'Onde Initiale",
    ar: "القمة • الانطباع الأول",
    en: "Top • The Initial Wave",
  },
  "pyramid.head_desc": {
    fr: "Première sensation vive et éclatante qui s'exprime dès la vaporisation (0 à 20 minutes).",
    ar: "النفحة الأولى المشرقة التي تبرز فور رش العطر خلال أول عشرين دقيقة.",
    en: "The bright first impression experienced immediately upon spraying (0 to 20 minutes).",
  },
  "pyramid.heart": {
    fr: "Cœur • L'Âme du Parfum",
    ar: "القلب • جوهر العطر",
    en: "Heart • The Soul",
  },
  "pyramid.heart_desc": {
    fr: "Le caractère véritable et l'harmonie florale ou boisée qui s'installe pendant plusieurs heures.",
    ar: "الشخصية الحقيقية والتناغم الزهري والخشبي الذي يستقر لساعات طويلة.",
    en: "The true character and floral or woody harmony lingering for several hours.",
  },
  "pyramid.base": {
    fr: "Fond • L'Empreinte Éternelle",
    ar: "القاعدة • الأثر الخالد",
    en: "Base • The Eternal Sillage",
  },
  "pyramid.base_desc": {
    fr: "Les résines nobles, l'ambre et le bois précieux qui signent votre sillage jusqu'au lendemain.",
    ar: "العنبر الملكي والأخشاب النادرة التي تختم أثرك العطري حتى اليوم التالي.",
    en: "Noble ambers and precious woods leaving an unforgettable trail until the next day.",
  },

  // Best Sellers
  "bestsellers.tag": {
    fr: "Créations Iconiques",
    ar: "إبداعات أيقونية",
    en: "Iconic Creations",
  },
  "bestsellers.title": {
    fr: "Le Podium des Fragrances Lévania",
    ar: "أفضل العطور وأكثرها طلبًا",
    en: "The Lévania Fragrance Podium",
  },
  "bestsellers.view_all": {
    fr: "Voir Toute la Collection",
    ar: "مشاهدة المجموعة كاملة",
    en: "View Entire Collection",
  },

  // Maison Heritage
  "heritage.tag": {
    fr: "Maison Fondée en Tunisie",
    ar: "دار عريقة تأسست في تونس",
    en: "House Founded in Tunisia",
  },
  "heritage.title": {
    fr: "L'Héritage Artisanal Lévania",
    ar: "أصالة الحرفة وحكاية ليفانيا",
    en: "The Lévania Craft Heritage",
  },
  "heritage.p1": {
    fr: "Lévania célèbre les richesses de la Méditerranée et la splendeur des traditions parfumées tunisiennes. De l'oranger de Nabeul aux oliveraies séculaires du Sahel, chaque accord est façonné avec une précision d'orfèvre.",
    ar: "تحتفي دار ليفانيا بخيرات البحر الأبيض المتوسط وتراث العطور التونسية الأصيلة؛ من أزهار نارنج نابل إلى زيتون الساحل العريق، ننسج كل نغمة عطرية بإتقان لا نظير له.",
    en: "Lévania celebrates the riches of the Mediterranean and the grandeur of Tunisian perfumery traditions. From Nabeul neroli to ancient olive groves, every accord is crafted with jeweler-like precision.",
  },
  "heritage.pedestal_title": {
    fr: "L'Écrin Cylindrique Protecteur",
    ar: "أسطوانة الحفظ الملكية الفاخرة",
    en: "The Protective Cylindrical Case",
  },
  "heritage.pedestal_desc": {
    fr: "Nos flacons en verre massif sont protégés par un étui cylindrique scellé à la cire dorée, assurant la préservation optimale de la concentration d'extraits.",
    ar: "تحفظ زجاجاتنا الثقيلة داخل أسطوانة واقية محكمة بختم ذهبي لحماية تركيز الزيوت العطرية من الضوء والحرارة.",
    en: "Our heavy glass flacons are protected by a cylindrical case sealed with golden wax, ensuring optimal preservation of perfume extracts.",
  },

  // Shop & Filters
  "shop.title": {
    fr: "Le Catalogue des Parfums",
    ar: "مجموعة العطور الفاخرة",
    en: "The Fragrance Catalogue",
  },
  "shop.subtitle": {
    fr: "Explorez nos créations par collection, vague d'intensité et notes olfactives.",
    ar: "تصفح إبداعاتنا حسب المجموعة ونوع الموجة والنوتات العطرية.",
    en: "Explore our creations by collection, wave intensity, and olfactory notes.",
  },
  "shop.search_placeholder": {
    fr: "Rechercher un parfum, une note (Oud, Néroli, Ambre)...",
    ar: "ابحث عن عطر أو نوتة (عود، نيرولي، عنبر)...",
    en: "Search perfume or note (Oud, Neroli, Amber)...",
  },
  "shop.filter_all": {
    fr: "Toutes les Vagues",
    ar: "جميع العطور",
    en: "All Fragrances",
  },
  "shop.filter_wood": {
    fr: "Boisé & Oud",
    ar: "خشبي وعود",
    en: "Woody & Oud",
  },
  "shop.filter_fresh": {
    fr: "Frais & Hespéridé",
    ar: "منعش وحمضيات",
    en: "Fresh & Citrus",
  },
  "shop.filter_amber": {
    fr: "Ambré & Cuiré",
    ar: "عنبر وجلود",
    en: "Amber & Leather",
  },
  "shop.add_to_cart": {
    fr: "Ajouter au Panier",
    ar: "أضف إلى السلة",
    en: "Add to Bag",
  },
  "shop.view_details": {
    fr: "Découvrir la Fragrance",
    ar: "تفاصيل العطر",
    en: "View Details",
  },

  // Product Detail
  "product.select_size": {
    fr: "Choisir la Contenance",
    ar: "اختر الحجم",
    en: "Choose Size",
  },
  "product.notes_title": {
    fr: "Pyramide Olfactive Détaillée",
    ar: "الهرم العطري التفصيلي",
    en: "Detailed Olfactory Pyramid",
  },
  "product.sillage_power": {
    fr: "Sillage & Projection",
    ar: "قوة الفوحان والأثر",
    en: "Sillage & Projection",
  },
  "product.longevity": {
    fr: "Tenue sur Peau & Vêtements",
    ar: "الثبات على البشرة والملابس",
    en: "Longevity on Skin & Fabrics",
  },
  "product.custom_engraving": {
    fr: "Certificat et QR Code Personnalisés",
    ar: "شهادة أصالة ورمز QR شخصي باسمك",
    en: "Personalized QR & Engraved Certificate",
  },

  // Cart & Drawer
  "cart.drawer_title": {
    fr: "Votre Panier Lévania",
    ar: "حقيبة تسوق ليفانيا",
    en: "Your Lévania Bag",
  },
  "cart.empty": {
    fr: "Votre panier est actuellement vide",
    ar: "سلة التسوق فارغة حالياً",
    en: "Your bag is currently empty",
  },
  "cart.subtotal": {
    fr: "Sous-total",
    ar: "المجموع الفرعي",
    en: "Subtotal",
  },
  "cart.shipping": {
    fr: "Livraison (Tunisie)",
    ar: "التوصيل (تونس)",
    en: "Shipping (Tunisia)",
  },
  "cart.free": {
    fr: "Offerte",
    ar: "مجاني",
    en: "Free",
  },
  "cart.total": {
    fr: "Total Net",
    ar: "المجموع الصافي",
    en: "Total Amount",
  },
  "cart.checkout_btn": {
    fr: "Finaliser la Commande",
    ar: "تأكيد الطلب الآن",
    en: "Proceed to Checkout",
  },
  "cart.continue_shopping": {
    fr: "Continuer mes Achats",
    ar: "مواصلة التسوق",
    en: "Continue Shopping",
  },
  "cart.luck_earned": {
    fr: "Points de Luck générés",
    ar: "نقاط الحظ المكتسبة",
    en: "Luck Points Earned",
  },

  // Checkout Page
  "checkout.title": {
    fr: "Finaliser Votre Commande",
    ar: "إتمام عملية الشراء",
    en: "Complete Your Order",
  },
  "checkout.subtitle": {
    fr: "Expédition sécurisée sous 24h à 48h partout en Tunisie avec suivi SMS.",
    ar: "شحن سريع وآمن خلال 24 إلى 48 ساعة إلى جميع ولايات الجمهورية التونسية.",
    en: "Secure shipping in 24h to 48h across Tunisia with SMS updates.",
  },
  "checkout.contact_section": {
    fr: "1. Coordonnées du Destinataire",
    ar: "1. بيانات المستلم",
    en: "1. Recipient Information",
  },
  "checkout.full_name": {
    fr: "Nom & Prénom",
    ar: "الاسم واللقب",
    en: "Full Name",
  },
  "checkout.phone": {
    fr: "Numéro de Téléphone (Tunisie)",
    ar: "رقم الهاتف (تونس)",
    en: "Phone Number (Tunisia)",
  },
  "checkout.email": {
    fr: "Adresse Email",
    ar: "البريد الإلكتروني",
    en: "Email Address",
  },
  "checkout.shipping_section": {
    fr: "2. Adresse de Livraison",
    ar: "2. عنوان التوصيل",
    en: "2. Delivery Address",
  },
  "checkout.address": {
    fr: "Rue, Résidence, Appartement",
    ar: "الشارع، الإقامة، الشقة",
    en: "Street, Building, Apartment",
  },
  "checkout.governorate": {
    fr: "Gouvernorat (24 Régions)",
    ar: "الولاية (24 ولاية)",
    en: "Governorate",
  },
  "checkout.city": {
    fr: "Ville / Délégation",
    ar: "المدينة / المعتمدية",
    en: "City / District",
  },
  "checkout.payment_section": {
    fr: "3. Mode de Règlement",
    ar: "3. طريقة الدفع",
    en: "3. Payment Method",
  },
  "checkout.payment_cod": {
    fr: "Paiement à la Livraison",
    ar: "الدفع نقداً عند الاستلام",
    en: "Cash on Delivery",
  },
  "checkout.payment_cod_desc": {
    fr: "Réglez directement en espèces au livreur",
    ar: "ادفع مباشرة عند استلام طلبيتك بكل ثقة",
    en: "Pay cash directly to the courier",
  },
  "checkout.payment_card": {
    fr: "Carte Bancaire Sécurisée",
    ar: "بطاقة بنكية آمنة (SSL)",
    en: "Secure Bank Card",
  },
  "checkout.payment_card_desc": {
    fr: "Paiement crypté SSL instantané",
    ar: "دفع إلكتروني مشفر وفوري",
    en: "Instant encrypted payment",
  },
  "checkout.confirm_btn": {
    fr: "Confirmer la Commande",
    ar: "تأكيد الطلبية",
    en: "Confirm Order",
  },
  "checkout.success_title": {
    fr: "Merci, Votre Commande est Confirmée",
    ar: "شكراً لك، تم تأكيد طلبيتك بنجاح",
    en: "Thank You, Your Order is Confirmed",
  },
  "checkout.success_desc": {
    fr: "Nos maîtres artisans préparent vos flacons avec le plus grand soin.",
    ar: "يعمل خبراؤنا الآن على تحضير زجاجاتك بأقصى درجات العناية والإتقان.",
    en: "Our master artisans are preparing your bottles with the utmost care.",
  },
  "checkout.cert_title": {
    fr: "Certificats QR Flacons Dédiés",
    ar: "شهادات التوثيق الخاصة بزجاجاتك",
    en: "Dedicated Bottle QR Certificates",
  },

  // Wheel & Loyalty
  "wheel.title": {
    fr: "La Roue du Destin Lévania",
    ar: "عجلة الحظ الملكية",
    en: "The Lévania Wheel of Destiny",
  },
  "wheel.subtitle": {
    fr: "Consommez votre solde de Luck pour déclencher la Vague et remporter des flacons ou cadeaux précieux.",
    ar: "استخدم رصيد نقاط الحظ الخاص بك لتدوير العجلة وربح عطور فاخرة وهدايا استثنائية.",
    en: "Spend your Luck balance to trigger the Wave and win luxury bottles and rewards.",
  },
  "wheel.spin_btn": {
    fr: "TOURNER LA ROUE",
    ar: "تدوير العجلة",
    en: "SPIN THE WHEEL",
  },
  "wheel.luck_balance": {
    fr: "Solde de Luck :",
    ar: "رصيد الحظ :",
    en: "Luck Balance:",
  },

  // Footer
  "footer.tagline": {
    fr: "Parfums d'exception longue tenue créés en Tunisie. Chaque flacon est livré dans son écrin de luxe avec certificat d'authenticité personnalisé.",
    ar: "عطور استثنائية تدوم طويلاً صُنعت في تونس. تصلك كل زجاجة في علبة هدايا ملكية مع شهادة أصالة مخصصة باسمك.",
    en: "Exceptional long-lasting fragrances crafted in Tunisia. Every bottle is delivered in a luxury case with a personalized certificate.",
  },
  "footer.newsletter_title": {
    fr: "Le Cercle Privilège Lévania",
    ar: "نادي ليفانيا الخاص",
    en: "The Lévania Privilege Circle",
  },
  "footer.newsletter_desc": {
    fr: "Inscrivez-vous pour recevoir nos invitations privées et offres exclusives.",
    ar: "انضم إلى قائمتنا الخاصة للحصول على دعوات حصرية وعروض فريدة.",
    en: "Subscribe to receive private invitations and exclusive launches.",
  },
  "footer.newsletter_placeholder": {
    fr: "Votre adresse email privée...",
    ar: "بريدك الإلكتروني...",
    en: "Your private email address...",
  },
  "footer.newsletter_btn": {
    fr: "Rejoindre",
    ar: "اشتراك",
    en: "Join",
  },
  "footer.rights": {
    fr: "Tous droits réservés. Haute Parfumerie Tunisienne.",
    ar: "جميع الحقوق محفوظة. دار العطور التونسية الفاخرة.",
    en: "All rights reserved. Tunisian Haute Parfumerie.",
  },
};
