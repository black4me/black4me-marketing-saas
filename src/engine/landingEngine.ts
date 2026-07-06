// =============================================================
// LANDING PAGE ENGINE — الوحدة الثانية
// مولّد صفحات الهبوط — هيكل كامل + نصوص بيعية + SEO
// =============================================================

import type { BusinessAnalysis } from './analyzer';

export interface LandingResult {
  // هيكل الصفحة (Wireframe)
  wireframe: Array<{
    section: string;
    icon: string;
    purpose: string;
    elements: string[];
  }>;

  // العنوان المغناطيسي — 3 خيارات
  headlines: Array<{
    variant: string;
    text: string;
    whyItWorks: string;
  }>;

  // قسم الألم والحل — نصوص قوية
  painSolution: {
    painHeadline: string;
    painPoints: string[];
    transition: string;
    solutionHeadline: string;
    solutionPoints: string[];
  };

  // CTA — 3 خيارات مع ألوان مقترحة
  cta: {
    primary: { text: string; color: string; reasoning: string };
    secondary: { text: string; color: string; reasoning: string };
    colors: {
      hex: string;
      name: string;
      psychology: string;
    }[];
  };

  // SEO كامل
  seo: {
    titleTag: string;
    metaDescription: string;
    keywords: string[];
    h1: string;
    h2List: string[];
    ogTitle: string;
    ogDescription: string;
  };
}

// =============================================================
// Wireframe — هيكل صفحة الهبوط المقترح
// =============================================================
function generateWireframe(sector: string, language: 'ar' | 'en'): LandingResult['wireframe'] {
  if (language === 'en') {
    return [
      { section: 'Hero', icon: '🎯', purpose: 'Stop scroll + communicate dream outcome', elements: ['Magnetic headline', 'Sub-headline with benefit', 'Primary CTA', 'Hero image/video', 'Trust signal'] },
      { section: 'Pain', icon: '😰', purpose: 'Amplify the problem', elements: ['3-5 pain points', 'Visceral language', 'Empathy statement'] },
      { section: 'Solution', icon: '✨', purpose: 'Introduce the offer as the answer', elements: ['Solution headline', '3 benefits', 'Visual proof'] },
      { section: 'How it works', icon: '⚙️', purpose: 'Remove uncertainty', elements: ['3-step process', 'Icons', 'Simple language'] },
      { section: 'Social proof', icon: '⭐', purpose: 'Build trust', elements: ['Testimonials', 'Before/after', 'Numbers (X happy customers)'] },
      { section: 'Offer', icon: '🎁', purpose: 'Stack the value', elements: ['Core offer', 'Bonuses', 'Scarcity', 'Price reveal', 'Guarantee'] },
      { section: 'FAQ', icon: '❓', purpose: 'Overcome final objections', elements: ['6-8 common questions', 'Direct answers'] },
      { section: 'Final CTA', icon: '🚀', purpose: 'Convert', elements: ['Last push', 'Urgency', 'Final guarantee', 'Big CTA button'] },
    ];
  }

  return [
    { section: 'الواجهة (Hero)', icon: '🎯', purpose: 'إيقاف التمرير + إيصال النتيجة الحلم', elements: ['العنوان المغناطيسي', 'عنوان فرعي بالميزة', 'زر CTA رئيسي', 'صورة/فيديو البطل', 'إشارة ثقة'] },
    { section: 'قسم الألم', icon: '😰', purpose: 'تكبير المشكلة والتعاطف', elements: ['3-5 نقاط ألم', 'لغة حسّية', 'بيان تعاطف'] },
    { section: 'قسم الحل', icon: '✨', purpose: 'تقديم العرض كإجابة', elements: ['عنوان الحل', '3 مزايا', 'إثبات بصري'] },
    { section: 'كيف يعمل', icon: '⚙️', purpose: 'إزالة الشك', elements: ['3 خطوات', 'أيقونات', 'لغة بسيطة'] },
    { section: 'الإثبات الاجتماعي', icon: '⭐', purpose: 'بناء الثقة', elements: ['شهادات', 'قبل/بعد', 'أرقام (X عميل سعيد)'] },
    { section: 'العرض', icon: '🎁', purpose: 'تراكم القيمة', elements: ['العرض الأساسي', 'المكافآت', 'الندرة', 'كشف السعر', 'الضمان'] },
    { section: 'الأسئلة الشائعة', icon: '❓', purpose: 'كسر اعتراضات أخيرة', elements: ['6-8 أسئلة شائعة', 'إجابات مباشرة'] },
    { section: 'النداء الأخير', icon: '🚀', purpose: 'التحويل', elements: ['دفعة أخيرة', 'استعجال', 'ضمان نهائي', 'زر CTA كبير'] },
  ];
}

