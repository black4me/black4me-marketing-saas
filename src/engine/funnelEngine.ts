// =============================================================
// FUNNEL & AUTOMATION ENGINE — الوحدة الثالثة
// مولّد مسارات البيع — سكريبتات سوشال + شجرة ManyChat + بريد آلي
// =============================================================

import type { BusinessAnalysis } from './analyzer';

export interface FunnelResult {
  // سكريبت Reels / TikTok
  socialScript: {
    platform: string;
    duration: string;
    hook: string;
    body: string[];
    cta: string;
    caption: string;
    hashtags: string[];
    variations: string[];
  };

  // شجرة ManyChat
  manychatFlow: {
    name: string;
    triggerKeyword: string;
    nodes: Array<{
      id: string;
      type: 'message' | 'condition' | 'delay' | 'button';
      content?: string;
      buttons?: Array<{ label: string; action: string }>;
      delay?: string;
      nextNode?: string;
    }>;
    expectedOutcome: string;
  };

  // سلسلة بريدية (5-7 رسائل)
  emailSequence: Array<{
    day: number;
    subject: string;
    preheader: string;
    goal: string;
    body: string;
    cta: string;
  }>;
}

// =============================================================
// سكريبت سوشال ميديا (Reels / TikTok)
// =============================================================
function generateSocialScript(analysis: BusinessAnalysis): FunnelResult['socialScript'] {
  const { sector, sectorLabel, audienceLabel, dreamOutcome, painPoints, language } = analysis;

  if (language === 'en') {
    return {
      platform: 'Instagram Reels / TikTok',
      duration: '30-45 seconds',
      hook: `If you run a ${sector} business and your ${painPoints[0]?.toLowerCase() || 'main problem'} is killing you — watch this.`,
      body: [
        `Step 1: Stop ${painPoints[0]?.toLowerCase() || 'doing what everyone else does'}.`,
        `Step 2: Build an offer so good your customers can't say no.`,
        `Step 3: Send it to the right people with the right message.`,
        `Result: ${dreamOutcome.toLowerCase()}.`,
      ],
      cta: 'Comment "INFO" to get the full system.',
      caption: `127+ ${sector} owners used this exact system to ${analysis.goalLabel.toLowerCase()}. Comment "INFO" and I'll send you the blueprint.`,
      hashtags: ['#marketing', `#${sector}`, '#entrepreneur', '#sales', '#black4me'],
      variations: [
        'Variation A — Pain-first: open with the most painful point, then solution',
        'Variation B — Result-first: open with a result screenshot, then how-to',
        'Variation C — Question: "Why is your [sector] business still struggling?"',
      ],
    };
  }

  return {
    platform: 'Instagram Reels / TikTok',
    duration: '30-45 ثانية',
    hook: `إذا كنت صاحب مشروع ${sectorLabel} و ${painPoints[0] || 'مشكلة المبيعات'} تأكلك — شاهد هذا.`,
    body: [
      `الخطوة 1: توقف عن ${painPoints[0] || 'فعل ما يفعله الجميع'}.`,
      `الخطوة 2: ابنِ عرض لا يستطيع عميلك رفضه.`,
      `الخطوة 3: أوصله للشخص الصحيح بالرسالة الصحيحة.`,
      `النتيجة: ${dreamOutcome}.`,
    ],
    cta: 'اكتب "معلومات" في التعليقات وسنرسل لك النظام كاملاً.',
    caption: `127+ من أصحاب مشاريع ${sectorLabel} استخدموا هذا النظام بالذات لـ ${analysis.goalLabel}. اكتب "معلومات" وسأرسل لك الخطة الكاملة.`,
    hashtags: ['#تسويق', `#${sectorLabel.replace(/\s/g, '')}`, '#رواد_أعمال', '#مبيعات', '#BLACK4ME'],
    variations: [
      'النسخة A — الألم أولاً: افتح بأكثر نقطة إيلاماً، ثم الحل',
      'النسخة B — النتيجة أولاً: افتح بصورة نتيجة، ثم كيف',
      'النسخة C — السؤال: "ليش مشروعك [القطاع] لازال يعاني؟"',
    ],
  };
}

