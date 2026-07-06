// =============================================================
// Input Analyzer — يحلل مدخل العميل ويستخرج:
// - نوع النشاط
// - القطاع
// - الجمهور المستهدف
// - الهدف التسويقي
// - مستوى السعر
// - النتيجة الحلم المقترحة
// =============================================================

export interface BusinessAnalysis {
  businessType: 'product' | 'service' | 'store' | 'consulting' | 'digital';
  sector: string;
  sectorLabel: string;
  audience: string;
  audienceLabel: string;
  goal: string;
  goalLabel: string;
  priceTier: 'entry' | 'mid' | 'premium' | 'luxury';
  priceLabel: string;
  painPoints: string[];
  dreamOutcome: string;
  keywords: string[];
  language: 'ar' | 'en';
}

// قاموس القطاعات — يُستخدم لتصنيف مدخل العميل
const SECTOR_DICTIONARY: Array<{
  key: string;
  label: string;
  triggers: string[];
  defaultAudience: string;
  defaultPain: string[];
  defaultDream: string;
  defaultKeywords: string[];
}> = [
  {
    key: 'ecommerce',
    label: 'متجر إلكتروني',
    triggers: ['متجر', 'متجري', 'بيع منتجات', 'متجر إلكتروني', 'إيكوميرس', 'ecommerce', 'online store', 'منتجات'],
    defaultAudience: 'مستهلكين يشترون أونلاين',
    defaultPain: ['صعوبة في جذب زوار للمتجر', 'معدل تحويل منخفض', 'منافسة على السعر', 'تكلفة إعلانات عالية'],
    defaultDream: 'متجر ممتلئ بالطلبات يومياً بدون الاعتماد على الإعلانات المدفوعة',
    defaultKeywords: ['متجر إلكتروني', 'تسوق أونلاين', 'عروض', 'منتجات'],
  },
  {
    key: 'coffee',
    label: 'متجر قهوة / F&B',
    triggers: ['قهوة', 'كافيه', 'مطعم', 'أكل', 'حلويات', 'مشروبات', 'كوفي'],
    defaultAudience: 'محبي القهوة المختصة والأكل الفاخر',
    defaultPain: ['تردد زبائن جدد', 'منافسة من كافيهات أكبر', 'صعوبة في تمييز العلامة'],
    defaultDream: 'زبون دائم يزور كل أسبوع ويوصي بصديق',
    defaultKeywords: ['قهوة مختصة', 'كافيه', 'مشروبات', 'مقهى'],
  },
  {
    key: 'consulting',
    label: 'خدمات استشارية',
    triggers: ['استشار', 'استشارة', 'خدمة استشارية', 'كوتش', 'تدريب', 'mentor'],
    defaultAudience: 'أ أصحاب مشاريع ورواد أعمال',
    defaultPain: ['صعوبة في تسعير الخدمة', 'عدم اليقين من النتائج', 'عملاء لا يكملون'],
    defaultDream: 'صفقة استشارية مغلقة في 7 أيام بـ 10 أضعاف السعر المعتاد',
    defaultKeywords: ['استشارة', 'تدريب', 'تطوير أعمال', 'كوتش'],
  },
  {
    key: 'digital_product',
    label: 'منتجات رقمية',
    triggers: ['دورة', 'كورس', 'كتاب رقمي', 'قالب', 'منتج رقمي', 'ebook', 'course', 'template'],
    defaultAudience: 'متعلمون عبر الإنترنت، باحثون عن التطوير',
    defaultPain: ['مبيعات منخفضة', 'مشتركين لا يشترون', 'صعوبة في بناء قائمة'],
    defaultDream: 'مبيعات تلقائية كل يوم بدون تدخل يدوي',
    defaultKeywords: ['دورة', 'كورس', 'تعلم', 'تطوير'],
  },
  {
    key: 'service',
    label: 'خدمة محلية',
    triggers: ['خدمة', 'صيانة', 'تنظيف', 'سباكة', 'كهرباء', 'صالون', 'تجميل', 'مغسلة'],
    defaultAudience: 'أ سكان المدينة يبحثون عن خدمة موثوقة',
    defaultPain: ['صعوبة إيجاد عملاء جدد', 'تقييمات سلبية', 'منافسة على السعر'],
    defaultDream: 'جدول ممتلئ طوال الأسبوع بدون تسويق تقليدي',
    defaultKeywords: ['خدمة', 'صيانة', 'محلي'],
  },
  {
    key: 'fashion',
    label: 'أزياء / موضة',
    triggers: ['ملابس', 'أزياء', 'فساتين', 'عباية', 'ماركة', 'ستايل', 'فاشن'],
    defaultAudience: 'نساء/رجال يبحثون عن التميّز والأناقة',
    defaultPain: ['مرتجعات عالية', 'تكلفة إعلانات ضخمة', 'عملاء يشترون مرة ولا يعودون'],
    defaultDream: 'علامة ينتظرها الناس كل موسم بشغف',
    defaultKeywords: ['أزياء', 'ملابس', 'ستايل', 'موضة'],
  },
  {
    key: 'realestate',
    label: 'عقار',
    triggers: ['عقار', 'عقارات', 'شقق', 'فلل', 'أراضي', 'real estate'],
    defaultAudience: 'مشترون وبائعون للعقارات',
    defaultPain: ['دورة بيع طويلة', 'عمولات منخفضة', 'عملاء غير جادّين'],
    defaultDream: 'صفقة عقارية مغلقة كل شهر بدون عناء',
    defaultKeywords: ['عقار', 'شقق', 'فلل', 'استثمار'],
  },
  {
    key: 'health',
    label: 'صحة / لياقة',
    triggers: ['صحة', 'لياقة', 'تغذية', 'دكتور', 'عيادة', 'علاج', 'coach', 'fitness'],
    defaultAudience: 'أشخاص يريدون تحسين صحتهم ولياقتهم',
    defaultPain: ['نتائج بطيئة', 'ترك البرنامج', 'صعوبة الالتزام'],
    defaultDream: 'جسم صحي بدون حرمان، مع نتائج ملموسة في 30 يوم',
    defaultKeywords: ['صحة', 'لياقة', 'تغذية', 'علاج'],
  },
  {
    key: 'education',
    label: 'تعليم / تدريب',
    triggers: ['تعليم', 'أكاديمية', 'مدرسة', 'دروس', 'تدريب', 'معلم'],
    defaultAudience: 'طلاب وطلاب مهتمون بتطوير مهاراتهم',
    defaultPain: ['تسرب الطلاب', 'صعوبة في جذب طلاب جدد', 'منافسة على السعر'],
    defaultDream: 'أكاديمية ممتلئة بطالبين مخلصين كل شهر',
    defaultKeywords: ['تعليم', 'دورات', 'تدريب', 'مهارات'],
  },
  {
    key: 'saas',
    label: 'SaaS / اشتراك',
    triggers: ['saas', 'اشتراك', 'تطبيق', 'برنامج', 'subscription'],
    defaultAudience: 'فرق عمل وشركات تحتاج أداة',
    defaultPain: ['تسرب مستخدمين', 'صعوبة في التحويل من تجربة إلى اشتراك'],
    defaultDream: 'MRR ينمو 20% شهرياً بدون فريق تسويق',
    defaultKeywords: ['saas', 'أداة', 'تطبيق', 'اشتراك'],
  },
];