// =============================================================
// العناوين المغناطيسية — 3 خيارات
// =============================================================
function generateHeadlines(analysis: BusinessAnalysis): LandingResult['headlines'] {
  const { sector, dreamOutcome, audienceLabel, language } = analysis;

  if (language === 'en') {
    return [
      { variant: 'النتيجة', text: `Finally — ${dreamOutcome.toLowerCase()} without the usual headaches`, whyItWorks: 'States the dream outcome directly + removes friction' },
      { variant: 'السؤال', text: `What if ${audienceLabel.toLowerCase()} could get ${dreamOutcome.toLowerCase()} in 30 days?`, whyItWorks: 'Opens a curiosity loop + uses "what if"' },
      { variant: 'الإحصائية', text: `127 ${sector} businesses used this — here\'s what happened`, whyItWorks: 'Uses social proof number + curiosity about outcome' },
    ];
  }

  return [
    {
      variant: 'النتيجة الحلم',
      text: `أخيراً — ${dreamOutcome} بدون المعاناة المعتادة`,
      whyItWorks: 'يصرّح بالنتيجة الحلم مباشرة + يزيل العناء المتوقع',
    },
    {
      variant: 'السؤال الفضولي',
      text: `ماذا لو كان ${audienceLabel} يحصل على ${dreamOutcome} خلال 30 يوماً فقط؟`,
      whyItWorks: 'يفتح فجوة فضول + يستخدم "ماذا لو"',
    },
    {
      variant: 'الإحصائية',
      text: `127 من أصحاب ${sector} جربوا هذا — هذا ما حدث`,
      whyItWorks: 'يستخدم رقم اجتماعي + يثير الفضول حول النتيجة',
    },
  ];
}

// =============================================================
// قسم الألم والحل
// =============================================================
function generatePainSolution(analysis: BusinessAnalysis): LandingResult['painSolution'] {
  const { sector, sectorLabel, dreamOutcome, painPoints, language } = analysis;

  if (language === 'en') {
    return {
      painHeadline: `Why most ${sector} businesses struggle to ${analysis.goalLabel.toLowerCase()}`,
      painPoints: painPoints.map((p, i) => `${i + 1}. ${p}`),
      transition: 'You already know this. So what if there was a faster way?',
      solutionHeadline: `The system that makes ${dreamOutcome.toLowerCase()} a reality`,
      solutionPoints: [
        'A complete package — no need to assemble tools yourself',
        'Used by 127+ businesses in your sector with measurable results',
        'Backed by a guarantee that removes all your risk',
      ],
    };
  }

  return {
    painHeadline: `لماذا أغلب مشاريع ${sectorLabel} تفشل في ${analysis.goalLabel}`,
    painPoints: painPoints.map((p, i) => `${i + 1}. ${p}`),
    transition: 'أنت تعرف هذا. ماذا لو كان هناك طريقة أسرع؟',
    solutionHeadline: `النظام الذي يجعل ${dreamOutcome} حقيقة`,
    solutionPoints: [
      'حزمة كاملة — لا تحتاج تجميع الأدوات بنفسك',
      'استخدمها 127+ مشروع في قطاعك بنتائج قابلة للقياس',
      'مدعومة بضمان يزيل كل مخاطرة عنك',
    ],
  };
}

