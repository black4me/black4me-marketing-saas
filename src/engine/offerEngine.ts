// =============================================================
// OFFER ENGINE — الوحدة الأولى
// هندسة العرض والتسعير — تحويل الخدمة العادية إلى عرض لا يقاوم
// بناءً على معادلة القيمة + سيكولوجية التسعير + استراتيجيات الندرة
// =============================================================

import type { BusinessAnalysis } from './analyzer';

export interface OfferResult {
  // العرض الأساسي
  coreOffer: {
    name: string;
    description: string;
    framing: string; // كيف نقدّم العرض
  };

  // 3 مكافآت (Bonuses)
  bonuses: Array<{
    number: number;
    name: string;
    value: string;
    description: string;
    reasoning: string;
  }>;

  // الضمان
  guarantee: {
    type: string;
    duration: string;
    text: string;
    whyItWorks: string;
  };

  // الندرة والاستعجال
  scarcity: {
    type: string;
    mechanism: string;
    copy: string;
  };

  // السعر الاستراتيجي — 3 باقات
  pricing: {
    currency: string;
    anchor: number; // السعر المرتفع (المرساة)
    recommended: number; // السعر الموصى به
    recommendedLabel: string;
    tiers: Array<{
      name: string;
      price: number;
      originalPrice?: number;
      description: string;
      bestFor: string;
      includes: string[];
      isRecommended: boolean;
    }>;
    psychologyNote: string;
  };

  // القيمة المتصورة الإجمالية
  totalValue: number;
  finalPrice: number;
}

// =============================================================
// مولّد اسم العرض
// =============================================================
function generateOfferName(sector: string, businessType: string): string {
  const templates: Record<string, string[]> = {
    ecommerce: ['الحزمة المتكاملة للبيع المتكرر', 'نظام المبيعات الآلي للمتجر', 'حزمة النمو المتسارع'],
    coffee: ['تجربة القهوة الكاملة', 'حزمة الانطلاق للقهوة المختصة', 'عرض الانتماء الذهبي'],
    consulting: ['جلسة التخطيط الاستراتيجي', 'حزمة النمو المضمونة', 'الاستشارة الشاملة للنمو'],
    digital_product: ['الحزمة التعليمية المتكاملة', 'نظام التعلم المتسارع', 'العضوية الذهبية للتطوير'],
    service: ['الحزمة الشاملة للخدمة', 'عرض الانتقال من A إلى Z', 'حزمة الخدمة المتكاملة'],
    fashion: ['مجموعة التميّز الكاملة', 'حزمة الأناقة المتكاملة', 'العضوية الذهبية للموضة'],
    realestate: ['حزمة الشراء الذكية', 'الاستثمار العقاري المتكامل', 'عرض الصفقة الذهبية'],
    health: ['برنامج التحوّل الصحي', 'حزمة اللياقة المتكاملة', 'العضوية الذهبية للصحة'],
    education: ['الحزمة التعليمية المتكاملة', 'برنامج التخرّج المضمون', 'حزمة التميّز الأكاديمي'],
    saas: ['العضوية المؤسسية', 'حزمة النمو للشركات', 'اشتراك التوسع المتسارع'],
  };
  const options = templates[sector] || templates.service;
  return options[Math.floor(Math.random() * options.length)];
}