// تحليل الجمهور المستهدف
const AUDIENCE_PATTERNS = [
  { regex: /(نساء|سيدات|بنات|female)/i, label: 'نساء' },
  { regex: /(رجال|شباب|male)/i, label: 'رجال' },
  { regex: /(أطفال|كبار|كبار السن)/i, label: 'حسب الفئة' },
  { regex: /(أ أصحاب مشاريع|رواد|entrepreneurs|شركات)/i, label: 'أ أصحاب مشاريع ورواد أعمال' },
  { regex: /(طلاب|شباب)/i, label: 'طلاب وشباب' },
  { regex: /(أ ثرياء|premium|luxury|فاخر)/i, label: 'شريحة راقية' },
];

// تحليل الهدف
const GOAL_PATTERNS = [
  { regex: /(زيادة المبيعات|أكثر مبيعا|boost sales)/i, key: 'sales', label: 'زيادة المبيعات' },
  { regex: /(جذب عملاء|عملاء جدد|leads)/i, key: 'leads', label: 'جذب عملاء محتملين' },
  { regex: /(وعي|awareness|brand|ماركة)/i, key: 'awareness', label: 'بناء الوعي بالعلامة' },
  { regex: /(إطلاق|launch|جديد)/i, key: 'launch', label: 'إطلاق منتج/خدمة' },
  { regex: /(توسع|نمو|growth|expand)/i, key: 'growth', label: 'التوسع والنمو' },
];