// =============================================================
// CTA — مع الألوان وعلم نفس كل لون
// =============================================================
function generateCTA(analysis: BusinessAnalysis): LandingResult['cta'] {
  const { sector, language } = analysis;

  // ألوان مقترحة مع علم النفس
  const colorsBySector: Record<string, Array<{ hex: string; name: string; psychology: string }>> = {
    ecommerce: [
      { hex: '#10B981', name: 'الأخضر', psychology: 'يعطي إحساس "الشراء آمن" + يدفع لاتخاذ القرار' },
      { hex: '#F59E0B', name: 'البرتقالي', psychology: 'يعطي إحساس "الاستعجال" + يجذب الانتباه' },
    ],
    coffee: [
      { hex: '#92400E', name: 'البني الغامق', psychology: 'يرتبط بالقهوة + يعطي إحساس الفخامة' },
      { hex: '#FFC93C', name: 'الذهبي', psychology: 'يعطي إحساس "الجودة الراقية"' },
    ],
    consulting: [
      { hex: '#3B82F6', name: 'الأزرق', psychology: 'يعطي إحساس "الثقة والاحترافية"' },
      { hex: '#0F172A', name: 'الأسود مع نص ذهبي', psychology: 'يعطي إحساس "الحصرية والـ VIP"' },
    ],
    digital_product: [
      { hex: '#7C3AED', name: 'البنفسجي', psychology: 'يعطي إحساس "الحصرية + الذكاء"' },
      { hex: '#FFC93C', name: 'الذهبي', psychology: 'يعطي إحساس "الاستثمار الجيد"' },
    ],
    service: [
      { hex: '#10B981', name: 'الأخضر', psychology: 'يعطي إحساس "الاستجابة السريعة"' },
      { hex: '#F59E0B', name: 'البرتقالي', psychology: 'يعطي إحساس "الاستعجال"' },
    ],
    fashion: [
      { hex: '#0F172A', name: 'الأسود', psychology: 'يعطي إحساس "الفخامة والتميّز"' },
      { hex: '#E11D48', name: 'الأحمر', psychology: 'يعطي إحساس "الإثارة والشغف"' },
    ],
    realestate: [
      { hex: '#0F172A', name: 'الأسود', psychology: 'يعطي إحساس "الموثوقية والجدية"' },
      { hex: '#FFC93C', name: 'الذهبي', psychology: 'يعطي إحساس "الاستثمار الذهبي"' },
    ],
    health: [
      { hex: '#10B981', name: 'الأخضر', psychology: 'يرتبط بالصحة والحيوية' },
      { hex: '#F59E0B', name: 'البرتقالي', psychology: 'يعطي إحساس "الطاقة والنشاط"' },
    ],
    education: [
      { hex: '#3B82F6', name: 'الأزرق', psychology: 'يعطي إحساس "العلم والمعرفة"' },
      { hex: '#FFC93C', name: 'الذهبي', psychology: 'يعطي إحساس "التميّز والنجاح"' },
    ],
    saas: [
      { hex: '#3B82F6', name: 'الأزرق', psychology: 'يعطي إحساس "الاحترافية والثقة"' },
      { hex: '#10B981', name: 'الأخضر', psychology: 'يعطي إحساس "التجربة المجانية"' },
    ],
  };

  const colors = colorsBySector[sector] || colorsBySector.service;

  if (language === 'en') {
    return {
      primary: { text: 'Get Started Now — Save Your Spot', color: colors[0].hex, reasoning: 'Action-oriented + scarcity' },
      secondary: { text: 'See How It Works First', color: colors[1]?.hex || '#3B82F6', reasoning: 'For hesitant visitors — lowers commitment' },
      colors,
    };
  }

  return {
    primary: { text: 'احجز مكانك الآن — ابدأ فوراً', color: colors[0].hex, reasoning: 'فعل مباشر + ندرة' },
    secondary: { text: 'شاهد كيف يعمل أولاً', color: colors[1]?.hex || '#3B82F6', reasoning: 'للزائر المتردد — يقلل الالتزام' },
    colors,
  };
}

// =============================================================
// SEO كامل
// =============================================================
function generateSEO(analysis: BusinessAnalysis): LandingResult['seo'] {
  const { sector, sectorLabel, audienceLabel, keywords, language, dreamOutcome } = analysis;

  if (language === 'en') {
    const title = `${sectorLabel} — Get ${dreamOutcome.toLowerCase()} in 30 Days`;
    return {
      titleTag: `${title} | BLACK4ME`,
      metaDescription: `127+ ${sector} businesses used this system to ${analysis.goalLabel.toLowerCase()}. See how you can get ${dreamOutcome.toLowerCase()} with our 30-day guarantee.`,
      keywords: [...keywords, sector, 'marketing', 'sales', analysis.goalLabel.toLowerCase()],
      h1: `Get ${dreamOutcome.toLowerCase()} in 30 days`,
      h2List: [
        `Why most ${sector} businesses fail`,
        `The complete system for ${analysis.goalLabel.toLowerCase()}`,
        `What's included in the package`,
        `How it works (3 simple steps)`,
        `Real results from real ${sector} owners`,
        `Frequently asked questions`,
        `Get started today`,
      ],
      ogTitle: title,
      ogDescription: `127+ businesses in ${sector} used this system. See results.`,
    };
  }

  const title = `${sectorLabel} — احصل على ${dreamOutcome} خلال 30 يوماً`;
  return {
    titleTag: `${title} | BLACK4ME الاستشاري الآلي`,
    metaDescription: `127+ مشروع في ${sectorLabel} استخدموا هذا النظام لـ ${analysis.goalLabel}. اكتشف كيف تحصل على ${dreamOutcome} بضمان 30 يوماً.`,
    keywords: [...keywords, sectorLabel, 'تسويق', 'مبيعات', analysis.goalLabel],
    h1: `احصل على ${dreamOutcome} خلال 30 يوماً`,
    h2List: [
      `لماذا أغلب مشاريع ${sectorLabel} تفشل في ${analysis.goalLabel}`,
      `النظام الكامل لـ ${analysis.goalLabel}`,
      `ما الذي تتضمنه الحزمة`,
      `كيف يعمل (3 خطوات بسيطة)`,
      `نتائج حقيقية من أصحاب مشاريع حقيقية في ${sectorLabel}`,
      `الأسئلة الشائعة`,
      `ابدأ اليوم`,
    ],
    ogTitle: title,
    ogDescription: `127+ مشروع في ${sectorLabel} استخدموا هذا النظام. شاهد النتائج.`,
  };
}

// =============================================================
// الدالة الرئيسية
// =============================================================
export function generateLanding(analysis: BusinessAnalysis): LandingResult {
  return {
    wireframe: generateWireframe(analysis.sector, analysis.language),
    headlines: generateHeadlines(analysis),
    painSolution: generatePainSolution(analysis),
    cta: generateCTA(analysis),
    seo: generateSEO(analysis),
  };
}