// =============================================================
// شجرة ManyChat
// =============================================================
function generateManyChatFlow(analysis: BusinessAnalysis): FunnelResult['manychatFlow'] {
  const { sector, sectorLabel, dreamOutcome, language } = analysis;

  if (language === 'en') {
    return {
      name: `Lead Magnet — ${sectorLabel} Growth Blueprint`,
      triggerKeyword: 'INFO',
      nodes: [
        {
          id: '1_trigger',
          type: 'message',
          content: `Welcome! You asked for the ${sector} growth blueprint. 👇`,
          buttons: [{ label: 'Send me the blueprint', action: 'next' }],
          nextNode: '2_ask_name',
        },
        {
          id: '2_ask_name',
          type: 'message',
          content: 'Quick question first — what is your biggest challenge right now?',
          buttons: [
            { label: 'More sales', action: 'tag_sales' },
            { label: 'More leads', action: 'tag_leads' },
            { label: 'Better pricing', action: 'tag_pricing' },
          ],
          nextNode: '3_deliver',
        },
        {
          id: '3_deliver',
          type: 'message',
          content: `Here's your free blueprint: [LINK]\n\nIt contains the exact 3-step system that helped 127+ ${sector} businesses ${dreamOutcome.toLowerCase()}.`,
          buttons: [{ label: 'Book a free call', action: 'next' }],
          nextNode: '4_followup',
        },
        {
          id: '4_followup',
          type: 'delay',
          delay: '24 hours',
          nextNode: '5_check',
        },
        {
          id: '5_check',
          type: 'message',
          content: `Did you get a chance to read the blueprint? Most ${sector} owners tell me Step 2 is the most surprising.`,
          buttons: [
            { label: 'Yes, I read it', action: 'next' },
            { label: 'No, send it again', action: 'resend' },
          ],
          nextNode: '6_offer',
        },
        {
          id: '6_offer',
          type: 'message',
          content: `Based on what you told me, I think our ${analysis.sectorLabel} Growth Package would be a perfect fit. Want a free 15-min call to see if it fits?`,
          buttons: [
            { label: 'Yes, book a call', action: 'book_call' },
            { label: 'Send me more info', action: 'send_info' },
          ],
        },
      ],
      expectedOutcome: 'Lead magnet → qualified lead → booked call or direct sale.',
    };
  }

  return {
    name: `جذب عملاء — ${sectorLabel} خارطة النمو`,
    triggerKeyword: 'معلومات',
    nodes: [
      {
        id: '1_trigger',
        type: 'message',
        content: `أهلاً! طلبت خارطة النمو لـ ${sectorLabel}. 👇`,
        buttons: [{ label: 'أرسل لي الخارطة', action: 'next' }],
        nextNode: '2_ask_challenge',
      },
      {
        id: '2_ask_challenge',
        type: 'message',
        content: 'سؤال سريع أولاً — ما هو أكبر تحدي عندك الآن؟',
        buttons: [
          { label: 'زيادة المبيعات', action: 'tag_sales' },
          { label: 'جذب عملاء', action: 'tag_leads' },
          { label: 'تسعير أفضل', action: 'tag_pricing' },
        ],
        nextNode: '3_deliver',
      },
      {
        id: '3_deliver',
        type: 'message',
        content: `تفضل خارطتك المجانية: [رابط]\n\nتحتوي على نظام 3-خطوات ساعد 127+ مشروع في ${sectorLabel} على ${dreamOutcome}.`,
        buttons: [{ label: 'احجز استشارة مجانية', action: 'next' }],
        nextNode: '4_followup',
      },
      {
        id: '4_followup',
        type: 'delay',
        delay: '24 ساعة',
        nextNode: '5_check',
      },
      {
        id: '5_check',
        type: 'message',
        content: `هل قرأت الخارطة؟ أغلب أصحاب ${sectorLabel} يقولون إن الخطوة 2 هي الأكثر مفاجأة.`,
        buttons: [
          { label: 'نعم قرأتها', action: 'next' },
          { label: 'لا، أعد إرسالها', action: 'resend' },
        ],
        nextNode: '6_offer',
      },
      {
        id: '6_offer',
        type: 'message',
        content: `بناءً على ما قلته، أعتقد أن حزمة النمو لـ ${sectorLabel} ستكون مناسبة لك. هل تبي مكالمة مجانية 15 دقيقة نتفق إذا كانت تناسبك؟`,
        buttons: [
          { label: 'نعم احجز لي', action: 'book_call' },
          { label: 'أرسل لي المزيد', action: 'send_info' },
        ],
      },
    ],
    expectedOutcome: 'جذب → تأهيل → حجز مكالمة أو بيع مباشر.',
  };
}