// تحليل مستوى السعر
const PRICE_TIERS = [
  { regex: /(أ رخص|أ رخص|أ اقتصادية|cheap|ب أقل)/i, tier: 'entry' as const, label: 'اقتصادي (أقل من 100 ريال)' },
  { regex: /(متوسط|mid|standard|عادي)/i, tier: 'mid' as const, label: 'متوسط (100 - 1000 ريال)' },
  { regex: /(مرتفع|عالي|premium|احترافي)/i, tier: 'premium' as const, label: 'احترافي (1000 - 5000 ريال)' },
  { regex: /(فاخر|لاكسوري|luxury|حصري|exclusive)/i, tier: 'luxury' as const, label: 'فاخر / حصري (5000+ ريال)' },
];

export function analyzeInput(input: string): BusinessAnalysis {
  const normalized = input.trim();
  const lower = normalized.toLowerCase();

  // Detect language
  const hasArabic = /[\u0600-\u06FF]/.test(normalized);
  const language: 'ar' | 'en' = hasArabic ? 'ar' : 'en';

  // Detect sector
  let sector = 'service'; // default
  let sectorLabel = 'خدمة';
  let defaultAudience = '';
  let defaultPain: string[] = [];
  let defaultDream = '';
  let defaultKeywords: string[] = [];

  for (const s of SECTOR_DICTIONARY) {
    if (s.triggers.some((t) => lower.includes(t.toLowerCase()))) {
      sector = s.key;
      sectorLabel = s.label;
      defaultAudience = s.defaultAudience;
      defaultPain = s.defaultPain;
      defaultDream = s.defaultDream;
      defaultKeywords = s.defaultKeywords;
      break;
    }
  }

  // If no match, extract keywords from input
  if (sector === 'service' && !defaultAudience) {
    sectorLabel = 'مشروع عام';
    defaultAudience = 'جمهور مستهدف غير محدد';
    defaultPain = ['صعوبة في الوصول للعملاء', 'منافسة قوية', 'غياب عرض واضح'];
    defaultDream = 'مضاعفة المبيعات خلال 90 يوم';
    defaultKeywords = extractKeywords(normalized);
  }

  // Detect business type from keywords
  let businessType: BusinessAnalysis['businessType'] = 'service';
  if (/(متجر|منتج|سلعة|product)/i.test(lower)) businessType = 'product';
  else if (/(استشار|كوتش|تدريب)/i.test(lower)) businessType = 'consulting';
  else if (/(دورة|كورس|ebook|كتاب|template|قالب)/i.test(lower)) businessType = 'digital';
  else if (/(متجر|store)/i.test(lower)) businessType = 'store';

  // Detect audience
  let audience = defaultAudience;
  let audienceLabel = defaultAudience;
  for (const a of AUDIENCE_PATTERNS) {
    if (a.regex.test(normalized)) {
      audienceLabel = a.label;
      audience = a.label;
      break;
    }
  }

  // Detect goal
  let goal = 'sales';
  let goalLabel = 'زيادة المبيعات';
  for (const g of GOAL_PATTERNS) {
    if (g.regex.test(normalized)) {
      goal = g.key;
      goalLabel = g.label;
      break;
    }
  }

  // Detect price tier (default mid)
  let priceTier: BusinessAnalysis['priceTier'] = 'mid';
  let priceLabel = 'متوسط (100 - 1000 ريال)';
  for (const p of PRICE_TIERS) {
    if (p.regex.test(normalized)) {
      priceTier = p.tier;
      priceLabel = p.label;
      break;
    }
  }

  // Generate dream outcome based on sector + goal
  const dreamOutcome = generateDreamOutcome(sector, goal, priceTier, language);

  return {
    businessType,
    sector,
    sectorLabel,
    audience,
    audienceLabel,
    goal,
    goalLabel,
    priceTier,
    priceLabel,
    painPoints: defaultPain,
    dreamOutcome,
    keywords: defaultKeywords,
    language,
  };
}

function extractKeywords(text: string): string[] {
  // Extract Arabic words > 3 chars
  const words = text.match(/[\u0600-\u06FF]{3,}/g) || [];
  return [...new Set(words)].slice(0, 8);
}

