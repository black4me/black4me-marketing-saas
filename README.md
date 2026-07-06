# BLACK4ME — الاستشاري الآلي

نظام SaaS يحول منهجية كتاب "بدون تسويق كارثة تهدد ثروتك المستقبلية" إلى مدير تسويق استراتيجي آلي.

## كيف يعمل

العميل يكتب وصفاً قصيراً لمشروعه → النظام يحلل → يولد 3 وحدات كاملة:

### الوحدة الأولى: هندسة العرض والتسعير
- عرض أساسي مغناطيسي
- 3 مكافآت (Bonuses) مع قيمها
- ضمان قوي يكسر المخاطرة
- آلية ندرة واستعجال
- 3 باقات تسعير (أساسية / ذهبية / ماسية) مع تأثير المرساة

### الوحدة الثانية: مولّد صفحات الهبوط
- هيكل الصفحة (Wireframe) — 8 أقسام
- 3 عناوين مغناطيسية
- قسم الألم والحل بنصوص قوية
- ألوان CTA مع سيكولوجيتها
- SEO كامل (Title Tag, Meta, H1, H2, Keywords, OG)

### الوحدة الثالثة: أتمتة مسارات البيع
- سكريبت Reels/TikTok كامل
- شجرة ManyChat (6 nodes: trigger → qualify → deliver → follow-up → offer)
- سلسلة بريدية 7 رسائل (يوم 0 → يوم 7)

## المنهجية المطبقة

كل مخرجات النظام مستمدة من فصول الكتاب:

- **معادلة القيمة:** القيمة = (النتيجة الحلم × احتمالية النجاح) ÷ (تأخير الوقت × الجهد والتضحية)
- **سيكولوجية التسعير:** قاعدة 3 باقات + تأثير المرساة + الأرقام المنكسرة
- **الحشود الجائعة:** استهداف الجمهور الأكثر جاهزية للشراء
- **استراتيجيات الندرة:** حقيقية + زمنية + موسمية
- **صناعة الإعلانات:** هيكل الخطاف → القصة → الوعد → الدليل → النداء
- **محرك المبيعات الآلي:** 24/7 sales engine

## القطاعات المدعومة

متجر إلكتروني • قهوة/F&B • استشارات • منتجات رقمية • خدمات محلية • أزياء • عقار • صحة/لياقة • تعليم • SaaS

## التقنيات

- **Frontend:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS (نظام ألوان BLACK4ME مخصص)
- **RTL:** كامل — Cairo + Tajawal
- **Engine:** خوارزميات قائمة على القاموس (dictionary-based) + قوالب مُولّدة لكل قطاع
- **Build:** Static SPA (لا يحتاج backend)

## التطوير محلياً

```bash
bun install
bun run dev
```

افتح http://localhost:5173/

## البناء للإنتاج

```bash
bun run build
```

النتيجة في `dist/` — جاهزة للنشر على أي CDN.

## النشر على Vercel

### طريقة 1: عبر Vercel CLI

```bash
bun install -g vercel
vercel login
vercel --prod
```

### طريقة 2: عبر Dashboard Vercel

1. ارفع مجلد المشروع على GitHub
2. في Vercel: "Import Project" → اختر الـ repo
3. Framework: **Vite** (تلقائي)
4. اضغط Deploy

الإعدادات موجودة في `vercel.json` — كل شي تلقائي.

## البنية

```
src/
├── engine/              # قلب النظام — المنهجية + التحليل + التوليد
│   ├── methodology.ts   # معادلة القيمة، سيكولوجية التسعير، الحشود...
│   ├── analyzer.ts      # تحليل مدخل العميل → BusinessAnalysis
│   ├── offerEngine.ts   # الوحدة 1: العرض والتسعير
│   ├── landingEngine.ts # الوحدة 2: صفحة الهبوط
│   ├── funnelEngine.ts  # الوحدة 3: مسارات البيع
│   └── index.ts         # نقطة الدخول: generateMarketingPlan()
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── InputSection.tsx
│   ├── Dashboard.tsx
│   ├── AnalysisCard.tsx
│   ├── ModuleOffer.tsx
│   ├── ModuleLanding.tsx
│   ├── ModuleFunnel.tsx
│   ├── CopyButton.tsx
│   └── Footer.tsx
├── App.tsx
├── main.tsx
└── index.css            # Tailwind + نظام ألوان BLACK4ME
```

## الإضافة والتخصيص

لإضافة قطاع جديد:
1. افتح `src/engine/analyzer.ts`
2. أضف entry في `SECTOR_DICTIONARY`
3. أضف قوالب في `offerEngine.ts` و `landingEngine.ts` و `funnelEngine.ts`

لإضافة موديول جديد:
1. أنشئ ملف في `src/engine/` (مثلاً `emailEngine.ts`)
2. أنشئ مكون في `src/components/` (مثلاً `ModuleEmail.tsx`)
3. أضف تبويب في `Dashboard.tsx`