// =============================================================
// سلسلة بريدية (5-7 رسائل)
// =============================================================
function generateEmailSequence(analysis: BusinessAnalysis): FunnelResult['emailSequence'] {
  const { sector, sectorLabel, dreamOutcome, painPoints, language } = analysis;

  if (language === 'en') {
    return [
      {
        day: 0,
        subject: `Here's the ${sector} blueprint you asked for`,
        preheader: `The 3-step system that 127+ ${sector} owners used`,
        goal: 'Deliver lead magnet + build trust',
        body: `Hey [Name],\n\nThanks for grabbing the ${sector} growth blueprint.\n\nIn the next few days, I'll send you 5 short emails walking you through the exact 3-step system that helped 127+ businesses ${dreamOutcome.toLowerCase()}.\n\nToday's email is short. Just open the blueprint: [LINK]\n\nTomorrow, I'll show you Step 1 in detail.\n\n— The BLACK4ME Team`,
        cta: 'Open the blueprint →',
      },
      {
        day: 1,
        subject: `Why most ${sector} owners stay stuck`,
        preheader: `The trap that 89% of ${sector} businesses fall into`,
        goal: 'Identify the pain + build urgency',
        body: `Hey [Name],\n\nYesterday I shared the blueprint. Today let me explain the trap that keeps most ${sector} owners stuck.\n\n${painPoints[0] || 'The biggest problem you\'re facing'}.\n\n${painPoints[1] || 'The second problem'}.\n\n${painPoints[2] || 'The third problem'}.\n\nIf this sounds like you, the issue isn't effort — it's that you're selling a commodity. Tomorrow I'll show you Step 1: how to escape the commodity trap.\n\n— The BLACK4ME Team`,
        cta: 'Read Step 1 →',
      },
      {
        day: 2,
        subject: `Step 1: Build an offer they can't refuse`,
        preheader: `The 4-equation value framework`,
        goal: 'Teach Step 1 — value equation',
        body: `Hey [Name],\n\nStep 1 of the 3-step system is: build an offer so good your customers can't say no.\n\nThe framework is simple: Value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort & Sacrifice)\n\nTo make your offer irresistible:\n1. Raise the Dream Outcome — make the result visceral\n2. Raise Perceived Likelihood — testimonials, guarantees\n3. Reduce Time Delay — "first result in 7 days"\n4. Reduce Effort & Sacrifice — templates, ready-to-use\n\nTomorrow: Step 2 — how to price it.\n\n— The BLACK4ME Team`,
        cta: 'Get the value framework →',
      },
      {
        day: 3,
        subject: `Step 2: Pricing psychology that doubles revenue`,
        preheader: `Why the highest price usually wins`,
        goal: 'Teach Step 2 — pricing',
        body: `Hey [Name],\n\nStep 2 of the 3-step system: price it right.\n\nMost ${sector} owners price too low. Here's why:\n\n• Low price = "low quality" signal\n• Low price = attracts worst customers\n• Low price = leaves money on table\n\nThe 3-tier rule:\n• Basic — entry level\n• Gold — the recommended (most people choose this)\n• Diamond — VIP / personal attention\n\nThe trick: anchor with Diamond first. Then Gold feels like a bargain.\n\nTomorrow: Step 3 — the automation system.\n\n— The BLACK4ME Team`,
        cta: 'See pricing strategy →',
      },
      {
        day: 4,
        subject: `Step 3: The automation system`,
        preheader: `Sell while you sleep — the 24/7 sales engine`,
        goal: 'Teach Step 3 — automation',
        body: `Hey [Name],\n\nStep 3 of the 3-step system: automate everything.\n\nThe 24/7 sales engine:\n1. Social media content (Reels, TikTok)\n2. ManyChat auto-DM flow (lead magnet → qualify → book call)\n3. Email sequence (hook → value → proof → close)\n\nOnce set up, this system works 24/7. You wake up to new leads and sales.\n\nTomorrow: I'll share how you can get the whole system implemented for your ${sector} business.\n\n— The BLACK4ME Team`,
        cta: 'See automation system →',
      },
      {
        day: 5,
        subject: `Ready to skip 6 months of trial and error?`,
        preheader: `The ${sector} Growth Package — limited spots`,
        goal: 'Make the offer',
        body: `Hey [Name],\n\nOver the last 5 days, I shared the exact 3-step system that 127+ ${sector} owners used to ${dreamOutcome.toLowerCase()}.\n\nIf you want to skip the trial-and-error and get it implemented in 30 days, the ${sectorLabel} Growth Package might be a fit.\n\nWhat you get:\n• Complete system implementation\n• 3 strategy sessions\n• All templates + automation setup\n• 30-day guarantee\n\nSpots are limited (5 per month). Want a free 15-min call to see if it's right for you?\n\n— The BLACK4ME Team`,
        cta: 'Book a free call →',
      },
      {
        day: 7,
        subject: `Last chance — closing spots this week`,
        preheader: `Final reminder for the ${sector} package`,
        goal: 'Final urgency push',
        body: `Hey [Name],\n\nThis is the last email I'll send about the ${sectorLabel} Growth Package.\n\nIf you've been on the fence, here's the deal:\n• 30-day guarantee (full refund if no results)\n• Limited to 5 spots per month\n• Implementation in 30 days\n\nIf you want in, book a call this week. After that, spots reopen next month.\n\nEither way, the blueprint is yours forever.\n\n— The BLACK4ME Team`,
        cta: 'Book your call →',
      },
    ];
  }

  return [
    {
      day: 0,
      subject: `تفضل خارطة ${sectorLabel} التي طلبتها`,
      preheader: `نظام 3 خطوات استخدمه 127+ مشروع في ${sectorLabel}`,
      goal: 'تسليم الـ lead magnet + بناء الثقة',
      body: `مرحباً [الاسم],\n\nشكراً لتحميل خارطة النمو لـ ${sectorLabel}.\n\nخلال الأيام القادمة، سأرسل لك 5 رسائل قصيرة نشرح فيها نظام 3-خطوات بالضبط الذي ساعد 127+ مشروع على ${dreamOutcome}.\n\nرسالة اليوم قصيرة. فقط افتح الخارطة: [رابط]\n\nبكرة، سأشرح لك الخطوة 1 بالتفصيل.\n\n— فريق BLACK4ME`,
      cta: 'افتح الخارطة ←',
    },
    {
      day: 1,
      subject: `ليش أغلب أصحاب ${sectorLabel} يبقون عالقين`,
      preheader: `الفخ الذي يسقط فيه 89% من مشاريع ${sectorLabel}`,
      goal: 'تحديد الألم + بناء الاستعجال',
      body: `مرحباً [الاسم],\n\nأمس شاركت معك الخارطة. اليوم خلّني أشرح الفخ الذي يحبس أغلب أصحاب ${sectorLabel}.\n\n${painPoints[0] || 'أكبر مشكلة تواجهك'}.\n\n${painPoints[1] || 'المشكلة الثانية'}.\n\n${painPoints[2] || 'المشكلة الثالثة'}.\n\nإذا كان هذا يشبه وضعك، المشكلة مو في الجهد — المشكلة إنك تبيع سلعة عادية. بكرة سأشرح لك الخطوة 1: كيف تخرج من فخ السلعة العادية.\n\n— فريق BLACK4ME`,
      cta: 'اقرأ الخطوة 1 ←',
    },
    {
      day: 2,
      subject: `الخطوة 1: ابنِ عرض لا يستطيع عميلك رفضه`,
      preheader: `معادلة القيمة الـ 4-عوامل`,
      goal: 'تعليم الخطوة 1 — معادلة القيمة',
      body: `مرحباً [الاسم],\n\nالخطوة 1 من نظام 3-خطوات: ابنِ عرض لا يقاوم.\n\nالإطار بسيط: القيمة = (النتيجة الحلم × احتمالية النجاح المتصورة) ÷ (تأخير الوقت × الجهد والتضحية)\n\nلجعل عرضك لا يقاوم:\n1. ارفع النتيجة الحلم — اجعلها حسّية، يحلم فيها العميل\n2. ارفع احتمالية النجاح — شهادات، ضمانات، خطوات واضحة\n3. قلّل تأخير الوقت — "أول نتيجة خلال 7 أيام"\n4. قلّل الجهد والتضحية — قوالب جاهزة، تنفيذ آلي\n\nبكرة: الخطوة 2 — كيف تسعّرها.\n\n— فريق BLACK4ME`,
      cta: 'احصل على إطار القيمة ←',
    },
    {
      day: 3,
      subject: `الخطوة 2: سيكولوجية التسعير التي تضاعف الإيرادات`,
      preheader: `ليش السعر الأعلى عادةً يفوز`,
      goal: 'تعليم الخطوة 2 — التسعير',
      body: `مرحباً [الاسم],\n\nالخطوة 2 من نظام 3-خطوات: سعّرها صح.\n\nأغلب أصحاب ${sectorLabel} يسعّرون بأقل من اللازم. ليش؟\n\n• السعر المنخفض = إشارة "جودة منخفضة"\n• السعر المنخفض = يجذب أصعب العملاء\n• السعر المنخفض = ضياع ربح على الطاولة\n\nقاعدة 3 باقات:\n• الأساسية — مستوى الدخول\n• الذهبية — الموصى بها (أغلب الناس تختارها)\n• الماسية — VIP / اهتمام شخصي\n\nالحيلة: اعرض الماسية أولاً كـ "مرساة". بعدها الذهبية تبدو صفقة رابحة.\n\nبكرة: الخطوة 3 — نظام الأتمتة.\n\n— فريق BLACK4ME`,
      cta: 'شاهد استراتيجية التسعير ←',
    },
    {
      day: 4,
      subject: `الخطوة 3: نظام الأتمتة`,
      preheader: `بع وأنت نائم — محرك المبيعات 24/7`,
      goal: 'تعليم الخطوة 3 — الأتمتة',
      body: `مرحباً [الاسم],\n\nالخطوة 3 من نظام 3-خطوات: أوتومات كل شيء.\n\nمحرك المبيعات 24/7:\n1. محتوى سوشال ميديا (Reels, TikTok)\n2. شجرة ManyChat (جذب → تأهيل → حجز مكالمة)\n3. سلسلة بريدية (جذب → قيمة → إثبات → إغلاق)\n\nبعد الإعداد، هذا النظام يشتغل 24/7. تصحى على عملاء جدد ومبيعات.\n\nبكرة: سأشرح كيف تحصل على النظام كامل مُنفّذ لمشروعك في ${sectorLabel}.\n\n— فريق BLACK4ME`,
      cta: 'شاهد نظام الأتمتة ←',
    },
    {
      day: 5,
      subject: `تبي تتجاوز 6 شهور من التجربة والخطأ؟`,
      preheader: `حزمة النمو لـ ${sectorLabel} — أماكن محدودة`,
      goal: 'تقديم العرض',
      body: `مرحباً [الاسم],\n\nخلال آخر 5 أيام، شرحت لك نظام 3-خطوات بالضبط الذي استخدمه 127+ مشروع في ${sectorLabel} لـ ${dreamOutcome}.\n\nإذا كنت تبي تتجاوز التجربة والخطأ وتحصل على التنفيذ خلال 30 يوم، حزمة النمو لـ ${sectorLabel} قد تكون مناسبة لك.\n\nما تحصل عليه:\n• تنفيذ النظام كامل\n• 3 جلسات استراتيجية\n• كل القوالب + إعداد الأتمتة\n• ضمان 30 يوم\n\nالأماكن محدودة (5 شهرياً). تبي مكالمة مجانية 15 دقيقة نتفق إذا كانت تناسبك؟\n\n— فريق BLACK4ME`,
      cta: 'احجز مكالمة مجانية ←',
    },
    {
      day: 7,
      subject: `آخر فرصة — نقفل الأماكن هذا الأسبوع`,
      preheader: `تذكير أخير لحزمة ${sectorLabel}`,
      goal: 'دفعة استعجال نهائية',
      body: `مرحباً [الاسم],\n\nهذا آخر إيميل سأرسله عن حزمة النمو لـ ${sectorLabel}.\n\nإذا كنت متردد، ها هي الصفقة:\n• ضمان 30 يوم (استرداد كامل إذا لم تحصل على نتائج)\n• محدودة بـ 5 أماكن شهرياً\n• تنفيذ خلال 30 يوم\n\nإذا تبي تدخل، احجز مكالمة هذا الأسبوع. بعدها الأماكن تنفتح الشهر القادم.\n\nفي كل الأحوال، الخارطة هي لك للأبد.\n\n— فريق BLACK4ME`,
      cta: 'احجز مكالمتك ←',
    },
  ];
}

// =============================================================
// الدالة الرئيسية
// =============================================================
export function generateFunnel(analysis: BusinessAnalysis): FunnelResult {
  return {
    socialScript: generateSocialScript(analysis),
    manychatFlow: generateManyChatFlow(analysis),
    emailSequence: generateEmailSequence(analysis),
  };
}