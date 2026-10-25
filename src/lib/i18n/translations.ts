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
  "shop.clear_search": {
    fr: "Effacer la recherche",
    ar: "مسح البحث",
    en: "Clear search",
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
  "checkout.toast_success": {
    fr: "Commande Validée avec Succès",
    ar: "تم تأكيد طلبكم بنجاح",
    en: "Order Confirmed Successfully",
  },
  "checkout.toast_desc": {
    fr: "Réf {orderNum} • +{luck} Luck crédités !",
    ar: "رقم الطلب {orderNum} • تم شحن +{luck} نقطة حظ !",
    en: "Ref {orderNum} • +{luck} Luck credited!",
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
  "reviews.r1_name": {
    fr: "Sarra M.",
    ar: "سارة م.",
    en: "Sarra M.",
  },
  "reviews.r1_city": {
    fr: "Tunis",
    ar: "تونس",
    en: "Tunis",
  },
  "reviews.r1_perfume": {
    fr: "Onde d'Or (100ml)",
    ar: "أوند دور (100 مل)",
    en: "Onde d'Or (100ml)",
  },
  "reviews.r1_comment": {
    fr: "Une tenue impressionnante. Je l'ai mis le matin avant de partir travailler, et le soir mes collègues me demandaient encore le nom de mon parfum. Le flacon cylindrique est somptueux !",
    ar: "ثبات مذهل حقًا. وضعته صباحًا قبل الذهاب إلى العمل، وفي المساء كان زملائي لا يزالون يسألونني عن اسم عطري. العلبة الأسطوانية تحفة فنية فاخرة!",
    en: "Impressive longevity. I applied it in the morning before leaving for work, and in the evening my colleagues were still asking for its name. The cylindrical case is sumptuous!",
  },
  "reviews.r2_name": {
    fr: "Karim B.",
    ar: "كريم ب.",
    en: "Karim B.",
  },
  "reviews.r2_city": {
    fr: "Sousse",
    ar: "سوسة",
    en: "Sousse",
  },
  "reviews.r2_perfume": {
    fr: "Oud Impérial (100ml)",
    ar: "عود إمبريال (100 مل)",
    en: "Oud Impérial (100ml)",
  },
  "reviews.r2_comment": {
    fr: "J'ai commandé pour l'anniversaire de mon père. Le QR code avec son nom personnalisé sur la bouteille l'a énormément touché. Livraison reçue en 24h chrono.",
    ar: "طلبته بمناسبة عيد ميلاد والدي. رمز الاستجابة السريعة (QR) مع اسمه المخصص على الزجاجة أثّر فيه بعمق. التوصيل تم في غضون 24 ساعة فقط.",
    en: "Ordered for my father's birthday. The QR code personalized with his name on the bottle touched him deeply. Delivered in less than 24 hours.",
  },
  "reviews.r3_name": {
    fr: "Amira K.",
    ar: "أميرة ك.",
    en: "Amira K.",
  },
  "reviews.r3_city": {
    fr: "Sfax",
    ar: "صفاقس",
    en: "Sfax",
  },
  "reviews.r3_perfume": {
    fr: "Néroli Flottant (50ml)",
    ar: "نيرولي فلوتان (50 مل)",
    en: "Néroli Flottant (50ml)",
  },
  "reviews.r3_comment": {
    fr: "Une fleur d'oranger pure et délicate qui rappelle les jardins de Nabeul. Très frais et élégant sans être agressif. Je recommanderai sans hésiter !",
    ar: "زهر برتقال نقي وناعم يذكرني بحدائق نابل العريقة في فصل الربيع. عطر منعش وراقٍ دون أي حدة. سأطلب مجددًا بكل تأكيد!",
    en: "A pure and delicate orange blossom reminiscent of the gardens of Nabeul in spring. Very fresh and elegant without being overpowering. Will definitely reorder!",
  },
  "pavilion.tab_signature": {
    fr: "Signature",
    ar: "التوقيع",
    en: "Signature",
  },
  "pavilion.tab_soft": {
    fr: "Soyeuse",
    ar: "الحريرية",
    en: "Silken",
  },
  "pavilion.tab_intense": {
    fr: "Sombre",
    ar: "الداكنة",
    en: "Dark",
  },
  "pavilion.concentration_badge": {
    fr: "Extrait de Parfum • 28% Concentré",
    ar: "خلاصة عطرية نقية • تركيز 28%",
    en: "Extrait de Parfum • 28% Concentration",
  },
  "pavilion.tap_diffuse_mobile": {
    fr: "~ Touchez pour diffuser",
    ar: "~ المس لنشر الأثير العطري",
    en: "~ Tap to diffuse scent",
  },
  "pavilion.tap_diffuse_desktop": {
    fr: "~ Touchez ou survolez pour diffuser l'onde olfactive",
    ar: "~ المس أو مرر الفأرة لنشر الموجة العطرية",
    en: "~ Tap or hover to release the olfactory wave",
  },
  "pavilion.sig_title": {
    fr: "L'Onde Signature (Équilibrée & Solaire)",
    ar: "الموجة التوقيع (متوازنة وشمسية)",
    en: "Signature Wave (Balanced & Solar)",
  },
  "pavilion.sig_tagline": {
    fr: "L'Équilibre Idéal • Bois d'Olivier & Ambre Doré",
    ar: "التوازن المثالي • خشب الزيتون والعنبر المذهب",
    en: "The Ideal Balance • Olive Wood & Golden Amber",
  },
  "pavilion.sig_palette": {
    fr: "Vert Olive • Or Champagne • Ambre",
    ar: "أخضر زيتوني • ذهب شامبانيا • عنبر",
    en: "Olive Green • Champagne Gold • Amber",
  },
  "pavilion.sig_desc": {
    fr: "Le parfum emblématique de la maison. Un accord chaleureux et solaire où le bois d'olivier centenaire s'associe au safran pur et à la vanille douce. Idéal pour tous les jours comme pour les grandes occasions.",
    ar: "العطر الأيقوني الخالد لدار ليفانيا. توليفة دافئة ومشرقة يلتقي فيها خشب الزيتون المعمر مع الزعفران النقي والفانيليا الناعمة. مثالي ليومياتك الراقية ومناسباتك الفاخرة.",
    en: "The iconic fragrance of the Maison. A warm, solar accord uniting centenary olive wood with pure saffron and gentle vanilla. Ideal for everyday elegance and grand occasions.",
  },
  "pavilion.sig_sillage": {
    fr: "Diffusion Élégante (environ 2 mètres)",
    ar: "فوحان راقٍ (حوالي 2 متر)",
    en: "Refined Sillage (approx. 2 meters)",
  },
  "pavilion.sig_longevity": {
    fr: "Excellente Tenue (14h+)",
    ar: "ثبات استثنائي (14+ ساعة)",
    en: "Exceptional Longevity (14h+)",
  },
  "pavilion.soft_title": {
    fr: "L'Onde Soyeuse (Fraîche & Florale)",
    ar: "الموجة الحريرية (منعشة وزهرية)",
    en: "Silken Wave (Fresh & Floral)",
  },
  "pavilion.soft_tagline": {
    fr: "Douceur Florale • Fleur d'Oranger & Néroli",
    ar: "نعومة زهرية • زهر البرتقال والنيرولي",
    en: "Floral Softness • Orange Blossom & Neroli",
  },
  "pavilion.soft_palette": {
    fr: "Ivoire • Fleur d'Oranger • Musc Blanc",
    ar: "عاجي • زهر البرتقال • مسك أبيض",
    en: "Ivory • Orange Blossom • White Musk",
  },
  "pavilion.soft_desc": {
    fr: "Un parfum lumineux et apaisant qui rappelle les jardins de Nabeul au printemps. Le néroli pur et la fleur d'oranger s'enveloppent de muscs blancs soyeux pour une sensation de propreté et d'élégance irrésistible.",
    ar: "عطر مشرق ومهدئ للأحاسيس يستحضر عبير بساتين نابل في الربيع. يمتزج النيرولي النقي وزهر البرتقال بمسك أبيض حريري ليمنحك إحساسًا فريدًا بالنقاء والجاذبية.",
    en: "A luminous, soothing fragrance evoking the springtime gardens of Nabeul. Pure neroli and orange blossom wrap in silken white musks for an irresistible feeling of cleanliness and grace.",
  },
  "pavilion.soft_sillage": {
    fr: "Subtil & Enveloppant",
    ar: "هادئ ومحيط بالأحاسيس",
    en: "Subtle & Enveloping",
  },
  "pavilion.soft_longevity": {
    fr: "Fraîcheur Durable (10h+)",
    ar: "انتعاش دائم (10+ ساعات)",
    en: "Lasting Freshness (10h+)",
  },
  "pavilion.intense_title": {
    fr: "L'Onde Sombre (Boisée & Intense)",
    ar: "الموجة الداكنة (خشبية وعميقة)",
    en: "Dark Wave (Woody & Intense)",
  },
  "pavilion.intense_tagline": {
    fr: "Caractère Affirmé • Oud Majestueux & Cuir",
    ar: "شخصية قوية • عود ملكي وجلد فاخر",
    en: "Commanding Character • Regal Oud & Leather",
  },
  "pavilion.intense_palette": {
    fr: "Noir Ébène • Oud Impérial • Épices",
    ar: "أسود أبنوسي • عود إمبريال • توابل",
    en: "Ebony Black • Imperial Oud • Spices",
  },
  "pavilion.intense_desc": {
    fr: "Une fragrance intense et magnétique pour ceux qui aiment les sillages puissants. L'oud sauvage et le cuir se mêlent à l'encens et au patchouli pour laisser une présence inoubliable là où vous passez.",
    ar: "عطر عميق ومغناطيسي لعشاق الفوحان القوي المهيب. يتناغم العود الطبيعي والجلد الفاخر مع البخور والباتشولي ليترك أثرًا لا يُنسى في كل مكان تحل به.",
    en: "An intense, magnetic fragrance for connoisseurs who adore powerful trails. Wild oud and noble leather blend with dark incense and patchouli for an unforgettable presence.",
  },
  "pavilion.intense_sillage": {
    fr: "Intense & Remarquable",
    ar: "فوحان قوي ولافت",
    en: "Intense & Striking",
  },
  "pavilion.intense_longevity": {
    fr: "Très Longue Tenue (18h+)",
    ar: "ثبات طويل جدًا (18+ ساعة)",
    en: "Very Long-Lasting (18h+)",
  },
  "hero.spray_released_title": {
    fr: "Sillage Libéré",
    ar: "تم إطلاق الأثر العطري",
    en: "Sillage Released",
  },
  "hero.spray_released_desc": {
    fr: "Diffusion active des molécules parfumées...",
    ar: "نغمات العطر في حالة انتشار نشط...",
    en: "Active diffusion of fragrant molecules...",
  },
  "hero.spray_bubble_sillage": {
    fr: "✨ Sillage Libéré : Note de Tête & Cœur",
    ar: "✨ الفوحان الملكي : نوتات القمة والقلب",
    en: "✨ Released Sillage: Top & Heart Notes",
  },
  "pyramid.act1_num": {
    fr: "TEMPS 1",
    ar: "الفصل الأول",
    en: "ACT 1",
  },
  "pyramid.act1_title": {
    fr: "L'Ouverture Fraîche",
    ar: "الافتتاحية المنعشة",
    en: "The Fresh Opening",
  },
  "pyramid.act1_subtitle": {
    fr: "Notes de Tête • Les 30 Premières Minutes",
    ar: "نوتات القمة • أول 30 دقيقة",
    en: "Top Notes • The First 30 Minutes",
  },
  "pyramid.act1_time": {
    fr: "Dès la vaporisation (0 à 30 min)",
    ar: "فور الرش (0 إلى 30 دقيقة)",
    en: "Upon spraying (0 to 30 min)",
  },
  "pyramid.act1_desc": {
    fr: "C'est la première impression que vous et votre entourage ressentez. Une envolée vive, hespéridée et pétillante qui éveille les sens avec élégance.",
    ar: "هي الانطباع الأولي الفوري الذي يأسرك ويأسر من حولك. انطلاقة حيوية فوارة من الحمضيات والنفحات المضيئة التي توقظ الحواس بكل رقي.",
    en: "The very first impression you and those around you experience. A vibrant, sparkling citrus and radiant burst that awakens the senses with elegance.",
  },
  "pyramid.act1_sensation": {
    fr: "Fraîcheur vive, éclat solaire et énergie immédiate.",
    ar: "انتعاش مفعم بالحياة، إشراقة شمسية وطاقة فورية.",
    en: "Lively freshness, solar radiance, and instant energy.",
  },
  "pyramid.act1_badge": {
    fr: "Première Impression",
    ar: "الانطباع الأول",
    en: "First Impression",
  },
  "pyramid.act2_num": {
    fr: "TEMPS 2",
    ar: "الفصل الثاني",
    en: "ACT 2",
  },
  "pyramid.act2_title": {
    fr: "Le Cœur du Parfum",
    ar: "قلب العطر",
    en: "The Heart of the Scent",
  },
  "pyramid.act2_subtitle": {
    fr: "Notes de Cœur • Votre Vraie Signature",
    ar: "نوتات القلب • بصمتك العطرية الحقيقية",
    en: "Heart Notes • Your True Signature",
  },
  "pyramid.act2_time": {
    fr: "Pendant 30 min à 4 heures",
    ar: "من 30 دقيقة إلى 4 ساعات",
    en: "From 30 min to 4 hours",
  },
  "pyramid.act2_desc": {
    fr: "Le véritable caractère de votre parfum. Les huiles précieuses se réchauffent au contact de votre peau pour exprimer votre charme et votre présence.",
    ar: "الجوهر الحقيقي لشخصية عطرك. تتفاعل الزيوت العطرية الثمينة مع دفء بشرتك لتعبّر عن جاذبيتك وحضورك الفريد طوال اليوم.",
    en: "The true character of your perfume. Precious oils warm on your skin to project your charm and magnetic presence.",
  },
  "pyramid.act2_sensation": {
    fr: "Profondeur enveloppante, élégance naturelle et présence magnétique.",
    ar: "عمق محيط بالأحاسيس، أناقة طبيعية وحضور مغناطيسي جذاب.",
    en: "Enveloping depth, natural elegance, and magnetic presence.",
  },
  "pyramid.act2_badge": {
    fr: "Signature Quotidienne",
    ar: "البصمة اليومية",
    en: "Daily Signature",
  },
  "pyramid.act3_num": {
    fr: "TEMPS 3",
    ar: "الفصل الثالث",
    en: "ACT 3",
  },
  "pyramid.act3_title": {
    fr: "La Longue Tenue",
    ar: "القاعدة والثبات الممتد",
    en: "The Long-Lasting Base",
  },
  "pyramid.act3_subtitle": {
    fr: "Notes de Fond • Jusqu'au Lendemain",
    ar: "نوتات القاعدة • تدوم حتى اليوم التالي",
    en: "Base Notes • Lasting Until the Next Day",
  },
  "pyramid.act3_time": {
    fr: "De 4h à 18h et plus",
    ar: "من 4 ساعات إلى أكثر من 18 ساعة",
    en: "From 4h to 18h and beyond",
  },
  "pyramid.act3_desc": {
    fr: "L'accord le plus riche et persistant. Grâce à une macération artisanale prolongée, ces notes nobles restent sur votre peau et vos vêtements jusqu'au lendemain.",
    ar: "الطبقة الأكثر ثراءً ورسوخًا. بفضل التعتيق الحرفي المطول، تستقر هذه النوتات الملكية على بشرتك وأزيائك حتى اليوم التالي.",
    en: "The richest, most persistent layer. Thanks to prolonged artisanal maceration, these noble notes linger on skin and garments into the next day.",
  },
  "pyramid.act3_sensation": {
    fr: "Tenue remarquable, réconfort et sillage inoubliable.",
    ar: "ثبات لا مثيل له، دفء مريح وأثر عطري لا يُنسى.",
    en: "Remarkable longevity, comforting warmth, and an unforgettable trail.",
  },
  "pyramid.act3_badge": {
    fr: "Très Longue Tenue (18h+)",
    ar: "ثبات فائق (18+ ساعة)",
    en: "Exceptional Longevity (18h+)",
  },
  "pyramid.sensory_imprint_label": {
    fr: "Empreinte Sensorielle :",
    ar: "البصمة الحسية :",
    en: "Sensory Impression:",
  },
  "bestsellers.podium_rank1": {
    fr: "N°1 des Ventes • Onde d'Or",
    ar: "الأكثر مبيعًا رقم 1 • أوند دور",
    en: "#1 Bestseller • Onde d'Or",
  },
  "family.amber": {
    fr: "Ambrée",
    ar: "عنبرية",
    en: "Amber",
  },
  "family.woody": {
    fr: "Boisée",
    ar: "خشبية",
    en: "Woody",
  },
  "family.floral": {
    fr: "Florale",
    ar: "زهرية",
    en: "Floral",
  },
  "family.citrus": {
    fr: "Hespéridée",
    ar: "حمضيات",
    en: "Citrus",
  },
  "family.spicy": {
    fr: "Épicée",
    ar: "توابل",
    en: "Spicy",
  },
  "family.fresh": {
    fr: "Fraîche",
    ar: "منعشة",
    en: "Fresh",
  },
  "family.sweet": {
    fr: "Gourmande",
    ar: "حلوة",
    en: "Sweet",
  },
  "family.oriental": {
    fr: "Orientale",
    ar: "شرقية",
    en: "Oriental",
  },
  "toast.added_to_cart": {
    fr: "Flacon ajouté à votre panier",
    ar: "تمت إضافة العطر إلى سلة التسوق",
    en: "Fragrance added to your shopping bag",
  },
  "toast.added_wishlist": {
    fr: "Ajouté à vos favoris",
    ar: "تمت الإضافة إلى المفضلة",
    en: "Added to your wishlist",
  },
  "toast.removed_wishlist": {
    fr: "Retiré de vos favoris",
    ar: "تمت الإزالة من المفضلة",
    en: "Removed from your wishlist",
  },
  "aria.add_wishlist": {
    fr: "Ajouter aux favoris",
    ar: "إضافة إلى المفضلة",
    en: "Add to wishlist",
  },
  "aria.open_cart": {
    fr: "Ouvrir le panier",
    ar: "فتح سلة التسوق",
    en: "Open shopping bag",
  },
  "aria.close": {
    fr: "Fermer",
    ar: "إغلاق",
    en: "Close",
  },
  "product.wave_bg_label": {
    fr: "Onde en Fond :",
    ar: "الموجة في الخلفية :",
    en: "Backdrop Wave:",
  },
  "product.wave_soyeuse": {
    fr: "Onde Soyeuse Diaphane",
    ar: "موجة حريرية شفافة",
    en: "Diaphanous Silken Wave",
  },
  "product.wave_sombre": {
    fr: "Onde Sombre & Boisée",
    ar: "موجة داكنة وخشبية",
    en: "Dark & Woody Wave",
  },
  "product.wave_signature": {
    fr: "Vague Signature Solaire",
    ar: "موجة التوقيع الشمسية",
    en: "Solar Signature Wave",
  },
  "product.wave_soyeuse_full": {
    fr: "Onde Soyeuse Diaphane • Voile Intime",
    ar: "موجة حريرية شفافة • وشاح حميمي",
    en: "Diaphanous Silken Wave • Intimate Veil",
  },
  "product.wave_sombre_full": {
    fr: "Onde Sombre & Boisée • Sillage Monumental",
    ar: "موجة داكنة وخشبية • فوحان أسطوري",
    en: "Dark & Woody Wave • Monumental Sillage",
  },
  "product.wave_signature_full": {
    fr: "Vague Signature • Noblesse Méditerranéenne",
    ar: "موجة التوقيع • نبل متوسطي أصيل",
    en: "Signature Wave • Mediterranean Nobility",
  },
  "product.diffusion_spec": {
    fr: "Diffusion 14h • Rayonnement 2.5m",
    ar: "ثبات 14 ساعة • مدى فوحان 2.5 متر",
    en: "14h Diffusion • 2.5m Projection",
  },
  "product.harmonic_arch": {
    fr: "Architecture Harmonique",
    ar: "الهندسة العطرية المتناغمة",
    en: "Harmonic Architecture",
  },
  "product.layer_awakening": {
    fr: "L'Éveil",
    ar: "الصحوة الأولى",
    en: "The Awakening",
  },
  "product.layer_soul": {
    fr: "L'Âme du Sillage",
    ar: "روح الأثر العطري",
    en: "The Soul of the Sillage",
  },
  "product.layer_imprint": {
    fr: "L'Empreinte",
    ar: "البصمة الخالدة",
    en: "The Imprint",
  },
  "product.layer_head_title": {
    fr: "Notes de Tête (Première Impression)",
    ar: "نوتات القمة (الانطباع الأول)",
    en: "Top Notes (First Impression)",
  },
  "product.layer_heart_title": {
    fr: "Notes de Cœur (Signature Centrale)",
    ar: "نوتات القلب (البصمة المركزية)",
    en: "Heart Notes (Central Signature)",
  },
  "product.layer_base_title": {
    fr: "Notes de Fond (Tenue Inoubliable)",
    ar: "نوتات القاعدة (ثبات لا يُنسى)",
    en: "Base Notes (Unforgettable Longevity)",
  },
  "product.sticky_quick_buy": {
    fr: "Commander",
    ar: "اطلب الآن",
    en: "Order Now",
  },
  "product.sticky_add": {
    fr: "Ajouter",
    ar: "إضافة",
    en: "Add",
  },
  "note_modal.head_label": {
    fr: "Note de Tête • L'Éveil (Première Impression)",
    ar: "نوتة القمة • الصحوة الأولى (الانطباع الفوري)",
    en: "Top Note • The Awakening (First Impression)",
  },
  "note_modal.heart_label": {
    fr: "Note de Cœur • L'Âme du Sillage (Signature Centrale)",
    ar: "نوتة القلب • روح الأثر العطري (البصمة المركزية)",
    en: "Heart Note • The Soul of the Sillage (Core Signature)",
  },
  "note_modal.base_label": {
    fr: "Note de Fond • L'Empreinte (Tenue Inoubliable)",
    ar: "نوتة القاعدة • البصمة الخالدة (ثبات ممتد)",
    en: "Base Note • The Imprint (Unforgettable Longevity)",
  },
  "note_modal.raw_material": {
    fr: "Matière Première • Haute Parfumerie",
    ar: "مادة خام فاخرة • صناعة العطور الراقية",
    en: "Precious Raw Material • Haute Parfumerie",
  },
  "note_modal.origin": {
    fr: "Terroir d'Origine",
    ar: "الموطن الأصلي والتربة",
    en: "Terroir of Origin",
  },
  "note_modal.extraction": {
    fr: "Méthode d'Extraction",
    ar: "طريقة الاستخلاص",
    en: "Extraction Method",
  },
  "note_modal.holding_time": {
    fr: "Tenue Active",
    ar: "مدة البقاء الفعالة",
    en: "Active Longevity",
  },
  "note_modal.wave_harmony": {
    fr: "Harmonie Onde",
    ar: "التناغم مع الموجة",
    en: "Wave Harmony",
  },
  "note_modal.house_seal": {
    fr: "Maison Lévania • Alchimie Méditerranéenne",
    ar: "دار ليفانيا للعطور • كيمياء متوسطية أصيلة",
    en: "Maison Lévania • Mediterranean Alchemy",
  },
  "note_modal.close": {
    fr: "Fermer",
    ar: "إغلاق",
    en: "Close",
  },
  "cert_modal.seal_title": {
    fr: "Maison Lévania • Paris • Nabeul",
    ar: "دار ليفانيا للعطور • باريس • نابل",
    en: "Maison Lévania • Paris • Nabeul",
  },
  "cert_modal.title": {
    fr: "Certificat d'Authenticité & de Traçabilité",
    ar: "شهادة الأصالة والتتبع الرسمي",
    en: "Certificate of Authenticity & Traceability",
  },
  "cert_modal.subtitle": {
    fr: "Registre officiel de haute parfumerie artisanale • Cueillette & Macération certifiées",
    ar: "السجل الرسمي لصناعة العطور الحرفية • قطاف وتعتيق موثقان مخبريًا",
    en: "Official register of artisanal haute parfumerie • Certified harvest & maceration",
  },
  "cert_modal.creation_label": {
    fr: "Création Olfactive",
    ar: "الابتكار العطري",
    en: "Olfactory Creation",
  },
  "cert_modal.verified_compliant": {
    fr: "Vérifié Conforme",
    ar: "موثق ومطابق للمواصفات",
    en: "Verified Compliant",
  },
  "cert_modal.spec_concentration": {
    fr: "Concentration",
    ar: "التركيز",
    en: "Concentration",
  },
  "cert_modal.spec_concentration_val": {
    fr: "28% Extrait Pur",
    ar: "خلاصة نقية 28%",
    en: "28% Pure Extract",
  },
  "cert_modal.spec_maceration": {
    fr: "Macération",
    ar: "مدة التعتيق",
    en: "Maceration",
  },
  "cert_modal.spec_maceration_val": {
    fr: "180 Jours en Verre Obscurci",
    ar: "180 يومًا في زجاج معتم",
    en: "180 Days in Dark Glass",
  },
  "cert_modal.spec_terroir": {
    fr: "Terroir Clé",
    ar: "الموطن الأساسي",
    en: "Key Terroir",
  },
  "cert_modal.spec_wax": {
    fr: "Cire & Scellé",
    ar: "الشمع والختم",
    en: "Wax & Seal",
  },
  "cert_modal.spec_wax_val": {
    fr: "Tampon d'Artisan Manuel",
    ar: "ختم حرفي يدوي",
    en: "Handcrafted Artisan Stamp",
  },
  "cert_modal.spec_vintage": {
    fr: "Millésime",
    ar: "سنة الإصدار",
    en: "Vintage",
  },
  "cert_modal.spec_vintage_val": {
    fr: "Édition 2026",
    ar: "إصدار 2026",
    en: "2026 Edition",
  },
  "cert_modal.spec_glass": {
    fr: "Flaconnage",
    ar: "صناعة الزجاج",
    en: "Bottle Glass",
  },
  "cert_modal.spec_glass_val": {
    fr: "Verre Haute Densité",
    ar: "زجاج عالي الكثافة والنقاء",
    en: "High-Density Glass",
  },
  "cert_modal.batch_label": {
    fr: "N° de Lot Sécurisé • Clé d'Authenticité",
    ar: "رقم الدفعة المؤمن • مفتاح التوثيق",
    en: "Secured Batch No. • Authenticity Key",
  },
  "cert_modal.copy_btn": {
    fr: "Copier le N°",
    ar: "نسخ الرقم",
    en: "Copy Number",
  },
  "cert_modal.copied_btn": {
    fr: "Copié",
    ar: "تم النسخ",
    en: "Copied",
  },
  "cert_modal.haute_parfumerie_vow": {
    fr: "Formulé selon les préceptes de la Haute Parfumerie",
    ar: "صيغ وفق أسمى معايير العطور الراقية",
    en: "Formulated according to Haute Parfumerie precepts",
  },
  "cert_modal.master_perfumer": {
    fr: "Maître Nez Parfumeur",
    ar: "كبير خبراء العطور",
    en: "Master Perfumer",
  },
  "cert_modal.atelier_title": {
    fr: "Atelier Lévania",
    ar: "محترف ليفانيا",
    en: "Lévania Atelier",
  },
  "sticky.quick_bar_aria": {
    fr: "Barre d'achat rapide",
    ar: "شريط الشراء السريع",
    en: "Quick purchase bar",
  },
  "sticky.add": {
    fr: "Ajouter",
    ar: "إضافة",
    en: "Add",
  },
  "sticky.order": {
    fr: "Commander",
    ar: "اطلب الآن",
    en: "Order Now",
  },
  "nav.main_menu": {
    fr: "Menu Principal",
    ar: "القائمة الرئيسية",
    en: "Main Menu",
  },
  "cart.open_cart": {
    fr: "Ouvrir le panier",
    ar: "فتح سلة التسوق",
    en: "Open Cart",
  },

  "cart.coupon_active": {
    fr: "Code activé :",
    ar: "تم تفعيل القسيمة :",
    en: "Coupon active:",
  },
  "cart.luck_reward_suffix": {
    fr: "pour la Roue Cadeau !",
    ar: "لعجلة الهدايا الحصرية !",
    en: "for the Gift Wheel!",
  },
  "nav.mystery_box": {
    fr: "Mystery Box",
    ar: "صناديق المفاجآت",
    en: "Mystery Box",
  },
  "mystery.tag": {
    fr: "Surprise de Prestige & Transparence",
    ar: "مفاجأة فاخرة بشفافية تامة",
    en: "Prestige Surprise & Transparency",
  },
  "mystery.title": {
    fr: "Les Mystery Boxes Lévania",
    ar: "صناديق المفاجآت الفاخرة من ليفانيا",
    en: "Lévania Mystery Boxes",
  },
  "mystery.subtitle": {
    fr: "Le frisson du hasard allié à la rigueur de la haute parfumerie. Chaque boîte garantit une valeur marchande strictement supérieure au prix d'achat.",
    ar: "متعة التشويق تلتقي مع فخامة العطور الراقية. كل صندوق يضمن لك قيمة عطرية أعلى بكثير من ثمن الشراء.",
    en: "The thrill of surprise meets haute parfumerie excellence. Every box is guaranteed to contain items worth far more than the purchase price.",
  },
  "mystery.transparency_label": {
    fr: "Transparence Totale :",
    ar: "شفافية مطلقة :",
    en: "Total Transparency:",
  },
  "mystery.transparency_text": {
    fr: "Aucun produit périmé ni générique. Exclusivement des flacons officiels Lévania neufs et scellés.",
    ar: "لا منتجات مقلدة أو قديمة إطلاقًا. حصرًا عطور ليفانيا الأصلية الجديدة والمختومة بالشمع.",
    en: "No expired or generic products. Exclusively brand-new, sealed official Lévania flacons.",
  },
  "mystery.guaranteed_val_badge": {
    fr: "Valeur Marchande Garantie",
    ar: "قيمة مضمونة تفوق السعر",
    en: "Guaranteed Retail Value",
  },
  "mystery.stock_left": {
    fr: "Reste {n} ex.",
    ar: "متبقي {n} قطع فقط",
    en: "{n} left in stock",
  },
  "mystery.possible_contents": {
    fr: "Contenus Possibles :",
    ar: "المحتويات المحتملة :",
    en: "Possible Contents:",
  },
  "mystery.box_price": {
    fr: "Prix Coffret",
    ar: "سعر الصندوق",
    en: "Box Price",
  },
  "mystery.min_val": {
    fr: "Valeur Min.",
    ar: "القيمة الدنيا",
    en: "Min. Value",
  },
  "mystery.try_btn": {
    fr: "Tenter la Surprise",
    ar: "اكتشف مفاجأتك الآن",
    en: "Try Your Luck",
  },
  "mystery.toast_added": {
    fr: "Mystery Box Ajoutée au Panier",
    ar: "تمت إضافة صندوق المفاجآت إلى السلة",
    en: "Mystery Box Added to Bag",
  },
  "mystery.box1_name": {
    fr: "Mystery Box • Initiation Olfactive",
    ar: "صندوق المفاجآت • البداية العطرية",
    en: "Mystery Box • Olfactory Initiation",
  },
  "mystery.box1_title": {
    fr: "Onde Soyeuse",
    ar: "الموجة الحريرية",
    en: "Silken Wave",
  },
  "mystery.box1_desc": {
    fr: "Un élixir 50ml garanti au hasard parmi nos bestsellers + 2 échantillons découverte 5ml scellés dans l'écrin cylindrique.",
    ar: "زجاجة عطر 50 مل مضمونة من بين عطورنا الأكثر طلبًا + عينتان 5 مل في العلبة الأسطوانية.",
    en: "Guaranteed 50ml flacon from our bestsellers + 2 discovery samples (5ml) in cylinder case.",
  },
  "mystery.box2_name": {
    fr: "Mystery Box • Or Impérial",
    ar: "صندوق المفاجآت • الذهب الإمبراطوري",
    en: "Mystery Box • Imperial Gold",
  },
  "mystery.box2_title": {
    fr: "Onde Signature",
    ar: "الموجة التوقيع",
    en: "Signature Wave",
  },
  "mystery.box2_desc": {
    fr: "Au minimum un grand flacon 100ml de la Collection Signature ou Sombre & Boisée + un accessoire précieux (Ruban, Écrin double).",
    ar: "على الأقل زجاجة عطر فاخرة 100 مل من مجموعة التوقيع أو الداكنة + إكسسوار فاخر.",
    en: "At least one full 100ml flacon from Signature or Dark collection + luxury accessory.",
  },
  "mystery.box3_name": {
    fr: "Mystery Box • Grand Sceau Royal",
    ar: "صندوق المفاجآت • الختم الملكي الكبير",
    en: "Mystery Box • Grand Royal Seal",
  },
  "mystery.box3_title": {
    fr: "Onde Sombre",
    ar: "الموجة الداكنة",
    en: "Dark Wave",
  },
  "mystery.box3_desc": {
    fr: "Le sommet de la surprise de luxe : 2 Flacons garantis (1x 100ml + 1x 50ml) + ensemble d'échantillons complet de la maison.",
    ar: "قمة المفاجآت الفاخرة: عطران مضمونان (100 مل + 50 مل) + باقة العينات الكاملة لجميع عطور الدار.",
    en: "The ultimate luxury surprise: 2 guaranteed flacons (100ml + 50ml) + complete house sample set.",
  },
  "compose.step_box": {
    fr: "Écrin",
    ar: "العلبة",
    en: "Case",
  },
  "compose.step_perfumes": {
    fr: "Flacons",
    ar: "العطور",
    en: "Flacons",
  },
  "compose.step_finishing": {
    fr: "Finitions",
    ar: "اللمسات",
    en: "Finishes",
  },
  "compose.step_preview": {
    fr: "Aperçu",
    ar: "المعاينة",
    en: "Preview",
  },
  "compose.capacity_reached_title": {
    fr: "Capacité maximale atteinte",
    ar: "تم بلوغ السعة القصوى",
    en: "Maximum capacity reached",
  },
  "compose.capacity_reached_desc": {
    fr: "Ce coffret accueille au maximum {n} flacon(s).",
    ar: "هذا الصندوق يتسع لحد أقصى {n} عطر.",
    en: "This box holds a maximum of {n} flacon(s).",
  },
  "compose.select_at_least_one": {
    fr: "Veuillez sélectionner au moins un flacon",
    ar: "يرجى اختيار عطر واحد على الأقل",
    en: "Please select at least one flacon",
  },
  "compose.toast_added": {
    fr: "Coffret Personnalisé Ajouté au Panier",
    ar: "تمت إضافة الصندوق المخصص إلى السلة",
    en: "Custom Gift Box Added to Bag",
  },
  "compose.wrapping_name": {
    fr: "Papier de Soie Nacré & Velours Lévania",
    ar: "ورق حريري لؤلؤي ومخمل ليفانيا الفاخر",
    en: "Pearly Silk Paper & Lévania Velvet",
  },
  "compose.box1_name": {
    fr: "L'Écrin Cylindrique Signature (1 Flacon)",
    ar: "العلبة الأسطوانية التوقيع (عطر واحد)",
    en: "Signature Cylindrical Case (1 Flacon)",
  },
  "compose.box1_desc": {
    fr: "Le cylindre iconique vert olive doré Lévania, doublé d'une mousse protectrice sur mesure.",
    ar: "الأسطوانة الأيقونية باللون الأخضر الزيتوني والذهب مع بطانة حماية مخملية مخصصة.",
    en: "Iconic Lévania olive green and gold cylinder, lined with protective custom foam.",
  },
  "compose.box2_name": {
    fr: "Le Coffret Duo Prestige (2 Flacons)",
    ar: "صندوق الثنائي الفاخر برستيج (عطران)",
    en: "Prestige Duo Box (2 Flacons)",
  },
  "compose.box2_desc": {
    fr: "Duo de flacons 50ml ou 100ml dans leur écrin double rigide aux finitions bordeaux et or.",
    ar: "عطران سعة 50 مل أو 100 مل في علبة صلبة مزدوجة بلمسات ملكية من اللون النبيذي والذهب.",
    en: "Duo of 50ml or 100ml flacons in a rigid double case with burgundy and gold finishes.",
  },
  "compose.box3_name": {
    fr: "Le Grand Triptyque Royal (3 Flacons)",
    ar: "الصندوق الثلاثي الملكي (3 عطور)",
    en: "Grand Royal Triptych (3 Flacons)",
  },
  "compose.box3_desc": {
    fr: "Coffret d'apparat contenant trois élixirs au choix, scellé d'un médaillon en cire monogrammé Lévania.",
    ar: "صندوق ملكي مهيب يضم ثلاثة عطور من اختيارك، مختوم بمدالية شمعية منقوشة بشعار الدار.",
    en: "Ceremonial box containing three chosen elixirs, sealed with a Lévania wax medallion.",
  },
  "compose.acc_ribbon": {
    fr: "Ruban de Satin Bordeaux & Or Ciselé",
    ar: "شريط ستان نبيذي وذهب منقوش",
    en: "Burgundy & Gold Chiseled Satin Ribbon",
  },
  "compose.acc_flowers": {
    fr: "Fleurs Séchées de Néroli & Lavande Méditerranéenne",
    ar: "زهور نيرولي وخزامى متوسطية مجففة",
    en: "Dried Neroli & Mediterranean Lavender",
  },
  "compose.acc_sealing": {
    fr: "Cachet de Cire Lévania & Écrin Velours",
    ar: "ختم شمعي من ليفانيا وحافظة مخملية",
    en: "Lévania Wax Seal & Velvet Pouch",
  },
  "compose.step1_title": {
    fr: "1. Choisissez Votre Format d'Écrin",
    ar: "1. اختر تصميم العلبة الفاخرة",
    en: "1. Choose Your Box Format",
  },
  "compose.step1_desc": {
    fr: "Nos boîtes cylindriques et coffrets rigides sont réalisés artisanalement en carton recyclé noble et finitions dorées.",
    ar: "صناديقنا الأسطوانية والصلبة صُنعت يدويًا ببراعة حرفية متناهية مع لمسات مذهبة.",
    en: "Our cylindrical and rigid cases are handcrafted with noble materials and gilded touches.",
  },
  "compose.holds_up_to": {
    fr: "Accueille jusqu'à {n} parfum(s)",
    ar: "تتسع لما يصل إلى {n} عطر",
    en: "Holds up to {n} perfume(s)",
  },
  "compose.next_perfumes": {
    fr: "Suivant : Flacons",
    ar: "التالي : اختيار العطور",
    en: "Next: Fragrances",
  },
  "compose.step2_title": {
    fr: "2. Choisissez Vos Fragrances",
    ar: "2. اختر العطور التي ترغب بها",
    en: "2. Choose Your Fragrances",
  },
  "compose.step2_desc": {
    fr: "Sélectionnez jusqu'à {n} parfum(s) pour composer votre harmonie.",
    ar: "اختر حتى {n} عطور لصياغة تناغمك العطري المفضل.",
    en: "Select up to {n} perfume(s) to craft your olfactory harmony.",
  },
  "compose.remove": {
    fr: "Retirer",
    ar: "إزالة",
    en: "Remove",
  },
  "compose.select_50ml": {
    fr: "Sélectionner (50ml)",
    ar: "اختيار (50 مل)",
    en: "Select (50ml)",
  },
  "compose.included": {
    fr: "Inclus",
    ar: "مضاف",
    en: "Included",
  },
  "compose.back": {
    fr: "Retour",
    ar: "رجوع",
    en: "Back",
  },
  "compose.next_finishes": {
    fr: "Suivant : Finitions",
    ar: "التالي : اللمسات الختامية",
    en: "Next: Finishing",
  },
  "compose.step3_title": {
    fr: "3. Finitions Décoratives & Dédicace",
    ar: "3. اللمسات الراقية والإهداء",
    en: "3. Decorative Touches & Dedication",
  },
  "compose.step3_desc": {
    fr: "Chaque détail transforme votre coffret en une œuvre d'art mémorable.",
    ar: "كل لمسة تحول صندوق هديتك إلى تحفة فنية لا تُنسى.",
    en: "Every touch turns your gift box into a memorable work of art.",
  },
  "compose.accessories_label": {
    fr: "Accessoires d'Élégance",
    ar: "إكسسوارات الأناقة",
    en: "Elegance Accessories",
  },
  "compose.calligraphy_label": {
    fr: "Message Calligraphié Offert",
    ar: "بطاقة إهداء مخصصة بالخط العربي مجانًا",
    en: "Complimentary Calligraphy Message",
  },
  "compose.recipient_placeholder": {
    fr: "Nom du destinataire (ex: Yasmine)",
    ar: "اسم المستلم (مثال: ياسمين)",
    en: "Recipient's name (e.g., Jasmine)",
  },
  "compose.message_placeholder": {
    fr: "Votre mot tendre (ex: Pour célébrer ton éclat...)",
    ar: "رسالتك الخاصة (مثال: احتفاءً بنورك وإشراقتك...)",
    en: "Your warm words (e.g., Celebrating your brilliance...)",
  },
  "compose.for_prefix": {
    fr: "Pour",
    ar: "إلى",
    en: "For",
  },
  "compose.you_default": {
    fr: "Vous",
    ar: "شخصكم الكريم",
    en: "You",
  },
  "compose.parchment_label": {
    fr: "Imprimé sur papier parchemin doré Lévania",
    ar: "مطبوعة على ورق بردي مذهب حصري من ليفانيا",
    en: "Printed on Lévania gilded parchment paper",
  },
  "compose.view_preview": {
    fr: "Voir l'Aperçu Final",
    ar: "معاينة الصندوق النهائي",
    en: "View Final Preview",
  },
  "compose.step4_title": {
    fr: "4. Aperçu de Votre Création Sur-Mesure",
    ar: "4. معاينة ابتكارك المخصص",
    en: "4. Preview of Your Bespoke Creation",
  },
  "compose.step4_desc": {
    fr: "Votre coffret est prêt à être confectionné avec le plus grand soin par nos artisans.",
    ar: "صندوقك الملكي جاهز للتجهيز بحرفية فائقة بأيدي حرفيينا المهرة.",
    en: "Your gift box is ready to be meticulously assembled by our artisans.",
  },
  "compose.wax_imprint_label": {
    fr: "Scellé au cachet de cire monogrammé Lévania",
    ar: "مختوم بشمع فاخر يحمل شعار دار ليفانيا",
    en: "Sealed with Lévania monogrammed wax seal",
  },
  "compose.modify": {
    fr: "Modifier",
    ar: "تعديل",
    en: "Modify",
  },
  "compose.add_to_cart_btn": {
    fr: "Ajouter au Panier",
    ar: "أضف إلى السلة",
    en: "Add to Bag",
  },
  "compose.summary_title": {
    fr: "Récapitulatif Coffret",
    ar: "ملخص الصندوق",
    en: "Box Summary",
  },
  "compose.box_total": {
    fr: "Total du Coffret",
    ar: "مجموع الصندوق",
    en: "Box Total",
  },
  "compose.box_wave": {
    fr: "Onde du Coffret",
    ar: "موجة الصندوق",
    en: "Box Wave",
  },
  "compose.harmony_soft": {
    fr: "Harmonie Soyeuse",
    ar: "التناغم الحريري",
    en: "Silken Harmony",
  },
  "compose.harmony_dark": {
    fr: "Harmonie Sombre",
    ar: "التناغم الداكن",
    en: "Dark Harmony",
  },
  "compose.harmony_signature": {
    fr: "Harmonie Signature",
    ar: "تناغم التوقيع",
    en: "Signature Harmony",
  },
  "compose.guarantee_title": {
    fr: "Garantie Haute Parfumerie",
    ar: "ضمان العطور الراقية",
    en: "Haute Parfumerie Guarantee",
  },
  "compose.guarantee_desc": {
    fr: "Emballage soigné, livraison assurée sous 24h à 48h partout en Tunisie.",
    ar: "تغليف استثنائي وتوصيل سريع ومؤمن خلال 24 إلى 48 ساعة في كامل أنحاء تونس.",
    en: "Meticulous packaging, guaranteed 24-48h delivery throughout Tunisia.",
  },
  "promotions.included_content": {
    fr: "Contenu Spécial Inclus :",
    ar: "المحتويات المشمولة في العرض :",
    en: "Special Included Contents:",
  },
  "promotions.order_pack": {
    fr: "Commander Ce Pack",
    ar: "طلب هذا العرض الآن",
    en: "Order This Pack",
  },
  "promotions.toast_added": {
    fr: "Pack Privilège Ajouté au Panier",
    ar: "تمت إضافة العرض الحصري إلى السلة",
    en: "Privilege Pack Added to Bag",
  },
  "promotions.pack1_theme": {
    fr: "Mariage",
    ar: "الأعراس والزفاف",
    en: "Wedding",
  },
  "promotions.pack1_title": {
    fr: "Le Coffret des Mariés • Noces d'Or",
    ar: "صندوق العروسين • الأعراس الذهبية",
    en: "The Bridal Box • Golden Wedding",
  },
  "promotions.pack1_tagline": {
    fr: "L'union suprême de deux âmes olfactives",
    ar: "الالتقاء الأسمى بين روحين عطريتين",
    en: "The supreme union of two olfactory souls",
  },
  "promotions.pack1_desc": {
    fr: "Deux flacons d'exception (Onde d'Or 100ml + Néroli Flottant 100ml) dans leur grand coffret d'apparat, accompagnés d'un ruban satin bordeaux et d'une dédicace calligraphiée personnalisée.",
    ar: "عطران استثنائيان (أوند دور 100 مل + نيرولي فلوتان 100 مل) في صندوق فاخر مع شريط ستان ملكي وإهداء مخصص بالخط العربي الأصيل.",
    en: "Two exceptional flacons (Onde d'Or 100ml + Néroli Flottant 100ml) in a ceremonial box with burgundy satin ribbon and custom calligraphy.",
  },
  "promotions.pack1_badge": {
    fr: "-115 TND Remise Cérémonie",
    ar: "تخفيض 115 د.ت لموسم الأفراح",
    en: "-115 TND Ceremony Discount",
  },
  "promotions.pack2_theme": {
    fr: "Omra & Célébration",
    ar: "العمرة والمناسبات الدينية",
    en: "Umrah & Celebration",
  },
  "promotions.pack2_title": {
    fr: "Pack Sillage Sacré • Omra & Événements",
    ar: "باقة الأثر المبارك • العمرة والاحتفالات",
    en: "Sacred Sillage Pack • Umrah & Events",
  },
  "promotions.pack2_tagline": {
    fr: "Pureté des accords précieux sans compromis",
    ar: "نقاء النوتات الثمينة بروحانية رفيعة",
    en: "Purity of noble accords without compromise",
  },
  "promotions.pack2_desc": {
    fr: "Flacon Oud Impérial 100ml accompagné de l'extrait Ambre Méditerranéen 50ml et d'un étui de voyage cylindrique protecteur.",
    ar: "عطر عود إمبريال 100 مل مصحوبًا بخلاصة العنبر 50 مل وحافظة سفر أسطوانية واقية.",
    en: "Oud Impérial 100ml flacon accompanied by Mediterranean Amber extract 50ml and a protective travel case.",
  },
  "promotions.pack2_badge": {
    fr: "-20% Pack Spirituel",
    ar: "خصم 20% للباقة الروحانية",
    en: "-20% Spiritual Pack",
  },
  "promotions.pack3_theme": {
    fr: "Anniversaire",
    ar: "أعياد الميلاد والمناسبات",
    en: "Birthday",
  },
  "promotions.pack3_title": {
    fr: "Coffret Anniversaire • Sillage d'Olivier",
    ar: "صندوق عيد الميلاد • سيّاج دوليفيي",
    en: "Birthday Box • Sillage d'Olivier",
  },
  "promotions.pack3_tagline": {
    fr: "Pour marquer une date inoubliable",
    ar: "لتخليد تاريخ لا يُنسى",
    en: "To commemorate an unforgettable date",
  },
  "promotions.pack3_desc": {
    fr: "Flacon Sillage d'Olivier 100ml avec son cylindre vert olive, un flacon échantillon prestige 10ml offert et la carte d'anniversaire gravée.",
    ar: "عطر سيّاج دوليفيي 100 مل مع علبته الأسطوانية الزيتونية، وعينة فاخرة 10 مل مجانية وبطاقة تهنئة منقوشة.",
    en: "Sillage d'Olivier 100ml flacon with olive green cylinder, complimentary 10ml prestige sample and engraved birthday card.",
  },
  "promotions.pack3_badge": {
    fr: "Échantillon Luxe Offert",
    ar: "عينة فاخرة مهداة",
    en: "Complimentary Luxury Sample",
  },
  "wheel.tier_initial": {
    fr: "Onde Initiale (1–100 Luck)",
    ar: "الموجة الابتدائية (1–100 نقطة)",
    en: "Initial Wave (1–100 Luck)",
  },
  "wheel.tier_ardent": {
    fr: "Onde Ardente (101–1,000 Luck)",
    ar: "الموجة المتوقدة (101–1,000 نقطة)",
    en: "Ardent Wave (101–1,000 Luck)",
  },
  "wheel.tier_royal": {
    fr: "Onde Royale (1,001–7,776 Luck)",
    ar: "الموجة الملكية (1,001–7,776 نقطة)",
    en: "Royal Wave (1,001–7,776 Luck)",
  },
  "wheel.tier_imperial": {
    fr: "Onde Impériale Suprême — Sceau 7,777",
    ar: "الموجة الإمبراطورية العظمى — الختم 7,777",
    en: "Supreme Imperial Wave — Seal 7,777",
  },
  "wheel.tier_level_title": {
    fr: "Votre Niveau de Fidélité",
    ar: "مستوى عضويتك المميز",
    en: "Your Loyalty Level",
  },
  "wheel.insufficient_luck_title": {
    fr: "Solde de Luck insuffisant",
    ar: "رصيد الحظ غير كافٍ",
    en: "Insufficient Luck balance",
  },
  "wheel.insufficient_luck_desc": {
    fr: "Passez commande sur le site pour accumuler de la Luck (1 Luck par 10 TND dépensés).",
    ar: "اطلب من المتجر لكسب نقاط الحظ (نقطة واحدة لكل 10 د.ت).",
    en: "Place an order to earn Luck (1 Luck per 10 TND spent).",
  },
  "wheel.revealed_toast": {
    fr: "Récompense Lévania Révélée !",
    ar: "تم الكشف عن جائزتك من ليفانيا !",
    en: "Lévania Reward Revealed!",
  },
  "wheel.code_copied_toast": {
    fr: "Code copié",
    ar: "تم نسخ الرمز بنجاح",
    en: "Code copied",
  },
  "wheel.milestone_reached": {
    fr: "Palier Exceptionnel Atteint !",
    ar: "تم بلوغ أسمى المراتب !",
    en: "Exceptional Milestone Reached!",
  },
  "wheel.milestone_remaining": {
    fr: "Plus que {n} Luck pour l'Onde Impériale",
    ar: "متبقي {n} نقطة فقط لبلوغ الموجة الإمبراطورية",
    en: "Only {n} Luck left to reach Imperial Wave",
  },
  "wheel.milestone_initial": {
    fr: "Initiale (1)",
    ar: "الابتدائية (1)",
    en: "Initial (1)",
  },
  "wheel.milestone_ardent": {
    fr: "Ardente (101)",
    ar: "المتوقدة (101)",
    en: "Ardent (101)",
  },
  "wheel.milestone_royal": {
    fr: "Royale (1001)",
    ar: "الملكية (1001)",
    en: "Royal (1001)",
  },
  "wheel.milestone_imperial": {
    fr: "Impériale (7777)",
    ar: "الإمبراطورية (7777)",
    en: "Imperial (7777)",
  },
  "wheel.history_title": {
    fr: "Historique de Vos Récompenses",
    ar: "سجل مكافآتك السابقة",
    en: "Your Reward History",
  },
  "wheel.enjoy_btn": {
    fr: "En profiter maintenant",
    ar: "الاستفادة من المكافأة الآن",
    en: "Enjoy Reward Now",
  },
  "wheel.rules_has_luck": {
    fr: "Chaque lancer consomme l'intégralité de vos {n} Luck. Le palier actuel garantit la table de récompenses {tier}.",
    ar: "كل تدويرة تستهلك كامل رصيدك البالغ {n} نقطة حظ. مستواك الحالي يضمن لك جوائز فئة {tier}.",
    en: "Each spin consumes all your {n} Luck. Current tier guarantees the {tier} reward table.",
  },
  "wheel.rules_no_luck": {
    fr: "Vous avez 0 Luck actuellement. Effectuez un achat pour recharger votre balance (1 Luck par tranche de 10 TND d'achat).",
    ar: "رصيدك الحالي 0 نقطة حظ. قم بالشراء لشحن رصيدك (نقطة واحدة لكل 10 د.ت).",
    en: "You currently have 0 Luck. Make a purchase to top up your balance (1 Luck per 10 TND spent).",
  },
  "account.privilege_badge": {
    fr: "Espace Privilège Membre",
    ar: "بوابة العضوية الحصرية",
    en: "Member Privilege Space",
  },
  "account.welcome": {
    fr: "Bienvenue, {name}",
    ar: "أهلاً بك، {name}",
    en: "Welcome, {name}",
  },
  "account.default_name": {
    fr: "Cher Connaisseur",
    ar: "عاشق العطور الراقية",
    en: "Dear Connoisseur",
  },
  "account.certified_account": {
    fr: "Compte certifié • {email}",
    ar: "حساب موثق رسميًا • {email}",
    en: "Certified Account • {email}",
  },
  "account.connect_sync": {
    fr: "Connectez-vous pour synchroniser vos flacons et points →",
    ar: "سجّل دخولك لمزامنة عطورك ونقاطك ←",
    en: "Sign in to sync your bottles and loyalty points →",
  },
  "account.spin_wheel_btn": {
    fr: "Lancer la Roue",
    ar: "تدوير العجلة",
    en: "Spin the Wheel",
  },
  "account.luck_balance_title": {
    fr: "Solde de Luck",
    ar: "رصيد الحظ",
    en: "Luck Balance",
  },
  "account.wave_label": {
    fr: "Vague :",
    ar: "الموجة :",
    en: "Wave:",
  },
  "account.none_wave": {
    fr: "Aucune",
    ar: "لا يوجد",
    en: "None",
  },
  "account.tour_wheel": {
    fr: "Tourner la Roue →",
    ar: "جرّب حظك الآن ←",
    en: "Spin the Wheel →",
  },
  "account.loyalty_points_title": {
    fr: "Points Fidélité",
    ar: "نقاط الوفاء",
    en: "Loyalty Points",
  },
  "account.points_suffix": {
    fr: "Points",
    ar: "نقطة",
    en: "Points",
  },
  "account.convert_discount": {
    fr: "Remise possible : {val} TND",
    ar: "خصم متاح : {val} د.ت",
    en: "Available discount: {val} TND",
  },
  "account.convert_btn": {
    fr: "Convertir →",
    ar: "تحويل النقاط ←",
    en: "Convert →",
  },
  "account.xp_level_title": {
    fr: "Niveau d'Expérience",
    ar: "مستوى الخبرة",
    en: "Experience Level",
  },
  "account.level_prefix": {
    fr: "Niveau {n}",
    ar: "المستوى {n}",
    en: "Level {n}",
  },
  "account.title_connoisseur": {
    fr: "Titre : Connaisseur Averti",
    ar: "اللقب : خبير عطور متميز",
    en: "Title: Seasoned Connoisseur",
  },
  "account.progress_details": {
    fr: "Détails progression →",
    ar: "تفاصيل التقدم ←",
    en: "Progress Details →",
  },
  "account.referral_title": {
    fr: "Parrainage",
    ar: "دعوة الأصدقاء",
    en: "Referrals",
  },
  "account.referral_count": {
    fr: "{n} Filleul(s)",
    ar: "{n} صديق مسجل",
    en: "{n} Friend(s)",
  },
  "account.referral_code_label": {
    fr: "Code : {code}",
    ar: "الرمز : {code}",
    en: "Code: {code}",
  },
  "account.share_link": {
    fr: "Partager mon lien →",
    ar: "مشاركة الرابط ←",
    en: "Share My Link →",
  },
  "account.recent_orders_title": {
    fr: "Vos Commandes Récentes",
    ar: "طلباتك الأخيرة",
    en: "Your Recent Orders",
  },
  "account.order_again": {
    fr: "Commander à nouveau",
    ar: "طلب عطر جديد",
    en: "Order Again",
  },
  "account.no_orders_title": {
    fr: "Aucune commande enregistrée pour le moment",
    ar: "لا توجد طلبات مسجلة حتى الآن",
    en: "No orders registered yet",
  },
  "account.no_orders_desc": {
    fr: "Vos flacons et coffrets commandés apparaîtront ici avec leur numéro de suivi et historique d'expédition.",
    ar: "ستظهر عطورك وصناديقك المطلوبة هنا مع أرقام التتبع وتفاصيل الشحن الدقيقة.",
    en: "Your ordered flacons and boxes will appear here with tracking numbers and delivery status.",
  },
  "account.explore_collections": {
    fr: "Découvrir les Collections",
    ar: "استكشف المجموعات",
    en: "Explore Collections",
  },
  "account.ordered_on": {
    fr: "Commandé le {date}",
    ar: "تاريخ الطلب : {date}",
    en: "Ordered on {date}",
  },
  "account.express_shipping_badge": {
    fr: "Livraison Colis Express Tunisie",
    ar: "توصيل سريع لكافة ولايات تونس",
    en: "Tunisia Express Parcel Delivery",
  },
  "loyalty.tag": {
    fr: "Programme Ambassadeur & Fidélité",
    ar: "برنامج السفراء والولاء",
    en: "Ambassador & Loyalty Program",
  },
  "loyalty.title": {
    fr: "Vos Points & Parrainages",
    ar: "نقاطك ودعوات الأصدقاء",
    en: "Your Points & Referrals",
  },
  "loyalty.subtitle": {
    fr: "Gagnez des points fidélité sur chaque achat et recevez 50% des points de vos filleuls sur leurs commandes qualifiées.",
    ar: "اكسب نقاط وفاء مع كل عملية شراء واحصل على 50% من نقاط أصدقائك عند أول طلب مؤهل لهم.",
    en: "Earn loyalty points on every purchase and receive 50% of your friends' points on their qualified orders.",
  },
  "loyalty.balance_title": {
    fr: "Solde Fidélité",
    ar: "رصيد الولاء",
    en: "Loyalty Balance",
  },
  "loyalty.balance_value_desc": {
    fr: "Valeur convertible : {val} TND en réductions",
    ar: "قيمة الاستبدال : {val} د.ت كخصم مباشر",
    en: "Redeemable value: {val} TND in discounts",
  },
  "loyalty.xp_title": {
    fr: "Rang d'Expérience (XP)",
    ar: "رتبة الخبرة (XP)",
    en: "Experience Rank (XP)",
  },
  "loyalty.xp_accumulated": {
    fr: "{points} XP accumulés • {mult}",
    ar: "{points} نقطة خبرة • {mult}",
    en: "{points} XP accumulated • {mult}",
  },
  "loyalty.double_xp_active": {
    fr: "Double XP Actif !",
    ar: "مضاعف النقاط نشط !",
    en: "Double XP Active!",
  },
  "loyalty.normal_mult": {
    fr: "Multiplicateur normal",
    ar: "المضاعف الاعتيادي",
    en: "Normal multiplier",
  },
  "loyalty.referrals_title": {
    fr: "Filleuls Enregistrés",
    ar: "الأصدقاء المسجلون",
    en: "Registered Referrals",
  },
  "loyalty.referrals_count": {
    fr: "{n} Ami(s) Parrainé(s)",
    ar: "{n} صديق مسجل برابطك",
    en: "{n} Friend(s) Referred",
  },
  "loyalty.referrals_desc": {
    fr: "Partagez votre lien exclusif pour percevoir 50% de leurs points d'achat.",
    ar: "شارك رابطك الخاص لتحصل على 50% من نقاط مشترياتهم.",
    en: "Share your exclusive link to earn 50% of their purchase points.",
  },
  "loyalty.referral_rule_tag": {
    fr: "Règle Officielle de Parrainage Lévania",
    ar: "القاعدة الرسمية لبرنامج سفراء ليفانيا",
    en: "Official Lévania Referral Rule",
  },
  "loyalty.referral_rule_title": {
    fr: "Recevez 50% des Points de Vos Amis",
    ar: "احصل على 50% من نقاط أصدقائك",
    en: "Receive 50% of Your Friends' Points",
  },
  "loyalty.referral_rule_desc": {
    fr: "Partagez votre lien exclusif. Dès que votre filleul effectue son premier achat d'au moins 100 TND, vous recevez automatiquement 50% de ses points de fidélité gagnés, crédités sur votre compte sans limitation de temps.",
    ar: "شارك رابطك الفريد. بمجرد أن يكمل صديقك أول طلب بقيمة 100 د.ت على الأقل، تُضاف 50% من نقاطه المكتسبة تلقائيًا إلى حسابك دون أي حد زمني.",
    en: "Share your exclusive link. As soon as your friend completes their first purchase of at least 100 TND, you automatically receive 50% of their earned loyalty points, credited without expiration.",
  },
  "loyalty.unique_link_label": {
    fr: "Votre Lien Unique de Parrainage :",
    ar: "رابط الدعوة الخاص بك :",
    en: "Your Unique Referral Link:",
  },
  "loyalty.copy_link": {
    fr: "Copier",
    ar: "نسخ",
    en: "Copy",
  },
  "loyalty.copied_link": {
    fr: "Copié !",
    ar: "تم النسخ !",
    en: "Copied!",
  },
  "loyalty.transparency_title": {
    fr: "Conditions de Transparence",
    ar: "شروط وضمانات الشفافية",
    en: "Transparency Conditions",
  },
  "loyalty.rule1": {
    fr: "S'applique sur les points de fidélité réels (hors Luck de la Roue).",
    ar: "تسري على نقاط الولاء الحقيقية (باستثناء نقاط حظ العجلة).",
    en: "Applies to actual loyalty points (excluding Wheel Luck).",
  },
  "loyalty.rule2": {
    fr: "Premier achat éligible dès 100 TND de commande livrée.",
    ar: "الطلب الأول مؤهل ابتداءً من 100 د.ت مستلمة.",
    en: "First order eligible starting at 100 TND delivered.",
  },
  "loyalty.rule3": {
    fr: "L'auto-parrainage est automatiquement bloqué par détection IP/adresse.",
    ar: "يتم حظر الإحالة الذاتية تلقائيًا عبر تقنيات فحص العنوان والـ IP.",
    en: "Self-referral is automatically blocked via IP/address checks.",
  },
  "loyalty.redeem_title": {
    fr: "Convertir Vos Points en Privilèges",
    ar: "استبدل نقاطك بامتيازات وهدايا",
    en: "Convert Your Points into Privileges",
  },
  "loyalty.points_required": {
    fr: "{points} Points Requis",
    ar: "مطلوب {points} نقطة",
    en: "{points} Points Required",
  },
  "loyalty.redeem_btn": {
    fr: "Échanger Mes Points",
    ar: "استبدال النقاط الآن",
    en: "Redeem My Points",
  },
  "loyalty.insufficient_points": {
    fr: "Points Insuffisants",
    ar: "النقاط غير كافية",
    en: "Insufficient Points",
  },
  "loyalty.toast_copied": {
    fr: "Lien de Parrainage Copié",
    ar: "تم نسخ رابط الدعوة",
    en: "Referral Link Copied",
  },
  "loyalty.toast_redeemed": {
    fr: "Points Convertis avec Succès",
    ar: "تم تحويل النقاط بنجاح",
    en: "Points Successfully Redeemed",
  },
  "loyalty.toast_insufficient": {
    fr: "Solde Insuffisant",
    ar: "الرصيد غير كافٍ",
    en: "Insufficient Balance",
  },
  "loyalty.reward1_title": {
    fr: "Bon d'Achat 20 TND",
    ar: "قسيمة شراء 20 د.ت",
    en: "20 TND Voucher",
  },
  "loyalty.reward1_desc": {
    fr: "Valable sur toute commande",
    ar: "صالحة على جميع الطلبات",
    en: "Valid on all orders",
  },
  "loyalty.reward2_title": {
    fr: "Bon d'Achat 45 TND",
    ar: "قسيمة شراء 45 د.ت",
    en: "45 TND Voucher",
  },
  "loyalty.reward2_desc": {
    fr: "Bonus +5 TND inclus",
    ar: "تشمل مكافأة إضافية 5 د.ت",
    en: "Includes +5 TND bonus",
  },
  "loyalty.reward3_title": {
    fr: "Flacon 50ml Offert",
    ar: "زجاجة عطر 50 مل مجانًا",
    en: "Complimentary 50ml Flacon",
  },
  "loyalty.reward3_desc": {
    fr: "Choix libre parmi le catalogue",
    ar: "اختيار حر من كامل التشكيلة",
    en: "Free choice from the catalogue",
  },
  "heritage.arch_label": {
    fr: "Architecture & Conservation",
    ar: "الهندسة المعمارية وحفظ الجودة",
    en: "Architecture & Preservation",
  },
  "heritage.atelier_sign": {
    fr: "L'Atelier Lévania Parfums",
    ar: "محترف ليفانيا للعطور",
    en: "The Lévania Parfums Atelier",
  },
};