// =============================================================
// مولّد المكافآت الثلاثة (بناءً على القطاع)
// =============================================================
function generateBonuses(sector: string, language: 'ar' | 'en'): OfferResult['bonuses'] {
  if (language === 'en') {
    return [
      { number: 1, name: 'Quick-Start Toolkit', value: '$97', description: 'Templates and checklists ready to use', reasoning: 'Removes effort barrier' },
      { number: 2, name: 'Private Community Access', value: '$197', description: '30-day group coaching in our community', reasoning: 'Increases perceived likelihood' },
      { number: 3, name: '1-on-1 Strategy Call', value: '$497', description: '60-min strategy session with our team', reasoning: 'Accelerates dream outcome' },
    ];
  }

  const bonusTemplates: Record<string, Array<Omit<OfferResult['bonuses'][0], 'number'>>> = {
    ecommerce: [
      { name: 'دليل "50 عنواناً يجعلك تبيع" للمنتجات', value: '297 ريال', description: 'قائمة جاهزة بـ 50 عنواناً إعلانياً مُجرّب لمتجرك، مع نصائح لكل واحد.', reasoning: 'تقليل الجهد: العميل لا يحتاج يفكر في العنوان' },
      { name: 'مجموعة قوالب إعلانات فيسبوك + إنستغرام', value: '497 ريال', description: '20 قالب إعلان بصري + نصّي جاهز للنسخ، مصممة للقطاعات العربية.', reasoning: 'تقليل الجهد + تسريع النتيجة' },
      { name: 'جلسة تحليل مجانية لمتجرك', value: '750 ريال', description: '30 دقيقة مع خبرائنا لتحليل متجرك واكتشاف فرص النمو المخفية.', reasoning: 'رفع احتمالية النجاح المتصورة' },
    ],
    coffee: [
      { name: 'دليل "كيف تخلّي زبونك يرجع كل أسبوع"', value: '197 ريال', description: '7 استراتيجيات مُجرّبة لزيادة ولاء الزبائن في مجال القهوة.', reasoning: 'تقليل تأخير النتيجة + رفع الاحتمالية' },
      { name: 'مجموعة قوالب سوشال ميديا للكافيهات', value: '397 ريال', description: '15 قالب محتوى بصري + نصّي جاهز للنشر يومي.', reasoning: 'تقليل الجهد' },
      { name: 'استشارة 30 دقيقة مع خبير F&B', value: '650 ريال', description: 'تحليل كامل لوضعك الحالي وخطة عمل مخصصة.', reasoning: 'رفع احتمالية النجاح' },
    ],
    consulting: [
      { name: 'قالب "خطة الـ 90 يوم" الاستشارية', value: '297 ريال', description: 'قالب جاهز لبناء خطة عمل مفصّلة لعميلك خلال 90 يوم.', reasoning: 'تقليل الجهد + تسريع النتيجة' },
      { name: 'مجموعة "30 سؤالاً لا تسألها في الاستشارة"', value: '197 ريال', description: 'الأسئلة التي تكشف الألم الحقيقي للعميل.', reasoning: 'رفع جودة الاستشارة = رفع الاحتمالية' },
      { name: 'دليل التسعير الاستراتيجي للخدمات', value: '497 ريال', description: 'كيف تسعّر خدمتك بـ 3 أضعاف مع نفس القيمة.', reasoning: 'رفع السعر الاستراتيجي' },
    ],
    digital_product: [
      { name: 'دليل "بناء قائمة بريدية من 0 إلى 1000"', value: '297 ريال', description: 'استراتيجيات مُجرّبة لجلب مشتركين بدون إعلانات.', reasoning: 'رفع احتمالية الوصول للبيع' },
      { name: 'قالب سلسلة بريدية "من الترحيب إلى البيع"', value: '397 ريال', description: '5 قوالب بريدية جاهزة لتحويل المشترك إلى عميل.', reasoning: 'تسريع النتيجة (البيع)' },
      { name: 'مجموعة "50 عنواناً جذاباً" للدورات والكتب', value: '197 ريال', description: 'عناوين مُجرّبة تجذب النقرات والتحويلات.', reasoning: 'تقليل الجهد' },
    ],
    service: [
      { name: 'دليل "كيف تحصل على تقييم 5 نجوم"', value: '197 ريال', description: 'استراتيجيات بناء تقييمات إيجابية تلقائياً.', reasoning: 'رفع احتمالية النجاح المتصورة' },
      { name: 'قالب رسالة متابعة العميل', value: '147 ريال', description: '5 قوالب رسائل واتساب لإغلاق الصفقات.', reasoning: 'تقليل تأخير النتيجة' },
      { name: 'مجموعة قوالب سوشال ميديا للخدمات المحلية', value: '397 ريال', description: '20 قالب محتوى جاهز للنسخ.', reasoning: 'تقليل الجهد' },
    ],
    fashion: [
      { name: 'دليل "بناء علامة أزياء تنتظرها النساء"', value: '297 ريال', description: 'استراتيجيات بناء هوية علامتك وقاعدة معجبين.', reasoning: 'رفع النتيجة الحلم' },
      { name: 'مجموعة قوالب إعلانات أزياء', value: '397 ريال', description: '15 قالب بصري + نصّي للقطع المختلفة.', reasoning: 'تقليل الجهد' },
      { name: 'استراتيجية "إطلاق مجموعة تنفد خلال 48 ساعة"', value: '497 ريال', description: 'خطة إطلاق كاملة من التشويق إلى البيع.', reasoning: 'تسريع النتيجة + رفع السعر' },
    ],
    realestate: [
      { name: 'دليل "كيف تغلق صفقة في 30 يوم"', value: '497 ريال', description: 'استراتيجيات تسريع دورة البيع العقاري.', reasoning: 'تقليل تأخير النتيجة' },
      { name: 'قالب رسالة "متابعة العميل المحتمل"', value: '197 ريال', description: '7 قوالب رسائل تحافظ على دفء العلاقة.', reasoning: 'تقليل الجهد' },
      { name: 'مجموعة قوالب إعلانات عقارية', value: '397 ريال', description: '15 قالب بصري + نصّي للوحدات المختلفة.', reasoning: 'تقليل الجهد' },
    ],
    health: [
      { name: 'دليل "كيف تبني عادة لا تتركها"', value: '197 ريال', description: 'استراتيجيات علمية للاستمرارية.', reasoning: 'رفع احتمالية النجاح' },
      { name: 'قالب "خطة تغذية مخصصة"', value: '297 ريال', description: 'قالب جاهز لبناء خطط مخصصة لكل عميل.', reasoning: 'تقليل الجهد' },
      { name: 'مجموعة قوالب سوشال ميديا للصحة واللياقة', value: '397 ريال', description: '20 قالب محتوى بصري + نصّي.', reasoning: 'تقليل الجهد' },
    ],
    education: [
      { name: 'دليل "كيف تبني أكاديمية ممتلئة"', value: '297 ريال', description: 'استراتيجيات جذب الطلاب والاحتفاظ بهم.', reasoning: 'رفع النتيجة الحلم' },
      { name: 'قالب "خارطة المنهج"', value: '197 ريال', description: 'قالب جاهز لبناء منهج متكامل.', reasoning: 'تقليل الجهد' },
      { name: 'مجموعة قوالب تسويق للأكاديميات', value: '397 ريال', description: '15 قالب إعلاني جاهز.', reasoning: 'تقليل الجهد' },
    ],
    saas: [
      { name: 'دليل "Onboarding يقلل التسرب بـ 40%"', value: '397 ريال', description: 'استراتيجيات تحسين تجربة أول استخدام.', reasoning: 'رفع احتمالية البقاء' },
      { name: 'قالب "سلسلة بريدية للتفعيل"', value: '297 ريال', description: '7 قوالب بريدية تحوّل التجربة إلى اشتراك.', reasoning: 'تسريع التحويل' },
      { name: 'قالب "صفحة هبوط SaaS"', value: '497 ريال', description: 'قالب جاهز عالي التحويل لصفحة الاشتراك.', reasoning: 'تقليل الجهد' },
    ],
  };

  const sector_bonuses = bonusTemplates[sector] || bonusTemplates.service;
  return sector_bonuses.map((b, i) => ({ number: i + 1, ...b }));
}