function generateDreamOutcome(
  sector: string,
  goal: string,
  tier: BusinessAnalysis['priceTier'],
  lang: 'ar' | 'en',
): string {
  if (lang === 'en') {
    return 'Predictable revenue growth without depending on paid ads';
  }

  const dreamTemplates: Record<string, Record<string, string>> = {
    ecommerce: {
      sales: 'متجرك يستقبل طلبات كل يوم، وقائمة عملاء دائمين تنمو تلقائياً',
      leads: 'تدفق مستمر من زوار مؤهلين جاهزين للشراء',
      awareness: 'علامتك التجارية هي الخيار الأول في ذهن جمهورك',
      launch: 'إطلاق ناجح يحقق مبيعات في أول أسبوع',
      growth: 'توسع إلى أسواق جديدة بمضاعفة المبيعات',
    },
    coffee: {
      sales: 'كافيه ممتلئ بزبائن دائمين يوصون بأصدقائهم',
      leads: 'قائمة عملاء مهتمين بالفعاليات والمنتجات الجديدة',
      awareness: 'كافيهك هو الوجهة المفضلة في المنطقة',
      launch: 'افتتاح ناجح يحقق زحام من اليوم الأول',
      growth: 'فروع جديدة في كل حي',
    },
    consulting: {
      sales: 'صفقات استشارية مغلقة بأسعار لا يقاومها أحد',
      leads: 'عملاء مؤهلين يطلبونك أنت، لا العكس',
      awareness: 'أنت المرجع الأول في مجالك',
      launch: 'إطلاق الخدمة يحجز قوائم انتظار',
      growth: 'مضاعفة العملاء كل شهر',
    },
    digital_product: {
      sales: 'مبيعات تلقائية كل يوم بدون تدخل يدوي',
      leads: 'قائمة بريدية تنمو بـ 100+ مشترك يومياً',
      awareness: 'منتجك هو الأكثر طلباً في مجالك',
      launch: 'إطلاق يحقق مبيعات في الساعات الأولى',
      growth: 'مبيعات تتضاعف كل شهر',
    },
    service: {
      sales: 'جدول ممتلئ بالطلبات كل أسبوع',
      leads: 'عملاء يتصلون بك أنت، لا العكس',
      awareness: 'سمعة لا تحتاج تسويقاً',
      launch: 'إطلاق ناجح مع تقييمات 5 نجوم من اليوم الأول',
      growth: 'توسع إلى مدن جديدة',
    },
    fashion: {
      sales: 'كل قطعة تُباع في 48 ساعة، وقائمة انتظار للموسم القادم',
      leads: 'عملاءVIP يطلبون مسبقاً',
      awareness: 'علامتك هي الأكثر طلباً على السوشال ميديا',
      launch: 'مجموعة جديدة تنفد خلال أيام',
      growth: 'متاجر في عدة مدن',
    },
    realestate: {
      sales: 'صفقة عقارية مغلقة كل شهر بدون عناء',
      leads: 'عملاء جادّون يأتون بكامل جاهزيتهم',
      awareness: 'أنت الوسيط الأول في المنطقة',
      launch: 'مشروع يبيع وحداته قبل اكتمال البناء',
      growth: 'محفظة عقارية متنوعة',
    },
    health: {
      sales: 'نتائج ملموسة في 30 يوم، عملاء يحولون أصدقاءهم',
      leads: 'عملاء مهتمين بالنتائج وليس السعر',
      awareness: 'أنت المرجع في مجال الصحة',
      launch: 'برنامج جديد يمتلئ فوراً',
      growth: 'توسع إلى خدمات جديدة',
    },
    education: {
      sales: 'أكاديمية ممتلئة بطالبين مخلصين',
      leads: 'قائمة انتظار للالتحاق',
      awareness: 'أنت المدرسة الأولى في التخصص',
      launch: 'دفعة أولى مكتملة',
      growth: 'فروع وفروع أونلاين',
    },
    saas: {
      sales: 'MRR ينمو 20% شهرياً بدون فريق تسويق',
      leads: 'تجارب مجانية تتحول لاشتراكات',
      awareness: 'فريقك يستخدمك كل يوم',
      launch: 'إطلاق يحقق 100 عميل في أول شهر',
      growth: 'توسع لأسواق جديدة',
    },
  };

  return dreamTemplates[sector]?.[goal] || dreamTemplates.service[goal];
}