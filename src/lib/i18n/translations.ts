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
  "wheel.tag": {
    fr: "Le Sanctuaire des Privilèges",
    ar: "محراب الامتيازات الملكية",
    en: "The Sanctuary of Privileges",
  },
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

  // Hero Features & Interactions
  "hero.scene_3d": {
    fr: "Scène 3D Interactive • Déplacez le curseur",
    ar: "عرض تفاعلي ثلاثي الأبعاد • حرك المؤشر",
    en: "Interactive 3D Stage • Move cursor",
  },
  "hero.spray_longevity": {
    fr: "Tenue 14h+ Garantie • Extrait Absolu",
    ar: "ثبات مضمون لأكثر من 14 ساعة • خلاصة نقية",
    en: "Guaranteed 14h+ Sillage • Pure Extract",
  },
  "hero.added_toast": {
    fr: "Ajouté au panier !",
    ar: "تمت الإضافة إلى السلة بنجاح!",
    en: "Added to shopping bag!",
  },
  "hero.feature_longevity": {
    fr: "Longue Tenue Garantie (14h+)",
    ar: "ثبات مضمون لأكثر من 14 ساعة",
    en: "Guaranteed Long-Lasting (14h+)",
  },
  "hero.feature_case": {
    fr: "Écrin Cadeau Cylindrique Offert",
    ar: "علبة أسطوانية فاخرة مهداة مع كل عطر",
    en: "Complimentary Cylindrical Case",
  },
  "hero.feature_qr": {
    fr: "Flacon Dédié avec QR Code",
    ar: "زجاجة مخصصة برمز QR باسمك",
    en: "Personalized Bottle with QR Code",
  },
  "hero.discover_scroll": {
    fr: "Découvrir",
    ar: "اكتشف المزيد",
    en: "Discover",
  },
  "hero.spray_btn": {
    fr: "Vaporiser",
    ar: "رش العطر",
    en: "Spray",
  },
  "hero.spraying": {
    fr: "Diffusion...",
    ar: "جارِ الرش...",
    en: "Diffusing...",
  },
  "hero.add_btn": {
    fr: "Ajouter",
    ar: "أضف للسلة",
    en: "Add",
  },

  // Gift Box Section (Home)
  "gift_section.tag": {
    fr: "Idée Cadeau Idéale",
    ar: "الهدية المثالية",
    en: "Ideal Luxury Gift",
  },
  "gift_section.title": {
    fr: "Offrez un Coffret Cadeau Personnalisé",
    ar: "أهدِ صندوق هدايا مخصص ومميز",
    en: "Give a Personalized Gift Box",
  },
  "gift_section.desc": {
    fr: "Choisissez votre flacon préféré (50ml ou 100ml) et ajoutez un mot doux personnalisé écrit à la main. Chaque parfum est livré dans son élégant coffret cylindrique vert olive et or, prêt à être offert.",
    ar: "اختر عطرك المفضل (50 مل أو 100 مل) وأضف إهداءً شخصيًا مكتوبًا بخط اليد. يصل كل عطر في علبته الملكية الخضراء الزيتونية والذهبية جاهزًا للإهداء.",
    en: "Select your favorite bottle (50ml or 100ml) and add a handwritten personalized note. Each perfume arrives in its regal olive and gold cylindrical box, ready for gifting.",
  },
  "gift_section.btn": {
    fr: "Créer Mon Coffret Cadeau",
    ar: "صمم صندوق هداياك الآن",
    en: "Create My Gift Box",
  },
  "gift_section.badge": {
    fr: "Écrins Cylindriques 50ml & 100ml • Sceau Officiel Inclus",
    ar: "أسطوانات 50 مل و100 مل • ختم أصالة رسمي",
    en: "Cylindrical Cases 50ml & 100ml • Official Seal Included",
  },

  // Scent Quiz Promo Section (Home)
  "quiz_section.tag": {
    fr: "Conseil Parfum Rapide",
    ar: "استشارة عطرية سريعة",
    en: "Quick Scent Advisory",
  },
  "quiz_section.title": {
    fr: "Vous Hésitez ? Trouvez Votre Parfum en 2 Minutes",
    ar: "محتار؟ اكتشف عطرك المثالي في دقيقتين",
    en: "Unsure? Find Your Scent in 2 Minutes",
  },
  "quiz_section.desc": {
    fr: "Vous ne savez pas quel parfum choisir ? Répondez à 4 questions simples selon vos préférences (notes fraîches, boisées, florales ou intenses) et notre conseiller virtuel vous recommande instantanément les parfums faits pour vous.",
    ar: "لا تعرف أي عطر تختار؟ أجب عن 4 أسئلة بسيطة وسيقوم مستشارنا الذكي باقتراح العطور المثالية لشخصيتك فورًا وفقًا لتفضيلاتك.",
    en: "Unsure which fragrance to choose? Answer 4 quick questions and our virtual advisor will instantly match the perfumes tailored to you.",
  },
  "quiz_section.btn": {
    fr: "Faire le Quiz Parfum (2 min)",
    ar: "بدء اختبار العطر (دقيقتان)",
    en: "Take the Scent Quiz (2 min)",
  },
  "quiz_section.recom_title": {
    fr: "Recommandations Personnalisées",
    ar: "توصيات مخصصة لك",
    en: "Personalized Recommendations",
  },
  "quiz_section.recom_sub": {
    fr: "Simple & Gratuit",
    ar: "سهل ومجاني",
    en: "Simple & Free",
  },
  "quiz_section.recom_desc": {
    fr: "Découvrez en quelques clics le parfum qui sublimera votre quotidien.",
    ar: "اكتشف بضغطات معدودة العطر الذي سيرافق يومك بأناقة وفخامة.",
    en: "Discover in just a few clicks the scent that will elevate your daily life.",
  },

  // Reviews Section
  "reviews.tag": {
    fr: "Avis Clients Vérifiés • 4.9 / 5",
    ar: "تقييمات عملاء موثقة • 4.9 / 5",
    en: "Verified Customer Reviews • 4.9 / 5",
  },
  "reviews.title": {
    fr: "Ce Que Disent Nos Clients",
    ar: "آراء عملائنا الكرام",
    en: "What Our Clients Say",
  },
  "reviews.subtitle": {
    fr: "Plus de 1 200 flacons livrés avec soin partout en Tunisie.",
    ar: "أكثر من 1200 زجاجة عطر سُلمت بعناية في جميع أنحاء تونس.",
    en: "Over 1,200 bottles delivered with care across Tunisia.",
  },
  "reviews.verified_badge": {
    fr: "Client Vérifié",
    ar: "عميل موثق",
    en: "Verified Customer",
  },

  // Wheel Promo (Home)
  "wheel_promo.tag": {
    fr: "Cadeaux & Récompenses",
    ar: "هدايا ومكافآت حصرية",
    en: "Gifts & Rewards",
  },
  "wheel_promo.title": {
    fr: "La Roue Cadeau Lévania",
    ar: "عجلة الحظ والهدايا من ليفانيا",
    en: "The Lévania Gift Wheel",
  },
  "wheel_promo.desc": {
    fr: "Gagnez 1 point de chance à chaque tranche de 10 DT d'achat. Tournez la roue pour tenter de remporter des réductions immédiates, des échantillons ou des flacons offerts !",
    ar: "اكسب نقطة حظ عن كل 10 دنانير مشتريات. دور العجلة للفوز بخصومات فورية، عينات راقية أو زجاجات عطور مجانية!",
    en: "Earn 1 luck point for every 10 TND spent. Spin the wheel to win instant discounts, luxury samples, or free bottles!",
  },
  "wheel_promo.btn": {
    fr: "Tourner la Roue Cadeau",
    ar: "تدوير عجلة الهدايا",
    en: "Spin the Gift Wheel",
  },

  // Sensory Wave Pavilion
  "pavilion.tag": {
    fr: "L'Univers des Trois Ondes",
    ar: "عالم الموجات العطرية الثلاث",
    en: "The Three Waves Universe",
  },
  "pavilion.title": {
    fr: "Trouvez l'Onde qui Vous Ressemble",
    ar: "اختر الموجة العطرية التي تعبر عنك",
    en: "Find the Wave that Suits You",
  },
  "pavilion.desc": {
    fr: "Chaque personne a sa personnalité. Découvrez nos trois univers de créations, du plus frais et délicat au plus boisé et intense.",
    ar: "لكل إنسان شخصيته وبصمته. اكتشف عوالمنا العطرية الثلاثة من أكثرها انتعاشاً إلى أعمقها ثباتاً وقوة.",
    en: "Every individual has a unique essence. Discover our three fragrance worlds, from fresh and delicate to rich and intensely woody.",
  },
  "pavilion.notes_lead": {
    fr: "Notes Phares",
    ar: "النوتات البارزة",
    en: "Leading Notes",
  },
  "pavilion.sillage_label": {
    fr: "Diffusion",
    ar: "الفوحان",
    en: "Sillage",
  },
  "pavilion.longevity_label": {
    fr: "Tenue",
    ar: "الثبات",
    en: "Longevity",
  },
  "pavilion.discover_collection": {
    fr: "Découvrir la Collection",
    ar: "استكشف المجموعة",
    en: "Explore Collection",
  },

  // Product Details Page
  "product.price_label": {
    fr: "Prix Flacon",
    ar: "سعر الزجاجة",
    en: "Bottle Price",
  },
  "product.in_stock": {
    fr: "En stock",
    ar: "متوفر",
    en: "In stock",
  },
  "product.available": {
    fr: "disponibles",
    ar: "قطعة متوفرة",
    en: "available",
  },
  "product.size_label": {
    fr: "Contenance du Flacon",
    ar: "حجم الزجاجة",
    en: "Bottle Volume",
  },
  "product.buy_now": {
    fr: "Acheter Immédiatement",
    ar: "شراء فوري",
    en: "Buy Now",
  },
  "product.free_delivery_notice": {
    fr: "Livraison express en Tunisie sous 24h • 48h (Offerte dès 200 TND)",
    ar: "توصيل سريع في تونس خلال 24 إلى 48 ساعة (مجاني ابتداءً من 200 د.ت)",
    en: "Express delivery in Tunisia in 24h-48h (Free over 200 TND)",
  },
  "product.certified_notice": {
    fr: "Flacon certifié avec QR Code de traçabilité officiel Lévania",
    ar: "زجاجة موثقة برمز QR رسمي لتتبع الأصالة من ليفانيا",
    en: "Certified bottle with official Lévania traceability QR Code",
  },
  "product.consult": {
    fr: "Consulter",
    ar: "عرض الشهادة",
    en: "View",
  },
  "product.luck_points_prefix": {
    fr: "Rapporte",
    ar: "تمنحك",
    en: "Earns",
  },
  "product.luck_points_suffix": {
    fr: "Luck pour la Roue du Destin",
    ar: "نقاط حظ لعجلة المكافآت",
    en: "Luck for the Wheel",
  },
  "product.wave_signature_title": {
    fr: "Signature Ondulatoire du Flacon",
    ar: "البصمة العطرية للزجاجة",
    en: "Bottle Wave Signature",
  },
  "product.interactive_pyramid": {
    fr: "Pyramide Olfactive Interactive",
    ar: "الهرم العطري التفاعلي",
    en: "Interactive Olfactory Pyramid",
  },
  "product.click_note": {
    fr: "Cliquez sur une note pour explorer son origine et sa facette",
    ar: "اضغط على أي نوتة لمعرفة مصدرها وسر جاذبيتها",
    en: "Click any note to explore its origin and accord",
  },
  "product.head_notes": {
    fr: "Notes de Tête",
    ar: "نوتات القمة",
    en: "Top Notes",
  },
  "product.heart_notes": {
    fr: "Notes de Cœur",
    ar: "نوتات القلب",
    en: "Heart Notes",
  },
  "product.base_notes": {
    fr: "Notes de Fond",
    ar: "نوتات القاعدة",
    en: "Base Notes",
  },
  "product.related_title": {
    fr: "Dans la Même Collection",
    ar: "عطور من نفس المجموعة",
    en: "From the Same Collection",
  },

  // Navigation & Extra Actions
  "nav.login": {
    fr: "Connexion",
    ar: "دخول",
    en: "Sign In",
  },
  "nav.logout": {
    fr: "Se Déconnecter",
    ar: "تسجيل الخروج",
    en: "Log Out",
  },
  "nav.admin_panel": {
    fr: "Administration Centrale",
    ar: "الإدارة المركزية",
    en: "Central Admin",
  },
  "nav.reseller_portal": {
    fr: "Portail Revendeur",
    ar: "بوابة الموزعين",
    en: "Reseller Portal",
  },
  "nav.home": {
    fr: "Accueil",
    ar: "الرئيسية",
    en: "Home",
  },
  "nav.view_cart": {
    fr: "Voir Panier",
    ar: "عرض السلة",
    en: "View Bag",
  },

  // Wheel Rewards Slices
  "wheel.slice_points": {
    fr: "Points Fidélité",
    ar: "نقاط ولاء",
    en: "Loyalty Points",
  },
  "wheel.slice_c10": {
    fr: "Coupon -10%",
    ar: "خصم 10%",
    en: "10% Off",
  },
  "wheel.slice_sample": {
    fr: "Échantillon Luxe",
    ar: "عينة فاخرة",
    en: "Luxury Sample",
  },
  "wheel.slice_voucher": {
    fr: "Bon d'Achat",
    ar: "قسيمة شراء",
    en: "Gift Voucher",
  },
  "wheel.slice_c20": {
    fr: "Coupon -20%",
    ar: "خصم 20%",
    en: "20% Off",
  },
  "wheel.slice_bottle": {
    fr: "Flacon Offert",
    ar: "عطر مجاني",
    en: "Free Bottle",
  },
  "wheel.slice_box": {
    fr: "Coffret Cadeau",
    ar: "صندوق هدايا",
    en: "Gift Box",
  },
  "wheel.slice_xp": {
    fr: "Double XP",
    ar: "نقاط مضاعفة",
    en: "Double XP",
  },
  "wheel.spinning": {
    fr: "Tirage...",
    ar: "جارِ السحب...",
    en: "Drawing...",
  },
  "wheel.balance": {
    fr: "Solde de Luck",
    ar: "رصيد الحظ",
    en: "Luck Balance",
  },
  "wheel.loyalty_tier": {
    fr: "Votre Niveau de Fidélité",
    ar: "مستوى عضويتك",
    en: "Your Loyalty Tier",
  },
  "wheel.copy_code": {
    fr: "Copier",
    ar: "نسخ",
    en: "Copy",
  },
  "wheel.code_copied": {
    fr: "Copié !",
    ar: "تم النسخ!",
    en: "Copied!",
  },
  "wheel.revealed_title": {
    fr: "Félicitations ! Votre cadeau est débloqué et prêt à être utilisé.",
    ar: "مبروك! تم فتح هديتك وهي جاهزة للاستخدام الآن.",
    en: "Congratulations! Your reward is unlocked and ready to use.",
  },
  "wheel.coupon_label": {
    fr: "Votre Code Promo",
    ar: "رمز الخصم الخاص بك",
    en: "Your Promo Code",
  },
  "wheel.rules_notice": {
    fr: "Chaque lancer consomme vos points de Luck. Le palier actuel garantit la table de récompenses.",
    ar: "كل سحب يستهلك نقاط الحظ الخاصة بك. ويضمن لك الفوز بجوائز المستوى الحالي.",
    en: "Each spin consumes your Luck points. The current tier guarantees the reward table.",
  },

  // Reassurance & Trust Bar
  "reassurance.gift_box": {
    fr: "Écrin Cadeau Offert",
    ar: "علبة هدية فاخرة مجانية",
    en: "Free Gift Presentation Case",
  },
  "reassurance.gift_sub": {
    fr: "Boîte cylindrique luxe vert olive & or",
    ar: "صندوق أسطواني فاخر بالزيتي والذهب",
    en: "Luxury olive green & gold cylinder box",
  },
  "reassurance.custom_bottle": {
    fr: "Flacon Personnalisé",
    ar: "زجاجة مخصصة باسمك",
    en: "Personalized Dedicated Bottle",
  },
  "reassurance.custom_bottle_sub": {
    fr: "QR Code & Vidéo à votre nom",
    ar: "رمز QR وفيديو توثيقي باسمك",
    en: "Traceable QR & Video in your name",
  },

  // Pavilion
  "pavilion.bottles_label": {
    fr: "Flacons Porteurs de l'Onde",
    ar: "عطور هذه البصمة العطرية",
    en: "Bottles of this Wave",
  },
  "pavilion.view_all_collections": {
    fr: "Voir les 3 collections",
    ar: "استكشف المجموعات الثلاث",
    en: "View 3 Collections",
  },

  // Bestsellers Podium
  "bestsellers.subtitle": {
    fr: "Découvrez les parfums préférés de nos clients, reconnus pour leur élégance et leur tenue exceptionnelle.",
    ar: "اكتشف العطور الأكثر تفضيلاً وإقبالاً من عملائنا، المتميزة بأناقتها وثباتها الاستثنائي.",
    en: "Discover our customers' favorite fragrances, renowned for their elegance and exceptional longevity.",
  },
  "bestsellers.order_n1": {
    fr: "Commander le N°1",
    ar: "اطلب العطر رقم 1",
    en: "Order #1 Best Seller",
  },
  "bestsellers.other_title": {
    fr: "Les 7 Autres Signatures Incontournables",
    ar: "الروائع العطرية السبع الأخرى",
    en: "7 Other Essential Signatures",
  },
  "bestsellers.other_sub": {
    fr: "Du rang 4 au rang 10 • Sélectionnées par nos maîtres parfumeurs",
    ar: "من المرتبة 4 إلى 10 • مختارة بعناية من كبار عطارينا",
    en: "Ranks 4 to 10 • Curated by our master perfumers",
  },

  // Olfactory Pyramid Stage
  "pyramid.cta": {
    fr: "Explorer les Parfums en Boutique",
    ar: "اكتشف العطور في المتجر",
    en: "Explore Fragrances in Store",
  },
  "pyramid.ingredients_title": {
    fr: "Absolus & Matières Premières Révélées :",
    ar: "المكونات الطبيعية والمستخلصات النفيسة:",
    en: "Revealed Absolutes & Precious Ingredients:",
  },
  "pyramid.maceration_note": {
    fr: "Macération prolongée en cuve inox thermorégulée selon les préceptes de Grasse et de Tunis.",
    ar: "تعتيق متأني في أوعية ستانلس ستيل مع ضبط حراري وفق أعلى معايير غراس وتونس.",
    en: "Extended maceration in temperature-controlled stainless tanks adhering to Grasse and Tunis craftsmanship.",
  },

  // Maison Heritage
  "heritage.quote": {
    fr: "Nous créons des parfums authentiques qui marquent les esprits et durent toute la journée, protégés dans un écrin digne des plus grands noms.",
    ar: "نبتكر عطوراً أصيلة تترك أثراً لا يُنسى وتدوم طوال اليوم، محفوظة في علبة تليق بأرقى الأسماء العالمية.",
    en: "We craft authentic fragrances that leave an indelible impression and last all day, shielded in presentation boxes worthy of the finest houses.",
  },
  "heritage.craft_badge": {
    fr: "Artisanat du Cap Bon • 2026",
    ar: "صناعة حرفية أصيلة من الوطن القبلي • 2026",
    en: "Cap Bon Artisan Craft • 2026",
  },
  "heritage.pillar1_title": {
    fr: "Ingrédients Purs & Longue Tenue (14h+)",
    ar: "مكونات نقية وثبات استثنائي (14+ ساعة)",
    en: "Pure Ingredients & Extended Longevity (14h+)",
  },
  "heritage.pillar1_desc": {
    fr: "Néroli pur de Nabeul, safran, bois d'olivier et oud. Forte concentration en huiles parfumées pour un sillage durable.",
    ar: "نيرولي نابل الخالص، زعفران، خشب الزيتون ودهن العود. تركيز عالي من الزيوت العطرية لفوحان يدوم طويلاً.",
    en: "Pure Nabeul neroli, saffron, olive wood, and oud. High concentration of perfume oils for a long-lasting sillage.",
  },
  "heritage.pillar2_title": {
    fr: "Écrin Cylindrique Offert pour Chaque Flacon",
    ar: "علبة أسطوانية فاخرة مجانية مع كل زجاجة",
    en: "Complimentary Cylindrical Case with Every Bottle",
  },
  "heritage.pillar2_desc": {
    fr: "Boîte rigide vert olive et or qui protège le parfum de la lumière. Idéal et prêt à offrir en cadeau.",
    ar: "صندوق أسطواني صلب باللون الأخضر الزيتي والذهبي يحمي العطر من الضوء، جاهز للتقديم كأرقى هدية.",
    en: "Rigid olive green and gold box protecting the perfume from light. Ready for gifting.",
  },
  "heritage.pillar3_title": {
    fr: "Flacon Dédié avec Certificat QR & Nom du Client",
    ar: "زجاجة مخصصة برمز QR وشهادة باسم العميل",
    en: "Dedicated Bottle with QR Certificate & Client Name",
  },
  "heritage.pillar3_desc": {
    fr: "Chaque bouteille porte un QR code exclusif qui affiche sur votre téléphone votre certificat nominatif officiel.",
    ar: "كل زجاجة تحمل رمز QR حصري يعرض شهادة الأصالة الرسمية باسمك مباشرة على هاتفك.",
    en: "Each bottle bears an exclusive QR code displaying your official personalized certificate on your mobile.",
  },
  "heritage.cta_collections": {
    fr: "Découvrir nos Collections",
    ar: "اكتشف مجموعاتنا",
    en: "Discover Our Collections",
  },
  "heritage.cta_gift": {
    fr: "Composer un Coffret Cadeau",
    ar: "صمم صندوق هداياك",
    en: "Create a Gift Box",
  },

  // Cart Drawer
  "cart.free_shipping_achieved": {
    fr: "Livraison Express Offerte partout en Tunisie !",
    ar: "توصيل سريع مجاني في كامل تراب الجمهورية التونسية!",
    en: "Complimentary Express Delivery throughout Tunisia!",
  },
  "cart.empty_title": {
    fr: "Votre panier est vide",
    ar: "سلة التسوق فارغة",
    en: "Your shopping bag is empty",
  },
  "cart.empty_desc": {
    fr: "Explorez nos créations olfactives artisanales et laissez-vous transporter.",
    ar: "استكشف إبداعاتنا العطرية الفاخرة ودع عبيرها يأخذك في رحلة فريدة.",
    en: "Explore our artisanal fragrance creations and let yourself be transported.",
  },
  "cart.explore_btn": {
    fr: "Découvrir la Collection",
    ar: "استكشف المجموعة",
    en: "Explore the Collection",
  },
  "cart.coupon_placeholder": {
    fr: "Code Promo (ex: LEVANIA10)",
    ar: "رمز الخصم (مثال: LEVANIA10)",
    en: "Promo Code (e.g. LEVANIA10)",
  },
  "cart.coupon_apply": {
    fr: "Appliquer",
    ar: "تطبيق",
    en: "Apply",
  },
  "cart.coupon_remove": {
    fr: "Retirer",
    ar: "إلغاء",
    en: "Remove",
  },
  "cart.coupon_discount": {
    fr: "Remise",
    ar: "خصم",
    en: "Discount",
  },
  "cart.order_gift_box": {
    fr: "Coffret Cadeau",
    ar: "صندوق هدية",
    en: "Gift Box",
  },

  // Quiz Engine
  "quiz.step_prefix": {
    fr: "Étape",
    ar: "المرحلة",
    en: "Step",
  },
  "quiz.step_of": {
    fr: "sur",
    ar: "من",
    en: "of",
  },
  "quiz.prev_question": {
    fr: "Question précédente",
    ar: "السؤال السابق",
    en: "Previous Question",
  },
  "quiz.skip_question": {
    fr: "Passer cette question",
    ar: "تخطي هذا السؤال",
    en: "Skip this question",
  },
  "quiz.analyzing_title": {
    fr: "Recherche de votre parfum idéal...",
    ar: "جارِ اختيار عطرك المثالي...",
    en: "Finding your perfect fragrance...",
  },
  "quiz.analyzing_desc": {
    fr: "Nous analysons vos réponses pour sélectionner les parfums qui correspondent exactement à vos préférences.",
    ar: "نقوم بتحليل اختياراتك لنقترح عليك العطور التي تطابق ذوقك بدقة متناهية.",
    en: "We are analyzing your preferences to find the scents perfectly suited to you.",
  },
  "quiz.result_title": {
    fr: "Votre Parfum Idéal",
    ar: "عطرك المفضل المختار",
    en: "Your Ideal Fragrance",
  },
  "quiz.result_subtitle": {
    fr: "Voici les créations Lévania sélectionnées sur mesure selon vos goûts.",
    ar: "إليك تشكيلة عطور ليفانيا المصممة خصيصاً وفقاً لذوقك الشخصي.",
    en: "Here are the Lévania creations customized to your tastes.",
  },
  "quiz.rank": {
    fr: "Rang",
    ar: "المرتبة",
    en: "Rank",
  },
  "quiz.affinity": {
    fr: "affinité",
    ar: "تطابق",
    en: "match",
  },
  "quiz.from_price": {
    fr: "Dès",
    ar: "ابتداءً من",
    en: "From",
  },
  "quiz.restart": {
    fr: "Recommencer le Quiz",
    ar: "إعادة الاختبار من جديد",
    en: "Retake Quiz",
  },

  // Additional Footer Links & Strings
  "footer.creations_title": {
    fr: "Créations & Univers",
    ar: "الإبداعات والأكوان العطرية",
    en: "Creations & Worlds",
  },
  "footer.fidelity_title": {
    fr: "Fidélité & Privilèges",
    ar: "الولاء والامتيازات",
    en: "Loyalty & Privileges",
  },
  "footer.wheel_link": {
    fr: "La Roue Cadeau Lévania",
    ar: "عجلة هدايا ليفانيا",
    en: "The Lévania Gift Wheel",
  },
  "footer.loyalty_program": {
    fr: "Programme Fidélité & Points",
    ar: "برنامج النقاط والولاء",
    en: "Loyalty & Points Program",
  },
  "footer.referral": {
    fr: "Parrainage d'Amis (50% Points)",
    ar: "دعوة الأصدقاء (50% نقاط)",
    en: "Friend Referral (50% Points)",
  },
  "footer.authenticity_qr": {
    fr: "Certificat d'Authenticité QR",
    ar: "شهادة الأصالة برمز QR",
    en: "QR Authenticity Certificate",
  },
  "footer.wave_signature_title": {
    fr: "La Signature Ondulatoire Lévania",
    ar: "البصمة التموجية لدار ليفانيا",
    en: "The Lévania Wave Signature",
  },
  "footer.wave_signature_sub": {
    fr: "Trois expressions liquides sculptées par nos maîtres parfumeurs.",
    ar: "ثلاثة تجليات عطرية صاغها كبار صانعي العطور لدينا.",
    en: "Three liquid expressions sculpted by our master perfumers.",
  },
  "footer.wave_sig_name": {
    fr: "Onde Signature",
    ar: "الموجة التوقيعية",
    en: "Signature Wave",
  },
  "footer.wave_sig_sub": {
    fr: "Or • Olive • Bourgogne",
    ar: "ذهب • زيتون • نبيذي",
    en: "Gold • Olive • Burgundy",
  },
  "footer.wave_silky_name": {
    fr: "Onde Soyeuse",
    ar: "الموجة الحريرية",
    en: "Silky Wave",
  },
  "footer.wave_silky_sub": {
    fr: "Ivoire • Fleur • Néroli",
    ar: "عاجي • زهور • نيرولي",
    en: "Ivory • Flower • Neroli",
  },
  "footer.wave_dark_name": {
    fr: "Onde Sombre",
    ar: "الموجة الغامضة",
    en: "Dark Wave",
  },
  "footer.wave_dark_sub": {
    fr: "Ébène • Oud • Ambre",
    ar: "أبنوس • عود • عنبر",
    en: "Ebony • Oud • Amber",
  },
  "footer.bullet_payment": {
    fr: "Paiement Sécurisé • Espèces & Carte",
    ar: "دفع آمن • نقدًا أو بالبطاقة",
    en: "Secure Payment • Cash & Card",
  },
  "footer.bullet_shipping": {
    fr: "Livraison Express Tunisie 24-48h",
    ar: "توصيل سريع بتونس 24-48 ساعة",
    en: "Express Delivery Tunisia 24-48h",
  },
  "footer.bullet_certified": {
    fr: "Certifié Authentique",
    ar: "أصالة مضمونة 100%",
    en: "Certified Authentic",
  },
  "footer.subscribed_msg": {
    fr: "Bienvenue dans notre cercle. Votre code de bienvenue exclusif a été envoyé.",
    ar: "أهلاً بك في نادينا الخاص. تم إرسال رمز الترحيب الحصري إليك.",
    en: "Welcome to our circle. Your exclusive welcome code has been sent.",
  },
  "footer.mystery_box": {
    fr: "Mystery Box Prestige",
    ar: "صندوق الغموض الملكي",
    en: "Prestige Mystery Box",
  },

  // Shop Catalogue Page
  "shop.tab_all": {
    fr: "Toutes les Ondes",
    ar: "جميع الموجات",
    en: "All Waves",
  },
  "shop.tab_all_sub": {
    fr: "Catalogue Complet",
    ar: "الكتالوج الكامل",
    en: "Complete Catalogue",
  },
  "shop.tab_sig": {
    fr: "Onde Signature",
    ar: "الموجة التوقيعية",
    en: "Signature Wave",
  },
  "shop.tab_sig_sub": {
    fr: "Méditerranée & Or",
    ar: "المتوسط والذهب",
    en: "Mediterranean & Gold",
  },
  "shop.tab_soyeuse": {
    fr: "Onde Soyeuse",
    ar: "الموجة الحريرية",
    en: "Silky Wave",
  },
  "shop.tab_soyeuse_sub": {
    fr: "Fleurs, Néroli & Voile",
    ar: "زهور، نيرولي وشال حريري",
    en: "Flowers, Neroli & Veil",
  },
  "shop.tab_intense": {
    fr: "Onde Sombre",
    ar: "الموجة الغامضة",
    en: "Dark Wave",
  },
  "shop.tab_intense_sub": {
    fr: "Oud, Bois & Ébène",
    ar: "عود، خشب وأبنوس",
    en: "Oud, Woods & Ebony",
  },
  "shop.selected_wave_label": {
    fr: "Sillage Ondulatoire Sélectionné",
    ar: "الأثر التموجي المختار",
    en: "Selected Sillage Wave",
  },
  "shop.bottles_count": {
    fr: "flacon(s) affiché(s)",
    ar: "عطر معروض",
    en: "bottle(s) shown",
  },
  "shop.wave_interact_mobile": {
    fr: "Touchez la vague",
    ar: "المس الموجة",
    en: "Touch the wave",
  },
  "shop.wave_interact_desktop": {
    fr: "Cliquez ou survolez la vague pour diffuser les effluves",
    ar: "انقر أو مرر على الموجة لتنثر العبير",
    en: "Click or hover the wave to disperse the scent",
  },
  "shop.all_families": {
    fr: "Toutes Familles",
    ar: "كافة العائلات العطرية",
    en: "All Families",
  },
  "shop.sort_featured": {
    fr: "Sélection Vedette",
    ar: "المختارات المميزة",
    en: "Featured Selection",
  },
  "shop.sort_bestseller": {
    fr: "Classement Bestsellers",
    ar: "الأكثر مبيعاً",
    en: "Bestseller Ranking",
  },
  "shop.sort_price_asc": {
    fr: "Prix : Croissant",
    ar: "السعر : من الأقل للأعلى",
    en: "Price: Low to High",
  },
  "shop.sort_price_desc": {
    fr: "Prix : Décroissant",
    ar: "السعر : من الأعلى للأقل",
    en: "Price: High to Low",
  },
  "shop.no_results": {
    fr: "Aucun flacon ne correspond à votre filtre",
    ar: "لا يوجد عطر يطابق خيارات التصفية الحالية",
    en: "No bottles match your current filter",
  },
  "shop.reset_filters": {
    fr: "Réinitialiser les filtres",
    ar: "إعادة ضبط التصفية",
    en: "Reset filters",
  },
  "shop.reassurance_sealed_title": {
    fr: "Flacons Scellés à la Main",
    ar: "زجاجات محكمة الختم يدويًا",
    en: "Hand-Sealed Bottles",
  },
  "shop.reassurance_sealed_desc": {
    fr: "Chaque création est numérotée et scellée à la cire dans notre atelier de Nabeul.",
    ar: "يتم ترقيم كل زجاجة وختمها بالشمع في ورشتنا بنابل.",
    en: "Every creation is numbered and wax-sealed in our Nabeul atelier.",
  },
  "shop.reassurance_qr_title": {
    fr: "Certificat Numérique QR",
    ar: "شهادة رقمية برمز QR",
    en: "Digital QR Certificate",
  },
  "shop.reassurance_qr_desc": {
    fr: "Accédez au certificat dédié à votre nom et à la vidéo de mise en flacon.",
    ar: "اطلع على شهادة أصالة مخصصة باسمك وفيديو تعبئة زجاجتك.",
    en: "Access your personalized certificate and artisan bottling video.",
  },
  "shop.reassurance_delivery_title": {
    fr: "Livraison Sécurisée en Tunisie",
    ar: "توصيل آمن في كامل تونس",
    en: "Secure Delivery in Tunisia",
  },
  "shop.reassurance_delivery_desc": {
    fr: "Expédition soignée 24-48h avec paiement à la livraison (espèces ou carte).",
    ar: "شحن دقيق خلال 24-48 ساعة مع خيار الدفع عند الاستلام (نقدًا أو بطاقة).",
    en: "Careful shipping in 24-48h with pay-on-delivery (cash or card).",
  },

  // Cart Page
  "cart.page_pill": {
    fr: "Votre Sélection Haute Parfumerie",
    ar: "مختاراتك من العطور الفاخرة",
    en: "Your Haute Parfumerie Selection",
  },
  "cart.per_unit": {
    fr: "l'unité",
    ar: "للقطعة",
    en: "each",
  },
  "cart.gift_box_badge": {
    fr: "Coffret Cadeau",
    ar: "صندوق هدية",
    en: "Gift Box",
  },
  "cart.luck_notice_pre": {
    fr: "Cette commande vous attribuera",
    ar: "سيمكنك هذا الطلب من ربح",
    en: "This order will award you",
  },
  "cart.luck_notice_points": {
    fr: "points de Luck",
    ar: "نقاط حظ",
    en: "Luck points",
  },
  "cart.luck_notice_post": {
    fr: "pour la Roue du Destin (1 Luck par 10 TND).",
    ar: "لعجلة الحظ الملكية (نقطة لكل 10 د.ت).",
    en: "for the Wheel of Destiny (1 Luck per 10 TND).",
  },
  "cart.order_summary": {
    fr: "Récapitulatif de Commande",
    ar: "ملخص الطلب",
    en: "Order Summary",
  },
  "cart.coupon_input_placeholder": {
    fr: "Code privilège",
    ar: "رمز الامتياز",
    en: "Privilege code",
  },
  "cart.coupon_validate": {
    fr: "Valider",
    ar: "تأكيد",
    en: "Apply",
  },
  "cart.coupon_applied": {
    fr: "appliqué",
    ar: "تم تطبيقه",
    en: "applied",
  },
  "cart.coupon_remove_btn": {
    fr: "Retirer",
    ar: "إلغاء",
    en: "Remove",
  },
  "cart.delivery_tunisia": {
    fr: "Frais de Livraison (Tunisie)",
    ar: "مصاريف الشحن (تونس)",
    en: "Shipping Fee (Tunisia)",
  },
  "cart.delete_title": {
    fr: "Supprimer du panier",
    ar: "حذف من السلة",
    en: "Remove from bag",
  },

  // Checkout Page
  "checkout.pill": {
    fr: "Paiement & Livraison Sécurisée",
    ar: "دفع وتوصيل آمن 100%",
    en: "Secure Payment & Delivery",
  },
  "checkout.ordered_items": {
    fr: "Articles Commandés",
    ar: "العطور المطلوبة",
    en: "Ordered Items",
  },
  "checkout.promo_discount": {
    fr: "Remise Code Promo",
    ar: "تخفيض الرمز الترويجي",
    en: "Promo Discount",
  },
  "checkout.delivery_label": {
    fr: "Frais de Port (Tunisie)",
    ar: "مصاريف الشحن (تونس)",
    en: "Shipping Fee (Tunisia)",
  },
  "checkout.total_to_pay": {
    fr: "Total Net à Régler",
    ar: "المجموع الصافي للدفع",
    en: "Net Total to Pay",
  },
  "checkout.submitting": {
    fr: "Validation en cours...",
    ar: "جارِ تأكيد الطلب...",
    en: "Submitting order...",
  },
  "checkout.guarantee_badge": {
    fr: "Garantie Haute Parfumerie • Paiement Sécurisé",
    ar: "ضمان العطور الفاخرة • دفع آمن ومحمي",
    en: "Haute Parfumerie Guarantee • Secure Payment",
  },
  "checkout.success_pill": {
    fr: "Haute Parfumerie Lévania • Sillage Garanti",
    ar: "دار ليفانيا • أثر عطر مضمون وثابت",
    en: "Haute Parfumerie Lévania • Guaranteed Sillage",
  },
  "checkout.sealed_and_numbered": {
    fr: "Scellés & Numérotés",
    ar: "مختومة ومرقمة يدويًا",
    en: "Sealed & Numbered",
  },
  "checkout.bottle_dedicated_to": {
    fr: "Flacon dédié à :",
    ar: "زجاجة مخصصة لـ:",
    en: "Bottle dedicated to:",
  },
  "checkout.series_label": {
    fr: "Série :",
    ar: "الرقم التسلسلي:",
    en: "Series:",
  },
  "checkout.view_cert": {
    fr: "Certificat",
    ar: "الشهادة",
    en: "Certificate",
  },
  "checkout.points_won": {
    fr: "Points Gagnés !",
    ar: "نقاط مكتسبة!",
    en: "Points Won!",
  },
  "checkout.points_won_desc": {
    fr: "Vos points sont disponibles. Vous pouvez dès à présent tenter votre chance sur la Roue Cadeau Lévania.",
    ar: "رصيدك من النقاط متاح الآن. يمكنك تجربة حظك على عجلة هدايا ليفانيا.",
    en: "Your points are available. You can now try your luck on the Lévania Gift Wheel.",
  },
  "checkout.spin_wheel_btn": {
    fr: "Tourner la Roue Cadeau",
    ar: "تدوير عجلة الهدايا",
    en: "Spin the Gift Wheel",
  },
  "checkout.continue_shopping": {
    fr: "Continuer mes Achats",
    ar: "مواصلة التسوق",
    en: "Continue Shopping",
  },
  "checkout.view_account": {
    fr: "Voir Mon Compte & Commandes",
    ar: "عرض حسابي وطلباتي",
    en: "View My Account & Orders",
  },

  // Collections Page
  "collections.pill": {
    fr: "Les Univers Olfactifs",
    ar: "عوالم العطور الاستثنائية",
    en: "Olfactory Universes",
  },
  "collections.title": {
    fr: "Les 3 Collections Lévania",
    ar: "مجموعات ليفانيا الثلاث",
    en: "The 3 Lévania Collections",
  },
  "collections.subtitle": {
    fr: "Trois expressions poétiques et sculpturales de la Vague. Des matières premières d'exception travaillées dans le respect absolu de la tradition méditerranéenne.",
    ar: "ثلاثة تجليات شعرية للموجة، ومواد أولية نادرة مصاغة بأعلى درجات الاحترام لتقاليد حوض المتوسط.",
    en: "Three poetic and sculptural expressions of the Wave. Exceptional raw materials honoring Mediterranean traditions.",
  },
  "collections.expression_wave": {
    fr: "Expression Olfactive :",
    ar: "التعبير العطري :",
    en: "Olfactory Expression:",
  },
  "collections.view_catalogue": {
    fr: "Voir tout le catalogue",
    ar: "عرض الكتالوج كاملاً",
    en: "View all catalogue",
  },
  "collections.bottles_in_collection": {
    fr: "Flacons de la Collection",
    ar: "عطور المجموعة",
    en: "Collection Bottles",
  },

  // Mystery Box & Compose Box
  "mystery.pill": {
    fr: "Surprise de Prestige & Transparence",
    ar: "مفاجأة ملكية بشفافية تامة",
    en: "Prestige Surprise & Transparency",
  },

  // Promotions Page
  "promotions.pill": {
    fr: "Campagnes & Offres Spéciales",
    ar: "الحملات والعروض الخاصة",
    en: "Campaigns & Special Offers",
  },
  "promotions.title": {
    fr: "Les Offres du Mois",
    ar: "عروض الشهر الاستثنائية",
    en: "Monthly Offers",
  },
  "promotions.subtitle": {
    fr: "Des compositions thématiques créées pour célébrer les moments majeurs de votre vie : mariages, retours d'Omra, anniversaires et présents prestigieux.",
    ar: "باقات وتشكيلات مميزة صُممت للاحتفاء بأجمل لحظات العمر: الأعراس، العودة من العمرة، أعياد الميلاد والهدايا الملكية.",
    en: "Thematic sets curated to celebrate life's milestones: weddings, Umrah, anniversaries, and prestigious gifting.",
  },
  "promotions.flash_tag": {
    fr: "Vente Flash Privilège (24 Heures)",
    ar: "تخفيضات خاطفة حصرية (24 ساعة)",
    en: "Privilege Flash Sale (24 Hours)",
  },
  "promotions.flash_title": {
    fr: "-15% Supplémentaire avec le code :",
    ar: "خصم إضافي 15% مع الرمز :",
    en: "Extra 15% off with code:",
  },
  "promotions.flash_desc": {
    fr: "Dès 250 TND d'achat sur tout le panier • Valable sur les flacons et les coffrets.",
    ar: "عند الشراء بقيمة 250 د.ت فأكثر • ساري على جميع العطور والصناديق.",
    en: "On orders over 250 TND • Valid on all perfumes and gift boxes.",
  },
  "promotions.flash_cta": {
    fr: "Profiter de la Vente Flash",
    ar: "الاستفادة من التخفيض",
    en: "Claim Flash Sale",
  },
  "promotions.theme_label": {
    fr: "Thématique :",
    ar: "المناسبة :",
    en: "Theme:",
  },
  "compose.pill": {
    fr: "Atelier Cadeaux d'Exception",
    ar: "ورشة الهدايا الاستثنائية",
    en: "Exceptional Gift Atelier",
  },
  "compose.title": {
    fr: "Composer Mon Coffret",
    ar: "تصميم صندوق الهدايا الخاص بي",
    en: "Compose My Gift Box",
  },
  "compose.subtitle": {
    fr: "Choisissez votre format d'écrin cylindrique ou coffret prestige, associez les élixirs de votre choix et personnalisez votre message calligraphié sur parchemin.",
    ar: "اختر حجم الأسطوانة أو الصندوق الفاخر، واجمع بين عطورك المفضلة وأضف رسالتك المكتوبة بخط اليد.",
    en: "Choose your cylindrical or prestige box, pair your favorite elixirs and customize your calligraphed card.",
  },

  // QR Certificate
  "cert.badge": {
    fr: "Flacon Authentifié & Scellé Lévania",
    ar: "زجاجة أصلية ومختومة من ليفانيا",
    en: "Authenticated & Sealed Lévania Bottle",
  },
  "cert.title": {
    fr: "Certificat Numérique d'Authenticité",
    ar: "شهادة الأصالة الرقمية الرسمية",
    en: "Digital Certificate of Authenticity",
  },
  "cert.token_label": {
    fr: "Jeton",
    ar: "الرمز",
    en: "Token",
  },
  "cert.dedicated_pill": {
    fr: "Exemplaire Nominatif d'Exception",
    ar: "نسخة اسمية خاصة واستثنائية",
    en: "Exceptional Personalized Edition",
  },
  "cert.dedicated_to": {
    fr: "Flacon Dédié à",
    ar: "زجاجة مخصصة لـ",
    en: "Bottle Dedicated to",
  },
  "cert.official_order": {
    fr: "Commande Officielle :",
    ar: "الطلب الرسمي :",
    en: "Official Order:",
  },
  "cert.bottling_wax": {
    fr: "Mise en flacon scellée à la cire artisanale",
    ar: "تعبئة محكمة بالشمع الحرفي الأصيل",
    en: "Artisanal wax-sealed bottling",
  },
  "cert.video_title_default": {
    fr: "Vidéo de Mise en Flacon & Dédicace Artisanale",
    ar: "فيديو التعبئة والإهداء الحرفي",
    en: "Bottling & Artisanal Dedication Video",
  },
  "cert.master_certified": {
    fr: "Certifié par le Maître Artisan",
    ar: "موثق من كبير الحرفيين",
    en: "Certified by Master Artisan",
  },
  "cert.recipient_label": {
    fr: "Destinataire :",
    ar: "المستلم :",
    en: "Recipient:",
  },
  "cert.serial_label": {
    fr: "N° de Série Flacon :",
    ar: "الرقم التسلسلي للزجاجة :",
    en: "Bottle Serial Number:",
  },
  "cert.batch_label": {
    fr: "Code Lot de Fabrication :",
    ar: "رمز دفعة الصنع :",
    en: "Batch Lot Code:",
  },
  "cert.bottling_date_label": {
    fr: "Mise en Flacon :",
    ar: "تاريخ التعبئة :",
    en: "Bottling Date:",
  },
  "cert.seal_valid": {
    fr: "Sceau monogrammé bordeaux et or validé par le laboratoire.",
    ar: "الختم المنقوش باللون النبيذي والذهب معتمد من المختبر.",
    en: "Burgundy & gold seal certified by laboratory.",
  },
  "cert.advice_title": {
    fr: "Conseils d'Application & Diffusion",
    ar: "نصائح الاستخدام والفوحان",
    en: "Application & Sillage Advice",
  },
  "cert.advice_text": {
    fr: "Pour sublimer le sillage de votre fragrance, vaporisez à 15 cm sur les points de pulsation : creux du cou, poignets et derrière les oreilles. Ne frottez pas le parfum pour préserver la délicatesse des molécules de tête.",
    ar: "لتعزيز فوحان عطرك، رش على مسافة 15 سم على نقاط النبض: الرقبة، المعصمين وخلف الأذنين. تجنب فرك العطر للحفاظ على نقاء المكونات العليا.",
    en: "To enhance your fragrance trail, spray at 15cm on pulse points: neck, wrists and behind ears. Do not rub the perfume to preserve top notes.",
  },
  "cert.key_accords": {
    fr: "Accords Olfactifs Clés :",
    ar: "أبرز النغمات العطرية :",
    en: "Key Olfactory Accords:",
  },
  "cert.view_product": {
    fr: "Découvrir la Fiche Produit Complète",
    ar: "مشاهدة صفحة العطر الكاملة",
    en: "View Complete Product Page",
  },
};