// =============================================================
// مولّد الضمان — يكسر المخاطرة
// =============================================================
function generateGuarantee(sector: string, language: 'ar' | 'en'): OfferResult['guarantee'] {
  if (language === 'en') {
    return {
      type: 'Results Guarantee',
      duration: '60 days',
      text: 'If you do not see measurable results within 60 days, we refund 100% of your investment — no questions asked.',
      whyItWorks: 'Removes risk, increases perceived likelihood, makes decision instant.',
    };
  }

  const guarantees: Record<string, OfferResult['guarantee']> = {
    ecommerce: {
      type: 'ضمان نتائج',
      duration: '30 يوم',
      text: 'إذا لم تحصل على زيادة ملموسة في مبيعات متجرك خلال 30 يوماً، نُرجع لك كامل المبلغ — بدون أسئلة.',
      whyItWorks: 'يكسر المخاطرة تماماً، يرفع ثقة العميل في النتيجة، ويجعل قرار الشراء فورياً.',
    },
    coffee: {
      type: 'ضمان رضا',
      duration: '14 يوم',
      text: 'إذا لم تحصل على زيادة ملموسة في عدد الزبائن خلال أسبوعين، نُرجع لك كامل المبلغ.',
      whyItWorks: 'ضمان قصير يناسب دورة القرار في الـ F&B.',
    },
    consulting: {
      type: 'ضمان تنفيذ',
      duration: '60 يوم',
      text: 'إذا طبّقت الاستراتيجية ولم تحصل على نتيجة ملموسة خلال 60 يوماً، نُرجع لك كامل المبلغ.',
      whyItWorks: 'يرفع احتمالية النجاح المتصورة ويكسر اعتراض "ما أعرف إذا كان ينفع لي".',
    },
    digital_product: {
      type: 'ضمان محتوى',
      duration: '30 يوم',
      text: 'إذا لم تجد المحتوى عملياً ومُجرّباً، نُرجع لك كامل المبلغ خلال 30 يوم.',
      whyItWorks: 'يرفع ثقة العميل في جودة المحتوى.',
    },
    service: {
      type: 'ضمان جودة',
      duration: '7 أيام',
      text: 'إذا لم تكن راضياً عن الخدمة خلال 7 أيام، نُرجع لك المبلغ أو نُعيد الخدمة مجاناً.',
      whyItWorks: 'ضمان قصير يناسب الخدمات الفورية.',
    },
    fashion: {
      type: 'ضمان جودة',
      duration: '14 يوم',
      text: 'إذا لم تكن القطعة بالجودة المُعلن عنها، نُرجع لك كامل المبلغ.',
      whyItWorks: 'يبني ثقة في العلامة ويقلل التردد.',
    },
    realestate: {
      type: 'ضمان صفقة',
      duration: '90 يوم',
      text: 'إذا لم نُغلق صفقة لك خلال 90 يوماً، نُرجع لك كامل عمولة.',
      whyItWorks: 'يناسب دورة البيع العقاري الطويلة.',
    },
    health: {
      type: 'ضمان نتائج',
      duration: '30 يوم',
      text: 'إذا التزمت بالبرنامج ولم تحصل على نتائج ملموسة خلال 30 يوماً، نُرجع لك كامل المبلغ.',
      whyItWorks: 'يرفع احتمالية النجاح ويكسر "ما أعرف إذا كان ينفع لي".',
    },
    education: {
      type: 'ضمان تعلّم',
      duration: '60 يوم',
      text: 'إذا لم تتعلم المهارات المُعلنة خلال 60 يوماً، نُرجع لك كامل المبلغ.',
      whyItWorks: 'يقلل مخاطرة قرار التسجيل.',
    },
    saas: {
      type: 'ضمان إلغاء',
      duration: '14 يوم',
      text: 'إذا لم تجد الأداة مفيدة خلال 14 يوماً، ألغِ الاشتراك بدون أسئلة.',
      whyItWorks: 'يكسر مخاطرة الاشتراك الشهرية.',
    },
  };

  return guarantees[sector] || guarantees.service;
}

// =============================================================
// مولّد الندرة والاستعجال
// =============================================================
function generateScarcity(sector: string, priceTier: BusinessAnalysis['priceTier']): OfferResult['scarcity'] {
  const sectorSc: Record<string, OfferResult['scarcity']> = {
    ecommerce: {
      type: 'ندرة + استعجال',
      mechanism: 'عرض محدود + مؤقت',
      copy: '⚡ العرض ينتهي خلال 48 ساعة — أو عند نفاد 50 طلب فقط.',
    },
    coffee: {
      type: 'ندرة يومية',
      mechanism: 'عرض اليوم',
      copy: '☕ اليوم فقط — كل زبون جديد يحصل على قهوة مجانية مع كل طلب.',
    },
    consulting: {
      type: 'ندرة المقاعد',
      mechanism: '5 مقاعد فقط',
      copy: '🎯 لا نقبل أكثر من 5 عملاء جدد شهرياً — لضمان جودة النتائج.',
    },
    digital_product: {
      type: 'سعر متغير',
      mechanism: 'السعر يرتفع كل 100 عميل',
      copy: '📈 السعر الحالي 199 ريال — يرتفع إلى 299 ريال بعد كل 100 عميل.',
    },
    service: {
      type: 'خصم موسمي',
      mechanism: 'عرض الأسبوع',
      copy: '🔥 هذا الأسبوع فقط — خصم 30% على الحزمة الشاملة.',
    },
    fashion: {
      type: 'كمية محدودة',
      mechanism: 'كل قطعة في 3 نسخ فقط',
      copy: '👗 كل قطعة متوفرة بـ 3 نسخ فقط — لا تُعاد طباعتها.',
    },
    realestate: {
      type: 'فرصة نادرة',
      mechanism: 'سعر اليوم',
      copy: '🏠 سعر اليوم فقط — ينتهي خلال 24 ساعة.',
    },
    health: {
      type: 'تجربة مجانية',
      mechanism: 'أول 7 أيام مجاناً',
      copy: '💪 أول 7 أيام مجاناً — إذا لم تشعرك بالفرق، نُرجع لك.',
    },
    education: {
      type: 'خصم التسجيل المبكر',
      mechanism: 'خصم 40% لأول 30 طالب',
      copy: '🎓 خصم 40% لأول 30 طالب مسجل — بعدها السعر الكامل.',
    },
    saas: {
      type: 'عرض تجريبي',
      mechanism: '14 يوم مجاناً',
      copy: '🆓 14 يوم مجاناً — بدون بطاقة ائتمان، بدون التزام.',
    },
  };

  return sectorSc[sector] || sectorSc.service;
}

// =============================================================
// مولّد التسعير الاستراتيجي (3 باقات)
// =============================================================
function generatePricing(
  sector: string,
  priceTier: BusinessAnalysis['priceTier'],
  audience: string,
  language: 'ar' | 'en',
): OfferResult['pricing'] {
  // نطاق السعر الأساسي بالريال السعودي (SAR)
  const baseRanges: Record<BusinessAnalysis['priceTier'], { min: number; mid: number; max: number }> = {
    entry: { min: 47, mid: 97, max: 197 },
    mid: { min: 297, mid: 997, max: 1997 },
    premium: { min: 1997, mid: 4997, max: 9997 },
    luxury: { min: 4997, mid: 14997, max: 49997 },
  };

  const range = baseRanges[priceTier];
  const currency = language === 'en' ? 'USD' : 'SAR';
  const symbol = language === 'en' ? '$' : 'ريال';

  const tierNames = language === 'en'
    ? { basic: 'Basic', gold: 'Gold', diamond: 'Diamond' }
    : { basic: 'الباقة الأساسية', gold: 'الباقة الذهبية', diamond: 'الباقة الماسية' };

  const tiers = [
    {
      name: tierNames.basic,
      price: language === 'en' ? Math.round(range.min / 3.75) : range.min,
      originalPrice: undefined,
      description: language === 'en'
        ? 'For trying out — entry level'
        : 'للتجربة والبداية — أقل تكلفة',
      bestFor: language === 'en' ? 'New customers testing the solution' : 'العملاء الجدد الذين يريدون تجربة',
      includes: language === 'en'
        ? ['Core product / service', 'Basic email support', '1 month access']
        : ['الخدمة الأساسية', 'دعم بالبريد الإلكتروني', '1 شهر وصول'],
      isRecommended: false,
    },
    {
      name: tierNames.gold,
      price: language === 'en' ? Math.round(range.mid / 3.75) : range.mid,
      originalPrice: language === 'en' ? Math.round(range.max / 3.75) : range.max,
      description: language === 'en'
        ? 'Most popular — best value for serious customers'
        : 'الأكثر طلباً — القيمة الأفضل للعميل الجاد',
      bestFor: language === 'en' ? 'Customers ready to commit' : 'العملاء الجادون الذين يريدون نتائج حقيقية',
      includes: language === 'en'
        ? ['Full core + 3 bonuses', 'Priority support', '3 months access', '30-day guarantee']
        : ['العرض الكامل + 3 مكافآت', 'دعم ذو أولوية', '3 أشهر وصول', 'ضمان 30 يوم'],
      isRecommended: true,
    },
    {
      name: tierNames.diamond,
      price: language === 'en' ? Math.round(range.max / 3.75) : range.max,
      originalPrice: undefined,
      description: language === 'en'
        ? 'Premium — VIP service with personal attention'
        : 'الـ VIP — خدمة شخصية مع اهتمام كامل',
      bestFor: language === 'en' ? 'Customers who want the best + personal attention' : 'العملاء الذين يريدون الأفضل + اهتمام شخصي',
      includes: language === 'en'
        ? ['Everything in Gold', '1-on-1 coaching', '6 months access', 'Lifetime updates', 'Personal WhatsApp']
        : ['كل ما في الذهبية + ', 'استشارة 1-أ-1', '6 أشهر وصول', 'تحديثات مدى الحياة', 'واتساب شخصي مع الفريق'],
      isRecommended: false,
    },
  ];

  const recommended = tiers.find((t) => t.isRecommended)!;

  return {
    currency,
    anchor: range.max,
    recommended: recommended.price,
    recommendedLabel: recommended.name,
    tiers,
    psychologyNote: language === 'en'
      ? 'Anchoring effect: showing the Diamond tier first makes Gold feel like a bargain. Most customers choose Gold (the middle option) — this is the 3-tier rule in pricing psychology.'
      : 'تأثير المرساة: عرض الباقة الماسية أولاً يجعل الذهبية تبدو صفقة رابحة. أغلب العملاء يختار الذهبية (الخيار الأوسط) — هذه قاعدة 3 خيارات في سيكولوجية التسعير.',
  };
}

// =============================================================
// الدالة الرئيسية: توليد العرض الكامل
// =============================================================
export function generateOffer(analysis: BusinessAnalysis): OfferResult {
  const bonuses = generateBonuses(analysis.sector, analysis.language);
  const guarantee = generateGuarantee(analysis.sector, analysis.language);
  const scarcity = generateScarcity(analysis.sector, analysis.priceTier);
  const pricing = generatePricing(analysis.sector, analysis.priceTier, analysis.audienceLabel, analysis.language);

  const coreOfferName = generateOfferName(analysis.sector, analysis.businessType);

  // القيمة المتصورة الإجمالية
  const totalValue = bonuses.reduce((sum, b) => {
    const v = parseInt(b.value.match(/\d+/)?.[0] || '0', 10);
    return sum + v;
  }, pricing.anchor);

  return {
    coreOffer: {
      name: coreOfferName,
      description: analysis.language === 'en'
        ? `A complete solution for ${analysis.sectorLabel.toLowerCase()} targeting ${analysis.audienceLabel.toLowerCase()} to achieve ${analysis.goalLabel.toLowerCase()}.`
        : `حل متكامل لـ ${analysis.sectorLabel} يستهدف ${analysis.audienceLabel} لتحقيق ${analysis.goalLabel}.`,
      framing: analysis.language === 'en'
        ? `Instead of competing on price, we package everything into a single irresistible bundle that solves the dream outcome: ${analysis.dreamOutcome}.`
        : `بدلاً من المنافسة على السعر، نغلّف كل شيء في حزمة واحدة لا تقاوم تحل النتيجة الحلم: ${analysis.dreamOutcome}.`,
    },
    bonuses,
    guarantee,
    scarcity,
    pricing,
    totalValue,
    finalPrice: pricing.recommended,
  };
}